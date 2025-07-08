export function getEmotion(emotion) {
  switch (emotion.toLowerCase()) {
    case 'triste':
      return { valence: { max: 0.3 }, energy: { max: 0.4 }, tempo: { max: 100 } }
    case 'feliz':
      return { valence: { min: 0.7 }, energy: { min: 0.6 }, tempo: { min: 100 } }
    case 'relaxado':
      return { valence: { min: 0.5 }, energy: { max: 0.4 }, acousticness: { min: 0.6 } }
    case 'animado':
      return { valence: { min: 0.7 }, energy: { min: 0.7 }, tempo: { min: 120 } }
    default:
      return {}
  }
}
