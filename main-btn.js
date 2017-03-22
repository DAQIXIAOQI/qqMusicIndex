
 window.onload = function() {
            var newsong = document.getElementById("newsong");
            var newsongClick = document.getElementById("newsong-main-click");
            var newsongClickUl = document.getElementById("newsong-main-click-ul");
            var newsongClickUlLi = newsongClickUl.getElementsByTagName("li");
            
            var recommend = document.getElementById("recommend");
            
            var rank = document.getElementById("rank");
            var rankClick = document.getElementById("rank-main-box");
            var rankUl = document.getElementById("rank-main-ul");
            var rankUlLi = getClassName("rank-main-ul-li",rankUl);
            
            var playist = document.getElementById("playist");
            var playistClickUl = document.getElementById("playist-main-click-ul");
            var playistClickUlLi = playistClickUl.getElementsByTagName("li");
            
            var mvlist = document.getElementById("mvlist");
            var mvlistUl = document.getElementById("mvlist-main-click-ul");
            var mvlistUlLi = mvlistUl.getElementsByTagName("li");
            
            var footer = document.getElementsByTagName("footer")[0];
            var wid =document.documentElement.clientWidth;
            
        
            //左移右移效果
            var oboxSlideUl = getClassName("main-boxslide-ul",document);
            var oasideLeftBtn = getClassName("box-btn-left-btn",document);
            var oasideRightBtn = getClassName("box-btn-right-btn",document);
            var omainSlide = getClassName("main-slide",document);
            oboxSlideUl[0].maxPage = fgetPageNum(oboxSlideUl[0]);
            oboxSlideUl[0].moveWidth = fgetMoveWidth(oboxSlideUl[0]);
            oboxSlideUl[0].nowPage = 0 ;
            oboxSlideUl[1].maxPage = fgetPageNum(oboxSlideUl[1]);
            oboxSlideUl[1].moveWidth = fgetMoveWidth(oboxSlideUl[1]);
            oboxSlideUl[1].nowPage = 0 ;
            oasideLeftBtn[0].onclick = function(){
                   fSlide("left",oboxSlideUl[0]);
            }
            oasideLeftBtn[2].onclick = function(){
                  fSlide("left",oboxSlideUl[1]);
            }
            oasideRightBtn[0].onclick = function(){
                   fSlide("right",oboxSlideUl[0]);
            }
            oasideRightBtn[2].onclick = function(){
                  fSlide("right",oboxSlideUl[1]);
            }
            //main-slide 点击效果
            fmainSlideClick(omainSlide[0],oboxSlideUl[0]);
            fmainSlideClick(omainSlide[2],oboxSlideUl[1]);
     
            //“全部”按钮效果
            var mainAll = getClassName("main-all",document);
            for(var i = 0 ; i < mainAll.length ;i++){
                fmainAll(mainAll[i]);
            }
            var footerA = footer.getElementsByTagName("a");
            for(var i = 0 ; i < footerA.length ; i++){
                fmainAll(footerA[i]);
            }
            
            //main-slide效果
            fmainSlide(newsong);
            fmainSlide(recommend);
            fmainSlide(playist);
            
            //img-box 效果  
            for (var i = 0; i < newsongClickUlLi.length; i++) {
                var img = newsongClickUlLi[i].getElementsByTagName("img")[0];
                img.src = "image/new-" + (i + 1) + ".jpg";
                fimgBox(newsongClickUlLi[i]);
            }
            for (var i = 0 ; i < playistClickUlLi.length; i++){
                var img = playistClickUlLi[i].getElementsByTagName("img")[0];
                img.src = "image/playist-" + (i+1) + ".jpg";
                fimgBox(playistClickUlLi[i]);
            }
            for (var i = 0 ; i < rankUlLi.length ;i++){
                fimgBox(rankUlLi[i]);
            }
            for (var i = 0 ; i < mvlistUlLi.length ;i++){
                var img = mvlistUlLi[i].getElementsByTagName("img")[0];
                img.src = "image/mv-"+(i+1) + ".jpg";
                fimgBox(mvlistUlLi[i]);
            }
            //轮播逻辑未改

            var autoplay = document.getElementById("recommend-autoplay");
            var autoplayUl = autoplay.getElementsByTagName("ul")[0];
            var autoplayLi = autoplayUl.getElementsByTagName("li");
            autoplayUl.maxPage = autoplayLi.length;
            autoplayUl.nowPage = 2 ;
            var arr = fgetArray(autoplayLi.length);
            var num ;
            for(var i = 0 ; i < arr.length ; i++) {
                if(arr[i] == 3){
                    num = i ;
                    break
                }
            }
            function fautoplayup(){
                 autoplayUl.nowPage++ ;
                 fautoplay(autoplayUl,autoplayLi,arr,num);
            }
            function fautoplaydown(){
                autoplayUl.nowPage--;
                fautoplay(autoplayUl,autoplayLi,arr,num);
            }
            clearInterval(autoplayUl.timer);
            autoplayUl.timer = setInterval(fautoplayup,2000);
            autoplay.onmouseover= function(){
                clearInterval(autoplayUl.timer);
            }
            omainSlide[1].onmouseout = autoplay.onmouseout= function(){
                 clearInterval(autoplayUl.timer);
                 autoplayUl.timer = setInterval(fautoplayup,2000);
            }
            oasideLeftBtn[1].addEventListener("mouseover",function(){
                  clearInterval(autoplayUl.timer);
            },false);
            oasideRightBtn[1].addEventListener("mouseover",function(){
                  clearInterval(autoplayUl.timer);
            },false);
            oasideLeftBtn[1].addEventListener("mouseout",function(){
         clearInterval(autoplayUl.timer);
            autoplayUl.timer = setInterval(fautoplayup,2000);
    }) ; 
            oasideRightBtn[1].addEventListener("mouseout",function(){
         clearInterval(autoplayUl.timer);
            autoplayUl.timer = setInterval(fautoplayup,2000);
    }) ; 
            oasideLeftBtn[1].onclick = function(){
        fautoplaydown();
    }  
            oasideRightBtn[1].onclick = function(){
        fautoplayup();
    }
            fautoplaySlide(omainSlide[1]);
            function fautoplaySlide(obj){
                var a =obj.getElementsByTagName("a");
                for(var i = 0 ; i < a.length ;i++){
                    a[i].index = i ;
                    a[i].onclick = function(){
                        clearInterval(autoplayUl.timer);
                        autoplayUl.nowPage = this.index ;
                        fautoplay(autoplayUl,autoplayLi,arr,num);
                    }
                    
                }
                
            }
            
                  
        }

//"全部"按钮移入移出效果
function fmainAll(obj) {
    var em = obj.getElementsByTagName("em")[0];
    
    if(em){
    obj.onmouseover = function(){
        em.className += " current";
    }
    obj.onmouseout = function(){
        em.className = em.className.replace(" current","");
    }
    } 
}

//main-slide 函数
function fmainSlide(obj){
    var asideBtn = getClassName("box-btn",obj)[0];
    var btnLeftbtn = getClassName("box-btn-left-btn",obj)[0];
    var btnRightbtn = getClassName("box-btn-right-btn",obj)[0];
    var btnLeft = getClassName("box-btn-left",obj)[0];
    var btnRight = getClassName("box-btn-right",obj)[0];
    obj.onmouseover = function(){
        var oldClass = btnLeftbtn.className ;
        btnLeftbtn.className = oldClass + " current" ;
        oldClass = btnRightbtn.className ;
        btnRightbtn.className = oldClass + " current" ;
    } 
    
    obj.onmouseout = function(){
        btnLeftbtn.className = "box-btn-left-btn";
        btnRightbtn.className = "box-btn-right-btn";
        
    }
    
    btnLeftbtn.onmouseover = btnLeft.onmouseover = function(){
        btnLeftbtn.className = "box-btn-left-btn current hover";   
    }
    btnRightbtn.onmouseover = btnRight.onmouseover = function(){
        btnRightbtn.className = "box-btn-right-btn current hover";  
    }
}

//img-box 函数
function fimgBox(obj){
    var oimgBtnBox = getClassName("img-btn-box",obj)[0];
    var ocir = getClassName("main-btn-cir",obj)[0];
    var oimgBox = getClassName("img-box",obj)[0];
    oimgBtnBox.onmouseover = function(){
        var oldClass = ocir.className;
        ocir.className = oldClass + " current";
        oldClass = oimgBox.className ;
        oimgBox.className = oldClass + " hover";
    }
    oimgBtnBox.onmouseout = function(){
        ocir.className = "main-btn-cir";
        oimgBox.className = "img-box";
    }
}

//btn 函数 
function fgetPageNum(Ulobj) {
    var ofather = Ulobj.parentNode ;
    var num ;
    if(ofather){
        num = parseInt((Ulobj.offsetWidth) / (ofather.offsetWidth)) ;
    }
    return num ;
}
function fgetMoveWidth(Ulobj) {
    var ofatherWidth = Ulobj.parentNode.offsetWidth ;
    var ochildWhidth = Ulobj.getElementsByTagName("li")[0].offsetWidth;
    
    if(ofatherWidth||ochildWhidth){
    var num =parseInt( ofatherWidth / ochildWhidth ) ;
    return num*ochildWhidth      
    }
}
function fchangeSlide(obj,num) {
    var objA = obj.getElementsByTagName("em");
    for(var i = 0 ; i < objA.length ; i++){
        objA[i].className = "";
    }
    objA[num].className = "current";
}
function fSlide(dir,Ulobj) {
    //判断左右按钮
    if(dir == "left"){
    Ulobj.nowPage-- ;
    Ulobj.nowPage == -1 ? Ulobj.nowPage = (Ulobj.maxPage - 1) : "";}
    else {
    Ulobj.nowPage++ ;
    Ulobj.nowPage == Ulobj.maxPage ? Ulobj.nowPage = 0 : "";    
    }
    //main-slide样式更换
    var box = Ulobj.parentNode.parentNode;
    var mainSlide = getClassName("main-slide",box)[0];  
    if(mainSlide){
    fchangeSlide(mainSlide,Ulobj.nowPage);}
    else{
        console.log("未获取到main-slide");
    }
    //移动函数
    var distance = Ulobj.nowPage*Ulobj.moveWidth ;
    move(Ulobj,{left:-distance});
}
function fmainSlideClick(Mainobj,Ulobj) {
    var objA = Mainobj.getElementsByTagName("a");
    for(var i = 0 ; i < objA.length ;i++) {
        objA[i].index = i ;
        objA[i].onclick = function() {
            fchangeSlide(Mainobj,this.index);
            Ulobj.nowPage = this.index ;
            move(Ulobj,{left:-(this.index*Ulobj.moveWidth)});
        }
    }
}
function fgetArray(length){
    var Arr = [];
    for(var i = 4 ; i <= length ; i++ ){
        Arr.push(i);
    }
    for(var i = 1 ; i <= length ; i++ ){
        Arr.push(i);
    }
    for(var i = 1 ; i < 3 ; i++ ){
        Arr.push(i);
    }
    return Arr 
}
//autoplay 函数
function fautoplay(obj,objli,Arr,num) { 
    
    obj.nowPage == obj.maxPage ? obj.nowPage = 0 : "";
    obj.nowPage == -1 ? obj.nowPage = obj.maxPage - 1 : "";
    
    var j = num ;   
    for(var i = obj.nowPage ; i < obj.maxPage ; i++){
        objli[i].className = "p" + Arr[j];
        j++ ;
    }
    j = num ;
    for(var i = obj.nowPage - 1 ; i >=0 ; i--) {
        j--;
        objli[i].className = "p" + Arr[j];
    }  
    
    var ofather = obj.parentNode.parentNode ;
    var ochild = getClassName("main-slide",ofather)[0];
    fchangeSlide(ochild,obj.nowPage);
}
