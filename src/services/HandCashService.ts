// Wallet service: BRC-100 sign-in (bWalletX first; any BRC-100 wallet works).
// The class keeps its old name so the rest of the app is untouched; HandCash OAuth is gone.
// We only hold the user's PUBLIC identity key. No tokens, no keys, no custody.
import { WalletClient } from '@bsv/sdk';

export interface HandCashUser {
  handle: string;
  paymail: string;
  publicKey?: string;
  avatarUrl?: string;
  displayName?: string;
}

const STORAGE_KEY = 'bwx_wallet_user';
let client: WalletClient | null = null;

export function getWallet(): WalletClient {
  if (!client) client = new WalletClient('auto', window.location.host);
  return client;
}

export class HandCashService {
  /** Ask the wallet for the user's identity key (XDM when framed in bWalletX, else window.CWI, else localhost). */
  async login(): Promise<void> {
    try {
      const { publicKey } = await getWallet().getPublicKey({ identityKey: true });
      const user: HandCashUser = { handle: `${publicKey.slice(0, 6)}…${publicKey.slice(-4)}`, paymail: '', publicKey, displayName: 'bWalletX' };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      window.dispatchEvent(new Event('bwx-wallet-change'));
    } catch (e) {
      console.error('Wallet sign-in failed', e);
      alert('No BRC-100 wallet found. Open Bitcoin Books in bWalletX.');
    }
  }

  async handleCallback(_authToken: string): Promise<HandCashUser> {
    throw new Error('OAuth callbacks are not used: sign in with bWalletX');
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('bwx-wallet-change'));
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  getCurrentUser(): HandCashUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as HandCashUser) : null;
    } catch {
      return null;
    }
  }

  /** No bearer tokens with BRC-100: the wallet signs and pays itself (createAction). */
  getAccessToken(): string | null {
    return null;
  }

  async makeAuthenticatedRequest(_endpoint: string, _options: RequestInit = {}): Promise<any> {
    throw new Error('Not available: payments go through your wallet');
  }

  async requestMagicLink(_email: string): Promise<{ success: boolean; message: string }> {
    return { success: false, message: 'Email sign-in is not available. Sign in with bWalletX.' };
  }

  async handleMagicLinkCallback(_token: string): Promise<HandCashUser> {
    throw new Error('Email sign-in is not available. Sign in with bWalletX.');
  }
}
