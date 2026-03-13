import pagesContentData from '@src/data.json';
import {
  getCleanedRoutePath,
  navigate,
  routesToRouteConfigs,
} from '@src/navigation';

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

      navbarLink.addEventListener('click', (event) => {
        event.preventDefault();

        const currentRoute = getCleanedRoutePath({
          routePath: window.location.pathname,
        });
        if (currentRoute !== route) navigate({ toRoute: route });
      });

      navbarLinksDiv.appendChild(navbarLink);
    });

  const navbarToggle = document.createElement('div');
  navbarToggle.id = 'navbar-toggle';

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
  githubExternalLink.appendChild(document.createTextNode('GitHub ↗'));

  projectsContainer.appendChild(pageTitle);
  projectsContainer.appendChild(githubExternalLink);

  document.body.appendChild(projectsContainer);
};

export const renderWorkExperiencePage = () => {
  const workExperiences = pagesContentData['work-experience'];

  const workExperienceContainer = document.createElement('section');
  workExperienceContainer.className = 'page-container';
  workExperienceContainer.id = 'work-experience-container';

  const pageTitle = document.createElement('h1');
  pageTitle.className = 'page-title';
  pageTitle.appendChild(document.createTextNode('Work Experience'));

  const ul = document.createElement('ul');

  workExperiences.forEach((workExperience) => {
    const li = document.createElement('li');

    const divider = document.createElement('span');
    divider.className = 'divider';
    divider.appendChild(document.createTextNode('/'));

    li.appendChild(document.createTextNode(workExperience.description));
    li.appendChild(divider);
    li.appendChild(document.createTextNode(workExperience.dates));

    ul.appendChild(li);
  });

  workExperienceContainer.appendChild(pageTitle);
  workExperienceContainer.appendChild(ul);

  document.body.appendChild(workExperienceContainer);
};

export const renderEducationPage = () => {
  const educations = pagesContentData.education;

  const educationContainer = document.createElement('section');
  educationContainer.className = 'page-container';
  educationContainer.id = 'education-container';

  const pageTitle = document.createElement('h1');
  pageTitle.className = 'page-title';
  pageTitle.appendChild(document.createTextNode('Education'));

  const ul = document.createElement('ul');
  educations.forEach((education) => {
    const li = document.createElement('li');

    const divider = document.createElement('span');
    divider.className = 'divider';
    divider.appendChild(document.createTextNode('/'));

    li.appendChild(document.createTextNode(education.description));
    li.appendChild(divider);
    li.appendChild(document.createTextNode(education.dates));

    ul.appendChild(li);
  });

  educationContainer.appendChild(pageTitle);
  educationContainer.appendChild(ul);

  document.body.appendChild(educationContainer);
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
