import { Contact } from './pages/contact.js'
import { Education } from './pages/education.js'
import { WorkExperience } from './pages/work-experience.js'
import { Home } from './pages/home.js'
import { PageNotFound } from './pages/page-not-found.js'
import { Projects } from './pages/projects.js'

export const routesToPages = {
    '/': { id: 'home', page: Home, title: 'Home' },
    '/projects': { id: 'projects', page: Projects, title: 'Projects' },
    '/work-experience': { id: 'work-experience', page: WorkExperience, title: 'Work Experience' },
    '/education': { id: 'education', page: Education, title: 'Education' },
    '/contact': { id: 'contact', page: Contact, title: 'Contact' }
}

window.addEventListener('load', () => {
    const route = window.location.pathname.toLowerCase()
    new Navbar().render()
    let page
    if (route in routesToPages) {
        page = routesToPages[route].page
        document.getElementById(`${routesToPages[route]['id']}-navbar-link`).classList.add('active-navbar-link')
    } else {
        page = PageNotFound
    }
    new page().render()
})

window.addEventListener('popstate', event => {
    event.preventDefault()

    const prevPageNavbarLink = document.getElementsByClassName('active-navbar-link')[0]
    if (prevPageNavbarLink) {
        prevPageNavbarLink.classList.remove('active-navbar-link')
        const prevRouteArray = prevPageNavbarLink.href.split('/')
        const prevRoute = `/${prevRouteArray[prevRouteArray.length - 1]}`
        document.getElementById(`${routesToPages[prevRoute].id}-container`).remove()
    }

    const newRoute = window.location.pathname.toLowerCase()
    let page
    if (newRoute in routesToPages) {
        page = routesToPages[newRoute].page
        document.getElementById(`${routesToPages[newRoute].id}-navbar-link`).classList.add('active-navbar-link')
    } else {
        page = PageNotFound
    }

    new page().render()
})

class Navbar {
    onNavbarLinkClicked = event => {
        event.preventDefault()

        const currentRoute = window.location.pathname.toLowerCase()
        const toRoute = event.srcElement.attributes['href'].nodeValue

        if (!(currentRoute === toRoute)) {
            if (currentRoute in routesToPages) {
                document.getElementById(`${routesToPages[currentRoute].id}-navbar-link`).classList.remove('active-navbar-link')
                document.getElementById(`${routesToPages[currentRoute].id}-container`).remove()
            } else {
                document.getElementById('page-not-found-container').remove()
            }

            document.getElementById(`${routesToPages[toRoute].id}-navbar-link`).classList.add('active-navbar-link')
            document.getElementById('navbar-toggle').classList.remove('active-navbar-toggle')
            document.getElementById('navbar-links-div').classList.remove('navbar-links-menu-open')

            window.history.pushState({}, '', toRoute)
            new routesToPages[toRoute].page().render()
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
        Object.entries(routesToPages).slice(1).forEach(([route, { id, title }]) => {
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