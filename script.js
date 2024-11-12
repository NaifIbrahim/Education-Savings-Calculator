function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('show');
}

function updateChildAge() {
    const age = document.getElementById('childAge').value;
    document.getElementById('childAgeValue').innerText = age;
}

function updateEducationStartAge() {
    const startAge = document.getElementById('educationStartAge').value;
    document.getElementById('educationStartAgeValue').innerText = startAge;
}

function calculateAndHighlight() {
    document.querySelectorAll('.course-table tr').forEach(row => row.classList.remove('highlight-row'));
    const courseSelect = document.getElementById('courseSelect');
    const selectedOption = courseSelect.options[courseSelect.selectedIndex];
    const selectedRowId = selectedOption.getAttribute('data-row');
    document.getElementById(selectedRowId).classList.add('highlight-row');
}

function calculate() {
    const childAge = parseInt(document.getElementById('childAge').value);
    const educationStartAge = parseInt(document.getElementById('educationStartAge').value);
    const courseCost = parseFloat(document.getElementById('courseSelect').value); // SPKR144,300 for Lahore
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100; // Inflation rate as percentage
    const investmentRate = parseFloat(document.getElementById('investmentRate').value) / 100; // Investment rate as percentage

    const yearsToSave = educationStartAge - childAge;  // Years remaining to save
    const months = yearsToSave * 12;  // Total number of months

    // Step 1: Calculate the future value of the course considering inflation
    const futureValue = courseCost * Math.pow(1 + inflationRate, yearsToSave);

    // Step 2: Monthly investment rate (annual investment rate divided by 12)
    const monthlyRate = investmentRate / 12;

    // Step 3: Calculate the monthly contribution using the annuity formula
    const monthlyContribution = futureValue * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);

    // Round the result to two decimal places to avoid discrepancies
    const roundedMonthlyContribution = (Math.round(monthlyContribution * 100) / 100).toFixed(2);

    // Step 4: Show the result
    document.getElementById('result').innerHTML = `
      <p>The future value of your desired course for your child will be: S Rs: ${futureValue.toFixed(2)}</p>
      <p>To achieve your goal, you will need to save S Rs: ${roundedMonthlyContribution} per month from now on.</p>
    `;
}

function resetCalculation() {
    document.getElementById('childAge').value = 10;
    document.getElementById('educationStartAge').value = 18;
    document.getElementById('courseSelect').selectedIndex = 0;
    document.getElementById('inflationRate').value = 3;
    document.getElementById('investmentRate').value = 5;
    document.getElementById('result').innerHTML = '';
    updateChildAge();
    updateEducationStartAge();
    calculateAndHighlight();
}