// Get that hamburger menu cookin' //

document.addEventListener("DOMContentLoaded", function() {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener("click", function() {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});



function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("toTop").style.display = "block";
  } else {
    document.getElementById("toTop").style.display = "none";
  }
}

// Preloader
$(document).ready(function($) {
  $(".preloader-wrapper").fadeOut();
  $("body").removeClass("preloader-site");
});
$(window).load(function() {
  var Body = $("body");
  Body.addClass("preloader-site");
});

async function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission

  const name = document.getElementById('name').value;
  const wish = document.getElementById('wish').value;
   // Create a timestamp
   const timestamp = new Date().toISOString()

  // Sending data to SheetDB
  try {
      const response = await fetch('https://sheetdb.io/api/v1/qm2xsbjygn8so', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: [{ name: name, wish: wish, timestamp: timestamp  }] }), // Wrap the data in an object
      });

      const result = await response.json();
      console.log(result); // Log the result to see if it worked

      // You can also provide feedback to the user
      alert('Wish submitted successfully!');
      closePopup();
  } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your wish.');
      closePopup();
  }
}

function fetchWishes() {
  fetch('https://sheetdb.io/api/v1/qm2xsbjygn8so')
    .then(response => response.json())
    .then(data => {
      const wishContainer = document.getElementById('sheetdb-data');
      wishContainer.innerHTML = ''; // Clear previous data

      // Sort by most recent timestamp first (descending)
      data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      // Limit the display to 6 most recent wishes
      const recentWishes = data.slice(0, 300);
      

      // Loop through the limited data and display each wish
      recentWishes.forEach(item => {
        const wishItem = `
          <div style="border-bottom: 1px solid #ddd; padding: 10px;">
            <p>${item.wish}</p>
            <h3><strong>${item.name}</strong></h3>
            
            
          </div>
        `;
        wishContainer.innerHTML += wishItem;
      });
      
      // If there are more than 6 wishes, show the rest in a scrollable container
      if (data.length > 6) {
        wishContainer.style.overflowY = 'auto';
      }
    })
    .catch(error => {
      console.error('Error fetching wishes:', error);
    });
}
window.onload = fetchWishes;

function openPopup(){
  let popup = document.getElementById("popup"); // Get the element inside the function
  popup.classList.add("open-popup");
}

function closePopup(){
  let popup = document.getElementById("popup"); // Get the element inside the function
  popup.classList.remove("open-popup");
}



// Call the function once the page loads to display the wishes immediately
document.addEventListener('DOMContentLoaded', fetchWishes);