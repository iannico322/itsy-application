import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from "react-native-svg";
import { getLocalStorage,LogOut } from '../../tempDB';


const Nav = ({navigation}) => {
    const [navActivate,setNavActivate]=useState(false)
    const [user, setUser] = React.useState(0);

    useEffect(()=>{
        getLocalStorage("user").then(value => {
            setUser(JSON.parse(value))
          });

    },[])

   
  return (
    <View className="relative flex flex-col">

        
        <TouchableOpacity
          className= " relative min-w-[0px] flex h-10 px-2 flex-row justify-between items-center bg-white border-[1px] border-[#9191911c] rounded-md"
          onPress={()=>{
            setNavActivate(!navActivate)
          }}
        >
        <Text className="text-black" >{user? user.first_name:""}</Text>
        
        {
          !navActivate?
          <Svg
            width="17"
            className=" text-primary text-sm"
            height="15"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
              fill="currentColor"
            />
            
            
          </Svg>
          :
          <Svg
            width="17"
            className=" text-primary text-sm"
            height="15"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z"
              fill="currentColor"
            />
            
            
          </Svg>

        }
       
        
        </TouchableOpacity>

        <View className={navActivate?" absolute mt-12 rounded-md min-h-[160px] top-0 w-[160px] bg-white border-[1px] border-border/20 flex flex-col p-2":"hidden"} style={{gap:5}}>
          <TouchableOpacity className="h-[65%] p-2 flex flex-col justify-end bg-slate-600/20 rounded-md"
          onPress={()=>{
            setNavActivate(!navActivate)

          }}
          >
            <Text className=" text-base">{user? user.first_name:""} {user? user.last_name:""}</Text>
            <Text className=" text-[8px] italic text-black/40">{user? user.email:""}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="h-[30%] p-2 flex flex-col justify-end bg-slate-600/5 rounded-md"
          onPress={()=>{
           navigation.navigate("Itsy")
           LogOut()
           setNavActivate(false)
          }}
          >
            <Text className=" text-sm">Logout</Text>
            <Text className=" text-[8px] italic text-black/40">This will exit your account</Text>
          </TouchableOpacity>

        </View>
        </View>
  )
}

export default Nav