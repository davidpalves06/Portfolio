const navBar = document.getElementById("navBar")
const aboutNav = document.getElementById("aboutNavigation")
const aboutSection = document.getElementById("about")
const projectNav = document.getElementById("projectsNavigation")
const projectSection = document.getElementById("projects")
const skillsNav = document.getElementById("skillsNavigation")
const skillsSection = document.getElementById("skills")
const contactNav = document.getElementById("contactNavigation")
const contactSection = document.getElementById("contact")
let previousPosition = window.scrollY
let mouseY = 0;

function resetStyles() {
    aboutNav.setAttribute("data-onscreen", "false")
    projectNav.setAttribute("data-onscreen", "false")
    skillsNav.setAttribute("data-onscreen", "false")
    contactNav.setAttribute("data-onscreen", "false")
}

document.addEventListener('mousemove', function (event) {
    mouseY = event.clientY;
    if (mouseY < navBar.offsetHeight) {
        navBar.style.top = "0px"
    }
});

let ticking = false
function handleScroll() {
    if (!ticking) {
        window.requestAnimationFrame(function () {
            let aboutOffsetTop = aboutSection.offsetTop + (aboutSection.offsetHeight / 2)
            let projectsOffsetTop = projectSection.offsetTop + (projectSection.offsetHeight / 2)
            let skillsOffsetTop = skillsSection.offsetTop + (skillsSection.offsetHeight / 2)
            let contactOffsetTop = contactSection.offsetTop + (contactSection.offsetHeight / 2)
            let currentPos = (this.scrollY !== undefined) ? this.scrollY : (document.documentElement || document.body.parentNode || document.body).currentPos;
            resetStyles()
            if (currentPos >= 0 && currentPos < aboutOffsetTop) {
                aboutNav.setAttribute("data-onscreen", "true")
            } else if (currentPos < projectsOffsetTop) {
                projectNav.setAttribute("data-onscreen", "true")
            } else if (currentPos < skillsOffsetTop) {
                skillsNav.setAttribute("data-onscreen", "true")
            } else if (currentPos < contactOffsetTop) {
                contactNav.setAttribute("data-onscreen", "true")
            }

            if (currentPos > previousPosition && mouseY > navBar.offsetHeight) {
                navBar.style.top = `-${navBar.offsetHeight}px`
            } else {
                navBar.style.top = "0px"
            }

            previousPosition = currentPos
            console.log("Scroll event handled");
            ticking = false;
        });
        ticking = true;
    }
}


window.addEventListener('scroll', handleScroll)