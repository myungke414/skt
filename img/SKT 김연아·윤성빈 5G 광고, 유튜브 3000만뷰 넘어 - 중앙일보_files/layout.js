﻿/**
* layout.js
* 공통으로 사용되는 header 를 작성한다.
*/
(function (window, document, $) {

	//document.domain = 'joins.com';
	var utils = window.utils,
		pageType = utils.config('pageType'),
		domain = utils.config('webPcPath'),
		windowSize = utils.windowSize(),
		$body = $(document.body);

	//jTracker Begin
	var jTracker = {
		siteName: "TRACKER",
		__getCookieVal: function (offset) {
			var endstr = document.cookie.indexOf(";", offset);
			if (endstr == -1) endstr = document.cookie.length;
			return unescape(document.cookie.substring(offset, endstr));
		},
		__getCookie: function (name) {
			var arg = name + "=";
			var alen = arg.length;
			var clen = document.cookie.length;
			var i = 0;
			while (i < clen) {
				var j = i + alen;
				if (document.cookie.substring(i, j) == arg) return this.__getCookieVal(j);
				i = document.cookie.indexOf(" ", i) + 1;
				if (i == 0) break;
			}
			return null;
		},
		__getCookieA: function (name1, name2) {
			var string = this.__getCookie(name1);
			if (string == null) string = "";
			var flag = string.indexOf(name2 + "=");
			if (flag != -1) {
				flag += name2.length + 1;
				var end = string.indexOf("&", flag);
				if (end == -1) end = string.length;
				return unescape(string.substring(flag, end));
			}
			else {
				return "";
			}
		},
		__request: function (param) {
			try {
				var aParams = new Array();
				var sUrlParam = document.location.search.substring(1);
				for (var nIdx = 0; nIdx < sUrlParam.split("&").length; nIdx++)
					aParams[sUrlParam.split("&")[nIdx].split("=")[0].toString()] = sUrlParam.split("&")[nIdx].split("=")[1].toString();
				if (aParams[param]) { return aParams[param]; } else { return ""; }
			} catch (e) {
				return "";
			}
		},
		__joins_device_detect_type1: function () {
			var sDeviceCheck = "0"; // pc
			var _agent = navigator.userAgent.toLowerCase();
			if (_agent.indexOf("iphone") != -1 || _agent.indexOf("ipod") != -1) sDeviceCheck = "2";
			else if (_agent.indexOf("ipad") != -1) sDeviceCheck = "4";
			else if (_agent.indexOf("android") != -1) {
				if (_agent.indexOf("mobile") != -1) sDeviceCheck = "1";
				else sDeviceCheck = "3";
			}
			else {
				var mobile = (/blackberry|mini|windows\sce|palm/i.test(_agent));
				if (mobile) sDeviceCheck = "5";
				else {
					if (_agent.indexOf("mac") != -1) sDeviceCheck = "8";
					else if (_agent.indexOf("x11") != -1) sDeviceCheck = "9";
				}
			}
			return sDeviceCheck;
		},
		__get_browser: function () {
			var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
			if (/Edge/i.test(ua)) {
				tem = /(edge)\/((\d+)?[\w\.]+)/ig.exec(ua) || [];
				return "Edge%20" + (tem[3] || "");
			}
			if (/trident/i.test(M[1])) {
				tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
				return "IE%20" + (tem[1] || "");
			}
			if (M[1] === "Chrome") {
				tem = ua.match(/\bOPR\/(\d+)/)
				if (tem != null) return "Opera%20" + tem[1];
			}
			if (navigator.appName.length > 0 && navigator.appVersion.charCodeAt(0) < 128) {
				M = (typeof (M[2]) != "undefined" && M[2]) ? [M[1], M[2]] : [navigator.appName, navigator.appVersion];
				if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
				return M.join("%20");
			}
			else {
				return ua;
			}
		},
		__get_os: function () {
			var os = "";
			var clientStrings = [
				{ s: 'Windows 3.11', r: /Win16/ },
				{ s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
				{ s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
				{ s: 'Windows 98', r: /(Windows 98|Win98)/ },
				{ s: 'Windows CE', r: /Windows CE/ },
				{ s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
				{ s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
				{ s: 'Windows Server 2003', r: /Windows NT 5.2/ },
				{ s: 'Windows Vista', r: /Windows NT 6.0/ },
				{ s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
				{ s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
				{ s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
				{ s: 'Windows 10', r: /Windows NT 10.0/ },
				{ s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
				{ s: 'Windows ME', r: /Windows ME/ },
				{ s: 'Android', r: /Android/ },
				{ s: 'Open BSD', r: /OpenBSD/ },
				{ s: 'Sun OS', r: /SunOS/ },
				{ s: 'Linux', r: /(Linux|X11)/ },
				{ s: 'iOS', r: /(iPhone|iPad|iPod)/ },
				{ s: 'Mac OS X', r: /Mac OS X/ },
				{ s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
				{ s: 'QNX', r: /QNX/ },
				{ s: 'UNIX', r: /UNIX/ },
				{ s: 'BeOS', r: /BeOS/ },
				{ s: 'OS/2', r: /OS\/2/ },
				{ s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
			];

			for (var i = 0; i < clientStrings.length; i++) {
				var cs = clientStrings[i];
				if (cs.r.test(navigator.userAgent)) {
					os = cs.s;
					break;
				}
			}

			var osVersion = "";
			try {
				if (/Windows/.test(os)) {
					osVersion = /Windows (.*)/.exec(os)[1];
					os = 'Windows';
				}
				switch (os) {
					case 'Mac OS X':
						osVersion = /Mac OS X (10[\.\_\d]+)/.exec(navigator.userAgent)[1];
						break;
					case 'Android':
						osVersion = /Android ([\.\_\d]+)/.exec(navigator.userAgent)[1];
						break;
					case 'iOS':
						osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);
						osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
						break;
				}
			}
			catch (e) {
			}
			return os.replace(" ", "%20") + (osVersion == "" ? "" : "%20" + osVersion);
		},
		put: function () {
			var _ref = document.referrer;
			var _ref_param = "";
			var _tmpPos = _ref.indexOf("?");
			if (_tmpPos != -1) { _ref_param = _ref.substring(_tmpPos + 1).replace(/\^/g, "-"); _ref = _ref.substring(0, _tmpPos); }
			var _uri = document.location.href;
			var _uri_param = "";
			var _tmpPos = _uri.indexOf("?");
			if (_tmpPos != -1) { _uri_param = _uri.substring(_tmpPos + 1).replace(/\^/g, "-"); _uri = _uri.substring(0, _tmpPos); }
			var _dt = this.__joins_device_detect_type1();
			var _br = this.__get_browser();
			var _os = this.__get_os();
			var _w = window.screen.width;
			var _h = window.screen.height;
			var _joins_memid = this.__getCookieA("MemArray", "MemID"); if (_joins_memid == null) _joins_memid = "";
			var _joins_pcid = this.__getCookie("PCID"); if (_joins_pcid == null) _joins_pcid = "";
			var _href = utils.config('counterPath') + "/bin/ArticleCounterLogger.dll?Total_ID=" + _br + "&Ctg_ID=" + _os + "&cloc=" + _joins_pcid + "&svc=" + this.siteName + "&memid=" + _joins_memid + "&comm1=" + _dt + "&comm3=" + _w + "x" + _h + "&comm2=" + encodeURIComponent(_uri) + "&ref=" + encodeURIComponent(_ref) + "&Master_Code=" + encodeURIComponent(_uri_param) + "&gubun=" + encodeURIComponent(_ref_param);

			var _ifrm = document.createElement("IFRAME");
			_ifrm.setAttribute("src", _href);
			_ifrm.style.width = "0px";
			_ifrm.style.height = "0px";
			_ifrm.style.display = "none";
			document.body.appendChild(_ifrm);
		}
	};
	//jTracker End

	// link : {href, target, text[, html]}
	// image : {src, alt}
	setConfigLoginInfo();

	//jTracker Exec
	$(function ($) {
		jTracker.siteName = "TRACKERJA";
		jTracker.put();
	});

	function setConfigLoginInfo() {
		var id = utils.getCookie(COOKIE_NAMES.userId) || utils.getCookie(COOKIE_NAMES.socialuserId) || ''; //소셜로그인 추가.161208
		var socialid = utils.getCookie(COOKIE_NAMES.socialuserId); //소셜로그인 추가.161208
		var snsInfo = utils.getCookie(COOKIE_NAMES.snsInfo) || '';
		utils.config(CONFIG_NAMES.isLogin, (!id.isEmpty() || !snsInfo.isEmpty()));
	}

	utils.linkService = new function () {
		var mapData = {
				service: [
					{ key: 'jp', link: { text: '日文', href: 'http://japanese.joins.com', target: '_blank', title: '(새창) 일문 사이트로 이동' } },
					{ key: 'cn', link: { text: '中文', href: 'http://chinese.joins.com', target: '_blank', title: '(새창) 중문 사이트로 이동' } },
					{ key: 'en', link: { text: 'ENG', href: 'http://joongangdaily.joins.com', target: '_blank', title: '(새창) 영문 사이트로 이동' } },
					{ key: 'usajoongang', link: { text: 'USA중앙', href: 'http://www.koreadaily.com/', target: '_blank' } },

					{ key: 'joongangilbo', link: { text: '중앙일보', href: 'https://joongang.joins.com', target: '_blank' } },
					{ key: 'joongangsunday', link: { text: '중앙SUNDAY', href: 'https://news.joins.com/sunday', target: '_blank' } },
					{ key: 'ilgansports', link: { text: '일간스포츠', href: 'http://isplus.joins.com', target: '_blank' } },
					{ key: 'koreajoongangdaily', link: { text: 'Korea Joongang Daily', href: 'http://koreajoongangdaily.joins.com', target: '_blank' } },
					{ key: 'koreadaily', link: { text: 'The Korea Daily', href: 'http://www.koreadaily.com', target: '_blank' } },
					{ key: 'joind', link: { text: '조인디', href: 'https://joind.io/', target: '_blank' } },

					{ key: 'jtbc', link: { text: 'JTBC', href: 'http://jtbc.joins.com', target: '_blank' } },
					{ key: 'jtbc2', link: { text: 'JTBC2', href: 'http://jtbc2.joins.com', target: '_blank' } },
                    { key: 'jtbc3foxsports', link: { text: 'JTBC GOLF&SPORTS', href: 'http://jtbcgolfnsports.joins.com/', target: '_blank' } },
					{ key: 'jtbc4', link: { text: 'JTBC4', href: 'http://jtbc4.joins.com/', target: '_blank' } },
                    { key: 'jtbcgolf', link: { text: 'JTBC GOLF', href: 'http://www.jtbcgolf.com', target: '_blank' } },
                    { key: 'jtbcworldwide', link: { text: 'JTBC worldwide', href: 'http://www.jtbcworldwide.com', target: '_blank' } },

                    { key: 'megabox', link: { text: '메가박스', href: 'http://www.megabox.co.kr', target: '_blank' } },
                    { key: 'megaboxfilmhome', link: { text: '필름 소사이어티', href: 'http://www.megabox.co.kr/?menuId=specialcontent-filmHome&majorCode=06&minorCode=0601', target: '_blank' } },
                    { key: 'megaboxclassichome', link: { text: '클래식 소사이어티', href: 'http://www.megabox.co.kr/?menuId=specialcontent-classicHome&majorCode=02&minorCode=0208', target: '_blank' } },
                    { key: 'phoenixhnrpyeongchang', link: { text: '휘닉스 평창', href: 'https://phoenixhnr.co.kr/page/main/pyeongchang', target: '_blank' } },
                    { key: 'phoenixhnrjeju', link: { text: '휘닉스 섭지코지', href: 'https://phoenixhnr.co.kr/page/main/jeju', target: '_blank' } },

					{ key: 'monthlyjoongang', link: { text: '월간중앙', href: 'https://jmagazine.joins.com/monthly', target: '_blank' } },
					{ key: 'economist', link: { text: '이코노미스트', href: 'https://jmagazine.joins.com/economist', target: '_blank' } },
					{ key: 'forbeskorea', link: { text: '포브스코리아', href: 'https://jmagazine.joins.com/forbes', target: '_blank' } },
					{ key: 'jbooks', link: { text: '중앙북스', href: 'https://jbooks.joins.com/', target: '_blank' } },
					{ key: 'elle', link: { text: '엘르', href: 'http://www.elle.co.kr/', target: '_blank' } },
					{ key: 'harpersbazaar', link: { text: '바자', href: 'http://harpersbazaar.co.kr/', target: '_blank' } },
					{ key: 'cosmopolitan', link: { text: '코스모폴리탄', href: 'http://www.cosmopolitan.co.kr/', target: '_blank' } },
					{ key: 'esquire', link: { text: '에스콰이어', href: 'http://esquirekorea.co.kr/', target: '_blank' } },

					{ key: 'joinsland', link: { text: '조인스랜드', href: 'http://www.joinsland.com/', target: '_blank' } },
					{ key: 'jhealthmedia', link: { text: '헬스미디어', href: 'http://www.jhealthmedia.com/', target: '_blank' } },
					{ key: 'chinajoins', link: { text: '차이나랩', href: 'https://blog.naver.com/china_lab', target: '_blank' } },
					{ key: 'koreanjoins', link: { text: '어문연구소', href: 'https://korean.joins.com/', target: '_blank' } },
					{ key: 'jdphone', link: { text: '영어의 신', href: 'http://www.jdphone.com/', target: '_blank' } },
					{ key: 'esukorea', link: { text: 'ESU', href: 'https://www.esukorea.org/', target: '_blank' } },

					{ key: 'joins', link: { text: 'JOINS PRIME', href: 'https://www.joins.com/', target: '_blank' } },
					{ key: 'ssully', link: { text: '썰리', href: 'https://ssully.joins.com/', target: '_blank' } },
					{ key: 'folin', link: { text: 'fol:in', href: 'https://folin.co/', target: '_blank' } },
					{ key: 'jtbcnow', link: { text: 'JTBC NOW', href: 'http://www.jtbcnow.com/', target: '_blank' } },
					{ key: 'jtbcnews', link: { text: 'JTBC NEWS', href: 'https://play.google.com/store/apps/details?id=com.jtbc.news', target: '_blank' } },
					{ key: 'oohmedia', link: { text: 'OOH MEDIA', href: 'http://oohmedia.kr/', target: '_blank' } },
                    { key: 'jmembership', link: { text: '중앙멤버십', href: 'https://jmembership.joins.com/', target: '_blank' } },
                    { key: 'sigol', link: { text: '렛츠고시골', href: 'http://sigol.joinsland.com/', target: '_blank' } },
                    { key: 'tj4', link: { text: 'TJ4대전충청', href: 'http://tj4.joinsland.com/', target: '_blank' } },

                    { key: 'phoenixhnr', link: { text: '휘닉스 호텔앤드리조트', href: 'https://phoenixhnr.co.kr/page/main', target: '_blank' } },
                    { key: 'ceci', link: { text: '쎄씨', href: 'http://www.ceci.co.kr/', target: '_blank' } },
					{ key: 'womanjoongang', link: { text: '여성중앙', href: 'http://woman.joins.com/', target: '_blank' } },
					{ key: 'sure', link: { text: '슈어', href: 'http://sure.joins.com/', target: '_blank' } },
					{ key: 'lemontree', link: { text: '레몬트리', href: 'http://lemontree.joins.com/', target: '_blank' } }, //jMnet 더보기에서 제거 요청
					{ key: 'heren', link: { text: '헤렌', href: 'http://www.heren.co.kr/', target: '_blank' } },
					{ key: 'instylekorea', link: { text: '인스타일', href: 'http://www.instylekorea.com/', target: '_blank' } },
					{ key: 'magazinem', link: { text: '매거진M', href: 'https://news.joins.com/magazinem', target: '_self' } },
                    { key: 'beautytalk', link: { text: 'beauty talk', href: 'https://www.beautytalk.co.kr', target: '_blank' } },
					{ key: 'gentlemankorea', link: { text: '젠틀맨코리아', href: 'http://www.gentlemankorea.com', target: '_blank' } },//jMnet 더보기에서 제거 요청
					{ key: 'myjlook', link: { text: 'Jlook', href: 'http://www.myjlook.com', target: '_blank' } },
					{ key: 'mediaspider', link: { text: 'Joins Spider', href: 'http://www.mediaspider.co.kr', target: '_blank' } },
					{ key: 'nkjoins', link: { text: '북한네트', href: 'http://nk.joins.com', target: '_blank' } },
					{ key: 'jeconomy', link: { text: '중앙일보 경제연구소', href: 'http://jeri.joins.com', target: '_blank' } },
					{ key: 'societyenvironment', link: { text: '시민사회·환경', href: 'http://ngo.joongang.co.kr', target: '_blank' } },
					{ key: 'universityestimation', link: { text: '중앙일보 대학평가', href: 'http://univ.joongang.co.kr', target: '_blank' } },
					{ key: 'footerjoongangilbo', link: { text: '중앙일보', href: 'https://joongang.joins.com/' } },
					{ key: 'customercenter', link: { text: '고객센터', href: 'https://news.joins.com/customercenter' } },
					//{ key: 'onlinecustomercenter', link: { text: '온라인 고객센터', href: 'http://help.joins.com', target: '_blank' } },
                    { key: 'onlinecustomercenter', link: { text: '윤리경영', href: 'https://jebo.joonganggroup.com' } },
					{ key: 'joongangad', link: { text: '광고 안내', href: 'https://jad.joongang.co.kr' } },
					{ key: 'joongangbiz', link: { text: '제휴문의', href: 'mailto:digitalbiz@joongang.co.kr' } },
					{ key: 'joongangtour', link: { text: '견학신청', href: 'https://news.joins.com/jtour' } },
					{ key: 'joongangdigitalad', link: { text: '디지털 광고문의', href: 'http://digitalad.joongang.co.kr/', target: '_blank'  } },
					{ key: 'joongangterms', link: { text: '회원약관', href: 'http://bbs.joins.com/app/myjoins_policy/163114' } },
					{ key: 'joongangpolicy', link: { text: '개인정보 처리방침', href: 'http://bbs.joins.com/app/myjoins_policy/163117' } },
					{ key: 'youthprotection', link: { text: '청소년 보호정책', href: 'http://bbs.joins.com/app/myjoins_policy/2777964' } },
					{ key: 'youthprotectionhome', link: { text: '청소년 보호정책 (책임자: 조주환, 이진수)', href: 'http://bbs.joins.com/app/myjoins_policy/2777964' } },
					{ key: 'joongangproblem', link: { text: '고충처리', href: 'http://bbs.joins.com/app/member_go/10576015' } },
                    { key: 'sundayethicscode', link: { text: '윤리강령', href: 'http://bbs.joins.com/app/myjoins_policy/11055618' } },
					{ key: 'koreanair', link: { text: '대한항공', href: 'https://kr.koreanair.com/', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/news10/common/b_kal_v2.gif', alt: '대한항공' } },
					{ key: 'samsung', link: { text: '삼성전자', href: 'https://www.samsung.com/', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/news10/common/b_samsung_v2.gif?20170420', alt: '삼성전자' } },
					{ key: 'raemian', link: { text: '래미안', href: 'https://www.raemian.co.kr/', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/news10/common/b_raemian_v2.gif', alt: '래미안' } },
                    //{ key: 'hyosung', link: { text: '더클래스효성', href: 'http://www.theclasshyosung.kr?src=image&kw=000058', target: '_blank' }, image: { src: 'http://images.joins.com/ui_joongang/news/pc/main/r_hyosung.gif', alt: '더클래스효성' } },
                    { key: 'hanatourist', link: { text: '하나투어리스트', href: 'http://www.hanatourist.co.kr/', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joongang/news/pc/main/r_hanatourist.gif', alt: '하나투어리스트' } },
					{ key: 'login', link: { text: '로그인', href: 'https://my.joins.com/login/', cls: 'login' } },
					{ key: 'joongangmedia', link: { text: '중앙그룹', href: 'http://jmedianet.com' } },
					{ key: 'assembly', link: { text: '대한민국국회', href: 'http://www.assembly.go.kr', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/politics/i_politics_site01.jpg' } },
					{ key: 'president', link: { text: '청와대', href: 'http://www.president.go.kr', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/politics/i_politics_site02.jpg' } },
					{ key: 'theminjoo', link: { text: '더불어민주당', href: 'http://theminjoo.kr', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/politics/i_politics_site03.jpg' } },
					{ key: 'saenuriparty', link: { text: '자유한국당', href: 'http://www.libertykoreaparty.kr', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/politics/i_politics_site04.jpg' } },
					{ key: 'npad', link: { text: '바른미래당', href: 'http://bareunmirae.kr/', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/politics/i_politics_site15.jpg' } },
                    { key: 'mofa', link: { text: '외교부', href: 'http://www.mofa.go.kr', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/politics/i_politics_site06.jpg' } },
                    { key: 'bareun', link: { text: '민주평화당', href: 'http://peaceparty.or.kr/', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/politics/i_politics_site16.jpg' } },
					{ key: 'facebook', link: { text: '페이스북', href: 'https://www.facebook.com/joongang', target: '_blank', cls: 'icon_facebook' } },
					{ key: 'twitter', link: { text: '트위터', href: 'https://twitter.com/joongangilbo', target: '_blank', cls: 'icon_twitter' } },
					//{ key: 'googleplus', link: { text: '구글플러스', href: 'https://plus.google.com/u/0/+JoongangCoKr/posts', target: '_blank', cls: 'icon_googleplus' } },
					{ key: 'kakaotalk', link: { text: '카카오톡' } },
					{ key: 'kakaostory', link: { text: '카카오스토리', href: 'https://story.kakao.com/ch/joongangilbo', target: '_blank', cls: 'icon_kakaostory' } },
					{ key: 'pinterest', link: { text: '핀터레스트', href: 'https://www.pinterest.com/joongangilbo/', target: '_blank', cls: '' } },
                    { key: 'tong', link: { text: 'TONG', href: 'http://tong.joins.com/', target: '_blank', cls: '' } },
                    { key: 'sojoong', link: { text: '소년중앙', href: 'http://sojoong.joins.com/', target: '_blank', cls: '' } },
                    { key: 'ssully', link: { text: '썰리', href: 'https://ssully.joins.com', target: '_blank', cls: '' } },
                    { key: 'news10', link: { text: 'News10', href: 'http://news10.kr', target: '_blank', cls: '' } },
			        { key: 'newsletter', link: { text: '뉴스레터', href: 'https://news.joins.com/newsletter', target: '_self', cls: 'icon_email' } },
                    { key: 'naverpost', link: { text: '네이버포스트', href: 'https://post.naver.com/my.nhn?memberNo=11880830', target: '_blank', cls: 'icon_naver_post' } },
                    { key: 'mnd', link: { text: '대한민국 국방부', href: 'http://www.mnd.go.kr', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/politics/i_politics_site09.jpg' } },
                    { key: 'kida', link: { text: '한국국방연구원', href: 'http://www.kida.re.kr', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/politics/i_politics_site10.jpg' } },
                    { key: 'kinu', link: { text: '통일연구원', href: 'http://www.kinu.or.kr', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/politics/i_politics_site11.jpg' } },
                    { key: 'csis', link: { text: 'CSIS', href: 'https://www.csis.org', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/politics/i_politics_site12.jpg' } },
                    { key: 'globalsecurity', link: { text: 'Global Security', href: 'https://www.globalsecurity.org', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/politics/i_politics_site13.jpg' } },
                    { key: '38north', link: { text: '38 North', href: 'https://38north.org', target: '_blank' }, image: { src: utils.config('imageRootPath') + '/ui_joins/politics/i_politics_site14.jpg' } },
					{ key: 'peoplemic', link: { text: '시민마이크', href: 'http://peoplemic.joins.com/', target: '_blank' } }
				]
			};
		this.getData = function (key, obj) {
			var data = {},
				rtnObj = {};

			if (key) {
				data = mapData.service.filter(function (v) {
					return v.key == key;
				})[0];
			}
			$.extend(true, rtnObj, data, { link: obj || {} });

			return rtnObj;
		};
	};

	utils.getLinkData = function (key) {
		var rtnHtml = ""
		rtnHtml = "<a href='" + utils.linkService.getData(key).link.href + "' target='" + utils.linkService.getData(key).link.target + "'>" + utils.linkService.getData(key).link.text + "</a>";
		return rtnHtml;
	};

	utils.shareArticleForMail = function () {
		var totalId = $('#total_id').val() || '',
			url = utils.config('webPcPath') + '/article/mail/' + totalId;
		if (totalId == '') {
			return alert('처리중 오류가 발생했습니다.\n다시 시도해주세요.');
		}
		window.open(url, 'send_mail', 'directories=no,location=no,menubar=no,status=no,toolbar=no,scrollbars=yes,resizable=no,width=670,height=820');
	};

	utils.saveSearchHistory = function (keyword) {
		var limitSize = 9,
			isSaving = utils.getCookie(COOKIE_CONDITION.isSavingKeyword),
			cookieName = COOKIE_NAMES.searchKeyword;

		if (isSaving === null || isSaving === 'true') {

			var cookieData = utils.getCookie(cookieName);
			if (cookieData === null) {
				cookieData = [];
			} else {

				cookieData = cookieData.split(',');

				if (cookieData.length >= limitSize) {
					for (var i = 0,
							len = cookieData.length - limitSize; i < len; i++) {
						cookieData.pop();
					}
				}
				for (var i = 0,
						len = cookieData.length; i < len; i++) {
					if (cookieData[i] === keyword) {
						cookieData.splice(i, 1);
					}
				}
			}
			cookieData.splice(0, 0, keyword);
			utils.setCookie(cookieName, cookieData.toString(), 90, COOKIE_CONDITION.path, COOKIE_CONDITION.domain);
		}
	};

	utils.fnSetOpinionPlayer = function (id) {

		var device_info = "W";
		var width = 576;
		var height = 353;

		utils.log('## fnSetOpinionPlayer');
		//브라우저 체크
		if (typeof (mobile_device_detect) == "function") {
			device_info = mobile_device_detect();
		}

		if (device_info == "W") {
			var file_url = "rtmp://jcubelive.ktics.co.kr/opinionlive/_definst_/opinionlive.stream";

			if (file_url.indexOf("/_definst_/") > 0) {
				arr_file_url = file_url.split("/_definst_/");
			}
			var stream = arr_file_url[0] + "/_definst_/";
			var file = escape(arr_file_url[arr_file_url.length - 1]);

			var so = new SWFObject("//fs.jtbc.joins.com/common/ctl/player/player.swf", 'ply', width, height, '9', '#000000');
			so.addParam('allowfullscreen', 'true');
			so.addParam('allowscriptaccess', 'always');
			so.addParam('wmode', 'transparent');
			so.addVariable('autostart', 'true');
			so.addVariable('width', width);
			so.addVariable('height', height);
			//so.addVariable('stretching', 'fill');
			so.addVariable('provider', 'rtmp'); // Protocol
			so.addVariable('streamer', file_url); // VOD URL Path
			so.addVariable('file', file); // VOD URL
			so.addVariable('image', $("div.play_on > a > img").attr("src")); // Thumbnail Image URL - VOD
			so.addVariable('skin', "//fs.jtbc.joins.com/common/ctl/player/glow.zip");
			so.addVariable('controlbar', 'bottom');
			so.write(id);
			if (jwplayer('ply') != null) {
				jwplayer('ply').onPlay(function () {
					$.ajax({ url: utils.config('appPath') + '/news/opinioncast/set_onair_log.asp' });
				});
			}
		} else {
			var file_url = "rtmp://jcubelive.ktics.co.kr/opinionlive/_definst_/opinionlive.stream";
			var video_tag = "<a href=\"" + file_url + "\" ><img src=\"" + $("div.play_on > a > img").attr("src") + "\" width=\"" + width + "\" height=\"" + height + "\"></a>";
			$("#" + id).html(video_tag);
			$("a", $("#" + id)).click(function () {
				$.ajax({ url: utils.config('appPath') + '/news/opinioncast/set_onair_log.asp' });
			});
		}
	};

	function getAttr(prop) {
		var rtn = '';

		if (prop !== undefined) {
			rtn = prop;
		}

		return rtn;
	}

	function getAttrForTarget(prop) {
		return getAttr(prop) || '_self';
	}

	function getAttrForTargetFromHref(href) {
		//utils.log('##### href' + href);
		return href.indexOf('http://') > -1 ? '_blank' : '_self';
	}

	function getDecorator(name) {

		var decorator = {
			linkEtc: function () {
				return '<a href="' + getLogParams(this.href) + '" target="' + getAttrForTarget(this.target) + '" class="' + getAttr(this.cls) + '">' + this.name + '</a>';
			},
			link: function () {
				return this.href ? '<a href="' + getAttr(this.href) + '" target="' + getAttrForTarget(this.target) + '" class="' + getAttr(this.cls) + '">' + this.name + '</a>' : '';
			},
			linkImage: function () {
				return '<a href="' + getAttr(this.href) + '" target="' + getAttrForTarget(this.target) + '" class="' + getAttr(this.cls) + '">' + decorator.image.apply(this.img) + '</a>';
			},
			image: function () {
				return '<img src="' + getAttr(this.src) + '" alt="' + getAttr(this.alt) + '">';
			},
			thumb: function () {
				var html = '';

				html += '<span class="thumb">';
				html += '	<a href="' + this.href + '">' + getDecorator('image').apply(this.img) + '</a>';
				html += '</span>';

				return html;
			}
		};

		if (decorator[name] == undefined) {
			utils.error(name + ' is not defined');
		}
		return decorator[name];
	}

	function getLogParams(href) {

		var rtn = href;

		if (href !== undefined && href.indexOf('?') !== -1) {
			rtn += '&';
		} else {
			rtn += '/?';
		}

		return rtn + 'cloc=' + domain + '|' + pageType + '|' + ''; // domain : 'joongang', pageType : home or article, position : navi1(GNB), navi2(MEGA), navi_more, navi_home, list1,
	}

	/**
	* 아티클, 외부 유입인 경우.
	*/
	function resetWidgetForExternalInfo() {

		//utils.log('## resetWidgetForExternalInfo');

		// 포탈 서비스
		// 홈 포털 검색어 편집 기사 : 추천 기사 아래 추가
		// 포토이슈 : 많이 본 기사 위로 이동
		// 내부 홍보 베너 : 댓글 많은 기사 위로 이동

		// SNS
		// SNS 기사 : 추천 기사 아래 추가
		// 포토이슈 : 많이 본 기사 위로 이동
		// 내부 홍보 베너 : 댓글 많은 기사 위로 이동
		var referrer = document.referrer;
		var PORTAL_TARGETS = ['naver.com', 'daum.net', 'www.google', 'nate.com'];
		var SNS_TARGETS = ['facebook.com', 'twitter.com', 'plus.google.com', 'pinterest.com', 'story.kakao.com'];

		var isPortal = PORTAL_TARGETS.filter(function (v) { return referrer.indexOf(v) > -1; }).length > 0 ? true : false;
		var isSns = SNS_TARGETS.filter(function (v) { return referrer.indexOf(v) > -1; }).length > 0 ? true : false;

		//isPortal = true;
		var $externalInflow = $('#externalInflow');

		var params = $.deparam(location.search.replace('?', ''));

		//utils.log('-----------------------' + location.host.indexOf('dev') != -1 && params.refer);

		if ((location.host.indexOf('dev') != -1 || location.host.indexOf('local') != -1) && params.refer) {
			if (params.refer == 'portal') {
				isPortal = true;
			} else if (params.refer == 'sns') {
				isSns = true;
			}
		}

		if (isPortal) {
			//$externalInflow.removeClass('sub_article').addClass('');
			$('#divRealtime').widgetRealtimeArticle();
			//$('#externalInflow').data('widgetType', 'PortalSearchKeyword');
			move('widget_photo_issue', 'widget_hot_articles');
			move('widget_imc_banner', 'widget_hot_articles_orderby_reply');
		} else if (isSns) {
			$('#externalInflow').data('widgetType', 'SnsArticle');
			move('widget_photo_issue', 'widget_hot_articles');
			move('widget_imc_banner', 'widget_hot_articles_orderby_reply');
		}

		function move(id, targetId) {

			var $w = $('<div></div>'),
				$e = $('#' + id);

			$w.html($e.clone());
			$e.remove();

			$('#' + targetId).before($w.html());
		}
	};

	function isExternalInflow() {

		var isExternal = document.referrer && document.referrer.indexOf(document.domain) == -1;

		return isExternal;
	}

	function isMyinfoYN() {
		var isJoongang = document.location.href.indexOf("joongang.joins.com") > 0
            || document.location.href.indexOf("news.joins.com") > 0
            || document.location.href.indexOf("www.joins.com") > 0
            || document.location.href.indexOf("jplus.joins.com") > 0
            || document.location.href.indexOf("search.joins.com") > 0
            || document.location.href.indexOf("plus.dev.joins.com") > 0;

		return isJoongang;
	}

	window.layout = new function Layout() {
		//if (location.host.indexOf("dev.") > -1 || location.host.indexOf("local.") > -1) {
		//	$("body").append("<textarea id='txtDebug' style='width:100%;height:50px;position:fixed;bottom:0px;left:0;border:1px solid red;z-index:100;background:#fff;overflow:auto;'/></textarea>");
		//}

		var _layout = this,
			gnb,
			header,
			header_v2,
			footer,
			footer_v2,
			$gnb = $('#gnb'),
			$body = $(document.body),
			menuKey = utils.menu.getPageMenuKey(),
			arrKey = menuKey.split(','),
			lastMenuKey = arrKey[arrKey.length - 1],
			BUTTON_ATTRIBUTE = {
				login: { 'title': '로그인', 'href': 'https://my.joins.com/login/', 'class': 'login' },
				logout: { 'title': '로그아웃', 'href': 'https://my.joins.com/login/logout.asp', 'class': 'logout' },
				myinfo: { 'title': '내정보', 'href': 'https://my.joins.com/', 'class': 'devmyinfo', 'target': '_blank' }
			};

		(function init() {

			_layout.gnb = new Gnb();
			_layout.header = new Header();
			_layout.header_v2 = new Header_v2();
			_layout.megamenu = new Megamenu();
			_layout.footer = new Footer();
			_layout.footer_v2 = new Footer_v2();
			if (utils.config('articleType') !== ARTICLE_TYPE.spGallery && utils.config('pageType') !== PAGE_TYPE.pcHome && utils.config('pageType') !== PAGE_TYPE.search) {
				_layout.wide = new Wide();
			}

			utils.menu.init(function (_menus) {
				_layout.header.menuRender(_menus);
			});
			
			if (pageType == PAGE_TYPE.search) {
				$('#body').css('background', '#f8f8f8');
			}

			$('#aside').css('min-height', utils.windowSize().height);
		})();

		this.render = function () {
			var articleType = utils.config('articleType'),
				pageType = utils.config('pageType');

			if (pageType == PAGE_TYPE.article) {
				resetWidgetForExternalInfo();
			}
			_layout.footer.render();

			if (!utils.isSpCoverTypeCheck()) {
				if (arrKey.length > 0 && arrKey[0].toLowerCase().indexOf('jplus') !== -1) { //jplus indexOf 조건에 !== -1 이 없어서 추가하였습니다.
					$.getScript(utils.config('jplusPath') + '/Scripts/layout.js', function () {
						// TODO : J플러스 예외처리 > wide 영역
						var totalId = utils.getTotalId();
						jplus.layout.wide.renderHtml(totalId);
					});
				} else {
				    if ((arrKey.length > 0 && arrKey[0].toLowerCase().indexOf('preelection2017') == -1) && window.location.toString().toLowerCase().indexOf("election2017") == -1 && window.location.toString().toLowerCase().indexOf("newsletter") == -1
                        && utils.config('pageType') !== PAGE_TYPE.pcHome && utils.config('pageType') !== PAGE_TYPE.search) { // 경선 + 대선 2017 + 중앙PC 홈 + 검색
				    	_layout.wide.render();
					}
				}
			}
		};

		this.logout = function () {
			setLoginLayout();
		};

		this.login = function () {
			setLogoutLayout();
		};

		function setLoginLayout() {
			var $btn = $gnb.find('.member a'),
				attr = BUTTON_ATTRIBUTE.login;

			$btn.attr(attr).text(attr.title);

			$(".myinfo").hide();
		}

		function setLogoutLayout() {
			var $btn = $gnb.find('.member a'),
				attr = BUTTON_ATTRIBUTE.logout;

			$btn.attr(attr).text(attr.title);

			var socialid = utils.getCookie(COOKIE_NAMES.socialuserId); //소셜로그인 추가.161208

			if (!isMyinfoYN() && !(socialid)) { //소셜로그인 추가.161208
				var $btn2 = $gnb.find('.myinfo a'),
		        attr2 = BUTTON_ATTRIBUTE.myinfo;
				$btn2.attr(attr2).text(attr2.title);

				$(".myinfo").show();
			}
			else $(".myinfo").hide();
		}

		function Gnb() {
			var _gnb = this,
				gnbStyle = 'general', // general, gray, black
				gnbLoginYn = 'Y',
				data = {
					slogo: utils.linkService.getData('joins', { html: '<em>Joins</em>' }),
					family_site: [
						/*utils.linkService.getData('joongangilbo', { html: '<em>중앙일보</em>', pCls: 'joongangilbo' }),
						utils.linkService.getData('joongangsunday', { html: '<em>중앙<strong>SUNDAY</strong></em>', pCls: '' }),
						utils.linkService.getData('jtbc', { html: '<em>JTBC</em>', pCls: 'jtbc' }),
						utils.linkService.getData('ilgansports', { html: '<em>일간스포츠</em>', pCls: 'isplus' }),
						utils.linkService.getData('koreajoongangdaily', { html: '<em><strong>Korea JoongAng Daily</strong></em>', pCls: '' }),*/
						{ link: { pCls: 'jmnet', html: '<em>중앙그룹 <span>브랜드</span></em>', href: '#jmnet_more', cls: 'jmnet_more', title: '중앙그룹 브랜드 레이어 열기' } }
					],
					login: utils.linkService.getData('login')
				},
				directives = {
					slogo: { link: utils.decorators.link },
					family_site: {
						item: {
							pCls: function (params) {
								if (this.link.pCls) {
									ele = params.element;
									$(ele).addClass(this.link.pCls);
								}
							}
						},
						link: utils.decorators.link
					},
					login: { link: utils.decorators.link }
				};

			this.render = function (targetId) {

				var html = '',
					jmnetHtml = '',
					$jmnetLayer = $('#layer_jmnet');

				targetId = targetId || 'gnb';
				
				if (gnbStyle == 'black' || utils.isCoverTypeCheck() || menuKey.toLowerCase().indexOf('preelection2017') !== -1 || window.location.toString().toLowerCase().indexOf("election2017") !== -1) {
					html += '<span class="back_mask"></span>';
				}
				html += '<div class="doc">';
				html += '   <strong class="slogo" ><a href="#" data-bind="link"><em>Joins</em></a></strong>';
				html += '   <div class="gnb_doc">';
				html += '	   <h2 class="hidden">패밀리 사이트</h2>';
				html += '	   <ul class="family_site">';
				html += '		   <li data-bind="item"><a href="#" data-bind="link"></a></li>';
				html += '	   </ul>';
				if (gnbLoginYn == 'Y') {
				    html += '	   <h2 class="hidden">로그인</h2>';
				    html += '	   <ul class="member">';
				    html += '		   <li class="login"> <a href="#" data-bind="link"></a> </li>';
				    html += '	   </ul>';
				    html += '	   <h2 class="hidden">내정보</h2>';
				    html += '	   <ul class="myinfo" style="display:none;">';
				    html += '		   <li class="devmyinfo"> <a href="#" data-bind="link"></a> </li>';
				    html += '	   </ul>';
				}
				html += '   </div>';
				html += '</div>';

				jmnetHtml += "<div id='layer_jmnet' style='display:none;' class='layer_jmnet'>";
				jmnetHtml += "<span class='mask'></span><span class='shadow_btm'></span><span class='shadow_md'></span><span class='shadow_rt'></span>";
				jmnetHtml += "<ul class='area1'>";
				jmnetHtml += "<li class='a'>";
				jmnetHtml += "<dl>";
				jmnetHtml += "<dt>신문</dt>";
				jmnetHtml += "<dd>" + utils.getLinkData("joongangilbo") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("joongangsunday") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("ilgansports") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("koreajoongangdaily") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("koreadaily") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("joind") + "</dd>";
				jmnetHtml += "</dl>";
				jmnetHtml += "</li>";
				jmnetHtml += "<li class='b'>";
				jmnetHtml += "<dl>";
				jmnetHtml += "<dt>방송</dt>";
				jmnetHtml += "<dd>" + utils.getLinkData("jtbc") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("jtbc2") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("jtbc3foxsports") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("jtbc4") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("jtbcgolf") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("jtbcworldwide") + "</dd>";
				jmnetHtml += "</dl>";
				jmnetHtml += "</li>";
				jmnetHtml += "<li class='b'>";
				jmnetHtml += "<dl>";
				jmnetHtml += "<dt>멀티플렉스 &amp; 레저</dt>";
				jmnetHtml += "<dd>" + utils.getLinkData("megabox") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("megaboxfilmhome") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("megaboxclassichome") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("phoenixhnr") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("phoenixhnrpyeongchang") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("phoenixhnrjeju") + "</dd>";
				jmnetHtml += "</dl>";
				jmnetHtml += "</li>";
				jmnetHtml += "</ul>";
				jmnetHtml += "<ul class='area2'>";
				jmnetHtml += "<li class=''>";
				jmnetHtml += "<dl> <dt>매거진 &amp; 출판</dt>";
				jmnetHtml += "<dd>" + utils.getLinkData("monthlyjoongang") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("economist") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("forbeskorea") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("jbooks") + "</dd>";
				jmnetHtml += "</dl>";
				jmnetHtml += "</li>";
				jmnetHtml += "<li class='c'>";
				jmnetHtml += "<dl> <dt></dt>";
				jmnetHtml += "<dd>" + utils.getLinkData("elle") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("harpersbazaar") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("cosmopolitan") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("esquire") + "</dd>";
				jmnetHtml += "</dl>";
				jmnetHtml += "</li>";
				jmnetHtml += "</ul>";
				jmnetHtml += "<ul class='area3'>";
				jmnetHtml += "<li class='d'>";
				jmnetHtml += "<dl> <dt>전문 콘텐트</dt>";
				jmnetHtml += "<dd>" + utils.getLinkData("joinsland") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("jhealthmedia") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("chinajoins") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("koreanjoins") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("jdphone") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("esukorea") + "</dd>";
				jmnetHtml += "</dl>";
				jmnetHtml += "</li>";
				jmnetHtml += "</ul>";
				jmnetHtml += "<ul class='area2'>";
				jmnetHtml += "<li class='d'>";
				jmnetHtml += "<dl> <dt>서비스</dt>";
				jmnetHtml += "<dd>" + utils.getLinkData("joins") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("ssully") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("folin") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("jtbcnow") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("jtbcnews") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("oohmedia") + "</dd>";
				jmnetHtml += "</dl>";
				jmnetHtml += "</li>";
				jmnetHtml += "<li class='c'>";
				jmnetHtml += "<dl> <dt></dt>";
				jmnetHtml += "<dd>" + utils.getLinkData("jmembership") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("sigol") + "</dd>";
				jmnetHtml += "<dd>" + utils.getLinkData("tj4") + "</dd>";
				jmnetHtml += "</dl>";
				jmnetHtml += "</li>";
				jmnetHtml += "</ul>";
				jmnetHtml += "</div>";

				$gnb = $('#' + targetId);

				//utils.log('################');
				//utils.log($gnb);

				$gnb.html(html).render(data, directives);
				$gnb.find('.gnb_doc').append(jmnetHtml);
				//.find('.layer_jmnet').prepend('<span class="mask"></span><span class="shadow_btm"></span><span class="shadow_md"></span><span class="shadow_rt"></span>')
				$gnb.on('click', 'a.jmnet_more', function () {

					var $jmnetLayer = $('.layer_jmnet', $gnb),
						$parent = $(this).parent();

					if ($jmnetLayer.css('display') == 'none') {
						$jmnetLayer.fadeIn(200);
					} else {
						$jmnetLayer.hide();
					}

					$parent.toggleClass('jmnet_open');

					return false;
				});

				if (utils.config(CONFIG_NAMES.isLogin)) {
					setLogoutLayout();
				}

				function closeJmnet() {
					$('.layer_jmnet', $gnb).hide();
				}

				$(document.body).on('click', function (e) {

					var $target = $(utils.getElementFromEvent(e));

					if ($target.closest('.layer_jmnet').length === 0) {
						closeJmnet();
					}
				});

				//remove jmnet title
				$('.layer_jmnet').find('li[data-bind="listinfo"]').each(function () {
					var $dt = $(this).find('>span dt'),
						$target = $(this).find('dl').prepend($dt);

					$(this).find('>span').remove();
				});
			};

			this.renderHtml = function (styleType, loginYn) {

			    gnbStyle = styleType || 'general'; // general, gray, black
			    gnbLoginYn = loginYn || 'Y';
				var gnbId = 'gnb',
					cssHref = window.GNB_STYLES[gnbStyle];

				if (!cssHref) {
					gnbStyle = 'general';
					cssHref = window.GNB_STYLES.general;
				}
				utils.loadStyle(cssHref, function () {
					document.write('<div id="' + gnbId + '" class="joins_gnb gnb_joins_service"></div>');
					_gnb.render(gnbId);
				});
			};
		};

		function Header() {

			var _header = this,
				$head = $('#head'),
				$keyword = $('#search_keyword'),
				searchKeyword = $('#Keyword').val() || '',
				data = {
					sns: [
						utils.linkService.getData('kakaotalk', { cls: 'kakaotalk', service: 'kakaotalk' }),
						utils.linkService.getData('facebook', { cls: 'facebook', service: 'facebook' }),
						utils.linkService.getData('twitter', { cls: 'twitter', service: 'twitter' }),
						utils.linkService.getData('kakaostory', { cls: 'kakaostory', service: 'kakaostory' })
					],
					languageSite: [utils.linkService.getData('jp', { pCls: 'jp' }), utils.linkService.getData('cn', { pCls: 'cn' }), utils.linkService.getData('en', { pCls: 'en' })],
					headTitle: $('#article_title').text() || '',
					headerLogoImage: $('#header_logo_image_url').val() || '',
					issueSeriesSeq: $('#issueSeries_seq').val() || '',
					issueSeriesLink: $('#issueSeries_link').val() || ''
				},
				directives = {
					services: { item: { html: getDecorator('link') } },
					languageSite: {
						link: utils.decorators.link,
						pCls: {
							'class': function (params) {
								return this.link.pCls;
							}
						}
					},
					services2: { item: { html: getDecorator('link') } },
					languageSite: {
						link: utils.decorators.link,
						pCls: {
							'class': function (params) {
								return this.link.pCls;
							}
						}
					},
					sns: {
						link: utils.decorators.link,
						service: {
							text: function (params) {
								$(params.element).find('a').data('service', this.link.service);
							}
						}
					}
				},
				pageType = utils.config('pageType'),
				configMenus = utils.config('menus'),
				slideOptions = { direction: 'right' },
				slideDuration = 300;

			if (pageType == PAGE_TYPE.article) {
				data.sns.push({ key: 'email', link: { text: '이메일', cls: 'email' } });
			}

			/*if (pageType == PAGE_TYPE.index) {
                var options = utils.linkService.getData('time7');
                options.link.cls = 'email';
                data.sns.push(options);
            }*/

			// 메뉴 Data 에 기반하는 영역 Rendering.
			this.menuRender = function (_menus) {

				// menuKey reset;;
				menuKey = utils.menu.getPageMenuKey();
				arrKey = menuKey.split(',');
				lastMenuKey = arrKey[arrKey.length - 1];

				var menu = null,
					menuData = { title: {}, list: [] },
					template = '',
					menuHtml = '',
					directives = {
						title: { link: utils.decorators.menuLink },
						list: {
							link: utils.decorators.menuLink,
							on: {
								'class': function () {
									return this.active && this.active.cls;
								}
							}
						},
						newsGroup: { link: utils.decorators.menuLink, icon: utils.decorators.icon },
						sectionGroup: { link: utils.decorators.menuLink, icon: utils.decorators.icon },
						etcGroup: { link: utils.decorators.menuLink, icon: utils.decorators.icon }
					};

				//utils.log('## menuRender');
				//console.log('menuKey : ' + menuKey);
				//utils.log('lastMenuKey : ' + lastMenuKey);

				// 상단 메뉴 template, data 셋팅
				if (pageType == PAGE_TYPE.index) {
					menu = _menus.getMenuFromKey('NewsGroup');
					template = '' +
					'<ul class="gnb_news mg" data-bind="newsGroup">' +
						'<li data-bind="icon"><a href="#none" data-bind="link"></a></li>' +
					'</ul>' +
					'<ul class="gnb_section mg" data-bind="sectionGroup">' +
						'<li data-bind="icon"><a href="#none" data-bind="link"></a></li>' +
					'</ul>' +
					'<ul class="gnb_etc mg" data-bind="etcGroup">' +
						'<li data-bind="icon"><a href="#none" data-bind="link"></a></li>' +
					'</ul>';

					menuData = {
						newsGroup: [],
						sectionGroup: [],
						etcGroup: []
					};

					/*menu.Children.forEach(function (v) {
						if (v.IsShowTopMenu) {
							menuData.newsGroup.push(utils.models.getLinkFromMenu(v));
						}
					});*/
					menuData.newsGroup = [
                        utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('Opinion')),
                        utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('Politics')),
						utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('Money')),
                        utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('Society')),
						utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('World')),
                        utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('Culture')),
						utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('Sports'))
					];

					menuData.sectionGroup = [
						utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('Misezero')),
						utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('Jpod')),
                        utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('Retirement')),
                        utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('Mm')),
						utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('ResetKorea'))
					];

					menuData.etcGroup = [
						//utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('JoongangMemberShip')),
						utils.models.getLinkFromMenu(utils.menu.getMenuFromKey('TypeSetting'))
					];

					// DESC : new 아이콘 셋팅
					// TODO : 키값만 전달하는 방식이 좋겠다.
					//menuData.sectionGroup[1].icon = { newIcon: true };

				} else {

					if (configMenus != '') {
						menu = configMenus;
					} else {
						menu = _menus.getMenuFromKey(menuKey);
					}

					if (menu == null || menu == '') {
						return;
					}

					if (menu.Parent && menu.Parent.IsShowTopMenu && menu.Parent.Key) {
						menu = menu.Parent;
					}

					//헤딩 태그 - 메인
					var headingTagTitle = 'h1';
					if (menuKey.indexOf(',') > -1 || pageType == PAGE_TYPE.article || document.location.href.indexOf('/list') > -1) headingTagTitle = 'h2';
					if (lastMenuKey == 'Issue' && $('div.issue_title').length > 0) headingTagTitle = 'h2';
					if (lastMenuKey == 'Jpod' && ($('div.jpod_channel_info').length > 0 || $('div.article_head').length > 0)) headingTagTitle = 'h2';
					if (lastMenuKey == 'Reporter' && $('div.journalist_title').length > 0) headingTagTitle = 'h2';
					if (lastMenuKey == 'Retirement' && $('div.showcase_type_a').length == 0) headingTagTitle = 'h2';
					if ('|BrandNews|Jebo|'.indexOf('|' + lastMenuKey + '|') > -1) headingTagTitle = 'h2';
					if ('|DigitalSpecial|'.indexOf('|' + lastMenuKey + '|') > -1) headingTagTitle = 'h1';

					// displayTitle, logoImage 적용
					var menuDisplay = '';
					var logoImage = '';
					menuDisplay = menu.DisplayTitle || menu.Display;
					logoImage = menu.LogoImage || '';
					if (pageType == PAGE_TYPE.search) {
						template += '<ul class="mg" data-bind="list">' +
							'<li data-bind="on"><a data-bind="link"></a></li>' +
							'</ul>';
					} else if (lastMenuKey == "Issue" || lastMenuKey == "Reporter" || lastMenuKey == 'CommentList' || lastMenuKey == 'Jtbc') { // 시세, 이한마디, 타임7
						if (lastMenuKey == "Issue" || lastMenuKey == "Reporter") {
							template = '<' + headingTagTitle + ' class="mg" data-bind="title"><a data-bind="link"></a></' + headingTagTitle + '>';

							if ($("input#reporterType").length > 0) {
								menuData.title = {
									link: {
										href: (menu.Url ? menu.Url.Path : ''),
										text: ($("input#reporterType").val().toLowerCase() == "jplus" ? "" : menuDisplay)
									}
								};
							}
							else {
								menuData.title = {
									link: {
										href: (menu.Url ? menu.Url.Path : ''),
										text: (menuDisplay)
									}
								};
							}
						} else {
							template = '<' + headingTagTitle + ' class="mg" data-bind="title"></' + headingTagTitle + '>';
							menuData.title = menuDisplay;
						}
					}
					else {
						if (menuKey.toLowerCase().indexOf('worldcup2018') > -1) logoImage = utils.config('imagePath') + '/pc/worldcup2018/logo_worldcup2018.png';

						if (logoImage !== '') {
							var logoAlt = $('meta[name="description"]').attr('content');
							template = '<' + headingTagTitle + ' class="mg" data-bind="title"><a data-bind="link"><img src="' + logoImage + '" alt="' + logoAlt + '" /></a></' + headingTagTitle + '>';
						} else {
							template = '<' + headingTagTitle + ' class="mg" data-bind="title"><a data-bind="link"></a></' + headingTagTitle + '>';
						}
						if (menu.Children.length) {
							template += '' +
							'<ul class="mg" data-bind="list">' +
								'<li data-bind="on"><a data-bind="link"></a></li>' +
							'</ul>';
							if (menu.Key == "Retirement") {
								template += '' +
								'<a class="mg btn_subsc" href="/Retirement/Subscribe?cloc=joongang|section|subsection"><h2>필진 Pick</h2></a>'
							}
						}
						menuData.title = { link: { href: (menu.Url ? menu.Url.Path : ''), text: menuDisplay } };
					}

					//헤딩 태그 - 서브
					var headingTagList = 'h2';
					var headingPlusList = '|CanadaDiscover|Live|Monthly|RetirementIntro|Timeline|TopHistory|Weekly|';

					lastMenuKey = lastMenuKey == 'Find' ? 'All' : lastMenuKey;
					menuData.list.length = 0;
					menu.Children.forEach(function (v) {
						var link = v.Url && v.Url.Path;

						if (pageType == PAGE_TYPE.search) {
							link = link.indexOf('{KEYWORD}') > -1 ? link.replace('{KEYWORD}', searchKeyword) : link + '?keyword=' + encodeURIComponent(searchKeyword);
						}

						if (headingPlusList.indexOf('|' + lastMenuKey + '|') > -1 && lastMenuKey == v.Key) {
							headingTagList = 'h1';
						} else {
							headingTagList = 'h2';
						}
						//v.Display = '<' + headingTagList + '>' + v.Display + '</' + headingTagList + '>';

						if (configMenus == '') {
							if (v.IsShowTopMenu) {
								menuData.list.push({ link: { html: v.Display, href: link, key: v.Key }, active: { cls: (lastMenuKey.toLowerCase() == v.Key.toLowerCase() ? 'on' : '') } });
							}
						} else {
							menuData.list.push({ link: { html: v.Display, href: link, key: v.Key }, active: { cls: (lastMenuKey.toLowerCase() == v.Key.toLowerCase() ? 'on' : '') } });
						}
					});

					if (pageType == PAGE_TYPE.search) {
						menuData.list[4].link = { html: menuData.list[4].link.html + ' <em>지면</em>', href: menuData.list[4].link.href };
						menuData.list[4].link.text = '';
					}

				}

				//utils.log('## gnb menuData');
				//utils.log(menuData);
				//utils.log(directives);
				//utils.log(template);

				menuHtml = $.renderTemplate({ data: menuData, template: template, directives: directives });

				//utils.log(menuHtml);

				renderMenu(menuHtml);

				function renderMenu(menuHtml) {
					var $gnbMenu = $('#gnb_menu'),
						pathname = location.pathname.toLowerCase();

					if ($gnbMenu.length > 0 && $gnbMenu.data('render') != true) {
						$gnbMenu.append(menuHtml);
						$gnbMenu.data('render', true);
						if (menu.Key == "Retirement") {
							retirementMenu();
						}
					} else {
						setTimeout(function () {
							renderMenu(menuHtml);
						}, 250);
					}

					// 섹션명 Cloc
					$gnbMenu.find('h2.mg a').each(function () {
						if (pathname.indexOf('article') > -1) {
							$(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|sectiontitle'));
						} else if (pathname.toLowerCase().indexOf('misezero') > -1) {
						    $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'Joongang|misezero|bi'));
						} else {
							$(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|section|sectiontitle'));
						}
					});

					// 2depth Cloc
					$gnbMenu.find('ul.mg a').each(function (i) {
						var $a = $(this),
							attr = $a.attr('href');

						if (pageType == PAGE_TYPE.index) {

							var $menuGroup = $a.closest('ul'),
								groupType = $menuGroup.data('bind'),
								menuNumber = $menuGroup.find('a').index($a) + 1;

							if (groupType === 'newsGroup') {
								$a.attr('href', utils.getClocUrl(attr, 'joongang|home|section' + menuNumber));
							} else if (groupType === 'sectionGroup') {
								$a.attr('href', utils.getClocUrl(attr, 'joongang|home|subsection' + menuNumber));
							} else {
								$a.attr('href', utils.getClocUrl(attr, 'joongang|home|service' + menuNumber));
							}

							//$(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|section|subsection'));
						} else {
							if (pathname.indexOf('article') > -1) {
								$a.attr('href', utils.getClocUrl(attr, 'joongang|article|subsection'));
							} else {
								$a.attr('href', utils.getClocUrl(attr, 'joongang|section|subsection'));
							}
						}
					});

					if (menuKey.toLowerCase().indexOf('worldcup2018') > -1) $gnbMenu.find('ul.mg').hide();
				}

				function retirementMenu() {
					if (menu.Key == "Retirement") {
						var xhtml = "";
						var menucnt = 0;
						var pathname = location.pathname.toLowerCase();
						try {
							$.ajax({
								type: "GET",
								url: utils.config('apiPath') + "/pagecall/?u=" + utils.config('staticPath') + "/scripts/data/retirementv2/xml/index_publish_hashtag.xml",
								dataType: "XML",
								success: function (xml) {

									if ($(xml).find("article").length > 0) {
										$(xml).find("article").each(function (i, e) {
											if ($(e).find("isfirst").text() == "Y" && menucnt < 3) {
												if ($(e).find("title").text() !== "") {
													if (pathname == "/retirement/hashtag/" + $(e).find("total_id").text()) {
														xhtml += "<li class='on'><a href='/retirement/hashtag/" + $(e).find("total_id").text() + "'><h2>#" + $(e).find("title").text() + "</h2></a></li>";
													} else {
														xhtml += "<li><a href='/retirement/hashtag/" + $(e).find("total_id").text() + "?cloc=joongang|section|subsection'><h2>#" + $(e).find("title").text() + "</h2></a></li>";
													}
													menucnt++;
												}
											}
										});
										$("#gnb_menu").find("ul.mg").prepend(xhtml);
									}
								}, error: function () { }
							});
						} catch (e) { }
					}
				}
			};

			this.renderHtml = function () {
				document.write('<div id="head"></div>');
				_header.render();
			};

			// Header 기본 Rendering
			this.render = function (targetId) {
				var html = '',
					nowDate = new Date().format('yyyy.MM.dd (e)'),
					searchHtml = '',
					weatherHtml = '',
					snsHtml = '',
					popHtml = '',
					btnOpenHtml = '<button type="button" class="btn_open_aside" id="btnOpenAside" style="display:none;">열기</button>',
					pageType = utils.config('pageType'),
					headStyle = '';

				sundayHtml = '';

				sundayHtml += '<div class="link">';
				sundayHtml += '<a href="/sunday/volumelist?cloc=joongang|sundayhome|eachnews">호별보기<span class="icon"></span></a>';
				sundayHtml += '</div>';

				searchHtml += '<div class="search" id="searchArea">';
				searchHtml += '<fieldset>';
				searchHtml += '   <legend class="hide">검색</legend>';
				searchHtml += '   <label for="search_word" style="visibility:visible;">뉴스검색</label><!-- visibility: visible / hidden ; -->';
				searchHtml += '   <input type="text" id="searchKeyword" class="txt" autocomplete="off" value="' + searchKeyword + '">';
				searchHtml += '   <button type="button" id="btnSearch" class="btn">검색</button>';
				searchHtml += '</fieldset>';
				searchHtml += '</div>';

				/*weatherHtml += '<div class="weather_wrap" id="weather">' +
					'<div class="date"><strong class="mg">' + nowDate + '</strong></div>' +
					'<div class="weather">' +
					'<a data-bind="link" class="disable"><strong class="mg" data-bind="text"></strong><img data-bind="image"></a>' +
					'</div>' +
					'</div>';*/
				weatherHtml += '<div class="weather_wrap_v2" id="weather">' +
					'<a data-bind="link" class="disable">' +
					'<span class="date"><strong class="mg">' + nowDate + '</strong></span>' +
					'<span class="weather">' +
					'<strong class="mg" data-bind="regionNm"></strong> <strong class="mg" data-bind="curTemp"></strong>' +
					'<img data-bind="image" />' +
					'<span class="air"><em>미세먼지</em> <em data-bind="airGrade" class="good"></em></span>' +
					'</span>' +
					'</a>' +
					'</div>';

				snsHtml += '<div class="sns_wrap">' +
					'<ul class="sns clearfx" data-bind="sns">' +
					'<li data-bind="service"><a href="#" data-bind="link" target="_blank"></a></li>' +
					'</ul>' +
					'<div class="btn_search">' +
					'<a href="#none" id="btnOpenSearch">검색</a><span class="icon"></span>' +
					'</div>' +
					'</div>';

				popHtml += '<div class="layer_popup" id="layer_social_login">' +
						'<div class="inner">' +
						'<p class="hide">소셜 로그인 안내 레이어</p>' +
						'<p class="info_msg mg">' +
						'<strong>소셜 로그인 기능이 추가되었습니다</strong>' +
						'<em>페이스북, 트위터, 네이버, 카카오</em> 계정으로<br>' +
						'간편하게 로그인 기능을 사용해보세요.' +
						'</p>' +
						'<p class="info_txt">5초 뒤에 자동으로 닫힙니다.</p>' +
						'</div>' +
						'<div class="close">' +
						'<button type="button" class="btn_close">닫기</button>' +
						'</div>' +
						'</div>';

				if (pageType == PAGE_TYPE.index) {

					var indexLogoHtml = $head.find('.head_top').html();
					html += '<div class="head_top">' +
						'<div class="homepage_wrap">' +
						'<div class="homepage" style="display:none;">' +
						'<button type="button" id="btnStartPage">중앙일보를 시작페이지로</button>' +
						'</div>' +
						'<div class="language">' +
						'<ul class="clearfx" data-bind="languageSite">' +
						'<li data-bind="pCls"><a href="#" data-bind="link"></a></li>' +
						'</ul>' +
						'</div>' +
						'</div>';

					if (indexLogoHtml) {
						html += indexLogoHtml;
					} else {
						html += '<div class="logo_wrap"><div class="logo"><h1 class="mg"><a href="' + utils.config('homePath') + '">중앙일보</a></h1></div></div>';
					}

					html += '<div class="gnb" id="gnb_menu"></div>';
					html += '<div class="btn_all"><a href="#none" id="btnOpenMegamenu"><span class="icon"></span><strong class="mg">전체</strong></a></div>';
					html += snsHtml;
					html += searchHtml;
					html += weatherHtml;
					html += '<div class="event_banner_wrap" id="eventBanner"></div>';
					//html += popHtml;
					html += btnOpenHtml;
					html += '</div>';

				} else if (pageType == PAGE_TYPE.search) {
					html += '<div class="head_search">';
					html += '<div class="search_wrap">';
					html += '   <div class="logo"><h2 class="mg"><a href="' + utils.config('homePath') + '">중앙일보</a></h2></div>';
					html += searchHtml;
					html += '</div>';
					html += '<div class="gnb_wrap">';
					html += '<div class="btn_all"><a href="#none" id="btnOpenMegamenu" class="mg"><span class="icon"></span>전체메뉴</a></div>';
					html += '<div class="gnb" id="gnb_menu">';
					//html += '	<h2 class="hide">검색</h2>';
					html += '</div>';
					html += '</div>';
					html += btnOpenHtml;
					html += '</div>';
				} else if (lastMenuKey == "Issue" || lastMenuKey == "Reporter") {
					html += '<div class="head_top">';
					html += '<div class="logo"><h2 class="mg"><a href="' + utils.config('homePath') + '">중앙일보</a></h2></div>';
					html += '<div class="gnb" id="gnb_menu"></div>';
					html += '<div class="btn_all"><a href="#none" id="btnOpenMegamenu">전체보기</a></div>';
					html += snsHtml;
					html += searchHtml;
					html += '<div class="title"><p class="mg" id="head_title">' + data.headTitle + '</p></div>';
					html += btnOpenHtml;
					html += '</div>';
				} else {
					var articleType = utils.config('articleType');
					if (articleType == ARTICLE_TYPE.spGallery) {
						html += '<div class="head_top">';
						html += '<div class="logo"><h2 class="mg"><a href="' + utils.config('homePath') + '">중앙일보</a></h2></div>';
						if (data.headerLogoImage != "") {
							var issueSeriesLink = utils.config('webPcPath') + "/issueSeries/" + data.issueSeriesSeq;
							if (data.issueSeriesLink != "") {
								issueSeriesLink = data.issueSeriesLink;
							}
							html += '<div class="gnb"><h2 class="mg" id="head_title">' + '<a href="' + issueSeriesLink + '"><img src="' + data.headerLogoImage + '"></a>' + '</h2></div>';
						}
						html += '<div class="btn_all"><a href="#none" id="btnOpenMegamenu">전체보기</a></div>';
						html += searchHtml;
						html += '</div>';
					} else {
						html += '<div class="head_top">';
						html += '<div class="logo"><h2 class="mg"><a href="' + utils.config('homePath') + '">중앙일보</a></h2></div>';
						html += '<div class="gnb" id="gnb_menu"></div>';
						html += '<div class="btn_all"><a href="#none" id="btnOpenMegamenu">전체보기</a></div>';
						if ((arrKey.length > 0 && arrKey[0].toLowerCase().indexOf('preelection2017') == -1) && window.location.toString().toLowerCase().indexOf("election2017") == -1) {  // 경선 + 대선 2017 제외
							html += snsHtml;
						}

						if (arrKey.length > 0 && (arrKey[0].toLowerCase().indexOf('sunday') !== -1 && !utils.isSpCoverTypeCheck())) {
							html += sundayHtml;
						}

						if ((arrKey.length > 0 && arrKey[0].toLowerCase().indexOf('preelection2017') == -1) && window.location.toString().toLowerCase().indexOf("election2017") == -1) {  // 경선 + 대선 2017 제외
							html += searchHtml;
						}

						if (utils.isSpCoverTypeCheck() && data.headerLogoImage != "") {
							var issueSeriesLink = utils.config('webPcPath') + "/issueSeries/" + data.issueSeriesSeq;
							if (data.issueSeriesLink != "") {
								issueSeriesLink = data.issueSeriesLink;
							}
							html += '<div class="title"><p class="mg" id="head_title">' + '<a href="' + issueSeriesLink + '"><img src="' + data.headerLogoImage + '"></a>' + '</p></div>';
						} else {
							html += '<div class="title"><p class="mg" id="head_title">' + data.headTitle + '</p></div>';
						}
						html += btnOpenHtml;
						if (arrKey.length > 0 && arrKey[0].toLowerCase().indexOf('preelection2017') !== -1) {  // 경선2017 만
							html += '<div class="pre_elect_day"><strong class="mg">대통령 선거일</strong> <em>05.09</em></div>';
						} else if (window.location.toString().toLowerCase().indexOf("election2017") !== -1) {  // 대선2017
							html += '<div class="elect_day"></div>';
						}
						html += '</div>';
					}

				}

				$head = targetId ? $('#' + targetId) : $('#head');
				$head.html(html).render(data, directives);

				$('#btnOpenMegamenu').on('click', layout.megamenu.openHandler);

				var isLoginContents = utils.getIsLoginContents();

				$('.sns_wrap a.email', $head).on('click', function () {
					if (isLoginContents && !userInfo.isLogin()) {
						alert('로그인을 해야 이용하실 수 있습니다.');
						return false;
					}
					if (pageType !== PAGE_TYPE.index) {
						utils.shareArticleForMail();
						return false;
					}
				});

				if (utils.browser.msie) {
					var $btnStartPage = $('#btnStartPage', $head);
					$btnStartPage.parent().show();
					$btnStartPage.on('click', function () {
						utils.setStartPage();
					});
				}

				if (pageType == PAGE_TYPE.index) {
					//utils.log('## weather_data');
					setHeaderWeather();
				}
				if (pageType == PAGE_TYPE.search) {
					$('#searchKeyword').addClass('mg');
				}

				setSearchForm();

				setSearchAd(); //광고용 코드

				function setHeaderWeather() {
					var weatherUrl = utils.config('staticRootPath') + '/common/data/weather/today_weather_list.js';
					//var weatherUrl = 'http://static.joins.com/common/data/weather/top_weather.js';

					var propertyName = 'TODAY_WEATHER_LIST';
					//var propertyName = 'weather_data';

					$.getScript(weatherUrl, function () {

						if (window[propertyName]) {
							renderWeather();
						} else {
							//setTiemout(setHeaderWeather, 4000);
						}
					});

					function renderWeather() {
						var $weather = $('#weather'),
							index = $weather.data('index') || 0,
							originData = window[propertyName] || {},
							data = { link: { href: 'http://weather.joins.com/', title: '날씨로 이동' }, image: {}, regionNm: {}, curTemp: {}, airGrade: {} },
							directives = {
								link: utils.decorators.link,
								image: utils.decorators.image,
								regionNm: {
									text: function () {
										return this.regionNm.text;
									}
								},
								curTemp: {
									text: function () {
										return this.curTemp.text;
									}
								},
								airGrade: {
									text: function () {
										return this.airGrade.text;
									},
									"class": function () {
										return this.airGrade.classNm;
									}
								}
							};
						try {
							data.regionNm = {
								text: originData.DATA[index].REGION_NM
							};
							data.curTemp = {
								text: originData.DATA[index].CUR_TEMP + '℃'
							};
							data.airGrade = {
								text: originData.DATA[index].PM10_GRADE,
								classNm: originData.DATA[index].PM10_GRADE == "나쁨" ? "bad" : "good"
							};
							data.image = {
								src: originData.DATA[index].WEATHER_ICON_URL,
								alt: originData.DATA[index].WEATHER_STS
							};
						}
						catch (e) { };
						$weather.render(data, directives);
						index = (originData.DATA.length - 1 == index ? 0 : index + 1);
						$weather.data('index', index);
						setTimeout(renderWeather, 2000);
					}
				}

				function setSearchForm() {

					var $aside = $('#aside'),
						$btnOpenSearch = $('#btnOpenSearch', $head),
						$btnSearch = $('#btnSearch', $head),
						$searchKeyword = $('#searchKeyword', $head),
						$searchArea = $('#searchArea', $head),
						$snsArea = $('.sns_wrap', $head),
						$isSearched = true;

					$btnOpenSearch.on('click', function () {
						showSearch();
						$searchKeyword.focus();
						return false;
					});

					$searchKeyword.searchAutoComplete && $searchKeyword.searchAutoComplete();

					if (pageType == PAGE_TYPE.search) {
						$searchKeyword.prev().addClass('hide');
					}

					if (pageType == PAGE_TYPE.article || pageType == PAGE_TYPE.search) {

						$searchArea.show();
						$snsArea.hide();

					} else {

						if ($aside.css('display') == 'block') {
							$searchArea.show();
							$snsArea.hide();
						} else {
							$searchArea.hide();
							$snsArea.show();
						}
					}

					$btnSearch.off('click').on('click', function (event) {
						var keyword = $searchKeyword.val();
						search(keyword);
						//event.stopPropagation();
						//event.preventDefault();
						return false;
					});

					$searchKeyword.on('keyup', function (e) {

						//utils.log('$searchKeyword : key');
						var keyword = $searchKeyword.val() || '',
							keyCode = utils.getKeyCode(e);

						if (pageType != PAGE_TYPE.search) {
							if (keyword.isEmpty()) {
								$searchKeyword.prev().show();
							} else {
								$searchKeyword.prev().hide();
							}
						}

						if (keyCode == 13) {
							$btnSearch.click();
						}
					});

					function search(keyword) {
						if (keyword.isEmpty()) {
							return alert('검색어를 입력해주세요.');
						}

						utils.saveSearchHistory(keyword);

						try {
							if ($isSearched) {
								utils.setSearchKeywordLog(keyword);
								$isSearched = false;
							}
						} catch (e) { }

						var parameter = $.deparam(location.search.replace('?', '')),
							pathName = location.pathname.toLowerCase(),
							searchUrl = utils.config('searchWebPath');
						//searchUrl = utils.getUrlFormat(URL_NAMES.search, keyword);

						if (document.location.href.indexOf(utils.config('searchWebPath')) > -1) {
							searchUrl = utils.config('webPcPath') + pathName + '?keyword=' + encodeURIComponent(keyword);
						} else {
							searchUrl = utils.config('searchWebPath') + '?keyword=' + encodeURIComponent(keyword);
						}

						utils.log(location.origin);

						if (typeof parameter['SearchCategoryType'] != 'undefined') {
							searchUrl += '&SearchCategoryType=' + parameter['SearchCategoryType'];
						}

						location.href = searchUrl;
						//return false;
					}

				}

				//광고용 코드
				function setSearchAd() {
					var adHtml = '<div class="auto_ad" style="display:none;">';
					adHtml += '	<a class="close" href="#none">레이어 닫기</a>';
					adHtml += '	<div class="ad_info"><span class="mg">뉴스를 읽는 새로운 맛, <strong>기자를 검색해보세요!</strong></span> <span class="sfont">5초 뒤에 자동으로 닫힙니다</span></div>';
					adHtml += '</div>';
					var $searchArea = $('#searchArea').append(adHtml);

					$searchArea.find("a.close").on("click", function () {
						$searchArea.find(".auto_ad").hide();
						//$searchArea.find(".autocomplete").show();
						return false;
					})
				}
			};

			this.bindCloseSearchArea = function () {
				//utils.log('## bindCloseSearchArea');
				$(document.body).on('click', closeSearchAreaHandler);
			};

			this.unbindCloseSearchArea = function () {
				//utils.log('## unbindCloseSearchArea');
				$(document.body).off('click', closeSearchAreaHandler);
			};

			this.showSnsArea = function (isSticky) {
				hideSearch(true);
			};

			this.showSearchArea = function () {
				showSearch(true);
			};

			function showSearch(noSlide) {
				var $searchArea = $('#searchArea', $head),
					$snsArea = $('.sns_wrap', $head);

				if (utils.browser.msie || noSlide) {
					$searchArea.show();
					$searchArea.find(".auto_ad").show(); //광고용 코드
					//window.setTimeout(function () { $searchArea.find(".auto_ad").hide(); $searchArea.find(".autocomplete").show(); }, 5000); //광고용 코드
					window.setTimeout(function () { $searchArea.find(".auto_ad").hide(); }, 5000); //광고용 코드
					$snsArea.hide();
				} else {
					$searchArea.show();
					$searchArea.find(".auto_ad").show(); //광고용 코드
					//window.setTimeout(function () { $searchArea.find(".auto_ad").hide(); $searchArea.find(".autocomplete").show(); }, 5000); //광고용 코드
					window.setTimeout(function () { $searchArea.find(".auto_ad").hide(); }, 5000); //광고용 코드
					$snsArea.hide();
					//$searchArea.show('slide', slideOptions, slideDuration);
					//$snsArea.hide('slide', slideOptions, slideDuration);
				}
			}

			function hideSearch(noSlide) {
				var $searchArea = $('#searchArea', $head),
					$snsArea = $('.sns_wrap', $head);

				if (utils.browser.msie || noSlide) {
					$searchArea.hide();
					$snsArea.show();
				} else {
					$searchArea.hide();
					$snsArea.show();
					//$searchArea.hide('slide', slideOptions, slideDuration);
					//$snsArea.show('slide', slideOptions, slideDuration);
				}
			}

			function closeSearchAreaHandler(e) {
				var ele = utils.getElementFromEvent(e),
					$target = $(ele),
					$searchArea = $('#searchArea', $head);

				if (ele.tagName == 'A' || ele.tagName == 'BUTTON') {
				} else {
					if ($target.closest($searchArea).length === 0 && $searchArea.css('display') != 'none') {
						hideSearch();
					}
				}
			}
		};

		function Header_v2() {
			this.renderHtml = function () {
				var html = '';
				if ($("#doc").length > 0) {
					if ($("div.doc").length === 0) {
						$("#doc").wrap("<div class=\"doc\"></div>");
					}
				}

				var configMenus = utils.config('menus');
				var menuKey = utils.menu.getPageMenuKey();
				var arrKey = menuKey.split(',');
				var lastMenuKey = arrKey[arrKey.length - 1];
				var url = "";
				if (typeof (configMenus) != "undefined" && configMenus != null && configMenus != undefined && configMenus != "") {
					url = utils.config('apiPath') + "/pagecall/?u=" + encodeURIComponent(utils.config('webPcPath') + "/layout/header?" + "exService=true&key=empty");
				}
				else {
					if (typeof (menuKey) != "undefined" && menuKey != null && menuKey != undefined) {
						url = utils.config('apiPath') + "/pagecall/?u=" + encodeURIComponent(utils.config('webPcPath') + "/layout/header?" + "exService=true" + '&key=' + menuKey);
					} else {
						url = utils.config('apiPath') + "/pagecall/?u=" + encodeURIComponent(utils.config('webPcPath') + "/layout/header?exService=true");
					}
				}

				$.get(url, function (data) {
					$("div.doc").prepend(data);
				}).done(function (data) {
					$.getScript(utils.config('staticPath') + '/scripts/layout.header.js');
				}).fail(function (data) {
					//alert("error");
				}).always(function (data) {
					if (typeof (configMenus) != "undefined" && configMenus != null && configMenus != undefined && configMenus != "") {
						var link = configMenus.Url ? configMenus.Url.Path : "";
						$("h1", $("header.header")).html("<a href=\"" + configMenus.Url.Path + "\">" + configMenus.Display + "</a>");
						$.each(configMenus.Children, function (idx, val) {
							var subLink = val.Url ? val.Url.Path : "";
							$("nav#joonganglnb > ul", $("header.header")).append("<li class=\"" + (lastMenuKey == val.Key ? "on" : "") + "\"><a href=\"" + subLink + "\"><h2 class=\"headline\">" + val.Display + "</h2></a></li>");
						});
					}
				});
			};
		};

		/**
		 *
		 */
		function Megamenu() {

			var $head = $('#head'),
				$megamenu = $('#nav'),
				$cover = null,
				html = '' +
				'<div class="menu_wrap" style="">' +
					'<div class="full_menu mg" style="">' +
						'<h3 class="hide">전체 메뉴</h3>' +
						'<ul class="menu_news" data-bind="NewsGroup"><li data-bind="item" data-parent-key="NewsGroup"></li></ul>' +
						'<ul class="menu_section" data-bind="SectionGroup"><li data-bind="item" data-parent-key="SectionGroup"></li></ul>' +
						'<ul class="menu_service" data-bind="ServiceGroup"><li data-bind="item" data-parent-key="ServiceGroup"></li></ul>' +
						'<ul class="menu_service" data-bind="MoreGroup" style="display:none;"><li data-bind="moreItem" data-parent-key="MoreGroup"></li></ul>' +
						'<div class="cover" style="display:none;"></div>' +
						'<button type="button" class="btn_close_nav" id="btnCloseMegamenu">닫기</button>' +
					'</div>' +
				'</div>',
				directives = {
					moreItem: {
						html: function () {

							var html = '',
								parentKey = this.Parent ? this.Parent.Key : '';

							html += '<a href="#" class="disable">More</a>';
							html += '<div class="sub">';

							this.Children.forEach(function (v) {
								html += '<ul>';
								v.Children.forEach(function (v) {
									if (v.IsShowMegaMenu) {
										html += getListItem(v);
									}
								});
								html += '</ul>';
							});
							html += '<ul>';

							return html;
						}
					},
					item: {
						'data-key': function () {
							return this.Key;
						},
						html: function () {
							var html = '',
								parentKey = this.Parent ? this.Parent.Key : '';

							if (this.Url) {
								html += '<a href="' + (this.Url.Path) + '" ' + utils.getTargetFilter(this.Url.Path) + '>' + this.Display + '</a>';
							} else {
								html += '<a href="#" class="disable">' + this.Display + '</a>';
							}

							if (this.Children.length) {
								html += '<ul class="sub">';
								this.Children.forEach(function (v) {
									if (v.IsShowMegaMenu) {
										html += getListItem(v);
									}
								});
								html += '</ul>';
							}

							return html;
						}
					}
				},
				megaData = {},
				self = this,
				$menuWrap = null,
				timer = null,
				minMenuHeight = 600,
                moreBtnHeight = 60,
				defaultMenuHeight = windowSize.height < minMenuHeight ? minMenuHeight : windowSize.height - moreBtnHeight;

			function getListItem(v) {
				return v.IsShowMegaMenu ? '<li><a href="' + (v.Url.Path) + '" ' + utils.getTargetFilter(v.Url.Path) + '>' + v.Display + '</a></li>' : '';
			}

			(function init() {

				if ($megamenu.length == 0) {
					$megamenu = $('<div id="nav"></div>');
				}

				var $btn = $('#btnOpenMegamenu');
				$btn.on('click', self.open);

				$megamenu.on('click', '#btnCloseMegamenu', closeHandler);

			})();

			this.openHandler = function () {

				if ($head.length == 0) {
					$head = $('#head');
					$head.after($megamenu);
				}

				if ($megamenu.children().length == 0) {
					initData(self.render);
				} else {
					setMegamenuHeight();
					$megamenu.show('fast');
				}
				return false;
			};

			this.render = function (targetId) {

				//utils.log('megamenu render');
				//utils.log(megaData);
				var menuHeight = 0,
					pathname = location.pathname.toLowerCase(),
					newsClocName = '',
					news2DepthClocName = '',
					sectionClocName = '',
					section2DepthClocName = '',
					serviceClocName = '',
					service2DepthClocName = '';

				$megamenu.show('fast').html(html);
				renderGroup('ul[data-bind="NewsGroup"]', 'NewsGroup');
				renderGroup('ul[data-bind="SectionGroup"]', 'SectionGroup');
				renderGroup('ul[data-bind="ServiceGroup"]', 'ServiceGroup');
				renderGroup('ul[data-bind="MoreGroup"]', 'MoreGroup');

				function renderGroup(selector, name) {

					var length = megaData[name].length;

					if (selector == 'ul[data-bind="MoreGroup"]') {
						length = megaData[name][0].Children.length;
					}
					//utils.log('## renderGroup : ' +selector);
					//utils.log(megaData[name]);
					//utils.log('length : ' +length);

					if (length == 0) {
						$megamenu.find(selector).hide();
					} else {
						$megamenu.find(selector).show();
						$megamenu.find(selector).render(megaData[name], directives);
					}
				}

				menuHeight = $megamenu.find('.full_menu').height();

				//utils.log('$megamenu.data(rerender) : ' + $megamenu.data('rerender'));
				//utils.log('menuHeight : ' + menuHeight);
				//utils.log($('.full_menu').height());
				//utils.log('defaultMenuHeight  : ' + (defaultMenuHeight));

				$cover = $megamenu.find('.cover');
				if (!$megamenu.data('rerender') && menuHeight > defaultMenuHeight) {
					//utils.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ resetData')
					$megamenu.data('rerender', true);
					resetData(self.render);
				} else {
					eventBind();
					setMegamenuHeight();
				}

				// 메가메뉴 Cloc
				if (pathname == '/') {
					newsClocName = 'joongang|home|megasection';
					news2DepthClocName = 'joongang|home|megasection2';
					sectionClocName = 'joongang|home|megasubsection';
					section2DepthClocName = 'joongang|home|megasubsection2';
					serviceClocName = 'joongang|home|megasvc';
					service2DepthClocName = 'joongang|home|megasvc2';
				} else if (pathname.indexOf('article') > -1) {
					newsClocName = 'joongang|article|megasection';
					news2DepthClocName = 'joongang|article|megasection2';
					sectionClocName = 'joongang|article|megasubsection';
					section2DepthClocName = 'joongang|article|megasubsection2';
					serviceClocName = 'joongang|article|megasvc';
					service2DepthClocName = 'joongang|article|megasvc2';
				} else {
					newsClocName = 'joongang|section|megasection';
					news2DepthClocName = 'joongang|section|megasection2';
					sectionClocName = 'joongang|section|megasubsection';
					section2DepthClocName = 'joongang|section|megasubsection2';
					serviceClocName = 'joongang|section|megasvc';
					service2DepthClocName = 'joongang|section|megasvc2';
				}

				$megamenu.find('ul.menu_news > li').each(function () {
					$(this).find('a:first').attr('href', utils.getClocUrl($(this).find('a:first').attr('href'), newsClocName));
				});

				$megamenu.find('ul.menu_section > li').each(function () {
					$(this).find('a:first').attr('href', utils.getClocUrl($(this).find('a:first').attr('href'), sectionClocName));
				});

				$megamenu.find('ul.menu_service > li').each(function () {
					$(this).find('a:first').attr('href', utils.getClocUrl($(this).find('a:first').attr('href'), serviceClocName));
				});

				$megamenu.find('ul.menu_news > li ul.sub a').each(function () {
					$(this).attr('href', utils.getClocUrl($(this).attr('href'), news2DepthClocName));
				});

				$megamenu.find('ul.menu_section > li ul.sub a').each(function () {
					$(this).attr('href', utils.getClocUrl($(this).attr('href'), section2DepthClocName));
				});

				$megamenu.find('ul.menu_service > li ul.sub a').each(function () {
					$(this).attr('href', utils.getClocUrl($(this).attr('href'), service2DepthClocName));
				});
			};

			function setMegamenuHeight() {

				windowSize = utils.windowSize();

				var styles = { position: '', left: 0, height: windowSize.height };

				if ($(window).scrollTop() > $('#gnb').offset().top) {
					styles.left = $('#body').offset().left;
					styles.position = 'fixed';
				}

				$megamenu.find('.full_menu').css(styles);
			}

			$(window).on('resize', function () {

				if ($('#nav').css('display') == 'block') {
					setMegamenuHeight();
				}
				return false;
			});

			function closeHandler() {
				close();
				return false;
			}

			function closeTimerHandler() {
				timer = setTimeout(close, 350);
			}

			function close() {
				$megamenu.hide();
				$megamenu.find('li[class="on"]').removeClass('on');
			}

			function initData(callback) {

				var allMenu,
					children,
					rtn;

				if (utils.menu.loaded) {
					allMenu = utils.menu.getMenus();
					if (allMenu == undefined) {
						return;
					}
					children = allMenu.Children;
					rtn = { TrendGroup: [], ServiceGroup: [], MoreGroup: [{ Key: 'More', Display: 'More', Children: [] }] };

					children.forEach(function (v, i, a) {
						if (v.Key == 'Trend' || v.Key == 'Issue' || v.Key == 'TypeSetting' || v.Key == 'Time7' || v.Key == 'User' || v.Key == 'Reporter' || v.Key == 'NewsLetter') {
							rtn.ServiceGroup.push(v);
						} else {
							rtn[v.Key] = v.Children;
						}
					});

					var SectionGroupArray = rtn["SectionGroup"];
					rtn["SectionGroup"] = [];
					SectionGroupArray.forEach(function (v, i, a) {
						if (v.IsShowMegaMenu) {
							rtn["SectionGroup"].push(v)
						}
					});

					megaData = rtn;

					callback && callback();
				} else {
					setTimeout(function () {
						initData(callback);
					}, 100);
				}
			}

			function resetData(callback) {

				//utils.log('########################################## resetData');

				var itemOffsetTop = 0,
					itemOffsetBottom = 0,
					winScrollTop = $(window).scrollTop();

				//utils.log('defaultMenuHeight : ' + defaultMenuHeight)
				$megamenu.find('.full_menu > ul > li[data-key]').each(function (i, v) {

					var $item = $(this),
						key = '',
						parentKey = '',
						groupKey = '',
						group = [];

					itemOffsetTop = $item.offset().top;
					itemOffsetBottom = itemOffsetTop + $item.height();

					//utils.log('## $item.offset().top : ' + $item.offset().top);
					//utils.log('## itemOffsetTop : ' + itemOffsetTop);
					//utils.log('## itemOffsetBottom : ' + itemOffsetBottom);
					//utils.log('## defaultMenuHeight : ' + defaultMenuHeight);

					if (itemOffsetBottom > defaultMenuHeight) {

						key = $item.data('key');
						parentKey = $item.data('parentKey');

						//utils.log('## itemOffsetBottom : ' + itemOffsetBottom);
						//utils.log('## defaultMenuHeight : ' + defaultMenuHeight);
						//utils.log('## parentKey : ' + parentKey);

						if (parentKey == 'ServiceGroup') {

							if (key == 'User') {

								megaData[parentKey].forEach(function (v, i, a) {
									if (v && key == v.Key) {
										megaData.MoreGroup[0].Children.push(v);
										a.splice(i, 1);
									}
								});

							} else {

								megaData[parentKey].forEach(function (v, i, a) {
									if (v && key == v.Key) {
										groupKey = 'EtcGroup';
										group = megaData.MoreGroup[0].Children.filter(function (v) {
											return v.Key == groupKey;
										});

										if (!group.length) {
											megaData.MoreGroup[0].Children.push({ Key: groupKey, Children: [v] });
										} else {
											group[0].Children.push(v);
										}
										a.splice(i, 1);
									}
								});
							}
						} else {

							group = megaData.MoreGroup[0].Children.filter(function (v) {
								return v.Key == parentKey;
							});

							if (!group.length) {
								if (parentKey == 'SectionGroup') {
									megaData.MoreGroup[0].Children.push({
										Key: 'SectionGroup',
										Children: [
											megaData[parentKey].filter(function (v) {
												return v.Key == key;
											})[0]
										]
									});
								}
							} else {
								group[0].Children.push(megaData[parentKey].filter(function (v) {
									return v.Key == key;
								})[0]);
							}

							//utils.log('## parentKey');
							//utils.log(megaData[parentKey]);

							megaData[parentKey].forEach(function (v, i, a) {

								if (v && key == v.Key) {
									a.splice(i, 1);
								}
							});
						}
					}
				});

				callback && callback();
			}

			function closeMegaMenuHandler(e) {

				var ele = utils.getElementFromEvent(e),
					$target = $(ele);

				if (ele.tagName == 'A' || ele.tagName == 'BUTTON') {
				} else {
					if ($target.closest($megamenu).length === 0 && $megamenu.css('display') != 'none') {
						//$(document.body).off('click', closeMegaMenuHandler);
						//$(window).off('scroll', closeMegaMenuHandler);
						close();
					}
				}
			}

			function eventBind() {

				var timeout = null;
				$(document.body).on('click', closeMegaMenuHandler);
				$(window).on('scroll', closeMegaMenuHandler);
				$megamenu
					//.on('mouseleave focusout', closeTimerHandler)
					.on('mouseenter focusin', 'li', function (e) {

						var $this = $(this),
							$subList = $this.find('>.sub');

						$this.addClass('on').siblings().removeClass('on');
						$this.closest('ul').siblings().find('li').removeClass('on');

						if ($subList.length) {
							clearTimeout(timeout);
							$cover.show();
							setPositionMenu($subList, true);
						} else {
							if ($this.parent().filter('[class^=menu_]').length) {
								$cover.hide();
							}
						}
						return false;
					})
					.on('mouseleave focusout', function (e) { //이벤트 수정
						var $this = $(this);

						$this.find('.on').removeClass('on');
						timeout = setTimeout(function () {
							$cover.hide();
						}, 250);

						//$this.removeClass('on');

						//if ($this.find('.sub').length > 0) {
						//	timeout = setTimeout(function () {
						//		$cover.hide();
						//	}, 250);
						//}

						return false;
					});
			}

			function setPositionMenu($subList, type) {

				//utils.log('## setPositionMenu');
				//utils.log($subList);

				var winScrollBottom = $(window).scrollTop() + defaultMenuHeight,
					listBottom = $subList.offset().top + $subList.height(),
					styles = { top: (winScrollBottom - listBottom - 30) };

				if (!$subList.data('setPosition')) {
					if (listBottom >= winScrollBottom + 30) {
						$subList.css(styles);
					}
				}

				$subList.data('setPosition', true);

				return;
			}
		};

		function Header_v2() {
		    this.renderHtml = function () {
		        var html = '';
		        if ($("#doc").length > 0) {
		            if ($("div.doc").length === 0) {
		                $("#doc").wrap("<div class=\"doc\"></div>");
		            }
		        }

		        var configMenus = utils.config('menus');
		        var menuKey = utils.menu.getPageMenuKey();
		        var arrKey = menuKey.split(',');
		        var lastMenuKey = arrKey[arrKey.length - 1];
		        var url = "";
		        if (typeof (configMenus) != "undefined" && configMenus != null && configMenus != undefined && configMenus != "") {
		            url = utils.config('apiPath') + "/pagecall/?u=" + encodeURIComponent(utils.config('webPcPath') + "/layout/header?" + "exService=true&key=empty");
		        }
		        else {
		            if (typeof (menuKey) != "undefined" && menuKey != null && menuKey != undefined) {
		                url = utils.config('apiPath') + "/pagecall/?u=" + encodeURIComponent(utils.config('webPcPath') + "/layout/header?" + "exService=true" + '&key=' + menuKey);
		            } else {
		                url = utils.config('apiPath') + "/pagecall/?u=" + encodeURIComponent(utils.config('webPcPath') + "/layout/header?exService=true");
		            }
		        }

		        $.get(url, function (data) {
		            $("div.doc").prepend(data);
		        }).done(function (data) {
		            $.getScript(utils.config('staticPath') + '/scripts/layout.header.js');
		        }).fail(function (data) {
		            //alert("error");
		        }).always(function (data) {
		            if (typeof (configMenus) != "undefined" && configMenus != null && configMenus != undefined && configMenus != "") {
		            	var link = configMenus.Url ? configMenus.Url.Path : "";
		            	var display = configMenus.Display ? configMenus.Display : "";
		            	$("h1", $("header.header")).html("<a href=\"" + link + "\">" + display + "</a>");
		            	$.each(configMenus.Children, function (idx, val) {
		            		var subKey = val.Key ? val.Key : "";
		                	var subLink = val.Url ? val.Url.Path : "";
		                	var subDisplay = val.Display ? val.Display : "";
		                	$("nav#joonganglnb > ul", $("header.header")).append("<li class=\"" + (lastMenuKey == subKey ? "on" : "") + "\"><a href=\"" + subLink + "\"><h2 class=\"headline\">" + subDisplay + "</h2></a></li>");
		                });
		            }
		        });
		    };
		};

		/**
		 *
		 */
		function Footer() {
			var _footer = this,
				temp = {
					promotion: '<div class="promote">' +
						'<ul data-bind="promotion">' +
						'<li><a href="#" data-bind="link"><img data-bind="image" src="" alt=""></a></li>' +
						'</ul>' +
						'</div>',
					footInfo: '<div class="foot_info">' +
						'<div class="policy">' +
						'<h3 class="hide">정책 및 약관</h3>' +
						'<ul class="clearfx first" data-bind="services">' +
						'<li data-bind="item"><a href="#" data-bind="link"></a></li>' +
						'</ul>' +
						'<ul class="clearfx" data-bind="services2">' +
						'<li data-bind="item"><a href="#" data-bind="link"></a></li>' +
						'</ul>' +
						'<p class="logo" data-bind="logo"><a href="#" data-bind="link"></a></p>' +
						'<address class="clearfx">' +
						'<span><strong>주소</strong> : 서울특별시 마포구 상암산로 48-6</span><span><span class="icon"></span><strong>등록번호</strong> 서울 아 01013</span><span><span class="icon"></span>등록일자 : 2009.11.2</span><span><span class="icon"></span>발행인 : 홍정도</span><span><span class="icon"></span>편집인 : 최훈</span><span><span class="icon"></span><strong>전화</strong> : 02-751-5114</span><span><span class="icon"></span><a href="https://news.joins.com/sitemap/index">사이트맵</a></span>' +
						'</address>' +
						'<p class="info" data-bind="info">JoongAng Ilbo의 모든 콘텐트(기사)는 저작권법의 보호를 받은바, 무단 전재, 복사, 배포 등을 금합니다.<a data-bind="link"></a></p>' +
						'<p class="copyright">Copyright by JoongAng Ilbo Co., Ltd. All Rights Reserved</p>' +
						'</div>' +
						'</div>'
				},
				data = {
					promotion: [utils.linkService.getData('koreanair'), utils.linkService.getData('samsung'), utils.linkService.getData('hanatourist')],
					logo: utils.linkService.getData('joongangmedia'),
					services: [
						utils.linkService.getData('footerjoongangilbo'),
						utils.linkService.getData('customercenter'),
						utils.linkService.getData('onlinecustomercenter'),
						utils.linkService.getData('joongangad'),
						utils.linkService.getData('joongangdigitalad'),
						utils.linkService.getData('joongangbiz'),
						utils.linkService.getData('joongangterms'),
						utils.linkService.getData('joongangpolicy', { html: '<strong>개인정보 처리방침</strong>' }),
                        (utils.config('pageType') == PAGE_TYPE.pcHome ? utils.linkService.getData('youthprotectionhome') : utils.linkService.getData('youthprotection')),
						utils.linkService.getData('joongangproblem')
					],
					services2: [
                        
					],
					services3: [
                        (utils.config('pageType') == PAGE_TYPE.pcHome ? utils.linkService.getData('youthprotectionhome') : utils.linkService.getData('youthprotection')),
						utils.linkService.getData('joongangproblem'),
                        utils.linkService.getData('sundayethicscode')
					],
					info: {
						link: {
							href: 'http://conbox.joins.com',
							target: '_blank',
							text: '[콘텐트 문의]'
						}
					}
				},
				directives = {
					sitemap: {
						rows: {
							group: {
								list: { link: utils.decorators.link },
								title: {
									html: function (params) {

										if (this && this.title) {
											var $list = $(params.element),
												html = '';

											if (this.title.link) {
												html = '<dt class="mg"><a href="#none">' + this.title.text + '</a></dt>';
											} else {
												html = '<dt class="mg">' + this.title.text + '</dt>';
											}
											$list.prepend(html);
										}
									}
								}
							}
						}
					},
					promotion: { link: utils.decorators.link, image: utils.decorators.image },
					services: {
						link: utils.decorators.link,
						item: {
							html: function (params) {
								if (params.index != 0) {
									var $item = $(params.element);
									$item.prepend('<span class="icon"></span>');
								}
							}
						}
					},
					services2: {
						link: utils.decorators.link,
						item: {
							html: function (params) {
								if (params.index != 0) {
									var $item = $(params.element);
									$item.prepend('<span class="icon"></span>');
								}
							}
						}
					},
					logo: { link: utils.decorators.link },
					info: { link: utils.decorators.link }
				};

			this.renderHtml = function () {
				document.write('<div id="foot"></div>');
				_footer.render();
			};

			this.render = function () {

				var $foot = $('#foot'),
					promotionHtml = '',
					footInfoHtml = '';

				promotionHtml = $.renderTemplate({
					template: temp.promotion,
					data: { promotion: data.promotion },
					directives: directives
				});

				footInfoHtml = $.renderTemplate({
					template: temp.footInfo,
					data: { logo: data.logo, services: data.services, services2: data.services2, info: data.info },
					directives: directives
				});

				sundayFootInfoHtml = $.renderTemplate({
				    template: temp.footInfo,
				    data: { logo: data.logo, services: data.services, services2: data.services3, info: data.info },
				    directives: directives
				});

			    //선데이 예외 - 임시
				if (menuKey != undefined && menuKey.toLowerCase().indexOf('sunday') > -1) {
				    footInfoHtml = sundayFootInfoHtml.replace('https://joongang.joins.com', '/sunday/about').replace(/중앙일보/gi, '중앙SUNDAY').replace('홍정도', '이상언').replace('<span><span class="icon"></span>편집인 : 최훈</span>', '').replace(/JoongAng Ilbo/gi, 'JoongAng Sunday');
				}

				$foot.append(promotionHtml).append(footInfoHtml);

				if (utils.isMobile() && utils.config('applicationType') != utils.config('deviceType')) {
					if (window.location.toString().toLowerCase().indexOf("jtour") == -1) {
						var $btnMoveMobile = $('<div class="m_vers"><a href="' + utils.config('webMobilePath') + '">모바일 버전 보기</a></div>');
						$btnMoveMobile.find('a').on('click', function () {
							utils.removeIgnoreUserAgent();
							utils.redirectUrl();
							return false;
						});
						$foot.after($btnMoveMobile);
					}
				}

				$('div.foot_info a').each(function () {
					if ($(this).attr('href').indexOf("mailto:") < 0) {
						$(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang-home-footer'));
					}
				});
			};
		};

		function Footer_v2() {
			this.renderHtml = function () {
				$("div.doc").append('<footer class="footer"><div id="foot"></div></footer>');
				_layout.footer.render();
			};
		}

		/**
		 *
		 */
		function Wide() {
			var _wide = this,
				$body = $(document.body),
				$aside = $('#aside'),
				$btnOpen = $('#btnOpenAside'),
				$btnClose = $('<button type="button" class="btn_close_aside">닫기</button>'),
				CLASS_NAMES = {
					on: 'aside_on',
					off: 'aside_off'
				};

			this.open = function () {

				//utils.log('## wide openWide');
				//utils.log($body);

				utils.setCookie(COOKIE_NAMES.wide, '1', 1, COOKIE_CONDITION.path, COOKIE_CONDITION.domain);
				if (menuKey != undefined && (menuKey.toLowerCase().indexOf('jpod') > -1 || menuKey.toLowerCase().indexOf('newsletter') > -1 || menuKey.toLowerCase().indexOf('trend') > -1 || (pageType != PAGE_TYPE.article && menuKey.toLowerCase().indexOf('election2020') > -1))) {
					$('#btnOpenAside').hide();
					return;
				} else {
					$(document.body).removeClass(CLASS_NAMES.off).addClass(CLASS_NAMES.on);
					$btnOpen.hide();
					
					$(window).trigger('resize_layout');
				}
			};

			this.close = function () {

				//utils.log('## wide closeWide');
				//utils.log(pageType != PAGE_TYPE.article || pageType != PAGE_TYPE.search);

                // close 버튼이 제거되어 쿠키값 1로 저장
			    utils.setCookie(COOKIE_NAMES.wide, '1', 1, COOKIE_CONDITION.path, COOKIE_CONDITION.domain);
			    //utils.setCookie(COOKIE_NAMES.wide, '0', 1, COOKIE_CONDITION.path, COOKIE_CONDITION.domain);
				$(document.body).removeClass(CLASS_NAMES.on).addClass(CLASS_NAMES.off);
				$btnOpen.css('display', '');
				if (pageType != PAGE_TYPE.article && pageType != PAGE_TYPE.search) {
					_layout.header.showSnsArea();
					_layout.header.bindCloseSearchArea();
				}
				$(window).trigger('resize_layout');
				if (menuKey != undefined && (menuKey.toLowerCase().indexOf('retirement') > -1 || menuKey.toLowerCase().indexOf('newsletter') > -1)) {
					$('#btnOpenAside').hide();
					return;
			    }
			};

			this.renderHtml = function () {
				return;
			};

			this.render = function () {
				return;
			};

			// 더오래
			if (menuKey != undefined && menuKey.toLowerCase().indexOf('retirement') > -1) {
				_wide.close();
				$('#btnOpenAside').hide();
				$('#aside').hide();
				return;
			}

			// Jpod
			if (menuKey != undefined && (menuKey.toLowerCase().indexOf('jpod') > -1 || menuKey.toLowerCase().indexOf('newsletter') > -1)) {
				_wide.close();
				$('#btnOpenAside').hide();
				$('#aside').hide();
				return;
			}

			var articleType = utils.config('articleType');
			//$aside = $('#aside');

			// 무조건 close : cover 아티클.
			if (utils.isCoverTypeCheck())
				return;

			if (utils.windowSize().width >= 1350)
				_wide.open();
			else
				_wide.close();

			$btnClose.on('click', function () {
				_wide.close();
			});

			$btnOpen.on('click', function () {
				_wide.open();
			});

			//html = $.renderTemplate({ data: data, template: template, directives: directives });
			//setSectionsBody($aside, data);
			//_wide.wideWidget();

			// 최하단 time7 컴포넌트 추가
			setTime7Body();
			
		};

	};
})(window, document, jQuery);

function setTime7Body() {
	$.getScript(utils.config('staticPath') + '/scripts/data/time7/js/article_top1.js', render);
	function render(d) {
		var sWordSeq, sTitle, sContent, sImgUrl, sPushImgUrl, sRelTotalId, sRelUrl, sWordType, sPicYN, sReporterID, sRegDt, sLink;

	    try {
	        if ($('.sub_time7').length > 0) return;

			var time7List = utils.convertList(time7_article_top1);
			var strHtml = "";
			var time7data = time7List[0];
			var sWordSeq = time7data.word_seq;
			var sTitle = time7data.title;
			var sContent = time7data.content;
			var sImgUrl = time7data.img_url;
			var sPushImgUrl = time7data.push_img_url;
			var sRelTotalId = time7data.rel_total_id;
			var sRelUrl = time7data.rel_url;
			var sWordType = time7data.word_type;
			var sPicYN = time7data.pic_yn;
			var sReporterID = time7data.reporter_id;
			var sRegDt = time7data.reg_dt;
			var checkTime = window.__Ndaytime.ba.hour24;
			var checkDay = window.__Ndaytime.ba.weekday;
			if ((sTitle != "undefined" && sTitle != "") && (sWordType != "undefined" && sWordType != "")) {
				if (sRelUrl != "undefined" && sRelUrl != "") {
					sLink = sRelUrl;
				} else if (sRelTotalId != "undefined" && sRelTotalId != "") {
					sLink = utils.config('webPcPath') + "/article/" + sRelTotalId;
				}
				if (sWordType == "R") {
					strHtml = "";
					if ((7 <= checkTime && checkTime < 10) && (checkDay != 0) && (checkDay != 6)) {
						$("#wide_fast").after('<div class="sub_time7"></div>');
						strHtml = strHtml + "<div class='time7_morning'>";
						strHtml = strHtml + "<div class='hd'><h4 class='hide'>미리보는 오늘</h4></div>";

						if (sImgUrl != "undefined" && sImgUrl != "") {
							sImgUrl = utils.config('irPath') + "?u=" + sImgUrl + "&w=260&h=148&t=c";
							strHtml = strHtml + "<div class='bd image_type'>";
							strHtml = strHtml + "<span class='txt_morning'><span class='bx'><span class='bg'></span></span><em>미리보는 오늘</em></span>";
							var thumbHtml = "<span class='thumb'><img alt='' src='" + sImgUrl + "'><span class='shadow'></span></span>";
							strHtml = strHtml + thumbHtml;
							var titleHtml = "<strong class='headline mg'>" + sTitle + "</strong>";
							strHtml = strHtml + titleHtml;
							strHtml = strHtml + "</div>";
							strHtml = strHtml + "<div class='ft'>";
							var linkHtml = "<a href='" + sLink + "'>기사 더보기</a>";
							strHtml = strHtml + linkHtml;
							strHtml = strHtml + "</div>";
						}
						else {
							strHtml = strHtml + "<div class='bd text_type'>";
							strHtml = strHtml + "<span class='txt_morning'><span class='bx'><span class='bg'></span></span><em>미리보는 오늘</em></span>";
							var titleHtml = "<strong class='headline mg'>" + sTitle + "</strong>";
							strHtml = strHtml + titleHtml;
							strHtml = strHtml + "<span class='writer'>중앙일보 EYE24</span>";
							strHtml = strHtml + "</div>";
							strHtml = strHtml + "<div class='ft'>";
							var linkHtml = "<a href='" + sLink + "'>기사 더보기</a>";
							strHtml = strHtml + linkHtml;
							strHtml = strHtml + "</div>";
						}
						strHtml = strHtml + "</div>";
						$(".sub_time7").html(strHtml);
					}
				}
				else if (sWordType == "N") {
					strHtml = "";
					if ((18 <= checkTime && checkTime < 21) && (checkDay != 0) && (checkDay != 6)) {
						var bannerImg = "", bannerWriter = "";
						if (sReporterID == "abnex") {
							bannerImg = "v_time7_newsroom1.png";
							bannerWriter = "박재현 편집국장대리";
						}
						else if (sReporterID == "pmaster") {
							bannerImg = "v_time7_newsroom2.png";
							bannerWriter = "박승희 기획조정1담당";
						}
						else if (sReporterID == "jung.kyungmin") {
							bannerImg = "v_time7_newsroom3.png";
							bannerWriter = "정경민 기획조정2담당";
						}
						else if (sReporterID == "filich") {
							bannerImg = "v_time7_newsroom4.png";
							bannerWriter = "김영훈 디지털담당";
						}

						$("#wide_fast").after('<div class="sub_time7"></div>');
						strHtml = strHtml + "<div class='time7_newsroom'>";
						strHtml = strHtml + "<div class='hd'><h4 class='hide'>Newsroom Letter</h4></div>";
						strHtml = strHtml + "<div class='bd text_type'>";
						if (sPicYN == "Y" && bannerImg != "") {
							strHtml = strHtml + "<span class='photo'><img alt='' src='" + utils.config('imagePath') + "/pc/main/" + bannerImg + "'></span>";
						}
						strHtml = strHtml + "<span class='txt_newsroom'><em>Newsroom Letter</em></span>";
						var titleHtml = "<strong class='headline mg'>" + sTitle + "</strong>";
						strHtml = strHtml + titleHtml;
						if (sPicYN == "Y" && bannerWriter != "") {
							strHtml = strHtml + "<span class='writer'><span class='hide'>" + bannerWriter + "</span></span>";
						}
						strHtml = strHtml + "</div>";
						strHtml = strHtml + "<div class='ft'>";
						var linkHtml = "<a href='" + sLink + "'>기사 더보기</a>";
						strHtml = strHtml + linkHtml;
						strHtml = strHtml + "</div>";
						sstrHtml = strHtml + "</div>";
						$(".sub_time7").html(strHtml);
					}
				}
			}
		} catch (e) { }
	}
}