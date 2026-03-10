import { useNavigation } from '/navigation.js'

export class Home {
    render() {
        const { generateHomeNavigationDiv } = useNavigation()

        const homeContainer = document.createElement('section')
        homeContainer.id = 'home-container'

        const h1 = document.createElement('h1')
        h1.appendChild(document.createTextNode('David Sordia'))

        const h2 = document.createElement('h2')
        h2.appendChild(document.createTextNode('AI Engineering Apprentice'))

        const homeNavigationDiv = generateHomeNavigationDiv()

        homeContainer.appendChild(h1)
        homeContainer.appendChild(h2)
        homeContainer.appendChild(homeNavigationDiv)

        document.body.appendChild(homeContainer)
    }
}