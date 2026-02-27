import projectsData from '../data/projects.json' with {type: 'json'}

export class Projects {
    render() {
        const projectsContainer = document.createElement('section')
        projectsContainer.className = 'page-container', projectsContainer.id = 'projects-container'

        const titleDiv = document.createElement('div')
        titleDiv.className = 'page-title'
        titleDiv.appendChild(document.createTextNode('Projects'))

        const githubExternalLink = document.createElement('a')
        githubExternalLink.className = 'external-link', githubExternalLink.href = projectsData.githubUrl
        githubExternalLink.rel = 'noopener noreferrer', githubExternalLink.target = '_blank'
        githubExternalLink.appendChild(document.createTextNode('GitHub ↗'))

        projectsContainer.appendChild(titleDiv)
        projectsContainer.appendChild(githubExternalLink)

        document.body.appendChild(projectsContainer)
    }
}