export class CookieManager {
  static set(name: string, value: string, minutes?: number) {
    const encodedValue = encodeURIComponent(value);
    let expires = "";

    if (minutes) {
      const date = new Date();
      date.setTime(date.getTime() + minutes * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }

    document.cookie = `${name}=${encodedValue}${expires}; path=/; SameSite=Strict`;
  }

  static get(name: string): string | null {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(nameEQ)) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }

    return null;
  }

  static remove(name: string) {
    document.cookie = `${name}=; Max-Age=-1; path=/; SameSite=Strict`;
  }

  static setTimer(name: string, value: string, hours: number = 24) {
    const encodedValue = encodeURIComponent(value);
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();

    document.cookie = `${name}=${encodedValue}${expires}; path=/; SameSite=Strict`;
  }
}
