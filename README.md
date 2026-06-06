# Hanina N — Consultant Psychologist · Portfolio

A single-page personal portfolio for **Hanina N**, in a dark + vibrant-orange editorial style.
**All content lives in `data.json`** — edit that one file to add, remove, or update anything.

## Open it

⚠️ Because the page loads its content from `data.json` via `fetch()`, you must view it through a
**web server** (not by double-clicking the file). Opening it directly as `file://…` will show a
"Couldn't load data.json" banner — that's expected.

```bash
cd sinu_portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

When deployed to any normal host (GitHub Pages, Netlify, Vercel, cPanel…) it just works.

## Structure

```
sinu_portfolio/
├── index.html        # page skeleton only (section shells + containers)
├── data.json         # ← ALL content lives here (edit this)
├── css/styles.css    # theme, layout, animations, responsive
├── js/script.js      # fetches data.json → renders the page → runs interactions
└── assets/           # profile photo, brain sketch, logo/favicons, reel thumbnails
```

## ✏️ Editing content — `data.json`

Open `data.json` and change the values. The page rebuilds itself from it on every load.
The file is organised section by section:

| Key | Controls |
|-----|----------|
| `brand` | name, role, logo (used in nav + footer) |
| `nav` | navbar links + the "Book a Session" button |
| `hero` | badge, headline, intro text, form button, photo, the 3 floating cards |
| `band` | the orange strip text + the 3 animated stat counters |
| `about` | bio paragraphs + the facts grid (Role, Based in, Focus, **Age**, Nationality) |
| `approach` | the "Every mind tells a story" section + bullet points + brain image |
| `help` | the 3 "How I Help" service cards |
| `expertise` | skill chips + language bars (`value` = % filled) |
| `journey` | experience, education, achievements, certificates lists |
| `sessions` | the programs/sessions cards |
| `reels` | the Instagram reels (just the post `code`) + the "View more" link |
| `contact` | the big CTA title, lead text, and contact rows |
| `footer` | note, footer links, social icons, copyright |

### Common edits

- **Add a skill** → add a string to `expertise.skills`.
- **Add a job / qualification** → add an object to `journey.experience` / `journey.education`
  (`{ "time", "title", "org", "desc" }`; education also supports `"badge"` / `"badgeMuted"`).
- **Add a reel** → drop the thumbnail in `assets/` and add to `reels.items`:
  `{ "code": "REELCODE", "thumb": "assets/reel-7.jpeg", "caption": "Title" }`.
  The `code` is the part after `/reel/` in an Instagram URL — embed + link are built from it.
- **Age is automatic** → driven by `about.facts` → the `Age` entry's `"dob"` (YYYY-MM-DD);
  it recalculates on every visit, so it's always current.
- Section headings use `{ "lead", "grad", "tail" }` — `grad` is the orange-highlighted part.
- HTML is allowed inside text values (e.g. `<strong>…</strong>`, `<span class="hl">…</span>`).

## Other edits

- **Colors** → CSS variables at the top of `css/styles.css` (`:root`).
- **Profile photo** → replace `assets/profile.jpeg` (portrait / 4:5 works best).
- **Layout/markup** → `index.html` (rarely needed — it's just the shells).

## Notes

- Fonts: **Anton** (display) + **Plus Jakarta Sans** (body) via Google Fonts.
- Fully responsive with a full-screen mobile menu; respects `prefers-reduced-motion`.
- The hero form and "Book a consultation" buttons open a prefilled email to the address in
  `data.json`. Swap in a form backend (e.g. Formspree) for real submissions.
