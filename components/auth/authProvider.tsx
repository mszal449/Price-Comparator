import { User } from "@supabase/supabase-js";
import React, { ReactNode, useState } from "react";
import { createContext } from "react";
import { createClient } from "utils/supabase/server";

interface IAuthContext {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  loading: true,
});
export const AuthProvider = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: User | null;
}) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState<boolean>(true);
  const { auth } = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    setLoading(false);

    return () => {
      subscription.unsubscribe();
    };
  }, [auth]);
};
