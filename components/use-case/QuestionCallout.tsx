type QuestionCalloutProps = {
  label: string;
  question: string;
};

export const QuestionCallout = ({ label, question }: QuestionCalloutProps) => (
  <div className="mt-14 flex w-full flex-col items-center justify-center bg-[var(--core-question-bg)] px-2 py-10 text-center sm:px-10 lg:mt-16 lg:px-20 lg:py-20">
    <p className="type-about-kicker text-primary">{label}</p>
    <p className="type-about-body max-w-[880px] whitespace-pre-line text-muted">
      {question}
    </p>
  </div>
);
