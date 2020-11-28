﻿var $isSearched = true;
function autoSearchKeywordDisplay() {
    var $searchKeyword = $('#searchKeyword');
    $searchKeyword.searchAutoComplete && $searchKeyword.searchAutoComplete();
}

function search(keyword) {
    if (keyword.isEmpty())
        return alert('검색어를 입력해주세요.');

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

    if (document.location.href.indexOf(utils.config('searchWebPath')) > -1) {
		searchUrl = utils.config('webPcPath') + pathName + '?keyword=' + encodeURIComponent(keyword);
	} else {
		searchUrl = utils.config('searchWebPath') + '?keyword=' + encodeURIComponent(keyword);
	}

    //if (typeof parameter['SearchCategoryType'] != 'undefined')
    //    searchUrl += '&SearchCategoryType=' + parameter['SearchCategoryType'];

    location.href = searchUrl;
}

function setMegamenuIcon() {
    if ($('#mega_menu').scrollTop() == 0 && $('#mega_menu .bd').innerHeight() >= $(window).height()) {
        $('.icon_godown').addClass('active');
    } else {
        $('.icon_godown').removeClass('active');
    }
}

// My page
function myPage() {
    var strHtml = [];
    if ($('#member_wrap').length > 0) {
        if (commentUserInfo.isLogin()) {
            var korLimit = 6;
            var engLimit = 10;
            var name = commentUserInfo.getInfo().name;

            var checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
            if (checkKor.test(name))
                name = (name.length > korLimit) ? name.substr(0, korLimit) + '...' : name;
            else
                name = (name.length > engLimit) ? name.substr(0, engLimit) + '...' : name;

            strHtml.push('<div class="logout">');
            strHtml.push('    <a href="#" class="btn_logout">');
            strHtml.push('        <span class="img_thumbnail"></span>');
            strHtml.push('        <strong>' + name + '</strong><em>님</em>');
            strHtml.push('    </a>');
            strHtml.push('    <div class="layer_logout">');
            strHtml.push('        <ul>');
            strHtml.push('            <li><a href="https://my.joins.com/login/logout.asp">로그아웃</a></li>');
            if (commentUserInfo.getInfo().snsInfo == null) {
                strHtml.push('        <li><a href="https://my.joins.com/private">마이페이지</a></li>');
            }
            strHtml.push('        </ul>');
            strHtml.push('    </div>');
            strHtml.push('</div>');
        }
        else {
            strHtml.push('<div class="login">');
            strHtml.push('    <a href="https://my.joins.com/login" class="btn_login">로그인</a>');
            strHtml.push('</div>');
        }

        $('#member_wrap').append(strHtml.join(''));
    }
}

function accessibleMenu() {
    var $menu = $('#mega_menu .depth1');
    var $menuItem = $menu.find('> li > a');

    var $subMenu = $('#mega_menu .depth2');
    var $subMenuItem = $subMenu.find('> li > a');
    var $submenuLastItem = $subMenu.find('> li:last-child > a');

    $menuItem.focus(function () {
        $subMenu.removeClass('visible');
        if ($(this).next($subMenu)) {
            $(this).next($subMenu).addClass('visible');
        }
    })
    .blur(function () {
        $subMenu.removeClass('visible');
    })
    .mouseleave(function () {
        $subMenu.removeClass('visible');
    });

    $subMenuItem.focus(function () {
        $(this).parent().parent().addClass('visible');
    });
    $submenuLastItem.blur(function () {
        $subMenu.removeClass('visible');
    });
}

$(function () {
    myPage();
    utils.shareHandler.bind($('.share_button').find('a'));
    autoSearchKeywordDisplay();

    // 검색, 뉴스레터 해더 sticky 제거
    if (utils.config('pageType') != PAGE_TYPE.search && window.location.pathname.toLowerCase().indexOf('/newsletter') == -1) {
        var stickyNavTop = Math.floor($('.header').offset().top);
		stickyNavTop = (stickyNavTop > 0) ? stickyNavTop : 0;
        var stickyNav = function () {
            var scrollTop = $(window).scrollTop();
            var adTop = ($('.premium_richmedia').height() == null) ? 0 : $('.premium_richmedia').height();
            if (scrollTop > stickyNavTop && stickyNavTop <= adTop) {
                $('body').addClass('sticky');
                $('.layer_jmnet').hide();
                $('.jmnet').removeClass('jmnet_open');

                if (window.location.pathname.toLowerCase().indexOf('/jpod/episode/') > -1)
                    $('#body').css('padding-top', '480px');
            } else {
                $('body').removeClass('sticky');
                $('.header .search_form').removeClass('search_form_on');

                if (window.location.pathname.toLowerCase().indexOf('/jpod/episode/') > -1)
                    $('#body').css('padding-top', '325px');
            }
        };

        stickyNav();
        $(window).scroll(function () {
            stickyNav();
        });
    }

    $('#searchKeyword').on('keyup', function (e) {
        $('.autocomplete').show();
        var keyword = $('#searchKeyword').val() || '',
            keyCode = utils.getKeyCode(e);

        if (keyCode == 13)
            search(keyword);
    });

    $('#searchKeyword').on('click', function (e) {
        $('.autocomplete').show();
    });

    $('#btnSearch').click(function () {
        search($('#searchKeyword').val());
    });

    $('.btn_navbar').click(function (e) {
        e.preventDefault();
        var $body = $('body');
        var $self = $(this);
        var obj = '#mega_menu';
        $body.addClass('layer_open');
        $(obj).attr('tabindex', '0').show().focus();
        $(obj).find('.btn_close').click(function (e) {
            e.preventDefault();
            $body.removeClass('layer_open');
            $(obj).hide();
            $self.focus();
            $(this).off('click');
        });
        setMegamenuIcon();
    });

    $('.family_site a').click(function (e) {
        e.preventDefault();
        var $self = $(this);
        var obj = '#layer_jmnet';
        $(obj).attr('tabindex', '0').show().focus();
        $(obj).find('.btn_close').click(function (e) {
            e.preventDefault();
            $(obj).hide();
            $self.focus();
            $(this).off('click');
        });
    });

    $('.header .btn_search').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.header .search_form').addClass('search_form_on');
        $(document).one('click', function closeMenu(e) {
            if ($('.header .search_form').has(e.target).length === 0) {
                $('.header .search_form').removeClass('search_form_on');
            } else {
                $(document).one('click', closeMenu);
            }
        });
        $('#searchKeyword').focus();
        $('.autocomplete').hide();
    });

    $('#mega_menu').scroll(function () {
        setMegamenuIcon();
    });

    $('.header .btn_logout').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.header .layer_logout').addClass('layer_logout_on');
        $(document).one('click', function closeMenu(e) {
            if ($('.header .layer_logout').has(e.target).length === 0) {
                $('.header .layer_logout').removeClass('layer_logout_on');
            } else {
                $(document).one('click', closeMenu);
            }
        });
    });

    $('.btn_search_area').click(function (e) {
        e.preventDefault();
        var $self = $(this);
        var obj = '#layer_search_area';
        $(obj).attr('tabindex', '0').focus();
        $(".layer_search_area").fadeToggle(500);
        $(obj).find('.btn_close').click(function () {
            $(obj).fadeOut(500);
            $self.focus();
            $(this).off('click');
        });
        return false;
    });

    $(document).on('click scroll', function (e) {
        if ($("#layer_search_area").css("display") == "block") {
            if (!$('#layer_search_area').has(e.target).length) {
                $(".layer_search_area").stop().fadeOut(500);
            }
        }
    });

    setMegamenuIcon();
    accessibleMenu();
});