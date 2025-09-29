import { defineStore } from "pinia";
import { ref } from "vue";
import { getClasses, type Class } from "../services/classService";

export const useClassesStore = defineStore("classes", () => {
  const classes = ref<Class[]>([]);
  const liked = ref<Class[]>([]);
  const skipped = ref<Class[]>([]);

  async function fetchClasses() {
    classes.value = await getClasses();
  }

  function like(cls: Class) {
    liked.value.push(cls);
    remove(cls);
  }

  function skip(cls: Class) {
    skipped.value.push(cls);
    remove(cls);
  }

  function remove(cls: Class) {
    classes.value = classes.value.filter(c => c._id !== cls._id);
  }

  return {
    classes,
    liked,
    skipped,
    fetchClasses,
    like,
    skip
  };
});
