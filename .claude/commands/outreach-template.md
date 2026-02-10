# /outreach:template

Create or test email template.

## Usage

```
/outreach:template <name> [variant] [action]
```

## Parameters

- `name` (required): Template name (e.g., "cold_outreach", "referral")
- `variant` (optional): A or B for A/B testing (default: A)
- `action` (optional): create, test, activate, pause (default: create)

## Actions

### create (default)
Creates new template with placeholders

### test
Generates sample email using template with test data

### activate
Sets template status to "Active" for use in campaigns

### pause
Sets template status to "Paused" (stops new usage)

## Template Format

Templates use placeholder syntax: `{{field_name}}`

### Standard Placeholders

| Placeholder | Source Field |
|-------------|--------------|
| {{prospect_name}} | prospect_name |
| {{first_name}} | First name extracted from prospect_name |
| {{company_name}} | company_name |
| {{company_url}} | company_url |
| {{prospect_title}} | prospect_title |
| {{personalization_hook}} | personalization_angle |
| {{recent_activity}} | research_notes extract |
| {{my_name}} | Your name (hardcode or config) |
| {{my_company}} | Your company (hardcode or config) |
| {{calendly_link}} | Calendly URL |

## MCP Tools Used

- `mcp__claude_ai_Zapier__google_sheets_create_spreadsheet_row` - Add template
- `mcp__claude_ai_Zapier__google_sheets_lookup_spreadsheet_row` - Get template
- `mcp__claude_ai_Zapier__google_sheets_update_spreadsheet_row` - Update status

## Template Example

```
Template Name: cold_outreach
Variant: A
Subject: Quick question about {{company_name}}

Body:
Hi {{first_name}},

Saw the news about {{recent_activity}} - congrats on the momentum!

I'm reaching out because I've been helping companies like {{company_name}}
{{personalization_hook}}.

Would you be open to a 15-minute call to discuss?

Best,
{{my_name}}

P.S. Here's my calendar if that's easier: {{calendly_link}}
```

## Output Format (test action)

```
Template Test: cold_outreach_a
═══════════════════════════════════════════════════════════

Subject: Quick question about Acme Corp

Body:
Hi John,

Saw the news about Acme Corp's Series B funding - congrats on the momentum!

I'm reaching out because I've been helping companies like Acme Corp
scale their sales outreach with personalized AI automation.

Would you be open to a 15-minute call to discuss?

Best,
Georges

P.S. Here's my calendar if that's easier: https://calendly.com/...

═══════════════════════════════════════════════════════════
Placeholders used: 6/6
Word count: 52
Reading time: ~15 seconds
```

## Examples

```
# Create new template
/outreach:template referral A create

# Test existing template
/outreach:template cold_outreach A test

# Activate template for campaigns
/outreach:template cold_outreach A activate

# Pause template
/outreach:template cold_outreach A pause

# Create B variant for testing
/outreach:template cold_outreach B create
```

## Template Best Practices

- Keep subject lines under 50 characters
- Limit body to 150 words for cold outreach
- Include one clear call-to-action
- Use personalization naturally (not forced)
- Add P.S. line with Calendly for easy booking
- Test subject lines separately from body

## A/B Testing Notes

- Create A and B variants of same template name
- Track performance via send_count and reply_rate
- Run minimum 50 sends per variant before concluding
- Update variant status based on results
