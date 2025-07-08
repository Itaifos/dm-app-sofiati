import axios from 'axios'
import { encode as btoa } from 'base-64'
import { SPOTIFY_CLIENTID, SPOTIFY_ANON_SECRET, SPOTIFY_REFRESH_TOKEN } from './keys'

const CLIENT_ID = SPOTIFY_CLIENTID
const CLIENT_SECRET = SPOTIFY_ANON_SECRET
const REFRESH_TOKEN = SPOTIFY_REFRESH_TOKEN

let accessToken = ''
let tokenExpiresAt = 0

export async function getAccessToken() {
  const now = Date.now()

  if (accessToken && now < tokenExpiresAt) {
    return accessToken
  }

  try {
    const base64Auth = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
      }).toString(),
      {
        headers: {
          Authorization: `Basic ${base64Auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    const { access_token, expires_in } = response.data
    accessToken = access_token
    tokenExpiresAt = now + expires_in * 1000

    console.log('🎧 Novo token gerado com refresh_token')
    console.log(accessToken)
    return accessToken
  } catch (error) {
      console.error('❌ Erro ao obter access_token do Spotify:')
      console.error('Status:', error.response?.status)
      console.error('Data:', error.response?.data)
      console.error('Mensagem:', error.message)
    throw error
  }
}
