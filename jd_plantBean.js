/*
种豆得豆 脚本更新地址：jd_plantBean.js
更新时间：2021-08-20
活动入口：京东APP我的-更多工具-种豆得豆
已支持IOS京东多账号,云端多京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
注：会自动关注任务中的店铺跟商品，介意者勿使用。
互助码shareCode请先手动运行脚本查看打印可看到
每个京东账号每天只能帮助3个人。多出的助力码将会助力失败。

=====================================Quantumult X=================================
[task_local]
1 7-21/2 * * * https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js, tag=种豆得豆, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdzd.png, enabled=true

=====================================Loon================================
[Script]
cron "1 7-21/2 * * *" script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js,tag=京东种豆得豆

======================================Surge==========================
京东种豆得豆 = type=cron,cronexp="1 7-21/2 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js

====================================小火箭=============================
京东种豆得豆 = type=cron,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js, cronexpr="1 7-21/2 * * *", timeout=3600, enable=true

*/
const $ = new Env('种豆得豆');
let jdNotify = true,
    cookiesArr = [],
    cookie = "",
    notify,
    option,
    message,
    subTitle;

const cryptoJS = require("crypto-js"),
      base64_mod_charset = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/",
      JD_API_HOST = "https://api.m.jd.com/client.action";

let allMessage = "",
    currentRoundId = null,
    lastRoundId = null,
    roundList = [],
    awardState = "",
    num;
$.newShareCode = [];
let lnrun = 0;
!(async () => {
  await requireConfig();

  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  for (let IIlIil = 0; IIlIil < cookiesArr.length; IIlIil++) {
    if (cookiesArr[IIlIil]) {
      cookie = cookiesArr[IIlIil];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIlIil + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      message = "";
      subTitle = "";
      option = {};
      lnrun++;
      get_ua();
      await jdPlantBean();
      lnrun == 3 && (console.log("\n【访问接口次数达到3次，休息一分钟.....】\n"), await $.wait(60 * 1000), lnrun = 0);
    }
  }

  $.isNode() && allMessage && (await notify.sendNotify("" + $.name, "" + allMessage));
})().catch(i1IlIl => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + i1IlIl + "!", "");
}).finally(() => {
  $.done();
});

async function jdPlantBean() {
  try {
    console.log("获取任务及基本信息");
    await plantBeanIndex();

    if ($.plantBeanIndexResult.errorCode === "PB101") {
      console.log("\n活动太火爆了，还是去买买买吧！\n");
      return;
    }

    if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === "0" && $.plantBeanIndexResult.data) {
      for (let IiIII1 = 0; IiIII1 < $.plantBeanIndexResult.data.roundList.length; IiIII1++) {
        if ($.plantBeanIndexResult.data.roundList[IiIII1].roundState === "2") {
          num = IiIII1;
          break;
        }
      }

      const l111II = $.plantBeanIndexResult.data.jwordShareInfo.shareUrl;
      $.myPlantUuid = getParam(l111II, "plantUuid");
      console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】" + $.myPlantUuid + "\n");
      roundList = $.plantBeanIndexResult.data.roundList;
      currentRoundId = roundList[num].roundId;
      lastRoundId = roundList[num - 1].roundId;
      awardState = roundList[num - 1].awardState;
      $.taskList = $.plantBeanIndexResult.data.taskList;
      subTitle = "【京东昵称】" + $.plantBeanIndexResult.data.plantUserInfo.plantNickName;
      message += "【上期时间】" + roundList[num - 1].dateDesc.replace("上期 ", "") + "\n";
      message += "【上期成长值】" + roundList[num - 1].growth + "\n";
      await $.wait(1000);
      await receiveNutrients();
      await $.wait(2000);
      await doTask();
      await $.wait(5000);
      await stealFriendWater();
      await $.wait(2000);
      await doCultureBean();
      await $.wait(1000);
      await doGetReward();
      await $.wait(1000);
      await showTaskProcess();
      await $.wait(1000);
      await plantShareSupportList();
      await $.wait(1000);
    } else console.log("种豆得豆-初始失败:  " + JSON.stringify($.plantBeanIndexResult));
  } catch (lIil1l) {
    $.logErr(lIil1l);
    const l1II1i = "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n任务执行异常，请检查执行日志 ‼️‼️";
    $.msg($.name, "", "" + l1II1i);
  }
}

async function doGetReward() {
  console.log("【上轮京豆】" + (awardState === "4" ? "采摘中" : awardState === "5" ? "可收获了" : "已领取"));
  if (awardState === "4") message += "【上期状态】" + roundList[num - 1].tipBeanEndTitle + "\n";else {
    if (awardState === "5") {
      await getReward();
      console.log("开始领取京豆");
      $.getReward && $.getReward.code === "0" ? (console.log("京豆领取成功"), message += "【上期兑换京豆】" + $.getReward.data.awardBean + "个\n", $.msg($.name, subTitle, message), allMessage += "京东账号" + $.index + " " + $.nickName + "\n" + message + ($.index !== cookiesArr.length ? "\n\n" : "")) : console.log("$.getReward 异常：" + JSON.stringify($.getReward));
    } else {
      if (awardState === "6") {
        message += "【上期兑换京豆】" + roundList[num - 1].awardBeans + "个\n";
      }
    }
  }
  roundList[num].dateDesc.indexOf("本期 ") > -1 && (roundList[num].dateDesc = roundList[num].dateDesc.substr(roundList[num].dateDesc.indexOf("本期 ") + 3, roundList[num].dateDesc.length));
  message += "【本期时间】" + roundList[num].dateDesc + "\n";
  message += "【本期成长值】" + roundList[num].growth + "\n";
}

async function doCultureBean() {
  await plantBeanIndex();

  if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === "0" && $.plantBeanIndexResult.data) {
    const iIi11I = $.plantBeanIndexResult.data.roundList[num];

    if (iIi11I.roundState === "2") {
      if (iIi11I.bubbleInfos && iIi11I.bubbleInfos.length) console.log("开始收取营养液");

      for (let iiii11 of iIi11I.bubbleInfos) {
        console.log("收取-" + iiii11.name + "-的营养液");
        await cultureBean(iIi11I.roundId, iiii11.nutrientsType);
        console.log("收取营养液结果:" + JSON.stringify($.cultureBeanRes));
      }
    }
  } else console.log("plantBeanIndexResult:" + JSON.stringify($.plantBeanIndexResult));
}

async function stealFriendWater() {
  await stealFriendList();

  if ($.stealFriendList && $.stealFriendList.code === "0") {
    if ($.stealFriendList.data && $.stealFriendList.data.tips) {
      console.log("\n\n今日偷取好友营养液已达上限\n\n");
      return;
    }

    if ($.stealFriendList.data && $.stealFriendList.data.friendInfoList && $.stealFriendList.data.friendInfoList.length > 0) {
      let lIl111 = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);

      for (let Ilil of $.stealFriendList.data.friendInfoList) {
        if (new Date(lIl111).getHours() === 20) {
          if (Ilil.nutrCount >= 2) {
            console.log("可以偷的好友的信息paradiseUuid::" + JSON.stringify(Ilil.paradiseUuid));
            await collectUserNutr(Ilil.paradiseUuid);
            console.log("偷取好友营养液情况:" + JSON.stringify($.stealFriendRes));
            $.stealFriendRes && $.stealFriendRes.code === "0" && console.log("偷取好友营养液成功");
          }
        } else Ilil.nutrCount >= 3 && (console.log("可以偷的好友的信息paradiseUuid::" + JSON.stringify(Ilil.paradiseUuid)), await collectUserNutr(Ilil.paradiseUuid), console.log("偷取好友营养液情况:" + JSON.stringify($.stealFriendRes)), $.stealFriendRes && $.stealFriendRes.code === "0" && console.log("偷取好友营养液成功"));

        await $.wait(1000);
      }
    }
  } else console.log("$.stealFriendList 异常： " + JSON.stringify($.stealFriendList));
}

async function doEgg() {
  await egg();

  if ($.plantEggLotteryRes && $.plantEggLotteryRes.code === "0") {
    if ($.plantEggLotteryRes.data.restLotteryNum > 0) {
      const IliI = new Array($.plantEggLotteryRes.data.restLotteryNum).fill("");
      console.log("目前共有" + IliI.length + "次扭蛋的机会");

      for (let I1l1l = 0; I1l1l < IliI.length; I1l1l++) {
        console.log("开始第" + (I1l1l + 1) + "次扭蛋");
        await plantEggDoLottery();
        console.log("天天扭蛋成功：" + JSON.stringify($.plantEggDoLotteryResult));
      }
    } else console.log("暂无扭蛋机会");
  } else {
    console.log("查询天天扭蛋的机会失败" + JSON.stringify($.plantEggLotteryRes));
  }
}

async function doTask() {
  if ($.taskList && $.taskList.length > 0) for (let lI1i1l of $.taskList) {
    if (lI1i1l.isFinished === 1) {
      console.log(lI1i1l.taskName + " 任务已完成\n");
      continue;
    } else switch (lI1i1l.taskType) {
      case 92:
        await farmtask();
        continue;

      case 57:
        await jxdoublesign1("https://m.jingxi.com/jxbfd/user/DoubleSignDeal?g_ty=h5&g_tk=&appCode=msd1188198&__t=1657108409440&dwEnv=7&strDeviceId=a3b4e844090b28d5c38e7529af8115172079be4d&strZone=jxbfd&bizCode=jxbfd&source=jxbfd&_cfd_t=1657108409190&_stk=__t%2C_cfd_t%2CbizCode%2CdwEnv%2Csource%2CstrDeviceId%2CstrZone&_ste=1&h5st=20220706195330228%3B1980457211661562%3B10032%3Btk02w78551ad830nuMcGB4Qsv9QxapLP7gZdOCYE5PVV%2Bna%2Bb4KU21drJq64oP82965Vdc1tGqVU%2Flp7ydcZ5XgH0Feh%3B241b6f1d21bf8e41f380a5dd29a7bac2a6f1f65a0c7ef1b1f751eaea4c40dd9c%3B3.0%3B1657108410228&sceneval=2");
        await $.wait(2000);
        await jxdoublesign1("https://wq.jd.com/jxjdsignin/SignedInfo?channel=jx_zdddsq&_t=1658021925021&h5st=20220717093845024%3B5548444396555217%3B0f6ed%3Btk02w9b851b9c18nin7CZjR7vNSlwRexAOGWbYAbl85d9DiQJ1SufW8ZQEQ%2FSygreq626CVRO2gT8DwUUTLBXGyK6wam%3B7eb86560860f8f60ad3b679c34f89aacf891b5a85580efd0a30c355537bfec54%3B3.0%3B1658021925024&_stk=_t%2Cchannel&_=1658021925027&sceneval=2&g_login_type=1&g_ty=ajax&appCode=msc588d6d5");
        await $.wait(1000);
        await jxdoublesign1("https://wq.jd.com/jxjdsignin/IssueReward?channel=jx_zdddsq&_t=1658021926276&h5st=20220717093846279%3B5548444396555217%3B0f6ed%3Btk02w9b851b9c18nin7CZjR7vNSlwRexAOGWbYAbl85d9DiQJ1SufW8ZQEQ%2FSygreq626CVRO2gT8DwUUTLBXGyK6wam%3Be2d7b6810b3bd1b9d9692d354ecbb582e69afc64df19bd8d6c14632b1a65660c%3B3.0%3B1658021926279&_stk=_t%2Cchannel&sceneval=2&g_login_type=1&g_ty=ajax&appCode=msc588d6d5");
        await $.wait(1000);
        continue;

      case 96:
        continue;

      case 94:
        continue;

      case 3:
        console.log("开始做 " + lI1i1l.taskName + "任务");
        let iI1II = lI1i1l.totalNum - lI1i1l.gainedNum;

        if (iI1II === 0) {
          continue;
        }

        await shopTaskList();
        const {
          data: lIil1I
        } = $.shopTaskListRes;
        let IiIIII = [],
            i111iI = [],
            lIllII = [];
        const {
          goodShopList: IIilIl,
          moreShopList: IIilIi
        } = lIil1I;

        if (IIilIl) {
          for (let Illi of IIilIl) {
            if (Illi.taskState === "2") {
              IiIIII.push(Illi);
            }
          }
        }

        if (IIilIi) {
          for (let il11Il of IIilIi) {
            il11Il.taskState === "2" && i111iI.push(il11Il);
          }
        }

        lIllII = IiIIII.concat(i111iI);

        for (let II1iII of lIllII) {
          const {
            shopId: il11Ii,
            shopTaskId: li1Ii1
          } = II1iII,
                i1ii11 = {
            "monitor_refer": "plant_shopNutrientsTask",
            "shopId": il11Ii,
            "shopTaskId": li1Ii1
          },
                iii1 = await requestGet("shopNutrientsTask", i1ii11);
          console.log("shopRes结果:" + JSON.stringify(iii1));
          iii1 && iii1.code === "0" && iii1.data && iii1.data.nutrState && iii1.data.nutrState === "1" && iI1II--;

          if (iI1II <= 0) {
            console.log(lI1i1l.taskName + "任务已做完\n");
            break;
          }
        }

        continue;

      case 5:
        console.log("开始做 " + lI1i1l.taskName + "任务");
        let l1Iiii = lI1i1l.totalNum - lI1i1l.gainedNum;
        if (l1Iiii === 0) continue;
        await productTaskList();
        let l1Iiil = [],
            I1li1I = [];
        const {
          productInfoList: IIiII
        } = $.productTaskList.data;

        for (let i1liI1 = 0; i1liI1 < IIiII.length; i1liI1++) {
          for (let l1IilI = 0; l1IilI < IIiII[i1liI1].length; l1IilI++) {
            l1Iiil.push(IIiII[i1liI1][l1IilI]);
          }
        }

        for (let iiiiII of l1Iiil) {
          iiiiII.taskState === "2" && I1li1I.push(iiiiII);
        }

        for (let ll1I1l of I1li1I) {
          const {
            skuId: iilI,
            productTaskId: IIilI1
          } = ll1I1l,
                li1Il1 = {
            "monitor_refer": "plant_productNutrientsTask",
            "productTaskId": IIilI1,
            "skuId": iilI
          },
                i1ii1I = await requestGet("productNutrientsTask", li1Il1);
          i1ii1I && i1ii1I.code === "0" && i1ii1I.data && i1ii1I.data.nutrState && i1ii1I.data.nutrState === "1" && l1Iiii--;

          if (l1Iiii <= 0) {
            console.log(lI1i1l.taskName + "任务已做完\n");
            break;
          }
        }

        continue;

      case 10:
        console.log("开始做 " + lI1i1l.taskName + "任务");
        let iiiI = lI1i1l.totalNum - lI1i1l.gainedNum;
        if (iiiI === 0) continue;
        await plantChannelTaskList();
        let I1li11 = [],
            II1iIl = [],
            II1iIi = [];
        const {
          goodChannelList: iI1iI,
          normalChannelList: Ii11I1
        } = $.plantChannelTaskList.data;

        for (let ilII1i of iI1iI) {
          ilII1i.taskState === "2" && I1li11.push(ilII1i);
        }

        for (let ilII1l of Ii11I1) {
          ilII1l.taskState === "2" && II1iIl.push(ilII1l);
        }

        II1iIi = I1li11.concat(II1iIl);

        for (let IIilII of II1iIi) {
          const {
            channelId: l1Iil1,
            channelTaskId: IIiIl
          } = IIilII,
                iiiiI1 = {
            "channelId": l1Iil1,
            "channelTaskId": IIiIl
          },
                IIiIi = await requestGet("plantChannelNutrientsTask", iiiiI1);
          console.log("channelRes结果:" + JSON.stringify(IIiIi));
          IIiIi && IIiIi.code === "0" && IIiIi.data && IIiIi.data.nutrState && IIiIi.data.nutrState === "1" && iiiI--;

          if (iiiI <= 0) {
            console.log(lI1i1l.taskName + "任务已做完\n");
            break;
          }
        }

        continue;

      default:
        console.log("\n开始做 " + lI1i1l.taskName + "任务");
        await receiveNutrientsTask(lI1i1l.taskType);
        console.log("做 " + lI1i1l.taskName + "任务结果:" + JSON.stringify($.receiveNutrientsTaskRes) + "\n");
        continue;
    }
  }
}

function showTaskProcess() {
  return new Promise(async iiIIil => {
    await plantBeanIndex();

    if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === "0" && $.plantBeanIndexResult.data) {
      $.taskList = $.plantBeanIndexResult.data.taskList;

      if ($.taskList && $.taskList.length > 0) {
        console.log("     任务   进度");

        for (let iiIIii of $.taskList) {
          console.log("[" + iiIIii.taskName + "]  " + iiIIii.gainedNum + "/" + iiIIii.totalNum + "   " + iiIIii.isFinished);
        }
      }
    } else console.log("plantBeanIndexResult:" + JSON.stringify($.plantBeanIndexResult));

    iiIIil();
  });
}

function showMsg() {
  $.log("\n" + message + "\n");
  jdNotify = $.getdata("jdPlantBeanNotify") ? $.getdata("jdPlantBeanNotify") : jdNotify;
  (!jdNotify || jdNotify === "false") && $.msg($.name, subTitle, message);
}

async function farmtask() {
  await receivefruit();
  await $.wait(500);
  await dofarm("gotConfigDataForBrand");
  await $.wait(500);
  await dofarm("initForFarm");
  await $.wait(500);
  await dofarm("taskInitForFarm");
  await $.wait(500);
  await dofarm("farmMarkStatus");
  await $.wait(500);
  await dofarm("initForFarm");
  await $.wait(500);
}

async function receivefruit() {
  const Ili1li = {
    "monitor_refer": "plant_receiveNutrientsTask",
    "monitor_source": "plant_app_plant_index",
    "awardType": "92",
    "version": "9.2.4.3"
  };
  await request("receiveNutrientsTask", Ili1li);
}

async function dofarm(Ili1ll) {
  let l1Iili = {
    "version": 17,
    "channel": 1,
    "babelChannel": "45"
  };
  return Ili1ll == "gotConfigDataForBrand" && (l1Iili.type = "json", l1Iili.k = "farmShareConfig"), new Promise(async iiiiIl => {
    const iili = {
      "url": JD_API_HOST + "?functionId=" + Ili1ll + "&body=" + encodeURIComponent(JSON.stringify(l1Iili)) + "&appid=wh5",
      "headers": {
        "Cookie": cookie,
        "Host": "api.m.jd.com",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "User-Agent": $.UA,
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://h5.m.jd.com"
      },
      "timeout": 20000
    };
    $.get(iili, (IIl1Ii, ilIIl, I11ll1) => {
      try {
        IIl1Ii && (console.log("\n API查询请求失败 ‼️‼️"), $.logErr(IIl1Ii));
      } catch (lIIII) {
        $.logErr(lIIII, ilIIl);
      } finally {
        iiiiIl();
      }
    });
  });
}

function jxdoublesign1(iiI1i) {
  let Ili1lI = {
    "url": iiI1i,
    "headers": {
      "accept": "application/json",
      "referer": "https://st.jingxi.com/",
      "User-Agent": "jdpingou;iPhone;4.13.0;14.4.2;${randomString(40)};network/wifi;model/iPhone10,2;appBuild/100609;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
      "Cookie": "cid=4;" + cookie
    }
  };
  return new Promise(async l111I1 => {
    $.get(Ili1lI, (Il1l1i, I1II11, iI1) => {
      try {
        if (Il1l1i) {
          console.log("" + JSON.stringify(Il1l1i));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (iI1) {}
        }
      } catch (I111Ii) {
        $.logErr(I111Ii, I1II11);
      } finally {
        l111I1(iI1);
      }
    });
    l111I1();
  });
}

function tjdoublesign(Iili1l) {
  let l11Il1 = {
    "url": Iili1l,
    "headers": {
      "Accept": "application/json",
      "Referer": "https://wqs.jd.com/",
      "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Cookie": cookie
    }
  };
  return new Promise(async lIl1l => {
    $.get(l11Il1, (iIlIii, iiI111, lIi111) => {
      try {
        if (iIlIii) {
          console.log("" + JSON.stringify(iIlIii));
          console.log("tjdoublesign 请求失败，请检查网路重试");
        } else {
          if (lIi111) {}
        }
      } catch (IIiIll) {
        $.logErr(IIiIll, iiI111);
      } finally {
        lIl1l(lIi111);
      }
    });
  });
}

async function getReward() {
  const iI1i = {
    "roundId": lastRoundId
  };
  $.getReward = await request("receivedBean", iI1i);
}

async function cultureBean(liIiii, l11Ill) {
  let ilIil1 = arguments.callee.name.toString(),
      iI1l = {
    "roundId": liIiii,
    "nutrientsType": l11Ill
  };
  $.cultureBeanRes = await request(ilIil1, iI1l);
}

async function stealFriendList() {
  const l11Ili = {
    "pageNum": "1"
  };
  $.stealFriendList = await krrequestGet("plantFriendList", l11Ili);
}

async function collectUserNutr(llIi1l) {
  console.log("开始偷好友");
  let lIi11I = arguments.callee.name.toString();
  const iiili = {
    "paradiseUuid": llIi1l,
    "roundId": currentRoundId
  };
  $.stealFriendRes = await request(lIi11I, iiili);
}

async function receiveNutrients() {
  $.receiveNutrientsRes = await request("receiveNutrients", {
    "roundId": currentRoundId,
    "monitor_refer": "plant_receiveNutrients"
  });
}

async function plantEggDoLottery() {
  $.plantEggDoLotteryResult = await requestGet("plantEggDoLottery");
}

async function egg() {
  $.plantEggLotteryRes = await requestGet("plantEggLotteryIndex");
}

async function productTaskList() {
  let liIili = arguments.callee.name.toString();
  $.productTaskList = await requestGet(liIili, {
    "monitor_refer": "plant_productTaskList"
  });
}

async function plantChannelTaskList() {
  let iiI11i = arguments.callee.name.toString();
  $.plantChannelTaskList = await krrequestGet(iiI11i);
}

async function shopTaskList() {
  let IIiIl1 = arguments.callee.name.toString();
  $.shopTaskListRes = await krrequestGet(IIiIl1, {
    "monitor_refer": "plant_receiveNutrients"
  });
}

async function receiveNutrientsTask(l11il) {
  const Ii1liI = arguments.callee.name.toString(),
        liIilI = {
    "monitor_refer": "plant_receiveNutrientsTask",
    "awardType": "" + l11il
  };
  $.receiveNutrientsTaskRes = await requestGet(Ii1liI, liIilI);
}

async function plantShareSupportList() {
  $.shareSupportList = await requestGet("plantShareSupportList", {
    "roundId": ""
  });

  if ($.shareSupportList && $.shareSupportList.code === "0") {
    const {
      data: I1II1i
    } = $.shareSupportList,
          lli1il = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000,
          lii1I = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000 + 24 * 60 * 60 * 1000;
    let IIiIiI = [];
    I1II1i.map(ll1l => {
      lli1il <= ll1l.createTime && ll1l.createTime < lii1I && IIiIiI.push(ll1l);
    });
    message += "【助力您的好友】共" + IIiIiI.length + "人";
  } else console.log("异常情况：" + JSON.stringify($.shareSupportList));
}

async function helpShare(iiiiI) {
  console.log("\n开始助力好友: " + iiiiI);
  const iiIlIl = {
    "plantUuid": iiiiI,
    "wxHeadImgUrl": "",
    "shareUuid": "",
    "followType": "1"
  };
  $.helpResult = await request("plantBeanIndex", iiIlIl);
  console.log("助力结果的code:" + ($.helpResult && $.helpResult.code));
}

async function plantBeanIndex() {
  $.plantBeanIndexResult = await request("plantBeanIndex");
}

function requireConfig() {
  return new Promise(iIl11i => {
    notify = $.isNode() ? require("./sendNotify") : "";
    const iIiIII = $.isNode() ? require("./jdCookie.js") : "",
          I1lI = "";

    if ($.isNode()) {
      Object.keys(iIiIII).forEach(i11lil => {
        iIiIII[i11lil] && cookiesArr.push(iIiIII[i11lil]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(iilI1I => iilI1I.cookie)].filter(i11lii => !!i11lii);

    console.log("共" + cookiesArr.length + "个京东账号\n");
    $.shareCodesArr = [];
    if ($.isNode()) Object.keys(I1lI).forEach(iiI1II => {
      I1lI[iiI1II] && $.shareCodesArr.push(I1lI[iiI1II]);
    });else {
      if ($.getdata("jd_plantbean_inviter")) $.shareCodesArr = $.getdata("jd_plantbean_inviter").split("\n").filter(iIiII1 => !!iIiII1);
    }
    iIl11i();
  });
}

function krrequestGet(I1l1, Il11I1 = {}) {
  return new Promise(async Il1i1 => {
    const IlIiii = {
      "url": JD_API_HOST + "?functionId=" + I1l1 + "&body=" + encodeURIComponent(JSON.stringify(Il11I1)) + "&appid=signed_wh5&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2",
      "headers": {
        "Accept": "*/*",
        "Origin": "https://h5.m.jd.com",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://h5.m.jd.com",
        "x-requested-with": "com.jingdong.app.mall",
        "Cookie": cookie
      },
      "timeout": 10000
    };
    $.get(IlIiii, (IiIlII, iI11i, I1Iili) => {
      try {
        IiIlII ? (console.log("\n种豆得豆: API查询请求失败 ‼️‼️"), $.logErr(IiIlII)) : I1Iili = JSON.parse(I1Iili);
      } catch (I1li) {
        $.logErr(I1li, iI11i);
      } finally {
        Il1i1(I1Iili);
      }
    });
  });
}

function requestGet(iI11l, IlIiiI = {}) {
  return new Promise(async lli1I => {
    let iI1i1I = "";
    if (!appidMap[iI11l]) iI1i1I = JD_API_HOST + "?functionId=" + iI11l + "&body=" + encodeURIComponent(JSON.stringify(IlIiiI)) + "&appid=ld&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2";else {
      !IlIiiI.version && (IlIiiI.version = "9.2.4.3");
      IlIiiI.monitor_source = "plant_m_plant_index";
      appidMap[iI11l] == "shopNutrientsTask" && (headers.referer = "https://plantearth.m.jd.com/", headers["x-requested-with"] = "https://plantearth.m.jd.com/");
      await $.wait(5000);
      const iIil1l = {
        "appid": "signed_wh5",
        "client": "android",
        "clientVersion": "10.1.0",
        "functionId": iI11l,
        "body": IlIiiI
      };
      let iIil11 = await getH5st(appidMap[iI11l], iIil1l);
      iI1i1I = JD_API_HOST + "?" + iIil11;
    }
    const iIil1i = {
      "url": iI1i1I,
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
        "Cookie": cookie
      },
      "timeout": 20000
    };
    $.get(iIil1i, (l1li1, IIllll, I1Iil1) => {
      try {
        if (l1li1) {
          console.log("\n种豆得豆: API查询请求失败 ‼️‼️");
          console.log(l1li1);
          $.logErr(l1li1);
        } else {
          I1Iil1 = JSON.parse(I1Iil1);
        }
      } catch (IiI11I) {
        $.logErr(IiI11I, IIllll);
      } finally {
        lli1I(I1Iil1);
      }
    });
  });
}

function TotalBean() {
  return new Promise(async l1ii1i => {
    const l1liII = {
      "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      },
      "timeout": 20000
    };
    $.post(l1liII, (I1ii1, li1111, IiliI) => {
      try {
        if (I1ii1) {
          console.log("" + JSON.stringify(I1ii1));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (IiliI) {
            IiliI = JSON.parse(IiliI);

            if (IiliI.retcode === 13) {
              $.isLogin = false;
              return;
            }

            IiliI.retcode === 0 ? $.nickName = IiliI.base && IiliI.base.nickname || $.UserName : $.nickName = $.UserName;
          } else console.log("京东服务器返回空数据");
        }
      } catch (l111il) {
        $.logErr(l111il, li1111);
      } finally {
        l1ii1i();
      }
    });
  });
}

function request(lli1l, Iili1 = {}) {
  return new Promise(async IiIIi1 => {
    let I11Iil = "";

    if (!appidMap[lli1l]) {
      I11Iil = JD_API_HOST + "?functionId=" + lli1l + "&body=" + encodeURIComponent(JSON.stringify(Iili1)) + "&appid=ld&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2";
    } else {
      Iili1.version = "9.2.4.3";
      Iili1.monitor_source = "plant_m_plant_index";
      !Iili1.monitor_refer && (Iili1.monitor_refer = "");
      const I1iiI = {
        "appid": "signed_wh5",
        "client": "android",
        "clientVersion": "10.1.0",
        "functionId": lli1l,
        "body": Iili1
      };
      let l111l1 = await getH5st(appidMap[lli1l], I1iiI);
      I11Iil = JD_API_HOST + "?" + l111l1;
    }

    await $.wait(5000);
    let l1liI1 = {
      "url": I11Iil,
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
        "Cookie": cookie
      },
      "timeout": 10000
    };
    $.get(l1liI1, async (llill1, Iill1, ll1il1) => {
      try {
        if (llill1) {
          console.log("\n种豆得豆: API查询请求失败 ‼️‼️");
          console.log("function_id:" + lli1l);
          $.logErr(llill1);
        } else ll1il1.indexOf("data") > -1 ? ll1il1 = JSON.parse(ll1il1) : (ll1il1 = JSON.parse(ll1il1), console.log(ll1il1.errorMessage));
      } catch (illi11) {
        $.logErr(illi11, Iill1);
      } finally {
        IiIIi1(ll1il1);
      }
    });
  });
}

const appidMap = {
  "plantBeanIndex": "d246a",
  "receiveNutrients": "b56b8",
  "cultureBean": "6a216",
  "receiveNutrientsTask": "d22ac",
  "plantChannelNutrientsTask": "2424e",
  "shopNutrientsTask": "19c88",
  "productTaskList": "7351b",
  "productNutrientsTask": "a4e2d",
  "collectUserNutr": "14357"
};

async function taskUrl(il1lil, I1iil) {
  I1iil.version = "9.2.4.3";
  I1iil.monitor_source = "plant_app_plant_index";
  !I1iil.monitor_refer && (I1iil.monitor_refer = "");

  if (!appidMap[il1lil]) {} else {
    const I1iii = {
      "appid": "signed_wh5",
      "client": "android",
      "clientVersion": "10.1.0",
      "functionId": il1lil,
      "body": I1iil
    };
  }

  return {
    "url": JD_API_HOST + "?" + h5st,
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
      "Cookie": cookie
    },
    "timeout": 10000
  };
}

function getH5st(ll1ilI, I1ilI) {
  let llilil = {
    "appId": ll1ilI,
    ...I1ilI,
    "ua": $.UA,
    "pin": $.UserName
  },
      il1lii = {
    "url": "http://kr.kingran.cf/h5st",
    "body": JSON.stringify(llilil),
    "headers": {
      "Content-Type": "application/json"
    },
    "timeout": 30000
  };
  return new Promise(async li111I => {
    $.post(il1lii, (i111Il, i111Ii, IlII1I) => {
      let i1Il1i = "";

      try {
        if (i111Il) {
          console.log("" + JSON.stringify(i111Il));
          console.log($.name + " getH5st API请求失败，请检查网路重试");
        } else {
          IlII1I = JSON.parse(IlII1I);

          if (typeof IlII1I === "object" && IlII1I && IlII1I.body) {
            if (IlII1I.body) i1Il1i = IlII1I.body || "";
          } else {
            if (IlII1I.code == 400) {
              console.log("\n" + IlII1I.msg);
            } else console.log("\n可能连接不上接口，请检查网络");
          }
        }
      } catch (lIll1I) {
        $.logErr(lIll1I, i111Ii);
      } finally {
        li111I(i1Il1i);
      }
    });
  });
}

function randomString(iII1l1, I1I1I = "qwertyuiopasdfghjklzxcvbnm") {
  let IIillI = "";

  for (let Iiii1l = 0; Iiii1l < iII1l1; Iiii1l++) {
    IIillI += I1I1I[Math.floor(Math.random() * I1I1I.length)];
  }

  return IIillI;
}

function json2str(IiliIi, Iiii1i = {}) {
  let II1iil = [],
      lllll1 = Iiii1i.connector || "&",
      II1iii = Object.keys(IiliIi);
  if (Iiii1i.sort) II1iii = II1iii.sort();

  for (let Ii11i1 of II1iii) {
    let lIll1l = IiliIi[Ii11i1];
    if (lIll1l && typeof lIll1l === "object") lIll1l = JSON.stringify(lIll1l);
    if (lIll1l && Iiii1i.encode) lIll1l = encodeURIComponent(lIll1l);
    II1iil.push(Ii11i1 + "=" + lIll1l);
  }

  return II1iil.join(lllll1);
}

function randomList(Il1lIl) {
  return Il1lIl[Math.floor(Math.random() * Il1lIl.length)];
}

function randomUuid(I1111I = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", I1I11 = "0123456789abcdef") {
  let I1I1l = "";

  for (let IIl1lI of I1111I) {
    if (IIl1lI == "x") I1I1l += I1I11.charAt(Math.floor(Math.random() * I1I11.length));else IIl1lI == "X" ? I1I1l += I1I11.charAt(Math.floor(Math.random() * I1I11.length)).toUpperCase() : I1I1l += IIl1lI;
  }

  return I1I1l;
}

function _utf8_encode(ilii1l) {
  ilii1l = ilii1l.replace(/rn/g, "n");
  var l11l = "";

  for (var illiII = 0; illiII < ilii1l.length; illiII++) {
    var li1IIl = ilii1l.charCodeAt(illiII);
    if (li1IIl < 128) l11l += String.fromCharCode(li1IIl);else li1IIl > 127 && li1IIl < 2048 ? (l11l += String.fromCharCode(li1IIl >> 6 | 192), l11l += String.fromCharCode(li1IIl & 63 | 128)) : (l11l += String.fromCharCode(li1IIl >> 12 | 224), l11l += String.fromCharCode(li1IIl >> 6 & 63 | 128), l11l += String.fromCharCode(li1IIl & 63 | 128));
  }

  return l11l;
}

function base64_mod_encode(iII1il, Il1Ii1) {
  Il1Ii1 = Il1Ii1 || base64_mod_charset;
  var II1ilI = "",
      iII1ii,
      li1III,
      lIii1,
      IIl1il,
      l1Il1i,
      lIlII1,
      Il111I,
      l1Il1l = 0;
  iII1il = _utf8_encode(iII1il);

  while (l1Il1l < iII1il.length) {
    iII1ii = iII1il.charCodeAt(l1Il1l++);
    li1III = iII1il.charCodeAt(l1Il1l++);
    lIii1 = iII1il.charCodeAt(l1Il1l++);
    IIl1il = iII1ii >> 2;
    l1Il1i = (iII1ii & 3) << 4 | li1III >> 4;
    lIlII1 = (li1III & 15) << 2 | lIii1 >> 6;
    Il111I = lIii1 & 63;
    if (isNaN(li1III)) lIlII1 = Il111I = 64;else {
      if (isNaN(lIii1)) {
        Il111I = 64;
      }
    }
    II1ilI = II1ilI + Il1Ii1.charAt(IIl1il) + Il1Ii1.charAt(l1Il1i) + Il1Ii1.charAt(lIlII1) + Il1Ii1.charAt(Il111I);
  }

  while (II1ilI.length % 4 > 1) II1ilI += "=";

  return II1ilI;
}

function get_ep(I11lIi = {}) {
  let IIl1i1 = {
    "ciphertype": 5,
    "cipher": {
      "ud": base64_mod_encode(cryptoJS.SHA1($.UserName).toString()),
      "sv": base64_mod_encode($.os_ver),
      "iad": ""
    },
    "ts": Date.now(),
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile",
    "ridx": -1
  };
  $.ep = JSON.stringify(IIl1i1);
}

function get_ua(iII1li, lIiii = {}) {
  const l111i1 = {
    "jd": {
      "app": "jdapp",
      "appBuild": "168392",
      "client": "android",
      "clientVersion": "10.1.0"
    },
    "lite": {
      "app": "jdltapp",
      "appBuild": "1247",
      "client": "ios",
      "clientVersion": "6.0.0"
    }
  },
        li1l1l = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"];
  $.os_ver = randomList(li1l1l);
  let li1l1i = iII1li || "jd",
      lIiil = lIiii?.["ep"] ? lIiii?.["ep"] : true;

  if (!l111i1[li1l1i]) {
    console.log("获取[" + li1l1i + "]UA失败");
    return;
  }

  $.client = lIiii?.["client"] ? lIiii?.["client"] : l111i1[li1l1i].client;
  $.clientVersion = lIiii?.["clientVersion"] ? lIiii?.["clientVersion"] : l111i1[li1l1i].clientVersion;
  $.sua = "iPhone; CPU iPhone OS " + $.os_ver.replace(".", "_") + " like Mac OS X";
  let iII1ll = "android";
  $.client == "apple" && (iII1ll = "iPhone");
  get_ep();
  let I1111i = [l111i1[li1l1i].app, iII1ll, $.clientVersion, "", "rn/" + randomUuid(), "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + l111i1[li1l1i].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", lIiil ? "ep/" + encodeURIComponent($.ep) : "", "Mozilla/5.0 (" + $.sua + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
  $.UA = I1111i.join(";");
}

function getParam(llllll, llIl) {
  const llIi = new RegExp("(^|&)" + llIl + "=([^&]*)(&|$)", "i"),
        Ii11il = llllll.match(llIi);
  if (Ii11il != null) return unescape(Ii11il[2]);
  return null;
}

function jsonParse(ilIl11) {
  if (typeof ilIl11 == "string") try {
    return JSON.parse(ilIl11);
  } catch (lII1li) {
    return console.log(lII1li), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
