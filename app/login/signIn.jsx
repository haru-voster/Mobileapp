import {View, Text, StyleSheet, Button, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constant/Colors'
import { TextInput } from 'react-native'
import {router, useRouter } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/FirebaseConfig'
import { use } from 'react'
import { setLocalStorage } from '../../service/Storage'


export default function SignIn(){
    const router= useRouter();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const OnSignInClick=()=>{

                
        if(!email||!password)
            {                
                Alert.alert('Please enter email & password')
                return;              
            }
    
        signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
           await setLocalStorage('userDetail', user);
            // ...
            router.replace('(tabs)')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode=='auth/invalid-credential')
            {
                Alert.alert('Invalid Email or Password')

            }
        });
    }

    return(
        <View style={{
            padding:25,
            color:'white'
        }}>
            <Text style={styles.textHeader}>Let's Sign you in</Text>
            <Text style={styles.subText}>Welcome Back</Text>
            <Text style={styles.subText}>You've been missed!</Text>
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
        onPress={OnSignInClick}
        >
            <Text style={{
                fontSize:17,
                color:"white",
                textAlign:'center'
            }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCreate}
        onPress={()=>router.push('login/signUp')}
        >
            <Text style={{
                fontSize:17,
                color:Colors.PRIMARY,
                textAlign:'center'
            }}>Create Account</Text>
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