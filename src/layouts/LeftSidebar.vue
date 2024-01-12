<template lang="">
  <div class="drawer ">
    
    
    <slot></slot>
    <!-- <div class="drawer-content">
      Page content here
      <label for="my-drawer-4" class="drawer-button btn btn-primary"
        >Open drawer</label
      >
    </div> -->
    <div class="drawer-side">
      <label
        for="my-drawer-4"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
