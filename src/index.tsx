import * as React from 'react';
import { createRoot } from 'react-dom/client';

import App from '@components/App';

const bootstrap = (): void => {
  const container = document.querySelector('#root');
  const root = createRoot(container as Element);
  root.render(<App />);
};

bootstrap();

