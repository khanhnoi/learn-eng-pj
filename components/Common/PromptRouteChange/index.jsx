import Router from 'next/router';
import { useEffect } from 'react';
import { useRef } from 'react';

const PromptRouteChange = ({ message, allowRoute }) => {
  const showPrompt = useRef(false);
  useEffect(() => {
    const routeChangeStart = (url) => {
      if (Router.asPath !== url && !allowRoute) {
        showPrompt.current = true;
      }

      if (Router.asPath !== url && !allowRoute && !window.confirm(message)) {
        Router.events.emit('routeChangeError');
        Router.replace(Router, Router.asPath);
        // eslint-disable-next-line no-throw-literal
        throw 'Abort route change. Please ignore this error.';
      }
    };

    const beforeunload = (e) => {
      if (!allowRoute && !showPrompt.current) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', beforeunload);
    Router.events.on('routeChangeStart', routeChangeStart);

    return () => {
      window.removeEventListener('beforeunload', beforeunload);
      Router.events.off('routeChangeStart', routeChangeStart);
    };
  }, [allowRoute]);

  return null;
};

export default PromptRouteChange;
