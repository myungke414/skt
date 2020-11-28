/**
*@desc targetpush_ad new file 
*@date 2020.11.13
*/

"use strict";

if(typeof adtive_targetpush_pc == 'undefined') {
	var adtive_targetpush_pc = {	
		cdn_img: "//cdn.targetpush.co.kr",
		// 노출 비율 
		weight_arr : new Array(),	
		// 배너타입 b - black  ,y-yellow
		btype : [ "y" ],
		campaign_arr: new Array(),
		// 중복 노출하기 위해 스크롤 닫았을 때 위치 저장. 
		close_num :0 ,
		close_pos :0 ,
		close_check : true,
		template : 'A', // 템플릿추가 
		// 통계용 코드 값.
		code : {
			idx : "t0",
			mcode : "t1",
			zcode : "t2",
			ad_type : "t3",
			cpno : "t4",
			banner_type : "t5",
			matno: "t6",
			cpkind: "t7",
			close_yn : "n"		
		},
		//배너 토출 체크
		banner_check : false,
		// 마우스 오버 한번만 되게 체크
		targetpushAd_pc_cnt : 0,
		//매체코드 
		zcode : '',
		//영역코드 
		mcode : '',
		//노출타입
		show_type : 'y',
		//효과에따른 노출
		show_flag : false,
		pre_cate : new Array(), //이전 카테고리 번호 
		pre_camp : new Array(), //이전 캠페인 번호 
		qr_yn : false, // qr 코드 캠페인인지 체크 
		show_pbno : '',
		
		getCampaign : function(kind) {
			var list = adtive_targetpush_pc.campaign_arr;
			var weight = adtive_targetpush_pc.weight_arr;
			if(list.length <= 1) {
				console.log('리스트가  없습니다.');
				return 0;
			}
			var k=-1;
			var r;
			var n;
			var c;
			var p;
			var f;
			//같은그룹제외 캠페인 pick
			var arr_camp = new Array();
			var arr_weight = new Array();
			var pre_arr = (kind == 'gr') ? adtive_targetpush_pc.pre_cate : adtive_targetpush_pc.pre_camp;

			for (var i = 0; i < list.length; i++) {
				p = (kind == 'gr') ? list[i].ccno : i;
				if(pre_arr.length>0) {
					f=true;	
					for(var j=0; j<pre_arr.length;j++) {
						if(pre_arr[j] == p) {
							f=false;
							break;
						}
					}
					if(f == true) {
						arr_camp.push(list[i]);
						arr_weight.push(list[i].cpn_rate);
					}
				} else {
					arr_camp.push(list[i]);
					arr_weight.push(list[i].cpn_rate);
				}
			}
			if(arr_camp.length > 0) {
				r=adtive_targetpush_pc.getRandomItem(arr_camp, arr_weight);
				for(var j=0; j < list.length; j++)
				{
					if(arr_camp[r].cpno == list[j].cpno)
					{
						k = j;
						break;
					}
				}
				c=arr_camp[r].ccno;
			} else {
				if(kind == 'cp') {
					adtive_targetpush_pc.pre_camp.splice(0,list.length-1);
					return list.length-1;
				} else {
					return -1;
				}
			}

			if(k>-1) {
				if(adtive_targetpush_pc.pre_cate.indexOf(c) === -1) adtive_targetpush_pc.pre_cate.push(c);
				if(adtive_targetpush_pc.pre_camp.indexOf(k) === -1) adtive_targetpush_pc.pre_camp.push(k);
				return k;
			}
		},
		getRandomItem : function(list, weight) {
			var total_weight = weight.reduce(function(prev, cur, i, arr) {
				return Number(prev) + Number(cur);
			});
			var random_num = adtive_targetpush_pc.rand(1, total_weight);
			var weight_sub = total_weight;
			var k;
			for (var i = 0; i < list.length; i++) {
				if (random_num <= weight_sub && random_num > weight_sub - weight[i]) {
					k=i;
					break;
				}
				weight_sub -= weight[i];
			}
			return k;
			// end of function
		},
		set_ad_type : function () {
			var data=[];
			var camp_idx = adtive_targetpush_pc.getCampaign('gr');
			if(camp_idx == -1) camp_idx = adtive_targetpush_pc.getCampaign('cp');

			data['idx']=camp_idx;
			data['camp'] = adtive_targetpush_pc.campaign_arr[camp_idx];
			data['banner_idx'] = Math.floor(Math.random() * adtive_targetpush_pc.btype.length);
			return data;

		},
		check_url : function(url) {
			url = url.replace(/ /gi, "");
			var t_code = adtive_targetpush_pc.code;
			var url2='';
			if (url.indexOf('=') > -1) {
				url2=url+'&';
			} else if (url.indexOf('?') > -1) {
				url2=url;
			} else {
				url2=url+'?';
			}

			//파라미터 붙이기
			var code_param = "mcode=" + t_code.mcode
					+ "&zcode=" + t_code.zcode + "&btype="
					+ t_code.ad_type + "&cpno=" + t_code.cpno + "&matno=" + t_code.matno+ "&btno=0&cpkind=" + t_code.cpkind;
					
			var adpx_be_cd='noticeW_'+t_code.mcode+'-'+t_code.zcode+'_'+t_code.cpno+'_'+t_code.matno;
			url2=url2.replace('{be_cd}',adpx_be_cd);//자동변환

			var param_2beon = '&adpx_be_cd=tp'+t_code.mcode+'_'+t_code.zcode+'_'+t_code.cpno+'_'+t_code.matno;
			return url2+code_param+param_2beon;
		},
		rand : function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		//광고 노출 시작 
		start : function(mcode, zcode) {
			if(!mcode || !zcode) return;
			var zone = adtive_targetpush_ad.jdata.zone;

			if(zone.mz_type != 1) return;
			adtive_targetpush_pc.sheet();

			if(zone.status != 'y' && zone.status != '' && zone.status != undefined) {
				return false;
			}

			adtive_targetpush_pc.campaign_arr = adtive_targetpush_ad.jdata.campaign;
			if(adtive_targetpush_pc.campaign_arr.length == 0) return;
			for (var i = 0; i < adtive_targetpush_ad.jdata.campaign.length; i++) {
				adtive_targetpush_pc.weight_arr[i] = adtive_targetpush_ad.jdata.campaign[i].cpn_rate;
			}

			// 유저 노출 제한. 
			if (zone.user_vlimit == 'y') {
				//쿠키 있는지 확인
				var cookie_name = 'adtive_' + mcode + '_' + zcode;
				var cookie_ck = adtive_targetpush_pc.getCookie(cookie_name);
				var user_vterm = (zone.user_vterm != undefined )?zone.user_vterm:60;				
				//설정된 쿠키가 없으면,
				if (cookie_ck == null) {
					adtive_targetpush_pc.setCookie(cookie_name, 'y', user_vterm);
				} else {
					//노출제한시 패스백에따라 실행
					var zpb = adtive_targetpush_ad.jdata.zpb;			
					if(zpb !==undefined){						
						adtive_targetpush_pc.common_make_banner(0);
						var targetpush_script=adtive_targetpush_ad.script('js',adtive_targetpush_ad.cdn_url+'/js/targetpushad_wpb.js?ver=201124');
						targetpush_script.onload = function() {
							adtive_targetpush_pc.show_passback(zpb);
						}	
					}
					return false;
				}
			}

			//노출할지말지..
			var show_yn='y';
			if(zone.view_per < 100) {
			var show_opt=['y','n'];
				show_yn=show_opt[adtive_targetpush_pc.getRandomItem(show_opt, [zone.view_per, 100-zone.view_per])];
			if(show_yn == 'n') return;
			}
			
			// 해상도 제한
			if(zone.mz_cond_json && zone.mz_cond_json.mz_display_w) {
				if(window.innerWidth<zone.mz_cond_json.mz_display_w) {
					//console.log('해상도 낮음 ');
					return false;
				}
			}
			//노출조건
			if(zone.view_trem == 0) {
				//console.log(adtive_targetpush_pc.banner_check);
				if(adtive_targetpush_pc.banner_check != true) {
					adtive_targetpush_pc.ad_start();
					adtive_targetpush_pc.common_make_banner(0);
				}
			} else if(zone.view_trem == 1) {
				if(adtive_targetpush_pc.banner_check != true) {
					setTimeout(function(){
						adtive_targetpush_pc.ad_start();
						//var open_top_position = window.innerHeight;
						adtive_targetpush_pc.common_make_banner(0);
					}, 2000);
				}
			} else {
				//var open_top_position = (zone.scroll_px) ? zone.scroll_px : 0;
				var open_top_position = (zone.scroll_px > 0) ? zone.scroll_px : window.innerHeight;
				if(zone.view_trem == 3 && zone.selector.indexOf('.') > -1) {
					var className=zone.selector.replace(".","");
					if(document.getElementsByClassName(className)[0]) open_top_position = document.getElementsByClassName(className)[0].offsetTop - (window.innerHeight/3) - 50;
					//console.log(open_top_position);

				} else if (zone.view_trem == 3 && zone.selector.indexOf('#') > -1) {
					var IdName=zone.selector.replace("#","");
					if(document.getElementById(IdName)) open_top_position = document.getElementById(IdName).offsetTop - (window.innerHeight/3) - 50;

				}
				adtive_targetpush_pc.common_make_banner(open_top_position);
			}
		},
		common_make_banner : function(open_top_position) {
			var agent = adtive_targetpush_pc.get_browser();
			var limit_top=0;
			var limitClassName='';
			var limit_obj='';
			var mcode = adtive_targetpush_ad.mcode;
			var zone = adtive_targetpush_ad.jdata.zone;
			var view_trem = zone.view_trem;
			var cond_json = zone.mz_cond_json;

			//바이라인 위로는 안보이도록 조절
			if(cond_json && (cond_json.byline_obj || cond_json.byline_height)) {
				var _bylineObj = cond_json.byline_obj;
				var _bylineHeight = Number(cond_json.byline_height);
				if (_bylineObj.indexOf('.') > -1) {
					limit_obj = document.getElementsByClassName(_bylineObj.replace(".",""))[0];
				} else if(_bylineObj.indexOf('#') > -1) {
					limit_obj = document.getElementById(_bylineObj.replace("#",""));
				}
				if(limit_obj) {
					limit_top = limit_obj.getBoundingClientRect().height+limit_obj.offsetTop-300 +(_bylineHeight);
					//limit_top = limit_obj.offsetTop - (window.innerHeight/3) - 50 +(_bylineHeight);
				} else {
					if(_bylineHeight == 999) limit_top = (zone.scroll_px > 0) ? zone.scroll_px : window.innerHeight;
					if(_bylineHeight != 999) limit_top = _bylineHeight;
				}
			}
			//매체 예외처리
			if(view_trem == 4) open_top_position = limit_top;
			
			var isScrolling;
			var show_type;
			var scrollpos;
			var first_open=true;
			var tmp_wrap='targetpushAd_banner_wrap';
			if (adtive_targetpush_pc.template =='B') tmp_wrap='adtive_pushCam_fix';
			window.addEventListener('scroll', function() {
				show_type = adtive_targetpush_pc.show_type;
				if(show_type == 'y') {
					scrollpos = this.scrollY || this.pageYOffset;
					if ((document.body.scrollTop > open_top_position || document.documentElement.scrollTop > open_top_position || scrollpos > open_top_position)
							&& adtive_targetpush_pc.banner_check != true && view_trem > 1) {
						adtive_targetpush_pc.ad_start();
					}
					
					// 연합뉴스 
					if (adtive_targetpush_ad.zcode=='U1LLLLLF') {
						var _scrollTop = window.scrollY || document.documentElement.scrollTop;
	
						var body = document.body;
						var html = document.documentElement; 
						var _bodyH = Math.max(body.scrollHeight, body.offsetHeight, body.getBoundingClientRect().height, html.clientHeight, html.scrollHeight, html.offsetHeight);
						
						if (document.getElementById("targetpushAd_banner_wrap") != null ) {
							if(_bodyH- _scrollTop - window.innerHeight < 900 || limit_top>=scrollpos) {
								if(adtive_targetpush_pc.show_flag == false) {
									// 안보이게 
									adtive_targetpush_pc.show_flag=true;
									if(_bodyH- _scrollTop - window.innerHeight < 900) document.getElementById("targetpushAd_banner_wrap").className=tmp_wrap+" targetpushAd-fadeOut-exc";
									if(limit_top>=scrollpos) document.getElementById("targetpushAd_banner_wrap").className=tmp_wrap+" targetpushAd-down-exc";
								}
							} else {
								if(adtive_targetpush_pc.show_flag == true) {
									adtive_targetpush_pc.show_flag=false;
									document.getElementById("targetpushAd_banner_wrap").className=tmp_wrap+" targetpushAd-up-exc";
								}
							}
						}
					// 연합뉴스 
					} else {
						//제한높이 위로는 미노출
						if(first_open==false && limit_top>=scrollpos) {
							adtive_targetpush_pc.slide_down();
						//스크롤시 애니메이션 없음..
						} else if (cond_json && cond_json.mz_animation == 1) {
							if(limit_top>=scrollpos) first_open = false;
							adtive_targetpush_pc.slide_up();
						//스크롤시 up-down
						} else {
							//스크롤 up 했을경우
							if(this.oldScroll > scrollpos) {
								if(limit_top>=scrollpos) first_open = false;
								adtive_targetpush_pc.slide_down();
							//스크롤 down 했을경우
							} else {
								adtive_targetpush_pc.slide_up();
							}
							this.oldScroll = scrollpos;
						}
					}
				}
			});
		},
		get_browser : function() {
			if ( navigator.userAgent.indexOf("Edge") > -1 && navigator.appVersion.indexOf('Edge') > -1 ) {
				return 'Edge';
			}
			else if( navigator.userAgent.indexOf("Opera") != -1 || navigator.userAgent.indexOf('OPR') != -1 )
			{
				return 'Opera';
			}
			else if( navigator.userAgent.indexOf("Chrome") != -1 )
			{
				return 'Chrome';
			}
			else if( navigator.userAgent.indexOf("Safari") != -1)
			{
				return 'Safari';
			}
			else if( navigator.userAgent.indexOf("Firefox") != -1 ) 
			{
				return 'Firefox';
			}
			else if( ( navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true ) ) //IF IE > 10
			{
				return 'IE';
			}  
			else 
			{
				return 'unknown';
			}
		},
		show_banner : function() {
			
			var redo_num = adtive_targetpush_ad.jdata.zone.redo_num;
			if(redo_num+1 <= adtive_targetpush_pc.close_num) return -1;
			adtive_targetpush_pc.close_num ++;
			var banner_type = adtive_targetpush_pc.set_ad_type();
			var camp_idx=banner_type['idx'];
			var camp=banner_type['camp'];
			var banner_idx=banner_type['banner_idx'];

			var matno = 0;
			var b_matno_arr = camp.arr_mtno.split('|');
			var b_mat_idx = Math.floor(Math.random() * b_matno_arr.length);
			var ad_type = String.fromCharCode(65+b_mat_idx);
			matno = b_matno_arr[b_mat_idx];
			adtive_targetpush_pc.code = {
				idx : camp_idx,
				mcode : adtive_targetpush_ad.mcode,
				zcode : adtive_targetpush_ad.zcode,
				ad_type : ad_type,
				matno : matno,
				cpno : camp.cpno,
				cpkind : camp.cpn_kind,
				close_yn : adtive_targetpush_pc.code.close_yn
			};
			adtive_targetpush_pc.banner_view('type' + banner_idx, camp);
		},
		
		//start banner
		ad_start : function() {
			adtive_targetpush_pc.banner_check = true;
			
			var zone = adtive_targetpush_ad.jdata.zone;
			if(adtive_targetpush_pc.campaign_arr.length == 0) return;
			var browser = (adtive_targetpush_ad.isMobile() == true) ? 'm': 'w';
			if(browser != 'w') return;
			var rs = adtive_targetpush_pc.show_banner();
			if(rs == -1) return;

			//경향신문 예외처리 
			if( adtive_targetpush_ad.zcode =='YALLLLLF' && window.innerWidth < 1600 && adtive_targetpush_pc.template =='B' ) {
				return;
			}
			
			if(adtive_targetpush_pc.template=='B') {
				// targetpushAd_banner_wrap
				var obj = document.getElementById("targetpushAd_banner_wrap");
				obj.style.display="block";
				
			}
			if (adtive_targetpush_pc.code.close_yn == "n") {
				adtive_targetpush_pc.log('0', 'v');
			}
			var ad_obj = document.getElementById("targetpushAd_pc_wrap");
			var name = "run";
			var arr = ad_obj.className.split(" ");
			if (arr.indexOf(name) == -1) {
				ad_obj.className += " " + name;
			}
			
			var ad_obj = document.getElementById("targetpushAd_banner_wrap");
			var close_obj = document.getElementById("targetpushAd_pc_wrap_close");
			var close_obj_2 = document.getElementById("targetpushAd_pc_wrap_close_2");
			ad_obj.onmouseover = function() {

				close_obj.style.display="block";
				close_obj_2.style.display="block";
			};
			
			ad_obj.onmouseout = function() {
				close_obj.onmouseover = function() {
				close_obj.style.display="block";
				}
				
				close_obj_2.style.display="none";
				close_obj_2.onmouseover = function() {
				close_obj_2.style.display="block";
				}
				
			};
		},
		// 스크롤에따른 배너 노출/미노출 (업-다운) 컨트롤 (내부)
		slide_up:function() {
			var bannerObj=document.getElementById("targetpushAd_banner_wrap");
			if(bannerObj && adtive_targetpush_pc.show_flag == true) {
				var template = adtive_targetpush_pc.template;
				var tmp_wrap='targetpushAd_banner_wrap';
				if (template =='B') {
					tmp_wrap='adtive_pushCam_fix';
				}
				bannerObj.className=tmp_wrap +" targetpushAd-animate-up";
				adtive_targetpush_pc.show_flag=false;
			}
		},
		slide_down:function() {
			var bannerObj=document.getElementById("targetpushAd_banner_wrap");	
			if(bannerObj && adtive_targetpush_pc.show_flag == false) {
				var template = adtive_targetpush_pc.template;
				var tmp_wrap='targetpushAd_banner_wrap';
				if (template =='B') {
					tmp_wrap='adtive_pushCam_fix';
				}
				bannerObj.className=tmp_wrap+" targetpushAd-animate-down";
				adtive_targetpush_pc.show_flag=true;
			}
		},
		// 배너 노출/미노출(업-다운) 컨트롤 (외부)
		tpAD_show:function() {
			if(adtive_targetpush_pc.campaign_arr.length == 0) return;
			var zone = adtive_targetpush_ad.jdata.zone;
			var bannerObj=document.getElementById("targetpushAd_banner_wrap");
			if(!bannerObj) return false;
			adtive_targetpush_pc.show_type = 'y';
			var className = bannerObj.className;
			className = className.replace(" targetpushAd-animate-down", "").replace(" targetpushAd-animate-up", "");
			bannerObj.className= className + " targetpushAd-animate-up";
		},
		tpAD_hide:function() {
			if(adtive_targetpush_pc.campaign_arr.length == 0) return;
			var zone = adtive_targetpush_ad.jdata.zone;
			var bannerObj=document.getElementById("targetpushAd_banner_wrap");
			if(!bannerObj) return false;
			adtive_targetpush_pc.show_type = 'n';
			var className = bannerObj.className;
			//console.log(className);
			className = className.replace(" targetpushAd-animate-down", "").replace(" targetpushAd-animate-up", "");
			bannerObj.className= className + " targetpushAd-animate-down";
		},
		// btno 버튼번호 - 소재전체클릭 0, 첫번째  버튼 클릭 1 , 두번째  버튼 클릭 2  , kind - v clk  
		log : function( btno, kind ) {
			var t_code = adtive_targetpush_pc.code;
			var dt = new Date();
			var dtt = dt.getTime();
			var _Img = new Image();
			var r_num = Math.floor(Math.random() * 1000000000);
			var dup_no=adtive_targetpush_pc.close_num; // 1차 노출 1 , 2차 노출 2
			_Img.src = adtive_targetpush_ad.log_url + "/wlog.php?mcode=" + t_code.mcode
					+ "&zcode=" + t_code.zcode + "&type=" + t_code.ad_type + "&cpno="
					+ t_code.cpno + "&kind=" + kind + "&matno=" + t_code.matno + "&btno=" + btno +"&cpkind=" + t_code.cpkind + "&time=" + r_num + "&dup_no="+dup_no;
		},
		pblog : function( pbno ) {
			var _Img = new Image();
			var r_num = Math.floor(Math.random() * 1000000000);
			var dup_no=adtive_targetpush_pc.close_num; // 1차 노출 1 , 2차 노출 2
			_Img.src = adtive_targetpush_ad.log_url + "/pblog.php?mcode=" + adtive_targetpush_ad.mcode+ "&zcode=" + adtive_targetpush_ad.zcode 
			+ "&pbno=" + pbno+  "&time=" + r_num + "&dup_no="+dup_no;
		},		
		clk_landing : function (no) {
			var zone = adtive_targetpush_ad.jdata.zone;
			var scr_href = '';
			if(zone.mz_url) scr_href = adtive_targetpush_pc.check_url(zone.mz_url);
			 
			adtive_targetpush_pc.log(no,'clk');
			setTimeout(function(){ 
				if(scr_href) top.location.href = scr_href;
			},1000);
		},
		// css 
		sheet : function() {
			var zone=adtive_targetpush_ad.jdata.zone;
			// Create the <style> tag
			var css = document.createElement("style");
			// Add a media (and/or media query) here if you'd like!
			// css.setAttribute("keyframes", "screen")
			// css.setAttribute("media", "only screen and (max-width : 1024px)")
			var styles = '.targetpushAd_pc_wrap {margin:0;padding:0;-webkit-tap-highlight-color:rgba(0,0,0,0);z-index:999999998;}';
			styles += '.targetpushAd_pc_wrap div, .targetpushAd_pc_wrap dl, .targetpushAd_pc_wrap dt, .targetpushAd_pc_wrap dd, .targetpushAd_pc_wrap ul, .targetpushAd_pc_wrap ol, .targetpushAd_pc_wrap li, .targetpushAd_pc_wrap h1, .targetpushAd_pc_wrap h2, .targetpushAd_pc_wrap h3, .targetpushAd_pc_wrap h4, .targetpushAd_pc_wrap h5, .targetpushAd_pc_wrap h6, .targetpushAd_pc_wrap pre, .targetpushAd_pc_wrap form, .targetpushAd_pc_wrap fieldset, .targetpushAd_pc_wrap input, .targetpushAd_pc_wrap p, .targetpushAd_pc_wrap blockquote, .targetpushAd_pc_wrap table, .targetpushAd_pc_wrap th, .targetpushAd_pc_wrap td, .targetpushAd_pc_wrap embed, .targetpushAd_pc_wrap object, .targetpushAd_pc_wrap textarea, .targetpushAd_pc_wrap a, .targetpushAd_pc_wrap img{padding:0;margin:0;}';
			styles += '.targetpushAd_pc_wrap ol, .targetpushAd_pc_wrap ul, .targetpushAd_pc_wrap li{list-style:none;display:block;}';
			styles += '.targetpushAd_pc_wrap div{display:block;}';
			styles += '.targetpushAd_pc_wrap img{border:0;vertical-align:top;}';
			styles += '.targetpushAd_pc_wrap{display:none;}';		
			styles += '.targetpushAd_pc_wrap.run{display:block;}';
			styles += '.targetpushAd_pc_wrap.run ul{list-style-type:none;margin:0;padding:0;}';		
			styles += '.targetpushAd_pc_wrap.run .targetpushAd_banner_wrap{width:320px;position:fixed;z-index:999999998;height:auto;}';		
			styles += '.targetpushAd_pc_wrap.run .targetpushAd_banner_wrap img{width:100%;}';
			
			var close_btn = 'x_bt2.png';
			if(adtive_targetpush_ad.mcode == 'C4444448') close_btn = 'x_bt.png';
			var closeBtn_top = '25px';
			var closeBtn_right = '22px';
			var closeBtn_width = '18px';
			var closeBtn_height = '18px';
			if(adtive_targetpush_ad.mcode == 'S7444448') {
				close_btn= 'x_bt3.png';
				closeBtn_top = '23px';
				closeBtn_right = '28px';
				closeBtn_width = '30px';
				closeBtn_height = '30px';
			}
			styles += '.targetpushAd_pc_wrap.run .targetpushAd_banner_wrap .btn_close{display:block;position:absolute;top:'+closeBtn_top+';right:'+closeBtn_right+';width:'+closeBtn_width+';height:'+closeBtn_height+';text-indent:-9999em;background: url('+adtive_targetpush_pc.cdn_img+'/upload/images/'+close_btn+') center center no-repeat;}';
			styles += '.targetpushAd_pc_wrap.run .targetpushAd_banner_wrap .btn_close_2{display:none;position:absolute;top:1px;right:1px;width:19px;height:19px;text-indent:-9999em;background:#FFF url('+adtive_targetpush_pc.cdn_img+'/upload/images/infor_ad_icon.png) center center no-repeat;}';
			
			styles += '.targetpushAd_pc_wrap.run .targetpushAd_banner_wrap,.targetpushAd_pc_wrap.run .targetpushAd_banner_wrap a,.targetpushAd_pc_wrap.run .targetpushAd_banner_wrap a:after{box-sizing:initial;}';
			styles += '.targetpushAd_pc_wrap .targetpushAd_banner_wrap{bottom:0;}';
			styles += '.targetpushAd_pc_wrap_a{display:block;}';
			styles += '.targetpushAd_pc_wrap .targetpushAd_banner_wrap:hover{cursor:pointer;}';
			styles += '.targetpushAd_pc_wrap.type1.run .targetpushAd_banner_wrap{animation:type1 0.5s ease-in-out;}';
			styles += '.targetpushAd_pc_wrap.type2.run .targetpushAd_banner_wrap{animation:type2 0.5s ease-in-out;}';
			styles += '@keyframes type1 {0%{bottom:-120px;}100%{bottom:0;}}';
			styles += '@keyframes type2 {0%{bottom:-132px;}100%{bottom:0;}}';

			styles += '.targetpushAd-animate-up{animation:animateup 1s}@keyframes animateup{from{bottom:-350px;opacity:0} to{bottom:0;opacity:1;}}';
			
			

			styles += '.targetpushAd-animate-down{animation:animatedown 1s;animation-fill-mode: both;-webkit-animation-fill-mode: both;}@keyframes animatedown{from{bottom:0;opacity:1} to{bottom:-350px;opacity:0}}';
			styles += " .targetpushAd_pc_wrap.wrap_new .targetpushAd_pc_wrap.wrap_new .targetpushAd_banner_wrap, .targetpushAd_pc_wrap.wrap_new .targetpushAd_banner_wrap a, .targetpushAd_pc_wrap.wrap_new .targetpushAd_banner_wrap a:after, .targetpushAd_pc_wrap.wrap_new .banner_header, .targetpushAd_pc_wrap.wrap_new .banner_content, .targetpushAd_pc_wrap.wrap_new .ico_wrap_new {box-sizing:border-box;}";
			var width_ba='328px;';
			//경향신문의 경우 광고크기 해상도 1600 이하에서 200PX로 
			if( adtive_targetpush_ad.zcode =='YALLLLLF' && window.innerWidth < 1600  ) width_ba='200px;';
			
			if(adtive_targetpush_ad.zcode != 'RKLLLLLF') {
				styles += " .targetpushAd_pc_wrap.wrap_new .targetpushAd_banner_wrap {position:fixed;   z-index:999999998; ";
				styles += " width:"+width_ba+"; height:246px; right:50px; border-radius:17px; ";
				styles += "font-family: 'Noto Sans KR', sans-serif;} ";
			}

			
			//템플릿추가 
			/* 190806 adtive_pushCam_fix */
			styles += " .adtive_pushCam_fix, .adtive_pushCam_fix div, .adtive_pushCam_fix dl, .adtive_pushCam_fix dt, .adtive_pushCam_fix dd, .adtive_pushCam_fix ul, .adtive_pushCam_fix ol, .adtive_pushCam_fix li, .adtive_pushCam_fix h1, .adtive_pushCam_fix h2, .adtive_pushCam_fix h3, .adtive_pushCam_fix h4, .adtive_pushCam_fix h5, .adtive_pushCam_fix h6, .adtive_pushCam_fix pre, .adtive_pushCam_fix form, .adtive_pushCam_fix fieldset, .adtive_pushCam_fix input, .adtive_pushCam_fix p, .adtive_pushCam_fix blockquote, .adtive_pushCam_fix table, .adtive_pushCam_fix th, .adtive_pushCam_fix td, .adtive_pushCam_fix embed, .adtive_pushCam_fix object, .adtive_pushCam_fix textarea, .adtive_pushCam_fix a, .adtive_pushCam_fix span, .adtive_pushCam_fix em, .adtive_pushCam_fix i, .adtive_pushCam_fix b, .adtive_pushCam_fix strong, .adtive_pushCam_fix img {margin: 0; padding: 0;border: 0;font: inherit;vertical-align:baseline;-webkit-box-sizing: border-box;box-sizing:border-box !important;	} ";
			
			styles += " .adtive_pushCam_fix dt, .adtive_pushCam_fix dd {float:none;} ";
			styles += " .adtive_pushCam_fix div {display:block;}";
			styles += " .adtive_pushCam_fix img {border:0; vertical-align:middle;}";
			styles += " .adtive_pushCam_fix li {list-style:none;}";
			styles += " .adtive_pushCam_fix a {text-decoration:none}";
			styles += " .adtive_pushCam_fix a:hover, .adtive_pushCam_fix a:visited, .adtive_pushCam_fix a:active, .adtive_pushCam_fix a:link, .adtive_pushCam_fix a:focus {color:inherit; text-decoration:none;}";
			styles += " .adtive_pushCam_fix {position:fixed; right:30px; bottom:0px; z-index:99999; width:300px; height:217px; border-radius:17px; box-shadow:0px 5px 10px 4px rgba(0,0,0,.3); background:rgba(255,255,255,.99); -webkit-tap-highlight-color:rgba(0,0,0,0); color:#000; font-weight:normal; font-size:13px; line-height:1.2; letter-spacing:-0.3px; word-spacing:0px; font-family: AppleSDGothicNeo-Regular,'DroidSans Fallback','Malgun Gothic','맑은 고딕',Dotum,'돋움',sans-serif; text-align:left; -webkit-text-size-adjust:none; word-break:break-all;}";
			styles += " .adtive_pushCam_fix .cam_inner {position:relative; padding: 16px 17px 16px 17px !important;}";
			styles += " .adtive_pushCam_fix .cam_profile {margin:0 20px 9px 59px; color:#525252; font-size:13.5px; font-weight:bold; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;}";
			styles += " .adtive_pushCam_fix .cam_tit {width:100%;  padding-left:59px; margin-bottom:23px; word-spacing:-1px; letter-spacing:-0.8px; color:#333; font-size:17px; font-weight:bold; line-height:1.2;}";
			styles += " .adtive_pushCam_fix .cam_txt {overflow:hidden; text-overflow:ellipsis; display:-webkit-box; display:-moz-box; display:-ms-box; -webkit-box-orient:vertical; -webkit-line-clamp:3; word-wrap:break-word; line-height:1.45em; max-height:4.35em; color:#333; font-size:14.5px; letter-spacing: -0.2px; word-spacing:-2px;}";
			styles += " .adtive_pushCam_fix dt {display:block !important}";
			
			styles += " .adtive_pushCam_fix .cam_link {margin-top:12px; text-align:center;}";
			styles += " .adtive_pushCam_fix .cam_link:after {content:''; display:block; clear:both;}";
			styles += " .adtive_pushCam_fix .linkBtn {display:inline-block; max-width:100%; height:37px; line-height:35px; padding:0 38px; border-radius:18px; border:1px solid #e9cf37; background:#f4d732; color:#303030; font-size:13.5px;  font-weight:bold; word-spacing:-1px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;}";
			styles += " .adtive_pushCam_fix .cam_link.division .linkBtn {float:left; max-width:49%; width:49%; padding:0 3px;}";
			styles += " .adtive_pushCam_fix .cam_link.division .linkBtn:nth-child(2n) {margin-left:2%;}";
			styles += " .adtive_pushCam_fix .cam_link.division .linkBtn:nth-child(2n+1) {margin-top:5px;}";
			styles += " .adtive_pushCam_fix .cam_link.division .linkBtn:nth-child(2n+2) {margin-top:5px;}";
			styles += " .adtive_pushCam_fix .cam_link.imgType .linkBtn {height:auto; line-height:1.2; padding:0 0; border:none; border-radius:0; background:none;}";
			styles += " .adtive_pushCam_fix .cam_link.imgType .linkBtn img {max-width:100%;}";

			styles += " .adtive_pushCam_fix .cam_thumb {position:absolute; top:21px; left:13px; width:53px; height:53px; padding:3px; overflow:hidden; z-index:1; border-radius:50%; box-shadow:1px 2px 3px 1px rgba(0,0,0,.1); background:rgba(255,255,255,.99); text-align:center; font-size:0;}";
			styles += " .adtive_pushCam_fix .cam_thumb img {width:47px; border-radius:50%; vertical-align:middle;}";
			styles += " .adtive_pushCam_fix .closeBtn {position:absolute; top:2px; right:2px; z-index:1; padding:14px 7px 0px; border:0; text-align:center; font-size:0; display:block;}";
			styles += " .adtive_pushCam_fix .closeBtn img {width:14px; vertical-align:middle;}";
			styles += ' .adtive_pushCam_fix .btn_close_2{display:none; position:absolute;top:-10px;right:-10px;width:19px;height:19px;text-indent:-9999em;background:#FFF url('+adtive_targetpush_pc.cdn_img+'/upload/images/infor_ad_icon.png) center center no-repeat;}';
			
			styles += ' .adtive_pushCam_fix .cam_content {overflow:hidden; height:160px;} ';
			styles += ' .adtive_pushCam_fix .cam_txt + .cam_img {margin-top:5px;}';
			styles += ' .adtive_pushCam_fix .cam_img {height:auto; max-height:116px;}';
			styles += ' .adtive_pushCam_fix .cam_img img {width:100%; height:auto;}';
						
			styles += " .targetpushAd-up-exc {top:630px;-webkit-animation: ani-upexc 1s; animation: ani-upexc 1s;}";
			styles += " @keyframes ani-upexc {from {transform:translateY(350px); opacity: 0;}to {transform:translateY(0px); opacity: 1; }}";
			styles += " @-webkit-keyframes ani-upexc {from {-webkit-transform:translateY(350px); opacity: 0;}to {-webkit-transform:translateY(0px); opacity: 1; }}";
			styles += " .targetpushAd-down-exc {top:100%;}";
			styles += " .targetpushAd-fadeOut-exc {-webkit-animation: ani-fadeOut-exc 0.2s forwards; animation: ani-fadeOut-exc 0.2s forwards;}";
			styles += " @keyframes ani-fadeOut-exc {from {opacity:1;}to {opacity:0;}}";
			styles += " @-webkit-keyframes ani-fadeOut-exc {from {opacity:1;}to {opacity:0;}}";
			
			//qr 코드 
			styles += " .targetpushAd_pc_wrap.run .targetpushAd_banner_wrap .targetpushAd_bnr_qr {position:relative;} ";
			styles += " .targetpushAd_pc_wrap.run .targetpushAd_banner_wrap .targetpushAd_bnr_qr .btn_close {  display: block;  position: absolute;  top: 18px; right: 22px; ";
			styles += "  width: 20px;  height: 20px; text-indent: -9999em; background: url(//cdn.targetpush.co.kr/images/btn_downsize.png) center center no-repeat;  z-index:11;	} ";
			styles += " .targetpushAd_pc_wrap.run .targetpushAd_bnr_qr .btn_qr_open {position:absolute; left:22px; top:17px; font-size:0;} ";
			styles += " .targetpushAd_pc_wrap.run .targetpushAd_bnr_qr .targetpushAd_qrInfo {position:absolute; top:auto; bottom:1px; left:0; right:0; z-index:10;}  ";
			styles += " .targetpushAd_pc_wrap.run .targetpushAd_bnr_qr .targetpushAd_qrInfo .btn_qr_close {position:absolute; top:17px; right:22px; width:20px; height:20px; text-indent: -9999em; background: url(//cdn.targetpush.co.kr/images/btn_qr_close.png) center center no-repeat;} ";
			styles += " .targetpushAd_pc_wrap.run .targetpushAd_bnr_qr {} ";
			styles += " .targetpushAd_pc_wrap.run .targetpushAd_bnr_qr {} ";

            styles += " #muteButton{position: absolute;cursor: pointer;right: 5px;bottom: 10px;}";
            styles += " .cvideo{background:url(https://cdn.targetpush.co.kr/images/speaker_24_on.png) no-repeat center;background-size:24px;border:0;width:24px;height:24px;}";
            styles += " .cvideomuted {background:url(https://cdn.targetpush.co.kr/images/speaker_24_off.png) no-repeat center;background-size:24px;border:0;width:24px;height:24px;}";				
			//템플릿추가 
			
			css.appendChild(document.createTextNode(styles));
			

			// Add the <style> element to the page
			document.head.appendChild(css);
			
		},
		//show banner
		banner_view : function(type, camp) {
			//템플릿추가 
			var ad_type = adtive_targetpush_pc.code.ad_type;
			var mat_json = (ad_type == 'A') ? camp.cpn_mat1_json : camp.cpn_mat2_json;
			adtive_targetpush_pc.template =  mat_json.template;
			var template = adtive_targetpush_pc.template;
			 //템플릿추가
			
			//경향신문 예외 처리 
			if( adtive_targetpush_ad.zcode =='YALLLLLF' && window.innerWidth < 1600 && adtive_targetpush_pc.template =='B' ) {
				return;
			}
			
			
			 var zone=adtive_targetpush_ad.jdata.zone;
			 var t_code=adtive_targetpush_pc.code;
			 var style = '';
			 if(template != 'B') style+='height:auto;';
			 //특정영역 스타일 예외처리
			 if(zone.margin_vertical=='T' && t_code.zcode!="RKLLLLLF") style+='margin-top:'+zone.margin_vertical_px+'px;';
			 if(zone.margin_vertical=='B' && t_code.zcode!="RKLLLLLF") style+='margin-bottom:'+zone.margin_vertical_px+'px;';

			
			 //특정매체 z-index값
			 if(zone.z_index>0 || zone.z_index<0 || t_code.mcode=='MO444448') style+='z-index:'+zone.z_index+';';
			 
			 if(zone.direction=='R' && t_code.zcode!="RKLLLLLF") style+='right:'+zone.direction_px+'px;';
			 if(zone.direction=='L' && t_code.zcode!="RKLLLLLF") style+='left:'+zone.direction_px+'px;';
			 
			 //연합뉴스 우측 고정 
			 if(t_code.zcode=="U1LLLLLF") style+= 'left: 50%;margin-left: 572px;transition:top 1s;-webkit-transition: top 1s;';
			 var animateClass = 'targetpushAd-animate-up';
			 if(t_code.zcode=="U1LLLLLF")  animateClass = 'targetpushAd-up-exc';
			 
			 //var target="javascript:;";
			 var target=adtive_targetpush_pc.check_url(mat_json.landURL);
			 var script="onclick='adtive_targetpush_pc.clk_landing(0);'";
			var soundset =  '';
			//var btplay = '';
	        if(mat_json.soundset=='N'){
	            soundset = 'muted';
	            //btplay = "";
	        }else{
	            //btplay = "playButton";
	        }	
			 var str = '';
			 
			 
			 //템플릿추가 
			 if(template=='A') {
				str +='<div class="targetpushAd_pc_wrap wrap_new '+type+'"  id="targetpushAd_pc_wrap">';
				str +='<div class="targetpushAd_banner_wrap '+animateClass+'" id="targetpushAd_banner_wrap" style="display: block;'+style+'" ';
				str +='>';

	            // QR 코드
				 if(adtive_targetpush_pc.code.cpno == 310
					|| adtive_targetpush_pc.code.cpno == 311 
					|| adtive_targetpush_pc.code.cpno == 312 
					|| adtive_targetpush_pc.code.cpno == 313 
					|| adtive_targetpush_pc.code.cpno == 314 
				 ) {
					 adtive_targetpush_pc.qr_yn= true;
				 }
	            if(adtive_targetpush_pc.qr_yn) {
	            	str +='<div class="targetpushAd_bnr_qr">';
	            	str +='<div class="targetpushAd_qrInfo" style="display:none ;"> ';
	            	str +='<img src="//cdn.targetpush.co.kr/images/qr_info2.png" alt="QR코드 스캔이 어렵다면? 카카오톡 하단 더보기 메뉴 터치, 상단 스캔 버튼 터치, 하단 QR코드 스캔"> ';
	            	str +='<a href="javascript:void(0);" class="btn_qr_close" id="targetpushAd_qr_close">QR코드 스캔 닫기</a> ';
	            	str +='</div> ';
	            	str +='</div> ';
	            	str +='<a  id="qrinfo_view">';
	            } else {
		            str +='<a href="'+target+'" target="_blank" id="targetpushAd_pc_wrap_a"'+script+'>';
	            }
	            
				var image = adtive_targetpush_pc.cdn_img+mat_json.img_url;
				
	//            console.log(image);
				str +='<img src="'+image+'" alt="광고 영역" id="targetpushAd_pc_wrap_img" /> ';
				
				str +='</a>';
				
				str +='<a href="javascript:adtive_targetpush_pc.targetpushAd_banner_close();" class="btn_close" id="targetpushAd_pc_wrap_close">닫기</a>';
				str +='<a href="http://www.targetpush.co.kr/home/ad" target="_blank" class="btn_close_2" id="targetpushAd_pc_wrap_close_2">닫기</a>';
				str +='</div></div>';
	//          console.log(camp);  
	//            document.body.innerHTML+=str;
			 } else if  (template=='B') {
				var url = adtive_targetpush_pc.check_url(mat_json.landURL);
			  //템플릿추가
	//			console.log(camp);
				str +=' <div class="adtive_pushCam_fix '+animateClass+' '+type+' " id="targetpushAd_banner_wrap" style="display:none;'+style+'"> ';
				str +=' <div class="cam_inner " style="display: block;" id="targetpushAd_pc_wrap"> ';
				str +='	<div class="cam_profile"><a href="'+url+'"  target="_blank" onclick="adtive_targetpush_pc.log(\'0\',\'clk\');">'+mat_json.mp_name+'</a></div> ';
				str +='	<dl class="cam_content"> ';
				str +='		<dt class="cam_tit"><a href="'+url+'" target="_blank" onclick="adtive_targetpush_pc.log(\'0\',\'clk\');">'+mat_json.title+'</a></dt> ';
				str +='		<dd class="cam_txt"><a href="'+url+'" target="_blank" onclick="adtive_targetpush_pc.log(\'0\',\'clk\');">'+mat_json.body.replace(/\r/gi, "<br>").replace(/  /g, '&nbsp&nbsp')+'</a></dd> ';
				if(mat_json.button_text1_title && mat_json.button_text2_title ) {
					str +='		<dd class="cam_link division"> '; 
				} else if (mat_json.button_text1_title )
				{
					str +='		<dd class="cam_link"> '; 
				}
				var style = "";
				style = (mat_json.button_color) ? 'border-color:'+mat_json.button_color+';background-color:'+mat_json.button_color+';': '';
				style += (mat_json.button_txt_color) ? 'color:'+mat_json.button_txt_color+';' : '';
				
				if(mat_json.button_text1_title) {
				str +='			<a href="'+adtive_targetpush_pc.check_url(mat_json.button_text1_url)+'" class="linkBtn" id="" target="_blank" onclick="adtive_targetpush_pc.log(\'1\',\'clk\');" style="'+style+'">'+mat_json.button_text1_title+'</a>';
				}
				if(mat_json.button_text2_title) {
				str +='			<a href="'+adtive_targetpush_pc.check_url(mat_json.button_text2_url)+'" class="linkBtn" id="" target="_blank" onclick="adtive_targetpush_pc.log(\'2\',\'clk\');" style="'+style+'">'+mat_json.button_text2_title+'</a> ';
				}
				if(mat_json.button_text3_title) {
				str +='			<a href="'+adtive_targetpush_pc.check_url(mat_json.button_text3_url)+'" class="linkBtn" id="" target="_blank" onclick="adtive_targetpush_pc.log(\'3\',\'clk\');" style="'+style+'">'+mat_json.button_text3_title+'</a> ';
				}
				if(mat_json.button_text4_title) {
				str +='			<a href="'+adtive_targetpush_pc.check_url(mat_json.button_text4_url)+'" class="linkBtn" id="" target="_blank" onclick="adtive_targetpush_pc.log(\'4\',\'clk\');" style="'+style+'">'+mat_json.button_text4_title+'</a> ';
				}
				
				
				if(mat_json.button_text1_title || mat_json.button_text2_title )  str +='	</dd> ';
				
				if(mat_json.button_img1) {
					str +='<dd class="cam_link imgType link-A cam_img"><a href="" class="cam_msg_link" target="_blank">  ';
					str +=' </a><a href="'+mat_json.button_img1_url+'" class="linkBtn" id="" target="_blank" onclick="adtive_targetpush_pc.log(\'1\',\'clk\');"><img src="'+adtive_targetpush_pc.cdn_img+mat_json.button_img1+'" alt="버튼" onerror="this.src=\'/assets/images/image_02.png\'"></a>';
					str +='  </dd>';
				}    
				var close_btn = 'x_bt2.png';
				if(adtive_targetpush_ad.mcode == 'C4444448') close_btn = 'x_bt.png';

				var closeBtn_style='';
				var closeBtn_imgStyle='';
				if(adtive_targetpush_ad.mcode == 'S7444448') {
					close_btn= 'x_bt3.png';
					closeBtn_style='padding:0;top:15px;right:15px;';
					closeBtn_imgStyle='width:30px;height:30px;';
				}
				str +=' </dl> ';
				str +='	<span class="cam_thumb"><a href="'+url+'" target="_blank" onclick="adtive_targetpush_pc.log(\'0\',\'clk\');">  <img src="'+adtive_targetpush_pc.cdn_img+mat_json.mp_img+'" alt="썸네일"></a></span> ';
				str +='	<a href="javascript:adtive_targetpush_pc.targetpushAd_banner_close();" class="closeBtn" id="targetpushAd_pc_wrap_close" style="'+closeBtn_style+'"><img src="'+adtive_targetpush_pc.cdn_img+'/upload/images/'+close_btn+'" alt="닫기" style="'+closeBtn_imgStyle+'"></a> ';
				str +='<a href="http://www.targetpush.co.kr/home/ad" target="_blank" class="btn_close_2" id="targetpushAd_pc_wrap_close_2">닫기</a>';
				str +=' </div></div> ';
		
					
			//템플릿추가 
			}else if(template=='C') { //add 20200422
				str +='<div class="targetpushAd_pc_wrap wrap_new '+type+'"  id="targetpushAd_pc_wrap">';
				str +='<div class="targetpushAd_banner_wrap targetpushAd-animate-up" id="targetpushAd_banner_wrap" style="display: block;'+style+'" ';
				str +='>';

				var vod = adtive_targetpush_pc.cdn_img+mat_json.img_url;
				str +='<a href="'+target+'" target="_blank" id="targetpushAd_pc_wrap_a"'+script+'>';				

				str +='<video class="video" id="vod" playsinline loop autoplay '+soundset+' width="100%"><source src="'+vod+'" type="video/mp4"></video>';
				str +='</a>';
				str +='<div id="muteButton" class="cvideo'+soundset+'" onclick="adtive_targetpush_pc.audPause()"></div>';

				str +='<a href="javascript:adtive_targetpush_pc.targetpushAd_banner_close();" class="btn_close" id="targetpushAd_pc_wrap_close">닫기</a>';
				str +='<a href="http://www.targetpush.co.kr/home/ad" target="_blank" class="btn_close_2" id="targetpushAd_pc_wrap_close_2">닫기</a>';
				str +='</div></div>';
			}
				document.body.insertAdjacentHTML('beforeend', str);
	            // qr코드 
	            if(adtive_targetpush_pc.qr_yn) {
	            	document.getElementById('targetpushAd_qr_close').onclick = function () {
	            		document.getElementsByClassName("targetpushAd_qrInfo")[0].style.display='none';
	            	};
	            	document.getElementById('qrinfo_view').onclick = function () {
	            		document.getElementsByClassName("targetpushAd_qrInfo")[0].style.display='block';
	            	};
	            }
	            
				
		},
		// targetpushAd banner close
		targetpushAd_banner_close : function() {			
			var template = adtive_targetpush_pc.template;			
			var pushad_obj = document.getElementById("targetpushAd_pc_wrap");			
			if (template =='B') {
				var pushad_obj = document.getElementById("targetpushAd_banner_wrap");
			}
			pushad_obj.outerHTML='';
			adtive_targetpush_pc.close_pos = document.documentElement.scrollTop;
			var zone = adtive_targetpush_ad.jdata.zone;
			var redo_num = zone.redo_num;
			var f = true;
			var scrollpos;
			//반복노출 이벤트 설정시
			if(adtive_targetpush_pc.close_num <= redo_num) {
				var zpb = adtive_targetpush_ad.jdata.zpb;			
				if(zpb !==undefined){																			
					adtive_targetpush_ad.script('js',adtive_targetpush_ad.cdn_url+'/js/targetpushad_wpb.js?ver=201124');	
				}
				window.addEventListener('scroll', function() {
					var ss_xx = Math.abs(adtive_targetpush_pc.close_pos- document.documentElement.scrollTop);
					if(zone.redo_px < ss_xx) {
						if(f == true) {
							//start : passback
							adtive_targetpush_pc.show_passback(zpb);
							//end passback
							f = false;
						}					
					}
				});
			}
		},
		show_passback : function(zpb){
			//passback start
			if(zpb===undefined){
				adtive_targetpush_pc.ad_start();
			}else{						
				console.log('pb');
				//패스백을 사용함				
				document.getElementById("targetpushAd_pc_wrap").classList.toggle('run');				
				adtive_targetpush_pc.template = 'A';
				adtive_targetpush_pc.pblog(adtive_targetpush_pc.show_pbno); //pblog log
			}			
		},		
    audPause : function(){
        var bVideo = document.getElementById("vod");
        var el = document.getElementById("muteButton");
        el.className ="";
        if (bVideo.muted) {
            bVideo.muted = false;
            el.className ="cvideo";
        } else {                  
            bVideo.muted = true;
            el.className ="cvideomuted";
        }
    },
		// cookie set minuts 
		setCookie : function(name, value, min) {
			var date = new Date();
			date.setTime(date.getTime() + min * 60 * 1000);
			document.cookie = name + '=' + value + ';expires=' + date.toUTCString()+ ';path=/';
		},
		// get cookie 
		getCookie : function(name) {
			var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
			return value ? value[2] : null;
		},
		// del cookie
		deleteCookie : function(name) {
			document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
	};
}