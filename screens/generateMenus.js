import { useState } from "react";
import { Text, View,TouchableOpacity, Image, SafeAreaView,
  ScrollView } from "react-native";
import ItsyLogo from './../assets/images/Itsy_logo.png'
const GenerateMenus = (props) => {
  const [showView,setShowView]=useState(false)

  const [selectedMenu,SetSelectedMenu]= useState({
    cooking_steps:[],ingredients:[],name:""
  })

  return (
    <View className="flex-1 w-full">
      <View className={showView?" w-full h-full ":"hidden"}>



      {/* HEADER PORTION */}
        <View className=" relative w-full mt-4 flex  items-center flex-row justify-between  box-border">
          <View className="flex w-[70%] min-h-0 flex-row items-center" style={{gap:10}}>
            <Image
            className=" h-[60px] w-[60px] object-contain"
            source={ItsyLogo}
            />
            <View className=" text-ellipsis truncate">
              <Text className=" text-primary-foreground text-sm">ITSY</Text>
              <Text className=" text-base font-bold w-[70%]   ">👨‍🍳{selectedMenu.name}</Text>
              {console.log(selectedMenu)}
              <Text className=' text-xs mt-2 sm:mt-0'> Good for {selectedMenu.serves} </Text>
            </View>
            
          </View>

          <TouchableOpacity className=" rounded-lg h-10 w-16 bg-primary-foreground flex items-center justify-center" onPress={()=>{
            setShowView(false)
          }}>
              <Text className="text-background tex">Back</Text>
          </TouchableOpacity>
        </View>
{/* HEADER PORTION */}

<SafeAreaView className="flex-1 mt-7">
  <ScrollView className="bg-background">

    <View>
    <Text className=" font-bold text-lg mb-5 ml-3">Ingredients:</Text>
      {selectedMenu.ingredients.map((e,key)=>(

        <Text key={key} className="text-sm ml-10">📙{e}</Text>
      ))}
      
    </View>

    <View className="mb-10 mt-8">
    <Text className=" font-bold text-lg mb-5 ml-3">Cooking Steps:</Text>
    <View style={{gap:5}}>
      {selectedMenu.cooking_steps.map((e,key)=>(

        <Text key={key} className="text-sm ml-10">{e}</Text>
      ))}
      </View>
      
    </View>

  </ScrollView>
</SafeAreaView>






      </View>


    <View  className="flex flex-1 h-full w-full" style={{gap:10}}>
      <View className=" min-h-0 w-full flex items-center">
        <Text className=" font-bold text-lg"> Food You can cook </Text>
        <Text className=" text-border"> Click view to view recipe and cooking steps</Text>
      </View>

      <View className=" w-full flex-1 border border-primary-foreground rounded-md flex items-center p-4" style={{gap:10}}>
      {
      
      props.menus?
      props.menus.map((e, key) => (
        <View key={key} className=" w-full flex flex-row items-center justify-between">
          <Text className=" text-primary text-base capitalize w-[70%] ">{key+1}. {e.name}</Text>

          <TouchableOpacity className=" bg-primary-foreground h-10 w-16 flex items-center justify-center rounded-lg" onPress={()=>{
            setShowView(true)
            SetSelectedMenu(e)
          }}>
            <Text className=" text-background ">View</Text>
          </TouchableOpacity>
        </View>
      ))
      :""
      
      }



      </View>
      
    </View>
    </View>
    
  );
};

export default GenerateMenus;
