function toggleul(obj) {
    $(obj).find(".togglebox").toggle(200)
}
function gototop() {
    $("body,html").animate({
        scrollTop: 0
    })
}
$(document).bind("click",function(e){
    var target  = $(e.target);    //e.target获取触发事件的元素
    if(target.closest(".togglebtn").length == 0){
        $(".togglebox").hide();
    };
    e.stopPropagation();
});
$("body").on("click",".range-cell",function () {
    var rsobj = $(this).closest(".togglebtn").find(".rs-txt");
    var cuTxt = $(this).text();
    rsobj.text(cuTxt);
})
/* 筛选条件收起展开 */
$("body").on("click", ".slide-control", function () {
    var parentbox = $(this).closest(".filter-condition");
    var controltxt = $(this).find(".ct-state");
    if($(this).hasClass("actived")){
        $(this).removeClass("actived");
        parentbox.removeClass("actived");
        controltxt.text("展开")
    }else {
        $(this).addClass("actived");
        parentbox.addClass("actived");
        controltxt.text("收起")
    }
})
/*筛选标签选择（单选模式）*/
$("body").on("click", ".c_radio .c_cell", function () {
    var time_pa = $(this).closest(".condition_cells").hasClass("time_condition_cells");
    var time_wrapper = $(this).closest(".condition_cells").find(".customtime_wrapper");
    if(time_pa){
        time_wrapper.hide()
    }
    var sib = $(this).closest(".condition_cells").find(".c_cell");
    sib.removeClass("actived");
    $(this).addClass("actived");
})

/*筛选标签选择 （多选模式）*/
$("body").on("click", ".c_multi .c_cell", function () {
    if($(this).hasClass("actived")){
        $(this).removeClass("actived")
    }else{
        $(this).addClass("actived")
    }
})
/*点击时间自定义出现日期选择框*/
$("body").on("click", ".custom_time", function () {
    $(this).closest(".time_condition_cells").find(".customtime_wrapper").show();
})

/*tab 切换*/
$("body").on("click", ".item-tab ", function () {
    $(this).addClass("actived").siblings(".item-tab").removeClass("actived");
    $(".tab-content").removeClass("actived");
    $(".tab-content").eq($(this).index()).addClass("actived");
    var tabtxt = $(this).text();
    if(tabtxt == "企业舆情"){
        $(".hidecell").show()
    }else{
        $(".hidecell").hide()
    }
})

/*关闭推送预警*/
$("body").on("click" ,".toalarm_top_r" ,function () {
    $(this).closest(".toalarm").hide(350)
})

/* 弹出专题编辑弹框 */
function show_stpop() {
    layui.use('layer',function () {
        var layer = layui.layer;
        layer.open({
            type:1,
            content:$("#stpop"),
            title:'',
            area:['620','96%'],
            btn:['保存','取消'],
            btnAlign: 'c'

        })
    })

}

/*筛选标签查看全部功能*/
$(function () {
    $(window).resize(function () {
        $(".condition-wrapper ").each(function (index, item) {
            if ($(item).hasClass("no-overfl")) {
                return
            } else {
                var $conditioncon = $(item).find(".condition_con").height();
                if ($conditioncon > 35) {
                    $(item).find(".checkmore_btn").show()
                } else {
                    $(item).find(".checkmore_btn").hide()
                }
            }
        })
    });
    $(".condition-wrapper ").each(function (index, item) {
        if ($(item).hasClass("no-overfl")) {

        } else {
            var $conditioncon = $(item).find(".condition_con").height();
            if ($conditioncon > 35) {
                $(item).find(".checkmore_btn").show()
            } else {
                $(item).find(".checkmore_btn").hide()
            }
        }
    })
    
    $("body").on("click", ".checkmore_btn", function () {
        if($(this).hasClass("open")){
            $(this).removeClass("open")
            $(this).find(".txt").text("+ 查看全部");
            $(this).closest(".condition-wrapper").css({"height":"42px","overflow":"hidden"})
        }else{
            $(this).addClass("open")
            $(this).find(".txt").text("- 收起");
            $(this).closest(".condition-wrapper").css({"height":"auto","overflow":"inherit"})
        }
    })
})