import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const signoutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold">
        Email: {auth.currentUser?.email}
      </Text>
      <TouchableOpacity
        className="bg-[#318CE7] mt-4 w-[200px] mx-auto p-2 px-4 rounded-lg"
        onPress={signoutUser}
      >
        <Text className="text-white text-center">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
