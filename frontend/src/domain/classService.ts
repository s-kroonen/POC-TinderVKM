import type { ClassDTO } from "@/infrastructure/api/classApi";

export interface Class extends ClassDTO {}

export function filterClasses(classes: Class[], liked: Class[], skipped: Class[]): Class[] {
  const likedIds = liked.map(c => c._id);
  const skippedIds = skipped.map(c => c._id);

  return classes.filter(c => !likedIds.includes(c._id) && !skippedIds.includes(c._id));
}

export function likeClass(classes: Class[], cls: Class): Class[] {
  return classes.filter(c => c._id !== cls._id);
}

export function skipClass(classes: Class[], cls: Class): Class[] {
  return classes.filter(c => c._id !== cls._id);
}
