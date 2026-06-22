-- Voer dit uit in de Supabase SQL Editor (of via de CLI).

create table if not exists public.briefings (
  edition_date date primary key,
  data jsonb not null,
  generated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Snel sorteren op datum voor het archief
create index if not exists briefings_date_idx
  on public.briefings (edition_date desc);

-- RLS aan. Lezen is publiek (de content is openbaar);
-- schrijven gebeurt uitsluitend via de service role key (server/cron), die RLS omzeilt.
alter table public.briefings enable row level security;

drop policy if exists "Public read access" on public.briefings;
create policy "Public read access"
  on public.briefings
  for select
  using (true);
