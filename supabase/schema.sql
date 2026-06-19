-- Run once in Supabase → SQL Editor for live chat / inbox.
-- Enables Realtime on `messages` (required for instant updates in the app).

create extension if not exists "pgcrypto";

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  visitor_name text not null,
  visitor_email text not null,
  status text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_type text not null check (sender_type in ('visitor', 'admin')),
  body text not null check (char_length(trim(body)) > 0),
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_id_created_at_idx
  on public.messages (conversation_id, created_at);

create index if not exists conversations_updated_at_idx
  on public.conversations (updated_at desc);

create or replace function public.touch_conversation_updated_at()
returns trigger
language plpgsql
as $$
begin
  update public.conversations
  set updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists messages_touch_conversation on public.messages;
create trigger messages_touch_conversation
after insert on public.messages
for each row execute function public.touch_conversation_updated_at();

alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- Realtime: browser clients subscribe with anon key (conversation id is the secret).
create policy "realtime_read_conversations"
  on public.conversations for select
  using (true);

create policy "realtime_read_messages"
  on public.messages for select
  using (true);

-- Inserts/updates go through Next.js API routes (service role key), not anon clients.

alter table public.messages replica identity full;
alter table public.conversations replica identity full;

alter publication supabase_realtime add table public.messages;
