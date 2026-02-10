# /outreach:report

Generate performance report for outreach pipeline.

## Usage

```
/outreach:report [days]
```

## Parameters

- `days` (optional): Number of days to report on (default: 7)

## Report Sections

### 1. Pipeline Overview
- Total prospects
- Prospects by status (pie chart data)
- New prospects added
- Prospects contacted

### 2. Email Performance
- Emails sent
- Reply rate (replies / sent)
- Positive reply rate
- Meeting book rate
- Unsubscribe rate

### 3. Template Performance
- Top performing templates by reply rate
- A/B test results (if applicable)
- Template usage distribution

### 4. Activity Summary
- Total actions logged
- Actions by type
- Actions by day (trend)

### 5. Attention Required
- Prospects needing follow-up
- Stale prospects (no activity > 14 days)
- Failed sends requiring retry
- Research reminders due

### 6. Timeline
- Key events in period
- Milestones reached

## MCP Tools Used

- `mcp__claude_ai_Zapier__google_sheets_get_many_spreadsheet_rows_advanced` - Fetch all data
- `mcp__claude_ai_Zapier__google_calendar_find_event` - Calendar activity

## Output Format

```
╔══════════════════════════════════════════════════════════════╗
║           punchDev Outreach Report (Last 7 Days)            ║
╠══════════════════════════════════════════════════════════════╣

📊 PIPELINE OVERVIEW
───────────────────────────────────────────────────────────────
Total Prospects:           127
New This Week:             23
Contacted This Week:       18
Replied This Week:         7

Status Distribution:
  New:           45  (35%)
  Researching:   18  (14%)
  Contacted:     38  (30%)
  Replied:       12  (9%)
  Booked:         5  (4%)
  Closed:         3  (2%)
  Unqualified:    6  (5%)

📧 EMAIL PERFORMANCE
───────────────────────────────────────────────────────────────
Emails Sent:               47
Replies Received:          7
Reply Rate:                14.9%
Positive Replies:          5 (10.6%)
Meetings Booked:           3 (6.4%)
Unsubscribes:              2 (4.3%)

📝 TEMPLATE PERFORMANCE
───────────────────────────────────────────────────────────────
1. cold_outreach_a         15 sent / 3 replies = 20.0%
2. cold_outreach_b         15 sent / 2 replies = 13.3%
3. referral_variant        10 sent / 2 replies = 20.0%
4. value_first             7 sent  / 0 replies = 0.0%

🎯 ATTENTION REQUIRED
───────────────────────────────────────────────────────────────
Follow-ups Due (Next 24h): 5
Stale Prospects (>14d):     8
Failed Sends:               1
Research Reminders:         3

📅 ACTIVITY LOG
───────────────────────────────────────────────────────────────
Mon: 12 actions (8 research, 4 send)
Tue: 15 actions (5 research, 10 send)
Wed: 18 actions (3 research, 15 send)
Thu:  8 actions (2 research, 6 send)
Fri:  6 actions (1 research, 5 send)

══════════════════════════════════════════════════════════════
Generated: 2026-02-10 14:32:00
```

## Examples

```
# Weekly report
/outreach:report

# Monthly report
/outreach:report 30

# Today's report
/outreach:report 1
```

## Notes

- Report is displayed in terminal (not saved)
- Copy-paste for sharing or record-keeping
- Use monthly reports for trend analysis
