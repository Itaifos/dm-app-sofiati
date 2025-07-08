import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { FONTS, SIZES, SPACING } from "../../constants/Themes"
import { COLORS } from "../../constants/Colors"
import { RefreshCw } from "lucide-react-native"

export const RefreshSongsButton = ({ emotion, Onpress }) => {
  const emotionColors = COLORS[emotion]
  const backgroundColor = emotionColors  ? emotionColors.primary : COLORS.darkGray
  
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      activeOpacity={0.7}
      onPress={Onpress}
    >
      <RefreshCw size={20} color={COLORS.white} />
      <Text style={styles.label}>Gerar novas músicas</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.xl,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "90",
    flexDirection: "row",  
  },
  label: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold.fontFamily,
    fontWeight: FONTS.bold.fontWeight,
    color: COLORS.white,
  },
})
