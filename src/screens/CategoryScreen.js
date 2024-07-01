import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { categories } from "../constants";
import CategoriesCard from "../components/CategoriesCard";
import NewsSection from "../components/NewsSection/NewsSection";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { fetchCategoryNews } from "../../utils/NewsApi";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function CategoryScreen() {
  const [activeCategory, setActiveCategory] = useState("");
  const navigation = useNavigation();
  const [withoutRemoved, setWithoutRemoved] = useState([]);

  useEffect(() => {}, [activeCategory]);

  const { data: categoryNew, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["CategoryNews", activeCategory],
    queryFn: () => fetchCategoryNews(activeCategory),
  });

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    const filteredArticles = categoryNew?.articles.filter(
      (article) => article.title !== "[Removed]"
    );
   
    setWithoutRemoved(filteredArticles || []);
  };

  return (
    <SafeAreaView className="pt-8 bg-white dark:bg-neutral-900">
      <StatusBar />

      <View>
        <View className="px-4 mb-6 justify-between">
          <Text
            className="text-3xl text-green-800 dark:text-white"
          >
            Categories
          </Text>

          <Text
            className="text-base text-gray-600 dark:text-neutral-300 "
          >
            News from all over the world
          </Text>
        </View>

        <View className="mx-4 mb-8 flex-row p-2 py-3 justify-between items-center bg-neutral-100 rounded-full">
          <TouchableOpacity className="pl-2">
            <MagnifyingGlassIcon size="25" color="gray" />
          </TouchableOpacity>
          <TextInput
            onPressIn={() => navigation.navigate("Search")}
            placeholder="Search for news"
            placeholderTextColor={"gray"}
            className="pl-4 flex-1 font-medium text-black tracking-wider"
          />
        </View>

        <View className="flex-row mx-4">
          <CategoriesCard
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        <View className="h-full">
          <View className="my-4 mx-4 flex-row justify-between items-center">
            <Text
              className="text-xl dark:text-white"
            >
              Categories
            </Text>

          </View>

          {isCategoryLoading ? (
            <View className="justify-center items-center">
              <Loading />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: hp(70),
              }}
            >
              <NewsSection newsProps={withoutRemoved} label="Category" />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
