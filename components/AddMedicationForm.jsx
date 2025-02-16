import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from "react-native";
import Colors from "../constant/Colors";
import { TypeList, WhenToTake } from "./../constant/Options";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  FormatDate,
  formatDateForText,
  formatTime,
} from "../service/ConvertDateTime";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { Alert } from 'react-native';
import { collection, addDoc } from "firebase/firestore"; 
import { useRouter } from "expo-router";


export default function AddNewMedication() {
  const [formData, setFormData] = useState();
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const router=useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  const SaveMedication = async () => {
    console.log('SaveMedication function called');
    const docId = Date.now().toString();
    const user = await getLocalStorage('userDetail');
    console.log('Retrieved user:', user);

    if (!formData?.name || !formData?.type || !formData?.dose || !formData?.startDate || !formData?.endDate || !formData?.reminder) {
        Alert.alert('Missing Information', 'Please enter all fields.');
        return;
    }
    setLoading(true);
    try {
        const docRef = await setDoc(doc(db, "users", docId), {
            ...formData,
            userEmail: user?.email,
            docId: docId
        });
        console.log("Document written successfully");
        setLoading(false);
        Alert.alert('Great','new medication added successfully',[
          {
            text:'ok',
            onPress:()=>router.push('(tabs)')

          }
        ])
    } catch (e) {
        setLoading(false);
        console.error("Error adding document: ", e);
        Alert.alert('Error', 'Could not save data. Check your connection.');
    }
};

  return (
    <View
      style={{
        padding: 25,
      }}
    >
      <Text style={styles.header}>Add New Medication</Text>
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="medkit-outline"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Medicine Name"
          onChangeText={(value) => onHandleInputChange("name", value)}
        />
      </View>
      {/* Typle List */}

      <FlatList
        data={TypeList}
        horizontal
        style={{
          margin: 5,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.inputGroup,
              { marginRight: 10 },
              {
                backgroundColor:
                  item.name == formData?.type?.name ? Colors.PRIMARY : "white",
              },
            ]}
            onPress={() => onHandleInputChange("type", item)}
          >
            <Text
              style={[
                styles.typeText,
                {
                  color: item.name == formData?.type?.name ? "white" : "black",
                },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      {/* Does input */}
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="eyedrop-outline"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Dose e.g 2, 5ml "
          onChangeText={(value) => onHandleInputChange("dose", value)}
        />
      </View>
      {/* when to take dropdownn */}
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="time-outline"
          size={24}
          color="black"
        />
        <Picker
          selectedValue={formData?.when}
          onValueChange={(itemValue, itemIndex) =>
            onHandleInputChange("when", itemValue)
          }
          style={{
            width: "90%",
          }}
        >
          {WhenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      {/* DATES START/END */}
      <View style={styles.dateGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowStartDate(true)}
        >
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formatDateForText(formData?.startDate) ?? "Start Date"}
          </Text>
        </TouchableOpacity>
        {showStartDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange(
                "startDate",
                FormatDate(event.nativeEvent.timestamp)
              );
              setShowStartDate(false);
            }}
            value={new Date(formData?.startDate) ?? new Date()}
          />
        )}
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowEndDate(true)}
        >
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formatDateForText(formData?.endDate) ?? "End Date"}
          </Text>
        </TouchableOpacity>
        {showEndDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange(
                "endDate",
                FormatDate(event.nativeEvent.timestamp)
              );
              setShowEndDate(false);
            }}
            value={new Date(formData?.endDate) ?? new Date()}
          />
        )}
      </View>
      {/* set reminder inpute */}
      <View style={styles.dateGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowTimePicker(true)}
        >
          <Ionicons
            style={styles.icon}
            name="timer-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formData?.reminder ?? "Select Reminder Time"}
          </Text>
        </TouchableOpacity>
      </View>

      {showTimePicker && (
        <RNDateTimePicker
          mode="time"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              const formattedTime = formatTime(selectedDate.getTime());
              onHandleInputChange("reminder", formattedTime);
            }
            setShowTimePicker(false);
          }}
          value={
            formData?.reminder
              ? new Date(`1970-01-01T${formData.reminder}:00`)
              : new Date()
          }
        />
      )}
      <TouchableOpacity style={styles.addBtn} onPress={SaveMedication}>
       
      {loading? <ActivityIndicator size = {'large'} color={'white'}></ActivityIndicator>:
        <Text style={styles.addBtnText}>Add New Medication</Text>}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    padding: 11,
    marginTop: 10,
    backgroundColor: "white",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    paddingRight: 12,
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
  },
  typeText: {
    fontSize: 16,
  },
  text: {
    padding: 5,
    fontSize: 16,
  },
  dateGroup: {
    gap: 10,
    flexDirection: "row",
  },
  addBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: "100%",
    marginTop: 25,
  },
  addBtnText: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
  },
});
