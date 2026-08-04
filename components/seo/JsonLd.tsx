/**
 * Renders a schema.org JSON-LD block.
 *
 * `dangerouslySetInnerHTML` is required — React escapes text children, which
 * would corrupt the JSON. The payload is our own server-built object (never
 * user input), and `<` is escaped so a string value can never close the tag.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
