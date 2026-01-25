import {defineStore} from "pinia";
import {ref} from "vue";
import * as classService from "@/application/classService";
import * as classDomain from "@/domain/classService";
import type {Class} from "@/domain/classService";
import {useAuthStore} from "./auth";

export const useClassesStore = defineStore("classes", () => {
    const classes = ref<Class[]>([]);
    const liked = ref<Class[]>([]);
    const skipped = ref<Class[]>([]);

    function getToken(): string | null {
        return useAuthStore().token;
    }

    // ---------- Init ----------
    async function initClasses() {
        classes.value = await classService.loadClasses();

        const token = getToken();
        const prefs = await classService.loadPreferences(token || undefined);

        liked.value = prefs.liked;
        skipped.value = prefs.skipped;
    }

    // ---------- Actions ----------
    function like(cls: Class) {
        liked.value = classDomain.addLiked(liked.value, cls);
        savePreferences();
    }

    function unlike(cls: Class) {
        liked.value = classDomain.removeLiked(liked.value, cls);
        savePreferences();
    }

    /**
     * Skip is only for mobile/swipe view.
     * It will not affect what classes are shown on desktop.
     */
    function skip(cls: Class) {
        skipped.value = classDomain.addSkipped(skipped.value, cls);
        savePreferences();
    }

    async function syncToBackendOnLogout() {
        const token = getToken();
        if (!token) return;
        await classService.savePreferences(liked.value, skipped.value, token);
    }

    function clearPreferences() {
        classService.clearPreferences();
        liked.value = [];
        skipped.value = [];
    }

    function savePreferences() {
        classService.savePreferences(liked.value, skipped.value, getToken() || undefined);
    }

    async function create(cls: Partial<Class>) {
        const token = getToken();
        const created = await classService.create(cls, token!);
        classes.value.push(created);
    }

    async function update(id: string, data: Partial<Class>) {
        const token = getToken();
        const updated = await classService.update(id, data, token!);
        const idx = classes.value.findIndex(c => c._id === id);
        if (idx !== -1) classes.value[idx] = updated;
    }

    async function remove(id: string) {
        const token = getToken();
        await classService.remove(id, token!);
        classes.value = classes.value.filter(c => c._id !== id);
    }

    return {
        create,
        update,
        remove,
        classes,
        liked,
        skipped,
        initClasses,
        like,
        unlike,
        skip,
        syncToBackendOnLogout,
        clearPreferences,
    };
});
