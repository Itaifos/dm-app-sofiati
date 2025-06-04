
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { RefreshCw } from "lucide-react-native"
import { FONTS, SIZES, SPACING } from "../../constants/Themes"
import { COLORS } from "../../constants/Colors"

export const SearchSongsButton = ({ emotion }) => {
  const emotionColors = COLORS[emotion]
  const backgroundColor = selected ? emotionColors.primary : COLORS.darkGray
  
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      activeOpacity={0.7}
    >
      <RefreshCw size={20} color={COLORS.white} style={{ marginRight: 8 }} />
      <Text style={styles.label}>Descobrir novas Músicas</Text>
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
    width: "90%"
  },
  label: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold.fontFamily,
    fontWeight: FONTS.bold.fontWeight,
    color: COLORS.white,
  },
})
