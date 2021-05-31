// 云函数入口文件
// 云函数本质就是一个node应用
const cloud = require('wx-server-sdk')
const axios = require('axios')
const doubanbook = require('doubanbook')

cloud.init()

async function getDoubanBook(isbn){
  let url = `https://search.douban.com/book/subject_search?search_text=${isbn}`
  const res = await axios.get(url)
  let reg = /window\.__DATA__ = "(.*)"/;
  if(reg.test(res.data)){
    // console.log(RegExp.$1)
    const searchV = doubanbook(RegExp.$1)
    // console.log(searchV)
    return searchV
  }
  // console.log(res);
}

// getDoubanBook(9787509757857);

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  const bookInfo = await getDoubanBook(event.isbn)

  return {
    bookInfo,
  }
}