<template>
  <form class="hidden ml-md-3 mr-auto my-2 my-md-0 mw-100 sm:inline-block w-96">
    <div class="input-group flex relative flex-wrap items-stretch">
      <input
        type="text"
        class="bg-gray-50 border-0 flex-grow flex-shrink inline-block py-1 px-3 text-sm rounded-l-md focus:focus-visible:outline-none"
        placeholder="Search for..."
        aria-label="Search"
        aria-describedby="basic-addon2"
      />
      <div class="input-group-append flex">
        <button
          class="bg-primary text-white py-2 px-3 rounded-r-md"
          type="button"
        >
          <i class="fas fa-search fa-sm"></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "TopBarSearch"
};
</script>
