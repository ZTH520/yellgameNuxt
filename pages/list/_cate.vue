<template>
  <div class="app">
    <header class="header">
      <div class="top">

        <div class="icon" @click="goback">
          <Icon type="md-arrow-back" />
        </div>

        <span>{{activeCate}}</span>

        <div class="icon share-icon" :data-clipboard-text="address" @click="share">
          <Icon type="md-share" />
        </div>

      </div>
    </header>
    <!-- google广告 -->
    <adsense
      ad-client="ca-pub-2363017877465244"
      ad-slot="7998248051"
      ad-style="display:block;text-align:center;"
      ad-format="auto"
      adFullwidth="true">
    </adsense>

    <div class="content">
      <div class="categorie">

        <div class="card-container">
          <div class="card" v-for="detail in gameList" :key="detail.id" @click="toDetial(detail.name)">

            <div style="overflow:hidden;">
              <img v-lazy="detail.teaserBig" alt="games">
            </div>

            <p :title="detail.name">{{detail.name}}</p>

            <div class="card-b">
              <div class="cate">{{activeCate}}</div>
              <div class="star">10.0<Icon type="md-star" class="stars" /></div>
            </div>

          </div>
        </div>

        <div class="clearfix"></div>
      </div>
    </div>

  </div>
</template>
<script>
  import VueAdsense from '@/components/VueAdsense'
  import Clipboard from 'clipboard';
  import { Icon } from 'iview'
  import api from '../../plugins/axios'
  export default {
    data() {
      return {
        address: 'http://www.yellgame.com',
        isMenu: false,
        loading: false,
        isPrivacy: false,
        gameList: []
      };
    },

    mounted () {
      new Clipboard('.share-icon');
    },

    computed: {
      activeCate: function() {
        this.getList(this.$route.params.cate)
        return this.$route.params.cate
      }
    },

    methods: {
      share () {
        this.$Message.success({
          content: 'Copied share link',
          duration: 3
        });
      },

      goback () {
        this.$router.go(-1);
      },

      toList (cate) {
        this.$router.push({
          name:"List",
          params: { cate }
        })
        this.isMenu = false
      },

      toDetial (name) {
        this.$router.push({
          path:"/detail/" + name
        })
      },

      getList (categories) {
        this.loading = true
        api.getList({categories: categories}).then(
          res => {
            this.gameList = JSON.parse(res.data)
            this.loading = false
          },
          err => {
            console.log("Get GameList Error!")
          }
        )
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
</style>
