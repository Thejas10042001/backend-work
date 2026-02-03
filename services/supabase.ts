
import { createClient } from '@supabase/supabase-js';

/**
 * HARDCODED PROJECT CONFIGURATION
 */
const SUPABASE_PROJECT_URL = "https://psywkhxrbgiriwzvcdpd.supabase.co";

// Retrieve from environment (shimmed in index.html)
const env = (window as any).process?.env || {};
const supabaseUrl = env.SUPABASE_URL || SUPABASE_PROJECT_URL;
const supabaseAnonKey = env.SUPABASE_ANON_KEY || '';

/**
 * Initialize Supabase Client
 */
const isKeyConfigured = supabaseAnonKey && 
                        supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY' && 
                        supabaseAnonKey !== 'placeholder-key-missing' &&
                        supabaseAnonKey !== '';

export const supabase = createClient(
  supabaseUrl, 
  isKeyConfigured ? supabaseAnonKey : 'placeholder-key-missing'
);

export const GOOGLE_CLIENT_ID = "692371004078-g0cemnqa93r07jqb8qmf9t38e99iiovt.apps.googleusercontent.com";

export const signInWithGoogle = async () => {
  if (!isKeyConfigured) {
    const errorMsg = "Supabase configuration incomplete. Please add your SUPABASE_ANON_KEY to index.html.";
    console.error(errorMsg);
    alert(errorMsg);
    return;
  }
  
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
  if (error) {
    console.error('Error signing in:', error.message);
    alert(`Login Error: ${error.message}`);
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error signing out:', error.message);
};
