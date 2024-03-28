import { createClient } from '@supabase/supabase-js'
import { Database } from '../components/type/supabase'

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_PUBLIC_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)



