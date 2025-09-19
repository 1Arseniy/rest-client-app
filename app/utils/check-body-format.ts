import { showSonner } from '@/components/ui/sonner/sonner';
import type { TFunction } from 'i18next';

export function checkBodyFormat(
  type: string,
  body: string,
  t: TFunction<'translation', undefined>
) {
  if (type === 'JSON' && body.length) {
    try {
      return JSON.stringify(JSON.parse(body));
    } catch {
      showSonner(t('sonner.title'), t('sonner.errJSON'), 'error');
    }
  }
}
