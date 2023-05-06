import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import items from "../Data/ItemData";
import { Image } from "react-native";
import { Pressable } from "react-native";
import { removeFromCart, subtotal } from "../redux/CartReducer";
import { AntDesign } from "@expo/vector-icons";
import RazorpayCheckout from "react-native-razorpay";
const CartScreen = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  // const total = useSelector(subtotal);
  // const item = items;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Back",
      headerStyle: {
        backgroundColor: "#75BAFA",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    });
  }, []);

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const grandTotal = total + 1.99;

  return (
    <ScrollView className="bg-gray-100 relative w-full">
      <View className="flex-row items-center mx-4 my-4">
        <Text className="text-xl font-bold mr-1">Your Cart</Text>
        <AntDesign name="book" size={24} color="black" />
      </View>
      {cart.map((item) => (
        <View key={item.id} className="mb-4 bg-white rounded-lg">
          <View className="flex-row items-center justify-between p-4">
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
            <View className="flex justify-center items-center">
              <Text className="font-bold text-xl">{item.name}</Text>
              <Text className="font-bold text-sm">${item.price}</Text>
            </View>

            <TouchableOpacity
              onPress={() => removeItemFromCart(item)}
              className="bg-[#e43365] p-2 px-4 rounded-lg"
            >
              <Text className="text-white">Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View className=" p-4 sticky bottom-[-10]  bg-white z-50">
        <View className="flex-row items-center justify-between ">
          <Text className="font-semibold text-gray-500 text-sm">Subtotal</Text>
          <Text className="font-semibold text-gray-500 text-sm">₹{total}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-gray-500 text-sm">
            Delivery Charges
          </Text>
          <Text className="font-semibold text-gray-500 text-sm">₹1.99</Text>
        </View>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="font-semibold text-gray-700 text-xl">Total</Text>
          <Text className="font-semibold text-gray-700 text-lg">
            ₹{grandTotal}
          </Text>
        </View>
        <TouchableHighlight className="bg-[#318CE7] mt-4 w-[200px] mx-auto p-2 px-4 rounded-lg">
          <Text className="text-white text-center">Place Order</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

export default CartScreen;
