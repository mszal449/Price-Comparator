import React from "react";
import Navbar from "components/Navbar";
import { createClient } from "utils/supabase/server";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <Navbar initialUser={user}></Navbar>
      {children}
    </div>
  );
}
