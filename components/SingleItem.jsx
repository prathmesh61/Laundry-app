import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addTocart,
  decrementQty,
  incrementQty,
  removeFromCart,
} from "../redux/CartReducer";
import { decrementQuantity, incrementQuantity } from "../redux/ProductReducer";

const SingleItem = ({ item }) => {
  const dispatch = useDispatch();
  const addItemToCart = () => {
    dispatch(addTocart(item)); // add item to cartReducer
    // dispatch(incrementQuantity(item)); // product reducer find and incrementQty
  };
  const removeItemFromCart = () => {
    dispatch(removeFromCart(item)); // add item to cartReducer
    // dispatch(incrementQuantity(item)); // product reducer find and incrementQty
  };

  const cart = useSelector((state) => state.cart.cart);

  return (
    <View className="mb-4 bg-white rounded-lg">
      <View className="flex-row items-center justify-between p-4">
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 100 }}
          className="object-cover"
          resizeMode="contain"
        />
        <View className="flex justify-center items-center">
          <Text className="font-bold text-xl">{item.name}</Text>
          <Text className="font-bold text-sm">₹{item.price}</Text>
        </View>
        {cart.some((value) => value.id === item.id) ? (
          <TouchableOpacity
            onPress={removeItemFromCart}
            className="bg-[#e43365] p-2 px-4 rounded-lg"
          >
            <Text className="text-white">Remove</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={addItemToCart}
            className="bg-[#318CE7] p-2 px-4 rounded-lg"
          >
            <Text className="text-white">Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SingleItem;
