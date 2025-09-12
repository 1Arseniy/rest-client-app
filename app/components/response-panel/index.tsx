import { Badge } from '@/components/ui/badge/badge';
import { Textarea } from '../ui/textarea/textarea';

import type { TypeResponse } from '@/types/types';
import { useTranslation } from 'react-i18next';

function ResponsePanel({ status, data, error }: TypeResponse) {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <div className="flex justify-center text-2xl">
        {t('restClient.responsePanel.title')}:
      </div>
      <div>
        <Badge className="mb-1.5">
          {t('restClient.responsePanel.status')}: {!status ? '-' : status}
        </Badge>
        <Textarea
          disabled={true}
          defaultValue={!error ? data : error}
          className={`${error ? 'text-red-500' : ''} w-full  h-80 p-1.5 disabled:cursor-default disabled:opacity-90`}
        />
      </div>
    </div>
  );
}

export default ResponsePanel;
