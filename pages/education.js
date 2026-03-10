import educationData from '/data/education.json' with { type: 'json' }

export class Education {
    render() {
        const educationContainer = document.createElement('section')
        educationContainer.className = 'page-container', educationContainer.id = 'education-container'

        const pageTitle = document.createElement('h1')
        pageTitle.className = 'page-title'
        pageTitle.appendChild(document.createTextNode('Education'))

        const ul = document.createElement('ul')
        educationData.forEach(education => {
            const li = document.createElement('li')

            const divider = document.createElement('span')
            divider.className = 'divider'
            divider.appendChild(document.createTextNode('/'))

            li.appendChild(document.createTextNode(education.description))
            li.appendChild(divider)
            li.appendChild(document.createTextNode(education.dates))

            ul.appendChild(li)
        })

        educationContainer.appendChild(pageTitle)
        educationContainer.appendChild(ul)

        document.body.appendChild(educationContainer)
    }
}