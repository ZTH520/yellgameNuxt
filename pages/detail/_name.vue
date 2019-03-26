<template slot="title">
  <div class="app">
    <header class="header">
      <div class="top">
        <div class="icon" @click="goback">
          <Icon type="md-arrow-back" />
        </div>
        <span>{{activeName}}</span>
        <div class="icon share-icon" :data-clipboard-text="address" @click="share">
          <Icon type="md-share" />
        </div>
      </div>
    </header>
    <div class="content">
      <div class="box main">
        <img :src="gameDetail.teaserBig" alt="">
        <br>
        <div class="tag" v-for="(citem,cindex) in gameDetail.categories" :key="citem.id" @click="toList(citem)" v-if="cindex == 1">{{citem}}</div>
        <h3>{{activeName}}</h3>
        <div class="starts">
          <Icon type="md-star" />
          <Icon type="md-star" />
          <Icon type="md-star" />
          <Icon type="md-star" />
          <Icon type="md-star" />
          <span>10.0</span>
        </div>
        <adsense
          ad-client="ca-pub-2363017877465244"
          ad-slot="9792521936"
          ad-style="width:100%;display:block;text-align:center;margin-top:10px"
          ad-format="fluid"
          adLayout="in-article">
        </adsense>
        <div id="ad-2" style="text-align: center"></div>
      </div>
      <div class="box like">
        <h4>You might like</h4>
        <div class="games-con">
          <div class="games" v-for="detail in gameRecommond" :key="detail.name" @click="toDetial(detail.name)">
            <div><img :src="detail.teaserBig" alt="games"></div>
            <div :title="detail.name" class="name">{{detail.name}}</div>
            <div class="play-btn">PLAY</div>
          </div>
        </div>
      </div>
      <adsense
        ad-client="ca-pub-2363017877465244"
        ad-slot="8023967086"
        ad-style="display:block;margin-top:10px"
        ad-format="auto"
        adFullwidth="true">
      </adsense>
      <div class="box cate">
        <h4>Categories</h4>
        <div v-for="(citem,cindex) in gameDetail.categories" :key="citem.id" @click="toList(citem)" v-if="cindex != 0">{{citem}}</div>
      </div>
      <div class="box discription">
        <h4>Introduction</h4>
        <p>{{gameDetail.description}}</p>
      </div>
      <div class="box detail">
        <h4>Details</h4>
        <div>
          <p>Version:</p>
          <p>1.0.0</p>
        </div>
        <div>
          <p>Update time:</p>
          <p>2018-11-23</p>
        </div>
      </div>
      <div class="box" style="text-align: center" id="ad-3">

      </div>
      <button @click="goGame(activeName)">PLAY</button>
    </div>
  </div>
</template>
<script>
  import api from '../../plugins/axios'
  import VueAdsense from '@/components/VueAdsense'
  import Clipboard from 'clipboard';
  // import postscribe from 'postscribe';
  import { Icon } from 'iview'
  export default {
    data() {
      return {
        address:"http://www.yellgame.com",
        isMenu: false,
        loading: false,
        isPrivacy: false,
        gameDetail: [],
        gameRecommond: []
      }
    },
    mounted(){
      new Clipboard('.share-icon');

    },
    methods: {
      share(){
        this.$Message.success({
          content: 'Copied share link',
          duration: 3
        });
      },
      goGame(name){
        this.$router.push({
          path:"/game/"+name
        })
      },
      goback(){
        this.$router.go(-1);
      },
      toList(cate){
        this.$router.push({
          path:"/list/"+cate
        })
      },
      getData(name) {
        this.loading = true
        let arr = [
          this.getDetail(name),
          this.getRecommond(name)
        ]
        Promise.all(arr).then(
          res => {
            this.loading = false
            this.gameDetail = JSON.parse(res[0])[0]
            this.gameRecommond = JSON.parse(res[1]).slice(1,5)
          }
        )
      },
      getDetail(name) {
        return new Promise((resolve,reject) => {
          api.getDetail({name: name}).then(
            res => {
              resolve(res.data)
              // this.detailList = JSON.parse(res.data)
            },
            err => {
              console.log("Get getDetail Error!")
            }
          )
        })
      },
      getRecommond(name) {
        return new Promise((resolve,reject) => {
          api.getRecommond({name: name}).then(
            res => {
              resolve(res.data)
              // this.recommondList = JSON.parse(res.data)
            },
            err => {
              console.log("Get getRecommond Error!")
            }
          )
        })
      },
      showPrivacy(event){
        event.preventDefault()
        this.isPrivacy=true
      },
      toDetial(name){
        this.$router.push({
          path:"/detail/" + name
        })
      }

    },
    computed: {
      activeName: function() {
        this.getData(this.$route.params.name)
        return this.$route.params.name
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    components: {
      "adsense": VueAdsense,
      Icon
    }
  }
</script>

<style scoped lang="less">
  @import '../../assets/style/bass.less';
  .header{
    background: #EFA408;
    color: #fff;
    .top{
      text-align: center;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      .pl(20);
      .pr(20);
      .fs(28);
      .h(56);
      .icon{
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
        cursor: pointer;
      }
      span{
        .fs(22);
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
    .bottom{
      color:rgba(255,255,255,.7);
      .h(48);
      .fs(14);
      li{
        .mt(16);
        display: inline-block;
        vertical-align: middle;
        width: 50%;
        text-align: center;
        margin-right: -4px;
        cursor: pointer;
      }
    }
  }
  .content{
    background: #f5f5f5;
    padding: unit(8px / 37.5, rem);
    .box{
      margin: 0 auto;
      background: #fff;
      border-radius: 2px;
      overflow: hidden;
      box-shadow: 0 1px 6px rgba(0,0,0,.117647);
      padding: unit(8px / 37.5, rem);
      .mt(2);
      h4{
        padding-left: 10px;
        border-left: 4px solid rgba(0,0,0,.54);
        font-size: 18px;
        height: 21px;
        line-height: 21px;
        color: #7e848c;
        font-weight: 700;
        letter-spacing: normal;
        margin-top: 0;
        text-align: left;
      }
    }
    .main{
      text-align: center;
      img{
        width: 60%;
      }
      .tag{
        margin: 0 auto;
        display: inline-block;
        padding: 2px 10px;
        background: #EFA408;
        color: #fff;
        border-radius: 30px;
        .fs(12);
        .mt(5);
      }
      h3{
        .fs(16);
        font-weight: normal;
        .mt(5);
      }
      .starts{
        .fs(18);
        span{
          position: relative;
          top: 2px;
        }
      }
    }
    .like{
      .games-con{
        .games{
          .mt(10);
          overflow: hidden;
          div{
            float: left;
          }
          img{
            .w(80);
          }
          .name{
            .lh(48);
            .ml(5);
            .fs(14);
            font-weight: bold;
          }
          .play-btn{
            .lh(24);
            float: right;
            padding: 0 10px;
            background: #EFA408;
            color: #fff;
            border-radius: 5px;
            .mt(12);
            cursor: pointer;
          }
        }
      }
    }
    .cate{
      div{
        float: left;
        color: #EFA408;
        border: 2px solid #EFA408;
        border-radius: 5px;
        .mr(5);
        padding: 2px 10px;
        margin-top: 10px;
        .fs(14);
      }
    }
    .discription{
      p{
        // padding: 16px;
        text-indent: 10px;
        .fs(14);
        color: #474a4f;
        .mt(5);
      }
    }
    .detail{
      overflow: hidden;
      div{
        width: 50%;
        float: left;
        .mt(10);
        .fs(14);
        p{
          &:first-child{
            color:#7e848c;
          }
        }
      }
    }
    button{
      color: white;
      background: #EFA408;
      width: 50%;
      margin: 0 auto;
      .lh(36);
      .fs(16);
      .mt(30);
      .mb(50);
      border-radius: 50px;
      text-align: center;
      // transform: translate(0,-90%);
      animation: scales .5s infinite linear;
      -webkit-animation: scales .5s infinite linear;
    }
  }
  @keyframes scales{
    0%, 100% {
      transform: scale(1);
    }

    25%, 75% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1.2);
    }
  }
</style>
