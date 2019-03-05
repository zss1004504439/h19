import md5 from 'js-md5';
//获取环境接口地址
import {envHost} from '@/common/env';

//格式化金额
function formatMoney(volume) {
  //输入单位为分
  let flag = 1
  if (volume < 0) {
    flag = -1;
    volume = -volume;
  }
  volume = volume / 100; //转为元
  if (volume > 1e6) {
    return flag * (volume / 1e6).toFixed(2) + '百万'
  } else if (volume > 1e4) {
    return flag * (volume / 1e4).toFixed(2) + '万'
  } else {
    return flag * volume.toFixed(2)
  }
}
//格式化时间
function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }
  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time
  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

//格式化坐标 
function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }
  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)
  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}
//日期时间
var dateUtils = {
  UNITS: {
    '年': 31557600000,
    '月': 2629800000,
    '天': 86400000,
    '小时': 3600000,
    '分钟': 60000,
    '秒': 1000
  },
  humanize: function (milliseconds) {
    var humanize = '';
    for (var key in this.UNITS) {
      if (milliseconds >= this.UNITS[key]) {
        humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
        break;
      }
    }
    return humanize || '刚刚';
  },
  format: function (dateStr) {
    var date = this.parse(dateStr)
    var diff = Date.now() - date.getTime();
    if (diff < this.UNITS['天']) {
      return this.humanize(diff);
    }
    var _format = function (number) {
      return (number < 10 ? ('0' + number) : number);
    };
    return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' + _format(
      date.getHours()) + ':' + _format(date.getMinutes());
  },
  parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
    var a = str.split(/[^0-9]/);
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
  }
};
//地图
var mapUtils = {
  toRad: function (d) {
    return d * Math.PI / 180;
  },
  //计算地球上两个点之间的测地距离
  getDistance: function (lat1, lng1, lat2, lng2) {
    // lat为纬度,
    // lng为经度,
    let radLat1 = this.toRad(lat1);
    let radLat2 = this.toRad(lat2);
    let deltaLat = radLat1 - radLat2;
    let deltaLng = this.toRad(lng1) - this.toRad(lng2);
    let dist = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) *
      Math.pow(Math.sin(deltaLng / 2), 2)));
    return dist * 6378137;
    //alert(  getDistance(39.91917,116.3896,39.91726,116.3940) );
  },
  formatedDistance: function (distance) {
    if (distance > 1000) {
      return (distance / 1000).toFixed(2) + '公里'
    } else {
      return Math.round(distance) + '米'
    }
  }
}
//uni upx单位换算
var uniUtils = {
  upx2px: function (upx) {
    return uni.getSystemInfoSync().windowWidth / 750 * upx
  }
}






/**
 * Created by EalenXie on 2018/6/13 15:11
 */

/**
 * @param requestParams 请求参数(POST的JSON参数)
 * @returns {string} 获取签名
 */

 /**
 * @param url 请求的url
 * @returns {{}} 将url中请求参数组装成json对象(url的?后面的参数)
 */
function parseQueryString(url) {
  var urlReg = /^[^\?]+\?([\w\W]+)$/,
      paramReg = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
      urlArray = urlReg.exec(url),
      result = {};
  if (urlArray && urlArray[1]) {
      var paramString = urlArray[1], paramResult;
      while ((paramResult = paramReg.exec(paramString)) != null) {
          result[paramResult[1]] = paramResult[2];
      }
  }
  // console.log(result,'//parseQueryString result')
  return result;
}



function getSign(url,requestParams) {
  var _url = envHost+url;
  console.log(url,requestParams,'url,requestParams');
  
  var signString = "";
  var urlParams = parseQueryString(url);
  // console.log(url,'//=>url')
  // console.log(parseQueryString(url),'//=>urlParams')
  // console.log(requestParams,'//=>requestParams')
  var requestBody = sortObject(mergeObject(urlParams, requestParams));
  // console.log(requestBody,'//=>requestBody')
  for (var i in requestBody) {
      signString += i + requestBody[i];
  }
  // console.log(requestParams,'//=>请求参数')
  // console.log(signString,'//=>加密前的字符串')
  return md5.hex(signString).toUpperCase();
}

export function getMD5res(obj) {
  return md5.hex(obj).toUpperCase();
}


/**
* @param object 传入要进行属性排序的对象
* @returns {{}} 将对象进行属性排序(按首字母顺序进行排序)
*/
function sortObject(object) {
  var objectKeys = Object.keys(object).sort();
  var result = {};
  for (var i in objectKeys) {
      result[objectKeys[i]] = object[objectKeys[i]];
  }
  return result;
}


/**
* @returns {*} 将两个对象合并成一个
*/
function mergeObject(objectOne, objectTwo) {
  if (objectTwo != null) {
      for (var key in objectTwo) {
          objectOne[key] = objectTwo[key]
      }
  }
  return objectOne;
}

/**
* @returns {*} 潜拷贝对象
*/
function cloneObject(obj) {
  var o;
  if (typeof obj == "object") {
      if (obj === null) {
          o = null;
      } else {
          if (obj instanceof Array) {
              o = [];
              for (var i = 0, len = obj.length; i < len; i++) {
                  o.push(cloneObject(obj[i]));
              }
          } else {
              o = {};
              for (var j in obj) {
                  o[j] = cloneObject(obj[j]);
              }
          }
      }
  } else {
      o = obj;
  }
  return o;
}





/* 
// 生成签名
let SECRETKEY = 'zdW9Y2ZWEUZ-Jr8wuehrERPiITg-oGtjzpD6dfZv';
function createSign(params) {
  params = {
    active_id: "2325362", 
    page: 1, 
    limit: 10
  }
  let dataString = '';
  if (typeof params === 'object') {
    Object.keys(params).sort().forEach(function (ele, index) {
      let value = params[ele];
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      dataString += ele + '=' + value;
    })
  }
  
  return md5(dataString + SECRETKEY)
}
 */



 /**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
function urlParse() {
  let url = window.location.search;  
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};



 /**
 * 把json对象 解析url参数
 * @return Object {id:12345,a:b}
 * @example ?id=12345&a=b
 */
function urlEncode(obj) {
  const params = []
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    // 如果值为undefined我们将其置空
    if (typeof value === 'undefined') {
      value = ''
    }
    // 对于需要编码的文本（比如说中文）我们要进行编码
    params.push([key, encodeURIComponent(value)].join('='))
  })

  return params.join('&')
}





module.exports = {
  formatMoney: formatMoney,
  formatTime: formatTime,
  formatLocation: formatLocation,
  dateUtils: dateUtils,
  mapUtils: mapUtils,
  uniUtils: uniUtils,
  getSign:getSign,
  urlEncode:urlEncode,
  cloneObject:cloneObject
}
