# /outreach:followup

Handle follow-up sequence for prospect.

## Usage

```
/outreach:followup <prospect_id> [day]
```

## Parameters

- `prospect_id` (required): Unique prospect identifier
- `day` (optional): Follow-up day sequence (auto-detected if not specified)

## Actions Performed

1. **Fetch**: Retrieves prospect data including last_email_date and email_count
2. **Calculate**: Determines appropriate follow-up based on days since last email
3. **Generate**: Creates contextual follow-up email
4. **Send**: Sends follow-up via Gmail
5. **Update**: Increments email_count, updates last_email_date
6. **Schedule**: Sets next follow-up in calendar if applicable
7. **Activity Log**: Records "followup_sent" event

## Follow-up Sequence

| Day | Template Type | Subject Pattern |
|-----|--------------|-----------------|
| 3 | Value Add | "Quick idea for {{company_name}}" |
| 7 | Social Proof | "{{company_name}} + success story" |
| 14 | Break-up | "Permission to close the loop?" |
| 21+ | New Angle | "Something changed..." |

## MCP Tools Used

- `mcp__claude_ai_Zapier__google_sheets_lookup_spreadsheet_row` - Fetch prospect
- `mcp__claude_ai_Zapier__gmail_send_email` - Send follow-up
- `mcp__claude_ai_Zapier__google_sheets_update_spreadsheet_row` - Update count
- `mcp__claude_ai_Zapier__google_calendar_create_detailed_event` - Next follow-up
- `mcp__claude_ai_Zapier__google_sheets_create_spreadsheet_row` - Log activity

## Auto-Detection Logic

```
IF days_since_last_email >= 14 AND email_count < 3:
    send_day_14_followup
ELSE IF days_since_last_email >= 7 AND email_count < 3:
    send_day_7_followup
ELSE IF days_since_last_email >= 3 AND email_count < 3:
    send_day_3_followup
ELSE:
    alert user (manual intervention needed)
```

## Example

```
# Auto-detect follow-up day
/outreach:followup 1739284001_acme-corp.com

# Force specific follow-up
/outreach:followup 1739284001_acme-corp.com 7
```

## Status After

- If email_count = 3: No further scheduled follows
- If email_count < 3: Next follow-up scheduled
- Status unchanged (remains "Contacted" unless reply received)

## Output Format

```
Follow-up sent to: john@acme-corp.com
Follow-up type: Day 3 (Value Add)
Email count: 2/3
Next follow-up: [date] (Day 7)
```
