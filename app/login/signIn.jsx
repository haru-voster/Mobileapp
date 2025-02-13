import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'
import { TextInput } from 'react-native'
import {router, useRouter } from 'expo-router'


export default function SignIn(){
    const route = useRouter
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
            <TextInput placeholder='Email' style={styles.textInput}/>
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
             />

        </View>
        <TouchableOpacity style={styles.button}>
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