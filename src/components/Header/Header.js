import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View className="flex-row justify-between items-center mx-4 mt-4">
      <View className="">
        <Text
          className="font-spaceGroteskBold text-2xl text-green-800 dark:text-white font-extrabold uppercase"
        >
          Demo News App
        </Text>
      </View>

      <View className="flex-row space-x-4 rounded-full justify-center items-center">
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          className="bg-gray-200 dark:bg-green-800  rounded-full p-2"
        >
          <MagnifyingGlassIcon
            size={25}
            strokeWidth={2}
            color="green"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
