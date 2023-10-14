// import ItsyLogo from './../../../../images/Itsy_logo.png'
import { Image, Text, View } from 'react-native'
function AIMSG({e}) {

  let formattedMessage = e.message;
  
  return (
    <View className="  w-[100%] min-h-[15px]  flex flex-row items-center justify-start  py-3  ">
      <View className="    py-2 min-w-[10px] max-w-[95%] md:max-w-[90%] ml-5 text-sm text-accent-foreground/70 rounded-md bg-muted  border-[1px] border-border/30 ">
        {e.image ? (
          <>
            <Text className="pt-1 pb-4 ">{formattedMessage}</Text>
            <Image
              className="object-contain  h-20 w-20"
              source={require('./../../../assets/images/Itsy_logo.png')}
            />
          </>
        ) : (
          ""
        )}
        {e.message? <View className='flex  w-full gap-2 pb-2 '>
       
            
            <View className=' flex flex-row gap-1'>
            <Image
              className="object-contain  h-8 w-8"
              source={require('./../../../assets/images/Itsy_logo.png')}
            />
            <Text className=' text-[#3dd44b]  text-xl font-bold md:text-base'>ITSY</Text>
             
            </View>
            <Text className=" text-xs pl-3  "  >{formattedMessage}</Text>
            
        </View>
        :
        ""    
    }    
        

      </View>
    </View>
  );
}

export default AIMSG;
