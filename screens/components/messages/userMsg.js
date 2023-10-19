
import React from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import { Path, Svg } from 'react-native-svg';


function UserMSG({ e, onDelete, mkey }) {
  return (
    <View className=" flex-1  w-[100%] min-h-[15px] flex flex-row items-center justify-end py-3">
      <View className="px-5 py-2 max-w-[80%]  mr-5 text-base text-white rounded-lg bg-[#3dd44b]">
       
        {e.image ? (
          
          <>
            <Text className="text-white/80 text-sm italic md:not-italic mb-2">{e.message }</Text>
            <Image
            
              className="  rounded-lg  "
              style={{minHeight:130,objectFit:"contain",minWidth:0}}
              source={{ uri:  e.image }}
            />
          </>
        ) : null}

        {!e.image ? 
        <View className="flex flex-col gap-0 ">
          <Text className="text-white/80 text-sm italic mb-2">{e.message}</Text>

          <View key={mkey} className="bg-background pt-4 border-border rounded-md pb-2">
          <View className=" flex flex-row">

            <View className = " w-[33%] justify-center items-center ">
            <Text className= "font-semibold text-[13px]">Name</Text>
            </View>

            <View className = " w-[33%] justify-center items-center ">
            <Text className= "font-semibold text-[13px]">Quantity</Text>
            </View>

            <View className = " w-[33%] justify-center items-center ">
            <Text className= "font-semibold text-[13px]">Action</Text>
            </View>

            </View>

            {e.products.map((z, key2) => (
              <View className=" w-full h-10 justify-center  flex items-center flex-row bg-background rounded-md mt-1" key={key2}>
                                
              <View className="w-[33%]">
                <Text className=" text-center text-[12px] text-[#808080] font-bold">{z.itemName}</Text> 
              </View>

              <View className="w-[33%]">
                <Text className=" text-center text-[12px] text-[#808080] font-bold">{z.itemQK}</Text> 
              </View>

              <View className="w-[33%] flex justify-center items-center">

                <TouchableOpacity
                    onPress={()=> onDelete(mkey, key2)}
                >
                  
                  <Svg
                    width="18"
                    className=" text-primary text-sm"
                    height="20"
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                      fill="currentColor"
                    />

                  </Svg>
                </TouchableOpacity>

              </View>        
                                    


            </View>
            ))}

            
          </View>
        </View>
        : null}
      </View>
    </View>
  );
}

export default UserMSG;
