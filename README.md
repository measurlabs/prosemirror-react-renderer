# Prosemirror React Renderer

Customizable and lightweight library for rendering ProseMirror compatible JSON schema as React components.

## Usage

```sh
npm install "prosemirror-react-renderer"
```

```ts
import { RichText } from "prosemirror-react-renderer";

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
</RichText>;
```

### Props

| Prop       | Description                                                    | Default value                  |
| ---------- | -------------------------------------------------------------- | ------------------------------ |
| marks      | Lookup for rendering marks. Uses marks `type` property as key. | defaultMarkMappings (exported) |
| nodes      | Lookup for rendering nodes. Uses `type` property as key.       | defaultNodeMappings (exported) |
| renderText | Function allowing custom mapping of plain text values          | -                              |
