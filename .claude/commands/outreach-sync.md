# /outreach:sync

Synchronize data across Google Workspace systems.

## Usage

```
/outreach:sync [direction]
```

## Parameters

- `direction` (optional): Sync direction (bidirectional, sheets_to_contacts, contacts_to_sheets, integrity_check)
  - Default: bidirectional

## Sync Types

### Bidirectional (default)
Syncs data both directions between Sheets and Contacts

### Sheets to Contacts
Pushes Sheet data to Contacts (Sheet wins on conflicts)

### Contacts to Sheets
Pulls Contact data into Sheets (Contact wins on conflicts)

### Integrity Check
Only checks for inconsistencies, reports findings without changes

## Consistency Checks

| Check | Description | Action |
|-------|-------------|--------|
| Missing Contacts | Prospect in Sheets but not in Contacts | Create Contact |
| Missing Sheet Rows | Contact in group but not in Sheets | Add row |
| Email Mismatch | Different emails in Sheet vs Contact | Flag for review |
| Name Mismatch | Different names in Sheet vs Contact | Use most recent |
| Status Sync | Ensure status matches Contact notes | Update both |

## MCP Tools Used

- `mcp__claude_ai_Zapier__google_sheets_get_many_spreadsheet_rows_advanced` - Get all prospects
- `mcp__claude_ai_Zapier__google_contacts_find_contact` - Check each contact
- `mcp__claude_ai_Zapier__google_contacts_create_contact` - Create missing
- `mcp__claude_ai_Zapier__google_contacts_update_contact` - Update existing
- `mcp__claude_ai_Zapier__google_sheets_create_spreadsheet_row` - Add missing rows
- `mcp__claude_ai_Zapier__google_sheets_update_spreadsheet_row` - Fix mismatches
- `mcp__claude_ai_Zapier__google_calendar_find_event` - Check calendar sync

## Output Format

```
Sync Report: bidirectional
═══════════════════════════════════════════════════════════

📊 SUMMARY
──────────────────────────────────────────────────────────
Prospects in Sheets:          127
Contacts in Group:            124
Sync Actions Taken:           8

✅ COMPLETED
──────────────────────────────────────────────────────────
Created missing Contacts:     3
Updated Contact data:         5
Added Sheet rows:             0

⚠️  CONFLICTS REQUIRING REVIEW
──────────────────────────────────────────────────────────
1. prospect_id: 1739283001_example.com
   Sheet Email:    john@example.com
   Contact Email:  j.smith@example.com
   Action:         Manual review needed

2. prospect_id: 1739285002_test.com
   Sheet Status:   Contacted
   Contact Status: Replied
   Action:         Status mismatch, needs resolution

📅 CALENDAR SYNC
──────────────────────────────────────────────────────────
Events found:                  45
Events without prospect_id:    2
Stale events (>30d):           12 (cleanup recommended)

═══════════════════════════════════════════════════════════
Sync completed in: 2.3 seconds
```

## Examples

```
# Full bidirectional sync
/outreach:sync

# Push Sheet data to Contacts
/outreach:sync sheets_to_contacts

# Check for issues without making changes
/outreach:sync integrity_check
```

## Notes

- Run weekly to maintain data consistency
- Use integrity_check before major changes
- Calendar cleanup recommended monthly
- Conflicts require manual resolution
