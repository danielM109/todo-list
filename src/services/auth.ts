// ///////// Intento con typescript /////////////////////////
// import { SignUpWithPasswordCredentials } from '@supabase/gotrue-js';
// // import { SupabaseClient, PostgrestSingleResponse } from '@supabase/supabase-js';

// import { supabase } from '../api/config';
// // import {InitialStateProps} from '../components/hooks/useForm';

// export const signInWithEmail = async (email: string, password: string) => {
//   const result = await (supabase.auth as any).signIn({
//     email,
//     password
//   })
//   return result
// }

// export const signUpWithEmail = async (data: SignUpWithPasswordCredentials) => {
//   const result = await supabase.auth.signUp(data)
//   return result
// }

// export const updateProfile = async (data: string) => {
//   try {
//     await supabase.from('profiles').upsert(data/*, { returning: 'minimal' }*/)
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const signInWithMagicLink = async (email: string) => {
//   const result = await  (supabase.auth as any).signIn({
//     email
//   })
//   return result
// }

// export const signInWithGoogle = async () => {
//   try {
//     const { user, error } = await  (supabase.auth as any).signIn({
//       provider: 'google'
//     })
//     if (error) throw new Error('An ocurred meanwhile authentication')
//     return user
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const logout = async () => {
//   const result = await supabase.auth.signOut()
//   return result
// }

