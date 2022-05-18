/*
南京证券
===========================

cron:20,50 * * * *
============Quantumultx===============
[task_local]
#南京证券
20,50 * * * * jd_nanjinjs, tag=南京证券, enabled=true
 */
const $ = new Env('南京证券');
// index.js
const fs = require('fs');
 
let options = {
 flags: 'a', // 
 encoding: 'utf8', // utf8编码
}
let stderr = fs.createWriteStream('./a.log', options);
// 创建logger
let logger = new console.Console(stderr);
const JD_API_HOST = 'https://webapp.yunnan.cn/new/index.php';
var userInfos=[
	{
		id:"guotai=rk3g8q6vekmhujq3qo31bmcvim;",//bona
		num:0
	},
	{
		id:"guotai=uuuackbg77nimab9rhpf69jmdf;",//001
		num:0
	},
	{
		id:"guotai=81phj2d2226olbj2f91cefsoao;",//002
		num:0
	},
	{
		id:"guotai=svnugko135cv1nbkbumojiidpn;",//003
		num:0
	},
	{
		id:"guotai=epms5edm69s61qocfm5nkc4ck6;",//004
		num:0
	},
	{
		id:"guotai=o1uqcne2l2d99t2l6i5rin8ukm;",//005
		num:0
	},
	/*{
		id:"guotai=p82ef0k81qn6eromtt659ut16a;",//006
		num:0
	},
	{
		id:"guotai=b98bpjqk2im9e4cpqmucbnp3fl;",//007
		num:0
	}*/
]
var logInUrlList=[
	"http://njzq.game.raysfly.com/index.php/api/public/user-info?data={%22openid%22:%22oH5oJuMWeyN3yw7Mw5xtR4cPqX04%22,%22nickname%22:%22Bonoa%22,%22sex%22:0,%22language%22:%22%22,%22city%22:%22%22,%22province%22:%22%22,%22country%22:%22%22,%22headimgurl%22:%22https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/deV2iazkryTpL6HqTlx3cT6aLkMVmEfgxheFwEWN7yRvwDpGNsU3D40JUTWgbdNMFZfnicnLF1SRiaZicStIv1hUcA\/132%22,%22privilege%22:[],%22unionid%22:%22oR8zfwju33sawR4duUpaHSSqDerM%22}",//bona
	"http://njzq.game.raysfly.com/index.php/api/public/user-info?data={%22openid%22:%22oH5oJuK654y6n51Mh3uhP3mV8DXM%22,%22nickname%22:%22\u4e0d\u89c1\u4e0d\u6563%22,%22sex%22:0,%22language%22:%22%22,%22city%22:%22%22,%22province%22:%22%22,%22country%22:%22%22,%22headimgurl%22:%22https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/BVGhgUXSuuNlWebXvibmn66FFweIfOWycdvS40M9BqZvSJVbI9et05GEoricEeZf8K8AXek0icocpicd8ZbQG4QM7g\/132%22,%22privilege%22:[],%22unionid%22:%22oR8zfwjMI3TzXmhuscscjM15XMJw%22}",//001
	"http://njzq.game.raysfly.com/index.php/api/public/user-info?data={%22openid%22:%22oH5oJuMRvHv_jQk9ikPHXtzYGmTs%22,%22nickname%22:%22Tenny%20wenny%22,%22sex%22:0,%22language%22:%22%22,%22city%22:%22%22,%22province%22:%22%22,%22country%22:%22%22,%22headimgurl%22:%22https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/iah9ialZUzXesMRAdlPRnhfSiag7ia5f3Zhjlk5yNuRO2eB6ydsw3xZRRYibDyic7sMicHpTtA9I6VhHCmcQA0qibHLNiag\/132%22,%22privilege%22:[],%22unionid%22:%22oR8zfwsdRopQj2BJ0hItYNMhhxp0%22}",//002
	"http://njzq.game.raysfly.com/index.php/api/public/user-info?data={%22openid%22:%22oH5oJuHuaLfUkQwiCAp_jnZR_v7Y%22,%22nickname%22:%22\u5929\u916c%22,%22sex%22:0,%22language%22:%22%22,%22city%22:%22%22,%22province%22:%22%22,%22country%22:%22%22,%22headimgurl%22:%22https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/TVgjpue96Bwk0riaUalgqh9SfQY89MqKVzMqhqSNP1QhEXa5xNaIAunveHkoEAWeQOM7yJO2aX7b7LaQrmYVXnQ\/132%22,%22privilege%22:[],%22unionid%22:%22oR8zfwmUzf9NFeqsMZpYmjpYHT1Y%22}",//003
	"http://njzq.game.raysfly.com/index.php/api/public/user-info?data={%22openid%22:%22oH5oJuGw4iUD1rY_N3BifJ8A-2Gc%22,%22nickname%22:%22sweety%22,%22sex%22:0,%22language%22:%22%22,%22city%22:%22%22,%22province%22:%22%22,%22country%22:%22%22,%22headimgurl%22:%22https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/jUrJ5NyTGTYatRomHNnPMNKHIQ7yMLsruCnm98hNc0BOLuqID1OFS7micaKUNSbguo28E7pySuicibUedEuxm8lYQ\/132%22,%22privilege%22:[],%22unionid%22:%22oR8zfwiwRy5jdez347nbO3H1Dt_Q%22}",//004
	"http://njzq.game.raysfly.com/index.php/api/public/user-info?data={%22openid%22:%22oH5oJuOql_YpW86oO0V3M7Szd2wI%22,%22nickname%22:%22\u6210\u662f\u975e%22,%22sex%22:0,%22language%22:%22%22,%22city%22:%22%22,%22province%22:%22%22,%22country%22:%22%22,%22headimgurl%22:%22https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/msRmMzLXaxweoBG67WzHmveKJX4e01yvRp9icJGYHnvLaRbYiaFjxjFuZa1Sgfdqh6rkFmHXbemHjDeTQTFtBzlQ\/132%22,%22privilege%22:[],%22unionid%22:%22oR8zfwrjKXIRs_Rx1zSMFbzcVpVw%22}",//005
	//"http://njzq.game.raysfly.com/index.php/api/public/user-info?data={%22openid%22:%22oH5oJuOVjiHlJe_LC8CjiLTlPJ9g%22,%22nickname%22:%22\u9ec4\u5c71\u4eba\u5bb6%22,%22sex%22:0,%22language%22:%22%22,%22city%22:%22%22,%22province%22:%22%22,%22country%22:%22%22,%22headimgurl%22:%22https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/1uQhUgz5gMetreoILSdRMX7FJibG2Gn0zmLsjEv2JhvYySICYP7WJ32puCpl6CjW7iaib4CA6pkb3GVJueyVWuzBQ\/132%22,%22privilege%22:[],%22unionid%22:%22oR8zfwucqu32nQLu5XL5NE7QzJsU%22}",//006
	//"http://njzq.game.raysfly.com/index.php/api/public/user-info?data={%22openid%22:%22oH5oJuHkOcSqBJKH0kfqSJTixMic%22,%22nickname%22:%22\u7f8e\u7f57\u57f9\u5357%22,%22sex%22:0,%22language%22:%22%22,%22city%22:%22%22,%22province%22:%22%22,%22country%22:%22%22,%22headimgurl%22:%22https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/2bicqibaxw5xONBbJ9Fj3ZgK4I46klGic3gTrPTDc3IEefibgqZO5j1skBPo1MTq7HNpOxcNbEEtvkehLK3iake0K0A\/132%22,%22privilege%22:[],%22unionid%22:%22oR8zfwvLzN3Im8u4K_-AyepinMCo%22}",//007
]
!(async () => {
	if (!process.env.MY_TRY) {
		console.log("MY_TRY未设置,已结束");
		return
	}
	do{
		for(var i=0;i<userInfos.length;i++){
			console.log("开始账号"+(i+1)+"--------------------------")
			$.cookie=userInfos[i].id;
			$.loginUrl=logInUrlList[i];
			console.log("登录");
			await getLogIn();
			//获取排名
			await getRank();
			userInfos[i].num=$.num;
			if(userInfos[i].num>1){
				await start();
				await $.wait(100);
			}

		}
		var time=Math.floor(Math.random()*15+55)*1000
		console.log("等待——"+time+"ms");
		await $.wait(time);
		for(var i=0;i<userInfos.length;i++){
			console.log("结束账号"+(i+1)+"--------------------------")
			$.cookie=userInfos[i].id;
			if(userInfos[i].num>1){
				await submitScore();
				await $.wait(100);
			}
			
		}
	}while(1==1)
	

	
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

function start() {
	return new Promise(async resolve => {
	var bodyStr=encodeURI("");
    const options = {
      "url": `http://njzq.game.raysfly.com/index.php/api/public/get-capital`,
      "headers": {
		  'Host': 'njzq.game.raysfly.com',
		  'Connection': 'keep-alive',
		  'Referer': 'http://njzq.game.raysfly.com/game/',
		  'User-Agent': 'Mozilla/5.0 (Linux; Android 10; YAL-AL10 Build/HUAWEIYAL-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3225 MMWEBSDK/20220402 Mobile Safari/537.36 MMWEBID/916 MicroMessenger/8.0.22.2140(0x28001651) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
		  'Accept-Encoding':'gzip, deflate',
		  'X-Requested-With':'com.tencent.mm',
		  'Origin':'http://njzq.game.raysfly.com',
		  'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		  'Cookie':$.cookie,
		},
	  'body':bodyStr 
    }
	//console.log(options);
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            //data = JSON.parse(data);
			console.log(data);
			if(data.code==0){
				//成功
				//console.log("开始成功");
				
			}
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


function getLogIn(){//
		//console.log("调用一下方法");
	let body = $.loginUrl;
	return new Promise(resolve => {
	$.get(taskUrl(body), (err, resp, data) => {
	  try {
		if (err) {
		  console.log(`${JSON.stringify(err)}`)
		  console.log(`API请求失败，请检查网路重试`)
		} else {
		  //if (safeGet(data)) {
			//data = JSON.parse(data);
			//console.log(data);

		  //}
		}
	  } catch (e) {
		$.logErr(e, resp)
	  } finally {
		resolve(data);
	  }
	})
	})
}

function getRank(){//获取排名
		//console.log("调用一下方法");
	let body = "http://njzq.game.raysfly.com/index.php/api/public/user-list?page=1&pageSize=100";
	return new Promise(resolve => {
	$.get(taskUrl(body), (err, resp, data) => {
	  try {
		if (err) {
		  console.log(`${JSON.stringify(err)}`)
		  console.log(`API请求失败，请检查网路重试`)
		} else {
		  if (safeGet(data)) {
			data = JSON.parse(data);
			$.num=data.data.user.num;
		  }
		}
	  } catch (e) {
		$.logErr(e, resp)
	  } finally {
		resolve(data);
	  }
	})
	})
}

function submitScore(){//提交成绩
	console.log("提交成绩");
	return new Promise(async resolve => {
		var dd=Math.floor(Math.random()*5+2)*1;
		var cc=dd*10+10;
		console.log("成绩："+"capital="+cc+"&right_sub_num="+dd);
	var bodyStr=encodeURI("capital="+cc+"&right_sub_num="+dd);
    const options = {
      "url": `http://njzq.game.raysfly.com/index.php/api/game/set-game-result`,
      "headers": {
		  'Host': 'njzq.game.raysfly.com',
		  'Connection': 'keep-alive',
		  'Referer': 'http://njzq.game.raysfly.com/game/',
		  'User-Agent': 'Mozilla/5.0 (Linux; Android 10; YAL-AL10 Build/HUAWEIYAL-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3225 MMWEBSDK/20220402 Mobile Safari/537.36 MMWEBID/916 MicroMessenger/8.0.22.2140(0x28001651) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
		  'Accept-Encoding':'gzip, deflate',
		  'X-Requested-With':'com.tencent.mm',
		  'Origin':'http://njzq.game.raysfly.com',
		  'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		  'Cookie':$.cookie,
		},
	  'body':bodyStr 
    }
	//console.log(options);
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
			  console.log(data);
			data = JSON.parse(data);
			console.log(data);
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

function taskUrl(body) {
  return {
    url: `${body}`,
    headers: {
      'Host': 'njzq.game.raysfly.com',
	  'Connection': 'keep-alive',
	  'Referer': 'http://njzq.game.raysfly.com/game/',
	  'User-Agent': 'Mozilla/5.0 (Linux; Android 10; YAL-AL10 Build/HUAWEIYAL-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3225 MMWEBSDK/20220402 Mobile Safari/537.36 MMWEBID/916 MicroMessenger/8.0.22.2140(0x28001651) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
	  'Accept-Encoding':'gzip, deflate',
	  'X-Requested-With':'com.tencent.mm',
	  'Origin':'http://njzq.game.raysfly.com',
	  'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
	  'Cookie':$.cookie
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
    {
        "id":"3",
        "a4":"",
        "title":"“夏季开花，花于枝顶集成聚伞花序”属于云南省2020年“10大名花”之一（ ）的特点？",
        "a1":"“林奇”牌玫瑰",
        "a2":"“杨月季”牌绣球鲜切花",
        "a3":"“丰岛”牌菊花盆栽",
        "ra":"B",
        "solve":""
    },
    {
        "id":"4",
        "a4":"",
        "title":"采用植物细胞锁水保香工艺，产品无需水分、阳光、养护，完美保持植物的自然形态、质感和气味，最佳观赏时间达一年以上，是花卉中的一种全新品类，符合上述描述的是（ ）？",
        "a1":"“虹华园艺”牌菊花种苗",
        "a2":"“云秀”牌月季鲜切花",
        "a3":"“梦之草”牌保真花（满天星）",
        "ra":"C",
        "solve":""
    },
    {
        "id":"5",
        "a4":"",
        "title":"常用于收敛止血，消肿生肌，可治疗咯血，吐血，外伤出血，疮疡肿毒，皮肤皲裂等问题，是云南省2020年“10大名药”之一的（ ）？",
        "a1":"“鸿翔”牌三七",
        "a2":"“滇及”牌白及",
        "a3":"“央珂”牌藏红花",
        "ra":"B",
        "solve":""
    },
    {
        "id":"6",
        "a4":"",
        "title":"主要功效活血化瘀，常用于血瘀型中风及胸痹，是云南省2020年“10大名药”之一的（ ）？",
        "a1":"“生物谷”牌灯盏细辛",
        "a2":"“央珂”牌藏红花",
        "a3":"“鸿翔”牌三七",
        "ra":"A",
        "solve":""
    },
    {
        "id":"7",
        "a4":"",
        "title":"具有抑制透明质酸酶作用，有效修复照射造成的损伤，具备晒后修复等功效的云南省2020年“10大名药”之一是（ ）？",
        "a1":"“万绿”牌芦荟粉",
        "a2":"“央珂”牌藏红花",
        "a3":"“滇及”牌白及",
        "ra":"A",
        "solve":""
    },
    {
        "id":"8",
        "a4":"",
        "title":"对便秘、尿多尿少尿频、疲劳、肥胖、失眠、健忘、烦郁等有效用，被国家认定为唯一可食药同源两用真菌物质的云南省2018年“10大名药”之一的是（ ）？",
        "a1":"“滇奇”牌茯苓",
        "a2":"“云三七”牌三七",
        "a3":"“徐美德”牌天麻",
        "ra":"A",
        "solve":""
    },
    {
        "id":"9",
        "a4":"",
        "title":"祛风湿，止痛活血，服用之后还能够降低血压。同时也是一种食材，具有很好的食疗价值。符合上述描述的云南省2018年“10大名药”之一的是（ ）？",
        "a1":"“龙津”牌灯盏细辛",
        "a2":"“维西当归”牌云当归",
        "a3":"“徐美德”牌天麻",
        "ra":"C",
        "solve":""
    },
    {
        "id":"10",
        "a4":"",
        "title":"在国内首家实现从种苗、种植、加工到销售的全过程可追溯性管理，同时产品质地细腻、清香酥脆、风味独特的云南省2020年“10大名果”之一的是（ ）？",
        "a1":"“昭阳红”牌苹果",
        "a2":"“果亮”牌有机核桃",
        "a3":"“云澳达”牌澳洲坚果",
        "ra":"C",
        "solve":""
    },
    {
        "id":"11",
        "a4":"",
        "title":"早熟丰产、天然富硒、色泽鲜艳、香甜浓郁、爽脆可口，具有“早、甜、香、脆、艳”五大特点的云南省2020年“10大名果”之一的是（ ）？",
        "a1":"“佳沃”牌曲靖蓝莓",
        "a2":"“蒙生”牌蒙自石榴",
        "a3":"“昭阳红”牌苹果",
        "ra":"C",
        "solve":""
    },
    {
        "id":"12",
        "a4":"",
        "title":"具有果型大、糖度高、硬度好、口感好、花青素含量高等特点的云南省2020年“10大名果”之一的是（ ）？",
        "a1":"佳沃”牌曲靖蓝莓",
        "a2":"“果亮”牌有机核桃",
        "a3":"“昭阳红”牌苹果",
        "ra":"A",
        "solve":""
    },
    {
        "id":"13",
        "a4":"",
        "title":"含有大量维生素C，营养价值高，高甜低酸，果皮易剥离，中心柱充实，汁味甜而清香，无苦味。是云南省2020年“10大名果”之一的是（ ）？",
        "a1":"“褚橙”牌冰糖橙",
        "a2":"“昭阳红”牌苹果 ",
        "a3":"“丽果”牌芒果",
        "ra":"A",
        "solve":""
    },
    {
        "id":"14",
        "a4":"",
        "title":"果实含有丰富的葡萄糖、果糖、氨基酸、矿物质等营养物质，营养价值很高，白藜芦醇等物质含量较高，具有很好的保健功能，属于云南省2020年“10大名果”之一的（ ）？",
        "a1":"“佳沃”牌曲靖蓝莓",
        "a2":"“果先锋”牌鲜食葡萄",
        "a3":"“昭阳红”牌苹果",
        "ra":"B",
        "solve":""
    },
    {
        "id":"15",
        "a4":"",
        "title":"防止动脉硬化，降低胆固醇，适量食用对孕妇和宝宝有好处的云南省2020年“10大名果”之一的是（ ）？",
        "a1":"“昭阳红”牌苹果",
        "a2":"“果亮”牌有机核桃",
        "a3":"“丽果”牌芒果",
        "ra":"B",
        "solve":""
    },
    {
        "id":"16",
        "a4":"",
        "title":"外形奇特，爽口多汁，营养价值丰富，富含维C，起到健脾、健胃功能，也是天然美容食品。符合以上特点的云南省2020年“10大名菜”之一的是（ ）？",
        "a1":"“走我鲜”牌水果番茄",
        "a2":"“芸岭鲜生”牌有机吮指胡萝卜",
        "a3":"“云沃坤”牌青花菜",
        "ra":"A",
        "solve":""
    },
    {
        "id":"17",
        "a4":"",
        "title":"肉脆味美、口感清甜香、营养丰富，素有高原黄金“小人参”之称的云南省2020年“10大名菜”之一的是（ ）？",
        "a1":"“走我鲜”牌水果番茄 ",
        "a2":"“云沃坤”牌青花菜",
        "a3":"“芸岭鲜生”牌有机吮指胡萝卜",
        "ra":"C",
        "solve":""
    },
    {
        "id":"18",
        "a4":"",
        "title":"色绿苍翠，肉质脆嫩，风味香甜，含丰富蛋白质、维生素、纤维素和矿物质元素等的云南省2020年“10大名菜”之一的是（ ）？",
        "a1":"“云沃坤”牌青花菜",
        "a2":"“芸岭鲜生”牌有机吮指胡萝卜",
        "a3":"“走我鲜”牌水果番茄",
        "ra":"A",
        "solve":""
    },
    {
        "id":"19",
        "a4":"",
        "title":"种植前经过一系列技术措施清除薯块体内的病毒，具有早熟、产量高蒸煮品味微香，适口性好等优点的云南省2020年“10大名菜”之一的马铃薯是（ ）？",
        "a1":"“泵马”牌马铃薯",
        "a2":"“泵龙”牌马铃薯",
        "a3":"“滇龙”牌马铃薯",
        "ra":"B",
        "solve":""
    },
    {
        "id":"20",
        "a4":"",
        "title":"含有18种氨基酸，人体必需的8种氨基酸齐全，营养保健价值极高，是云南省2020年“10大名菜”之一的是（ ）？",
        "a1":"“云沃坤”牌青花菜",
        "a2":"“陆尚”牌杏鲍菇",
        "a3":"“走我鲜”牌水果番茄",
        "ra":"B",
        "solve":""
    },
    {
        "id":"21",
        "a4":"",
        "title":"种苗成活率高，茎粗、叶宽等性状指标达到种苗质量等级要求I级标准，通过有机种植和人工全天候管养的云南省2020年“10大名药”是（ ）？",
        "a1":"“万绿”牌芦荟粉",
        "a2":"“山里红”牌铁皮石斛",
        "a3":"“山里红”牌紫皮石斛",
        "ra":"B",
        "solve":""
    },
    {
        "id":"22",
        "a4":"",
        "title":"具有舒经活络、抗癌防癌以及美容养颜功效的云南省2020年“10大名药”之一是（ ）？",
        "a1":"“万绿”牌芦荟粉",
        "a2":"“央珂”牌藏红花",
        "a3":"“鸿翔”牌三七",
        "ra":"B",
        "solve":""
    },
    {
        "id":"23",
        "a4":"",
        "title":"果肉鲜脆多汁，有玫瑰香味，鲜食品质极优，具有外形好、产量高、口感佳、耐储运等特点的云南省2020年“10大名果”之一的是（ ）？",
        "a1":"“丽果”牌芒果",
        "a2":"“果先锋”牌鲜食葡萄",
        "a3":"“七彩云南”牌葡萄",
        "ra":"B",
        "solve":""
    },
    {
        "id":"24",
        "a4":"",
        "title":"维生素C含量是苹果的100倍，因而称为维C之王，同时还有多种无机盐和蛋白质水解酶，属于云南省2019年“10大名果”之一的（ ）？",
        "a1":"“晨滇滇”牌红阳猕猴桃",
        "a2":"“丽果”牌芒果 ",
        "a3":"“昭阳红”牌苹果",
        "ra":"A",
        "solve":""
    },
    {
        "id":"25",
        "a4":"",
        "title":"“宏斌”牌小米辣连续（ ）年被评为云南省“10大名菜”？",
        "a1":"一",
        "a2":"二",
        "a3":"三",
        "ra":"C",
        "solve":""
    },
    {
        "id":"26",
        "a4":"",
        "title":"清热解毒，消肿止痛，凉肝定惊，用于疔疮痈肿，咽喉肿痛，蛇虫咬伤，跌扑伤痛，惊风抽搐的云南省2018年“10大名药”之一的是（ ）？",
        "a1":"“徐美德”牌天麻",
        "a2":"“山里红”牌铁皮石斛",
        "a3":"“云全1号”牌滇重楼",
        "ra":"C",
        "solve":""
    },
    {
        "id":"27",
        "a4":"",
        "title":"境内首家进行SGS国际权威机构检测和认证的三七品牌是（ ）？",
        "a1":"“七丹”牌三七",
        "a2":"“鸿翔”牌三七",
        "a3":"“豹七”牌三七",
        "ra":"C",
        "solve":""
    },
    {
        "id":"28",
        "a4":"",
        "title":"截至目前，云南省“10大名品”评选活动已连续举办（ ）届？",
        "a1":"一",
        "a2":"二",
        "a3":"三",
        "ra":"C",
        "solve":""
    },
    {
        "id":"29",
        "a4":"",
        "title":"2019年，云南省“10大名品”实现销售额超（ ）亿元？",
        "a1":"23",
        "a2":"33",
        "a3":"43",
        "ra":"C",
        "solve":""
    },
    {
        "id":"30",
        "a4":"",
        "title":"2018年，云南省提出“全力打造世界一流的‘绿色能源’（ ）‘健康生活目的地’三张牌”？",
        "a1":"‘绿色食品牌’",
        "a2":"‘高原特色农业牌’",
        "a3":"‘最美丽省份牌’",
        "ra":"A",
        "solve":""
    },
    {
        "id":"31",
        "a4":"",
        "title":"2018年“10 大名药材”之一的（ ），醇香浓郁、沁人心脾、味辛性温，“苯并(a)芘”含量小于1微克/公斤，低于国家规定的标准5微克/公斤，是草果中的精品？",
        "a1":"“云滇”牌草果",
        "a2":"“雪黎”牌怒江草果",
        "a3":"“果香”牌草果",
        "ra":"B",
        "solve":""
    },
    {
        "id":"32",
        "a4":"",
        "title":"云南省2018年“10大名菜”之一的（ ），得益于云南省元谋丰富的光热、气候、土地等资源，洋葱品质上佳储存时间长，具有上市早的优势，是中国短日照洋葱的云南代表？",
        "a1":"“元绿”牌洋葱",
        "a2":"“宏升”牌洋葱",
        "a3":"“品达”牌洋葱",
        "ra":"A",
        "solve":""
    },
    {
        "id":"33",
        "a4":"",
        "title":"“小虫子”孕育大产业，云南省2020年“10大名药”之一的（ ）在抗肿瘤、治疗心力衰竭及免疫调节等方面的作用日益凸显？",
        "a1":"“云药”牌美洲大蠊",
        "a2":"“哈药”牌美洲大蠊",
        "a3":"“腾药”牌美洲大蠊",
        "ra":"C",
        "solve":""
    },
    {
        "id":"34",
        "a4":"",
        "title":"云南省2018年“10大名药”之一的（ ），行气止痛，温中和胃，2016年获得云南省著名商标称号，以种植历史悠久、种植面积最大、质量最优享誉全国？",
        "a1":"“云全1号”牌滇重楼",
        "a2":"“华桂牌”云木香 ",
        "a3":"“维和”牌三七",
        "ra":"B",
        "solve":""
    },
    {
        "id":"35",
        "a4":"",
        "title":"采用无土脱毒一次性成苗技术，具有生长较快、成活率高、产量高等特点的云南省2020年“10大名花”种苗是（ ）？",
        "a1":"“锦海”牌月季种苗",
        "a2":"“英茂”牌康乃馨种苗",
        "a3":" “虹华园艺”牌菊花种苗 ",
        "ra":"A",
        "solve":""
    },
    {
        "id":"36",
        "a4":"",
        "title":"经过速冻加工处理后，使其表面形成一层薄冰，达到防止氧防腐的目的，保持其味道、色泽和维生素含量等，还可达到延长其期储期的云南省2018“10大名菜”是（ ）？",
        "a1":"“元绿”牌洋葱",
        "a2":"“禾泽”牌速冻甜玉米",
        "a3":"“晨农”牌甜豆",
        "ra":"B",
        "solve":""
    },
    {
        "id":"37",
        "a4":"",
        "title":"营养丰富，维生素C含量高，果皮可入药，果实可食用或压汁，是下列云南省2020年“10大名果”的特点（ ）？ ",
        "a1":"“佳沃”牌曲靖蓝莓",
        "a2":"“蒙生”牌蒙自石榴",
        "a3":"“七彩云秘”牌葡萄 ",
        "ra":"B",
        "solve":""
    },
    {
        "id":"38",
        "a4":"",
        "title":"4月初便可成熟上市，刚好可弥补4、5月份全球供应空档期的云南省2020年“10大名果”之一的是（ ）？",
        "a1":"“果亮”牌有机核桃",
        "a2":"佳沃”牌曲靖蓝莓 ",
        "a3":"“蒙生”牌蒙自石榴",
        "ra":"B",
        "solve":""
    },
    {
        "id":"39",
        "a4":"",
        "title":"云南省2020年“10大名果”中，富含花青素，具有活化视网膜功效的是（ ）？",
        "a1":"“昭阳红”牌苹果",
        "a2":"“佳沃”牌曲靖蓝莓",
        "a3":"“丽果”牌芒果",
        "ra":"B",
        "solve":""
    },
    {
        "id":"40",
        "a4":"",
        "title":"具有花色艳丽，开放度饱满、耐养耐运输、瓶插周期长等特点的云南省2020年“10大名花”之一的是（ ）？",
        "a1":"“云秀”牌月季鲜切花",
        "a2":"“荷冠”牌玫瑰鲜切花",
        "a3":"“品元”牌切花玫瑰",
        "ra":"A",
        "solve":""
    },
    {
        "id":"41",
        "a4":"",
        "title":"每年7月末到8月中旬为早熟果，正式成熟时间是8月中旬后，9-10月份是最佳时期，是云南省2020年“10大名果”之一的（ ）？",
        "a1":"“蒙生”牌蒙自石榴",
        "a2":"“昭阳红”牌苹果",
        "a3":"“云澳达”牌澳洲坚果",
        "ra":"B",
        "solve":""
    },
    {
        "id":"42",
        "a4":"",
        "title":"云南省2020年“10大名茶”之一的（ ），贴合中国传统生肖文化，每年一款，集中展现中国传统风俗和文化的特殊纪念茶品？",
        "a1":"“大益”牌普洱茶生肖茶",
        "a2":"“庆沣祥”牌正山古树普洱茶",
        "a3":"“岩冷”牌0081 大饼",
        "ra":"A",
        "solve":""
    }
];
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
