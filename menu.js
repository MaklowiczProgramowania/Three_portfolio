// Funkcjonalność menu na stronie głównej
const menuButton = document.querySelector('.bars');
const menu = document.querySelector('.menu-items');

menuButton.addEventListener('mouseover', () => {
    menu.style.display = 'flex';
    menu.addEventListener('mouseover', () => {
        menu.style.display = 'flex';
    });
});

menuButton.addEventListener('mouseout', () => {
    menu.style.display = 'none';
    menu.addEventListener('mouseout', () => {
        menu.style.display = 'none';
    });
});

const images = document.querySelectorAll('.projectImage');
const imageContainer = document.getElementById('projekty');

// Funkcjonalność dla zdjęć w sekcji projekty
images.forEach(image => {
    image.addEventListener('mouseover', () => {
        image.style.opacity = '0.8';
    });
    image.addEventListener('mouseout', () => {
        image.style.opacity = '1';
    });
});

images.forEach(image => {
    image.addEventListener('click', () => {
        const dialogBox = document.createElement('div');
        dialogBox.classList.add('dialogBox');
        dialogBox.style.backgroundImage = `url(${image.src})`;
        dialogBox.style.backgroundSize = '100%';
        imageContainer.appendChild(dialogBox);
        dialogBox.addEventListener('click', () => {
            dialogBox.remove();
        });
    });
});

// Funkcjonalność dla linku do githuba
const githubLink = document.querySelector('.githubSection');

githubLink.addEventListener('click', () => {
    window.open('https://github.com/MaklowiczProgramowania' , '_blank');
});