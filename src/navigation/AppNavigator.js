// import { NavigationContainer } from "@react-navigation/native"
// import { createStackNavigator } from "@react-navigation/stack"
// import EmotionSelectionScreen from "../screens/EmotionSelectionScreen"
// import RecommendationScreen from "../screens/RecommendationScreen"
// import LoginScreen from "../screens/LoginScreen"

// const Stack = createStackNavigator()

// export function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Stack.Screen name="LoginScreen" component={LoginScreen} />
//         <Stack.Screen name="EmotionSelectionScreen" component={EmotionSelectionScreen} />
//         <Stack.Screen name="RecommendationScreen" component={RecommendationScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

//MODELO NOVO abaixo

import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { supabase } from '../util/supabase'

import LoginScreen from '../screens/LoginScreen'
import EmotionSelectionScreen from '../screens/EmotionSelectionScreen'
import RecommendationScreen from '../screens/RecommendationScreen'

const Stack = createStackNavigator()

export function AppNavigator() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verifica se há uma sessão existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Ouvinte para mudanças de autenticação (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (loading) return null

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!session ? (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="EmotionSelectionScreen" component={EmotionSelectionScreen} />
            <Stack.Screen name="RecommendationScreen" component={RecommendationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

