import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vtgzovhecbsublrwqebu.supabase.co';
const supabaseKey = 'sb_publishable_tvhdjYuSFPITaM2EbPqb9g_FF7smb5G';

export const supabase = createClient(supabaseUrl, supabaseKey);
