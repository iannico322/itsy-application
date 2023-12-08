import { useEffect, useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import { setLocalStorage } from "../tempDB";





const Preferences = ({ Close }) => {
  const [checked, setChecked] = useState([
    {
      prefState:true,
      prefName: "Simple",
    },
    {
      prefState:false,
      prefName: "Filipino",
    },
    {
      prefState: false,
      prefName: "Comfort Food",
    },
    {
      prefState:false,
      prefName: "Healthy",
    },
    {
      prefState:false,
      prefName: "Vegetarian",
    },
    {
      prefState:false,
      prefName: "Low-Carb",
    },
  ]);


  // useEffect(()=>{
  //   const checkedPrefs = checked.filter(item => item.prefState).map(item => item.prefName);
  //   console.log(checkedPrefs);
  // },[checked])

  const toggleCheck = (index) => {
    const updatedSwitches = [...checked];
    updatedSwitches[index] = {
      ...updatedSwitches[index],
      prefState: !updatedSwitches[index].prefState,
    };
    setChecked(updatedSwitches);
    const checkedPrefs = checked.filter(item => item.prefState).map(item => item.prefName);
    
    setLocalStorage("SelectedPrefence",JSON.stringify(checkedPrefs.join(', ')))
    
    
    
  };
  return (
    <View className=" w-[80%] min-h-[10%] max-h-[50%] rounded-md p-5 bg-[#ffffff] shadow-xl ">
      <View className=" flex flex-row justify-between items-center ">
        <Text className=" text-[25px] text-center text-foreground mb-3 font-semibold">
          Dish Preferences
        </Text>

        <TouchableOpacity className=" flex items-center justify-center h-[20px] w-[20px] mb-2 p-6 " onPress={Close}>
          <Svg
            width="20"
            className=" text-primary"
            height="20"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
              fill="currentColor"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <ScrollView className="">
        {checked.map((e, index) => (
          <View key={index} className=" flex flex-row items-center">
            <Switch value={e.prefState} onValueChange={() => toggleCheck(index)} style={{borderColor:"green"}} />
            <Text className=" text-border text-[15px]">{e.prefName}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Preferences;
