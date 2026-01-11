import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Separator } from '@/components/ui/separator/separator';
import useVariables from '@/hooks/useVariables';
import { useEffect, useState } from 'react';

export default function Variables() {
  const { t } = useTranslation();
  const [variable, setVariable] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [variables, setVariables] = useVariables();

  useEffect(() => {
    if (variable === '' || value === '') {
      return setError('variables.errors.empty');
    }

    for (let i = 0; i < variables.length; i++) {
      if (variables[i].variable === variable) {
        return setError('variables.errors.unique');
      }
    }

    return setError(null);
  }, [variable, variables, value]);

  const handleAdd = () => {
    setVariables([...variables, { variable: variable, value: value }]);
    setVariable('');
    setValue('');
  };
  const handleVariableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariable(e.target.value);
  };
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleCurrentDelete = (variableKey: string) => {
    const array = [];
    for (let i = 0; i < variables.length; i++) {
      if (variables[i].variable !== variableKey) {
        array.push(variables[i]);
      }
    }
    setVariables(array);
  };

  const handleDeleteAll = () => {
    setVariables([]);
    setValue('');
    setVariable('');
  };

  const handleCurrentVariableChange = (
    variableKey: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const array = [];
    for (let i = 0; i < variables.length; i++) {
      if (variables[i].variable !== variableKey) {
        array.push(variables[i]);
      } else {
        const object = { variable: '', value: '' };
        object.value = variables[i].value;
        object.variable = e.target.value;

        array.push(object);
      }
    }
    setVariables(array);
  };

  const handleCurrentValueChange = (
    variableKey: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const array = [];
    for (let i = 0; i < variables.length; i++) {
      if (variables[i].variable !== variableKey) {
        array.push(variables[i]);
      } else {
        const object = { variable: '', value: '' };
        object.variable = variables[i].variable;
        object.value = e.target.value;

        array.push(object);
      }
    }
    setVariables(array);
  };

  const listVriableItems = variables.map((variable, index) => (
    <div key={index} className="mb-6 flex flex-row items-end gap-4">
      <div className="flex flex-col flex-1">
        <Input
          value={variable.variable}
          onChange={(e) => handleCurrentVariableChange(variable.variable, e)}
          id="variable"
          type="text"
          placeholder={t('variables.variablePlaceholder')}
          className="w-full"
        />
      </div>

      <div className="flex flex-col flex-1">
        <Input
          value={variable.value}
          onChange={(e) => handleCurrentValueChange(variable.variable, e)}
          id="value"
          type="text"
          placeholder={t('variables.valuePlaceholder')}
          className="w-full"
        />
      </div>

      <div className="flex items-center">
        <Button
          onClick={() => {
            handleCurrentDelete(variable.variable);
          }}
          type="button"
          variant="ghost"
          className="p-2 text-gray-500 hover:text-red-600"
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  ));
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-5 pb-5 pr-2.5 pl-2.5">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-10 shadow-lg">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
            {t('variables.variables')}
          </h2>

          <div className="mb-3 flex flex-row items-end gap-4">
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

            <div className="flex items-center">
              <Button
                onClick={handleDeleteAll}
                type="button"
                variant="ghost"
                className="p-2 text-gray-500 hover:text-red-600"
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </div>

          <div
            className="mb-3 ml-2 mr-2 text-sm italic text-red-700"
            data-testid="fname-error"
          >
            {error ? t(error) : null}
          </div>

          <Button
            disabled={error ? true : false}
            onClick={handleAdd}
            variant="outline"
            className="w-full cursor-pointer"
          >
            {t('variables.add')}
          </Button>

          <Separator className="mt-6 mb-6" />

          <div> {listVriableItems}</div>
        </div>
      </div>
    </>
  );
}
