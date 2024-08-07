import * as styles from './styles.css';

interface SurveyFooterProps {
  isFirstSection: boolean;
  isLastSection: boolean;
  handlePrev: () => void;
  handleNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClearForm: () => void;
}

export function SurveyFooter({
  isFirstSection,
  isLastSection,
  handlePrev,
  handleNext,
  handleClearForm,
}: SurveyFooterProps) {
  return (
    <div className={styles.navigationContainer}>
      {!isFirstSection && (
        <button
          type='button'
          onClick={handlePrev}
          className={styles.navigationButton}
        >
          이전
        </button>
      )}

      {isLastSection ? (
        <button type='submit' className={styles.navigationButton}>
          제출
        </button>
      ) : (
        <button
          type='button'
          onClick={handleNext}
          className={styles.navigationButton}
        >
          다음
        </button>
      )}

      <button type='button' onClick={handleClearForm}>
        양식 지우기
      </button>
    </div>
  );
}
