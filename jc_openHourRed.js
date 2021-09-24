/*
Author: Curtin
Date: 2021.7.4 22:25
中青分享阅读助力10次

使用方法：
Quantumuil X：添加远程重写
[rewrite_remote]
https://gitee.com/curtinlv/qx/raw/master/rewrite/youth.conf, tag=中青 by Curtin, update-interval=172800, opt-parser=false, enabled=true

中青分享一篇文章到自己的微信上，自己点击一下即触发会自动完成10好有阅读奖励 500青豆/次。
重写 https://kd.youth.cn/WebApi/invite/openHourRed  https://raw.githubusercontent.com/liu269569205/jstest/master/zq_openHourRed.js
 */
const $ = new Env("中青定时宝箱");
  function uuid2() {
                    var s = [];
                    var hexDigits = "0123456789abcdef";
                    for (var i = 0; i < 32; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                    }
                    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
                    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
                    s[8] = s[13] = s[18] = s[23];
                    var uuid = s.join("");
                    return uuid;
                }
//let request = ""
let openHourRed = $.isNode() ? (process.env.zq_cookie ? process.env.zq_cookie : "") : ($.getdata('zq_cookie') ? $.getdata('zq_cookie') : "")
//openHourRed="zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl7B1z2Kw3ZuzhHyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdebOFspyYr7nMapqGcXY&zqkey_id=9666437e3f9bdce35a6de0ecc7ffb68a&uid=58943830"
var urls=openHourRed.split('@')
!(async () => {
	 if (typeof $request !== "undefined") {
     await getopenboxbody()
     $.done()
 }else{
	for(var k=0;k<urls.length;k++){
	$url=urls[k]
	bodyVal = urls[k].split('&uid=')[0];
                var time1 = Date.parse( new Date() ).toString();
                time1 = time1.substr(0,10);
				var uuid=uuid2();
				var uuid1=uuid2();
                cookie = bodyVal.replace(/zqkey=/, "cookie=")
                cookie_id = cookie.replace(/zqkey_id=/, "cookie_id=")
					console.log(cookie_id)

					var device_id=54565505+parseInt(Math.random()*10000)
                $url= cookie_id  +'&access=WIFI&app-version=3.5.5&app_version=3.5.5&carrier=%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8&channel=c1002&device_brand=Xiaomi&device_id='+device_id+'&device_model=Mi%2B10%2BPro&device_platform=android&device_type=android&inner_version=202108181034&mi=1&os_api=30&os_version=RKQ1.200826.002%2Btest-keys&phone_network=WIFI&phone_sim=1&resolution=1080x2206&sim=1&sm_device_id=20210727214538d085a089f67431e3'+uuid1+'&subv=1.2.2&uid=58041470&uuid='+uuid+'&version_code=63&version_name=%E4%B8%AD%E9%9D%92%E7%9C%8B%E7%82%B9'+'&request_time=' + time1 +'&time=' + time1 +'&'+ bodyVal
				console.log($url)
	if ($url){ 
		console.log(`--------第 ${k + 1} 个账号开宝箱奖励执行中--------\n`)
	await postShareInfoa("https://kd.youth.cn/WebApi/invite/openHourRed",$url)
	}
	else
	{
		$.msg("中青url获取失败", "", "️中青url获取失败");
	}
	}
}

})()
String.prototype.getQueryString = function(name)//name 是URL的参数名字
{
var reg = new RegExp("(^|&|\\?)"+ name +"=([^&]*)(&|$)"), r;
if (r=this.match(reg)) return unescape(r[2]); return null;
}; 
async function getopenboxbody() {
if ($request.url.match(/kd.youth.cn\/WebApi\/invite\/openHourRed/)) {
          bodyVal=$request.body
			  zqkey_id=$request.body.getQueryString('zqkey_id')
          await $.wait(1100);
        if (openHourRed) {
            if (openHourRed.indexOf(zqkey_id) > -1) {
                $.log("此看开宝箱请求已存在，本次跳过")
            } else if (openHourRed.indexOf(zqkey_id) == -1) {
                openHourRed = openHourRed + "@" + bodyVal;
                $.setdata(openHourRed, 'zq_openHourRed');
                $.log(`${$.name}获取定时宝箱: 成功, openHourRed: ${bodyVal}`);
                bodys = openHourRed.split("@")
                $.msg($.name, "获取第" + bodys.length + "个定时宝箱任务请求: 成功🎉", ``)
            }
        } else {
            $.setdata(bodyVal, 'zq_openHourRed');
            $.log(`${$.name}获取看看赚任务: 成功, openHourRed: ${bodyVal}`);
            $.msg($.name, `获取第一个个定时宝箱任务请求请求: 成功🎉`, ``)
        }
    }

  }

async function postShareInfoa(o_url,body) {
	var time1 = Date.parse( new Date() ).toString();
                time1 = time1.substr(0,10);
    return new Promise((resolve) => {
        setTimeout(() => {
        var desclist = ["㊙️这是秘密分享~", "😁不能外传哦~", "☺️猜猜我是谁~","😆别点击太猛，容易feng","适当分享哈哈哈~","🈶广告位招租~","🔍开天眼查会员找木白姐姐~","🎈TG https://t.me/topstyle996","☎️TG频道 https://t.me/TopStyle2021","😆差不多得了，要黑号了~"];
        var n_si = randomsi();
        var iosV = parseInt(Math.random() * (14 - 11 + 1) + 11, 10);
        //var n_url = o_url.replace(o_si, n_si);
        var header = {
            'Accept-Encoding': `gzip, deflate, br`,
            'Accept': `*/*`,
            'Connection': `keep-alive`,
            'Referer': `https://kd.youth.cn/h5/20190410invitefriend/?`+body+'&request_time=' + time1+'&time=' + time1,
            'Host': `kd.youth.cn`,
				'Origin':'https://kd.youth.cn',
            'User-Agent': `Mozilla/5.0 (Linux; Android 11; Mi 10 Pro Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.210 Mobile Safari/537.36`,
            'Accept-Language': `zh-cn`,
        };

        let url = {
                url: o_url,
                headers: header,
				body : body
            };
				console.log("sss")
        $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                console.log(result.msg)
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        });

        return 0;
        }, 1000)
    })
}

//随机udid 小写
function randomsi() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + S4() + S4() + S4() +  S4() + S4() + S4());
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
