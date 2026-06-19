-- Run once in Supabase SQL Editor if live updates feel delayed.
-- Helps Realtime deliver filtered message events to open chat tabs.

alter table public.messages replica identity full;
alter table public.conversations replica identity full;

-- Safe to run again if the table is already in the publication:
do $$
begin
  alter publication supabase_realtime add table public.messages;
exception
  when duplicate_object then null;
end $$;
