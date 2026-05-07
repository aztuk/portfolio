import { parseHighlightedText } from "@/lib/rich-text";

type HighlightedTextProps = {
  text: string;
  highlightClassName?: string;
};

export const HighlightedText = ({
  text,
  highlightClassName = "rich-text-highlight",
}: HighlightedTextProps) => {
  const segments = parseHighlightedText(text);

  return (
    <>
      {segments.map((segment, index) =>
        segment.highlighted ? (
          <span key={`${index}-${segment.text}`} className={highlightClassName}>
            {segment.text}
          </span>
        ) : (
          segment.text
        ),
      )}
    </>
  );
};
