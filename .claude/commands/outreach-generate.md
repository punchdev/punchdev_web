# /outreach:generate

Generate personalized email for prospect.

## Usage

```
/outreach:generate <prospect_id> [template_name]
```

## Parameters

- `prospect_id` (required): Unique prospect identifier
- `template_name` (optional): Template variant (default: "cold_outreach_a")

## Actions Performed

1. **Fetch**: Retrieves prospect data from Sheets
2. **Template**: Loads email template from Templates worksheet
3. **Generate**: Uses /email-sequence skill for personalized email generation
4. **Personalize**: Inserts details from research_notes and personalization_angle
5. **Draft**: Creates Gmail draft (does NOT send)
6. **Activity Log**: Records "email_draft_created" event

## MCP Tools Used

- `mcp__claude_ai_Zapier__google_sheets_lookup_spreadsheet_row` - Fetch prospect
- `mcp__claude_ai_Zapier__gmail_create_draft` - Create draft
- `mcp__claude_ai_Zapier__google_sheets_create_spreadsheet_row` - Log activity

## Email Template Placeholders

| Placeholder | Source |
|------------|--------|
| {{prospect_name}} | prospect_name |
| {{company_name}} | company_name |
| {{personalization_hook}} | personalization_angle |
| {{prospect_title}} | prospect_title |
| {{recent_activity}} | research_notes |

## Draft Format

**Subject**: [Template subject with personalization]
**To**: [prospect_email]
**Body**: [Personalized email with research-backed hook]

## Example

```
/outreach:generate 1739284001_acme-corp.com cold_outreach_a
```

## Status After

No status change - draft created for review. Ready for `/outreach:send`

## Notes

- Always creates draft for manual review before sending
- Draft is saved to Gmail with label "Outreach Drafts"
