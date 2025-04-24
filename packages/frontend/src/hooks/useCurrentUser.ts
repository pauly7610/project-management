import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const { data, status } = useSession();
  // NextAuth's default session.user does not include id by default, so we fallback to email as a unique identifier
  const user = data?.user && {
    ...data.user,
    id: (data.user as any).id || (data.user as any).sub || data.user.email || undefined
  };
  return { user, loading: status === "loading" };
}
