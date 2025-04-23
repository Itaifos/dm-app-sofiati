import { StatusBar } from 'expo-status-bar';
import EmotionSelectionScreen from "./src/screens/EmotionSelectionScreen"
import { SafeAreaView } from "react-native";


export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar style="light" />
      <EmotionSelectionScreen/>
    </SafeAreaView>
  )
}

