import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth(redirectTo = "/auth") {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          router.replace(redirectTo);
        }
      } catch {
        setAuthenticated(false);
        router.replace(redirectTo);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
    // eslint-disable-next-line
  }, []);

  return { loading, authenticated };
}
