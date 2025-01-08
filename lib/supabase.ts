import { createClient as _createClient } from "@supabase/supabase-js";
export const createClient = () => {
  _createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  );
};
