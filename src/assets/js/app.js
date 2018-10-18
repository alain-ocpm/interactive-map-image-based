import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

import 'tablesaw/dist/tablesaw.jquery';
import libs from './lib/dependancies';
window.libs = libs;

$(document).foundation();

libs.AOS.init();

// SVG Injector
// Elements to inject
var mySVGsToInject = document.querySelectorAll('img.inject-me');

// Options
var injectorOptions = {
  evalScripts: 'once',
  pngFallback: 'assets/png'
};

var afterAllInjectionsFinishedCallback = function (totalSVGsInjected) {
  // Callback after all SVGs are injected
  console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
};

var perInjectionCallback = function (svg) {
  // Callback after each SVG is injected
  console.log('SVG injected: ' + svg);
};

// create injector configured by options
var injector = new libs.svgInjector(injectorOptions);

// Trigger the injection
injector.inject(
  mySVGsToInject,
  afterAllInjectionsFinishedCallback,
  perInjectionCallback
);

// tablesaw table plugin
$(function () {
  $(document)
    .foundation()
    .trigger('enhance.tablesaw');
});

var TablesawConfig = {
  swipeHorizontalThreshold: 15
};

// app dashboard toggle
$('[data-app-dashboard-toggle-shrink]').on('click', function(e) {
  e.preventDefault();
  $(this).parents('.app-dashboard').toggleClass('shrink-medium').toggleClass('shrink-large');
});

var isMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );

//Map classes toggle + tooltip
var sideMenuItems = $(".menu-item");
var smallMenuItems = $(".small-menu a");
var zones = $(".zones");

if(isMobile){

}

else {
  sideMenuItems.hover(
    function() {
      $(zones[sideMenuItems.index($(this))]).toggleClass("zones-highlight")
    }
  );

  smallMenuItems.hover (
    function() {
      $(zones[smallMenuItems.index($(this))]).toggleClass("zones-highlight")
    }
  );

  var tooltip = $(".tooltip");
  $(".zones a").hover(
    function() {
      tooltip.addClass('active');
      tooltip.html($(this).children().attr('title'));
    },
    function() {
      tooltip.removeClass('active');
    },
  );

  $(document).on('mousemove', function(e){
    tooltip.css({
      left:  e.clientX + 20 - $('#map').offset().left,
      top:   e.clientY + 20 - $('#map').offset().top
    });
  });
}

//Kinda hacky, but should work under normal circumstances because down.zf.accordion should always be fired after click

var accItem;

$(".accordion-item").click(function(e){
  var target = e.target.parentElement;
  accItem = target;
});

$(".accordion").on('down.zf.accordion', function(e) {
  if($(accItem).find(".content-carousel").length) {
    $(".content-carousel").slick({
      speed: 500,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 8000,
      cssEase: 'linear',
      infinite: true,
      swipeToSlide: true,
      centerMode: true,
      focusOnSelect: true,
    });
  }
});

$(".accordion").on('up.zf.accordion', function(e) {
  if($(".slick-initialized").length && $(accItem).find(".content-carousel").length)
    $(".content-carousel").slick('unslick');
})
