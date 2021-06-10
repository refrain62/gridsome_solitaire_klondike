<template>
  <div class="card_area">
    <div
      class="card_area_line"
      v-if="drawLine == true"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardArea',
  props: {
    // 線を引くかどうか
    drawLine: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      message: "card area"
    }
  },
  methods: {
    
  }
}
</script>


<style>
/* カード置き場 */
.card_area {
  width: 90px;
  padding: 20px 15px;
}

/* カード置き場の枠 */
.card_area_line {
  width: 100%;
  height: 130px;
  
  border: 3px solid lightblue;
  border-radius: 8px;
}
</style>

