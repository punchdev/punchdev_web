# /outreach:onboard

Research a prospect and add to pipeline.

## Usage

```
/outreach:onboard <company_url> [prospect_name] [prospect_email]
```

## Parameters

- `company_url` (required): Company website URL
- `prospect_name` (optional): Prospect full name if known
- `prospect_email` (optional): Prospect email if known

## Actions Performed

1. **Research**: Web Reader scrapes company site for insights
2. **Contact**: Creates/updates Google Contact with research findings
3. **Sheet**: Adds row to Prospects worksheet with all available data
4. **Calendar**: Schedules research reminder for 2 days out
5. **Activity Log**: Records "prospect_added" event

## MCP Tools Used

- `mcp__web_reader__webReader` - Scrape company website
- `mcp__claude_ai_Zapier__google_contacts_create_contact` - Create contact
- `mcp__claude_ai_Zapier__google_sheets_create_spreadsheet_row` - Add prospect
- `mcp__claude_ai_Zapier__google_calendar_create_detailed_event` - Research reminder

## Status After

Prospect status = "New", ready for `/outreach:research`

## Example

```
/outreach:onboard https://acme-corp.com "John Smith" john@acme-corp.com
```

## Notes

- If prospect_name or prospect_email unknown, leave blank and fill in later via `/outreach:research`
- Auto-generates prospect_id using format: `{timestamp}_{company_domain}`
