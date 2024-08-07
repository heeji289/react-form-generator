interface SurveyFooterProps {
  isFirstSection: boolean;
  isLastSection: boolean;
  handlePrev: () => void;
  handleNext: () => void;
}

export function SurveyFooter({
  isFirstSection,
  isLastSection,
  handlePrev,
  handleNext,
}: SurveyFooterProps) {
  return (
    <div>
      {!isFirstSection && (
        <button type='button' onClick={handlePrev}>
          이전
        </button>
      )}

      {isLastSection ? (
        <button type='submit'>제출</button>
      ) : (
        <button type='button' onClick={handleNext}>
          다음
        </button>
      )}
    </div>
  );
}
