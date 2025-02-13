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
        <View>
        <View>
            <Image source={require('./../assets/images/smiley.png')}
            style={{
                width:45,
                height:45
            }}
            />
        <Text>Hello {user?.displayName}</Text>
        </View>
        </View>
    )
}