const timeLabel = desimal => {
  if (desimal >= 1) {
    let hour = desimal - (desimal % 1)
    if (desimal % 1 > 0) {
      let minutes = (desimal % 1) * 60
      return `${hour} h ${minutes} min`
    } else {
      return `${hour} h`
    }
  } else {
    let minutes = (desimal % 1) * 60
    return `${minutes} min`
  }
}

const colorLabels = [
  { id: 0, color: '#df7ace' },
  { id: 1, color: '#37bc9b' },
  { id: 2, color: '#4a89dc' },
  { id: 3, color: '#da4453' },
  { id: 4, color: '#8cc152' },
  { id: 5, color: '#f6bb42' },
  { id: 6, color: '#e9573f' },
  { id: 7, color: '#967adc' },
  { id: 8, color: '#d770ad' },
  { id: 9, color: '#434a54' },
  { id: 10, color: '#3bafda' },
  { id: 11, color: '#ab8ce4' },
  { id: 12, color: '#26c6da' },
  { id: 13, color: '#00c292' },
  { id: 14, color: '#4099ff' },
  { id: 15, color: '#9bc6f8' }
]

const getColorById = id => {
  const item = colorLabels.find(color => color.id === id)
  return item.color
}

const getRandomColor = () => {
  const randomInt = Math.floor(Math.random() * 15)
  const color = getColorById(randomInt)
  return color
}

module.exports = { timeLabel, colorLabels, getColorById, getRandomColor }
