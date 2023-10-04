function menuToggle(state) {
    var ele = document.getElementById('menu');
    switch (state) {
        case 'show':
            ele.style.opacity = 1;
            ele.style.color = 'rgb(96, 96, 96)';
            ele.style.visibility = 'visible';
            ele.style.transition = 'visibility 0s, opacity 0.3s';
            break;
        case 'hide':
            ele.style.opacity = 0;
            ele.style.color = 'black';
            ele.style.visibility = 'hidden';
            ele.style.transition = 'visibility 0.3s, opacity 0.3s';
            break;
    }
}