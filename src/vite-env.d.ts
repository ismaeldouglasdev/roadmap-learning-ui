/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL base do backend de contas/sync (opcional). Ex: https://api.exemplo.com */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
