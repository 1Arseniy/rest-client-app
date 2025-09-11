import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

type VariableItem = {
  variable: string;
  value: string;
};

export default function Variables() {
  const { t } = useTranslation();
  const [variable, setVariable] = useState('');
  const [value, setValue] = useState('');

  const [variables, setVariables] = useState<VariableItem[]>([]);

  const handleAdd = () => {
    setVariables([...variables, { variable: variable, value: value }]);
  };
  const handleVariableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariable(e.target.value);
  };
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleDelete = () => {
    setVariable('');
    setValue('');
  };

  /// draft to check my code
  const listVriableItems = variables.map((variable) => (
    <div key={variable.variable}>{variable.variable}</div>
  ));
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-10 shadow-lg">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
            {t('variables.variables')}
          </h2>

          <div className="mb-6 flex flex-row items-end gap-4">
            <div className="flex flex-col flex-1">
              <Label
                htmlFor="variable"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                {t('variables.variable')}
              </Label>
              <Input
                value={variable}
                onChange={handleVariableChange}
                id="variable"
                type="text"
                placeholder={t('variables.variablePlaceholder')}
                className="w-full"
              />
            </div>

            <div className="flex flex-col flex-1">
              <Label
                htmlFor="value"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                {t('variables.value')}
              </Label>
              <Input
                value={value}
                onChange={handleValueChange}
                id="value"
                type="text"
                placeholder={t('variables.valuePlaceholder')}
                className="w-full"
              />
            </div>

            <div> {listVriableItems}</div>

            <div className="flex items-center">
              <Button
                onClick={handleDelete}
                type="button"
                variant="ghost"
                className="p-2 text-gray-500 hover:text-red-600"
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </div>

          <Button onClick={handleAdd} variant="outline" className="w-full">
            {t('variables.add')}
          </Button>
        </div>
      </div>
    </>
  );
}
