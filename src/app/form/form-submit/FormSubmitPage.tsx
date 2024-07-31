import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadForm } from '../form-preview/utils';
import { FormResult } from '../form.type';

export default function FormSubmitPage() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = React.useState<FormResult | null>(null);

  useEffect(() => {
    if (!id) return;

    const result = loadForm(id);
    setResult(result);
  }, [id]);

  return (
    <div>
      <h1>{result?.title}</h1>
      <pre>{JSON.stringify(result?.answers, null, 2)}</pre>
    </div>
  );
}
