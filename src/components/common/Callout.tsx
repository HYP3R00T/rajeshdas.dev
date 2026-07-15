import { CircleAlert, CircleCheck, Info, Lightbulb, OctagonAlert, TriangleAlert } from "lucide-react"
import type { ReactNode } from "react"

export type CalloutVariant = "info" | "tip" | "success" | "warning" | "important" | "danger"

interface CalloutProps {
  children: ReactNode
  title?: string
  variant?: CalloutVariant
}

const variants = {
  info: {
    icon: Info,
    title: "Note",
    className: "border-accent-1 text-accent-1",
  },
  tip: {
    icon: Lightbulb,
    title: "Tip",
    className: "border-teal-0 text-teal-0",
  },
  success: {
    icon: CircleCheck,
    title: "Success",
    className: "border-green-0 text-green-0",
  },
  warning: {
    icon: TriangleAlert,
    title: "Warning",
    className: "border-yellow-0 text-yellow-0",
  },
  important: {
    icon: CircleAlert,
    title: "Important",
    className: "border-purple-0 text-purple-0",
  },
  danger: {
    icon: OctagonAlert,
    title: "Danger",
    className: "border-red-0 text-red-0",
  },
} satisfies Record<CalloutVariant, { icon: typeof Info; title: string; className: string }>

export default function Callout({ children, title, variant = "info" }: CalloutProps) {
  const { icon: VariantIcon, title: defaultTitle, className } = variants[variant]
  const resolvedTitle = title ?? defaultTitle

  return (
    <aside className={`callout ${className}`} role="note" aria-label={resolvedTitle}>
      <VariantIcon className="callout-icon" aria-hidden="true" />
      <div className="callout-content">
        <p className="callout-title">{resolvedTitle}</p>
        <div className="callout-body">{children}</div>
      </div>
    </aside>
  )
}
