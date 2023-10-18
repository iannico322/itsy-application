import React from 'react'
import { Image, Text, View } from 'react-native'

const EmtScreen = () => {
  return (
    <View
              className = " flex-1 h-full mt-[30%] flex flex-col w-[90%] self-center items-center justify-center py-[20px]  "
            >
              <Image 
                  source={require('./../../../assets/images/Itsy_logo.png')} 
                  style={{ width: 60, height: 70 }} 
                  resizeMode='contain'
              />

              <Text 
                  className = " text-[15px] text-[#808080] text-center font-semibol leading-8 ">
                  Hey dear, I'm ITSY your culinary spider buddy! Share your items, and I'll weave dishes so snappy!
              </Text>

            </View>
  )
}

export default EmtScreen