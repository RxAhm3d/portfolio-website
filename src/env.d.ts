/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHAMELEON_UID_HASH?: string;
  readonly VITE_CHAMELEON_USER_ID?: string;
  readonly VITE_CHAMELEON_EMAIL?: string;
  readonly VITE_CHAMELEON_NAME?: string;
  readonly VITE_CHAMELEON_FULL_NAME?: string;
  readonly VITE_CHAMELEON_ACCOUNT_CREATED_AT?: string;
  readonly VITE_CHAMELEON_ROLE?: string;
  readonly VITE_CHAMELEON_JOB_TITLE?: string;
  readonly VITE_CHAMELEON_ITEMS_CREATED?: string;
  readonly VITE_CHAMELEON_DEPARTMENT?: string;
  readonly VITE_CHAMELEON_SENIORITY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
