# /outreach:verify

Verify email address and domain health.

## Usage

```
/outreach:verify <prospect_id>
```

## Parameters

- `prospect_id` (required): Unique prospect identifier

## Actions Performed

1. **Fetch**: Retrieves prospect email and domain
2. **Format Check**: Validates email format and syntax
3. **Domain Check**: Verifies domain has MX records
4. **Warmup Score**: Checks domain warmup status (if available)
5. **Risk Assessment**: Flags disposable, catch-all, or role-based emails
6. **Update**: Sets verification_status field
7. **Activity Log**: Records "verification_completed" event

## Verification Status Values

| Status | Description | Send Recommendation |
|--------|-------------|---------------------|
| Verified | Passes all checks | Safe to send |
| Risky | Concerns detected | Review before sending |
| Invalid | Failed checks | Do not send |

## Risk Factors

| Factor | Risk Level | Notes |
|--------|------------|-------|
| Disposable domain | Invalid | Temporary email services |
| Role-based address | Risky | info@, sales@, support@ |
| Catch-all domain | Risky | Accepts all emails |
| No MX records | Invalid | Domain can't receive email |
| Typos in domain | Invalid | Likely invalid email |
| New domain (< 3mo) | Risky | May have deliverability issues |

## MCP Tools Used

- `mcp__claude_ai_Zapier__google_sheets_lookup_spreadsheet_row` - Fetch prospect
- `mcp__web_reader__webReader` - Check domain (if needed)
- `mcp__claude_ai_Zapier__google_sheets_update_spreadsheet_row` - Update status
- `mcp__claude_ai_Zapier__google_sheets_create_spreadsheet_row` - Log activity

## Output Format

```
Email Verification Report
────────────────────────────────────────
Prospect: 1739284001_acme-corp.com
Email: john@acme-corp.com

Format Check:         ✓ PASS
Domain Check:         ✓ PASS
MX Records:           ✓ FOUND (3 servers)
Domain Age:           ✓ 5 years
Disposable Check:     ✓ NOT disposable
Role-based Check:     ⚠ WARNING (sales@ domain)

Risk Assessment:      RISKY
Recommendation:       Review before sending

Status Updated: Risky
```

## Example

```
/outreach:verify 1739284001_acme-corp.com
```

## Notes

- Role-based addresses (info@, sales@) are marked "Risky" not "Invalid"
- Gmail/G-suite domains are auto-verified
- Consider using external service for full verification (e.g., Hunter, NeverBounce)
