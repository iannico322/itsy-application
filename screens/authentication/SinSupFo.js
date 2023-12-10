
import { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native'
import { Path, Svg } from "react-native-svg";


export const SinSupFo = ({viewOpt, show}) => {

    const [sinsupfo,setSinSupFo] = useState(0)

    function SinSupFoScreen(num){
        setSinSupFo(num)
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
                className = { sinsupfo == 0 ? " flex w-[85%] max-h-[530px] h-[76%] bg-[#EDEDED] rounded-md px-7 pt-5" : "hidden"} 
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
                        <TextInput 
                            className = " text-sm text-primary  "
                            placeholder='Email'
                        />
                    </View>
                </View>

                {/* Password */}
                <View className = " flex w-full gap-2 mb-3">
                    <Text className=" text-border ">Password</Text>
                    <View className="h-[40px] rounded-md w-full bg-[#ffffff] pl-4 justify-center ">
                        <TextInput 
                            className = " text-sm text-primary  "
                            placeholder='Password'
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
                    className = " w-full h-[40px] bg-[#F5F5F5] rounded-md flex justify-center items-center"
                >
                    <Text className=" text-border ">Sign In</Text>
                </TouchableOpacity>


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
                className = { sinsupfo == 1 ? " flex w-[92%] max-h-[630px] h-[92%] bg-[#EDEDED] rounded-md px-6 pt-4" : "hidden"} >
               
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
                        />
                    </View>
                </View>



                {/* Password */}
                <View className = " flex w-full gap-2 mb-5">
                    <Text className=" text-border ">Password</Text>
                    <View className="h-[40px] rounded-md w-full bg-[#ffffff] pl-4 justify-center ">
                        <TextInput 
                            className = " text-sm text-primary  "
                            placeholder='Password'
                        />
                    </View>
                </View>



                {/* Confirm Password */}
                <View className = " flex w-full gap-2 mb-8">
                    <Text className=" text-border ">Confirm Password</Text>
                    <View className="h-[40px] rounded-md w-full bg-[#ffffff] pl-4 justify-center ">
                        <TextInput 
                            className = " text-sm text-primary  "
                            placeholder='Password'
                        />
                    </View>
                </View>


                {/* Sign up button */}
                <TouchableOpacity
                    className = " w-full h-[40px] bg-[#F5F5F5] rounded-md flex justify-center items-center"
                >
                    <Text className=" text-border ">Sign In</Text>
                </TouchableOpacity>


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
                className = { sinsupfo == 2 ? " flex w-[85%] max-h-[400px] h-[50%] bg-[#EDEDED] rounded-md px-8 pt-4" : "hidden"} >

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
                        />
                    </View>
                </View>


                {/* Send reset link button */}
                <TouchableOpacity
                    className = " w-full h-[40px] bg-[#F5F5F5] rounded-md flex justify-center items-center"
                >
                    <Text className=" text-border ">Send reset link</Text>
                </TouchableOpacity>               


            </Animated.View>




        </View>
    )
}
