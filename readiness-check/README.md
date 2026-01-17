# Membership Readiness Check

An interactive lead magnet that helps users assess their readiness to launch a membership business. Users answer 15 questions, receive an instant score with tailored recommendations, and can optionally share their results to request a free consulting call.

## Quick Setup

1. Upload all files to your web server or hosting platform
2. Open `index.html` in a web browser
3. That's it! The quiz is ready to use.

## Customization Guide

### 1. How to Edit Questions

To add, remove, or modify questions, you need to edit **TWO** files:

#### A. Edit `index.html` (lines 24-234)

Find the question blocks that look like this:

```html
<div class="question-block">
    <p class="question-text">How clear are you on why you want to start a membership?</p>
    <div class="rating-scale">
        <label><input type="radio" name="q1" value="1" required> 1</label>
        <label><input type="radio" name="q1" value="2"> 2</label>
        <label><input type="radio" name="q1" value="3"> 3</label>
        <label><input type="radio" name="q1" value="4"> 4</label>
        <label><input type="radio" name="q1" value="5"> 5</label>
    </div>
</div>
```

- To **edit a question**: Change the text inside `<p class="question-text">...</p>`
- To **add a question**: Copy the entire `<div class="question-block">...</div>` and paste it below the last question. Update the name attribute (e.g., `name="q16"`)
- To **remove a question**: Delete the entire `<div class="question-block">...</div>`

**IMPORTANT:** If you add or remove questions, you must also update the question count in `app.js` (see below).

#### B. Edit `app.js` (lines 2-18)

Find the `QUESTIONS` array:

```javascript
const QUESTIONS = [
    "How clear are you on why you want to start a membership?",
    "How clear are you on the transformation you want members to experience?",
    // ... more questions
];
```

- Make sure this array matches **exactly** what's in your HTML
- The order must be the same (q1, q2, q3, etc.)
- If you add a question to HTML, add it here too
- If you remove a question from HTML, remove it here too

**Also update the validation logic:**

In `app.js` around line 64, find:

```javascript
if (answeredQuestions.size < 15) {
```

Change `15` to match your total number of questions.

Around line 72, find:

```javascript
for (let i = 1; i <= 15; i++) {
```

Change `15` to match your total number of questions.

### 2. How to Update Score Bands and Recommendations

Edit `app.js` (lines 21-79) to find the `RESULTS_DATA` object:

```javascript
const RESULTS_DATA = {
    notReady: {
        range: [0, 30],  // Score range for this band
        label: "Not Ready Yet",  // Band label shown to user
        className: "not-ready",  // CSS class (don't change this)
        explanation: "You're in the exploration phase...",  // Main explanation paragraph
        nextSteps: [  // Bullet points (4-6 recommended)
            "Get crystal clear on your 'why'...",
            "Define your ideal member in detail...",
            // ... more steps
        ],
        ctaHeading: "Want help building your foundation?",  // CTA heading
        ctaText: "I can help you clarify..."  // CTA text
    },
    // ... similar structure for "promising" and "strong" bands
};
```

**What you can edit:**

- `range`: The min and max score for each band (e.g., `[0, 30]` means scores 0-30)
- `label`: The band name displayed to users
- `explanation`: The paragraph explaining what this score means
- `nextSteps`: Array of action items (add/remove/edit bullets as needed)
- `ctaHeading`: The heading for the "share results" call-to-action
- `ctaText`: The text encouraging users to share their results

**Maximum score calculation:**

- With 15 questions × 5 points max = 75 total points
- If you change the number of questions, update the score ranges accordingly
- Update the "out of 75" text in `index.html` (line 243)

### 3. How to Replace the Form Action URL

When you're ready to connect the results-sharing form to your email service or CRM:

Edit `index.html` (line 278):

```html
<form id="share-form" action="https://example.com/submit" method="POST">
```

Replace `https://example.com/submit` with your actual form submission endpoint.

**Popular form services:**

- **ConvertKit**: Use your form's webhook URL
- **ActiveCampaign**: Use their form action URL
- **Zapier**: Create a webhook trigger and use that URL
- **Google Sheets**: Use Google Apps Script web app URL
- **Custom server**: Point to your own API endpoint

**What data gets submitted:**

The form sends the following fields:

- `name` - User's name (text input)
- `email` - User's email (text input)
- `totalScore` - The calculated score (hidden field)
- `readinessBand` - The band label like "Strong Readiness" (hidden field)
- `answers` - JSON string with all question texts and answers (hidden field)

**Testing the form:**

To test form submission, you can:

1. Use a service like [webhook.site](https://webhook.site) to see what data is being sent
2. Check your browser's Network tab (DevTools) to see the POST request

**Enable actual form submission:**

In `app.js` (lines 171-191), uncomment the AJAX submission code and comment out the simulated version.

### 4. Styling Customization

All visual styling is in `styles.css`. Common customizations:

- **Brand colors**: Search for `#667eea` and `#764ba2` (the purple gradient) and replace with your brand colors
- **Fonts**: Edit the `font-family` in the `body` style (line 9)
- **Button styles**: Edit `.btn-primary` and `.btn-secondary` (lines 113-137)
- **Score band colors**: Edit `.readiness-band.not-ready`, `.promising`, and `.strong` (lines 195-212)

## File Structure

```
readiness-check/
├── index.html    - Main HTML structure with 15 questions
├── styles.css    - All visual styling (mobile-friendly)
├── app.js        - Scoring logic, validation, and results display
└── README.md     - This file
```

## Features

- No email gate for results (instant access)
- 1-5 rating scale for each question
- Three score bands: Not Ready (0-30), Promising (31-55), Strong (56-75)
- Validation: must answer all questions before seeing results
- Reset button to clear answers
- Retake button to start over after seeing results
- Optional results sharing with name + email + automatic score/answers inclusion
- Mobile-friendly responsive design
- Smooth transitions and animations
- On-page success message (no redirect)

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Need Help?

If you need assistance with customization, feel free to reach out!
