<template>
  <div
    class="card_detail_area"
    :style="getStyle"
    >
    <div
      class="card_detail"
      draggable="true"
      >
      {{ cardSuit }}-{{ cardNumber }}
<!--
      <br>{{ posX }}-{{ posY }}
      <br>{{getStyle}}
-->
    </div>
  </div>
</template>

<script>
import * as Enum from '~/common/Enum.js';                 // Enum定義

export default {
  name: 'Card',
  props: {
    // カードの種別
    cardSuit: {
      type: Number
    },
    // カードの番号
    cardNumber: {
      type: Number
    },
    // 下のデッキのX軸
    posX: {
      type: Number
    },
    // 下のデッキのY軸
    posY: {
      type: Number
    },
    // カードが開いているかどうか
    isOpen: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      message: "card detail",
      
      box_width: 120,
      box_height: 130,
      card_level_height: 30,
    }
  },
  computed:{
    //template内ではcomputedを介する必要がある
    refEnum:()=>Enum,
    getStyle: function()
    {
      let strResult = '';
      
      if(   this.posX > 0
          )
      {
        strResult = strResult + 'left:' + (-5 + this.box_width * (this.posX - 1))  + 'px;';
      }
      
      if(   this.posY > 0
          )
      {
        strResult = strResult + 'top:' + (15 + this.box_height + (this.card_level_height * this.posY))  + 'px; z-index: ' + (100 + this.posY) + '; ';
      }
      
      return strResult;
    },
  },
  methods: {
    
  }
}
</script>


<style>
/* カード置き場 */
.card_detail_area {
  width: 90px;
  padding: 20px 20px;
  
  position: absolute;
}

/* カード内容 */
.card_detail {
  width: 100%;
  height: 130px;
  
  border: 3px solid lightblue;
  border-radius: 8px;
  
  background-color: white;
}
</style>

