<template lang="">
  <div class="border-b border-b-base-300 navbar bg-base-100">
    <div class="navbar-start">
      <div id="tel" class="block">
        <div class="drawer-content">
          <label for="my-drawer-4" class="drawer-button sm:hidden">
            <div
              tabindex="0"
              class="btn btn-ghost btn-circle hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
          </label>
        </div>
      </div>
    </div>

    <div class="flex-1 hidden md:block">
      <a class="btn btn-ghost text-xl">K-Blog</a>
    </div>
    <div class="flex-none gap-2">
      <div class="form-control">
        <input
          type="text"
          placeholder="Search"
          class="input input-bordered w-24 md:w-auto"
        />
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang=""></style>
