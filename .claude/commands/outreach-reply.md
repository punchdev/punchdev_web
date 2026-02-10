# /outreach:reply

Log and handle incoming prospect reply.

## Usage

```
/outreach:reply <gmail_thread_id> <response_type>
```

## Parameters

- `gmail_thread_id` (required): Gmail thread ID from reply email
- `response_type` (required): Category of response (positive, negative, question, unsubscribe)

## Response Types

| Type | Description | Action |
|------|-------------|--------|
| positive | Interested, wants to learn more | Update status, suggest meeting |
| negative | Not interested | Update status, stop follow-ups |
| question | Has questions | Draft response draft |
| unsubscribe | Remove from list | Update status, suppress emails |

## Actions Performed

1. **Fetch**: Retrieves reply content via Gmail
2. **Parse**: Analyzes reply content and sentiment
3. **Update**: Sets reply_received = TRUE, records reply_date
4. **Status**: Updates prospect status based on response_type
5. **Calendar**: If positive, creates event for call booking
6. **Activity Log**: Records "reply_received" event with details
7. **Follow-up**: Cancels pending follow-ups if negative/unsubscribe

## MCP Tools Used

- `mcp__claude_ai_Zapier__gmail_find_email` - Fetch reply
- `mcp__claude_ai_Zapier__google_sheets_lookup_spreadsheet_row` - Get prospect
- `mcp__claude_ai_Zapier__google_sheets_update_spreadsheet_row` - Update status
- `mcp__claude_ai_Zapier__google_calendar_create_detailed_event` - Book meeting (if positive)
- `mcp__claude_ai_Zapier__google_sheets_create_spreadsheet_row` - Log activity

## Status Changes by Response Type

| Response Type | New Status |
|--------------|------------|
| positive | "Replied" |
| negative | "Unqualified" |
| question | "Replied" |
| unsubscribe | "Unqualified" |

## Example

```
/outreach:reply 17f4a5b2c3d4e5f positive
```

## Positive Response Flow

When response_type = "positive":
1. Update status to "Replied"
2. Create calendar event: "[PROSPECT] Call - {{company_name}}"
3. Suggest Calendly link for booking
4. Cancel pending follow-ups

## Output Format

```
Reply logged from: john@acme-corp.com
Response type: positive
New status: Replied
Calendar event created: [date/time]
Pending follow-ups cancelled: 2
```

## Notes

- Manual review recommended for "question" responses
- "unsubscribe" responses suppress all future emails
- Meeting booking should be confirmed with user
