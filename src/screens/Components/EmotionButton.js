import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import { COLORS } from "../../constants/Colors"
import {SIZES, SPACING } from "../../constants/Themes"
import { GradientColor } from "../Components/GradientColor"

export const EmotionButton = ({ icon: Icon, label, selected, onPress }) => {
  const emotionColors = COLORS[label] 
  const borderColor = selected ? "transparent" : COLORS.mediumGray
  const textColor = COLORS.white
  const backgroundColor = selected ? emotionColors.primary : COLORS.darkGray


  return (
    <TouchableOpacity 
      style={[styles.button, { borderColor }]} 
      onPress={onPress}
    >
      
      {selected && (
        <GradientColor primary={emotionColors.primary} secondary={emotionColors.secondary}/>
      )}
      
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
    overflow: "hidden",
    borderWidth: 2
  },
  icon: {
    marginBottom: SPACING.small,  
  },
  label: {
    fontSize: SIZES.medium,       
    fontWeight: "500",            
  },
})

