import { useEffect, useState } from "react"
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { ArrowLeft } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"
import { COLORS } from "../constants/Colors"
import { SIZES, SPACING } from "../constants/Themes"
import { GradientOverlay } from "./Components/GradientOverlay"
import { RefreshSongsButton } from "./Components/RefreshSongsButton"
import { getSongsDataset } from "../services/getSongsDataset"

const RecommendationScreen = ({ route }) => {
  const selectedEmotion = route.params?.emotion || "feliz"
  const primaryBgColor = COLORS[selectedEmotion]?.primary || COLORS.darkGray
  const secondaryBgColor = COLORS[selectedEmotion]?.secondary || COLORS.black

  const navigation = useNavigation()

  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const result = getSongsDataset(selectedEmotion)
    console.log("CHEGUEI AQUI")
    console.log(result)
    setSongs(result)
    setLoading(false)
  }, [selectedEmotion])

  const renderSongItem = ({ item }) => {
    return (
      <View style={styles.songItem}>
        <View style={styles.albumCoverPlaceholder} />
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{item.track_name}</Text>
          <Text style={styles.artistName}>{item.artists}</Text>
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
          Onpress={() => {
            setLoading(true)
            const result = getSongsDataset(selectedEmotion)
            setSongs(result)
            setLoading(false)
          }}
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
