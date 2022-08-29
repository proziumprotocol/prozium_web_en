////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let calcDays = 0,
    dailyInterest = 0,
    interestEarned = 0,
    APR = 0;

$(document).ready(function ($) {
  "use strict";

  let window_w = $(window).width(); // Window Width
  let window_h = $(window).height(); // Window Height
  let window_s = $(window).scrollTop(); // Window Scroll Top

  let $html = $("html"); // HTML
  let $body = $("body"); // Body

  let calcTime = $(".js--incomeCalcInput_time").val();
  let calcMoney = $(".js--incomeCalcInput_money").val();
  calculatorResult(calcTime, calcMoney);

  /*-------------------------------------
  Smooth Scroll
  --------------------------------------*/

  $('a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      let target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      let offset = 50;
      if (target.length) {
        $("#app").animate(
          {
            scrollTop: target.offset().top - offset,
          },
          500
        );
        $(".js--mainHeader").removeClass("open");
        $(".js--openMobileMenu").removeClass("open");
        return false;
      }
    }
  });

  /*-------------------------------------
  MainMenu - temp click open
  --------------------------------------*/
  $(".mainHeader__openMenu, .menu__item a").click(function() {
    $(".mainHeader__menu").toggleClass(function () {
      return $(this).is('.open, .close') ? 'open close' : 'open';
    });
    $(".mainHeader__openMenu").toggleClass(function () {
      return $(this).is('.open, .close') ? 'open close' : 'open';
    });
    $("body").toggleClass(function () {
      return $(this).is('.overflow-h') ? 'overflow-h' : 'overflow-h';
    });
  });


  $('input[type=range]').on('input', function(e){
    let min = e.target.min,
        max = e.target.max,
        val = e.target.value;
    
    $(e.target).css({
      'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
    });

  }).trigger('input');


  $(".js--incomeCalcInput_time").on("input", function(e) {
    calcTime = parseInt(e.target.value);
    calculatorResult(calcTime, calcMoney);
  });

  $(".js--incomeCalcInput_money").on("input", function(e) {
    calcMoney = parseInt(e.target.value);
    calculatorResult(calcTime, calcMoney);
  });

  $(".incomeCalc__toggle").on("click", function() {
    $(".js--calcBox").slideToggle();
    $(this).toggleClass("open");
  });

  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});
function numberWithComma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function calculatorResult(time, money) {
  let t = parseInt(time);
  let m = parseInt(money);

  switch(t) {
    case 1:
      calcDays = 180;
      dailyInterest = 0.025;
      interestEarned = 4.5;
      APR = 9;
      break;
    case 2:
      calcDays = 360;
      dailyInterest = 0.05;
      interestEarned = 18;
      APR = 18;
      break;
    case 3:
      calcDays = 720;
      dailyInterest = 0.075;
      interestEarned = 54;
      APR = 27;
      break;
    default:
    //console.log("default");
  }

  // change static text 
  $(".js--incomeCalcInput_time_val").text(calcDays + " days");
  $(".js--incomeCalcInput_money_val").text(numberWithComma(parseInt(m).toFixed(0)));

  // all time
  let allMoney =  m * (interestEarned / 100);
  $(".js--incomeCalcResult_all").text(numberWithComma(parseInt(allMoney).toFixed(0)));

  // month
  let monthMoney = m * (interestEarned / 100) / (calcDays / 30);
  $(".js--incomeCalcResult_month").text(numberWithComma(parseInt(monthMoney).toFixed(0)));

  // apr
  $(".js--incomeCalcResult_apr").text(APR);
}

function drawChart() {
  var googleData = google.visualization.arrayToDataTable([
    ['Language', 'Percentage'],
    ['Community',  40],
    ['Backers',  20],
    ['Development', 20],
    ['Team', 10],
    ['Marketing', 5],
    ['Advisors', 3.5],
    ['Reserve and future use', 1.5]
  ]);

  var options = {
    pieSliceText: 'none',
    pieStartAngle: 25,
    tooltip: {
      text: 'percentage'
    },
    legend: {
      position: 'none'
    },
    pieHole: 0.4,
    chartArea:{top:70,width:"90%",height:"85%"},
    colors: ['#18ffd4', '#0bd8a8', '#10ac8f', '#0d8d75', '#0b8b66', '#095e4e', '#053930']
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(googleData, options);
}