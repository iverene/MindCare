const moodButtons = document.querySelectorAll(".mood-btn");

moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // remove active state from all
    moodButtons.forEach(b => b.classList.remove("bg-calmBlue", "text-white"));
    
    // add active state to clicked button
    btn.classList.add("bg-calmBlue", "text-white", "rounded-lg");
    
    console.log("Selected Mood:", btn.dataset.mood);
  });
});
