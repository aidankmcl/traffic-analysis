<template>
  <div>{{ data }}</div>
</template>

<script>
export default {
  props: {
    fromTime: Number,
    toTime: Number,
    data: Object
  }
}
</script>
