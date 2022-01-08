import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
  return { title: "Adoptable Dogs DSM" };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <link rel="stylesheet" href="/tailwind.css" />
      </head>
      <body className="p-5">
        <Outlet />
        <h2 className="text-xl">This site currently pulls from the <a className="underline underline-offset-2" href="https://www.arl-iowa.org/">ARL of Iowa</a>, <a className="underline underline-offset-2" href="https://www.aheinz57.com/">AHeinz57</a> rescue, and <a className="underline underline-offset-2" href="http://hopeanimalrescueofiowa.org/">Hope Animal Rescue of Iowa</a>.</h2>
        <p className="text-xs">Note: this site has no affiliation with any animal shelters used as sources. The goal of this site is simply to help puppers and doggos find loving forever homes</p>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
