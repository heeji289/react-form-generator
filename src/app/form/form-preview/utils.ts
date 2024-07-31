import { FormResult } from '../form.type';

const getStorageKey = (formID: string) => `form-${formID}`;

export const saveForm = (formID: string, result: FormResult) => {
  sessionStorage.setItem(getStorageKey(formID), JSON.stringify(result));
};

export const loadForm = (formID: string): FormResult => {
  const saved = sessionStorage.getItem(getStorageKey(formID));
  return saved ? JSON.parse(saved) : {};
};
