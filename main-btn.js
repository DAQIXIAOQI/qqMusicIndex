window.onload = function () {
    var top = document.getElementById("top");
    var topSearch = document.getElementById("top-search");
    var topInput = document.getElementsByName("search")[0];
    var topSearchBtn = document.getElementById("top-search-btn");

    var newsong = document.getElementById("newsong");
    var newsongClick = document.getElementById("newsong-main-click");
    var newsongClickUl = document.getElementById("newsong-main-click-ul");
    var newsongClickUlLi = newsongClickUl.getElementsByTagName("li");

    var recommend = document.getElementById("recommend");

    var rank = document.getElementById("rank");
    var rankClick = document.getElementById("rank-main-box");
    var rankUl = document.getElementById("rank-main-ul");
    var rankUlLi = getClassName("rank-main-ul-li", rankUl);

    var playist = document.getElementById("playist");
    var playistClickUl = document.getElementById("playist-main-click-ul");
    var playistClickUlLi = playistClickUl.getElementsByTagName("li");

    var mvlist = document.getElementById("mvlist");
    var mvlistUl = document.getElementById("mvlist-main-click-ul");
    var mvlistUlLi = mvlistUl.getElementsByTagName("li");

    var footer = document.getElementsByTagName("footer")[0];

    var wid = document.documentElement.clientWidth;
    var oboxslide = getClassName("main-boxslide", document);

    //初始调用
    inputChange(topInput, wid);

    /*-------------------------------------------------*/
    //响应式
    window.onresize = function () {
        var oldWid = wid;
        wid = document.documentElement.clientWidth;
        //纵向改变不管
        if (oldWid != wid) {
            updateMoveWidth();
            updateAutoplay();
            inputChange(topInput, wid);
        }
    }

    function updateMoveWidth() {
        oboxSlideUl[0].moveWidth = fgetMoveWidth(oboxSlideUl[0]);
        oboxSlideUl[1].moveWidth = fgetMoveWidth(oboxSlideUl[1]);
    }

    function updateAutoplay() {
        var style = document.getElementsByTagName("style")[0];
        var width = autoplay.offsetWidth;
        var p3 = (width - 750) / 2;
        var p4 = (width - 607.5);
        style.innerHTML = "ul#recommend-autoplay-ul li.p1 {left: -607px;}ul#recommend-autoplay-ul li.p2 {left: 0px;}ul#recommend-autoplay-ul li.p3 {left: " + p3 + "px;}ul#recommend-autoplay-ul li.p4 {left:" + p4 + "px;}ul#recommend-autoplay-ul li.p5 {left: 1200px;}";
    }

    function inputChange(obj, wid) {
        if (wid < 1250) {
            obj.className = "min";
        } else {
            obj.className = "";
        }
    }

    topSearch.onmouseover = function () {
        topInput.className = "";
    }
    topSearch.onmouseout = function () {
        inputChange(topInput, wid);
    }

    /*----------------------------------------------------*/
    //“全部”按钮hover效果
    var mainAll = getClassName("main-all", document);
    for (var i = 0; i < mainAll.length; i++) {
        fmainAll(mainAll[i]);
    }
    var footerA = footer.getElementsByTagName("a");
    for (var i = 0; i < footerA.length; i++) {
        fmainAll(footerA[i]);
    }

    function fmainAll(obj) {
        var em = obj.getElementsByTagName("em")[0];

        if (em) {
            obj.onmouseover = function () {
                em.className += " current";
            }
            obj.onmouseout = function () {
                em.className = em.className.replace(" current", "");
            }
        }
    }

    /*-----------------------------------------------------*/

    //img-box 效果  
    for (var i = 0; i < newsongClickUlLi.length; i++) {
        var img = newsongClickUlLi[i].getElementsByTagName("img")[0];
        img.src = "image/new-" + (i + 1) + ".jpg";
        fimgBox(newsongClickUlLi[i]);
    }
    for (var i = 0; i < playistClickUlLi.length; i++) {
        var img = playistClickUlLi[i].getElementsByTagName("img")[0];
        img.src = "image/playist-" + (i + 1) + ".jpg";
        fimgBox(playistClickUlLi[i]);
    }
    for (var i = 0; i < rankUlLi.length; i++) {
        fimgBox(rankUlLi[i]);
    }
    for (var i = 0; i < mvlistUlLi.length; i++) {
        var img = mvlistUlLi[i].getElementsByTagName("img")[0];
        img.src = "image/mv-" + (i + 1) + ".jpg";
        fimgBox(mvlistUlLi[i]);
    }

    function fimgBox(obj) {
        var oimgBtnBox = getClassName("img-btn-box", obj)[0];
        var ocir = getClassName("main-btn-cir", obj)[0];
        var oimgBox = getClassName("img-box", obj)[0];
        oimgBtnBox.onmouseover = function () {
            var oldClass = ocir.className;
            ocir.className = oldClass + " current";
            oldClass = oimgBox.className;
            oimgBox.className = oldClass + " hover";
        }
        oimgBtnBox.onmouseout = function () {
            ocir.className = "main-btn-cir";
            oimgBox.className = "img-box";
        }
    }

    /*------------------------------------------------*/
    //左移右移效果

    //获取所有可移动UL
    var oboxSlideUl = getClassName("main-boxslide-ul", document);
    //获取左右btn
    var oslideLeftBtn = getClassName("slide-left-btn", document);
    var oslideRightBtn = getClassName("slide-right-btn", document);

    //闭包初始化可移动Ul属性     &&    slide-btn点击函数
    for (var i = 0; i < oboxSlideUl.length; i++) {
        (function begin() {
            oboxSlideUl[i].maxPage = fgetPageNum(oboxSlideUl[i]);
            oboxSlideUl[i].moveWidth = fgetMoveWidth(oboxSlideUl[i]);
            oboxSlideUl[i].nowPage = 0;
            oslideLeftBtn[i].num = oslideRightBtn[i].num = i;
            oslideLeftBtn[i].onclick = function () {
                fSlide("left", oboxSlideUl[this.num]);
            };
            oslideRightBtn[i].onclick = function () {
                fSlide("right", oboxSlideUl[this.num]);
            }
        })();
    }

    function fgetPageNum(Ulobj) {
        var ofather = Ulobj.parentNode;
        var num;
        if (ofather) {
            num = parseInt((Ulobj.offsetWidth) / (ofather.offsetWidth));
        }
        return num;
    }

    function fgetMoveWidth(Ulobj) {
        var ofatherWidth = Ulobj.parentNode.offsetWidth;
        var ochildWhidth = Ulobj.getElementsByTagName("li")[0].offsetWidth;

        if (ofatherWidth || ochildWhidth) {
            var num = parseInt(ofatherWidth / ochildWhidth);
            return num * ochildWhidth
        }
    }

    function fSlide(dir, Ulobj) {
        //判断左右按钮
        if (dir == "left") {
            Ulobj.nowPage--;
            Ulobj.nowPage == -1 ? Ulobj.nowPage = (Ulobj.maxPage - 1) : "";
        } else {
            Ulobj.nowPage++;
            Ulobj.nowPage == Ulobj.maxPage ? Ulobj.nowPage = 0 : "";
        }
        //main-slide样式更换
        var box = Ulobj.parentNode.parentNode;
        var mainSlide = getClassName("main-slide", box)[0];
        if (mainSlide) {
            fchangeSlide(mainSlide, Ulobj.nowPage);
        } else {
            console.log("未获取到main-slide");
        }
        //移动函数
        var distance = Ulobj.nowPage * Ulobj.moveWidth;
        move(Ulobj, {
            left: -distance
        });
    }

    //main-slide 点击效果
    var omainSlide = getClassName("main-slide", document);
    fmainSlideClick(omainSlide[0], oboxSlideUl[0]);
    fmainSlideClick(omainSlide[2], oboxSlideUl[1]);
    fautoplaySlide(omainSlide[1]);

    function fmainSlideClick(Mainobj, Ulobj) {
        var objA = Mainobj.getElementsByTagName("a");
        for (var i = 0; i < objA.length; i++) {
            objA[i].index = i;
            objA[i].onclick = function () {
                fchangeSlide(Mainobj, this.index);
                Ulobj.nowPage = this.index;
                move(Ulobj, {
                    left: -(this.index * Ulobj.moveWidth)
                });
            }
        }
    }

    function fautoplaySlide(obj) {
        var a = obj.getElementsByTagName("a");
        for (var i = 0; i < a.length; i++) {
            a[i].index = i;
            a[i].onclick = function () {
                clearInterval(autoplayUl.timer);
                autoplayUl.nowPage = this.index;
                fautoplay(autoplayUl, autoplayLi, arr, num);
            }

        }

    }


    /*------------------------------------------------------------*/
    //两侧按钮hover事件

    var oasidebox = getClassName("box-btn", document);
    var oasideLeft = getClassName("box-btn-left", document);
    var oasideRight = getClassName("box-btn-right", document);
    var oasideLeftBtn = getClassName("box-btn-left-btn", document);
    var oasideRightBtn = getClassName("box-btn-right-btn", document);

    for (var i = 0; i < oasidebox.length; i++) {
        (function begin2(i) {
            oasidebox[i].parentNode.index = oasideLeft[i].index = oasideRight[i].index = oasideLeftBtn[i].index = oasideRightBtn[i].index = i;
            oasidebox[i].parentNode.onmouseover = function () {
                oasideLeftBtn[this.index].className += " current";
                oasideRightBtn[this.index].className += " current";
            }
            oasidebox[i].parentNode.onmouseout = function () {
                oasideLeftBtn[this.index].className = "box-btn-left-btn";
                oasideRightBtn[this.index].className = "box-btn-right-btn";
            }
            oasideLeft[i].onmouseover = oasideLeftBtn[i].onmouseover = function () {
                oasideLeftBtn[this.index].className = "box-btn-left-btn current hover";
            }
            oasideRight[i].onmouseover = oasideRightBtn[i].onmouseover = function () {
                oasideRightBtn[this.index].className = "box-btn-right-btn current hover";
            }
        })(i);
    }

    /*-----------------------------------------------------*/
    //轮播逻辑未改

    var autoplay = document.getElementById("recommend-autoplay");
    var autoplayUl = autoplay.getElementsByTagName("ul")[0];
    var autoplayLi = autoplayUl.getElementsByTagName("li");

    autoplayUl.maxPage = autoplayLi.length;
    //初始页设为2
    autoplayUl.nowPage = 2;
    //根据张数动态获取arr，arr用于设置轮播的顺序
    var arr = fgetArray(autoplayLi.length);
    var num;
    //第三张为初始张数，将数组里3的位置返回给num
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == 3) {
            num = i;
            break
        }
    }
    //向左向右移动函数
    function fautoplayup() {
        autoplayUl.nowPage++;
        fautoplay(autoplayUl, autoplayLi, arr, num);
    }

    function fautoplaydown() {
        autoplayUl.nowPage--;
        fautoplay(autoplayUl, autoplayLi, arr, num);
    }
    //初始录播，默认方向为向左
    clearInterval(autoplayUl.timer);
    autoplayUl.timer = setInterval(fautoplayup, 2000);
    //各种停止事件
    autoplay.onmouseover = function () {
        clearInterval(autoplayUl.timer);
    }
    omainSlide[1].onmouseout = autoplay.onmouseout = function () {
        clearInterval(autoplayUl.timer);
        autoplayUl.timer = setInterval(fautoplayup, 2000);
    }
    oasideLeftBtn[1].addEventListener("mouseover", function () {
        clearInterval(autoplayUl.timer);
    }, false);
    oasideRightBtn[1].addEventListener("mouseover", function () {
        clearInterval(autoplayUl.timer);
    }, false);
    oasideLeftBtn[1].addEventListener("mouseout", function () {
        clearInterval(autoplayUl.timer);
        autoplayUl.timer = setInterval(fautoplayup, 2000);
    });
    oasideRightBtn[1].addEventListener("mouseout", function () {
        clearInterval(autoplayUl.timer);
        autoplayUl.timer = setInterval(fautoplayup, 2000);
    });
    oasideLeftBtn[1].onclick = function () {
        fautoplaydown();
    }
    oasideRightBtn[1].onclick = function () {
        fautoplayup();
    }

    function fchangeSlide(obj, num) {
        var objA = obj.getElementsByTagName("em");
        for (var i = 0; i < objA.length; i++) {
            objA[i].className = "";
        }
        objA[num].className = "current";
    }

    function fgetArray(length) {
        var Arr = [];
        for (var i = 4; i <= length; i++) {
            Arr.push(i);
        }
        for (var i = 1; i <= length; i++) {
            Arr.push(i);
        }
        for (var i = 1; i < 3; i++) {
            Arr.push(i);
        }
        return Arr
    }

    function fautoplay(obj, objli, Arr, num) {

        obj.nowPage == obj.maxPage ? obj.nowPage = 0 : "";
        obj.nowPage == -1 ? obj.nowPage = obj.maxPage - 1 : "";

        var j = num;
        for (var i = obj.nowPage; i < obj.maxPage; i++) {
            objli[i].className = "p" + Arr[j];
            j++;
        }
        j = num;
        for (var i = obj.nowPage - 1; i >= 0; i--) {
            j--;
            objli[i].className = "p" + Arr[j];
        }

        var ofather = obj.parentNode.parentNode;
        var ochild = getClassName("main-slide", ofather)[0];
        fchangeSlide(ochild, obj.nowPage);
    }

}
