const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menuLinks');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    console.log("Clicked!");
    hamburgerElement.classList.toggle('open');
});