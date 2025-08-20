import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import { EditorWrapper } from "./style.ts";

import Quill from "quill";
import "quill-emoji/dist/quill-emoji.css";
import { ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } from "quill-emoji";

Quill.register("modules/emoji", {
  "emoji-toolbar": ToolbarEmoji,
  "emoji-textarea": TextAreaEmoji,
  "emoji-shortname": ShortNameEmoji,
});


interface EditorProps {
  value: string;
  onChange: (val: string) => void;
  hasErrors?: boolean;
}

const TextFroala = ({ value, onChange, hasErrors }: EditorProps) => {
  return (
    <EditorWrapper hasError={hasErrors}>
      <ReactQuill
      
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder="Digite aqui..."
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["emoji"], // <-- Aqui!
            ["clean"],
          ],
          //   emoji: {
          //     emojiToolbar: true,
          //     emojiTextArea: false,
          //     emojiShortname: true,
          //   },
        }}
      />
    </EditorWrapper>
  );
};

export default TextFroala;
