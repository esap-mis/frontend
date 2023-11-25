const TOKEN_KEY = "AuthToken";
const USERNAME_KEY = "AuthUsername";
const AUTHORITIES_KEY = "AuthAuthorities";
const ROLE_KEY = 'Role'

export class TokenStorageService {

  constructor() {}

  public signOut() {
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getToken(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY)!;
    }
    return '';
  }

  public saveLogin(login: string) {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(USERNAME_KEY);
      window.localStorage.setItem(USERNAME_KEY, login);
    }
  }

  public getLogin(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(USERNAME_KEY)!;
    }
    return '';
  }

  public saveRoles(roles: string) {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(ROLE_KEY);
      window.localStorage.setItem(ROLE_KEY, roles);
    }
  }

  public getRoles(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ROLE_KEY)!;
    }
    return '';
  }

  public saveAuthorities(authorities: string) {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTHORITIES_KEY);
      window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(arguments));
    }
  }
}
