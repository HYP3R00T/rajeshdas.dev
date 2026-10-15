import { createCssVariablesTheme } from "shiki"

// Shiki resolves scopes at build time; CSS supplies the light/dark site palette.
const theme = createCssVariablesTheme({ name: "rajesh-code", variablePrefix: "--code-", fontStyle: false })
// ANSI dim sequences need an ANSI variable so Shiki can emit its -dim variant.
theme.colors["editor.foreground"] = "var(--code-ansi-white)"

const scopes = [
  [["keyword", "storage.type", "storage.modifier"], "keyword"],
  [["keyword.operator"], "punctuation"],
  [["entity.name.function", "support.function"], "function"],
  [["entity.name.type", "support.type", "support.class", "entity.other.inherited-class"], "type"],
  [["string", "string.quoted", "string.regexp"], "string"],
  [["constant.numeric", "constant.language", "variable.other.constant"], "constant"],
  [
    [
      "support.type.property-name.json",
      "meta.object-literal.key",
      "entity.other.attribute-name",
      "entity.name.tag.yaml",
    ],
    "property",
  ],
  [["variable.parameter"], "parameter"],
  [["punctuation"], "punctuation"],
  [["comment", "string.quoted.docstring.multi"], "comment"],
]

theme.tokenColors = scopes.map(([scope, token]) => ({ scope, settings: { foreground: `var(--code-token-${token})` } }))

export default theme
