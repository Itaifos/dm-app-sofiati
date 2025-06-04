import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import EmotionSelectionScreen from "../screens/EmotionSelectionScreen"
import RecommendationScreen from "../screens/RecommendationScreen"

const Stack = createStackNavigator()

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="EmotionSelectionScreen" component={EmotionSelectionScreen} />
        <Stack.Screen name="RecommendationScreen" component={RecommendationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
