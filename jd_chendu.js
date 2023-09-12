/*
成都
 */
const $ = new Env('成都');
// index.js
const fs = require('fs');
var request = require('request')
 
const JD_API_HOST = 'https://dt.tylehuo.cn//api/kaoshi/';
var userList=[

		{
			"cookie":'audioStop=0; JSESSIONID=8BB3868E50AC0FF9C8F2EE27CEAEC6E2; shareJoinerIdCookies_fqzeoy=230911081406280228; userOnlineStatus=1; JoinerId_fqzeoy=230911091131725780; mpNo100465=oYTZ66PYn_RvUJ6NMKsg5asz7IJs; userCookiesId_fqzeoy=230911091131725780; topic_user_deviceId=EF0948F2BC1847AFA31FECBA1E85B6F7',
			"joinerId":"230911091131725780",
			"wxUserId":"oYTZ66PYn_RvUJ6NMKsg5asz7IJs",
			"contacts":"%E5%BC%A0%E5%85%B5",
			"mobileNo":"18012225989",
		},
		{
			"cookie":'JSESSIONID=E7E739386EA95803AF04FCAF0E7571E8; audioStop=0; topic_user_deviceId=889FA51E59D74412875B31A05469B003; shareJoinerIdCookies_fqzeoy=230911081406280228; mpNo100465=oYTZ66HlkkiYWyzeBsJrQk2r8G68; userOnlineStatus=1; userCookiesId_fqzeoy=230911222219187173',
			"joinerId":"230911222219187173",
			"wxUserId":"oYTZ66HlkkiYWyzeBsJrQk2r8G68",
			"contacts":"%E4%BB%BB%E4%BD%B3%E8%8E%B9",
			"mobileNo":"18068603568",
		},
		{
			"cookie":'JSESSIONID=C194F9E683C0B44D1D62247798788544; audioStop=0; topic_user_deviceId=E2A2CDE368F041B3A7F10ACF6B5C2C3B; shareJoinerIdCookies_fqzeoy=230911081406280228; mpNo100465=oYTZ66HqVbXVlh_fnl5GJsYBR5O0; userOnlineStatus=1; userCookiesId_fqzeoy=230911224313441406',
			"joinerId":"230911224313441406",
			"wxUserId":"oYTZ66HqVbXVlh_fnl5GJsYBR5O0",
			"contacts":"%E5%BC%A0%E9%9C%9E",
			"mobileNo":"17802595869",
		},
		{
			"cookie":'JSESSIONID=7E3071E72627AABEEF5E3C5789F21D53; audioStop=0; topic_user_deviceId=23151DDAB0D244BE85586029C7321FBB; shareJoinerIdCookies_fqzeoy=230911081406280228; mpNo100465=oYTZ66Ir4iA8SsBNgYjzllXH3dG0; userOnlineStatus=1; userCookiesId_fqzeoy=230911230035483139',
			"joinerId":"230911230035483139",
			"wxUserId":"oYTZ66Ir4iA8SsBNgYjzllXH3dG0",
			"contacts":"%E8%92%8B%E9%AA%8F",
			"mobileNo":"13584640176",
		},
		{
			"cookie":'JSESSIONID=B17B468DD55B5B1925F5D5880E4319BA; audioStop=0; topic_user_deviceId=8A41AEB458ED4E089E668A73D0F7CCD9; mpNo100465=oYTZ66Cm_YcoErUDIzevVjHKDJRE; userCookiesId_fqzeoy=230911225220988175; JoinerId_fqzeoy=230911225220988175; userOnlineStatus=1; shareJoinerIdCookies_fqzeoy=230911081406280228',
			"joinerId":"230911225220988175",
			"wxUserId":"oYTZ66Cm_YcoErUDIzevVjHKDJRE",
			"contacts":"%E6%9D%8E%E6%96%8C",
			"mobileNo":"18651306657",
		}
	
]



!(async () => {
	//把cookies顺序打乱
	console.log("开始----随机账号顺序");
	for(var i=0;i<userList.length;i++){
		$.user=userList[i];
		console.log("第"+(i+1)+"个账号"+",手机:"+$.user.mobileNo)
		await getQuestion();	
		if($.gradeId!=null){
			$.time=15000+Math.floor(Math.random()*1800);
			await $.wait($.time);
			await submitAnswer();
		}
		await choujiang();
		await $.wait(1000);
	}



})().catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
}).finally(() => {
	$.done();
})
  
function choujiang(){
   return new Promise(async resolve => {
	var data={
		"activityNo":"fqzeoy",
		"joinerId":$.user.joinerId,
		"rid":"",
	}
	var dataStr = "";
    for (var i in data) {
    //i就是key data[key]就是他的值
        var tmpData=data[i]?data[i]:"";
        dataStr += i + "=" + tmpData+ "&";
    }

	const options = {
      "url": `http://fqzeoy.wx.juxuewen.com/appActivity/lotteryWithQualifications.do `,
      "headers": {
		  'Host': 'fqzeoy.wx.juxuewen.com',
		  'Connection': 'keep-alive',
		  'Referer': 'https://servicewechat.com/wxd0888dae7242773c/11/page-frame.html',
		  'User-Agent': 'Mozilla/5.0 (Linux; Android 10; YAL-AL10 Build/HUAWEIYAL-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3211 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/916 MicroMessenger/8.0.21.2120(0x2800153F) Process/toolsmp WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
		  'Accept':'application/json, text/javascript, */*; q=0.01',
		  'Accept-Encoding':'gzip, deflate',
		  'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		  'token':$.user.cookie,
		},
	  "timeout": 3000,
	  'body':dataStr
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
			console.log(data);
			data=JSON.parse(data);

			//console.log($.questionList);
          } else {
            console.log(`服务器返回空数据`)
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



function getQuestion(){
  return new Promise(async resolve => {
	var data={
		"gradeId":"",
		"merchantNo":"101340",
		"activityNo":"fqzeoy",
		"productNo":"1031",
		"joinerId":$.user.joinerId,
		"wxUserId":$.user.wxUserId,
		"nickname":"",
		"openid":$.user.wxUserId,
		"grade":"0",
		"answerCostTime":"0",
		"contacts":$.user.contacts,
		"mobileNo":$.user.mobileNo,
	}
	var dataStr = "";
    for (var i in data) {
    //i就是key data[key]就是他的值
        var tmpData=data[i]?data[i]:"";
        dataStr += i + "=" + tmpData+ "&";
    }

	const options = {
      "url": `http://fqzeoy.wx.juxuewen.com/appActivity/startAppBaseTopicCheck.do `,
      "headers": {
		  'Host': 'fqzeoy.wx.juxuewen.com',
		  'Connection': 'keep-alive',
		  'Referer': 'https://servicewechat.com/wxd0888dae7242773c/11/page-frame.html',
		  'User-Agent': 'Mozilla/5.0 (Linux; Android 10; YAL-AL10 Build/HUAWEIYAL-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3211 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/916 MicroMessenger/8.0.21.2120(0x2800153F) Process/toolsmp WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
		  'Accept':'application/json, text/javascript, */*; q=0.01',
		  'Accept-Encoding':'gzip, deflate',
		  'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		  'token':$.user.cookie,
		},
	  "timeout": 3000,
	  'body':dataStr
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
			//console.log(data);
			data=JSON.parse(data);
			if(data.resultCode!="S000"){
				console.log(data.resultMessage);
			}else{
				$.gradeId=data.coTopicTestGrade.gradeId;
				console.log($.gradeId);
				$.questionList=data.subjectAndOptionsBeanList;
			}

			//console.log($.questionList);
          } else {
            console.log(`服务器返回空数据`)
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


function submitAnswer(){
	
  return new Promise(async resolve => {
	var checkjsonnum=[];
	for(var i=0;i<$.questionList.length;i++){
		var obj={
			"topicId":$.questionList[i].coTopicSubjectExt.topicId,
			"answerOptionName":$.questionList[i].coTopicSubjectExt.rightAnswer,
			"answerScore":1
		}
		checkjsonnum.push(obj);
	}
	var data={
		"gradeId":$.gradeId,
		"merchantNo":"101340",
		"activityNo":"fqzeoy",
		"productNo":"1031",
		"joinerId":$.user.joinerId,
		"wxUserId":$.user.wxUserId,
		"nickname":"",
		"openid":$.user.wxUserId,
		"grade":"15",
		"answerCostTime":Math.floor($.time/1000),
		"contacts":$.user.contacts,
		"mobileNo":$.user.mobileNo,
		"topicAnswerRecordListStr":JSON.stringify(checkjsonnum)
	}
	var dataStr = "";
    for (var i in data) {
    //i就是key data[key]就是他的值
        var tmpData=data[i]?data[i]:"";
        dataStr += i + "=" + tmpData+ "&";
    }
	//console.log(dataStr)

	const options = {
      "url": `http://fqzeoy.wx.juxuewen.com/appActivity/saveAppBaseTopicTestGrade.do `,
      "headers": {
		  'Host': 'fqzeoy.wx.juxuewen.com',
		  'Connection': 'keep-alive',
		  'Referer': 'https://servicewechat.com/wxd0888dae7242773c/11/page-frame.html',
		  'User-Agent': 'Mozilla/5.0 (Linux; Android 10; YAL-AL10 Build/HUAWEIYAL-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3211 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/916 MicroMessenger/8.0.21.2120(0x2800153F) Process/toolsmp WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
		  'Accept':'application/json, text/javascript, */*; q=0.01',
		  'Accept-Encoding':'gzip, deflate',
		  'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		  'token':$.user.cookie,
		},
	  "timeout": 3000,
	  'body':dataStr
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
			console.log(data);
			data=JSON.parse(data);
			
          } else {
            console.log(`服务器返回空数据`)
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




// 生成随机姓名
function getName(){
	var familyNames = new Array(
		"赵",  "钱",  "孙",  "李",  "周",  "吴",  "郑",  "王",  "冯",  "陈",  
		"褚",  "卫",  "蒋",  "沈",  "韩",  "杨",  "朱",  "秦",  "尤",  "许",
		"何",  "吕",  "施",  "张",  "孔",  "曹",  "严",  "华",  "金",  "魏",  
		"陶",  "姜",  "戚",  "谢",  "邹",  "喻",  "柏",  "水",  "窦",  "章",
		"云",  "苏",  "潘",  "葛",  "奚",  "范",  "彭",  "郎",  "鲁",  "韦",  
		"昌",  "马",  "苗",  "凤",  "花",  "方",  "俞",  "任",  "袁",  "柳",
		"酆",  "鲍",  "史",  "唐",  "费",  "廉",  "岑",  "薛",  "雷",  "贺",  
		"倪",  "汤",  "滕",  "殷",  "罗",  "毕",  "郝",  "邬",  "安",  "常",
		"乐",  "于",  "时",  "傅",  "皮",  "卞",  "齐",  "康",  "伍",  "余",  
		"元",  "卜",  "顾",  "孟",  "平",  "黄",  "和",  "穆",  "萧",  "尹",
		"欧阳","太史","端木","上官","司马","东方","独孤","南宫","万俟","闻人",
		"夏侯","诸葛","尉迟","公羊","赫连","澹台","皇甫","宗政","濮阳","公冶",
		"太叔","申屠","公孙","慕容","仲孙","钟离","长孙","宇文","司徒","鲜于",
		"司空","闾丘","子车","亓官","司寇","巫马","公西","颛孙","壤驷","公良",
		"漆雕","乐正","宰父","谷梁","拓跋","夹谷","轩辕","令狐","段干","百里",
		"呼延","东郭","南门","羊舌","微生","公户","公玉","公仪","梁丘","公仲",
		"公上","公门","公山","公坚","左丘","公伯","西门","公祖","第五","公乘",
		"贯丘","公皙","南荣","东里","东宫","仲长","子书","子桑","即墨","达奚",
		"褚师"
		);
	var givenNames = new Array(
		"杰", "兵", "斌", "建", "峰", "刚", "田", "一", "晶", "近平", "明涛", 
		"子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛", 
		"昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊", 
		"东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政", 
		"美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建", 
		"建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋", 
		"涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅", 
		"子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡", 
		"佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕", 
		"佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵", 
		"清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌",
		"亚友","杰","飞","森林","学峰","兴强","友超","旭亮","景云","亚文","满亮","立富",
		"绍宇","碧波","金青","柏霖","长伟","耀明","奎仁","金益","绍忠","新竣","帅武",
		"志平","旭烈","平川","真丰","江波","立江","世昭","钧瑞","岩岩","海钰","浩剑",
		"武平","发凯","跃国","德勇","佩艺","纤妃","寐薇","姳姈","婧颍","莺苇","宕妮",
		"圆轻","金彩","团芷","芙蝶","苏末","虔澜","茂火","芸棠","秘蔷","菌彨","菡肤",
		"夜倩","娅聪","恣霭","茜莱","绢妙","娴莎","闵馝","绮澜","茉裳","妖苑","挽月",
		"纽聆","槐欢","姬銮","芬琼","蜜谣","蕊壁","渗莎","桃基","姹榛","眈菱","婵惠",
		"音袁","梅琳","苹冰","漪眠","琴嫦","如亩","任锦","湘菌","秘娃","浆影"
		);

	var i = parseInt(10 * Math.random())*10 + parseInt(10 * Math.random());
	var familyName = familyNames[i];

	var j = parseInt(10 * Math.random())*10 + parseInt(10 * Math.random());
	var givenName = givenNames[i];

	var name = familyName + givenName;
	return name;

}

function getMoble() {
	var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "139", "147", "153", "158", "159", "170", "178", "182", "183","180", "187", "189");
	var i = parseInt(10 * Math.random());
	var prefix = prefixArray[i];
	for (var j = 0; j < 8; j++) {
	prefix = prefix + Math.floor(Math.random() * 10);
	}
	return prefix;
}


function taskUrl(body) {
  return {
    url: `${JD_API_HOST}?${body}`,
    headers: {
      'Host': 'webapp.yunnan.cn',
	  'Cookie':'',
      'Connection': 'keep-alive',
	  'Accept':'application/json, text/javascript, */*; q=0.01',
	  'X-Requested-With':'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Referer': 'https://webapp.yunnan.cn/new/s/2021/ztf/nyncwd/index.html',
      'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN") : ($.getdata('JDUA') ? $.getdata('JDUA') : "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN"),
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
    }
  }
}

function getPostRequest(type, body) {
  const url = `https://webapp.yunnan.cn/new/index.php?${type}`;
  const method = `POST`;
  const headers = {
    		  'Host': 'webapp.yunnan.cn',
		  'Connection': 'keep-alive',
		  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		  'Referer': 'https://webapp.yunnan.cn/new/s/2022/wsp/aqrdt/index.html',
		  'User-Agent': 'Mozilla/5.0 (Linux; Android 10; YAL-AL10 Build/HUAWEIYAL-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3211 MMWEBSDK/20220303 Mobile Safari/537.36 MMWEBID/916 MicroMessenger/8.0.21.2120(0x2800153F) Process/toolsmp WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
		  'Accept':'application/json, text/javascript, */*; q=0.01',
		  'Accept-Encoding':'gzip, deflate',
		  'X-Requested-With':'XMLHttpRequest',
		  'Sec-Fetch-Site':'same-origin',
		  'Sec-Fetch-Mode':'cors',
		  'Sec-Fetch-Dest':'empty',
		  'Origin':'https://webapp.yunnan.cn',
		  'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		  'Cookie':'',
  };
  return {url: url, method: method, headers: headers, body: body};
}

function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}

function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '不要在BoxJS手动复制粘贴修改cookie')
      return [];
    }
  }
}

var questions=[
    
];
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
