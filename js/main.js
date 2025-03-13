document.getElementById("themeToggle").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");

  let icon = document.getElementById("themeIcon");
  if (document.body.classList.contains("dark-mode")) {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
  } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
  }
});
