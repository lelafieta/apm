var currentIndex = 0;
var currentId = "camera";
$(document).ready(function () {
  $("#nav").ferroMenu({
    position: "left-center",
    delay: 50,
    rotation: 720,
    margin: 20
  });
});

var colors = {
  "camera": {
    "background": "#D06503",
    "index": 0
  },
  "user": {
    "background": "#E9931A",
    "index": 1
  },
  "mapmarker": {
    "background": "#1691BE",
    "index": 2
  },
  "music": {
    "background": "#166BA2",
    "index": 3
  },
  "commentalt": {
    "background": "#1B3647",
    "index": 4
  },
  "moon": {
    "background": "#152836",
    "index": 5
  }
};

function goTo(id) {
  var obj = eval("colors." + id);

  $("body").css("background", obj.background);
  // $("#ferromenu-controller,#nav li a").css("color", obj.background);
  if (obj.index > currentIndex) {
    $(".active").addClass("off");
    $(".active").transition({
      x: -100,
      opacity: 0,
      zIndex: 0
    }, 600);

    $("#" + currentId).removeClass("active");

    $("#" + id).addClass("active");
    $("#" + id).transition({
      x: 400
    }, 0, function () {
      $("#" + id).removeClass("off");
      $("#" + id).transition({
        x: 0,
        opacity: 1,
        zIndex: 2
      }, 600);
    });
  } else if (obj.index < currentIndex) {
    $(".active").addClass("off");
    $(".active").transition({
      x: 100,
      opacity: 0,
      zIndex: 0
    }, 600);
    $("#" + currentId).removeClass("active");


    $("#" + id).addClass("active");
    $("#" + id).transition({
      x: -400
    }, 0, function () {
      $("#" + id).removeClass("off");
      $("#" + id).transition({
        x: 0,
        opacity: 1,
        zIndex: 2
      }, 600);
    });
  }
  currentIndex = obj.index;
  currentId = id;
}


// _____________Select__________________
(function ($) {
    if ($(".zona").length) {
      $('.zona').select2({
        placeholder: 'Escolha',
        dropdownParent: '#select'
      });
    }
  })(jQuery);
//   _____________config Map____________

  