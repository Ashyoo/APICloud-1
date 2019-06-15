var BASE_URL = 'http://ys2.idianmeng.com';
// var BASE_URL = 'http://192.168.3.114';

var _PAGE_SIZE_ = 20;	//列表页 评论 每次加载的数量
var _AVATAR_ = 'widget://image/common/avatar.png';

//声明模块变量
var photoBrowser;		//查看大图
var kLoading;

function getUserId(){
	var id = api.getPrefs({
		sync: true,
		key: 'userId'
	});
    if (id) {
        return id;
    } else {
        return false;
    }
}
function log(n){
	console.log(JSON.stringify(n));
}

//通用 ajax 返回处理
function ajaxCallback(ret,err){
	if(ret && ret.code != 1){
		retCallback(ret);
	}
	if(err){
		errorCallback(err);
	}
}

//ajax ret
function retCallback(ret){
	log('==ajax ret=================')
	log(ret)
	log('===========================')
	toast(ret.msg);
}

//ajax error
function errorCallback(err){
	log('==ajax error=================')
	log(err)
    log('===========================')

    toast('系统异常');

	//var txt = '错误码：'+err.code+'；错误信息：'+err.msg+'；网络状态码：'+err.statusCode;
	// var txt = err.msg;
	// alert(txt);
}

/**
 * 判断空
 * @param val
 * @returns {boolean}
 */
function isBlank(val) {
    return val == null || val == '' || val === undefined || val == "undefined";
}

/**
 * 判断非空
 * @param val
 * @returns {boolean}
 */
function isNotBlank(val) {
    return !isBlank(val);
}

// 跳转普通页面
function openWin(name){
	api.openWin({
	    name: name,
	    url: name+'.html'
	});
}
//保存prefs数据
function setPrefs(key,val){
	api.setPrefs({
		key: key,
		value: val
	});
}
function getPrefs(name){
	var info = api.getPrefs({
		sync: true,
		key: name
	});
    if (!info) {
        return false;
    } else {
        return JSON.parse(info);
    }
}
//默认toast
function toast(msg){
	api.toast({
		msg: msg,
		duration: 2000,
		location: 'middle'
	});
}

//加载框
// function showProgress(n){
// 	var autoHide = true;
// 	if(n == 'no'){
// 		autoHide = false;
// 	}
// 	api.openFrame({
// 		name: 'mask_progress',
// 		url: 'widget://html/mask_progress.html',
// 		bounces: false,
// 		rect: {
// 			x: 0,
// 			y: 0,
// 			w: 'auto',
// 			h: 'auto'
// 		},

// 		// rect: {
// 		// 	x: (api.winWidth - 150) / 2,
// 		// 	y: (api.winHeight - 150)/2,
// 		// 	w: 150,
// 		// 	h: 150
// 		// },

// 		animation: {
// 			type: 'fade',
// 			duration: 100
// 		},
// 		reload: true,
// 		pageParam: {
// 			wname: api.winName,
// 			fname: api.frameName,
// 			autoHide: autoHide
// 		}
// 	});
// }
// function hideProgress(){
// 	setTimeout(function(){
// 		api.closeFrame({
// 			name: 'mask_progress'
// 		});
// 	},100);
// }

//打开登录界面

function showProgress(){
    api.showProgress({
        title: '加载中...',
        text: '',
        modal: false
    });
}
function hideProgress(){
    api.hideProgress();
}

//打开登录页
function openLogin(){
	api.openWin({
		name: 'login',
		url: 'widget://html/login.html',
		bgColor: '#f5f5f5',
		bounces: false,
		slidBackEnabled: false,
		//softInputMode: 'pan',
		animation: {
			type: 'fade',
			duration: 300
		}
	});
}
//打开分享弹窗
function openShareMask(){
    api.openFrame({
		name: 'share_mask',
		url: 'widget://html/share_mask.html',
		rect: {
			x: 0,
			y: 0,
			w: 'auto',
			h: 'auto'
		},
		bounces: false,
		animation: {
			type: 'fade',
			duration: 300
		},
		pageParam: {
			wname: api.winName,
            fname: api.frameName
		}
	});
}
//回到首页
function goHome(n){
	api.execScript({
		name:'root',
		script:'openHome('+n+')'
	});
	setTimeout(function(){
		api.closeToWin({
			name: 'root'
		});
	},20);

}
//ajax封装
var _Ajax = function(method,url,data,callback){
	api.ajax({
		url: BASE_URL + url,
		method: method,
		//headers: head,
		returnAll: false,
		data: {
			values: data
		}
	},function(ret,err){
		callback(ret,err);
	});
}

function changeData(dom,txt){
	$(dom).text(txt);
}

//html转义
function HTMLDecode(text) {
	var temp = document.createElement("div");
	temp.innerHTML = text;
	var output = temp.innerText || temp.textContent;
	temp = null;
	return output;
}
//textaea 换行
function line2br(param){
	var text = '';
	if(param){
		text = param.split("\n").join("<br />");
	}
	return text;
}

//下拉刷新 图片
var refreshHeader_img = {
	pull: [
		'widget://image/loading/1.png',
		'widget://image/loading/1.png',
		'widget://image/loading/1.png',
		'widget://image/loading/1.png',
		'widget://image/loading/1.png',
		'widget://image/loading/1.png',
		'widget://image/loading/1.png',
		'widget://image/loading/1.png',
		'widget://image/loading/1.png',
		'widget://image/loading/2.png',
		'widget://image/loading/3.png',
		'widget://image/loading/4.png',
		'widget://image/loading/5.png',
		'widget://image/loading/6.png',
		'widget://image/loading/7.png',
		'widget://image/loading/8.png',
		'widget://image/loading/9.png',
		'widget://image/loading/10.png',
		'widget://image/loading/11.png',
		'widget://image/loading/12.png',
		'widget://image/loading/13.png'
	],
	load: [
		'widget://image/loading/l1.png',
		'widget://image/loading/l2.png',
		'widget://image/loading/l3.png'
	]
};
var loading_img = [
    'widget://image/loading2/1.png',
    'widget://image/loading2/2.png',
    'widget://image/loading2/3.png',
    'widget://image/loading2/4.png',
    'widget://image/loading2/5.png',
    'widget://image/loading2/6.png',
    'widget://image/loading2/7.png',
    'widget://image/loading2/8.png',
];
//获取焦点
function focusInput(el){
	$(el).focus();
}
//去掉焦点
function blurInput(){
	$('input,textarea,select').blur();
}

//打开评论footer
function openChatFooter(param){
	// api.setFrameAttr({
	// 	name: api.frameName,
	// 	rect: {
	// 		marginBottom: 50
	// 	}
	// });
	api.openFrame({
		name: 'chat_footer',
		url: 'widget://html/chat_footer.html',
		rect: {
			x: 0,
			y: api.winHeight - 50,
			w: 'auto',
			h: 50
		},

		// rect: {
		// 	x: 0,
		// 	y: 0,
		// 	w: 'auto',
		// 	h: 'auto'
		// },

		softInputMode: 'pan',
		bounces: false,
		animation: {
			type: 'fade',
			duration: 300
		},
		reload: true,
		pageParam: {
			wname: api.winName,
			fname: api.frameName,
			param: param
		}
	});
}
//关闭评论footer
function closeChatFooter(frmName){
	api.closeFrame({
		name: 'chat_footer'
	});
	// api.setFrameAttr({
	// 	name: frmName,
	// 	rect: {
	// 		marginBottom: 0
	// 	}
	// });
}

//打开评论页面
function openAddReply(param){
    api.openWin({
        name: 'reply_add_win',
        url: 'widget://html/reply_add_win.html',
        animation: {
            type: 'movein',
            subType: 'from_bottom',
			duration: 300
        },
        reload: true,
        pageParam: {
			// wname: api.winName,
			// fname: api.frameName,
			param: param
        }
    });
}


//打开大图
function openBigPhoto(allImgArr,activeIndex){
	if(!allImgArr.length){
		return;
	}
	photoBrowser = api.require('photoBrowser');
	photoBrowser.open({
	    images: allImgArr,
		activeIndex: activeIndex,
	    placeholderImg: '',
	    bgColor: '#000'
	}, function(ret, err) {
	    if (ret) {
			if(ret.eventType == 'show'){
				api.openFrame({
					name: 'photo_close',
					url: 'widget://html/photo_close.html',
					rect: {
						x: 10,
						y: 25,
						w: 40,
						h: 40
					},
					pageParam: {
						winName: api.winName,
						frmName: api.frameName
					},
					bounces: false,
					bgColor: 'rgba(0,0,0,0)'
				});
				api.openFrame({
					name: 'photo_page',
					url: 'widget://html/photo_page.html',
					rect: {
						x: 0,
						y: api.winHeight - 60,
						w: 'auto',
						h: 60
					},
					pageParam: {
						winName: api.winName,
						frmName: api.frameName,
						current: activeIndex,
						total: allImgArr.length,
						downloadBtn: false
					},
					bounces: false,
					bgColor: 'rgba(0,0,0,0)'
				});
			}
			if(ret.eventType == 'change'){
				api.execScript({
				    frameName: 'photo_page',
				    script: 'changeCurrent("'+ret.index+'","'+allImgArr.length+'");'
				});
			}

	    }
	});
}
//关闭大图
function closeBigPhoto(){
	photoBrowser.close();
	api.closeFrame({
	    name: 'photo_page'
	});
	api.closeFrame({
	    name: 'photo_close'
	});
}


//给月份 日期 前面加0    2018-5-1  =》 2018-05-01
function dateZero(n){
	var a = parseInt(n);
	if(a<10){
		a = '0'+a;
	}
	return a;
}

//日期格式化
function formatDate(n){
	var date = '';
	if(n){
		date = Date.parse(n).toString('MM-dd');
		// date = Date.parse(n).toString('yyyy-MM-dd');
	}
	return date;
}
function formatTime(n){
	var date = '';
	if(n){
		var date = Date.parse(n).toString('yyyy-MM-dd HH:mm');
	}
	return date;
}

//通用打开页面
function openWidgetPage(winName,path){
    api.openWin({
		name: winName,
		url: 'widget://html/'+ path
	});
}
//打开购物车
function openCart(){
    openWidgetPage('cart_win','shop/cart_win.html');
}

//
function getBrowser(getOS){
	var UA_tool = function(){
		var os = 'other';
		var browser = 'other';
		var version = 1;
		var mobile = '';
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.indexOf('win')!=-1 || ua.indexOf('trident')!=-1){
			this.os = 'win';
		}else if(ua.indexOf('mac')!=-1){
			this.os = 'mac';
		}
		if(ua.indexOf('msie')!=-1 || ua.indexOf('trident')!=-1){
			this.browser = 'ie';
			var av = window.navigator.appVersion.toLowerCase();
			if(av.indexOf('msie 6.')!=-1){
				this.version = 6;
			}else if(av.indexOf('msie 7.')!=-1){
				this.version = 7;
			}else if(av.indexOf('msie 8.')!=-1){
				this.version = 8;
			}else if(av.indexOf('msie 9.')!=-1){
				this.version = 9;
			}else{
				this.version = 999;
			}
		}else if(ua.indexOf('chrome')!=-1){
			this.browser = 'chrome';
		}else if(ua.indexOf('safari')!=-1){
			this.browser = 'safari';
		}else if(ua.indexOf('firefox')!=-1){
			this.browser = 'firefox';
		}
		if(ua.indexOf('iphone')!=-1){
			this.mobile = 'iphone';
		}else if(ua.indexOf('ipad')!=-1){
			this.mobile = 'ipad';
		}else if(ua.indexOf('android')!=-1){
			this.mobile = 'android';
		}
	};
	var ua = new UA_tool();
	if(getOS == 1){
		return ua.os;
	}if(getOS == 2){
		if(ua.os == "win" || ua.os == "mac")
		return ua.browser;
	}else{
		return ua.version;
	}

}
var myos = getBrowser(1);
var mybrowser = getBrowser(2);
if(myos == 'mac' && mybrowser == "safari"){
    $$("body").addClass("chrome");
}

//打开广告
function openAd(url){
    if(!url){
        return;
    }
    // api.openWin({
    //     name: 'url_win',
    //     url: 'widget://html/url_win.html',
    //     pageParam: {
    //         url: url
    //     }
    // });

    api.openApp({
            androidPkg: "android.intent.action.VIEW",
            mimeType: "text/html",
            iosUrl: url,
            uri: url
        },
        function(ret, err) {
        }
    );
}