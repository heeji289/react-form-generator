import { SurveyQuestion } from './survey-question';

export type SurveySection = {
  id: string;
  title: string;
  questions: SurveyQuestion[];
};
