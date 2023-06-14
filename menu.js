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