/**
 * @name: iview
 * @description: nuxt中使用iview插件
 * @author: zp
 */
import Vue from 'vue'
import { Icon,Carousel,CarouselItem ,Message} from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(Icon)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Message)
Vue.prototype.$Message = Message
