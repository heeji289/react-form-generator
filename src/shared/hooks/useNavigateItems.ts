import React from 'react';

interface NavigateItemsParams {
  initialIndex?: number;
  length: number;
}

export function useNavigateItems({
  initialIndex = 0,
  length,
}: NavigateItemsParams) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev < length - 1 ? prev + 1 : prev));
  };

  return {
    currentIndex,
    isFirst: currentIndex === 0,
    isLast: currentIndex === length - 1,
    handlePrev,
    handleNext,
  };
}
