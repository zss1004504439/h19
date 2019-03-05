//获取当前page 的route 完整路径
export default {
  data() {
    return { 
      CurrentPageRoute : ""
    }
  },
  methods: {
    GetCurrentPageRouteHandler(){
      return this.$mp.page.route ? this.$mp.page.route : false
    }
  },
  onLoad(){
    if( this.GetCurrentPageRouteHandler() ){
      this.CurrentPageRoute = this.GetCurrentPageRouteHandler()
    }
  },
}
