import { Text, View, StyleSheet, SafeAreaView } from "react-native"
import { useState } from "react"
import { COLORS } from "../constants/Colors"
import { Smile, Frown, Coffee, Zap } from "lucide-react-native"
import { EmotionButton } from "./Components/EmotionButton"
import { SearchSongsButton } from "./Components/SearchSongsButton"


const EmotionSelectionScreen = () => {
  //isso é um reacthook
  const [selectedEmotion, setSelectedEmotion] = useState("")

  const backgroundColor = selectedEmotion ? COLORS[selectedEmotion].background : COLORS.black

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.Title}>
        <Text style={styles.titleText}>Como você está se sentindo?</Text>
      </View>

      <View style={styles.ButtonArea}>
        <EmotionButton
            icon={Smile}
            label="happy"
            selected={selectedEmotion === "happy"}
            onPress={() => setSelectedEmotion("happy")}
        />

        <EmotionButton
            icon={Frown}
            label="sad"
            selected={selectedEmotion === "sad"}
            onPress={() => setSelectedEmotion("sad")}
        />

        <EmotionButton
            icon={Coffee}
            label="relaxed"
            selected={selectedEmotion === "relaxed"}
            onPress={() => setSelectedEmotion("relaxed")}
        />

        <EmotionButton
            icon={Zap}
            label="energetic"
            selected={selectedEmotion === "energetic"}
            onPress={() => setSelectedEmotion("energetic")}
        />
      </View>

      <View style={styles.ButtonNext}>
        <SearchSongsButton emotion={selectedEmotion} />
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Title: {
    alignItems: "center",
    marginVertical: 24,
  },
  titleText: {
    fontSize: 20,
    color: COLORS.white,
  },
  ButtonArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  ButtonNext: {
    marginTop: 40,
    alignItems: "center",
  },
})

export default EmotionSelectionScreen
