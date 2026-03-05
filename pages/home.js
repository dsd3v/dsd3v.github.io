import { routesToPages } from '../app.js'

export class Home {
    onHomeNavigationLinkClicked = event => {
        event.preventDefault()
        const clickedElementRoute = event.srcElement.attributes['href'].nodeValue
        const homeNavbarLink = document.getElementById('home-navbar-link')
        const newRouteNavbarLink = document.getElementById(`${clickedElementRoute.slice(1)}-navbar-link`)
        const newPage = new routesToPages[clickedElementRoute].page()

        homeNavbarLink.classList.remove('active-navbar-link')
        document.getElementById('navbar-toggle').classList.remove('active-navbar-toggle')
        document.getElementById('navbar-links-div').classList.remove('navbar-links-menu-open')
        document.getElementById('home-container').remove()
        newRouteNavbarLink.classList.add('active-navbar-link')
        window.history.pushState({}, '', clickedElementRoute)
        newPage.render()
    }

    render() {
        const homeContainer = document.createElement('section')
        homeContainer.id = 'home-container'

        const h1 = document.createElement('h1')
        h1.appendChild(document.createTextNode('David Sordia'))

        const h2 = document.createElement('h2')
        h2.appendChild(document.createTextNode('AI Engineering Apprentice'))

        const homeNavigationDiv = document.createElement('div')
        homeNavigationDiv.id = 'home-navigation-div'
        Object.entries(routesToPages).slice(1).forEach(([route, { title }]) => {
            const homeNavigationLink = document.createElement('a')
            homeNavigationLink.className = 'home-navigation-link', homeNavigationLink.href = route
            homeNavigationLink.appendChild(document.createTextNode(title))
            homeNavigationLink.addEventListener('click', this.onHomeNavigationLinkClicked)

            homeNavigationDiv.appendChild(homeNavigationLink)
        })

        homeContainer.appendChild(h1)
        homeContainer.appendChild(h2)
        homeContainer.appendChild(homeNavigationDiv)

        document.body.appendChild(homeContainer)
    }
}