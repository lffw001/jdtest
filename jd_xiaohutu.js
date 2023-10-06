/*
小糊涂
 */
const $ = new Env('小糊涂');
// index.js
const fs = require('fs');
const CryptoJS=require('crypto-js');

var __encode ='jsjiami.com',_a={}, _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(_a);var __Ox107440=["\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x64\x31\x36\x64\x63\x30\x32\x31\x38\x65\x32\x32\x65\x39\x63\x31\x38\x30\x39\x65\x66\x39\x33\x61\x36\x63\x33\x32\x66\x35\x61\x38\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x37\x33\x34\x39\x63\x62\x39\x62\x33\x32\x65\x30\x32\x38\x65\x30\x63\x30\x34\x35\x62\x66\x65\x62\x35\x35\x34\x63\x33\x38\x39\x38","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x36\x34\x38\x35\x32\x63\x36\x34\x61\x33\x61\x37\x63\x65\x63\x35\x66\x31\x30\x65\x62\x38\x62\x36\x31\x38\x34\x31\x38\x62\x31\x62\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x65\x36\x61\x66\x62\x33\x39\x30\x61\x30\x34\x66\x66\x34\x39\x36\x66\x38\x39\x35\x39\x34\x31\x64\x36\x62\x34\x64\x37\x66\x36\x61","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x37\x65\x62\x66\x62\x61\x62\x62\x37\x63\x62\x34\x35\x30\x65\x33\x34\x61\x34\x39\x64\x37\x65\x61\x64\x30\x33\x36\x65\x62\x64\x31\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x33\x35\x66\x30\x39\x36\x37\x39\x61\x30\x66\x35\x66\x34\x33\x63\x35\x61\x62\x64\x37\x34\x62\x38\x34\x33\x63\x32\x37\x36\x31\x66","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x36\x31\x38\x38\x37\x31\x30\x65\x33\x37\x37\x39\x63\x62\x62\x36\x64\x39\x64\x36\x63\x31\x31\x64\x64\x36\x31\x33\x35\x65\x30\x62\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x62\x32\x63\x32\x37\x30\x61\x63\x32\x32\x31\x30\x35\x30\x61\x66\x32\x38\x66\x32\x63\x62\x64\x63\x39\x34\x32\x30\x36\x31\x63\x30","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x35\x61\x30\x65\x30\x38\x35\x30\x39\x61\x36\x38\x63\x61\x65\x66\x62\x32\x31\x63\x64\x36\x32\x64\x64\x62\x62\x32\x36\x63\x66\x36\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x31\x66\x32\x62\x35\x64\x32\x65\x66\x65\x36\x63\x61\x37\x61\x37\x34\x35\x35\x36\x35\x36\x39\x31\x36\x64\x37\x34\x62\x31\x39\x33","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x31\x61\x33\x31\x34\x31\x35\x32\x37\x61\x32\x65\x64\x38\x30\x64\x36\x36\x64\x33\x62\x33\x32\x33\x38\x30\x66\x35\x39\x38\x66\x61\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x62\x30\x65\x39\x36\x32\x39\x31\x39\x39\x32\x30\x62\x64\x37\x64\x31\x39\x34\x63\x33\x39\x63\x66\x38\x63\x65\x64\x33\x31\x36\x39","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x66\x61\x33\x62\x34\x65\x66\x32\x64\x62\x65\x66\x62\x62\x62\x63\x30\x31\x36\x62\x65\x32\x61\x36\x35\x62\x39\x31\x61\x62\x62\x38\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x38\x37\x61\x62\x62\x30\x33\x36\x34\x34\x62\x38\x62\x64\x63\x35\x32\x31\x31\x66\x33\x63\x37\x30\x65\x65\x31\x62\x62\x32\x64\x34","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x64\x30\x64\x38\x63\x37\x32\x62\x37\x38\x34\x63\x64\x66\x30\x38\x66\x34\x33\x66\x61\x38\x64\x35\x34\x31\x32\x33\x62\x63\x37\x34\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x35\x30\x66\x62\x65\x33\x30\x39\x34\x61\x63\x64\x35\x35\x31\x61\x63\x65\x38\x63\x36\x36\x63\x65\x35\x35\x37\x39\x37\x39\x33\x65","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x36\x32\x36\x37\x38\x66\x39\x38\x34\x62\x36\x62\x36\x37\x32\x33\x62\x33\x62\x34\x37\x36\x66\x31\x30\x64\x38\x35\x61\x61\x35\x37\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x35\x39\x37\x35\x62\x38\x38\x66\x37\x35\x36\x33\x65\x33\x64\x33\x33\x63\x62\x39\x39\x66\x36\x38\x66\x33\x31\x32\x64\x31\x61\x32","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x36\x61\x34\x66\x66\x37\x64\x39\x33\x62\x38\x38\x34\x35\x61\x36\x65\x37\x32\x39\x36\x37\x36\x37\x62\x64\x61\x30\x39\x31\x37\x62\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x66\x66\x34\x61\x34\x32\x37\x31\x65\x35\x34\x66\x30\x36\x62\x33\x33\x36\x36\x32\x31\x62\x63\x37\x37\x37\x36\x61\x63\x38\x34\x64","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x34\x32\x65\x35\x30\x32\x65\x34\x62\x33\x65\x63\x34\x61\x33\x35\x37\x66\x36\x65\x35\x32\x39\x35\x30\x35\x64\x34\x30\x37\x36\x35\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x31\x66\x32\x35\x32\x34\x32\x63\x64\x33\x35\x32\x66\x63\x65\x36\x64\x32\x36\x38\x37\x32\x36\x37\x30\x34\x33\x38\x34\x34\x39\x34","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x39\x33\x66\x63\x61\x39\x38\x38\x34\x61\x31\x30\x66\x61\x63\x38\x34\x36\x34\x66\x35\x30\x34\x33\x63\x39\x61\x32\x32\x38\x66\x65\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x35\x30\x31\x30\x64\x64\x62\x32\x62\x64\x61\x32\x63\x37\x64\x35\x35\x30\x65\x37\x36\x37\x35\x63\x35\x39\x63\x62\x34\x66\x65\x39","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x64\x61\x38\x64\x37\x32\x36\x31\x66\x32\x66\x63\x62\x66\x62\x33\x65\x37\x37\x62\x63\x63\x34\x63\x66\x30\x37\x32\x37\x30\x66\x66\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x65\x36\x65\x61\x34\x30\x33\x33\x32\x65\x62\x34\x63\x37\x32\x62\x37\x36\x30\x32\x35\x66\x35\x62\x33\x62\x35\x65\x63\x30\x35\x63","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x31\x65\x66\x30\x66\x33\x33\x61\x61\x66\x62\x38\x34\x39\x39\x64\x64\x63\x62\x66\x65\x62\x66\x39\x64\x39\x35\x66\x36\x34\x61\x65\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x30\x31\x34\x65\x34\x62\x63\x65\x62\x33\x30\x39\x30\x34\x39\x39\x31\x34\x35\x35\x35\x62\x30\x38\x37\x65\x38\x61\x64\x65\x65\x31","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x31\x38\x66\x61\x30\x31\x39\x32\x31\x33\x34\x35\x62\x65\x63\x39\x38\x36\x64\x38\x66\x36\x32\x32\x34\x33\x37\x37\x33\x33\x33\x61\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x36\x31\x63\x64\x62\x34\x66\x32\x36\x63\x61\x63\x64\x36\x61\x35\x30\x30\x35\x65\x34\x63\x32\x31\x34\x38\x62\x64\x34\x38\x35\x31","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x35\x34\x66\x63\x66\x37\x38\x61\x38\x39\x33\x32\x33\x39\x36\x39\x66\x66\x32\x64\x64\x64\x32\x33\x62\x64\x37\x61\x62\x66\x61\x31\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x30\x34\x65\x32\x30\x37\x33\x33\x39\x64\x64\x30\x31\x66\x61\x37\x39\x32\x31\x30\x33\x64\x61\x32\x36\x63\x32\x36\x65\x65\x36\x65","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x61\x36\x63\x31\x31\x63\x37\x35\x36\x39\x31\x62\x34\x32\x38\x39\x64\x36\x37\x62\x34\x31\x64\x36\x66\x61\x36\x32\x31\x61\x61\x30\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x30\x30\x33\x65\x30\x35\x63\x65\x63\x64\x31\x31\x65\x39\x65\x30\x64\x30\x34\x35\x62\x64\x61\x61\x31\x63\x65\x30\x39\x66\x65\x64","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x34\x63\x33\x63\x32\x31\x62\x35\x36\x38\x30\x63\x32\x62\x37\x34\x62\x35\x61\x33\x62\x62\x31\x34\x37\x61\x61\x64\x61\x37\x32\x31\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x64\x66\x34\x66\x66\x30\x63\x61\x30\x33\x31\x66\x33\x39\x36\x33\x35\x63\x61\x34\x32\x33\x38\x65\x65\x31\x30\x39\x34\x30\x38\x64","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x65\x35\x34\x65\x35\x66\x31\x64\x39\x36\x35\x61\x36\x32\x37\x37\x34\x63\x39\x34\x34\x66\x32\x32\x64\x61\x38\x36\x31\x65\x32\x66\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x30\x31\x38\x35\x36\x39\x61\x66\x63\x63\x65\x35\x61\x65\x30\x34\x39\x37\x34\x39\x37\x61\x36\x34\x32\x62\x32\x33\x65\x30\x35\x30","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x37\x32\x37\x65\x31\x31\x36\x38\x30\x61\x34\x62\x34\x37\x39\x62\x31\x39\x32\x62\x33\x39\x32\x66\x61\x35\x34\x62\x32\x31\x39\x63\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x65\x64\x37\x64\x65\x32\x64\x39\x66\x61\x65\x61\x38\x65\x36\x33\x61\x39\x65\x32\x66\x32\x65\x61\x34\x33\x32\x39\x33\x37\x39\x36","\x32\x33\x38\x34\x5F\x75\x73\x65\x72\x5F\x63\x6F\x6F\x6B\x69\x65\x3D\x62\x34\x63\x31\x37\x66\x32\x64\x61\x32\x39\x35\x66\x33\x33\x64\x65\x36\x66\x34\x65\x34\x35\x65\x30\x37\x36\x62\x31\x36\x63\x35\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x61\x61\x39\x63\x61\x37\x30\x64\x63\x66\x38\x39\x39\x39\x39\x62\x33\x39\x64\x36\x37\x62\x61\x32\x38\x62\x62\x35\x62\x35\x63\x33","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x6C\x6F\x67","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D"];let cookies=[__Ox107440[0x0],__Ox107440[0x1],__Ox107440[0x2],__Ox107440[0x3],__Ox107440[0x4],__Ox107440[0x5],__Ox107440[0x6],__Ox107440[0x7],__Ox107440[0x8],__Ox107440[0x9],__Ox107440[0xa],__Ox107440[0xb],__Ox107440[0xc],__Ox107440[0xd],__Ox107440[0xe],__Ox107440[0xf],__Ox107440[0x10],__Ox107440[0x11],__Ox107440[0x12],__Ox107440[0x13],__Ox107440[0x14]];(function(_0xe8e6x2,_0xe8e6x3,_0xe8e6x4,_0xe8e6x5,_0xe8e6x6,_0xe8e6x7){_0xe8e6x7= __Ox107440[0x15];_0xe8e6x5= function(_0xe8e6x8){if( typeof alert!== _0xe8e6x7){alert(_0xe8e6x8)};if( typeof console!== _0xe8e6x7){console[__Ox107440[0x16]](_0xe8e6x8)}};_0xe8e6x4= function(_0xe8e6x9,_0xe8e6x2){return _0xe8e6x9+ _0xe8e6x2};_0xe8e6x6= _0xe8e6x4(__Ox107440[0x17],_0xe8e6x4(_0xe8e6x4(__Ox107440[0x18],__Ox107440[0x19]),__Ox107440[0x1a]));try{_0xe8e6x2= __encode;if(!( typeof _0xe8e6x2!== _0xe8e6x7&& _0xe8e6x2=== _0xe8e6x4(__Ox107440[0x1b],__Ox107440[0x1c]))){_0xe8e6x5(_0xe8e6x6)}}catch(e){_0xe8e6x5(_0xe8e6x6)}})({})
let gameInfoList=[];

let rankList=[]; 

//---------------------------------------------

!(async () => {
var __encode ='jsjiami.com',_a={}, _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(_a);var __Ox10743f=["\x4D\x59\x5F\x58\x49\x41\x4F\x48\x55\x54\x55","\x65\x6E\x76","\x6C\x65\x6E\x67\x74\x68","\x72\x75\x6E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x6C\x6F\x67","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D"];if(process[__Ox10743f[0x1]][__Ox10743f[0x0]]){ await rank();for(var i=0;i< cookies[__Ox10743f[0x2]];i++){var user= new User(cookies[i]);user[__Ox10743f[0x3]]()}};(function(_0x267dx3,_0x267dx4,_0x267dx5,_0x267dx6,_0x267dx7,_0x267dx8){_0x267dx8= __Ox10743f[0x4];_0x267dx6= function(_0x267dx9){if( typeof alert!== _0x267dx8){alert(_0x267dx9)};if( typeof console!== _0x267dx8){console[__Ox10743f[0x5]](_0x267dx9)}};_0x267dx5= function(_0x267dxa,_0x267dx3){return _0x267dxa+ _0x267dx3};_0x267dx7= _0x267dx5(__Ox10743f[0x6],_0x267dx5(_0x267dx5(__Ox10743f[0x7],__Ox10743f[0x8]),__Ox10743f[0x9]));try{_0x267dx3= __encode;if(!( typeof _0x267dx3!== _0x267dx8&& _0x267dx3=== _0x267dx5(__Ox10743f[0xa],__Ox10743f[0xb]))){_0x267dx6(_0x267dx7)}}catch(e){_0x267dx6(_0x267dx7)}})({})

})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })
  
//---------------------------------------------



class User{
	//构造函数 只允许一个构造器
    constructor(cookie) {
        this.cookie=cookie;
		this.nick=null;
		this.gameInfo=null;
    }
	async run(){
		//console.log(this.cookie)
		await this.getInfo();
		await this.startGame();
		if(this.gameInfo!=null){
			var time=480+Math.floor(Math.random()*200);
			//console.log("等待时间"+time)
			let score=Math.floor(time*180+Math.random()*15000);
			if(rankList.includes(this.nick)){
				//
				//console.log(this.nick+",在前25名分数少点;")
				score=Math.floor(time*180+Math.random()*15000);
			}else{
				//console.log(this.nick+",在前25名外;")
			}
			console.log("👨"+this.nick+",time:"+time+",score:"+score);
			await $.wait(time*1000);
			
			await this.endGame(score);
			await $.wait(500);
			await this.chou();
			await this.myAward();
			var now=new Date();
			if(now.getMinutes()>=18&&now.getMinutes()<30){
				//不开始
			}else{
				this.run();
			}
		}
		
		
	}
	getInfo(){ 
		let that=this;
		let body='';
		const myRequest = this.getPostRequest("https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/info", body);
		//console.log(myRequest)
		return new Promise(resolve => {
			$.post(myRequest, (err, resp, data) => {
			  try {
				data = JSON.parse(data);
				that.nick=data.data.nick;
			  } catch (e) {
				$.logErr(e, resp)
			  } finally {
				resolve(data);
			  }
			})
		})
	}
	startGame(){ 
		let that=this;
		let body='';
		const myRequest = this.getPostRequest("https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/startGame", body);
		//console.log(myRequest)
		return new Promise(resolve => {
			$.post(myRequest, (err, resp, data) => {
			  try {
				
				data = JSON.parse(data);
				if(data.code==0){
					let obj={
						"key":data.data.key,
						"id":data.data.id,
					}
					that.gameInfo=obj;
					console.log("👨"+that.nick+",游戏开始:"+JSON.stringify(obj));
				}else{
					console.log("👨"+that.nick+",游戏失败:"+JSON.stringify(data));
				}
				
			  } catch (e) {
				$.logErr(e, resp)
			  } finally {
				resolve();
			  }
			})
		})
	}
	endGame(score){
		let that=this;
		let scoreStr=blockcurSc(score,this.gameInfo.key);
		//console.log(scoreStr);
		let body='score='+scoreStr+'&id='+this.gameInfo.id;
		const myRequest = this.getPostRequest("https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/endGame", body);
		//console.log(myRequest)
		return new Promise(resolve => {
			$.post(myRequest, (err, resp, data) => {
			  try {
				console.log(getNowFormatDate("👨"+that.nick)+"提交成绩:"+data);

			  } catch (e) {
				$.logErr(e, resp)
			  } finally {
				resolve();
			  }
			})
		})
	}

	chou(){ 
		let that=this;
		let body='';
		const myRequest = this.getPostRequest("https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/lottery", body);
		//console.log(myRequest)
		return new Promise(resolve => {
			$.post(myRequest, (err, resp, data) => {
			  try {
				console.log(getNowFormatDate("👨"+that.nick)+"抽奖:"+data);
			
			  } catch (e) {
				$.logErr(e, resp)
			  } finally {
				resolve();
			  }
			})
		})
	}
	myAward(){ 
		let that=this;
		let body='';
		const myRequest = this.getPostRequest("https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/myAward", body);
		//console.log(myRequest)
		return new Promise(resolve => {
			$.post(myRequest, (err, resp, data) => {
			  try {
				
				console.log(getNowFormatDate("👨"+that.nick)+"奖品:----------------");
				data = JSON.parse(data);
				for(var i=0;i<data.data.length;i++){
					console.log("🎁🎁🎁奖品"+(i+1)+":"+data.data[i].awardname+",数量："+data.data[i].ticket_count)
				}
				console.log(getNowFormatDate("👨"+that.nick)+"----------------------");
			
			  } catch (e) {
				$.logErr(e, resp)
			  } finally {
				resolve();
			  }
			})
		})
	}
	getPostRequest(url, body) {
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
		'Cookie': that.cookie
	  };
	  return {url: url, method: method, headers: headers, body: body};
	}
	
}

function rank(){ 
	$.cookie=cookies[0];
	let body='page=0';
	const myRequest = getPostRequest("https://wx.cdh5.cn/2384_4549575a/index.php?s=/api/rank", body);
	//console.log(myRequest)
	return new Promise(resolve => {
		$.post(myRequest, (err, resp, data) => {
		  try {
			console.log(getNowFormatDate("")+"获取排名前25名");
			//
			data = JSON.parse(data);
			var listTemp=data.data.list;
			rankList=[];
			for(var i=0;i<25;i++){
				rankList.push(listTemp[i].nick);
			}
		
		  } catch (e) {
			$.logErr(e, resp)
		  } finally {
			resolve();
		  }
		})
    })
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

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
