import { useTranslation } from 'react-i18next';

import RequestControls from '@/components/request-controls';
import HeadersEditor from '@/components/headers-editor/headers-editor';
import BodyEditor from '@/components/body-editor';
import ResponsePanel from '@/components/response-panel';

export default function RestClient() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50">
      <h1 className="text-3xl mt-2">{t('auth.restClient')}</h1>
      <div className="p-12">
        <RequestControls />
        <HeadersEditor />
        <div className="flex items-center mb-5">
          <h1>Code:</h1>
        </div>
        <BodyEditor />
        <ResponsePanel />
      </div>
    </div>
  );
}
