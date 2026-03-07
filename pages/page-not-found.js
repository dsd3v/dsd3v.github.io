export class PageNotFound {
    render() {
        const pageNotFoundContainer = document.createElement('section')
        pageNotFoundContainer.className = 'page-container', pageNotFoundContainer.id = 'page-not-found-container'

        const pageNotFoundDiv = document.createElement('div')
        pageNotFoundDiv.appendChild(document.createTextNode('Page not found.'))

        const invalidUrlSpan = document.createElement('span')
        invalidUrlSpan.appendChild(document.createTextNode('Invalid URL entered.'))

        pageNotFoundContainer.appendChild(pageNotFoundDiv)
        pageNotFoundContainer.appendChild(invalidUrlSpan)

        document.body.appendChild(pageNotFoundContainer)
    }
}