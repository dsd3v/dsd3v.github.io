import { useNavigation } from '/navigation.js'

(() => {
    const initializeApp = () => {
        const { navigate, renderNavbar } = useNavigation()

        document.addEventListener('DOMContentLoaded', () => {
            renderNavbar()
            navigate({ isFromUrl: true, toRoute: window.location.pathname })
        })

        window.addEventListener('popstate', event => {
            event.preventDefault()
            navigate({ isFromPopState: true, toRoute: window.location.pathname })
        })
    }

    initializeApp()
})()