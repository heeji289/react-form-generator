import { Answers } from '../form.type';

const getStorageKey = (formID: string) => `form-${formID}`;

export const saveForm = (formID: string, answers: Answers) => {
  sessionStorage.setItem(getStorageKey(formID), JSON.stringify(answers));
};

export const loadForm = (formID: string): Answers => {
  const saved = sessionStorage.getItem(getStorageKey(formID));
  return saved ? JSON.parse(saved) : {};
};
