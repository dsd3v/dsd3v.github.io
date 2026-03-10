import { Contact } from '/pages/contact.js'
import { Education } from '/pages/education.js'
import { Home } from '/pages/home.js'
import { Projects } from '/pages/projects.js'
import { WorkExperience } from '/pages/work-experience.js'

export const routesToRouteConfigs = {
    '/': { id: 'home', page: Home, title: 'Home' },
    '/projects': { id: 'projects', page: Projects, title: 'Projects' },
    '/work-experience': { id: 'work-experience', page: WorkExperience, title: 'Work Experience' },
    '/education': { id: 'education', page: Education, title: 'Education' },
    '/contact': { id: 'contact', page: Contact, title: 'Contact' }
}