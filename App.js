
import { Image, Text, TouchableOpacity, View, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Path, Svg } from 'react-native-svg';
import Input from './components/input/input';
import { useEffect, useRef, useState } from 'react';


export default function App() {

  const [menuActivate,setMenuActivate] = useState(false);

  const [messages,setMessages]= useState([])

  const [items,setItems] = useState({
    name:"",qk:""
  })
  

  const scrollViewRef = useRef();
  useEffect(()=>{
    console.log(menuActivate)
  },[menuActivate])

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('itsy-store', value);
    } catch (e) {
      // saving error
    }
  };

  


    const getData = async () => {
        const data = await AsyncStorage.getItem('itsy-store');
        return data
      
    };

    


  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);


  useEffect(() => {
    console.log(items)
  }, [items]);


  
  return (
    <View  className=" flex-1 w-screen bg-accent-foreground " style={{gap:2}}>
   
      <StatusBar
      barStyle="dark-content"
      />
      <View className=" flex justify-center w-full h-20  ">

        <Image
        className=" h-14 w-36 ml-5  "
        style={{resizeMode:"contain"}}
        source={require('./assets/images/Itsy_logo_w_text.png')}
        />
        
        

      </View>

      <View className="flex  flex-row w-full h-10 items-center    justify-center  " style={{gap:15}}>

        <TouchableOpacity className=" flex flex-row text-primary  items-center hover:text-[#3dd44b] hover:cursor-pointer  " onPress={()=>{
          setMenuActivate(false)
        }}  style={{gap:5}}>


        <Svg width="20" className=" text-primary " height="20"  viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
              fill="currentColor"
            />
          </Svg>
          
          <Text className=" text-primary text-base">Chat</Text>
        </TouchableOpacity>

        <Text>|</Text>

        <TouchableOpacity className=" flex flex-row-reverse text-primary  items-center hover:text-[#3dd44b] hover:cursor-pointer  " onPress={()=>{

          
          setMenuActivate(true)
        }}   style={{gap:5}} >
        <Svg width="20" className=" text-primary " height="20"  viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.75432 0.819537C7.59742 0.726821 7.4025 0.726821 7.24559 0.819537L1.74559 4.06954C1.59336 4.15949 1.49996 4.32317 1.49996 4.5C1.49996 4.67683 1.59336 4.84051 1.74559 4.93046L7.24559 8.18046C7.4025 8.27318 7.59742 8.27318 7.75432 8.18046L13.2543 4.93046C13.4066 4.84051 13.5 4.67683 13.5 4.5C13.5 4.32317 13.4066 4.15949 13.2543 4.06954L7.75432 0.819537ZM7.49996 7.16923L2.9828 4.5L7.49996 1.83077L12.0171 4.5L7.49996 7.16923ZM1.5695 7.49564C1.70998 7.2579 2.01659 7.17906 2.25432 7.31954L7.49996 10.4192L12.7456 7.31954C12.9833 7.17906 13.2899 7.2579 13.4304 7.49564C13.5709 7.73337 13.4921 8.03998 13.2543 8.18046L7.75432 11.4305C7.59742 11.5232 7.4025 11.5232 7.24559 11.4305L1.74559 8.18046C1.50786 8.03998 1.42901 7.73337 1.5695 7.49564ZM1.56949 10.4956C1.70998 10.2579 2.01658 10.1791 2.25432 10.3195L7.49996 13.4192L12.7456 10.3195C12.9833 10.1791 13.2899 10.2579 13.4304 10.4956C13.5709 10.7334 13.4921 11.04 13.2543 11.1805L7.75432 14.4305C7.59742 14.5232 7.4025 14.5232 7.24559 14.4305L1.74559 11.1805C1.50785 11.04 1.42901 10.7334 1.56949 10.4956Z"
              fill="currentColor"
            />
          </Svg>
          
          <Text className=" text-primary text-base">Menus</Text>
        </TouchableOpacity>


        
      </View>


      <View className="w-full h-full flex items-center  px-2  py-3 box-border">
        <View className=" flex flex-col w-full h-[82%] overflow-hidden bg-background rounded-lg border border-border/40 box-border items-center  p-2" style={{gap:10}} >


          <View className=" relative overflow-hidden w-full flex-1 rounded-md box-border border-primary-foreground border flex " >


            <SafeAreaView className=" flex-1 w-full h-full">
         
            <ScrollView className=" flex flex-col  h-[1000px] w-full " ref={scrollViewRef} style={{gap:5}} >

            {messages.map((e,key)=>(
              <View key={key} className=" flex items-center justify-center bg-background border-b border-border h-[100px] w-full ">
                <Text>{e}</Text>
                
            </View>
            ))}
            

           
            </ScrollView>
            </SafeAreaView>

          </View>
          <View className=" flex w-full h-[160px]  box-border" >
            <View className=" relative flex flex-row w-full  flex-1  items-end mb-5 " style={{gap:10}}>
              
              <View className=" w-[40%]">
                <Input
                label="Name"
                placeholder="e.g Banana"
                name="name"
                onChangeText={(e)=>{
                  setItems({...items,name: e})
                }}
                value={items.name}
                />
              </View>
              <View className=" relative w-[30%]">
                <Input
                label="Quantity"
                placeholder="e.g 1pcs"
                name="qk"
                value={items.qk}
                onChangeText={(e)=>{
                  setItems({...items,qk: e})
                }}
                />
              </View>

              <View className=" h-full flex-1 flex-col justify-end items-end" style={{gap:5}}>

                <TouchableOpacity className=" h-10 w-14 bg-background border border-border/60 rounded-md flex items-center justify-center">
              <Text className=" text-primary">+ Pref</Text>

              </TouchableOpacity>

              <TouchableOpacity className=" w-full  h-12 bg-primary-foreground rounded-md flex items-center justify-center" onPress={()=>{

                setItems({
                  name:"",qk:""
                })

getData().then((data)=>{
  console.log(data)
})
               
                setMessages([...messages,`${items.qk} ${items.name}` ])
              }}>
              <Text className=" text-background">Add</Text>

              </TouchableOpacity>
              </View>
              
              
              
            </View>
            
            <View className=" flex w-full flex-row" style={{gap:5}}>

            <TouchableOpacity className="w-[50px] h-12 bg-background border border-border/40 rounded-md flex items-center justify-center" onPress={()=>{
                     
                    }}>
                     <Svg width="20" className=" text-primary " height="20"  viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.36052 0.72921C8.55578 0.533948 8.87236 0.533948 9.06763 0.72921L14.2708 5.93235C14.466 6.12761 14.466 6.4442 14.2708 6.63946L8.95513 11.9551L7.3466 13.5636C6.76081 14.1494 5.81106 14.1494 5.22528 13.5636L1.43635 9.7747C0.850563 9.18891 0.850563 8.23917 1.43635 7.65338L3.04488 6.04485L8.36052 0.72921ZM8.71407 1.78987L4.10554 6.3984L8.60157 10.8944L13.2101 6.28591L8.71407 1.78987ZM7.89447 11.6015L3.39843 7.10551L2.14346 8.36049C1.94819 8.55575 1.94819 8.87233 2.14346 9.06759L5.93238 12.8565C6.12765 13.0518 6.44423 13.0518 6.63949 12.8565L7.89447 11.6015Z"
              fill="currentColor"
            />
          </Svg>

                    </TouchableOpacity>

        <TouchableOpacity className="w-full h-12 flex-1 bg-primary-foreground rounded-md flex items-center justify-center" onPress={()=>{
                      storeData("banana")
                    }}>
                      <Text className=" text-background">Generate</Text>

                    </TouchableOpacity>
            </View>
            

          </View>

        </View>

      </View>


      {/* <Svg width="20" className=" text-primary-foreground" height="20"  viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
              fill="currentColor"
            />
          </Svg> */}
     
    </View>
  );
}

