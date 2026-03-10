import { routesToRouteConfigs } from '/app-routes-config.js'
import { PageNotFound } from '/pages/page-not-found.js'

export const useNavigation = () => {
    const removePreviousPage = () => {
        const prevPageNavbarLink = document.getElementsByClassName('active-navbar-link')[0]

        if (prevPageNavbarLink) {
            prevPageNavbarLink.classList.remove('active-navbar-link')

            const prevRoute = new URL(prevPageNavbarLink.href).pathname
            const prevRouteConfig = routesToRouteConfigs[prevRoute]

            if (prevRouteConfig) {
                const prevPageContainer = document.getElementById(`${prevRouteConfig.id}-container`)
                if (prevPageContainer) prevPageContainer.remove()
            }
        } else {
            const pageNotFoundContainer = document.getElementById('page-not-found-container')
            if (pageNotFoundContainer) pageNotFoundContainer.remove()
        }
    }

    const renderNewPage = ({ newPageRoute, shouldUpdateUrl }) => {
        const newRouteConfig = routesToRouteConfigs[newPageRoute]
        let page

        if (newRouteConfig) {
            document.getElementById(`${newRouteConfig.id}-navbar-link`).classList.add('active-navbar-link')
            page = newRouteConfig.page
        } else {
            page = PageNotFound
        }

        document.getElementById('navbar-toggle').classList.remove('active-navbar-toggle')
        document.getElementById('navbar-links-div').classList.remove('navbar-links-menu-open')

        if (shouldUpdateUrl) window.history.pushState({}, '', newPageRoute)
        new page().render()
    }

    const getCleanedRoutePath = ({ routePath }) => {
        let cleanedRoutePath = routePath
        if (routePath.length > 1 && routePath[routePath.length - 1] == '/') cleanedRoutePath = routePath.slice(routePath(0, routePath.length - 1))
        return cleanedRoutePath
    }

    const navigate = ({ isFromPopState = false, isFromUrl = false, toRoute }) => {
        removePreviousPage()
        renderNewPage({ newPageRoute: getCleanedRoutePath({ routePath: toRoute }), shouldUpdateUrl: (!isFromPopState && !isFromUrl) })
    }

    const renderNavbar = () => {
        const nav = document.createElement('nav')

        const homeNavbarLink = document.createElement('a')
        homeNavbarLink.id = 'home-navbar-link', homeNavbarLink.href = '/'
        homeNavbarLink.appendChild(document.createTextNode(routesToRouteConfigs['/'].title))
        homeNavbarLink.addEventListener('click', event => {
            event.preventDefault()
            navigate({ toRoute: '/' })
        })

        const navbarLinksDiv = document.createElement('div')
        navbarLinksDiv.id = 'navbar-links-div'

        Object.entries(routesToRouteConfigs).slice(1).forEach(([route, { id, title }]) => {
            const navbarLink = document.createElement('a')
            navbarLink.classList.add('navbar-link'), navbarLink.href = route, navbarLink.id = `${id}-navbar-link`
            navbarLink.appendChild(document.createTextNode(title))
            navbarLink.addEventListener('click', event => {
                event.preventDefault()
                const currentRoute = getCleanedRoutePath({ routePath: window.location.pathname })
                if (currentRoute !== route) navigate({ toRoute: route })
            })

            navbarLinksDiv.appendChild(navbarLink)
        })

        const navbarToggle = document.createElement('div')
        navbarToggle.id = 'navbar-toggle'

        const hamburger = document.createElement('div')
        hamburger.id = 'hamburger'
        for (let i = 0; i < 3; i++) hamburger.appendChild(document.createElement('span'))

        const arrow = document.createElement('span')
        arrow.id = 'arrow'
        arrow.appendChild(document.createTextNode('▾'))

        navbarToggle.appendChild(hamburger)
        navbarToggle.appendChild(arrow)
        navbarToggle.addEventListener('click', event => {
            event.preventDefault()

            if (navbarToggle.classList.contains('active-navbar-toggle')) {
                navbarToggle.classList.remove('active-navbar-toggle')
                navbarLinksDiv.classList.remove('navbar-links-menu-open')
            } else {
                navbarToggle.classList.add('active-navbar-toggle')
                navbarLinksDiv.classList.add('navbar-links-menu-open')
            }
        })

        nav.appendChild(homeNavbarLink)
        nav.appendChild(navbarLinksDiv)
        nav.appendChild(navbarToggle)

        document.body.appendChild(nav)
    }

    const generateHomeNavigationDiv = () => {
        const homeNavigationDiv = document.createElement('div')
        homeNavigationDiv.id = 'home-navigation-div'

        Object.entries(routesToRouteConfigs).slice(1).forEach(([route, { title }]) => {
            const homeNavigationLink = document.createElement('a')
            homeNavigationLink.className = 'home-navigation-link', homeNavigationLink.href = route
            homeNavigationLink.appendChild(document.createTextNode(title))
            homeNavigationLink.addEventListener('click', event => {
                event.preventDefault()
                navigate({ toRoute: route })
            })

            homeNavigationDiv.appendChild(homeNavigationLink)
        })

        return homeNavigationDiv
    }

    return { generateHomeNavigationDiv, navigate, renderNavbar }
}