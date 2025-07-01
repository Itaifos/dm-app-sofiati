import axios from 'axios'
import { encode as btoa } from 'base-64'
import { YOUR_REACT_NATIVE_SPOTIFY_CLIENTID, YOUR_REACT_NATIVE_SPOTIFY_ANON_SECRET } from './keys'

const CLIENT_ID = YOUR_REACT_NATIVE_SPOTIFY_CLIENTID
const CLIENT_SECRET = YOUR_REACT_NATIVE_SPOTIFY_ANON_SECRET


let accessToken = ''
let tokenExpiresAt = 0

export async function getAccessToken() {
  const now = Date.now()

  if (accessToken && now < tokenExpiresAt) {
    return accessToken
  }

  const authString = `${CLIENT_ID}:${CLIENT_SECRET}`
  const base64Auth = btoa(authString)

  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
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

  return accessToken
}
