<script setup lang="ts">
import {reactive, computed} from "vue";
import {useClassesStore} from "@/stores/classes";
import {useRoute, useRouter} from "vue-router";

const store = useClassesStore();
const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.id);
const existing = store.classes.find(c => c._id === route.params.id);

const form = reactive({
  name: existing?.name ?? "",
  description: existing?.description ?? "",
  studycredit: existing?.studycredit ?? 0,
  location: existing?.location ?? "",
});

const errors = reactive<Record<string, string>>({});

async function save() {
  try {
    if (isEdit.value) {
      await store.update(route.params.id as string, form);
    } else {
      await store.create(form);
    }
    router.push("/");
  } catch (err: any) {
    if (err.type === "validation") {
      Object.assign(errors, err.errors);
    }
    if (err.response?.data?.errors) {
      Object.assign(errors, err.response.data.errors);
    }
  }
}


</script>
<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-xl font-bold mb-4">
      {{ isEdit ? "Edit Class" : "Create Class" }}
    </h1>

    <form @submit.prevent="save" class="space-y-4">
      <div>
        <input v-model="form.name" placeholder="Name" class="border p-2 w-full"/>
        <p v-if="errors.name" class="text-red-600 text-sm">{{ errors.name }}</p>
      </div>

      <div>
        <textarea v-model="form.description" placeholder="Description" class="border p-5 w-full"/>
      </div>

      <div>
        <input type="number" v-model.number="form.studycredit" class="border p-2 w-full"/>
        <p v-if="errors.studycredit" class="text-red-600 text-sm">
          {{ errors.studycredit }}
        </p>
      </div>

      <button class="bg-green-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  </div>
</template>
