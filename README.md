# Prosemirror React Renderer

Customizable and lightweight library for rendering ProseMirror compatible JSON schema as React components.

## Usage

```tsx
<RichText>
  {{
    content: [
      {
        content: [
          {
            text: "hello ",
            type: "text",
          },
          {
            marks: [{ type: "bold" }],
            text: "world!",
            type: "text",
          },
        ],
        type: "paragraph",
      },
    ],
    type: "doc",
  }}
</RichText>
```
