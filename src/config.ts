import { LocalePrefix } from 'next-intl/routing';

export const name = "Will's notes";

export const locales = ['en', 'zh-CN'] as const;

export const defaultLocale = locales[0];

export type Locale = (typeof locales)[number];

export const localePrefix = 'always' satisfies LocalePrefix;
