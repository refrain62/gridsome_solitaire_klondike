import Vue from "vue";
import Vuex from "vuex";

import * as Enum from '~/common/Enum.js';                 // Enum定義

Vue.use( Vuex );

export default new Vuex.Store({
  // ----------------------------------------
  // STORE
  // ----------------------------------------
  state: {
      // カードデータ構造 - 山札の内容
      cardDataList: [
        {
          id: 1,
          suit: Enum.CARD_SUIT.SPADES,
          num: 1,
          posx: 1,
          posy: 1,
          openflg: false,
          clickflg: false,
        }
      ],

      // 捨札の内容（１段目左）
      dropDataList: new Array(),

      // 組札の内容（１段目右）
      suitDataList: new Array( 4 ),

      // 場札の内容（2段目）
      fieldDataList: new Array( 7 ),

      // 現在選択中のカード
      selCardItem: [],
  },
  // ----------------------------------------
  // MUTATIONS
  // ----------------------------------------
  mutations: {
    // ------------------------------
    // state setter
    // ------------------------------
    setCardDataList (state, payload) {
//      this.cardDataList = payload.cardDataList
      state.cardDataList = payload;
      
//console.log( 'setCardDataList' );
//console.log( payload );
//console.log( state.cardDataList );
    },
    setDropDataList (state, payload) {
      state.dropDataList = payload
    },
    setSuitDataList (state, payload) {
      state.suitDataList = payload
    },
    setFieldDataList (state, payload) {
      state.fieldDataList = payload
    },
    setSelCardItem (state, payload) {
      state.selCardItem = payload
    },
    // ------------------------------
    // ゲームの初期化
    // ------------------------------
    initGame (state, payload) {
//console.log('mutations - initGame');

      // 組札の初期化（１段目右）
      state.suitDataList = new Array( 4 );
      state.suitDataList[ 0 ] = [];
      state.suitDataList[ 1 ] = [];
      state.suitDataList[ 2 ] = [];
      state.suitDataList[ 3 ] = [];

      // 場札の初期化（2段目）
      state.fieldDataList = new Array( 7 );

      // --------------------
      // カードデータの生成
      // --------------------
      state.cardDataList = new Array();
      
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
          state.cardDataList.push( cardItem );
        }
      }
//console.log( state.cardDataList );

      // --------------------
      // 場札にカードを配る
      // --------------------
      for( let i = 0; i < 7; i++ )
      {
        // 現在の場札の初期化
        state.fieldDataList[ i ] = [];

        for( let j = 0; j <= i; j++ )
        {
          let min = 0
          let max = state.cardDataList.length - 1
          let rndIdx = Math.floor(Math.random() * (max - min + 1) + min)

          let cardItem = state.cardDataList[ rndIdx ];

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

          // 未選択
          cardItem.clickflg = false;

          // 現在の場札に追加
          state.fieldDataList[ i ].push( cardItem );

          // 山札からデータを抜く
          state.cardDataList.splice( rndIdx, 1 );
        }
      }
    },
    // ------------------------------
    // 山札から捨札にカードを移動
    // 引数1: めくる枚数
    // ------------------------------
    moveToDropCard (state, payload) {
//console.log('mutations - initGame');
  
      // 要素が無くなった場合は捨場から山場にカードを戻す
      if(   state.cardDataList.length <= 0
        )
      {
        while( state.dropDataList.length > 0 )
        {
          // 最後の要素を取得
          let cardItem = state.dropDataList.pop();

          // カードを閉じる
          cardItem.openflg = false;

          // 捨場の場札に追加
          state.cardDataList.push( cardItem );
        }
      }
      // それ以外は山場を崩す
      else
      {
        // 最後の要素を取得
        let cardItem = state.cardDataList.pop();

        // カードを開く
        cardItem.openflg = true;

        // 捨場の場札に追加
        state.dropDataList.push( cardItem );
      }
//      console.log( state.fieldDataList );
    },
    // ------------------------------
    // カードの選択中状態を全クリア
    // ------------------------------
    clearAllSelectCard (state, payload) {
      
      // 山札の内容
      if( state.cardDataList )
      {
        for( let cardItem of state.cardDataList )
        {
          cardItem.clickflg = false
        }
      }

      // 捨札の内容（１段目左）
      if( state.dropDataList )
      {
        for( let cardItem of state.dropDataList )
        {
          cardItem.clickflg = false;
        }
      }

      // 組札の内容（１段目右）
      if( state.suitDataList )
      {
        for( let cardItem of state.suitDataList )
        {
          cardItem.clickflg = false;
        }
      }

      // 場札の内容（2段目）
      if( state.fieldDataList )
      {
        for( let i = 0; i < 7; i++ )
        {
          for( let cardItem of state.fieldDataList[ i ] )
          {
            cardItem.clickflg = false;
          }
        }
      }
//console.log('clearAllSelectCard');
//console.log(state.fieldDataList);
    },
  },
  // ----------------------------------------
  // ACTIONS
  // ----------------------------------------
  actions: {
    // ------------------------------
    // ゲーム初期化
    // ------------------------------
    initGame (context)
    {
      // mutationを呼び出し
      context.commit('initGame')
    },
    // ------------------------------
    // 山札から捨札にカードを動かす
    // ------------------------------
    moveToDropCard(context)
    {
      // mutationを呼び出し
      context.commit('moveToDropCard')
    },
    // ------------------------------
    // カードの選択中状態を全クリア
    // ------------------------------
    clearAllSelectCard(context)
    {
      context.commit('clearAllSelectCard');
    },
  },
  // ----------------------------------------
  // GETTERS
  // ----------------------------------------
  getters: {
    // ------------------------------
    // state getter
    // ------------------------------
    getCardDataList: state => {
//console.log( 'getCardDataList' );
//console.log( state.cardDataList );
      return state.cardDataList
    },
    getDropDataList: state => {
      return state.dropDataList
    },
    getSuitDataList: state => {
      return state.suitDataList
    },
    getFieldDataList: state => {
      return state.fieldDataList
    },
    getSelCardItem: state => {
      return state.selCardItem
    },
  }
});

