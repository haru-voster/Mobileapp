import {View, Text, StyleSheet, Button, TouchableOpacity, ToastAndroid, Alert} from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'
import { TextInput } from 'react-native'
import {auth} from './../../config/FirebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setLocalStorage } from '../../service/Storage'

export default function SignUp(){

const router=useRouter();
const [email, setEmail]=useState();
const [password, setPassword]=useState();
const [userName, setUserName] = useState();

const onCreateAccount=()=>{
 
if(!email||!password||!userName)
{
    ToastAndroid.show('Please fill all fields ', ToastAndroid.BOTTOM)
    Alert.alert('Please enter email/password')
    return;
}
createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    await updateProfile(user,{
        displayName:userName
    })
    await setLocalStorage('userDetail', user);
    router.push('(tabs)')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    if(errorCode=='auth/email-already-in-use')
    {
        ToastAndroid.show('Email already exist', ToastAndroid.BOTTOM);
        Alert.alert('Email already exists')
    }
    // ..


  });
}
    return(
        <View style={{
            padding:25,
            color:'white'
        }}>
            <Text style={styles.textHeader}>Create Your Account</Text>
           
        <View style={{
            marginTop:25
        }}>
            <Text >Full Name</Text>
            <TextInput placeholder='Full name' 
            onChangeText={(value)=> setUserName(value)}
            style={styles.textInput}/>
        </View>
        <View style={{
            marginTop:25
        }}>
            <Text style={{
               
                marginTop:25
            }}>
                Email
            </Text>
            <TextInput placeholder='Email' style={styles.textInput}
            onChangeText={(value)=>setEmail(value)}
            />
        </View>
        <View style={{
            marginTop:25
        }}>
            <Text style={{
               
                marginTop:25
            }}>
                Password
            </Text>
            <TextInput placeholder='Enter Password'
            secureTextEntry={true}
             style={styles.textInput}
             onChangeText={(value)=>setPassword(value)}
             />

        </View>
        <TouchableOpacity style={styles.button}
        onPress={onCreateAccount}
        >
            <Text style={{
                fontSize:17,
                color:"white",
                textAlign:'center'
            }}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCreate}
        onPress={()=>router.push('login/signIn')}
        >
            <Text style={{
                fontSize:17,
                color:Colors.PRIMARY,
                textAlign:'center'
            }}>Already account, Sign in</Text>
        </TouchableOpacity>
        
        </View>
    )
}
const styles = StyleSheet.create({
    textHeader:{
        fontSize:30,
        fontWeight:'bold'
    },
    subText:{
        fontSize:30,
        fontWeight:'bold',
        marginTop:10,
        color:Colors.GRAY
    },
    textInput:{
        padding:10,
        borderWidth:1,
        marginTop:5,
        borderRadius:10,
        borderWidth:1,
        backgroundColor:"white"
    },
    button:{
        padding:20,
        backgroundColor:Colors.PRIMARY,
        borderRadius:10,
        marginTop:35
    },
    buttonCreate:{
        padding:20,
        backgroundColor:'white',
        borderRadius:10,
        marginTop:20,
        borderWidth:1,
        borderColor:Colors.PRIMARY
    }
})