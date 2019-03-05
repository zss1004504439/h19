import request from '@/common/request'
import { getSign } from '@/common/util'

export default {
  //首页获取推荐内容接口
  //  getHomeData() {
  //    return new Promise((resolve, reject) => {
  //      request.get('/home').then(response => {
  //        resolve(response)
  //      })
  //    })
  //  },
  async getHomeData(){
    let data = await request.get("/home");
    return data;
  },
  //首页搜索
  async getSearchData(query){
    let _url = '/home/find';
    let _sign = getSign(_url,query)
    let _query = Object.assign(query,{
      sign : _sign
    })
    let data = await request.get(_url,_query);
    return data;
  },
  //搜索页面热门搜索接口
  async getHotSearchData(){
    let data = await request.get("/home/hot/search/word");
    return data;
  },
};