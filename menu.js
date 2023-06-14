const menuButton = document.querySelector('.bars');
const menu = document.querySelector('.menu-items');

menuButton.addEventListener('click', () => {
    if (menu.style.display === 'none') {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
});