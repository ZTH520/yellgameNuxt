<template>
  <div class="app">
    <div class="loading">
      <Spin fix v-if="loading">加载中...</Spin>
    </div>
    <div class="menu" v-if="isMenu" @click="showMenu">
      <div class="nav">
        <ul>
          <nuxt-link :to="{name:'index'}"><li>Recommendation</li></nuxt-link>
          <nuxt-link :to="{name:'ranking'}"><li>Ranking</li></nuxt-link>
        </ul>
      </div>
    </div>

    <div class="cookie" v-if="isCookie">
      <div class="ask">
        The site users cookies to remember whether you agreed on this visit to see any cookies on any future visit. Eh？
      </div>
      <div class="option">
        <div @click="changeCookie">NO</div>
        <div  @click="changeCookie" class="yes">YES</div>
      </div>
    </div>

    <header class="header">
      <div class="top">
        <div class="icon" @click="showMenu">
          <Icon type="md-menu"/>
        </div>
        <span>YellGame</span>
        <div class="icon share-icon" :data-clipboard-text="address" @click="share">
          <Icon type="md-share" />
        </div>
      </div>
      <ul class="bottom">
        <nuxt-link :to="{name:'index'}"><li>Recommendation</li></nuxt-link>
        <nuxt-link :to="{name:'ranking'}"><li>Ranking</li></nuxt-link>
      </ul>
    </header>

    <Carousel
      v-model="carvalue"
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow">
      <CarouselItem>
        <a href="./detail/Bubble%20Shooter%20Candy"><div class="banner"><img src="../static/bubble.jpg" width="100%" alt=""></div></a>
      </CarouselItem>
      <CarouselItem>
        <a href="./detail/Jumpanda"><div class="banner"><img src="../static/pander.jpg" width="100%" alt=""></div></a>
      </CarouselItem>

    </Carousel>
    <adsense
      ad-client="ca-pub-2363017877465244"
      ad-slot="7998248051"
      ad-style="display:block;text-align:center;"
      ad-format="auto"
      adFullwidth="true">
    </adsense>
    <div id="ad-1" style="text-align: center"></div>
    <div class="content">
      <div class="categorie" v-for="(game,index) in gameList" :key="index">
        <div class="title">
          <h2>{{game.name}}</h2>
          <div @click="toList(game.name)">More</div>
        </div>
        <div class="card-container">
          <div class="card" v-for="(detail,index) in game.game" :key="index" @click="toDetial(detail.name)">
            <div style="overflow:hidden;">
              <img v-lazy="detail.teaserBig" alt="games">
            </div>
            <p :title="detail.name">{{detail.name}}</p>
            <div class="card-b">
              <div class="cate">{{game.name}}</div>
              <div class="star">10.0<Icon type="md-star" class="stars" /></div>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>

    <footer>
      <h3>About Us</h3>
      <p>Enjoy with your friends.</p>
      <span>Copyright © 2018 Yellgame. All rights Reserved.</span>
      <ul>
        <a href="./useragreement.html"><li>Users Agreement</li></a>
        <div class="line"></div>
        <a href="./privacy.html"><li>Privacy Policy</li></a>
      </ul>
      <button @click="clearCookie">clear all cookie</button>
      <p class="small">
        Notice:the content is provided by the content developer . If there are any objections, please give us the original proof and we will remove it after verification.
      </p>
    </footer>
  </div>
</template>

<script>
  import Clipboard from 'clipboard';
  import api from '../plugins/axios'
  import VueAdsense from '@/components/VueAdsense'
  import { Icon,Carousel,CarouselItem ,Message,Spin} from 'iview'
export default {
  data(){
    return{
      address:"http://www.yellgame.com",
      isCookie: true,
      isMenu: false,
      loading: false,
      isPrivacy: false,
      carvalue: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 3500,
        dots: 'none',
        radiusDot: false,
        trigger: 'click',
        arrow: 'never'
      },
      gameList:[]
    }
  },
  components: {
    "adsense": VueAdsense,
    Icon,
    Carousel,
    CarouselItem,
    Spin
  },
  created(){
    this.loading=true;
  },
  asyncData(){
      return api.getIndexList().then(
        res => {
          function compare(prop) {
            return function (obj1, obj2) {
              let val1 = obj1[prop];
              let val2 = obj2[prop];
              if (val1 < val2) {
                return -1;
              } else if (val1 > val2) {
                return 1;
              } else {
                return 0;
              }
            }
          }
          return{gameList:JSON.parse(res.data).sort(compare("name"))}
        },
        err => {
          console.log("Get GameList Error!")
        }
      )
  },
  mounted(){
    let clipboard = new Clipboard('.share-icon');
    this.loading=false;
    if(this.getCookie("isCookie")){
      this.isCookie = !this.getCookie("isCookie")
    }
  },
  methods:{
    share(){
      this.$Message.success({
        content: 'Copied share link',
        duration: 3
      });
    },
    clearCookie(){
      this.delCookie("isCookie");
      this.$router.go(0);
    },
    delCookie(key) {
      let data = this.getCookie(key)
      if(data !== false){
        this.setCookie(key,data,-1);
      }
    },
    getCookie(key) {
      let data = document.cookie
      let startIndex = data.indexOf(key + '=')
      if(startIndex > -1) {
        startIndex = startIndex + key.length + 1
        let endIndex = data.indexOf(';', startIndex)
        endIndex = endIndex < 0 ? data.length : endIndex
        return decodeURIComponent(data.substring(startIndex,endIndex))
      }else {
        return ''
      }
    },
    toList(cate){
      this.$router.push({
        path:"/list/"+cate
        // name:"list",
        // params: { cate }
      })
    },
    toDetial(name){
      this.$router.push({
        path:"/detail/" + name
      })
    },
    setCookie(key,value,time) {
      let expire = time
      if(time == undefined) {
        expire = 2
      }
      let cur = new Date()
      cur.setTime(cur.getTime() + expire*3600*1000)
      document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + cur.toGMTString() + ";path=/;"
    },
    changeCookie(){
      this.isCookie = !this.isCookie;
      this.setCookie("isCookie",true,720);
    },
    showMenu(){
      this.isMenu = !this.isMenu
    },
  }
}
</script>

<style lang="less" scoped>
  @import "../assets/style/bass";
  .loading{
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top:0;
    z-index: 999;
  }
  .cookie{
    position: fixed;
    bottom: 10px;
    z-index: 100;
    width: 90%;
    left: 5%;
    box-shadow: rgba(71,74,79,.54) 0 0 10px;
    background: #fff;
    font-size: 12px;
    border-radius: 5px;
    padding: 10px;
    padding-bottom: 0;
    color: rgba(71,74,79,.54);
    text-align: center;
    .ask{
      border-bottom: 1px solid rgba(71,74,79,.2);
      padding-bottom: 10px;
    }
    .option{
      overflow: hidden;
      position: relative;
      div{
        width: 50%;
        float: left;
        padding: 5px 0;
        font-size: 14px;
        cursor: pointer;
      }
      .yes{
        color: #EFA408;
        &:before{
          width: 1px;
          height: 100%;
          top: 0;
          position: absolute;
          transform: scaleX(.5);
          display: inline-block;
          content: '';
          background: rgba(71,74,79,.2);
          left: 50%;
        }
      }

    }
  }
  .menu{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.5);
    z-index: 99;
    .nav{
      width: 60%;
      background: #fff;
      height: 100%;
      .pl(30);
      .pt(10);
      a{
        color: #474a4f;
      }
      li{
        .fs(16);
        .lh(60);
        cursor: pointer;
      }
    }
  }
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
      }
    }
    .bottom{
      color:rgba(255,255,255,.7);
      .h(48);
      .fs(14);
      a{
        color: #fff;
      }
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
  .banner{
    cursor: pointer;
  }
  .content{
    .categorie{
      .title{
        .pl(15);
        .pr(15);
        overflow: hidden;
        .mt(20);
        h2{
          float: left;
          .fs(20);
          border-left:solid #EFA408;
          .bw(4);
          .lh(20);
          .pl(8);
          color: #7e848c;
        }
        div{
          float: right;
          color: #EFA408;
          .fs(16);
          font-weight: bold;
          cursor: pointer;
        }
      }
      .card-container{
        // overflow: hidden;
        .card{
          width: 46%;
          margin-left: 2%;
          margin-right: 2%;
          box-shadow: 0 unit(1px / 37.5, rem) unit(6px / 37.5, rem) rgba(0,0,0,.117647);
          border-radius: unit(3px / 37.5, rem);
          .mt(8);
          .mb(8);
          .pl(10);
          .pr(10);
          .pt(10);
          .pb(10);
          float: left;
          img{
            width: 100%;

          }
          p{
            .fs(14);
            color: rgba(71,74,79,.87);
            .mt(10);
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
          .card-b{
            overflow: hidden;
            .mt(10);
            color: rgba(71,74,79,.54);
            .fs(10);
            .lh(14);
            .cate{
              float: left;
            }
            .star{
              float: right;
              .stars{
                color: #EFA408;
                .fs(14);
                position: relative;
                top: unit(-2px / 37.5, rem);
              }
            }
          }
        }
      }
    }
  }
  footer{
    background: #666;
    text-align: center;
    color: #fff;
    padding: unit(10px / 37.5, rem);
    .pt(20);
    .pb(20);
    h3{
      .fs(15);
      font-weight: normal;
      .lh(24);
    }
    p{
      .fs(12);
      .lh(24);
    }
    span{
      .fs(12);
      .lh(24);
    }
    ul{
      a{
        color: #fff;
      }
      li{
        .fs(12);
        .lh(24);
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
      }
      .line{
        display: inline-block;
        .w(2);
        .h(12);
        background: #fff;
        vertical-align: middle;
        .ml(4);
        .mr(4);
      }
    }
    button{
      padding: unit(10px / 37.5, rem);
      background: #fff;
      color: #000;
      .fs(12);
      border-radius: 5px;
      margin: 0 auto;
      .mt(10);
    }
    .small{
      line-height: 13px;
      font-size: 10px;
      color: #999;
      .mt(15);
    }
  }
</style>

