<template>
  <div class="header">
    <div class="icon">
      <span v-if="isLoggedIn" class="material-symbols-outlined group-icon" :style="{ color: iconColor }" @click="showDropdown">group</span>
      <span v-else class="material-symbols-outlined">login</span>
      <span class="material-symbols-outlined arrow-icon" @click="showDropdown">arrow_drop_down</span>
      <ul v-if="isDropdownVisible" class="dropdown-menu">
        <li>마이페이지</li>
        <li>Logout</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.icon {
  position: fixed;
  top: 0;
  right: 0;
  padding-right: 50px;
  padding-top: 13px;
  font-size: 28px;
}
</style>

<script>
export default {
  name: "Header",
  data() {
    return {
      isDropdownVisible: false,
      iconColor: '#AAB1B8',
      isLoggedIn: false
    };
  },
  methods: {
    showDropdown: function() {
      this.isDropdownVisible = !this.isDropdownVisible;
      console.log(this.isDropdownVisible);
    },
  },
};
</script>

<style>
.group-icon {
  cursor: pointer;
}

.arrow-icon {
  cursor: pointer;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 8px;
  z-index: 1;
}

.dropdown-menu li {
  cursor: pointer;
  padding: 6px 12px;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}
</style>
