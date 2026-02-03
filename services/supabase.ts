
import { createClient } from '@supabase/supabase-js';

// These should be configured in your environment.
// Fallback to placeholders if not provided, though the app requires them for actual auth.
const supabaseUrl = (process.env as any).SUPABASE_URL || '';
const supabaseAnonKey = (process.env as any).SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const GOOGLE_CLIENT_ID = "692371004078-g0cemnqa93r07jqb8qmf9t38e99iiovt.apps.googleusercontent.com";

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: window.location.origin
    }
  });
  if (error) console.error('Error signing in:', error.message);
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error signing out:', error.message);
};
