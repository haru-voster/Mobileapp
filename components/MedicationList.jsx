import React, { useState, useEffect } from 'react'
import {View, Text, Image, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import { GetDateRangeToDisplay } from '../service/ConvertDateTime';
import Colors  from '../constant/Colors';
import moment from 'moment';
import EmptyState from "../components/EmptyState";

import { getDocs } from 'firebase/firestore';
import { useRouter } from 'expo-router';


export default function MedicationList() {
    const [medList, setMedList] = useState();
    const [dateRange, setDateRange]=useState();
    const [selectDate, setSelectDate]=useState(moment().format('MM/DD/YYYY'));
    const [loading , setLoading] = useState(false);
    const router=useRouter();
    useEffect(() => {
      GetDateRangeList();
      console.log("Generated Date Range:", dateRange);
    }, []);
    useEffect(() => {
      GetDateRangeList(selectDate);
  }, []);
  
    

    const GetDateRangeList=()=>{
       const dateRange=GetDateRangeToDisplay();  
     setDateRange(dateRange);

    }
    const GetMedicationList=async(selectDate)=>{
      setLoading(True);
      const user=await getLocalStorage('userDetail');
      setMedList([]);
      try{
        const q=query(collection(db,'medic'),
        where('UserEmail','==',user?.email),
        where("dates",'array-contains',selectDate));

        const querySnapshot=await getDocs(q);
    
        querySnapshot.forEach((doc)=>{
          console.log("docId:"+doc.id+'==>',doc.data())
          setMedList(prev=>[...prev, doc.data() ] )
        })
        setLoading(False);
      }catch(e)
      {
        console.log(e)
      }

    }
 return(
  <View style={{
    
  }}>
    <Image source={require('./../assets/images/medicine1.png')}
    styles={{
      height:200,
      width:'100%',
      borderRadius:15
    }}
    />
        <FlatList
      data={dateRange}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      style={{ marginTop: 15 }}
      contentContainerStyle={{ flexDirection: 'row' }} // Ensure horizontal layout
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.dateGroup,
            { backgroundColor: item.formattedDate === selectDate ? Colors.PRIMARY : Colors.LIGHT_GRAY_BORDER }
          ]}
          onPress={() => {setSelectDate(item.formattedDate);
           GetMedicationList(item.formattedDate)
          }}
        >
          <Text style={[styles.day, { color: item.formattedDate === selectDate ? 'white' : 'black' }]}>{item.day}</Text>
          <Text style={[styles.date, { color: item.formattedDate === selectDate ? 'white' : 'black' }]}>{item.date}</Text>
        </TouchableOpacity>
      )}
    />

{medList?.length > 0 ? 
  <FlatList
    data={medList}
    onRefresh={() => GetDateRangeList(selectDate)}
    refreshing={loading}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={()=>router.push({
        pathname:'/action-modal',
        params:{
          ...item,
          selectDate:selectDate
        }
      })}>
        <MedicationCardItem medicine={item} />
      </TouchableOpacity>
    )}
  />
 :<EmptyState />
  }


  </View>
 )
   
}
const styles = StyleSheet.create({
  dateGroup:{
    padding:10,
    alignItems:'center',
    display:'flex',
    marginRight:10,
    backgroundColor:Colors.LIGHT_GRAY_BORDER,
    borderRadius:10
  },
  day:{
    fontSize:20
  },
  date:{

    fontWeight:'bold',
    fontSize:26
  }
})

