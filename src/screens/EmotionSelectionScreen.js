import { Text, View, StyleSheet } from "react-native"
import { useState } from "react"
import { COLORS } from "../constants/Colors"
import { Smile, Frown, Coffee, Zap } from "lucide-react-native"
import { EmotionButton } from "./Components/EmotionButton"
import { SearchSongsButton } from "./Components/SearchSongsButton"
import { LinearGradient } from "expo-linear-gradient"
import { GradientOverlay } from "./Components/GradientOverlay"
import { FONTS, SIZES } from "../constants/Themes"
import { useNavigation } from "@react-navigation/native"



const EmotionSelectionScreen = () => {
  //reacthook
  const [selectedEmotion, setSelectedEmotion] = useState("")
  const primaryBgColor = COLORS[selectedEmotion]?.primary || COLORS.darkGray
  const secondaryBgColor = COLORS[selectedEmotion]?.secondary || COLORS.black
  const navigation = useNavigation()


  return (
    <LinearGradient 
      style={styles.container}
      colors={[secondaryBgColor, primaryBgColor]}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}
    >
      <GradientOverlay/>

      <View style={styles.Title}>
        <Text style={styles.TitleText}>Como você está se sentindo?</Text>
      </View>

      <View style={styles.ButtonArea}>
        <EmotionButton
            icon={Smile}
            label="feliz"
            selected={selectedEmotion === "feliz"}
            onPress={() => setSelectedEmotion("feliz")}
        />

        <EmotionButton
            icon={Frown}
            label="triste"
            selected={selectedEmotion === "triste"}
            onPress={() => setSelectedEmotion("triste")}
        />

        <EmotionButton
            icon={Coffee}
            label="relaxado"
            selected={selectedEmotion === "relaxado"}
            onPress={() => setSelectedEmotion("relaxado")}
        />

        <EmotionButton
            icon={Zap}
            label="animado"
            selected={selectedEmotion === "animado"}
            onPress={() => setSelectedEmotion("animado")}
        />
      </View>

      <View style={styles.ButtonNext}>
        <SearchSongsButton 
          emotion={selectedEmotion}
          onPress={() => {
            if (selectedEmotion) {
              navigation.navigate("RecommendationScreen", { emotion: selectedEmotion})
            }
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
  Title: {
    marginTop: 80,
    alignItems: "center",
    marginVertical: 24,
  },
  TitleText: {
    fontSize: SIZES.xxl,
    color: COLORS.white,
    textAlign: "center"
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
