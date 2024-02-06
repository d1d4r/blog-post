<template lang="">
  <div class="p-5 drawer-content">
    <main class="h-full">
      <router-view></router-view>
      <router-view name="MainContent"></router-view>
      <router-view name="ProfileView"></router-view>
      <router-view name="HowTo"></router-view>
      <router-view name="BookMarks"></router-view>
      <router-view name="BlogPost"></router-view>
      <router-view name="UserProfile"></router-view>
      <router-view name="Users"></router-view>
      <router-view name="CreatePost"></router-view>
    </main>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
