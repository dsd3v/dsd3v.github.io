import { Navbar, navigate } from '/navigation.js'

window.addEventListener('load', () => {
    new Navbar().render()
    navigate({ isFromUrl: true, toRoute: window.location.pathname.toLowerCase() })
})

window.addEventListener('popstate', event => {
    event.preventDefault()
    navigate({ isFromPopState: true, toRoute: window.location.pathname.toLowerCase() })
})