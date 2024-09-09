import { DescriptionType, SocialMediaHandleTypesType } from "@/types";
import draftToHtml from "draftjs-to-html";

export class SocialMediaHandleClass {
  constructor(public type: SocialMediaHandleTypesType, public link: string) {}
}

export class ProjectImage {
  constructor(public id: string, public file: File) {}
}

export class EditorContentClass {
  constructor(public raw: string, public text: string) {}
}

export class OrphanageProjectClass {
  constructor(
    public images: string[],
    public name: string,
    public description: EditorContentClass,
    public goal: number
  ) {}
}

/**
 * Converts a utf-8 string to a base64 string
 * @param value utf-8 string
 * @returns base64 string
 */
export const convertTobase64 = (value: string) =>
  Buffer.from(value).toString("base64");

/**
 * Converts a base64 string to a utf-8 string
 * @param value base64 string
 * @returns utf-8 string
 */
export const convertFrombase64 = (value: string) =>
  Buffer.from(value, "base64").toString("utf-8");

/**
 * Function to convert text block contents to HTM:
 * @param description The textbox content to be converted to HTML
 * @returns HTML string
 */
export const convert_textblock_to_html = (
  description: DescriptionType | undefined
) => {
  if (description) {
    try {
      return draftToHtml(JSON.parse(description.raw));
    } catch (error: any) {
      return description.text;
    }
  } else {
    return "";
  }
};
