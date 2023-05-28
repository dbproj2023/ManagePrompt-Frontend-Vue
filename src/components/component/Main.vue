<template>
  <div id="Main">
    <!-- <img src="../assets/img/그림1.png" class="full-image"> -->

  </div>
</template>



<style scoped>
div {
  flex: 1200px;
}
.card1{
  display: flex;
}
.mini-card{
  width: 300px;
  height: 130px;
  margin: 5px;
  border-radius: 20px;
}

.full-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<script>
export default {
name: "Main",
data() {
  return{
    
  }
}
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.div{
  background-color: white;
  /* F7F4FC */
}
</style>
