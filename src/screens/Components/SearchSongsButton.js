
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { FONTS, SIZES, SPACING } from "../../constants/Themes"
import { COLORS } from "../../constants/Colors"

export const SearchSongsButton = ({ emotion }) => {
  // Protege contra emoções indefinidas
  const buttonColor = COLORS[emotion]?.primary || COLORS.mediumGray
  const isDisabled = !emotion

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }, isDisabled && styles.disabled]}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>Descobrir Músicas</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.large,
    paddingHorizontal: SPACING.xl,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold.fontFamily,
    fontWeight: FONTS.bold.fontWeight,
    color: COLORS.white,
  },
})
