# punchDev Outreach Engine - User Guide

Automated email outreach system running in Claude Code CLI using MCP tools.

---

## Quick Start

```bash
# 1. Research and add a new prospect
/outreach:onboard https://acme-corp.com "John Smith"

# 2. Deep research on the prospect
/outreach:research <prospect_id>

# 3. Generate personalized email
/outreach:generate <prospect_id>

# 4. Send the email
/outreach:send <prospect_id>

# 5. View performance report
/outreach:report
```

---

## Command Reference

### Prospect Management

| Command | Description |
|---------|-------------|
| `/outreach:onboard <url> [name] [email]` | Add new prospect to pipeline |
| `/outreach:research <prospect_id>` | Deep research on existing prospect |
| `/outreach:enrich <prospect_id>` | Additional research pass |
| `/outreach:verify <prospect_id>` | Verify email and domain health |

### Email Operations

| Command | Description |
|---------|-------------|
| `/outreach:generate <prospect_id> [template]` | Generate personalized email draft |
| `/outreach:send <prospect_id>` | Send drafted email |
| `/outreach:followup <prospect_id> [day]` | Send follow-up email |
| `/outreach:reply <thread_id> <type>` | Log incoming reply |

### Batch Operations

| Command | Description |
|---------|-------------|
| `/outreach:batch <status> <count> <action>` | Batch process prospects |
| `/outreach:sync [direction]` | Sync data across systems |

### Templates & Reporting

| Command | Description |
|---------|-------------|
| `/outreach:template <name> [variant] [action]` | Create or test email template |
| `/outreach:report [days]` | Generate performance report |

---

## Typical Workflows

### New Prospect Outreach

```bash
# 1. Add prospect
/outreach:onboard https://company.com "Jane Doe" jane@company.com

# 2. Research (auto-enriches company data)
/outreach:research <prospect_id>

# 3. Review research notes in Sheets
# 4. Generate email with personalization
/outreach:generate <prospect_id>

# 5. Review draft in Gmail
# 6. Send email
/outreach:send <prospect_id>
```

### Batch Processing

```bash
# Research 20 new prospects
/outreach:batch New 20 research

# Generate emails for researched prospects
/outreach:batch Researching 20 generate

# Review all drafts in Gmail
# Send all pending emails
/outreach:batch Researching 20 send
```

### Reply Handling

```bash
# When you receive a reply in Gmail
# 1. Copy the Gmail thread ID from URL
# 2. Log the reply
/outreach:reply <thread_id> positive

# 3. System will:
#    - Update prospect status to "Replied"
#    - Create calendar event for call
#    - Cancel pending follow-ups
```

### Follow-up Sequence

```bash
# Manual follow-up (auto-sequences day 3, 7, 14)
/outreach:followup <prospect_id>

# Force specific follow-up day
/outreach:followup <prospect_id> 7
```

---

## Prospect Status Flow

```
New → Researching → Contacted → Replied → Booked → Closed
                  ↓
            Unqualified
```

**Status Definitions:**
- **New**: Added to pipeline, no research yet
- **Researching**: Research in progress or completed
- **Contacted**: First email sent
- **Replied**: Prospect responded to email
- **Booked**: Meeting scheduled
- **Closed**: Deal won/lost
- **Unqualified**: Not a good fit

---

## Email Template Placeholders

| Placeholder | Source | Example |
|-------------|--------|---------|
| `{{prospect_name}}` | prospect_name | "John Smith" |
| `{{first_name}}` | Extracted from prospect_name | "John" |
| `{{company_name}}` | company_name | "Acme Corp" |
| `{{company_url}}` | company_url | "https://acme.com" |
| `{{prospect_title}}` | prospect_title | "CEO" |
| `{{personalization_hook}}` | personalization_angle | "Congrats on Series B" |
| `{{recent_activity}}` | research_notes | "Just launched product X" |
| `{{my_name}}` | Hardcoded | "Georges Duplessy" |
| `{{my_company}}` | Hardcoded | "punchDev" |
| `{{calendly_link}}` | Hardcoded | Calendly URL |

---

## Rate Limits

| Action | Limit | Reason |
|--------|-------|--------|
| Email sends | 50/hour | Gmail API limit |
| Research requests | 20/hour | Web Reader rate limit |
| Draft creation | 30/hour | Gmail API limit |

**Batch Recommendations:**
- Process sends in batches of 25-50
- Take breaks between batches
- Monitor `/outreach:report` for deliverability

---

## Data Structure

### Prospects Worksheet Columns

| Column | Field | Description |
|--------|-------|-------------|
| A | prospect_id | Unique identifier |
| B | company_name | Company name |
| C | company_url | Website |
| D | prospect_name | Full name |
| E | prospect_title | Job title |
| F | prospect_email | Email address |
| G | prospect_linkedin | LinkedIn URL |
| H | status | Pipeline stage |
| I | research_notes | Web research findings |
| J | personalization_angle | Key hook for email |
| K | last_email_date | Most recent send |
| L | email_count | Total emails sent |
| M | reply_received | Checkbox |
| N | reply_date | When replied |
| O | meeting_booked | Checkbox |
| P | meeting_date | Scheduled meeting |
| Q | source | Where prospect came from |
| R | icp_fit | High/Medium/Low |
| S | tier | Tier 1/2/3 |
| T | added_date | When added |
| U | last_activity | Last interaction |
| V | owner | Prospect owner |
| W | template_used | Email variant |
| X | a_b_test_group | A/B/Control |
| Y | warmup_score | 0-100 |
| Z | verification_status | Verified/Risky/Invalid |
| AA | notes | Manual notes |
| AB | next_followup | Scheduled follow-up |

---

## Best Practices

### Personalization

1. **Always research before sending**: `/outreach:research` before `/outreach:generate`
2. **Use specific hooks**: Reference recent news, funding, product launches
3. **Avoid generic templates**: Customize for each prospect tier

### Email Timing

- **Best send times**: Tue-Thu, 9-11am local time
- **Avoid**: Mondays (catch-up), Fridays (checked out)
- **Follow-up sequence**: Day 3 → Day 7 → Day 14

### List Hygiene

1. **Verify emails**: `/outreach:verify` before sending to new domains
2. **Monitor bounce rates**: High bounces = review list quality
3. **Remove unsubscribes**: Update status to "Unqualified"

### A/B Testing

1. **Create variants**: `/outreach:template name B create`
2. **Split traffic**: Use a_b_test_group field (A/B/Control)
3. **Measure results**: Compare reply rates after 50+ sends
4. **Iterate**: Update losing variant, scale winner

---

## Troubleshooting

### Email Not Sending

```bash
# Check verification status
/outreach:verify <prospect_id>

# Check if draft exists
/outreach:sync sheets_to_contacts

# Review error in Activity Log
# Check column G (result) for failure details
```

### Research Notes Empty

```bash
# Re-run research
/outreach:research <prospect_id>

# Try enrichment
/outreach:enrich <prospect_id>
```

### Duplicate Prospects

```bash
# Run sync to detect
/outreach:sync integrity_check

# Manually merge duplicates in Sheets
# Keep the prospect_id with more activity
```

### Calendar Events Missing

```bash
# Sync calendar with Sheets
/outreach:sync

# Check events exist
# Filter by "[PROSPECT]" in event title
```

---

## Reporting Metrics

### Key Metrics to Track

| Metric | Formula | Target |
|--------|---------|--------|
| Reply Rate | Replies / Sent | >15% |
| Positive Rate | Positive Replies / Sent | >10% |
| Meeting Rate | Meetings / Sent | >5% |
| Unsubscribe Rate | Unsubscribes / Sent | <5% |
| Verification Pass | Verified / Total | >90% |

### Weekly Review Process

```bash
# 1. Generate weekly report
/outreach:report 7

# 2. Review template performance
# 3. Identify best/worst performing templates

# 4. Check attention items
#    - Follow-ups due
#    - Stale prospects
#    - Failed sends

# 5. Process replies
#    - Log positive replies
#    - Book meetings

# 6. Plan next week
#    - New prospects to add
#    - A/B tests to run
```

---

## Integration with GA4

To track email → website → conversion:

1. **Add UTM parameters to links**:
   ```
   https://punchdev.net?utm_source=outreach&utm_medium=email&utm_campaign={{template_name}}
   ```

2. **Track events in GA4**:
   - Page view from email
   - Calendly link click
   - Form submission

3. **Attribute revenue**:
   - Match prospect_id to CRM
   - Track deal close back to source

---

## Advanced Usage

### Custom Sequences

For non-standard outreach flows:

1. Create custom template: `/outreach:template custom_name A create`
2. Specify in generate: `/outreach:generate <prospect_id> custom_name_a`
3. Track separately in template_used field

### LinkedIn Integration

When LinkedIn MCP becomes available:

```bash
# Future commands
/outreach:linkedin <prospect_id> connect
/outreach:linkedin <prospect_id> message
/outreach:linkedin <prospect_id> inmail
```

### CRM Integration

To sync with external CRM:

```bash
# Export prospects from Sheets
# Filter by status = "Replied" or "Booked"
# Import to HubSpot/Salesforce
# Use webhook or Zapier for real-time sync
```

---

## Security Notes

- **Never share**: Sheet ID with sensitive data publicly
- **Access control**: Limit sheet edit access to trusted team
- **Email privacy**: Don't include personal data in template placeholders
- **GDPR/CCPA**: Include unsubscribe link in emails
- **Data retention**: Archive closed prospects after 90 days

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-10 | Initial release |

---

## Support

For issues:
1. Check Activity Log in Sheets
2. Run `/outreach:sync` to check data integrity
3. Verify MCP tools are connected
4. Review SETUP.md for infrastructure issues
