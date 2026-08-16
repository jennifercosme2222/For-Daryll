-- Optional: run this in your Supabase project's SQL editor
-- (Dashboard → SQL Editor → New query → paste → Run)
-- It creates a tiny table that logs a timestamp every time
-- Daryll opens the envelope, so you can peek and see if/when he did.

create table if not exists letter_opens (
  id bigint generated always as identity primary key,
  opened_at timestamptz not null default now()
);

-- Row Level Security: locked down by default, then we open the
-- narrowest possible door — anonymous visitors may INSERT a row
-- (so the website can log an open) but may NOT read, update, or
-- delete anything. Only you, in the Supabase dashboard, can view them.
alter table letter_opens enable row level security;

create policy "Anyone can log an open"
  on letter_opens
  for insert
  to anon
  with check (true);

-- To check who's opened it and when, run in the SQL editor:
-- select * from letter_opens order by opened_at desc;
