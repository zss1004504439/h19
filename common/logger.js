/**
 * @description 输出日期到控制台,如果是字符串、数值类型直接输出，
 * 如果是数组和对象类型，则递归输出对象的属性或者数组的成员
 * @param {Object} obj
 */

/**
 * Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 * USAGE:
 *       console.log(qs.core.dump({name:'qs', value:[1,2,3,4,5]}));
 */
import helper from './helper'
//	var MAX_DUMP_DEPTH = 10;
const var_dump = function (arr, level = 0) {
  level = level ? level : 0;

  var dumped_text = "";

  if (!level) level = 0;

  if (level > 10) { //MAX_DUMP_DEPTH=10
    return dumped_text + ": <Maximum Depth Reached>\n";
  }

  //The padding given at the beginning of the line.
  var level_padding = "";
  for (var j = 0; j < level + 1; j++) level_padding += "    ";

  if (typeof (arr) == 'object') { //Array/Hashes/Objects
    for (var item in arr) {
      var value = arr[item];
      if (typeof (value) == 'object' && helper.isEmpty(value)) {
        dumped_text += level_padding + "'" + item + "' => null\n";
      } else if (typeof (value) == 'object') { //If it is an array,
        dumped_text += level_padding + "'" + item + "' =>(Object)\n";
        dumped_text += var_dump(value, level + 1);
      } else {
        dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
      }
    }
  } else { //Stings/Chars/Numbers etc.
    dumped_text = "===>" + arr + "<===(" + typeof (arr) + ")";
  }
  return dumped_text;
}

const dump = function (arr) {
  return var_dump(arr, 0);
};

// const tracer = {
//   info(obj) {
//     console.info(obj);
//   },
//   warn(obj) {
//     console.warn(obj);
//   },
//   debug(obj) {
//     console.debug(obj);
//   },
//   error(obj) {
//     console.error(obj);
//   }
// }

// tracer库在APP下有问题，暂时没有解决
// var logger = require('tracer').console();
var logger = console;
logger.dump = var_dump;

export {
  logger,
  dump
};

export default logger;
