/**
 * Centrální soubor affiliate odkazů.
 * Chceš změnit URL nástroje? Stačí upravit tento soubor — projeví se všude.
 */
export const AFFILIATE_LINKS = {
  chatgpt:       "https://chat.openai.com",
  claude:        "https://claude.ai",
  gemini:        "https://gemini.google.com",
  perplexity:    "https://www.perplexity.ai",
  github_copilot:"https://github.com/features/copilot",
  copilot:       "https://copilot.microsoft.com",
  midjourney:    "https://midjourney.com",
  jasper:        "https://www.jasper.ai",
  copyai:        "https://copy.ai",
  writesonic:    "https://writesonic.com",
  grammarly:     "https://grammarly.com",
  deepl:         "https://deepl.com",
  superhuman:    "https://superhuman.com",
  lavender:      "https://lavender.ai",
} as const

export type AffiliateTool = keyof typeof AFFILIATE_LINKS
