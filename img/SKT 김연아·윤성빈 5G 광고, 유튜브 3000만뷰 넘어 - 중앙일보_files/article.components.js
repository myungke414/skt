﻿/**
* Article 에서 사용되는 Component 기능을 정의한다.
*/
(function ($, window, document) {

	var $leftSns = $('.share_article > dl'),
		ARTICLE_SIZE = {
			body: 580,
			topDuplicationMargin: 40
		},
		apiPath = utils.config('apiPath'),
		nowDate = new Date();

	function getLeftSnsPosition() {
		var offsetTop = $leftSns.offset() ? $leftSns.offset().top : 0,
			h = $leftSns.height() + 20 || 0;

		return offsetTop + h;
	}

	// DESC : 컴포넌트가 상단에 위치하는 경우, 왼쪽 SNS 버튼과 겹치지 않도록 위치 조절
	function setPosition($html) {
		var targetOffset = $html.offset(),
			css = { 'margin-left': 0 },
			htmlMarginLeft = parseInt($html.css('margin-left').replace('px', ''), 10);

		if (targetOffset.top < getLeftSnsPosition()) {
			//css.width = ARTICLE_SIZE.body - ARTICLE_SIZE.topDuplicationMargin;

			if ($html.hasClass('ab_subtitle')) {
				css['margin-left'] = 0;//ARTICLE_SIZE.topDuplicationMargin + htmlMarginLeft;
			} else {
				css['margin-left'] = ARTICLE_SIZE.topDuplicationMargin + htmlMarginLeft;
			}

			$html.css(css);
		}
	}

	function setPictorialHtml(obj) { /*parent, src, count, type, items*/
		var $t = obj.parent,
			src = utils.getPdsFullPath(obj.src),
			$html = $('<div class="ab_photo photo_center" data-type="' + obj.type + '" data-count="' + obj.count + '"></div>'),
			$btn = $('<span class="button"><span class="btn_all"><span class="icon">화보사진 모두보기</span>' + obj.count + '</span></span>');

		$html.append('<div class="image"><a href="#" data-viewer="' + obj.type + '" data-id="' + (obj.id || 0) + '"><img src="' + src + '" alt="" onerror="utils.imageErrorHandler(this)"><span class="mask"></span></a></div>');

		if (obj.title) {
			$html.append('<p class="caption">' + obj.title + '</p>');
		}

		$html.data('images', obj.items);
		$html.find('a').append($btn);

		$('a[data-viewer]', $html).imageViewer(obj.items);
		$t.replaceWith($html.css('width', ARTICLE_SIZE.body));
	}

	function setPictorialGalleryHtml(obj) { /*parent, src, count, type, items*/
		var html = '';
		obj.items.forEach(function (v) {
			html += '<div class="slide"><img src="' + v.Image + '" alt="" /></div>';
		});

		$("#tempContent").remove();
		$("#star_gallery").append(html);
		$("#content").show();
	}

	var imageCallFlag = 'N';
	function imageCallEvent(i) {
	    if (imageCallFlag == 'N') {
	        if (i > 0) {
	            var $imgIndex = $('img[data-src]', '#article_body').eq(i);
	            $imgIndex.attr('src', utils.getPdsFullPath($imgIndex.data('src')));
	        } else {
	            $('img[data-src]', '#article_body').each(function () {
	                if (!$(this).attr('src')) $(this).attr('src', utils.getPdsFullPath($(this).data('src')));
	            });
	            imageCallFlag = 'Y';
	        }
	    }
	}

	$.fn.articleComponent = function (options) {
		var $article = this;

		$article.articleGalleryTag();
		if (utils.config('articleType') != ARTICLE_TYPE.special) {
			$('div.tag_photoslide').show();
		}
		if (utils.config('articleType') == ARTICLE_TYPE.spGallery) {
			$('div.tag_photobundle', $article).articlePhotoBundleGallery();
			$('div.ab_photo.photo_center', $article).articlePhotoBundleGallery();
		} else {
		    $('div.ab_bundle', $article).articlePhotoBundle();
		}

		$('div[data-type=sns], div.tag_sns', $article).articleSns();
		$('.jtbc_vod, .tag_vod', $article).articleVod();
		$('div.tag_pictorial', $article).articlePictorial();
		$('div.tag_audio', $article).audioPlayer();
		$('div.tag_jplus_link', $article).articleJplusLink();
		$('div.jch_link', $article).articleJtbcLink();
		if ($('div.tag_chart', $article).length > 0) {
			$.getScript("https://www.gstatic.com/charts/loader.js").done(function () {
				$('div.tag_chart', $article).articleCharts();
			});
		}

	    //특정기사 예외처리 서울 학교 지도
		if ($("#total_id").val() == "23410238" || $("#total_id").val() == "23409734" || $("#total_id").val() == "23411619") {
		    var setBrPosi = 0;
		    $article.html($article.html().replace(/<br>(\s+)?(&nbsp;)?(\s+)?<br>/g, "<br><br>"));
		    //$("br + br", $article).eq(Math.floor(($("br + br", $article).length / 3) * 2)).seoulSchoolMap();
		    if ($("#total_id").val() == "23410238") {
		        setBrPosi = 21;
		    }
		    else if ($("#total_id").val() == "23409734") {
		        setBrPosi = 32;
		    }
		    else if ($("#total_id").val() == "23411619") {
		        setBrPosi = 12;
		    }
		    $("br + br", $article).eq(setBrPosi).seoulSchoolMap();
		}

        //스크롤이미지 
        $('#article_body > div.ab_photofix').each(function (i, item) {
            var $c = $(item).find("p.caption");
            $c.html('<span class="align_middle"><span class="valign">' + $c.text() + '</span></span>');
        });

		var photoIndex = 0;

		// 사진 크게보기
		// jam에서 스타기자 타입은 와이드 사용 시 ab_full class가 적용되면서 크게 보기 적용 일반 타입은 원본 이미지가 580보다 클 경우 적용, 돋보기 사용 시는 모두 원본 이미지가 580보다 클 경우 적용. 
		$('div.ab_photo.photo_center', $article).each(function (i) {

			var $photo = $(this),
				count = $photo.data('count');

			var imageSize = $photo.width();
			if (imageSize >= 580) {
				if (!$photo.data('type')) {
					$photo.data('type', 'cut');
					if (!count) {
						$photo.data('count', 1);
                    }
                    if (!(utils.config('articleType') == ARTICLE_TYPE.special && $photo.hasClass("ab_full")) && !(utils.config('articleType') == ARTICLE_TYPE.special && $photo.hasClass("photo_cover"))) {
                        $photo.find('.image').append('<span class="button"><span class="btn_enlarge" ><span class="icon">사진 크게보기</span></span></span>');
                    }
					$photo.find('.image').wrapInner('<a href="#" data-viewer="image" data-index="' + photoIndex + '"></a>');
					$photo.find('a').imageViewer();

				} else {
					$photo.find('a').data('index', photoIndex);
				}

				photoIndex += count || 1;
			}
		});

        //탐사하다 기사 더보기버튼
		if ($(".ab_more_view", $("#article_body")).length > 0) {
		    $(".ab_more_view", $("#article_body")).click(function () {
		        try{
		            $(".ab_more_content", $("#article_body")).show();
		            $(".ab_more_button", $("#article_body")).hide();
		            setADLogData("탐사하다 기사 더보기 버튼 클릭 PC - " + $("#total_id").val());
		        }
		        catch(ex){
		            //alert(ex.description);
		        }
		    });
		}

	    //이미지 호출
		if ($(document).scrollTop() > 0) {
		    imageCallEvent(0);
		} else {
		    if ($('img[data-src]', $article).length > 1) {
		        if ($('img[data-src]', $article).eq(1).offset().top < $(window).height()) {
		            imageCallEvent(1);
		        }
		    }
		    $(window).one('scroll resize', function () {
		        imageCallEvent(0);                
		    });
		}
	};

	/**
	 * 속보
	 */
	$.fn.articleNewsflash = function (options) {
		var $articleBody = this;

		if ($articleBody.find('.ab_topnews').length == 0) {
			utils.getJsonp({
				url: utils.config('apiPath') + '/static/breakingnews',
				success: render
			});
		}

		function render(d) {
			var html = '',
				template = '<div class="ab_topnews"><a data-bind="link" target="' + utils.decorators.target + '"></a></div>',
				freshTitle = '<img src="' + utils.config('imagePath') + '/pc/common/i_flash_news.png' + '" alt="속보">',
				exculusiveTitle = '<img src="' + utils.config('imagePath') + '/pc/common/i_exclusive_news.png' + '" alt="단독">',
				data = {},
				directives = { link: utils.decorators.link },
				$target = getRenderTarget($articleBody, 4);

			var $etcPhoto = $articleBody.find('div.html_photo_left, div.photo_left, div.html_photo_right, #criteo_network').first(),
				$children = $articleBody.children(),
				etcIndex = $children.index($etcPhoto),
				brIndex = $children.index($target);

			if ($etcPhoto.length > 0 && etcIndex == -1) {
				if (brIndex < 0) {
					$target = $etcPhoto;
				}
			} else {
				if ($etcPhoto.length > 0) {
					if (brIndex < 0) {
						$target = $etcPhoto;
					} else if (etcIndex < brIndex) {
						$target = etcIndex == 0 ? $articleBody : $etcPhoto;
					}
				}
			}

			if (d && d.item && d.item.Title) {
				data = { link: { href: d.item.Link, html: (d.item.IsFresh ? freshTitle + ' ' + d.item.Title : (d.item.IsExclusive ? exculusiveTitle + ' ' + d.item.Title : d.item.Title)) } };
				html = $.renderTemplate({ template: template, data: data, directives: directives });

				if ($target == $articleBody) {
					$target.append(html);
				} else {
					if (etcIndex > -1 && etcIndex < brIndex) {
						$target.before(html);
					} else {
						if (brIndex < 0) {
							$target.before(html);
						} else {
							$target.after(html);
						}
					}
				}

				$(html).find('a').each(function () {
					$(this).attr('href', utils.getClocUrl($(this).attr('href'), 'joongang|article|breaknews'));
				});

				utils.resetArticleSubWidget && utils.resetArticleSubWidget();
			}
		}
	};

	/*
	​<div class="tag_jplus_link" data-link="{링크 Url}" data-add-link="{추가 Url 정보}">
		<img class="tag_image" src="{이미지 Url}" alt="" /> 이미지 없는 경우, 태그 안들어옴.
		<div class="tag_title">{타이틀 정보}</div>
		<div class="tag_red">{Read 문 정보}</div>
	</div>
	*/
	/**
	 * 링크 (JPlus)
	 */
	$.fn.articleJplusLink = function () {
		function setHtml($target, data) {

			var $link = $('<div class="ab_url"><span class="icon"></span></div>'),
				imageHtml = '',
				textHtml = '';

			if ($target.length == 0) { return; }

			imageHtml = getImageHtml(data);
			textHtml = getTextHtml(data);

			function getImageHtml(data) {
				var html = '';

				if (data.imageSrc) {
					html = '<span class="thumb"><a href="' + data.link + '"><img src="' + data.imageSrc + '" alt="' + data.title + '"></a></span>';
				}

				return html;
			}

			function getTextHtml(data) {
				return '' +
				'<div class="text_wrap">' +
					'<div class="text_center">' +
						'<strong class="tit"><a href="' + data.link + '">' + data.title + '</a></strong>' +
						'<p class="read"><a href="' + data.link + '">' + data.read + '</a></p>' +
						'<em class="lnk_add"><a href="' + data.addLink + '">' + data.addLink + '</a></em>' +
					'</div>' +
					'<span class="valign"></span>' +
				'</div>';
			}

			$link.append(imageHtml).append(textHtml);
			$target.replaceWith($link);

			utils.resetArticleSubWidget && utils.resetArticleSubWidget();
		}

		return this.each(function (i, v) {
			var $c = $(v),
				data = $c.data();

			data.imageSrc = $c.find('img').length > 0 ? $c.find('img').attr('src') : '';
			data.title = $c.find('.tag_title').text() || '';
			data.read = $c.find('.tag_read').text() || '';

			setHtml($c, data);
		});
	};

	/**
	 * 화보
	 * @param options
	 */
	$.fn.articlePictorial = function () {
		return this.each(function (i, v) {
			var $p = $(v),
				id = $p.data('id');

			if (!id) { return; }

			utils.getJsonp({
				url: apiPath + '/gallery/' + id,
				success: callback
			});

			function callback(resData) {
				var objPictorial = {
					parent: $p,
					src: '',
					count: 0,
					type: 'photo',
					items: []
				};

				try {
					$.each(resData.List, function (i, v) {
						v.FileUrl = utils.getPdsFullPath(v.Image);
					});

					objPictorial.id = id;
					objPictorial.title = resData.Photo.Title;
					objPictorial.src = resData.List[0].FileUrl;
					objPictorial.count = resData.Photo.Count;
					objPictorial.items = resData.List;
				} catch (e) { utils.log(e); };

				setPictorialHtml(objPictorial);
			}
		});
	};

	$.fn.articlePhotoBundle = function () {
	    return this.each(function (i, v) {
		    var $bundle = $(v), $img = $bundle.find('img');
		    if (!$img.length) return;
		    
		    var items = [];
		    $img.each(function (i) {
		        var $this = $(this), item = {};

		        item.Image = $this.data('src') || $this.attr('src');
		        item.Description = $this.attr('alt');

		        items.push(item);
		    });
		    
		    $bundle.data('images', items);
		    $('a[data-viewer]', $bundle).imageViewer();

		    $bundle.attr('class', 'ab_photo photo_center').css('width', ARTICLE_SIZE.body);
		});
	};

	$.fn.articlePhotoBundleGallery = function () {
		return this.each(function (i, v) {
			var $p = $(v),
				$items = $p.find('img'),
				data = [];
			if (!$items.length) { return; }

			$items.each(function () {

				var $this = $(this),
					obj = {};

				obj.Image = $this.data('src') || $this.attr('src');
				obj.Description = $this.data('desc') || $this.attr('caption');
				obj.Caption = $this.attr('caption') || $this.attr('alt');
				data.push(obj);
			});

			//utils.log(data);
			//utils.log('## articlePhotoBundle');
			setPictorialGalleryHtml({
				parent: $p,
				src: data[0].Image,
				title: data[0].Description,
				leadCaption: data[0].Caption,
				count: $items.length,
				type: 'image',
				items: data
			});
		});
	};

	/**
	 * 갤러리 Tag
	 * @param options
	 */
	$.fn.articleGalleryTag = function (options) {
		var defaults = {},
			config = $.extend(true, defaults, options),
			$articleBody = this,
			oldTextFilter = '<!--@gallery_in_article_tag@-->',
			$imgItems = $("> div > .html_photo_center > img", $articleBody),
            $oldImgItems = $("img[src^='/component/htmlphoto_mmdata/']", $articleBody),
			imageList = [];

		// 기사내 화보 관련 함수들 시작
		var gallery_in_article_logging_type = 0;
		var images_index_in_gallery = 0;
		var images_count_in_article = 0;
		var images_in_article = new Array();

		function migration_to_gallery() {
			try {
				var _check_str = $("#article_content").html();
				if (_check_str.indexOf("<!--@gallery_in_article_tag@-->") != -1 && $("#article_content > div div img").length >= 2) {

					// 작업으로 인한 br 제거
					var nMaxRemoveCount = $("#article_content > div > .html_photo_center > img").length;
					var PVCount = $("img[orgImg]", $("#article_content")).length;

					if (PVCount > 0) {
						fnGetPhotoViewer("g", 0);
					}

					var bDeletable = false;
					for (var x = 0; x < 3; x++) {
						var sPrevTag = "";
						var nContinuousTag = 0;
						$("#article_content").children().each(function (idx, item) {
							if (this.tagName.toLowerCase() == "div" && sPrevTag != "div") {
								bDeletable = true;
							}
							if (this.tagName.toLowerCase() == "div" && sPrevTag == "div") {
								nContinuousTag++;
							}
							if (this.tagName.toLowerCase() == "div" && this.className == "article_msn_ad") {
								return false;
							} // 본문내 광고 영역을 만나면 탈출
							if (nContinuousTag >= (nMaxRemoveCount - 1)) {
								return false;
							} // 화보용 이미지 개수보다 많은 div가 연속되서 나와도 탈출 (-1은 최초 div가 연속이 아니라서)

							if (bDeletable == true && this.tagName.toLowerCase() == "br") {
								$(item).remove();
								bDeletable = false;
							}
							sPrevTag = this.tagName.toLowerCase();
						});
						bDeletable = false;
					}

					$("#article_content > div").each(function (idx, item) {
						var x = $(item).children(".html_photo_center").children("img").attr("src");
						if (typeof (x) != "undefined") {
							images_in_article[images_count_in_article++] = x;
							$(item).remove();
						}
					});

					/*$("#article_content").children().each(function(idx, item) { // 작업으로 인한 br 제거
						if( this.tagName.toLowerCase() == "br") { $(item).remove(); }
						else { return false; }
					});*/

					var rq_url = document.location.href.toString().toLowerCase();
					if (rq_url.indexOf("/article/aid/") >= 0) {
						gallery_in_article_logging_type = 1;
					}

					// 이제 이미지 노출 시작
					var codes_for_gallery_in_article = "<div class=\"article_photo\">";
					codes_for_gallery_in_article += "	<div class=\"bd cfx\">";
					codes_for_gallery_in_article += "		<span class=\"prv\" title=\"prev\" onclick=\"javascript:refresh_image_in_gallery('left',''," + PVCount + ");\"><span>prev</span></span>";
					codes_for_gallery_in_article += "		<!--  article photo -->";
					codes_for_gallery_in_article += "		<span class=\"article_photo_area\">";
					codes_for_gallery_in_article += "			<iframe title=\"빈프레임\" id=\"gallery_in_article_f\" src=\"about:blank\" style=\"width:600px;height:200px;border:0px;\" scrolling=\"no\" frameborder=\"0\"></iframe>";
					codes_for_gallery_in_article += "		</span>";
					codes_for_gallery_in_article += "		<!--  //article photo -->";
					codes_for_gallery_in_article += "		<span class=\"nxt\" title=\"next\" onclick=\"javascript:refresh_image_in_gallery('right',''," + PVCount + ");\"><span>next</span></span>";
					codes_for_gallery_in_article += "	</div><!-- /bd -->";
					codes_for_gallery_in_article += "	<div class=\"ft\">";
					codes_for_gallery_in_article += "		<ul>";
					for (var x = 0; x < images_in_article.length && x < 6; x++) {
						codes_for_gallery_in_article += "		<li id=\"thumbnail_in_gallery_" + x + "\"><span class=\"photo\"><a href=\"javascript:refresh_image_in_gallery('set','" + x + "'," + PVCount + ");\" class=\"photo\"><img alt=\"\" src=\"" + images_in_article[x] + ".tn_120.jpg\" onerror=\"this.src='" + utils.config('imageRootPath') + "/ui_portal/portal2010/common/v_noimg_110_120.gif'\" /></a></span><em></em></li>";
					}
					codes_for_gallery_in_article += "		</ul>";
					codes_for_gallery_in_article += "	</div><!-- /ft -->";
					codes_for_gallery_in_article += "</div>";
					//$("#articlebody").prepend(codes_for_gallery_in_article);
					$("#article_content").prepend(codes_for_gallery_in_article);
					gallery_in_article_show(0, PVCount); // 최초 호출시에는 카운트 로그 안되도록 조정, 썸네일을 찍거나 좌우 버튼을 이용할때 로깅
				}
			} catch (ex) {
			}
		}

		//관련포토/관련화보
		function getRelateGallery(type, cid, areaName) {
			var sCompPath,
				sCompHtml,
				sGalleryLinkUrl;
			if (type.toString().length <= 0 || cid.toString() == "0" || cid.toString().length <= 0) {
				if (areaName && areaName.length > 0) {
					$("#" + areaName).css({ "display": "none" });
				}
				return;
			}
			type = type.toUpperCase();
			if (type == "P") {
				//콤포넌트에서 관리하는 내용들은 콤포넌트에서 관리하므로 콤포넌트 아이디로 js를 생성하지만
				//이건 포토기사 아이디가 넘어오므로 기사아이디로 파일을 생성한다.
				//다만 겹칠수 있기때문에.. 앞에 "P_" or "G"를 붙여준다.
				//중간 경로는 sourcecode로 생성하지 않고 comptype("P" or "G")로 생성한다.
				sCompPath = sStaticCompDomain + "component/" + type + "/" + cid.substring(cid.length - 3) + "/P_" + cid + ".js";
				$.getScript(sCompPath, function () {
					try {
						if (typeof (P_JSON) != "undefined") {
							sCompHtml = "";
							/*
						P_JSON.data[nIdx].num
						P_JSON.data[nIdx].total_id
						P_JSON.data[nIdx].title
						P_JSON.data[nIdx].path
						P_JSON.data[nIdx].title
						*/
							for (var nIdx = 0; nIdx < P_JSON.data.length; nIdx++) {
								if (P_JSON.data[nIdx].path.indexOf(".jpg") > 0 || P_JSON.data[nIdx].path.indexOf(".JPG") > 0) {
									sCompHtml += "<span>";
									sCompHtml += "	<a href=\"" + sPhotoPageUrl + "total_id=" + P_JSON.data[nIdx].total_id + "\"><img src=\"" + sPdsServerDomain + P_JSON.data[nIdx].path + ".tn_350.jpg\" style=\"height:190px;\" /></a>";
									sCompHtml += "	<em><a href=\"" + sPhotoPageUrl + "total_id=" + P_JSON.data[nIdx].total_id + "\"><img src=\"" + utils.config('imageRootPath') + "/ui_portal/portal2010/common/i_more_p.png\" alt=\"사진더보기\" class=\"png24\" /></a></em>";
									sCompHtml += "</span>";
									sCompHtml += "<a href=\"" + sPhotoPageUrl + "total_id=" + P_JSON.data[nIdx].total_id + "\">" + P_JSON.data[nIdx].title + "</a>";
								}
							}
							if (areaName && areaName.length > 0) {
								$("#" + areaName).html(sCompHtml).css({ "display": "" });
								displayArticleArea("PHOTO");
							} else {
								return sCompHtml;
							}
						} else {
							fnCallMakeJson(cid, type, "getRelateGallery('" + type + "', '" + cid + "', '" + areaName + "')");
						}
					} catch (e) {
						if (areaName && areaName.length > 0) {
							$("#" + areaName).css({ "display": "none" });
						}
						alertErrorMsg(e);
					}
				}
				);
			} else if (type == "G") {
				//콤포넌트에서 관리하는 내용들은 콤포넌트에서 관리하므로 콤포넌트 아이디로 js를 생성하지만
				//이건 포토기사 아이디가 넘어오므로 기사아이디로 파일을 생성한다.
				//다만 겹칠수 있기때문에.. 앞에 "P_" or "G"를 붙여준다.
				//중간 경로는 sourcecode로 생성하지 않고 comptype("P" or "G")로 생성한다.
				sCompPath = sStaticCompDomain + "component/" + type + "/" + cid.substring(cid.length - 3) + "/G_" + cid + ".js";
				$.getScript(sCompPath, function () {
					try {
						if (typeof (G_JSON) != "undefined") {
							sCompHtml = "";
							/*
						G_JSON.data[nIdx].m_id
						G_JSON.data[nIdx].title
						G_JSON.data[nIdx].path
						G_JSON.data[nIdx].desc
						*/
							for (var nIdx = 0; nIdx < G_JSON.data.length; nIdx++) {
								sGalleryLinkUrl = "window.open('" + sGallaryPageUrl + "m_id=" + G_JSON.data[nIdx].m_id + "&g_type=first', 'photo_gallery','toolbar=no,location=no,directory=no,status=no,menubar=no,scrollbars=no,resizable=no,top=0,left=0,width=960,height=715');";
								sCompHtml += "<span>";
								sCompHtml += "	<a onclick=\"" + sGalleryLinkUrl + "\" style=\"cursor:pointer;\"><img src=\"" + sPdsServerDomain + G_JSON.data[nIdx].path + "\" style=\"height:190px;\" /></a>";
								sCompHtml += "	<em><a onclick=\"" + sGalleryLinkUrl + "\" style=\"cursor:pointer;\"><img src=\"" + utils.config('imageRootPath') + "/ui_portal/portal2010/common/i_more_p.png\" alt=\"사진더보기\" class=\"png24\" /></a></em>";
								sCompHtml += "</span>";
								sCompHtml += "<a onclick=\"" + sGalleryLinkUrl + "\" style=\"cursor:pointer;\">" + G_JSON.data[nIdx].title + "</a>";
							}
							if (areaName && areaName.length > 0) {
								$("#" + areaName).html(sCompHtml).css({ "display": "" });
								displayArticleArea("GALLERY");
							} else {
								return sCompHtml;
							}
						} else {
							fnCallMakeJson(cid, type, "getRelateGallery('" + type + "', '" + cid + "', '" + areaName + "')");
						}
					} catch (e) {
						if (areaName && areaName.length > 0) {
							$("#" + areaName).css({ "display": "none" });
						}
						alertErrorMsg(e);
					}
				}
				);
			} else {
				if (areaName && areaName.length > 0) {
					$("#" + areaName).css({ "display": "none" });
				}
			}
		}

		function setGalleryForOld() {
			var src = $imgItems.first().data('src') || $imgItems.first().attr('src'),
				data = [];

			$imgItems.each(function () {
				var $this = $(this),
					obj = {};

				obj.Image = $this.data('src') || $this.attr('src');
				obj.Name = $this.data('name') || $this.attr('name');
				obj.Description = $this.data('desc') || $this.attr('alt');

				data.push(obj);
			});

			setPictorialHtml({
				parent: $imgItems.first().parent().parent(),
				src: src,
				title: data[0].Description,
				count: $imgItems.length,
				type: 'image',
				items: data
			});

			removeItem();

			function removeItem() {
				$imgItems.each(function (idx, item) {
					var $imageWrap = $(item).parent().parent();
					removeBr($imageWrap);
					$imageWrap.remove();
				});

				function removeBr($d) {
					var $next = $d.next();

					if ($next.length > 0 && $next[0].tagName.toLowerCase() == 'br') {
						$next.remove();
						removeBr($d);
					}
				}
			}
		}

		//2010년도 이전 이미지 수정 (경로가 "/component/htmlphoto_mmdata"로 시작하는 이미지에 도메인 붙여넣기)
		$oldImgItems.each(function () {
			var pdsPath = utils.config('pdsPath');
			$(this).attr("src", pdsPath + "/news" + $(this).attr("src"));
		});

		return this.each(function () {
			var bodyHtml = $articleBody.html();
			// old version check
			if (bodyHtml.indexOf(oldTextFilter) != -1 && $imgItems.length > 1) {
				//utils.log('## articleGallery init');
				setGalleryForOld();
			}
			// TODO : new version check.
		});
	};
	/**
	 *
	 * @param options
	 * <div id='div_NV10108435' class='jtbc_vod'></div>
	 */
	//http://news.jtbc.joins.com/vod/getvod.aspx?vod_id=NV10010001
	//http://home.jtbc.joins.com/vod/getvod.aspx?vod_id=VO10010109
	$.fn.articleVod = function (options) {
		//utils.log('## articleVod');
		var defaults = {
			body: '#article_body',
			vodIds: []
		},
			refType = { joongang: '1', ilgan: '2' },
			cRefType = refType.joongang, // 중앙
			articleType = utils.config('articleType'),
			config = $.extend(true, defaults, options);

		var VodPlayList = {};

		// 일간 (http://isplus.joins.com, http://isplus.live.joins.com)
		if (location.host.indexOf('isplus') > -1) {
			cRefType = refType.ilgan;
		}

		function fnGetParamValue(searchStr, getKey) {
			try {
				var aParams = fnGetParamArray(searchStr)
				if (aParams[getKey]) { return aParams[getKey]; } else { return ""; }
			} catch (e) { return ""; }
		}

		function fnGetParamArray(searchStr) {
			try {
				var aParams = new Array(), sParams = searchStr.split("?")[1].toString().replace(/&amp;/ig, "&");
				for (var nIdx = 0; nIdx < sParams.split("&").length; nIdx++) {
					if (sParams.split("&")[nIdx].toString().indexOf("=") > -1) {
						aParams[sParams.split("&")[nIdx].split("=")[0].toString()] = sParams.split("&")[nIdx].split("=")[1].toString();
					} else {
						aParams[sParams.split("&")[nIdx].toString()] = true;
					}
				}
				return aParams;
			} catch (e) { return new Array(); }
		}

		function mobile_device_detect() {
			var UserAgent = navigator.userAgent,
				rtn = "W";

			if (UserAgent.match(/iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null) {
				rtn = "M";
			} else if (UserAgent.match(/iPad|iphone/i) != null) {
				rtn = "P";
			}

			return rtn;
		}

		function fnVodPlayForJtbc(vodConfig, ref, options, $ele) {
		    $.when(
                $.getScript("https://nstatic.jtbc.joins.com/jtbcplayer/1.0.0/js/jtbcplayer.min.js"),
                $.Deferred(function (deferred) {
                    $(deferred.resolve);
                })
            ).done(function () {
                // 기본 옵션
                var type = vodConfig.service;
                var vod_id = vodConfig.id;
                var default_options = { width: 579, height: 353, image: "", userid: "", ad_presn: "", ad_postsn: "", ad_vt: "N" };
                // param으로 들어온 옵션을 기본 옵션과 병합
                var opts = $.extend({}, default_options, options);

                var _vod_memid = "";
                try {
                    _vod_memid = getCookieA("MemArray", "MemID");
                } catch (e) {
                }

                var device_info = mobile_device_detect();
                var url = utils.config('jtbcNewsPath') + '/vod/getvod.aspx?vod_id=' + vod_id + "&m=" + device_info;

                if (type == SERVICE_TYPE.jtbc) url = utils.config('jtbcNewsPath') + '/vod/getvod3.aspx?vod_id=' + vod_id + "&m=" + device_info;

                utils.getJsonp({
                    url: url,
                    success: function (res) {
                        if (res != null && res != {}) {
                            var vodInfo = res;
                            var params = {};
                            params.width = opts.width;
                            params.height = opts.height - 20;

                            /* option으로 이미지정보가 들어오는 경우 동영상 썸네일 이미지를 그것으로 대체, 기본은 동영상에 연결된 섬네일로 보임 */
                            if (opts.image != "") {
                                params.image = opts.image;
                            } else {
                                params.image = vodInfo.img_url;
                            }
                            if (!vodInfo.mobile_file_url) {
                                return; /* 동영상 파일정보 없음 */
                            }

                            if (typeof (vodInfo.mobile_file_url) != "undefined" && vodInfo.mobile_file_url.indexOf("rtmp://") > -1) {
                                var arr_file_url = vodInfo.mobile_file_url.split("&file=");
                                params.provider = "http";
                                params.streamer = escape(arr_file_url[0]);
                                params.file = escape(arr_file_url[1]);
                            } else {
                                params.file = vodInfo.mobile_file_url;
                                params.provider = vodInfo.mobile_file_url.substring(0, 4);
                            }

                            var _vod_packcode = "",
                                _vod_pay = "N",
                                _vod_paydiv = "00",
                                _vod_payamount = "0";

                            var capDiv = vodConfig.caption.trim().length > 0 ? '<p class="caption">' + vodConfig.caption + '</p>' : '';
                            var $newDiv = $('<div class="ab_player"><div class="player_area"><div id="div_' + vod_id + '" class="player_area"></div></div>' + capDiv + '</div>');
                            $ele.replaceWith($newDiv);

                            if ($ele.length > 0) {
                                jtbcplayer('div_' + vod_id).setup({
                                    'width': '100%',
                                    'image': params.image,
                                    'height': params.height,
                                    'file': vodInfo.mobile_file_url
                                });
                            } // end of check "div_"+ vod_id area

                            //console.log(vodInfo.mobile_file_url);
                            if ($("#div_" + vod_id).length > 0) {
                                VodPlayList[vod_id] = "false";
                                // Play Log
                                if (jtbcplayer && jtbcplayer('div_' + vod_id)) {
                                    jtbcplayer('div_' + vod_id).onPlay(function () {
                                        if (VodPlayList[vod_id] == "false") {
                                            VodPlayList[vod_id] = "true"; // 최초 1회만 로그카운트 기록 수행
                                            var vod_logger = utils.config('jtbcCounterPath') + "/bin/ArticleCounterLogger.dll?Total_ID=" + vod_id + "&Ctg_ID=00&Master_Code=&comm1=" + _vod_pay + "&comm2=" + _vod_paydiv + "&comm3=" + _vod_payamount + "&memid=" + opts.userid + "&gubun=" + device_info + "&cloc=&ref=" + ((typeof (ref) != "undefined") ? ref : "") + "&svc=T";
                                            $("body").append("<iframe src='" + vod_logger + "' width='0' height='0' style='display:none'></iframe>");
                                        }
                                    });
                                }
                            }
                            utils.resetArticleSubWidget && utils.resetArticleSubWidget();
                        }
                    }
                });
            });
		}

		var SERVICE_TYPE = {
			jtbc: 'jtbc',
			news: 'news',
			youtube: 'youtube',
			wsj: 'wsj', // wallstreet journal.
			ovp: 'ovp',
			ovplive: 'ovplive',
			navercast: 'navercast', // 타입추가 (네이버 캐스트)
			fblive: 'facebooklive', // 타입추가 (페이스북 라이브)
			kakaotv: 'kakaotv', // 타입추가 (카카오TV)
			ooyala: 'ooyala', // 타입추가 (신규ovp) 
			ooyalalive: 'ooyalalive' // 타입추가 (신규ovplive)
		};

		function setVodPlayerForIFrame($target, config, options) {
            var $iframeWrap = $('<div class="ab_player"><div class="player_area"><iframe></iframe></div></div>'),
                //width = options.width,
                width = 580,
                height = 326,
                url = config.id;

            if (config.service === "youtube") {
                url = 'https://www.youtube.com/embed/' + getYouTubId(config.id) + '?wmode=transparent';
            } else if (config.service === "navercast") {
                url = config.id.replace("/v/", "/embed/");
            }

	        var iframeAttr = { allowfullscreen: true, webkitallowfullscreen: true, mozallowfullscreen: true, frameborder: 0, scrolling: 'no', width: width, height: height, src: url };

            $("iframe", $iframeWrap).attr(iframeAttr);
			if ($.trim(config.caption).length > 0) {
				$iframeWrap.append($('<p class="caption"></p>').text(config.caption));
			}
			$target.replaceWith($iframeWrap);
			utils.resetArticleSubWidget && utils.resetArticleSubWidget();

			function getYouTubId(url) { var arrUrl = url.split('/'); return arrUrl[arrUrl.length - 1]; }
		}

		function serviceCheck(serv) {
			var servicecode = "";

			switch (serv) {
				case "10": case "28": case "24":
					servicecode = "10";
					break;
				case "11": case "16":
					servicecode = "11";
					break;
				case "12": case "22":
					servicecode = "12";
					break;
				case "13":
					servicecode = "13";
					break;
				case "14":
					servicecode = "14";
					break;
				case "15": case "36":
					servicecode = "15";
					break;
				case "17":
					servicecode = "17";
					break;
				case "20": case "27":
					servicecode = "20";
					break;
				case "35":
					servicecode = "35";
					break;
				default:
					servicecode = "00";
			}
			return servicecode;
		}

		var ooyalacnt = 0;

		function setVodPlayerForOvp($target, config, options) {
			var params = config.id.slice(config.id.indexOf('?') + 1).split('&');
			var rotype = "";
			var ovpRecommendType = 0;
			var target = $target;
			var autoplay = false;
			var loop = false;
			var mute = false;
			var upjam = false;

			if ($.trim(config.ro).length > 0) {
				rotype = config.ro;
			}
			if ($.trim(config.rc).length > 0) {
				ovpRecommendType = config.rc;
			}
			if ($.trim(config.autoPlay).length > 0 || $.trim(config.autoplay).length > 0) {
				if (config.autoPlay == true || config.autoplay == true) {
					autoplay = true;
				}
			}
			if ($.trim(config.loop).length > 0) {
				loop = config.loop;
			}
			if ($.trim(config.mute).length > 0) {
				if (config.mute == true) {
					mute = true;
				}
			}

			var szHtml = [];
			var url = config.id;
			var org_id = config.id;

			if (url.indexOf('?') >= 0) {
				url = config.id.substring(0, url.indexOf('?'));
				org_id = url;
			}

			var servcode = serviceCheck($("#servcode").val());
			var rq_url = document.location.href.toString().toLowerCase();
			var adinfo = "id=" + utils.getCookie("PCID") + "&name=joongangnews&section=" + servcode;

			var ovpUrl = (url.length > 20) ? 'https://oya.joins.com/bc_iframe.html?ec=' : 'https://oya.joins.com/bc_iframe.html?videoId=';
			url = ovpUrl + url + "&options[autoplay]=" + autoplay + "&options[loop]=" + loop + "&options[muteFirstPlay]=" + mute;
			url += "&docUrl=" + encodeURIComponent(rq_url);
			url += "&adinfo=" + encodeURIComponent(adinfo);

			var width = 580; height = 326;
			$(target).removeAttr('data-service');
			$(target).removeAttr('data-src');
			$(target).removeAttr('class');
			if (rotype == 2) {
				szHtml.push('<div class="ab_player ovp_player ovp_player1-1">');
				width = 435; height = 435;
			} else if (rotype == 3) {
				szHtml.push('<div class="ab_player ovp_player ovp_player9-16">');
				width = 326; height = 580;
			} else {
				szHtml.push('<div class="ab_player ovp_player ovp_player16-9">');
			}
			szHtml.push('	<div class="player_area">');
			szHtml.push('		<iframe id="ooyala_ovp" style="display:none" width="' + width + '" height="' + height + '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>');
			szHtml.push('	</div>');
			if ($.trim(config.caption).length > 0) {
				szHtml.push('	<p class="caption">' + config.caption + '</p>');
			}
			szHtml.push('</div>');
			$(target).html(szHtml.join(''));
			$(target).find("iframe").attr('src', url);
			$(target).removeAttr('data-id');
			$(target).find('iframe').show();

			if (utils.config('articleType') != ARTICLE_TYPE.spTimeLine && rotype != 3 && ovpRecommendType > 0) setOvpRecommend($target, rotype, ovpRecommendType); //추천동영상

			utils.resetArticleSubWidget && utils.resetArticleSubWidget();

			ooyalacnt++;
		}

		function setVodPlayerForOvpLive($target, config, options) {
			var params = config.id.slice(config.id.indexOf('?') + 1).split('&');
			var target = $target;
			var autoplay = false;
			var mute = false;

			if ($.trim(config.autoPlay).length > 0 || $.trim(config.autoplay).length > 0) {
				if (config.autoPlay == true || config.autoplay == true) {
					autoplay = true;
				}
			}

			if ($.trim(config.mute).length > 0) {
				if (config.mute == true) {
					mute = true;
				}
			}

			var szHtml = [];
			var url = config.id;

			if (url.indexOf('?') >= 0) {
				url = config.id.substring(0, url.indexOf('?'));
			}

			var rq_url = document.location.href.toString().toLowerCase();

			var ovpUrl = (url.length > 20) ? 'https://oya.joins.com/bc_iframe.html?ec=' : 'https://oya.joins.com/bc_iframe.html?videoId=';
			url = ovpUrl + url + "&options[autoplay]=" + autoplay + "&options[muteFirstPlay]=" + mute;
			url += "&docUrl=" + encodeURIComponent(rq_url);

			var width = 580; height = 326;
			$(target).removeAttr('data-service');
			$(target).removeAttr('data-src');
			$(target).removeAttr('class');

			szHtml.push('<div class="ab_player ovp_player ovp_player16-9">');
			szHtml.push('	<div class="player_area">');
			szHtml.push('		<iframe id="ooyala_ovp" style="display:none" width="' + width + '" height="' + height + '" frameborder="0" allow="autoplay; fullscreen"  allowfullscreen></iframe>');
			szHtml.push('	</div>');
			if ($.trim(config.caption).length > 0) {
				szHtml.push('	<p class="caption">' + config.caption + '</p>');
			}
			szHtml.push('</div>');

			$(target).html(szHtml.join(''));
			$(target).find("iframe").attr('src', url);
			$(target).removeAttr('data-id');
			$(target).find('iframe').show();

			utils.resetArticleSubWidget && utils.resetArticleSubWidget();
		}

		function setOvpRecommend($player, ro, type) {
			var PDS_DOMAIN = utils.config('pdsPath');
			var szHtml = [];
			var opt = (type == 3) ? 2 : 1;
			var cruzUrl = [];
			var cnt = 9;
			if (ro == "2") cnt = 6;

			cruzUrl.push(utils.config('cruzPath') + '/vod?');
			cruzUrl.push("th=Y");
			cruzUrl.push("&tid=" + utils.getTotalId());
			cruzUrl.push("&cnt=" + cnt);
			cruzUrl.push("&rnd=Y");
			cruzUrl.push("&opt=" + opt);
			if (type == 1) {
				cruzUrl.push('&scd=' + $("#servcode").val());
				cruzUrl.push('&from=7d');
			} else if (type == 2) {
				cruzUrl.push('&from=3d');
			} else if (type == 3) {
				cruzUrl.push('&from=3d');
			}

			$.ajax({
				type: 'GET',
				url: cruzUrl.join(''),
				dataType: 'json',
				success: function (res) {
					if (res.length > 0) {
						szHtml.push('<div class="ovp_recommend"> ');
						szHtml.push('   <div class="hd">');
						szHtml.push('       <button type="button" class="btn_more" title="추천영상 더보기"><span>추천영상 더보기</span></button>');
						szHtml.push('   </div>');
						szHtml.push('   <div class="bd">');
						szHtml.push('       <ul class="clearfx ovp_recommend_ul">');
						$.each(res, function (i, r) {
							szHtml.push('   <li>');
							szHtml.push('   <span class="thumb"><a href="' + utils.getUrlFormat("article", r.total_id) + '?cloc=joongang|article|vodrecom2" target="_blank"><img src="' + utils.getIrPath(utils.getPdsFullPath(r.art_thumb).replace("dev.", ""), 146, 82, "", "ebebeb") + '" alt=""><span class="icon_video"></span></a></span>');
							szHtml.push('   <span class="text_area">');
							szHtml.push('   <strong class="headline"><a href="' + utils.getUrlFormat("article", r.total_id) + '?cloc=joongang|article|vodrecom2">' + r.art_title + '</a></strong>');
							szHtml.push('   </span>');
							szHtml.push('   </li>');
						});
						szHtml.push('       </ul>');
						szHtml.push('       <button type="button" class="btn-prev"><span>추천영상 이전</span></button>');
						szHtml.push('       <button type="button" class="btn-next"><span>추천영상 다음</span></button>');
						szHtml.push('   </div>');
						szHtml.push('</div>');

						$player.find(".ab_player").append(szHtml.join(''));
						$player.find(".ovp_recommend").find(".btn_more").on('click', function (e) {
							e.preventDefault();
							e.stopPropagation();
							$(this).parent().parent().toggleClass("open");
						});
						var recommnedCount = 0;
						if (ro == 1) {
							recommnedCount = 3
						} else if (ro == 2) {
							recommnedCount = 2
						}
						$player.find('.ovp_recommend_ul').slideMotion({
							infinite: true,
							slidesToShow: recommnedCount,
							slidesToScroll: 1,
							swipe: false,
							prevArrow: $player.find('.btn-prev'),
							nextArrow: $player.find('.btn-next')
						});
					}
				}
			});
		}

		function getParamString(params) {
			var strParams = '';//'?';
			$.each(params, function (i, v) {
				if (v != '') {
					if (strParams.length > 0) {
						strParams += "&"
					}
					strParams += i + '=' + v;
				}
			});
			return '?' + strParams;
		}

		function getVodId($ele) {
			var id = '';
			// Legacy 대응.
			if ($ele.hasClass('jtbc_vod')) {
				id = $ele[0].id.substr(4);
			} else {
				id = $ele.data('id');
			}
			return id;
		}

		function getService(id) {
			var s = ''; // default : youtube.
			if (id.substring(0, 2) == "NV") {
				s = SERVICE_TYPE.news;
			} else if (id.substring(0, 2) == "VO") {
				s = SERVICE_TYPE.jtbc;
			}
			return s;
		}

		return this.each(function (i, v) {
			var $ele = $(v),
				vodConfig = { id: '', service: SERVICE_TYPE.jtbc, caption: '' },
				ratio = 0.6,
				width = ARTICLE_SIZE.body,
				height = parseInt(width * ratio, 10),
				options = { 'width': width, 'height': height, "ad_presn": 309, "ad_postsn": 324 };

			// Legacy Code
			//$ele.css({ "width": $('#article_body').width(), "text-align": "center"});

			// TODO : * Vod List 정보에 대한 처리.
			// TODO : config 로 들어오는 vodIds 정보와 비교하여 Content 에서 삭제되어 있는 동영상에 대한 Dom 을 추가 해주는 작업이 Legacy 에 존재함.
			// TODO : 당일 정보로 들어오던 vodId 가 리스트 형식으로 바뀔 예정임으로 작업 대기.
			vodConfig.id = getVodId($ele);
			vodConfig.service = getService(vodConfig.id) || $ele.data('service');
			vodConfig.caption = $ele.attr("data-caption") || "";

			//utils.log('^^^^^^^^^^^^^^^^^^^^');
			//utils.log(vodConfig);

			if (!vodConfig.id) {
				return;
			}

			// ovp 추가
			if (vodConfig.service == SERVICE_TYPE.ovp || vodConfig.service == SERVICE_TYPE.ovplive || vodConfig.service == SERVICE_TYPE.ooyala || vodConfig.service == SERVICE_TYPE.ooyalalive) {
				var aVodOpt = fnGetParamArray(vodConfig.id);
				for (var key in aVodOpt) { vodConfig[key] = aVodOpt[key]; }
			}

			if (articleType == ARTICLE_TYPE.piki || articleType == ARTICLE_TYPE.live) {

			}

			if (utils.config('pageType') == PAGE_TYPE.article || utils.menu.getPageMenuKey().toLowerCase().indexOf('election2017') !== -1) {
				options.width = $ele.parent().width();
				options.height = parseInt(options.width * ratio, 10);
			} else {
				options.width = $ele.outerWidth();
				options.height = $ele.outerHeight(); //parseInt(options.width * ratio, 10);
			}

			if ((vodConfig.service == SERVICE_TYPE.jtbc || vodConfig.service == SERVICE_TYPE.news) && $ele.outerWidth() <= 0) {
				if (location.host.indexOf('jcms.') > -1) {
					options.width = 380;
					options.height = parseInt(options.width * ratio, 10);
				}
			}

			//utils.log($ele.parent());
			//utils.log('$$$ options');
			//utils.log(options);

			// 뉴스용 플레이어입니다. Jucode의 앞 두자리로 비교해서 분기문 처리 해서 방송, 제보쪽 작업 진행하셔야 할듯...
			// GetVod는 news도메인에 있는 뉴스DB를 조회하게 되니 이쪽으로 id넘겨봐야 데이타 없어요.
			if (vodConfig.service == SERVICE_TYPE.jtbc || vodConfig.service == SERVICE_TYPE.news) {
				fnVodPlayForJtbc(vodConfig, cRefType, options, $ele);
			} else if (vodConfig.service == SERVICE_TYPE.ovp || vodConfig.service == SERVICE_TYPE.ooyala) {
				setVodPlayerForOvp($ele, vodConfig, options);
			} else if (vodConfig.service == SERVICE_TYPE.ovplive || vodConfig.service == SERVICE_TYPE.ooyalalive) {
				setVodPlayerForOvpLive($ele, vodConfig, options);
			} else if (vodConfig.service == SERVICE_TYPE.wsj || vodConfig.service == SERVICE_TYPE.navercast || vodConfig.service == SERVICE_TYPE.fblive || vodConfig.service == SERVICE_TYPE.kakaotv || vodConfig.service == SERVICE_TYPE.youtube) {
				setVodPlayerForIFrame($ele, vodConfig, options);
			} else {
				utils.error('ARTICLE COMPONENT ERROR : not defined vod service.', true);
			}
		});
	};

	/**
	 * SNS Card 컴포넌트
	 */
	$.fn.articleSns = function () {
		var services = {
			load: {
				twitter: function (v, id) {
					//if (window.twttr === undefined) {
					scriptLoader('twitter-wjs', 'https://platform.twitter.com/widgets.js');
					//}
				},
				facebook: function () {
					if (window.FB) {
						window.FB.init({ appId: '1011513095546498', version: 'v2.4' });
						window.FB.XFBML.parse();
					} else {
						scriptLoader('facebook-jssdk', '//connect.facebook.net/ko_KR/all.js#xfbml=1&version=v2.2');
					}
				},
				google: function (v, id) {
					scriptLoader('google-sdk', 'https://apis.google.com/js/platform.js');
				},
				pinterest: function (v, id) {
					scriptLoader('pinterest-sdk', '//assets.pinterest.com/js/pinit_main.js');
				},
				instagram: function (v, id) {
					if (window.instgrm) {
						instgrm.Embeds.process()
					} else {
						scriptLoader('instagram', '//platform.instagram.com/en_US/embeds.js');
					}
				}
			},
			html: {
				twitter: '<div class="ab_sns" data-twttr-id="twttr-sandbox-0"><span class="icon_twitter">twitter</span><blockquote class="component_sns twitter-tweet" lang="ko"><a href="{data.url}"></a></blockquote></div>',
				facebook: '<div class="ab_sns"><span class="icon_facebook">facebook</span><div class="component_sns fb-post" data-href="{data.url}" data-width="{WIDTH}"></div></div>',
				google: '<div class="ab_sns"><span class="icon_googleplus">googleplus</span><div class="component_sns g-post" data-href="{data.url}"></div></div>',
				pinterest: '<div class="ab_sns"><span class="icon_pinterest">pinterest</span><a class="component_sns" data-pin-do="embedPin" href="{data.url}"></a></div>',
				instagram: '<div class="ab_sns"><span class="icon_instagram">instagram</span><blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="4" style="width:{WIDTH}px"><a href="{data.url}"></a></blockquote></div>'
			}
		};

		var articleType = utils.config('articleType');

		function scriptLoader(id, src, options) {
			//utils.log('## scriptLoader id : ' + id);
			var d = document,
				s = 'script',
				js,
				fjs = d.getElementsByTagName('head')[0],
				ele = d.getElementById(id);

			if (ele) {
				if (ele.remove) {
					ele.remove();
				}
				else {
					$(ele).remove();
				}
			}
			js = d.createElement(s);
			js.id = id;
			js.type = 'text/javascript';
			js.src = src;
			js.async = true;
			js.defer = true;

			$(fjs).append(js);
		}

		return this.each(function (i, v) {
			var $dom = $(v),
				service = $dom.data('service'),
				id = $dom.data('id'),
				url = $dom.data('url'),
				width = '',
				load = services.load[service],
				html = services.html[service] || '';

			var browserVersion = (service == 'google' || service == 'facebook' ? 8 : 9);

			if (utils.browser && utils.browser.msie == true && parseInt(utils.browser.version, 10) < browserVersion) {
				$dom.browserNotice();
			} else {
				if (html && html.length > 0) {
					if (articleType == ARTICLE_TYPE.piki) width = "350";
					else if (articleType == ARTICLE_TYPE.live) width = "380";
					else if (utils.menu.getPageMenuKey().toLowerCase().indexOf('election2017') !== -1) width = "580";
					else width = "500";

                    if ('instagram' == service) {
                        html = $(html.replace('{data.url}', url.replace('/tv/', '/p/')).replace('{WIDTH}', width));
                    } else {
                        html = $(html.replace('{data.url}', url).replace('{WIDTH}', width));
                    }
					$dom.replaceWith(html); // position 조절이 필요한 구조이므로 replaceWith 하면 안됨.

					utils.resetArticleSubWidget && utils.resetArticleSubWidget();

					if (articleType == ARTICLE_TYPE.piki || articleType == ARTICLE_TYPE.live) {
						html.find('span[class^=icon]').remove();
					} else {
						if (service != 'google') {
							setPosition(html);
						}
					}
				}

				if ($.isFunction(load)) {
					load(v, id);
				}
			}
		});
	};

	/*
	* 사운드 클라우드 widget
	* @params
	*/
	$.fn.audioPlayer = function (options) {
		var defaults = {
			src: '',
			auto_play: false,
			buying: false,
			liking: false,
			download: false,
			sharing: false,
			show_artwork: true,
			show_playcount: false,
			show_user: true,
			start_track: 0,
			show_teaser: false
		},
			config = $.extend(defaults, options || {});

		return this.each(function (i, v) {
			var data = $(v).data(),
				param = '',
				$contents = '';

			config = $.extend(config, data || {});
			config.src = data.src || data.id;
			param = $.param(config).replace(/^src\=/, '');

			$contents = $('<iframe src="https://w.soundcloud.com/player/?url=' + param + '" style="width:100%;border:0"></iframe>');

			if (utils.browser.msie && parseInt(utils.browser.version, 10) < 9) {
				//$contents = '<p>지원하지 않습니다.</p>';
				$(v).browserNotice();
			}

			$(v).replaceWith($contents);

			utils.resetArticleSubWidget && utils.resetArticleSubWidget();
		});
	};

	$.fn.articleJtbcLink = function () {
		function setHtml($target, data) {
			var linkHtml = '';

			if ($target.length == 0) { return; }

			linkHtml = getLinkHtml(data);

			function getLinkHtml(data) {
				var html = '';
				if (data.href) {
					html = '<a class="jch_link" href="' + data.href + '" target="_blank">보러가기</a>';
				}
				return html;
			}
			$(".docs_upper .jch_link").replaceWith(linkHtml);
		}
		return this.each(function (i, v) {
			var $c = $(v), data = $c.data();
			setHtml($c, data);
		});
	};

	/**
	 * 챠트
	 * @param options
	 */
	$.fn.articleCharts = function () {
		var chtItemHeight = 30,
	        chtAreaCss = { top: 50, right: 50, bottom: 70, left: 50, width: "100%" };

		return this.each(function (i, v) {
			var $ChartsWrap = $(v),
                jsonChartData = { "title": $ChartsWrap.attr("data-cht-title"), "copyright": $ChartsWrap.attr("data-cht-copy"), "max_value": 0, "wrap_height": 0, "wrap_width": "100%", "vote": [] },
                tmpChtMaxVal = 0;
			jsonChartData.vote.push(["지역", "투표율", { role: "style" }, { role: "annotation" }]);
			$("div[data-cht-text]", $ChartsWrap).each(function (idx) {
				var chtItemText = $(this).attr("data-cht-text");
				var chtItemValue = parseFloat($(this).attr("data-cht-value"), 10);
				var chtItemValueType = $ChartsWrap.attr("data-cht-vaue-type") || "";
				var chtItemBarColor = $(this).attr("data-cht-color") || "#4285F4";
				jsonChartData.vote.push([chtItemText, chtItemValue, chtItemBarColor, chtItemValue.toString() + chtItemValueType]);
				if (jsonChartData.max_value < chtItemValue) {
					jsonChartData.max_value = chtItemValue;
				}
			});
			jsonChartData.wrap_height = chtAreaCss.top + chtAreaCss.bottom + ($ChartsWrap.children().length * chtItemHeight);

			google.charts.load("current", { "packages": ["corechart"] });
			google.charts.setOnLoadCallback(function () {
				var cht_data = new google.visualization.arrayToDataTable(jsonChartData.vote);
				var cht_options = {
					title: jsonChartData.title,
					//chart: { title: jsonChartData.title, subtitle: jsonChartData.copyright },
					fontSize: 14, //차트내 모든 텍스트의 크기
					//width: "130%",
					//height: "100%",
					/*animation: {
	                    duration: 100,
	                    easing: "in",
	                    startup: true
	                },*/
					dataOpacity: 0.8, //막대 투명도 (기본1)
					//enableInteractivity: true, //막대셀렉트 (기본true)
					legend: { position: "none" },
					titlePosition: "out", //제목 그래프 안에 넣기 in, out
					bars: "horizontal",
					//axes: { x: { 0: { side: "bottom", label: "투표율" } } },
					bar: { groupWidth: "70%" },
					isStacked: false, // 그래프 쌓기(스택), 기본값은 false, "percent"
					chartArea: chtAreaCss,
					titleTextStyle: {
						color: "#050505",
						fontSize: 18,
						bold: true,
						italic: false
					},
					hAxis: {
						//title: "투표율",
						title: jsonChartData.copyright,
						textPosition: "out", //가로축 none, out
						//scaleType: true,
						viewWindowMode: "min",
						viewWindow: {
							max: jsonChartData.max_value
						}
					},
					vAxis: {
						//title: "지역",
						textPosition: "out", //세로축 none, out
						scaleType: true
					}
				};
				var chart = new google.visualization.BarChart($ChartsWrap[0]);
				chart.draw(cht_data, cht_options);
			});
			$ChartsWrap.css({ width: jsonChartData.wrap_width, height: jsonChartData.wrap_height });
			$ChartsWrap.children().remove();
			$ChartsWrap.show();
		});
	};

    /**
	 * 서울학교지도
	 */
	$.fn.seoulSchoolMap = function () {
	    var SchoolMapHtml = "<link href=\"https://static.joins.com/data/schoolMap/leaflet.css\" rel=\"stylesheet\" />" +
                            "<div id=\"map\"></div>" +
							"<div class=\"map_comment\">" +
							"<div class=\"only_mobile\">" +
							"<div style=\"text-align:left;\">*자료: 교육부 학교알리미·학구도안내서비스, 한국감정원 부동산테크, 종로학원하늘교육</div>" +
							"<hr>" +
							"</div>" +
							"<div>" +
							"<div style=\"float: left;\">1) 평당가는 3.3m²(1평)당 매매가</div> <div style=\"float: right;\" class=\"only_pc\">*자료: 교육부 학교알리미·학구도안내서비스, 한국감정원 부동산테크, 종로학원하늘교육</div>" +
							"</div>" +
							"<div style=\"clear: both;\"></div>" +
							"<div style=\"text-align:left; margin-top: 2px;\">" +
							"<div class=\"count_number\">2)</div> " +
							"<div class=\"count_content\">학종이 본격 도입된 건 2015학년도</div>" +
							"<div class=\"clear_both\"></div>" +
							"</div>" +
							"<div style=\"text-align:left; margin-top: 2px;\">" +
							"<div class=\"count_number\">3)</div> " +
							"<div class=\"count_content\">2010학년도 이후 졸업생 배출한 고교는 세종과학고(2010학년도), 서울국제고(2011학년도), 하나고(2013학년도)</div>" +
							"<div class=\"clear_both\"></div>" +
							"</div>" +
							"<div style=\"text-align:left; margin-top: 2px;\">" +
							"<div class=\"count_number\">4)</div> " +
							"<div class=\"count_content\">저학년은 1~3학년, 고학년은 4~6학년. 고학년·저학년 학생 수 차이가 클수록 중학교 진학을 앞둔 고학년 전입생 수가 많다는 뜻</div>" +
							"<div class=\"clear_both\"></div>" +
							"</div>" +
							"<div style=\"text-align:left; margin-top: 2px;\">" +
							"<div class=\"count_number\">5)</div>" +
							"<div class=\"count_content\">‘졸업생 중 재수생 비율’은 교육부 학교알리미의 고교별 졸업생 진로 중 '기타 비율'</div>" +
							"<div class=\"clear_both\"></div>" +
							"</div>" +
							"</div>" +
							"<scr" + "ipt src=\"https://static.joins.com/data/schoolMap/mapdata.js\"></scr" + "ipt>";
	    this.replaceWith("<br><br>" + SchoolMapHtml);
	};
})(jQuery, window, document);