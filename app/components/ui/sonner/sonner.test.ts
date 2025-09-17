import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { showSonner } from './sonner';
import { toast } from 'sonner';

type ToastMock = Mock & {
  success: ReturnType<typeof vi.fn>;
  error: ReturnType<typeof vi.fn>;
  dismiss: ReturnType<typeof vi.fn>;
};

vi.mock('sonner', () => {
  const fn = vi.fn() as ToastMock;
  fn.success = vi.fn();
  fn.error = vi.fn();
  fn.dismiss = vi.fn();
  return { toast: fn };
});

describe('showSonner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls toast.success for type "success"', () => {
    showSonner('Success Title', 'Success Desc', 'success');
    expect(toast.success).toHaveBeenCalledWith(
      'Success Title',
      expect.objectContaining({
        description: 'Success Desc',
        className: 'bg-green-600 text-white',
        position: 'top-center',
        action: expect.any(Object),
      }),
    );
  });

  it('calls toast.error for type "error"', () => {
    showSonner('Error Title', 'Error Desc', 'error');
    expect(toast.error).toHaveBeenCalledWith(
      'Error Title',
      expect.objectContaining({
        className: 'bg-red-600 text-white',
      }),
    );
  });

  it('calls toast (function) for type "warning"', () => {
    showSonner('Warning Title', 'Warning Desc', 'warning');
    expect(toast).toHaveBeenCalledWith(
      'Warning Title',
      expect.objectContaining({
        className: 'bg-yellow-500 text-black',
      }),
    );
  });

  it('calls toast (function) for type "info"', () => {
    showSonner('Info Title', 'Info Desc', 'info');
    expect(toast).toHaveBeenCalledWith(
      'Info Title',
      expect.objectContaining({
        className: 'bg-blue-500 text-white',
      }),
    );
  });

  it('uses "info" as default type if not specified', () => {
    showSonner('Default Title');
    expect(toast).toHaveBeenCalledWith('Default Title', expect.anything());
  });

  it('calls toast.dismiss when action onClick is triggered', () => {
    showSonner('Dismiss Test', 'Dismiss Desc', 'info');
    const [, options] = (toast as unknown as ToastMock).mock.calls[0];
    options.action.onClick();
    expect(toast.dismiss).toHaveBeenCalled();
  });
});
