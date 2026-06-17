interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  readOnly?: boolean;
}

export function MarkdownEditor({ value, onChange, onSave, readOnly }: MarkdownEditorProps) {
  return (
    <div className="editor-area">
      <div className="toolbar-row">
        <button type="button" onClick={onSave} disabled={readOnly}>
          Save
        </button>
      </div>
      <textarea
        className="editor-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        aria-label="Markdown editor"
      />
    </div>
  );
}
