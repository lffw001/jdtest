/*
工会答题抽奖
 */
const $ = new Env('工会答题抽奖-进行抽奖');
// index.js
const fs = require('fs');
const notify = $.isNode() ? require('./sendNotify') : '';
const CryptoJS=require('crypto-js');

let keys=[
	'SXl0NHBpdGNsa2NTeG5TUjRycGFXMkliV1VMVVhFNW9uWmFRY1BXR0VEcGlNcEg2eThkeHdYSkVEKzB2dzVOVklhV0NzS2t5UlhtUC9SRUF6UUxSc1hoMTdyUGVXY1JBQUZiVDFDb1kvRTVvVGRCL3pyMmlYVEJJeUFBSG1SSHhadlZBSEpvQ2pIWXN5M3o0aWxxWjU4UGV5VTFQekY4RlkydC9veDBkV2NBM3hlWlh3RitHSnBrSWtsaER5QTJmSlJrM0JWd1JET3R3WXZkckFPSEsrRGh0NXNGU1Z5NXMrZWI4eXNIbHlrUEpNUUVQOTNMRS9MQzAvWEpFazNpVTVNZ3RVR0psVVRkK004bEEwaG55Z0l0UTZabWxVWnpPS01TVjdOUFY3SXo5RUtzV3YyS3BUdmdTdHdmd2FieUFqZ1NYZk9HTlBYalhreks2cVNYWHZKY3E5L2VhK2piTWtCWXRJRmh3anMydXFPTlNZMGNrSEkybEVXSjRpcVpnc09qYzRvU1hYczd6MDdEZC9xQW9ZVmNpbjlhaExhSUY3RGUvS1oyem9vc2JGbG5PSkdBeTFVdlViWjBIS09aYkZCcDB0L1hmaG1hb1pWbUN4Q2VIN0gxKytUaGxvdnVpWEdzazBGZGZ3T1M0TVY3MzhaMjBUNlV6Qit2ejB6K2d1MXZwL3lEQitiMjhERlJTVXBUd3dlUkxhblljMGdMOTdtZDlJQ01JeDRLeE02QWNwbFZpR0dmcUZFY2E4djFFUmlrSW5HN2p5aEFTVmV5a1drTlVQbzIrTldnblY0U0w1WjZTYmx0MC9xTVhKbEZGVjduY3Y5M0xNeU4vTTlUQytRTVQ1TnhtZGtudlFsMWJFMS9zdzBVL0VBYzZFRjI0NVo1c2VjYVZCSXRybFFtNHc1T0poRFRIUmRQREhvNEl3TWMveEZyT1NCU1R6eWwzcmw2dXh6elNidFpxbjhmMnBGVmZqVHVESitsckxuS2dqaFFaSEw1OXZGcHJMbDYzdGpuNURvY1lHdHlGWEp0ZkF0U3Y3R0piZkZGSUQ2aWtKcnYzdlNzVUl4cz0',//libinxwz
	'bEFjOTJRRXNFWXJia3g5TExzZlNPV0liV1VMVVhFNW9LNDRVc0VPaE1BMW41YkkyNU5jMkRYSkVEKzB2dzVOVklhV0NzS2t5UlhudXluRis1VmpobjNoMTdyUGVXY1JBQUZiVDFDb1kvRTdtbDJyRXZ2d2RRL2RkQTVqWHh2V2taTUZPdzZzbDk5RFdvYnJsYStGVW1IQkVrRFczbXVyc2ZxNCtWM1hsVUtUMG1pL3poc0VERXQvcjAwQkVocGZQeFVwWjB6V09iN1h0aGRvNnVLZTBMQjVjN0ZMQWlGNzEvTFRuR2xQY1UyNTJNa0EyMEhmaUowaTZoOUxQclltTVUxR2EvWFkvaU56Z2ZBcWh2MlVvVVBDU0RxSSttbzRtaWZQR05CdiszRXhNejBPTHdDWnZmbmlWcEZ4bUZYWGhyN1ltWW1vRURQb3JPdGJhVWVMZS9vbEVPMW9lSEdiQWxYbzkwUWVLRkY5cmhIZGhnTW9yVmNqV3o1cUZrWUVGenB2RGtCRTRscksyd0JGY2U0bmZmWjlQcHlRbUFKWFBFMWRsRG1wZFlXd2FUZTdxTGxFenA4QkUyMk5CUkp1Uy9MTk1iVjZwZmhsTVJCaWl2QzgrZ2dESCsyeWlHSStGTkliS2YxOGE1QzFXWUYrd2ExUWNuZ2lHVVBvL29CRFlab0p0bjNBYnAraTJrWGY3dnMzZFEwemlUbGVpajY2WlgzZFRRMmc4WVJHMlZUYyt6WnM5UUxibnNWTXV2Z3QxWWNCd0dPZUIwMGtWQlZLdFg2TDVsMjJWMXY5QzZERzE4RHVDNmsxRUJXa3dNQmhrV3dKV2E1Mmc3ZVB0MVRURVBOeFMwTFpqVkZ6cHIrdE13ak5vQ1RUOWNjVS9uTVFqYjZqVXhvU1Q3MktkbHVKTjdtU3VURElqUzNhRlIzSEwyS1MydnJBV2lJMndMeFZOZHlvcmxOc2svdGI4d1hDUlFUUXN2Y2lFQXBCcFJQSWxNaUx0NkxCTDlQaEQzSG11djR6ek1IMi9MY0Y3TForYlFUMkM2dzJvRHhpSmFLYzZpMHNqK2M1RWhDYz0',//bona
	'Z3AvV3pMSGw4OElaODJueW5KVnZTa0E1Z0MxRndjSFFyWnU2VG1hUUJaZzN0Z2ZJYnlNRXRNbUdqbVVUZlpia21JVTJETnhURWw5N3NZTVJLRkxIeFN1cWUwK0s2a05ZbTAzenQ2Rk9nZDhGdmFUQmhxaXo3NzE1NUJRTWZ3ZEFSVDJEWjRtMnhCWVQ5NkRmM2xJSkFNd2FtK2oxY3BVSGVtUFozNnBFdTRKWGhvd3JUeHF3OUtwZFpqQ3hGdERoRVJPU3NRN2FySExEenNaWU0xb3VCYWxuanpJMnZoQ2NBTHdHVlB1cjdxMmU3elhzcmt1dUwrMkc5ajJNLzVlcjR3dDMzZ2p4aTZZN3d1N2padkUva04waUlPaC9ZWVBFWTFPc3gxV2dMSWZhdkZzR1E0bGs2a2FyWnJTZHNjWm1CNlBueWJESnRFZm1tR05Ra0UwQ1A2bmRLSjhYVEs2cDdiY3NPbnZrVCttTnBSRmllSXFtWUxEbzNPS0VsMTdPODlPdzNmNmdLR0ZYSXAvV29TMmlCZXczdnltZHM2S0xHeFpaemlSZ010VkwxRzJkQnlqbVd4UWFkTGYxMzRabXFHVlpnc1FuaCt4OWZ2azRaYUw3b2x4ckpOQlhYOERrZlF0MktEa3ZkYVlJaGxENlA2QVEyR2FDYlo5d0c2Zm90cEYzKzc3TjNVTk00azVYb28rdW1UN05NUjdVdVlRcnRsVTNQczJiUFVEa1MycDJITklDL2M4NmdpbENlYVUrak5lMzVFRVEraGxuNmhSSEd2TDlSQzFhMXJFNXVvUFZKeGpUd3ZKMWhJOWlrZU5FbHYyb21oeUVXRXRESURhMnEzSXRQanVDWm9ucWtWMnI3bm0zN0N4b3gzVVdXR0s2T1BFU3BFQXlYN1gvVitnNVk0SngwemN6ZzJaY1VEWFZKRXRHbEJ1cHY4bTVROWhSRWFiS1FQeFZ0SlFpb2RnR3JoUlFrSURmY08wQzNPNFQ3Z1E5SnZISXBsd3Z5WkZkUnhUL3ZYREVCMEE9',//朱张杰
	'Z3AvV3pMSGw4OElaODJueW5KVnZTa1h0NXNxNEF1ZjJzZWdtU0F6U3FkQTN0Z2ZJYnlNRXRNbUdqbVVUZlpia0tORURIOXJxeUpNL0NlaFRXTCs5Q1NwTDk3eG5ReXFXaUZtRy9iNUdTbzlMVGRwa3Q3VVRRYjE1NUJRTWZ3ZEFXSnFjRlhhVFBNdDhyaWxReHkxRStNd2FtK2oxY3BVSGVtUFozNnBFdTRKWGhvd3JUeHF3OUtwZFpqQ3hGdERoRVJPU3NRN2FySExEenNaWU0xb3VCYWxuanpJMnZoQ2NEamk5Mm92VWJyKy9qTjcxZWxpQzJVQk5mclF3Q0ZjR0tmZ1BtNUlzWXpPaTFxeWlEd2NjeFJPQUZiUFRvdjNOZThsRjNMOGdYaE1PcmJBUnZYeVVyT0N0UHBMSkpDckg1OWVDbzU1a2tHcldEL1V2bC9RMStNVXd0ZStGQkVoMFl6TTZYSkwySnc4blF1UUVnM05sT1dGQWMrNkdaa2RBUXUra2VRWlczcmtkZjhSS245Q3VoRmhVYnM1eDRFTG9kMVdpNEVra0ZDTVJzUDZ2a29haCtDQjIzTXFzekJjaWhzZW55bFRJNnAxbVFHOFZRUUhKVDdWMDdvWUtFQVN4ZjJPRkQ1L2FvZHk0Q2JRWjBjTVZFSlVaOGdmYjkvQWRYY1NINlBhRldlN3pWb2xGVHFURklCTFF5NXowOGVZcEZ4N2EydnRUczVKSHBLRHg5NEVXR2hJRzA2WFExWlVUOE9xN0JsSldHeEZNNGs1WG9vK3VtZFU2TS95c3p6SmIraHlmT0FJbmxmWDl6aFUyN3FQQzVhd01zQ2ZzR1kyc2lMTk1SVG9YM0JuTExiQXZTV3RhV25PVk8yOUE2dlZWbFBWV1JyUnFtR2dVZUhobmFxOWpTa3BlY1ZvbklCTjd4Qy9JWk16NlpycEpUR1pIQ2xyV1NQTzJUSVNGTW1nUnJTbHYvME1wMXZKNGVpME5mRVlRcUM1bEQ3R0JzT1drM29SeDBrSDNqTkU9',//小白
	'Z3AvV3pMSGw4OElaODJueW5KVnZTbGErVzByUnpmTmgwMS9KRWR0b0J3MDN0Z2ZJYnlNRXRNbUdqbVVUZlpia1psaVBWSUN5RFR0VUhmTjEyQUM3NlNwTDk3eG5ReXFXcG5jVm5vdHIyNFpGN1VuRTkvSTN2Ty9mQlJCVExqdE9KeHN5ci9nSzFFa3N5M3o0aWxxWjV3UUtnenNLUUJjUWZETXNXSStIVHFNM3hlWlh3RitHSnBrSWtsaER5QTJmSlJrM0JWd1JET3R3WXZkckFPSEsrRGh0NXNGU1Z5NXMrZWI4eXNIbHlrUEpNUUVQOTNMRS9CVUFma0Q3dkhJU3hFdHQ0dnlrbUFCVWZpbjk2a3pJWFY4VFFVTGV5WnZrd3VpRThKdUh1cExzMDRGbHhKaDBxRUl3a2NJTDZMTjVUQ05SeWo5cER6RlI4NkhvMzFjblZsUUs5K2lyUHZNcElRMDhHdHhRU3Nid0RNcy9jN1BJS1VDRlhwSExQNDFBMU5ZcFNjQ01ybmk1UGpsd1dxZWgrMjl6UFpMK0pWWE1VZ0Vjb2lybS96bC9WMUdTWktFb3FtWEliYzVoZElGNTVsVGFOQzc5czl3UUoxL1Fwa3dzdmtJK3B0WVNOTXNJM1lDZ3BFVnZDQyszYkZUZ1FZOGwvTFpGZGR4NnBPUkUrNzIzRjFoYkV2Mk1KT1o5SjhtcFdhVGFrZDNvZy9IeWYxYnQ3R25od3lMVGcvRWVWSUw5VHVJNXorK3NjNGkrL2F1RVVPazQ2dko0RWdBMmc3cVY4Qi84YnB5Y0VPMXBCdy9ia3hlSW1mRDRPK1VIbjc4S1ZXMzJGWDFEREFxc3FxWU4yWFNSdkFZbnFQaUpkWkgxc3lRQ05rQ1F1VkRtVXVQLy9kY1B4MkVUcXpjdUVsaloySEFMR1JxczExcjJLb1N0czVoL3F3UzdXK24vSU1INXZZNmpwSE8vUmFBNmkxVTY5MTVIMFhsNFNrV0hjTzlEV0pYckh1MnFDRGlyamFSTEczVUJoaUlLSk5iVXl5a0l4UT09',//001
	'Z3AvV3pMSGw4OEp5MkszTlltTUlDMy9iZVEzVUpSUWZWZ2dmNGg1VmdZRTN0Z2ZJYnlNRXRNN2dtQ3RHNjBOd3BZMEJCVkR2alZaN3NZTVJLRkxIeFU3N3lhM3BaU0szTERjL0JLNDRadFJKS0owSU0rK3pMTm1QWlB6NTVrTE80Y1hhZnE0bm8vTll6R3N5bUs3R1ZjeG5GRnZCOFFrMFFCNy9iNDdTUkNsNkt3cjVGa1JGUTZzVXZKTHFDR3l6eXZ0VW0xdW5aZmdGM3g3eldCOHFhZDFYVFN4MjVYWkVXWndxaW9NUWR0S3lOYTZEWFp6TVJLUXFYK0ZhcnIreEEydTFpWWx1c1kwNTRicDJhRlJCRlNmMlRLd21MVWxtZFRKbm5UUU1OR3RuU3lyNmhOZ3hxQkFYc3c1SHdMOEEwQkt2Y0FmZXRWaTBQeThLZitPTDVHdUVkMkdBeWl0VnlOYlBtb1dSZ1FYT204T1FFVGlXc3JiQUVWeDdpZDk5bjArbkpDWUFsYzhUVjJVT2FsMWhiQnBON3VvdVVUT253RVRiWTBGRW01TDhzMHh0WHFsK0dVeEVHS0s4THo2Q0FNZjdiS0lZajRVMGhzcC9YeHJrTGZLVkQ5c3lUS2w2d2NJT29UWGxqWGNrUzBhVUc2bS95U1JHS0FaNXN2WmFSNlNnOGZlQkZocmdiTElrM2VXZ21LYjJCOUVQNnJXVlRPSk9WNktQcnBsUFBSMlNuN2hVeVRsVGJibjRIWWJiNUV0cWRoelNBdjBGeWNxb2dmZ3J6MHVEY0VpK2gyTDJWVGs5SDAvSmxpQ2pzVnV2ajZSbUJRby95Y0drVmQrZGI1ZDNTS2oxNVNpa2ZleFZESjlEWnh1OHhRdG9XdWJNclZyRFc4TWZyRXNiVzcrdlpqbmdINVVaOGdmYjkvQWRYR1ZjaFlGdHFjRHdtUUVYRjQvNENjb3JQSEc3NEdGZjV3SWs5QUxiS1lXVjZ4N3RxZ2c0cTFJYU41V3BvOTcx',//002
	'Z3AvV3pMSGw4OEp5MkszTlltTUlDOWF0NWNDUHJTK2NiN3RXNEI2RVpKSTN0Z2ZJYnlNRXRNN2dtQ3RHNjBOd1FTU2tVejM5Mnl0N3NZTVJLRkxIeFN1cWUwK0s2a05ZU0dtek9sdWFGY1c5bVFNM003Sm04S0ZVemVkUjAzTVp5UnNKRTRGVmRmWUNlY2JvZUJzVDFQU2FML09Hd1FNUzMrdlRRRVNHbDgvRlNsblROWTV2dGUyRjJqcTRwN1FzSGx6c1VzQ0lYdlg4dE9jYVU5eFRiazhxSjUzeEhSY0ltS0tnSjJ0K0U5RzBNNjZVYjc0U0E4alpqQnBWSENIZ2Z4bkhSaUFPTFVHTURVNGttb1VVYUs2MHRlWC9HNEFPMXZkamNwMTdlTUFBalNuVE5IUFprOXRMNm1welF3amZFb1ZZeHR2bXhzSmdOS3Z0c0h4T3drVXVFaTdpdGJkOW5KWlFkUkF6dEVNRDNTdG85R21tMDBvbXVpSHF4N25kaWlhVVd1Si96R1FmNjU1RFR6ZEdseXIvVUhlc0dZRmtZcVl6RFZtUEI4TGpMdUduc1FpOW1iZDk2UG9LNjBsTmhTUTB5SDdNUHFpR3g2ZktWTWpxbmU5V2VQWE5LbVhUcFRNSDYvUFRQNkM3VytuL0lNSDV2YndNVkZKU2xQREI1RXRxZGh6U0F2MmM3U3d2OUMvSzdzNGxpc3IwOUgrN1orb1VSeHJ5L1VRUjFSK2c3clppV3paZ3NnbjZ5ZTdMNGpuUDc2eHppTDc5cTRSUTZUanE4aGMzTjgwTzVUUXNRbGR1YTRWTWw3dVRUNVU3RWQwNkZzeW1rTDJoY2ZyOUg4ZERlMTZkMWhpZ3I4M0ZRaWxhdiszYnBvV0U3RVF2eEEwT2JrdjVhT1hTSFJrOXlWYjFhV2FDYlo5d0c2Zm9JWm5xRDQvdmtDc25xUGlKZFpIMXMxa2NZM0ZXWG1XSExtVVBzWUd3NWFTL2pQTXdmYjh0d2VsVVZNMkp5ckND',//003
	'Z3AvV3pMSGw4OEp5MkszTlltTUlDM29hZVkvbTlFSFlGUXhIcnpMOWJnODN0Z2ZJYnlNRXRNN2dtQ3RHNjBOd1cwRmdJclh3akh0N3NZTVJLRkxIeFVMeE1GTVJPU2daemo4QlYvbzRmZmdzeTN6NGlscVo1KzRwbFlTM09XaFFsNVJUQmd1YnQyRTN4ZVpYd0YrR0pwa0lrbGhEeUEyZkpSazNCVndSRE90d1l2ZHJBT0hLK0RodDVzRlNWeTVzK2ViOHlzSGx5a1BKTVFFUDkzTEUvSENZMmlTY1FGNnd1QXRhcEQySXFOOWhIRFZGSWxieVNpVEora1RLQ3g2MVhaSHY3ckJNZ0plRzdYRjZYTFBWMUZtUkZSaDlsSW83RmxQVmtBM3ZETm1xVGQ4SGkwdFFFdUhsWWFDZVUvb1BydmtIQUNtMzQ3ZUdDYVAweEN2ZWJMYnRLRElZOFhIREo3RVhUcUMrdFJIZGlUdjhIanFyK0pVWjhnZmI5L0FkMk45WjlVMTBiR2Z1Z2xxWVlTVDhlMEdLN3RoVUI5VVl0blpjaXhqMkhRckZXUHJqeVllN2xUU0d5bjlmR3VRdE4xeHArMnp6dnp5RkpEVElmc3crcUg0ZVFheEJmbHR2UE5KdTFtcWZ4L1pQRWFwd0YwMkhZak1RaGN5SVZsSFVCdy9ia3hlSW1mQk1IdzRoQ3FFNDcvTXA5ZVRoblh2UmhKNG9WeWVDMDlHRGxyWUh3Si92WitXZWttNWJkUDZqODFhSlJVNmt4U0N6dHBreVlsaUN0MHFWcy9WeFcrVmU2YS9yVE1JemFBazAvWEhGUDV6RUkyK28xTWFFays5aW5aYmlUZTVrcmt3eUkwdDJoVWR4eTlpa3RyNndGb2lOc0M4VlRYY3FLNVRiSlA3Vy9NRndrVUUwTEwzSWhBS1FhVVR5SlRJaTdlaXdTL1Q0UTl4NXJyK004ekI5dnkzQmV5MmZtMEU5Z3VzTnFBOFlpV2luT290TEkvbk9SSVFu',//004
	'Z3AvV3pMSGw4OEp5MkszTlltTUlDNDl3N0JVSjVzZmFiTFA0K2J2UnFrQTN0Z2ZJYnlNRXRDVTRmaWpLbjQ3SmYrcmlzTGFpdDc1N3NZTVJLRkxIeFN1cWUwK0s2a05ZeGNEdDlnRlVWRDJDb0x0SFB5bWFHYjE1NUJRTWZ3ZEFoVUxiYmYzTy9IQVkwdDdJSXJDTnI4d2FtK2oxY3BVSGVtUFozNnBFdTRKWGhvd3JUeHF3OUtwZFpqQ3hGdERoRVJPU3NRN2FySExEenNaWU0xb3VCYWxuanpJMnZoQ2NIU3FmeHh3VDBjRDJtU2FSaFpjV01HN1JiblhXNXF2VzlhREk1WkNMV2pYNFJkNEVhdlhMdHphdndlUXR6QU1VQ1hZV0x0QjZ4RHlvWjVuaWpiWjZ1VTdPSGlKT0RMb1lFcEloQmh5WTJtRk84S1JGemVDUEdjall6RzQ1cVkrVmE0UjNZWURLSzFYSTFzK2FoWkdCQmM2Ync1QVJPSmF5dHNBUlhIdUozMzJmVDZja0pnQ1Z6eE5YWlE1cVhXRnNHazN1Nmk1Uk02ZkFSTnRqUVVTYmt2eXpURzFlcVg0WlRFUVlvcnd2UG9JQXgvdHNvaGlQaFRTR3luOWZHdVF0OHBVUDJ6Sk1xWHJCd2c2aE5lV05keVJMUnBRYnFiL0pKRVlvQm5teTlscEhwS0R4OTRFV0drNm5SZ0NpOUswNXB2WUgwUS9xdFpWTTRrNVhvbyt1bWJHbVdZOTFyTEV1T1ZOdHVmZ2RodHZrUzJwMkhOSUMvV0pJcVczT0VlVE9MdndITHZOUVRXQlZPVDBmVDhtV0lLT3hXNitQcEdZRkNqL0p3YVJWMzUxdmwzZElxUFhsS0tSOTdGVU1uME5uRzd6RkMyaGE1c3l0V3NOYnd4K3NTeHRidjY5bU9lQWZsUm55Qjl2MzhCMWNaVnlGZ1cycHdQQ1pBUmNYai9nSnlpczhjYnZnWVYvbkFpVDBBdHNwaFpYckh1MnFDRGlyVWhvM2xhbWozdlU9',//005
	'Z3AvV3pMSGw4OEp5MkszTlltTUlDMHVIOUN1ditnZnFuMWM5MFZDK21pUTN0Z2ZJYnlNRXRGRVBaclZOMkJuNnhEWmF6N3g3cHJxQnkrNG96RGsvN0NwTDk3eG5ReXFXNnBzMXZMK1RHUm1rdlBQdytLOXozeWRydXhhMjF5THdvMHZxYmpuR2lXekNBTnI5ZHZOZXFXR0ZrL2I0bEdVckQ3Mzh2N0gzbDNkVzhaSHpkaTcvL1M0ZTRYRitIa0QrUUVhMmoyVFFWKzBzWXFhU0JmcmNqaWdvZFNobHd2dDhxazM4OXQzUFkrSFlmeCtmcXRJOXNUZ2ZFWFRzeHNtVkI1S2MwYTJyM0tSamZISjVuVFVZQ3Frb2RwUlRYYktDNU0vVm1BL1BSOUxiYXp0MHhnMEpva3psK2l2cGlJZkU4OFVxYXJjaXJJSlRyWTlObE9waEw1eVdVSFVRTTdSREE5MHJhUFJwcHROS0pyb2g2c2U1M1lvbWxGcmlmOHhrSCt1ZVEwODNScGNxLzFCM3JCbUJaR0ttTXcxWmp3ZkM0eTdocDdFSXZabTNmZWo2Q3V0SlRZVWtOTWgrekQ2b2hzZW55bFRJNnAzdlZuajF6U3BsMDZVekIrdnoweitndTF2cC95REIrYjI4REZSU1VwVHd3ZVJMYW5ZYzBnTDlkdlZ2UmJUYjR1bXhNNkFjcGxWaUdHZnFGRWNhOHYxRVdqdXlrUGYxQlh6MFJ0S3RKbW8wR09JNXorK3NjNGkrQmIvUUtuWWxsZnBWalhEc3FrSkFrMEpYYm11RlRKZTdrMCtWT3hIZE9oYk1wcEM5b1hINi9SL0hRM3RlbmRZWW9LL054VUlwV3IvdDI2YUZoT3hFTDhRTkRtNUwrV2psMGgwWlBjbFc5V2xtZ20yZmNCdW42Q0daNmcrUDc1QXJKNmo0aVhXUjliTlpIR054Vmw1bGh5NWxEN0dCc09Xa3Y0enpNSDIvTGNIcFZGVE5pY3F3Z2c9PQ',//009
	'Z3AvV3pMSGw4OEp5MkszTlltTUlDMkN1WVZDWHJXRzNMWHpkS2VodGtKODN0Z2ZJYnlNRXRNSzZpYnFKQlBVaDVTbXBJMS9nWlN3dTQya3hxbGF5ZkNwTDk3eG5ReXFXUWdRRmVJeEFkQWRSMHhzY05OVjBaNzE1NUJRTWZ3ZEFtWGRwQVdyZDdKbTBKVkZMTlAveUZNd2FtK2oxY3BVSGVtUFozNnBFdTRKWGhvd3JUeHF3OUtwZFpqQ3hGdERoRVJPU3NRN2FySExEenNaWU0xb3VCYWxuanpJMnZoQ2NTemM4MTBqQzhYajgyQWduN2ZMMW5KTThzNFNsRlVMWml2Q1lGalpPTjVjV2loQzJMMkdzVCtzeXh3OVlFNURxZFZlWlppMU9iQ3A5Yld2V0lHN3FoWU01SnRXMTcvY2N1SzdpK3RtWm0wdEJXQVAvcWIzcklwZmo0WGprMWRXSWE0UjNZWURLSzFYSTFzK2FoWkdCQmM2Ync1QVJPSmF5dHNBUlhIdUozMzJmVDZja0pnQ1Z6eE5YWlE1cVhXRnNHazN1Nmk1Uk02ZkFSTnRqUVVTYmt2eXpURzFlcVg0WlRFUVlvcnd2UG9JQXgvdHNvaGlQaFRTR3luOWZHdVF0OHBVUDJ6Sk1xWHJCd2c2aE5lV05keVJMUnBRYnFiL0pKRVlvQm5teTlscEhwS0R4OTRFV0dzOGdZeTVHOGUwWXB2WUgwUS9xdFpWTTRrNVhvbyt1bWJQOGUxdFI4SzdST1ZOdHVmZ2RodHZrUzJwMkhOSUMvYVhVNTU5UmFLWmxvbEhHcFRBYUFNbFZPVDBmVDhtV0lLT3hXNitQcEdZRkNqL0p3YVJWMzUxdmwzZElxUFhsS0tSOTdGVU1uME5uRzd6RkMyaGE1c3l0V3NOYnd4K3NTeHRidjY5bU9lQWZsUm55Qjl2MzhCMWNaVnlGZ1cycHdQQ1pBUmNYai9nSnlpczhjYnZnWVYvbkFpVDBBdHNwaFpYckh1MnFDRGlyVWhvM2xhbWozdlU9',//010
	'Z3AvV3pMSGw4OEp5MkszTlltTUlDL1R2UVA1UkxVc2VhUzVUYkxrVVYvazN0Z2ZJYnlNRXRHVVQxKzZNS3dlYjdLM2xpR2pqV0NSN3NZTVJLRkxIeFN1cWUwK0s2a05ZU2ozcGdRb0c3UjB0OHJGR05RK2VJTmFodXVWcjRWU1l0YitKdWgySjRSSXI3Mzd3ZXExM3QvU2FML09Hd1FNUzMrdlRRRVNHbDgvRlNsblROWTV2dGUyRjJqcTRwN1FzSGx6c1VzQ0lYdlg4dE9jYVU5eFRib0xBeEpIMVJpYmFMUUJuOGZZa2hBbVFTcjI0Wk9RRWh4Q0NSb21DNXJzL2FDenMwNkVFNExNRzN6VDNXclFCVk1sTE55MlhkYXlWcVE1MFQ3WGl5VmcyaC9Yek1QN2pSRmx6c3ZDaGdoNGJXdTUxM3B1THhwQnVacmlNeDEyd0ttdUVkMkdBeWl0VnlOYlBtb1dSZ1FYT204T1FFVGlXc3JiQUVWeDdpZDk5bjArbkpDWUFsYzhUVjJVT2FsMWhiQnBON3VvdVVUT253RVRiWTBGRW01TDhzMHh0WHFsK0dVeEVHS0s4THo2Q0FNZjdiS0lZajRVMGhzcC9YeHJrTGZLVkQ5c3lUS2w2d2NJT29UWGxqWGNrUzBhVUc2bS95U1JHS0FaNXN2WmFSNlNnOGZlQkZob0Q3dVkxVVBPd1E2YjJCOUVQNnJXVlRPSk9WNktQcnBrMTZEVHI4NXVqZkRsVGJibjRIWWJiNUV0cWRoelNBdjI2VkcxRWpBZEdCS0pSeHFVd0dnREpWVGs5SDAvSmxpQ2pzVnV2ajZSbUJRby95Y0drVmQrZGI1ZDNTS2oxNVNpa2ZleFZESjlEWnh1OHhRdG9XdWJNclZyRFc4TWZyRXNiVzcrdlpqbmdINVVaOGdmYjkvQWRYR1ZjaFlGdHFjRHdtUUVYRjQvNENjb3JQSEc3NEdGZjV3SWs5QUxiS1lXVjZ4N3RxZ2c0cTFJYU41V3BvOTcx',//01
	'Z3AvV3pMSGw4OEp5MkszTlltTUlDeVZwRnc5K1huSFQvMGRUenlDc2hrVTN0Z2ZJYnlNRXRNSzZpYnFKQlBVaFVrM2UvRTFSV2VRVm52YzFiUzFQb0NwTDk3eG5ReXFXRS83THduZ2ZuWXNoRmhUUUlyalhWUTVVWFFaTUUyWk9qeC82UXEzYjJ0VXN5M3o0aWxxWjUxditVWDl2YlRwckJQNUQxcXRtZ3NrM3hlWlh3RitHSnBrSWtsaER5QTJmSlJrM0JWd1JET3R3WXZkckFPSEsrRGh0NXNGU1Z5NXMrZWI4eXNIbHlrUEpNUUVQOTNMRS9GL1VEVG52RGtBWWpXODlhbTJzSzlvanBCNm5JMVBoL3dzQVZmVTNBRmdsN2ZtQzJZWDRvTDRJQkVMejNqd0hZZ0xaTUtHNVNiVzc3b3VmUklJNUY5RmRkdUpBNHR6bnFuc1hkd09PeVJRajFCSFpwcGdsMzh6ZVpwRjYrNlNrZ2JidEtESVk4WEhESjdFWFRxQyt0UkhkaVR2OEhqcXIrSlVaOGdmYjkvQWQyTjlaOVUxMGJHZnVnbHFZWVNUOGUwR0s3dGhVQjlVWXRuWmNpeGoySFFyRldQcmp5WWU3bFRTR3luOWZHdVF0TjF4cCsyenp2enlGSkRUSWZzdytxSDRlUWF4QmZsdHZQTkp1MW1xZngvWlBFYXB3RjAySFlqTVFoY3lJVmxIVUJ3L2JreGVJbWZDclBvc2NXbmE4QXZNcDllVGhuWHZSaEo0b1Z5ZUMwOUZoMFpUNHJ2VjdKK1dla201YmRQNmo4MWFKUlU2a3hTQlFEUFBDK3kvQW8wcVZzL1Z4VytWZTZhL3JUTUl6YUFrMC9YSEZQNXpFSTIrbzFNYUVrKzlpblpiaVRlNWtya3d5STB0MmhVZHh5OWlrdHI2d0ZvaU5zQzhWVFhjcUs1VGJKUDdXL01Gd2tVRTBMTDNJaEFLUWFVVHlKVElpN2Vpd1MvVDRROXg1cnIrTTh6Qjl2eTNCZXkyZm0wRTlndXNOcUE4WWlXaW5Pb3RMSS9uT1JJUW4',//天天快乐
	'Z3AvV3pMSGw4OElaODJueW5KVnZTaDB0UU4wUHVjV05NOFVRa0pROC9KMDN0Z2ZJYnlNRXRNbUdqbVVUZlpia2E2MUFJdkp0U3RwN3NZTVJLRkxIeFN1cWUwK0s2a05ZMWVYb1p5QnRHTE50UEpCUGFHazJ0NzE1NUJRTWZ3ZEE5L3FzWS9LQkYyTk1Ia3ZPSG5IRjFjd2FtK2oxY3BVSGVtUFozNnBFdTRKWGhvd3JUeHF3OUtwZFpqQ3hGdERoRVJPU3NRN2FySExEenNaWU0xb3VCYWxuanpJMnZoQ2NERnEvZ1AzVUlCRWZUZGd1SXB3RUNuQURpQlF2VVFoUVdCbXp6VnNLNWlKNXdXeEx6Z3p6RnN2azlFaGRFOTBjUG9lWUxsQ0czL1lIeURmMytrL2MrNnh4Y0U3eUlUcEkvbGx2dHBWbEFHeTFHVmd2blIwcjNVK2k1K0IrNTF1eXR1MG9NaGp4Y2NNbnNSZE9vTDYxRWQySk8vd2VPcXY0bFJueUI5djM4QjNZMzFuMVRYUnNaKzZDV3BoaEpQeDdRWXJ1MkZRSDFSaTJkbHlMR1BZZENzVlkrdVBKaDd1Vk5JYktmMThhNUMwM1hHbjdiUE8vUElVa05NaCt6RDZvZmg1QnJFRitXMjg4MG03V2FwL0g5azhScW5BWFRZZGlNeENGekloV1VkUWg3UU51T0J6RnhlTW9JVmxaVjQxbDh5bjE1T0dkZTlIUGdWSm5oU2VTbGpZM2ZnOTlyclptNVo2U2JsdDAvcVB6Vm9sRlRxVEZJUGg3eE1RaExnMzBTcFd6OVhGYjVWN3ByK3RNd2pOb0NUVDljY1Uvbk1RamI2alV4b1NUNzJLZGx1Sk43bVN1VERJalMzYUZSM0hMMktTMnZyQVdpSTJ3THhWTmR5b3JsTnNrL3RiOHdYQ1JRVFFzdmNpRUFwQnBSUElsTWlMdDZMQkw5UGhEM0htdXY0enpNSDIvTGNGN0xaK2JRVDJDNncyb0R4aUphS2M2aTBzaitjNUVoQ2M9',//刘淑芳
	];
let cookies=[
	'PHPSESSID=ef4699514c730fea76bda5454560c2d2; Hm_lvt_e0db7c309f65b2c5dd9430a21a70bac3=1667666232; Hm_lpvt_e0db7c309f65b2c5dd9430a21a70bac3=1667666434',//libinxwz
	'PHPSESSID=8291bdf67805e0bfb2d9f30984eb77b2; Hm_lvt_e0db7c309f65b2c5dd9430a21a70bac3=1667668165; Hm_lpvt_e0db7c309f65b2c5dd9430a21a70bac3=1667668383',//bona
	'PHPSESSID=f8ea52006505761ddf26f4c891d74174',//朱张杰
	'PHPSESSID=f0f4b76e5b2de280939da09547248d92',//小白
	'PHPSESSID=40110e4ca3bacad269763fe2589bdf75',//001
	'PHPSESSID=f1bd2bcbd3bb829710f5f092d558fc18',//002
	'PHPSESSID=04b059cd43dc659ec3fe1cd18a54fc6f',//003
	'PHPSESSID=b5da1f157da5cbbff241bbc0e57dba96',//004
	'PHPSESSID=5924651c0d516f08d97f79cabe416480',//005
	'PHPSESSID=9c766b172fb5309b965910680f212afd',//009
	'PHPSESSID=1b22a30c6ddc83414dcd6497c4f878da',//010
	'PHPSESSID=48453647e23df78ed3997a8d31b362e1',//01
	'PHPSESSID=fe1eb2c5438f1a1cd380658316a55da0',//天天快乐
	'PHPSESSID=053257fc6fde705ac8caac547389726f',//刘淑芳
	
];
let lotterycookies=[
	'twoWelcomeOpenId=oyckUs3iWyoXLv-klUFFjNQP_iEk; Hm_lvt_3a1cca3ce707e9424410fa481cbe3375=1667666219; Hm_lpvt_3a1cca3ce707e9424410fa481cbe3375=1667666219; financialunionwechat_session=yDYSQAQunw0EdHlcaGUn5xkhQgeVdyQrHITu9Wmm',//libinxwz
	'twoWelcomeOpenId=oyckUs51Q7pdxsVBZQrylLlt0ilA; Hm_lvt_3a1cca3ce707e9424410fa481cbe3375=1667668140; Hm_lpvt_3a1cca3ce707e9424410fa481cbe3375=1667669454; financialunionwechat_session=TAJucHuKRJeN7rX9FU7Z74S8nrtquLBUT3TV3Y5m',//bona
	'twoWelcomeOpenId=oyckUswGge00Iop8M5VNuliIUVYs; Hm_lvt_3a1cca3ce707e9424410fa481cbe3375=1667669683; Hm_lpvt_3a1cca3ce707e9424410fa481cbe3375=1667669683; financialunionwechat_session=qE8D87WjC5ApdQN7AV0UN13E7AKUSHTuukypigUB',//朱张杰
	'twoWelcomeOpenId=oyckUs7vXSdL_y1YVqYbhJ8tLZm8; Hm_lvt_3a1cca3ce707e9424410fa481cbe3375=1667670001; Hm_lpvt_3a1cca3ce707e9424410fa481cbe3375=1667670001; financialunionwechat_session=bSTpVCQCBAt3WFFhnhiC7VidsTow41TyqLo82MwN',//小白
	'twoWelcomeOpenId=oyckUs8niqlF7b6Ftm3gIEvk9YXQ; Hm_lvt_3a1cca3ce707e9424410fa481cbe3375=1667670465; Hm_lpvt_3a1cca3ce707e9424410fa481cbe3375=1667670465; financialunionwechat_session=HJLtyR6iVoO86RPNnpf9fDn4xYCHb3bnhpDldkOj',//001
	'twoWelcomeOpenId=oyckUs0AQb7Eh8jsjII5K_gx8ZjM; Hm_lvt_3a1cca3ce707e9424410fa481cbe3375=1667670777; Hm_lpvt_3a1cca3ce707e9424410fa481cbe3375=1667670777; financialunionwechat_session=M0z2c2riC3Rfb8uSbFM2nEF8ACXoJVIKeJcN4rKS',//002
	'twoWelcomeOpenId=oyckUsyjKd5QCq-qx5RUCT7O1G7A; Hm_lvt_3a1cca3ce707e9424410fa481cbe3375=1667670921; Hm_lpvt_3a1cca3ce707e9424410fa481cbe3375=1667670921; financialunionwechat_session=UaIA5vGoZNgR1Cb5vO8MTxGoNDIF7fZA4SRCwTog',//003
	'twoWelcomeOpenId=oyckUs24KjfNKam0aasTPSl3Qcrk; Hm_lvt_3a1cca3ce707e9424410fa481cbe3375=1667671091; Hm_lpvt_3a1cca3ce707e9424410fa481cbe3375=1667671091; financialunionwechat_session=qnIXVo9x9uMKnL70NVTViGHE1xQcTCNGrCNyV3JK',//004
	'twoWelcomeOpenId=oyckUs0c2ij4Lgh5SO4MBZVbhEtM; Hm_lvt_3a1cca3ce707e9424410fa481cbe3375=1667671926; Hm_lpvt_3a1cca3ce707e9424410fa481cbe3375=1667671926; financialunionwechat_session=vqsHsgLfmtiQXY0lcXPY7bXdzvmm6DLhIo3TDVwV',//005
	'twoWelcomeOpenId=oyckUs93-vNqm-RMVmDBOuvyTtsA; Hm_lvt_3a1cca3ce707e9424410fa481cbe3375=1667672463; Hm_lpvt_3a1cca3ce707e9424410fa481cbe3375=1667672463; financialunionwechat_session=iJ4bguE9IMDTdetFx8dObSzwz2DfDJeRmckRsX1P',//009
	'twoWelcomeOpenId=oyckUsy6EaPVDURMSv6m89ZLGaP8; Hm_lvt_3a1cca3ce707e9424410fa481cbe3375=1667672658; Hm_lpvt_3a1cca3ce707e9424410fa481cbe3375=1667672658; financialunionwechat_session=1mBQKixpUnDEa6F6eyeAZ6Pg157spAhoI4YBHzNp',//010
	'twoWelcomeOpenId=oyckUs4hpxKYPIFczHbH8btmGz10; Hm_lvt_3a1cca3ce707e9424410fa481cbe3375=1667672900; Hm_lpvt_3a1cca3ce707e9424410fa481cbe3375=1667672900; financialunionwechat_session=7sPpTReeuzfqpNp3umOJkN6Ekv6WXgEl0yEWVMef',//01
	'twoWelcomeOpenId=oyckUs3L3zeKCTEyhlWIAIUkBy8w; Hm_lvt_3a1cca3ce707e9424410fa481cbe3375=1667673167; Hm_lpvt_3a1cca3ce707e9424410fa481cbe3375=1667673167; financialunionwechat_session=DqdYbQZHSJdcKXqOD0Y0t5v7v1UY61Nb10ehstcA',//天天快乐
	'twoWelcomeOpenId=oyckUs90C1x2GJztpV5uESKxndMM; Hm_lvt_3a1cca3ce707e9424410fa481cbe3375=1667746819; Hm_lpvt_3a1cca3ce707e9424410fa481cbe3375=1667746819; financialunionwechat_session=GZKoUBeseOqYXr05OHSAlxHOYjSedyfvudHGSmfP',//刘淑芳
];

let num=keys.length;

let zhong=0;

let chou=0;

let isShui=true;

let wujh=0;

let xzCount=1;

let weizhong=0;

!(async () => {
	console.log(getNowFormatDate()+":等待3秒,开始！");
	await $.wait(3000);
	var now=new Date();
	if((now.getHours()==0||now.getHours()==12||now.getHours()==20)&&now.getMinutes()<10){
		//凌晨12点
		xzCount=10;//修改为4次有效答题未中才算无水。
	}
	do{
		console.log(getNowFormatDate()+":总共"+keys.length+"个账号");
		for(var i=0;i<keys.length;i++){
			//var i=0;
			console.log(getNowFormatDate()+":【第"+(i+1)+"个账号】")
			$.cookie=cookies[i];
			$.key=keys[i];
			$.lotterycookie=lotterycookies[i];
			$corrNum=0;
			if(now.getHours()==0&&now.getMinutes()<5){
				//凌晨12点，抽奖之前先进行答题
				do{
					await getQuestion();
					await answerQuestion();
					await $.wait(100);
				}while($corrNum<9)
				await endAsnswer();
				await $.wait(100);
			}
			await lottery();//抽奖----一轮
			if(chou>0&&chou<xzCount&&zhong==0){//抽奖次数小于设置的次数
				//有效抽，小于未中xzCount的限制数量，但未中奖
				console.log(getNowFormatDate()+":第"+chou+"次有效抽---【无水】【未中奖】");
				console.log(getNowFormatDate()+":等待15s");
				await $.wait(20000);//等待三秒
			}else if(chou==xzCount&&zhong==0){
				//有效抽，等于未中xzCount的限制数量 未中奖
				console.log(getNowFormatDate()+":第"+chou+"次有效抽---【无水】【未中奖】【结束】");
				await $.wait(1000);//等待1秒
				isShui=false;
				break;
			}else if(chou==0){
				console.log(getNowFormatDate()+":【无效抽奖】");
				await $.wait(100);
			}else if(chou>0&&zhong>0){
				//有效抽且中奖品
				console.log(getNowFormatDate()+":有效抽---【中奖】");
				await $.wait(3000);//等待3秒
			}
			if(isShui&&weizhong>5){
				//
				console.log(getNowFormatDate()+":有水后连续6次不中【无水】【结束】");
				//无水
				isShui=false;
				break;
			}

			
		}
	}while(isShui&&wujh<keys.length)
	
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

function doTask(){
	

}
function getQuestion(){
	let body={};
	const myRequest = getPostRequest(`https://feb-activity.bestdo.com/index/question.ToDayQuestion/index?key=`+$.key , JSON.stringify(body));
	return new Promise(resolve => {
		$.post(myRequest, (err, resp, data) => {
		  try {
			data = JSON.parse(data);
			$corrNum=data.data.answer_count;
			console.log(getNowFormatDate()+":正确题数："+data.data.answer_count);
			console.log(getNowFormatDate()+":正确答案："+data.data.question.correctc_answer);
			var corr=data.data.question.correctc_answer.split(';');
			$.qid=data.data.question.id;
			
			var a="";
			for(var k=0;k<corr.length;k++){
				if(corr[k]=="A"){
					a+="1";
				}
				if(corr[k]=="B"){
					a+="2";
				}
				if(corr[k]=="C"){
					a+="3";
				}
				if(corr[k]=="D"){
					a+="4";
				}
				if(k<corr.length-1){
					a+=',';
				}
			}
			$.ans=a;
			console.log(getNowFormatDate()+":提交答案："+$.ans);
		  } catch (e) {
			$.logErr(e, resp)
		  } finally {
			resolve();
		  }
		})
    })
	
}
function answerQuestion(){
	let body='qid='+$.qid+'&selected='+$.ans;
	const myRequest = getPostRequest(`https://feb-activity.bestdo.com/index/question.ToDayQuestion/answer_action?key=`+$.key , body);
	return new Promise(resolve => {
		$.post(myRequest, (err, resp, data) => {
		  try {
			//console.log(data);
			data = JSON.parse(data);
			console.log(data.data);
			
		  } catch (e) {
			$.logErr(e, resp)
		  } finally {
			resolve();
		  }
		})
    })
	
}
function endAsnswer(){
	let body={};
	const myRequest = getPostRequest(`https://feb-activity.bestdo.com/index/question.ToDayQuestion/answer_end?key`+$.key , JSON.stringify(body));
	return new Promise(resolve => {
		$.post(myRequest, (err, resp, data) => {
		  try {
			data = JSON.parse(data);
			console.log(data);

			
		  } catch (e) {
			$.logErr(e, resp)
		  } finally {
			resolve();
		  }
		})
    })
	
}

function tolottery(){
	let option = taskurlLottery(`https://financial-union-wechat.bestdo.com/two_welcome/lottery`)
	$.get(option, (err, resp, data) => {
		try {
			if (err) {
				console.log(` API请求失败，请检查网路\n${JSON.stringify(err)}`)
			} else {
				//data = JSON.parse(data)
				//console.log(data);
				console.log(getNowFormatDate()+":进入抽奖页面，保证session不过期");
			}
		} catch (e) {
			reject(`API返回结果解析出错\n${e}\n${JSON.stringify(data)}`)
		} finally {
			//resolve()
		}
	})
	
}


function lottery(){
	let body={};
	const myRequest = getPostRequestFinal(`https://financial-union-wechat.bestdo.com/two_welcome/lottery` , JSON.stringify(body));
	return new Promise(resolve => {
		$.post(myRequest, (err, resp, data) => {
		  try {
			data = JSON.parse(data);
			console.log(data);
			if(data.code==500){
				//次数用完
				wujh++;
				//chou=false;
		
			}else if(data.code==400){
				//未中奖
				wujh=0;
				chou++;
				weizhong++;
			}else{
				//中奖
				wujh=0;
				chou++;
				zhong++;
				weizhong=0;
			}
		  } catch (e) {
			$.logErr(e, resp)
		  } finally {
			resolve();
		  }
		})
    })
	
}

Array.prototype.push2 =function(){
      for(var i=0; i<arguments.length; i++){
        var ele = arguments[i];
        if(this.indexOf(ele) == -1){
            this.push(ele);
        }
    }
};
function getNowFormatDate() {
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
	var millisconds=date.getMilliseconds();
	if(millisconds<10){
		millisconds="00"+millisconds;
	}else if(millisconds>=10&&millisconds<100){
		millisconds="0"+millisconds;
	}
	
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hours + seperator2 + minutes
            + seperator2 + seconds+"."+millisconds;
    return currentdate;
}
function taskurlLottery(url) {
	return {
		'url': url,
		'headers': {
			'Host': 'financial-union-wechat.bestdo.com',
			'Cookie': $.cookie,

			'Connection': 'keep-alive',
			'Upgrade-Insecure-Requests': '1',
			'User-Agent': 'Mozilla/5.0 (Linux; Android 10; YAL-AL10 Build/HUAWEIYAL-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4317 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/916 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/wxpic,image/tpg,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'X-Requested-With': 'com.tencent.mm',
			'Sec-Fetch-Site': 'same-origin',
			'Sec-Fetch-Mode': 'navigate',
			'Sec-Fetch-User': '?1',
			'Sec-Fetch-Dest': 'document',
			'Referer': 'https://financial-union-wechat.bestdo.com/two_welcome/index?openId=oyckUs51Q7pdxsVBZQrylLlt0ilA',
			'Accept-Encoding': 'gzip, deflate',
			'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',

		},
	}
}

function taskurl(url) {
	return {
		'url': url,
		'headers': {
			'Host': 'guangdong-tobacco.ycwemedia.com',
			'Accept-Encoding': 'gzip, deflate, br',
			'Cookie': $.cookie,
			'Connection': 'keep-alive',
			'Accept': '*/*',
			'UserAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
			'Accept-Language': 'zh-cn',
			'Referer': 'https://guangdong-tobacco.ycwemedia.com/guangdong/activity/watermelon/h5/rank.html'
		},
	}
}
function getPostRequest(url, body) {
  const method = `POST`;
  const headers = {
    'Accept-Encoding': `gzip, deflate, br`,
	'Accept': '*/*',
    'Host': `feb-activity.bestdo.com`,
	'X-Requested-With':'XMLHttpRequest',
    'Origin': `https://feb-activity.bestdo.com`,
	'Cookie':$.cookie,
    'Connection': `keep-alive`,
    'Accept-Language': `zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7`,
    "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"),
    'Referer': `https://feb-activity.bestdo.com/index/question.ToDayQuestion/index`
  };
  return {url: url, method: method, headers: headers, body: body};
}
function getPostRequestFinal(url, body) {
  const method = `POST`;
  const headers = {
    'Accept-Encoding': `gzip, deflate, br`,
	'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Host': `financial-union-wechat.bestdo.com`,
	'X-Requested-With':'XMLHttpRequest',
    'Origin': `https://financial-union-wechat.bestdo.com`,
    'Connection': `keep-alive`,
	'Cookie':$.lotterycookie,
    'Accept-Language': `zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7`,
    "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"),
    'Referer': `https://financial-union-wechat.bestdo.com/plenary/playLottery`
  };
  return {url: url, method: method, headers: headers, body: body};
}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
