<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <div class="flex-1 py-12">
      <Container>
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">
              Ticket Management
            </h1>
            <p class="text-gray-600">
              Create, view, edit, and manage all your tickets
            </p>
          </div>
          <button
            @click="openCreate"
            class="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Create Ticket
          </button>
        </div>

        <div
          v-if="tickets.length === 0"
          class="bg-white rounded-xl shadow-lg p-12 text-center"
        >
          <h3 class="text-2xl font-semibold text-gray-900 mb-2">
            No tickets yet
          </h3>
          <p class="text-gray-600 mb-6">
            Create your first ticket to get started
          </p>
          <button
            @click="openCreate"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create First Ticket
          </button>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="ticket in tickets"
            :key="ticket.id"
            class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div class="flex justify-between items-start mb-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  statusClass(ticket.status),
                ]"
                >{{ ticket.status.replace("_", " ") }}</span
              >
              <div class="flex space-x-2">
                <button
                  @click="handleEdit(ticket)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  @click="confirmDelete(ticket.id)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ ticket.title }}
            </h3>
            <p v-if="ticket.description" class="text-gray-600 text-sm mb-4">
              {{ ticket.description }}
            </p>
            <div
              class="flex items-center justify-between text-sm text-gray-500 pt-4 border-t"
            >
              <div>
                Priority:
                <span :class="priorityClass(ticket.priority)">{{
                  ticket.priority
                }}</span>
              </div>
              <div>ID: {{ ticket.id }}</div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6">
            <h3 class="text-xl font-bold mb-4">
              {{ editingTicket ? "Edit Ticket" : "Create Ticket" }}
            </h3>
            <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Title <span class="text-red-500">*</span></label
                >
                <input
                  v-model="form.title"
                  id="ticket-title"
                  type="text"
                  placeholder="Enter ticket title"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <p v-if="errors.title" class="text-red-500 text-sm mt-1">
                  {{ errors.title }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Description</label
                >
                <textarea
                  v-model="form.description"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="Enter ticket description"
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Status <span class="text-red-500">*</span></label
                  >
                  <select
                    v-model="form.status"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                  <p v-if="errors.status" class="text-red-500 text-sm mt-1">
                    {{ errors.status }}
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Priority</label
                  >
                  <select
                    v-model="form.priority"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div class="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  @click="closeModal"
                  class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {{ editingTicket ? "Update Ticket" : "Create Ticket" }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Delete Confirm -->
        <div
          v-if="deleteConfirm !== null"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 class="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p class="text-gray-600 mb-6">
              Are you sure you want to delete this ticket? This action cannot be
              undone.
            </p>
            <div class="flex justify-end space-x-4">
              <button
                @click="deleteConfirm = null"
                class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                @click="handleDelete(deleteConfirm)"
                class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  </div>
</template>

<script setup>
import Container from "../components/layout/Container.vue";
import { reactive, ref } from "vue";
import { useToast } from "../composables/useToast";

const { showToast } = useToast();

const tickets = ref(
  JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]")
);
const showModal = ref(false);
const editingTicket = ref(null);
const deleteConfirm = ref(null);

const form = reactive({
  title: "",
  description: "",
  status: "open",
  priority: "medium",
});
const errors = reactive({});

const openCreate = () => {
  editingTicket.value = null;
  form.title = "";
  form.description = "";
  form.status = "open";
  form.priority = "medium";
  Object.keys(errors).forEach((k) => delete errors[k]);
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingTicket.value = null;
};

const validate = () => {
  const newErrors = {};
  if (!form.title) newErrors.title = "Title is required";
  if (!form.status) newErrors.status = "Status is required";
  return newErrors;
};

const saveTickets = () => {
  localStorage.setItem("ticketapp_tickets", JSON.stringify(tickets.value));
};

const handleSubmit = () => {
  const newErrors = validate();
  Object.keys(errors).forEach((k) => delete errors[k]);
  Object.assign(errors, newErrors);
  if (Object.keys(newErrors).length) return;

  if (editingTicket.value) {
    const idx = tickets.value.findIndex((t) => t.id === editingTicket.value.id);
    if (idx !== -1) {
      tickets.value[idx] = { ...editingTicket.value, ...{ ...form } };
      saveTickets();
      showToast("Ticket updated successfully!", "success");
    }
  } else {
    const newTicket = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
    };
    tickets.value.unshift(newTicket);
    saveTickets();
    showToast("Ticket created successfully!", "success");
  }

  closeModal();
};

const handleEdit = (ticket) => {
  editingTicket.value = { ...ticket };
  form.title = ticket.title;
  form.description = ticket.description;
  form.status = ticket.status;
  form.priority = ticket.priority;
  Object.keys(errors).forEach((k) => delete errors[k]);
  showModal.value = true;
};

const confirmDelete = (id) => {
  deleteConfirm.value = id;
};

const handleDelete = (id) => {
  tickets.value = tickets.value.filter((t) => t.id !== id);
  saveTickets();
  showToast("Ticket deleted successfully!", "success");
  deleteConfirm.value = null;
};

const statusClass = (s) => {
  switch (s) {
    case "open":
      return "bg-green-100 text-green-800";
    case "in_progress":
      return "bg-amber-100 text-amber-800";
    case "closed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const priorityClass = (p) => {
  switch (p) {
    case "high":
      return "text-red-600";
    case "medium":
      return "text-yellow-600";
    case "low":
      return "text-blue-600";
    default:
      return "text-gray-600";
  }
};
</script>
