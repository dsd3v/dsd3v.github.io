import {
  renderHomePage,
  renderProjectsPage,
  renderAboutPage,
  renderContactPage,
  renderPageNotFound,
} from '@src/render-funcs';

export const routesToRouteConfigs = {
  '/': {
    id: 'home',
    renderPageFunc: renderHomePage,
    title: 'Home',
  },
  '/projects': {
    id: 'projects',
    renderPageFunc: renderProjectsPage,
    title: 'Projects',
  },
  '/about': {
    id: 'about',
    renderPageFunc: renderAboutPage,
    title: 'About',
  },
  '/contact': {
    id: 'contact',
    renderPageFunc: renderContactPage,
    title: 'Contact',
  },
};

const removePreviousPage = () => {
  const prevPageNavbarLink = document.getElementsByClassName(
    'active-navbar-link'
  )[0] as HTMLAnchorElement;

  if (prevPageNavbarLink) {
    prevPageNavbarLink.classList.remove('active-navbar-link');

    const prevRoute = new URL(prevPageNavbarLink.href).pathname;
    const prevRouteConfig = routesToRouteConfigs[prevRoute];

    if (prevRouteConfig) {
      const prevPageContainer = document.getElementById(
        `${prevRouteConfig.id}-container`
      );
      if (prevPageContainer) prevPageContainer.remove();
    }
  } else {
    const pageNotFoundContainer = document.getElementById(
      'page-not-found-container'
    );
    if (pageNotFoundContainer) pageNotFoundContainer.remove();
  }
};

const renderNewPage = ({ newPageRoute, shouldUpdateUrl }) => {
  document
    .getElementById('navbar-toggle')
    .classList.remove('active-navbar-toggle');
  document
    .getElementById('navbar-links-div')
    .classList.remove('navbar-links-menu-open');

  if (shouldUpdateUrl) window.history.pushState(null, null, newPageRoute);

  const newRouteConfig = routesToRouteConfigs[newPageRoute];

  if (newRouteConfig) {
    document
      .getElementById(`${newRouteConfig.id}-navbar-link`)
      .classList.add('active-navbar-link');
    newRouteConfig.renderPageFunc();
  } else {
    renderPageNotFound();
  }
};

export const getCleanedRoutePath = ({ routePath }) => {
  let cleanedRoutePath = routePath;
  if (routePath.length > 1 && routePath.endsWith('/')) {
    cleanedRoutePath = routePath.slice(0, -1);
  }
  return cleanedRoutePath;
};

export const navigate = ({
  isFromPopState = false,
  isFromUrl = false,
  toRoute,
}) => {
  removePreviousPage();
  renderNewPage({
    newPageRoute: getCleanedRoutePath({ routePath: toRoute }),
    shouldUpdateUrl: !isFromPopState && !isFromUrl,
  });
};

export const addNavbarLinksEventListener = () => {
  const navbarLinksDiv = document.getElementById('navbar-links-div');

  navbarLinksDiv.addEventListener('click', (event) => {
    event.preventDefault();

    const target = event.target as HTMLElement;
    const navbarLinkClicked = target.closest(
      '.navbar-link'
    ) as HTMLAnchorElement;

    if (navbarLinkClicked) {
      const currentRoute = getCleanedRoutePath({
        routePath: window.location.pathname,
      });
      const toRoute = new URL(navbarLinkClicked.href).pathname;
      if (currentRoute !== navbarLinkClicked.href) navigate({ toRoute });
    }
  });
};
