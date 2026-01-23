# ROI Calculator Setup Guide

This guide will help you complete the setup of the ROI Calculator, including configuring email capture and testing the tool.

## 1. Configure Formspree Email Capture

The calculator uses Formspree to handle form submissions and send lead data to your email.

### Step 1: Create a Formspree Account

1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account (allows 50 submissions/month)
3. Verify your email address

### Step 2: Create a New Form

1. Click "New Form" in your Formspree dashboard
2. Name it: "ROI Calculator Leads"
3. Copy the form endpoint URL (looks like: `https://formspree.io/f/xyzabc123`)

### Step 3: Configure Form Settings

In your Formspree form settings:

**Email Notifications:**
- ✅ Enable email notifications
- Set notification email to: `georges@punchdev.net`
- Subject line: "New ROI Calculator Lead: {{email}}"

**Spam Protection:**
- ✅ Enable reCAPTCHA (recommended)
- ✅ Enable honeypot field

**Autoresponder (Optional but Recommended):**
- ✅ Enable autoresponder
- Subject: "Your ROI Report from punchDev"
- Body template:
```
Hi there,

Thank you for using our ROI Calculator! Your personalized report has been downloaded.

Over the next 10 days, you'll receive:
• Day 2: Real-world case study showing AI lead gen results
• Day 5: Answers to common objections about AI vs SDRs
• Day 7: Implementation guide - what the first 30 days look like
• Day 10: Final follow-up with next steps

In the meantime, if you have any questions about your results or want to discuss your specific situation, feel free to reply to this email or book a call: https://punchdev.net/book.html

Best,
Georges Duplessy
Founder, punchDev Marketing
```

### Step 4: Update calculator.js

1. Open `tools/roi-calculator/calculator.js`
2. Find line 7: `const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';`
3. Replace `YOUR_FORM_ID` with your actual form ID
4. Example: `const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzabc123';`
5. Save the file

### Step 5: Test the Form

1. Open the calculator in your browser: `https://punchdev.net/tools/roi-calculator/`
2. Fill out the calculator inputs
3. Click "Download Full Report"
4. Enter a test email and select a goal
5. Submit the form
6. Verify:
   - ✅ You receive the lead notification at georges@punchdev.net
   - ✅ The test email receives the autoresponder
   - ✅ The PDF downloads in the browser
   - ✅ Form data appears in your Formspree dashboard

---

## 2. Set Up Email Nurture Sequence

The 5-email nurture sequence is documented in `EMAIL_SEQUENCE.md`. You'll need an Email Service Provider (ESP) to send these emails automatically.

### Recommended ESPs:

**Option A: ConvertKit** (Recommended for simplicity)
- Best for: Small teams, easy automation
- Cost: Free up to 1,000 subscribers
- Setup time: ~30 minutes

**Option B: Beehiiv** (Good for newsletter + nurture)
- Best for: If you want to build a newsletter audience too
- Cost: Free up to 2,500 subscribers
- Setup time: ~45 minutes

**Option C: SendGrid + Zapier** (Most flexible)
- Best for: Developers, custom integrations
- Cost: Free up to 100 emails/day
- Setup time: ~60 minutes

### ConvertKit Setup (Easiest Option):

#### Step 1: Create ConvertKit Account
1. Sign up at [convertkit.com](https://convertkit.com)
2. Complete account setup

#### Step 2: Connect Formspree to ConvertKit

**Via Zapier (Recommended):**
1. Create a free Zapier account
2. Create a new Zap:
   - **Trigger:** Formspree "New Submission"
   - **Action:** ConvertKit "Add Subscriber to Form"
3. Connect your Formspree and ConvertKit accounts
4. Map fields:
   - Email → Email
   - Goal → Tag (create tags: `goal_scale`, `goal_reduce`, `goal_replace`, `goal_explore`)
   - Calculator data → Custom fields (savings, meeting_goal, etc.)
5. Test the Zap

**Manual Integration:**
1. Get Formspree webhook URL from form settings
2. Add ConvertKit API endpoint as webhook destination
3. Map form fields to ConvertKit subscriber data

#### Step 3: Create Email Sequence in ConvertKit

1. Go to "Sequences" in ConvertKit
2. Create new sequence: "ROI Calculator Nurture"
3. Add 5 emails based on `EMAIL_SEQUENCE.md`:
   - Email 1: Day 0 (immediate - handled by Formspree autoresponder)
   - Email 2: Day 2
   - Email 3: Day 5
   - Email 4: Day 7
   - Email 5: Day 10
4. Copy email content from `EMAIL_SEQUENCE.md`
5. Add personalization merge tags:
   - `{{first_name}}`
   - `{{savings}}`
   - `{{meeting_goal}}`
   - `{{sdr_cost}}`
   - `{{ai_cost}}`
6. Set up automation rule: When subscriber added to "ROI Calculator" form → Subscribe to "ROI Calculator Nurture" sequence

#### Step 4: Create Segment-Specific Content

Based on the "goal" tag, customize emails:

**Filter in ConvertKit:**
- Create segments for each goal type
- Adjust email content based on segment (see EMAIL_SEQUENCE.md "Segment-Specific Variations")

#### Step 5: Test the Sequence

1. Submit a test form with your email
2. Verify you receive Email 1 immediately (Formspree autoresponder)
3. Check ConvertKit to confirm subscriber was added
4. Verify tags were applied correctly
5. Manually trigger Email 2 to test content
6. Wait for scheduled delivery to test timing

---

## 3. Optional: Advanced Tracking Setup

### Google Analytics Goals

Already configured in the calculator, but verify these events are tracking:

1. Go to Google Analytics → Admin → Goals
2. Create conversion goals:
   - **Goal 1:** `calculator_use` event (page interaction)
   - **Goal 2:** `generate_lead` event (form submission)
   - **Goal 3:** Page visit: `/tools/roi-calculator/`

### CRM Integration (HubSpot / Salesforce)

If you want calculator leads to flow directly into your CRM:

**HubSpot Integration:**
1. Get HubSpot API key
2. Modify `calculator.js` to include HubSpot API call:
```javascript
// Add after Formspree submission
await fetch('https://api.hubapi.com/contacts/v1/contact/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        properties: [
            {property: 'email', value: email},
            {property: 'lead_source', value: 'ROI Calculator'},
            {property: 'savings_amount', value: savings},
            // ... more fields
        ]
    })
});
```

**Salesforce Integration:**
1. Use Zapier to connect Formspree → Salesforce
2. Create Lead with custom fields for calculator data
3. Assign to appropriate sales rep based on savings amount

---

## 4. Monitoring & Optimization

### Week 1 Checklist:
- [ ] Check Formspree submissions daily
- [ ] Review email open rates in ConvertKit
- [ ] Monitor Google Analytics for calculator usage
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Verify PDFs generate correctly on different browsers

### Monthly Review:
- [ ] Email sequence performance (opens, clicks, replies)
- [ ] Calculator usage (sessions, completion rate)
- [ ] Lead quality (which "goal" segments convert best)
- [ ] A/B test email subject lines (see EMAIL_SEQUENCE.md)

### Optimization Ideas:
1. **Low email open rates?** Test new subject lines (EMAIL_SEQUENCE.md has A/B test variants)
2. **Low form completion?** Reduce friction (remove required fields, test different CTA copy)
3. **High calculator usage but low conversions?** Add more trust signals, testimonials, case studies
4. **Segment not performing?** Customize messaging for that segment specifically

---

## 5. Troubleshooting

### Forms Not Submitting
- Check browser console for errors
- Verify Formspree endpoint is correct in calculator.js
- Check Formspree dashboard for error logs
- Ensure CORS is enabled on Formspree

### PDFs Not Generating
- Check if jsPDF is loading (view page source, verify CDN link)
- Test in different browsers (Chrome, Firefox, Safari)
- Check browser console for jsPDF errors
- Verify PDF generation code doesn't have calculation errors

### Emails Not Sending
- Check spam folder
- Verify Formspree autoresponder is enabled
- Check ConvertKit automation rules are active
- Ensure Zapier connection is working

### Calculator Not Calculating
- Check browser console for JavaScript errors
- Verify all input IDs match between HTML and JS
- Test with different browsers
- Clear browser cache and reload

---

## 6. Launch Checklist

Before promoting the calculator publicly:

### Pre-Launch:
- [ ] Formspree endpoint configured
- [ ] Test form submission works
- [ ] Email autoresponder tested
- [ ] ConvertKit sequence created and tested
- [ ] Google Analytics tracking verified
- [ ] PDF generation works on Chrome, Firefox, Safari
- [ ] Mobile responsive tested (iOS, Android)
- [ ] Calculator linked from homepage ✅
- [ ] Calculator linked from blog post ✅
- [ ] Sitemap updated ✅
- [ ] Social sharing image created (1200x630px)

### Launch Day:
- [ ] Announce on LinkedIn
- [ ] Email existing email list (if any)
- [ ] Share in relevant communities/forums
- [ ] Monitor submissions closely for first 24 hours

### Post-Launch:
- [ ] Respond to all calculator leads within 24 hours
- [ ] Track conversion rate (calculator users → calls booked)
- [ ] Iterate on email sequence based on response data
- [ ] Create retargeting ads for calculator users who don't convert

---

## Support

If you encounter issues:
1. Check this guide first
2. Review `EMAIL_SEQUENCE.md` for email nurture details
3. Check Formspree documentation: https://help.formspree.io
4. Check ConvertKit documentation: https://help.convertkit.com

---

**Next Steps:** Once Formspree is configured, proceed to "2. Set Up Email Nurture Sequence" above.
