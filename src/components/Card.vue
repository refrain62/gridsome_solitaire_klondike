<template>
  <div
    class="card_detail_area"
    :style="getAreaStyle"
    >
    <!-- 場札の場合 -->
    <div
      class="card_detail"
      :style="getCardStyle"
      :draggable="getDraggable"
      @click="clickCardChange()"
      @dblclick="dbclickCard"
      >
<!--
      {{ cardSuit }}-{{ cardNumber }}
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
    // データ
    value: {
      type: Object,
      require: true,
    },
    // エリア番号
    areaNo: {
      type: Number,
      default: 0
    },
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

      isClick: false,
      
      box_width: 120,
      box_height: 130,
      card_level_height: 30,
    }
  },
  computed:{
    //template内ではcomputedを介する必要がある
    refEnum:()=>Enum,
    // 枠のスタイル
    getAreaStyle: function()
    {
      let strResult = '';
      
      // 場札の場合だけY軸をずらす
      if( Enum.CARD_AREA_NO.STACK == this.areaNo
        )
      {
        if(   this.posY > 0
            )
        {
          strResult = strResult + 'top:' + (this.posY * this.card_level_height) + 'px; ';
        }
      }

      strResult = strResult + 'z-index: ' + (100 + this.posY) + '; ';
//console.log( strResult );

//      if(   this.posX > 0
//          )
//      {
//        strResult = strResult + 'left:' + (-5 + this.box_width * (this.posX - 1))  + 'px;';
//      }

//      if(   this.posY >= 0
//          )
//      {
//        strResult = strResult + 'top:' + (15 + this.box_height + (this.card_level_height * this.posY))  + 'px; z-index: ' + (100 + this.posY) + '; ';
//      }
      
      return strResult;
    },
    // カードのスタイル
    getCardStyle: function()
    {
      let strResult = '';
      let strCardFileName = '';
      
      let cardPrefix　= [ 'z', 's', 'h', 'c', 'd' ];    // 画像の先頭文字

      // 画像が開いていない場合
      if(   this.isOpen == false
        )
      {
        // 裏の画像
        strCardFileName = 'z01.png';        // 黒
//        strCardFileName = 'z02.png';        // 赤
      }
      // 開いている画像を表示
      else
      {
        // ファイル名
        strCardFileName = cardPrefix[ this.cardSuit ] + ("0" + this.cardNumber).slice(-2) + '.png';
      }

      // 画像の指定
      strResult = strResult + "background-image: url('./trump/" + strCardFileName + "'); ";

      // 画像をフィット
      strResult = strResult + "background-size: cover; ";
      
      // クリック時の選択状態
      if(   this.isClick == true
        )
      {
        strResult = strResult + "opacity: 0.9; border: 3px solid blue; box-shadow: 5px 5px 5px rgba(0,0,0,0.5);";
      }
//console.log(strResult)

      return strResult;
    },
    // ドラッグの状態
    getDraggable: function()
    {
      // 場札と捨札の場合だけドラッグOK
      return (  Enum.CARD_AREA_NO.STACK == this.areaNo
              ||  Enum.CARD_AREA_NO.DROP == this.areaNo
              )
    }
  },
  methods: {
    // カードクリック時
    clickCardChange: function()
    {
      // 場札の場合だけ
      if( Enum.CARD_AREA_NO.STACK == this.areaNo
        ||  Enum.CARD_AREA_NO.DROP == this.areaNo
        )
      {
console.log('clickCardChange')
        // フラグを反転して設定
        this.isClick = this.isClick == true ? false : true;
      }
      
      // 結果を上に伝える
      this.value.clickflg = this.isClick
      this.$emit("input", this.value);

      // カードの選択中を全クリア
      this.$store.dispatch('clearAllSelectCard');

      // storeに選択中のカードとして設定
      if(   this.value.clickflg == true
        )
      {
        this.$store.commit('setSelCardItem', this.value);
      }

    },
    // カードダブルクリック時
    dbclickCard: function()
    {
      // 場札の場合だけ
      if( Enum.CARD_AREA_NO.STACK == this.areaNo
        ||  Enum.CARD_AREA_NO.DROP == this.areaNo
        )
      {
console.log('dbclickCard')
        // 現在のカードを選択中にする
        this.$store.commit('setSelCardItem', this.value);

        // 選択中のカードが組札に移動できるなら移動
        this.$store.dispatch('selectCardToSuitArea');
      }
    },
  }
}
</script>


<style>
/* カード置き場 */
.card_detail_area {
  width: 100px;
  
  position: absolute;
}

/* カード内容 */
.card_detail {
  width: 100px;
  height: 150px;
  margin: 22px 10px;

  border: 1px solid lightblue;
  border-radius: 8px;
  
  background-color: white;
}
</style>

