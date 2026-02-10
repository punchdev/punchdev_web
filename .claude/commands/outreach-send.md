# /outreach:send

Send drafted email to prospect.

## Usage

```
/outreach:send <prospect_id>
```

## Parameters

- `prospect_id` (required): Unique prospect identifier

## Actions Performed

1. **Verify**: Checks prospect exists and has valid email
2. **Retrieve**: Finds latest Gmail draft for this prospect
3. **Send**: Sends email via Gmail
4. **Update**: Increments email_count, updates last_email_date
5. **Status**: Changes status to "Contacted"
6. **Calendar**: Schedules follow-up for day 3 (48 hours)
7. **Activity Log**: Records "email_sent" event

## MCP Tools Used

- `mcp__claude_ai_Zapier__google_sheets_lookup_spreadsheet_row` - Verify prospect
- `mcp__claude_ai_Zapier__gmail_find_email` - Find draft
- `mcp__claude_ai_Zapier__gmail_send_email` - Send email
- `mcp__claude_ai_Zapier__google_sheets_update_spreadsheet_row` - Update status
- `mcp__claude_ai_Zapier__google_calendar_create_detailed_event` - Schedule follow-up
- `mcp__claude_ai_Zapier__google_sheets_create_spreadsheet_row` - Log activity

## Rate Limiting

- Maximum: 50 emails per hour
- If rate limit hit: Pause and alert user to resume in 1 hour

## Error Handling

| Error | Action |
|-------|--------|
| Email not verified | Skip send, mark verification_status = "Risky" |
| Draft not found | Alert user, skip send |
| Send failed | Log to Sheets, keep status unchanged |
| Rate limit | Pause batch, alert user |

## Follow-up Schedule

| Day | Action |
|-----|--------|
| 3 | First follow-up (value add) |
| 7 | Second follow-up (social proof) |
| 14 | Third follow-up (break-up or new angle) |

## Example

```
/outreach:send 1739284001_acme-corp.com
```

## Status After

Prospect status = "Contacted", email_count incremented, follow-up scheduled

## Confirmation Output

```
Email sent to: john@acme-corp.com
Subject: [subject line]
Follow-up scheduled: [date/time] (Day 3)
Email count: 1
```
