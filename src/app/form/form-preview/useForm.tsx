import { useEffect, useState } from 'react';
import { Answers } from '../form.type';
import { loadForm, saveForm } from './utils';
import { formData } from './form.data';
import { useParams } from 'react-router-dom';

export function useForm() {
  const { id: formID } = useParams<{ id: string }>();
  const [answers, setAnswers] = useState<Answers>({});
  const [showError, setShowError] = useState(false);

  const onChangeAnswer = (questionID: string, answer: string | string[]) => {
    if (!formID) return;

    const newAnswers = { ...answers, [questionID]: answer };

    setAnswers(newAnswers);
    saveForm(formID, {
      id: formID,
      title: formData.title,
      answers: newAnswers,
    });
  };

  const onClearForm = () => {
    if (!formID) return;
    setAnswers({});
    saveForm(formID, {
      id: formID,
      title: formData.title,
      answers: {},
    });
  };

  useEffect(() => {
    if (!formID) return;

    const result = loadForm(formID);
    setAnswers(result.answers ?? {});
  }, [formID]);

  return {
    answers,
    onChangeAnswer,
    onClearForm,

    showError,
    setShowError,
  };
}
