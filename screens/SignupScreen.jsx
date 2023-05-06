import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
const SignupScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userName, setUserName] = useState(null);
  const [value, setValue] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const register = () => {
    if (email === "" || password === "" || userName === "") {
      alert("Please fill all the fields");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          const myUserid = auth.currentUser.uid;

          // ...
          // setDoc(doc(db, "users", `${myUserid}`), {
          //   email: email,
          //   userName: userName,
          // });
          console.log("user crendentails", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
          // ..
        });
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
      return unsubscribe;
    });
  }, []);

  return (
    <KeyboardAvoidingView className="flex-1 justify-center items-center">
      <Text className=" font-bold text-2xl">Sign up</Text>
      <Text className=" font-semibold text-xl">Create your Own account</Text>

      <View className="mt-10">
        <View className="flex flex-row items-center my-2">
          <FontAwesome name="user-o" size={24} color="black" />
          <TextInput
            onChangeText={(text) => setUserName(text)}
            value={userName}
            placeholder="Username..."
            className="border-b-2 ml-2 border-gray-400 w-[280px] "
          />
        </View>
        <View className="flex flex-row items-center my-2">
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
          />
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email..."
            className="border-b-2 ml-2 border-gray-400 w-[280px] "
          />
        </View>
        <View className="flex flex-row items-center my-2">
          <Ionicons name="key-outline" size={24} color="black" />
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder="Password..."
            className="border-b-2 ml-2 border-gray-400 w-[280px] "
          />
        </View>
        <TouchableOpacity
          className="bg-[#318CE7] w-[200px] mx-auto p-2 px-4 rounded-lg mt-8"
          onPress={register}
        >
          <Text className="text-white text-center">Sign up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text className="font-semibold text-gray-400 text-sm mt-5 ">
          have an account? Login
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
