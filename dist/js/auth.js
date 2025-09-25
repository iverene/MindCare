const authPopup = document.getElementById('authPopup');
const authContent = document.getElementById('authContent');
const authTitle = document.getElementById('authTitle');
        
const openPopup = (title, content) => {
  authTitle.textContent = title;
  authContent.innerHTML = content;
  authPopup.classList.add('open');
};
        
const closePopup = () => {
  authPopup.classList.remove('open');
};
        
        // Button events
document.getElementById('openSignin').addEventListener('click', () => {
  openPopup('Sign In', `
  <form class="flex flex-col gap-4">
                    <input type="email" placeholder="Email" class="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-deepBlue">
                    <input type="password" placeholder="Password" class="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-deepBlue">
                    <div class="text-right text-sm">
                        <a href="#" class="text-calmBlue hover:text-deepBlue">Forgot password?</a>
                    </div>
                    <button class="bg-deepBlue text-white py-3 rounded-lg hover:bg-calmBlue transition font-medium">Sign In</button>
                </form>
            `);
        });
        
        document.getElementById('openSignup').addEventListener('click', () => {
            openPopup('Sign Up', `
                <form class="flex flex-col gap-4">
                    <input type="text" placeholder="Full Name" class="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-deepBlue">
                    <input type="email" placeholder="Email" class="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-deepBlue">
                    <input type="password" placeholder="Password" class="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-deepBlue">
                    <div class="flex items-center text-sm">
                        <input type="checkbox" id="terms" class="mr-2">
                        <label for="terms" class="text-gray-600">I agree to the Terms & Conditions</label>
                    </div>
                    <button class="bg-calmBlue text-white py-3 rounded-lg hover:bg-deepBlue transition font-medium">Sign Up</button>
                </form>
            `);
        });
        
        document.getElementById('closePopup').addEventListener('click', closePopup);
        
        // Close popup when clicking outside
        document.addEventListener('click', (event) => {
            if (!authPopup.contains(event.target) && 
                event.target.id !== 'openSignin' && 
                event.target.id !== 'openSignup') {
                closePopup();
            }
        });