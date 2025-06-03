import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
export const supabaseClient = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || '',
);

// Define the bucket name for files
export const CHAT_IMAGES_BUCKET = 'files';
