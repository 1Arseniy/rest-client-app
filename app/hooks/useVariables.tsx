import { useEffect, useState } from 'react';

type VariableItem = {
  variable: string;
  value: string;
};

export default function useVariables(): [
  VariableItem[],
  (array: VariableItem[]) => void,
] {
  const [variables, setVariables] = useState<VariableItem[]>(
    JSON.parse(localStorage.getItem('array') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('array', JSON.stringify(variables));
  }, [variables]);

  return [variables, setVariables];
}
