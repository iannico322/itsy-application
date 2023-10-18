import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import * as ImageManipulator from 'expo-image-manipulator';
import ITSYLogo from './../../../assets/images/Itsy_logo.png'

export default function CameraITSY({isCameraOn,offCamera}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  // New state variable
  const [photo, setPhoto] = useState(null); // New state variable for storing the photo
  const [flashMode, setFlashMode] = useState(FlashMode.off); // New state variable for flash mode
  let cameraRef = null; // Reference to the camera

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function toggleCameraOnOff() {
    setCameraOn(current => !current);
  }

  async function takePicture() {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      let resizedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 1500 } }], // adjust the width as needed
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // adjust compression as needed
      );
      setPhoto(resizedPhoto);
      console.log(resizedPhoto )
    }
  }

  function toggleFlashMode() {
    setFlashMode(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off));
  }
  return (
    <View className=" flex relative flex-1  h-full w-full  ">
       <View  className=" bg-background w-full relative flex-[.1] flex flex-row items-center justify-between px-5">

<TouchableOpacity className="X" onPress={offCamera}>

<Svg
width="25"
className=" text-primary-foreground text-lg"
height="25"
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

<Image source={ITSYLogo} className=" h-14 w-14"/>

<TouchableOpacity className="">

<Svg
width="25"
className=" text-primary-foreground text-lg"
height="25"
viewBox="0 0 15 15"
xmlns="http://www.w3.org/2000/svg"
>
<Path
fill-rule="evenodd"
clip-rule="evenodd"
d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
fill="currentColor"
/>
</Svg>




</TouchableOpacity>


</View>
        
      {isCameraOn && (
        <Camera style={styles.camera} type={type} ref={ref => (cameraRef = ref)}>
             
               
        
        </Camera>
      )}

<View className=" flex-[.2] bg-background border-t-[4px] border-primary-foreground flex items-center justify-center  w-full h-20 bottom-0 ">

    
<View className=" flex-1 h-full w-full flex-row" >
<TouchableOpacity style={styles.button} onPress={toggleFlashMode}>
    <View className=" bg-primary-foreground h-14 w-14 rounded-md ">

    </View>
  </TouchableOpacity>
  <TouchableOpacity style={styles.button} onPress={takePicture}>
    <View className=" w-20 h-20 bg-white rounded-full border-4 border-primary-foreground">

    </View>
  </TouchableOpacity>

  <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
  <Svg
  width="25"
  className=" text-primary-foreground text-lg"
  height="25"
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


  </TouchableOpacity>

  
</View>
</View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  
  camera: {
    position:"relative",
    flex: .8,
    display:"flex",
    width:"100%",
    height:"100%"
  },
  buttonContainerTop: {
    position:"absolute",
    top:0,
    display:"flex",
    flexDirection: 'row',
    justifyContent:"space-around",
    alignItems:"center",
    backgroundColor:'transparent',

    margin: 64,
  },
  buttonContainer: {
    position:"absolute",
    bottom:0,
    display:"flex",
    flexDirection: 'row',
    justifyContent:"space-around",
    alignItems:"center",
    backgroundColor:'transparent',

    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
