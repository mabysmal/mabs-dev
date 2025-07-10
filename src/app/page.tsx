import React from "react";
import Script from 'next/script';
import HomeClient from "./components/home-client";
import './globals.css';

export default function Home() {
  return (
    <>



      <head>
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-55733BR8EZ"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-55733BR8EZ');
            `}
          </Script>
          
          <title>Mabel Castillo</title>
          <meta name="description" content="Mabel's Portfolio" />
          <meta name="keywords" content="frontend, front-end, front, end, web, website, dev, developer, a" />
          <meta name="author" content="Mabel Castillo" />
      </head>

      <main className=''>
        <HomeClient />
      </main>
    </>
  );
}