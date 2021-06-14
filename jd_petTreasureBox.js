/*
更新时间:2020-11-12
从github@Zero-S1搬的[https://github.com/Zero-S1/JD_tools/blob/master/jbp.js]
【宠汪汪聚宝盆辅助脚本】
1、进入聚宝盆,显示本轮狗粮池投入总数,方便估算
2、可能有两位数误差,影响不大
3、聚宝盆最下方显示上轮前六名的投入狗粮，收入积分，以及纯收益（即：收入积分 - 投入狗粮）
new Env('聚宝盆投狗粮辅助');//此处忽略即可，为自动生成iOS端软件配置文件所需
============Quantumultx===============
[task_local]
#聚宝盆投狗粮辅助
30 6 * * * https://github.com/libinxwz/jdtest/jd_petTreasureBox.js, tag=聚宝盆投狗粮辅助, enabled=true

================Loon==============
[Script]
cron "30 6 * * *" script-path=https://github.com/libinxwz/jdtest/jd_petTreasureBox.js,tag=聚宝盆投狗粮辅助

===============Surge=================
聚宝盆投狗粮辅助 = type=cron,cronexp="30 6 * * *",wake-system=1,timeout=3600,script-path=https://github.com/libinxwz/jdtest/jd_petTreasureBox.js

============小火箭=========
聚宝盆投狗粮辅助 = type=cron,script-path=https://github.com/libinxwz/jdtest/jd_petTreasureBox.js, cronexpr="30 6 * * *", timeout=3600, enable=true
 */
const $ = new Env('聚宝盆投狗粮辅助');
let body = $response.body;
try {
  body = JSON.parse(body)
  food = body['data']['food']
  function f(v) {
    return (v < 0) ? v : `+${v}`;
  }
  var sum = 0
  lastHourWinInfos = body["data"]["lastHourWinInfos"]
  for (var i in lastHourWinInfos) {
    sum += lastHourWinInfos[i]["petCoin"]
  }
  for (var i in lastHourWinInfos) {
    body["data"]["lastHourWinInfos"][i]["petCoin"] = `{${lastHourWinInfos[i]["food"]}} [${lastHourWinInfos[i]["petCoin"]}] (${f(lastHourWinInfos[i]["petCoin"] - lastHourWinInfos[i]["food"])}) `
  }

  body["data"]["lastHourWinInfos"].unshift({
    'pin': "",
    'nickName': '',
    'investHour':   lastHourWinInfos[0]['investHour'],
    'stage': '2',
    'food': 0,
    'rank': 0,
    'foodDif': "",
    'petCoin': '{投} [收入] (纯收入)',
    'userTag': "",
    'win': true
  })
  lastTurnFood = parseInt(sum / 0.09 * 0.91)
  body['data']['food'] = `${food} (+${food - lastTurnFood})`
  body = JSON.stringify(body)
} catch (e) {
  console.log(e)
} finally {
  $done({ body })
}

