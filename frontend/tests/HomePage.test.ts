import { mount, flushPromises } from "@vue/test-utils";
import HomePage from "@/views/Home.vue";
import { useClassesStore } from "@/stores/classes";
import * as classService from "@/application/classService";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";

// Mock window alert
vi.stubGlobal("alert", vi.fn());

// Simulated class data
const simulatedClasses = [
  {
    _id: "68d65caa501309dbe3bc3972",
    id: 1,
    name: "Kennismaking met Psychologie",
    shortdescription: "Brein, gedragsbeinvloeding, ontwikkelingspsychologie, gespreksvoering en ontwikkelingsfasen.",
    location: "Den Bosch",
    description: "In deze module leer je hoe je gedrag van jezelf en van anderen kunt begrijpen en beinvloeden.",
    Rood: 4,
    Groen: 2,
    Blauw: 1,
    Geel: 5,
    module_tags: ["brein", "gedragsbeinvloeding", "ontwikkelingspsychologie", "gespreksvoering", "ontwikkelingsfasen"],
    interests_match_score: 0.54,
    popularity_score: 319,
    estimated_difficulty: 1,
    available_spots: 79,
    start_date: "24/12/2025",
  },
  {
    _id: "68d65caa501309dbe3bc3973",
    id: 2,
    name: "Learning and working abroad",
    shortdescription: "Internationaal, persoonlijke ontwikkeling, verpleegkunde",
    location: "Den Bosch",
    description: "Studenten kiezen steeds vaker voor een stage in het buitenland.",
    Rood: 5,
    Groen: 3,
    Blauw: 1,
    Geel: 1,
    module_tags: ["internationaal", "persoonlijke", "ontwikkeling", "verpleegkunde"],
    interests_match_score: 0.92,
    popularity_score: 172,
    estimated_difficulty: 5,
    available_spots: 56,
    start_date: "20/12/2025",
  },
];

beforeEach(() => {
  // Mock axios for classes
  vi.spyOn(classService, "loadClasses").mockResolvedValue(simulatedClasses);

  // Mock preferences (cookies or token-based)
  vi.spyOn(classService, "loadPreferences").mockResolvedValue({
    liked: [],
    skipped: [],
  });

  // Optional: prevent writing cookies during tests
  vi.spyOn(classService, "savePreferences").mockImplementation(() => {});
});
describe("HomePage.vue", () => {
  it("renders class list correctly", async () => {
    const store = useClassesStore();
    store.liked = [];

    const wrapper = mount(HomePage);

    // Wait for initClasses() to finish
    await flushPromises();

    const classItems = wrapper.findAll('[data-testid="class-card"]');
    expect(classItems.length).toBe(simulatedClasses.length);
    expect(classItems[0].text()).toContain(simulatedClasses[0].name);
  });

  it("filters classes by name", async () => {
    const store = useClassesStore();
    store.liked = [];

    const wrapper = mount(HomePage);
    await flushPromises();

    await wrapper.find('input[placeholder="Filter by name"]').setValue("Psychologie");

    expect(wrapper.vm.filteredClasses.length).toBe(1);
    expect(wrapper.vm.filteredClasses[0].name).toBe("Kennismaking met Psychologie");
  });

  it("toggles like/unlike correctly", async () => {
    const store = useClassesStore();
    store.liked = [];
    store.like = vi.fn((cls) => store.liked.push(cls));
    store.unlike = vi.fn((cls) => (store.liked = store.liked.filter(c => c._id !== cls._id)));

    const wrapper = mount(HomePage);
    await flushPromises();

    const cls = store.classes[0];
    wrapper.vm.toggleLike(cls);
    expect(store.like).toHaveBeenCalledWith(cls);

    wrapper.vm.toggleLike(cls);
    expect(store.unlike).toHaveBeenCalledWith(cls);
  });
});
