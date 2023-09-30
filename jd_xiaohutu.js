/*
小糊涂
 */
const $ = new Env('小糊涂');
// index.js
const fs = require('fs');
const CryptoJS=require('crypto-js');

let cookies=[
	'2384_user_cookie=d16dc0218e22e9c1809ef93a6c32f5a8; PHPSESSID=7349cb9b32e028e0c045bfeb554c3898',
	'2384_user_cookie=64852c64a3a7cec5f10eb8b618418b1b; PHPSESSID=e6afb390a04ff496f895941d6b4d7f6a',
	'2384_user_cookie=7ebfbabb7cb450e34a49d7ead036ebd1; PHPSESSID=35f09679a0f5f43c5abd74b843c2761f',
	'2384_user_cookie=6188710e3779cbb6d9d6c11dd6135e0b; PHPSESSID=b2c270ac221050af28f2cbdc942061c0',
	'2384_user_cookie=5a0e08509a68caefb21cd62ddbb26cf6; PHPSESSID=1f2b5d2efe6ca7a7455656916d74b193',
	'2384_user_cookie=1a3141527a2ed80d66d3b32380f598fa; PHPSESSID=b0e962919920bd7d194c39cf8ced3169',
	'2384_user_cookie=fa3b4ef2dbefbbbc016be2a65b91abb8; PHPSESSID=87abb03644b8bdc5211f3c70ee1bb2d4',
	'2384_user_cookie=d0d8c72b784cdf08f43fa8d54123bc74; PHPSESSID=50fbe3094acd551ace8c66ce5579793e',
	'2384_user_cookie=62678f984b6b6723b3b476f10d85aa57; PHPSESSID=5975b88f7563e3d33cb99f68f312d1a2',
	'2384_user_cookie=6a4ff7d93b8845a6e7296767bda0917b; PHPSESSID=ff4a4271e54f06b336621bc7776ac84d',
	'2384_user_cookie=42e502e4b3ec4a357f6e529505d40765; PHPSESSID=1f25242cd352fce6d268726704384494',
	'2384_user_cookie=93fca9884a10fac8464f5043c9a228fe; PHPSESSID=5010ddb2bda2c7d550e7675c59cb4fe9',
	'2384_user_cookie=da8d7261f2fcbfb3e77bcc4cf07270ff; PHPSESSID=e6ea40332eb4c72b76025f5b3b5ec05c',
	'2384_user_cookie=1ef0f33aafb8499ddcbfebf9d95f64ae; PHPSESSID=014e4bceb309049914555b087e8adee1',
	'2384_user_cookie=18fa01921345bec986d8f6224377333a; PHPSESSID=61cdb4f26cacd6a5005e4c2148bd4851',
	'2384_user_cookie=54fcf78a89323969ff2ddd23bd7abfa1; PHPSESSID=04e207339dd01fa792103da26c26ee6e',
	'2384_user_cookie=a6c11c75691b4289d67b41d6fa621aa0; PHPSESSID=003e05cecd11e9e0d045bdaa1ce09fed',
	'2384_user_cookie=4c3c21b5680c2b74b5a3bb147aada721; PHPSESSID=df4ff0ca031f39635ca4238ee109408d',
	'2384_user_cookie=e54e5f1d965a62774c944f22da861e2f; PHPSESSID=018569afcce5ae0497497a642b23e050',//圈圈1
	'2384_user_cookie=727e11680a4b479b192b392fa54b219c; PHPSESSID=ed7de2d9faea8e63a9e2f2ea43293796',//圈圈2
	'2384_user_cookie=b4c17f2da295f33de6f4e45e076b16c5; PHPSESSID=aa9ca70dcf89999b39d67ba28bb5b5c3'//秋秋
]
let gameInfoList=[];

let rankList=[]; 


//---------------------------------------------

!(async () => {
	await rank();
	for(var i=0;i<cookies.length;i++){
		var user=new User(cookies[i]);
		user.run();
	}

})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })
  
//---------------------------------------------



class User{
	//构造函数 只允许一个构造器
    constructor(cookie) {
        this.cookie=cookie;
		this.nick=null;
		this.gameInfo=null;
    }
	async run(){
		//console.log(this.cookie)
		await this.getInfo();
		await this.startGame();
		if(this.gameInfo!=null){
			var time=400+Math.floor(Math.random()*280);
			//console.log("等待时间"+time)
			let score=Math.floor(time*100+Math.random()*10000);
			if(rankList.includes(this.nick)){
				//
				//console.log(this.nick+",在前25名分数少点;")
				score=Math.floor(time*100+Math.random()*10000);
			}else{
				//console.log(this.nick+",在前25名外;")
			}

			await $.wait(time*100);
			console.log("👨"+this.nick+",time:"+time+",score:"+score);
			await this.endGame(score);
			await $.wait(2000);
			await this.chou();
			await this.myAward();
		}
		
		
	}
	getInfo(){ 
		let that=this;
		let body='';
		const myRequest = this.getPostRequest("https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/info", body);
		//console.log(myRequest)
		return new Promise(resolve => {
			$.post(myRequest, (err, resp, data) => {
			  try {
				data = JSON.parse(data);
				that.nick=data.data.nick;
			  } catch (e) {
				$.logErr(e, resp)
			  } finally {
				resolve(data);
			  }
			})
		})
	}
	startGame(){ 
		let that=this;
		let body='';
		const myRequest = this.getPostRequest("https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/startGame", body);
		//console.log(myRequest)
		return new Promise(resolve => {
			$.post(myRequest, (err, resp, data) => {
			  try {
				
				data = JSON.parse(data);
				if(data.code==0){
					let obj={
						"key":data.data.key,
						"id":data.data.id,
					}
					that.gameInfo=obj;
					console.log("👨"+that.nick+",游戏开始:"+JSON.stringify(obj));
				}else{
					console.log("👨"+that.nick+",游戏失败:"+JSON.stringify(data));
				}
				
			  } catch (e) {
				$.logErr(e, resp)
			  } finally {
				resolve();
			  }
			})
		})
	}
	endGame(score){
		let that=this;
		let scoreStr=blockcurSc(score,this.gameInfo.key);
		//console.log(scoreStr);
		let body='score='+scoreStr+'&id='+this.gameInfo.id;
		const myRequest = this.getPostRequest("https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/endGame", body);
		//console.log(myRequest)
		return new Promise(resolve => {
			$.post(myRequest, (err, resp, data) => {
			  try {
				console.log(getNowFormatDate("👨"+that.nick)+"提交成绩:"+data);

			  } catch (e) {
				$.logErr(e, resp)
			  } finally {
				resolve();
			  }
			})
		})
	}

	chou(){ 
		let that=this;
		let body='';
		const myRequest = this.getPostRequest("https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/lottery", body);
		//console.log(myRequest)
		return new Promise(resolve => {
			$.post(myRequest, (err, resp, data) => {
			  try {
				console.log(getNowFormatDate("👨"+that.nick)+"抽奖:"+data);
			
			  } catch (e) {
				$.logErr(e, resp)
			  } finally {
				resolve();
			  }
			})
		})
	}
	myAward(){ 
		let that=this;
		let body='';
		const myRequest = this.getPostRequest("https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/myAward", body);
		//console.log(myRequest)
		return new Promise(resolve => {
			$.post(myRequest, (err, resp, data) => {
			  try {
				
				console.log(getNowFormatDate("👨"+that.nick)+"奖品:----------------");
				data = JSON.parse(data);
				for(var i=0;i<data.data.length;i++){
					console.log("🎁🎁🎁奖品"+(i+1)+":"+data.data[i].awardname+",数量："+data.data[i].ticket_count)
				}
				console.log(getNowFormatDate("👨"+that.nick)+"----------------------");
			
			  } catch (e) {
				$.logErr(e, resp)
			  } finally {
				resolve();
			  }
			})
		})
	}
	getPostRequest(url, body) {
	  let that=this; 
	  const method = `POST`;
	  const headers = {
		'Accept-Encoding': `gzip, deflate, br`,
		'Accept': 'application/json, text/plain, */*',
		'Host': `wx.cdh5.cn`,
		'Origin': `https://wx.cdh5.cn`,
		'Connection': `keep-alive`,

		'Accept-Language': `zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7`,
		'Content-Type': `application/x-www-form-urlencoded`,
		"User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "Mozilla/5.0 (iPhone; CPU iPhone OS 16_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.33(0x18002129) NetType/WIFI Language/zh_CN"),
		'Referer': `https://wx.cdh5.cn/2384_4549575a/index.php?code=021g8UFa1Jyv3G0vLOIa1R6Hgk2g8UFe&state=1&appid=wx558d689c232afcb1`,
		'Cookie': that.cookie
	  };
	  return {url: url, method: method, headers: headers, body: body};
	}
	
}

function rank(){ 
	$.cookie=cookies[0];
	let body='page=0';
	const myRequest = getPostRequest("https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/rank", body);
	//console.log(myRequest)
	return new Promise(resolve => {
		$.post(myRequest, (err, resp, data) => {
		  try {
			console.log(getNowFormatDate("")+"获取排名前25名");
			//
			data = JSON.parse(data);
			var listTemp=data.data.list;
			rankList=[];
			for(var i=0;i<25;i++){
				rankList.push(listTemp[i].nick);
			}
		
		  } catch (e) {
			$.logErr(e, resp)
		  } finally {
			resolve();
		  }
		})
    })
}


function sleep(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};
function blockcurSc(score,key) {
	//console.log(score);
	var  x = CryptoJS.enc.Utf8.parse(key),//key
	s=CryptoJS.enc.Utf8.parse("cdlchd0123456789"),
	a = CryptoJS.enc.Utf8.parse(score+""),
	ss = CryptoJS.AES.encrypt(a, x, {
		iv: s,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	})
	//console.log(ss.ciphertext.toString());
	return ss.ciphertext.toString();
}
function getPostRequest(url, body) {
	  let that=this; 
	  const method = `POST`;
	  const headers = {
		'Accept-Encoding': `gzip, deflate, br`,
		'Accept': 'application/json, text/plain, */*',
		'Host': `wx.cdh5.cn`,
		'Origin': `https://wx.cdh5.cn`,
		'Connection': `keep-alive`,

		'Accept-Language': `zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7`,
		'Content-Type': `application/x-www-form-urlencoded`,
		"User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "Mozilla/5.0 (iPhone; CPU iPhone OS 16_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.33(0x18002129) NetType/WIFI Language/zh_CN"),
		'Referer': `https://wx.cdh5.cn/2384_4549575a/index.php?code=021g8UFa1Jyv3G0vLOIa1R6Hgk2g8UFe&state=1&appid=wx558d689c232afcb1`,
		'Cookie': $.cookie
	  };
	  return {url: url, method: method, headers: headers, body: body};
	}
	
function yyyymmdd() {
	var t = new Date,
	e = t.getFullYear().toString(),
	i = (t.getMonth() + 1).toString(),
	o = t.getDate().toString();
	return e + (i[1] ? i: "0" + i[0]) + (o[1] ? o: "0" + o[0])
}
function getMonthDays() {
	var t = new Date,
	e = t.getFullYear(),
	i = t.getMonth() + 1;
	return new Date(e, i, 0).getDate()
}
function getNowFormatDate(str) {
	if(str==null){
		str="";
	}
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
	var hours=date.getHours();
	var minutes=date.getMinutes();
	var seconds=date.getSeconds();
	if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
    }
	if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
	if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
	
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hours + seperator2 + minutes
            + seperator2 + seconds+"."+date.getMilliseconds();
    return currentdate+str;
}
function taskurl(url) {
	return {
		'url': url,
		'headers': {
			'Host': 'guangdong-tobacco.ycwemedia.com',
			'Accept-Encoding': 'gzip, deflate, br',
			'Cookie': cookie,
			'Connection': 'keep-alive',
			'Accept': '*/*',
			'UserAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
			'Accept-Language': 'zh-cn',
			'Referer': 'https://guangdong-tobacco.ycwemedia.com/guangdong/activity/watermelon/h5/rank.html'
		},
	}
}

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
