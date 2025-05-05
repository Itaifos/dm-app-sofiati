import { View, StyleSheet } from "react-native";
import { COLORS } from "../../constants/Colors"
import { LinearGradient } from "expo-linear-gradient";
      

export const GradientOverlay = () => {
    return (
        <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
        />
    )
}
      
