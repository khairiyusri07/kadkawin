// Add the 'no-scroll' class initially to prevent scrolling when the page loads
$(document).ready(function(){
    window.scrollTo(0, 0);
    $("html, body").addClass("no-scroll");
  
    $(document).ready(function(){
      setTimeout(function(){
          $(".card").stop().animate({
              top: "-90px"
          }, "slow");
      }, 1000);
        });
        $(".card").click(function () {
            $(".opening").fadeOut("slowest"); // Smooth fade-out effect
            $("html, body").css("overflow", "visible");
             $("body").css("pointer-events", "auto");
             var music = $("#background-music")[0]; // Get the audio element
          music.play(); // Play the audio
  
        });
    });
  
  // Smooth Anchor Scrolling
  $(document).on("click", 'a[href^="#"]', function(event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top
      },
      500
    );
  });
  
  // When the user scrolls down 20px from the top of the document, show the scroll up button
  window.onscroll = function() {
    scrollFunction();
  };