import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Pressable } from "react-native";

const Services = ({ service }) => {
  return (
    <TouchableOpacity className="p-2  flex-row flex-wrap">
      <View className="bg-blue-100 p-4  rounded-lg flex items-center">
        <Image
          source={{ uri: service.image }}
          className=" rounded-full object-cover"
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
        <Text className="text-sm font-bold mt-2 text-black">
          {service.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Services;
