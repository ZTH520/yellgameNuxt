<template>
  <div class="app">

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

    <div class="content">
      <ul>
        <li @click="changeActive(0)" :class={active:activeList[0]}>Best ranking</li>
        <li @click="changeActive(1)" :class={active:activeList[1]}>Latest ranking</li>
        <li @click="changeActive(2)" :class={active:activeList[2]}>Hottest ranking</li>
      </ul>

      <adsense
        ad-client="ca-pub-2363017877465244"
        ad-slot="7998248051"
        ad-style="display:block;text-align:center;"
        ad-format="auto"
        adFullwidth="true">
      </adsense>

      <div class="game-con">

        <div class="best" v-if="activeList[0]">
          <a  v-for="(game,index) in bestList" :href="game.link" :key="index">
            <div class="game">
              <div><img :src="game.src" alt="h5 games,free game"></div>
              <div>
                <p>{{game.name}}</p>
                <p>10.0<Icon type="md-star" class="star icon" />&nbsp;&nbsp;&nbsp; {{game.num}}K+<Icon type="md-person" class="icon" /></p>
              </div>
              <i :class="['tag',{'tag-red':index<=2}]"></i>
              <span class="tag-con">{{index+1}}</span>
            </div>
          </a>
        </div>

        <div class="latest" v-if="activeList[1]">
          <a  v-for="(game,index) in latestList" :href="game.link" :key="index">
            <div class="game">
              <div><img :src="game.src" alt="h5 games,free game"></div>
              <div>
                <p>{{game.name}}</p>
                <p>10.0<Icon type="md-star" class="star icon" />&nbsp;&nbsp;&nbsp; {{game.num}}K+<Icon type="md-person" class="icon" /></p>
              </div>
              <i :class="['tag',{'tag-red':index<=2}]"></i>
              <span class="tag-con">{{index+1}}</span>
            </div>
          </a>
        </div>

        <div class="hottest" v-if="activeList[2]">
          <a  v-for="(game,index) in hottestList" :href="game.link" :key="index">
            <div class="game">
              <div><img :src="game.src" alt="h5 games,free game"></div>
              <div>
                <p>{{game.name}}</p>
                <p>10.0<Icon type="md-star" class="star icon" />&nbsp;&nbsp;&nbsp; {{game.num}}K+<Icon type="md-person" class="icon" /></p>
              </div>
              <i :class="['tag',{'tag-red':index<=2}]"></i>
              <span class="tag-con">{{index+1}}</span>
            </div>
          </a>
        </div>

      </div>
    </div>

    <footer>
      <h3>About Us</h3>
      <p>Enjoy with your friends.</p>
      <span>Copyright © 2018 Yellgame. All rights Reserved.</span>
      <ul>
        <a href="./useragreement.html"><li>Users Agreement</li></a>
        <div class="line"></div>
        <nuxt-link to="/privacy"><li>Privacy Policy</li></nuxt-link>
      </ul>
      <button @click="clearCookie">clear all cookie</button>
      <p class="small">
        Notice:the content is provided by the content developer . If there are any objections, please give us the original proof and we will remove it after verification.
      </p>
    </footer>
  </div>
</template>


<script>
  import api from '../plugins/axios'
  import VueAdsense from '@/components/VueAdsense'
  import Clipboard from 'clipboard';
  import { Icon } from 'iview'
  export default {
    data() {
      return {
        address:"http://www.yellgame.com",
        isCookie: true,
        isMenu: false,
        isPrivacy: false,
        gameList: [],
        activeList: [true, false, false],
        bestList: [
          {
            link: './detail/Garden Tales',
            src: 'http://www.yellgame.com/_nuxt/img/garden-tales.jpg',
            name: 'Garden Tales',
            num: '598'
          },
          {
            link: './detail/Cookie Crush 3',
            src: 'http://www.yellgame.com/_nuxt/img/cookie-crush-3.jpg',
            name: 'Cookie Crush 3',
            num: '572'
          },
          {
            link: './detail/Jewels Blitz 3',
            src: 'http://www.yellgame.com/_nuxt/img/jewels-blitz-3.jpg',
            name: 'Jewels Blitz 3',
            num: '564'
          },
          {
            link: './detail/Bubble Shooter HD',
            src: 'http://www.yellgame.com/_nuxt/img/bubble-shooter-hd.jpg',
            name: 'Bubble Shooter HD',
            num: '508'
          },
          {
            link: './detail/Candy Rain 5',
            src: 'http://www.yellgame.com/_nuxt/img/candy-rain-5.jpg',
            name: 'Candy Rain 5',
            num: '504'
          },
          {
            link: './detail/Forest Match',
            src: 'http://www.yellgame.com/_nuxt/img/forest-match.jpg',
            name: 'Forest Match',
            num: '478'
          },
          {
            link: './detail/Aqua Blitz 2',
            src: 'http://www.yellgame.com/_nuxt/img/aqua-blitz-2.jpg',
            name: 'Aqua Blitz 2',
            num: '465'
          },
          {
            link: './detail/Bubble Shooter Pro',
            src: 'http://www.yellgame.com/_nuxt/img/bubble-shooter-pro.jpg',
            name: 'Bubble Shooter Pro',
            num: '456'
          },
          {
            link: './detail/Butterfly Kyodai',
            src: 'http://www.yellgame.com/_nuxt/img/butterfly-kyodai.jpg',
            name: 'Butterfly Kyodai',
            num: '421'
          },
          {
            link: './detail/2020',
            src: 'http://www.yellgame.com/_nuxt/img/2020.jpg',
            name: '2020',
            num: '420'
          }
        ],
        latestList: [
          {
            link: './detail/Street Race',
            src: 'http://www.yellgame.com/_nuxt/img/street-race.jpg',
            name: 'Street Race',
            num: '572'
          },
          {
            link: './detail/Bubble Shooter Pro',
            src: 'http://www.yellgame.com/_nuxt/img/bubble-shooter-pro.jpg',
            name: 'Bubble Shooter Pro',
            num: '598'
          },
          {
            link: './detail/360 Connect',
            src: 'http://www.yellgame.com/_nuxt/img/360-connect.jpg',
            name: '360 Connect',
            num: '564'
          },
          {
            link: '.detail/Daily Jigsaw',
            src: 'http://www.yellgame.com/_nuxt/img/daily-jigsaw.jpg',
            name: 'Daily Jigsaw',
            num: '525'
          },
          {
            link: './detail/Garden Tales',
            src: 'http://www.yellgame.com/_nuxt/img/garden-tales.jpg',
            name: 'Garden Tales',
            num: '504'
          },
          {
            link: './detail/Solitaire Daily Challenge',
            src: 'http://www.yellgame.com/_nuxt/img/solitaire-daily-challenge.jpg',
            name: 'Solitaire Daily Challenge',
            num: '490'
          },
          {
            link: './detail/Aqua Blitz 2',
            src: 'http://www.yellgame.com/_nuxt/img/aqua-blitz-2.jpg',
            name: 'Aqua Blitz 2',
            num: '456'
          },
          {
            link: './detail/Daily Sudoku',
            src: 'http://www.yellgame.com/_nuxt/img/daily-sudoku.jpg',
            name: 'Daily Sudoku',
            num: '421'
          },
          {
            link: './detail/Bubble Shooter Candy',
            src: 'http://www.yellgame.com/_nuxt/img/bubble-shooter-candy.jpg',
            name: 'Bubble Shooter Candy',
            num: '465'
          },
          {
            link: './detail/Candy Mahjong',
            src: 'http://www.yellgame.com/_nuxt/img/candy-mahjong.jpg',
            name: 'Candy Mahjong',
            num: '423'
          }
        ],
        hottestList: [
          {
            link: './detail/Crazy%20Birds',
            src: 'http://www.yellgame.com/_nuxt/img/bird.jpg',
            name: 'Crazy Birds',
            num: '564'
          },
          {
            link: './detail/Jumpanda',
            src: 'http://www.yellgame.com/_nuxt/img/pander.jpg',
            name: 'Jumpanda',
            num: '598'
          },
          {
            link: './detail/Vanilla%20Pinball',
            src: 'http://www.yellgame.com/_nuxt/img/vanilla.jpg',
            name: 'Vanilla Pinball',
            num: '573'
          },
          {
            link: './detail/Alfy',
            src: 'http://www.yellgame.com/_nuxt/img/alfy.jpg',
            name: 'Alfy',
            num: '508'
          },
          {
            link: './detail/Down%20The%20Hill',
            src: 'http://www.yellgame.com/_nuxt/img/down.jpg',
            name: 'Down The Hill',
            num: '501'
          },
          {
            link: './detail/Stack%20Tower',
            src: 'http://www.yellgame.com/_nuxt/img/stack.jpg',
            name: 'Stack Tower',
            num: '478'
          },
          {
            link: './detail/Hover%20Jump',
            src: 'http://www.yellgame.com/_nuxt/img/hover.jpg',
            name: 'Hover Jump',
            num: '485'
          },
          {
            link: './detail/Monocycle',
            src: 'http://www.yellgame.com/_nuxt/img/monooycle.jpg',
            name: 'Monocycle',
            num: '456'
          },
          {
            link: './detail/Broadside',
            src: 'http://www.yellgame.com/_nuxt/img/broad.jpg',
            name: 'Broadside',
            num: '428'
          },
          {
            link: './detail/Bombs%20and%20Zombies',
            src: 'http://www.yellgame.com/_nuxt/img/bombs.jpg',
            name: 'Bombs and Zombies',
            num: '420'
          }
        ]
      };
    },

    mounted () {
      new Clipboard('.share-icon');
      this.getIndexList()
      if(this.getCookie("isCookie")){
        this.isCookie = !this.getCookie("isCookie")
      }
    },

    methods: {
      share () {
        this.$Message.success({
          content: 'Copied share link',
          duration: 3
        });
      },
      // 改变激活状态
      changeActive (num) {
        this.$set(this.activeList, 0, false)
        this.$set(this.activeList, 1, false)
        this.$set(this.activeList, 2, false)
        this.activeList[num] = true;
      },

      clearCookie () {
        this.delCookie("isCookie");
        this.$router.go(0);
      },

      delCookie (key) {
        let data = this.getCookie(key)
        if(data !== false){
          this.setCookie(key,data,-1);
        }
      },

      getCookie (key) {
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

      setCookie (key,value,time) {
        let expire = time
        if(time === undefined) {
          expire = 2
        }
        let cur = new Date()
        cur.setTime(cur.getTime() + expire*3600*1000)
        document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + cur.toGMTString() + ";path=/;"
      },

      changeCookie () {
        this.isCookie = !this.isCookie;
        this.setCookie("isCookie",true,720);
      },

      showMenu () {
        this.isMenu = !this.isMenu
      },

      toList (cate) {
        this.$router.push({
          name:"List",
          params: { cate }
        })
      },

      toDetial (name) {
        this.$router.push({
          path:"/detail/" + name
        })
      },

      getIndexList () {
        this.loading = true
        api.getIndexList().then(
          res => {
            this.gameList = JSON.parse(res.data).sort(this.compare("name"))
            this.loading = false
          },
          err => {
            console.log("Get GameList Error!")
          }
        )
      },

      compare (prop) {
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
      },

      showPrivacy (event) {
        event.preventDefault()
        this.isPrivacy=true
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


<style lang="less" scoped>
  @import '../assets/style/bass.less';
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
    ul{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: unit(10px / 37.5, rem);
      li{
        color: #EFA408;
        border: 2px solid #EFA408;
        padding: 2px 0;
        .w(105);
        .fs(14);
        text-align: center;
        border-radius: 5px;
      }
      .active{
        color: white;
        background: #EFA408;
      }
    }
    .game-con{
      padding:0 unit(8px / 37.5, rem);
      .best,.latest,.hottest{
        .game{
          padding: unit(14px / 37.5, rem);
          overflow: hidden;
          position: relative;
          div{
            float: left;
            img{
              .w(80);
            }
            p{
              .fs(16);
              color: #474a4f;
              .ml(8);
            }
            .icon{
              position: relative;
              top: -2px;
            }
            .star{
              color: #efa408;
            }
          }
          .tag{
            position: absolute;
            top: -20px;
            left: -20px;
            display: block;
            width: 0;
            height: 0;
            border-top: 20px solid #EFA408;
            border-right: 20px solid transparent;
            border-bottom: 20px solid transparent;
            border-left: 20px solid transparent;
            transform: rotate(-225deg);
            -webkit-transform: rotate(-225deg);
          }
          .tag-red{
            border-top-color: red;
          }
          .tag-con{
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 20px;
            text-align: center;
            font-size: 12px;
            font-weight: 700;
            color: #fff;
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
