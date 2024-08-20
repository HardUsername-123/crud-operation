<template>
  <div class="container">
    <h1 class="title">User List</h1>
    <div class="table-container">
      <table class="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="editUser(user)" class="btn update-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="confirmDelete(user)" class="btn delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for updating user details -->
    <div v-if="selectedUser" class="modal">
      <div class="modal-content">
        <h2 class="modal-title">Update User</h2>
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            v-model="selectedUser.name"
            type="text"
            id="name"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            v-model="selectedUser.email"
            type="email"
            id="email"
            class="form-input"
          />
        </div>
        <div class="modal-actions">
          <button @click="updateUser" class="btn save-btn">Save Changes</button>
          <button @click="closeModal" class="btn cancel-btn">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Modal for delete confirmation -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-del">
        <p>Are you sure you want to delete this user?</p>
        <div class="modal-buttons">
          <button @click="deleteUser(userToDelete.id)" class="btns btn-confirm">
            OK
          </button>
          <button @click="closeDeleteModal" class="btns btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Modal for Update confirmation -->
    <div v-if="updateConfirm" class="modal-overlay">
      <div class="modal-del">
        <p>Update successfully!</p>
        <div class="modal-buttons">
          <button @click="updateClose" class="btns btn-update">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      selectedUser: null,
      showDeleteModal: false,
      userToDelete: null,
      updateConfirm: false,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3001/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    editUser(user) {
      this.selectedUser = { ...user }; // Clone the user object to avoid mutating the original data
    },
    async updateUser() {
      try {
        await axios.put(
          `http://localhost:3001/users/${this.selectedUser.id}`,
          this.selectedUser
        );
        this.fetchUsers(); // Refresh the user list
        this.closeModal();
        this.updateConfirm = true;
        console.log(`User with ID ${this.selectedUser.id} has been updated.`);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    updateClose() {
      this.updateConfirm = false;
    },
    closeModal() {
      this.selectedUser = null; // Clear the selected user and close the modal
    },
    confirmDelete(user) {
      this.userToDelete = user;
      this.showDeleteModal = true;
    },
    async deleteUser(userId) {
      try {
        await axios.delete(`http://localhost:3001/users/${userId}`);
        this.fetchUsers(); // Refresh the user list
        this.closeDeleteModal();
        console.log(`User with ID ${userId} has been deleted.`);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.userToDelete = null;
    },
  },
};
</script>

<style scoped>
/* Styles for the modal */
.btn:hover {
  opacity: 0.9;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.save-btn {
  background-color: #007bff;
  color: white;
}

.btn-update {
  background-color: #007bff;
  color: white;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
}

.save-btn:hover,
.cancel-btn:hover {
  opacity: 0.9;
}

/* Modal animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Styles */
@media screen and (max-width: 600px) {
  .modal-content {
    padding: 20px;
    width: 90%;
  }
}
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 50px;
  border-radius: 8px;
}

.title {
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 50px;
}

.table-container {
  overflow-x: auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 8px;
}

.user-table th,
.user-table td {
  padding: 12px 15px;
  text-align: left;
}

.user-table th {
  background-color: #1a232d;
  color: white;
  font-weight: bold;
}

.user-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.user-table tbody tr:hover {
  background-color: #ddd;
}

.user-table tbody td {
  border-bottom: 1px solid #ddd;
}

.btn {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.update-btn {
  background-color: #007bff;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.user-table td {
  text-align: left;
  vertical-align: middle;
}

.user-table td:last-child {
  text-align: right;
  white-space: nowrap;
}

@media screen and (max-width: 600px) {
  .user-table {
    overflow-x: auto;
    display: block;
  }

  .user-table th,
  .user-table td {
    min-width: 100px;
  }
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-del {
  background: white;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}

.btns {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-confirm {
  background-color: #d9534f;
  color: white;
}

.btn-cancel {
  background-color: #5bc0de;
  color: white;
}
</style>
