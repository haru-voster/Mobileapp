import React, { useState, useEffect } from 'react'
import {View, Text, Image, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import { GetDateRangeToDisplay } from '../service/ConvertDateTime';
import Colors  from '../constant/Colors';
import moment from 'moment';


export default function MedicationList() {
    const [medList, setMediList] = useState();
    const [dateRange, setDateRange]=useState();
    const [selectDate, setSelectDate]=useState(moment().format('MM/DD/YYYY'));

    useEffect(()=>{
      GetDateRangeList();
    },[])

    const GetDateRangeList=()=>{
       const dateRange=GetDateRangeToDisplay();
     setDateRange(dateRange);

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
      horizontal
      style={{marginTop:15}}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <TouchableOpacity style={[styles.dateGroup,{backgroundColor:item.formattedDate==selectDate?Colors.PRIMARY:Colors.LIGHT_GRAY_BORDER}]}
        onPress={()=>setSelectDate(item.formattedDate)}
        >
          <Text style={[styles.day, {color:item.formattedDate==selectDate?'white':'black'}]}>{item.day}</Text>
          <Text style={[styles.date, {color:item.formattedDate==selectDate?'white':'black'}]}>{item.date}</Text>
        </TouchableOpacity>
      )}
    
    />

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

