import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { useState } from 'react'
import { COLORS } from '../constants/Colors'
import { FONTS, SPACING, SIZES } from '../constants/Themes'
import { supabase } from '../util/supabase'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()


  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
        Alert.alert(error.message)
    } else {
        navigation.replace('EmotionSelectionScreen')
    }
        
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Verifique sua caixa de entrada para verificação de e-mail!')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎧 Spotifeeling</Text>
      <Text style={styles.subtitle}>fell your music</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={COLORS.lightGray}
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor={COLORS.lightGray}
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.disabled]}
        onPress={signInWithEmail}
        disabled={loading}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.outlineButton, loading && styles.disabled]}
        onPress={signUpWithEmail}
        disabled={loading}
        activeOpacity={0.7}
      >
        <Text style={styles.outlineButtonText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
    justifyContent: 'center',
    padding: SPACING.large,
  },
  title: {
    fontSize: SIZES.xxl,
    fontFamily: FONTS.bold.fontFamily,
    fontWeight: FONTS.bold.fontWeight,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.medium,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.lightGray,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  input: {
    backgroundColor: COLORS.mediumGray,
    color: COLORS.white,
    borderRadius: 12,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  button: {
    backgroundColor: '#1DB954',
    paddingVertical: SPACING.medium,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: FONTS.bold.fontWeight,
  },
  outlineButton: {
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: SPACING.medium,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: FONTS.bold.fontWeight,
  },
  disabled: {
    opacity: 0.6,
  },
})

export default LoginScreen
