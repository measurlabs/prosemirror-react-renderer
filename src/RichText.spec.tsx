import React from "react";
import renderer from "react-test-renderer";
import { expect, it } from "vitest";

import { RichText, defaultMarkMappings, defaultNodeMappings } from "./RichText";

it("renders basic schema with default mappings", () => {
  expect(
    renderer
      .create(
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
      )
      .toJSON()
  ).toEqual(
    renderer
      .create(
        <div>
          <p>
            hello <b>world!</b>
          </p>
        </div>
      )
      .toJSON()
  );
});

it("renders custom mappings", () => {
  expect(
    renderer
      .create(
        <RichText
          marks={{
            ...defaultMarkMappings,
            bar: (props) => <em {...props} className="baz" />,
          }}
          nodes={{
            ...defaultNodeMappings,
            foo: (props) => <div {...props} className="baz" />,
          }}
        >
          {{
            content: [
              {
                content: [
                  {
                    marks: [{ type: "bar" }],
                    text: "hello ",
                    type: "text",
                  },
                  {
                    marks: [{ type: "bold" }],
                    text: "world!",
                    type: "text",
                  },
                ],
                type: "foo",
              },
            ],
            type: "doc",
          }}
        </RichText>
      )
      .toJSON()
  ).toEqual(
    renderer
      .create(
        <div>
          <div className="baz">
            <em className="baz">hello </em>
            <b>world!</b>
          </div>
        </div>
      )
      .toJSON()
  );
});

it("renders remaps class attr", () => {
  expect(
    renderer
      .create(
        <RichText>
          {{
            content: [
              {
                attrs: { class: "paragraph" },
                content: [{ text: "hello world!", type: "text" }],
                type: "paragraph",
              },
            ],
            type: "doc",
          }}
        </RichText>
      )
      .toJSON()
  ).toEqual(
    renderer
      .create(
        <div>
          <p className="paragraph">
            hello world!
          </p>
        </div>
      )
      .toJSON()
  );
});
