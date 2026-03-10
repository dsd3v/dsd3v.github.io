import { Contact } from '/pages/contact.js'
import { Education } from '/pages/education.js'
import { WorkExperience } from '/pages/work-experience.js'
import { Home } from '/pages/home.js'
import { PageNotFound } from '/pages/page-not-found.js'
import { Projects } from '/pages/projects.js'

export const appRouter = {
    'maxRouteSegments': 1,
    'routesToRouteConfigs': {
        '/': { id: 'home', page: Home, title: 'Home' },
        '/projects': { id: 'projects', page: Projects, title: 'Projects' },
        '/work-experience': { id: 'work-experience', page: WorkExperience, title: 'Work Experience' },
        '/education': { id: 'education', page: Education, title: 'Education' },
        '/contact': { id: 'contact', page: Contact, title: 'Contact' }
    }
}

export const navigate = ({ isFromPopState = false, isFromUrl = false, toRoute }) => {
    const prevPageNavbarLink = document.getElementsByClassName('active-navbar-link')[0]

    if (prevPageNavbarLink) {
        prevPageNavbarLink.classList.remove('active-navbar-link')

        const prevRoute = new URL(prevPageNavbarLink.href).pathname
        const prevRouteConfig = appRouter['routesToRouteConfigs'][prevRoute]

        if (prevRouteConfig) {
            const prevPageContainer = document.getElementById(`${prevRouteConfig.id}-container`)
            if (prevPageContainer) prevPageContainer.remove()
        }
    } else {
        const pageNotFoundContainer = document.getElementById('page-not-found-container')
        if (pageNotFoundContainer) pageNotFoundContainer.remove()
    }

    const newRouteConfig = appRouter['routesToRouteConfigs'][toRoute]
    let page

    if (newRouteConfig) {
        const newNavbarLink = document.getElementById(`${newRouteConfig.id}-navbar-link`)
        if (newNavbarLink) newNavbarLink.classList.add('active-navbar-link')
        page = newRouteConfig.page
    } else {
        page = PageNotFound
    }

    document.getElementById('navbar-toggle').classList.remove('active-navbar-toggle')
    document.getElementById('navbar-links-div').classList.remove('navbar-links-menu-open')

    if (!isFromPopState && !isFromUrl) window.history.pushState({}, '', toRoute)
    new page().render()
}

export class Navbar {
    onNavbarLinkClicked = event => {
        event.preventDefault()

        const currentRoute = window.location.pathname.toLowerCase()
        const toRoute = event.srcElement.attributes['href'].nodeValue

        if (currentRoute !== toRoute) navigate({ toRoute })
    }

    onMenuToggleClicked = event => {
        event.preventDefault()
        const toggle = document.getElementById('navbar-toggle')
        const navbarLinksDiv = document.getElementById('navbar-links-div')
        const menuToggleOffsetParent = event.srcElement.offsetParent

        if (menuToggleOffsetParent && menuToggleOffsetParent.classList.contains('active-navbar-toggle')) {
            toggle.classList.remove('active-navbar-toggle')
            navbarLinksDiv.classList.remove('navbar-links-menu-open')
        } else {
            toggle.classList.add('active-navbar-toggle')
            navbarLinksDiv.classList.add('navbar-links-menu-open')
        }
    }

    render() {
        const currentRoute = window.location.pathname.toLowerCase()
        const nav = document.createElement('nav')

        const homeNavbarLink = document.createElement('a')
        homeNavbarLink.id = 'home-navbar-link', homeNavbarLink.href = '/'
        if (currentRoute === '/') homeNavbarLink.classList.add('active-navbar-link')
        homeNavbarLink.appendChild(document.createTextNode(appRouter['routesToRouteConfigs']['/'].title))
        homeNavbarLink.addEventListener('click', this.onNavbarLinkClicked)

        const navbarLinksDiv = document.createElement('div')
        navbarLinksDiv.id = 'navbar-links-div'
        Object.entries(appRouter['routesToRouteConfigs']).slice(1).forEach(([route, { id, title }]) => {
            const navbarLink = document.createElement('a')
            navbarLink.classList.add('navbar-link'), navbarLink.href = route, navbarLink.id = `${id}-navbar-link`
            if (currentRoute === route) navbarLink.classList.add('active-navbar-link')
            navbarLink.appendChild(document.createTextNode(title))
            navbarLink.addEventListener('click', this.onNavbarLinkClicked)

            navbarLinksDiv.appendChild(navbarLink)
        })

        const navbarToggle = document.createElement('div')
        navbarToggle.id = 'navbar-toggle'

        const hamburger = document.createElement('div')
        hamburger.id = 'hamburger'
        hamburger.appendChild(document.createElement('span'))
        hamburger.appendChild(document.createElement('span'))
        hamburger.appendChild(document.createElement('span'))

        const arrow = document.createElement('span')
        arrow.id = 'arrow'
        arrow.appendChild(document.createTextNode('▾'))

        navbarToggle.appendChild(hamburger)
        navbarToggle.appendChild(arrow)
        navbarToggle.addEventListener('click', this.onMenuToggleClicked)

        nav.appendChild(homeNavbarLink)
        nav.appendChild(navbarLinksDiv)
        nav.appendChild(navbarToggle)

        document.body.appendChild(nav)
    }
}