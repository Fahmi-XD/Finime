import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Flame, Star, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

const WatchTodayScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionLabel}>Watch today</Text>

      <View style={styles.featuredContainer}>
        <Image source={require('@/assets/images/arona.jpg')} style={[styles.featuredImage, styles.leftImage]} />
        <Image source={require('@/assets/images/konosuba.jpg')} style={[styles.featuredImage, styles.rightImage]} />
        <Image source={require('@/assets/images/aot.jpg')} style={styles.centerImage} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.subheading}>Up on your watchlist</Text>
        <Text style={styles.title}>Attack On Titan: Ngantuks</Text>
        <View style={styles.row}>
          <Text style={styles.meta}>2020</Text>
          <View style={styles.row}>
            <Star size={16} />
            <Text style={styles.rating}>4.4</Text>
          </View>
        </View>
      </View>

      {/* <Image source={require('@/assets/images/aot.jpg')} style={styles.backgroundBlur} /> */}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recently added <Flame size={20} /></Text>
        <TouchableOpacity onPress={() => router.navigate("/search")}> 
          <View style={styles.row}>
            <Text style={styles.seeAll}>Lainnya</Text>
            <ArrowRight size={16} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        {[{
          title: "KonoSuba: God's Blessing on This Wonderful World! 3",
          status: 'On Going',
          image: require('@/assets/images/konosuba.jpg'),
          color: '#FACC15'
        }, {
          title: 'Blue Archive: Anime Terkeren Sedunia',
          status: 'Finish',
          image: require('@/assets/images/arona.jpg'),
          color: '#22C55E'
        }, {
          title: 'Attack On Titan: Ngantuks',
          status: 'On Going',
          image: require('@/assets/images/aot.jpg'),
          color: '#FACC15'
        }].map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.row}>
                <View style={[styles.statusDot, { backgroundColor: item.color }]} />
                <Text style={styles.status}>{item.status}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.meta}>2020</Text>
                <View style={styles.row}>
                  <Star size={16} />
                  <Text style={styles.rating}>4.4</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingHorizontal: 30,
  },
  sectionLabel: {
    color: '#fff',
    opacity: 0.7,
    marginTop: 16,
    fontSize: 16,
  },
  featuredContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    position: 'relative',
  },
  featuredImage: {
    width: 210,
    height: 320,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    position: 'absolute',
  },
  leftImage: {
    transform: [{ rotate: '-5deg' }, { translateX: -50 }],
  },
  rightImage: {
    transform: [{ rotate: '8deg' }, { translateX: 50 }],
  },
  centerImage: {
    width: 255,
    height: 370,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    transform: [{ rotate: '1deg' }],
  },
  detailsContainer: {
    marginTop: 40,
  },
  subheading: {
    color: '#fff',
    opacity: 0.7,
    fontSize: 14,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  meta: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 14,
  },
  rating: {
    color: '#22C55E',
    fontSize: 14,
    marginLeft: 4,
  },
  backgroundBlur: {
    position: 'absolute',
    top: -60,
    left: 0,
    width: screenWidth,
    height: 650,
    opacity: 0.9,
    zIndex: -1,
    resizeMode: 'cover',
  },
  sectionHeader: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAll: {
    color: '#EF4444',
    fontSize: 14,
  },
  gridContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 270,
    borderRadius: 20,
  },
  cardContent: {
    marginTop: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  status: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 12,
    marginLeft: 6,
  },
});

export default WatchTodayScreen;
