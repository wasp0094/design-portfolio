/** turn a filename into a readable caption: "programme-builder-step1.png" → "Programme builder step 1" */
export function prettify(file: string): string {
  return file
    .split("/")
    .pop()!
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/-/g, " ")
    .replace(/(\d+)/g, " $1")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}
