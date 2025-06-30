
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { FONTS, SIZES, SPACING } from "../../constants/Themes"
import { COLORS } from "../../constants/Colors"

export const CreatePlaylistButton = ({ emotion, Onpress }) => {
  const emotionColors = COLORS[emotion]
  const backgroundColor = emotionColors  ? emotionColors.primary : COLORS.darkGray
  
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      activeOpacity={0.7}
      onPress={Onpress}
    >
      <Text style={styles.label}>Criar Playlist</Text>
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
    width: "55%",
    flexDirection: "row",  
  },
  label: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold.fontFamily,
    fontWeight: FONTS.bold.fontWeight,
    color: COLORS.white,
  },
})
