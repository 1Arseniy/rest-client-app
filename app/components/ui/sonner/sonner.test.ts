import { describe, it, expect, vi, beforeEach } from 'vitest';
import { showSonner } from './showSonner';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    dismiss: vi.fn(),
    __esModule: true,
    default: vi.fn(),
  },
}));

const mockedToast = toast as unknown as {
  success: ReturnType<typeof vi.fn>;
  error: ReturnType<typeof vi.fn>;
  dismiss: ReturnType<typeof vi.fn>;
  default: ReturnType<typeof vi.fn>;
};

describe('showSonner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls toast.success for type "success"', () => {
    showSonner('Success Title', 'Success Desc', 'success');
    expect(mockedToast.success).toHaveBeenCalledWith('Success Title', expect.objectContaining({
      description: 'Success Desc',
      className: 'bg-green-600 text-white',
      position: 'top-center',
      action: expect.objectContaining({ label: 'Х' }),
    }));
  });

  it('calls toast.error for type "error"', () => {
    showSonner('Error Title', 'Error Desc', 'error');
    expect(mockedToast.error).toHaveBeenCalledWith('Error Title', expect.objectContaining({
      className: 'bg-red-600 text-white',
    }));
  });

  it('calls toast (default) for type "warning"', () => {
    showSonner('Warning Title', 'Warning Desc', 'warning');
    expect(mockedToast.default).toHaveBeenCalledWith('Warning Title', expect.objectContaining({
      className: 'bg-yellow-500 text-black',
    }));
  });

  it('calls toast (default) for type "info"', () => {
    showSonner('Info Title', 'Info Desc', 'info');
    expect(mockedToast.default).toHaveBeenCalledWith('Info Title', expect.objectContaining({
      className: 'bg-blue-500 text-white',
    }));
  });

  it('uses "info" as default type if not specified', () => {
    showSonner('Default Title');
    expect(mockedToast.default).toHaveBeenCalledWith('Default Title', expect.anything());
  });

  it('calls toast.dismiss when action onClick is triggered', () => {
    showSonner('Dismiss Test', 'Dismiss Desc', 'info');
    const call = mockedToast.default.mock.calls[0];
    const options = call[1];

    expect(options.action).toBeDefined();
    options.action.onClick();
    expect(mockedToast.dismiss).toHaveBeenCalled();
  });
});
