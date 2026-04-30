# Notion Setup Guide — ZOVA Website

Follow these steps once before deploying. Takes about 5 minutes.

---

## Step 1 — Create a Notion Integration

1. Go to: https://www.notion.so/my-integrations
2. Click **+ New integration**
3. Name it: `ZOVA Website`
4. Select your workspace
5. Under **Capabilities**, ensure "Insert content" is checked
6. Click **Save**
7. Copy the **Internal Integration Token** — it looks like `secret_abc123...`

This is your `NOTION_TOKEN`.

---

## Step 2 — Create the Leads Database

1. In Notion, create a new **full-page database** (not inline)
2. Name it: `ZOVA Leads`
3. Add the following properties (click + to add each):

| Property Name  | Type         | Notes                                      |
|----------------|--------------|--------------------------------------------|
| Name           | Title        | (default — already exists)                 |
| Phone          | Phone        |                                            |
| Email          | Email        |                                            |
| Company        | Text         |                                            |
| Services       | Multi-select | Add all 7 options (see below)              |
| Submitted At   | Date         |                                            |
| Status         | Select       | Add options: New / Contacted / Closed      |
| Message        | Text         | Optional field for client notes            |

**Services multi-select options to add:**
- Online Presence
- Competitor Intelligence
- Social Media & Content
- Product & Suppliers
- Financial Intelligence
- Expansion Intelligence
- Custom Automation

---

## Step 3 — Connect the Integration to Your Database

1. Open the `ZOVA Leads` database
2. Click the `···` menu (top right of the page)
3. Click **Add connections**
4. Search for and select `ZOVA Website`
5. Click **Confirm**

---

## Step 4 — Get the Database ID

From the database URL in your browser:

```
https://www.notion.so/your-workspace/THIS-IS-THE-DATABASE-ID?v=...
```

Copy the ID (the long string between the last `/` and the `?`).

This is your `NOTION_DATABASE_ID`.

---

## Step 5 — Add Environment Variables

### For local development:
Create a file called `.env.local` in the project root:

```
NOTION_TOKEN=secret_your_token_here
NOTION_DATABASE_ID=your_database_id_here
```

### For Vercel (production):
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add both variables:
   - `NOTION_TOKEN` = your integration token
   - `NOTION_DATABASE_ID` = your database ID
4. Redeploy

---

## Step 6 — Test It

Run the site locally:

```bash
npm run dev
```

Open http://localhost:3000, fill the contact form, and submit.
Check your Notion `ZOVA Leads` database — a new row should appear within seconds.

---

## Troubleshooting

**No row appears in Notion:**
- Check that the integration is connected to the database (Step 3)
- Check `.env.local` has the correct values (no extra spaces, no quotes needed)
- Check the browser console and terminal for error messages

**"Submission failed" error on the form:**
- Usually means the Notion token is wrong or the database ID is incorrect
- Re-copy both values carefully

**Database ID format:**
The ID should be 32 characters (with hyphens: 8-4-4-4-12). Example:
`a1b2c3d4-e5f6-7890-abcd-ef1234567890`
