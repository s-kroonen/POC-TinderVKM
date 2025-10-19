import { mount } from "@vue/test-utils";
import HomePage from "@/views/Home.vue";
import { useClassesStore } from "@/stores/classes";
import { describe, it, expect, vi } from "vitest";

// Mock window alert
vi.stubGlobal("alert", vi.fn());

// Simulated class data (from your MongoDB structure)
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

describe("HomePage.vue", () => {
  it("renders class list correctly", () => {
    const store = useClassesStore();
    store.classes = simulatedClasses;
    store.liked = [];

    const wrapper = mount(HomePage);

    // Check if all classes are rendered
    const classItems = wrapper.findAll('[data-testid="class-card"]');
    expect(classItems.length).toBe(simulatedClasses.length);

    // Check the first class name
    expect(classItems[0].text()).toContain(simulatedClasses[0].name);
  });

  it("filters classes by name", async () => {
    const store = useClassesStore();
    store.classes = simulatedClasses;
    store.liked = [];

    const wrapper = mount(HomePage);

    await wrapper.find('input[placeholder="Filter by name"]').setValue("Psychologie");

    expect(wrapper.vm.filteredClasses.length).toBe(1);
    expect(wrapper.vm.filteredClasses[0].name).toBe("Kennismaking met Psychologie");
  });

  it("toggles like/unlike correctly", async () => {
    const store = useClassesStore();
    store.classes = simulatedClasses;
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
