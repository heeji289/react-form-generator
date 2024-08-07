export type SurveyQuestion = {
  id: string;
  type: 'text' | 'radio' | 'checkbox' | 'textarea';
  title: string;
  options?: string[];
  required: boolean;
};
