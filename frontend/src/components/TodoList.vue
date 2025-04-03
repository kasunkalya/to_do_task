<template>
    <div class="container mt-5">
      <div class="row">   
        <div class="col-md-4 d-flex align-items-center">
          <div class="w-100 p-4">
            <h3 class="mb-3">Add a Task</h3>
            <form @submit.prevent="addTask">
              <div class="mb-3">
                <input v-model="title" class="form-control" placeholder="Title" required />
              </div>
              <div class="mb-3">
                <textarea v-model="description" class="form-control" placeholder="Description" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary w-100">Add</button>
            </form>
          </div>
        </div>
  
      
        <div class="col-md-1 d-flex align-items-center">
          <div class="vr"></div>
        </div>
  
        <div class="col-md-7">          
          <ul class="list-unstyled">
            <li v-for="task in tasks" :key="task.id" class="task-card">
              <div>
                <h5 class="task-title">{{ task.title }}</h5>
                <p class="task-desc">{{ task.description }}</p>
              </div>
              <button @click="markAsDone(task.id)" class="btn btn-outline-dark btn-sm">Done</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    data() {
      return {
        apiUrl: process.env.VUE_APP_API_URL,
        tasks: [],
        title: "",
        description: "",
        
      };
    },
    
    methods: {
      async fetchTasks() {
        try {
          const response = await axios.get(`${this.apiUrl}/tasks`);
          this.tasks = response.data;
        } catch (error) {
          Swal.fire("Error", "Failed to load tasks", "error");
        }
      },
      async addTask() {
            if (!this.title.trim() || !this.description.trim()) {
                Swal.fire("Validation Error", "Both fields are required!", "warning");
                return;
            }

            try {
                await axios.post(`${this.apiUrl}/tasks`, {
                title: this.title,
                description: this.description,
                });

                this.fetchTasks();
                this.title = "";
                this.description = "";

                Swal.fire({
                icon: "success",
                title: "Success",
                text: "Task added successfully!",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", () => {
                    Swal.stopTimer();
                    });
                    toast.addEventListener("mouseleave", () => {
                    Swal.resumeTimer();
                    });
                },
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to add task",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", () => {
                        Swal.stopTimer();
                        });
                        toast.addEventListener("mouseleave", () => {
                        Swal.resumeTimer();
                        });
                    },
                });
            }
        },
      async markAsDone(id) {
        try {
          await axios.patch(`${this.apiUrl}/tasks/${id}/done`);
          this.fetchTasks();
            Swal.fire({
                icon: "success",
                title: "Completed",
                text: "Task marked as done!",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", () => {
                    Swal.stopTimer();
                    });
                    toast.addEventListener("mouseleave", () => {
                    Swal.resumeTimer();
                    });
                },
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update task",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", () => {
                    Swal.stopTimer();
                    });
                    toast.addEventListener("mouseleave", () => {
                    Swal.resumeTimer();
                    });
                },
            });     
        }
      },
    },
    mounted() {      
      this.fetchTasks();
    },
  };
  </script>
  
  <style scoped>
  h3 {
    font-weight: bold;
  }
  input, textarea {
    border-radius: 8px;
    padding: 10px;
  }
  button {
    border-radius: 8px;
  }

  .vr {
    width: 2px;
    background-color: #ddd;
    height: 100%;
  }  

  .task-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #e0e0e0;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 10px;
  }
  .task-title {
    font-weight: bold;
  }
  .task-desc {
    color: #555;
    margin: 0;
  }
  </style>
  