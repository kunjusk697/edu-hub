import { ScrollViewStyleReset } from 'expo-router/html';
import type { ReactNode } from 'react';

export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Le Mam Kitchenware</title>
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const css = `
html, body, #root {
  background-color: #EFE4D4;
  height: 100%;
}
body {
  margin: 0 auto;
  max-width: 430px;
  box-shadow: 0 0 0 1px #E6D9C8, 0 12px 40px rgba(74, 42, 28, 0.12);
}
`;
