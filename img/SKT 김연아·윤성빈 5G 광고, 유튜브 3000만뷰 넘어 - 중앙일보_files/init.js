﻿/**
* init.js
* @use : news.joins.com (Pc) 에서만 사용한다.
*/
(function(window, document, $) {

    // Defind Area Variable.
    var layout = window.layout,
        nowDate = new Date(),
        pageType = utils.config('pageType'),
        articleType = utils.config('articleType'),
        imagePath = utils.config('imagePath');

    // datepicker configuration.
    if($.datepicker !== undefined) {
        $.datepicker.regional["ko"] = {
            closeText: '닫기',
            prevText: '이전달',
            nextText: '다음달',
            currentText: '오늘',
            monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            weekHeader: 'Wk',
            dateFormat: 'yy.mm.dd',
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: true,
            yearSuffix: ".",
            showAnim: 'drop',
            buttonImageOnly: true

        };
        $.datepicker.setDefaults($.datepicker.regional['ko']);
    }

    // global init
    // header(navigation), footer, right, get font cookie, config.
    (function init() {

        $('#content > div > ul.stock').remove();

        var fontSize = utils.getCookie(COOKIE_NAMES.fontSize) || '4',
            openWide = utils.getCookie(COOKIE_NAMES.wide),
            windowSize = utils.windowSize();

        layout.render();
        if (pageType == PAGE_TYPE.article) {
            initFontSize(fontSize);
        }

        var removedWide = ['retirement', 'find', 'realestate'];

        //홈에서 와이드 닫기버튼 제거(계속 펼쳐놓기 위해) = 20190401
        //if (pageType == PAGE_TYPE.index) {
        //    layout.wide.open();
        //}
        //else {
            // 와이드 오픈용 resize Handler. // 높이를 제외하고 width 만 체크한다. // IE8 에서 높이값이 고정되지 않는 버그 있음.(css).
        $(window).resize(function () {
            if (pageType != PAGE_TYPE.pcHome) {
                var _windowSize = utils.windowSize();
				var bRemovedWide = true;
                var currentMenuKey = utils.menu.getPageMenuKey().toLowerCase();
                for (var i = 0; i < removedWide.length; i++) {
                    if (currentMenuKey.indexOf(removedWide[i]) !== -1) {
                        bRemovedWide = false;
                        break;
                    }
                }
				
                if (!utils.isSpCoverTypeCheck() && bRemovedWide) {
                    // IE 7, 8 에서 body 사이즈 변경될 때, window.resize 이벤트가 발생함.
                    // 내부 변수에 처음 size 를 cache 하여 추가 조건 작성.
                    if (windowSize.width != _windowSize.width) {
                        windowSize = utils.windowSize();
                        utils.removeCookie(COOKIE_NAMES.wide, COOKIE_CONDITION.path, COOKIE_CONDITION.domain);
                        if (_windowSize.width > 1390) {
                            layout.wide.open();
                        } else {
                            layout.wide.close();
                        }
                    }
                }
            }
        });
        //}

        $('.count .mg').each(function () {
            var $count = $(this),
                count = $count.text() || '';

            count = utils.getDisplayCount(count);
            $count.text(count);
        });

        // pc : Mobile 보기 전환
        $(document.body).on('click', '#showMobileWeb', function () {
            utils.setIgnoreUserAgent();
            utils.redirectUrl();
            return false;
        });

        // pc : 기사내 용어사전 접고 펼치기
        $('.ab_term_hd', $("div#article_body")).on('click', function () {
            var $wrap = $(this).closest('.ab_term');
            if ($wrap.hasClass('ab_term_off')) {
                $wrap.addClass('ab_term_on').removeClass('ab_term_off');
            } else {
                $wrap.addClass('ab_term_off').removeClass('ab_term_on');
            }
        });

        // 이미지 inline 사이즈 제거
        $('.html_photo_left img, .photo_center img').width('').height('');
    })();

    function initFontSize(fontSize) {

        if(location.href.toLowerCase().indexOf('providednews') > -1) {
            return;
        }
        var $changefont = $('#changefont');

        $('#changefont').changeFontSize().show();
    }

    utils.shareCountCallback = function(target) {
        // 서비스별 카운트 처리.
        var
            TARGET_SELECTORS = {
                news: '#article_share_total_count',
                issue: '#issue_keyword_share_count'
            },
            targetSelector = TARGET_SELECTORS[target],
            $totalCountArea = $(targetSelector),
            totalCount = 0;

        if(!targetSelector) {
            return;
        }
        if($totalCountArea.length == 0) {
            return;
        }

        totalCount = $totalCountArea.text() || 0;
        totalCount = parseInt(totalCount, 10);
        $totalCountArea.text(totalCount + 1);
    };

    // MVC Ajax : 클릭된 버튼 타겟.
    var $moreBtn = null;
    utils.setMoreBtn = function($btn) {
        $moreBtn = $btn;
    };

    // MVC Ajax : mvcAjaxSuccess
    utils.mvcAjaxSuccess = function() {

        var articleType = utils.config('articleType');
        var menuKey = utils.menu.getPageMenuKey();

        setTimeout(function() {
            $('#loading').hide();
        }, 3000);

        if(articleType = ARTICLE_TYPE.live) {
            if($.fn.articleComponent) {
            	$('#live_content').articleComponent();
            	if (menuKey.toLowerCase().indexOf('election2017') !== -1) {
            		$('.ab_photo').attr("style", "width:580px;");
            	}
            }
        }

        if($moreBtn == null || !$moreBtn.length) {
            return false;
        }

        var data = $moreBtn.data();

        if(data.totalCount <= data.currentPage * data.pageSize) {
            $moreBtn.hide();
        }

        if($moreBtn && $moreBtn.length == 1) {
            $moreBtn.data('active', 'true');
            $moreBtn.removeClass('disable');
        }

        utils.mvcAjaxCallbackQueue.callback($moreBtn);
    };


    function trackingLogAd(types) {
        //var adsnMaps = {
        //    'Home': '7528',
        //    'Section': '7529',
        //    'Article': '7531',
        //    'Cover': '7540',
        //    'Live': '7539',
        //    'Piki': '7541',
        //    'Money': '7542',
        //    'Culture': '7543',
        //    'Sports': '7544',
        //    'JPlus': '7545',
        //    'Travel': '7546',
        //    'Week': '7547',
        //    'Politics': '8169',
        //    'Sunday': '9393'
        //},
        //iframeUrls = 'http://dgate.opap.co.kr/imp/?ssn=566&adsn={ADSN}&cresn=5362';

        //if ($.isArray(types)) {
        //    types.forEach(function (v, i, a) {
        //        var urls = iframeUrls.replace('{ADSN}', adsnMaps[v]);

        //        utils.createIFrame({ id: 'tracking_ad_' + v, url: urls });
        //    });
        //} else {
        //    var urls = iframeUrls.replace('{ADSN}', adsnMaps[types]);

        //    utils.createIFrame({ id: 'tracking_ad_' + types, url: urls });
        //}

        // 임시용 - 추후 기존과 동일하게 아티클 별 구분
        var
		AD_INFO = {
		    'Home': { src: '//cast.imp.joins.com/persona.js', 'data-id': '2RE4FFUXS-O1V8KVl0-Uug', name: 'joongang_p/main/main@main_track?mlink=217' },  // 홈 트래킹
		    'Other': { src: '//cast.imp.joins.com/persona.js', 'data-id': 'Dz7056EzTsaTLfAhUdaZBA', name: 'joongang_p/article/article@article_track?mlink=219' },  // 그 외 트래킹
		};

        types = (types === 'Home') ? 'Home' : 'Other';
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = AD_INFO[types].src;
        script.setAttribute('data-id', AD_INFO[types]['data-id']);
        script.setAttribute('name', AD_INFO[types]['name']);
        document.body.appendChild(script);
    }

    // 쿼츠용 GA코드 삽입
    function initQuartzGA() {
        var strHtml = [];
        strHtml.push("<!-- Global site tag (gtag.js) - Google Analytics -->");
        strHtml.push("<script async src='https://www.googletagmanager.com/gtag/js?id=UA-20189-48'></script>");
        strHtml.push("<script>");
        strHtml.push("window.dataLayer = window.dataLayer || [];");
        strHtml.push("function gtag(){dataLayer.push(arguments);}");
        strHtml.push("gtag('js', new Date());");
        strHtml.push("gtag('config', ' UA-20189-48');");
        strHtml.push("</script>");

        $('body').append(strHtml.join(' '));
    }

    //document.ready
    $(function ($) {
        var menuKey = utils.menu.getPageMenuKey();

        if (menuKey.toLowerCase().indexOf('sunday') !== -1) {
        	trackingLogAd('Sunday');
        }

        if (pageType === PAGE_TYPE.article) {

            if (menuKey.toLowerCase().indexOf('sunday') !== -1) {
            	trackingLogAd('Article');
            } else if (menuKey.indexOf('Money') !== -1) {
                trackingLogAd('Money');
            } else if (menuKey.indexOf('JPlus') !== -1) {
                trackingLogAd('JPlus');
            } else if (menuKey.indexOf('Culture') !== -1) {
                trackingLogAd('Culture');
            } else if (menuKey.indexOf('Sports') !== -1 || menuKey.toLowerCase().indexOf('rio2016') !== -1) {
                trackingLogAd('Sports');
            } else if (menuKey.indexOf('Travel') !== -1) {
                trackingLogAd('Week');
            } else if (menuKey.indexOf('Politics') !== -1) {
                trackingLogAd('Politics');
            }

            if (articleType === ARTICLE_TYPE.cover) {
                trackingLogAd('Cover');
            } else if (articleType === ARTICLE_TYPE.live) {
                trackingLogAd('Live');
            } else if (articleType === ARTICLE_TYPE.piki) {
                trackingLogAd('Piki');
            } else {
                trackingLogAd('Article');
            }

            if (articleType !== utils.isCoverTypeCheck() && articleType !== ARTICLE_TYPE.cover) {
                if (menuKey.indexOf('Money') !== -1) {
                    $('#leftbanner2').loadAd({ type: 'left_915' });
                } else {
                    $('#leftbanner2').loadAd({ type: 'left_915_no_money' });
                }
            }
            
            // 쿼츠 서비스
            var keywords = utils.getMetaValue("news_keywords");
            if (keywords != '') {
                var arrKeywords = keywords.split(',');
                for (var i = 0; i < arrKeywords.length; i++) {
                    var keyword = $.trim(arrKeywords[i]).toLowerCase();
                    if (keyword == '쿼츠' || keyword == 'quartz') {
                        initQuartzGA();
                    }
                }
            }
        }

        var bannerFoot = '<div class="ft"><button type="button">닫기</button></div>';
        if (pageType == PAGE_TYPE.pcHome) {
            // 메인 광고 시 제외
            if (typeof(isAdExNo) == "undefined" || (typeof(isAdExNo) != "undefined" && isAdExNo.indexOf("589") < 0)) {
                $('#shapepopup').loadAd({ type: 'shapepopup_589' }).append(bannerFoot);
            }

            trackingLogAd('Home');
        }

        if (pageType == PAGE_TYPE.index) {
            // 메인 광고 시 제외
            if (typeof (isAdExNo) == "undefined" || (typeof (isAdExNo) != "undefined" && isAdExNo.indexOf("592") < 0)) {
                $('#leftbanner').loadAd({ type: 'left_592' }).show().append(bannerFoot);
            }
        } else if (pageType == PAGE_TYPE.section || pageType === PAGE_TYPE.unique) {
        	// 오피니언, 정치, 경제 광고 수정
        	if (menuKey.indexOf('Money') !== -1 || menuKey.indexOf('Opinion') !== -1 || menuKey.indexOf('Politics') !== -1) {
        		$('#leftbanner').loadAd({ type: 'left_593_type2' });
        	} else {
        		$('#leftbanner').loadAd({ type: 'left_593' }).show().append(bannerFoot);
        	}
        	// 라면로드 광고 예외처리
        	if (menuKey.toLowerCase().indexOf('ramyeonroad') !== -1 || menuKey.toLowerCase().indexOf('kimchiroad') !== -1 || menuKey.toLowerCase().indexOf('quartz') !== -1 ||
        	    menuKey.toLowerCase().indexOf('misezero') !== -1) {
        		$('#ramyeonroad_display_680').loadAd({ type: 'display_680' });
        	} else {
        		$('#leftbanner').loadAd({ type: 'left_593' }).show().append(bannerFoot);
        	}
        	// 더오래 좌우측 120x600 배너
        	if (menuKey.indexOf('Retirement') !== -1) {
        		$('#left_retirement').loadAd({ type: 'left_120' }).show().append(bannerFoot);
        		$('#right_retirement').loadAd({ type: 'right_120' }).show().append(bannerFoot);
        	}
        } else {
			// 라면로드 광고 예외처리
            if (menuKey.toLowerCase().indexOf('ramyeonroad') !== -1 || menuKey.toLowerCase().indexOf('kimchiroad') !== -1 || menuKey.toLowerCase().indexOf('quartz') !== -1) {
        		$('#ramyeonroad_display_680').loadAd({ type: 'display_680' });
            } else {
                if (articleType !== utils.isCoverTypeCheck() && articleType !== ARTICLE_TYPE.cover) {
                    $('#leftbanner').loadAd({ type: 'left_593' }).show().append(bannerFoot);
                }
        	}
        	// 더오래 좌우측 120x600 배너
        	if (menuKey.indexOf('Retirement') !== -1) {
        		$('#left_retirement').loadAd({ type: 'left_120' }).show().append(bannerFoot);
        		$('#right_retirement').loadAd({ type: 'right_120' }).show().append(bannerFoot);
        	}
        }

        if(pageType == PAGE_TYPE.index || pageType === PAGE_TYPE.list || pageType === PAGE_TYPE.unique || pageType === PAGE_TYPE.search || pageType === PAGE_TYPE.pcHome) {
            $('#eventBanner').loadAd({ type: 'home_ci_806' });
        }

        if (pageType == PAGE_TYPE.section) {
            // 정치 실시간 주요뉴스 고정기사(정정보도문) 예외처리
        	/*if (menuKey.indexOf('Politics') !== -1) {
        	    var checkDaytime = __Ndaytime.ymdhms || '';
        	    var checkTotalId = "23475465";
        	    if (checkDaytime >= '20190522095000' && checkDaytime <= '20190523103000') {
        	        //기사가 등록된지 얼마 안된경우 실시간 리스트에 보이므로 체크 (5번째 넘어가면 화면에 안보이니 이 때 넣자)
        	        if ($("#ulItems li:has(a[href*='/article/" + checkTotalId + "'])").index() == -1 || $("#ulItems li:has(a[href*='/article/" + checkTotalId + "'])").index() >= 5) {
        	            var realtimeHtml = '<li><em class="time mg">05월 22일</em><strong class="headline mg" style="height:40px;"><a href="/article/' + checkTotalId + '">[장제원 의원 \'이해충돌\' 관련 정정보도문]</a></strong><span class="byline"><em>2019.05.22 09:40</em></span></li>';
        	            $("#ulItems li:has(a[href*='/article/" + checkTotalId + "'])").remove();
        	            $("#ulItems li").eq(1).after(realtimeHtml);
        	        }
        	    }
        	}*/

            //정정보도 사회면 (19년 8월27일 08시30분 ~ 28일 09시)
            /*if (menuKey.indexOf('Society') !== -1) {
                var checkDaytime = __Ndaytime.ymdhms || '';
                if (checkDaytime >= '20190827083000' && checkDaytime <= '20190828090000') {
                    $("div.default_realtime").before("<div class=\"oneline_news mg clearfx\"><a href=\"" + checkDaytime + "\">[알려왔습니다]서울교통공사 \"무기계약직, 필기시험 포함 4단계 거쳐 채용\"</a></div>");
                }
            }*/

            //오피니언, 정치, 경제 광고 수정
        	if (menuKey.indexOf('Money') !== -1 || menuKey.indexOf('Politics') !== -1) {
        		$('div[data-widget-service="display_680"]').attr('data-widget-service', 'da_300_type2');
            }

            if (menuKey.split(',').length > 1 && menuKey.indexOf('JPlus') !== -1) {
                trackingLogAd('JPlus');
            } else {
            	if (menuKey.toLowerCase().indexOf('sunday') !== -1) {
            		trackingLogAd('Section');
            	} else if (menuKey.indexOf('Money') !== -1) {
            	    trackingLogAd(['Section', 'Money']);
                } else if (menuKey.indexOf('Culture') !== -1) {
                    trackingLogAd(['Section', 'Culture']);
                } else if (menuKey.indexOf('Sports') !== -1) {
                    trackingLogAd(['Section', 'Sports']);
                } else if (menuKey.indexOf('Travel') !== -1) {
                    trackingLogAd(['Section', 'Travel']);
                } else if (menuKey.indexOf('Politics') !== -1) {
                    trackingLogAd(['Section', 'Politics']);
                } else {
                    trackingLogAd('Section');
                }

            	if (menuKey.indexOf('Money') !== -1) {
            	    $('#leftbanner2').loadAd({ type: 'left_915' });
            	} else {
            	    $('#leftbanner2').loadAd({ type: 'left_915_no_money' });
            	}
            }
        }

        if (pageType === PAGE_TYPE.list) {

            ////경제 광고 type 동적으로 수정
            //if (utils.menu.getPageMenuKey().toLowerCase().indexOf('money') !== -1) {
            //    $('div[data-widget-service="display_680"]').attr('data-widget-service', 'da_300_money');
            //}

        	if (menuKey.toLowerCase().indexOf('sunday') !== -1) {
        		trackingLogAd('Section');
        	} else if (menuKey.indexOf('Money') !== -1) {
        	    trackingLogAd(['Section', 'Money']);
            } else if (menuKey.indexOf('Culture') !== -1) {
                trackingLogAd(['Section', 'Culture']);
            } else if (menuKey.indexOf('Sports') !== -1 || menuKey.toLowerCase().indexOf('rio2016') !== -1) {
                trackingLogAd(['Section', 'Sports']);
            } else if (menuKey.indexOf('Travel') !== -1) {
                trackingLogAd(['Section', 'Week']);
            } else if (menuKey.indexOf('Politics') !== -1) {
                trackingLogAd(['Section', 'Politics']);
            } else {
                trackingLogAd('Section');
            }
        	
        	if (menuKey.indexOf('Money') !== -1) {
        	    $('#leftbanner2').loadAd({ type: 'left_915' });
        	} else {
        	    $('#leftbanner2').loadAd({ type: 'left_915_no_money' });
        	}
        }

        // 부동산 섹션 좌측 120*600 광고 적용 
        if (utils.menu.getPageMenuKey().toLowerCase().indexOf('realestate') !== -1 && (utils.config('pageType') === 'List')) {
        	$('#wrap').prepend('<div class="ad_120_200 ad" id="leftbanner"></div><div id="leftbanner_realestate" class="ad_120_600 ad"></div>');
        	//$('#leftbanner').loadAd({ type: 'left_593' });
            $('#leftbanner_realestate').loadAd({ type: 'left_915' });
        }

        if (pageType === PAGE_TYPE.unique) {
            var adPage = ['Opinion', 'Cartoon', 'Issue', 'Time7', 'MyNews', 'Jebo', 'BrandNews', 'CustomerCenter', 'Section', 'Star', 'Pic', 'UsaDiscover', 'SatiricalCartoon'];

            if (menuKey.indexOf('SatiricalCartoon') !== -1) {
                trackingLogAd('Section');
            }

            if (menuKey.toLowerCase().indexOf('sunday') !== -1) {
            	trackingLogAd('Section');
            } else if (menuKey.indexOf('CanadaDiscover') !== -1 || menuKey.indexOf('UsaDiscover') !== -1) {
            	$('#adTravel').loadAd({ type: 'display_748' });
            } else {
                adPage.forEach(function (v, i, a) {
                    if (menuKey.indexOf(v) !== -1) {
                        if (v === 'UsaDiscover') {
                            trackingLogAd(['Section', 'Week']);
                        } else {
                            trackingLogAd('Section');
                        }
                    }
                });
            }

            if (menuKey.indexOf('Money') !== -1) {
                $('#leftbanner2').loadAd({ type: 'left_915' });
            } else {
                $('#leftbanner2').loadAd({ type: 'left_915_no_money' });
            }

        	//오피니언, 정치, 경제 광고 수정
            if (menuKey.indexOf('Opinion') !== -1) {
            	$('div[data-widget-service="display_680"]').attr('data-widget-service', 'da_300_type2');
            }

            //오피니언 정정 보도문
            if (menuKey.indexOf('Opinion') !== -1) {
                var checkDaytime = __Ndaytime.ymdhms || '';
                var viewTotalId = "23374877";
                var viewTitle = "[반론보도]\"차라리 창조경제에서 배워라\" 관련";
                if (checkDaytime >= '20190215213000' && checkDaytime <= '20190216223000') {
                    var strInsertHtml = '<div class="corrected_press"><strong class="mg"><a href="/article/' + viewTotalId + '">' + viewTitle + '</a></strong></div>';
                    $("div.opinion_home_row01").after(strInsertHtml);
                }
            }

        	//2020 총선 광고 type 동적으로 수정
            if (utils.menu.getPageMenuKey().toLowerCase().indexOf('election2020') !== -1) {
            	$('div[data-widget-service="da_300"]').attr('data-widget-service', 'da_300_election2020');
            }
        }

        // init Article Reporter
        //$('.journalist_area').find('.profile a').reporterCard();  //리포터 레이어 뜨지 않고 리포터 페이지로 이동

        if (pageType == PAGE_TYPE.article) {
        	//tag(키워드)에 의한 분기
        	if (utils.isNoneADCheck()) {
        		//nothing
        	}

        	//부동산 섹션 좌측 120*600 광고 적용
        	if (utils.menu.getPageMenuKey().toLowerCase().indexOf('realestate') !== -1) {
        		$('#leftbanner').after('<div id="leftbanner_realestate" class="ad_120_600 ad"></div>');
        		$('#leftbanner_realestate').loadAd({ type: 'left_915' });
        	}

            ////경제 광고 type 동적으로 수정
        	//if (utils.menu.getPageMenuKey().toLowerCase().indexOf('money') !== -1) {
        	//    $('div[data-widget-service="da_300"]').attr('data-widget-service', 'da_300_money');
        	//}

        	//2020 총선 광고 type 동적으로 수정
        	if (utils.menu.getPageMenuKey().toLowerCase().indexOf('election2020') !== -1) {
        		$('div[data-widget-service="da_300"]').attr('data-widget-service', 'da_300_election2020');
        	}

            initArticle();

            if (articleType !== utils.isCoverTypeCheck()) {
            	//$('#leftbanner').loadAd({type: 'left_593'}).show().append(bannerFoot);
            	$('#shapepopup').loadAd({ type: 'shapepopup_590' }).append(bannerFoot);
                
            	if (articleType !== ARTICLE_TYPE.cover) {
                    $('#articeltopbanner').loadAd({ type: 'shoppingbox_496' }).show().append(bannerFoot);
                }

                //선데이 예외 - 임시
                if (menuKey != undefined && menuKey.toLowerCase().indexOf('sunday') > -1) {
                    $('#articeltopbanner').hide();
                }
            }
        }

		//많이본 기사 하단 광고
        $('#widget_favorite_articlesAD').loadAd({ type: 'favorite_ad' }).show();
    	//aside영역 광고
        $('#wide_ad_bottom').loadAd({ type: 'wide_798' });

        // MVC Ajax : 버튼 이벤트 선 처리.
        $(document.body).on('click', 'a.btnMore', function() {

            //utils.log('## btnMore click');

            var $btn = $(this),
                data = $btn.data(),
                url = $btn.attr('href').split('?'),
                pathname = url[0],
                param = url[1],
                href = '',
                paramData = $.fn.deparam(param);

            if(data.active == 'false') {
                return false;
            }
            paramData.page = parseInt(data.currentPage, 10) + 1;
            $btn.data({
                'currentPage': paramData.page
            });

            if(data.url) {
                href = decodeURIComponent(data.url).replace('{page}', paramData.page);
            } else {
                href = pathname + '?' + $.param(paramData);
            }

            //utils.log('');

            $btn.attr({'href': href}).addClass('disable');
            utils.setMoreBtn($btn);
        });

        // set paging_date
        $('.paging_date').setPagingDate();

        // set Search Form (s)

        // set Search Form (e)

        // set Tooltip
        $('a.btnTooltip').on('mouseenter', function() {
            var targetId = $(this).data('target'),
                $target = $('#' + targetId);

            if(!targetId) {
                return false;
            }
            $target.show();
            return false;
        }).on('mouseleave', function() {
            var targetId = $(this).data('target'),
                $target = $('#' + targetId);

            if(!targetId) {
                return false;
            }
            $target.hide();
            return false;
        });

        $("a.tab_button").on('click', function() {
            var $ul = $(this).closest('ul');
            $ul.children('li').attr('class', '');
            var $li = $(this).parent();
            $li.attr('class', 'on');
        });

        $('.share_wrap').sharePlate();

        if ($('#sub').length > 0) {
            $('#sub').widget();
        }

        $('#btnFollow').on('click', function() {
            var $btn = $(this),
                isFollow = $btn.data('isFollow') == true || $btn.data('isFollow') == 'True' ? true : false;

            targetFollow($btn, $btn.data('id'), $btn.data('type'), isFollow);
        });

        $('#subscribed a.btn_subs, #btnFollowv2, .journalist_list a.btn_subs').on('click', function () {
        	var $btn = $(this),
                isFollow = $btn.data('isFollow') == true || $btn.data('isFollow') == 'True' ? true : false;
        	targetFollowv2($btn, $btn.data('id'), $btn.data('type'), isFollow);
        });

        $('.back_top > a').on('click', function() {
            $(window).scrollTop(0);
            return false;
        });

        $('#head').sticky({
            top: (articleType == ARTICLE_TYPE.cover ? 460 : 136),
            cls: 'fake_sticky',
            callback: function ($head) {
                var $btn = $('.back_top > a');

                if ($('html').hasClass('fake_sticky')) {
                    $btn.show();
                } else {
                    $btn.hide();
                }
            }
        });

        $('#doc').find('div.ad').on('click', '.ft button', function() {
            $(this).closest('.ad').hide();

            return false;
        });

        $('.ad_top, .ft_close').on('click', '.ft button', function () {
            $(this).closest('.ad').hide();

            return false;
        });

        //윈도우 로드 완료 후 페렐렉스 스크롤 실행되도록 수정
        /*var WindowLoad = window.onload;
        window.onload = function (e) {
            if (typeof (WindowLoad) == "function") {
                WindowLoad();
            }
            // Set Parallax Scroll
            // Cover Article 을 제외한 전체 페이지에 적용.
            if (utils.config('applicationType') == APPLICATION_TYPE.pc && articleType != ARTICLE_TYPE.cover && location.host.indexOf(utils.config('cmsHost')) == -1) {
                //utils.log('$$$$$ Set Parallax Scroll');
                $.parallaxScrolling && $.parallaxScrolling();
            }
        }*/
        $(window).load(function () {
            // Set Parallax Scroll
        	// Cover Article 을 제외한 전체 페이지에 적용.
        	if (utils.config('applicationType') == APPLICATION_TYPE.pc && !utils.isCoverTypeCheck() && location.host.indexOf(utils.config('cmsHost')) == -1) {
                //utils.log('$$$$$ Set Parallax Scroll');
                $.parallaxScrolling && $.parallaxScrolling();
            }
        });

        function initArticle() {

            var totalId = utils.getTotalId();
            var commentTotalId = $('#comment_total_id').val() || '';
            var $articleBody = $('#article_body');
            if (articleType == ARTICLE_TYPE.spGallery) {
            	$articleBody = $('#content');
            }
            var sourceCode = utils.getArticleSourceCode();
            var articleTitle = utils.getArticleTitle();
            var isLoginContents = utils.getIsLoginContents();
            // 클립보드 복사 이벤트 처리.
            if ((sourceCode == '1') || (sourceCode == '3') || (sourceCode == 'd5')) {
                if (document.addEventListener) {
                    document.addEventListener("copy", fnCopyTextAdd, false);
                } else if (document.attachEvent) {
                    document.attachEvent("oncopy", fnCopyTextAdd);
                }
            }

            function fnCopyTextAdd() {
                var getSelection = window.getSelection ? window.getSelection() : document.selection;
                var getRange = getSelection.getRangeAt ? getSelection.getRangeAt(0) : getSelection.createRange();
                if (!getSelection.rangeCount) return null
                var addText = "[출처: 중앙일보] " + articleTitle;
                var addHtml = "<br /><br />" + addText;
                var body = document.getElementsByTagName("body")[0];
                var span = document.createElement("span");
                span.appendChild(getRange.cloneContents());
                if (span.innerHTML == "") return null;
                var copytext = span.innerHTML + addHtml;
                var addDiv = document.createElement("div");
                body.appendChild(addDiv);
                addDiv.innerHTML = copytext;
                getSelection.selectAllChildren(addDiv);
                window.setTimeout(function () {
                    body.removeChild(addDiv);
                    getSelection.removeAllRanges();
                    getSelection.addRange(getRange);
                }, 0);
            }

            resetAdCriteo();

            $('img[data-src], img[data-origin]', '#body').setDefaultImage();

            $('iframe[data-src]', '#body').each(function () {
                var $iframe = $(this);

                if (!$iframe.attr('src')) {
                    $iframe.attr('src', $iframe.data('src'));
                }
            });

            $('.tag_list').find('li').on('click', 'a', function() {
                var $p = $(this).parent(),
                    keyword = '';

                //utils.log($p.hasClass('issue'));
                if($p.hasClass('issue') === false) {
                    keyword = $(this).text().replace('#', '');

                    utils.saveSearchHistory(keyword);
                }
            });

            // init Article Components
            if ($.fn.articleComponent && (!isLoginContents || userInfo.isLogin())) {
                var pageMenuKey = utils.menu.getPageMenuKey().toLowerCase();

                if((articleType == ARTICLE_TYPE.general || articleType == ARTICLE_TYPE.cover) && pageMenuKey.indexOf('jplus') == -1 && !utils.getIsCartoon()) {
                    //$articleBody.articleNewsflash(); // 속보
                }

                $articleBody.articleComponent();

                if(pageMenuKey.indexOf('jplus') !== -1) {
                    $articleBody.articleJplusRecentlyNews();
                }
            }

        	// init Article Bottom
            if (!utils.isSpCoverTypeCheck()) {
            	if ($.fn.articleBottom) {
            		$('#content').articleBottom();
            	}
            }

            $('.share_article a', '#content').setShareForArticle();

            var headHeight = $('#head').height(),
                headOffset = $('#head').offset();
            // init Article sticky Menu (Only Article)
            if ($('#head').length > 0) { 
                $('#head').sticky({
                    top: (articleType == ARTICLE_TYPE.cover ? 460 : 136 + headOffset.top),
                    callback: function($head) {

                        var $body = $('#body'),
                            bodyStyls = {'margin-top': ''};

                        if($head.hasClass('sticky')) {
                            layout.header.showSnsArea(true);
                            layout.header.bindCloseSearchArea(); // 검색 폼 / sns 변경 처리 이벤트 bind
                            $('.sns_wrap a', '#head').setShareForArticle(true);

                            bodyStyls['margin-top'] = headHeight;
                        } else {
                            layout.header.showSearchArea(false);
                            layout.header.unbindCloseSearchArea(); // 검색 폼 / sns 변경 처리 이벤트 unbind (검색폼 고정)
                            $('.sns_wrap a', '#head').setShareForArticle(false);
                        }
                	    // 연재 와이드 타입은 body margin-top이 유지
                        if (articleType != ARTICLE_TYPE.spWide) {
                    	    $body.css(bodyStyls);
                        }
                    }
                });
            }

            if (articleType == ARTICLE_TYPE.cover && $('#head').length > 0) {
                $('#head').sticky({
                    top: 260,
                    cls: 'fixed_bg',
                    callback: function($head) {
                        if($head.hasClass('fixed_bg')) {
                            $('#cover').addClass('fixed_bg');
                        } else {
                            $('#cover').removeClass('fixed_bg');
                        }
                    }
                });
            }

            // init Article Comment
            if (!commentTotalId.isEmpty() && $.fn.comment) {
                $('#comment').comment({
                    id: commentTotalId,
                    page: 'article' //news, user
                });
            }

            //프리미엄 기사일 경우 click 이벤트 예외 처리

            if (isLoginContents && !userInfo.isLogin()) {
                $('.btn_paper, #btnDislike, #btnLike, #btnPrint').on('click', function () {
                    //프리미엄 기사일 경우 예외 처리
                    if (isLoginContents) {
                        alert('로그인을 해야 이용하실 수 있습니다.');
                        return false;
                    }
                });

                return false;
            }
            // set Article Print
            $('#btnPrint').on('click', function () {
                if(!totalId) {
                    utils.error('not defined total_id', true);
                    return false;
                }

                var windowSize = utils.windowSize();
                var height = windowSize.height > 650 ? 650 : windowSize.height;
                window.open('/article/print/' + totalId, 'print', 'directories=no,location=no,menubar=no,status=no,toolbar=no,scrollbars=yes,resizable=no,width=800,height=' + windowSize.height);
            });

            // set Article Scrap
            $('#btnScrap').on('click', function() {
            	//utils.log('## scrap');
            	var userInfo = commentUserInfo.getInfo();
            	if (userInfo.type === "joins") {
            		articleScrap(totalId);
            	} else {
            		alert("joins 로그인 후, 이용할 수 있습니다.\n(※ 소셜로그인 사용자는 해당 기능을 이용할 수 없습니다.)");
            	}
            });

            // set Article Like
            $('#btnLike').on('click', function () {
                var $btn = $(this),
                    count = $btn.find('.count').text(),
                    url = utils.config('apiPath') + '/article/' + totalId + '/like';

                if (totalId.length == 0) {
                    return alert('요청을 처리중 오류가 발생했습니다.\n새로 고침 후, 다시 시도해주세요.');
                }

                count = parseInt(count, 10);
                utils.ajaxPost({
                    url: url,
                    success: function (res) {
                        if (res.IsSuccess) {
                            //alert('좋아요를 선택하셨습니다.');
                            $btn.find('.count').text(count + 1);
                        } else {
                            alert('이미 선택하셨습니다.');
                        }
                    }
                });
            });

            // set Article Hate
            $('#btnDislike').on('click', function() {

                var $btn = $(this),
                    count = $btn.find('.count').text(),
                    url = utils.config('apiPath') + '/article/' + totalId + '/hate';

                if(totalId.length == 0) {
                    return alert('요청을 처리중 오류가 발생했습니다.\n새로 고침 후, 다시 시도해주세요.');
                }

                count = parseInt(count, 10);
                utils.ajaxPost({
                    url: url,
                    success: function(res) {
                        if(res.IsSuccess) {
                            //alert('싫어요를 선택하셨습니다.');
                            $btn.find('.count').text(count + 1);
                        } else {
                            alert('이미 선택하셨습니다.');
                        }
                    }
                });
            });

            //$articleBody.on('resize_content', function () { utils.log('##font resize'); resetAdCriteo();});
            //set criteo
            function resetAdCriteo() {
                // criteo_network 광고.
                var isCulture = utils.menu.getPageMenuKey().toLowerCase().indexOf('culture') !== -1 ? true : false //문화 아티클일 경우 광고 타입이 변경됨

                var isTravel = utils.menu.getPageMenuKey().toLowerCase().indexOf('travel') !== -1 ? true : false, //week& 아티클일 경우 광고 타입이 변경됨
                    //여행 기사내 광고 분기처리 제거 20171214
                    //$adCriteoNetwork = isTravel ? $adCriteoNetwork = $('#display_749').css('margin-left', '20px') : $('#criteo_network').css('margin-left', '20px'),
                    $adCriteoNetwork = $('#criteo_network').css('margin-left', '20px'),
                    $articleChildren = null,
                    //$articleAppendLast = $('<div id="article_body_last" style="height:0px;width:0px;"></div>');
                    relatedElementHeight = 0,
                    jplus1 = 0,
                    jplus2 = 0;

                function init() {
                    //$articleChildren = $articleBody.children();
                    $articleChildren = $articleBody.children().filter(':not(div[class^=ab_jplus], div[class^=ab_related], #criteo_network)');

                    if ($articleChildren.length === 0) {
                        loadCriteo();
                    }
                    else {
                        relatedElementHeight = $articleBody.find('>div.ab_related').outerHeight() || 0;
                        jplus1 = $articleBody.find('>div.ab_jplus_notice').outerHeight() || 0;
                        jplus2 = $articleBody.find('>div.ab_jplus').outerHeight() || 0;
                        resetPosition();
                    }
                }

                if ($adCriteoNetwork.length > 0) {
                    init();
                }

                function resetPosition() {
                    var $targetChild = null;
                    for (var i = $articleChildren.length; i > 0; i--) {

                        $targetChild = $articleChildren.eq(i -1);

                        //utils.log('## $targetChild');
                        //utils.log($targetChild);

                        // 마지막 요소탐색이 끝나면
                        // 컴포넌트 여부 체크
                        if (i == 1 || $targetChild.is('div[class^=tag_], img, div[class^=ab_]')) {
                            if (i != 1) {
                                $adCriteoNetwork.css('margin-top', 0);
                            }
                            loadCriteo();
                            return;
                        }

                        //$targetChild.after($adCriteoNetwork); //이걸 왜 넣었는지 모르겠다..

                        if ($("div[style*='background:'][style*='width:'][style*='border:'][style*='border-image:']").length > 0) {
                        	$articleBody.append($adCriteoNetwork);
                        }
                        else {
							if (isBodyInside()) {
								if (i == $articleChildren.length) {
									$articleBody.append($adCriteoNetwork);
								}
								else {
									$articleChildren.eq($targetChild.index() +1).before($adCriteoNetwork);
								}
								loadCriteo();
								return;

							}
							else {
								$targetChild.before($adCriteoNetwork);
								if (isBodyInside()) {
									//$targetChild.after($adCriteoNetwork); //이걸 왜 넣었는지 모르겠다..
									loadCriteo();
									return;
								}
							}
						}
                    }
                };

                function isBodyInside() {
                    var adOffsetBottom = 0,
                        articleOffsetBottom = 0;

                    adOffsetBottom = $articleBody.offset().top + $adCriteoNetwork.offset().top + $adCriteoNetwork.outerHeight(true);
                    articleOffsetBottom = $articleBody.offset().top + $articleBody.height() - relatedElementHeight - jplus1 - jplus2;  // article_body 높이 계산에 제외 할 요소들의 높이 제거

                    adOffsetBottom = Math.ceil(adOffsetBottom);
                    articleOffsetBottom = Math.ceil(articleOffsetBottom);

                    return adOffsetBottom < articleOffsetBottom ? true : false;
                }

                function loadCriteo() {
                    //기사내 광고 정치,문화,여행 분기처리 제거 20171214
                    /*if (isCulture) {
                        $('#criteo_network', $articleBody).loadAd({ type: 'da_250_culture' });
                    }
                    else if (utils.menu.getPageMenuKey().toLowerCase().indexOf('politics') !== -1) {
                    	$('#criteo_network', $articleBody).loadAd({ type: 'da_250_politics' });
                    }
                    else {
                        if (!isTravel) {
                            $('#criteo_network', $articleBody).loadAd({ type: 'da_250_1' });
                        }
                    }*/
                    $('#criteo_network', $articleBody).loadAd({ type: 'da_250_1' });
                }
            };
        }

        function articleScrap(totalId) {

            if(totalId.length == 0) {
                return alert('요청을 처리중 오류가 발생했습니다.\n새로 고침 후, 다시 시도해주세요.');
            }

            var url = utils.config('apiPath') + '/article/' + totalId + '/subscribe';

            if(!utils.config(CONFIG_NAMES.isLogin)) {
                return alert('joins 로그인 후, 이용할 수 있습니다.\n(※ 소셜로그인 사용자는 해당 기능을 이용할 수 없습니다.)');
            }

            utils.ajaxPost({
                url: url,
                success: function(res) {
                    if(res.IsSuccess) {
                        alert('기사가 스크랩되었습니다.\n\'독자서비스> MY 뉴스\'에서 확인하실 수 있습니다.');
                    } else {
                        if(res.Code === 'Duplicated') {
                            alert('이미 스크랩한 기사입니다.');
                        } else {
                            alert('요청을 처리중 오류가 발생했습니다.\n새로 고침 후, 다시 시도해주세요.');
                        }
                    }
                }
            });
        }

        function targetFollow($btn, id, type, isFollow) {
            var unfollowMessage = {
                reporter: '해당 기자를 구독해지하시겠습니까?',
                issue: '해당 이슈를 구독해지하시겠습니까?'
            };

            if(!id || !type) {
                return alert('요청을 처리중 오류가 발생했습니다.\n새로 고침 후, 다시 시도해주세요.');
            }

            //utils.log('## articleScrap');
            var url = utils.config('apiPath') + '/' + type + '/' + id + (isFollow ? '/unsubscribe' : '/subscribe');

            if(!utils.config(CONFIG_NAMES.isLogin)) {
                return alert('joins 로그인 후, 이용할 수 있습니다.\n(※ 소셜로그인 사용자는 해당 기능을 이용할 수 없습니다.)');
            } else {
        		var userInfo = commentUserInfo.getInfo();
        		if (userInfo.type !== "joins") { 
        			return alert('joins 로그인 후, 이용할 수 있습니다.\n(※ 소셜로그인 사용자는 해당 기능을 이용할 수 없습니다.)');
				}
            }

            if(isFollow) {
                if(!confirm(unfollowMessage[type])) {
                    return false;
                }
            }

            utils.ajaxPost({
                url: url,
                success: function(res) {

                    if(isFollow) {
                        unFollow(false);
                    } else {
                        follow(true);
                    }
                }
            });

            function follow(_isFollow) {
                alert('구독되었습니다.\n\'독자서비스> 보관함\'에서 확인하실 수 있습니다.');
                $btn.data('isFollow', _isFollow).parent().removeClass('toggle_off').addClass('toggle_on');
            }

            function unFollow(_isFollow) {
                alert('구독해지 되었습니다.');
                $btn.data('isFollow', _isFollow).parent().removeClass('toggle_on').addClass('toggle_off');
            }
        }

        function targetFollowv2($btn, id, type, isFollow) {
        	var unfollowMessage = {
        		reporter: '필진 pick을 취소 하시겠습니까?\n취소할 경우, 필진 pick에서 해당 필진의 업데이트되는 컬럼을 확인할 수 없습니다.'
        	};
        	if (!id || !type) {
        		return alert('요청을 처리중 오류가 발생했습니다.\n새로 고침 후, 다시 시도해주세요.');
        	}
        	var url = utils.config('apiPath') + '/' + type + '/' + id + (isFollow ? '/unsubscribe' : '/subscribe');

        	if (!utils.config(CONFIG_NAMES.isLogin)) {
        		return alert('joins 로그인 후, 이용할 수 있습니다.\n(※ 소셜로그인 사용자는 해당 기능을 이용할 수 없습니다.)');
        	} else {
        		var userInfo = commentUserInfo.getInfo();
        		if (userInfo.type !== "joins") {
        			return alert('joins 로그인 후, 이용할 수 있습니다.\n(※ 소셜로그인 사용자는 해당 기능을 이용할 수 없습니다.)');
        		}
        	}
        	if (isFollow) {
        		if (!confirm(unfollowMessage[type])) {
        			return false;
        		}
        	}
        	utils.ajaxPost({
        		url: url,
        		success: function (res) {
        			if (isFollow) {
        				unFollow(false);
        			} else {
        				follow(true);
        			}
        		}, error: function (request, status, error) {
        			//alert(request.status + '//' + status + '//' + error  )
        		}
        	});
        	function follow(_isFollow) {
        		alert('필진 Pick 목록에 추가 되었습니다.\n\필진 Pick에서 업데이트 되는 컬럼을 모아서 볼 수 있습니다.');
        		$btn.data('isFollow', _isFollow).addClass('btn_subs_ing');
        	}
        	function unFollow(_isFollow) {
        		alert('취소 되었습니다.');
        		$btn.data('isFollow', _isFollow).removeClass('btn_subs_ing');
        	}
        }

        // 아티클
        // 기자 리스트
        //$('div#content div.journalist_area a').each(function() {
        //    $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|reporter'));
        //});

        // 지면 보기
        $('div.article_head .byline a').each(function() {
            $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|paper'));
        });

        // 관련 태그
        $('div#content div.tag_list a').each(function() {
            $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|tagkeyword'));
        });

        // 섹션홈
        var pathname = location.pathname.toLowerCase();
        // BI
        $('div#head div.logo a').each(function() {
            if(pathname.indexOf('article') > -1) {
                $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|bi'));
            } else {
                $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|section|bi'));
            }
        });

    	// 아티클 내 필진
        $('div#articleRetirement a').each(function () {
        	$(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|retirementreporter'));
        });

        /* Cloc */
    });
})(window, document, jQuery);