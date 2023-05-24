/*
================================================================================
魔改自 https://github.com/shufflewzc/faker2/blob/main/jdCookie.js
修改内容：与task_before.sh配合，由task_before.sh设置要设置要做互助的活动的 ShareCodeConfigName 和 ShareCodeEnvName 环境变量，
        然后在这里实际解析/ql/log/.ShareCode中该活动对应的配置信息（由code.sh生成和维护），注入到nodejs的环境变量中
修改原因：原先的task_before.sh直接将互助信息注入到shell的env中，在ck超过45以上时，互助码环境变量过大会导致调用一些系统命令
        （如date/cat）时报 Argument list too long，而在node中修改环境变量不会受这个限制，也不会影响外部shell环境，确保脚本可以正常运行
魔改作者：风之凌殇
================================================================================

此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
let CookieJDs = [
'pt_key=app_openAAJkbOjdADB7wGuQOZQfsXfTKns5yierAIOfmcqV1NOJ9OL5ARErfU3BFzZ9WZ9v71dvJei6PzI;pt_pin=libinxwz;',


'pt_key=app_openAAJkbURbADDSsNOqnpK9C_RVw33wqQO36NePowRqrz3xTtLIPSy8CIUgacI76ig-cmRFPiO3GoY;pt_pin=jd_61d5ffc77afbc;',


'pt_key=app_openAAJkbSFJADBuTIjZmeWc1hS3LaCCxHzIybuvX14fgilVLzNIfGp34uq9ahTKjXxGnp7BDdxXXHE;pt_pin=wdpcPPMuBenhKg;',


'pt_key=app_openAAJkbUg4ADA9oZhomDs4pRdNftJplgR8KBcQIKQI1TiUNuTVd6eDIUPqgIgoSeQpom3mKVHf574;pt_pin=jd_53504250c5652;',


'pt_key=app_openAAJkbUgiADCWxJG2N_kaaJyvfOYTdtZmItE0iFc5QdZSSxXedX6UEpTgYwHL5Ai5lVX2z4R9ZSE;pt_pin=jd_70b6936fd65a9;',


'pt_key=app_openAAJkbOX2ADDo00b5sO_qKcekxeCfeDo1MoRo9OSqPzjAubQgsHcVI-N1oXKTr2T6Dwo6sA55pSI;pt_pin=jd_uhQrHvOnkruH;',


'pt_key=app_openAAJkbUgLADBI606A4rO6N1kF4LhYBk8xkpmO3aJ7eJ-IODvjZO6GMDeKVHrdvHDeWa6n52evKRM;pt_pin=wdFulrsXNvpcbf;',


'pt_key=app_openAAJkbOYjADAdb_4H41PzkB_B7skoqUwCHkUMza0mLDAFlQLZYpEUK1VWsXwHsUFejviqSu8QP8o;pt_pin=jd_70191d2deb1c2;',


'pt_key=app_openAAJkbOY6ADBjiRIcRDqdcoVXXUzIGVA884_EBjuJNFztthMx3JyET7Kxy7Xed7y0xZIwYNO2izY;pt_pin=jd_639284c7e24f4;',


'pt_key=app_openAAJkbOPXADB2rYEJKYnX-pgUaEFG1hTS24d1rk4zQGPH6dATsZpmlD-zxjqGCjLly-M9YdVfGjU;pt_pin=jd_SrCzReVimwxM;',


'pt_key=app_openAAJkbOXgADDeptVGeO3S_1gok0b5oKlG2g0XLRBn0hW_P_T2wiDeQsRkQE1Fw6w1RVE7YlT5Jdg;pt_pin=jd_gHCmJCNYacVx;',


'pt_key=app_openAAJkbOYNAEAXNHejUX_cgcG3VUWNMEoL4cuQmmc7H9PplKPG8TqUtYiS5xYPY-7bnkFHpWrVEACXjdB1mmWvN4qjpgEQmC9G;pt_pin=%E4%BC%9A%E8%B7%B3%E8%88%9E%E7%9A%84%E5%B0%8F%E8%9A%82%E8%9A%81;',


'pt_key=app_openAAJkbUzIADC6l-O2eC-_j2iAEyAdEKvMeFvYeCLOpFgoR0rLx-cfzuPJSqegQ7UwtSKg3vXW-xk;pt_pin=412208798_m;',


'pt_key=app_openAAJkbT78ADAM3XFmpHlNod5b-DIkJ_I-MV4_HzOzAMU0DdOmImhSKWw1PkrRKuSgEQ6qYWKb1Cg;pt_pin=jd_bVxiAmQBpUij;',


'pt_key=app_openAAJkbOZnADBu5sUXIskb3xZp_rSa318pnu1aa_SABFPNVnZtQFMECDXlPUaFnlDllTA3GmPXvUc;pt_pin=jd_750fd4822f18b;',


'pt_key=app_openAAJkbOZQADAIgkBCEnCt0FCY1DRfplLQGey06p8OUzkUpZ2LHWgIOzKHFtf3sE4pr_rC0Knpaog;pt_pin=jd_7055c4e7c917c;',


'pt_key=app_openAAJkbVqUADCAKvQ7fjZAhP4RZ8zigpZ6O5NlhvZN_pLp8gWUdur-T2a8PsFtWAWUvKvspsZInkE;pt_pin=jd_69960e01dbda3;',


'pt_key=app_openAAJkbVrCADAoXezvL7aF9TRaq1KlR4TZuK950piLr8jaYDIVVFztW-yMusvsyCZaxMeTtYibcvc;pt_pin=%E9%BB%9B%E8%89%B293;',


'pt_key=app_openAAJkbUz1ADBcs_5_YpRoPTz0DsPX3O5GR3sfBG4U1GT6w2IB6MDQbFNOcoF-voTfE0t0avCYcxw;pt_pin=jd_57f964f4b0e6e;',


'pt_key=app_openAAJkbQbSADBo7YXeB7Iz-qIlBh5v_mMvxYKca3eIJkMEAWcGPa730p-EbjzOqWWsmRHRaax1sjo;pt_pin=18661231724_p;',


'pt_key=app_openAAJkbVtIADAfsFkWCcxmpDoAfrbE1dRd1IyTogHIYQEVZL12UE8L0sIfRjXLWiTVw2GWlzf6rQU;pt_pin=jd_54982f63f9d7f;',


]
// 判断环境变量里面是否有京东ck
if (process.env.JD_COOKIE) {
  if (process.env.JD_COOKIE.indexOf('&') > -1) {
    CookieJDs = process.env.JD_COOKIE.split('&');
  } else if (process.env.JD_COOKIE.indexOf('\n') > -1) {
    CookieJDs = process.env.JD_COOKIE.split('\n');
  } else {
    CookieJDs = [process.env.JD_COOKIE];
  }
}
if (JSON.stringify(process.env).indexOf('GITHUB')>-1) {
  console.log(`请勿使用github action运行此脚本,无论你是从你自己的私库还是其他哪里拉取的源代码，都会导致我被封号\n`);
  !(async () => {
    await require('./sendNotify').sendNotify('提醒', `请勿使用github action、滥用github资源会封我仓库以及账号`)
    await process.exit(0);
  })()
}
CookieJDs = [...new Set(CookieJDs.filter(item => !!item))]
console.log(`\n====================共${CookieJDs.length}个京东账号Cookie=========\n`);
console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString('zh', {hour12: false}).replace(' 24:',' 00:')}=====================\n`)
if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
for (let i = 0; i < CookieJDs.length; i++) {
  if (!CookieJDs[i].match(/pt_pin=(.+?);/) || !CookieJDs[i].match(/pt_key=(.+?);/)) console.log(`\n提示:京东cookie 【${CookieJDs[i]}】填写不规范,可能会影响部分脚本正常使用。正确格式为: pt_key=xxx;pt_pin=xxx;（分号;不可少）\n`);
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieJD' + index] = CookieJDs[i].trim();
}

// 以下为注入互助码环境变量（仅nodejs内起效）的代码
function SetShareCodesEnv(nameChinese = "", nameConfig = "", envName = "") {
  let rawCodeConfig = {}

  // 读取互助码
  shareCodeLogPath = `${process.env.QL_DIR}/log/.ShareCode/${nameConfig}.log`
  let fs = require('fs')
  if (fs.existsSync(shareCodeLogPath)) {
    // 因为faker2目前没有自带ini，改用已有的dotenv来解析
    // // 利用ini模块读取原始互助码和互助组信息
    // let ini = require('ini')
    // rawCodeConfig = ini.parse(fs.readFileSync(shareCodeLogPath, 'utf-8'))

    // 使用env模块
    require('dotenv').config({path: shareCodeLogPath})
    rawCodeConfig = process.env
  }

  // 解析每个用户的互助码
  codes = {}
  Object.keys(rawCodeConfig).forEach(function (key) {
    if (key.startsWith(`My${nameConfig}`)) {
      codes[key] = rawCodeConfig[key]
    }
  });

  // 解析每个用户要帮助的互助码组，将用户实际的互助码填充进去
  let helpOtherCodes = {}
  Object.keys(rawCodeConfig).forEach(function (key) {
    if (key.startsWith(`ForOther${nameConfig}`)) {
      helpCode = rawCodeConfig[key]
      for (const [codeEnv, codeVal] of Object.entries(codes)) {
        helpCode = helpCode.replace("${" + codeEnv + "}", codeVal)
      }

      helpOtherCodes[key] = helpCode
    }
  });

  // 按顺序用&拼凑到一起，并放入环境变量，供目标脚本使用
  let shareCodes = []
  let totalCodeCount = Object.keys(helpOtherCodes).length
  for (let idx = 1; idx <= totalCodeCount; idx++) {
    shareCodes.push(helpOtherCodes[`ForOther${nameConfig}${idx}`])
  }
  let shareCodesStr = shareCodes.join('&')
  process.env[envName] = shareCodesStr

  console.info(`${nameChinese} 的 互助码环境变量 ${envName}，共计 ${totalCodeCount} 组互助码，总大小为 ${shareCodesStr.length} 字节`)
}

// 若在task_before.sh 中设置了要设置互助码环境变量的活动名称和环境变量名称信息，则在nodejs中处理，供活动使用
let nameChinese = process.env.ShareCodeConfigChineseName
let nameConfig = process.env.ShareCodeConfigName
let envName = process.env.ShareCodeEnvName
if (nameChinese && nameConfig && envName) {
  SetShareCodesEnv(nameChinese, nameConfig, envName)
} else {
    console.debug(`KingRan 频道通知：https://t.me/KingRan521\n`)
		console.debug(`云服务器IP须知：域名前缀为 'lzdz' 的禁用勿跑容易黑号\n`)
}
