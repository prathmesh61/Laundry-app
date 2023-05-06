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
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userName, setUserName] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
      return unsubscribe;
    });
  }, []);

  const login = async () => {
    if (email === "" || password === "") {
      alert("Please fill all the fields");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((err) => {
          console.log(err.code);
          console.log(err.message);
        });
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1 justify-center items-center">
      <Text className=" font-bold text-2xl">Login</Text>
      <Text className=" font-semibold text-xl">Login to your account</Text>

      <View className="mt-10">
        {/* <View className="flex flex-row items-center my-2">
          <FontAwesome name="user-o" size={24} color="black" />
          <TextInput
            value={userName}
            onChangeText={(text) => setUserName(text)}
            placeholder="Username..."
            className="border-b-2 ml-2 border-gray-400 w-[280px] "
          />
        </View> */}
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
          onPress={login}
        >
          <Text className="text-white text-center">Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text className="font-semibold text-gray-400 text-sm mt-5 ">
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
