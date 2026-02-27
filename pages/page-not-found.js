export class PageNotFound {
    constructor() { }

    render() {
        document.body.innerHTML += `
        <div className='page-container' id='page-not-found'>
            <div style='font-size: 3rem; margin-top: 200px'>Page not found.</div>
            <div style='font-size: 1.5rem; margin-top: 45px'>Invalid URL entered.</div>
        </div>
        `
    }
}