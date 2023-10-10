// import { TouchableOpacity, View, Text } from "react-native";

// function UserMSG({onDelete, mkey}){
//     return(
//         <View className="  bg-foreground w-[85%] rounded-md flex flex-col justify-center items-center pt-2 pb-4 ">
//                       <Text className=" text-[#ffffff] text-[16px] font-semibold text-center">This is my updated items</Text>

//                       <View className=" w-[85%] bg-background rounded-md mt-2 pt-1 pb-2">  

//                         <View className=" flex flex-row">

//                           <View className = " w-[33%] justify-center items-center ">
//                             <Text className= "font-semibold text-[13px]">Name</Text>
//                           </View>

//                           <View className = " w-[33%] justify-center items-center ">
//                             <Text className= "font-semibold text-[13px]">Quantity</Text>
//                           </View>

//                           <View className = " w-[33%] justify-center items-center ">
//                             <Text className= "font-semibold text-[13px]">Action</Text>
//                           </View>

//                         </View>

//                         {product.map((z, key, key2) => (
//                             <View className=" w-full  flex items-center flex-row bg-background rounded-md mt-1" key={key}>
                                
//                               <View className="w-[33%]">
//                                 <Text className=" text-center text-[12px] text-[#808080] font-bold">{z.itemsName}</Text> 
//                               </View>

//                               <View className="w-[33%]">
//                                 <Text className=" text-center text-[12px] text-[#808080] font-bold">{z.itemsQK}</Text> 
//                               </View>

//                               <View className="w-[33%] flex justify-center items-center">

//                                 <TouchableOpacity
//                                     onPress={() => onDelete(mkey, key2)}
//                                 >
                                  
//                                   <Svg
//                                     width="18"
//                                     className={menuActivate?" text-primary-foreground text-sm":" text-primary text-sm"}
//                                     height="20"
//                                     viewBox="0 0 15 15"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                   >
//                                     <Path
//                                       fill-rule="evenodd"
//                                       clip-rule="evenodd"
//                                       d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
//                                       fill="currentColor"
//                                     />

//                                   </Svg>
//                                 </TouchableOpacity>
                
//                               </View>        
                                                    

//                               {/* <Text>{item}</Text> */}
//                             </View>
//                       ))}


//                     </View>   
                
//                   </View>
//     )
// }

// export default UserMSG;