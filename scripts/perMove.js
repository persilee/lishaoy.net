$(function () {
	$(window).scroll(function () {
		if ($(window).scrollTop() > 650) {
			$('#aboutMe-box ul li a img').addClass('imgNone');
		}
		if ($(window).scrollTop() > 1500 || $(window).scrollTop() < 400) {
			$('#aboutMe-box ul li a img').removeClass('imgNone');
		}
		if ($(window).scrollTop() >= 2300) {
			$('.closeDown.2016').removeClass('closeDown');
		}
		if ($(window).scrollTop() > 3900) {
			$('.Shake').addClass('conform');
		}
		if ($(window).scrollTop() < 3500) {
			$('.Shake').removeClass('conform');
		}
		if ($(window).scrollTop() > 3940) {
			$('.contactMe-weixb a img').addClass('imgNone');
		}
		if ($(window).scrollTop() < 3500) {
			$('.contactMe-weixb a img').removeClass('imgNone');
		}
	});





	$('.main .year .list').each(function (e, target) {
		var $target = $(target),
			$ul = $target.find('ul');
		$target.height($ul.outerHeight()), $ul.css('position', 'relatvie');
	});
	$('.main .year>h2>a').click(function (e) {
		e.preventDefault();
		$('.year').removeClass('2016');
		$(this).parents('.year').toggleClass('closeDown');
	});





	$(function () {
		var hasNone = true;
		$('.educ').click(function () {
			if (hasNone) {
				$('#aboutMe-txt p:eq(0)').fadeOut('slow', 'swing', function () {
					$('#aboutMe-txt p:eq(1)').fadeIn('fast');
					hasNone = false;
				});
			} else {
				$('#aboutMe-txt p:eq(1)').fadeOut('fast', 'linear', function () {
					$('#aboutMe-txt p:eq(0)').fadeIn('slow');
					hasNone = true;
				});
			}

		});
	});
	$(function () {
		var hasNone = true;
		$('.age').click(function () {
			if (hasNone) {
				$('#aboutMe-txt p:eq(2)').fadeOut('fast', 'linear', function () {
					$('#aboutMe-txt p:eq(3)').fadeIn('slow');
					hasNone = false;
				});
			} else {
				$('#aboutMe-txt p:eq(3)').fadeOut('slow', function () {
					$('#aboutMe-txt p:eq(2)').fadeIn('fast');
					hasNone = true;
				});
			}

		});
	});

	$(function () {
		var hasNone = true;
		$('.addr').click(function () {
			if (hasNone) {
				$('#aboutMe-txt p:eq(4)').fadeOut('fast', 'linear', function () {
					$('#aboutMe-txt p:eq(5)').fadeIn('slow');
					hasNone = false;
				});
			} else {
				$('#aboutMe-txt p:eq(5)').fadeOut('slow', function () {
					$('#aboutMe-txt p:eq(4)').fadeIn('fast');
					hasNone = true;
				});
			}

		});
	});
	$(function () {
		var hasNone = true;
		$('.state').click(function () {
			if (hasNone) {
				$('#aboutMe-txt p:eq(6)').fadeOut('slow', function () {
					$('#aboutMe-txt p:eq(7)').fadeIn('fast');
					hasNone = false;
				});
			} else {
				$('#aboutMe-txt p:eq(7)').fadeOut('fast', 'linear', function () {
					$('#aboutMe-txt p:eq(6)').fadeIn('slow');
					hasNone = true;
				});
			}

		});
	});
})



function initialy(e) {
	iSpeed = 0;
	left = 0;
	listUl = document.getElementById('nav-list-per');
	listLi = listUl.getElementsByTagName('li');
	listBg = listLi[listLi.length - 1];
	navDiv = document.querySelector('#divNav');
	navLi = document.querySelector('#nav-list-per');
	screenWidth = window.screen.width;
	wexImg = document.querySelector('.contactMe-weixb .weixin img.ico');
	webImg = document.querySelector('.contactMe-weixb .weibo img');
	aotImg = document.querySelector('.aot-head-per a img');
	wexImg.addEventListener('mouseover', overChangeWx, false);
	wexImg.addEventListener('mouseout', outChangeWx, false);
	webImg.addEventListener('mouseover', overChangeWb, false);
	webImg.addEventListener('mouseout', outChangeWb, false);
	aotImg.addEventListener('click', aotImgChange, false);
	navLi.addEventListener('click', hideList, false);

	for (i = 0; i < listLi.length - 1; i++) {
		listLi[i].addEventListener('mouseover',
			function () {
				startMove(listBg, this.offsetLeft, this.offsetWidth, this.offsetHeight);
			},
			false);
	}

	for (i = 0; i < listLi.length - 1; i++) {
		listLi[i].addEventListener('mouseout',
			function () {
				clearListBg(listBg, this.offsetWidth, this.offsetHeight);
			},
			false);
	}
}

function startMove(obj, iTarget, width, height) {

	obj.style.width = width + 'px';
	obj.style.height = height + 'px';

	console.log(obj.style.width);

	clearInterval(obj.timer);

	obj.timer = setInterval(function () {
		iSpeed += (iTarget - obj.offsetLeft) / 5;
		iSpeed *= 0.75;
		left += iSpeed;

		if (Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) {
			clearInterval(obj.timer);
			obj.style.left = iTarget + 'px';
		} else {
			obj.style.left = left + 'px';
		}


	}, 30);
}

function clearListBg(obj, width, height) {
	obj.style.width = '0px';
	obj.style.height = '0px';
}

function hideList(e) {
	if (screenWidth <= 780) {
		var div = navDiv.getAttribute('class');
		navDiv.setAttribute('class', 'navbar-collapse collapse');
	}
}


function aotImgChange(e) {
	var img = aotImg.getAttribute('src');
	if (img == 'images/per-1.jpg') {
		aotImg.setAttribute('src', 'images/per-2.jpg');
	} else {
		aotImg.setAttribute('src', 'images/per-1.jpg');
	}
}


function overChangeWx(e) {
	var time = window.setTimeout(function () {
		wexImg.style.border = '1px solid rgba(255, 255, 255, 1)';
		wexImg.setAttribute('src', 'images/WeChat1.png');
	}, 100);
}

function outChangeWx(e) {

	var time = window.setTimeout(function () {
		wexImg.setAttribute('src', 'images/WeChat-black.png');
		wexImg.style.border = '1px solid rgba(0, 0, 0, 0.5)';
	}, 300);

}

function overChangeWb(e) {
	var time = window.setTimeout(function () {
		webImg.style.border = '1px solid rgba(255, 255, 255, 1)';
		webImg.setAttribute('src', 'images/weibo1.png');
	}, 100);


}

function outChangeWb(e) {
	var time = window.setTimeout(function () {
		webImg.setAttribute('src', 'images/weibo-black.png');
		webImg.style.border = '1px solid rgba(0, 0, 0, 0.5)';
	}, 300);

}

function switchIco(e) {
	perIco = document.querySelector('#img-per');
	window.setInterval(function () {
		var src = perIco.getAttribute('src');
		if (src == 'images/head2.jpg') {
			perIco.setAttribute('src', 'images/head1.jpg');
		} else {
			perIco.setAttribute('src', 'images/head2.jpg');
		}
	}, 2000);
}





window.addEventListener('load', switchIco, false);
window.addEventListener('load', initialy, false);
