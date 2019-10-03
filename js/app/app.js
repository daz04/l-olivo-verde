var menuDefaultHeight;

$(document).ready(function() {

  menuDefaultHeight = $("#main-menu").outerHeight();

  if (changeMenu($(window))) {
    toLight();
  }

  var menuExpanded = false;
  var firstClick = true;

  $(window).scroll(function() {

    var changeToLight = changeMenu();

    if (changeToLight || menuExpanded) {
      toLight();
    } else if (!menuExpanded) {
      toTransparent();
    }

    onScrollHandle();

  })

  $("#main-menu-toggler").on("click", function() {

    var scrollPosition = $(window).scrollTop()
    if (scrollPosition == 0 && menuExpanded) {
      // Menu closed and page at the top
      toTransparent();
      menuExpanded = false;
    } else if (!menuExpanded) {
      // Menu open
      toLight();
      menuExpanded = true;
    } else {
      menuExpanded = false;
    }

    if (firstClick) {
      firstClick = false;
      menuExpanded = true;
    }

  });

});

$(window).on("load", function() {
  GetMap();
});


$(document).on('click', '.nav-link', function(e) {
  // target element id
  var id = $(this).attr('href');

  // target element
  var $id = $(id);
  if ($id.length === 0) {
    return;
  }

  // prevent standard hash navigation (avoid blinking in IE)
  e.preventDefault();

  // top position relative to the document
  var pos = $id.offset().top - menuDefaultHeight + 1;

  // Close menu
  $('.navbar-collapse').collapse('hide');

  // animated top scrolling
  $('body, html').animate({
    scrollTop: pos
  });
});


/*___________________________________________________________________________*/

function GetMap() {
  var map = new Microsoft.Maps.Map("#information-map", {
    credentials: "AnRRp1PFsbOsdlz7oDzVEotTT0RuxCtwn2GfnE0Kd8cK85leOVGMo1P8F9aX1w8S",
    disableBirdseye: true,
    showLocateMeButton: false
  });

  map.setView({
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    center: new Microsoft.Maps.Location(34.304125, 35.854388),
    zoom: 15
  });

  var center = map.getCenter();

  //Create custom Pushpin
  var pin = new Microsoft.Maps.Pushpin(center, {
    title: "L'olivo Verde"
  });

  //Add the pushpin to the map
  map.entities.push(pin);

}

function toLight() {
  $("#main-menu").addClass("bg-light");

  // Add border styling
  $("#main-menu").css({
    transition: 'background-color 0.5s ease',
    'border-bottom': 'solid 2px #606129'
  });

  $("#main-menu-background").css({
    transition: 'opacity 0.5s ease',
    opacity: 0
  });
}

function toTransparent() {

  $("#main-menu-background").css({
    transition: 'opacity 0.5s ease',
    opacity: 1
  });

  // Remove bg-light and border styling
  $("#main-menu").css({
    transition: 'background-color 0.5s ease',
    'background-color': 'none',
    'border-bottom': 'none'
  });

  // Remove risidual class and re-apply it
  $("#main-menu").removeClass("bg-light");
}

function changeMenu() {
  if ($(window).scrollTop() > $("#parallax-one").outerHeight() - $("#main-menu").outerHeight()) {
    return true;
  } else {
    return false;
  }
}

function onScrollHandle() {
  //Get current scroll position
  var currentScrollPos = $(document).scrollTop();
  //Iterate through all node
  $('#navbarContent > ul > li > a').each(function() {
    var curLink = $(this);
    var refElem = $(curLink.attr('href'));
    //Compare the value of current position and the every section position in each scroll
    if (refElem.offset().top - menuDefaultHeight <= currentScrollPos && refElem.position().top + refElem.outerHeight() > currentScrollPos) {
      //Remove class active in all nav
      $('#navbarContent > ul > li').removeClass("active");
      //Add class active
      curLink.parent().addClass("active");
    } else {
      curLink.parent().removeClass("active");
    }

    // For when the page doesnt scroll past the menu bar, activate the last link when scroll reaches bottom
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    
       console.log("Reached bottom");
      
      //Remove class active in all nav
      $('#navbarContent > ul > li').removeClass("active");
      // Index of Contact tab
      $("#navbarContent > ul > li:nth-child(4)").addClass("active");
    }

  });
}