import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
      

export const GradientOverlay = () => {
    return (
        <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.9)']}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
        />
    )
}
      
