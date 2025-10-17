import { mount } from "@vue/test-utils";
import LoginPage from "@/views/LoginRegister.vue";
import { useAuthStore } from "@/stores/auth";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { nextTick } from "vue";

// Mock router and global window functions
const push = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({ push }),
}));

vi.stubGlobal("alert", vi.fn());
vi.stubGlobal("window.open", vi.fn());

describe("LoginPage.vue - full flow with failures", () => {
  let auth: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    auth = useAuthStore();
    auth.register = vi.fn().mockResolvedValue(true);
    auth.login = vi.fn().mockResolvedValue(true);
  });

  it("registers a new user successfully and navigates to home", async () => {
    const wrapper = mount(LoginPage);
    wrapper.vm.mode = "register";

    await wrapper.find("input[type='email']").setValue("newuser@example.com");
    await wrapper.find("input[type='password']").setValue("password123");
    await wrapper.find("form").trigger("submit.prevent");
    await nextTick();

    expect(auth.register).toHaveBeenCalledWith("newuser@example.com", "password123");
    expect(push).toHaveBeenCalledWith("/");
    expect(alert).not.toHaveBeenCalled();
  });

  it("fails to register and shows alert", async () => {
    auth.register = vi.fn().mockRejectedValue(new Error("Registration failed"));
    const wrapper = mount(LoginPage);
    wrapper.vm.mode = "register";

    await wrapper.find("input[type='email']").setValue("failuser@example.com");
    await wrapper.find("input[type='password']").setValue("badpassword");
    await wrapper.find("form").trigger("submit.prevent");
    await nextTick();

    expect(auth.register).toHaveBeenCalledWith("failuser@example.com", "badpassword");
    expect(alert).toHaveBeenCalledWith("Registration failed");
    expect(push).not.toHaveBeenCalled();
  });

  it("logs in successfully and navigates to home", async () => {
    const wrapper = mount(LoginPage);
    wrapper.vm.mode = "login";

    await wrapper.find("input[type='email']").setValue("existing@example.com");
    await wrapper.find("input[type='password']").setValue("password123");
    await wrapper.find("form").trigger("submit.prevent");
    await nextTick();

    expect(auth.login).toHaveBeenCalledWith("existing@example.com", "password123");
    expect(push).toHaveBeenCalledWith("/");
    expect(alert).not.toHaveBeenCalled();
  });

  it("fails to login and shows alert", async () => {
    auth.login = vi.fn().mockRejectedValue(new Error("Login failed"));
    const wrapper = mount(LoginPage);
    wrapper.vm.mode = "login";

    await wrapper.find("input[type='email']").setValue("fail@example.com");
    await wrapper.find("input[type='password']").setValue("wrongpassword");
    await wrapper.find("form").trigger("submit.prevent");
    await nextTick();

    expect(auth.login).toHaveBeenCalledWith("fail@example.com", "wrongpassword");
    expect(alert).toHaveBeenCalledWith("Login failed");
    expect(push).not.toHaveBeenCalled();
  });

  it("opens Microsoft login popup", () => {
    const wrapper = mount(LoginPage);
    wrapper.vm.loginWithMicrosoft();
    expect(window.open).toHaveBeenCalled();
  });
});
