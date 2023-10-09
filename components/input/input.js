import React from 'react'
import { Text, TextInput, View } from 'react-native'

const Input = (props) => {
  return (
    <View className=" relative w-full h-12 flex flex-col " style={{gap:5}}>
        <Text>{props.label}</Text>
        <TextInput 
        className=" w-full"
        style={{height: 48,
            width:"100%",
            
            borderWidth: 1,
            borderColor:"#91919180",
           
            borderRadius:5,
            padding: 10}}
            placeholder={props.placeholder}
            value={props.value}
            name={props.name}
            onChangeText={props.onChangeText}
          
        
        />
    </View>
  )
}

export default Input