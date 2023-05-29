import React from "react";

interface Mark {
  type?: string;
  attrs?: Record<string, unknown>;
}

export type Node = {
  type?: string;
  attrs?: Record<string, unknown>;
  marks?: Mark[];
  content?: Node[];
  text?: string;
};

type Mapping = Record<string, React.ElementType<Record<string, unknown>>>;

interface Props {
  children?: Node | null;
  nodes?: Mapping;
  marks?: Mapping;
  renderText?(text: string): React.ReactNode;
}

export const defaultMarkMappings: Mapping = {
  bold: (props) => <b {...props} />,
  italic: (props) => <em {...props} />,
  link: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />,
  underline: (props) => <u {...props} />,
};
export const defaultNodeMappings: Mapping = {
  bulletList: (props) => <ul {...props} />,
  doc: (props) => <div {...props} />,
  listItem: (props) => <li {...props} />,
  orderedList: (props) => <ol {...props} />,
  paragraph: (props) => <p {...props} />,
};

export const RichText = ({
  children,
  marks = defaultMarkMappings,
  nodes = defaultNodeMappings,
  renderText,
}: Props) => {
  if (!children) {
    return null;
  }
  const [mark, ...rest] = children.marks ?? [];
  if (mark) {
    const C = (mark.type && marks[mark.type]) || React.Fragment;
    return (
      <C {...mark.attrs}>
        <RichText nodes={nodes} marks={marks}>
          {{ ...children, marks: rest }}
        </RichText>
      </C>
    );
  }
  const C = (children.type && nodes[children.type]) || React.Fragment;
  if ("content" in children && children.content) {
    return (
      <C>
        {children?.content.map((child, i) => (
          <RichText key={i} nodes={nodes} marks={marks}>
            {child}
          </RichText>
        ))}
      </C>
    );
  }
  if ("text" in children && children.text) {
    return <C>{renderText?.(children.text) ?? children.text}</C>;
  }
  return null;
};
