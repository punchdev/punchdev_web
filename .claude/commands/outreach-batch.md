# /outreach:batch

Batch process prospects by status.

## Usage

```
/outreach:batch <status> <count> <action>
```

## Parameters

- `status` (required): Filter by status (New, Researching, Contacted, Replied, etc.)
- `count` (required): Number of prospects to process (max 50)
- `action` (required): Action to perform (research, generate, send, followup)

## Actions Performed

1. **Filter**: Retrieves prospects matching status from Sheets
2. **Limit**: Takes first <count> records
3. **Process**: Executes specified action for each prospect
4. **Rate Limit**: Enforces 50 emails/hour for send actions
5. **Report**: Generates summary of batch results

## MCP Tools Used

- `mcp__claude_ai_Zapier__google_sheets_get_many_spreadsheet_rows_advanced` - Filter prospects
- Varies by action (same tools as individual commands)

## Rate Limits

| Action | Rate Limit |
|--------|------------|
| research | 20/hour (Web Reader intensive) |
| generate | 30/hour (Draft creation) |
| send | 50/hour (Gmail limit) |
| followup | 50/hour (Gmail limit) |

## Batch Strategy

- Process in groups of 10 (all-or-nothing per group)
- If any failure in group, complete group before stopping
- Failed items logged with error details

## Output Format

```
Batch Report: /outreach:send Contacted 25
==========================================
Processed: 25/25
Success: 23
Failed: 2
Rate limit pauses: 0

Failures:
- 1739284001_broken-corp.com: Invalid email
- 1739285002_missing-data.com: No draft found

Time elapsed: 18 minutes
```

## Examples

```
# Research 10 new prospects
/outreach:batch New 10 research

# Generate emails for 5 researched prospects
/outreach:batch Researching 5 generate

# Send 20 pending drafts
/outreach:batch Researching 20 send

# Follow up with contacted prospects
/outreach:batch Contacted 15 followup
```

## Notes

- Requires confirmation before sending (destructive action)
- Use `/outreach:report` after batch to view results
- Failed sends don't increment email_count (can retry)
