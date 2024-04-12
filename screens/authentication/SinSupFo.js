
import { useState, useEffect, useRef } from "react";

import { View, Text, TextInput, TouchableOpacity, Animated, Easing} from 'react-native'
import { Path, Svg } from "react-native-svg";

import axios from "./../../plugins/axios";
import AlertWarning from "../components/alert/alert";

import SetUp,{getLocalStorage,setLocalStorage,ClearStorage} from "./../tempDB";

export const SinSupFo = ({viewOpt, show, navigation}) => {

    const [sinsupfo,setSinSupFo] = useState(0)

    function SinSupFoScreen(num){
        setSinSupFo(num)
    }
    const [warning,setWarning]=useState({
        load:false,
        type:"",
        title:"",
        message:""
      })

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
    
    const [user, setUser] = useState({
    email: "",
    password: "",
    });  
    async function SignIn(){
        if (user.email == "" || user.password=="") {
            
                setWarning({
                  load:true,
                  type:"error",
                  title:"Empty Field!",
                  message:"Some of the field are empty..."
                })
            setTimeout(() => {
                setWarning({
                  load:false,
                  type:"",
                  title:"",
                  message:""
                })
              }, 1000);
        }else{
            setWarning({
                load:true,
                type:"",
                title:"",
                message:""
              })
              console.log(user)
      
          
              try {
               await axios.post("token/login/",user).then((res)=>{
                   setLocalStorage("key",JSON.stringify(res.data.auth_token))
                  // localStorage.setItem("key",res.data.auth_token)
                  setWarning({
                    load:true,
                    type: "success",
                    title: "Login Successful",
                    message: "You have successfully logged in. Please wait for a while..."
                  })
      
                   axios.get("users/me/",{
                    headers: {
                      Authorization: `Token ${res.data.auth_token}`,
                    }, 
                  }).then((res)=>{
                    console.log(res.data)
                    setLocalStorage("user",JSON.stringify(res.data))
                  //   localStorage.setItem("user",JSON.stringify(res.data))
                    setWarning({
                      load:true,
                      type: "success",
                      title: "Login Successful",
                      message: `You have successfully logged in. Welcome back ${res.data.first_name} !`
                    })
          
                    setUser({
                      email: "",
                      password: "",
                    })
                    navigation.navigate("Plus")
                  //   navigate('/itsy-web/main')
                })
          
              })
                
              } catch (error) {
                  console.log(error)
      
                  setWarning({
                    load:true,
                    type:"error",
                    title:"Login Failed",
                    message:" Please check your email, password, and ensure your account is activated."
                  })
                
              }
              setTimeout(() => {
                setWarning({
                  load:false,
                  type:"",
                  title:"",
                  message:""
                })
          
              }, 3000);

        }
    
      }


    const [userCreate, setUserCreate] = useState({
    first_name:"",
    last_name:"",
    email: "",
    password: "",
    re_password: "",
    });
    const [emailVal,setEmailVal]=useState(false)
    const [passwordVal,setPasswordVal]=useState(false)
    const [confirmpasswordVal,setConfirmPasswordVal]=useState(false)
    
    
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      };
    //Password validation family
    const validatePassword = (password) => {
        // Password should be at least 5 characters long
        if (password.length < 8) {
        return false;
        }
    
        // Password should contain at least one number
        if (!/\d/.test(password)) {
        return false;
        }
    
        return true;
    };

    useEffect(()=>{
        setEmailVal(validateEmail(userCreate.email))
    },[userCreate.email])
    useEffect(()=>{
        setPasswordVal(validatePassword(userCreate.password))
    },[userCreate.password])
    
    useEffect(()=>{
        if (userCreate.password == userCreate.re_password && userCreate.password !="" && userCreate.re_password!="") {
        setConfirmPasswordVal(true)
        }else{
        setConfirmPasswordVal(false)
        }
    },[userCreate.password,userCreate.re_password])
    //Password validation family

    async function SignUp(){
    if (!(Object.values(userCreate).some(value => value === null || value === ''))) {
        if (passwordVal && confirmpasswordVal && emailVal) {
            setWarning({
            load:true,
            type:"",
            title:"",
            message:""
            })
            try {
            await axios.post("users/",userCreate).then((res)=>{
                console.log(res.status)
                setWarning({
                load:true,
                type: "success",
                title: "Account Successfully Created!",
                message: "Hooray! Your account has been successfully created. Please check your email for the activation link to get started."
                })
                setTimeout(() => {
                setWarning({
                    load:false,
                    type:"",
                    title:"",
                    message:""
                })
    
                setUserCreate({
                    first_name:"",
                    last_name:"",
                    email: "",
                    password: "",
                    re_password: "",
                })
                }, 3000);
                
                
    
            })
            
            } catch (error) {
            setWarning({
                load:true,
                type:"error",
                title: "Account Creation Unsuccessful",
                message:"Oops! It seems the email address you entered may already be registered. Please check if your account is activated or try using the 'Forgot Password' option."
            })
            setTimeout(() => {
                setWarning({
                load:false,
                type:"",
                title:"",
                message:""
                })
            }, 6000);
            
            }
        }else{
            setWarning({
                load:true,
                type:"error",
                title:"Invalid Entries",
                message:"Some of the fields are invalid"
                })
                setTimeout(() => {
                    setWarning({
                      load:false,
                      type:"",
                      title:"",
                      message:""
                    })
              
                  }, 1000);

        }
    }else{
        setWarning({
            load:true,
            type:"error",
            title:"Empty Field",
            message:"Some of the fields are empty"
            })
            setTimeout(() => {
                setWarning({
                  load:false,
                  type:"",
                  title:"",
                  message:""
                })
          
              }, 3000);


    }
    
    
    }
    const [userF, setUserF] = useState({
        email: "",
      });
    async function ForgotPassword(){
        console.log(userF.email=="")
        console.log(userF.email=="" || !(validateEmail(userF.email)))

        if (userF.email=="" || !(validateEmail(userF.email)) ) {

            console.log("run here")

            setWarning({
                load:true,
                type:"error",
                title: "Reset Link Failed",
                message:"Oops! We couldn't send a reset link to your email address. Please ensure your email address is correct and try again."
            })
            setTimeout(() => {
                setWarning({
                load:false,
                type:"",
                title:"",
                message:""
                })
            }, 3000); 
            
        }else{
            console.log("runin here")
            setWarning({
                load:false,
                type:"",
                title:"",
                message:""
            })
            
                try {
                await axios.post("users/reset_password/",userF).then((res)=>{
                    console.log(res.status)
                    setWarning({
                    load:true,
                    type: "success",
                    title: "Reset Link Sent!",
                    message: "Great! A reset link has been sent to your email address. Please check your email inbox."
                    })
                    setTimeout(() => {
                    setWarning({
                        load:false,
                        type:"",
                        title:"",
                        message:""
                    })
                    }, 3000);
                    setUserF({email:""})
                })
                
                } catch (error) {
                setWarning({
                    load:true,
                    type:"error",
                    title: "Reset Link Failed",
                    message:"Oops! We couldn't send a reset link to your email address. Please ensure your email address is correct and try again."
                })
                setTimeout(() => {
                    setWarning({
                    load:false,
                    type:"",
                    title:"",
                    message:""
                    })
                }, 6000); 
            }


        }
    
   
    
    }



    // =====================================================SLIDE UP====================================================
    // If isslide is false when the slideUp function is triggered, it means that it slides from the bottom to its original position
    // If the toValue is 0, it means that will return to its original position 
    // After sliding up, the isslide value will become true
    // Slide1 = Sign In, Slide2 = Sign Up, Slide3 = Forgot Password

    const [isSlide1, setIsSlide1] = useState(false);
    const [isSlide2, setIsSlide2] = useState(false);
    const [isSlide3, setIsSlide3] = useState(false);

    const slideUpAnimation1 = useRef(new Animated.Value(0)).current;
    const slideUpAnimation2 = useRef(new Animated.Value(0)).current;
    const slideUpAnimation3 = useRef(new Animated.Value(0)).current;

    function slideUp1 (){
        setIsSlide1(!isSlide1);
 
        Animated.timing(slideUpAnimation1, {
          toValue: isSlide1 ? 0 : 1,
          duration: 900,
          useNativeDriver: false,
        }).start();

        console.log("Slide 1", isSlide1)
      };


    function slideUp2 (){
        setIsSlide2(!isSlide2);

        Animated.timing(slideUpAnimation2, {
        toValue: isSlide2 ? 0 : 1,
        duration: 1000,
        useNativeDriver: false,
        }).start();

        console.log("Slide 2", isSlide2)
    };

    function slideUp3 (){
        setIsSlide3(!isSlide3);

        Animated.timing(slideUpAnimation3, {
        toValue: isSlide3 ? 0 : 1,
        duration: 1000,
        useNativeDriver: false,
        }).start();

        console.log("Slide 3", isSlide3)
    };


    //run the slide function when user account button is shown
    useEffect(() => {
        if (show) {
          slideUp1();
        }
      }, [show]);


    const interpolatedSlideUp1 = slideUpAnimation1.interpolate({
        inputRange: [0, 1],
        outputRange: [700, 0],
    });

    const interpolatedSlideUp2 = slideUpAnimation2.interpolate({
        inputRange: [0, 1],
        outputRange: [700, 0],
    });

    const interpolatedSlideUp3 = slideUpAnimation3.interpolate({
        inputRange: [0, 1],
        outputRange: [700, 0],
    });



    const animatedStyle1 = {
    transform: [{ translateY: interpolatedSlideUp1 }],
    };

    const animatedStyle2 = {
        transform: [{ translateY: interpolatedSlideUp2 }],
    };

    const animatedStyle3 = {
        transform: [{ translateY: interpolatedSlideUp3 }],
    };
    // =================================================================================================================


    



    return(
        <View className =" flex w-full h-full justify-center items-center ">

        
            {/* ===================================SIGN IN=================================== */}

            <Animated.View 
                style={[animatedStyle1]}
                className = { sinsupfo == 0 ? " flex w-[95%] min-h-[530px] pb-5 bg-[#EDEDED] rounded-md px-7 pt-5" : "hidden"} 
            >

                
                {/* Exit */}
                <View className = " h-[50px] w-full items-end ">
                    <TouchableOpacity
                        className = "h-full w-[40px] justify-center items-center"
                        onPress={()=>{
                            viewOpt()
                            slideUp1()
                        }}
                    >
                        <Svg
                        width="40"
                        className= " text-primary text-sm"
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

                {/* Sign in text */}
                <Text className = " text-[40px] font-semibold mb-5 ">Sign In</Text>
                

                {/* Email */}
                <View className = " flex w-full gap-2 mb-4">
                    <Text className=" text-border ">Email</Text>
                    <View className="h-[40px] rounded-md w-full bg-[#ffffff] pl-4 justify-center ">
                        < TextInput 
                        className = " text-sm text-primary  "
                        placeholder='Email'
                        value={user.email}
                        onChangeText={(text) => {
                            setUser({...user, email: text})
                        }}
                        />

                    </View>
                </View>

                {/* Password */}
                <View className = " flex w-full gap-2 mb-3">
                    <Text className=" text-border ">Password</Text>
                    <View className="h-[40px] rounded-md w-full bg-[#ffffff] pl-4 justify-center ">
                        < TextInput 
                        
                        className = " text-sm text-primary  "
                        placeholder='Password'
                        secureTextEntry={true}
                        value={user.password}
                        onChangeText={(text) => {
                            setUser({...user, password: text})
                        }}
                        />


                    </View>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity
                    onPress={()=>{
                        SinSupFoScreen(2)
                        slideUp1()
                        slideUp3()
                    }}
                    className =" mb-4"
                >
                    <Text className= " text-border">Forgot Password?</Text>
                </TouchableOpacity>


                {/* Sign In button */}
                <TouchableOpacity
                className=" w-full h-[40px] bg-[#F5F5F5] rounded-md flex flex-row justify-center items-center "
                style={warning.load?{pointerEvents:"none",gap:5}:{pointerEvents:"auto",gap:5}}
                onPress={SignIn}
          
                >
                    <Text className=" text-border ">Sign In</Text>
                    <Animated.View className={warning.load?"flex":"hidden"} style={{transform: [{rotate}]}}>
                        <Svg
                            width="30"
                            className= " text-primary text-sm"
                            height="15"
                            viewBox="0 0 15 15"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <Path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z"
                                fill="currentColor"
                            />
                        </Svg>
                    </Animated.View>
                </TouchableOpacity>




                 <View className={warning.load?"flex":"hidden"}>
                 <AlertWarning
                  type={warning.type}
                  title={warning.title}
                  message={warning.message}

                 />
                 </View>    
                
                


                {/* Line */}
                <View className =" w-full h-[40px] border-b-[1px] border-b-[#91919180] mb-6"></View>


                {/* Don't have an account */}
                <View className="w-full h-[50px] justify-center items-center">
                
                    <Text className=" text-border ">
                            Don't have an account?
                    </Text>      

                    <TouchableOpacity
                        onPress={()=>{
                            SinSupFoScreen(1)
                            slideUp1()
                            slideUp2()
                        }}
                    >
                
                        <Text className = " text-border font-semibold text-[16px]">Create a new one</Text>
                    </TouchableOpacity>

                </View>
            </Animated.View>










            {/* ===================================SIGN UP=================================== */}

            <Animated.View 
                style={[animatedStyle2]}
                className = { sinsupfo == 1 ? " flex w-[100%] min-h-[630px] pb-5 bg-[#EDEDED] rounded-md px-6 pt-4" : "hidden"} >
               
                {/* Exit */}
                <View className = " h-[50px] w-full items-end ">
                    <TouchableOpacity
                        className = "h-full w-[40px] justify-center items-center"
                        onPress={()=>{
                            viewOpt()
                            SinSupFoScreen(0)
                            slideUp2()
                        }}
                    >
                        <Svg
                        width="40"
                        className= " text-primary text-sm"
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



                {/* Sign up text */}
                <Text className = " text-[35px] font-semibold mb-5 mt-[-10px]">Sign Up</Text>



                {/* First Name & Last Name */}
                <View className = " w-full h-[60px] flex flex-row mb-3 ">

                    {/* First Name */}
                    <View className = " w-[48%] h-full ">
                        <Text className=" text-border ">First Name</Text>
                        <View className="h-[40px] rounded-md w-full bg-[#ffffff] pl-4 justify-center ">
                            <TextInput 
                                className = " text-sm text-primary  "
                                placeholder='First Name'
                                value={userCreate.first_name}
                                onChangeText={(text)=>{
                                    setUserCreate({...userCreate,first_name:text})
                                }}
                            />
                        </View>
                    </View>

                    {/* Space */}
                    <View className="w-[4%] h-full"></View>

                    {/* Last Name */}
                    <View className = " w-[48%] h-full ">
                        <Text className=" text-border ">Last Name</Text>
                        <View className="h-[40px] rounded-md w-full bg-[#ffffff] pl-4 justify-center ">
                            <TextInput 
                                className = " text-sm text-primary  "
                                placeholder='Last Name'
                                value={userCreate.last_name}
                                onChangeText={(text)=>{
                                    setUserCreate({...userCreate,last_name:text})
                                }}
                            />
                        </View>
                    </View>
                </View>



                {/* Email */}
                <View className = " flex w-full gap-2 mb-4">
                    <Text className=" text-border ">Email</Text>
                    <View className="h-[40px] rounded-md w-full bg-[#ffffff] pl-4 justify-center ">
                        <TextInput 
                            className = " text-sm text-primary  "
                            placeholder='Email'
                            value={userCreate.email}
                                onChangeText={(text)=>{
                                    setUserCreate({...userCreate,email:text})
                                }}
                        />
                    </View>
                    <Text className={emailVal?" text-xs ml-0 mt-1 text-green-500":" text-xs ml-2 mt-0 text-red-500"}>{emailVal?"Valid Email":"Invalid Email"}</Text>
                    
                </View>



                {/* Password */}
                <View className = " flex w-full gap-2 mb-5">
                    <Text className=" text-border ">Password</Text>
                    <View className="h-[40px] rounded-md w-full bg-[#ffffff] pl-4 justify-center ">
                        <TextInput 
                            className = " text-sm text-primary  "
                            placeholder='Password'
                            secureTextEntry={true}
                            value={userCreate.password}
                                onChangeText={(text)=>{
                                    setUserCreate({...userCreate,password:text})
                                }}
                        />
                    </View>
                    <Text className={passwordVal?" text-xs ml-2 mt-1 text-green-500":" text-xs ml-2 mt-1 text-red-500"}>{passwordVal?"Valid password":"Invalid password"}</Text>
      
                </View>



                {/* Confirm Password */}
                <View className = " flex w-full gap-2 mb-8">
                    <Text className=" text-border ">Confirm Password</Text>
                    <View className="h-[40px] rounded-md w-full bg-[#ffffff] pl-4 justify-center ">
                        <TextInput 
                            className = " text-sm text-primary  "
                            placeholder='Password'
                            secureTextEntry={true}
                            value={userCreate.re_password}
                                onChangeText={(text)=>{
                                    setUserCreate({...userCreate,re_password:text})
                                }}
                        />
                        
                    </View>
                    <Text className={confirmpasswordVal?" text-xs ml-0 mt-1 text-green-500":" text-xs ml-2 mt-0 text-red-500"}>{confirmpasswordVal?"Password match":"Password not match"}</Text>
                    
                </View>


                {/* Sign up button */}
                <TouchableOpacity
                className=" w-full h-[40px] bg-[#F5F5F5] rounded-md flex flex-row justify-center items-center "
                style={warning.load?{pointerEvents:"none",gap:5}:{pointerEvents:"auto",gap:5}}
                onPress={SignUp}
                >
                    <Text className=" text-border ">Sign Up</Text>
                    <Animated.View className={warning.load?"flex":"hidden"} style={{transform: [{rotate}]}}>
                        <Svg
                            width="30"
                            className= " text-primary text-sm"
                            height="15"
                            viewBox="0 0 15 15"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <Path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z"
                                fill="currentColor"
                            />
                        </Svg>
                    </Animated.View>
                </TouchableOpacity>

                <View className={warning.load?"flex":"hidden"}>
                 <AlertWarning
                  type={warning.type}
                  title={warning.title}
                  message={warning.message}

                 />
                 </View> 



                {/* Line */}
                <View className =" w-full h-[30px] border-b-[1px] border-b-[#91919180] mb-6"></View>


                {/* Already have an account */}
                <View className="w-full h-[50px] justify-center items-center">
                
                    <Text className=" text-border ">
                            Already have an account?
                    </Text>      

                    <TouchableOpacity
                        onPress={()=>{
                                SinSupFoScreen(0)
                                slideUp1()
                                slideUp2()
                            }
                        }
                    >
                
                        <Text className = " text-border font-semibold text-[16px]">Sign In Now</Text>
                    </TouchableOpacity>

                </View>
            </Animated.View>












            {/* ===================================FORGOT PASSWORD=================================== */}

            <Animated.View 
                style={[animatedStyle3]}
                className = { sinsupfo == 2 ? " flex w-[95%] min-h-[100px] pb-5 bg-[#EDEDED] rounded-md px-8 pt-4" : "hidden"} >

                {/* Exit */}
                <View className = " h-[50px] w-full items-end  ">
                    <TouchableOpacity
                        className = "h-full w-[40px] justify-center items-center mr-[-15px]"
                        onPress={()=>{
                            SinSupFoScreen(0)
                            slideUp3()
                            slideUp1()
                        }}
                    >
                        <Svg
                        width="40"
                        className= " text-primary text-sm"
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

                {/* Forgot Password text */}
                <Text className = " text-[30px] font-semibold mb-8 ">Forgot Password</Text>


                {/* Email */}
                <View className = " flex w-full gap-2 mb-8">
                    <Text className=" text-border ">Email</Text>
                    <View className="h-[40px] rounded-md w-full bg-[#ffffff] pl-4 justify-center ">
                        <TextInput 
                            className = " text-sm text-primary  "
                            placeholder='Email'
                            value={userF.email}
                            onChangeText={(text)=>{
                                setUserF({...userF,email:text})
                            }}
                        />
                    </View>
                </View>


                {/* Send reset link button */}
                <TouchableOpacity
                className=" w-full h-[40px] bg-[#F5F5F5] rounded-md flex flex-row justify-center items-center mb-2"
                style={warning.load?{pointerEvents:"none",gap:5}:{pointerEvents:"auto",gap:5}}
                onPress={ForgotPassword}
                >
                    <Text className=" text-border ">Send reset link</Text>
                    <Animated.View className={warning.load?"flex":"hidden"} style={{transform: [{rotate}]}}>
                        <Svg
                            width="30"
                            className= " text-primary text-sm"
                            height="15"
                            viewBox="0 0 15 15"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <Path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z"
                                fill="currentColor"
                            />
                        </Svg>
                    </Animated.View>
                </TouchableOpacity>

                <View className={warning.load?"flex":"hidden"}>
                 <AlertWarning
                  type={warning.type}
                  title={warning.title}
                  message={warning.message}

                 />
                 </View>             


            </Animated.View>




        </View>
    )
}
