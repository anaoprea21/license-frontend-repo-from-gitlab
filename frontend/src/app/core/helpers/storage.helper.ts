export class StorageHelper {
  private static readonly accessTokenKey: string = 'accessToken';
  private static readonly refreshTokenKey: string = 'refreshToken';

  public static saveAccessTokenLocal(token: String) {
    window.localStorage[this.accessTokenKey] = token;
  }

  public static saveRefreshTokenLocal(token: String) {
    window.localStorage[this.refreshTokenKey] = token;
  }

  public static getAccessToken(): string | null {
    if (window.localStorage[this.accessTokenKey])
      return window.localStorage[this.accessTokenKey];
    return null;
  }

  public static getRefreshToken(): string | null {
    if (window.localStorage[this.refreshTokenKey])
      return window.localStorage[this.refreshTokenKey];
    return null;
  }

  public static removeAccessToken(): void {
    window.localStorage.removeItem(this.accessTokenKey);
  }

  public static removeRefreshToken(): void {
    window.localStorage.removeItem(this.refreshTokenKey);
  }

  public static getTheme(): string {
    return window.localStorage['Theme'];
  }

  public static setTheme(theme: string) {
    window.localStorage['Theme'] = theme;
  }

  public static clearStorage() {
    window.localStorage.clear();
  }
}
