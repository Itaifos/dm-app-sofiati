import { useEffect, useState } from "react"
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image, Linking } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { ArrowLeft } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"
import { COLORS } from "../constants/Colors"
import { SIZES, SPACING } from "../constants/Themes"
import { GradientOverlay } from "./Components/GradientOverlay"
import { RefreshSongsButton } from "./Components/RefreshSongsButton"
import { getSongsDataset } from "../services/getSongsDataset"
import { getSongsSpotify } from "../services/getSongsSpotify"

const RecommendationScreen = ({ route }) => {
  const selectedEmotion = route.params?.emotion || "feliz"
  const primaryBgColor = COLORS[selectedEmotion]?.primary || COLORS.darkGray
  const secondaryBgColor = COLORS[selectedEmotion]?.secondary || COLORS.black

  const navigation = useNavigation()

  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)

  const openInSpotify = (trackId) => {
    const url = `https://open.spotify.com/track/${trackId}`
    Linking.openURL(url)
  }

  const loadAndEnrichSongs = async (emotion) => {
    setLoading(true)
    try {
      const rawSongs = getSongsDataset(emotion)
      console.log(rawSongs)
      console.log("CHEGUEI AQUI")
      const enrichedSongs = await getSongsSpotify(rawSongs)
      console.log(enrichedSongs)
      console.log("CHEGUEI AQUI")
      setSongs(enrichedSongs)
    } catch (err) {
      console.error("Erro ao carregar músicas:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAndEnrichSongs(selectedEmotion)
  }, [selectedEmotion])


  const renderSongItem = ({ item }) => {
    return (
      <TouchableOpacity 
        onPress={() => openInSpotify(item.track_id)}
        activeOpacity={0.7}
      >
        <View style={styles.songItem}>
          {item.image ? (
            <Image 
              source={{ uri: item.image }} 
              style={styles.albumCover} 
            />
          ) : (
            <View style={styles.albumCoverPlaceholder} />
          )}
          <View style={styles.songInfo}>
            <Text style={styles.songTitle}>{item.track_name}</Text>
            <Text style={styles.artistName}>{item.artists}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondaryBgColor, primaryBgColor]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}
    >
      <GradientOverlay />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={COLORS.white} />
        </TouchableOpacity>

        <View style={styles.title}>
          <Text style={styles.titleText}>Músicas para {selectedEmotion}</Text>
        </View>
      </View>

      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.track_id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {loading ? "Carregando músicas..." : "Nenhuma música encontrada."}
          </Text>
        }
      />

      <View style={styles.ButtonArea}>
        <RefreshSongsButton
          emotion={selectedEmotion}
          Onpress={() => loadAndEnrichSongs(selectedEmotion)}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 40,
  },
  title: {
    alignItems: "center",
    marginLeft: 20,
  },
  titleText: {
    fontSize: SIZES.large,
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  listContent: {
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.large,
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
  albumCover: {
    width: 48,
    height: 48,
    borderRadius: 8,
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
  emptyText: {
    textAlign: "center",
    color: COLORS.lightGray,
    marginTop: SPACING.large,
  },
  ButtonArea: {
    position: "absolute",
    bottom: SPACING.xl,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: SPACING.large,
  },
})

export default RecommendationScreen
