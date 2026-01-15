// ---------------------------------------------
// Phishing Awareness Simulation Tool
// ---------------------------------------------

// Scenario data (you can add more later)
const scenarios = [
    {
        title: "Delivery Notification",
        text: `
            <strong>Subject:</strong> Your parcel is waiting<br><br>
            <strong>From:</strong> delivery-updates@parcel-alerts.com<br><br>
            Your package could not be delivered. Please confirm your address by clicking the link below.
            <br><br>
            <a href="#">Track your parcel</a>
        `,
        correctAction: "report",
        feedback: "This is a phishing attempt. The sender domain is suspicious and delivery companies rarely ask for address confirmation via random links."
    },
    {
        title: "Password Reset Request",
        text: `
            <strong>Subject:</strong> Password Reset<br><br>
            <strong>From:</strong> security@yourbank.co.uk<br><br>
            We detected unusual activity. Reset your password immediately using the link below.
            <br><br>
            <a href="#">Reset Password</a>
        `,
        correctAction: "ignore",
        feedback: "This is phishing. Banks never send unsolicited password reset links. Always log in through the official website instead."
    },
    {
        title: "Internal Request from 'CEO'",
        text: `
            <strong>Subject:</strong> Urgent Request<br><br>
            <strong>From:</strong> ceo-company@outlook.com<br><br>
            I need you to purchase gift cards immediately and send me the codes. This is confidential.
        `,
        correctAction: "report",
        feedback: "Classic CEO fraud. Senior staff will never ask for gift cards or secrecy via personal email accounts."
    }
];

// ---------------------------------------------
// State
// ---------------------------------------------
let currentScenario = 0;
let score = 0;

// ---------------------------------------------
// DOM Elements
// ---------------------------------------------
const scenarioTitle = document.getElementById("scenario-title");
const scenarioContent = document.getElementById("scenario-content");
const feedbackSection = document.getElementById("feedback");
const feedbackText = document.getElementById("feedback-text");
const summarySection = document.getElementById("summary");
const summaryText = document.getElementById("summary-text");

// ---------------------------------------------
// Load Scenario
// ---------------------------------------------
function loadScenario() {
    const scenario = scenarios[currentScenario];
    scenarioTitle.textContent = scenario.title;
    scenarioContent.innerHTML = scenario.text;
}

// ---------------------------------------------
// Handle User Choice
// ---------------------------------------------
function handleChoice(choice) {
    const scenario = scenarios[currentScenario];

    // Check if correct
    if (choice === scenario.correctAction) {
        score++;
        feedbackText.textContent = "Correct! " + scenario.feedback;
    } else {
        feedbackText.textContent = "Not quite. " + scenario.feedback;
    }

    // Show feedback
    feedbackSection.classList.remove("hidden");

    // Hide scenario actions
    document.getElementById("actions").classList.add("hidden");
}

// ---------------------------------------------
// Next Scenario
// ---------------------------------------------
document.getElementById("next-btn").addEventListener("click", () => {
    currentScenario++;

    if (currentScenario < scenarios.length) {
        // Load next scenario
        feedbackSection.classList.add("hidden");
        document.getElementById("actions").classList.remove("hidden");
        loadScenario();
    } else {
        // Show summary
        showSummary();
    }
});

// ---------------------------------------------
// Summary
// ---------------------------------------------
function showSummary() {
    feedbackSection.classList.add("hidden");
    summarySection.classList.remove("hidden");

    summaryText.innerHTML = `
        You completed ${scenarios.length} scenarios.<br><br>
        <strong>Your score:</strong> ${score} / ${scenarios.length}<br><br>
        ${score === scenarios.length 
            ? "Excellent awareness — you spotted every phishing attempt."
            : "Good effort. Review the feedback to strengthen your phishing detection skills."
        }
    `;
}

// ---------------------------------------------
// Restart
// ---------------------------------------------
document.getElementById("restart-btn").addEventListener("click", () => {
    currentScenario = 0;
    score = 0;
    summarySection.classList.add("hidden");
    document.getElementById("actions").classList.remove("hidden");
    loadScenario();
});

// ---------------------------------------------
// Attach button listeners
// ---------------------------------------------
document.querySelectorAll(".action-btn").forEach(button => {
    button.addEventListener("click", () => {
        handleChoice(button.dataset.choice);
    });
});

// ---------------------------------------------
// Initialise
// ---------------------------------------------
loadScenario();
