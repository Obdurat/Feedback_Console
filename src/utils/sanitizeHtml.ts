import { marked } from "marked";
import DOMPurify from "dompurify";

export async function markdownToSafeEmailHtml(markdown: string) {
  const rawHtml = await marked(markdown);

  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "b",
      "i",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
    ],
    ALLOWED_ATTR: [],
  });

  return `
    <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
      ${cleanHtml}
    </div>
  `;
}
