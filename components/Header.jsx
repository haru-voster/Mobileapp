import {View, Text, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import {getLocalStorage} from '../service/Storage'
export default function Header(){

    const [user, setUser] = useState();
    useEffect(()=>{
        GetUserDetail();
    },[])

    const GetUserDetail=async()=>{
        const userInfo=await getLocalStorage('userDetail');
        console.log(userInfo);
        setUser(userInfo);

    }

    return(
        <View style={{
           marginTop:20
        }}>
        <View style={{
             alignItems:'center',
             gap:10,
             display:'flex',
             flexDirection:'row'
        }}>
            <Image source={require('./../assets/images/smiley.png')}
            style={{
                width:45,
                height:45
            }}
            />
        <Text style={{
            fontSize:25,
            fontWeight:'bold'
        }}>Hello {user?.displayName}👋</Text>
        </View>
        </View>
    )
}