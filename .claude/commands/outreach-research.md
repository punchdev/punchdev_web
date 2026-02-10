# /outreach:research

Deep research on existing prospect.

## Usage

```
/outreach:research <prospect_id>
```

## Parameters

- `prospect_id` (required): Unique prospect identifier from Prospects sheet

## Actions Performed

1. **Fetch**: Retrieves prospect data from Sheets (company_url, prospect_linkedin)
2. **Company Research**: Web Reader scrapes company news, about page, team page
3. **LinkedIn Research**: Web Reader scrapes LinkedIn profile if available
4. **Analyze**: Identifies personalization angles (recent funding, product launches, hiring)
5. **Update Sheets**: Populates research_notes and personalization_angle fields
6. **Update Contact**: Enriches Google Contact with findings
7. **Activity Log**: Records "research_completed" event
8. **Status Change**: Updates status from "New" to "Researching"

## MCP Tools Used

- `mcp__claude_ai_Zapier__google_sheets_lookup_spreadsheet_row` - Fetch prospect
- `mcp__web_reader__webReader` - Scrape company and LinkedIn
- `mcp__claude_ai_Zapier__google_sheets_update_spreadsheet_row` - Update research
- `mcp__claude_ai_Zapier__google_contacts_update_contact` - Enrich contact
- `mcp__claude_ai_Zapier__google_sheets_create_spreadsheet_row` - Log activity

## Research Notes Format

```
Company: [name]
Industry: [industry]
Recent Activity:
- [Funding/news item 1]
- [Product launch/hiring news]
Key Pain Points:
- [Inferred pain point 1]
- [Inferred pain point 2]
Personalization Angle: [Specific hook for email]
```

## Example

```
/outreach:research 1739284001_acme-corp.com
```

## Status After

Prospect status = "Researching", ready for `/outreach:generate`
