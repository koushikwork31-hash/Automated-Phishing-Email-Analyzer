
function init() {
  if (window.AOS) {
    AOS.init();
  }
  
  var icons = document.querySelectorAll('[data-bss-hover-animate]');
  
  for (var i = 0; i < icons.length; i++) {
    icons[i].addEventListener('mouseenter', function() {
      this.classList.add('animated', this.getAttribute('data-bss-hover-animate'));
    });
    icons[i].addEventListener('mouseleave', function() {
      this.classList.remove('animated', this.getAttribute('data-bss-hover-animate'));
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
