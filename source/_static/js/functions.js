document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementsByClassName('icon-home')[0];
    const img = document.createElement('img');
    img.setAttribute("src", "_static/assets/logo.svg")
    logo.innerHTML = '';
    logo.appendChild(img)
})