  const startBtn = document.getElementById("startJourneyBtn");
  const modal = document.getElementById("nicknameModal");
  const closeBtn = document.getElementById("closeModal");
  const saveBtn = document.getElementById("saveNickname");
  const nicknameInput = document.getElementById("nicknameInput");

  // Open modal
  startBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Save nickname
  saveBtn.addEventListener("click", () => {
    const nickname = nicknameInput.value.trim();
    if (nickname) {
      localStorage.setItem("userNickname", nickname);
      alert(`Welcome, ${nickname}! 🎉`);
      modal.classList.add("hidden");
    } else {
      alert("Please enter a nickname.");
    }
  });

  // Auto-load nickname if exists
  window.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("userNickname");
    if (savedName) {
      console.log("Welcome back, " + savedName);
      // Example: update button text
      startBtn.textContent = `Welcome, ${savedName}`;
    }
  });