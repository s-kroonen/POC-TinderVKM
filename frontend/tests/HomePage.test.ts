import { mount } from "@vue/test-utils";
import HomePage from "@/views/Home.vue";
import { useClassesStore } from "@/stores/classes";
import { describe, it, expect, vi } from "vitest";

// Mock window alert
vi.stubGlobal("alert", vi.fn());

describe("HomePage.vue", () => {
  it("filters classes by name", async () => {
    const store = useClassesStore();
    store.classes = [
      { _id: "1", name: "Math", location: "A", description: "" },
      { _id: "2", name: "Physics", location: "B", description: "" },
    ];
    store.liked = [];

    const wrapper = mount(HomePage);

    await wrapper.find('input[placeholder="Filter by name"]').setValue("Math");

    expect(wrapper.vm.filteredClasses.length).toBe(1);
    expect(wrapper.vm.filteredClasses[0].name).toBe("Math");
  });

  it("toggles like/unlike correctly", async () => {
    const store = useClassesStore();
    store.classes = [{ _id: "1", name: "Math", location: "A", description: "" }];
    store.liked = [];
    store.like = vi.fn((cls) => store.liked.push(cls));
    store.unlike = vi.fn((cls) => (store.liked = store.liked.filter(c => c._id !== cls._id)));

    const wrapper = mount(HomePage);
    const cls = store.classes[0];

    wrapper.vm.toggleLike(cls);
    expect(store.like).toHaveBeenCalledWith(cls);
    wrapper.vm.toggleLike(cls);
    expect(store.unlike).toHaveBeenCalledWith(cls);
  });
});
