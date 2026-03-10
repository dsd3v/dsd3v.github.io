import { useNavigation } from '/navigation.js'

(() => {
    const initializeApp = () => {
        const { navigate, renderNavbar } = useNavigation()

        document.addEventListener('DOMContentLoaded', () => {
            renderNavbar()

            const redirectPath = sessionStorage.getItem('redirectPath')
            if (redirectPath) {
                sessionStorage.removeItem('redirectPath')
                window.history.replaceState(null, null, redirectPath)
                targetRoute = redirectPath
            }

            navigate({ isFromUrl: true, toRoute: window.location.pathname })
        })

        window.addEventListener('popstate', event => {
            event.preventDefault()
            navigate({ isFromPopState: true, toRoute: window.location.pathname })
        })
    }

    initializeApp()
})()