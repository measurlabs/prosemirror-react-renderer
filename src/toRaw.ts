import { Node } from "./RichText";

export const toRaw = (value?: null | Node): string => {
  if (!value) {
    return "";
  }

  if (value.text) {
    return value.text?.trim() ?? "";
  }

  return value.content?.map(toRaw).join(" ") ?? "";
};
