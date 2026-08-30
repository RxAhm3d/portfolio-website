const CHAMELEON_USER_ID_STORAGE_KEY = 'portfolio.chameleon.userId';
const CHAMELEON_LOGIN_COUNT_STORAGE_KEY = 'portfolio.chameleon.loginCount';

export interface ChameleonIdentity {
  userId: string;
  uidHash: string;
  profile: Record<string, string | number | boolean | null | undefined>;
}

type ChameleonApi = {
  identify: (userId: string, traits?: Record<string, unknown>) => void;
  track: (eventName: string, properties?: Record<string, unknown>) => void;
  clear: () => void;
  on: (eventName: string, callback: (...args: unknown[]) => void) => void;
};

declare global {
  interface Window {
    chmln?: Partial<ChameleonApi>;
  }
}

let didIdentify = false;

const isClient = () => typeof window !== 'undefined';

const getChameleonApi = () => {
  if (!isClient()) {
    return null;
  }

  const candidate = window.chmln;
  if (
    candidate &&
    typeof candidate.identify === 'function' &&
    typeof candidate.track === 'function' &&
    typeof candidate.clear === 'function' &&
    typeof candidate.on === 'function'
  ) {
    return candidate as ChameleonApi;
  }

  return null;
};

const createStableVisitorId = () => {
  if (!isClient()) {
    return 'ssr-visitor';
  }

  const existing = window.localStorage.getItem(CHAMELEON_USER_ID_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const userId =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `visitor-${Date.now()}`;

  window.localStorage.setItem(CHAMELEON_USER_ID_STORAGE_KEY, userId);

  return userId;
};

const incrementLoginCount = () => {
  if (!isClient()) {
    return 0;
  }

  const current = Number(window.localStorage.getItem(CHAMELEON_LOGIN_COUNT_STORAGE_KEY) || '0');
  const next = Number.isFinite(current) ? current + 1 : 1;
  window.localStorage.setItem(CHAMELEON_LOGIN_COUNT_STORAGE_KEY, String(next));
  return next;
};

const getUidHash = async (userId: string) => {
  const fallbackUidHash = import.meta.env.VITE_CHAMELEON_UID_HASH;

  try {
    const response = await fetch(`/api/chameleon/uid-hash?userId=${encodeURIComponent(userId)}`);
    if (!response.ok) {
      return fallbackUidHash || '';
    }

    const body = (await response.json()) as { uid_hash?: string };
    return body.uid_hash || fallbackUidHash || '';
  } catch {
    return fallbackUidHash || '';
  }
};

export const resolveChameleonIdentity = async (): Promise<ChameleonIdentity> => {
  const userId = import.meta.env.VITE_CHAMELEON_USER_ID || createStableVisitorId();
  const uidHash = await getUidHash(userId);

  return {
    userId,
    uidHash,
    profile: {
      email: import.meta.env.VITE_CHAMELEON_EMAIL || null,
      name: import.meta.env.VITE_CHAMELEON_NAME || null,
      full_name: import.meta.env.VITE_CHAMELEON_FULL_NAME || null,
      created_at: import.meta.env.VITE_CHAMELEON_ACCOUNT_CREATED_AT || null,
      role: import.meta.env.VITE_CHAMELEON_ROLE || 'visitor',
      job_title: import.meta.env.VITE_CHAMELEON_JOB_TITLE || 'portfolio_visitor',
      login_count: incrementLoginCount(),
      items_created: Number(import.meta.env.VITE_CHAMELEON_ITEMS_CREATED || '0'),
      last_active_at: new Date().toISOString(),
      department: import.meta.env.VITE_CHAMELEON_DEPARTMENT || null,
      seniority: import.meta.env.VITE_CHAMELEON_SENIORITY || null,
    },
  };
};

export const identifyChameleonUser = async () => {
  if (!isClient() || didIdentify) {
    return;
  }

  const api = getChameleonApi();
  if (!api) {
    return;
  }

  const identity = await resolveChameleonIdentity();
  api.identify(identity.userId, {
    uid_hash: identity.uidHash,
    ...identity.profile,
  });
  didIdentify = true;

  // TODO: verify Chameleon install (identify call payload and uid_hash) in a real browser session.
};

export const clearChameleonUser = () => {
  const api = getChameleonApi();
  if (!api) {
    return;
  }

  api.clear();

  // TODO: verify Chameleon install (clear on logout/session reset) in a real browser session.
};

export const trackChameleonEvent = (eventName: string, properties?: Record<string, unknown>) => {
  const api = getChameleonApi();
  if (!api) {
    return;
  }

  api.track(eventName, properties);

  // TODO: verify Chameleon install (track event delivery) in a real browser session.
};

export const wireChameleonNavigateHandler = () => {
  const api = getChameleonApi();
  if (!api) {
    return;
  }

  api.on('app:navigate', (...args: unknown[]) => {
    const payload = (args[0] || {}) as { path?: string; id?: string; href?: string };
    const targetId = payload.id || payload.path?.replace(/^#/, '');

    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (payload.href) {
      window.location.assign(payload.href);
    }
  });

  // TODO: verify Chameleon install (app:navigate routing) in a real browser session.
};
