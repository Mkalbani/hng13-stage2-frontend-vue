<template>
  <div :class="['max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8', className]">
    <slot />
  </div>
</template>

<script setup>
defineProps({ className: { type: String, default: '' } })
</script>
