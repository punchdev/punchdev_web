# /outreach:enrich

Additional research pass to enhance prospect data.

## Usage

```
/outreach:enrich <prospect_id>
```

## Parameters

- `prospect_id` (required): Unique prospect identifier

## Actions Performed

1. **Fetch**: Retrieves existing prospect data and research_notes
2. **News Search**: Scrapes recent company news (funding, product launches, hires)
3. **LinkedIn Activity**: Checks LinkedIn for recent posts, comments, company updates
4. **Tech Stack**: Identifies technologies used (builtwith, github, etc.)
5. **Growth Signals**: Looks for hiring, expansion, new products
6. **Update**: Appends findings to research_notes
7. **Personalize**: Updates personalization_angle with new insights
8. **Activity Log**: Records "enrichment_completed" event

## Enrichment Sources

| Source | What to Look For | Personalization Value |
|--------|------------------|----------------------|
| Company blog | Product updates, culture | High |
| News sites | Funding, acquisitions | Very High |
| LinkedIn posts | Personal interests | Medium |
| GitHub/Stack Overflow | Tech stack, projects | Medium |
| Hiring posts | Team growth, priorities | High |
| Press releases | Announcements | High |

## MCP Tools Used

- `mcp__claude_ai_Zapier__google_sheets_lookup_spreadsheet_row` - Fetch prospect
- `mcp__web_reader__webReader` - Scrape enrichment sources
- `mcp__claude_ai_Zapier__google_sheets_update_spreadsheet_row` - Update research
- `mcp__claude_ai_Zapier__google_contacts_update_contact` - Enrich contact
- `mcp__claude_ai_Zapier__google_sheets_create_spreadsheet_row` - Log activity

## Research Notes Append Format

```
=== ENRICHMENT [DATE] ===
Recent News:
- [News item with source]
- [News item with source]

Tech Stack Detected:
- [Technology 1]
- [Technology 2]

Growth Signals:
- [Hiring, expansion detected]

Updated Personalization Angle: [New hook]

===============================
```

## Example

```
/outreach:enrich 1739284001_acme-corp.com
```

## Output Format

```
Enrichment completed for: 1739284001_acme-corp.com

New findings:
- Recent Series B announced ($20M)
- Launched new product feature last week
- Hiring for 5 sales positions

Personalization angle updated:
Old: Generic cold outreach
New: "Congrats on Series B - noticed you're scaling sales..."

Research notes updated.
Contact enriched.
Activity logged.
```

## Notes

- Use after initial research when personalization feels weak
- Run before generating high-value prospect emails
- Combine with `/outreach:generate` for best results
