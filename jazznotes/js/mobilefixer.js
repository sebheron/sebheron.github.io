const nav_bar = document.querySelector(".top-bar");

if (/Mobi|Android/i.test(navigator.userAgent)) {
  nav_bar.style.position = "static";
  document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });
}
