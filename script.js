// Assuming certifications.json is loaded
const certifications = [
    ["JavaScript", "Infosys", "https://kuresi.s3.amazonaws.com/Javascript_certification.pdf", "infosys1.png"],
    ["Python", "Infosys", "https://kuresi.s3.amazonaws.com/Python_certification.pdf", "infosys2.png"],
    ["Frontend Developer", "Infosys", "https://kuresi.s3.amazonaws.com/Infosys+FrontEnd+Developer.pdf", "FrontEndDeveloper.png"],
    ["Data Science", "DataCamp", "https://www.datacamp.com/statement-of-accomplishment/track/3d17df317717ba7a4c08fdae8d2c1c0941adc16f", "dataScience.PNG"],
    ["Bot Building", "Google", "https://www.coursera.org/account/accomplishments/certificate/TTFMTNN3LGJX", "botGoogle.PNG"],
    ["Bot Building", "DataCamp", "https://www.datacamp.com/statement-of-accomplishment/course/0256d29c23dd490550f9679aa8a67eae20145fbc", "botPython.PNG"],
    ["Deep Learning", "DeepLearning.AI", "https://www.coursera.org/account/accomplishments/specialization/JGSFCUK9WS6D", "deepLearning.PNG"],
    ["Mathematics", "Imperial College London", "https://www.coursera.org/account/accomplishments/specialization/RQFPVXP9MJ4N", "mathematics.PNG"],
    ["Algorithms", "University of California San Diego", "https://www.coursera.org/account/accomplishments/verify/WZAAUR56AZUM", "algorithms.PNG"],
    ["Data Structures", "University of California San Diego", "https://www.coursera.org/account/accomplishments/verify/V5E8VAJ6QFAN", "dataStructures.PNG"],
    ["Python", "University of Michigan", "https://www.coursera.org/account/accomplishments/verify/DRZKDSE2W2A3", "python.PNG"],
    ["Java", "Test Dome", "https://www.testdome.com/cert/87e996a5f4b8461881e9b95a27f47e41", "java.PNG"]
];

document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.section');

    // Function to clear all active states and set a specific link as active
    function setActiveLink(link) {
        sidebarLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
    }

    // Smooth scrolling and setting active link on click
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Smooth scroll to the target section
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

            // Set clicked link as active immediately and disable scroll-based highlighting temporarily
            setActiveLink(this);

            // Temporarily disable scroll-based active link updating to avoid conflicts
            window.removeEventListener('scroll', onScroll);
            setTimeout(() => {
                window.addEventListener('scroll', onScroll);
            }, 1000); // Adjust timeout based on scrolling speed if necessary
        });
    });

    // Detect the section in view on scroll
    function onScroll() {
        let currentSectionId = '';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            // Check if the top of the section is in the viewport
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Update active link based on the current section in view
        if (currentSectionId) {
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === currentSectionId) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Attach the onScroll function to the scroll event
    window.addEventListener('scroll', onScroll);
});


const certificationsContainer = document.querySelector('.certifications-carousel');

// Dynamically create certification items
certifications.forEach(([title, certifier, link, imageName]) => {
    const certDiv = document.createElement('div');
    certDiv.classList.add('certification-item');
    
    // Populate certification item with image, title, certifier, and link
    certDiv.innerHTML = `
        <img src="./assets/${imageName}" alt="${title} Certification">
        <div class="certification-details">
            <p class="certification-title">${title}</p>
            <div class="certification-footer">
                <span class="certification-certifier">${certifier}</span>
                <a href="${link}" target="_blank" class="certification-link">See Credentials</a>
            </div>
        </div>
    `;
    
    // Append the certification item to the carousel
    certificationsContainer.appendChild(certDiv);
});