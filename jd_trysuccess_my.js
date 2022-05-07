/*
京东试用：脚本更新地址 https://raw.githubusercontent.com/ZCY01/daily_scripts/main/jd/jd_try.js
脚本兼容: QuantumultX, Node.js

⚠️ 非常耗时的脚本。最多可能执行半小时！
每天最多关注300个商店，但用户商店关注上限为500个。
请配合取关脚本试用，使用 jd_unsubscribe.js 提前取关至少250个商店确保京东试用脚本正常运行。
==========================Quantumultx=========================
[task_local]
# 京东试用，请在 boxjs 修改取消关注店铺数量
5 10 * * * https://github.com/libinxwz/jdtest/jd_trysuccess.js, tag=取关京东店铺商品, enabled=true
cron "5 10 * * *" script-path=https://github.com/libinxwz/jdtest/jd_trysuccess.js, tag=店铺签到
# 京东试用
5 10 * * * https://github.com/libinxwz/jdtest/jd_trysuccess.js, tag=京东试用, img-url=https://raw.githubusercontent.com/ZCY01/img/master/jdtryv1.png, enabled=true
 */
const $ = new Env('京东试用')
let cookiesArr = [],
	cookie = '',
	jdNotify = false,
	jdDebug = false,
	notify
const selfdomain = 'https://try.m.jd.com'
let allGoodList = []//获取的商品list
let zcgGoodList = []//需要种草官才能申请的list
let allmessage = ''
// default params
$.pageSize = 12
let cidsList = ["家用电器","手机数码","电脑办公","家居家装","美妆护肤","个人护理","家庭清洁","生鲜美食","食品饮料","更多惊喜"]
let typeList = ["普通试用", "闪电试用"]
let goodFilters = "牙刷头@小样@防晒@防摔@去死皮@手机卡@教学@仓库@会员卡@邮箱@学习卡@视频学习@延迟@看房@护栏@隐形@瘙痒@痔疮@损伤@口罩@眼线@减肥@身体乳@少女@肚腩@诱惑@胸部@滋补@狐臭@修护@假发@干扰素@睫毛@约会@挂件@推子@替换@电池@车位@保护套@数据线@老年@孕妇@口腔@术后@保健@成人@避孕@钢化膜@尺@教程后膜@贝尔思力@神皂@美少女@英语@俄语@四级@课程@六级@在线@阴道炎@宫颈@延时@糜烂@早早孕@延时喷剂@自慰@震动@振动@跳蛋@增长@增时@内衣@治疗@中药@情趣@生长@矫正@男女通用@训练@耐力@胶囊".split('@')
let minPrice = 68//最高价格

$.totalPages = 25//总页数

const cidsMap = {
	"精选": "1",
	"闪电试": "2",
	"家用电器": "3",
	"手机数码": "4",
	"电脑办公": "5",
	"家居家装": "6",
	"美妆护肤": "7",
	"服饰鞋包": "8",
	"母婴玩具": "9",
	"生鲜美食": "10",
	"图书音像": "11",
	"钟表奢品": "12",
	"个人护理": "13",
	"家庭清洁": "14",
	"食品饮料": "15",
	"更多惊喜": "16",
}


!(async () => {
	if (null==process.env.MY_TRY || process.env.MY_TRY!=true) {
		console.log("MY_TRY未设置,已结束");
		return
	}
	await requireConfig()
	if (!cookiesArr[0]) {
		$.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
			"open-url": "https://bean.m.jd.com/"
		})
		return
	}

	for (let i = 0; i < 13; i++) {
		if (cookiesArr[i]) {
			cookie = cookiesArr[i];
			$.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
			$.index = i + 1;
			$.isLogin = true;
			$.nickname = '';
			await TotalBean();
			console.log(`\n开始【京东账号${$.index}】${$.nickname || $.UserName}\n`);
			if (!$.isLogin) {
				$.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickname || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {
					"open-url": "https://bean.m.jd.com/bean/signIndex.action"
				});

				if ($.isNode()) {
					await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
				}
				continue
			}

			$.goodList = []
			$.successList = []//成功商品列表
			$.successLista = []//待领取剩余时间列表
			$.successListaa = []//待领取剩余时间格式化为小时
			$.successListb = []//待领取商品名称
			$.successListc =[]//商品名称 + 商品剩余时间
			//allGoodList = []//清空。。。
			if(allGoodList.length == 0){
				await getGoodList()
			}
			await filterGoodList()
			$.totalTry = 0
			$.totalGoods = $.goodList.length
			await tryGoodList()
			await getSuccessList()
			
			//await getallMessage()
			//
		}
	}
	await showMsg()
})()
.catch((e) => {
	console.log(`❗️ ${$.name} 运行错误！\n${e}`)
	if (eval(jdDebug)) $.msg($.name, ``, `${e}`)
}).finally(() => $.done())

Array.prototype.push2 =function(){
      for(var i=0; i<arguments.length; i++){
        var ele = arguments[i];
        if(this.indexOf(ele) == -1){
            this.push(ele);
        }
    }
};
function requireConfig() {
	return new Promise(resolve => {
		console.log('开始获取配置文件\n')
		notify = $.isNode() ? require('./sendNotify') : '';
		//Node.js用户请在jdCookie.js处填写京东ck;
		if ($.isNode()) {
			const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
			Object.keys(jdCookieNode).forEach((item) => {
				if (jdCookieNode[item]) {
					cookiesArr.push(jdCookieNode[item])
				}
			})
			if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
		} else {
			//IOS等用户直接用NobyDa的jd cookie
			let cookiesData = $.getdata('CookiesJD') || "[]";
			cookiesData = jsonParse(cookiesData);
			cookiesArr = cookiesData.map(item => item.cookie);
			cookiesArr.reverse();
			cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
			cookiesArr.reverse();
			cookiesArr = cookiesArr.filter(item => item !== "" && item !== null && item !== undefined);
		}
		console.log(`共${cookiesArr.length}个京东账号\n`)

		if ($.isNode()) {
			if (process.env.JD_TRY_CIDS_KEYS) {
				cidsList = process.env.JD_TRY_CIDS_KEYS.split('@').filter(key=>{
					return Object.keys(cidsMap).includes(key)
				})
			}
			if (process.env.JD_TRY_TYPE_KEYS) {
				typeList = process.env.JD_TRY_CIDS_KEYS.split('@').filter(key=>{
					return Object.keys(typeMap).includes(key)
				})
			}
			if(process.env.JD_TRY_GOOD_FILTERS){
				goodFilters = process.env.JD_TRY_GOOD_FILTERS.split('@')
			}
			if (process.env.JD_TRY_MIN_PRICE) {
				minPrice = process.env.JD_TRY_MIN_PRICE * 1
			}
			if (process.env.JD_TRY_PAGE_SIZE) {
				$.pageSize = process.env.JD_TRY_PAGE_SIZE * 1
			}
		} else {
			let qxCidsList = []
			let qxTypeList = []
			const cidsKeys = Object.keys(cidsMap)
			const typeKeys = Object.keys(typeMap)
			for (let key of cidsKeys) {
				const open = $.getdata(key)
				if (open == 'true') qxCidsList.push(key)
			}
			for (let key of typeKeys) {
				const open = $.getdata(key)
				if (open == 'true') qxTypeList.push(key)
			}
			if (qxCidsList.length != 0) cidsList = qxCidsList
			if (qxTypeList.length != 0) typeList = qxTypeList
			if ($.getdata('filter')) goodFilters = $.getdata('filter').split('&')
			if ($.getdata('min_price')) minPrice = Number($.getdata('min_price'))
			if ($.getdata('page_size')) $.pageSize = Number($.getdata('page_size'))
			if ($.pageSize == 0) $.pageSize = 12
		}
		resolve()
	})
}

function getGoodListByCond(cids, page) {

	/*return new Promise((resolve, reject) => {
		let option = taskurl(`${selfdomain}/activity/list?pb=1&cids=${cids}&page=${page}&pageSize=${pageSize}&type=${type}&state=${state}`)
		delete option.headers['Cookie']
		$.get(option, (err, resp, data) => {
			try {
				if (err) {
					console.log(`🚫 ${arguments.callee.name.toString()} API请求失败，请检查网路\n${JSON.stringify(err)}`)
				} else {
					data = JSON.parse(data)
					if (data.success) {
						$.totalPages = data.data.pages
						allGoodList = allGoodList.concat(data.data.data)
					} else {
						console.log(`💩 获得 ${cids} ${page} 列表失败: ${data.message}`)
					}
				}
			} catch (e) {
				reject(`⚠️ ${arguments.callee.name.toString()} API返回结果解析出错\n${e}\n${JSON.stringify(data)}`)
			} finally {
				resolve()
			}
		})
	})*/
	let body='appid=newtry&functionId=try_feedsList&clientVersion=10.1.2&client=wh5&osVersion=10&networkType=wifi&body=%7B%22tabId%22%3A%22'+cids+'%22%2C%22page%22%3A'+page+'%2C%22previewTime%22%3A%22%22%7D';
	const myRequest = getPostRequest("https://api.m.jd.com/client.action", body);
	//console.log(myRequest)
	return new Promise(resolve => {
		$.post(myRequest, (err, resp, data) => {
		  try {
			  if (data) {
				//console.log(data);
				data = JSON.parse(data);
				//console.log(data.data.message);
				//console.log(data);
				allGoodList = allGoodList.concat(data.data.feedList);
			  }
			
		  } catch (e) {
			$.logErr(e, resp)
		  } finally {
			resolve();
		  }
		})
    })
}

async function getGoodList() {
	if (cidsList.length === 0) cidsList.push("全部商品")
	if (typeList.length === 0) typeList.push("全部试用")
	for (let cidsKey of cidsList) {
		//for (let typeKey of typeList) {
			
			console.log(`⏰ 获取 ${cidsKey} 商品列表`)
			for (let page = 1; page <= $.totalPages; page++) {
				await $.wait(1000);
				await getGoodListByCond(cidsMap[cidsKey], page)
			}
		//}
	}
}

async function filterGoodList() {
	console.log(`⏰ 过滤商品列表，当前共有${allGoodList.length}个商品`)
	const now = Date.now()
	const oneMoreDay = now + 24 * 60 * 60 * 1000
	$.goodList = allGoodList.filter(good => {
		// 1. good 有问题
		// 2. good 距离结束不到10min
		// 3. good 的结束时间大于一天
		// 4. good 的价格小于最小的限制
		// 5. good 的申请状态有问题，已申请过的
		//console.log(good);
		if (!good ||good.applyState==1|| good.jdPrice < minPrice || (good.orderPrice > 0&&good.jdPrice<200&&good.skuTitle.indexOf("猫粮") == -1)) {
			return false
		}
		//判断是否需要种草官
		if(good.tagList&&good.tagList.length>0&&good.tagList[0].tagType==3){
			return false
		}
		//筛选后单独筛选
		if (good.orderPrice > 0&&(good.skuTitle.indexOf("奶粉") != -1||good.skuTitle.indexOf("尿片") != -1)){
			return false
		}
		for (let item of goodFilters) {
			if (good.skuTitle.indexOf(item) != -1) return false
		}
		for (let item of zcgGoodList){
			if (good.trialActivityId==item) return false
		}
		return true

	})
	//await getApplyStateByActivityIds()
	
}


/*按双属性排序样板
async function sortBy(field1,field2) {
	return function(a,b) {
		if (a.field1 == b.field1) return b.field2 - a.field2
		return b.field1 - a.field1
	}
}
*/

async function getApplyStateByActivityIds() {
	function opt(ids) {
		return new Promise((resolve, reject) => {
			$.get(taskurl(`${selfdomain}/getApplyStateByActivityIds?activityIds=${ids.join(',')}`), (err, resp, data) => {
				try {
					if (err) {
						console.log(`🚫 ${arguments.callee.name.toString()} API请求失败，请检查网路\n${JSON.stringify(err)}`)
					} else {
						data = JSON.parse(data)
						ids.length = 0
						for (let apply of data) ids.push(apply.activityId)
					}
				} catch (e) {
					reject(`⚠️ ${arguments.callee.name.toString()} API返回结果解析出错\n${e}\n${JSON.stringify(data)}`)
				} finally {
					$.goodList = $.goodList.filter(good => {
						for (let id of ids) {
							if (id == good.id) {
								return false
							}
						}
						return true
					})
					resolve()
				}
			})
		})
	}

	let list = []
	for (let good of $.goodList) {
		list.push(good.id)
		if (list.length == $.pageSize) {
			await opt(list)
			list.length = 0
		}
	}
	if (list.length) await opt(list)
}

function canTry(good) {
	return new Promise((resolve, reject) => {
		let ret = false
		$.get(taskurl(`${selfdomain}/activity?id=${good.id}`), (err, resp, data) => {
			try {
				if (err) {
					console.log(`🚫 ${arguments.callee.name.toString()} API请求失败，请检查网路\n${JSON.stringify(err)}`)
				} else {
					ret = data.indexOf('trySku') != -1
					let result = data.match(/"shopId":(\d+)/)
					if (result) {
						good.shopId = eval(result[1])
					}
				}
			} catch (e) {
				reject(`⚠️ ${arguments.callee.name.toString()} API返回结果解析出错\n${e}\n${JSON.stringify(data)}`)
			} finally {
				resolve(ret)
			}
		})
	})
}

function isFollowed(good) {
	return new Promise((resolve, reject) => {
		$.get(taskurl(`${selfdomain}/isFollowed?id=${good.shopId}`, good.id), (err, resp, data) => {
			try {
				if (err) {
					console.log(`🚫 ${arguments.callee.name.toString()} API请求失败，请检查网路\n${JSON.stringify(err)}`)
				} else {
					data = JSON.parse(data)
					resolve(data.success && data.data)
				}
			} catch (e) {
				reject(`⚠️ ${arguments.callee.name.toString()} API返回结果解析出错\n${e}\n${JSON.stringify(data)}`)
			} finally {
				resolve(false)
			}
		})
	})
}

function followShop(good) {
	return new Promise((resolve, reject) => {
		$.get(taskurl(`${selfdomain}/followShop?id=${good.shopId}`, good.id), (err, resp, data) => {
			try {
				if (err) {
					console.log(`🚫 ${arguments.callee.name.toString()} API请求失败，请检查网路\n${JSON.stringify(err)}`)
				} else {
					data = JSON.parse(data)
					if (data.code == 'F0410') {
						$.running = false
						$.stopMsg = data.msg || "关注数超过上限了哦~先清理下关注列表吧"
					}
					resolve(data.success && data.data)
				}
			} catch (e) {
				reject(`⚠️ ${arguments.callee.name.toString()} API返回结果解析出错\n${e}\n${JSON.stringify(data)}`)
			} finally {
				resolve(false)
			}
		})
	})
}

async function tryGoodList() {
	console.log(`⏰ 即将申请 ${$.goodList.length} 个商品`)
	$.running = true
	$.stopMsg = '申请完毕'
	for (let i = 0; i < $.goodList.length && $.running; i++) {
		let good = $.goodList[i]
		//if (!await canTry(good)) continue
		// 如果没有关注且关注失败
		//if (good.shopId && !await isFollowed(good) && !await followShop(good)) continue
		// 两个申请间隔不能太短，放在下面有利于确保 follwShop 完成
		await $.wait(Math.floor(Math.random() * 30000 + 5000))
		// 关注完毕，即将试用
		await doTry(good)
	}
}

async function doTry(good) {
	/*return new Promise((resolve, reject) => {
		$.get(taskurl(`${selfdomain}/migrate/apply?activityId=${good.id}&source=1&_s=m`, good.id), (err, resp, data) => {
			try {
				if (err) {
					console.log(`🚫 ${arguments.callee.name.toString()} API请求失败，请检查网路\n${JSON.stringify(err)}`)
				} else {
					data = JSON.parse(data)
					if (data.success) {
						$.totalTry += 1
						console.log(`🥳 ${good.id} 🛒${good.trialName.substr(0,15)}🛒 ${data.message}🥳价值 ${good.jdPrice}元,订单价格${good.orderPrice}元  🥳共${good.supplyCount}份🥳已申请人数：${good.applyCount}`)
					} else if (data.code == '-131') { // 每日300个商品
						$.stopMsg = data.message
						$.running = false
					} else {
						console.log(`🤬 ${good.id} 🛒${good.trialName.substr(0,15)}🛒 ${JSON.stringify(data)}`)
					}
				}
			} catch (e) {
				reject(`⚠️ ${arguments.callee.name.toString()} API返回结果解析出错\n${e}\n${JSON.stringify(data)}`)
			} finally {
				resolve()
			}
		})
	})*/
	let body='appid=newtry&functionId=try_apply&clientVersion=10.1.2&client=wh5&osVersion=10.3.2&networkType=wifi&body=%7B%22geo%22%3A%7B%22lng%22%3A%22120.9088404010325%22%2C%22lat%22%3A%2231.97669223141005%22%7D%2C%22activityId%22%3A'+good.trialActivityId+'%2C%22previewTime%22%3A%22%22%7D';
	const myRequest = getPostRequest("https://api.m.jd.com/client.action", body);
	//console.log(myRequest)
	return new Promise(resolve => {
		$.post(myRequest, (err, resp, data) => {
		  try {
			//console.log(data);
			data = JSON.parse(data);
			console.log("【申请结果】："+data.message+"    【商品名称】："+good.skuTitle);
			if(data.message.indexOf("您的申请次数已超300次上限")!=-1){
				$.running = false;
			}
			else if(data.message.indexOf("此试用需为种草官才能申请")!=-1){
				zcgGoodList.push2(good.trialActivityId);
			}
			else if(data.message.indexOf("当前活动不能申请")!=-1){
				zcgGoodList.push2(good.trialActivityId);
			}
			//console.log(data.data.message);
			//console.log(data);
		  } catch (e) {
			$.logErr(e, resp)
		  } finally {
			resolve();
		  }
		})
    })
}

async function getSuccessList() {
	// 一页12个商品，不会吧不会吧，不会有人一次性中奖12个商品吧？！🤔
	return new Promise((resolve, reject) => {
		const option = {
			url: `https://try.jd.com/my/tryList?selected=2&page=1&tryVersion=2&_s=m`,
			headers: {
				'Host': 'try.jd.com',
				'Connection': 'keep-alive',
				'UserAgent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Mobile Safari/537.36',
				'Accept': '*/*',
				'Referer': 'https://try.m.jd.com/',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'zh,zh-CN;q=0.9,en;q=0.8',
				'Cookie': cookie
			}
		}
		$.get(option, (err, resp, data) => {
			try {
				if (err) {
					console.log(`🚫 ${arguments.callee.name.toString()} API请求失败，请检查网路\n${JSON.stringify(err)}`)
				} else {
					data = JSON.parse(data)
					if (data.success && data.data) {
						$.successList = data.data.data.filter(item => {
							return item.text.text.indexOf('请尽快领取') != -1
						})
						$.successLista = Array.from($.successList ,({leftTime})=>leftTime)//$.successList.forEach(function(v){ $.successLista.push(v.leftTime);})	//剩余领取时间
						$.successListaa = $.successLista.map(function (index) {  			//格式化为小时
							return '剩余领取时间' + Math.floor(index/3600000 * 100)/100 + '小时'
						})
						$.successList.forEach(function(v){ $.successListb.push(v.trialName);})	//试用名称
						$.successListc=$.successListb.map((e,i)=>{return [e,$.successListaa[i]]})
						allmessage += `京东账号${$.index} ${$.nickname || $.UserName}\n🎉  ${$.successList.length}个商品待领取🤩\n🎉为：${$.successListc }${$.index !== cookiesArr.length ? '\n\n' : '\n\n'}`
						//$.successListb = data.map(function (item) {
						//	return item.trialName
						//})
					} else {
						console.log(`💩 获得成功列表失败: ${data.message}`)
					}
				}
			} catch (e) {
				reject(`⚠️ ${arguments.callee.name.toString()} API返回结果解析出错\n${e}\n${JSON.stringify(data)}`)
			} finally {
				resolve()
			}
		})
		
	})
}

    

async function showMsg() {
	
	//let message = `京东账号${$.index} ${$.nickname || $.UserName}\n🎉  ${$.successList.length}个商品待领取🤩\n🎉为：${$.successListc}`
	if (!jdNotify || jdNotify === 'false') {
		$.msg($.name, ``, allmessage, {
			"open-url": 'https://try.m.jd.com/user'
		})
		if($.isNode()){
			await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickname}`, allmessage)
		}
	} else {
		console.log(message)
	}
}

function getPostRequest(url, body) {
  const method = `POST`;
  const headers = {
	'Host': `api.m.jd.com`,
	'Content-Type': `application/x-www-form-urlencoded`,
	'Origin': `https://pro.m.jd.com`,
    'Accept-Encoding': `gzip, deflate`,
	'Cookie': cookie,
	'Connection': `keep-alive`,
	'Accept': `application/json, text/plain, */*`,
	"User-Agent":`jdapp;iPhone;10.1.2;10.3.2;393f22cb470447be5a36264afa2120ef891f32e2;network/wifi;ADID/0D70C6E1-4B9A-4CFC-8E3F-932D53976B27;model/iPhone7,2;addressid/1834141776;appBuild/167802;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89;supportJDSHWK/1`,
    'Referer': `https://pro.m.jd.com/mall/active/3mpGVQDhvLsMvKfZZumWPQyWt83L/index.html`,
    'Accept-Language': `zh-cn`,
  };
  return {url: url, method: method, headers: headers, body: body};
}

function taskurl(url, goodId) {
	return {
		'url': url,
		'headers': {
			'Host': 'try.m.jd.com',
			'Accept-Encoding': 'gzip, deflate, br',
			'Cookie': cookie,
			'Connection': 'keep-alive',
			'Accept': '*/*',
			'UserAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
			'Accept-Language': 'zh-cn',
			'Referer': goodId ? `https://try.m.jd.com/activity/?id=${goodId}` : undefined
		},
	}
}

function TotalBean() {
	return new Promise(async resolve => {
		const options = {
			"url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
			"headers": {
				"Accept": "application/json,text/plain, */*",
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept-Encoding": "gzip, deflate, br",
				"Accept-Language": "zh-cn",
				"Connection": "keep-alive",
				"Cookie": cookie,
				"Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
				"User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0")
			},
			"timeout": 10000,
		}
		$.post(options, (err, resp, data) => {
			try {
				if (err) {
					console.log(`${JSON.stringify(err)}`)
					console.log(`${$.name} API请求失败，请检查网路重试`)
				} else {
					if (data) {
						data = JSON.parse(data);
						
						if (data['retcode'] === 13) {
							$.isLogin = false; //cookie过期
							return
						}
						$.nickname = data['base'].nickname;
					} else {
						console.log(`京东服务器返回空数据`)
					}
				}
			} catch (e) {
				$.logErr(e, resp)
			} finally {
				resolve();
			}
		})
	})
}

function jsonParse(str) {
	if (typeof str == "string") {
		try {
			return JSON.parse(str);
		} catch (e) {
			console.log(e);
			$.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
			return [];
		}
	}
}

// 来自 @chavyleung 大佬
// https://raw.githubusercontent.com/chavyleung/scripts/master/Env.js
function Env(name, opts) {
	class Http {
		constructor(env) {
			this.env = env
		}

		send(opts, method = 'GET') {
			opts = typeof opts === 'string' ? {
				url: opts
			} : opts
			let sender = this.get
			if (method === 'POST') {
				sender = this.post
			}
			return new Promise((resolve, reject) => {
				sender.call(this, opts, (err, resp, body) => {
					if (err) reject(err)
					else resolve(resp)
				})
			})
		}

		get(opts) {
			return this.send.call(this.env, opts)
		}

		post(opts) {
			return this.send.call(this.env, opts, 'POST')
		}
	}

	return new(class {
		constructor(name, opts) {
			this.name = name
			this.http = new Http(this)
			this.data = null
			this.dataFile = 'box.dat'
			this.logs = []
			this.isMute = false
			this.isNeedRewrite = false
			this.logSeparator = '\n'
			this.startTime = new Date().getTime()
			Object.assign(this, opts)
			this.log('', `🔔${this.name}, 开始!`)
		}

		isNode() {
			return 'undefined' !== typeof module && !!module.exports
		}

		isQuanX() {
			return 'undefined' !== typeof $task
		}

		isSurge() {
			return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
		}

		isLoon() {
			return 'undefined' !== typeof $loon
		}

		toObj(str, defaultValue = null) {
			try {
				return JSON.parse(str)
			} catch {
				return defaultValue
			}
		}

		toStr(obj, defaultValue = null) {
			try {
				return JSON.stringify(obj)
			} catch {
				return defaultValue
			}
		}

		getjson(key, defaultValue) {
			let json = defaultValue
			const val = this.getdata(key)
			if (val) {
				try {
					json = JSON.parse(this.getdata(key))
				} catch {}
			}
			return json
		}

		setjson(val, key) {
			try {
				return this.setdata(JSON.stringify(val), key)
			} catch {
				return false
			}
		}

		getScript(url) {
			return new Promise((resolve) => {
				this.get({
					url
				}, (err, resp, body) => resolve(body))
			})
		}

		runScript(script, runOpts) {
			return new Promise((resolve) => {
				let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
				httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
				let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
				httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
				httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
				const [key, addr] = httpapi.split('@')
				const opts = {
					url: `http://${addr}/v1/scripting/evaluate`,
					body: {
						script_text: script,
						mock_type: 'cron',
						timeout: httpapi_timeout
					},
					headers: {
						'X-Key': key,
						'Accept': '*/*'
					}
				}
				this.post(opts, (err, resp, body) => resolve(body))
			}).catch((e) => this.logErr(e))
		}

		loaddata() {
			if (this.isNode()) {
				this.fs = this.fs ? this.fs : require('fs')
				this.path = this.path ? this.path : require('path')
				const curDirDataFilePath = this.path.resolve(this.dataFile)
				const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
				const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
				const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
				if (isCurDirDataFile || isRootDirDataFile) {
					const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
					try {
						return JSON.parse(this.fs.readFileSync(datPath))
					} catch (e) {
						return {}
					}
				} else return {}
			} else return {}
		}

		writedata() {
			if (this.isNode()) {
				this.fs = this.fs ? this.fs : require('fs')
				this.path = this.path ? this.path : require('path')
				const curDirDataFilePath = this.path.resolve(this.dataFile)
				const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
				const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
				const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
				const jsondata = JSON.stringify(this.data)
				if (isCurDirDataFile) {
					this.fs.writeFileSync(curDirDataFilePath, jsondata)
				} else if (isRootDirDataFile) {
					this.fs.writeFileSync(rootDirDataFilePath, jsondata)
				} else {
					this.fs.writeFileSync(curDirDataFilePath, jsondata)
				}
			}
		}

		lodash_get(source, path, defaultValue = undefined) {
			const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
			let result = source
			for (const p of paths) {
				result = Object(result)[p]
				if (result === undefined) {
					return defaultValue
				}
			}
			return result
		}

		lodash_set(obj, path, value) {
			if (Object(obj) !== obj) return obj
			if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
			path
				.slice(0, -1)
				.reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
					path[path.length - 1]
				] = value
			return obj
		}

		getdata(key) {
			let val = this.getval(key)
			// 如果以 @
			if (/^@/.test(key)) {
				const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
				const objval = objkey ? this.getval(objkey) : ''
				if (objval) {
					try {
						const objedval = JSON.parse(objval)
						val = objedval ? this.lodash_get(objedval, paths, '') : val
					} catch (e) {
						val = ''
					}
				}
			}
			return val
		}

		setdata(val, key) {
			let issuc = false
			if (/^@/.test(key)) {
				const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
				const objdat = this.getval(objkey)
				const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
				try {
					const objedval = JSON.parse(objval)
					this.lodash_set(objedval, paths, val)
					issuc = this.setval(JSON.stringify(objedval), objkey)
				} catch (e) {
					const objedval = {}
					this.lodash_set(objedval, paths, val)
					issuc = this.setval(JSON.stringify(objedval), objkey)
				}
			} else {
				issuc = this.setval(val, key)
			}
			return issuc
		}

		getval(key) {
			if (this.isSurge() || this.isLoon()) {
				return $persistentStore.read(key)
			} else if (this.isQuanX()) {
				return $prefs.valueForKey(key)
			} else if (this.isNode()) {
				this.data = this.loaddata()
				return this.data[key]
			} else {
				return (this.data && this.data[key]) || null
			}
		}

		setval(val, key) {
			if (this.isSurge() || this.isLoon()) {
				return $persistentStore.write(val, key)
			} else if (this.isQuanX()) {
				return $prefs.setValueForKey(val, key)
			} else if (this.isNode()) {
				this.data = this.loaddata()
				this.data[key] = val
				this.writedata()
				return true
			} else {
				return (this.data && this.data[key]) || null
			}
		}

		initGotEnv(opts) {
			this.got = this.got ? this.got : require('got')
			this.cktough = this.cktough ? this.cktough : require('tough-cookie')
			this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
			if (opts) {
				opts.headers = opts.headers ? opts.headers : {}
				if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
					opts.cookieJar = this.ckjar
				}
			}
		}

		get(opts, callback = () => {}) {
			if (opts.headers) {
				delete opts.headers['Content-Type']
				delete opts.headers['Content-Length']
			}
			if (this.isSurge() || this.isLoon()) {
				if (this.isSurge() && this.isNeedRewrite) {
					opts.headers = opts.headers || {}
					Object.assign(opts.headers, {
						'X-Surge-Skip-Scripting': false
					})
				}
				$httpClient.get(opts, (err, resp, body) => {
					if (!err && resp) {
						resp.body = body
						resp.statusCode = resp.status
					}
					callback(err, resp, body)
				})
			} else if (this.isQuanX()) {
				if (this.isNeedRewrite) {
					opts.opts = opts.opts || {}
					Object.assign(opts.opts, {
						hints: false
					})
				}
				$task.fetch(opts).then(
					(resp) => {
						const {
							statusCode: status,
							statusCode,
							headers,
							body
						} = resp
						callback(null, {
							status,
							statusCode,
							headers,
							body
						}, body)
					},
					(err) => callback(err)
				)
			} else if (this.isNode()) {
				this.initGotEnv(opts)
				this.got(opts)
					.on('redirect', (resp, nextOpts) => {
						try {
							if (resp.headers['set-cookie']) {
								const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
								if (ck) {
									this.ckjar.setCookieSync(ck, null)
								}
								nextOpts.cookieJar = this.ckjar
							}
						} catch (e) {
							this.logErr(e)
						}
						// this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
					})
					.then(
						(resp) => {
							const {
								statusCode: status,
								statusCode,
								headers,
								body
							} = resp
							callback(null, {
								status,
								statusCode,
								headers,
								body
							}, body)
						},
						(err) => {
							const {
								message: error,
								response: resp
							} = err
							callback(error, resp, resp && resp.body)
						}
					)
			}
		}

		post(opts, callback = () => {}) {
			// 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
			if (opts.body && opts.headers && !opts.headers['Content-Type']) {
				opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			}
			if (opts.headers) delete opts.headers['Content-Length']
			if (this.isSurge() || this.isLoon()) {
				if (this.isSurge() && this.isNeedRewrite) {
					opts.headers = opts.headers || {}
					Object.assign(opts.headers, {
						'X-Surge-Skip-Scripting': false
					})
				}
				$httpClient.post(opts, (err, resp, body) => {
					if (!err && resp) {
						resp.body = body
						resp.statusCode = resp.status
					}
					callback(err, resp, body)
				})
			} else if (this.isQuanX()) {
				opts.method = 'POST'
				if (this.isNeedRewrite) {
					opts.opts = opts.opts || {}
					Object.assign(opts.opts, {
						hints: false
					})
				}
				$task.fetch(opts).then(
					(resp) => {
						const {
							statusCode: status,
							statusCode,
							headers,
							body
						} = resp
						callback(null, {
							status,
							statusCode,
							headers,
							body
						}, body)
					},
					(err) => callback(err)
				)
			} else if (this.isNode()) {
				this.initGotEnv(opts)
				const {
					url,
					..._opts
				} = opts
				this.got.post(url, _opts).then(
					(resp) => {
						const {
							statusCode: status,
							statusCode,
							headers,
							body
						} = resp
						callback(null, {
							status,
							statusCode,
							headers,
							body
						}, body)
					},
					(err) => {
						const {
							message: error,
							response: resp
						} = err
						callback(error, resp, resp && resp.body)
					}
				)
			}
		}
		/**
		 *
		 * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
		 *    :$.time('yyyyMMddHHmmssS')
		 *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
		 *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
		 * @param {*} fmt 格式化参数
		 *
		 */
		time(fmt) {
			let o = {
				'M+': new Date().getMonth() + 1,
				'd+': new Date().getDate(),
				'H+': new Date().getHours(),
				'm+': new Date().getMinutes(),
				's+': new Date().getSeconds(),
				'q+': Math.floor((new Date().getMonth() + 3) / 3),
				'S': new Date().getMilliseconds()
			}
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (new Date().getFullYear() + '').substr(4 - RegExp.$1.length))
			for (let k in o)
				if (new RegExp('(' + k + ')').test(fmt))
					fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
			return fmt
		}

		/**
		 * 系统通知
		 *
		 * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
		 *
		 * 示例:
		 * $.msg(title, subt, desc, 'twitter://')
		 * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
		 * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
		 *
		 * @param {*} title 标题
		 * @param {*} subt 副标题
		 * @param {*} desc 通知详情
		 * @param {*} opts 通知参数
		 *
		 */
		msg(title = name, subt = '', desc = '', opts) {
			const toEnvOpts = (rawopts) => {
				if (!rawopts) return rawopts
				if (typeof rawopts === 'string') {
					if (this.isLoon()) return rawopts
					else if (this.isQuanX()) return {
						'open-url': rawopts
					}
					else if (this.isSurge()) return {
						url: rawopts
					}
					else return undefined
				} else if (typeof rawopts === 'object') {
					if (this.isLoon()) {
						let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
						let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
						return {
							openUrl,
							mediaUrl
						}
					} else if (this.isQuanX()) {
						let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
						let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
						return {
							'open-url': openUrl,
							'media-url': mediaUrl
						}
					} else if (this.isSurge()) {
						let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
						return {
							url: openUrl
						}
					}
				} else {
					return undefined
				}
			}
			if (!this.isMute) {
				if (this.isSurge() || this.isLoon()) {
					$notification.post(title, subt, desc, toEnvOpts(opts))
				} else if (this.isQuanX()) {
					$notify(title, subt, desc, toEnvOpts(opts))
				}
			}
			if (!this.isMuteLog) {
				let logs = ['', '==============📣系统通知📣==============']
				logs.push(title)
				subt ? logs.push(subt) : ''
				desc ? logs.push(desc) : ''
				console.log(logs.join('\n'))
				this.logs = this.logs.concat(logs)
			}
		}

		log(...logs) {
			if (logs.length > 0) {
				this.logs = [...this.logs, ...logs]
			}
			console.log(logs.join(this.logSeparator))
		}

		logErr(err, msg) {
			const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()
			if (!isPrintSack) {
				this.log('', `❗️${this.name}, 错误!`, err)
			} else {
				this.log('', `❗️${this.name}, 错误!`, err.stack)
			}
		}

		wait(time) {
			return new Promise((resolve) => setTimeout(resolve, time))
		}

		done(val = {}) {
			const endTime = new Date().getTime()
			const costTime = (endTime - this.startTime) / 1000
			this.log('', `🔔${this.name}, 结束! 🕛 ${costTime} 秒`)
			this.log()
			if (this.isSurge() || this.isQuanX() || this.isLoon()) {
				$done(val)
			}
		}
	})(name, opts)
}
