import { addNavbarLinksEventListener, navigate } from '@src/navigation';
import { renderNavbar } from '@src/render-funcs';

(() => {
  const initializeApp = () => {
    document.addEventListener('DOMContentLoaded', () => {
      renderNavbar();
      addNavbarLinksEventListener();

      const redirectPath = sessionStorage.getItem('redirectPath');
      if (redirectPath) {
        sessionStorage.removeItem('redirectPath');
        window.history.replaceState(null, null, redirectPath);
      }

      navigate({ isFromUrl: true, toRoute: window.location.pathname });
    });

    window.addEventListener('popstate', (event) => {
      event.preventDefault();
      navigate({ isFromPopState: true, toRoute: window.location.pathname });
    });
  };

  initializeApp();
})();
