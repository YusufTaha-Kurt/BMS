-- İş birliği önerisi formu. web/api/contact.ts bu tabloya yayımlanabilir (publishable/anon) anahtarla yazar.
-- Anonim rol yalnız ekleme yapabilir. Okuma, güncelleme ve silme yalnız Supabase panelinden veya gizli anahtarla yapılır.
create table if not exists public.collaboration_proposals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  organization text not null check (char_length(organization) between 2 and 150),
  email text not null check (char_length(email) between 6 and 254 and position('@' in email) > 1),
  phone text check (phone is null or char_length(phone) between 7 and 20),
  message text not null check (char_length(message) between 20 and 2000),
  language text not null check (language in ('tr', 'en')),
  consent_at timestamptz not null,
  transfer_consent_at timestamptz not null,
  privacy_version text not null check (char_length(privacy_version) <= 20)
);

comment on table public.collaboration_proposals is 'Web sitesi iş birliği önerileri. Aydınlatma metnine göre en fazla iki yıl saklanır.';

alter table public.collaboration_proposals enable row level security;

revoke all on table public.collaboration_proposals from anon, authenticated;
grant insert on table public.collaboration_proposals to anon;

drop policy if exists "Form gönderimi eklenebilir" on public.collaboration_proposals;
create policy "Form gönderimi eklenebilir"
  on public.collaboration_proposals
  for insert
  to anon
  with check (true);
