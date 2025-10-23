document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Elements
    const dobInput = document.getElementById('dob');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error-message');

    // Set max date to today's date for input validation
    // Prevents selecting a future date
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    dobInput.setAttribute('max', todayString);

    // 2. Event Listener
    calculateBtn.addEventListener('click', calculateAge);

    /**
     * The main function to calculate and display the age.
     */
    function calculateAge() {
        // Clear previous results and errors
        resultDiv.innerHTML = '';
        errorDiv.textContent = '';

        const dobValue = dobInput.value;

        // 3. Input Validation
        if (!dobValue) {
            errorDiv.textContent = '❌ Please select your Date of Birth.';
            resultDiv.innerHTML = '<p class="placeholder-text">Enter your DOB and click \'Calculate Age\'.</p>';
            return;
        }

        const birthDate = new Date(dobValue);
        
        // Date validation: Check if the date is not in the future
        if (birthDate > today) {
            errorDiv.textContent = '🛑 Date of Birth cannot be in the future.';
            resultDiv.innerHTML = '<p class="placeholder-text">Enter your DOB and click \'Calculate Age\'.</p>';
            return;
        }

        // 4. Core Age Calculation Logic

        let ageYears = today.getFullYear() - birthDate.getFullYear();
        let ageMonths = today.getMonth() - birthDate.getMonth();
        let ageDays = today.getDate() - birthDate.getDate();

        // Adjust months and years if the birth date month/day hasn't arrived yet
        if (ageDays < 0) {
            // Get the number of days in the *previous* month
            // (today's month - 1 because we are adjusting for the current day)
            ageDays += getDaysInMonth(today.getFullYear(), today.getMonth() - 1);
            ageMonths--; // Subtract a month
        }

        if (ageMonths < 0) {
            ageMonths += 12; // Add 12 months
            ageYears--; // Subtract a year
        }

        // Handle edge case for a future date that passed the initial check but is invalid
        if (ageYears < 0) {
             errorDiv.textContent = '🛑 Date of Birth is invalid (somehow in the future).';
             resultDiv.innerHTML = '<p class="placeholder-text">Enter your DOB and click \'Calculate Age\'.</p>';
             return;
        }

        // 5. Display Result
        displayResult(ageYears, ageMonths, ageDays);
    }

    /**
     * Helper function to get the number of days in a specific month.
     * @param {number} year 
     * @param {number} monthIndex (0-11)
     * @returns {number} The number of days in the month.
     */
    function getDaysInMonth(year, monthIndex) {
        // Day 0 of the *next* month is the last day of the *current* month.
        return new Date(year, monthIndex + 1, 0).getDate();
    }

    /**
     * Function to format and display the calculated age.
     * @param {number} years 
     * @param {number} months 
     * @param {number} days 
     */
    function displayResult(years, months, days) {
        let yearsText = `${years} ${years === 1 ? 'Year' : 'Years'}`;
        let monthsText = `${months} ${months === 1 ? 'Month' : 'Months'}`;
        let daysText = `${days} ${days === 1 ? 'Day' : 'Days'}`;

        resultDiv.innerHTML = `
            <h2>Your Exact Age is:</h2>
            <p class="result-text">
                <span style="color: #007bff; font-weight: bold;">${yearsText}</span>, 
                <span style="color: #28a745; font-weight: bold;">${monthsText}</span>, and 
                <span style="color: #ffc107; font-weight: bold;">${daysText}</span>.
            </p>
        `;
    }
});
