import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://kuywmshotcrszkbvgpun.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1eXdtc2hvdGNyc3prYnZncHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNDMzMTcsImV4cCI6MjA2MDgxOTMxN30.VtqOyqmZzdeKfVSIDg0yonhp_WEiSL9Qfs3NnCjRXwA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
