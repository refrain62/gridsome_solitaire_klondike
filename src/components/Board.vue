<template>
  <div>
    <h1>クロンダイク</h1>
    <p>ソリティアのクロンダイクです。</p>
    
    <div id="gameboard">
      
      <!-- 画面に表示するカード - absolute配置 -->
      <card
        v-for="cardItem in cardDataList"
        :key="cardItem.id"
        
        :card-suit=cardItem.suit
        :card-number=cardItem.num
        :pos-x=cardItem.posx
        :pos-y=cardItem.posy
        :is-open=cardItem.openflg
        />
<!--
      <card
        :card-suit=refEnum.CARD_SUIT.SPADES
        :card-number=1
        />
      <card
        :card-suit=refEnum.CARD_SUIT.HARTS
        :card-number=2
        />
      <card
        :card-suit=refEnum.CARD_SUIT.CLUBS
        :card-number=3
        />
      <card
        :card-suit=refEnum.CARD_SUIT.DIAMONDS
        :card-number=4
        />
      <card
        :card-suit=refEnum.CARD_SUIT.SPADES
        :card-number=5
        />
-->
      <!-- ゲームボード1段目 -->
      <div class="card_container" id="card_container__deck1">
        
        <!-- 山場 -->
        <CardArea />
        
        <!-- 捨場 -->
        <CardArea
           />
        
        <!-- 非表示 -->
        <CardArea
          :draw-line=false
           />
        
        <!-- 組札 -->
        <CardArea />
        <CardArea />
        <CardArea />
        <CardArea />
      
      </div>
      
      <!-- 場札 -->
      <div class="card_container" id="card_container__deck2">
        
        <CardArea />
        <CardArea />
        <CardArea />
        <CardArea />
        <CardArea />
        <CardArea />
        <CardArea />
        
      </div>
      
    </div>
    
  </div>
</template>

<script>
// Vue.jsでEnumのようなモノを作る
// https://qiita.com/wonohe/items/9a52ebdeca685a6de17e
import * as Enum from '~/common/Enum.js';                 // Enum定義

import CardArea from '~/components/CardArea.vue'          // カード置き場の枠
import Card from  '~/components/Card.vue'                 // カード自体

export default {
  name: 'Board',
  // コンポーネント利用定義
  components: {
    CardArea,
    Card
  },
  data() {
    return {
      message: "game board",
      
      // カードデータ構造
      cardDataList: [
                      {
                        id: 1,
                        suit: Enum.CARD_SUIT.SPADES,
                        num: 1,
                        posx: 1,
                        posy: 1,
                        openflg: false,
                      }
                    ],
    }
  },
  // ロード時
  mounted() {
    // ゲームを初期化
    this.initGame();
  },
  computed:{
    //template内ではcomputedを介する必要がある
    refEnum:()=>Enum,
  },
  methods: {
    // ゲームの初期化
    initGame: function()
    {
      // カードデータの初期化
      this.cardDataList = [];
      
      for( let i = 1; i <= 4; i++ )
      {
        for( let j = 1; j <= 13; j++ )
        {
          let cardItem = {};
          
          // ID
          cardItem.id = i * 100 + j;
          
          // カードのマーク
          cardItem.suit = i;
          
          // カードの番号
          cardItem.num = j;
          
          // 座標
          cardItem.posx = 0;
          cardItem.posy = 0;
          
          // カードカードが開いているか
          cardItem.openflg = false;
          
          
          // リストに追加
          this.cardDataList.push( cardItem );
        }
      }
      
      
      // カードを配る
      // デッキの横軸
      for( let i = 1; i <= 7; i++ )
      {
        for( let j = i; j <= 7; j++ )
        {
          let card = this.getRandCard();
          
          // X座標
          card.posx = j;
          
          // y座標
          card.posy = i;
          
          // 開けたことにする
          card.openflg = true;
        }
      }
      
    },
    // ランダムにカードを選択
    getRandCard: function()
    {
      let rndIdx = 0;
      
      // まだ空けていない一覧を探索
      for( let i = 0; i < this.cardDataList.length; i++ )
      {
        rndIdx = this.randRange( 1, this.cardDataList.length - 1 );

        // まだ空いていない場所を取得
        if(   this.cardDataList[ rndIdx ].openflg == false
          )
        {
          // 探索終了
          break;
        }
      }
      
      // 探索場所のカードを返す
      return this.cardDataList[ rndIdx ];
    }, 
    // 範囲のランダム数
    randRange: function( min, max )
    {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
  }
}
</script>


<style>
/* ゲームボード */
#gameboard {
  width: 860px;
  height: 800px;
  
  background-color: green;
  
  position: relative;
}

/* カードコンテナ */
.card_container
{
  display:flex;
}

</style>

