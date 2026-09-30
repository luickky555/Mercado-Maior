import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gpqznqjnutrwwxzdagfz.supabase.co/rest/v1/'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwcXpucWpudXRyd3d4emRhZ2Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2NjAyNDksImV4cCI6MjEwMjIzNjI0OX0.o-rNwd74-ZelNtBFmEg_dtdh2Vy2vVQ9c18Hp5L5tM0'

// Exporta o cliente. Se as envs não estiverem configuradas, ele não quebrará o app instantaneamente,
// mas as chamadas falharão. Por enquanto, usaremos nossos hooks baseados em LocalStorage.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)