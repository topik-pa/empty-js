//All the logic is inside the AME module to avoid global pace pollution
var AME = (function () {

  return {
    startSlider: function () {
      var mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        slidesPerView: 3,
        breakpoints: {
          700: {
            width: 210,
            slidesPerView: 1
          }
        },      
        pagination: {
          el: '.swiper-pagination',
        },      
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      });
    },

    startProgressIndicator: function () {
      var deabouncedScrollListener = AMELibrary.debounce(function () {
        var scrollPosition = window.scrollY;
        var scrollSize = document.documentElement.offsetHeight - window.innerHeight;
        var advanced = Math.round((scrollPosition * 100) / scrollSize);
        var progress = document.querySelector('#progress progress');
        progress.setAttribute('value', advanced);
      }, 10);
      
      window.addEventListener('scroll', deabouncedScrollListener);
    },


    headerEffect: function () {
      var limit = 50;
      var header = document.getElementById('header');      
      var deabouncedScrollListener = AMELibrary.debounce(function () {
        var scrollPosition = window.scrollY;
        if(scrollPosition > limit) {
          header.classList.add('compact');
        }
        else {
          header.classList.remove('compact');
        }
      }, 10);
      
      window.addEventListener('scroll', deabouncedScrollListener);
    }

  };

})();


AME.startSlider();
AME.startProgressIndicator();
AME.headerEffect();
