<template lang="">
  <div class="m-5 drawer-content">
    <main>
      <router-view></router-view>
      <router-view name="MainContent"></router-view>
      <router-view name="ProfileView"></router-view>
      <router-view name="HowTo"></router-view>
      <router-view name="BookMarks"></router-view>
      <router-view name="BlogPost"></router-view>
    </main>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
