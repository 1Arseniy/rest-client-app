import { toast } from 'sonner';

type SonnerType = 'success' | 'error' | 'warning' | 'info';

export function showSonner(
  title: string,
  description?: string,
  type: SonnerType = 'info'
) {
  const toastMethod = {
    success: toast.success,
    error: toast.error,
    warning: toast,
    info: toast,
  }[type];

  const colorClass = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white',
  }[type];

  toastMethod(title, {
    description,
    className: colorClass,
    action: {
      label: 'Х',
      onClick: () => toast.dismiss(),
    },
  });
}
