const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export async function getEvents() {
  const response = await fetch(`${supabaseUrl}/rest/v1/events?order=date.asc`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("Kunne ikke hente events fra Supabase");
  }

  return await response.json();
}
