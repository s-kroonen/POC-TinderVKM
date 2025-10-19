import { beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";

beforeEach(() => {
  setActivePinia(createPinia());
  // mock window.open
  vi.stubGlobal("open", vi.fn());
  vi.clearAllMocks();
});
