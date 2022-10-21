/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly DB_HOST: string;
    readonly DB_SOURCE: string;
    readonly DB_PORT: string;
    readonly DB_USER: string;
    readonly DB_PASSWORD: string;
    readonly DB_DATABASE: string;
    readonly REDIS_HOST: string;
    readonly REDIS_PORT: string;
    readonly REDIS_PASSWORD: string;
    readonly GG_CAPTCHA_KEY: string;
    readonly GG_CAPTCHA_URL: string;
    readonly JWT_PUBLIC_KEY: string;
    readonly JWT_PRIVATE_KEY: string;
    readonly JWT_ALGORITHM: string;
    readonly JWT_ALGORITHM_PASSWORD: string;
    readonly JWT_EXPIRES_IN: string;
    readonly RS_SERVICIO_AUTENTICACION: string;
    readonly RS_SERVICIO_PERSONA: string;
  }
}
