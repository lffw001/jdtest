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

'pt_key=app_openAAJkiJhiADCTKMJ_KE1ZyVYO2XbcpQUbc5CFFuMm838B3mRKVKFd1m4j1TPT-M0EjUYiN3-Tv30;pt_pin=libinxwz;',


'pt_key=app_openAAJkiJh5ADAlopY7fXzqXMfT5GzpeM2ee-FH9ggV0sCUxUqmjA1AUVDoBHiEaGKiKTOZkZv6kGs;pt_pin=jd_61d5ffc77afbc;',


'pt_key=app_openAAJkh3E9ADC4rLcTIe27QQPJeSRAwFdiusGGYzAQFOvgx-VZQ511b4G9mNLosFnZrCxEPmOrqMI;pt_pin=wdpcPPMuBenhKg;',


'pt_key=app_openAAJkiJjVADB1jTVjBe6arueR-Pabh8Za5mEnJJhH2wFsrL-MnzX0sQBcBW-3gj7_vAKiVbuDE_E;pt_pin=jd_53504250c5652;',


'pt_key=app_openAAJkiJU8ADBzcD_jYwUCX3O5pPjsIV2zL86U7q6xIUorwss2NssQSyWlBSCEoKnWsXmoe1BA0q8;pt_pin=jd_70b6936fd65a9;',


'pt_key=app_openAAJkiJWCADDnteXk9vGFm5ZGNaVjXBgxAUE3iSUrWqLDJyEU-rlTCBMskjhoRYYzt4mEG1KBCSg;pt_pin=jd_uhQrHvOnkruH;',


'pt_key=app_openAAJkiJinADAnQtDwM6dYe7KKLKHKErbDyxaPLntNVJRU9X23DF7C8CKg_q93GoLUxkaO_wqGr9g;pt_pin=wdFulrsXNvpcbf;',


'pt_key=app_openAAJkiJkwADB_Z7y8lI3nSWK5qQ46HLpki9KxrO0aRTi3OA_B81N4UWO_RluCD3BZfkkp7uPJ4AE;pt_pin=jd_70191d2deb1c2;',


'pt_key=app_openAAJkiJlHADD98gwFVcOWHUQuIxzRc4URmvnJrAN-gLHDaPgc6oqpwiayZ_NJpCIt8WKRDparr0Y;pt_pin=jd_639284c7e24f4;',


'pt_key=app_openAAJkh_GSADAazQpAST9JVObhsjvgi2p-IgZjd9ebtcUmTwH2AjUGNf-AOO5KlRu4L190PgVUNwE;pt_pin=jd_SrCzReVimwxM;',


'pt_key=app_openAAJkiJVqADDT19BPKaKeqNm_QbbaeKvBgLsHtZf_5trtrJbm1ru-Dwy94eWYI61bH6s4NWh57Lo;pt_pin=jd_gHCmJCNYacVx;',


'pt_key=app_openAAJkiJWZAEDvkpGwXKdQsU6E-B0-t3UHmTj5Upn91BWbyUBrFDHtRSGkHs-JWe9_dX4wJZHe9s5iYrl5bl0LUkd-8pkrOke2;pt_pin=%E4%BC%9A%E8%B7%B3%E8%88%9E%E7%9A%84%E5%B0%8F%E8%9A%82%E8%9A%81;',


'pt_key=app_openAAJkiJnVADBYAw0e5XpJLpm7AHMUlgqu7Ksi5KXJKLUTItqKtvEwa4q4mtGWNbEl96p0jv-u0XI;pt_pin=412208798_m;',


'pt_key=app_openAAJkiJaXADCZBiOfNGzO_KvutkW2yjA3fmWe8Br2oNs3Y00gMTcfWeLHKvh13D3a-5DzN24zMVQ;pt_pin=jd_bVxiAmQBpUij;',


'pt_key=app_openAAJkiJX0ADA3pUWEQ-YhFgwUIXUOUy0fu2W1jA_srpwhTS4K8s8UFYp2NFmSTn6IpBpMO_3s2sY;pt_pin=jd_750fd4822f18b;',


'pt_key=app_openAAJkiJXdADDxqbnWHbsOVJcS0zd2C1ZIaLRiGOt_6jU6dxWZU4E3gxbk7Rppoc9z6tbh6joIAdo;pt_pin=jd_7055c4e7c917c;',


'pt_key=app_openAAJkiJmMADCEdKTpPZm5oxfEZShC53ib13W_Y4GZ9HrbVI8QEYNEqvFeDSnoKhS1POLEmaIiPZI;pt_pin=jd_69960e01dbda3;',


'pt_key=app_openAAJkiJm9ADAsI1CjxWNIGMMZy-GkgXItKoZULHDleeu-V2gSXOMslZxfXBp7j9DU1JgHeqSzPYg;pt_pin=%E9%BB%9B%E8%89%B293;',


'pt_key=app_openAAJkiJmmADA0JyuOAbJoe7ELM9sRMzKR_tX0P_2Icx5hTxItt5yYQ6Dg4tKDj-0q3B7hzLl_1cw;pt_pin=jd_639f931f0cc10;',


'pt_key=app_openAAJkiJZpADB7c7MEsWNX_KzkO5elqoNQtJzlt2NPab7GRuu4nxuJzGwB2BDLTqH1yipGQSS3928;pt_pin=jd_68be6ce4ab227;',


'pt_key=app_openAAJkiJaAADBPsPKxev7KMHgswy63pIVUHI1jkOdGv9EmTvlPZuzjZPJkfYZk7jlhC6mhlo_VWl8;pt_pin=jd_57f964f4b0e6e;',


'pt_key=app_openAAJkiEzKADBvCOaGAgvXMdWNKRfeP0qu6Ty1ROJ9vlZb3Q4MFEXxTur-t8Scu4gz6_7gtAs6SIU;pt_pin=18661231724_p;',


'pt_key=app_openAAJkh-TdADA2ICnVzYaziefeKCgB7dW4ckVToiIjbn1yFJKCxQeo5WnKd5hKdpo-7pDbwSPxfew;pt_pin=jd_54982f63f9d7f;',

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
