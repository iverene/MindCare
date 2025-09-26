const moodButtons = document.querySelectorAll(".mood-btn");
const saveButton = document.getElementById("saveEntry");
const journalEntry = document.getElementById("journalEntry");
const letterCheckbox = document.getElementById("letterCheckbox");
const entriesList = document.getElementById("entriesList");
const calendar = document.getElementById("calendar");

const moodImages = {
        Happy: "/assets/happy-icon.png",
        Calm: "/assets/calm-icon.png",
        Motivated: "/assets/motivated-icon.png",
        Sad: "/assets/sad-icon.png",
        Stressed: "/assets/stressed-icon.png",
        Tired: "/assets/tired-icon.png"
      };

let selectedMood = null;
let flatpickrInstance = null;



      // Mood selection effect
moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
  selectedMood = btn.dataset.mood;

      // Highlight active mood
    moodButtons.forEach(b => b.classList.remove("ring-4", "rounded-lg", "ring-calmBlue"));
    btn.classList.add("ring-4", "rounded-lg", "ring-calmBlue");
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
          text: text,
          timestamp: new Date().getTime()
        };

        let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
        entries.push(newEntry);
        localStorage.setItem("journalEntries", JSON.stringify(entries));

        // Generate MindCare letter if opted in
        if (letterCheckbox.checked) {
          generateMindCareLetter(text, selectedMood);
        }

        // Show success message
        showSuccessMessage("Entry saved successfully! ✅");

        // Reset fields
        journalEntry.value = "";
        moodButtons.forEach(b => b.classList.remove("ring-4", "ring-calmBlue"));
        selectedMood = null;
        letterCheckbox.checked = false;

        renderEntries();
        initCalendar(); // Refresh calendar to highlight new entry date
      }

      function showSuccessMessage(message) {
        const alertBox = document.createElement("div");
        alertBox.textContent = message;
        alertBox.className =
          "fixed top-5 right-5 bg-calmBlue text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500 z-50";
        
        document.body.appendChild(alertBox);

        // Fade out after 2.5s
        setTimeout(() => {
          alertBox.classList.add("opacity-0");
          setTimeout(() => alertBox.remove(), 500);
        }, 2500);
      }

      // Render journal entries
      function renderEntries(filterDate = null) {
        const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
        
        // Clear current entries
        entriesList.innerHTML = '';
        
        if (entries.length === 0) {
          entriesList.innerHTML = '<p class="text-gray-500">No entries yet. Start journaling!</p>';
          return;
        }
        
        // Sort entries by date (newest first)
        const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Filter by date if specified
        const filteredEntries = filterDate 
          ? sortedEntries.filter(entry => entry.date === filterDate)
          : sortedEntries;
        
        if (filteredEntries.length === 0) {
          entriesList.innerHTML = `<p class="text-gray-500">No entries for ${filterDate || 'this date'}.</p>`;
          return;
        }
        
        // Create entry elements
        filteredEntries.forEach(entry => {
          const entryElement = document.createElement("div");
          entryElement.className = "entry-item";
          entryElement.style.borderLeftColor = getMoodColor(entry.mood);
          
          entryElement.innerHTML = `
          <div class="bg-white w-200 mb-4 p-4 rounded-lg shadow-md justify-center items-center border-l-6" style="border-left: 6px solid ${getMoodColor(entry.mood)};">
            <div class="flex-1">
              <div class="entry-date font-semibold mb-1">${formatDate(entry.date)}</div>
              <div class="entry-mood text-sm text-gray-600 mb-2">${entry.mood}</div>
              <div class="entry-text bg-gray-50 p-3 rounded">${entry.text}</div>
            </div>
          </div>
          `;
          
          entriesList.appendChild(entryElement);
        });
      }

      // Helper function to get color based on mood
      function getMoodColor(mood) {
        const colors = {
          Happy: '#FFD700', // Gold
          Calm: '#87CEEB', // Sky Blue
          Motivated: '#32CD32', // Lime Green
          Sad: '#6495ED', // Cornflower Blue
          Stressed: '#FF6347', // Tomato Red
          Tired: '#A9A9A9'  // Dark Gray
        };
        return colors[mood] || '#6B7280'; // Default gray
      }

      // Helper function to format date
      function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }

      // 5. Calendar setup with Flatpickr
function initCalendar() {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  const entryDates = entries.map(e => e.date);
  
  if (flatpickrInstance) {
    flatpickrInstance.destroy();
  }
  
  // Initialize Flatpickr with inline configuration
  flatpickrInstance = flatpickr("#calendar", {
    inline: true,
    static: true, // This keeps the calendar always visible
    dateFormat: "Y-m-d",
    onChange: function(selectedDates, dateStr) {
      filterEntries(dateStr);
    },
    onDayCreate: function(dObj, dStr, fp, dayElem) {
      if (entryDates.includes(dayElem.dateObj.toISOString().split("T")[0])) {
        dayElem.style.backgroundColor = '#3B82F6';
        dayElem.style.color = '#FFFFFF';
        dayElem.style.borderRadius = '50%';
      }
    }
  });
}

      // Filter entries by date
      function filterEntries(dateStr) {
        renderEntries(dateStr);
      }

      // Event listeners
      document.addEventListener("DOMContentLoaded", () => {
        initCalendar();
        renderEntries();

        
        saveButton.addEventListener("click", saveEntry);
        
        // Toggle notification panel
        notificationIcon.addEventListener("click", (e) => {
          e.stopPropagation();
          notificationPanel.style.display = notificationPanel.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close notification panel when clicking elsewhere
        document.addEventListener("click", () => {
          notificationPanel.style.display = 'none';
        });
        
        // Prevent notification panel from closing when clicking inside it
        notificationPanel.addEventListener("click", (e) => {
          e.stopPropagation();
        });
        
        // Modal functionality
        closeModal.addEventListener("click", () => {
          letterModal.style.display = "none";
        });
        
        window.addEventListener("click", (e) => {
          if (e.target === letterModal) {
            letterModal.style.display = "none";
          }
        });
      });