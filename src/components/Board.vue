<template>
  <div>
    <h1>クロンダイク</h1>
    <p>ソリティアのクロンダイクです。</p>
    
    <div id="gameboard">
      
      <!-- ゲームボード1段目 -->
      <div class="card_container" id="card_container__deck1">
        
        <!-- 山場 -->
        <CardArea
          v-model="cardDataList"
          :area-no=refEnum.CARD_AREA_NO.YAMABA
          @click="clickCardYamaba()"
          />
        
        <!-- 捨場 -->
        <CardArea
          v-model="dropDataList"
          :area-no=refEnum.CARD_AREA_NO.DROP
          />
        
        <!-- 非表示 -->
        <CardArea
          :draw-line=false
          :area-no=refEnum.CARD_AREA_NO.HIDDEN
           />
        
        <!-- 組札 -->
        <CardArea
          v-model="suitDataList[ 0 ]"
          :area-no=refEnum.CARD_AREA_NO.SUIT
          />
        <CardArea
          v-model="suitDataList[ 1 ]"
          :area-no=refEnum.CARD_AREA_NO.SUIT
          />
        <CardArea
          v-model="suitDataList[ 2 ]"
          :area-no=refEnum.CARD_AREA_NO.SUIT
          />
        <CardArea
          v-model="suitDataList[ 3 ]"
          :area-no=refEnum.CARD_AREA_NO.SUIT
          />

      </div>
      
      <!-- 場札 -->
      <div class="card_container" id="card_container__deck2">
        
        <CardArea
          v-for="(item, index) in fieldDataList"
          v-model="fieldDataList[ index ]"
          :area-no=refEnum.CARD_AREA_NO.STACK
          />
        
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
      
      // カードデータ構造 - 山札の内容
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

      // 捨札の内容（１段目左）
      dropDataList: new Array(),

      // 組札の内容（１段目右）
      suitDataList: new Array( 4 ),

      // 場札の内容（2段目）
      fieldDataList: new Array( 7 ),
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
      // 組札の初期化（１段目右）
      this.suitDataList = new Array( 4 );
      this.suitDataList[ 0 ] = [];
      this.suitDataList[ 1 ] = [];
      this.suitDataList[ 2 ] = [];
      this.suitDataList[ 3 ] = [];

      // 場札の初期化（2段目）
      this.fieldDataList = new Array( 7 );

      // カードデータの生成
      this.cardDataList = new Array();
      
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

      // 場札にカードを配る
      for( let i = 0; i < 7; i++ )
      {
          // 現在の場札の初期化
          this.fieldDataList[ i ] = [];

        for( let j = 0; j <= i; j++ )
        {
          let rndIdx = this.randRange( 0, this.cardDataList.length - 1 );

          let cardItem = this.cardDataList[ rndIdx ];

          // X座標
          cardItem.posx = i;
          
          // y座標
          cardItem.posy = j;
          
          // 最後の場合はカードを開ける
          cardItem.openflg = false;

          if(   i == j
            )
          {
            // 開けたことにする
            cardItem.openflg = true;
          }

          // 現在の場札に追加
          this.fieldDataList[ i ].push( cardItem );

          // 山札からデータを抜く
          this.cardDataList.splice( rndIdx, 1 );
        }
      }
//console.log( this.cardDataList );
//console.log( this.fieldDataList );
    },
    // ランダムにカードを選択
//    getRandCard: function()
//    {
//      let rndIdx = 0;
//      
//      // まだ空けていない一覧を探索
//      for( let i = 0; i < this.cardDataList.length; i++ )
//      {
//        rndIdx = this.randRange( 1, this.cardDataList.length - 1 );
//
//        // まだ空いていない場所を取得
//        if(   this.cardDataList[ rndIdx ].openflg == false
//          )
//        {
//          // 探索終了
//          break;
//        }
//      }
//      
//      // 探索場所のカードを返す
//      return this.cardDataList[ rndIdx ];
//    }, 
    // 範囲のランダム数
    randRange: function( min, max )
    {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // 山場のカードクリック時
    clickCardYamaba: function()
    {
      alert('yamaba click');
    },
  }
}
</script>


<style>
/* ゲームボード */
#gameboard {
  width: 860px;
  height: 1000px;
  
  background-color: green;
}

/* カードコンテナ */
.card_container
{
  display:flex;
}

</style>

