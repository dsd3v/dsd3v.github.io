import pagesContentData from '@src/data.json';
import { navigate, routesToRouteConfigs } from '@src/navigation';

export const renderNavbar = () => {
  const nav = document.createElement('nav');

  const homeNavbarLink = document.createElement('a');
  homeNavbarLink.id = 'home-navbar-link';
  homeNavbarLink.href = '/';
  homeNavbarLink.appendChild(
    document.createTextNode(routesToRouteConfigs['/'].title)
  );
  homeNavbarLink.addEventListener('click', (event) => {
    event.preventDefault();
    navigate({ toRoute: '/' });
  });

  const navbarLinksDiv = document.createElement('div');
  navbarLinksDiv.id = 'navbar-links-div';

  Object.entries(routesToRouteConfigs)
    .slice(1)
    .forEach(([route, { id, title }]) => {
      const navbarLink = document.createElement('a');
      navbarLink.classList.add('navbar-link');
      navbarLink.href = route;
      navbarLink.id = `${id}-navbar-link`;
      navbarLink.appendChild(document.createTextNode(title));

      navbarLinksDiv.appendChild(navbarLink);
    });

  navbarLinksDiv.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target as HTMLElement;

    const navbarLinkClicked = target.closest(
      '.navbar-link'
    ) as HTMLAnchorElement;

    if (navbarLinkClicked) {
      const toRoute = new URL(navbarLinkClicked.href).pathname;
      navigate({ toRoute });
    }
  });

  const navbarToggle = document.createElement('div');
  navbarToggle.id = 'navbar-toggle';
  navbarToggle.setAttribute('aria-label', 'Navigation Links Menu Toggle');

  const hamburger = document.createElement('div');
  hamburger.id = 'hamburger';
  hamburger.appendChild(document.createElement('span'));
  hamburger.appendChild(document.createElement('span'));
  hamburger.appendChild(document.createElement('span'));

  const arrow = document.createElement('span');
  arrow.id = 'arrow';
  arrow.appendChild(document.createTextNode('▾'));

  navbarToggle.appendChild(hamburger);
  navbarToggle.appendChild(arrow);

  navbarToggle.addEventListener('click', (event) => {
    event.preventDefault();

    if (navbarToggle.classList.contains('active-navbar-toggle')) {
      navbarToggle.classList.remove('active-navbar-toggle');
      navbarLinksDiv.classList.remove('navbar-links-menu-open');
    } else {
      navbarToggle.classList.add('active-navbar-toggle');
      navbarLinksDiv.classList.add('navbar-links-menu-open');
    }
  });

  nav.appendChild(homeNavbarLink);
  nav.appendChild(navbarLinksDiv);
  nav.appendChild(navbarToggle);

  document.body.appendChild(nav);
};

export const renderHomePage = () => {
  const homeContainer = document.createElement('section');
  homeContainer.id = 'home-container';

  const h1 = document.createElement('h1');
  h1.appendChild(document.createTextNode('David Sordia'));

  const h2 = document.createElement('h2');
  h2.appendChild(document.createTextNode('AI Engineering Apprentice'));

  const homeNavigationDiv = document.createElement('div');
  homeNavigationDiv.id = 'home-navigation-div';

  Object.entries(routesToRouteConfigs)
    .slice(1)
    .forEach(([route, { title }]) => {
      const homeNavigationLink = document.createElement('a');
      homeNavigationLink.className = 'home-navigation-link';
      homeNavigationLink.href = route;
      homeNavigationLink.appendChild(document.createTextNode(title));

      homeNavigationLink.addEventListener('click', (event) => {
        event.preventDefault();
        navigate({ toRoute: route });
      });

      homeNavigationDiv.appendChild(homeNavigationLink);
    });

  homeContainer.appendChild(h1);
  homeContainer.appendChild(h2);
  homeContainer.appendChild(homeNavigationDiv);

  document.body.appendChild(homeContainer);
};

export const renderProjectsPage = () => {
  const { githubUrl } = pagesContentData.projects;

  const projectsContainer = document.createElement('section');
  projectsContainer.className = 'page-container';
  projectsContainer.id = 'projects-container';

  const pageTitle = document.createElement('h1');
  pageTitle.className = 'page-title';
  pageTitle.appendChild(document.createTextNode('Projects'));

  const githubExternalLink = document.createElement('a');
  githubExternalLink.className = 'external-link';
  githubExternalLink.href = githubUrl;
  githubExternalLink.rel = 'noopener noreferrer';
  githubExternalLink.target = '_blank';
  githubExternalLink.appendChild(document.createTextNode('View on GitHub ↗'));

  projectsContainer.appendChild(pageTitle);
  projectsContainer.appendChild(githubExternalLink);

  document.body.appendChild(projectsContainer);
};

export const renderAboutPage = () => {
  const { text_html } = pagesContentData['about'];

  const aboutContainer = document.createElement('section');
  aboutContainer.className = 'page-container';
  aboutContainer.id = 'about-container';

  const pageTitle = document.createElement('h1');
  pageTitle.className = 'page-title';
  pageTitle.appendChild(document.createTextNode('About'));

  const textDiv = document.createElement('div');
  textDiv.textContent = text_html;

  aboutContainer.appendChild(pageTitle);
  aboutContainer.appendChild(textDiv);

  document.body.appendChild(aboutContainer);
};

export const renderContactPage = () => {
  const { email, linkedInUrl } = pagesContentData.contact;

  const contactContainer = document.createElement('section');
  contactContainer.className = 'page-container';
  contactContainer.id = 'contact-container';

  const pageTitle = document.createElement('h1');
  pageTitle.className = 'page-title';
  pageTitle.appendChild(document.createTextNode('Contact'));

  const emailSpan = document.createElement('span');
  emailSpan.appendChild(document.createTextNode(`Email: ${email}`));

  const linkedInExternalLink = document.createElement('a');
  linkedInExternalLink.className = 'external-link';
  linkedInExternalLink.href = linkedInUrl;
  linkedInExternalLink.rel = 'noopener noreferrer';
  linkedInExternalLink.target = '_blank';
  linkedInExternalLink.appendChild(document.createTextNode('LinkedIn ↗'));
  linkedInExternalLink.style.paddingTop = '25px';

  contactContainer.appendChild(pageTitle);
  contactContainer.appendChild(emailSpan);
  contactContainer.appendChild(linkedInExternalLink);

  document.body.appendChild(contactContainer);
};

export const renderPageNotFound = () => {
  const pageNotFoundContainer = document.createElement('section');
  pageNotFoundContainer.className = 'page-container';
  pageNotFoundContainer.id = 'page-not-found-container';

  const pageNotFoundTitle = document.createElement('h1');
  pageNotFoundTitle.id = 'page-not-found-title';
  pageNotFoundTitle.appendChild(document.createTextNode('Page not found.'));

  const invalidUrlSpan = document.createElement('span');
  invalidUrlSpan.appendChild(document.createTextNode('Invalid URL entered.'));

  pageNotFoundContainer.appendChild(pageNotFoundTitle);
  pageNotFoundContainer.appendChild(invalidUrlSpan);

  document.body.appendChild(pageNotFoundContainer);
};
