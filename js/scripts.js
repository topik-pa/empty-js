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


    getLessons: function (method='get', url, data) {

      //The template function
      function templater(strings, ...keys) {
        return function(data) {
            let temp = strings.slice();
            keys.forEach((key, i) => {
                temp[i] = temp[i] + data[key];
            });
            return temp.join('');
        }
      };

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(event) {
          if(xhr.readyState == 4) {
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
              var response = JSON.parse(xhr.responseText);
              if(response.type === 'lessons') {
                //The JSON is relative to Lessons          
                var target = document.getElementById('target');
                var template = templater`
                  <label for="${'value'}">
                    <input type="checkbox" id="${'value'}">
                    <span></span>
                    ${'text'}
                  </label> 
                `;
                var lessons = response.items; 
                for (var i=0; i<lessons.length; i++) {
                  if (!lessons[i].valid) return //Do not print not valid lessons
                  var labelTag = template(lessons[i]);
                  var wrapper = document.createElement('div');
                  wrapper.innerHTML = labelTag;
                  target.appendChild(wrapper);
                }        
              }   
            }
            else {
              alert('Request was unsuccesful; ' + xhr.status);
            }
          }
        };
        xhr.open(method, url, true);
        xhr.timeout = 3000;
        xhr.ontimeout = function() {
            alert('Request did not return in 3 seconds');
        };
        /*xhr.onprogress = function(event) {
            var status = document.getElementById('status');
            status.innerHTML = 'Received ' + event.position + ' of ' + event.totalSize + ' Bytes';
        };*/
        xhr.onerror = function() {
            alert('An error occured');
        }
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(JSON.stringify(data));
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
//AME.startProgressIndicator();
AME.headerEffect();
AME.getLessons('get', '/server/url');
