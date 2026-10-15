const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz"

export function scrambleText(text: string, render: (value: string) => void, duration = text.length * 90) {
  const started = performance.now()
  const finish = () => {
    clearInterval(interval)
    render(text)
  }
  const interval = setInterval(() => {
    const progress = Math.min(1, (performance.now() - started) / Math.max(1, duration))
    const revealed = Math.floor(progress * text.length)
    render(
      Array.from(text, (character, index) =>
        index < revealed || !/[a-z0-9]/i.test(character)
          ? character
          : LETTERS[Math.floor(Math.random() * LETTERS.length)],
      ).join(""),
    )
    if (progress === 1) finish()
  }, 30)
  return finish
}
