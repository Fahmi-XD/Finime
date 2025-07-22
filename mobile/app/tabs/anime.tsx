import React from 'react';
import { View, ScrollView, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { ArrowRight, Star } from 'lucide-react-native';

import { truncate } from '@/lib/string';

interface ICategoryList {
  title: string;
  data: any
}

const categories = [
  {
    title: 'Isekai',
    data: [
      {
        title: "KonoSuba: God's Blessing on This Wonderful World! 3",
        image: require('@/assets/images/konosuba.jpg'),
        status: 'On Going',
        year: '2020',
        rating: '4.4',
        color: '#FACC15',
      },
      {
        title: 'Attack On Titan: Ngantuks',
        image: require('@/assets/images/aot.jpg'),
        status: 'On Going',
        year: '2020',
        rating: '4.4',
        color: '#FACC15',
      },
      {
        title: 'Blue Archive Anime: Masterpiece',
        image: require('@/assets/images/arona.jpg'),
        status: 'Finish',
        year: '2020',
        rating: '4.4',
        color: '#22C55E',
      },
      {
        title: "KonoSuba: God's Blessing on This Wonderful World! 3",
        image: require('@/assets/images/konosuba.jpg'),
        status: 'On Going',
        year: '2020',
        rating: '4.4',
        color: '#FACC15',
      },
      {
        title: 'Attack On Titan: Ngantuks',
        image: require('@/assets/images/aot.jpg'),
        status: 'On Going',
        year: '2020',
        rating: '4.4',
        color: '#FACC15',
      },
      {
        title: 'Blue Archive Anime: Masterpiece',
        image: require('@/assets/images/arona.jpg'),
        status: 'Finish',
        year: '2020',
        rating: '4.4',
        color: '#22C55E',
      },
    ],
  },
  {
    title: 'Romance',
    data: [
      {
        title: "KonoSuba: God's Blessing on This Wonderful World! 3",
        image: require('@/assets/images/konosuba.jpg'),
        status: 'On Going',
        year: '2020',
        rating: '4.4',
        color: '#FACC15',
      },
      {
        title: 'Attack On Titan: Ngantuks',
        image: require('@/assets/images/aot.jpg'),
        status: 'On Going',
        year: '2020',
        rating: '4.4',
        color: '#FACC15',
      },
      {
        title: 'Blue Archive Anime: Masterpiece',
        image: require('@/assets/images/arona.jpg'),
        status: 'Finish',
        year: '2020',
        rating: '4.4',
        color: '#22C55E',
      },
    ],
  },
  {
    title: 'School',
    data: [],
  }
];

const CategorySection = ({ title, data }: ICategoryList) => (
  <View style={styles.categoryContainer}>
    <View style={styles.categoryHeader}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <TouchableOpacity>
        <ArrowRight color="white" size={20} />
      </TouchableOpacity>
    </View>
    <FlatList
      data={data}
      keyExtractor={(item, index) => item.title + index}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 20 }}
      ListEmptyComponent={() => <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>Tidak ada daftar anime untuk saat ini.</Text>}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={item.image} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{truncate(item.title)}</Text>
          <View style={styles.statusRow}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaYear}>{item.year}</Text>
            <View style={styles.ratingRow}>
              <Star color="#22C55E" size={14} />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
        </View>
      )}
    />
  </View>
);

const CategoryHorizontalList = () => {
  return (
    <ScrollView style={styles.container}>
      {categories.map((cat, idx) => (
        <CategorySection key={idx} title={cat.title} data={cat.data} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  categoryContainer: {
    marginBottom: 30,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    width: 120,
  },
  cardImage: {
    width: 120,
    height: 160,
    borderRadius: 16,
  },
  cardTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: "auto",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    marginLeft: 6,
    color: 'white',
    opacity: 0.8,
    fontSize: 11,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  metaYear: {
    color: 'white',
    opacity: 0.8,
    fontSize: 11,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: '#22C55E',
    fontSize: 11,
  },
});

export default CategoryHorizontalList;
