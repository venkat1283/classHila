
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import images from '../assets/images';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const LeaderSpotlightCard = ({ rank, name, score, time, image, isTopLeader, backgroundImage }) => (
  // <ImageBackground source={backgroundImage} style={[styles.leaderSpotlightCard, isTopLeader && styles.topLeaderCard]} imageStyle={styles.leaderCardBackgroundImage}>
    <View style={styles.rankContainer}>
      <Image source={image} style={styles.leaderImage} />
      <Text style={styles.leaderName}>{name}</Text>
    <ImageBackground source={backgroundImage} style={[styles.leaderSpotlightCard, isTopLeader && styles.topLeaderCard]} imageStyle={styles.leaderCardBackgroundImage}>
    <Text style={[styles.leaderRank, isTopLeader && styles.topLeaderRank]}>{rank}</Text>
    <Text style={styles.leaderScore}>{score < 10 ? `0${score}` : score}</Text>
    <View style={styles.leaderTimeContainer}>
      <Clock size={12} color="#6A6A85" />
      <Text style={styles.leaderTime}>{time}</Text>
    </View>
  </ImageBackground>
  </View>
);

const LeaderListItem = ({ rank, name, score, time, image }) => (
  <View style={styles.leaderListItem}>
    <Text style={styles.listItemRank}>{rank}</Text>
    <Image source={image} style={styles.listItemImage} />
    <Text style={styles.listItemName}>{name}</Text>
    <Text style={styles.listItemScore}>{score < 10 ? `0${score}` : score}</Text>
    <View style={styles.listItemTimeContainer}>
      <Clock size={12} color="#6A6A85" />
      <Text style={styles.listItemTime}>{time}</Text>
    </View>
  </View>
);

const LeaderBoardScreen = () => {
  const router = useRouter();
  const leaders = [
    { rank: 2, name: 'Trump', score: 2, time: '05:32', image: images.pic2, backgroundImage: images.secondPlaceBg },
    { rank: 1, name: 'Mahesh Chari', score: 4, time: '05:32', image: images.pic1, backgroundImage: images.firstPlaceBg },
    { rank: 3, name: 'Ivanna', score: 3, time: '05:32', image: images.pic3, backgroundImage: images.thirdPlaceBg },
    { rank: 4, name: 'Mahesh Chari', score: 4, time: '05:32', image: images.pic1, backgroundImage: null },
    { rank: 5, name: 'Ronald', score: 4, time: '05:42', image: images.pic2, backgroundImage: null },
    { rank: 6, name: 'Eleanor Pena', score: 4, time: '07:32', image: images.pic3, backgroundImage: null },
    { rank: 7, name: 'Savannah', score: 3, time: '08:32', image: images.pic1, backgroundImage: null },
    { rank: 8, name: 'Wade Warren', score: 2, time: '09:32', image: images.pic2, backgroundImage: null },
  ];
  const top3Leaders = leaders.slice(0, 3);
  const remainingLeaders = leaders.slice(3);
  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Svg width="100%" height={389} viewBox="0 0 375 389" style={styles.backgroundSvg}>
        <Defs>
          <LinearGradient id="gradient" x1="187.5" y1="0" x2="187.5" y2="389" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#E65600" />
            <Stop offset="1" stopColor="#FF9758" />
          </LinearGradient>
        </Defs>
        <Path
          d="M0 13C0 -6.64 0 -16.46 4.42 -23.67C6.89 -27.71 10.28 31.1 14.32 -33.57C21.53 -38 31.35 -38 51 -38H324C343.64 -38 353.46 -38 360.67 -33.57C364.71 -31.1 368.1 -27.71 370.57 -23.67C375 -16.46 375 -6.64 375 13V268.3C375 281.47 375 288.06 372.59 293.69C371.23 296.88 369.33 299.81 366.98 302.34C362.81 306.83 356.79 309.52 344.76 314.88L208.26 375.74C199.86 379.48 195.66 381.36 191.26 381.91C188.76 382.23 186.23 382.23 183.73 381.91C179.33 381.36 175.13 379.48 166.73 375.74L30.23 314.88C18.2 309.52 12.18 306.83 8.01 302.34C5.66 299.81 3.76 296.88 2.4 293.69C0 288.06 0 281.47 0 268.3V13Z"
          fill="url(#gradient)"
        />
      </Svg>
      

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image source={images.left} style={styles.leftImg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Leaderboard</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        <View style={styles.topLeadersContainer}>
            {top3Leaders.map((leader) => (
              <LeaderSpotlightCard key={leader.rank} {...leader} isTopLeader={leader.rank === 1} />
            ))}
          </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.remainingLeadersContainer}>
            {remainingLeaders.map((leader) => (
              <LeaderListItem key={leader.rank} {...leader} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  svgShadowWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12, // For Android shadow
    zIndex: 0,
  },
  container: { flex: 1, backgroundColor: '#fff' },
  backgroundSvg: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 0, },
  contentContainer: { flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 },
  backButton: { paddingTop:8 },
  leftImg:{
    width:24,
    height:24
  },
  headerTitle: { fontFamily: 'DMSans_SBD', fontSize: 18, color: '#FFFFFF', flex: 1, textAlign: 'center', marginLeft: -24 },
  headerRightPlaceholder: { width: 24 },
  scrollContent: { flexGrow: 1 },
  topLeadersContainer: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-end', paddingHorizontal: 10, marginBottom: 20 },
  leaderSpotlightCard: { borderRadius: 16, paddingVertical: 15, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'flex-start', width: 81, height: 180, position: 'relative' },
  leaderCardBackgroundImage: { borderRadius: 16 },
  topLeaderCard: { height: 240, marginBottom: -20, marginTop:32 },
  rankContainer:{
    flex:1,
    marginHorizontal:24
  },
  leaderImageContainer: { position: 'absolute', top: -30, alignItems: 'center', width: '100%' },
  leaderImage: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: '#FFFFFF' },
  leaderName: { fontFamily: 'DMSans_MD', fontSize: 12, color: '#6A6A85', marginTop: 15, textAlign: 'center' },
  leaderRank: { fontFamily: 'DMSans_BD', fontSize: 30, color: '#1F1F39', marginTop: 5 },
  topLeaderRank: { color: '#FF731F' },
  leaderScore: { fontFamily: 'DMSans_BD', fontSize: 14, color: '#1F1F39', marginTop: 5 },
  leaderTimeContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  leaderTime: { fontFamily: 'DMSans_RG', fontSize: 12, color: '#6A6A85', marginLeft: 4 },
  remainingLeadersContainer: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 20, paddingHorizontal: 24, paddingBottom: 20, flex: 1 },
  leaderListItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 16, marginBottom: 12, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  listItemRank: { fontFamily: 'DMSans_BD', fontSize: 16, color: '#1F1F39', width: 30, textAlign: 'center' },
  listItemImage: { width: 40, height: 40, borderRadius: 20, marginRight: 16 },
  listItemName: { fontFamily: 'DMSans_MD', fontSize: 14, color: '#1F1F39', flex: 1 },
  listItemScore: { fontFamily: 'DMSans_BD', fontSize: 14, color: '#1F1F39', marginRight: 10 },
  listItemTimeContainer: { flexDirection: 'row', alignItems: 'center' },
  listItemTime: { fontFamily: 'DMSans_RG', fontSize: 12, color: '#6A6A85', marginLeft: 4 }
});

export default LeaderBoardScreen;
