import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  AntDesign,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const badges = [
  {
    id: "moderator",
    label: "Moderator",
    description: "Tukang bersih-bersih komen dan tangan kanan atmin.",
    icon: <MaterialCommunityIcons name="gavel" size={24} color="#1e3a8a" />, // blue-800
    bgColor: "#bfdbfe", // blue-200
  },
  {
    id: "superadmin",
    label: "Super Admin",
    description: "Aku raja kau member, waspadalah jika atmin datang.",
    icon: <AntDesign name="star" size={24} color="#7f1d1d" />, // red-800
    bgColor: "#fecaca", // red-200
  },
  {
    id: "translator",
    label: "Translator",
    description: "King japanese, kontribusi atas penerjemah anime.",
    icon: <MaterialIcons name="language" size={24} color="#065f46" />, // green-800
    bgColor: "#bbf7d0", // green-200
  },
  {
    id: "nolep",
    label: "Nolep",
    description: "Pencapaian nonton anime 10+ perhari ( Nganggur jir )",
    icon: <MaterialCommunityIcons name="gamepad-variant" size={24} color="#78350f" />, // yellow-800
    bgColor: "#fef08a", // yellow-200
  },
  {
    id: "karbit",
    label: "Karbit",
    description: "Suka ngeklem waifu dari setiap anime tanpa menontonnya sampai tamat.",
    icon: <Feather name="meh" size={24} color="#581c87" />, // purple-800
    bgColor: "#e9d5ff", // purple-200
  },
  {
    id: "kripto",
    label: "Raja kripto",
    description: "Mekleren lu warna apa bos 🤪",
    icon: <FontAwesome5 name="bitcoin" size={24} color="#155e75" />, // cyan-800
    bgColor: "#cffafe", // cyan-200
  },
  {
    id: "waifu",
    label: "Istri: [char]",
    description: "Waifunya user, waifumu waifu kita juga, satu untuk semua",
    icon: <AntDesign name="heart" size={24} color="#3730a3" />, // indigo-800
    bgColor: "#c7d2fe", // indigo-200
  },
];

export default function AboutScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Info</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.sectionTitle}>Tentang Aplikasi Finime</Text>
        <Text style={styles.description}>
          Finime adalah platform mobile yang dirancang untuk pecinta anime,
          menyediakan streaming cepat, interaksi komunitas, dan fitur kustom.
          Salah satu fitur unggulan adalah sistem badge pengguna yang memberikan pengakuan
          peran dan tingkatan akses.
        </Text>

        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>List Badge</Text>
        {badges.map((badge) => (
          <View key={badge.id} style={styles.badgeContainer}>
            <View style={[styles.iconContainer, { backgroundColor: badge.bgColor }]}>
              {badge.icon}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.badgeTitle}>{badge.label}</Text>
              <Text style={styles.badgeDescription}>{badge.description}</Text>
            </View>
          </View>
        ))}

        <View style={styles.alertBoxWarning}>
          <MaterialIcons name="warning" size={28} color="#facc15" />
          <Text style={styles.alertText}>
            Harap diperhatikan bahwa konten anime di aplikasi ini bersumber dari proses
            pengambilan (scraping) situs pihak ketiga. Kami tidak memiliki lisensi resmi.
          </Text>
        </View>

        <View style={styles.alertBoxInfo}>
          <Feather name="info" size={28} color="#22d3ee" />
          <Text style={styles.alertText}>
            Untuk pengalaman menonton yang sepenuhnya legal, kami menyarankan Anda
            berkunjung ke layanan resmi seperti Crunchyroll, Netflix, atau platform lokal.
          </Text>
        </View>

        <View style={styles.alertBoxWarning}>
          <MaterialIcons name="warning" size={28} color="#facc15" />
          <Text style={styles.alertText}>
            1. Aplikasi ini hanya bersifat edukasi/demontrasi dan bukan distributor resmi.{"\n"}
            2. Nikmati anime secara aman dan legal melalui situs atau aplikasi berizin.{"\n"}
            3. Terima kasih atas pengertian dan dukungan Anda terhadap ekosistem anime!
          </Text>
        </View>

        <View style={styles.iconRow}>
          <AntDesign name="github" size={28} color="white" />
          <MaterialIcons name="hexagon" size={28} color="white" />
          <FontAwesome name="area-chart" size={28} color="white" />
          <MaterialIcons name="rocket" size={28} color="white" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "black"
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
    height: "100%",
    paddingTop: 60,
    paddingBottom: 60
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 6,
    backgroundColor: "#1e293b",
    borderRadius: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 10,
  },
  description: {
    color: "#94a3b8",
    lineHeight: 22,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 999,
    marginRight: 12,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  badgeDescription: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 2,
  },
  alertBoxWarning: {
    marginTop: 30,
    backgroundColor: "black",
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#facc15",
    borderRadius: 8,
  },
  alertBoxInfo: {
    marginTop: 30,
    backgroundColor: "black",
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#22d3ee",
    borderRadius: 8,
  },
  alertText: {
    color: "#cbd5e1",
    marginTop: 10,
    lineHeight: 20,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 30,
  },
});