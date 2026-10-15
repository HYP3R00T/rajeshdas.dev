import type { ElementType, Ref } from "react"
import { useEffect, useRef } from "react"

import { scrambleText } from "@/lib/scrambleText"

interface Props {
  text?: string
  auto?: boolean
  hover?: boolean
  tag?: keyof HTMLElementTagNameMap | string
  className?: string
}

export default function AnimatedText({ text = "", auto = false, hover = true, tag = "div", className = "" }: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const current = ref.current
    if (!current) return
    const node: HTMLElement = current

    const target = text || node.textContent || ""
    node.dataset.value = target
    node.textContent = target

    let cancel: (() => void) | undefined
    function playAnimation() {
      cancel?.()
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      cancel = scrambleText(target, (value) => {
        node.textContent = value
      })
    }

    if (auto) playAnimation()

    if (hover) node.addEventListener("mouseover", playAnimation)

    return () => {
      cancel?.()
      if (hover) node.removeEventListener("mouseover", playAnimation)
    }
  }, [text, auto, hover])

  const Tag = tag as ElementType
  return (
    <Tag
      ref={ref as unknown as Ref<HTMLElement>}
      data-animated-text
      data-value={text}
      data-auto={String(auto)}
      data-hover={String(hover)}
      className={className}
    >
      {text}
    </Tag>
  )
}
