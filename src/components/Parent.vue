<!-- Vue.jsでのコンポーネント間データ受け渡しについて勉強してみた -->
<!-- https://concrete5.co.jp/blog/vuejs-1 -->

<!-- Parent.vue（親） -->
<template>
  <div class="top">
    <first-child :hoge="title"></first-child>
    <second-child @input-text="addText"></second-child>
    <third-child :fuga="textList"></third-child>
    {{textList}}
  </div>
</template>

<script>
import FirstChild from '~/components/FirstChild.vue';
import SecondChild from '~/components/SecondChild.vue';
import ThirdChild from '~/components/ThirdChild.vue';

export default {
  components: {
    FirstChild,
    SecondChild,
    ThirdChild
  },
  data() {
    return {
      title: 'ボタンを押してテキストを一覧に追加',
      textList: [],
    }
  },
  methods: {
    addText(value) {
      const newText =  {
          id: new Date().toISOString(),
          text: value,
      };
      this.textList.unshift(newText);
    }
  }
}
</script>
