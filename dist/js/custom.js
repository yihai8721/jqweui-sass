/**
 * Created by Administrator on 2017/4/5 0005.
 */

"use strict";
/**
 * Created by Administrator on 2016/9/5.
 */
///** html的font-size计算 **/
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

/** html的font-size计算 **/

$(window).scroll(function () {
    //固定导航
    var winH1 = $(document).scrollTop(); //document.documentElement.scrollTop和document.body.scrollTop;
    var ptcz = parseInt($("#container").height());
    var tabs = $('.tabs-order');
    var _prevAlls = tabs.closest('.weui_tab').prevAll();
    var offSet = 10;
    if(_prevAlls.length >0){
        for(var i = 0;i<_prevAlls.length;i++){
            offSet += _prevAlls.eq(i).outerHeight();
        }
    }else{
        offSet = 50;
    }
    if(tabs.length > 0){
        if(tabs.hasClass('fixedBreak') || winH1 < offSet){
            tabs.removeClass('tabs-fixed');
            $("#container").css('marginTop',45);
        }else if (winH1 > offSet) {
            tabs.addClass('tabs-fixed');
            $("#container").css('marginTop',95);
        }
    }
    //返回顶部按钮
    if (winH1 > 300) {
        $(".returnTop").show()
        return false;
    } else {
        $(".returnTop").hide()
        return false;
    };
});
//返回顶部
$(function(){
    var obtn = $(".returnTop");
    obtn.click(
        function () {
            $('html, body').animate({scrollTop: 0}, '5s');
        })
});


//清除a标签默认跳转
$('.noTarget').each(function(){
    $(this).attr('onclick','return false');
});

/**轮播**/

$(function(){
    function swiperUpdate() {
        var swiper = new Swiper('.swiper-effect,.swiper-room', {
            pagination: '.swiper-pagination'
        });
    }
    $('.weui_tabbar a').on('click',function(){
        setTimeout(swiperUpdate,300);
    })
});
window.onload = function(){
    //评分等级划分
    var CR = $('.criterion');
    var minData = parseFloat(CR.attr('data-min'));
    var maxData = parseFloat(CR.attr('data-max'));
    $('.rating-container input').each(function(){
        var Val =parseFloat($(this).val());
        var tex =  $(this).closest('.stras').siblings('.grade_custom');
        if(Val <= minData){
            tex.text('低');
        }else if(minData < Val < maxData){
            tex.text('中');
        }if(maxData <= Val){
            tex.text('高');
        }
    });

    //方案步骤
    var _this =$('.swiper-step').find('.swiper-wrapper');
    if(_this.find('.swiper-slide').length > 5 || _this.children('.swiper-slide').hasClass('active')){
        var Swipers = _this.find('.active').prevAll('.swiper-slide').length -2;
        var offset = _this.find('.swiper-slide:first').outerWidth() * Swipers;
        _this.css("transform","translate3d(-"+offset+"px, 0, 0)")
    }
};

//输入字数限制
$(function () {
    var stringsLimit = $('.weui_textarea_counter');
    var nums = parseFloat(stringsLimit.text().split("/")[1]);
    stringsLimit.siblings('.weui_textarea').keyup(function(){
        var len = $(this).val().length;
        if(len > (nums-1)){
            $(this).val($(this).val().substring(0,nums));
        }
        var num = nums - len;
        stringsLimit.find('span').text(num);
        if(stringsLimit.find('span').text()<0){
            stringsLimit.find('span').text(0)
        }
    });
});

//金额格式处理

$(function(){
    $("input[type='file']").each(function(){
        $(this).attr('capture','camera');
    })
});

