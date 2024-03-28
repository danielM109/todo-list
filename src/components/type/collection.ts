import { Database } from "./supabase";

// export type PostType = Database["public"]["Tables"]["posts"]["Row"];
export type ProfileTypes = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
export type TableTypes = Database["public"]["Tables"]["profiles"];
export type TodoListTypes = Database["public"]["Tables"]["todolist"]["Row"];
//// si falla algo tevisar esto que borre sin querer