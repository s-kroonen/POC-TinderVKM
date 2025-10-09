import type { ClassDTO } from "@/infrastructure/api/classApi";

export interface Class extends ClassDTO {}

export function addLiked(liked: Class[], cls: Class): Class[] {
  if (!liked.some(c => c._id === cls._id)) {
    return [...liked, cls];
  }
  return liked;
}

export function removeLiked(liked: Class[], cls: Class): Class[] {
  return liked.filter(c => c._id !== cls._id);
}

export function addSkipped(skipped: Class[], cls: Class): Class[] {
  if (!skipped.some(c => c._id === cls._id)) {
    return [...skipped, cls];
  }
  return skipped;
}
