/*
杭州
 */
const $ = new Env('杭州');
// index.js
const fs = require('fs');
const CryptoJS=require('crypto-js');

let cookies=[
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiODU0NCIsInN0dWRlbnRfaWQiOiI4NTQ0IiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZGVVdqT01tNDFXV0F3TUcza3JiMUk4IiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTcyNDksIm5iZiI6MTcwMDQxMDg0OX0.uLqFroooAHl84vbitQgGBPW3Kr3vzvi1SljYnXJW2QiWG7i1HD0HVCytBfx-s-1WPKKcKkm0ta7TqjkeM0Pofg@leebear',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiMzUzMjEiLCJzdHVkZW50X2lkIjoiMzUzMjEiLCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwid3hfb3Blbl9pZCI6Im8xOVExNlBvX0tZM05WWFBfRkZXVWNVbmttNHciLCJjbGllbnRfaWQiOiJzYWJlciIsImV4cCI6MTcwMDQ5NDY2MywibmJmIjoxNzAwNDA4MjYzfQ.v4AQpqY9KO__yxafvxc0Oz5rdjP6FXDsLtdhdiKTr8wncUHhnaI07aeRFM5UinzVSGjzvEPnreBN8ALogNy-4Q@天天快乐',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTQ4NyIsInN0dWRlbnRfaWQiOiI5NDg3IiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZLOS15X0c3XzZ5VHF6Wnp4UFZ4NTJVIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTczMTYsIm5iZiI6MTcwMDQxMDkxNn0.2P8jQwi3BUE1snzZfWrvi3ckW6bfH3TCS5nv8-zzojh4r_FNOojsblhbYcZZnoynF9fCb2v4IHvkEITDbInJlQ@朱张杰',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTQ5OSIsInN0dWRlbnRfaWQiOiI5NDk5IiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZBSGV3VVFsOVl2eGRTaHFyLS1pMnNBIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTczODAsIm5iZiI6MTcwMDQxMDk4MH0.zZ2Wnk4UW31XSSRptnIYFWW-FfQXSaRWnkS17rSv5QT3pbWE76deG0XQJt0gvXowS8QcEdo__iWhsCLOYa6F-w@小白',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTUxMSIsInN0dWRlbnRfaWQiOiI5NTExIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZEclJseWI0cEQydk5idHhrQnIxcEJzIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTc0NDksIm5iZiI6MTcwMDQxMTA0OX0.ccfvR0s24G8C-5qaFQYYlC1AU9R-iptSE9FSOTij6bBB_51Kci9xU6SsMFC4UREs7Y1-VPLdhnKZand7hmZxjA@晨光',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTQ3MCIsInN0dWRlbnRfaWQiOiI5NDcwIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZGbTBMMi1zWThFeGhILXhPY0ltaHJnIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTc1MzYsIm5iZiI6MTcwMDQxMTEzNn0.lBOB7zqAX_7x_iwu2umDGXJ1-IZCMBVqS-DybC2cOZWWmP9vwltiey-X2R6un-H7A9P-lq3HXWY2pas8B2ZYew@bona',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTUyMiIsInN0dWRlbnRfaWQiOiI5NTIyIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZLQWpJdHpXWUMtQU8tdXI0UHgtRkdzIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTc2MDksIm5iZiI6MTcwMDQxMTIwOX0.sPNERPJKn5HQS-IAs75LiG9KBflBUgf59uz6wUEDaDZKOooWC9oF0DobMk_q5JGh7ebVR5V8-_Uz8mOZ22YYFA@不见不散',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTU0MCIsInN0dWRlbnRfaWQiOiI5NTQwIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZQYldQckZZWEtsVE1LaDZ4QW9fSUhRIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTc2ODYsIm5iZiI6MTcwMDQxMTI4Nn0.S-IeniIl8cNKdgkiFFYlisfLfxGrKRSzktCUf5lGHwyqqczD7gye9Q6yf8KHcOflIxQsVe6cxilpL-Z4vHxGxw@002',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTU1MCIsInN0dWRlbnRfaWQiOiI5NTUwIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZBdE15YktIdHNyWlI0Y1dMYUkxaDZ3IiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTc3NTUsIm5iZiI6MTcwMDQxMTM1NX0.8O8xMhuTMZj7xcfe1emCj1u6QknuOoH6_2kKl-nfni73CJNQeE-x6W8FnudCLwilT_wqBCxCCiC1gKe0jah1cQ@黄山人家',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTU4MiIsInN0dWRlbnRfaWQiOiI5NTgyIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZOSk1rRXJ0SWdaUnQ2TFZEdU1ueS1BIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTc4MjMsIm5iZiI6MTcwMDQxMTQyM30.UC_Ln7axXXChztIbn7t0k2ZIW-JbfynWWj-_TBxx9IRx-GKqkkwQIUf8y1RYMydWAstcRGmVIuTjdZiAhmeNug@l',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTU5NiIsInN0dWRlbnRfaWQiOiI5NTk2IiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZORWNuaUJVTEZ6M1dQaV9zczlfdFM4IiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTc5MTIsIm5iZiI6MTcwMDQxMTUxMn0.hD6wU6sbX-VFYosMwTNQjU8MNs-YWyI6nlFx6MG6vp0WAqKruj99nbTUWzC5GoVvn7rwEyX2daj6S8xB-y5Rwg@明涛',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTYwOSIsInN0dWRlbnRfaWQiOiI5NjA5IiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZFYllEZF9RcmFJd1RDMG15eWpvMlAwIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTc5ODYsIm5iZiI6MTcwMDQxMTU4Nn0.wseeEePESqnr-P2x197H9USPRFj1pjk_TJWmhbbeXbXMpB3RHiBfT8xd9Lw37zrS9EL_heOUYCfDLWRzzUbKQA@无所',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTQyNCIsInN0dWRlbnRfaWQiOiI5NDI0IiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZJeEh0YmtWcDRqVkZDdV9wU1RaSmw4IiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTgwNjUsIm5iZiI6MTcwMDQxMTY2NX0.t5YbGKVkqxC5ilX5f96oEdWU6l7JDlO9nvGWsMGEecnuZpJ-N3DxieVPAWIIyELEGC5d5LcFfLQ3xW_Okrjr_g@慢慢',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTQxMSIsInN0dWRlbnRfaWQiOiI5NDExIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZPd0hsbWlDNXk3emVMRHJWZkFEbl8wIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTgxNjQsIm5iZiI6MTcwMDQxMTc2NH0.wmGyVdkT-JaGs2b-q0VWoeU4FQ6Eviq18nXUo5KxZMyC7Aezz8LcOweIo-JAtLo6-BwueMgl_WwtV5EHHgCw6A@满天星光',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTM4OSIsInN0dWRlbnRfaWQiOiI5Mzg5IiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZFalFKdE9yYlVpY3dHb2NTTjI0OWd3IiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTgyMjksIm5iZiI6MTcwMDQxMTgyOX0.lmlt3AHwqvloE38e4dmc0X0Rm7VTVOsq6PbxHAAzElVPyY2uIIdPdNzEW4LTdM2-kA6xbLEF5fg8J_L_PPkUZA@小布布',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTQ1MyIsInN0dWRlbnRfaWQiOiI5NDUzIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZDaUdpZW44ZmFzRmxrWHh3NzNQVTljIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTgzMDUsIm5iZiI6MTcwMDQxMTkwNX0.cCakaBjCv5DMPk1RAU1rH2FaVsND-7V1lWJTCZ2OrUlpF1E9tc8ITUn-NIC9U1zDn0XEEiZmzO9MhvAQqdVKzQ@岸上草原',
	'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX2lkIjoiOTQzNSIsInN0dWRlbnRfaWQiOiI5NDM1IiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsInd4X29wZW5faWQiOiJvMTlRMTZGM1ZaQzlrZHFQNjJaZHIwczBKeWNrIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE3MDA0OTgzODYsIm5iZiI6MTcwMDQxMTk4Nn0.y0nm75W52Ye1_qqv9feOBUVmIDlCvqkr8zfrsdWQZZgOVfY_OJ6uq24W48DjTJdbgYpeqc6xyJe-CD_PKU3Bjw@梦想上岸'


]
let gameInfoList=[];

let rankList=[]; 

let examId=1;

class User{
	//构造函数 只允许一个构造器
    constructor(cookie) {
        this.cookie=cookie.split("@")[0];
		this.nikName=cookie.split("@")[1];
		this.examQuestions=[];
		this.examScore="";
    }
	async run(){
		console.log(this.nikName+"----开始进行答题")
		await this.detailExame();
		
		if(this.examQuestions.length>0){
			let time=18000+Math.floor(Math.random()*5000);
			console.log(this.nikName+"----等待"+time+"ms,开始答题")
			await $.wait(time);
			//答题开始
			await this.examSubmit();
		}else{
			//已完成答题
			console.log(this.nikName+"----已完成答题，分数："+this.examScore);
		}
		
		
	}
	detailExame(){
		let that=this;
		let body='';
		const myRequest = this.getHangZhouGetRequest("https://exam.jinkworld.com/api/studentexam/studentexam/examDetail?examId="+examId, body);
		//console.log(myRequest)
		return new Promise(resolve => {
			$.get(myRequest, (err, resp, data) => {
			  try {
				data = JSON.parse(data);
				//console.log(data)
				if(data.data.examQuestions!=null&&data.data.examQuestions.length>0){
					that.examQuestions=data.data.examQuestions;
				}else{
					that.examScore=data.data.examScore;
				}
			  } catch (e) {
				$.logErr(e, resp)
			  } finally {
				resolve(data);
			  }
			})
		})
	}
	examSubmit(){ 
		let that=this;
		let examQuestionAnswers=[];
		for(var i=0;i<that.examQuestions.length;i++){
			let obj={
				questionId:that.examQuestions[i].id,
				answer:that.examQuestions[i].rightAnswer
			}
			examQuestionAnswers.push(obj);
		}
		let body={
			examId: examId,
			examQuestionAnswers: examQuestionAnswers
		};
		const myRequest = this.getHangZhouPostRequest("https://exam.jinkworld.com/api/studentexam/studentexam/examSubmit", JSON.stringify(body));
		//console.log(myRequest)
		return new Promise(resolve => {
			$.post(myRequest, (err, resp, data) => {
			  try {
				console.log(data);
				data = JSON.parse(data);
				
				
			  } catch (e) {
				$.logErr(e, resp)
			  } finally {
				resolve();
			  }
			})
		})
	}
	getHangZhouPostRequest(url, body) {
	  let that=this; 
	  const method = `POST`;
	  const headers = {
		'Host': `exam.jinkworld.com`,
		'Accept': '*/*',
		'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
		'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
		'Accept-Encoding': 'gzip, deflate, br',
		'Content-Type': 'application/json',
		'Origin': 'https://resource.jinkworld.com',
		'Blade-Auth': that.cookie,
		'Connection': 'keep-alive',
		'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.42(0x18002a32) NetType/WIFI Language/zh_CN',
		'Referer': 'https://resource.jinkworld.com/',
	  };
	  return {url: url, method: method, headers: headers, body: body};
	}
	getHangZhouGetRequest(action, body = {}) {
	 let that=this;
	  return {
		url: action,
		headers: {
		  'Host': 'exam.jinkworld.com',
		  'Connection': 'keep-alive',
		  'Blade-Auth': that.cookie,
		  'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
		  'User-Agent': 'Mozilla/5.0 (Linux; Android 10; COL-AL10 Build/HUAWEICOL-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/1110005 MMWEBSDK/20231002 MMWEBID/2566 MicroMessenger/8.0.43.2480(0x28002B37) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
		  'Accept': '*/*',
		  'Origin': 'https://resource.jinkworld.com',
		  'X-Requested-With': 'com.tencent.mm',
		  'Sec-Fetch-Site': 'same-site',
		  'Sec-Fetch-Mode': 'cors',
		  'Sec-Fetch-Dest': 'empty',
		  'Referer': 'https://resource.jinkworld.com/',
		  'Accept-Encoding': 'gzip, deflate',
		  'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',

		}
	  }
	}
}



function sleep(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};
function blockcurSc(score,key) {
	//console.log(score);
	var  x = CryptoJS.enc.Utf8.parse(key),//key
	s=CryptoJS.enc.Utf8.parse("cdlchd0123456789"),
	a = CryptoJS.enc.Utf8.parse(score+""),
	ss = CryptoJS.AES.encrypt(a, x, {
		iv: s,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	})
	//console.log(ss.ciphertext.toString());
	return ss.ciphertext.toString();
}
function getPostRequest(url, body) {
	  let that=this; 
	  const method = `POST`;
	  const headers = {
		'Accept-Encoding': `gzip, deflate, br`,
		'Accept': 'application/json, text/plain, */*',
		'Host': `wx.cdh5.cn`,
		'Origin': `https://wx.cdh5.cn`,
		'Connection': `keep-alive`,

		'Accept-Language': `zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7`,
		'Content-Type': `application/x-www-form-urlencoded`,
		"User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "Mozilla/5.0 (iPhone; CPU iPhone OS 16_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.33(0x18002129) NetType/WIFI Language/zh_CN"),
		'Referer': `https://wx.cdh5.cn/2384_4549575a/index.php?code=021g8UFa1Jyv3G0vLOIa1R6Hgk2g8UFe&state=1&appid=wx558d689c232afcb1`,
		'Cookie': $.cookie
	  };
	  return {url: url, method: method, headers: headers, body: body};
	}
	
function yyyymmdd() {
	var t = new Date,
	e = t.getFullYear().toString(),
	i = (t.getMonth() + 1).toString(),
	o = t.getDate().toString();
	return e + (i[1] ? i: "0" + i[0]) + (o[1] ? o: "0" + o[0])
}
function getMonthDays() {
	var t = new Date,
	e = t.getFullYear(),
	i = t.getMonth() + 1;
	return new Date(e, i, 0).getDate()
}
function getNowFormatDate(str) {
	if(str==null){
		str="";
	}
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
	var hours=date.getHours();
	var minutes=date.getMinutes();
	var seconds=date.getSeconds();
	if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
    }
	if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
	if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
	
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hours + seperator2 + minutes
            + seperator2 + seconds+"."+date.getMilliseconds();
    return currentdate+str;
}
function taskurl(url) {
	return {
		'url': url,
		'headers': {
			'Host': 'guangdong-tobacco.ycwemedia.com',
			'Accept-Encoding': 'gzip, deflate, br',
			'Cookie': cookie,
			'Connection': 'keep-alive',
			'Accept': '*/*',
			'UserAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
			'Accept-Language': 'zh-cn',
			'Referer': 'https://guangdong-tobacco.ycwemedia.com/guangdong/activity/watermelon/h5/rank.html'
		},
	}
}





//---------------------------------------------

!(async () => {
	if($.isNode()&&process.env.JD_MY){
		for(var i=0;i<cookies.length;i++){
			var user=new User(cookies[i]);
			user.run();
		}

	}

})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })
  
//---------------------------------------------




// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
