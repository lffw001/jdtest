const $ = new Env('金融工会活动');
//以下用户登录信息
let Authorization=''

let Authorizations=[
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZjA4YzM0MS02YzY1LTRiNDItOTkyZS1lYmNhOWUxNGNiNTAiLCJpZCI6IjRmMDhjMzQxLTZjNjUtNGI0Mi05OTJlLWViY2E5ZTE0Y2I1MCIsIm1fb3BlbmlkIjoiNDgzRkM2MDNEMTFDNjA3RDk4RDg2NTA1OUQwMjIwNkYiLCJjbGllbnRfaWQiOiIxMDAwMSIsIm5hbWUiOiLmnY7mlowiLCJwcm9maWxlIjoiIiwicGljdHVyZSI6IiIsIm1fY2lkIjoiNDAwNzM2NzctNzdmZC00MDQxLTkzNjItZTk0OTcxZTMwNjlmIiwibV9hY2NvdW50IjoiMTg2NTEzMDY2NTciLCJyb2xlIjoiQXBwVXNlciIsImlzcyI6Imh0dHBzOi8vYXBpdjIuZ29vZGZ1bGwudmlwIiwiYXVkIjoi77-977-977-977-977-927rPtu-_vdK177-977-977-977-977-9xr3MqE1vYmlsZS5BUEkiLCJtX3R5cGUiOiJBUFAiLCJtX3JvbGUiOiI3IiwiZmFtaWx5X25hbWUiOiLkuK3lm73ph5Hono3lt6XkvJoiLCJuYmYiOjE2OTk0NDI5MjMsImV4cCI6MTY5OTQ1MDEyMywiaWF0IjoxNjk5NDQyOTIzfQ.CcBvv3YT2dxJR9zMGasP1AVqLMXiQMqtcbzDyE8EEyc',//18651306657 leebear
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjI2NWFlZS0xMDUzLTQ3N2UtYTFhNS05YmRhNzIyZTNhYmIiLCJpZCI6IjEyMjY1YWVlLTEwNTMtNDc3ZS1hMWE1LTliZGE3MjJlM2FiYiIsIm1fb3BlbmlkIjoiNkM4RjY3MTMyMEM5RjhCNjFFNjRCMEY0OTk5RkNCMTEiLCJjbGllbnRfaWQiOiIxMDAwMSIsIm5hbWUiOiLlvKDlhbUiLCJwcm9maWxlIjoiIiwicGljdHVyZSI6IiIsIm1fY2lkIjoiNDAwNzM2NzctNzdmZC00MDQxLTkzNjItZTk0OTcxZTMwNjlmIiwibV9hY2NvdW50IjoiMTMzODIzNDg4MDIiLCJyb2xlIjoiQXBwVXNlciIsImlzcyI6Imh0dHBzOi8vYXBpdjIuZ29vZGZ1bGwudmlwIiwiYXVkIjoi77-977-977-977-977-927rPtu-_vdK177-977-977-977-977-9xr3MqE1vYmlsZS5BUEkiLCJtX3R5cGUiOiJBUFAiLCJtX3JvbGUiOiI3IiwiZmFtaWx5X25hbWUiOiLkuK3lm73ph5Hono3lt6XkvJoiLCJuYmYiOjE2OTk0NDMzMjQsImV4cCI6MTY5OTQ1MDUyNCwiaWF0IjoxNjk5NDQzMzI0fQ.VYVVaA8xQd0lZKexH1uZXLjUrYf4EXmqqmJyD7ojR9k',
  //13382348802 bona
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5NjEwY2FiOC1kZWM5LTQ2ZGYtYTYwMi1jNjExYmMzZmMwNjQiLCJpZCI6Ijk2MTBjYWI4LWRlYzktNDZkZi1hNjAyLWM2MTFiYzNmYzA2NCIsIm1fb3BlbmlkIjoiOENDMDQ3RTNFODQ2RkI4REVFRjYyQ0EyRUM3MTNDMjYiLCJjbGllbnRfaWQiOiIxMDAwMSIsIm5hbWUiOiLmnY7mnbAiLCJwcm9maWxlIjoiIiwicGljdHVyZSI6IiIsIm1fY2lkIjoiNDAwNzM2NzctNzdmZC00MDQxLTkzNjItZTk0OTcxZTMwNjlmIiwibV9hY2NvdW50IjoiMTgwMTIyMjU5ODkiLCJyb2xlIjoiQXBwVXNlciIsImlzcyI6Imh0dHBzOi8vYXBpdjIuZ29vZGZ1bGwudmlwIiwiYXVkIjoi77-977-977-977-977-927rPtu-_vdK177-977-977-977-977-9xr3MqE1vYmlsZS5BUEkiLCJtX3R5cGUiOiJBUFAiLCJtX3JvbGUiOiI3IiwiZmFtaWx5X25hbWUiOiLkuK3lm73ph5Hono3lt6XkvJoiLCJuYmYiOjE2OTk0NDM3NzQsImV4cCI6MTY5OTQ1MDk3NCwiaWF0IjoxNjk5NDQzNzc0fQ._aeuQcMJY0lPh0_ntOHD0zi1p1AsacbnbfPZk3YupgI',
  //18012225989 朱张杰
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZDVlZjY0MC1kMjgyLTRiMmQtYjE0Ny1jMWNmMzM3ZGY1ZjgiLCJpZCI6ImNkNWVmNjQwLWQyODItNGIyZC1iMTQ3LWMxY2YzMzdkZjVmOCIsIm1fb3BlbmlkIjoiQTVFRTREODlFQjdCRkFBM0Y2RjU2RjRDMkRGOEFBMzgiLCJjbGllbnRfaWQiOiIxMDAwMSIsIm5hbWUiOiLku7vkvbPojrkiLCJwcm9maWxlIjoiIiwicGljdHVyZSI6IiIsIm1fY2lkIjoiNDAwNzM2NzctNzdmZC00MDQxLTkzNjItZTk0OTcxZTMwNjlmIiwibV9hY2NvdW50IjoiMTc4MDI1OTU4NjkiLCJyb2xlIjoiQXBwVXNlciIsImlzcyI6Imh0dHBzOi8vYXBpdjIuZ29vZGZ1bGwudmlwIiwiYXVkIjoi77-977-977-977-977-927rPtu-_vdK177-977-977-977-977-9xr3MqE1vYmlsZS5BUEkiLCJtX3R5cGUiOiJBUFAiLCJtX3JvbGUiOiI3IiwiZmFtaWx5X25hbWUiOiLkuK3lm73ph5Hono3lt6XkvJoiLCJuYmYiOjE2OTk0NDY0OTgsImV4cCI6MTY5OTQ1MzY5OCwiaWF0IjoxNjk5NDQ2NDk4fQ.83x1f2gxIoZchVACHWweqTDoOcCIG53uasJHuj8yTPo',
  //17802595869 小白
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3Njk2OWE4Yi0yY2YzLTQwN2ItOGYzMS1jYmY4ZTdiMDA0OTkiLCJpZCI6Ijc2OTY5YThiLTJjZjMtNDA3Yi04ZjMxLWNiZjhlN2IwMDQ5OSIsIm1fb3BlbmlkIjoiM0ZBMjcwMzBCMDJGODRCOEU4MDA4MDFBRDJGMjNGQjciLCJjbGllbnRfaWQiOiIxMDAwMSIsIm5hbWUiOiLku7vkvbPojrkiLCJwcm9maWxlIjoiIiwicGljdHVyZSI6IiIsIm1fY2lkIjoiNDAwNzM2NzctNzdmZC00MDQxLTkzNjItZTk0OTcxZTMwNjlmIiwibV9hY2NvdW50IjoiMTgwNjg2MDM1NjgiLCJyb2xlIjoiQXBwVXNlciIsImlzcyI6Imh0dHBzOi8vYXBpdjIuZ29vZGZ1bGwudmlwIiwiYXVkIjoi77-977-977-977-977-927rPtu-_vdK177-977-977-977-977-9xr3MqE1vYmlsZS5BUEkiLCJtX3R5cGUiOiJBUFAiLCJtX3JvbGUiOiI3IiwiZmFtaWx5X25hbWUiOiLkuK3lm73ph5Hono3lt6XkvJoiLCJuYmYiOjE2OTk0NDYxNjAsImV4cCI6MTY5OTQ1MzM2MCwiaWF0IjoxNjk5NDQ2MTYwfQ.xOwe2JCQ3Ovngtehu5lIkdVcel1fdJJbRIha5ENuG5k',
  //18068603568 晨光


	
]
let homeLessonId='1363738508032839681';
let lessonId='';
let lessonChapterId='';
let lessonName='《民法典》';
let planId='1363738508032839681';
let learningPlanId='1363738508032839681';
let homeData={};
let knowledgeData={};
let choseKnowledge={};
let question={};
let learnRecordDetailId='';
let startTime='';
let answerList=[];
let exame='';
let code=0;
let score=0;


!(async () => {
	for (let i = 0; i < Authorizations.length; i++) {
		if (Authorizations[i]) {
			Authorization=Authorizations[i];
			console.log(`\n******开始第`+(i+1)+`【账号】*********\n`);
			/*await getUser();
			if(score>=3120){
				console.log(`\n******第`+(i+1)+`个【账号】已满分跳过*********\n`);
				continue;
			}*/
			//答题首页
			//await home();
			console.log("获取抽奖id");
			await getLottery();
			await $.wait(100)
			console.log("id:"+$.lottery.lotteryId);
			//await doLottery();
			
		}
	}
	/*
	console.log(`\n******金融工会活动账号信息汇总*********\n`);
	for (let i = 0; i < Authorizations.length; i++) {
		if (Authorizations[i]) {
			Authorization=Authorizations[i];
			await getUser();
		}
	}
	console.log(`\n******金融工会活动账号信息汇总*********\n`);*/
	
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })



function getLottery() {
  let body = {}
  return new Promise(resolve => {
    $.get(taskUrl3("knowledge/8963/lottery?rdm="+Math.random(), body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
			  console.log(data)
			  data = JSON.parse(data)
			  $.lottery=data.data;
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

function doLottery() {
  let body = {}
  return new Promise(resolve => {
    $.get(taskUrl3("lottery/"+$.lottery.lotteryId+"?"+Math.random(), body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
			  console.log(data)
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








function home() {
  let body = {}
  return new Promise(resolve => {
    $.get(taskUrl2("learnPlan/lessons/"+homeLessonId, body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
			  console.log(data);
            data = JSON.parse(data)
			homeData=data.data.lessons;
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

function main(lessonId) {
  let body = {}
  return new Promise(resolve => {
    $.get(taskUrl("lessons/"+lessonId+"/courseware/list/", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
			  console.log(data)
            data = JSON.parse(data)
			//homeData=data.data;
			lessonId=data.data[0].lessonId;
			lessonChapterId=data.data[0].lessonChapterId;
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

function homeIn(inId) {
  let body = {}
  return new Promise(resolve => {
    $.get(taskUrl("learning-plans/"+planId+"/lessons/"+lessonId+"/chapters/"+inId+"/coursewares/", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
			  console.log(data)
            data = JSON.parse(data)
			knowledgeData=data.data;
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

function knowledge(inId,recorseId) {
  let body = {}
  return new Promise(resolve => {
    $.get(taskUrl("learning-plans/"+planId+"/lessons/"+lessonId+"/chapters/"+inId+"/coursewares/"+recorseId+"/resources/", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data)
			//console.log(data);
			for(let k=0;k<data.data.length;k++){
				if(data.data[k].category=="VIDEO"){
					//if(choseKnowledge.learnStatus=="UNFINISHED"){
						await createStudy(data.data[k]);
						console.log("开始学习,需等待"+data.data[k].duration+"秒");
						await $.wait(10*data.data[k].duration);//延迟等待一秒
						await finishStudy(data.data[k])
						console.log("学习完毕");
					//}
					
					//if(!choseKnowledge.isExercise){
					//	await createAnswer(data.data[k]);
					//	await getQuestion();
					//	await $.wait(1000);//延迟等待一秒
					//	await sendAnswer(data.data[k]);	
					//}else{
					//	await getQuestion();
					//}
				}
			}
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

function createStudy(data) {
  return new Promise(async resolve => {
	  //转换小时分钟。
	const jdata='{"lessonName":"'+''+'","coursewareId":"'+choseKnowledge.coursewareId+'","lessonId":"'+lessonId+'","resourceId":"'+data.courseResourceId+'","resourceName":"","resourceUrl":"'+data.url+'","verb":"VIDEO","completeCount":0,"totalTime":"'+getFormatDuringTime(data.duration)+'","videoStart":"00:00:00"}';
    const options = {
      "url": `https://mfd-api.boringkiller.cn/api/v2/record/trace/initialize/`,
      "headers": {
        'Host': 'mfd-api.boringkiller.cn',
		'Connection': 'keep-alive',
		'Content-Type': 'application/json',
		'Referer': 'https://servicewechat.com/wxaedec8f5c0b2940d/12/page-frame.html',
		'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN',
		'Accept':'application/json, text/plain, */*',
		'Accept-Language': 'zh-cn',
		'Authorization':Authorization,
		//'Content-Length': jdata.length
		
      },
	  'body':jdata
    }
	//console.log(options);
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
			console.log(data);
			learnRecordDetailId=data.data.learnRecordDetailId;
			//console.log(learnRecordDetailId);
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

function finishStudy(data) {
  return new Promise(async resolve => {
	var request = require("request");
	  //转换小时分钟。
	const jdata1='{"coursewareId":"'+choseKnowledge.coursewareId+'","coursewareName":"'+choseKnowledge.title+'","lessonId":"'+lessonId+'","lessonName":"'+''+'","resourceId":"'+data.courseResourceId+'","resourceName":"","learnRecordDetailId":"'+learnRecordDetailId+'","verb":"VIDEO","completeCount":0,"totalTime":"'+getFormatDuringTime(data.duration)+'","videoStart":"00:00:00","videoEnd":"'+getFormatDuringTime(data.duration)+'"}';
    const options = {
      "url": `https://mfd-api.boringkiller.cn/api/v2/record/trace/video/`,
      "headers": {
        'Host': 'mfd-api.boringkiller.cn',
		'Connection': 'keep-alive',
		'Content-Type': 'application/json',
		'Referer': 'https://servicewechat.com/wxaedec8f5c0b2940d/12/page-frame.html',
		'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN',
		'Accept':'application/json, text/plain, */*',
		'Accept-Language': 'zh-cn',
		'Authorization':Authorization,
		//'Content-Length': jdata1.length
		
      },
	  'body':jdata1
    }
	request.put(options, function(err, resp, data) {
        try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
			//console.log(data);
			//learnRecordDetailId=data.learnRecordDetailId;
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

function createAnswer(data) {
  return new Promise(async resolve => {
	const jdata='{"lessonId":"'+lessonId+'","lessonName":"'+lessonName+'","learningPlanId":"'+learningPlanId+'","coursewareId":"'+choseKnowledge.coursewareId+'","coursewareName":"'+choseKnowledge.title+'","verb":"EXERCISE","completeCount":0}';
    const options = {
      "url": `https://mfd-api.boringkiller.cn/api/v1/core/learningrecord/trace/initialize/`,
      "headers": {
        'Host': 'mfd-api.boringkiller.cn',
		'Connection': 'keep-alive',
		'Content-Type': 'application/json',
		'Referer': 'https://servicewechat.com/wxaedec8f5c0b2940d/12/page-frame.html',
		'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN',
		'Accept':'application/json, text/plain, */*',
		'Accept-Language': 'zh-cn',
		'Authorization':Authorization,
		//'Content-Length': jdata.length
		
      },
	  'body':jdata
    }
	//console.log(options);
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
			startTime=getNowFormatDate();
			//console.log(data);
			learnRecordDetailId=data.data.learnRecordDetailId;
			console.log("准备答题");
			//console.log(learnRecordDetailId);
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

function getQuestion() {
  let body = {}
  return new Promise(resolve => {
    $.get(taskUrl("core/learningrecord/initPracticeQuestions?coursewareId="+choseKnowledge.coursewareId, body), async (err, resp, data) => {
	try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
			question=data.data[0];
			let jsAnswer={"answer":question.answer,"exerciseId":question.exerciseId,"options":question.answer};
			answerList.push(jsAnswer);
			//console.log(data);
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

function sendAnswer(data) {
  return new Promise(async resolve => {
	var request = require("request");
	  //转换小时分钟。
	const jdata1='{"lessonId":"'+lessonId+'","lessonName":"'+lessonName+'","resourceId":"'+data.courseResourceId+'","resourceName":"","learnRecordDetailId":"'+learnRecordDetailId+'","learningPlanId":"'+learningPlanId+'","coursewareId":"'+choseKnowledge.coursewareId+'","coursewareName":"'+choseKnowledge.title+'","verb":"EXERCISE","completeCount":0,"exams":[{"answer":"'+question.answer+'","exerciseId":"'+question.exerciseId+'","options":"'+question.answer+'"}],"startTime":"'+startTime+'","endTime":"'+getNowFormatDate()+'"}';
    const options = {
      "url": `https://mfd-api.boringkiller.cn/api/v1/core/learningrecord/trace/exam/`,
      "headers": {
        'Host': 'mfd-api.boringkiller.cn',
		'Connection': 'keep-alive',
		'Content-Type': 'application/json',
		'Referer': 'https://servicewechat.com/wxaedec8f5c0b2940d/12/page-frame.html',
		'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN',
		'Accept':'application/json, text/plain, */*',
		'Accept-Language': 'zh-cn',
		'Authorization':Authorization,
		//'Content-Length': jdata1.length
		
      },
	  'body':jdata1
    }
	request.put(options, function(err, resp, data) {
        try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
			//console.log(data);
			console.log("已答题");
			//learnRecordDetailId=data.learnRecordDetailId;
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
function getJDCode() {
  let body = {}
  return new Promise(resolve => {
    $.get(taskUrl("users/exam-records/", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
			code=data.code;
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

function createJD() {
  return new Promise(async resolve => {
	const jdata='{"lessonId":"'+lessonId+'","lessonName":"'+lessonName+'","learningPlanId":"'+learningPlanId+'","verb":"EXAMINATION"}';
    const options = {
      "url": `https://mfd-api.boringkiller.cn/api/v1/core/learningrecord/trace/initialize/`,
      "headers": {
        'Host': 'mfd-api.boringkiller.cn',
		'Connection': 'keep-alive',
		'Content-Type': 'application/json',
		'Referer': 'https://servicewechat.com/wxaedec8f5c0b2940d/12/page-frame.html',
		'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN',
		'Accept':'application/json, text/plain, */*',
		'Accept-Language': 'zh-cn',
		'Authorization':Authorization,
		//'Content-Length': jdata.length
		
      },
	  'body':jdata
    }
	//console.log(options);
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
			//console.log(data);
			learnRecordDetailId=data.data.learnRecordDetailId;
			//console.log(learnRecordDetailId);
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


function getJD() {
  let body = {}
  return new Promise(resolve => {
    $.get(taskUrl("core/learningrecord/initExamQuestions?lessonId="+lessonId, body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
			console.log("获取题目成功,组织答案");
			startTime=getNowFormatDate();
            data = JSON.parse(data)
			exame+='[';
			for(let i=0;i<data.data.length;i++){
				exame+=getAnswer(data.data[i].exerciseId)
				if(i!=data.data.length-1){
					exame+=',';
				}
			}
			exame+=']';
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

function sendJD() {
  return new Promise(async resolve => {
	var request = require("request");
	  //转换小时分钟。
	const jdata1='{"lessonId":"'+lessonId+'","lessonName":"'+lessonName+'","learnRecordDetailId":"'+learnRecordDetailId+'","learningPlanId":"'+learningPlanId+'","verb":"EXAMINATION","startTime":"'+startTime+'","endTime":"'+getNowFormatDate()+'","exams":'+exame+'}';
    const options = {
      "url": `https://mfd-api.boringkiller.cn/api/v1/core/learningrecord/trace/exam/`,
      "headers": {
        'Host': 'mfd-api.boringkiller.cn',
		'Connection': 'keep-alive',
		'Content-Type': 'application/json',
		'Referer': 'https://servicewechat.com/wxaedec8f5c0b2940d/12/page-frame.html',
		'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN',
		'Accept':'application/json, text/plain, */*',
		'Accept-Language': 'zh-cn',
		'Authorization':Authorization,
		//'Content-Length': jdata1.length
		
      },
	  'body':jdata1
    }
	console.log(options);
	request.put(options, function(err, resp, data) {
        try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
			console.log("竞答结束");
			console.log(data);
			//learnRecordDetailId=data.learnRecordDetailId;
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

function getUser() {
  let body = {}
  return new Promise(resolve => {
    $.get(taskUrl("user/ ", body), async (err, resp, data) => {
	try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
			console.log("姓名："+data.data.name+",手机号："+data.data.phone)
			await getCenter();
			//console.log(data);
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

function getCenter() {
  let body = {}
  return new Promise(resolve => {
    $.get(taskUrl("personalcenter/ ", body), async (err, resp, data) => {
	try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
			data = JSON.parse(data);
			score=data.data;
			console.log("当前分数"+data.data);
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



function taskUrl(action, body = {}) {
  return {
    url: 'https://mfd-api.boringkiller.cn/api/v1/'+action,
    headers: {
      'Host': 'mfd-api.boringkiller.cn',
      'Connection': 'keep-alive',
      'Content-Type': 'application/json',
      'Referer': 'https://servicewechat.com/wxaedec8f5c0b2940d/12/page-frame.html',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN',
	  'Accept':'application/json, text/plain, */*',
      'Accept-Language': 'zh-cn',
	  'Authorization':Authorization
    }
  }
}
function taskUrl2(action, body = {}) {
  return {
    url: 'https://mfd-api.boringkiller.cn/api/v2/'+action,
    headers: {
      'Host': 'mfd-api.boringkiller.cn',
      'Connection': 'keep-alive',
      'Content-Type': 'application/json',
      'Referer': 'https://servicewechat.com/wxaedec8f5c0b2940d/12/page-frame.html',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN',
	  'Accept':'application/json, text/plain, */*',
      'Accept-Language': 'zh-cn',
	  'Authorization':Authorization
    }
  }
}


function taskUrl3(action, body = {}) {
  return {
    url: 'https://apiv2.goodfull.vip/api/'+action,
    headers: {
      'Host': 'apiv2.goodfull.vip',
      'Connection': 'keep-alive',
      'Content-Type': 'application/json',
      'Referer': 'https://servicewechat.com/wxaedec8f5c0b2940d/12/page-frame.html',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 MicroMessenger/7.0.17(0x1700112a) NetType/WIFI Language/zh_CN',
	  'Accept':'application/json, text/plain, */*',
      'Accept-Language': 'zh-cn',
	  'Authorization':Authorization
    }
  }
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

function getFormatDuringTime(during) {
    var s = Math.floor(during / 1) % 60;
	if(s<10) s="0"+s;
    during = Math.floor(during / 60);
    var i = during % 60;
	if(i<10) i="0"+i;
	during = Math.floor(during / 60);
    var h = during % 24;
	if(h<10) h="0"+h;
    return h+':'+i + ':' + s;
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
            + seperator2 + seconds;
    return currentdate;
}

function getAnswer(exerciseId){
	var res='';
	for(let i=0;i<answerList.length;i++){
		if(answerList[i].exerciseId==exerciseId){
			res='{"answer":"","exerciseId":"'+answerList[i].exerciseId+'","options":"'+answerList[i].answer+'"}';
			break;
		}
	}
	return res;
}

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

