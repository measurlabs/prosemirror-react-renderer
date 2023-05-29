import { expect, it } from "vitest";

import { toRaw } from "./toRaw";

it("renders basic schema with default mappings", () => {
  expect(
    toRaw({
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
    })
  ).toEqual("hello world!");
});
