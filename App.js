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

import { Path, Svg } from "react-native-svg";
import Input from "./screens/components/input/input";
import { useEffect, useRef, useState } from "react";
import GenerateMenus from "./screens/generateMenus";
import sampleData from "./sampleData";

import Preferences from "./screens/preferences/preferences";
import EmtScreen from "./screens/components/messages/EmtScreen";
import AIMSG from "./screens/components/messages/AIMsg";
import UserMSG from "./screens/components/messages/userMsg";
import SetUp,{getLocalStorage,setLocalStorage,ClearStorage} from "./screens/tempDB";
import OpenAIText,{cancelRequest} from "./screens/API's/OpenAIText";
import CameraITSY from "./screens/components/camera/camera";
import OpenAIImage from "./screens/API's/OpenAIImage";
import {Language}  from "./screens/components/language/language";
import { Theme } from "./screens/components/theme/theme";
// import OpenAIImage from "./screens/API's/OpenAIImage";

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

      setMessages([
        ...messages,
        {
          products: messages[messages.length - 1].products.concat([{ name: items.name, quantity: items.qk }]),
          message: "This is my updated Item",
          direction: "outgoing",
          role: "user",
          image: "",
        },
      ])
      setItem({
        name: "",
        qk: "",
      })

      }
      
  }






  function replyChatBeforeRES() {
    setMessages([
      ...messages,
      {
        products: [...messages[messages.length - 1].products],
        message: `🕸️Hello, dear! Like a diligent spider 🕷️, I’m spinning your menus. Your patience is as precious as dew on a web. I’m fetching your menus! 🌼

        Please wait while I’m searching for your menus…`,
        direction: "outgoing",
        role: "assistant",
        image: "",
      },
    ])
  }


  const Erase= async()=>{
    ClearStorage()
    
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
    console.log(indexMain, indexToDelete)

    // Create a new products array for the new message that excludes the removed product
    let newProducts = messages[indexMain].products.filter((_, index) => index !== indexToDelete);

    // Add a new message with the new products array
    setMessages([...messages, {
      products: newProducts,
      message: "This is my updated Item",
      direction: "outgoing",
      role: "user",
      image: "",
    }]);
    console.log("Success Delete", indexMain);
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
    const [uploadPhoto, setUploadPhoto] = useState();


   
     const uploadImage= async (event)=> {

      //this code here run after uploading image
      // toast({
      //   title: "Analyzing Image...",
      //   description:
      //     "wait up negga im analyzing your image...!",
      // });

     

      // console.log(result);
      
      setMessages([
        ...messages,
        {
          products: [...messages[messages.length - 1].products],
          message: `Could you please identify the food items in this image?`,
          direction: "outgoing",
          role: "user",
          image: event,
        },
        {
          products: [...messages[messages.length - 1].products],
          message: `🕸️Hello, dear! Im about to scan your image, please wait for a while`,
          direction: "outgoing",
          role: "assistant",
          image: "",
        },
      ])
  
      //this code here use the image recognization component then executes codes just like axios process
      console.log(event)
      
      const result = await OpenAIImage({imagePath:event});
   

      result[0].warning?
    
        setMessages([
          ...messages,
          {
            products: [...messages[messages.length - 1].products],
            message: `Could you please identify the food items in this image?`,
            direction: "outgoing",
            role: "user",
            image: event,
          },
          {
            products: [...messages[messages.length - 1].products],
            message: `🕸️Hello, I’ve finished scanning your items. Unfortunately, no food items were detected. Thank you for your patience`,
            direction: "outgoing",
            role: "assistant",
            image: "",
          }
        ]) 

        
      : 
      
      setMessages([
        ...messages,
        {
          products: [...messages[messages.length - 1].products],
          message: `Could you please identify the food items in this image?`,
          direction: "outgoing",
          role: "user",
          image: event,
        },
        {
          products: [...messages[messages.length - 1].products,...result ],
          message: `🕸️Hello, I’ve finished scanning your items. Thank you for your patience`,
          direction: "outgoing",
          role: "assistant",
          image: "",
        },
        {
          products: [...messages[messages.length - 1].products,...result],
          message: `Could you please identify the food items in this image?`,
          direction: "outgoing",
          role: "user",
          image: "",
        },
        
      ])


      //  OpenAIImage({ image: event }).then((result)=>{
      //     let items = []
      //     let name=""
      //     let qk=""
  
      //     if (result == "No Food found!") {
         
      //     console.log("No Food found!")
      //     }else{
           
      //       JSON.parse(result)[0].food_indentified.map((e)=>(
      //         name= e.name,
      //         qk =e.quantity,
      //         items = [...items,`${qk} ${e.name} `]
              
      //       ))
          
          
      //     }
        
      //     messages.map((e) =>
      //     setMessages([
      //       ...messages,
      //       {
      //         products: [...e.products],
      //         message: `Identify food items on this image`,
      //         direction: "outgoing",
      //         role: "user",
      //         image: event,
      //       },
      //       {
      //         products: [...e.products],
      //         message: result == "No Food found!"? `🕸️Hello, dear! I’m sorry, but I couldn’t find any food in the image you provided.` : `🕸️Hello, dear! I’ve taken a peek at your image and found the following adorable yummy dummy item(s):\n\n ${items.join('\n')}` ,
      //         direction: "outgoing",
      //         role: "assistant",
      //         image: "",
      //       },
      //       {
      //         products: [
      //           ...e.products,
      //           { name: `${name}`, quantity: `${qk}` },
      //         ],
      //         message: "This is my updated Item",
      //         direction: "outgoing",
      //         role: "user",
      //         image: "",
      //       },
      //     ])
      //   )
          
          
        // })
    }

    

  return (
    <View className=" flex-1 h-full w-full relative">
    <View className={showCamera?" z-50 flex-1 h-full w-full absolute":" hidden"}>

      <CameraITSY isCameraOn={showCamera} offCamera={()=>{
        setShowCamera(false)
      }}

      onTakePhoto={ async(newPhoto) =>  {
        console.log(newPhoto,"new")
          setUploadPhoto(newPhoto);

      
         uploadImage(newPhoto)
        setShowCamera(false)

        
      }}

      
      />
    </View>
    
    <View className={showCamera?"hidden":" relative flex-1 w-screen bg-accent-foreground z-0 "} style={{ gap: 2 }}>






      <StatusBar barStyle="dark-content" />
      <View className=" flex flex-row justify-center w-full h-20  ">
        <View className=" w-1/2 justify-center">
          <Image
            className=" h-14 w-36 ml-5  "
            style={{ resizeMode: "contain" }}
            source={require("./assets/images/Itsy_logo_w_text.png")}
          />
        </View >

        <View className=" w-1/2 flex flex-row justify-center items-center">
          <Language />
          <Theme />
        </View>
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
            
            <View className=" absolute  bottom-0 right-0 mb-5 mr-2 w-14 h-12  bg-background/60 rounded-md flex items-center flex-row  justify-center z-40" pointerEvents="auto">

            
            <TouchableOpacity
                  className="  w-14 h-12 border border-border/30 bg-background/60 rounded-md flex items-center flex-row  justify-center z-40 "
                  onPress={()=>{
                    setShowCamera(true)
                  }}
                 
                >
                  <Svg
                  width="20"
                  className=" text-primary  "
                  height="20"
                  viewBox="0 0 15 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.5 2L4.87935 2C4.47687 1.99999 4.14469 1.99999 3.87409 2.0221C3.59304 2.04506 3.33469 2.09434 3.09202 2.21799C2.7157 2.40973 2.40973 2.7157 2.21799 3.09202C2.09434 3.33469 2.04506 3.59304 2.0221 3.87409C1.99999 4.14468 1.99999 4.47686 2 4.87933V4.87935V5.5C2 5.77614 2.22386 6 2.5 6C2.77614 6 3 5.77614 3 5.5V4.9C3 4.47171 3.00039 4.18056 3.01878 3.95552C3.03669 3.73631 3.06915 3.62421 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.62421 3.06915 3.73631 3.03669 3.95552 3.01878C4.18056 3.00039 4.47171 3 4.9 3H5.5C5.77614 3 6 2.77614 6 2.5C6 2.22386 5.77614 2 5.5 2ZM13 9.5C13 9.22386 12.7761 9 12.5 9C12.2239 9 12 9.22386 12 9.5V10.1C12 10.5283 11.9996 10.8194 11.9812 11.0445C11.9633 11.2637 11.9309 11.3758 11.891 11.454C11.7951 11.6422 11.6422 11.7951 11.454 11.891C11.3758 11.9309 11.2637 11.9633 11.0445 11.9812C10.8194 11.9996 10.5283 12 10.1 12H9.5C9.22386 12 9 12.2239 9 12.5C9 12.7761 9.22386 13 9.5 13H10.1206C10.5231 13 10.8553 13 11.1259 12.9779C11.407 12.9549 11.6653 12.9057 11.908 12.782C12.2843 12.5903 12.5903 12.2843 12.782 11.908C12.9057 11.6653 12.9549 11.407 12.9779 11.1259C13 10.8553 13 10.5232 13 10.1207V10.1207V10.1207V10.1206V9.5ZM2.5 9C2.77614 9 3 9.22386 3 9.5V10.1C3 10.5283 3.00039 10.8194 3.01878 11.0445C3.03669 11.2637 3.06915 11.3758 3.10899 11.454C3.20487 11.6422 3.35785 11.7951 3.54601 11.891C3.62421 11.9309 3.73631 11.9633 3.95552 11.9812C4.18056 11.9996 4.47171 12 4.9 12H5.5C5.77614 12 6 12.2239 6 12.5C6 12.7761 5.77614 13 5.5 13H4.87935C4.47687 13 4.14469 13 3.87409 12.9779C3.59304 12.9549 3.33469 12.9057 3.09202 12.782C2.7157 12.5903 2.40973 12.2843 2.21799 11.908C2.09434 11.6653 2.04506 11.407 2.0221 11.1259C1.99999 10.8553 1.99999 10.5231 2 10.1207V10.1206V10.1V9.5C2 9.22386 2.22386 9 2.5 9ZM10.1 3C10.5283 3 10.8194 3.00039 11.0445 3.01878C11.2637 3.03669 11.3758 3.06915 11.454 3.10899C11.6422 3.20487 11.7951 3.35785 11.891 3.54601C11.9309 3.62421 11.9633 3.73631 11.9812 3.95552C11.9996 4.18056 12 4.47171 12 4.9V5.5C12 5.77614 12.2239 6 12.5 6C12.7761 6 13 5.77614 13 5.5V4.87935V4.87934C13 4.47686 13 4.14468 12.9779 3.87409C12.9549 3.59304 12.9057 3.33469 12.782 3.09202C12.5903 2.7157 12.2843 2.40973 11.908 2.21799C11.6653 2.09434 11.407 2.04506 11.1259 2.0221C10.8553 1.99999 10.5231 1.99999 10.1206 2L10.1 2H9.5C9.22386 2 9 2.22386 9 2.5C9 2.77614 9.22386 3 9.5 3H10.1Z" fill="currentColor" 
                
                  />
                </Svg>
         
           

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

          
          
          
          <View className=" relative overflow-hidden min-w-full flex-1 rounded-md box-border border-primary-foreground border flex ">
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

           





            {/* Erase the data on local storage */}
            <View className=" flex w-full flex-col" >


               {/* Stop responding */}
            <View className="  absolute  z-20  w-full h-[50px] translate-y-[-35px] justify-center items-center">


              <TouchableOpacity 
                disabled = {loading ? false : true}
                className = { loading ? "w-[190px] h-[45px] bg-background flex flex-row self-center justify-center items-center rounded-md" : "hidden"}
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

            <View className=" flex w-full flex-row " style={{ gap: 5 }}>
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
                onPress={ async() => {
                  
                  SetLoading(true)
                  

                  replyChatBeforeRES();
                  let product =[]
                  
                  messages[messages.length - 1].products.map(
                    (e) =>
                      (product = [...product, `${e.quantity} ${e.name}`])
                  )
                  
                  await OpenAIText({ product: `${product.join(", ")}` }).then( async (result) => {
                    console.log("Menu API Response");
                    console.log(result)
                     
                    
                      // Alerts
                       if (result.length == 0) {
                        
                        SetLoading(false)
                       Alert.alert(
                          'Stop Responding!',
                          'Your request for cancellation of generating the menu has been successfully implemented',
                          [
                            {
                              text: 'OK',
                              onPress: () => {

                                setMessages([
                                  ...messages,
                                  {
                                    products: [...messages[messages.length - 1].products],
                                    message: `Your request for cancellation of menu has been successfully implemented!`,
                                    direction: "outgoing",
                                    role: "assistant",
                                    image: "",
                                  },
                                ])
                              }
                              
                            },
                          ],
                          { cancelable: false }
                        );
                        }else{
                          SetLoading(false)
                          setMenus(result)
                          
                                  setShowNotif(true)
                          Alert.alert(
                            'Spider Buddy 🕷️',
                            "Hey there, buddy! Your menus are all set to roll. Time for some delicious 🕷️🍔!",
                            [
                              {
                                text: 'Got it!',
                                onPress : () => {
                                  console.log("working")
                                },
                              },
                            ],
                            { cancelable: false }
                          );
                        
                        }
              
                      if (result) {
                        
                        console.log("Inside the result")

                        let menus_name = [];

                        result.map((e, key) => {
                          menus_name = [
                            ...menus_name,
                            `${key + 1}. ${e.name}`,
                          ];
                        });

                        
                          setMessages([
                            ...messages,
                            {
                              products: [...messages[messages.length - 1].products],
                              message: `🕸️Hello, dear! Like a diligent spider 🕷️, your menus are spun. Thanks for your patience, as precious as dew on a web. Enjoy your menus!
        
Here are your menus:
${menus_name.join(" \n")}`,
                              direction: "outgoing",
                              role: "assistant",
                              image: "",
                            },
                          ])
                       }

                      
                    
                  }).catch((error) => {
                    SetLoading(false);
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


