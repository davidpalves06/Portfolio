const navBar = document.getElementById("navBar")
const aboutNav = document.getElementById("aboutNavigation")
const aboutSection = document.getElementById("about")
const experienceNav = document.getElementById("experienceNavigation")
const experienceSection = document.getElementById("experience")
const projectNav = document.getElementById("projectsNavigation")
const projectSection = document.getElementById("projects")
const skillsNav = document.getElementById("skillsNavigation")
const skillsSection = document.getElementById("skills")
let previousPosition = window.scrollY
let mouseY = 0;

function resetStyles() {
    aboutNav.setAttribute("data-onscreen", "false")
    experienceNav.setAttribute("data-onscreen", "false")
    projectNav.setAttribute("data-onscreen", "false")
    skillsNav.setAttribute("data-onscreen", "false")
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
            let experienceOffsetTop = experienceSection.offsetTop + (experienceSection.offsetHeight / 2)
            let projectsOffsetTop = projectSection.offsetTop + (projectSection.offsetHeight / 2)
            let skillsOffsetTop = skillsSection.offsetTop + (skillsSection.offsetHeight / 2)
            let currentPos = (this.scrollY !== undefined) ? this.scrollY : (document.documentElement || document.body.parentNode || document.body).currentPos;
            resetStyles()
            if (currentPos >= 0 && currentPos < aboutOffsetTop) {
                aboutNav.setAttribute("data-onscreen", "true")
            } else if (currentPos < experienceOffsetTop) {
                experienceNav.setAttribute("data-onscreen", "true")
            } else if (currentPos < skillsOffsetTop) {
                skillsNav.setAttribute("data-onscreen", "true")
            } else if (currentPos < projectsOffsetTop) {
                projectNav.setAttribute("data-onscreen", "true")
            } 

            if (currentPos > previousPosition && mouseY > navBar.offsetHeight) {
                navBar.style.top = `-${navBar.offsetHeight}px`
            } else {
                navBar.style.top = "0px"
            }

            previousPosition = currentPos
            ticking = false;
        });
        ticking = true;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let lazyElements = [].slice.call(document.querySelectorAll(".lazy"));

    if ("IntersectionObserver" in window) {
        let lazyElementObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                const rect = entry.boundingClientRect;
                if (entry.isIntersecting || rect.top < 0) {
                    let lazyElement = entry.target;

                    if (lazyElement.tagName && lazyElement.tagName.toUpperCase() === 'IMG') {
                        lazyElement.src = lazyElement.dataset.src;
                        lazyElement.loading = "eager"
                        lazyElement.removeAttribute('data-src');
                        lazyElement.onload = function () {
                            lazyElement.classList.add('loaded');
                        };
                    }
                    else {
                        lazyElement.classList.add('loaded')
                    }


                    lazyElementObserver.unobserve(lazyElement);
                }
            });
        });

        lazyElements.forEach(function (lazyElement) {
            lazyElementObserver.observe(lazyElement);
        });
    }
});

window.addEventListener('scroll', handleScroll)