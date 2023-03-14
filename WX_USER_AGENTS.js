const USER_AGENTS = [
	"Mozilla/5.0 (Linux; Android 10; WLZ-AN00 Build/HUAWEIWLZ-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4425 MMWEBSDK/20221206 Mobile Safari/537.36 MMWEBID/853 MicroMessenger/8.0.32.2300(0x28002059) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Linux; Android 10; LM-V405 Build/QKQ1.191222.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/85.0.4183.101 MQQBrowser/6.2 TBS/045331 Mobile Safari/537.36 MMWEBID/978 MicroMessenger/7.0.19.1760(0x27001335) Process/tools WeChat/arm64 NetType/WIFI Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Linux; Android 9.1.1; Micromax Q326 Build/LMY47D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045329 Mobile Safari/537.36 MMWEBID/5213 MicroMessenger/7.0.18.1740(0x2700126E) Process/tools WeChat/arm64 NetType/WIFI Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Linux; Android 10; SM-G970U1 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045331 Mobile Safari/537.36 MMWEBID/2716 MicroMessenger/7.0.19.1760(0x27001336) Process/tools WeChat/arm64 NetType/WIFI Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Linux; Android 8.1.0; CPH1803 Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2469 MMWEBSDK/200502 Mobile Safari/537.36 MMWEBID/1237 MicroMessenger/7.0.15.1680(0x27000F51) Process/tools WeChat/arm64 NetType/4G Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Linux; Android 8.0.0; LGM-V300S Build/OPR1.170623.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045329 Mobile Safari/537.36 MMWEBID/6309 MicroMessenger/7.0.18.1740(0x2700129C) Process/tools WeChat/arm64 NetType/4G Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Linux; Android 8.1.0; Redmi Y2 Build/OPM1.171019.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36 MMWEBID/3679 MicroMessenger/7.0.18.1740(0x27001238) Process/tools WeChat/arm32 NetType/WIFI Language/zh_CN ABI/arm32",
	"Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.17(0x17001124) NetType/4G Language/zh_CN",
	"Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.17(0x17001124) NetType/WIFI Language/zh_CN",
	"Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.15(0x17000f31) NetType/4G Language/zh_TW",
	"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.17(0x17001124) NetType/WIFI Language/zh_CN",
	"Mozilla/5.0 (Linux; Android 8.1.0; MI 5X Build/OPM1.171019.019; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2691 MMWEBSDK/200801 Mobile Safari/537.36 MMWEBID/9633 MicroMessenger/7.0.18.1740(0x2700123B) Process/toolsmp WeChat/arm64 NetType/4G Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.14(0x17000e2e) NetType/WIFI Language/zh_CN",
	"Mozilla/5.0 (Linux; Android 8.1.0; DUA-TL00 Build/HONORDUA-TL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2690 MMWEBSDK/200502 Mobile Safari/537.36 MMWEBID/2494 MicroMessenger/7.0.15.1680(0x27000F50) Process/toolsmp WeChat/arm32 NetType/WIFI Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Linux; Android 9; DUK-AL20 Build/HUAWEIDUK-AL20; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2691 MMWEBSDK/200901 Mobile Safari/537.36 MMWEBID/2591 MicroMessenger/7.0.19.1760(0x2700133F) Process/toolsmp WeChat/arm64 NetType/WIFI Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Linux; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2691 MMWEBSDK/200901 Mobile Safari/537.36 MMWEBID/8872 MicroMessenger/7.0.19.1760(0x2700133F) Process/toolsmp WeChat/arm64 NetType/WIFI Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Linux; Android 9; PAR-AL00 Build/HUAWEIPAR-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2691 MMWEBSDK/200901 Mobile Safari/537.36 MMWEBID/6007 MicroMessenger/7.0.19.1760(0x2700133F) Process/toolsmp WeChat/arm64 NetType/WIFI Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Linux; Android 9; vivo X21A Build/PKQ1.180819.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2691 MMWEBSDK/200901 Mobile Safari/537.36 MMWEBID/6397 MicroMessenger/7.0.19.1760(0x2700133F) Process/toolsmp WeChat/arm64 NetType/4G Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Linux; Android 10; WLZ-AN00 Build/HUAWEIWLZ-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2691 MMWEBSDK/200901 Mobile Safari/537.36 MMWEBID/4902 MicroMessenger/7.0.19.1760(0x2700133F) Process/toolsmp WeChat/arm64 NetType/WIFI Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Linux; Android 10; ELE-AL00 Build/HUAWEIELE-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2691 MMWEBSDK/200901 Mobile Safari/537.36 MMWEBID/215 MicroMessenger/7.0.19.1760(0x2700133F) Process/toolsmp WeChat/arm64 NetType/WIFI Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.17(0x17001124) NetType/WIFI Language/zh_CN",
	"Mozilla/5.0 (Linux; Android 8.0.0; BLA-AL00 Build/HUAWEIBLA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2690 MMWEBSDK/200401 Mobile Safari/537.36 MMWEBID/3762 MicroMessenger/7.0.14.1660(0x27000EC6) Process/toolsmp NetType/WIFI Language/zh_CN ABI/arm64 WeChat/arm32",
	"Mozilla/5.0 (Linux; Android 9; PBEM00 Build/PKQ1.190519.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2691 MMWEBSDK/200901 Mobile Safari/537.36 MMWEBID/4773 MicroMessenger/7.0.19.1760(0x27001335) Process/toolsmp WeChat/arm64 NetType/4G Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.17(0x17001126) NetType/WIFI Language/zh_CN",
	"Mozilla/5.0 (Linux; Android 10; JEF-AN00 Build/HUAWEIJEF-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2691 MMWEBSDK/200901 Mobile Safari/537.36 MMWEBID/8362 MicroMessenger/7.0.19.1760(0x2700133F) Process/toolsmp WeChat/arm64 NetType/WIFI Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Linux; Android 10; CDY-AN90 Build/HUAWEICDY-AN90; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2691 MMWEBSDK/200801 Mobile Safari/537.36 MMWEBID/4006 MicroMessenger/7.0.18.1740(0x2700123B) Process/toolsmp WeChat/arm64 NetType/4G Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Linux; Android 10; YAL-AL10 Build/HUAWEIYAL-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/107.0.5304.141 Mobile Safari/537.36 XWEB/5015 MMWEBSDK/20230202 MMWEBID/916 MicroMessenger/8.0.33.2320(0x2800213D) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64",
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309001c) XWEB/6609",
	"Mozilla/5.0 (iPhone; CPU iPhone OS 12_5_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.26(0x18001a34) NetType/WIFI Language/zh_CN",
	"Mozilla/5.0 (iPhone; CPU iPhone OS 16_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.33(0x18002125) NetType/WIFI Language/zh_CN",

]
/**
 * 生成随机数字
 * @param {number} min 最小值（包含）
 * @param {number} max 最大值（不包含）
 */
function randomNumber(min = 0, max = 80) {
  return Math.min(Math.floor(min + Math.random() * (max - min)), max);
}
const USER_AGENT = USER_AGENTS[randomNumber(0, USER_AGENTS.length)];

function UARAM (){
  return USER_AGENTS[randomNumber(0, USER_AGENTS.length)];
}

module.exports = {
  USER_AGENT,
  UARAM
}
