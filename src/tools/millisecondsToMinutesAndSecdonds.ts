export const millisecondsToMinutesAndSeconds = (millis: number) => {
  let minutes: number = Math.floor(millis / 60000)
  const seconds = Number.parseFloat(((millis % 60000) / 1000).toFixed(0))
  if (minutes > 60) {
    const hours = (minutes / 60).toFixed(0)
    minutes -= Number.parseInt(hours) * 60
    return hours + ':' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}
