export class PageNotFound {
    render() {
        const pageNotFoundContainer = document.createElement('section')
        pageNotFoundContainer.className = 'page-container', pageNotFoundContainer.id = 'page-not-found-container'

        const pageNotFoundTitle = document.createElement('h1')
        pageNotFoundTitle.id = 'page-not-found-title'
        pageNotFoundTitle.appendChild(document.createTextNode('Page not found.'))

        const invalidUrlSpan = document.createElement('span')
        invalidUrlSpan.appendChild(document.createTextNode('Invalid URL entered.'))

        pageNotFoundContainer.appendChild(pageNotFoundTitle)
        pageNotFoundContainer.appendChild(invalidUrlSpan)

        document.body.appendChild(pageNotFoundContainer)
    }
}