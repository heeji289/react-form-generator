import { SurveySection } from './survey-section';

export type Survey = {
  id: string;
  title: string;
  sections: SurveySection[];
};
