// ------------------------------
// Phishing Awareness Simulation
// ------------------------------

const scenarios = [
    {
        title: "Delivery Service: Package Held",
        message: "Your package is being held due to unpaid customs fees. Click the link below to pay and release your delivery.",
        actions: {
            click: "Incorrect. The link leads to a fake payment page designed to steal your card details.",
            ignore: "Incorrect. If this were real, ignoring it could delay a genuine delivery.",
            report: "Correct! Delivery companies don’t usually demand payment via random links in unsolicited messages."
        },
        correctAction: "report"
    },
    {
        title: "Email: Password Expiry Notice",
        message: "Your email password will expire in 24 hours. Click here to keep your account active.",
        actions: {
            click: "Incorrect. This is a classic phishing attempt to steal your login credentials.",
            ignore: "Incorrect. If this were real, you might lose access to your account.",
            report: "Correct! Legitimate services rarely use urgent language and random links like this."
        },
        correctAction: "report"
    },
    {
        title: "Social Media: Suspicious Login Attempt",
        message: "We detected a login attempt from a new device. If this wasn’t you, click here to secure your account.",
        actions: {
            click: "Incorrect. The link leads to a fake login page that captures your username and password.",
            ignore: "Incorrect. If this were real, ignoring it could leave your account at risk.",
            report: "Correct! Always go directly to the official app or website instead of clicking links in messages."
        },
        correctAction: "report"
    },
    {
        title: "Bank Alert: Unusual Activity",
        message: "We detected unusual activity on your account. Please verify your identity immediately to avoid suspension.",
        actions: {
            click: "Incorrect. The link leads to a fake banking site designed to steal your login details.",
            ignore: "Incorrect. Ignoring could leave your account at risk if it were real.",
            report: "Correct! Banks don’t pressure you to click links in unsolicited messages. Always verify via official channels."
        },
        correctAction: "report"
    },
    {
        title: "HR: Updated Employee Handbook",
        message: "All staff must review the updated employee handbook by end of day. Failure to comply may result in disciplinary action.",
        actions: {
            click: "Incorrect. The link downloads a malicious file disguised as a PDF.",
            ignore: "Incorrect. Internal messages shouldn’t be ignored without verification.",
            report: "Correct! The threatening tone and suspicious sender address are strong red flags."
        },
        correctAction: "report"
    }
];

let currentScenarioIndex = 0;
let score = 0;
let totalAnswered = 0;

// DOM elements
const scenarioTitleEl = document.getElementById("scenario-title");
const scenarioContentEl = document.getElementById("scenario-content");
const feedbackTextEl = document.getElementById("feedback-text");
const summaryEl = document.getElementById("summary");
const summaryTextEl = document.getElementById("summary-text");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const actionButtons = document.querySelectorAll(".action-btn");

// ------------------------------
// Load a scenario
// ------------------------------
function loadScenario() {
    const scenario = scenarios[currentScenarioIndex];
    scenarioTitleEl.textContent = scenario.title;
    scenarioContentEl.textContent = scenario.message;
    feedbackTextEl.textContent = "Choose how you would respond.";
    summaryEl.classList.add("hidden");
    nextBtn.classList.add("hidden");

    // Reset button states
    actionButtons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove("correct", "incorrect");
    });
}

// ------------------------------
// Handle user action
// ------------------------------
function handleAction(action) {
    const scenario = scenarios[currentScenarioIndex];
    const isCorrect = action === scenario.correctAction;

    totalAnswered++;

    if (isCorrect) {
        score++;
        feedbackTextEl.textContent = scenario.actions[action];
    } else {
        feedbackTextEl.textContent = scenario.actions[action] +
            " The safer choice would have been to " + scenario.correctAction + ".";
    }

    // Highlight correct button
    actionButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.action === scenario.correctAction) {
            btn.classList.add("correct");
        } else if (btn.dataset.action === action && !isCorrect) {
            btn.classList.add("incorrect");
        }
    });

    // Show Next button if more scenarios remain
    if (currentScenarioIndex < scenarios.length - 1) {
        nextBtn.classList.remove("hidden");
    } else {
        showSummary();
    }
}

// ------------------------------
// Show summary
// ------------------------------
function showSummary() {
    const percentage = Math.round((score / totalAnswered) * 100);
    summaryTextEl.textContent = `You scored ${score} out of ${totalAnswered} (${percentage}%). 
This tool is designed to help you recognise phishing patterns and think before you click.`;
    summaryEl.classList.remove("hidden");
    restartBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
}

// ------------------------------
// Go to next scenario
// ------------------------------
function nextScenario() {
    if (currentScenarioIndex < scenarios.length - 1) {
        currentScenarioIndex++;
        loadScenario();
    }
}

// ------------------------------
// Restart simulation
// ------------------------------
function restartSimulation() {
    currentScenarioIndex = 0;
    score = 0;
    totalAnswered = 0;
    restartBtn.classList.add("hidden");
    loadScenario();
}

// ------------------------------
// Event listeners
// ------------------------------
actionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        handleAction(action);
    });
});

nextBtn.addEventListener("click", nextScenario);
restartBtn.addEventListener("click", restartSimulation);

// ------------------------------
// Initialise
// ------------------------------
loadScenario();
