import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, type NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  index: undefined;
  anime: undefined;
};
  
const ComingSoonScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.subtitle}>Halaman Manga Sedang Tahap Pengembangan</Text>
        <Text style={styles.paragraph}>
          Kami sedang menyiapkan fitur manga terbaik untuk kamu. Nantikan update terbaru dari kami!
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("index")}> 
            <Text style={styles.backText}>Kembali ke Beranda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.animeButton} onPress={() => navigation.navigate("anime")}> 
            <Text style={styles.animeText}>Lihat Anime</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    width: "100%",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#ef4444",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 10,
  },
  backButton: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "rgba(239,68,68,0.3)",
    alignItems: "center",
    marginBottom: 10,
  },
  backText: {
    fontWeight: "bold",
    color: "#ef4444",
    fontSize: 16,
  },
  animeButton: {
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3b82f6",
    backgroundColor: "rgba(59,130,246,0.1)",
    alignItems: "center",
  },
  animeText: {
    fontWeight: "bold",
    color: "#60a5fa",
    fontSize: 16,
  },
});

export default ComingSoonScreen;
