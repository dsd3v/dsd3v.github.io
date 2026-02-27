import { Contact } from './pages/contact.js'
import { Education } from './pages/education.js'
import { WorkExperience } from './pages/work-experience.js'
import { Home } from './pages/home.js'
import { PageNotFound } from './pages/page-not-found.js'
import { Projects } from './pages/projects.js'

export const routesToPages = {
    '/': { page: Home, title: 'Home' },
    '/projects': { page: Projects, title: 'Projects' },
    '/work-experience': { page: WorkExperience, title: 'Work Experience' },
    '/education': { page: Education, title: 'Education' },
    '/contact': { page: Contact, title: 'Contact' }
}

window.addEventListener('load', () => {
    const currentRoute = window.location.pathname.toLowerCase()
    const currentPage = currentRoute in routesToPages ? new routesToPages[currentRoute].page() : new PageNotFound()
    const currentRouteNavbarLink = currentRoute in routesToPages ? currentRoute === '/' ? document.getElementById('home-navbar-link') : document.getElementById(`${currentRoute.slice(1)}-navbar-link`) : null
    !!currentRouteNavbarLink && currentRouteNavbarLink.classList.add('active-navbar-link')
    new Navbar().render()
    currentPage.render()
})

window.addEventListener('popstate', event => {
    event.preventDefault()
    const newRoute = window.location.pathname.toLowerCase()
    const prevPageNavbarLink = document.getElementsByClassName('active-navbar-link')[0]
    const newRouteNavbarLink = newRoute === '/' ? document.getElementById('home-navbar-link') : document.getElementById(`${newRoute.slice(1)}-navbar-link`)
    const prevRouteSlices = prevPageNavbarLink.href.split('/')
    const prevRoute = `/${prevRouteSlices[prevRouteSlices.length - 1].toLowerCase()}`
    const prevPageId = prevRoute === '/' ? 'home-container' : `${prevRoute.slice(1)}-container`

    document.getElementById(prevPageId).remove()
    prevPageNavbarLink.classList.remove('active-navbar-link')
    newRouteNavbarLink.classList.add('active-navbar-link')

    const newPage = new routesToPages[newRoute].page()
    newPage.render()
})

class Navbar {
    onNavbarLinkClicked = event => {
        event.preventDefault()
        const currentRoute = window.location.pathname.toLowerCase()
        const clickedElementRoute = event.srcElement.attributes['href'].nodeValue

        if (!(currentRoute === clickedElementRoute)) {
            const currentRouteNavbarLink = currentRoute in routesToPages ? currentRoute === '/' ? document.getElementById('home-navbar-link') : document.getElementById(`${currentRoute.slice(1)}-navbar-link`) : null
            const newRouteNavbarLink = clickedElementRoute === '/' ? document.getElementById('home-navbar-link') : document.getElementById(`${clickedElementRoute.slice(1)}-navbar-link`)
            const currentPageId = !!currentRouteNavbarLink ? currentRoute === '/' ? 'home-container' : `${currentRoute.slice(1)}-container` : 'page-not-found'
            const newPage = new routesToPages[clickedElementRoute].page()

            !!currentRouteNavbarLink && currentRouteNavbarLink.classList.remove('active-navbar-link')
            document.getElementById('navbar-toggle').classList.remove('active-navbar-toggle')
            document.getElementById('navbar-links-div').classList.remove('navbar-links-menu-open')
            document.getElementById(currentPageId).remove()

            newRouteNavbarLink.classList.add('active-navbar-link')
            window.history.pushState({}, '', clickedElementRoute)
            newPage.render()
        }
    }

    onMenuToggleClicked = event => {
        event.preventDefault()
        const toggle = document.getElementById('navbar-toggle')
        const navbarLinksDiv = document.getElementById('navbar-links-div')

        if (event.srcElement.offsetParent.classList.contains('active-navbar-toggle')) {
            toggle.classList.remove('active-navbar-toggle')
            navbarLinksDiv.classList.remove('navbar-links-menu-open')
        } else {
            toggle.classList.add('active-navbar-toggle')
            navbarLinksDiv.classList.add('navbar-links-menu-open')
        }
    }

    render() {
        const currentRoute = window.location.pathname
        const nav = document.createElement('nav')

        const homeNavbarLink = document.createElement('a')
        homeNavbarLink.id = 'home-navbar-link', homeNavbarLink.href = '/'
        if (currentRoute === '/') homeNavbarLink.classList.add('active-navbar-link')
        homeNavbarLink.appendChild(document.createTextNode(routesToPages['/'].title))
        homeNavbarLink.addEventListener('click', this.onNavbarLinkClicked)

        const navbarLinksDiv = document.createElement('div')
        navbarLinksDiv.id = 'navbar-links-div'
        Object.entries(routesToPages).slice(1).forEach(([route, { title }]) => {
            const navbarLink = document.createElement('a')
            navbarLink.classList.add('navbar-link'), navbarLink.href = route, navbarLink.id = `${route.slice(1)}-navbar-link`
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