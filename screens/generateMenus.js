import React from 'react'
import { Text ,View } from 'react-native'


const GenerateMenus = (props) => {
  return (
   <View>


    {
        props.items.map((e,key)=>(

            <View>
<Text >{e.name}</Text>

            <Text>{e.qk}</Text>
            </View>
            

        )
        
        )
    }



     
   </View>
  )
}

export default GenerateMenus