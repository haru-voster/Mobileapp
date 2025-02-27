import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../service/Storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constant/Colors";


export default function Header() {
  const [user, setUser] = useState();
  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    console.log(userInfo);
    setUser(userInfo);
  };

  return (
    <View
      style={{
        marginTop: 20,
        width:'100%'
      }}
    >
      <View style={{
              alignItems: "center",
              justifyContent:'space-between',
              display: "flex",
              flexDirection: "row", 
              width:'100%'   
      }}>
        <View
          style={{
            alignItems: "center",
            gap: 10,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Image
            source={require("./../assets/images/smiley.png")}
            style={{
              width: 45,
              height: 45,
            }}
          />
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            Hello {user?.displayName}👋
          </Text>
        </View>
        <Ionicons name="medkit-outline" size={34} color={Colors.DARK_GRAY} />
      </View>
    </View>
  );
}
