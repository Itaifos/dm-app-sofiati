import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { ArrowLeft } from "lucide-react-native"
import { COLORS } from "../constants/Colors"
import { SIZES, SPACING } from "../constants/Themes"
import { GradientOverlay } from "../screens/Components/GradientOverlay"
import { RefreshSongsButton } from "../screens/Components/RefreshSongsButton"

const RecommendationScreen = ({ route }) => {
  const selectedEmotion = route.params?.emotion || "feliz"
  const primaryBgColor = COLORS[selectedEmotion]?.primary || COLORS.darkGray
  const secondaryBgColor = COLORS[selectedEmotion]?.secondary || COLORS.black

  const recommendations = [
    { id: "1", title: "Música 1", artist: "Artista 1", albumCover: "https://via.placeholder.com/300" },
    { id: "2", title: "Música 2", artist: "Artista 2", albumCover: "https://via.placeholder.com/300" },
    { id: "3", title: "Música 3", artist: "Artista 3", albumCover: "https://via.placeholder.com/300" },
  ]

  const renderSongItem = ({ item }) => {
    return (
      <View style={styles.songItem}>
        <View style={styles.albumCoverPlaceholder} />
        <View style={styles.songInfo}>
          <View>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.artistName}>{item.artist}</Text>
          </View>
        </View>
    </View>
    )
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondaryBgColor, primaryBgColor]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}
    >
      <GradientOverlay/>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <ArrowLeft size={24} color={COLORS.white} />
      </TouchableOpacity>
      
      <View style={styles.Title}>
        <Text style={styles.TitleText}>Músicas para {selectedEmotion}</Text>
      </View>
      
      <FlatList
        data={recommendations}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.RefreshButton}>
        <RefreshSongsButton emotion={selectedEmotion}/>
      </View>
    
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: SPACING.large,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 12,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  albumCoverPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.mediumGray,
    marginRight: SPACING.medium,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: SIZES.medium,
    fontWeight: "600",
    color: COLORS.white,
  },
  artistName: {
    fontSize: SIZES.small,
    color: COLORS.lightGray,
  },
  RefreshButton: {
    marginTop: 40,
    alignItems: "center",
  },
})

export default RecommendationScreen
