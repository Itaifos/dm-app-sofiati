import { getEmotion } from './getEmotion'
import fullDataset from '../data/fullDataset.json'

function passesFilter(song, filter) {
  return Object.entries(filter).every(([key, condition]) => {
    const value = parseFloat(song[key])
    if ('min' in condition && value < condition.min) return false
    if ('max' in condition && value > condition.max) return false
    return true
  })
}

export function getSongsDataset(emotion) {
  const emotionFilter = getEmotion(emotion)

  // Embaralhar e pegar 100 músicas aleatórias
  const shuffled = fullDataset.sort(() => 0.5 - Math.random()).slice(0, 500)

  // Aplicar filtro baseado na emoção
  const filtered = shuffled.filter(song => passesFilter(song, emotionFilter))

  // Pegar até 5 músicas
  const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 5)

  return selected
  // return selected.map(song => song.track_id)
}
