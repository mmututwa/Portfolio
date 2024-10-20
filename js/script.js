// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon'); // Changed to menuIcon to match the rest of the code
let navbar = document.querySelector('.navbar');

import blogPosts from './blogPosts.js';

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id'); 

        if (top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if you want to use animation that repeats on scroll, use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // Sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when clicking navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// import blogPosts from './blogPosts.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('blog-container');
    
    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        postElement.innerHTML = `
            <h3><a href="post${post.id}.html">${post.title}</a></h3>
            <p>${post.content}</p>
            <p class="text-right"><small>written by ${post.author}</small></p>
            <p class="text-right"><small>Posted on ${post.date}</small></p>
        `;
        container.appendChild(postElement);
    });
});