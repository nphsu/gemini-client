<template>
    <div class="global-header">
        <span class="global-header-label">Welcome to Gemini Application!</span>
    </div>
</template>

<script>
  export default {
    name: "GlobalHeader"
  }
</script>

<style scoped lang="scss">
    @import "../styles/colors";

    .global-header {
        background-color: $HEADER_BACKGROUND;
        height: 6.5vh;
    }
    .global-header-label {
        color: $HEADER_LABEL;
        font-weight: bold;
        line-height: 6.5vh;
    }
</style>