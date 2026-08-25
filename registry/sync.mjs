import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import postcss from "postcss"

const THEME = new URL("./xuan/theme.css", import.meta.url)
const REGISTRY = new URL("../registry.json", import.meta.url)

function toObject(node) {
  const out = {}
  node.each((child) => {
    if (child.type === "decl") out[child.prop] = child.value
    else if (child.type === "rule") out[child.selector] = toObject(child)
    else if (child.type === "atrule")
      out[`@${child.name} ${child.params}`.trim()] = child.nodes
        ? toObject(child)
        : {}
  })
  return out
}

function declsToVars(node) {
  const out = {}
  node.each((child) => {
    if (child.type === "decl" && child.prop.startsWith("--"))
      out[child.prop.replace(/^--/, "")] = child.value
        .replace(/\s+/g, " ")
        .trim()
  })
  return out
}

function assertOnlyCustomProps(node, selector) {
  node.each((child) => {
    if (child.type === "decl" && !child.prop.startsWith("--"))
      throw new Error(
        `theme.css: top-level "${selector}" declares "${child.prop}", a non-custom-property. ` +
          `declsToVars() only keeps "--*" declarations, so this would be silently dropped from ` +
          `the registry. Move it into an "@layer base { ${selector} { ... } }" rule instead.`
      )
  })
}

export function themeToRegistryFields(cssText) {
  const root = postcss.parse(cssText)
  const cssVars = { theme: {}, light: {}, dark: {} }
  const css = {}
  root.each((node) => {
    if (node.type === "atrule" && node.name === "theme")
      Object.assign(cssVars.theme, declsToVars(node))
    else if (node.type === "rule" && node.selector === ":root") {
      assertOnlyCustomProps(node, ":root")
      Object.assign(cssVars.light, declsToVars(node))
    } else if (node.type === "rule" && node.selector === ".dark") {
      assertOnlyCustomProps(node, ".dark")
      Object.assign(cssVars.dark, declsToVars(node))
    } else if (node.type === "atrule")
      css[`@${node.name} ${node.params}`.trim()] = toObject(node)
    else if (node.type === "rule") css[node.selector] = toObject(node)
  })
  return { cssVars, css }
}

function sync() {
  const registry = JSON.parse(readFileSync(REGISTRY, "utf8"))
  const item = registry.items.find((entry) => entry.name === "xuan")
  if (!item) throw new Error("registry.json has no item named 'xuan'")
  Object.assign(item, themeToRegistryFields(readFileSync(THEME, "utf8")))
  writeFileSync(REGISTRY, `${JSON.stringify(registry, null, 2)}\n`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) sync()
