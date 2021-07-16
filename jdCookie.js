/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
let CookieJDs = [
  'pt_key=AAJg7E-TADCQP_st-yO9bfzsKLxT3AEwRluxnmsYAuEhIJadfV_Ze7RgW3tQhPIlt5pqLIOOS-Y;pt_pin=libinxwz;',
  'pt_key=AAJg2oeEADDr03_eCKK8UuUTlCYrC7SlvFelP3B91EG1FRsvmkfV8CqW67n2YHxlWv8CKbXCC70;pt_pin=jd_61d5ffc77afbc;',
  'pt_key=AAJg7ke-ADA-3M98a7RygRMOx91aGj6rhoimqDwZ7xmIkIcpxSE4G87z8SDlUZsJQHqkWKh9ogg;pt_pin=wdpcPPMuBenhKg;',
  
  'pt_key=AAJg00QVADCQWAxJGV6ByXXlLJkxtIwBkc2cYvAlpl_ut6ZgsSiBVrEDMYIaANPgNGdVLQd2ESQ; pt_pin=jd_70191d2deb1c2;',
  'pt_key=AAJg0CvFADDBCiaWdI9bgf6QY_9Xwk1-nyQt09qCdg6CAECrmh2ng8kidluCN-gWy-IXVmHY7Uw;pt_pin=jd_639284c7e24f4;',
  'pt_key=AAJg2zQPADC9RR-Y46Nh2V6BBK_FU84IjPbTHsg7Fh4dQOdY5813SSS-Qued8yB5dBJpNPAtPKA;pt_pin=jd_gHCmJCNYacVx;',//王兰会
]
// 判断环境变量里面是否有京东ck
if (process.env.JD_COOKIE) {
  if (process.env.JD_COOKIE.indexOf('&') > -1) {
    console.log(`您的cookie选择的是用&隔开\n`)
    CookieJDs = process.env.JD_COOKIE.split('&');
  } else if (process.env.JD_COOKIE.indexOf('\n') > -1) {
    console.log(`您的cookie选择的是用换行隔开\n`)
    CookieJDs = process.env.JD_COOKIE.split('\n');
  } else {
    CookieJDs = [process.env.JD_COOKIE];
  }
}
if (JSON.stringify(process.env).indexOf('GITHUB11')>-1) {
  console.log(`请勿使用github action运行此脚本,无论你是从你自己的私库还是其他哪里拉取的源代码，都会导致我被封号\n`);
  !(async () => {
    await require('./sendNotify').sendNotify('提醒', `请勿使用github action、滥用github资源会封我仓库以及账号`)
    await process.exit(0);
  })()
}
CookieJDs = [...new Set(CookieJDs.filter(item => item !== "" && item !== null && item !== undefined))]
console.log(`\n====================共有${CookieJDs.length}个京东账号Cookie=========\n`);
console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)
for (let i = 0; i < CookieJDs.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieJD' + index] = CookieJDs[i].trim();
}
