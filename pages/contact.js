import contactData from '/data/contact.json' with { type: 'json' }

export class Contact {
    render() {
        const contactContainer = document.createElement('section')
        contactContainer.className = 'page-container', contactContainer.id = 'contact-container'

        const pageTitle = document.createElement('h1')
        pageTitle.className = 'page-title'
        pageTitle.appendChild(document.createTextNode('Contact'))

        const emailSpan = document.createElement('span')
        emailSpan.appendChild(document.createTextNode(`Email: ${contactData.email}`))

        const linkedInExternalLink = document.createElement('a')
        linkedInExternalLink.className = 'external-link', linkedInExternalLink.href = contactData.linkedInUrl
        linkedInExternalLink.rel = 'noopener noreferrer', linkedInExternalLink.target = '_blank'
        linkedInExternalLink.appendChild(document.createTextNode('LinkedIn ↗'))
        linkedInExternalLink.style.paddingTop = '25px'

        contactContainer.appendChild(pageTitle)
        contactContainer.appendChild(emailSpan)
        contactContainer.appendChild(linkedInExternalLink)

        document.body.appendChild(contactContainer)
    }
}