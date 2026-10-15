import { scrambleText } from "@/lib/scrambleText"

export default function initNavigationScramble(root: HTMLElement) {
  const controller = new AbortController()
  const options = { signal: controller.signal }
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const stops: (() => void)[] = []
  const labels = root.querySelectorAll<HTMLElement>(
    ".tree-label, .directory-brand > span, .mobile-directory-brand > span, .workspace-breadcrumb a, .workspace-breadcrumb [aria-current], [data-reading-toc], [data-context-label]",
  )
  labels.forEach((label) => {
    const control = label.closest<HTMLElement>("a, button, time") || label
    const text = label.textContent?.trim() || ""
    const source = document.createElement("span")
    source.className = "scramble-source"
    source.textContent = text
    label.replaceChildren(source)
    label.classList.add("scramble-label")
    let cancel: (() => void) | undefined
    let overlay: HTMLSpanElement | undefined
    const stop = () => {
      cancel?.()
      cancel = undefined
      overlay?.remove()
      overlay = undefined
      delete label.dataset.scrambling
    }
    const play = () => {
      stop()
      if (reducedMotion.matches) return
      overlay = document.createElement("span")
      overlay.className = "scramble-characters"
      overlay.textContent = text
      overlay.setAttribute("aria-hidden", "true")
      label.append(overlay)
      label.dataset.scrambling = "true"
      cancel = scrambleText(
        text,
        (value) => {
          if (overlay) overlay.textContent = value
          if (value === text) {
            overlay?.remove()
            overlay = undefined
            delete label.dataset.scrambling
          }
        },
        450,
      )
    }
    control.addEventListener(
      "mouseenter",
      () => {
        if (window.matchMedia("(hover: hover)").matches) play()
      },
      options,
    )
    control.addEventListener("mouseleave", stop, options)
    control.addEventListener("focus", play, options)
    control.addEventListener("blur", stop, options)
    stops.push(stop)
  })
  reducedMotion.addEventListener(
    "change",
    () =>
      stops.forEach((stop) => {
        stop()
      }),
    options,
  )
  return () => {
    controller.abort()
    stops.forEach((stop) => {
      stop()
    })
  }
}
