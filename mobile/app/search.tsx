import React from "react";
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { ArrowLeft, SlidersHorizontal, Search, Star } from "lucide-react-native";
import { router } from "expo-router";

const SearchScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black", paddingBottom: 40, paddingTop: 40 }} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 70 }}>
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, padding: 16, backgroundColor: "black", zIndex: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", position: "relative" }} onPress={() => router.back()}>
            <ArrowLeft color="white" />
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white", opacity: 0.7, left: 30, position: "absolute" }}>Kembali</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>Search</Text>
          <SlidersHorizontal color="white" />
        </View>

        <View style={{ position: "relative", marginTop: 20 }}>
          <Search color="white" style={{ position: "absolute", left: 12, top: 12 }} />
          <TextInput
            placeholder="Attack On Titan"
            placeholderTextColor="gray"
            aria-hidden={true}
            onKeyPress={(e) => {
              if ((e as unknown as KeyboardEvent).key === "Enter" || (e as unknown as KeyboardEvent).key === "enter") {
                console.log("Mulai mencari data...")
              }
            }}
            style={{ backgroundColor: "#1e1e1e", borderRadius: 16, paddingLeft: 48, color: "white", height: 48, borderColor: "#ffffff10", borderWidth: 1 }}
          />
        </View>
      </View>

      <View style={{ marginTop: 60 }}>
        <Text style={{ fontSize: 24, fontWeight: "600", color: "white", marginBottom: 16 }}>Relevan result</Text>

        <View>
          <Image source={require("@/assets/images/konosuba.jpg")} style={{ height: 200, width: "100%", borderRadius: 16 }} resizeMode="cover" />
          <View style={{ marginTop: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>KonoSuba: God's Blessing on This Wonderful World! 3</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#facc15" }} />
              <Text style={{ color: "white", opacity: 0.8, marginLeft: 6 }}>On Going</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginLeft: "auto" }}>
                <Text style={{ color: "white", opacity: 0.8 }}>2020</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
                  <Star color="white" size={16} />
                  <Text style={{ color: "#22c55e", marginLeft: 4 }}>4.4</Text>
                </View>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: "row" }}>
              {["Comedy", "Isekai", "Romance", "Ecchi"].map((tag, idx) => (
                <Text key={idx} style={{ color: "#ef4444", marginRight: 12 }}>{tag}</Text>
              ))}
            </ScrollView>
          </View>
        </View>

        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => (
          <Pressable onPress={() => router.navigate("/about")} key={idx}>
            <View key={idx} style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
              <Image
                source={require("@/assets/images/arona.jpg")}
                style={{ width: 90, height: 140, borderRadius: 16 }}
                resizeMode="cover"
              />
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
                  {item % 2 === 0 ? "Blue Archive: Anime Terkeren Sedunia" : "Attack On Titan: Ngantuks"}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 6 }}>
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#22c55e" }} />
                  <Text style={{ color: "white", opacity: 0.8, marginLeft: 6 }}>Finish</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "white", opacity: 0.8 }}>2023</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
                    <Star color="white" size={16} />
                    <Text style={{ color: "#22c55e", marginLeft: 4 }}>4.7</Text>
                  </View>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: "row", marginTop: 12 }}>
                  {[...Array((item % 2 === 0 ? 8 : 2)).fill(item % 2 === 0 ? "Romance" : "Action")].map((tag, idx) => (
                    <Text key={idx} style={{ color: "#ef4444", marginRight: 12 }}>{tag}</Text>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default SearchScreen;