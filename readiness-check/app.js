// Question data - matches the HTML form
const QUESTIONS = [
    "How clear are you on why you want to start a membership?",
    "How clear are you on the transformation you want members to experience?",
    "How clearly can you define the type of person your membership is meant to serve and the type it is not?",
    "How much do you enjoy the topic you want to build your membership around?",
    "How often do people come to you asking for ongoing support or repeated guidance on that topic?",
    "How clearly can you describe the problem your membership will solve on an ongoing basis?",
    "How much time and capacity do you have to run a membership without burning out?",
    "How much do you enjoy interacting with people online?",
    "How ready are you to show up consistently and deliver value to your members for years?",
    "How ready are you to create a weekly or monthly rhythm that you could maintain long term?",
    "How well can you define the reason someone should join your membership  rather than other similar memberships?",
    "How well do you understand the key metrics (eg retention, church, lifetime value) behind a successful membership?",
    "How clear are you on how the membership fits into your larger business model?",
    "How confident do you feel offering leadership and guidance to a group?",
    "How comfortable are you with growing slowly instead of expecting overnight success?"
];

// Results data - EDIT THIS SECTION to customize score bands and recommendations
const RESULTS_DATA = {
    notReady: {
        range: [0, 30],
        label: "Not Ready Yet",
        className: "not-ready",
        explanation: "You're in the exploration phase, which is a great place to start! Before launching a membership, you need stronger foundations in clarity, positioning, and capacity. Taking time now to build these fundamentals will save you from frustration later.",
        nextSteps: [
            "Get crystal clear on your 'why' – why a membership specifically, and what transformation you want to create",
            "Define your ideal member in detail: who they are, what they struggle with, and why your topic matters to them",
            "Validate demand by having real conversations with potential members about their ongoing needs",
            "Build your capacity: assess how much time and energy you realistically have to dedicate",
            "Start creating consistent content or support in your topic area to test your own sustainability",
            "Study successful memberships in your niche to understand what makes them work"
        ],
        ctaHeading: "Want help building your foundation?",
        ctaText: "I can help you clarify your positioning and create a roadmap to get membership-ready. Share your results to request a free consulting call."
    },
    promising: {
        range: [31, 55],
        label: "Promising – Needs Planning & Testing",
        className: "promising",
        explanation: "You have solid potential and many of the right pieces in place! The gap between where you are and a successful launch is strategic planning, testing your assumptions, and strengthening a few key areas. You're closer than you think.",
        nextSteps: [
            "Clarify the 2-3 areas where you scored lowest and create an action plan to address them",
            "Test your membership concept with a small pilot group or beta launch before going all-in",
            "Map out a realistic weekly or monthly rhythm you can sustain long-term, then test it for 30 days",
            "Strengthen your unique value proposition: what makes YOUR membership different and better?",
            "Learn the fundamentals of membership metrics (retention, churn, lifetime value) so you can measure success",
            "Build a simple launch plan with clear milestones and accountability"
        ],
        ctaHeading: "Ready to turn potential into a plan?",
        ctaText: "Let's discuss how to strengthen your weak spots and create a clear launch strategy. Share your results to schedule a free consulting call."
    },
    strong: {
        range: [56, 75],
        label: "Strong Readiness – Prepare to Launch or Optimize",
        className: "strong",
        explanation: "You're in great shape to launch or scale a membership! You have clarity, capacity, and commitment. Your next step is execution: building your offer, setting up systems, and getting your first members (or optimizing what you already have).",
        nextSteps: [
            "Create your core membership offer: define the transformation, deliverables, pricing, and onboarding process",
            "Set up the essential systems: membership platform, payment processing, and content delivery",
            "Build a simple launch or growth plan with specific goals and timelines",
            "Develop your retention strategy from day one – how will you keep members engaged and seeing value?",
            "Plan your first 90 days of content and community engagement to build momentum",
            "Consider working with a mentor or consultant to accelerate your launch and avoid common pitfalls"
        ],
        ctaHeading: "Let's turn readiness into results!",
        ctaText: "You're positioned for success. I can help you fine-tune your strategy and launch with confidence. Share your results to request a free consulting call."
    }
};

// DOM Elements
const quizSection = document.getElementById('quiz-section');
const resultsSection = document.getElementById('results-section');
const readinessForm = document.getElementById('readiness-form');
const resetBtn = document.getElementById('reset-btn');
const retakeBtn = document.getElementById('retake-btn');
const shareBtn = document.getElementById('share-btn');
const shareFormContainer = document.getElementById('share-form-container');
const shareForm = document.getElementById('share-form');
const successMessage = document.getElementById('success-message');

// Store user answers
let userAnswers = {};
let totalScore = 0;
let readinessBand = '';

// Form submission handler
readinessForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all questions are answered
    const formData = new FormData(readinessForm);
    const answeredQuestions = new Set();

    for (let [key, value] of formData.entries()) {
        answeredQuestions.add(key);
    }

    // Check if all 15 questions are answered
    if (answeredQuestions.size < 15) {
        alert('Please answer all questions before seeing your results.');
        return;
    }

    // Calculate score and store answers
    totalScore = 0;
    userAnswers = {};

    for (let i = 1; i <= 15; i++) {
        const answer = parseInt(formData.get(`q${i}`));
        totalScore += answer;
        userAnswers[`q${i}`] = {
            question: QUESTIONS[i - 1],
            answer: answer
        };
    }

    // Display results
    displayResults();
});

// Display results function
function displayResults() {
    // Determine readiness band
    const bandData = getReadinessBand(totalScore);
    readinessBand = bandData.label;

    // Update score display
    document.getElementById('score-number').textContent = totalScore;

    // Update readiness band
    const bandElement = document.getElementById('readiness-band');
    bandElement.textContent = bandData.label;
    bandElement.className = `readiness-band ${bandData.className}`;

    // Update explanation
    document.getElementById('results-explanation').textContent = bandData.explanation;

    // Update next steps
    const nextStepsList = document.getElementById('next-steps-list');
    nextStepsList.innerHTML = '';
    bandData.nextSteps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        nextStepsList.appendChild(li);
    });

    // Update share CTA
    document.getElementById('share-cta-heading').textContent = bandData.ctaHeading;
    document.getElementById('share-cta-text').textContent = bandData.ctaText;

    // Hide quiz, show results
    quizSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    // Reset share form state
    shareFormContainer.classList.add('hidden');
    shareForm.classList.remove('hidden');
    successMessage.classList.add('hidden');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Get readiness band based on score
function getReadinessBand(score) {
    if (score >= RESULTS_DATA.strong.range[0] && score <= RESULTS_DATA.strong.range[1]) {
        return RESULTS_DATA.strong;
    } else if (score >= RESULTS_DATA.promising.range[0] && score <= RESULTS_DATA.promising.range[1]) {
        return RESULTS_DATA.promising;
    } else {
        return RESULTS_DATA.notReady;
    }
}

// Reset button handler
resetBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to reset all your answers?')) {
        readinessForm.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Retake button handler
retakeBtn.addEventListener('click', function() {
    readinessForm.reset();
    resultsSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Share button handler
shareBtn.addEventListener('click', function() {
    shareFormContainer.classList.remove('hidden');

    // Populate hidden fields
    document.getElementById('hidden-score').value = totalScore;
    document.getElementById('hidden-band').value = readinessBand;

    // Format answers as JSON string
    const answersData = Object.keys(userAnswers).map(key => {
        return {
            question: userAnswers[key].question,
            answer: userAnswers[key].answer
        };
    });
    document.getElementById('hidden-answers').value = JSON.stringify(answersData);

    // Scroll to form
    shareFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Share form submission handler
shareForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Submit form via AJAX to Formspree
    const formData = new FormData(shareForm);

    fetch(shareForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            shareForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            return response.json().then(data => {
                if (data.errors) {
                    alert('There was an error submitting your results: ' + data.errors.map(error => error.message).join(', '));
                } else {
                    alert('There was an error submitting your results. Please try again.');
                }
            });
        }
    })
    .catch(error => {
        alert('There was an error submitting your results. Please try again.');
        console.error('Error:', error);
    });
});
