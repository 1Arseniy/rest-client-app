import { showSonner } from '@/components/ui/sonner/sonner';

export function checkBodyFormat(type: string, body: string) {
  if (type === 'JSON' && body.length) {
    try {
      return JSON.stringify(JSON.parse(body));
    } catch {
      showSonner('Error', 'Invalid JSON Format', 'error');
    }
  }
}
