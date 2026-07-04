create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  owner_email text not null default 'emmanual.ilearnsamoan@gmail.com',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress
add column if not exists owner_email text not null default 'emmanual.ilearnsamoan@gmail.com';

alter table public.user_progress enable row level security;

drop policy if exists "Users can read their own progress" on public.user_progress;
create policy "Users can read their own progress"
on public.user_progress
for select
to authenticated
using (
  auth.uid() = user_id
  and lower(coalesce(auth.jwt() ->> 'email', '')) = 'emmanual.ilearnsamoan@gmail.com'
);

drop policy if exists "Users can insert their own progress" on public.user_progress;
create policy "Users can insert their own progress"
on public.user_progress
for insert
to authenticated
with check (
  auth.uid() = user_id
  and lower(owner_email) = 'emmanual.ilearnsamoan@gmail.com'
  and lower(coalesce(auth.jwt() ->> 'email', '')) = 'emmanual.ilearnsamoan@gmail.com'
);

drop policy if exists "Users can update their own progress" on public.user_progress;
create policy "Users can update their own progress"
on public.user_progress
for update
to authenticated
using (
  auth.uid() = user_id
  and lower(coalesce(auth.jwt() ->> 'email', '')) = 'emmanual.ilearnsamoan@gmail.com'
)
with check (
  auth.uid() = user_id
  and lower(owner_email) = 'emmanual.ilearnsamoan@gmail.com'
  and lower(coalesce(auth.jwt() ->> 'email', '')) = 'emmanual.ilearnsamoan@gmail.com'
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_user_progress_updated_at on public.user_progress;
create trigger set_user_progress_updated_at
before update on public.user_progress
for each row
execute function public.set_updated_at();
