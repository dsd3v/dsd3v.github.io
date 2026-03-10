import { appRouter, navigate } from '/navigation.js'

export class Home {
    onHomeNavigationLinkClicked = event => {
        event.preventDefault()
        navigate({ toRoute: event.srcElement.attributes['href'].nodeValue })
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
        Object.entries(appRouter['routesToRouteConfigs']).slice(1).forEach(([route, { title }]) => {
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