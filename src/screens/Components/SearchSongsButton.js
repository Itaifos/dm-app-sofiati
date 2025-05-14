
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { FONTS, SIZES, SPACING } from "../../constants/Themes"
import { COLORS } from "../../constants/Colors"

export const SearchSongsButton = ({ emotion }) => {
  const buttonColor = COLORS[emotion]?.primary || COLORS.mediumGray
  const isDisabled = !emotion

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }, isDisabled && styles.disabled]}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      <Text style={styles.label}>Descobrir Músicas</Text>
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
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold.fontFamily,
    fontWeight: FONTS.bold.fontWeight,
    color: COLORS.white,
  },
})
