import axios from 'axios'
import { getAccessToken } from '../util/spotify'

export async function getSongsSpotify(datasetSongs) {
  const token = await getAccessToken()

  const dataSongs = await Promise.all(
    datasetSongs.map(async (song) => {
      try {
        const { track_id } = song
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${track_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = response.data
        return {
          ...song,
          image: data.album?.images?.[0]?.url || null,
        }
      } catch (err) {
        console.warn(`Erro no track ${song.track_id}`, err.message)
        return { ...song, image: null, }
      }
    })
  )

  return dataSongs
}