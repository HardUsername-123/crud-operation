<template>
  <div class="about">
    <!-- User Form -->
    <form @submit.prevent="addUser" class="user-form">
      <div style="display: flex; justify-content: center; align-items: center">
        <h1>Add user</h1>
      </div>

      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          class="form-control"
        />
      </div>

      <button type="submit" class="btn btn-primary">Add User</button>
    </form>

    <!-- Feedback Message -->
    <p v-if="message" :class="messageClass">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
      },
      message: "",
      messageClass: "", // Add CSS class dynamically based on message type
    };
  },
  methods: {
    async addUser() {
      // Validate form fields
      if (!this.formData.name && !this.formData.email) {
        this.message = "Name and email fields cannot be empty";
        this.messageClass = "error-message";
        return;
      } else if (!this.formData.name) {
        this.message = "Name is required!";
        this.messageClass = "error-message";
        return;
      } else if (!this.formData.email) {
        this.message = "Email is required!";
        this.messageClass = "error-message";
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        if (response.ok) {
          this.message = "User added successfully";
          this.messageClass = "success-message"; // Define styles for success message
          // Optionally clear the form fields
          this.formData.name = "";
          this.formData.email = "";
        } else {
          this.message = "Failed to add user";
          this.messageClass = "error-message"; // Define styles for error message
        }
      } catch (error) {
        console.error("Error adding user:", error);
        this.message = "Failed to add user";
        this.messageClass = "error-message"; // Define styles for error message
      }
    },
  },
};
</script>

<style scoped>
.about {
  margin-top: 100px;
  font-family: Arial, sans-serif;
  display: grid;
  place-items: center;
}

.user-form {
  width: 400px;
  padding: 40px 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  margin-top: 30px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="email"],
button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
}

button {
  background-color: #1a232d;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #3b3f3b;
}

.success-message {
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  padding: 10px;
  border-radius: 5px;
}

.error-message {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 5px;
}
</style>
