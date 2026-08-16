# For Daryll 💗

A little birthday website: he taps a pink envelope, it opens, and your letter
slides out with your photos together and background music.

Live in ~10 minutes, hosted for free, with a link you can text him.

---

## What's inside

```
index.html              the page
style.css                all the styling
script.js                envelope animation, music button, open-logging
supabase-config.js        (optional) your Supabase project keys go here
supabase.sql              (optional) sets up open-logging in Supabase
assets/images/            your 4 photos (already added)
assets/audio/              you'll add the song file here — see step 2
```

## Step 1 — Get the files onto GitHub

1. Create a new **public** repository on GitHub, e.g. `for-daryll`.
2. Upload every file in this folder into it (drag-and-drop works fine on
   github.com — click **Add file → Upload files**), keeping the folder
   structure (`assets/images/...` etc.) intact.
3. Go to the repo's **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`. Save.
5. GitHub will give you a link like:
   `https://yourusername.github.io/for-daryll/`
   That's your shareable link — it can take a minute or two to go live.

## Step 2 — The song

Already done — `assets/audio/lightning-henry-gallagher.mp3` is included in
this folder and the page is already wired up to play it. Just make sure
that file uploads to GitHub along with everything else in Step 1 (it's a
5MB file, so give the upload a little extra time).

## Step 3 — (Optional) Know when he's opened it

This step is completely optional — skip it and the site still works fine.

1. Create a free project at [supabase.com](https://supabase.com).
2. In your project, go to **SQL Editor → New query**, paste in everything
   from `supabase.sql`, and click **Run**. This creates a small table that
   records a timestamp every time the envelope is opened.
3. Go to **Project Settings → API**. Copy your **Project URL** and your
   **anon public** key.
4. Open `supabase-config.js` and paste them in:
   ```js
   const SUPABASE_URL = 'https://xxxxxxxx.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGciOi...';
   ```
5. Commit that change to GitHub.

To check whether/when he's opened it later, go back to **SQL Editor** and
run:
```sql
select * from letter_opens order by opened_at desc;
```
The table only accepts new rows from visitors — it can't be read or changed
by anyone browsing the site, only by you inside the Supabase dashboard.

## Step 4 — Test it

Open your GitHub Pages link on your **own phone** first, in a private/
incognito tab (so it behaves like a first-time visitor). Tap the envelope,
check the photos and letter look right, and check the music button.

## Customizing

- **Photos**: swap any file in `assets/images/` — just keep the same
  filename, or update the `src` in `index.html`.
- **Colors**: everything lives at the top of `style.css` under `:root`.
- **Text**: edit directly inside the `<article class="letter-body">` block
  in `index.html`.
