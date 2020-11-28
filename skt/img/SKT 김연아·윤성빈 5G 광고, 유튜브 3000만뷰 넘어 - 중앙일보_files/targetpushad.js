/**
*@desc notice.js => targetpushad.js 변경
*add load ext 
*@date 2020.04.23 상품별 스크립트 분기처리 by J
*@date 2020.04.29 동영상 템플릿 추가 by pd jung
*@date 2020.05.06 전환파라미터 추가 by pd J
*@date 2020.06.05 모바일 롤링배너 by pd jung
*@date 2020.10.12 모바일 통합 by pd J
*@date 2020.11.04 모바일 스조 바로띄우기 by pd J
*@date 2020.11.26 모바일 리치미디어 추가 by pd J
*/
if(typeof adtive_targetpush_ad == 'undefined') {
	var adtive_targetpush_ad = {
		//매체코드 
		zcode : '',	
		//영역코드 
		mcode : '',
		cdn_url:'//cdn.targetpush.co.kr',
		log_url:'https://log.targetpush.co.kr',
		show_num:0,
		mz_type:1,
		//광고 노출 시작 
		start : function(mcode, zcode) {
			var apdcscript = document.createElement('script'); 
			apdcscript.src = adtive_targetpush_ad.log_url+'/adinfo/getovenjson.php?jsoncallback=jsonp_call';
			document.getElementsByTagName('head')[0].appendChild(apdcscript);		
			jsonp_call = function(data) {
				var denyAD = data.tpdenyAD;		
				if(denyAD==1) return;
				
				//크롬이면 return;
				var userAgent = window.navigator.userAgent;
				var isChrome = userAgent.indexOf('Chrome');
				var isChromeMobile = userAgent.indexOf('CriOS');
				var isInapp = userAgent.indexOf('inapp');
				var isSamsung = userAgent.indexOf('SamsungBrowser');
				var isDaumApps = userAgent.indexOf('DaumApps');
				var isEdge = userAgent.indexOf('Edge');
				var isWhale = userAgent.indexOf('Whale');
				// get JSON with using pure javascript
				var xhr = new XMLHttpRequest();
				var paramVal = "paramVal";
				var cp_type = (adtive_targetpush_ad.isMobile() == true) ? '3': '1';
				var target = adtive_targetpush_ad.log_url+"/maker.php";//영역정보,캠페인정보 끌어오기
				xhr.open("GET", target + "?zcode="+zcode+"&mcode="+mcode+"&paramName=" + paramVal+"&cp_type="+cp_type, true);
				xhr.send();
				xhr.onreadystatechange = function() {
					if (xhr.readyState === XMLHttpRequest.DONE) {
						if (xhr.status == 200 && adtive_targetpush_ad.show_num==0) {
							var loadedJSON = JSON.parse(xhr.responseText);
							var browser = (adtive_targetpush_ad.isMobile() == true) ? 'm': 'w';
							if(loadedJSON.zone.mz_type!= 1) adtive_targetpush_ad.mz_type=3;
							if(loadedJSON.zone.device != browser) return;

							adtive_targetpush_ad.jdata = loadedJSON;

							var zone = adtive_targetpush_ad.jdata.zone;
							var zpb = adtive_targetpush_ad.jdata.zpb;					
							adtive_targetpush_ad.mcode = mcode;
							adtive_targetpush_ad.zcode = zcode;
							if(zone.chrome_limit == 'y' && (isChrome > -1 || isChromeMobile > -1) 
					&& isInapp < 0 && isSamsung < 0 && isDaumApps < 0 && isEdge < 0 && isWhale < 0) return;
							var script_name= (cp_type == 1) ? 'targetpushad_w' : 'targetpushad_m';
							if(zone.adpx_code) {
								var exp_adpx_code = zone.adpx_code.replace(/'/gi, '').split(',');
								if(!exp_adpx_code[0] || !exp_adpx_code[1]) {
									console.log('code error');
									return;
								}
								var adpx_mcode=exp_adpx_code[0].replace(/^\s+|\s+$/g,"");
								var adpx_zcode=exp_adpx_code[1].replace(/^\s+|\s+$/g,"");
								if(adpx_mcode && adpx_zcode) {
									//영역생성
									var zone_html='<div id="_2BEON'+adpx_zcode+'"></div>';
									document.body.insertAdjacentHTML('beforeend', zone_html);
									var targetpush_script=adtive_targetpush_ad.script('js',adtive_targetpush_ad.cdn_url+'/js/'+script_name+'.js?ver=202011261516');
									adtive_targetpush_ad.show_num++;							
									if(typeof adtiveDrawAD==='undefined'){
										var adpx_script=adtive_targetpush_ad.script('js','//plugin.adplex.co.kr/script/2beonAdScript.js');
										adpx_script.onload = function() {
											adtiveDrawAD(adpx_mcode,adpx_zcode,{jsDoc : function(){
												(browser == 'w') ? adtive_targetpush_pc.start(mcode,zcode) : adtive_targetpush_m.start(mcode,zcode) ;
											}});
										}
									} else {
										adtiveDrawAD(adpx_mcode,adpx_zcode,{jsDoc : function(){
												(browser == 'w') ? adtive_targetpush_pc.start(mcode,zcode) : adtive_targetpush_m.start(mcode,zcode) ;
										}});
									}
								} else {
									console.log('code error');
									return;
								}
							} else {
								adtive_targetpush_ad.show_num++;
								var targetpush_script=adtive_targetpush_ad.script('js',adtive_targetpush_ad.cdn_url+'/js/'+script_name+'.js?ver=202011261516');
								targetpush_script.onload = function() {
									(browser == 'w') ? adtive_targetpush_pc.start(mcode,zcode) : adtive_targetpush_m.start(mcode,zcode) ;
									//adtive_targetpush_pc.start(mcode,zcode);
									/* 20201013 기존 패스백 주석처리
									var ad_call = (browser == 'w') ? adtive_targetpush_pc.start(mcode,zcode) : adtive_targetpush_m.start(mcode,zcode) ;
									//start : passback 
									if(ad_call===false){
										if(zpb !==undefined){
											//adtive_targetpush_ad.script('js',adtive_targetpush_ad.cdn_url+'/js/bluebird.min.js');											
											adtive_targetpush_ad.script('js',adtive_targetpush_ad.cdn_url+'/js/'+script_name+'pb.js?ver=1.99');	
										}
									}//end passback
									*/
								}
							}
						} else {
							console.log("fail to load");
						}
					}
				}
			}
		},
		banner_pool : function(){
			adtive_targetpush_pc.campaign_arr = adtive_targetpush_ad.jdata.campaign;
			if(adtive_targetpush_pc.campaign_arr.length == 0) return;
			for (var i = 0; i < adtive_targetpush_ad.jdata.campaign.length; i++) {
				adtive_targetpush_pc.weight_arr[i] = adtive_targetpush_ad.jdata.campaign[i].cpn_rate;
			}			
			adtive_targetpush_pc.ad_start();
			var open_top_position = (zone.scroll_px > 0) ? zone.scroll_px : window.innerHeight;
			if(zone.view_trem == 3 && zone.selector.indexOf('.') > -1) {
				var className=zone.selector.replace(".","");
				if(document.getElementsByClassName(className)[0]) open_top_position = document.getElementsByClassName(className)[0].offsetTop - (window.innerHeight/3) - 50;
			} else if (zone.view_trem == 3 && zone.selector.indexOf('#') > -1) {
				var IdName=zone.selector.replace("#","");
				if(document.getElementById(IdName)) open_top_position = document.getElementById(IdName).offsetTop - (window.innerHeight/3) - 50;
			}
			adtive_targetpush_pc.common_make_banner(open_top_position);
			console.log('banner_pool');	
		},		
		script : function (type, url) {
			if(type == 'js') {
				var scriptRef = document.createElement('script'); 
				scriptRef.setAttribute('src',url);
				document.head.appendChild(scriptRef); 
				return scriptRef;
			}
		},
		isMobile : function () {			
			return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
			//return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('Mobile') !== -1);
		},
		getCookie : function(name) {
			var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
			return value ? value[2] : null;
		}
	};
	//M통합,,기존 매체들이 남아있어서 유지
	var adtive_targetpush_ad_noti = {
		//매체코드 
		zcode : '',	
		//영역코드 
		mcode : '',
		cdn_url:'//cdn.targetpush.co.kr',
		log_url:'https://log.targetpush.co.kr',
		show_num:0,
		mz_type:1,
		//광고 노출 시작 
		start : function(mcode, zcode) {
			adtive_targetpush_ad.start(mcode, zcode);
		},
		script : function (type, url) {
			if(type == 'js') {
				var scriptRef = document.createElement('script'); 
				scriptRef.setAttribute('src',url);
				document.head.appendChild(scriptRef); 
				return scriptRef;
			}
		},
		isMobile : function () {
			return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
		    //return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('Mobile') !== -1);
		}
	};
}