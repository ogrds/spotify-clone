export const COLORS_GRADIENT = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
  'from-orange-500',
  'from-teal-500',
  'from-cyan-500',
  'from-amber-500',
  'from-lime-500',
  'from-emerald-500',
  'from-sky-500',
  'from-fuchsia-500',
  'from-violet-500',
  'from-pink-500',
  'from-rose-500',
]

export const millis2MinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000)
  const seconds = Math.floor((millis % 60000) / 1000).toFixed(0)

  return Number(seconds) == 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds
}
