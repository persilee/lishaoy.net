window.onload = function () {
	per.app.toTip();
	per.app.toBanner();
	per.app.toMenu();
	per.app.toRun();
};

var per = {};

per.tools = {};

per.tools.getByClass = function (oParent, sClass) {
	var aEle = oParent.getElementsByTagName('*');
	var arr = [];

	for (var i = 0; i < aEle.length; i++) {
		if (aEle[i].className == sClass) {
			arr.push(aEle[i]);
		}
	}

	return arr;
};

per.tools.getStyle = function (obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
};

per.ui = {};


per.ui.moveLeft = function (obj, old, now) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {

		console.log(old);
		console.log(now);

		var iSpeed = (now - old) / 10;

		console.log(iSpeed);
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		console.log(iSpeed);
		if (now == old) {
			clearInterval(obj.timer);
		} else {
			old += iSpeed;

			console.log(old);

			obj.style.left = old + 'px';
		}
	}, 30);
}

per.ui.textChange = function (obj, str) {
	obj.onfocus = function () {
		if (this.value == str) {
			this.value = '';
		}
	};
	obj.onblur = function () {
		if (this.value == '') {
			this.value = str;
		}
	};
};


per.ui.fadeIn = function (obj) {

	var iCur = per.tools.getStyle(obj, 'opacity');
	if (iCur == 1) {
		return false;
	}

	var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var iSpeed = 5;
		if (value == 100) {
			clearInterval(obj.timer);
		} else {
			value += iSpeed;
			obj.style.opacity = value / 100;
			obj.style.filter = 'alpha(opacity=' + value + ')';
		}
	}, 30);

};

per.ui.fadeOut = function (obj) {

	var iCur = per.tools.getStyle(obj, 'opacity');
	if (iCur == 0) {
		return false;
	}

	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var iSpeed = -5;
		if (value == 0) {
			clearInterval(obj.timer);
		} else {
			value += iSpeed;
			obj.style.opacity = value / 100;
			obj.style.filter = 'alpha(opacity=' + value + ')';
		}
	}, 30);

};
per.app = {};

per.app.toTip = function () {
	var oTxt1 = document.getElementById('s_txt1');
	var oTxt2 = document.getElementById('s_txt2');

	per.ui.textChange(oTxt1, 'Search website');
	per.ui.textChange(oTxt2, 'Search website');
};

per.app.toBanner = function () {
	var oBanner = document.getElementById('banner');
	var aLi = oBanner.getElementsByTagName('li');

	var oPrevBg = per.tools.getByClass(oBanner, 'prev_bg')[0];
	var oNextBg = per.tools.getByClass(oBanner, 'next_bg')[0];

	var oPrev = per.tools.getByClass(oBanner, 'prev')[0];
	var oNext = per.tools.getByClass(oBanner, 'next')[0];


	var iNow = 0;

	var timer = setInterval(auto, 3000);

	function auto() {

		if (iNow == aLi.length - 1) {
			iNow = 0;
		} else {
			iNow++;
		}

		for (var i = 0; i < aLi.length; i++) {
			per.ui.fadeOut(aLi[i]);
		};

		per.ui.fadeIn(aLi[iNow]);

	}

	function autoPrev() {

		if (iNow == 0) {
			iNow = aLi.length - 1;
		} else {
			iNow--;
		}

		for (var i = 0; i < aLi.length; i++) {
			per.ui.fadeOut(aLi[i]);
		}

		per.ui.fadeIn(aLi[iNow]);

	}


	oPrevBg.onmouseover = oPrev.onmouseover = function () {
		oPrev.style.display = 'block';
		clearInterval(timer);
	};

	oNextBg.onmouseover = oNext.onmouseover = function () {
		oNext.style.display = 'block';
		clearInterval(timer);
	};

	oPrevBg.onmouseout = oPrev.onmouseout = function () {
		oPrev.style.display = 'none';
		timer = setInterval(auto, 3000);
	};

	oNextBg.onmouseout = oNext.onmouseout = function () {
		oNext.style.display = 'none';
		timer = setInterval(auto, 3000);
	};

	oPrev.onclick = function () {
		autoPrev();
	};

	oNext.onclick = function () {
		auto();
	};


	per.app.toMenu = function () {
		var oMenu = document.getElementById('menu');
		var aDd = oMenu.getElementsByTagName('dd');
		var aUl = oMenu.getElementsByTagName('ul');
		var aH3 = oMenu.getElementsByTagName('h3');

		for (var i = 0; i < aDd.length; i++) {
			aDd[i].index = i;
			aDd[i].onclick = function (ev) {
				var ev = ev || window.event;
				var This = this;
				for (var i = 0; i < aUl.length; i++) {
					aUl[i].style.display = 'none';
				}

				aUl[this.index].style.display = 'block';
				document.onclick = function () {
					aUl[This.index].style.display = 'none';
				}

				ev.cancelBubble = true;

			}
		}

		for (var i = 0; i < aUl.length; i++) {
			aUl[i].index = i;
			(function (ul) {
				var aLi = ul.getElementsByTagName('li');
				for (var i = 0; i < aLi.length; i++) {
					aLi[i].onmouseover = function () {
						this.className = 'active';
					}
					aLi[i].onmouseout = function () {
						this.className = '';
					};
					aLi[i].onclick = function (ev) {
						var ev = ev || window.event;
						aH3[this.parentNode.index].innerHTML = this.innerHTML;
						ev.cancelBubble = true;
						this.parentNode.style.display = 'none';
					};
				}

			})(aUl[i]);
		}
	}
}


per.app.toRun = function () {
	var oRun = document.getElementById('s_run');
	var oUl = oRun.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');

	var oPrev = per.tools.getByClass(oRun, 'prev')[0];
	console.log(oPrev);
	var oNext = per.tools.getByClass(oRun, 'next')[0];

	var iNow = 0;

	oUl.innerHTML += oUl.innerHTML;

	oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';

	oPrev.onclick = function () {

		console.log('abc');

		if (iNow == 0) {

			console.log(aLi.length);

			iNow = aLi.length / 2;
			oUl.style.left = -oUl.offsetWidth / 2 + 'px';

			console.log(oUl.style.left);
		}
		per.ui.moveLeft(oUl, -iNow * aLi[0].offsetWidth, -(iNow - 1) * aLi[0].offsetWidth);

		console.log(-iNow * aLi[0].offsetWidth);
		console.log(-(iNow - 1) * aLi[0].offsetWidth);

		console.log(iNow);

		iNow--;
	};

	oNext.onclick = function () {

		if (iNow == aLi.length / 2) {
			iNow = 0;
			oUl.style.left = 0;
		}

		per.ui.moveLeft(oUl, -iNow * aLi[0].offsetWidth, -(iNow + 1) * aLi[0].offsetWidth);

		iNow++;

	};

}
