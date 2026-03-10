import projectsData from '/data/projects.json' with { type: 'json' }

export class Projects {
    render() {
        const projectsContainer = document.createElement('section')
        projectsContainer.className = 'page-container', projectsContainer.id = 'projects-container'

        const pageTitle = document.createElement('h1')
        pageTitle.className = 'page-title'
        pageTitle.appendChild(document.createTextNode('Projects'))

        const githubExternalLink = document.createElement('a')
        githubExternalLink.className = 'external-link', githubExternalLink.href = projectsData.githubUrl
        githubExternalLink.rel = 'noopener noreferrer', githubExternalLink.target = '_blank'
        githubExternalLink.appendChild(document.createTextNode('GitHub ↗'))

        projectsContainer.appendChild(pageTitle)
        projectsContainer.appendChild(githubExternalLink)

        document.body.appendChild(projectsContainer)
    }
}