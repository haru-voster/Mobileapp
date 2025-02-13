import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'
import { router, useRouter } from 'expo-router'

export default function LoginScreen() {

    const route=useRouter
  return (
    <View>
       <View style={{
        display:'flex',
        alignItems:'center',
        marginTop:40
       }}>
        <Image source={require('../../assets/images/favicon.png')}
        style={{
            width:210,
            height:450,
            borderRadius:23
            
        }}
        />
       </View>
      <View style={{
        padding:25,
        backgroundColor:Colors.PRIMARY,
        height:'100%'
      }}> 
        <Text style={{
          color:'white',
          fontSize:30,
          textAlign:'center',
          fontWeight:'bold',

        }}>Together for Better Health</Text>
        <Text style={{
          color:'white',
          fontSize:17,
          marginTop:20,
          textAlign:'center' 
        }}>Track your meds, take control of your health. Stay consistency and confident</Text>
      <TouchableOpacity
      onPress={()=>router.push('login/signIn')}
      >
        
        <Text style={{
          color:'white',
          textAlign:'center',
          fontSize:16,
          color:Colors.PRIMARY,
          backgroundColor:'white',
          padding:15,
          borderRadius:99

        }}>continue</Text>
      </TouchableOpacity>
      <Text style={{
        color:'white',
        marginTop:4
      }}>Note: By clicking continue, you will agree to our terms and conditions</Text>
      </View>
    </View>
  )
}
// const styles = StyleSheet.create({
//   image:{
//     width:210
//   },
//   button:{
//     padding:15,
//     backgroundColor:'white',
//     borderRadius:99

//   }
// })
