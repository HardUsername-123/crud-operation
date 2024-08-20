<template>
  <div class="main">
    <nav class="navbar">
      <div class="container">
        <div class="logo">Crud Operation</div>
        <ul class="nav-links">
          <nav>
            <router-link to="/">List</router-link> |
            <router-link to="/about">Add</router-link>
          </nav>
        </ul>
        <div class="burger" @click="toggleNav">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    toggleNav() {
      const navLinks = document.querySelector(".nav-links");
      navLinks.classList.toggle("nav-active");
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Arial", sans-serif;
}

.main {
  background: #f5f5f5;
  margin: 0;
}

.navbar {
  width: 100%;
  background: linear-gradient(45deg, #000000, #88d3ce);
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  justify-content: space-around;
  width: 50%;
}

.nav-links li {
  position: relative;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  padding: 10px;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #ffcc00;
}

.burger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.burger span {
  height: 3px;
  width: 25px;
  background: #fff;
  margin: 4px;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .nav-links {
    position: absolute;
    right: 0;
    top: 60px;
    background-color: #6e45e2;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100vh - 60px);
    transform: translateX(100%);
    transition: transform 0.5s ease-in;
  }

  .nav-links.nav-active {
    transform: translateX(0%);
  }

  .burger {
    display: flex;
  }
}
</style>
