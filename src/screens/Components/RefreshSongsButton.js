
import { TouchableOpacity, StyleSheet } from "react-native"
import { RefreshCw } from "lucide-react-native"
import { SPACING } from "../../constants/Themes"
import { COLORS } from "../../constants/Colors"

export const RefreshSongsButton = ({ emotion, Onpress }) => {
  const emotionColors = COLORS[emotion]
  const backgroundColor = emotionColors  ? emotionColors.secondary : COLORS.darkGray
  
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      activeOpacity={0.7}
      onPress={Onpress}
    >
      <RefreshCw size={20} color={COLORS.white} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.small,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    flexDirection: "row",  
  },
})
