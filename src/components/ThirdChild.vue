
<!-- ThirdChild.vue（子） -->
<template>
    <div>
  <ul>
    <li v-for="item in list" :key="item">{{ item }}</li>
  </ul>
    <button @click="exAddText">test</button>
    </div>
</template>

<script>
export default {
  props: ['fuga'],
  data() {
    return {
      list: this.fuga,
    }
  },
  methods: {
      exAddText: function() {
          
        const newText =  {
            id: new Date().toISOString(),
            text: 'test botan kara',
        };
        this.list.unshift(newText);
        
    //    this.$emit('fuga',this.list);
      }
  }
};
</script>
