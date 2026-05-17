import { marked } from "marked";
import DOMPurify from "dompurify";

export async function convertAndSanitize(markdown: string) {
  // Convert markdown to HTML
  const rawHtml = await marked(markdown);

  // Sanitize HTML
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    USE_PROFILES: { html: true },
  });

  return cleanHtml;
}