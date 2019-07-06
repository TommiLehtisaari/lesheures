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

module.exports = { timeLabel }
