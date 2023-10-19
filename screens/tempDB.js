import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const getLocalStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

const setLocalStorage = async (key, values) => {
  try {
    await AsyncStorage.setItem(key, values);
  } catch (e) {
    console.log(e);
  }
};

const SetUpLocalStorage = async (key, values) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // console.log(key,"has something ")
    } else {
      // console.log("Empty ", key)
      await AsyncStorage.setItem(key, values);
    }
  } catch (e) {
    // console.log("Error on",key);
  }
};


const SetUpLocalStorageC = async (key, values) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // console.log(key,"has something ")
    } else {
      // console.log("Empty ", key)
      await AsyncStorage.setItem(key, values);
    }
  } catch (e) {
    // console.log("Error on",key);
  }
};

const ClearStorage = ()=>{

  setLocalStorage(
    "none",
    "U2FsdGVkX18UQ2IN3040zHeBbni7vv1V3IxxQCKtFK8qVvVbd+1SZAApU5EQo2aptfrXD1Z4xfHRbYexqYJoIOSeBSA2gUymsQRoS6YvWcI="
  );

  setLocalStorage(
    "messages",
    '[{ "from": "itsy", "products": [],"message":"Hey dear, I\'m ITSY your culinary spider buddy! share your items, and I\'ll weave dishes so snappy!", "direction":"","image":"" }]'
  );

  setLocalStorage("menus", "[]");
  setLocalStorage("SelectedPrefence", `Filipino`);
  setLocalStorage("Languange", `English`);

  console.log("erased");

}

const SetUp = () => {
  useEffect(() => {
    SetUpLocalStorage(
      "none",
      "U2FsdGVkX18UQ2IN3040zHeBbni7vv1V3IxxQCKtFK8qVvVbd+1SZAApU5EQo2aptfrXD1Z4xfHRbYexqYJoIOSeBSA2gUymsQRoS6YvWcI="
    );

    SetUpLocalStorage(
      "messages",
      '[{ "from": "itsy", "products": [],"message":"Hey dear, I\'m ITSY your culinary spider buddy! share your items, and I\'ll weave dishes so snappy!", "direction":"","image":"" }]'
    );

    SetUpLocalStorage("menus", "[]");
    SetUpLocalStorage("SelectedPrefence", `Filipino`);
    SetUpLocalStorage("Languange", `English`);

    console.log("runnig");
  }, []);
};

export default SetUp;

export { getLocalStorage, setLocalStorage,ClearStorage };
