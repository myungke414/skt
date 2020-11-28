(function ($, window, document) {
	var apiPath = utils.config('apiPath'),
		nowDate = new Date();

	$.fn.Poll = function () {
		function setPollHtml(config) {			
			var data = config.data;
				totalCount = getTotalCount(data.PollItems),
				startDate  = data.StartedDateTime.format('yyyy.MM.dd'),
				endDate    = data.EndedDateTime.format('MM.dd');

			var $pollHTML = $(
				'<div class="ab_poll2">' +
					'<fieldset class="poll_' + (config.status == 'ing' ? 'ing' : 'end') + '">' +
						'<legend class="hide">투표</legend>' +
						'<div class="hd">' +
							'<span class="icon"></span>' +
							'<strong>' + config.title + '</strong>' +
							'<em>' + startDate + ' - ' + endDate + ' <span>' + totalCount + '<span>명 참여</span></span></em>' +
							setRelationHtml(config.data) +
						'</div>' +
						'<div class="bd">' +
							'<ul class="answer_type0' + config.layout + ' clearfx">' + setItemHtml(config) + '</ul>' +
						'</div>' +
						'<div class="ft">' + setButtonHtml(config.status) + '</div>' +
					'</fieldset>' +
				'</div>'
			);

			function setRelationHtml(data) {
				var relationHTML = '';
				if (data.RelationLink != undefined && data.RelationLink != '') {
					var cloc = '?cloc=joongang-home-hotpollrearticle';
					if (data.RelationLink.indexOf('?') > -1) cloc = '&cloc=joongang-home-hotpollrearticle';
					relationHTML = '<a class="article" href="' + data.RelationLink + cloc + '" target="_blank"><span>투표 전 관련기사 참고</span></a>';
				}	
				return relationHTML;
			}

			function setItemHtml(config) {				
				var countArray = [];
				config.data.PollItems.forEach(function (v, i) {
					countArray.push(v);
				});
				countArray.sort(function (a, b) {
					return b.VotedCount - a.VotedCount;
				});
				var firstItem  = countArray.shift();
				var secondItem = countArray.shift();

				var itemHTML = '';
				config.data.PollItems.forEach(function (v, i) {
					var percent = getPercent(v.VotedCount);					
					var cls = '';
					if (v.Id == firstItem.Id) {
						cls = 'answer01';
					} else if (v.Id == secondItem.Id) {
						cls = 'answer02';
					}

					i++;					
					if (config.layout == '1') {
						itemHTML += 
						'<li class="' + cls + '">' +
							'<label for="survey_' + config.id + '_' + i + '">' +
								'<span class="bar">' +
									'<span class="bg"><span class="fg" style="width:' + percent + '%;"></span></span>' +
								'</span>' +
								'<span class="opt">' +
									'<input type="radio" id="survey' + config.id + '_' + i + '" name="vote_' + config.id + '" value="' + v.Id + '">' +
									'<strong>' + percent + '%</strong> | <em>' + v.VotedCount + '명</em>' +
								'</span>' +
								'<span class="txt">' + v.Title + '</span>' +
							'</label>' +
						'</li>';
					} else {
						itemHTML += 
						'<li class="' + cls + '">' +
							'<label for="survey_' + config.id + '_' + i + '">' +
								'<span class="text_wrap">' +
									'<span class="text_center">' +
										'<span class="opt">' +
											'<input type="radio" id="survey_' + config.id + '_' + i + '" name="vote_' + config.id + '" value="' + v.Id + '">' +
											'<strong>' + percent + '%</strong> | <em>' + v.VotedCount + '명</em>' +
										'</span>' +
										'<span class="bar">' +
											'<span class="bg"><span class="fg" style="width:' + percent + '%;"></span></span>' +
										'</span>' +
										'<span class="txt">' + v.Title + '</span>' +
									'</span>' +
									'<span class="valign_fix"></span>' +
								'</span>' +
							'</label>' +
						'</li>';
					}
				});

				return itemHTML;
			}

			function setButtonHtml(status) {
				var buttonHTML = '';
				if (status == 'end') {
					buttonHTML = '<span class="btn_end mg">투표가 종료되었습니다.</span>';
				} else if (status == 'com') {
					buttonHTML = '<span class="btn_end mg">투표에 참여하셨습니다.</span>';
				} else {
					buttonHTML = '<button type="button" class="mg" style="cursor:pointer;">투표하기</button>';
				}	
				return buttonHTML;
			}

			$pollHTML.find('button').on('click', function () {
				if (config.data.IsNeedToLogin && !utils.config('isLogin')) return alert('로그인 후에 투표가 가능합니다.');

				var val = $('input[name=vote_' + config.id + ']:checked').val();
				if (val === undefined) return alert('투표 항목을 선택해 주세요.');

				utils.ajaxPost({
					url: apiPath + '/poll/' + config.id + '/vote',
					data: {
						ItemIds: val,
						agent: 'P'
					},
					success: callback
				});

				function callback(res) {
					var code = res.Code,
						msg  = '';

					if (res.IsSuccess) {
						setVoteResult(config, val);
					} else {
						if (code == 'Duplicated') {
							msg = '이미 참여하셨습니다.';
						} else if (code == 'NotPeriod') {
							msg = '참여기간이 아닙니다.';
						} else {
							msg = '문제가 있습니다. 관리자에게 문의해 주세요.';
						}
						alert(msg);
					}
				}
			});

			$pollHTML.find('label').on('click', function () {
				$pollHTML.find('button').addClass('active');
			});

			function setVoteResult(config, val) {
				config.data.PollItems.forEach(function (v) {
					if (v.Id == val) v.VotedCount++;
				});
				config.data.VoteCount++;

				config.status = 'com';
				config.layout = getLayout('com', config.data.PollItems.length);
				setPollHtml(config);
			};

			function getTotalCount(list) {
				var count = 0;
				list.forEach(function (v) {
					count += (v.VotedCount || 0);
				});
				return count;
			}

			function getPercent(c) {
				var percent = Math.round(c / totalCount * 100);
				return isNaN(percent) ? 0 : percent;
			}

			if (config.$el.hasClass('tag_poll')) {
				config.$el.before($pollHTML);
			} else {
				config.$el.replaceWith($pollHTML);
			}
			config.$el = $pollHTML;
		}

		function getLayout(status, count) {
			var layout = '2';
			if (status != 'ing' && count == 2 && document.location.href.indexOf(utils.config('homePath')) < 0) layout = '1';

			return layout;
		}

		function getTimeStamp(d) {
			if (d.indexOf('.') > -1) {
				d = d.substr(0, d.indexOf('.'));
			}
			return typeof d == 'string' ? d.toDateISO8061() : d;
		}

		return this.each(function (i, el) {
			var $el   = $(el),
				id    = $el.data('id'),
				title = $el.data('polltitle');

			utils.getJsonp({
				url: apiPath + '/poll/' + id,
				success: callback
			});

			function callback(res) {
				var data = res.poll,
					ts   = nowDate.getTime();

				data.StartedDateTime = getTimeStamp(data.StartedDateTime);
				data.EndedDateTime   = getTimeStamp(data.EndedDateTime);				
				if (data.Status == 'Pause' || data.Status == 'Delete' || ts < data.StartedDateTime) return;
				var status = (ts > data.EndedDateTime) ? 'end' : 'ing';

				if (title == undefined || title == '') title = data.Title;

				if (status == 'ing') {
					utils.ajaxPost({
						url: apiPath + '/poll/' + id + '/checkvote',
						success: function (res) {
							if (res.result == 1) status = 'com';
							var config = {
								$el: $el,
								id: id,
								title: title,
								data: data,
								status: status,					
								layout: getLayout(status, data.PollItems.length)
							};					
							setPollHtml(config);	
						}
					});
				} else {
					var config = {
						$el: $el,
						id: id,
						title: title,
						data: data,
						status: status,					
						layout: getLayout(status, data.PollItems.length)
					};					
					setPollHtml(config);				
				}
			}
		});
	};
	
	if ($('div.tag_poll').length > 0) {	
		$('div.tag_poll').Poll();
	}
})(jQuery, window, document);