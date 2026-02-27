import workExperienceData from '../data/work-experience.json' with {type: 'json'}

export class WorkExperience {
    render() {
        const workExperienceContainer = document.createElement('section')
        workExperienceContainer.className = 'page-container', workExperienceContainer.id = 'work-experience-container'

        const titleDiv = document.createElement('div')
        titleDiv.className = 'page-title'
        titleDiv.appendChild(document.createTextNode('Work Experience'))

        const ul = document.createElement('ul')
        workExperienceData.forEach(workExperience => {
            const li = document.createElement('li')
            const divider = document.createElement('span')
            divider.className = 'divider'
            divider.appendChild(document.createTextNode('/'))
            li.appendChild(document.createTextNode(workExperience.description))
            li.appendChild(divider)
            li.appendChild(document.createTextNode(workExperience.dates))
            ul.appendChild(li)
        })

        workExperienceContainer.appendChild(titleDiv)
        workExperienceContainer.appendChild(ul)

        document.body.appendChild(workExperienceContainer)
    }
}