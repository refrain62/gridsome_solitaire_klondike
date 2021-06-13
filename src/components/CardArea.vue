<template>
  <div class="card_area">

    <!-- 場札に表示するカード - absolute配置 -->
    <card
      v-for="(cardItem, index) in value"
      :key="cardItem.id"
      
      v-model="value[ index ]"
      :area-no=areaNo
      :card-suit=cardItem.suit
      :card-number=cardItem.num
      :pos-x=areaNo
      :pos-y=index
      :is-open=cardItem.openflg
      :parent-list.sync="value"
      />
    
    <!-- 枠表示の場合 -->
    <div
      class="card_area_line"
      v-if="drawLine == true"
      >
    </div>
  
    <!-- 枠非表示の場合 -->
    <div
      class="card_area_line_none"
      v-if="areaNo == refEnum.CARD_AREA_NO.HIDDEN"
      >
    </div>

  </div>
</template>

<script>
import * as Enum from '~/common/Enum.js';                 // Enum定義
import Card from  '~/components/Card.vue'                 // カード自体

export default {
  name: 'CardArea',
  // コンポーネント利用定義
  components: {
    Card,
  },
  props: {
    // データ
    value: {
      type: Array,
      require: true,
    },
    // エリア番号
    areaNo: {
      type: Number,
      default: 0
    },
    // 線を引くかどうか
    drawLine: {
      type: Boolean,
      default: true
    },
  },
  computed:{
    //template内ではcomputedを介する必要がある
    refEnum:()=>Enum,
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
  position: relative;
}

/* カード置き場の枠 */
.card_area_line {
  width: 100px;
  height: 150px;
  margin: 20px 8px;
  
  border: 3px solid lightblue;
  border-radius: 8px;
  
  z-index: 10;
}

/* カード置き場の枠なし版 */
.card_area_line_none {
  width: 100px;
  height: 150px;
  margin: 20px 8px;
  
  z-index: 10;
}
</style>

