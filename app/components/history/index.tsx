import { Link } from 'react-router';
import type { RequestHistoryResponse, RequestHistory } from '@/types/types';
import { useTranslation } from 'react-i18next';
import { toBase64 } from '@/utils/to-base-64';
import {
  formatDuration,
  formatTimestamp,
  getMethodColor,
  getStatusColor,
} from './helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faFile } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../ui/button/button';

interface HistoryProps {
  data: RequestHistoryResponse & { error?: string };
}

function History({ data }: HistoryProps) {
  const { t } = useTranslation();
  const { requests: requestHistory, error } = data;

  const generateRestoreUrl = (request: RequestHistory) => {
    const encodedUrl = toBase64(request.url);
    const encodedBody = toBase64(request.body);
    const query = new URLSearchParams();

    request.headers.forEach((header) => {
      query.append(header.key, toBase64(header.value));
    });

    query.append('typeTextarea', request.typeTextarea || 'Text');

    const userId = new URLSearchParams(window.location.search).get('userId');
    if (userId) {
      query.append('userId', userId);
    }

    return `/rest-client/${request.method}/${encodedUrl}/${encodedBody}?${query}`;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-red-600 mb-2">
              {t('history.errorTitle')}
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link to="/rest-client">
              <Button className="text-lg" type="submit">
                {t('history.restClientButton')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (requestHistory.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-3">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon size="2x" icon={faFile}></FontAwesomeIcon>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {t('history.emptyTitle')}
                </h2>
                <p className="text-gray-600 mb-1">
                  {t('history.emptySubtitle')}
                </p>
              </div>
              <Link to="/rest-client">
                <Button className="text-lg" type="submit">
                  {t('history.restClientButton')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-800">
                {t('history.title')}
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              {requestHistory.map((request) => (
                <div
                  key={request.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <Link
                    to={generateRestoreUrl(request)}
                    className="block group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getMethodColor(request.method)}`}
                        >
                          {request.method}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate hover:underline mr-4">
                            {request.url}
                          </p>
                          <p className="text-xs text-gray-500">
                            {request.endpoint}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span
                          className={`font-medium ${getStatusColor(request.responseStatusCode)}`}
                        >
                          {request.responseStatusCode}
                        </span>
                        <span>{formatDuration(request.requestDuration)}</span>
                        <span>{formatTimestamp(request.requestTimestamp)}</span>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                    {request.errorDetails && (
                      <div className="mt-2 text-xs text-red-600">
                        {t('history.error')}: {request.errorDetails}
                      </div>
                    )}
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-400">
                      <span>
                        {t('history.requestSize')}: {request.requestSize} bytes
                      </span>
                      <span>
                        {t('history.responseSize')}: {request.responseSize}{' '}
                        bytes
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
