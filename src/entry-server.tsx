import { renderToString } from 'react-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

interface HelmetContext {
  helmet?: HelmetServerState;
}

export function render(url: string) {
  const helmetContext: HelmetContext = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <MemoryRouter initialEntries={[url]}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>,
  );

  return {
    html,
    helmet: helmetContext.helmet,
  };
}
