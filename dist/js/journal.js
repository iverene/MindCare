// Select elements
const moodButtons = document.querySelectorAll(".mood-btn");
const saveButton = document.getElementById("saveEntry");
const notificationIcon = document.getElementById("notificationIcon");
const journalEntry = document.getElementById("journalEntry");
const letterCheckbox = document.querySelector("#receiveLetter input");

let selectedMood = null;

// 1. Mood selection effect
moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedMood = btn.dataset.mood;

    // Highlight active mood
    moodButtons.forEach(b => b.classList.remove("ring-4", "ring-calmBlue"));
    btn.classList.add("ring-4", "ring-calmBlue");
  });
});

// 2. Save entry logic
function saveEntry() {
  const text = journalEntry.value.trim();

  if (!selectedMood || !text) {
    alert("Please select a mood and write something!");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  const newEntry = {
    date: today,
    mood: selectedMood,
    text: text
  };

  let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries.push(newEntry);
  localStorage.setItem("journalEntries", JSON.stringify(entries));

  // Generate MindCare letter if opted in
  if (letterCheckbox.checked) {
    generateMindCareLetter(text, selectedMood);
  }

  // ✅ Show success message
  showSuccessMessage("Entry saved successfully! ✅");

  // Reset fields
  journalEntry.value = "";
  moodButtons.forEach(b => b.classList.remove("ring-4", "ring-calmBlue"));
  selectedMood = null;
  letterCheckbox.checked = false;

  renderEntries();
}

function showSuccessMessage(message) {
  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.className =
    "fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500";
  
  document.body.appendChild(alertBox);

  // Fade out after 2.5s
  setTimeout(() => {
    alertBox.classList.add("opacity-0");
    setTimeout(() => alertBox.remove(), 500);
  }, 2500);
}



// 3. Fake AI letter generator (replace with real AI later)
function generateMindCareLetter(entry, mood) {
  const message = `💌 Dear Friend,  
  We noticed you’re feeling *${mood}*. Remember: *${entry.substring(0, 50)}...*  
  You are stronger than you think, and brighter days are coming. 💖`;

  // Save letter in localStorage
  let letters = JSON.parse(localStorage.getItem("mindCareLetters")) || [];
  letters.push({ message, date: new Date().toLocaleString() });
  localStorage.setItem("mindCareLetters", JSON.stringify(letters));

  // Show notification
  notificationIcon.classList.remove("hidden");
}

// Example: show red dot when a new message arrives
function showNotification() {
  document.getElementById("notificationDot").classList.remove("hidden");
  document.getElementById("notificationIcon").classList.remove("hidden");
}

// Example: clear notification when user clicks icon
document.getElementById("notificationIcon").addEventListener("click", () => {
  document.getElementById("notificationDot").classList.add("hidden");
});

// 4. Calendar setup with Flatpickr
function initCalendar() {
  let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

  // Collect all dates that have entries
  let entryDates = entries.map(e => e.date);

  // Initialize Flatpickr
  flatpickr("#calendar", {
    inline: true,
    dateFormat: "Y-m-d",
    onChange: function(selectedDates, dateStr) {
      filterEntries(dateStr);
    },
    // Highlight entry dates
    onDayCreate: function(dObj, dStr, fp, dayElem) {
      if (entryDates.includes(dayElem.dateObj.toISOString().split("T")[0])) {
        dayElem.classList.add("bg-deepBlue", "text-offWhite", "rounded-full");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCalendar();
  renderEntries();
  saveButton.addEventListener("click", saveEntry); // make sure Save works
});
