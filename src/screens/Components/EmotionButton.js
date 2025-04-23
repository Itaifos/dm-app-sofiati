// Components/EmotionButton.js
import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import { COLORS } from "../../constants/Colors"
import {SIZES, SPACING } from "../../constants/Themes"

export const EmotionButton = ({ icon: Icon, label, selected, onPress }) => {
  const emotionColors = COLORS[label]
  const backgroundColor = selected ? COLORS.white : COLORS.darkGray
  const textColor = selected ? emotionColors.primary : COLORS.white
  const borderColor = selected ? emotionColors.primary : COLORS.mediumGray

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor, borderColor }]} onPress={onPress}>
      <View style={styles.icon}>
        {Icon && <Icon size={32} color={textColor} />}
      </View>
      <Text style={{ color: textColor, fontWeight: "bold" }}>
        {capitalize(label)}
      </Text>
    </TouchableOpacity>
  )
}

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

const styles = StyleSheet.create({
  button: {
    width: "45%",                 
    borderRadius: 16,             
    padding: SPACING.large,       
    alignItems: "center",         
    justifyContent: "center",     
    marginBottom: SPACING.medium, 
  },
  icon: {
    marginBottom: SPACING.small,  
  },
  label: {
    fontSize: SIZES.medium,       
    fontWeight: "500",            
  },
})

