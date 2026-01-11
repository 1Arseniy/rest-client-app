import React, { createContext, useEffect, useState } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LoaderFunctionArgs,
  Link,
  useLoaderData,
} from 'react-router';
import type { Route } from './+types/root';
import Footer from '@/components/footer';
import Header from '@/components/header';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/styles/app.css';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Toaster } from 'sonner';
import type { i18n as I18nType } from 'i18next';
import { createI18nInstance } from './i18n';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

// export async function loader({
//   request,
// }: LoaderFunctionArgs): Promise<LoaderData> {
//   const acceptLanguage = request.headers.get('accept-language');
//   let lang: LoaderData['lang'] = 'en';
//   const i18nInstance = createI18nInstance(lang);

//   if (acceptLanguage) {
//     const supported: LoaderData['lang'][] = ['en', 'ru'];
//     const preferred = (acceptLanguage.split(',')[0].split('-')[0] ||
//       'en') as LoaderData['lang'];
//     if (supported.includes(preferred)) {
//       lang = preferred;
//     }
//   }
//   return { lang, i18nInstance };
// }
export async function loader({
  request,
}: LoaderFunctionArgs): Promise<{ lang: string }> {
  const acceptLanguage = request.headers.get('accept-language');
  const supported = ['en', 'ru'];
  const preferred = (acceptLanguage?.split(',')[0].split('-')[0] || 'en') as
    | 'en'
    | 'ru';
  return { lang: supported.includes(preferred) ? preferred : 'en' };
}

// Create client-side context for i18n
const I18nContext = createContext<I18nType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLoaderData<{ lang: string }>();
  const [i18nInstance, setI18nInstance] = useState<I18nType | null>(null);

  useEffect(() => {
    const instance = createI18nInstance(lang as 'en' | 'ru');
    setI18nInstance(instance);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  if (!i18nInstance) {
    return <div>{children}</div>;
  }

  return (
    <I18nContext.Provider value={i18nInstance}>
      <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
    </I18nContext.Provider>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  // const { lang, i18nInstance } = useLoaderData<typeof loader>() || {
  //   lang: 'en',
  // };
  // const [i18nInstance, setI18nInstance] = useState<I18nType | null>(null);

  // useEffect(() => {
  //   const instance = createI18nInstance(lang);
  //   setI18nInstance(instance);
  //   document.documentElement.lang = lang;
  // }, [lang]);

  return (
    <html lang={useLoaderData<typeof loader>().lang}>
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-full max-w-[1440px] m-auto">
        <I18nProvider>
          <Header />
          {children}
          <Footer />
          <ScrollRestoration />
          <Scripts />
          <Toaster />
        </I18nProvider>
        {/* {i18nInstance ? (
          <I18nextProvider i18n={i18nInstance}>
            <Header />
            {children}
            <Footer />
            <ScrollRestoration />
            <Scripts />
            <Toaster />
          </I18nextProvider>
        ) : (
          <div>
            <Header />
            {children}
            <Footer />
            <ScrollRestoration />
            <Scripts />
            <Toaster />
          </div>
        )} */}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404 ? 'Page not found' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <I18nProvider>
      <ErrorBoundaryContent message={message} details={details} stack={stack} />
    </I18nProvider>
  );
}

function ErrorBoundaryContent({
  message,
  details,
  stack,
}: {
  message: string;
  details: string;
  stack?: string;
}) {
  const { t } = useTranslation();

  return (
    <main className="pt-16 p-4 container mx-auto h-screen flex flex-col justify-center items-center">
      <div className="mb-3">
        <h1 className="text-4xl mb-2 text-center">{message}</h1>
        <p className="text-3xl">{details}</p>
      </div>
      <Link className="hover:underline text-3xl" to="/">
        {t('page404.toMain')}
      </Link>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
