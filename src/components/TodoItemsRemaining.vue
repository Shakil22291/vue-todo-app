<template>
  <div>{{ remaining }} items remaining</div>
</template>

<script>
export default {
  name: "todo-remaining",
  props: {
    remaining: {
      type: Number,
      required: true
    }
  }
};
</script>

<style></style>
