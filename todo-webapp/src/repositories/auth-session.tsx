import { getCookie, CookieValueTypes, setCookie } from "cookies-next";

export type AuthSessionType = {
  token: string;
  user: {
    email: string;
    id: number;
    name: string;
    username: string;
  };
};

class AuthSession {
  static readonly key = "auth-session";
  static get() {
    const session = getCookie(AuthSession.key) as CookieValueTypes;
    return session ? (JSON.parse(session) as AuthSessionType) : null;
  }
  static set(session: AuthSessionType) {
    setCookie(AuthSession.key, JSON.stringify(session));
    return session;
  }
  static remove() {
    setCookie(AuthSession.key, null);
  }
}

export default AuthSession;
