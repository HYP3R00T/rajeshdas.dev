// Delegated events also cover React controls and Astro page transitions.
let trigger: HTMLElement | null = null
let bubble: HTMLDivElement | null = null
let timer: ReturnType<typeof setTimeout> | undefined
let dismissed: HTMLElement | null = null

const findTrigger = (target: EventTarget | null) =>
  target instanceof Element ? target.closest<HTMLElement>("[data-tooltip]") : null

const hide = () => {
  clearTimeout(timer)
  if (trigger && bubble) {
    const control = trigger.matches("a, button, [tabindex]") ? trigger : trigger.querySelector("a, button, [tabindex]")
    const descriptions = control
      ?.getAttribute("aria-describedby")
      ?.split(/\s+/)
      .filter((id) => id !== bubble?.id)
    if (descriptions?.length) control?.setAttribute("aria-describedby", descriptions.join(" "))
    else control?.removeAttribute("aria-describedby")
  }
  bubble?.remove()
  bubble = null
  trigger = null
}

const position = () => {
  if (!trigger || !bubble) return
  const bounds = trigger.getBoundingClientRect()
  const size = bubble.getBoundingClientRect()
  const left = Math.max(8, Math.min(bounds.left + (bounds.width - size.width) / 2, window.innerWidth - size.width - 8))
  const top = bounds.top >= size.height + 16 ? bounds.top - size.height - 8 : bounds.bottom + 8
  bubble.style.left = `${left}px`
  bubble.style.top = `${top}px`
}

const show = (next: HTMLElement, delay: number) => {
  if (next === dismissed || next === trigger) return
  hide()
  trigger = next
  timer = setTimeout(() => {
    if (!next.isConnected || trigger !== next) return
    bubble = document.createElement("div")
    bubble.id = `tooltip-${crypto.randomUUID()}`
    bubble.className = "site-tooltip"
    bubble.setAttribute("role", "tooltip")
    bubble.textContent = next.dataset.tooltip || ""
    document.body.append(bubble)
    const control = next.matches("a, button, [tabindex]") ? next : next.querySelector("a, button, [tabindex]")
    const descriptions = control?.getAttribute("aria-describedby")
    control?.setAttribute("aria-describedby", [descriptions, bubble.id].filter(Boolean).join(" "))
    position()
  }, delay)
}

const stillActive = () => trigger?.matches(":hover, :focus-within") || bubble?.matches(":hover")
const leave = () => {
  clearTimeout(timer)
  // Keep the label open while the pointer crosses the small gap to its surface.
  timer = setTimeout(() => {
    if (!stillActive()) {
      hide()
      dismissed = null
    }
  }, 120)
}

document.addEventListener("pointerover", (event) => {
  if (event.pointerType === "touch") return
  if (event.target instanceof Element && event.target.closest(".site-tooltip")) {
    clearTimeout(timer)
    return
  }
  const next = findTrigger(event.target)
  if (next) show(next, 250)
})
document.addEventListener("pointerout", (event) => {
  if (findTrigger(event.target) && findTrigger(event.target) === findTrigger(event.relatedTarget)) return
  if (findTrigger(event.target) || (event.target instanceof Element && event.target.closest(".site-tooltip"))) leave()
})
document.addEventListener("focusin", (event) => {
  const next = findTrigger(event.target)
  if (next) show(next, 0)
})
document.addEventListener("focusout", leave)
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return
  dismissed = trigger
  hide()
})
document.addEventListener("click", hide)
document.addEventListener(
  "scroll",
  () => {
    if (trigger?.contains(document.activeElement)) position()
    else hide()
  },
  true,
)
window.addEventListener("resize", hide)
document.addEventListener("astro:before-swap", () => {
  hide()
  dismissed = null
})
