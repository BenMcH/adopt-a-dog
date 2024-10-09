import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Analytics } from '@vercel/analytics/react';

import './tailwind.css';
import { LinksFunction } from '@remix-run/server-runtime';

export const links: LinksFunction = () => [
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

export const meta: MetaFunction = () => {
  return [{ title: 'Adoptable Dogs DSM' }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <h2 className="text-xl">
          This site currently pulls from the{' '}
          <a
            className="underline underline-offset-2"
            href="https://www.arl-iowa.org/"
          >
            ARL of Iowa
          </a>
          ,{' '}
          <a
            className="underline underline-offset-2"
            href="https://www.aheinz57.com/"
          >
            AHeinz57
          </a>{' '}
          rescue, and{' '}
          <a
            className="underline underline-offset-2"
            href="http://hopeanimalrescueofiowa.org/"
          >
            Hope Animal Rescue of Iowa
          </a>
          .
        </h2>
        <p className="text-xs">
          Note: this site has no affiliation with any animal shelters used as
          sources. The goal of this site is simply to help puppers and doggos
          find loving forever homes
        </p>
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
