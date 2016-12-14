///////////////////////////////////////////
// Mobile
///////////////////////////////////////////

document.getElementById('nav-primary-toggle').onclick = function() {
  document.getElementById('nav-primary-toggle').classList.toggle('is-active');
  document.getElementsByClassName('nav-primary')[0].classList.toggle("responsive");
};

///////////////////////////////////////////
// Homepage fixed nav
///////////////////////////////////////////

var nav = document.getElementsByTagName('nav')[0];
var navTimer;
var offset = nav.classList.contains('home') ? 550 : 250;
window.onscroll = function() {
  if (window.innerWidth > 768 && nav.classList.contains('home')) {
    if (document.body.scrollTop > offset) {
      nav.style.top = "0";
      nav.classList.add('fixed');
    }
    else if (document.body.scrollTop < offset && document.body.scrollTop > 200) {
      nav.style.top = "-4rem";
      clearTimeout(navTimer);
      navTimer = setTimeout(function() {
          nav.classList.add('fixed');
      }, 200);

    }
    else {
      clearTimeout(navTimer);
      nav.classList.remove('fixed');
      nav.style.top = "0";
    }
  }
  else {
    if (document.body.scrollTop > 40) {
      nav.classList.add('shadow');
    }
    else {
      nav.classList.remove('shadow');
    }
  }
};
