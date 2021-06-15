<!-- SecondChild.vue（子） -->
<template>
  <form @submit.prevent="addText">
    <div>
      <label for="test">テキストを入力</label>
      <input type="text" name="test" id="test" v-model="inputText"/>
    </div>
    <button @click="addInputText">一覧にテキスト追加</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      inputText: null,
    }
  },
  methods: {
    addInputText() {
      this.$emit('input-text',this.inputText);
      this.inputText = '';
    }
  }
};
</script>
