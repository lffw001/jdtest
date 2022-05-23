/*
京东极速App首页-百元生活费-发财挖宝
13 7,8 * * * Sami_jd_fcwb.js
 */
const $ = new Env('Sami发财挖宝');
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
const JD_API_HOST = `https://api.m.jd.com`;
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],cookie = '';

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    await $.wait(1000);
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        if (cookie) {
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            $.datajson=[];
            $.vo2=[];
            $.blood=0;
            $.wbsl=0;
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                continue
            }
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            //做任务
            await PlayToPlay();
            await $.wait(2000);
            await GetAllTreasure("1");//发财挖宝-获取所有宝藏-入门级
            await $.wait(2000);
            $.blood=$.datajson.data.blood;
            //console.log("发财挖宝:"+$.blood);
            console.log("发财挖宝-初级-总共生命值:"+$.blood);
            //console.log($.datajson.data.roundList[0].chunks);
            $.vo2=$.datajson.data.roundList[0]
            for (let vo of  $.vo2.chunks) {
                $.wbsl=$.wbsl+1
                if ($.blood>=1){
                    let rowIdx= vo.rowIdx;
                    let colIdx= vo.colIdx;
                    let type= vo.type;
                    let value=vo.value;
                    
                    //console.log(rowIdx);
                    //console.log(colIdx);
                    //console.log(type);
                    //开始挖宝
                    if(type===null){
                        await DigTreasure(rowIdx,colIdx,"1");
                        await $.wait(2000);
                    }else if(type===2){
                       $.log(`发财挖宝-挖宝中:已挖到`+value+'元');
                       await $.wait(1000);
                    }else{
                        $.log(`发财挖宝-挖宝中:已挖到地雷`);
                        await $.wait(1000);
                    }
                }else{
                    $.log(`发财挖宝:已经无生命,退出挖宝中`);
                    //领取初级奖励代码
                    await GetCash("1");
                    break;
                }
                
            }
            if ($.wbs=16){
                $.log(`发财挖宝:初级挖宝已经结束，奖励已经发放`);
            }
            
            ///////////////////////////中级挖宝/////////////////////////////////////////
            
             $.wbsl=0;
            await GetAllTreasure("2");//发财挖宝-获取所有宝藏-入门级
            await $.wait(2000);
            $.blood=$.datajson.data.blood;
            console.log("发财挖宝-中级-总共生命值:"+$.blood);
            //console.log($.datajson.data.roundList[0].chunks);
            if ($.blood>1){
                $.vo2=$.datajson.data.roundList[1]
                for (let vo of  $.vo2.chunks) {
                    $.wbsl=$.wbsl+1
                    if ($.blood>1){
                        let rowIdx= vo.rowIdx;
                        let colIdx= vo.colIdx;
                        let type= vo.type;
                        let value=vo.value;
                        
                        //console.log(rowIdx);
                        //console.log(colIdx);
                        //console.log(type);
                        //开始挖宝
                        if(type===null){
                            await DigTreasure(rowIdx,colIdx,"2");
                            await $.wait(2000);
                        }else if(type===2){
                           $.log(`发财挖宝-挖宝中:已挖到`+value+'元');
                           await $.wait(1000);
                        }else{
                            $.log(`发财挖宝-挖宝中:已挖到地雷`);
                            await $.wait(1000);
                        }
                    }else{
                        $.log(`发财挖宝:已经无生命,退出挖宝中`);
                        //领取中级级奖励代码
                        await GetCash("2");
                        break;
                    }
                    
                }
            }
            
            
             ///////////////////////////高级挖宝/////////////////////////////////////////
             
            $.wbsl=0;
            await GetAllTreasure("3");//发财挖宝-获取所有宝藏-入门级
            await $.wait(2000);
            $.blood=$.datajson.data.blood;
            console.log("发财挖宝-高级-总共生命值:"+$.blood);
            //console.log($.datajson.data.roundList[0].chunks);
            if($.blood>1){
                $.vo2=$.datajson.data.roundList[2]
                for (let vo of  $.vo2.chunks) {
                $.wbsl=$.wbsl+1
                if ($.blood>1){
                    let rowIdx= vo.rowIdx;
                    let colIdx= vo.colIdx;
                    let type= vo.type;
                    let value=vo.value;
                    
                    //console.log(rowIdx);
                    //console.log(colIdx);
                    //console.log(type);
                    //开始挖宝
                    if(type===null){
                        await DigTreasure(rowIdx,colIdx,"3");
                        await $.wait(2000);
                    }else if(type===2){
                       $.log(`发财挖宝-挖宝中:已挖到`+value+'元');
                       await $.wait(1000);
                    }else{
                        $.log(`发财挖宝-挖宝中:已挖到地雷`);
                        await $.wait(1000);
                    }
                }else{
                    $.log(`发财挖宝:已经无生命,退出挖宝中`);
                    //领取高级奖励代码
                    await GetCash("3");
                    break;
                }
                
            }
            }
            
            
            
            
            if (i != cookiesArr.length - 1) {
                await $.wait(2000);
            }
        }
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


//发财挖宝-玩一玩
function PlayToPlay() {
    return new Promise(async resolve => {
        const options = {
            url: `https://api.m.jd.com/?functionId=apDoTask&body=%7B%22linkId%22%3A%22pTTvJeSTrpthgk9ASBVGsw%22%2C%22taskType%22%3A%22BROWSE_CHANNEL%22%2C%22taskId%22%3A454%2C%22channel%22%3A4%2C%22itemId%22%3A%22https%253A%252F%252Fsignfree.jd.com%252F%253FactivityId%253DPiuLvM8vamONsWzC0wqBGQ%22%2C%22checkVersion%22%3Afalse%7D&t=1644332268371&appid=activities_platform&client=H5&clientVersion=1.0.0`,
            body: ``,
            headers: {
                "authority": "api.m.jd.com",
                "referer": "https://bnzf.jd.com/",
                "Cookie": cookie,
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
            }
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if(data.success===true){
                            $.log(`发财挖宝-玩一玩: 获取1个生命值` );
                        }else{
                            $.log(`发财挖宝-玩一玩: `+data.errMsg );
                        }
                            
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

//发财挖宝-获取所有宝藏-入门级
function GetAllTreasure(id) {
    return new Promise(async resolve => {
        const options = {
            url: `https://api.m.jd.com/?functionId=happyDigHome&body=%7B%22linkId%22%3A%22pTTvJeSTrpthgk9ASBVGsw%22%2C%22round%22%3A${id}%7D&t=1644331748791&appid=activities_platform&client=H5&clientVersion=1.0.0&h5st=20220208224908795%3B2918935047297836%3Bce6c2%3Btk02wbd9a1cce18nJxGyIPqJckK6SWtFDsh83nk1DrtKLTJQSzPycvXltf7a4HhUn%2B3OslJc6KvkA3Bw4r4RqzAvqomB%3B5e6d2ea3fbd579215f44233badf7e2afbdc8264cc0544b426f69b1441c1f3a0e%3B3.0%3B1644331748795`,
            headers: {
                "authority": "api.m.jd.com",
                "referer": "https://bnzf.jd.com/",
                "Cookie": cookie,
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        $.datajson=data;

                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

//发财挖宝-挖宝-入门级
function DigTreasure(rowIdx,colIdx,round) {
    return new Promise(async resolve => {
        const options = {
            url: `https://api.m.jd.com/?functionId=happyDigDo&body=%7B%22round%22%3A${round}%2C%22rowIdx%22%3A${rowIdx}%2C%22colIdx%22%3A${colIdx}%2C%22linkId%22%3A%22pTTvJeSTrpthgk9ASBVGsw%22%7D&t=1644331747469&appid=activities_platform&client=H5&clientVersion=1.0.0`,
            headers: {
                "authority": "api.m.jd.com",
                "referer": "https://bnzf.jd.com/",
                "Cookie": cookie,
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if(data.data.chunk.type===4){
                            $.blood=$.blood-1;
                            $.log(`发财挖宝-挖宝中:挖到1颗雷,生命值剩余:`+$.blood );
                        }else{
                            
                            $.log(`发财挖宝-挖宝中:挖到 `+data.data.chunk.value+ `元,生命值剩余:`+$.blood);
                        }

                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}


//发财挖宝-获取所有宝藏-领现金
function GetCash(id) {
    return new Promise(async resolve => {
        const options = {
            url: `https://api.m.jd.com/?functionId=happyDigExchange&body=%7B%22round%22%3A${id}%2C%22linkId%22%3A%22pTTvJeSTrpthgk9ASBVGsw%22%7D&t=1644554220608&appid=activities_platform&client=H5&clientVersion=1.0.0`,
            headers: {
                "authority": "api.m.jd.com",
                "referer": "https://bnzf.jd.com/",
                "Cookie": cookie,
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        
                        if(id==="1"){
                            $.log(`发财挖宝-初级奖励:`+data.data.redValue+"元");
                        }else if (id==="2"){
                            $.log(`发财挖宝-中级奖励:`+data.data.redValue+"元");
                        }else if (id==="3"){
                            $.log(`发财挖宝-高级奖励:`+data.data.redValue+"元");
                        }
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
