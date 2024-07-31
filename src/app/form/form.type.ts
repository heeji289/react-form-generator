export type Option = string;

export type QuestionType = 'text' | 'radio' | 'checkbox' | 'textarea';

export type Question = {
  id: string;
  type: QuestionType;
  title: string;
  required: boolean;
  options?: Option[];
};

export type Section = {
  id: string;
  title: string;
  questions: Question[];
};

export type Form = {
  id: string;
  title: string;
  sections: Section[];
};

export type Answers = {
  [questionID: string]: string | string[];
};

export type FormResult = Pick<Form, 'title' | 'id'> & {
  answers: Answers;
};
