import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from './firebase';

import * as firebaseAuth from 'firebase/auth';
import * as sonner from '@/components/ui/sonner/sonner';

vi.mock('firebase/auth');
vi.mock('firebase/firestore');
vi.mock('@/components/ui/sonner/sonner');

describe('Firebase service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('logInWithEmailAndPassword', () => {
    it('show common error when unknown error', async () => {
      (firebaseAuth.signInWithEmailAndPassword as Mock).mockRejectedValue(
        new Error('fail')
      );

      await logInWithEmailAndPassword('test@test.com', 'password');

      expect(sonner.showSonner).toHaveBeenCalledWith(
        'Error',
        'An unexpected error occurred',
        'error'
      );
    });
  });

  describe('registerWithEmailAndPassword', () => {
    it('should show error when unknown error', async () => {
      (firebaseAuth.createUserWithEmailAndPassword as Mock).mockRejectedValue(
        new Error('fail')
      );

      await registerWithEmailAndPassword(
        'Test User',
        'test@test.com',
        'password'
      );

      expect(sonner.showSonner).toHaveBeenCalledWith(
        'Error',
        'An unexpected error occurred',
        'error'
      );
    });
  });
});
