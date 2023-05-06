import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import services from "../Data/ServicesDataBase";
import Services from "../components/Services";
import { ScrollView } from "react-native";
import items from "../Data/ItemData";
import SingleItem from "../components/SingleItem";
import { EvilIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Pressable } from "react-native";
import { getProducts } from "../redux/ProductReducer";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.product);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  // console.log(auth.currentUser.email);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigation.navigate("Login");
      }
      return unsubscribe;
    });
  }, []);

  useEffect(() => {
    if (products.length > 0) return;
    const fetchProduct = () => {
      items.map((item) => dispatch(getProducts(item)));
    };
    fetchProduct();
  }, []);

  const cart = useSelector((state) => state.cart.cart);

  return (
    <ScrollView className="bg-gray-100">
      {/* header */}
      <View className=" bg-blue-400">
        <View className="px-6 py-6 mt-4 flex-row justify-between items-center">
          <View>
            <Text className="text-sm font-semibold text-white ">
              Welcome Back
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Text className="text-2xl font-bold text-white underline">
                {auth.currentUser.email.slice(0, 6)}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            className="relative"
          >
            <Feather name="shopping-bag" size={44} color="white" />
            <Text className="absolute top-[-10px] right-1 bg-red-500 rounded-full text-xs text-white p-1">
              {cart.length}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scroolview */}
      <View className="flex flex-row items-center mb-2 mx-4 mt-4">
        <Text className="text-sm font-semibold  text-gray-500">
          Service's we Offer
        </Text>
        <EvilIcons name="arrow-right" size={24} color="black" />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="  px-2"
      >
        {services.map((service) => (
          <Services key={service.id} service={service} />
        ))}
      </ScrollView>

      {/* Banner offer */}
      <View className=" mx-4 mt-4 flex items-center justify-center">
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/twitter-clone-c37d6.appspot.com/o/offer.PNG?alt=media&token=ce7695d5-1df3-4a64-9135-2c58a0c70763",
          }}
          className="w-[360px] h-[150px] object-cover shadow-md  rounded-xl"
          resizeMode="contain"
        />
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/twitter-clone-c37d6.appspot.com/o/steps.PNG?alt=media&token=bcd976c4-43c0-44bc-aeed-f60a388414c0",
          }}
          className="w-[360px] h-[150px] object-cover mt-4 rounded-xl shadow-md"
          resizeMode="contain"
        />
      </View>

      {/* Single Product */}
      <View className="mt-8 mx-4  ">
        <View className="flex flex-row items-center mb-3 ">
          <Text className="text-sm font-semibold  text-gray-500">
            Let's Fill Basket
          </Text>
          <EvilIcons name="arrow-right" size={24} color="black" />
        </View>
        {products.map((item) => (
          <SingleItem key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
