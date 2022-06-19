var request = require('request');

const $ = new Env('黑龙江');
const notify = $.isNode() ? require('./sendNotify') : '';
//以下用户登录信息
let cookies=[
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEyNzIsImF1ZCI6IiIsImV4cCI6MjY2MzM4NzQ1MywiaWF0IjoxNjU1Mzg3NDUzLCJpc3MiOiIiLCJqdGkiOiIwZjU1NjY5MTZmMTBlOTQ3NWM1YjAwY2IxNDE5ZDNkMyIsIm5iZiI6MTY1NTM4NzQ1Mywic3ViIjoiIn0.FEh-n2Yi5m92ts6NLk0SePRruRkW0EunwLRo2vHrk5U',//leebear
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxNDIwIiwiYXVkIjoiIiwiZXhwIjoyNjYzMzk0NDg0LCJpYXQiOjE2NTUzOTQ0ODQsImlzcyI6IiIsImp0aSI6Ijg5NDNiMDI0NGE2NTQyM2Y5NTEwMDc4YTQzNDFhOGMzIiwibmJmIjoxNjU1Mzk0NDg0LCJzdWIiOiIifQ.KvuShnJ6qFPKXdi5-pCWUM8AmaT6Yzdzvczh7QmqcS8',//004
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxNDE2IiwiYXVkIjoiIiwiZXhwIjoyNjYzMzk0Mjg1LCJpYXQiOjE2NTUzOTQyODUsImlzcyI6IiIsImp0aSI6ImNlYTA2MmMwYzI5MDE0NDdhNmMyYTM4ZGM4Y2JiOTRiIiwibmJmIjoxNjU1Mzk0Mjg1LCJzdWIiOiIifQ.5H5JVWnVCqDWYACViDETxzSr_FltCvyfKOzYCR2V_Ug',//003
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxNDAyIiwiYXVkIjoiIiwiZXhwIjoyNjYzMzkzMzc0LCJpYXQiOjE2NTUzOTMzNzQsImlzcyI6IiIsImp0aSI6IjYxM2Y2MGJkOGNhODljNzFiMGY1MWY1MDM1MzNmM2VkIiwibmJmIjoxNjU1MzkzMzc0LCJzdWIiOiIifQ.YenfInLsGAYTuJ4psE8aZ4gWKZTxxXNftQRmUZc6dh0',//天天快乐
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMzk0IiwiYXVkIjoiIiwiZXhwIjoyNjYzMzkyNzgwLCJpYXQiOjE2NTUzOTI3ODAsImlzcyI6IiIsImp0aSI6ImNlODA5NmUwMTBmZTJmZmY3YzMyNjBhMTZiNTBlMzAwIiwibmJmIjoxNjU1MzkyNzgwLCJzdWIiOiIifQ.j38Y7XT8M5XU6VL2WFvBl87i0dhFSZkVc6JLh4mlf1o',//刘淑芳
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxNDA5IiwiYXVkIjoiIiwiZXhwIjoyNjYzMzkzODcxLCJpYXQiOjE2NTUzOTM4NzEsImlzcyI6IiIsImp0aSI6Ijk4N2Q3YjQ2ZDNhNTRiZTczNmU2MGRjZWRlOTQ1MTU4IiwibmJmIjoxNjU1MzkzODcxLCJzdWIiOiIifQ.y9ygrC8_vIeSmOPP3opFl60oL4gdZT3ePbCLlRDqCVs',//001
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxNDEyIiwiYXVkIjoiIiwiZXhwIjoyNjYzMzk0MTA3LCJpYXQiOjE2NTUzOTQxMDcsImlzcyI6IiIsImp0aSI6IjE1NGRmMmJkNzE3YmNjNjY4ODk0ZjkwN2FiYTJlYjc5IiwibmJmIjoxNjU1Mzk0MTA3LCJzdWIiOiIifQ.Mg2Fz9yuEV9LyLGDo1hixQBTotDw4uZ7WythUTur8XA',//002
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEzOTEsImF1ZCI6IiIsImV4cCI6MjY2MzM5MzE4MiwiaWF0IjoxNjU1MzkzMTgyLCJpc3MiOiIiLCJqdGkiOiIwNDVlNmE1OWE1MjU2NGE1MzIwMzdiNzQ1NDc2ZGQ1OCIsIm5iZiI6MTY1NTM5MzE4Miwic3ViIjoiIn0.MNRjQP22g6BB-13nuCVxEaYfwnb_nU4mDLMQMlGHa_g',//bona
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMzk3IiwiYXVkIjoiIiwiZXhwIjoyNjYzMzkyOTc3LCJpYXQiOjE2NTUzOTI5NzcsImlzcyI6IiIsImp0aSI6ImI1MDFhYjM1YTgxNzM0MWViMzIxNzI0YjdmZTE0YTVlIiwibmJmIjoxNjU1MzkyOTc3LCJzdWIiOiIifQ.mSenelcX0FFjcZ2HHxtPAhabhcw51jymTdnOcGlfMVE',//明涛
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjE4ODAsImF1ZCI6IiIsImV4cCI6MjY2MzUxNDk2NiwiaWF0IjoxNjU1NTE0OTY2LCJpc3MiOiIiLCJqdGkiOiJkNThkMTQxMmE3YmJlNDljZGQ2OTdiZGQyZDdmYjVlOCIsIm5iZiI6MTY1NTUxNDk2Niwic3ViIjoiIn0.uPMPbHvgAjJqAaVOT1obP8IETWIM5nCVYbFdJ9XpvIk',//圈圈
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxOTk1IiwiYXVkIjoiIiwiZXhwIjoyNjYzNTIyMjcxLCJpYXQiOjE2NTU1MjIyNzEsImlzcyI6IiIsImp0aSI6IjIyNjU2Mjg2M2MzZWFjMTliM2FjNDZkYWE4ZTk5ZGE5IiwibmJmIjoxNjU1NTIyMjcxLCJzdWIiOiIifQ.-6yI4CuBy7V36vRlar5FlQY-kmRaSMJtMBULbUEOXdA',//圈圈2
]
let cookie="";
let options=[],totallMessage=``;
let time=12;
var isOK=true;
!(async () => {
	if (null==process.env.HLJ_COOKIE||''==process.env.HLJ_COOKIE){
		console.log(`💩 未设置变量HLJ_COOKIE`);
		return;
	}
	do{
		isOK=true;
		totallMessage=``;
		for(var i=0;i<cookies.length;i++){
			totallMessage+=totallMessage+`开始第`+(i+1)+`个账号\n`;
			cookie=cookies[i];
			await startGame();
			time=12+Math.floor(Math.random()*3);//0-3
			if(options.length==10){
				isOK=false;
				console.log(`💩 答题时间:`+time);
				await $.wait(time*1000);
				await submitAnswer();
				console.log(`💩 等待时间:10s`);
				await $.wait(30000);
			}

		}
	}while(!isOK)
	totallMessage+=totallMessage+`黑龙江小程序答题完成！\n`;
	if ($.isNode() && totallMessage) {
		await notify.sendNotify(`${$.name}`, `${totallMessage}`)
	}

})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })



function startGame(){ 
	console.log(getNowFormatDate()+"开始答题》》》");
	//options置空
	options.splice(0,options.length);
	return new Promise((resolve, reject) => {
		let option = taskurl(`https://nyqa.zifuyueqian.com/api/subject/list?activityId=20`)
		$.get(option, (err, resp, data) => {
			try {
				if (err) {
					console.log(` API请求失败，请检查网路\n${JSON.stringify(err)}`)
				} else {
					data = JSON.parse(data)
					//console.log(data)
					if (data.code==100) {//成功
						console.log(getNowFormatDate()+"获取信息成功》》》");
						//console.log(data.data);
						//console.log(data.data.length);
						for(var j=0;j<data.data.length;j++){
							var obj={};
							obj['subjectId']=data.data[j].subjectId;
							var subjectAnswerId="";
							for(var k=0;k<data.data[j].answer_list.length;k++){
								if(data.data[j].answer_list[k].isCorrect==1){
									//正确选项
									subjectAnswerId=subjectAnswerId+data.data[j].answer_list[k].subjectAnswerId+',';
								}
							}
							subjectAnswerId=subjectAnswerId.substring(0,subjectAnswerId.length-1);
							obj['subjectAnswerId']=subjectAnswerId;
							obj['value']="";
							
							options.push(obj);
						}
					} else {
						console.log(`💩 获得列表失败: ${data.msg}`);
						totallMessage+=totallMessage+`💩 获得列表失败: ${data.msg}\n`;
					}
				}
			} catch (e) {
				reject(`API返回结果解析出错\n${e}\n${JSON.stringify(data)}`)
			} finally {
				resolve()
			}
		})
	})
}

function submitAnswer(){ 
	console.log(getNowFormatDate()+"提交答案》》》");
	var headers={
        'Host': 'nyqa.zifuyueqian.com',
		'Authorization': cookie,
		'Connection': 'keep-alive',
		'content-type': 'application/json',
		'Accept-Encoding':'gzip,compress,br,deflate',
		'UserAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
		'Referer': 'https://servicewechat.com/wx6e6e0597b28b627e/5/page-frame',
		
      }
	request.post({url:'https://nyqa.zifuyueqian.com/api/subject/commit',headers:headers, form:{
		"activityId": 20,
		"use_sec": time,
		"options": JSON.stringify(options)
	}}, function(error, response, body) {
		//console.log(error,response,body)
		console.log(body)
	})
	
	/*return new Promise(async resolve => {
	  //转换小时分钟。
	//const jdata='{"battleRoomId":"93766","battleTeamId":"95336"}';
	//const jdata='{"activityId":20,"use_sec":140,"options":"'+JSON.stringify(options)+'"};';
	var opStr="";
	for(var j=0;j<options.length;j++){
		opStr=opStr+'{\"subjectId\":'+options[j].subjectId+',\"subjectAnswerId\":\"'+options[j].subjectAnswerId+'\",\"value\":\"\"},'
		
	}
	opStr=opStr.substring(0,opStr.length-1);
	//console.log(opStr);
	const jdata='{"activityId":20,"use_sec":15,"options":'+JSON.stringify(options)+'}';
    const op = {
      "url": `https://nyqa.zifuyueqian.com/api/subject/commit`,
	  'method': 'POST',
      "headers": {
        'Host': 'nyqa.zifuyueqian.com',
		'Authorization': cookie,
		'Connection': 'keep-alive',
		'content-type': 'application/json',
		'Accept-Encoding':'gzip,compress,br,deflate',
		'UserAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
		'Referer': 'https://servicewechat.com/wx6e6e0597b28b627e/5/page-frame',
		
      },
	  'body':'{"activityId":20,"use_sec":15,"options":'+JSON.stringify(options)+'}'
    }
	console.log(op);
   $.post(op, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
			console.log(data);
			
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
  })*/
}

function taskurl(url) {
	return {
		'url': url,
		'headers': {
			'Host': 'nyqa.zifuyueqian.com',
			'Authorization': cookie,
			'Connection': 'keep-alive',
			'content-type': 'application/json',
			'UserAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
			'Referer': 'https://servicewechat.com/wx6e6e0597b28b627e/5/page-frame'
		},
	}
}

function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

function getNowFormatDate() {
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
    return currentdate;
}


// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

