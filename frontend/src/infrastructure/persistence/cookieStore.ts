import Cookies from "js-cookie";

export function saveLiked(ids: string[]) {
  Cookies.set("liked", JSON.stringify(ids));
}

export function saveSkipped(ids: string[]) {
  Cookies.set("skipped", JSON.stringify(ids));
}

export function loadLiked(): string[] {
  return JSON.parse(Cookies.get("liked") || "[]");
}

export function loadSkipped(): string[] {
  return JSON.parse(Cookies.get("skipped") || "[]");
}

export function clearPreferences() {
  Cookies.remove("liked");
  Cookies.remove("skipped");
}
