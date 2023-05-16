<template>
  <div>
    <b-nav>
      <b-nav-item-dropdown class="float-right">
      <!-- Using 'button-content' slot -->
      <template #button-content><em>User</em></template>
      <b-dropdown-item href="#">Profile</b-dropdown-item>
      <b-dropdown-item href="#">Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
  </div>
</template>

<style scoped>
div {
  position: sticky;
  height: 50px;
  border-bottom: 1px solid #ebebeb;
}
.float-right {
    position: sticky;}
</style>

<script>
export default {
  name: "Header",
  data() {
  }
};
</script>