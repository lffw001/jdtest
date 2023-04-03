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
'pt_key=app_openAAJkKcT5ADCsU2mPdE8kdnrkdK66Fb9Pn1wrO0z_4yQmmY8KqH585-9Wv2rmRz2cl2eYCTZvirE;pt_pin=libinxwz;',


'pt_key=app_openAAJkKajwADB6ksfI1ynnc_sx6d9ZK6wN9dgyzz526bNBnWS2c6SOP4W7ADjTTCTOXcsk0sSmcV4;pt_pin=jd_61d5ffc77afbc;',


'pt_key=app_openAAJkKT-NADCofM9MmcFX9eX7xviO4sPBjEM8ZYkCM98V2-dI_UUwg0R3VVZa1b3RuBmyWotvCm0;pt_pin=wdpcPPMuBenhKg;',


'pt_key=app_openAAJkKalJADBjzslL1P4uP_7V1MeZ0GMjSCzWoEYUQuvZteVdlC4GxsMjR6fsavVovCt0227y5k4;pt_pin=jd_53504250c5652;',


'pt_key=app_openAAJkKakzADChm4z5t3Frr3JyAIRCdOiKmrwhJC7XkLD0mvmZI_PiBPu1TKnsG1qvxqLX2Vem9ng;pt_pin=jd_70b6936fd65a9;',


'pt_key=app_openAAJkKbB8ADBCMFHLmnlMBhxT0ikMiQBBTE1wYIAnabtDzaGfYtETDaHWuPw2oC8jfzq6JvqD_tQ;pt_pin=jd_uhQrHvOnkruH;',


'pt_key=app_openAAJkKakcADBp6VaW0p0QkfZ6GfNOxhK9KEPGFN6c2wKscFIVw6yyt6eVYIZ_E-DrsUcqHZSamzw;pt_pin=wdFulrsXNvpcbf;',


'pt_key=app_openAAJkKamjADBQrEbpehG9rCJda920oqkeu26vYIXIjfNPD1EIFHvzx8FiKF2QmznWjZXk7IidOZY;pt_pin=jd_70191d2deb1c2;',


'pt_key=app_openAAJkKbC_ADC0MRRm9ignJjgMbqg7ZZWNltn80JUuyOohFZ-xmMJ8DchmK--5V54h8-35tl-WpZk;pt_pin=jd_639284c7e24f4;',


'pt_key=app_openAAJkKalgADD1ZNQT6ZIuRmZAbQyPZ-Sn0X1cSnDkhidqPW7slTt3ZlZVdyxX77bTBBxDcxRYO9g;pt_pin=jd_gHCmJCNYacVx;',


'pt_key=app_openAAJkKbCTAECdHgCYBts02zB3i7jff-XKS9FE67gQll-DAfcoRY_kbuY_YenQ8sda5UQT4ay2OsKNvHk8U59fHGdLNB6tBg4O;pt_pin=%E4%BC%9A%E8%B7%B3%E8%88%9E%E7%9A%84%E5%B0%8F%E8%9A%82%E8%9A%81;',


'pt_key=app_openAAJkKabRADDGGQ2AoVSliip5r1trvjaYoM3l3c4t4vhbx2FTXmdGSkS29Qe-PCAI9Ho3igfnAHU;pt_pin=412208798_m;',


'pt_key=app_openAAJkKWRHADBE4rlkO64o7KZJsKVLTCry3ApH23LyaybdkEuUumPC0yDqYSGuqhKuZEBbY7O_K8s;pt_pin=jd_bVxiAmQBpUij;',


'pt_key=app_openAAJkKa1oADCOmUkXiq75msFr0nP0j_d-9OsBE75D3gwwuBH2ncC0VhW7pvwhN7N-cgSggJTSW5I;pt_pin=jd_750fd4822f18b;',


'pt_key=app_openAAJkKanQADAThJhv_CbTNrnWDzP6aPQDyXF__eYZvIPeo6N52miWb5zggus2eBuKGoWIB0h9AF4;pt_pin=jd_7055c4e7c917c;',


'pt_key=app_openAAJkKiwlADBM8foGlSglizyjMQaQOCf3cyKIAkSs6hXQDOxfjJeSHHDb13hhfuzMZaLhVVW57rU;pt_pin=jd_69960e01dbda3;',


'pt_key=app_openAAJkKaa7ADBRsQrqb9nfswvMSVT-_zIwBUHAwLtBtZyR-ayXkcDKHG_eK-zNzM8du5pVCc8dkcs;pt_pin=%E9%BB%9B%E8%89%B293;',


'pt_key=app_openAAJkKaptADC-MJofasw4ob72qILyKkyKsANfA3D0Qoozxr_pxvTJSIe5BatYnAfu_V5C9qgwO4k;pt_pin=jd_68be6ce4ab227;',


'pt_key=app_openAAJkKaqDADB5YHZXUyYdF_7ui6tPQighLnELbje23MBJXOo7um-rC7tNuNfpN1CrbiPX-p1sPYI;pt_pin=jd_57f964f4b0e6e;',


'pt_key=app_openAAJkKPdiADDzRsRwdg3HjWnYuHobacP7rbA80DxaMajJS0uNXEwhiaJX84bQFAZrki_ISW_3p0A;pt_pin=18661231724_p;',


'pt_key=app_openAAJkKPd5ADAYjMmR53Yjb-1BIAWOaoDHWkAOWeeREZyELKRnVpr22z5nBv4qSXTnDbJLK-BxXsA;pt_pin=jd_54982f63f9d7f;',


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
