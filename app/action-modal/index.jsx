import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, Image, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constant/Colors";
import MedicationCardItem from "../../components/MedicationCardItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import moment from 'moment';


export default function MedicationActionModal() {
  const medicine = useLocalSearchParams();
 const router=useRouter();

 const UpdateActionStatus= async(status)=>{
    try{
        const docRef=doc(db, 'medication', medicine?.docId);
        await updateDoc(docRef, {
            action:arrayUnion({
                status:status,
                time:moment().format('LT'),
                date:medicine?.selectDate
            })
        });
        Alert.alert(status,'Response saved!',[
            {
                text:'ok',
                onPress:()=>router.replace('(tabs)')
            }
        ])
    }catch(e)
    {
        console.log(e)
    }
 }

  return (
    <View style={StyleSheet.container}>
      <Image
        source={require("./../../assets/images/notification.gif")}
        style={{
          width: 120,
          height: 80,
        }}
      />
      <Text style={{ fontSize: 18 }}>{medicine?.selectDate}</Text>
      <Text style={{ fontSize: 36, fontWeight: "bold", color: Colors.PRIMARY }}>
        {medicine?.reminder}
      </Text>
      <Text style={{ fontSize: 18 }}>Its time to take</Text>
      <MedicationCardItem medicine={medicine} />

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.closeBtn}
        onPress={()=>UpdateActionStatus('Missed')}
        >
          <Ionicons name="close-outline" size={24} color="red" />
          <Text
            style={{
              fontSize: 20,
              color: "red",
            }}
          >
            Missed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.successBtn}>
        onPress={()=>UpdateActionStatus('Taken')}
          <Ionicons name="check-outline" size={24} color="white" />
          <Text
            style={{
              fontSize: 20,
              color: "white",
            }}
          >
            Taken
          </Text>
        </TouchableOpacity>
      </View>
    <TouchableOpacity 
    
    onPress={()=>router.back()}
    style={{
        position:'absolute',
        bottom:25
    }}>
      <Ionicons name="close-circle" size={44} color={Colors.GRAY} />
    
    </TouchableOpacity>
   
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 25,
  },
  closeBtn: {
    padding: 25,
    gap: 6,
    flexDirection: "row",
    borderRadius: 15,
    borderColor: "red",
    alignItems: "center",
    borderWidth: 1,
  },
  successBtn: {
    gap: 6,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: Colors.GREEN,
  },
});
