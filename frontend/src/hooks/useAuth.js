"use client";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client";
import { useRouter } from "next/navigation";

export function useAuth(redirectTo = "/login") {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //enforces users to be logged in 
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push(redirectTo);
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();

    // Listen for login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        router.push(redirectTo);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, redirectTo]);

  return { user, loading };
}