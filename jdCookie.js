/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
//注：github action用户cookie填写到Settings-Secrets里面，新增JD_COOKIE，多个账号的cookie使用`&`隔开或者换行
let CookieJDs = [
  'pt_key=AAJgxJgfADDcRqJfdhW8vWTJTkZqBCgloHab__NeO80gRe9-e_0RORyC4INtzDbDExFWKtrUKps;pt_pin=libinxwz;',
  'pt_key=AAJgstP9ADBVLxz1lQ0hxf_DUVEHhw6OSRMueeO6TSlKvFEoP9xZQPlEe3hlMabxRzvBhYt9m6c;pt_pin=jd_61d5ffc77afbc;',
  'pt_key=AAJgxjjTADDa0uLHcapileDnjXItryH5JbwyujBqfB5jjxdUuZwxJICrK3rXL88i8daw4cdsENY;pt_pin=wdpcPPMuBenhKg;',
  'pt_key=AAJgqSJNADCR6tV5lo4CCjaEyY7cFdRHKqpHTo8lJa90uGnU-tvdl3PaUdL6To4JSM8ARbzbZ4w; pt_pin=jd_70191d2deb1c2;',
  'pt_key=AAJgpRvFADC2RzP9Bs1kDgv7uwx2wGQwxLJ8zBCNWBy9Wqk2z6fBxDqhlur6D48Kt9kRVIhjaSA; pt_pin=jd_639284c7e24f4;',
  'pt_key=AAJgq7gsADBZBxtgtx1XBrh1b7KcWuT08iarWcbun9Asfg1zoYR5vjwwgND7Nwhu5T1KOqvkOE0;pt_pin=jd_gHCmJCNYacVx;',//王兰会
  'pt_key=AAJgtzimADDYSaSw8mJtxBGjlS5QbeccevWKNfEmzKJAMiemHRI0rhvxxPp6m1S5KA33VGoUyHE;pt_pin=jd_70b6936fd65a9;',//李建新

  
  
//  '这里是cookie',	
]
// 判断github action里面是否有京东ck
if (process.env.JD_COOKIE) {
  if (process.env.JD_COOKIE.indexOf('&') > -1) {
    console.log(`您的cookie选择的是用&隔开\n`)
    CookieJDs = process.env.JD_COOKIE.split('&');
  } else if (process.env.JD_COOKIE.indexOf('\n') > -1) {
    console.log(`您的cookie选择的是用换行隔开\n`)
    CookieJDs = process.env.JD_COOKIE.split('\n');
  } else {
    CookieJDs = process.env.JD_COOKIE.split();
  }
  console.log(`\n====================共有${CookieJDs.length}个京东账号Cookie=========\n`);
  console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)
  // console.log(`\n==================脚本执行来自 github action=====================\n`)
}
for (let i = 0; i < CookieJDs.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieJD' + index] = CookieJDs[i];
}

for (let i = 0; i < CookieJDs.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieJD' + index] = CookieJDs[i];
}
