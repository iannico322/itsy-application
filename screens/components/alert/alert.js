import { Text, View } from "react-native";

const AlertWarning = ({ type, title, message }) => {
  return (
    <>
      {type ? (
        <View
          className={
            type == "success"
              ? " flex w-full min-h-0 border-[1px] py-2 px-2 rounded-md mt-2 border-green-500  "
              : " flex w-full min-h-0 border-[1px] py-2 px-2 rounded-md mt-2 border-red-500  "
          }
        >
          <Text
            className={type == "success" ? " text-green-600" : "text-red-500"}
          >
            {title}
          </Text>
          <Text
            className={type == "success" ? " text-green-600" : "text-red-500"}
          >
            {message}
          </Text>
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
};

export default AlertWarning;
