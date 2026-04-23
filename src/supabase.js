import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tffpqsnftcmardsiafs x.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmZnBxc25mdGNtYXJkc2lhZnN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjAyNDYsImV4cCI6MjA5MjMzNjI0Nn0.92q7yanCAriXqTKG2FZuRYS_CzE2m5y-zp3WQVcHe5o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
