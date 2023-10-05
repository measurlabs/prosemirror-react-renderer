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

export const defaultMarkMappings = {
  bold: (props) => <b {...props} />,
  italic: (props) => <em {...props} />,
  link: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />,
  underline: (props) => <u {...props} />,
} satisfies Mapping;
export const defaultNodeMappings = {
  bulletList: (props) => <ul {...props} />,
  doc: (props) => <div {...props} />,
  listItem: (props) => <li {...props} />,
  orderedList: (props) => <ol {...props} />,
  paragraph: (props) => <p {...props} />,
} satisfies Mapping;

const getAttrs = ({ attrs }: { attrs?: Record<string, unknown> }) => {
  if (attrs && "class" in attrs) {
    const { class: className, ...rest } = attrs;
    return { ...rest, className };
  }
  return attrs;
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
      <C {...getAttrs(mark)}>
        <RichText nodes={nodes} marks={marks} renderText={renderText}>
          {{ ...children, marks: rest }}
        </RichText>
      </C>
    );
  }
  const C = (children.type && nodes[children.type]) || React.Fragment;
  if ("content" in children && children.content) {
    return (
      <C {...getAttrs(children)}>
        {children?.content.map((child, i) => (
          <RichText key={i} nodes={nodes} marks={marks} renderText={renderText}>
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
