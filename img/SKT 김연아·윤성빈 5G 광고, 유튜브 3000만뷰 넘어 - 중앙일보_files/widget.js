﻿// widget.js
(function ($, window, document) {

    var WIDGET_INFO = {
        Ad: { key: 'Ad', fn: 'loadAd' },
        DepartmentSns: { key: 'DepartmentSns', fn: 'widgetDepartmentSns' },												// 부서별 SNS
        HotArticles: { key: 'HotArticles', fn: 'widgetHotArticles' },														// 많이 본 기사
        HotArticlesOrderByReplyCount: { key: 'HotArticlesOrderByReplyCount', fn: 'widgetHotArticlesOrderByReplyCount' },	// 댓글 많은 기사
        HotIssues: { key: 'HotIssues', fn: 'widgetHotIssues' },															// 핫 이슈
        HotJPlus: { key: 'HotJPlus', fn: 'widgetHotJPlus' },																// 인기 J플러스          //20180131 삭제예정
        PrismStarReporter: { key: 'PrismStarReporter', fn: 'widgetPrismStarReporter' },                                 // 스타기자      //20180131
        HotJPlusOrderByReplyCount: { key: 'HotJPlusOrderByReplyCount', fn: 'widgetHotArticlesOrderByReplyCount' },		// 댓글 많은 수 인기 J플러스  //20180131 삭제예정
        HotVideos: { key: 'HotVideos', fn: 'widgetHotVideos' },															// 많이 본 동영상
        JoongangIssue: { key: 'JoongangIssue', fn: 'widgetJoongangIssue' },												// 중앙 연재
        Link: { key: 'Link', fn: 'widgetLink' },																			// 링크
        PhotoIssues: { key: 'PhotoIssues', fn: 'widgetPhotoIssues' },														// 포토 이슈
        RecommendedIssues: { key: 'RecommendedIssues', fn: 'widgetRecommendedIssues' },									// 추천 연재
        RelatedKeyword: { key: 'RelatedKeyword', fn: 'widgetRelatedKeyword' },											// 관련 키워드
        RecommendedArticle: { key: 'RecommendedArticle', fn: 'widgetRecommendedArticle' },								// 추천 기사
        OpinionCast: { key: 'OpinionCast', fn: 'widgetOpinionCast' },														// 오피니언 방송 (최신기사3건)
        PortalSearchKeyword: { key: 'PortalSearchKeyword', fn: 'widgetPortalSearchKeyword' },								// 포탈 실시간 검색어
        SnsArticle: { key: 'SnsArticle', fn: 'widgetSnsArticle' },														// SNS 뉴스
        MajorArticle: { key: 'MajorArticle', fn: 'widgetMajorArticle' },													// 주요 뉴스
        FastNews: { key: 'FastNews', fn: 'widgetFastNews' },																// 지면보다 빠른 뉴스
        TrendArticle: { key: 'TrendArticle', fn: 'widgetTrendArticle' },													// 추천 기사
        ReporterQnA: { key: 'ReporterQnA', fn: 'widgetReporterQnA' },														// 기자 Q&A
        MorningPoem: { key: 'MorningPoem', fn: 'widgetMorningPoem' },													// 시가 있는 아침
        DirectInterview: { key: 'DirectInterview', fn: 'widgetDirectInterview' },											// 직격 인터뷰
        PopularReporter: { key: 'PopularReporter', fn: 'widgetPopularReporter' },											// 인기 기자
        TalkNk: { key: 'TalkNk', fn: 'widgetTalkNk' },																	// TALK NK
        VoiceOfAmerica: { key: 'VoiceOfAmerica', fn: 'widgetVoiceOfAmerica' },											// VoiceOfAmerica
        WeeklyTravel: { key: 'WeeklyTravel', fn: 'widgetWeeklyTravel' },												// 금주의 Week&#38;+
        ImcBanner: { key: 'ImcBanner', fn: 'widgetImcBanner' },															// Imc Banner
        SpecialCartoon: { key: 'SpecialCartoon', fn: 'widgetSpecialCartoon' },											// 평양 오디세이
        DigitalOpinion: { key: 'DigitalOpinion', fn: 'widgetDigitalOpinion' },										    // 퍼스 펙티브
        MmCampaign: { key: 'MmCampaign', fn: 'widgetMmCampaign' },										                // Mr.밀리터리 캠페인														// Mr.밀리터리 소개 팝업
        MmBannerAd: { key: 'MmBannerAd', fn: 'widgetMmBannerAd' },
        MmRequest: { key: 'MmRequest', fn: 'widgetMmRequest' },															// Mr.밀리터리 게시판
        MmInfo: { key: 'MmInfo', fn: 'widgetMmInfo' },																	// Mr.밀리터리 소개 팝업
        InnovationLabList: { key: 'InnovationLabList', fn: 'widgetInnovationLab' },
        UniversityRanking: { key: 'UniversityRanking', fn: 'widgetUniversityRanking' },
        RealtimeArticle: { key: 'RealtimeArticle', fn: 'widgetRealtimeArticle' },								        // 실시간 검색어
        RecommendedMovie: { key: 'RecommendedMovie', fn: 'widgetRecommendedMovie' },									// 추천 영화
        RecommendedTheme: { key: 'RecommendedTheme', fn: 'widgetRecommendedTheme' },									// 추천 테마
        PeopleMic: { key: 'PeopleMic', fn: 'widgetPeopleMic' },															// 시민마이크
        PeopleLatest: { key: 'PeopleLatest', fn: 'widgetPeopleLatest' },												// 피플 > 최신 기사
        EgleWeekBest: { key: 'EgleWeekBest', fn: 'widgetEgleWeekBest' },												// e글중심>주간 인기 글
        TagNews: { key: 'TagNews', fn: 'widgetTagNews' }																// PC 이슈패키지
        ,RetirementWriter: { key: 'RetirementWriter', fn: 'widgetRetirementWriter' }							// 퇴직 준비 필진신청
        ,RetirementNotice: { key: 'RetirementNotice', fn: 'widgetRetirementNotice' }							// 퇴직 준비 공지사항
        ,JpodEpisode: { key: 'JpodEpisode', fn: 'widgetJpodEpisode' }							//JPOD
    };

    var apiPath = utils.config('apiPath');

    $.fn.widget = function () {
        var $p = this;

        $p.children().each(function (i, v) {

            var $w = $(v),
				type = $w.data('widgetType'),
				service = $w.data('widgetService'),
				category = $w.data('widgetCategory'),
				fn = WIDGET_INFO[type] && WIDGET_INFO[type].fn;

            if (type && typeof $.fn[fn] == 'function') {
                $w[fn]({ type: service, category: category });
            }
        });
    };

    $.fn.wideWidget = function () {
        var $p = this;
        $p.children().each(function (i, v) {

            var $w = $(v),
				type = $w.data('widgetType'),
				service = $w.data('widgetService'),
				category = $w.data('widgetCategory'),
				fn = WIDGET_INFO[type] && WIDGET_INFO[type].fn;

            //utils.log($w);
            //utils.log('## type : ' + type);

            if (type != undefined) {
                $w[fn]({ type: service, category: category });
            }
        });
    };

    $.fn.articleBottom = function () {
        var $p = this;

        //데이블
        $('div.hot_click_wrap', $p).widgetHotClickDable();

        if (utils.getArticleSourceCode() == "b8") {
            $('.ab_related', $p).widgetHotClickUSA(); // USA 핫클릭
        }
        $('>div.photo_video', $p).widgetPhotoVideo(); // PhotoVideo
        $('>div.special_link', $p).widgetSpecialLink(); // widgetSpecialLink
        
		if ($('#divRelateTag').length > 0) {
            $('#divRelateTag').widgetRelationsTag();    // 태그뉴스
        	$("#divRelateTag").widgetOutstreamAD();
        }

		if($('div.soundcloud').length > 0) {
			$('div.soundcloud').widgetPrehear();   //미리듣는 오늘
		}

		// Jpod
		if ($('div.jpod_temp2').length > 0) {
			$('div.jpod_temp2').widgetJpodEpisode();
		}

        //쇼핑박스
		$('#shpping_life_1').loadAd({ type: 'joongang_pc_200x200_1_test' });
		$('#shpping_life_2').loadAd({ type: 'joongang_pc_200x200_2_test' });
		$('#shpping_life_3').loadAd({ type: 'joongang_pc_200x200_3_test' });

        // 아티클 바이라인 하단 광고
        var randomNum = utils.getRandomNumber(1, 2);
        switch (randomNum) {
            case 1:
                $('#ab_adtxt_lt').loadAd({ type: 'ab_adtxt_lt_1' });
                $('#ab_adtxt_lt').loadAd({ type: 'ab_adtxt_lt_2' });
                break;
            case 2:
                $('#ab_adtxt_lt').loadAd({ type: 'ab_adtxt_lt_2' });
                $('#ab_adtxt_lt').loadAd({ type: 'ab_adtxt_lt_1' });
                break;
            default:
                $('#ab_adtxt_lt').loadAd({ type: 'ab_adtxt_lt_1' });
                $('#ab_adtxt_lt').loadAd({ type: 'ab_adtxt_lt_2' });
                break;
        }
        //$('#ab_adtxt_lt').loadAd({ type: 'ab_adtxt_lt_3' });
        $('#ab_adtxt_lt').loadAd({ type: 'ab_adtxt_lt_4' });
        $('#ab_adtxt_rt').loadAd({ type: 'ab_adtxt_rt' });

        $('#da_article_right_middle').loadAd({ type: 'da_article_right_middle' });
    };

    $.fn.widgetWeeklyTravel = function () {
        var $w = this,
			widgetHtml = '<div class="hd"><h3 class="subtit_comm">금주의 week&amp;+</h3></div><div class="bd"></div>',
			template = '<ul data-bind="list">' +
				'<li data-bind="items">' +
				'<span class="thumb" data-bind="thumb"><a data-bind="link"><img data-bind="image"><span class="frame"></span></a></span>' +
				'<strong><a data-bind="link"></a></strong>' +
				'</li>' +
				'</ul>',
			directives = {
			    list: {
			        link: utils.decorators.link,
			        image: utils.decorators.image,
			        thumb: {
			            html: function (params) {
			                if (params.index != 0) {
			                    $(params.element).remove();
			                }
			            }
			        }
			    }
			};

        getApiData('/static/traveloftheweek', render);

        function render(res) {

            var html = '', data = { list: [] };

            try {
                res.List.forEach(function (v) {
                    data.list.push(utils.models.getLinkFromApiArticle(v));
                });
            } catch (e) { utils.log(e); };

            if (data.list.length) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                $w.hide();
            }
        }
    };

    $.fn.widgetVoiceOfAmerica = function () {
        var $w = this,
			widgetHtml = '<div class="hd"><h4 class="subtit_comm">Voice of America</h4></div><div class="bd"></div>',
			template = '<span class="thumb"><a data-bind="link"><img data-bind="image"><span class="icon_video"></span></a></span><strong><a data-bind="link"></a></strong>',
			directives = { link: utils.decorators.link, image: utils.decorators.image };

        getApiData('/static/voiceofamerica', render);

        function render(res) {

            var html = '', data = {};

            try {
                data = utils.models.getLinkFromApiArticle(res.item);
            } catch (e) { utils.log(e); };

            if (data && data.link && data.link.href && data.link.text) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                $w.hide();
            }
        }
    };

    // TALK NK
    $.fn.widgetTalkNk = function () {

        var $w = this,
			widgetHtml = '<div class="hd"><h4 class="subtit_comm">TALK NK</h4></div><div class="bd"></div>',
			template = '<ul class="mg" data-bind="list"><li><a data-bind="link"></a></li></ul>',
			directives = { list: { link: utils.decorators.link, image: utils.decorators.image } };

        getApiData('/static/talknks', render);

        function render(d) {

            var html = '',
				data = { list: [] };

            try {
                d.List.forEach(function (v, i) {
                	var bbsLink = utils.config('bbsPath') + '/app/index.php?mid={MID}&document_srl={ID}';
                    bbsLink = bbsLink.replace('{MID}', v.Mid).replace('{ID}', v.Id);
                    data.list.push({ link: { href: bbsLink, html: v.Title } });
                });

            } catch (e) { utils.log(e); };

            if (data.list.length) {

                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                utils.error('widgetTalkNk', true);
                $w.hide();
            }
        }
    };

    // 기자 Q&A
    // TODO : 데이타 확인하고 작업하자.
    $.fn.widgetReporterQnA = function () {
        var $w = this,
			department = ($w.data('widgetCategory') || 'Politics').toLowerCase(),
			widgetHtml = '',
			template = '' +
			'<div class="hd"><h4 class="subtit_comm" data-bind="reporter"><a data-bind="link">기자 Q&amp;A</a></h4></div>' +
			'<div class="bd">' +
				'<p class="mg">무엇이든 물어보세요, 기자의 꿀팁!</p>' +
				'<dl>' +
					'<dt class="mg" data-bind="question">Q. <a data-bind="link"></a></dt>' +
					'<dd data-bind="answer">Re: <a data-bind="link"></a></dd>' +
				'</dl>' +
			'</div>' +
			'<div class="ft" data-bind="reporter"><a data-bind="link" class="add"><span class="hide">기자 Q&amp;A</span> 더보기<span class="icon"></span></a></div>',
			directives = {
			    question: {
			        link: utils.decorators.link
			    },
			    answer: {
			        link: utils.decorators.link,
			        html: function (params) {
			            if (!this.answer.link.text) {
			                $(params.element).remove();
			            }
			        }
			    },
			    reporter: { link: utils.decorators.link }
			};

        getApiData('/static/reporterqna', render);

        function render(d) {

            var html = '', data = {};

            try {
                data = {
                    question: { link: { text: d.Qna.Title, href: d.Qna.TotalId == 0 ? d.Qna.Link : utils.getUrlFormat(URL_NAMES.article, d.Qna.TotalId) } },
                    answer: { link: { text: d.Qna.Content, href: d.Qna.TotalId == 0 ? d.Qna.Link : utils.getUrlFormat(URL_NAMES.article, d.Qna.TotalId) } },
                    reporter: { link: { href: utils.getUrlFormat(URL_NAMES.reporter, d.Qna.Reporter.Id) } }
                };
            } catch (e) { utils.log(e); };

            if (data) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                $w.html(html);
                $w.show();
            } else {
                $w.hide();
            }
        }
    };

    // 시가 있는 아침
    $.fn.widgetMorningPoem = function () {

        var $w = this,
			widgetName = '시가 있는 아침',
			listLink = utils.config('webPcPath') + '/find/list?Keyword=%22' + encodeURIComponent(widgetName) + '%22&ServiceCode=20&SearchCategoryType=OnlyJoongangNews&display=' + encodeURIComponent(widgetName),
			widgetHtml = '<div class="hd"><h3 class="subtit_comm"><a href="' + listLink + '">' + widgetName + '</a></h3></div><div class="bd"></div>',
			template = '<ul data-bind="list"><li><span class="icon"></span><a data-bind="link"></a></li></ul>',
			directives = {
			    list: { link: utils.decorators.link }
			};

        getApiData('/static/morningpoem', render);

        function render(d) {

            var html = '',
				data = { list: [] };

            try {
                d.List.forEach(function (v, i) {
                    var articleLink = utils.getUrlFormat(URL_NAMES.article, v.Id);
                    data.list.push({ link: { href: articleLink, html: v.Title } });
                });
            } catch (e) { utils.log(e); };

            if (data.list.length) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                $w.hide();
            }
        }
    };

    // 직격 인터뷰
    $.fn.widgetDirectInterview = function () {

        var $w = this,
			widgetName = '직격 인터뷰',
			listLink = utils.config('webPcPath') + '/find/list?Keyword=%22' + encodeURIComponent(widgetName) + '%22&ServiceCode=20&SearchCategoryType=OnlyJoongangNews&display=' + encodeURIComponent(widgetName),
			widgetHtml = '<div class="hd"><h3 class="subtit_comm"><a href="' + listLink + '">' + widgetName + '</a></h3></div><div class="bd"></div>',
			template = '<ul data-bind="list"><li><span class="icon"></span><a data-bind="link"></a></li></ul>',
			directives = {
			    list: { link: utils.decorators.link }
			};

        getApiData('/static/directinterview', render);

        function render(d) {

            var html = '',
				data = { list: [] };

            try {
                d.List.forEach(function (v, i) {
                    var articleLink = utils.getUrlFormat(URL_NAMES.article, v.Id);
                    data.list.push({ link: { href: articleLink, html: v.Title } });
                });
            } catch (e) {
                utils.log(e);
            };

            if (data.list.length) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                $w.hide();
            }
        }
    };

    // 인기 기자
    $.fn.widgetPopularReporter = function () {

        var $w = this;
        $.getScript(utils.config('staticPath') + '/scripts/data/home/js/right_today_reporter_gen.js', render);

        function render(d) {
            var idx, reporter, reporterLink, listIdx;
            var html = '',
				data = { list: [] }

            reporterList = utils.convertList(today_reporter_list);
            var strHtml = [];
            strHtml.push("<div class='hd'><a href='" + utils.config('webPcPath') + "/reporter'><h2 class='subtit_comm'>오늘의 기자</h2></a></div>");
            strHtml.push("<div class='bd'><div class='slide_wrap'><div class='slide_list'>");
            try {
                for (listIdx = 0; listIdx < reporterList.length; listIdx++) {
                    reporter = reporterList[listIdx];
                    reporterLink = utils.config('webPcPath') + "/reporter/" + reporter.ReporterSeq;
                    strHtml.push("<div class='slide'>");
                    strHtml.push("<span class='profile'><span class='photo'><a href='" + reporterLink + "' target='_self'>");
                    strHtml.push("<img src='" + reporter.ReporterImg + "' longdesc='" + reporter.ReporterImg + "'  alt='" + reporter.ReporterName + "' onerror=\"this.src='" + utils.config('imagePath') + "/pc/issue/v_noimg_journalist.jpg'\">");
                    strHtml.push("<span class='frame'></span></a></span><strong class='mg'><a href='" + reporterLink + "' target='_self'>" + reporter.ReporterName + "</a></strong>");
                    strHtml.push("<em><a href='" + reporterLink + "' target='_self'>" + reporter.ReporterTitle + "</a></em></span><div class='reporter_article mg'><ul class='related_article'>");
                    if (Object.keys(reporter.ArticleList.ArticleId).length > 0) {
                        for (idx = 0; idx < Object.keys(reporter.ArticleList.ArticleId).length; idx++) {
                            if (listIdx == 0) {
                                strHtml.push("<li><a href='" + utils.config('webPcPath') + "/article/" + reporter.ArticleList.ArticleId[idx].value + "'><strong>" + reporter.ArticleList.ArticleTitle[idx].value + "</strong></a></li>");
                            }
                            else {
                                strHtml.push("<li><a href='" + utils.config('webPcPath') + "/article/" + reporter.ArticleList.ArticleId[idx].value + "'>" + reporter.ArticleList.ArticleTitle[idx].value + "</a></li>");
                            }
                        }
                    }
                    strHtml.push("</ul></div></div>");
                }
            } catch (e) {
                utils.log('widgetHomeTodayReporter');
                utils.log(e);
            };
            strHtml.push("</div><button type='button' class='btn-prev'>이전</button><button type='button' class='btn-next'>다음</button></div></div>");
            var randomRepIdx = 0;
            try {
                randomRepIdx = Math.floor(Math.random() * reporterList.length);
            } catch (e) {
                randomRepIdx = 0;
            }

            if (reporterList.length) {
                $w.append(strHtml.join(''));
                var $slideWrap = $('.slide_wrap', $w);
                $slideWrap.find('.slide_list').slideMotion({
                    infinite: true,
                    initialSlide: randomRepIdx,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    swipe: false,
                    prevArrow: $slideWrap.find('.btn-prev'),
                    nextArrow: $slideWrap.find('.btn-next')
                });
                $w.show();

            } else {
                $w.hide();
            }

            $w.find('a').each(function () {
                $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|home|todayreporter'));
            });
        }
    };

    // 추천연재
    $.fn.widgetRecommendedIssues = function () {

        utils.log('### widgetRecommendedIssues');

        var $w = this,
			category = ($w.data('widgetCategory') || 'Travel').toLowerCase(),
			widgetHtml = '' +
				'<div class="hd"><h3 class="subtit_comm">추천 연재</h3></div>' +
				'<div class="bd">' +
				'<div class="slide_wrap">' +
				'<div class="slide_list"></div>' +
				'<span class="btn_wrap" style="display:none;"><button type="button" class="btn-prev">이전</button><button type="button" class="btn-next">다음</button></span>' +
				'</div>' +
				'</div>',
			template = '<div class="slide" ><ul data-bind="list"><li><strong class="mg"><a data-bind="link"></a></strong></li></ul></div>',
			apiUrl = '/static/travel/recommandedseries';
			directives = { list: { link: utils.decorators.link, image: utils.decorators.image } };

			if (category === 'lifestyle') {
				apiUrl = '/static/lifestyle/recommandedseries';
			}

        getApiData(apiUrl, render);

        function render(d) {

            var html = '',
				data = { list: [] },
				groupIndex = 0;

            try {
                d.List.forEach(function (v, i) {
                    var articleLink = v.Id == 0 ? v.Link : utils.getUrlFormat(URL_NAMES.article, v.Id);
                    groupIndex = parseInt(i / 8, 16);
                    data.list.push({ group: groupIndex, link: { href: articleLink, html: v.Title } });
                });
            } catch (e) {
                utils.log(e);
            };

            if (data.list.length) {

                $w.html(widgetHtml);

                for (var i = 0, len = groupIndex + 1; i < len; i++) {

                    var listData = data.list.filter(function (v) {
                        return v.group == i;
                    });

                    html = $.renderTemplate({ template: template, data: { list: listData }, directives: directives });
                    $w.find('.slide_list').append(html);
                }

                // 낱장일때 Widget 높이 보정.
                var $firstSlide = $w.find('.slide:first');
                $firstSlide.closest('.slide_wrap').height($firstSlide.children().height());

                //utils.log('# groupIndex : ' + groupIndex);
                //utils.log('children height : ' + $firstSlide.children().height());

                // Page(groupIndex) 가 1개 이상이면 버튼 활성화
                if (groupIndex > 0) {

                    $w.find('.btn_wrap').show();
                    var $slideWrap = $('.slide_wrap', $w);
                    $slideWrap.find('.slide_list').slideMotion({
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        swipe: false,
                        prevArrow: $slideWrap.find('.btn-prev'),
                        nextArrow: $slideWrap.find('.btn-next')
                    });
                }

                $w.show();
            } else {
                utils.error('widgetRecommendedIssues', true);
                $w.hide();
            }
        }
    };

    $.fn.widgetLink = function () {
        var $w = this,
			department = ($w.data('widgetCategory') || 'Politics').toLowerCase(),
			widgetHtml = '<div class="hd"><h4 class="subtit_comm">정치 관련 사이트 바로가기</h4></div><div class="bd"></div>',
			template = '<ul class="clearfx" data-bind="list"><li><a data-bind="link"><img data-bind="image"></a></li></ul>',
			linkInfo = {
			    politics: {
			        title: '정치',
			        list: [
						utils.linkService.getData('assembly'), utils.linkService.getData('president'), utils.linkService.getData('theminjoo'), utils.linkService.getData('saenuriparty'), utils.linkService.getData('npad'), utils.linkService.getData('bareun')
			        ]
			    },
			    money: [],
			    society: [],
			    world: [],
			    mm: {
			        title: 'Mr.밀리터리',
			        list: [
						utils.linkService.getData('mnd'), utils.linkService.getData('kida'), utils.linkService.getData('kinu'), utils.linkService.getData('csis'), utils.linkService.getData('globalsecurity'), utils.linkService.getData('38north')
			        ]
			    }
			},
			data = linkInfo[department],
			directives = {
			    title: {
			        text: function (params) {
			            return this.title + ' ' + params.value;
			        }
			    },
			    list: { link: utils.decorators.link, image: utils.decorators.image }
			};

        render();

        function render() {

            var html = '',
				data = [];

            try {
                data = linkInfo[department];
            } catch (e) {
            };

            if (data.list.length) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                switch (department) {
                    case 'mm':
                        widgetHtml = '<div class="hd"><strong class="subtit_comm">군사안보 관련 사이트 바로가기</strong></div><div class="bd"></div>';
                        break;
                    default:
                        break;
                }
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                utils.error('widgetLink', true);
                $w.hide();
            }
        }
    };

    // 데이블 임시코드
    $.fn.widgetHotClickDable = function () {
        var strHtml = "";
        strHtml += "<div id=\"dablewidget_Ql98m874\" data-widget_id=\"Ql98m874\">";
        strHtml += "    <script>";
        strHtml += "        (function(d,a,b,l,e,_) {";
        strHtml += "            if(d[b]&&d[b].q)return;d[b]=function(){(d[b].q=d[b].q||[]).push(arguments)};e=a.createElement(l);";
        strHtml += "            e.async=1;e.charset='utf-8';e.src='//static.dable.io/dist/plugin.min.js';";
        strHtml += "            _=a.getElementsByTagName(l)[0];_.parentNode.insertBefore(e,_);";
        strHtml += "        })(window,document,'dable','script');";
        strHtml += "        dable('setService', 'news.joins.com');";
        strHtml += "        dable('sendLogOnce');";
        strHtml += "        dable('renderWidget', 'dablewidget_Ql98m874');";
        strHtml += "    </script>";
        strHtml += "</div>";

        $(this).html(strHtml);
    };

    // 미주 중앙일보 핫클릭
    $.fn.widgetHotClickUSA = function () {
        var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        var $w = this,
			widgetHtml = '<dt>미주 중앙일보 핫클릭</dt>',
			template = '<dl data-bind="list"><dd><a data-bind="link" target="_blank"><span data-bind="title"></span></dd></dl>',
			directives = {
			    list: {
			        link: utils.decorators.link,
			        title: this.title
			    }
			};

        getApiData('/static/hotclickusa', render);

        function render(d) {

            var html = '',
				data = { list: [] };

            try {
                d.List.forEach(function (v, i) {
                    if (v.Title) {
                        data.list.push({
                            link: { href: v.Link },
                            title: String(v.Title).replace(/(<([^>]+)>)/ig, "")
                        });
                    }
                });
            } catch (e) {
                utils.log(e);
            };

            if (data.list.length) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                html = widgetHtml + html;
                $w.html(html);
                $w.show();
            } else {
                $w.hide();
            }

            // 핫클릭 Cloc
            $w.find('a').each(function () {
                $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|hotclickj'));
            });
        }
    };

    //부서별 sns
    $.fn.widgetDepartmentSns = function (obj) {

        /*
		<div class="fb-page"
		data-href="https://www.facebook.com/joinspolitics"
		data-width="300"
		data-height="70"
		data-small-header="true"
		data-adapt-container-width="true"
		data-hide-cover="false"
		data-show-facepile="false"
		data-show-posts="false"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/joinspolitics">
		<a href="https://www.facebook.com/joinspolitics">중앙일보 정치부</a></blockquote></div></div>
		*/
        var $w = this,
			defaultCategory = 'politics',
			category = obj.category ? obj.category.toLowerCase() : defaultCategory,
			SNS_URI = {
			    joongang: { text: '중앙일보 FB', link: 'https://www.facebook.com/joongang' },
			    politics: { text: '정치부', link: 'https://www.facebook.com/joinspolitics' },
			    money: { text: '경제부', link: 'https://www.facebook.com/joinsmoney' },
			    society: { text: '사회부', link: 'https://www.facebook.com/joinssociety' },
			    world: { text: '국제부', link: 'https://www.facebook.com/joonganginternational' },
			    sports: { text: '스포츠', link: 'https://www.facebook.com/joongangilbosports' },
			    culture: { text: '문화부', link: 'https://www.facebook.com/jmoonhwa' },
			    opinion: { text: '오피니언', link: 'https://www.facebook.com/pages/%EC%A4%91%EC%95%99%EC%9D%BC%EB%B3%B4-%EB%85%BC%EC%84%A4%EC%9C%84%EC%9B%90%EC%8B%A4/756556791101437?fref=nf' },
			    travel: { text: 'Week', link: 'https://www.facebook.com/weeknplus' },
			    retirement: { text: '반퇴시대', link: 'https://www.facebook.com/theore88' },
			    magazinem: { text: '매거진M', link: 'https://www.facebook.com/magazineM2017' },
			    ourhistory: { text: '아워히스토리', link: 'https://www.facebook.com/ourhistoryO/' },
			    sunday: { text: 'SUNDAY', link: 'https://www.facebook.com/joongangsunday' },
			    peoplemic: { text: '시민마이크', link: 'https://www.facebook.com/peoplemic' },
			    lifestyle: { text: '중앙일보 강남인류', link: 'https://www.facebook.com/itisyourstyle' }
			},
			widgetHtml = '<div class="hd"></div><div class="bd"></div>',
			snsData = SNS_URI[category] || SNS_URI[defaultCategory],
			link = snsData.link,
			text = snsData.text,
			html_ = '<div class="fb-page" style="height:0px;" data-href="' + link + '" data-height="70" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="false" data-show-posts="false">' +
				'<div class="fb-xfbml-parse-ignore"><blockquote cite="' + link + '"><a href="' + link + '">중앙일보 ' + text + '</a></blockquote></div>' +
				'</div>',
			html = '<div class="fb-page" style="height:70px;" data-href="' + link + '" data-height="70" data-small-header="true" data-hide-cover="true" data-adapt-container-width="true" data-show-facepile="false">' +
				//'<div class="fb-xfbml-parse-ignore"></div>' +
				'</div>';

        if (utils.browser && utils.browser.msie == true && parseInt(utils.browser.version, 10) <= 7) {
            //$w.browserNotice();
        } else {
            render();
        }

        function render() {

            //var html = $.renderTemplate({ data: {}, template: template, directives: directives });

            $w.html(widgetHtml).show().find('.bd').html(html);

            if (window.FB) {

                window.FB.init({
                    appId: '1011513095546498',
                    version: 'v2.4'
                });

                window.FB.XFBML.parse($w[0]);
            } else {
                (function (d, s, id) {
                    var js,
						fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.4&appId=1011513095546498";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }
        }
    };

    // PhotoVideo
    $.fn.widgetPhotoVideo = function () {
        var $w = this,
			widgetHtml = '<div class="hd"><h3 class="subtit_comm">PHOTO &amp; VIDEO</h3></div><div class="bd"></div><div class="ft"><a href="#none" class="add"><span class="hide">PHOTO &amp; VIDEO</span> 더보기<span class="icon"></span></a></div>',
			template = '<ul data-bind="list" class="clearfx">' +
				'<li>' +
				'<span class="thumb" data-bind="thumb"><a data-bind="link"><img data-bind="image" onerror="utils.imageErrorHandler(this)"></a></span>' +
				'<strong data-bind="title"><a data-bind="link"></a></strong>' +
				'</li>' +
				'</ul>',
			directives = {
			    list: {
			        title: { link: utils.decorators.link },
			        thumb: {
			            image: utils.decorators.image,
			            link: utils.decorators.link,
			            html: function (params) {
			                if (this.thumb.iconClass) {
			                    $(params.element).find('a').append('<span class="' + this.thumb.iconClass + '">동영상</span>');
			                }
			            }
			        }
			    }
			};

        getApiData('/static/homephotoandvideos', render);

        function render(d) {

            var html = '', data = { cls: 'list', list: [] };

            try {
                d.List.forEach(function (v, i) {
                    if (i < 3) {
                        data.list.push({
                            title: { link: { href: v.Link, html: v.Title } },
                            thumb: { link: { href: v.Link }, image: { src: v.Thumbnail, alt: v.Title }, iconClass: v.InfomationText, text: v.Title }
                        });
                    }
                });
            } catch (e) {
                utils.log(e);
            };

            //utils.log(data);

            if (data.list.length) {
                html = $.renderTemplate({ data: data, template: template, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
                //utils.resetArticleSubWidget && utils.resetArticleSubWidget();
                $('.thumb a', $w).each(function () {
                    var $link = $(this);
                    var href = $link.attr('href') || '';
                    var pathname = this.pathname;
                    var arrPathName = pathname.split('/');
                    var id = arrPathName[arrPathName.length - 1];

                    if (isPhoto(href)) {

                        //#화보 레이어
                        $link.data({ viewer: 'photo', id: id });
                        $link.imageViewer();
                    }
                    function isPhoto(href) {
                        return href.indexOf('pic/photoviewer') > -1;
                    }
                });
            } else {
                utils.error('widgetPhotoVideo', true);
                $w.hide();
            }

            // 포토비디오 Cloc
            $w.find('a').each(function () {
                $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|photovod'));
            });
        }
    };

    // widgetSpecialLink
    // @param options
    $.fn.widgetSpecialLink = function (options) {

        var $t = this;

        $t.find('.link1').loadAd({ type: 'special_link1' });
        $t.find('.link2').loadAd({ type: 'special_link2' });
        $t.find('.rt').loadAd({ type: 'da_250_1' });
    };

	// 추천 기사
    $.fn.widgetRecommendedArticle = function () {
    	$(this).load(apiPath + "/pagecall/?u=" + utils.config('webPcPath') + "/Widget/RecommendedArticles?from=article").show();
    };

    $.fn.widgetAppendItem = function () {
    };

    // 주요 포털 실시간 검색어
    $.fn.widgetPortalSearchKeyword = function () {

        //utils.log('## widgetPortalSearchKeyword');

        var $w = this,
			widgetData = $w.data(),
			widgetHtml = '<div class="hd"><h4 class="subtit_comm">주요 포털 실시간 검색어</h4></div><div class="bd"></div>',
			template = '<ul data-bind="list" class="list_portal">' +
				'<li>' +
				'<span class="thumb" data-bind="thumb"><a data-bind="link"><img data-bind="image"></a></span>' +
				'<span class="text_wrap"><span class="text_center">' +
				'<strong class="mg" data-bind="title"><a data-bind="link"></a></strong>' + //<span class="icon_hot"><span class="hide">HOT</span></span>
				'<span class="lead" data-bind="lead"><a data-bind="link"></a></span>' +
				'</span><span class="valign_fix"></span></span>' +
				'</li>' +
				'</ul>',
			directives = {
			    list: {
			        thumb: {
			            link: utils.decorators.link,
			            image: utils.decorators.image,
			            html: function (params) {
			                if (!this.thumb.useThumbnail) {
			                    $(params.element).remove();
			                }
			            }
			        },
			        title: { link: utils.decorators.link },
			        lead: { link: utils.decorators.link }
			    }
			};

        getApiData('/static/portalrealtimesearchwords', render);

        function render(d) {

            var html = '', data = {
                list: []
            };

            try {
                d.List.forEach(function (v, i) {
                    if (i < 10) {
                        var link = utils.getUrlFormat(URL_NAMES.article, v.Id);
                        data.list.push({
                            thumb: {
                                link: { href: link, html: v.Title },
                                image: { src: utils.getIrPath(utils.getPdsFullPath(v.Thumbnail), 50, 50), alt: v.SubTitle },
                                useThumbnail: v.Thumbnail ? true : false
                            },
                            title: { link: { href: link, html: v.Title } },
                            lead: { link: { href: link, html: v.SubTitle } }
                        });
                    }
                });
            } catch (e) { utils.log(e); };

            if (data.list.length) {
                html = $.renderTemplate({ data: data, template: template, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
                utils.resetArticleSubWidget && utils.resetArticleSubWidget();
            } else {
                utils.error('widgetPortalSearchKeyword', true);
                $w.hide();
            }

            // cloc 적용.
            var clocPageType = utils.config('pageType'),
				cloc = '';

            if (clocPageType == 'Home' || clocPageType == 'Article') {
                cloc = 'joongang|' + clocPageType.toLowerCase() + '|portalcheck';
            } else {
                cloc = 'joongang|section|portalcheck';
            }

            $w.find('a').each(function () {
                $(this).attr('href', utils.getClocUrl($(this).attr('href'), cloc));
            });
        }
    };

    // SNS 기사
    $.fn.widgetSnsArticle = function () {

        //utils.log('## widgetSnsArticle');

        var $w = this,
			widgetData = $w.data(),
			widgetHtml = '<div class="hd"><h4 class="subtit_comm">SNS 기사</h4></div><div class="bd"></div>',
			template = '<ul data-bind="list" class="list_sns">' +
				'<li>' +
				'<span class="thumb" data-bind="thumb"><a data-bind="link"><img data-bind="image"></a></span>' +
				'<span class="text_wrap"><span class="text_center"><strong class="mg"><a data-bind="link"></a></strong></span><span class="valign_fix"></span></span>' +
				'</li>' +
				'</ul>',
			directives = {
			    list: {
			        link: utils.decorators.link,
			        image: utils.decorators.image,
			        thumb: {
			            html: function (params) {
			                if (!this.image.src) {
			                    $(params.element).remove();
			                }
			            }
			        }
			    }
			};

        getApiData('/article/snsarticles', render);

        function render(d) {

            var topHtml = '',
				html = '',
				data = { list: [] };

            try {
                d.forEach(function (v, i) {
                    if (i < 10) {
                        data.list.push({
                            link: { href: utils.getUrlFormat(URL_NAMES.article, v.TotalId), html: v.Title },
                            image: { src: utils.getIrPath(utils.getPdsFullPath(v.Thumbnail), 50, 50), alt: v.Title }
                        });
                    }
                });
            } catch (e) {
                utils.log(e);
            };

            //utils.log(data);

            if (data.list.length) {
                html = $.renderTemplate({ data: data, template: template, directives: directives });
                renderWidgetBody($w, widgetHtml, topHtml + html);
                $w.show();
                utils.resetArticleSubWidget && utils.resetArticleSubWidget();
            } else {
                utils.error('widgetSnsArticle', true);
                $w.hide();
            }

            // cloc 적용.
            var clocPageType = utils.config('pageType'),
				cloc = '';

            if (clocPageType == 'Home' || clocPageType == 'Article') {
                cloc = 'joongang|' + clocPageType.toLowerCase() + '|snscheck';
            } else {
                cloc = 'joongang|section|snscheck';
            }

            $w.find('a').each(function () {
                $(this).attr('href', utils.getClocUrl($(this).attr('href'), cloc));
            });
        }
    };

    var regTitleFilter = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    // 주요 뉴스
    $.fn.widgetMajorArticle = function () {
        //return false;
        //utils.log('## widgetMajorArticle');

        var $w = this,
			widgetData = $w.data(),
			apiFormat = '/static/wide/majorarticles',
			widgetHtml = '<div class="hd"><h4 class="subtit_comm">주요뉴스</h4><p>중앙일보 주요기사를 읽어보세요</p></div><div class="bd"><ul data-bind="list"></ul></div>',
			template = '<ul data-bind="list">' +
				'<li>' +
				'<span class="thumb"><a data-bind="link"><img data-bind="image" onerror="utils.imageErrorHandler(this)"></a></span>' +
				'<strong class="mg"><a data-bind="link"></a></strong>' +
				'</li>' +
				'</ul>',
			directives = {
			    list: {
			        link: utils.decorators.link,
			        image: utils.decorators.image,
			        thumb: {
			            html: function (params) {
			                if (!this.image.src) {
			                    $(params.element).remove();
			                }
			            }
			        }
			    }
			};

        getApiData(apiFormat, render);

        function render(d) {

            //utils.log('----------------widgetMajorArticle');
            //utils.log(d);

            var topHtml = '',
				html = '',
				data = { list: [] },
				pathname = location.pathname.toLowerCase(),
				clocName = '';

            try {
                d.List.forEach(function (v, i) {
                    var alt = v.Title.replace(regTitleFilter, '');
                    if (i < 10) {
                        data.list.push({ type: v.Type, link: { href: $.trim(v.Link), html: v.Title }, image: { src: utils.getPdsFullPath(v.Thumbnail), alt: alt } });
                    }
                });
            } catch (e) {
                utils.log(e);
            };

            if (data.list.length) {
                //html = $.renderTemplate({data: data, template: template, directives: directives});
                //renderWidgetBody($w, widgetHtml, topHtml + html);

                $w.html(widgetHtml).show();
                data.list.forEach(function (v, i) {
                    appendItem(v, i);
                });
                $w.show();
                utils.resetArticleSubWidget && utils.resetArticleSubWidget();
            } else {
                utils.error('widgetMajorArticle', true);
                $w.hide();
            }

            function appendItem(item, i) {

                var html = '<li>';
                if (item.image.src) {
                    html += '<span class="thumb"><a href="' + item.link.href + '"><img src="' + item.image.src + '" alt="' + item.image.alt + '" onerror="utils.imageErrorHandler(this)"></a></span>';
                }
                html += '<strong class="mg"><a href="' + item.link.href + '"></a></strong>';
                html += '</li>';
                var $html = $(html);
                $html.find('strong a').html(item.link.html);
                $w.find('ul').append($html);
            }

            // 더보기 주요뉴스 Cloc
            if (pathname == '/') {
                clocName = 'joongang|home|morehomenews';
            } else if (pathname.indexOf('article') > -1) {
                clocName = 'joongang|article|morehomenews';
            } else {
                clocName = 'joongang|section|morehomenews';
            }
            $w.find('a').each(function () {
                $(this).attr('href', utils.getClocUrl($(this).attr('href'), clocName));
            });
        }
    };

    // 지면보다 빠른 뉴스
    //$.fn.widgetFastNews = function () {

    //    //utils.log('## widgetFastNews');

    //    var $w = this,
	//		widgetData = $w.data(),
	//		//widgetHtml =
	//		template = '' +
	//		'<div class="hd"><strong class="subtit_comm">지면보다 빠른 뉴스</strong><p>디지털에서만 만날 수 있는 중앙일보 뉴스</p></div>' +
	//		'<div class="bd" data-bind="group">' +
	//			'<div class="digital_news">' +
	//				'<em class="time" data-bind="time"></em>' +
	//			'</div>' +
	//		'</div>',
	//		listTemplate = '' +
	//		'<ul data-bind="list">' +
	//			'<li>' +
	//				'<span class="icon"></span>' +
	//				'<strong class="mg"><a data-bind="link"></a></strong>' +
	//				'<span class="thumb"><a data-bind="link"><img data-bind="image"></a></span>' +
	//			'</li>' +
	//		'</ul>',
	//		directives = {
	//		    list: {
	//		        link: utils.decorators.link,
	//		        image: utils.decorators.image,
	//		        thumb: {
	//		            html: function (params) {
	//		                if (!this.image.src) {
	//		                    $(params.element).remove();
	//		                }
	//		            }
	//		        }
	//		    }
	//		};

    //    getApiData('/article/fastarticles', render);

    //    function render(d) {

    //        var html = '',
	//			data = { times: [], list: [] },
	//			pathname = location.pathname.toLowerCase(),
	//			clocName = '',
	//			serviceDate = '';

    //        try {
    //            d.forEach(function (v, i) {
    //                serviceDate = v.RegistedDateTime;

    //                if (serviceDate.indexOf('.') > -1) {
    //                    serviceDate = serviceDate.substr(0, serviceDate.indexOf('.'));
    //                }
    //                serviceDate = serviceDate.toDateISO8061().format('HH:00');

    //                if (!data.times.filter(function (v) {
	//					return v.time == serviceDate;
    //                }).length) {
    //                    data.times.push({ time: serviceDate });
    //                }

    //                data.list.push({
    //                    time: serviceDate,
    //                    link: { href: utils.getUrlFormat(URL_NAMES.article, v.TotalId), html: v.Title },
    //                    image: { src: utils.getIrPath(utils.getPdsFullPath(v.Thumbnail.replace('.tn_120.jpg', '')), 170, 126, '.tn_350.jpg'), alt: v.Title }
    //                });
    //            });
    //        } catch (e) {
    //            utils.log(e);
    //        };

    //        if (data.times.length) {

    //            html = $.renderTemplate({ data: { group: data.times }, template: template });

    //            //utils.log(html);
    //            $w.html(html).show().find('[data-bind="time"]').each(function () {
    //                var $group = $(this),
	//					time = $group.text(),
	//					listData = data.list.filter(function (v) {
	//					    return v.time == time;
	//					}),
	//					listHtml = html = $.renderTemplate({ data: { list: listData }, template: listTemplate, directives: directives });

    //                $group.parent().append(listHtml);
    //            });

    //        } else {
    //            utils.error('widgetFastNews', true);
    //            $w.hide();
    //        }

    //        // 지면보다 빠른뉴스 Cloc
    //        if (pathname == '/') {
    //            clocName = 'joongang|home|moredigitalfirst';
    //        } else if (pathname.indexOf('article') > -1) {
    //            clocName = 'joongang|article|moredigitalfirst';
    //        }
    //        else {
    //            clocName = 'joongang|section|moredigitalfirst';
    //        }
    //        $w.find('a').each(function () {
    //            $(this).attr('href', utils.getClocUrl($(this).attr('href'), clocName));
    //        });
    //    }
    //};

	// 지면보다 빠른 뉴스
    $.fn.widgetFastNews = function () {
    	var clocName = "";
    	var pathname = location.pathname.toLowerCase();

    	if (pathname == '/') {
    		clocName = 'home';
    	} else if (pathname.indexOf('article') > -1) {
    		clocName = 'article';
    	} else {
    		clocName = 'section';
    	}
    	var apiUrl = apiPath + "/pagecall/?u=" + utils.config('webPcPath') + encodeURIComponent("/Widget/FastNews?from=)" + clocName);
    	$(this).load(apiUrl).show();
    };

	// 와이드 영역 트렌드 뉴스
    $.fn.widgetTrendArticle = function () {
    	// 실시간 추천 뉴스 Cloc
    	var clocName = "";
    	var pathname = location.pathname.toLowerCase();

    	if (pathname == '/') {
    		clocName = 'home';
    	} else if (pathname.indexOf('article') > -1) {
    		clocName = 'article';
    	} else {
    		clocName = 'section';
    	}
    	var apiUrl = apiPath + "/pagecall/?u=" + utils.config('webPcPath') + encodeURIComponent("/Widget/TrendArticle?from=" + clocName + "&sort=attention");
    	$(this).load(apiUrl).show();
    };

	//포토 이슈
    $.fn.widgetPhotoIssues = function () {
    	var $w = this;
    	$w.find('.current_page').text('1');
    	$w.find('.total_page').text($w.data("count"));
    	var $slideWrap = $('.slide_list_wrap', $w),
			$thumbItems = $('div.thumb_list li', $w);
    	$slideWrap.find('.slide').eq(0).addClass('active');
    	$thumbItems.find('.slide').eq(0).addClass('active');

    	$slideWrap.find('.slide_list').slideMotion({
    		infinite: true,
    		slidesToShow: 1,
    		slidesToScroll: 1,
    		swipe: false,
    		thumbnails: $thumbItems,
    		prevArrow: $slideWrap.find('.btn-prev'),
    		nextArrow: $slideWrap.find('.btn-next'),
    		beforeChange: function (event, slick, currentIndex, nextIndex) {
    			$thumbItems.eq(nextIndex).addClass('active').siblings().removeClass('active');
    			$w.find('.current_page').text(nextIndex + 1);
    		}
    	});
    	$w.show();
    };

    // 많이 본 기사
    $.fn.widgetHotArticles = function () {
        $('#widget_favorite_articlesAD').loadAd({ type: 'favorite_ad' }).show();

        //utils.log('---------------------widgetHotArticles start');
        //많이 본 기사 하단광고
        var $w = this,
			pageType = utils.config('pageType'),
			apiFormat = '/static/mostviewedarticles/{KEY}',
			categoryKey = $w.data('widgetCategory') || '',
			title = (categoryKey.toLowerCase() == 'jplus' ? '많이 본 J플러스' : '많이 본 기사'),
			widgetHtml = '<div class="hd"><h3 class="subtit_comm">' + title + '</h3></div><div class="bd"></div>',
			template = '<ul data-bind="list"><li class="top" data-bind="item"><em class="mg" data-bind="position"></em> <strong><a data-bind="link"></a></strong></li></ul>',
			directives = {
			    list: {
			        link: utils.decorators.link,
			        image: utils.decorators.image,
			        item: {
			            'class': function (obj) {
			                return obj.index < 3 ? 'top' : '';
			            }
			        }
			    }
			};

        if (pageType === PAGE_TYPE.article) {
            var sectionKey = utils.menu.getPageMenuKey().split(',')[0].toLowerCase();
            categoryKey = sectionKey;
            
            if (categoryKey != null && categoryKey == 'worldcup2018') categoryKey = 'sports';

            // 종합의 경우 categoryKey를 셋팅하지 않는다. api에서 categoryKey가 없을 경우 종합으로 데이터를 내려줌.
            switch (categoryKey) {
                case 'university':
                case 'cartoon':
                case 'ourhistory':
                case 'resetkorea':
            	case 'nk':
            	case 'brandnews':
                    categoryKey = '';
                    break;
            }
        }

        $w.hide();
        getApiData(apiFormat.replace('{KEY}', categoryKey), render);

        function render(d) {

            //utils.log('---------------------widgetHotArticles 1');
            var html = '',
				data = { list: [] };

            try {
                d.List.forEach(function (v, i) {
                    data.list.push({ link: { href: utils.getUrlFormat(URL_NAMES.article, v.Id), html: v.Title }, position: (i + 1) });
                });
            } catch (e) {
                //utils.log('widgetHotArticles');
                utils.log(e);
            };

            //utils.log(data);

            if (data.list.length) {

                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBodyPrepend($w, widgetHtml, html);
                $w.show();
                utils.resetArticleSubWidget && utils.resetArticleSubWidget();
            } else {
                $w.hide();
            }

            // 많이 본 기사 Cloc - 미확인
            $w.find('a').each(function () {
                var pageType = utils.config('pageType') || '';
                pageType = pageType.toLowerCase();
                $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|' + pageType + '|clickraking'));
            });
        }
    };

    // 많이 본 동영상 ( general, opinion )
    $.fn.widgetHotVideos = function () {

        var $w = this,
			categoryKey = $w.data('widgetCategory') || '',
			apiUrl = '/static/mostviewedvideos',
			widgetHtml = '<div class="hd"><h3 class="subtit_comm">많이 본 동영상</h3></div><div class="bd"></div>',
			template = '<ul data-bind="list">' +
				'<li>' +
				'<span class="thumb"><a data-bind="link"><img data-bind="image" onerror="utils.imageErrorHandler(this)"><span class="icon_video"></span></a></span>' +
				'<strong><a data-bind="link"></a></strong>' +
				//'<span class="view_comment"><span class="view">조회수 <em data-bind="viewCount"></em></span> | <span class="comment">댓글 <em data-bind="commentCount"></em></span></span>' +
				'</li>' +
				'<ul>',
			directives = {
			    list: { link: utils.decorators.link, image: utils.decorators.image }
			};

        getApiData(apiUrl, render);

        function render(d) {

            var html = '',
				data = { list: [] };

            try {
                d.List.forEach(function (v, i) {
                    var atticleLink = utils.getUrlFormat(URL_NAMES.article, v.Id);
                    var image = utils.getPdsFullPath(v.Thumbnail);
                    //utils.log('## atticleLink : ' +atticleLink);
                    data.list.push({
                        link: { href: atticleLink, html: v.Title },
                        image: { src: image },
                        viewCount: v.ClickCount,
                        commentCount: v.ReplyCount
                    });
                });
            } catch (e) {
                utils.log(e);
            };

            if (data.list.length) {

                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                $w.hide();
            }
        }
    };

    // 논설위원이 간다 (최신기사3건)
    $.fn.widgetOpinionCast = function () {
        var $w = this,
			apiUrl = '',
			categoryKey = $w.data('widgetCategory') || '',
			listLink = utils.config('webPcPath') + '/issue/11027',
			html = '';
		var apiUri = utils.config('apiPath') + "/pagecall/?u=" + utils.config('staticPath') + "/scripts/data/opinion/xml/opinion_go_editorialist.json";
		$.ajax({
			type: "GET",
			dataType: 'json',
			url: apiUri,
			success: function (d) {
				if (d.length > 0) {
					try {
						html = '<div class="hd"><h3 class="subtit_comm"><a href="' + listLink + '">논설위원이 간다</a></h3></div>';
						html += '<div class="bd">';
						html += '<ul>';
						d.forEach(function (v) {
						var articleLink = utils.getUrlFormat(URL_NAMES.article, v.Id);
						var image = utils.getPdsFullPath(v.Thumbnail);
						var serviceDate = v.RegistedDateTime;
						if (serviceDate.indexOf('.') > -1) {
							serviceDate = serviceDate.substr(0, serviceDate.indexOf('.'));
						}
						serviceDate = serviceDate.toDateISO8061().format('yyyy.MM.dd');
						html += '<li>';
						if (image !== '' || image !== undefined) {
							html += '<span class="thumb"><a href="' + articleLink + '"><img onerror="utils.imageErrorHandler(this)" src="' + utils.getIrPath(utils.getPdsFullPath(image), 100, 70) + '"></a></span>';
						}
						html += '<strong><a data-bind="link" href="' + articleLink + '">' + v.Title + '</a></strong>';
						html += '<span class="date">' + serviceDate + '</span>';
						html += '</li>';
						});
						html += '</ul>';
						html += '</div>';
					} catch (e) {
						utils.log(e);
					};
					$w.html(html);
					$w.show();
				} else {
					$w.hide();
				}
			}
		})
    };

    // 댓글 많은 기사
    $.fn.widgetHotArticlesOrderByReplyCount = function () {
        var $w = this,
			widgetHtml = '<div class="hd"><h3 class="subtit_comm">댓글 많은 기사</h3></div><div class="bd"></div>',
			template = '<ul data-bind="list"><li class="top" data-bind="item"><em class="mg" data-bind="position"></em> <strong><a data-bind="link"></a></strong></li></ul>',
			directives = {
			    list: {
			        link: utils.decorators.link,
			        image: utils.decorators.image,
			        item: {
			            'class': function (obj) {
			                return obj.index < 3 ? 'top' : '';
			            }
			        }
			    }
			};

        getApiData('/static/manycommentedarticles', render);

        function render(d) {

            var html = '',
				data = { list: [] };

            try {
                d.List.forEach(function (v, i) {
                    var link = utils.getUrlFormat(URL_NAMES.article, v.Id);
                    data.list.push({ link: { href: link, html: v.Title }, position: (i + 1) });
                });
            } catch (e) {
                utils.log(e);
            };

            if (data.list.length) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                $w.hide();
            }

            // 댓글 많은 기사 Cloc - 미확인
            $w.find('a').each(function () {
                $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|comment'));
            });
        }
    };

    // 20180131 삭제예정
    // 인기 J플러스
    $.fn.widgetHotJPlus = function (options) {

        var $w = this,
			widgetHtml = '<div class="hd"><h4 class="subtit_comm"><a href="' + utils.config('jplusPath') + '">인기 J플러스</a></h4></div><div class="bd"></div><div class="ft"><a href="' + utils.config('jplusPath') + '" class="add"><span class="hide">인기 J플러스</span> 더보기<span class="icon"></span></a></div>',
			template = '<ul data-bind="list">' +
				'<li>' +
				'<span class="thumb"><a data-bind="link"><img data-bind="image"><span class="frame"></span></a></span>' +
				'<strong><a data-bind="link"></a></strong>' +
				'<em><span data-bind="name"></span> | <span data-bind="description"></span></em>' +
				'</li>' +
				'</ul>',
			directives = { list: { link: utils.decorators.link, image: utils.decorators.image } };

        getApiData('/static/homejplusarticles', render);

        function render(d) {

            var html = '',
				data = { list: [] };

            try {
                d.List.forEach(function (v) {
                    var link = utils.getUrlFormat(URL_NAMES.article, v.Id);
                    var reporter = v.Reporters[0];
                    
                    data.list.push({ link: { href: $.trim(link), text: v.Title }, image: { src: utils.getIrPath(utils.getPdsFullPath(reporter.Profile), 37, 37) }, name: reporter.Name, description: reporter.Description });
                });
            } catch (e) { utils.log(e); };

            if (data.list.length) {

                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                $w.hide();
            }

            // 인기 J 플러스
            $w.find('a').each(function () {
                $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|jplus'));
            });
        }
    };

    // 20180131
    // 스타기자
    $.fn.widgetPrismStarReporter = function (options) {
        var $w = this,
            widgetHtml = '<div class="hd"><h3 class="subtit_comm">스타기자</h3></div><div class="bd"></div>',
            template = '<ul data-bind="list">' +
                '	<li>' +
                '		<span class="thumb"><a data-bind="link"><img data-bind="image"><span class="frame"></span></a></span>' +
                '       <span class="text_wrap">' +
                '           <span class="text_center">' +
                '		        <strong><a data-bind="link"></a></strong>' +
                '           </span>' +
                '           <span class="valign_fix"></span>' +
                '       </span>' +
                '	</li>' +
                '</ul>',
			directives = { list: { link: utils.decorators.link, image: utils.decorators.image } };

        getApiData('/IssueSeries/LatestList/?exceptionID=0&exceptionSeqNo=1013&getCnt=3', render);

        function render(d) {
            var html = '',
				data = { list: [] };
            try {
                d.List.forEach(function (v) {
                    var link = utils.getUrlFormat(URL_NAMES.article, v.totalID);
                    var title = v.articleTitle.replace(/\[.+?\]\s*/ig, "").replace(/&#91;.+?&#93;\s*/ig, "");
                    data.list.push({ link: { href: $.trim(link), text: title }, image: { src: utils.getIrPath(utils.getPdsFullPath(v.repPhoto), 37, 37) } });
                });
            } catch (e) { utils.log(e); };

            if (data.list.length) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                $w.hide();
            }

            $w.find('a').each(function () {
                var pageType = utils.config('pageType') || '';
                pageType = pageType.toLowerCase();
                if ($(this).attr('href') != "#" && $(this).attr('href').length > 0) {
                    $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|' + pageType + '|starreporter'));
                }
            });
        }
    };

    // 내부 홍보 베너
    // @param options
    $.fn.widgetImcBanner = function (options) {
        var $w = this,
			template = '<a data-bind="link"><img data-bind="image" style="vertical-align:top;"><span class="mask"></span></a>',
			directives = {
			    link: utils.decorators.link,
			    image: utils.decorators.image
			};

        getApiData('/static/imcbanners', render);

        function render(d) {

            var html = '',
				data = {},
				item = {},
				displayIndex = 0;

            try {
                displayIndex = utils.getRandomNumber(0, d.List.length - 1);
                item = d.List[displayIndex];
                data = { link: { href: item.Link, title: item.Title }, image: { src: item.Image } };
            } catch (e) {
                utils.log(e);
            };

            if (data.link && data.link.href) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                $w.html(html).show();
            } else {
                $w.hide();
            }
        }

        return this;
    };

    // 관련키워드
    $.fn.widgetRelatedKeyword = function () {

        var $w = this,
			widgetHtml = '<div class="bd"></div>',
			template = '<ul data-bind="list" class="clearfx">' +
				' <li data-bind="item">' +
				'<a data-bind="link"></a> ' +
				'</li>' +
				'</ul>',
			directives = {
			    list: {
			        link: utils.decorators.link,
			        item: {
			            'class': function () {
			                return this.cls;
			            }
			        }
			    }
			},
			reporterId = utils.getReporterId(),
			reporterName = $('#reporterName').val() || '';

        if (!reporterId) {
            return;
        }

        getApiData('/reporter/' + reporterId + '/keywords', render);

        function render(d) {

            //utils.log('----------------- widgetRelatedKeyword');
            //utils.log(d);

            var html = '',
				data = { list: [] };

            try {
                d.keywords.forEach(function (v) {
                    var link = v.IssueId ? utils.getUrlFormat(URL_NAMES.issue, v.IssueId) : utils.getUrlFormat(URL_NAMES.search, v.Word);
                    data.list.push({ link: { href: link, text: '#' + v.Word }, cls: (v.IssueId ? 'issue' : '') });
                });
            } catch (e) {
                utils.log(e);
            };

            //utils.log(data);

            if (data.list.length) {

                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);

                //var $subtit = $w.find('.subtit_comm');

                //$subtit.html('<span>#' + reporterName + ' </span>기자의 관련 태그');

                $w.show();
            } else {
                $w.hide();
            }
        }
    };

    // 핫이슈
    // @param options
    $.fn.widgetHotIssues = function (options) {

        //utils.log('## widgetHotIssues');
        var $w = this,
			widgetHtml = '<div class="hd"><h4 class="subtit_comm">핫이슈</h4></div><div class="bd"></div>',
			template = '' +
			'<ul data-bind="list" class="clearfx">' +
				'<li>' +
					'<em class="hash_tag" data-bind="tag"><a data-bind="link"></a></em>' +
					'<strong class="headline mg" data-bind="article"><a data-bind="link"></a></strong>' +
				'</li>' +
			'</ul>',
			directives = {
			    list: {
			        article: { link: utils.decorators.link },
			        tag: { link: utils.decorators.link }
			    }
			};

        getApiData('/static/homeissues', render);

        function render(d) {

            var html = '', data = { list: [] };

            try {
                d.List.forEach(function (v) {

                    var article = v.Articles[0];
                    var regExp = /&#91;.*&#93;/gi;
                    var title = article.Title.replace(regExp, "");
                    data.list.push({
                        article: { link: { href: utils.getUrlFormat(URL_NAMES.article, article.Id), html: title } },
                        tag: { link: { href: utils.getUrlFormat(URL_NAMES.issue, v.Id), html: '#' + v.Title } }
                    });
                });
            } catch (e) { utils.log(e); };

            //utils.log(data);

            if (data.list.length) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                $w.hide();
            }

            // 핫이슈 Cloc - 미확인
            $w.find('a').each(function () {
                $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|issue'));
            });

            var $widget_hot_issue = $('#widget_hot_issue');

            if ($widget_hot_issue.length > 0) {
                $widget_hot_issue.find('li').each(function () {
                    var $item = $(this);
                    $item.addClass('banner_color0' + utils.getRandomNumber(1, 4, 'widgethotissue'));
                });
            }
        }
    };
    // 연관 키워드 (검색)
    // @param options relatedKeyword
    $.fn.widgetRelatedKeywordForSearch = function (options) {
        /*
		[파라미터]
		keyword (검색어, 필수),
		num_relation_keyword (조회할 연관 키워드 개수 0~100, 필수),
		delimiter (구분자, 필수),
		server_id (서버 아이디 - server01 고정값, 필수),
		coll_id (컬렉션명 - joins_data 고정값, 필수),
		callback (callback 함수명 - json 일 때만, 선택),
		encoding (요청 URL encoding 방식 - cp939, utf8, euckr, 필수),
		format (포멧 - xml 고정값, 필수)
		*/
        var $w = this,
			keyword = $('#searchKeyword').val() || '',
			apiUri = utils.config('searchEnginePath') + '/jsonp_trans.jsp?',
			//params = { server_id: 'server01', coll_id: 'joins_data', delimiter: '|', encoding: 'utf8', format: 'json', num_relation_keyword: 10, keyword: keyword },
			params = { type: 'relation', keyword: keyword, num_relation_keyword: 10, server_id: 'server01', coll_id: 'joins_data', delimiter: ',', encoding: 'utf8' },
			widgetHtml = '<div class="hd"><h3 class="subtit_comm">연관 키워드</h3></div><div class="bd"></div>',
			template = '<ul data-bind="list"><li><a data-bind="link"></a></li></ul>',
			directives = { list: { link: utils.decorators.link } };

        //utils.log(apiUri + $.param(params));
        getApiData(apiUri + $.param(params), render);

        function render(d) {

            var html = '',
				data = { list: [] },
				relationKeywords = [];

            try {
                relationKeywords = d.Response[0].RelationKeyword.split(',');
                relationKeywords.forEach(function (v, i) {
                    data.list.push({ link: { href: utils.getUrlFormat(URL_NAMES.search, v), html: v } });
                });
            } catch (e) {
            };

            if (data.list.length > 1) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                $w.hide();
            }
        }
    };

    // 인기 검색어 (검색)
    // @param options
    $.fn.widgetPopularKeywordForSearch = function (options) {
        /*
		[파라미터]
		target (타겟 설정 - popword 고정),
		range (검색 기간 범위 - D : 일간, W : 주간, M : 월간),
		collection (전체컬렉션: _ALL_ , 통합검새 : total_search),
		datatype (데이터 타입 - xml / json)
		*/
        var $w = this,
			apiUri = utils.config('searchEnginePath') + '/jsonp_trans.jsp?',
			keyword = $('#search_keyword').val() || '',
			params = { target: 'popword', range: 'D', collection: '_ALL_', datatype: 'json' },
			widgetHtml = '<div class="hd"><h3 class="subtit_comm">인기검색어</h3></div><div class="bd"></div>',
			template = '<ul data-bind="list"><li data-bind="top"><em class="mg" data-bind="position"></em> <a data-bind="link"></a></li></ul>',
			directives = {
			    list: {
			        link: utils.decorators.link,
			        position: {
			            text: function (params) {
			                return params.index + 1;
			            }
			        },
			        top: {
			            'class': function (params) {
			                return params.index < 1 ? 'top' : '';
			            }
			        }
			    }
			};

        getApiData(apiUri + $.param(params), render);

        function render(d) {

            var html = '',
				data = { list: [] },
				relationKeywords = [];

            try {
                d.Data.Query.forEach(function (v, i) {
                    data.list.push({ link: { href: utils.getUrlFormat(URL_NAMES.search, v.content), html: v.content } });
                });
            } catch (e) {
            };

            if (data.list.length) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                $w.hide();
            }
            //검색저장
            $w.find('a').on('click', function () {
                var keyword = $(this).text();

                if (utils.saveSearchHistory !== undefined) {
                    utils.saveSearchHistory(keyword);
                }
            });
        }
    };

    // 관련기사
    // @param options
    $.fn.relationArticles = function (options) {
        /*
		[파라미터]
		uid (기사아이디 - 필수),
		query(검색어 - 선택, 하이라이팅이 필요한 경우)
		*/
        var $t = this,
			apiUri = utils.config('searchEnginePath') + '/dup_search_jsonp.jsp?',
			keyword = $('#search_keyword').val() || '',
			params = { uid: '', query: '' },
			template = '<div class="related_article"><ul><li data-bind="list">' +
				'<span class="icon"></span>' +
				'<strong class="headline"><a data-bind="link" target="_blank"></a></strong> ' +
				'<span class="byline"><em data-bind="source"></em> | <em data-bind="datetime"></em></span>' +
				'</li></ul></div>',
			directives = {
			    list: {
			        link: utils.decorators.link,
			        source: {
			            text: function () {
			                utils.log(this);
			                return this.source;
			            }
			        },
			        datetime: {
			            text: function () {
			                utils.log(this);
			                return this.datetime;
			            }
			        }
			    }
			};

        $t.on('click', function () {
            var $btn = $(this),
				DATAS = { loading: 'loading', loaded: 'loaded', open: 'open' },
				totalId = $btn.data('totalId');

            params = {
                uid: totalId,
                query: keyword
            };

            if ($btn.data(DATAS.loading)) {
                return false;
            }
            if ($btn.data(DATAS.loaded)) {
                $btn.next().show();
            } else {
                $btn.data(DATAS.loading, true);
                getApiData(apiUri + $.param(params), function (d) {
                    var html = '',
						data = { list: [] },
						relationKeywords = [];

                    try {
                        d.DuplicateDocumentResult.Collection[0].DocumentSet.Document.forEach(function (v, i) {
                            data.list.push({
                                link: {
                                    href: utils.getUrlFormat(URL_NAMES.article, v.Field.DOCID),
                                    text: v.Field.ART_TITLE
                                },
                                source: v.Field.SOURCE_NAME,
                                datetime: v.Field.ART_CRE_TIME
                            });
                        });
                    } catch (e) {
                    };

                    if (data.list.length) {
                        //utils.log(data);
                        html = $.renderTemplate({ template: template, data: data, directives: directives });
                        $btn.show();
                        $btn.after(html);
                        $btn.remove();
                    } else {
                        $btn.hide();
                    }

                    $btn.after();
                    $btn.data(DATAS.loading, false);
                    $btn.data(DATAS.loaded, true);
                });
            }

            return false;
        });
    };

    // 관련 태그 뉴스
    $.fn.widgetRelations = function () {
        var apis = {
            find: utils.config('searchEnginePath') + '/search_jsonp.jsp?query={VALUE}&collection=news,jplus&sourceCode=1,3,jp&listCount=3&sort=DATE/DESC,RANK/DESC',
            issue: apiPath + '/issue/{VALUE}/witharticles'
        },
			html = '' +
			'<div class="hd">' +
				'<h3 class="subtit_comm">' +
					'<span class="fg"><span class="bg" data-bind="subtitle"></span></span>&nbsp;' +
					'<span data-bind="subtitle2"></span>' +
				'</h3>' +
			'</div>' +
			'<div class="bd">' +
				'<ul class="clearfx" data-bind="list">' +
					'<li>' +
						'<span class="thumb"></span>' +
						'<strong class="mg" data-bind="title"></strong>' +
						'<em data-bind="summary"></em>' +
					'</li>' +
				'</ul>' +
			'</div>',
			isGetIssueData = false,
			valueId = {
			    issue: 'articleRelation_Issue',
			    find: 'articleRelation_Find'
			},
			$el = this,
			irPath = utils.config('irPath');

        function getRelations() {

            utils.ajaxGet({
                dataType: 'json',
                url: utils.config('cruzPath') + '/rel?pcid=' + utils.getPCID() + '&tid=' + utils.getTotalId() + '&tit=' + utils.getArticleTitle() + '&rnd=N&div=pc',
                success: function (data) {
                    rtn = [];
                    $.each(data, function (i, v) {
                        rtn.push({
                            TotalId: this.total_id,
                            Thumbnail: this.art_thumb,
                            Title: this.art_title,
                            Summary: this.art_content
                        });
                    });
                    success(rtn);
                }
            });
        }


        function success(data) {
            var directive = {
                subtitle: {
                    html: function () {
                        return this.subtitle;
                    }
                },
                subtitle2: {
                    html: function () {
                        return this.subtitle2;
                    }
                },
                list: {
                    thumb: {
                        html: function () {
                            var ele = arguments[0].element,
								totalId = this.TotalId ? this.TotalId : this.Id,
								articleLink = utils.getUrlFormat(URL_NAMES.article, totalId),
								thumbnail = utils.getIrPath(utils.getPdsFullPath(this.Thumbnail), 54, 54);

                            return thumbnail === '' || thumbnail === undefined ? $(ele).hide() : '<a href="' + articleLink + '"><img src="' + thumbnail + '" alt="' + this.Title + '"></a>';
                        }
                    },
                    title: {
                        html: function () {
                            var ele = arguments[0].element,
								totalId = this.TotalId ? this.TotalId : this.Id,
								articleLink = utils.getUrlFormat(URL_NAMES.article, totalId),
								title = this.Title;

                            return title === '' || title === undefined ? $(ele).hide() : '<a href="' + articleLink + '">' + title + '</a>';
                        }
                    },
                    summary: {
                        html: function () {
                            var ele = arguments[0].element,
								totalId = this.TotalId ? this.TotalId : this.Id,
								summary = this.Summary || '';

                            // ksk : summary 앞에 ...이 나오면 제거 해달라는 요구사항
                            if (summary === '' || summary === undefined) {
                                return $(ele).hide();
                            }

                            var tmp = summary.substr(0, 3);
                            if (tmp === '...') {
                                summary = summary.substr(3);
                            }
                            return '<a href="/article/' + totalId + '">' + summary + '</a>';
                            //return summary === '' || summary === undefined ? $(ele).hide() : '<a href="/article/' + totalId + '">' + summary + '</a>';
                        }
                    }
                }
            };

            /*
                        var subtitle = $('.tag_list').find('.keyword').length > 0 ? $('.tag_list').find('.keyword').eq(0).html() : $('.tag_list').find('li').eq(0).html();
                        var subtitle2 = subtitle ? '관련 태그 뉴스' : '&nbsp;';
                        if (subtitle=='' || subtitle==undefined) {
                            subtitle = '#관련 뉴스'
                        }
            */

            var subtitle = '관련 태그 뉴스'
            var subtitle2 = '&nbsp;'

            if ($.isArray(data)) {
                $el.html(html).render({ subtitle: subtitle, subtitle2: subtitle2, list: data }, directive);
            }

            // 관련 태그 뉴스 Cloc
            $el.find('a').each(function () {
                $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|tagnews'));
            });
        }

        return getRelations();

    };

    $.fn.widgetRelationsTag = function () {
        var $w = this;
        $.when(
            $.ajax({
                dataType: 'json',
                url: utils.config('cruzPath') + '/rel?pcid=' + utils.getPCID() + '&tid=' + utils.getTotalId() + '&tit=' + encodeURIComponent(utils.getArticleTitle()) + '&rnd=N&div=pc&th=Y&cnt=3&scd=1,3,61',
                success: function (data) {
                    var html = '';
                    var type = (utils.getPCID().substr(-1) % 2) == 0 ? false : true;
                    var addCloc = (utils.getPCID().substr(-1) % 2) == 0 ? "2" : "1";
                    //if (type) { html += '<div class="ft_article ft_related_article"><div class="hd"><h3 class="subtit_comm"><span>관련</span> 태그 뉴스</h3></div><div class="bd"><div id="related_slide_wrap" class="slide_wrap slide_btn clearfx">'; }
                    //if (type) { html += '<div class="related_article"><div class="hd"><h3 class="subtit_comm"><span class="fg"><span class="bg">관련 태그 뉴스</span></span></h3></div><div class="bd"><ul class="clearfx">'; }
                    //else {
                    html += '<div class="ft_related_article_type2"><div class="hd"><h3 class="subtit_comm"><span>관련</span> 태그 기사</h3></div><div class="bd"><div id="related_slide_wrap" class="slide_wrap slide_btn clearfx">'; 
                    //}

                    $.each(data, function (i, v) {
                        var articleLink = utils.getUrlFormat(URL_NAMES.article, this.total_id);
                        var thumbnail = "";

                        //if (type) {
                        //    thumbnail = utils.getIrPath(utils.getPdsFullPath(this.art_thumb), 54, 54);

                        //    html += '<li>';
                        //    html += '<span class="thumb"><a href="' + articleLink + '">';
                        //    html += '<img src="' + thumbnail + '" alt="' + this.art_title + '"><span class="mask"></span>';
                        //    html += '</a></span>';
                        //    html += '<strong class="mg"><a href="' + articleLink + '">' + this.art_title + '</a></strong>';
                        //    html += '<em><a href="' + articleLink + '">' + this.art_content + '</a></em>';
                        //    html += '</li>';

                        //    //thumbnail = utils.getIrPath(utils.getPdsFullPath(this.art_thumb), 200, 150);

                        //    //if (i == 0 || i == 3) { html += '<div class="slide"><ul>'; }
                        //    //html += '<li>';
                        //    //html += '<a href="' + articleLink + '">';
                        //    //html += '<span class="thumb"><img src="' + thumbnail + '" alt="' + this.art_title + '"><span class="shadow"></span></span>';
                        //    //html += '<strong class="mg">' + this.art_title + '</strong>';
                        //    //html += '</a>';
                        //    //html += '</li>';
                        //}
                        //else {
                        thumbnail = utils.getIrPath(utils.getPdsFullPath(this.art_thumb), 212, 140);

                        if (i == 0 || i == 3) { html += '<div class="slide"><ul class="clearfx">'; }
                        html += '<li>';
                        html += '<span class="thumb"><a href="' + articleLink + '">';
                        html += '<img src="' + thumbnail + '" alt="' + this.art_title + '"><span class="mask"></span>';
                        html += '</a></span>';
                        html += '<h3 class="mg"><a href="' + articleLink + '">' + this.art_title + '</a></h3>';
                        html += '</li>';
                        if (i == 2 || i == 5) { html += '</ul></div>'; }
                        //}

                        //if (i == 2 || i == 5) { html += '</ul></div>'; }
                    });
                    //if (type) { html += '</div></div>'; }
                    //else { 
                    html += '</div></div></div>'; 
                    //}

                    $("#divRelateTag").html(html);

                    // 관련 태그 뉴스 Cloc
                    $w.find('a').each(function () {
                        $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|tagnews'));
                    });
                },
                error: function () {
                    $("#divRelateTag").hide();
                }
            })
        ).then(function () {
            var slideFtArticle = {
                init: function () {
                    this.slideInit();
                },
                slideInit: function () {
                    var related_slide = $('#related_slide_wrap').slick({
                        arrows: true,
                        dots: true,
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    });
                }
            };
            slideFtArticle.init();
        });
    };
	
	$.fn.widgetRelationsTagByDable = function () {
        var $el = this;
        var strHtml = [];
        strHtml.push("<!-- Begin Dable 하A_가로3_EMPTY_tag / For inquiries, visit http://dable.io -->");
        strHtml.push("<div id=\"dablewidget_1XDZZO7e\" data-widget_id=\"1XDZZO7e\">");
        strHtml.push("<script>");
        strHtml.push("(function(d,a){d[a]=d[a]||function(){(d[a].q=d[a].q||[]).push(arguments)};}(window,'dable'));");
        strHtml.push("dable('renderWidget', 'dablewidget_1XDZZO7e');");
        strHtml.push("</script>");
        strHtml.push("</div>");
        strHtml.push("<!-- End 하A_가로3_EMPTY_tag / For inquiries, visit http://dable.io -->");

        $el.html(strHtml.join(' ')).show();
    };

    $.fn.widgetRealtimeArticle = function () {
        $this = this;
        var apiUri = utils.config('apiPath') + "/pagecall/?u=" + utils.config('staticPath') + "/scripts/data/sonagi/json/rcmkwd.json";

        $.when(
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: apiUri,
                success: function (data) {
                    var html = '';
                    var kwdCnt = data.length;

                    html += '<div class="hd"><h3 class="subtit_comm"><span>포털</span> 실시간 검색어</h3></div><div class="bd"><div class="slide_wrap slide_btn clearfx">';

                    if (kwdCnt > 4) {
                        $.each(data, function (i, v) {
                            var articleLink = utils.getUrlFormat(URL_NAMES.article, this.total_id);
                            var thumbnail = utils.getIrPath(utils.getPdsFullPath(this.art_thumb), 84, 57);
                            var rank = i < 3 ? '<em class="rank_top">' + (i + 1) + '<span></span></em>' : '<em class="rank">' + (i + 1) + '<span></span></em>';

                            if (kwdCnt < 8 && i > 4) { }
                            else {
                                if (i == 0 || i == 5) { html += '<div class="slide"><ul>'; }

                                html += '<li>';
                                html += '<a href="' + articleLink + '">';
                                html += rank;
                                html += '<span class="thumb"><img src="' + thumbnail + '" alt="' + this.kwd + '"><span class="shadow"></span></span>';
                                html += '<span class="text_wrap"><span class="text_center"><strong class="headline mg">' + this.kwd + '</strong></span<span class="valign_fix"></span></span>>';
                                html += '</a>';
                                html += '</li>';

                                if (i == 4 || i == 9) { html += '</ul></div>'; }
                            }
                        });

                        html += '</div></div></div>';

                        $("#divRealtime").html(html);
                        $("#divRealtime").show();

                        // 실시감검색어 뉴스 Cloc
                        $("#divRealtime").find('a').each(function () {
                            $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|realtime'));
                        });
                    }
                    else {
                        $("#divRealtime").hide();
                    }
                },
                error: function () {
                    $("#divRealtime").hide();
                }
            })
        ).then(function () {
            var slideFtArticle2 = {
                init: function () {
                    this.slideInit();
                },
                slideInit: function () {
                    var realtime_slide = $(".ft_realtime_article .slide_wrap").slick({
                        arrows: true,
                        dots: true,
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    });
                }
            };
            slideFtArticle2.init();
        });
    };

    // 아웃스트림 광고
    $.fn.widgetOutstreamAD = function () {
    	var $w = this;
    	var html = '';
    	var menuKey = utils.menu.getPageMenuKey().toLowerCase();
    	if (menuKey.indexOf('money') !== -1) {
    		html = '<script type="text/javascript" class="teads" src="//a.teads.tv/page/67708/tag" async="true"></script>';
    	}
    	else if (menuKey.indexOf('culture') !== -1) {
    	    html = '<script type="text/javascript" class="teads" src="//a.teads.tv/page/120813/tag" async="true"></script>';
    	}
    	else if (menuKey.indexOf('sports') !== -1) {
    	    html = '<script type="text/javascript" class="teads" src="//a.teads.tv/page/120815/tag" async="true"></script>';
    	}
    	else {
    		html = '<div id="admaru_incontentVideo" style="position:relative;width:550px;height:310px;margin:0 auto;display:none;"><script type="text/javascript" src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>';
    		var _c = new Date().getTime();
    		var adLink = '//ads.admaru.com/js/joongang_admaru_icv.js?t=' + _c
    		html += '<script src="' + adLink + '"></script>';
    	}
    	$w.after(html);
    };

    // 오피니언 평양 오디세이
    $.fn.widgetSpecialCartoon = function () {

        var $w = this,
			widgetName = '평양 오디세이',
			keywordStr = '평양 오디세이',
			serviceCode = '',
			listLink = utils.config('webPcPath') + '/find/list?Keyword=' + encodeURIComponent(keywordStr) + '&display=' + encodeURIComponent(widgetName),
			widgetHtml = '<div class="hd"><h3 class="subtit_comm"><a href="' + listLink + '">' + widgetName + '</a></h3></div><div class="bd"></div>',
			template = '<ul data-bind="list"><li><span class="icon"></span><a data-bind="link"></a></li></ul>',
			directives = {
			    list: { link: utils.decorators.link }
			};

        getApiData('/static/specialcartoon', render);

        function render(d) {

            var html = '',
				data = { list: [] };

            try {
                d.List.forEach(function (v, i) {
                    var articleLink = utils.getUrlFormat(URL_NAMES.article, v.Id);
                    data.list.push({ link: { href: articleLink, html: v.Title } });
                });
            } catch (e) {
                utils.log(e);
            };

            if (data.list.length) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                $w.hide();
            }
        }
    };

    // 오피니언 퍼스 펙티브
    $.fn.widgetDigitalOpinion = function () {

        var $w = this,
			widgetName = '퍼스펙티브',
			listLink = utils.config('webPcPath') + '/find/list?Keyword=' + encodeURIComponent(widgetName) + '&ServiceCode=20&display=' + encodeURIComponent(widgetName),
			widgetHtml = '<div class="hd"><h3 class="subtit_comm"><a href="' + listLink + '">' + widgetName + '</a></h3></div><div class="bd"></div>',
			template = '<ul data-bind="list"><li><span class="icon"></span><a data-bind="link"></a></li></ul>',
			directives = {
			    list: { link: utils.decorators.link }
			};

        getApiData('/static/digitalopinion', render);

        function render(d) {

            var html = '',
				data = { list: [] };

            try {
                d.List.forEach(function (v, i) {
                    var articleLink = utils.getUrlFormat(URL_NAMES.article, v.Id);
                    data.list.push({ link: { href: articleLink, html: v.Title } });
                });
            } catch (e) {
                utils.log(e);
            };

            if (data.list.length) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                renderWidgetBody($w, widgetHtml, html);
                $w.show();
            } else {
                $w.hide();
            }
        }
    };

    //jplus 필진 최신글보기, 문구추가
    /*
		'<div class="ab_jplus"><dl id="j-top-articles"></dl></div>'
	*/
    $.fn.articleJplusRecentlyNews = function () {
    	var url = utils.config('jplusPath') + '/Scripts/layout.js',
			totalId = $('#total_id').val(),
			self = this,
			jplusNoticeHtml = '<div class="ab_jplus_notice">' +
			'<span class="icon"></span>' +
			'<p>J플러스의 게시물은 중앙일보 편집 방향 및 논조와 다를 수 있습니다.</p>' +
			'</div>';

        if (totalId !== undefined && totalId !== '') {
            $.getScript(url, function () {
                try {
                    self.append('<div class="ab_jplus"><dl id="j-top-articles"></dl></div>');
                    jplus.layout.articles.renderHtml(totalId);

                    self.find('.ab_jplus').before(jplusNoticeHtml);

                } catch (e) {
                }
            });
        } else {
            //문구 추가
            self.append(jplusNoticeHtml);
        }
    };

    $.fn.widgetProbityLaw = function () {
        $this = this;
        $.when(
            $.ajax({
                type: "GET",
                url: utils.config('apiPath') + "/pagecall/?u=" + utils.config('staticPath') + "/scripts/data/issue/xml/issue_top_article.xml",
                dataType: "XML",
                success: function (xml) {
                    if ($(xml).find("article").length > 0) {
                        var html = '';
                        var e = $(xml).find("article").first();
                        var title = $(e).find("title").text();
                        var content = $(e).find("content").text();
                        var image = $(e).find("image").text();
                        var url = $(e).find("link").text();
                        var target = $(e).find("target").text();
                        var relarticle = $(e).find("relarticle").text();

                        html += image.length > 5 ? '<span class="thumb"><a href="' + url + '"><img src="' + image + '" alt="' + title + '"><span class="mask"></span></a></span>' : '';
                        html += '<div class="text_area">';
                        html += '	<strong class="headline mg"><a href="' + url + '">' + title + '</a></strong>';

                        if (relarticle.length > 5) {
                            html += '	<ul class="related_article">';
                            html += relarticle
                            html += '	</ul>';
                        }
                        else {
                            html += '	<span class="lead"><a href="' + url + '">' + content + '</a></span>';
                        }
                        html += '</div>';

                        $this.html(html);
                        $this.show();
                    }
                },
                error: function () {
                    $this.hide();
                }
            })
        )
    };

    // 김민석의 Mr.밀리터리 캠페인
    $.fn.widgetMmCampaign = function () {
        var $w = this,
            template = '' +
                '<div class="hd"><h3 class="subtit_comm" data-bind="sec"><a data-bind="link">Mr.밀리터리 캠페인</a></h3></div>' +
                '<div class="bd">' +
                '<dl data-bind="list">' +
                '<dt>' +
                '<span class="mg">Q</span>' +
                '<strong class="mg" data-bind="title"><a data-bind="link"></a></strong>' +
                '<em data-bind="date"></em>' +
                '</dt>' +
                '<dd data-bind="right"></dd>' +
                '<dd data-bind="left"></dd>' +
                '</dl>' +
                '</div>' +
                '<div class="ft" data-bind="list"><a data-bind="link" class="add"><span class="hide">Mr.밀리터리</span> 더보기<span class="icon"></span></a></div>',
            directives = {
                sec: { link: utils.decorators.link },
                list: {
                    date: {
                        html: function () {
                            var Sdate = this.sdate.substring(0, 4) + "." + this.sdate.substring(4, 6) + "." + this.sdate.substring(6, 8);
                            var Edate = this.edate.substring(0, 4) + "." + this.edate.substring(4, 6) + "." + this.edate.substring(6, 8);
                            return "참여기간 : " + Sdate + " ~ " + Edate;
                        }
                    },
                    right: {
                        "class": function () {
                            if (this.itemvote_1 > this.itemvote_2) return "answer02";
                            else return "answer01";
                        },
                        html: function () {
                            var percent = Math.round(this.itemvote_1 / this.votecnt * 100);
                            return '<strong class="mg">' + this.item_1 + '</strong><span class="bar_graph" style="width:' + percent + '%;"><span class="bar"></span><em class="mg">' + percent + '%</em></span>';
                        }
                    },
                    left: {
                        "class": function () {
                            if (this.itemvote_2 >= this.itemvote_1) return "answer02";
                            else return "answer01";
                        },
                        html: function () {
                            var percent = Math.round(this.itemvote_2 / this.votecnt * 100);
                            return '<strong class="mg">' + this.item_2 + '</strong><span class="bar_graph" style="width:' + percent + '%;"><span class="bar"></span><em class="mg">' + percent + '%</em></span>';
                        }
                    },
                    title: { link: utils.decorators.link },
                    link: utils.decorators.link
                }
            };

        $.getScript(utils.config('staticPath') + '/scripts/data/mm/js/mm_campaign.js', render);

        function render(d) {
            var html = '',
                //http://news.joins.com/find/list?keyword="Mr.밀리터리 캠페인"&key=mm&sourcegrouptype=all&display=Mr.밀리터리 캠페인
                listLink = utils.config('webPcPath') + '/find/list?keyword=' + encodeURIComponent('Mr.밀리터리 캠페인') + '&scopetype=Keyword&key=mm&sourcegrouptype=all&display=' + encodeURIComponent('Mr.밀리터리 캠페인');
            data = { sec: { link: { href: listLink } }, list: [] }
            try {
                var articles = utils.convertList(mm_Campaign_list);
                var atticleLink = utils.getUrlFormat(URL_NAMES.article, articles[0].total_id);
                data.list.push({
                    title: { link: { href: atticleLink, html: articles[0].title } },
                    item_1: articles[0].item_1,
                    item_2: articles[0].item_2,
                    sdate: articles[0].sdate,
                    edate: articles[0].edate,
                    votecnt: articles[0].votecnt,
                    itemcnt: articles[0].itemcnt,
                    itemvote_1: articles[0].itemvote_1,
                    itemvote_2: articles[0].itemvote_2,
                    link: { href: atticleLink }
                });
            } catch (e) {
                //utils.log('widgetMmCampaign');
                //utils.log(e);
            };
            if (data.list.length) {
                html = $.renderTemplate({ template: template, data: data, directives: directives });
                $w.html(html).show();
            } else {
                $w.hide();
            }
        }
    };

    $.fn.widgetInnovationLab = function () {
    	$this = this;

    	$(".sub_innov_lab .slide_wrap").show();
    	$("#widget_innovation_lab").show();
    	widgetSponsoredContents();
			
    	var nFirstSlideIdx = 0;
    	var nSlideCounter = $("div.slide", $(".sub_innov_lab .slide_wrap")).length;
    	var slideShowCnt = $(this).find(".slide_wrap").data("slideshowcnt");
    	
    	if (slideShowCnt == "1") {
    		nFirstSlideIdx = Math.floor(Math.random() * nSlideCounter);
    	}

    	var slideInnovationLab = {
    		init: function () {
    			this.slideInit();
    		},
    		slideInit: function () {
    			var slide = $('.sub_innov_lab .slide_wrap').slick({
    				arrows: true,
    				dots: false,
    				infinite: false,
    				speed: 300,
    				slidesToShow: slideShowCnt,
    				slidesToScroll: slideShowCnt,
    				initialSlide: nFirstSlideIdx
    			});
    		}
    	};
    	slideInnovationLab.init();

    	function widgetSponsoredContents() {
    		
    		var slideBrandedContents = {
    			init: function () {
    				this.slideInit();
    			},
    			slideInit: function () {
    				var slide = $('.sub_branded_contents .slide_wrap').slick({
    					slidesToShow: 2,
    					slidesToScroll: 2
    				});
    			}
    		};
    		slideBrandedContents.init();
    		$("#widget_sponsored_div").show();
        }
    };

    // 김민석의 Mr.밀리터리 배너광고
    $.fn.widgetMmBannerAd = function () {
        $('#li_da_slot_926').loadAd({ type: 'da_slot_926' });
    };

    // 김민석의 Mr.밀리터리 배너
    $.fn.widgetMmRequest = function () {
        $this = this;
        var html = '<dl>';
        html += '	<dt class="mg">밀리터리 Request</dt>';
        html += '	<dd><span class="mg">Mr.밀리터리 측에서 군사/안보에 대해 다루었으면 하는 콘텐트를 알려주세요.</span> <a href="' + utils.config('bbsPath') + '/mm/qna">글쓰기</a></dd>';
        html += '</dl>';
        $this.html(html);
        $this.show();
    };

    // 김민석의 Mr.밀리터리 소개 팝업
    $.fn.widgetMmInfo = function () {
        $this = this;
        var html = '<div class="hd">';
        html += '	<h3 class="hide">군사안보연구소</h3>';
        html += '	</div>';
        html += '	<div class="bd">';
        html += '	<a href="javascript:;" onclick="openLayerPopup(\'military\');"><img src="' + utils.config('imagePath') + '/pc/list/r_military.png" alt="군사안보연구소 - 중앙일보 군사안보분야 전문 연구기관"></a>';
        html += '	</div>';
        $this.html(html);
        $this.show();
    };

    //대학평가 종합순위
    $.fn.widgetUniversityRanking = function () {
        var $this = this;
        $.when(
            $.ajax({
                type: "GET",
                url: utils.config("apiPath") + "/pagecall/?u=" + utils.config("staticPath") + "/scripts/data/university/xml/index_ranking.xml",
                dataType: "XML",
                success: function (xml) {
                    if ($(xml).find("article").length == 0) { $this.hide(); return; }
					
                    try {					
                        var article = $(xml).find("article");
                        var html = '' +
								'<div class="hd">' +
									'<h4 class="subtit_comm">' + $(article).find("title").text() + '</h4>' +
								'</div>' +
								'<div class="bd">' +
									'<img src="' + $(article).find("image").text() + '" alt="" />' +
								'</div>' +
								'<div class="ft">' +
									'<a href="' + $(article).find("link").text() + '" target="' + $(article).find("target").text() + '" class="add"><span class="hide">' + $(article).find("title").text() + '</span>더보기<span class="icon"></span></a>' +
								'</div>';
                        $this.html(html);
                        $this.show();
                    } catch (e) {
                        $this.hide();				
                    }
                },
                error: function () {
                    $this.hide();
                }
            })
        )
    };

    //추천 영화
    $.fn.widgetRecommendedMovie = function () {
        var $this = this;
        $.when(
            $.ajax({
                type: "GET",
                url: utils.config("apiPath") + "/pagecall/?u=" + utils.config("staticPath") + "/scripts/data/magazinem/xml/right_recommend.xml",
                dataType: "XML",
                success: function (xml) {
                    if ($(xml).find("article").length == 0) { $this.hide(); return; }

                    try {
                        var html = '' +
            				'<div class="hd">' +
								'<h4 class="subtit_comm">추천 영화</h4>' +
							'</div>' +
							'<div class="bd"><div class="slide_wrap"><div class="slide_list"><div class="slide"><ul data-bind="list">';

                        $(xml).find("article").each(function (i, e) {
                            if ($(e).find("title").text() == "") return true;
                            html +=
								'<li>' +
									'<strong class="mg">' +
										'<a data-bind="link" href="' + $(e).find("link").text() + '" target="' + $(e).find("target").text() + '">' + $(e).find("title").text() + '</a>' +
									'</strong>' +
								'</li>';
                        });

                        html += '</ul></div></div></div></div>';

                        $this.html(html);
                        $this.show();
                    } catch (e) {
                        $this.hide();
                    }
                },
                error: function () {
                    $this.hide();
                }
            })
        )
    };

    //추천 테마
    $.fn.widgetRecommendedTheme = function () {
        var $this = this;

        try {
            var html = '' +
                '<div class="hd">' +
                    '<h3 class="subtit_comm">추천 테마</h3>' +
                '</div>' +
                '<div class="bd">' +
                    '<div class="slide_wrap">' +
                        '<div class="slide_list">' +
                            '<div class="slide">' +
                                '<ul data-bind="list">' +
                                    '<li><strong class="mg"><a data-bind="link" href="/find/list?keyword=미리보는 오늘&display=미리보는 오늘&key=historycolumn">미리보는 오늘</a></strong></li>' +
                                    '<li><strong class="mg"><a data-bind="link" href="/find/list?keyword=평화 오디세이&display=평화 오디세이&key=historycolumn">평화 오디세이</a></strong></li>' +
                                    '<li><strong class="mg"><a data-bind="link" href="/find/list?keyword=박보균의 현장속으로&display=박보균의 현장속으로&key=historycolumn">박보균의 현장속으로</a></strong></li>' +
                                    '<li><strong class="mg"><a data-bind="link" href="/find/list?keyword=당신의 역사&display=당신의 역사&key=historycolumn">당신의 역사</a></strong></li>' +
                                    '<li><strong class="mg"><a data-bind="link" href="/find/list?keyword=그때 오늘&display=그때 오늘&key=historycolumn">그때 오늘</a></strong></li>' +
                                    '<li><strong class="mg"><a data-bind="link" href="/find/list?keyword=한명기가 만난 조선사람&display=한명기가 만난 조선사람&key=historycolumn">한명기가 만난 조선사람</a></strong></li>' +
                                    '<li><strong class="mg"><a data-bind="link" href="/find/list?keyword=이덕일의 고금통의&display=이덕일의 고금통의&key=historycolumn">이덕일의 고금통의</a></strong></li>' +
                                    '<li><strong class="mg"><a data-bind="link" href="/find/list?keyword=전우용의 근대의 사생활&display=전우용의 근대의 사생활&key=historycolumn">전우용의 근대의 사생활</a></strong></li>' +
                                '</ul>' +
                            '</div>' +
                            '<div class="slide">' +
                                '<ul data-bind="list">' +
                                    '<li><strong class="mg"><a data-bind="link" href="/find/list?keyword=도올 고함&display=도올 고함&key=historycolumn">도올 고함</a></strong></li>' +
                                    '<li><strong class="mg"><a data-bind="link" href="/find/list?keyword=도올의 도마복음&display=도올의 도마복음&key=historycolumn">도올의 도마복음</a></strong></li>' +
                                    '<li><strong class="mg"><a data-bind="link" href="/find/list?keyword=1128일의 기억&display=1128일의 기억&key=historycolumn">6·25전쟁, 1128일의 기억</a></strong></li>' +
                                '</ul>' +
                            '</div>' +
                        '</div>' +
						'<span class="btn_wrap" style="">' +
							'<button type="button" class="btn-prev">이전</button>' +
							'<button type="button" class="btn-next">다음</button>' +
						'</span>' +
                    '</div>' +
                '</div>';

            $this.html(html);
            $this.show();

            $('.sub_recommend_series .slide_wrap .slide_list').slick({
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                draggable: true,
                arrows: true,
                prevArrow: $this.find('.btn-prev'),
                nextArrow: $this.find('.btn-next')
            });
        } catch (e) {
            $this.hide();
        }
    };

    //시민마이크
    $.fn.widgetPeopleMic = function () {
        $this = this;
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: utils.config('apiPath') + "/pagecall/?u=" + utils.config('staticPath') + '/scripts/data/peoplemic/json/peoplemic.json',
            success: function (data) {
                var html = '';
                if (data.Items.length > 0) {
                    utils.getRandomNumberArray(data.Items)
                    html += '<div class="hd"><h3 class="subtit_comm">시민마이크</h3></div>';
                    html += '<div class="bd"><p class="mg">당신의 생각을 들려주세요</p>';
                    html += '	<ul>';
                    html += '		<li>';
                    html += '			<strong class="mg"><a href="http://peoplemic.joins.com/?s=' + data.Items[0].AgndSeq + '" target="_blank">' + data.Items[0].AgndTitle + '</a></strong>';
                    html += '			<em>' + data.Items[0].AnswCount + '</em>개의 의견';
                    html += '		</li>';
                    if (data.Items.length > 1) {
                        html += '	<li>';
                        html += '		<strong class="mg"><a href="http://peoplemic.joins.com/?s=' + data.Items[1].AgndSeq + '" target="_blank">' + data.Items[1].AgndTitle + '</a></strong>';
                        html += '		<em>' + data.Items[1].AnswCount + '</em>개의 의견';
                        html += '	</li>';
                    }
                    html += '	</ul>';
                    html += '</div>';
                    html += '<div class="ft">';
                    html += '	<a href="http://peoplemic.joins.com" target="_blank" class="add"><span class="hide">시민마이크</span> 더보기<span class="icon"></span></a>';
                    html += '</div>';

                    $this.html(html);
                    $this.show();

                    $this.find('a').each(function () {
                        $(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|peoplemic'));
                    });
                }
            },
            error: function () {
                $this.hide();
            }
        })
    };

    //피플 > 최신 기사
    $.fn.widgetPeopleLatest = function () {
        var $this = this;
        var categoryList = [
			['최신 사랑방', 'TodayPeopleRoom', 'Room'],
			['최신 인사', 'TodayPeoplePersonnel', 'Personnel'],
			['최신 부음', 'TodayPeopleDeath', 'Death']
        ];

        $.ajax({
            type: 'GET',
            dataType: 'JSON',
            url: utils.config('apiPath') + '/Category/ArticleList?pageNum=1&pageSize=3&categoryKey=' + categoryList[0][1],
            success: function (json) {
                if (json == null || json == undefined) return;
                render(0, json);
            }
        });

        $.ajax({
            type: 'GET',
            dataType: 'JSON',
            url: utils.config('apiPath') + '/Category/ArticleList?pageNum=1&pageSize=3&categoryKey=' + categoryList[1][1],
            success: function (json) {
                if (json == null || json == undefined) return;
                render(1, json);
            }
        });

        $.ajax({
            type: 'GET',
            dataType: 'JSON',
            url: utils.config('apiPath') + '/Category/ArticleList?pageNum=1&pageSize=3&categoryKey=' + categoryList[2][1],
            success: function (json) {
                if (json == null || json == undefined) return;
                render(2, json);
            }
        });

        function render(index, json) {
            try {
                var html = '' +
				'<div class="hd">' +
					'<h4 class="subtit_comm"><a href="/People/' + categoryList[index][2] + '/List">' + categoryList[index][0] + '</a></h4>' +
				'</div>' +
				'<div class="bd">' +
					'<ul class="noline" data-bind="list">';

                for (var i = 0; i < json.length; i++) {
                    html += '<li>';

                    if (json[i].Thumbnail != '') {
                        html += '<span class="thumb"><a data-bind="link" href="/article/' + json[i].TotalId + '"><img data-bind="image" src="' + utils.config('irPath') + '?u=' + utils.getPdsFullPath(json[i].Thumbnail) + '&w=37&h=37&t=c" alt=""><span class="frame"></span></a></span>';
                    }

                    html += '<strong><a data-bind="link" href="/article/' + json[i].TotalId + '">' + json[i].Title + '</a></strong>';
                    html += '</li>';
                }

                html += '</ul></div>';

                $this.find('.sub_jplus').eq(index).append(html).show();
            } catch (e) { }
        }
    };

    //e글중심 > 주간 인기 글
    $.fn.widgetEgleWeekBest = function () {
        var $this = this;
        $.when(
            $.ajax({
                type: "GET",
                url: utils.config('apiPath') + "/pagecall/?u=" + utils.config('staticPath') + "/scripts/data/sonagi/xml/article_right_sonagi_etextcenter.xml",
                dataType: "XML",
                success: function (xml) {
                    if ($(xml).find("article").length == 0) { $this.hide(); return; }

                    try {
                        var html = '<div class="hd"><h4 class="subtit_comm">e글중심 베스트</h4></div><div class="mg bd"><ul>';
                        var num = 1; 
                        $(xml).find("article").each(function (i, e) {
                            if ($(e).find("title").text() == "") return true;
                            var articleLink = utils.getUrlFormat(URL_NAMES.article, $(e).find("total_id").text());
                            var cls = "";
                            if (num < 4) { cls = "class='top'"; }
                            html +=
								'<li ' + cls + '>' +
									'<em class="mg">' + num + '</em>' +
									'<strong>' +
										'<a href="' + articleLink + '" target="_self">' + $(e).find("title").text() + '</a>' +
									'</strong>' +
								'</li>';

                            num++;
                        });

                        html += '</ul></div>';

                        $this.html(html);
                        $this.show();
                    } catch (e) {
                        $this.hide();
                    }
                },
                error: function () {
                    $this.hide();
                }
            })
        )
    };

    // 미리듣는 오늘
    $.fn.widgetPrehear = function (options) {
        var $this = this;
        var nNowTime = parseInt(__Ndaytime.ymdhm.toString().substr(8), 10);
        var nNowWeekDay = parseInt(__Ndaytime.ba.weekday.toString(), 10);
        //2월 15일부터 오후 3:10~ 오후 5:30 (2시간 20분 노출)
        if (nNowWeekDay >= 1 && nNowWeekDay <= 5 && nNowTime >= parseInt("1510", 10) && nNowTime <= parseInt("1730", 10)) {
            $.when(
			    $.ajax({
                type: "GET",
                    url: utils.config('apiPath') + "/pagecall/?u=" + utils.config('staticPath') + "/scripts/data/home/xml/right_soundcloud.xml",
                    dataType: "XML",
                    success: function (xml) {
                        if ($(xml).find("article").length > 0) {
                            var e = $(xml).find("article").first();
                            var strText = $(e).find("title").text();
                            var srcUrl = $(e).find("link").text();
                            if ($.trim(srcUrl).length > 0) {
                                var strSoundUrl = "https://w.soundcloud.com/player/" +
                                    "?url=" + escape(srcUrl) +
                                    "&amp;inverse=true&amp;auto_play=false&amp;show_user=true&amp;download=false&amp;sharing=false&show_artwork=true&amp;show_user=true&start_track=0&show_teaser=false";
                                var html = '' +
                                    '<!-- 미리듣는 오늘 음성 콤포넌트 -->' +
                                    '<strong class="mg tit">' + strText + '</strong><div class="bd"><iframe width="100%" height="20" scrolling="no" frameborder="no" src="' + strSoundUrl + '"></iframe></div>' +
                                    '<!-- //미리듣는 오늘 음성 콤포넌트 -->';
                                $this.html(html);
                                $this.show();
                            }
                        }
                    },
                    error: function (e) {
                        $this.hide();
                    }
                })
		    );
        }
    }
	// 핫이슈
	// @param options
    $.fn.widgetTagNews = function (options) {       
    	$this = this;
    	var apiUri = utils.config('apiPath') + "/pagecall/?u=" + utils.config('staticPath') + "/scripts/data/issue/js/tagnews_article_list_pchome.json";

    	$.ajax({
    		type: "GET",
    		dataType: 'json',
    		url: apiUri,
    		success: function (data) {
    			try {
    				var html = '';
    				html += '<div class="hd"><h3 class="subtit_comm">이슈패키지</h3></div><div class="bd mg">';
    				html += '<ul class="clearfx">';
    				$.each(data, function (i, v) {
    					html += '<li>';
    					if (data[i].edit_iss_img.length > 0) {
    						html += '<a href="' + data[i].iss_url + '"><img src="' + data[i].edit_iss_img + '" alt=""><span class="shadow"></span>';
    					}
    					html += '<span class="text_wrap"><span class="text_center"><strong>' + data[i].edit_iss_title + '</strong></span><span class="valign_fix"></span></span>';
    					html += '</a>';
    					html += '</li>';
    				});
    				html += '</ul></div>';
    				$this.html(html);
    				$this.show();
    				$this.find('a').each(function () {
    					$(this).attr('href', utils.getClocUrl($(this).attr('href'), 'Joongang|article|issuepkg'));
    				});
    			} catch (e) {
    				$this.hide();
    			}
    		},
    		error: function (e) {
    			$this.hide();
    		}
    	})
    };

	// 더,오래 필진신청하기
    $.fn.widgetRetirementWriter = function () {
    	$this = this;
    	var html = '<a href="' + utils.config('webPcPath') + '/article/21727454"><img src="' + utils.config('imagePath') + '/pc/senior/r_senior_write_rts.png" alt="더,오래 필진 신청"></a>';
    	$this.html(html);
    	$this.show();
    };

	//더,오래 공지사항
    $.fn.widgetRetirementNotice = function () {
    	var $this = this;

    	$.getScript(utils.config('webPcPath') + '/retirement/noticedata?page=1&pageSize=3', function () {
    		var list = bbs_notice.data;
     		var html = '' +
			'<div class="hd">' +
				'<h3 class="subtit_comm"><a href="' + utils.config('webPcPath') + '/retirement/notice">공지사항</a></h3>' +
			'</div>' +
			'<div class="bd"><ul>';   		
    		for(var i=0; i<list.length; i++) {
    			html += '<li><span class="icon"></span><a href="' + utils.config('webPcPath') + '/retirement/notice/' + list[i].aid + '">' + list[i].title + '</a></li>';
    		}
    		html += "</ul></div>";

    		$this.append(html);
    	})
    };

	// Jpod
    $.fn.widgetJpodEpisode = function (options) {
    	var $this = this;
    	/*$.ajax({
    		type: "GET",
    		url: utils.config('apiPath') + "/pagecall/?u=" + utils.config('staticPath') + "/scripts/data/jpod/episode.xml",
    		dataType: "XML",
    		success: function (xml) {
    			var html = '';
    			if ($(xml).find("article").length > 0) {
    				var itemno = Math.floor(Math.random() * $(xml).find("article").length);
    				var e = $(xml).find("article").eq(itemno);
    				var title = $(e).find("title").text();
    				var seq = $(e).find("total_id").text();
    				var chtitle = $(e).find("subtitle").text();
    				var epno = $(e).find("epno").text();
    				var thumb = $(e).find("thumb").text();
    				html += '<p><a href="' + utils.config('webPcPath') + '/Jpod/Episode/' + seq + '?cloc=joongang|article|jpod"><span class="thumb"><img src="' + thumb + '" alt=""></span> <em>' + chtitle + '</em> <strong>' + epno + ' ' + title + '</strong></a></p>';
					$("#jpoditems").html(html);
    				$this.show();
    			}
    			else {
    				html += '<a href="' + utils.config('webPcPath') + '/Jpod?cloc=joongang|article|jpod"><img src="' + utils.config('imagePath') + '/pc/jpod/r_article_jpod.png"></a>';
    				$("#jpoditems").html(html);
    				$this.show();
    			}
    		},
    		error: function (e) {
    			$this.hide();
    		}
    	})*/
    	if (__Ndaytime.ymdhm <= 202004302359) {
    	    var html = '';
    	    html = '<a href="' + utils.config('webPcPath') + '/digitalspecial/312/?cloc=joongang-article-birth" target="_blank" style="display:none;"><img src="https://images.joins.com/ui_joongang/banner/bn_pc_article_birth_1160x160.jpg" style="width:580px;height:80px;" alt="우리동네 출산축하금 얼마일까?"></a>'
    	    $("#jpoditems").css('background-image', 'url("")').html(html);
    	    $("a", $("#jpoditems")).eq(Math.floor(Math.random() * $("a", $("#jpoditems")).length)).show();
    	    $this.show();
    	}
    };

    function renderWidgetBody($w, widgetHtml, html) {
        /*var $body = $w.find('.bd');
		if(!$body || $body.length == 0) {
			$w.html(widgetHtml).find('.bd').html(html);
		} else {
			$body.html(html);
		}*/
        var $body = $w.find('.bd');
        if (!$body || $body.length == 0) {
            $w.html(widgetHtml).find('.bd').html(html.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">"));
        } else {
            $body.html(html);
        }
    }

    function renderWidgetBodyPrepend($w, widgetHtml, html) {
        var $body = $w.find('.bd');
        if (!$body || $body.length == 0) {
            $w.prepend(widgetHtml).find('.bd').html(html);
        } else {
            $body.html(html);
        }
    }

    function getTempData(url, callback, temp) {

        //var t = $.extend({}, temp);
        callback(temp);
    }

    function getApiData(url, callback) {
        url = url.indexOf('http') > -1 ? url : apiPath + url;
        utils.getJsonp({
            url: url,
            success: function (res) {
                callback && callback(res);
            }
        });
    }

})(jQuery, window, document);

function setADLogData(cloc) {
    var strSetLogUrl = utils.config('appPath') + "/news/common/set_page_log.asp?p=" + escape(document.location.href) + "&r=" + escape(document.referrer) + "&c=" + escape(cloc);
    /*로그저장*/
    if ($("iframe#ifrmHdnPageLog").length > 0) { $("iframe#ifrmHdnPageLog").attr("src", strSetLogUrl); }
    else { $(document.body).append("<iframe id='ifrmHdnPageLog' width='0' height='0' frameborder='0' src='" + strSetLogUrl + "'></iframe>"); }
}

function openKakao() {
	if (utils.isMobile()) {
		window.open("kakaoplus://plusfriend/home/@joongangilbo");
	}
	else {
		alert('지원하지 않는 플랫폼입니다.');
	}
}

function openKakaoTalkJ() {
	if (utils.isMobile()) {
		window.open("kakaoplus://plusfriend/home/@talkpawonj");
	}
	else {
		location.href = "http://plus.kakao.com/home/@talkpawonj";
	}
}

function openLayerPopup(type) {
    $.ajax({
        type: 'GET',
        dataType: 'HTML',
        url: utils.config('apiPath') + '/pagecall/?u=' + utils.config('staticPath') + '/scripts/data/layer/' + type + '.html',
        success: function (html) {
            $.when($('#doc').append(html)).then(function () {
                if (type == 'military') {
                    $('div.layer').addClass('layeron');
                } else {
                    openLayerPopupReturn();
                }
            });
        }
    });    
}