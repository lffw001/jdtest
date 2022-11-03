/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
let CookieJDs = [
'pt_key=app_openAAJjYnDaADDgKIp0kOQxaiSOXSxDxJ9fFwsQ9GeSWNZ5l_0OwplyWBerMm3XF1soQswjiGF_OhA;pt_pin=libinxwz;',


'pt_key=app_openAAJjYfhAADC4N7WIUrGjsJaYnfq7NikL3etE6uAvN7ruU_XmICuRU5dCOxlKKFGi9cJ1L--qCUc;pt_pin=jd_61d5ffc77afbc;',


'pt_key=app_openAAJjYeRTADD-fe_Bc9ieAhSsfZWVYcAitnV9JphiktkOi48AYVYsd8mZghkparxK0VtlCRXmp64;pt_pin=wdpcPPMuBenhKg;',


'pt_key=app_openAAJjYUUlADDHc0w14bEpGcNL39S35oY3u7_nIr33KEKMweJDuMl_ODJjPjsg2efYjNIwFvg6-Sw;pt_pin=jd_70b6936fd65a9;',


'pt_key=app_openAAJjYdaPADDBVwIznVTfj6rEBI6Gr1v0fG7kBTsl5OUe-GI2yMAbMfXDcweVeMo5XYUtPiE1ZE8;pt_pin=jd_53504250c5652;',


'pt_key=app_openAAJjYgnrADBVmCQNLnY5vfXIm5iEEE16TeS7cy4n-nIhq7AlYvwkMnENq-AOMDz_R4TQE9njjOw;pt_pin=wdFulrsXNvpcbf;',


'pt_key=app_openAAJjYi_QADB0pfawQslqr3BWDQAtppKis3TXK-AMWrbUiw-kCQJQVdqNbIvyGULahUqIQpCe0TU;pt_pin=jd_uhQrHvOnkruH;',


'pt_key=app_openAAJjYe5jADDRZkb3rk31jdnwLsQBHvvb9q5WdWZycuLhLxZyi5RBOGNp3anczaKt33rpC18ljEU;pt_pin=jd_70191d2deb1c2;',


'pt_key=app_openAAJjYdvVADDmanpU7upEpC5EJN9CbWnV_o4-ASYnG6DfHuDJdjlwEo5zkOiDqR4OO1MjX85qJcI;pt_pin=jd_639284c7e24f4;',


'pt_key=app_openAAJjYbEnADCYFPqAEhN4u4sIGXWL3UpXabJ7eDv3Je-epbD6ZyFJJb521nLL6yzxy-i4jKSXrI4;pt_pin=jd_gHCmJCNYacVx;',


'pt_key=app_openAAJjYguZADCfaoie0Fq4zGvGF1UHNuEdn3K1liqnyd6Wxsjb7HzuNsm_At5kdSKo0LsnO232XaQ;pt_pin=jd_bVxiAmQBpUij;',


'pt_key=app_openAAJjYgrOADDN5PX8i3DrxJzguWLIIV1cN5SobLu5U0Yny4mo5mu7ewrZGBbI9njUHjAsq4HO7ig;pt_pin=jd_7055c4e7c917c;',


'pt_key=app_openAAJjYeUdADDQVAfLW8ow781yVTVLrHX-yZ6ByNXX9AfBeFh7eFJ2DNU7bgGrckpvtQdTapC_Zf4;pt_pin=jd_750fd4822f18b;',


'pt_key=app_openAAJjYfL5AEAds8Ae0jQbkyHVUY8q04lB7QSFIkBRXlaC11fjz1aQkh-2llaJO8GOHcJOwJvCIA46EYJGHqA6aiDhxOa11bG0;pt_pin=%E4%BC%9A%E8%B7%B3%E8%88%9E%E7%9A%84%E5%B0%8F%E8%9A%82%E8%9A%81;',


'pt_key=app_openAAJjYfN4ADBnMUCQAgthWBD_ocTTkNXSwVX2XgaUYGJ5wLcJjpajlO9jZAbjzPXHQZOnw3bTxOQ;pt_pin=jd_47d7e654a5fbe;',


'pt_key=app_openAAJjYfhaADAs11Kfz5cfeej6POzfsx4uHnIeHjsQfnKyVL0Mtlcv9cbKxz8LxTAa8Uu2-Te7uBw;pt_pin=%E9%BB%9B%E8%89%B293;',


'pt_key=app_openAAJjYiMiADAHneeCSi8X1eKELn3g_DTcHd69Fqa8s4TopA3pgL5_n-3dzyoWCmElHxJN5AfF5LQ;pt_pin=jd_69960e01dbda3;',


'pt_key=app_openAAJjYnxLADD6iTfyptHCnjm8s8dnAkEOjMXibTEwIHdmDhOoPdtUKD9rtjGC6GIhov1ZuufUydo;pt_pin=jd_639f931f0cc10;',


'pt_key=app_openAAJjYde-ADBNPzs4RAGVaJAqVXiAweZEjvjy7loEkVJEYaNshvoMvvzPbaoXp7gQ-jQevVNCHfs;pt_pin=jd_68be6ce4ab227;',


'pt_key=app_openAAJjYfPEADAt4mwR450F208oa_mcsAcVptP0GTh3Cv_34vN4FWtJjBW4n6Jf2hK7UhJM3VrZfQE;pt_pin=412208798_m;',

//  '这里是cookie',	
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
