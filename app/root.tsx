import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LoaderFunctionArgs
} from 'react-router';

import type { Route } from './+types/root';

import Footer from '@/components/footer';
import Header from '@/components/header';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/styles/app.css';
import i18n, {  initI18n } from './i18n';
import { I18nextProvider } from 'react-i18next';
import React from 'react';

type LoaderData = {
  lang: 'en' | 'ru';
};


export async function loader({ request }: LoaderFunctionArgs): Promise<LoaderData> {
  const acceptLanguage = request.headers.get("accept-language");

  let lang: LoaderData["lang"] = "en";
  if (acceptLanguage) {
    const supported: LoaderData["lang"][] = ["en", "ru"];
    const preferred = (acceptLanguage.split(",")[0].split("-")[0] || "en") as LoaderData["lang"];
    if (supported.includes(preferred)) {
      lang = preferred;
    }
  }

  await initI18n(lang);

  return { lang };
}

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

export function Layout({ children }: { children: React.ReactNode }) {
  const { lang } = useLoaderData<typeof loader>() || { lang: 'en' }; 

  return (
     <I18nextProvider i18n={i18n}>
    <html lang={lang}>
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
      <body>
        <Header/>
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
     </I18nextProvider>

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
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto h-screen flex justify-center items-center">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}