import { cn } from "@/lib/utils"

interface TabItem {
  value: string
  label: string
}

interface SegmentedTabsProps {
  items: TabItem[]
  activeValue?: string
  ariaLabel: string
  group: string
  className?: string
}

export default function SegmentedTabs({
  items,
  activeValue = items[0]?.value,
  ariaLabel,
  group,
  className,
}: SegmentedTabsProps) {
  return (
    <div
      className={cn("inline-flex gap-1 rounded-lg border border-border/80 bg-background-1 p-1", className)}
      role="tablist"
      aria-label={ariaLabel}
      data-ui="segmented-tabs"
    >
      {items.map((item) => {
        const active = item.value === activeValue

        return (
          <button
            key={item.value}
            type="button"
            className="rounded-md px-4 py-2 font-mono text-xs tracking-widest text-foreground-2 uppercase transition-colors hover:bg-background-2/70 hover:text-foreground-0 data-[active=true]:bg-background-2 data-[active=true]:text-foreground-0"
            role="tab"
            aria-selected={active ? "true" : "false"}
            data-active={active ? "true" : "false"}
            data-tab-trigger
            data-tab-group={group}
            data-tab-value={item.value}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
