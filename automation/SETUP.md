# punchDev Outreach Engine - Setup Guide

This guide walks through setting up the Google Workspace infrastructure for the Email Outreach Engine.

---

## Prerequisites

- Google Workspace account with access to:
  - Google Sheets
  - Google Calendar
  - Google Contacts
  - Gmail
- Claude Code CLI with MCP tools configured

---

## Step 1: Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click "Blank" to create new spreadsheet
3. Name it: **"punchDev Outreach Pipeline"**

### Worksheet 1: Prospects

1. Rename "Sheet1" to "Prospects"
2. Add headers in row 1 (A1:AB1):

```
| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z | AA | AB |
| prospect_id | company_name | company_url | prospect_name | prospect_title | prospect_email | prospect_linkedin | status | research_notes | personalization_angle | last_email_date | email_count | reply_received | reply_date | meeting_booked | meeting_date | source | icp_fit | tier | added_date | last_activity | owner | template_used | a_b_test_group | warmup_score | verification_status | notes | next_followup |
```

3. Format columns:
   - K, N, P, T, U, AB: Date/Time
   - L, Y: Number
   - M, O: Checkbox
   - H, R, S, X, Z: Dropdown (create data validation below)

4. Create dropdown for column H (status):
   - New, Researching, Contacted, Replied, Booked, Closed, Unqualified

5. Create dropdown for column R (icp_fit):
   - High, Medium, Low

6. Create dropdown for column S (tier):
   - Tier 1, Tier 2, Tier 3

7. Create dropdown for column X (a_b_test_group):
   - A, B, Control

8. Create dropdown for column Z (verification_status):
   - Verified, Risky, Invalid

### Worksheet 2: Email Templates

1. Click "+" to add new sheet
2. Name it: "Email Templates"
3. Add headers in row 1:

```
| A | B | C | D | E | F | G | H |
| template_name | variant | subject_line | body_template | personalization_fields | send_count | reply_rate | status |
```

4. Create dropdown for column H (status):
   - Active, Paused, Archived

### Worksheet 3: Activity Log

1. Click "+" to add new sheet
2. Name it: "Activity Log"
3. Add headers in row 1:

```
| A | B | C | D | E | F | G |
| timestamp | prospect_id | action_type | channel | details | performed_by | result |
```

---

## Step 2: Create Google Calendar

1. Go to [calendar.google.com](https://calendar.google.com)
2. Click the "+" next to "Other calendars"
3. Select "Create new calendar"
4. Name it: **"punchDev Outreach"**
5. Description: "Automated outreach follow-ups and meetings"
6. Click "Create calendar"

### Calendar Settings

1. Click the gear icon > Settings
2. Find "punchDev Outreach" in left sidebar
3. Set:
   - **Time zone**: Your local timezone
   - **Default event color**: Blue
   - **Visibility**: Private (only you)

### Color Coding Guide

Use these colors when creating events:
- **Red**: Hot leads (reply received)
- **Blue**: Follow-ups scheduled
- **Green**: Meetings booked
- **Yellow**: Research reminders

### Event Naming Convention

```
[PROSPECT] Company - Name - Action

Examples:
[PROSPECT] Acme Corp - John Smith - Research Due
[PROSPECT] Acme Corp - John Smith - Follow-up Day 3
[PROSPECT] Acme Corp - John Smith - Discovery Call
```

---

## Step 3: Create Google Contacts Group

1. Go to [contacts.google.com](https://contacts.google.com)
2. Click "Create label" (or "+" icon)
3. Name it: **"Outreach Prospects"**
4. Click "Save"

### Contact Fields to Populate

For each outreach prospect, fill in:
- **Name**: Full name
- **Email**: Primary email
- **Phone** (if available)
- **Company**: Company name
- **Job Title**: prospect_title
- **Notes**:
  ```
  LinkedIn: [URL]
  Source: [where they came from]
  ICP Fit: [High/Medium/Low]
  Status: [New/Contacted/etc]
  Research Notes: [key findings]
  ```

---

## Step 4: Share Settings (Optional)

If you want to share access with team members:

### Google Sheet Sharing

1. In the Outreach Pipeline sheet, click "Share"
2. Add team member email addresses
3. Set permissions:
   - Editor: Can modify prospects and templates
   - Viewer: Read-only access for reporting

### Google Calendar Sharing

1. In punchDev Outreach calendar settings
2. Scroll to "Share with specific people"
3. Add team members with "See all event details" permission

### Google Contacts Sharing

Note: Google Contacts labels are personal only. For team contact sharing:
1. Export contacts regularly to CSV
2. Share CSV via Google Drive
3. Or use a shared Google Sheet as contact database

---

## Step 5: Test MCP Connections

In Claude Code CLI, test each MCP tool:

```bash
# Test Sheets - create a test row
# Use: mcp__claude_ai_Zapier__google_sheets_create_spreadsheet_row
# Verify the row appears in your sheet

# Test Gmail - create a test draft
# Use: mcp__claude_ai_Zapier__gmail_create_draft
# Verify the draft appears in your Gmail drafts

# Test Calendar - create a test event
# Use: mcp__claude_ai_Zapier__google_calendar_create_detailed_event
# Verify the event appears in punchDev Outreach calendar

# Test Contacts - create a test contact
# Use: mcp__claude_ai_Zapier__google_contacts_create_contact
# Verify the contact appears in your contacts
```

---

## Step 6: Record System IDs

After creating resources, record these IDs for reference:

```
Google Sheet ID: [From URL: /d/XXXXXXX/edit]
Sheet Name: punchDev Outreach Pipeline

Calendar ID: [From calendar settings]
Calendar Name: punchDev Outreach

Contact Label: Outreach Prospects
```

**To find Sheet ID:**
1. Open the sheet
2. Copy from URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

---

## Step 7: Configure Environment (Optional)

If you want to store configuration in Claude:

Create `.claude/memory/outreach-config.md`:

```markdown
# Outreach Configuration

## Resources
- Sheet ID: [your_sheet_id]
- Calendar ID: [your_calendar_id]
- Contact Label: Outreach Prospects

## Personal Info
- My Name: Georges Duplessy
- My Company: punchDev
- Calendly Link: https://calendly.com/...

## Email Settings
- Daily Send Limit: 50
- Hourly Send Limit: 10
- From Email: [your_email]

## Status Labels
- Hot Lead Color: Red
- Follow-up Color: Blue
- Meeting Color: Green
- Research Color: Yellow
```

---

## Troubleshooting

### MCP Tools Not Connecting

1. Check Zapier MCP connection is active
2. Verify Google account is connected in Zapier
3. Re-authenticate if needed

### Sheet Not Found

1. Verify Sheet ID is correct
2. Check sharing permissions (must be Editor)
3. Try re-authenticating Google account

### Calendar Events Not Appearing

1. Verify you're looking at "punchDev Outreach" calendar
2. Check calendar is not hidden
3. Verify event creation was successful

### Contacts Not Syncing

1. Verify label name matches exactly: "Outreach Prospects"
2. Check contact was actually created (search by email)
3. Run `/outreach:sync` to reconcile

---

## Next Steps

After setup is complete:

1. Run `/outreach:onboard https://example.com` for your first prospect
2. Run `/outreach:research <prospect_id>` to gather data
3. Run `/outreach:generate <prospect_id>` to create email draft
4. Review draft in Gmail
5. Run `/outreach:send <prospect_id>` to send
6. Run `/outreach:report` to view results

---

## Support

For issues or questions:
1. Check automation/README.md for command reference
2. Review activity log in Sheets for error details
3. Verify MCP tools are working
