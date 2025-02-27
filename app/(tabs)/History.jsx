import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Colors from "../../constant/Colors";
import moment from "moment";
import { GetDateRangeToDisplay } from "../../service/ConvertDateTime";
import { getLocalStorage } from "../../service/Storage";
import { collection, getDocs , query, where } from "firebase/firestore";
import MedicationCardItem from "../../components/MedicationCardItem";
// import {db} from '../config/FirebaseConfig'




export default function History(){

    const [dateRange, setDateRange]=useState();
    const [selectDate, setSelectDate]=useState(moment().format('MM/DD/YYYY'));
    const [loading, setLoading] = useState(false); 
    const [medList, setMedList] =  useState();

    useEffect(()=>{
        GetDateList();
        GetMedicationList(selectDate);
    },[])
    const GetDateList=()=>{
        const dates=GetDateRangeToDisplay();

        setDateRange(dates);
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

    return (
        <View style={styles?.mainContainer}>
            <Image source={require('./../../assets/images/med.png')}
            style={styles.imageBanner}
            />
            <Text style={styles.header}>Medication History</Text>

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
            onRefresh={() =>GetMedicationList(selectDate)}
            refreshing={loading}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>router.push({
                pathname:'/action-modal',
                params:{
                  ...item,
                  selectDate:selectDate
                }
              })}>
                <MedicationCardItem medicine={item} selectDate={selectDate} />
              </TouchableOpacity>
            )}
          />
         :
         <Text style={{
            fontSize:25,
            padding:30,
     
            textAlign:"center",
            color:Colors.GRAY,
            fontWeight:'bold'
         }}>
            NO MEDICATION HISTORY
         </Text>
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
  },
  imageBanner:{
    width:'100%',
    height:250,
    borderRadius:15
  },
  header:{
    fontSize:25,
    fontWeight:'bold',
    margin:20
  }
})

