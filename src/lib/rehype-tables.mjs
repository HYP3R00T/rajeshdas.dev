const wrapTables = (node) => {
  if (!Array.isArray(node.children) || node.properties?.className?.includes("prose-table-scroll")) return
  node.children = node.children.map((child) => {
    wrapTables(child)
    if (child.type !== "element" || child.tagName !== "table") return child
    return {
      type: "element",
      tagName: "div",
      properties: {
        className: ["prose-table-scroll"],
        role: "region",
        ariaLabel: "Scrollable table",
        tabIndex: 0,
      },
      children: [child],
    }
  })
}

export default function rehypeTables() {
  return wrapTables
}
