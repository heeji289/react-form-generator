export type Option = string;

export type QuestionType = 'text' | 'radio' | 'checkbox' | 'textarea';

type BaseQuestion = {
  id: string;
  title: string;
  required: boolean;
};

export type TextQuestion = {
  type: 'text' | 'textarea';
} & BaseQuestion;

export type ChoiceQuestion = {
  type: 'radio' | 'checkbox';
  options: Option[];
} & BaseQuestion;

export type Question = TextQuestion | ChoiceQuestion;

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
