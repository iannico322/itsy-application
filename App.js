import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
  Animated,
  Easing,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Path, Svg } from "react-native-svg";
import Input from "./screens/components/input/input";
import { useEffect, useRef, useState } from "react";
import GenerateMenus from "./screens/generateMenus";
import sampleData from "./sampleData";
import Preferences from "./screens/preferences/preferences";
import EmtScreen from "./screens/components/messages/EmtScreen";
import AIMSG from "./screens/components/messages/AIMsg";
import UserMSG from "./screens/components/messages/userMsg";
import SetUp,{getLocalStorage,setLocalStorage} from "./screens/tempDB";
import OpenAIText,{cancelRequest} from "./screens/API's/OpenAIText";
import CameraITSY from "./screens/components/camera/camera";

// import UserMSG from "./components/messages/userMsg";

// di mugana ang MUI sa akoa
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';


// import CheckBox from '@react-native-community/checkbox';


export default function App() {

  // useEffect(  ()=>{
  //    SetUp()
  // },[])
 
  SetUp()

  const [menuActivate, setMenuActivate] = useState(false);
   
  const [messages, setMessages] = useState([]);
  const [menus,setMenus] = useState([]);



  useEffect(() => {

    
      getLocalStorage("messages").then(value => {
        setMessages(JSON.parse(value))
      });

      getLocalStorage("menus").then(value => {
        setMenus(JSON.parse(value))
      });

  }, []);


  const scrollViewRef = useRef();
 
  const [loading,SetLoading]= useState(false)  


  const [showFoodPref, setShowFoodPref] = useState(false)
 

  const selectPreferences = () => {
      console.log("Select Preference button clicked!")
      setShowFoodPref(true)
  }




  const [showNotif,setShowNotif]= useState(false)

  const [items, setItem] = useState({
    name: "",
    qk: "",
  });


  useEffect(() => {
    console.log("Menu activated?", menuActivate);
  }, [menuActivate]);

  

  function addItems() {

    if (items.name=="" || items.qk=="") {
      Alert.alert(
        'Oopsie My Dear!',
        'Hold on, sweetie! Make sure all the little boxes are filled.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        { cancelable: false }
      );
    }
    else{

      messages.map((e) =>
      setMessages([
        ...messages,
        {
          products: [
            ...e.products,
            { itemsName: `${items.name}`, itemsQK: `${items.qk}` },
          ],
          message: "This is my updated Item",
          direction: "outgoing",
          role: "user",
          image: "",
        },
      ]))

      }
      setItem({
        name: "",
        qk: "",
      })
  }






  function replyChatBeforeRES() {
    messages.map((e) =>
      setMessages([
        ...messages,
        {
          products: [...e.products],
          message: `🕸️Hello, dear! Like a diligent spider 🕷️, I’m spinning your menus. Your patience is as precious as dew on a web. I’m fetching your menus! 🌼

          Please wait while I’m searching for your menus…`,
          direction: "outgoing",
          role: "assistant",
          image: "",
        },
      ])
    );
  }


  const Erase=()=>{
    AsyncStorage.clear()
    setMessages([ {
      role: "itsy",
      products: [],
      message:
        "Hey dear, I'm ITSY your culinary spider buddy! share your items, and I'll weave dishes so snappy!",
      direction: "",
      image: "",
    }])
  }


  //Handle Delete Items
  function deleteItem(indexMain, indexToDelete) {
    messages[indexMain].products.splice(indexToDelete, 1);

    setMessages([...messages, messages[indexMain]]);
    console.log(messages[indexMain], "Success Delete", indexMain);
  }
  

  // Function to scroll to the bottom of the ScrollView
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };



  useEffect(() => {
    scrollToBottom();
    scrollViewRef.current?.scrollToEnd({ animated: true });
    setLocalStorage("messages",JSON.stringify(messages))
  }, [messages]);

  
  useEffect(() => {
    
    setLocalStorage("menus",JSON.stringify(menus))
  }, [menus]);


  // useEffect(() =>{
  //   console.log("Items", items)
  //   console.log("Messages", messages)
  // },[])


    //Spinning Loading for stop responding
    const spinValue = new Animated.Value(0);
    const spin =()=>{
      spinValue.setValue(0);
      Animated.loop(
        Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(()=>spin())
      )
    }
    useEffect(() => {
      spin()
    }, [spin]);
    const rotate = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    })
    
    const [showCamera,setShowCamera] = useState(false)


  return (
    <View className=" flex-1 h-full w-full relative">
    <View className={showCamera?" z-50 flex-1 h-full w-full absolute":" hidden"}>

      <CameraITSY isCameraOn={showCamera} offCamera={()=>{
        setShowCamera(false)
      }}/>
    </View>
    
    <View className={showCamera?"hidden":" relative flex-1 w-screen bg-accent-foreground z-0 "} style={{ gap: 2 }}>






      <StatusBar barStyle="dark-content" />
      <View className=" flex justify-center w-full h-20  ">
        <Image
          className=" h-14 w-36 ml-5  "
          style={{ resizeMode: "contain" }}
          source={require("./assets/images/Itsy_logo_w_text.png")}
        />
      </View>

      <View
        className="flex  flex-row w-full h-10 items-center    justify-center  "
        style={{ gap: 15 }}
      >
        <TouchableOpacity
          className=" flex flex-row text-primary  items-center hover:text-[#3dd44b] hover:cursor-pointer  "
          onPress={() => {
            setMenuActivate(false);
          }}
          style={{ gap: 5 }}
        >
          <Svg
            width="17"
            className={!menuActivate?" text-primary-foreground text-sm":" text-primary text-sm"}
            height="20"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
              fill="currentColor"
            />
          </Svg>

          <Text className={!menuActivate?" text-primary-foreground text-sm font-bold":" text-primary text-sm"}>Chat</Text>
        </TouchableOpacity>

        <Text>|</Text>

          
        <TouchableOpacity
          className=" flex flex-row-reverse text-primary  items-center  hover:cursor-pointer  "
          onPress={() => {
            setMenuActivate(true);
            setShowNotif(false)
          }}
          style={{ gap: 5 }}
        >
          <View className={showNotif?" absolute z-10 translate-y-[-10px] translate-x-2 h-5 w-5 flex items-center justify-center rounded-full  bg-red-600":"hidden"}>
             <Text className=" text-background text-[10px]">{menus.length }+</Text>
          </View>
          <Svg
            width="18"
            className={menuActivate?" text-primary-foreground text-sm":" text-primary text-sm"}
            height="20"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.75432 0.819537C7.59742 0.726821 7.4025 0.726821 7.24559 0.819537L1.74559 4.06954C1.59336 4.15949 1.49996 4.32317 1.49996 4.5C1.49996 4.67683 1.59336 4.84051 1.74559 4.93046L7.24559 8.18046C7.4025 8.27318 7.59742 8.27318 7.75432 8.18046L13.2543 4.93046C13.4066 4.84051 13.5 4.67683 13.5 4.5C13.5 4.32317 13.4066 4.15949 13.2543 4.06954L7.75432 0.819537ZM7.49996 7.16923L2.9828 4.5L7.49996 1.83077L12.0171 4.5L7.49996 7.16923ZM1.5695 7.49564C1.70998 7.2579 2.01659 7.17906 2.25432 7.31954L7.49996 10.4192L12.7456 7.31954C12.9833 7.17906 13.2899 7.2579 13.4304 7.49564C13.5709 7.73337 13.4921 8.03998 13.2543 8.18046L7.75432 11.4305C7.59742 11.5232 7.4025 11.5232 7.24559 11.4305L1.74559 8.18046C1.50786 8.03998 1.42901 7.73337 1.5695 7.49564ZM1.56949 10.4956C1.70998 10.2579 2.01658 10.1791 2.25432 10.3195L7.49996 13.4192L12.7456 10.3195C12.9833 10.1791 13.2899 10.2579 13.4304 10.4956C13.5709 10.7334 13.4921 11.04 13.2543 11.1805L7.75432 14.4305C7.59742 14.5232 7.4025 14.5232 7.24559 14.4305L1.74559 11.1805C1.50785 11.04 1.42901 10.7334 1.56949 10.4956Z"
              fill="currentColor"
            />
          </Svg>

          

          <Text className={menuActivate?" text-primary-foreground text-sm font-bold":" text-primary text-sm"}>Menus</Text>
        </TouchableOpacity>
      </View>

      <View className="w-full h-full flex items-center  px-2  py-3 box-border relative">
        <View
          className={
            menuActivate
              ? "  absolute z-1 flex flex-col w-full h-[82%] overflow-hidden  rounded-lg border border-border/40 box-border items-center  p-2 "
              : " hidden "
          }
        >
          
          <GenerateMenus
            menus={menus}
          />
        </View>


        <View className={
            menuActivate
              ? " hidden"
              : " relative flex flex-col w-full h-[82%] overflow-hidden bg-background rounded-lg border border-border/40 box-border items-center   "
          }>

       
        <View className="  absolute z-10  h-full w-full p-2 "  pointerEvents="box-none"  >
        <View className=" overflow-hidden w-full h-full  flex-1 rounded-md  flex z-50"  pointerEvents="box-none"     >
            
            <View className=" absolute  bottom-0 right-0 mb-5 mr-2  w-24 h-12 border border-border/30 bg-background/60 rounded-md flex items-center flex-row  justify-center z-40" pointerEvents="auto">

            
            <TouchableOpacity
                  className="  w-24 h-12 border border-border/30 bg-background/60 rounded-md flex items-center flex-row  justify-center z-40 "
                  onPress={()=>{
                    setShowCamera(true)
                  }}
                 
                >
                  <Svg
                  width="20"
                  className=" text-primary mr-2 "
                  height="20"
                  viewBox="0 0 15 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
                    fill="currentColor"
                  />
                </Svg>

                  <Text className=" text-primary">Upload</Text>
                </TouchableOpacity>
                </View>

          </View>
          <View className=" flex w-full h-[160px]  box-border">

          </View>

            
          </View>  
        <View
          className=" relative p-2 "
          
          style={{ gap: 10 }}
        >

          
          
          
          <View className=" relative overflow-hidden w-full flex-1 rounded-md box-border border-primary-foreground border flex ">
          <SafeAreaView>
            <ScrollView  ref={scrollViewRef}>
            {messages.length >= 2 ? (
                  messages.map((e, key) =>
                    e.role != "user" ? (
                      <AIMSG e={e} key={key} />
                    ) : (
                      <UserMSG
                        e={e}
                        mkey={key}
                        key={key}
                        onDelete={deleteItem}
                      />
                    )
                  )
                ) : (
                  <EmtScreen />
                )}



            </ScrollView>
            
          </SafeAreaView>  
          

          </View>
          <View className=" flex w-full h-[160px]  box-border">
            <View
              className=" relative flex flex-row w-full  flex-1  items-end mb-5 "
              style={{ gap: 10 }}
            >
              <View className=" w-[40%]">
                <Input
                  label="Name"
                  placeholder="e.g Banana"
                  name="name"
                  onChangeText={(e) => {
                    setItem({ ...items, name: e });
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
                  onChangeText={(e) => {
                    setItem({ ...items, qk: e });
                  }}
                />
              </View>


              <View
                className=" h-full flex-1 flex-col justify-end items-end"
                style={{ gap: 5 }}
              >
                <TouchableOpacity 
                  onPress={selectPreferences}
                  className=" h-10 w-14 bg-background border border-border/60 rounded-md flex items-center justify-center"
                >
                  <Text className=" text-primary">+ Pref</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className=" w-full  h-12 bg-primary-foreground rounded-md flex items-center justify-center"
                  onPress= {addItems}
                >

                  <Text className=" text-background">Add</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Stop responding */}
            <View className=" z-10 w-full h-[2px] relative justify-center items-center">


              <TouchableOpacity 
                disabled = {loading ? false : true}
                className = { loading ? "w-[190px] h-[45px] bg-background flex flex-row justify-center items-center rounded-md" : "hidden"}
                onPress={()=>{
                  SetLoading(false)
                  cancelRequest()
                }}
              >
              <Animated.View style={{transform: [{rotate}]}}>
                <Svg
                    width="17"
                    className= "text-border text-sm animate-spin"
                    height="20"
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.5 2H2.5C2.22386 2 2 2.22386 2 2.5V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V2.5C13 2.22386 12.7761 2 12.5 2ZM2.5 1C1.67157 1 1 1.67157 1 2.5V12.5C1 13.3284 1.67157 14 2.5 14H12.5C13.3284 14 14 13.3284 14 12.5V2.5C14 1.67157 13.3284 1 12.5 1H2.5Z"
                      fill="currentColor"
                  />
                  </Svg>
                  {/* <Image style={{width: 50, height: 50}} source={require('./assets/images/book.png')} /> */}
              </Animated.View>

                <Text className=" text-border text-[15px] ml-4">Stop Responding</Text>
              </TouchableOpacity>

            </View>





            {/* Erase the data on local storage */}
            <View className=" flex w-full flex-row" style={{ gap: 5 }}>
              <TouchableOpacity
                className="w-[50px] h-12 bg-background border border-border/40 rounded-md flex items-center justify-center"
                onPress={()=>{
                  Alert.alert(
                    'Erase',
                    "Sure to erase? No magic can bring it back!",
                    [
                      {
                        text: "Hold on, I want to cancel",
                        style: 'cancel',
                      },
                      {
                        text: 'Sure, go for it!',
                        style: 'default',
                        onPress: ()=>{
                          Erase()
                        },
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Svg
                  width="20"
                  className=" text-primary "
                  height="20"
                  viewBox="0 0 15 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.36052 0.72921C8.55578 0.533948 8.87236 0.533948 9.06763 0.72921L14.2708 5.93235C14.466 6.12761 14.466 6.4442 14.2708 6.63946L8.95513 11.9551L7.3466 13.5636C6.76081 14.1494 5.81106 14.1494 5.22528 13.5636L1.43635 9.7747C0.850563 9.18891 0.850563 8.23917 1.43635 7.65338L3.04488 6.04485L8.36052 0.72921ZM8.71407 1.78987L4.10554 6.3984L8.60157 10.8944L13.2101 6.28591L8.71407 1.78987ZM7.89447 11.6015L3.39843 7.10551L2.14346 8.36049C1.94819 8.55575 1.94819 8.87233 2.14346 9.06759L5.93238 12.8565C6.12765 13.0518 6.44423 13.0518 6.63949 12.8565L7.89447 11.6015Z"
                    fill="currentColor"
                  />
                </Svg>
              </TouchableOpacity>

              
              <TouchableOpacity
                disabled = {loading ? true : false}
                className= { loading ? "bg-[#9eec98] w-full h-12 flex-1 rounded-md flex items-center justify-center pointer-events-none" : "w-full h-12 flex-1 bg-primary-foreground rounded-md flex items-center justify-center"}
                onPress={() => {
                  
                  SetLoading(true)
                  console.log("loading", loading)

                  replyChatBeforeRES();
                  let product =[]
                  
                  messages[messages.length - 1].products.map(
                    (e) =>
                      (product = [...product, `${e.itemsQK} ${e.itemsName}`])
                  )

                
                  
                  OpenAIText({ product: `${product.join(" ")}` }).then((result ) => {
                    console.log("Menu API Response");
                    
                      // Alerts
                      if (result.length == 0) {
                        SetLoading(false);
                        Alert.alert(
                          'Stop Responding!',
                          'Your request for cancellation of generating the menu has been successfully implemented',
                          [
                            {
                              text: 'OK',
                              onPress: () => SetLoading(false),
                            },
                          ],
                          { cancelable: false }
                        );
                        }else{
                          SetLoading(false);
                          Alert.alert(
                            'Spider Buddy 🕷️',
                            "Hey there, buddy! Your menus are all set to roll. Time for some delicious 🕷️🍔!",
                            [
                              {
                                text: 'Got it!',
                                onPress : () => SetLoading(false),
                              },
                            ],
                            { cancelable: false }
                          );
                        }

                      // SetLoading(false);
                      setShowNotif(true)
                      setMenus(result);
                      console.log(result,"REST API")
                      // toast({
                      //   title: "DONE... ",
                      //   description: "Here are your menus",
                      // });

                      


                      if (result) {
              
                        console.log("Inside the result")

                        let menus_name = [];

                        result.map((e, key) => {
                          menus_name = [
                            ...menus_name,
                            `${key + 1}. ${e.name}`,
                          ];
                        });

                        messages.map((e) =>
                          setMessages([
                            ...messages,
                            {
                              products: [...e.products],
                              message: `🕸️Hello, dear! Like a diligent spider 🕷️, your menus are spun. Thanks for your patience, as precious as dew on a web. Enjoy your menus!
        
Here are your menus:
${menus_name.join(" \n")}`,
                              direction: "outgoing",
                              role: "assistant",
                              image: "",
                            },
                          ])
                        ); 

                      }
                    
                  }).catch((error) => {
                    // SetLoading(false);
                    console.log(error);
                  });

                  
                }}
              >
               

                <Text className= " text-background " >Generate Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        </View>      

      </View>



        {/* Selecting food preferences */}
        <View className={ showFoodPref ? " w-screen h-screen absolute justify-center items-center bg-[#00000099]" : "hidden"}>
              <Preferences
              Close={()=>{
                setShowFoodPref(false)
              }}
              />
          </View>




    </View>
    </View>
  );
}


