
const splashContainer = document.getElementById('logo-splash');
var videoPlayer = false;
if (splashContainer) {
  var splashVideo = splashContainer.querySelector('video');
  splashVideo.onended = function() {
    splashContainer.classList.add('ended');
  };
}

function setupPage() {

  function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  if (window.innerWidth > 737) {
    // get multiple videos
    var vids = document.querySelectorAll('video');
    // loop through the videos
    if (vids.length > 0) {
      vids.forEach(function(vid){
          var sources = vid.querySelectorAll('source');
          sources.forEach(function(source){
            var src = source.getAttribute('data-src');
            if (src == null) return;
            source.setAttribute('src', src);
          });
          vid.load();
          if (vid.hasAttribute('autoplay')) {
            vid.oncanplay = function() {
              vid.play();
            }
          }

      });

    }
  }

  var nodes = [].slice.call(document.querySelectorAll('div.item__container'), 0);
  var directions = {
    0: 'top',
    1: 'right',
    2: 'bottom',
    3: 'left'
  };
  var classNames = ['in', 'out'].map(function (p) {
    return Object.values(directions).map(function (d) {
      return "".concat(p, "-").concat(d);
    });
  }).reduce(function (a, b) {
    return a.concat(b);
  });

  var getDirectionKey = function getDirectionKey(ev, node) {
    var _node$getBoundingClie = node.getBoundingClientRect(),
        width = _node$getBoundingClie.width,
        height = _node$getBoundingClie.height,
        top = _node$getBoundingClie.top,
        left = _node$getBoundingClie.left;

    var l = ev.pageX - (left + window.pageXOffset);
    var t = ev.pageY - (top + window.pageYOffset);
    var x = 0;
    var y = t - height / 2 * (height > width ? width / height : 1);
    return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  };

  var Item = /*#__PURE__*/function () {
    "use strict";

    function Item(element) {
      var _this = this;

      _classCallCheck(this, Item);

      this.element = element;
      this.element.addEventListener('mouseenter', function (ev) {
        return _this.update(ev, 'in');
      });
      this.element.addEventListener('mouseleave', function (ev) {
        return _this.update(ev, 'out');
      });
    }

    _createClass(Item, [{
      key: "update",
      value: function update(ev, prefix) {
        var _this$element$classLi;

        (_this$element$classLi = this.element.classList).remove.apply(_this$element$classLi, _toConsumableArray(classNames));

        this.element.classList.add("".concat(prefix, "-").concat(directions[getDirectionKey(ev, this.element)]));
      }
    }]);

    return Item;
  }();

  var splash = 5000;
  if (checkCookie('splash')) {
    var splashelem = document.getElementById('logo-splash');
    if (splashelem) splashelem.parentNode.removeChild(splashelem);
    splash = 300;
  }

  nodes.forEach(function (node) {
    return new Item(node);
  });

  var videos = document.querySelectorAll('.video-selector .project__inner__video');

  if (videos.length > 0) {
    var placeholder = document.querySelector('.video__background');
    var emptyvidwindow = document.querySelector('#video-player:not([data-vimeo-initialized])');
    if (emptyvidwindow && jQuery(window).width() > 737) {
      console.log('empty');
      emptyvidwindow.addEventListener("click", function(e){
        videos[0].click();
      })
    }
    var vidoptions = {
      width: window.innerWidth,
      height: window.innerHeight - 400
    }
    if (jQuery(window).width() < 737) {
      vidoptions.height = 'auto';
    }
    videoPlayer = false;
    let selected;
    let position;

    videos.forEach(( vid, index ) => {
      if (vid.href === window.location.href ) {
        position = index;
      }
      vid.addEventListener("click", function(e){
        e.preventDefault();
        window.history.replaceState('director-video', 'Title', this.href);
        jQuery('#video-player').fadeIn();
        playVideo(this.dataset.vimeo, this.dataset.client, this.dataset.title);
      });
    });
    selected = videos[ position ];
    if (selected) {
      playVideo(selected.dataset.vimeo, selected.dataset.client, selected.dataset.title);
    }

    function playVideo(vimeo, client, title) {
      console.log(vimeo);
      jQuery('.header__subtitle').hide();
      jQuery('.video__title').text(title);
      jQuery('.video__client').text(client);
      jQuery('.header__subtitle').fadeIn();
      var placeholder = document.querySelector('.video__background');
      placeholder.style.display = 'none';
      if (parseInt(vimeo)) {
        vidoptions.id = parseInt(vimeo);
      } else {
        vidoptions.url = vimeo
      }
      if (!videoPlayer) {
        videoPlayer = new Vimeo.Player('video-player', vidoptions);
        videoPlayer.play();
      } else {
        videoPlayer.loadVideo(vimeo).then(function(){
          videoPlayer.play();
        });
      }

    }
  }
  anime.timeline({loop: false}).add({
    targets: '.wp-block-wildgift-project .project__inner',
    translateY: [200,0],
    easing: "easeOutExpo",
    duration: 1400,
    delay: (el, i) => 200 * i
  });

  anime.timeline({loop: false}).add({
    targets: '#page.page-about .content__content',
    lineHeight: ['10em','1.3em'],
    overflow: ['hidden','visible'],
    easing: "easeOutExpo",
    duration: 2000,
  });

  anime.timeline({loop: false}).add({
    targets: '#page.single-director img.video__background',
    opacity: [.1,1],
    easing: "easeOutExpo",
    duration: 1500
  });



  var textWrapper = document.querySelectorAll('#page.home .hero__inner *');
  textWrapper.forEach(function(text) {
    var words = text.innerHTML.split(' ');
    var output = '';
    words.forEach(function(word) {
      word = word.replace(/\S/g, "<span class='letter'>$&</span>");
      if (jQuery(window).width() < 737) {
        output += '<div class="word">'+word+'</div>';
      } else {
        output += word+' ';
      }

    });
    text.innerHTML = output;
  });
  anime.timeline({loop: false}).add({
    targets: '#page.home .hero__inner span.letter',
    translateY: [200,0],
    easing: "easeOutExpo",
    duration: 2000,
    delay: (el, i) => splash + 10 * i
  });

  var textWrapper = document.querySelectorAll('#page.single-director header.entry-header .header__name');
  textWrapper.forEach(function(text) {
    text.innerHTML = text.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  });
  anime.timeline({loop: false}).add({
    targets: '#page.single-director header.entry-header .header__name > span',
    translateY: [200,0],
    easing: "easeOutExpo",
    duration: 2000,
    delay: (el, i) => splash + 10 * i
  });

  anime.timeline({loop: false}).add({
    targets: '#page.page-contact .wp-block-columns .wp-block-column',
    translateY: [200,0],
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 2000,
    delay: (el, i) => splash + 200 * i
  });

  anime.timeline({loop: false}).add({
    targets: '#page.home #site-navigation',
    width: ['0%', '100%'],
    duration: 1000,
    easing: 'linear',
    delay: splash
  });

  anime.timeline({loop: false}).add({
    targets: '#page.home #site-navigation button',
    opacity: [0, 1],
    duration: 500,
    easing: 'linear',
    delay: splash + 250
  })

  anime.timeline({loop: false}).add({
    targets: '#page.home footer .footer__rule__right',
    width: ['0%', '100%'],
    duration: 500,
    easing: 'linear',
    delay: splash + 500
  }).add({
    targets: '#page.home footer .footer__rule__left',
    width: ['0%', '100%'],
    duration: 1000,
    easing: 'linear',
    delay: 0
  })

  if (jQuery(window).width() > 737) {
    jQuery('.projects__carousel').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>'
      });
  }
}

setupPage();



jQuery( document ).ready(function($) {

  var pageselected = false;
  var bgimgs = {}

  $('.menu-menu-container ul.menu li.menu-item a').each(function() {
    var link = $(this);
    var id = link[0].dataset.id
    var img = link[0].dataset.bgimg
    var cont = $('.menu-menu-container');
    var bg = $('<div class="bg-hoder" data-id="'+id+'"></div>').css('background-image','url('+img+')');
    bgimgs[id] = bg;
    cont.after(bg);
  }).promise().done(
    function(){
      $('.bg-hoder').each(
        function() {
          $(this).hide();
        })
    });
  $('.menu-menu-container ul.menu li.menu-item a').mouseenter(function() {
    var link = $(this);
    var id = link[0].dataset.id;
    $('.bg-hoder').hide();
    $('.menu-menu-container').css('background','rgba(0,0,0,0)');
    bgimgs[id].css('transform','scale(1.05)');
    bgimgs[id].show();

  }).mouseleave(function(){
    if (pageselected) return;
    var link = $(this);
    var id = link[0].dataset.id;
    bgimgs[id].css('transform','scale(1)');
    $('.menu-menu-container').css('background','rgba(0,0,0,1)').delay(300).queue(function(){;

      bgimgs[id].fadeOut().dequeue();
    });
  })

  $(document).on("click","#close-video-player",function(e){
    $('#video-player').fadeOut(function() {
      videoPlayer.destroy();
      videoPlayer = false;
    });
  })

  $(document).on("click","a[data-local]",function(e){
    pageselected = true;
    e.preventDefault(); // cancel click
    var link = $(this);
    var id = link[0].dataset.id
    var page = $(this).attr("href");
    $("#primary").css('opacity',0);

    window.history.pushState('wildgift', 'Title', $(this).attr("href"));
    if(link.data('ismenu')) {

      anime.timeline({loop: false}).add({
        targets: '#primary-menu a',
        opacity: [1,0],
        easing: "easeOutExpo",
        duration: 100,
        delay: 0
      }).add({
        targets: '.menu-menu-container',
        height: ['100%','0%'],
        width: ['100%','0%'],
        opacity: [1,0],
        easing: "easeOutExpo",
        duration: 200,
        delay: 0
      });
    }
    if(link.data('isdirector')) {
      if (jQuery(window).width() > 737) {
        var viewportOffset = $(link).get(0).getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        console.log(viewportOffset);
        var placeholder = link.find('.item__image');
        placeholder.css('position', 'fixed').css('height',viewportOffset.height).css('width','100%').css('top',viewportOffset.top).css('background-position','center').css('background-size', 'cover');
        $('#page').after(placeholder);
        placeholder.animate({
          top:'164px',
          height: window.innerHeight - 400
        }, 500, function() {
          placeholder.delay(500).queue(function(){
            placeholder.remove().dequeue();
          });
        })
      }
    }

    $.get(page, function(data) {
        window.scrollTo(0, 0);
        var bodyclasses = $(data).find("#page").attr('class');
        $("#primary").replaceWith($(data).find("#primary"));

        $("#primary").delay(500).queue(function(){
          $("#primary").css('opacity',1).dequeue();
        });

        $("#page").attr('class',bodyclasses);
        setupPage();
        pageselected = false;
        if(link.data('ismenu')) {
            $('#site-navigation button').attr('aria-expanded', 'false' );
            $('main').addClass('transition').delay(100).queue(function(){
              $('.menu-menu-container').css('background','rgba(0,0,0,1)');
              $('nav').removeClass('menu-out').removeClass('toggled');
              $('nav button').removeClass('is-active');
              bgimgs[id].slideUp();
              document.body.classList.remove( 'menu-open' );
              $(this).removeClass("transition").dequeue();
            });
        } else if(link.data('isdirector')) {

        }

    });
  });

  $(window).on("popstate", function (e) {
      location.reload();
  });


});

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(name, val = 'cookie', exp = 1) {
  var cookie = getCookie(name);
  if (cookie == val) {
    return true;
  } else {
    setCookie(name, val, exp);
  }
}
