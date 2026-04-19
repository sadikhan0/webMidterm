let current = null

export function playLightsaber() {
  try {
    if (current) {
      current.pause()
      current.currentTime = 0
    }
    current = new Audio('/lightsaber.mp3')
    current.volume = 0.4
    current.play().catch(() => {})
  } catch (_) {}
}
