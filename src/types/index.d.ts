import type { Session } from "next-auth";

export type UserSession = {
  user: Session["user"] | undefined;
};