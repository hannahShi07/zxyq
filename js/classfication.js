$(function () {
    $("[the-id=hoverid]").val(""), $("[the-id=kstype]").val(""), $("[the-id=level]").val(""), $("[the-id=isParent]").val(""), $("[the-id=havesonsub]").val(""), $("[the-id=xzname]").val(""), $(".append").click(function (e) {
        var t = $("[name=tvIsStop]").val() || "";
        if ("2" === $(".redtext_con").attr("userstatus") && "" == t) return alert("您的帐号已经停用，请联系客服！"), !1;
        if ("1" === t) return alert("您的电视监控业务已到期，请您及时进行续费。"), !1;
        var i = $(this), a = $.fn.zTree.getZTreeObj("tree1"), s = "", r = "", n = "", d = "";
        if (a) {
            var l = a.getSelectedNodes();
            0 < l.length && (s = l[0].id || "", r = l[0].kstype || "", n = l[0].level || "", d = l[0].havesonsub || "")
        }
        var o = $("[the-id=addspecialclass]");
        o.removeAttr("class"), "" == r && "" == s || 0 == n ? o.addClass("addfl") : (1 == n && 2 == r && o.addClass("showdjfl"), 1 < n && 2 == r && (1 == d ? o.addClass("showzfl") : o.addClass("showzfl1")), 2 != r && o.addClass("showzt")), i.find("ul").slideToggle(), e.stopPropagation()
    }), $(".wary").click(function () {
        $("[the-id=addspecialclass]").slideUp()
    }), $("[the-id=newclosesclass]").live("click", function () {
        $("[the-id=addclass]").hide(), $("[the-id=popmask]").remove()
    }), $(".classfiy").find("li .bottom_open").live("click", function (e) {
        var t = $(this);
        t.parent().find(" > ul").hide(), t.removeClass("bottom_open").addClass("center_close")
    }), $(".classfiy").find("a").live("click", function () {
        var e = $(this);
        $(".classfiy").find("a").removeClass("haver"), e.addClass("haver"), $(this).hasClass("fir") ? $(".top").addClass("bottom").attr("title", "移出导航") : $(".top").removeClass("bottom").attr("title", "加入导航")
    }), $(".delate").click(function () {
        var e = $("[name=tvIsStop]").val() || "";
        if ("2" === $(".redtext_con").attr("userstatus") && "" == e) return alert("您的帐号已经停用，请联系客服！"), !1;
        if ("1" === e) return alert("您的电视监控业务已到期，请您及时进行续费。"), !1;
        var p = $.fn.zTree.getZTreeObj("tree1");
        if (null == p) return alert("请选择需要删除的分类或专题！"), !1;
        var h = p.getSelectedNodes();
        if (0 == h.length) return alert("请选择需要删除的分类或专题！"), !1;
        var t = h[0].kstype, u = h[0].id, i = h[0].level, a = h[0].pId, s = h[0].isParent ? "1" : "0",
            r = h[0].havesonsub || "", n = "", d = "", l = $("[the-id=infotype]").val() || "01";
        if ("-1" == t && "0" == i) return alert("专题列表不能被删除！"), !1;
        if ($("[the-id=addspecialclass]").hide(), "0" == t && "-1" == i) return alert("请选择需要删除的分类或专题！"), !1;
        if (2 == t && 1 < i && 1 == s && "1" == r) return alert("请清空子集后再删除该分类！"), !1;
        if (2 != t && 1 == s) return alert("请清空子集后再删除该专题！"), !1;
        if (2 == t && 1 == i && "1" == s) return alert("请清空子集后再删除该分类！"), !1;
        if (2 == t && (n = app + "/Set/deletetresClass", d = {kcuuid: u, level: i}), 2 != t) {
            var o = $("#" + h[0].tId);
            if ("kstypecy1" === (t = o.attr("kstypes"))) {
                var c = o.parent().find("[kstypes=kstypecy1]"), v = o.parent().find("[kstypes=kstype1]");
                if (1 == c.length && 0 < v.length) return alert("请先删除子专题后再删除该专题！"), !1
            }
            n = app + "/Set/deletespecial", d = {kkid: u}
        }
        d.kktype = l || "1", d.pid = 1 == a ? "" : a, confirm("确定要删除吗？") && $.ajax({
            type: "post",
            async: !1,
            url: n,
            data: d,
            beforeSend: function (e) {
                var t = $(".tree_wrap"), i = t.height(), a = t.width();
                t.append('<div the-id="uploads" class="uploads" style="width:' + a + "px;height:" + i + 'px;"><img src="' + pub + '/images/download.gif" /></div>')
            },
            success: function (e) {
                if ($("[the-id=uploads]").remove(), res = ajaxDispose(e), !res) return alert("删除失败请联系管理员！"), !1;
                if (1 == res.result) {
                    alert("删除成功");
                    var t = h[0].id || "";
                    "" != t && 1 == h[0].istop && f(t);
                    var i = h[0].pId;
                    p.removeNode(h[0]);
                    var a = p.getNodesByParam("pId", i), s = res.ztree, r = s.length || 0;
                    if (0 < r) for (var n = 0; n < r; n++) for (var d = s[n], l = 0, o = a.length; l < o; l++) {
                        var c = a[l];
                        d.id != c.id || (c.kcindex = d.kcindex, c.ksindex = d.ksindex, p.updateNode(a[l]))
                    }
                    for (var l in ystree) {
                        if (ystree[l].id == u) {
                            ystree.splice(l, 1);
                            break
                        }
                    }
                }
                $("[the-id=updateSCdata]").html(""), $("[the-id=xzname]").val("")
            }
        })
    });
    var f = function (e) {
        if (0 < navUlLi.length) {
            for (var t = 0, i = navUlLi.length; t < i; t++) {
                if (e == $(navUlLi[t]).attr("navid")) {
                    navUlLi.splice(t, 1);
                    break
                }
            }
            setNavShowLi()
        }
    };
    $("[the-id=addtopnav]").click(function () {
        var e = $(this), t = $.fn.zTree.getZTreeObj("tree1").getSelectedNodes();
        if (!(0 < t.length)) return alert("请选择加入导航的专题或分类！"), !1;
        if (0 == t[0].level) return alert("请选择加入导航的专题或分类！"), !1;
        t[0].level;
        var i = t[0].id || "", a = t[0].kstype || "", s = (t[0].havesonsub, t[0].istop || ""), r = (t[0].isParent, 1);
        if ("special" == window.templates && "2" != t[0].kstype) return alert("经典模板专题不能加入导航，请使用其它新模板。"), !1;
        1 == s && (r = 0), e.attr("the-id", "no"), $.ajax({
            type: "post",
            url: app + "/Set/settop",
            data: {id: i, type: a, top: r},
            success: function (e) {
                "1" == e && ("1" == r ? alert("加入导航成功") : alert("移出导航成功"), window.location = location.href)
            }
        })
    }), $("[the-id=necustomtext]").live("blur", function () {
        var e = $(this).val();
        $(this).parent("label").next().html(" "), "" != e ? 4 < e.length ? $(this).parent("label").next().css("color", "red").html("最长为4个字符") : e.match(/[\\|\/|<|>|\||@|#|%|&|'|"]/) && $(this).parent("label").next().css("color", "red").html("不能使用特殊符号") : $(this).parent("label").next().css("color", "red").html("不能为空")
    }), $(".move_up").live("click", function () {
        if (1 != gmove) return !1;
        var e = $.fn.zTree.getZTreeObj("tree1").getSelectedNodes();
        if (0 == e.length) return alert("请选择向上移动的分类或专题！"), !1;
        if (0 == e[0].level) return alert("请选择向上移动的分类或专题！"), !1;
        var t = e[0].id, i = e[0].kcindex && 0 != e[0].kcindex ? e[0].kcindex : e[0].ksindex, a = e[0].getPreNode(),
            s = $("#" + e[0].tId), r = s.attr("kstypes"), n = s.prev() || "", d = n.attr("kstypes");
        if ("" == n || r !== d) return alert("已经到达顶端！"), !1;
        var l = "";
        l = e[0].kcindex && 0 != e[0].kcindex ? a.kcindex : a.ksindex, setPosition({
            data: {
                id: t,
                eposition: l,
                bposition: i
            }, nodeLi: s, pnli: n, zxNodes: e[gmove = 0], xlNodes: a, type: "x"
        })
    }), $(".move_down").live("click", function () {
        if (1 != gmove) return !1;
        var e = $.fn.zTree.getZTreeObj("tree1").getSelectedNodes();
        if (0 == e.length) return alert("请选择向下移动的分类或专题！"), !1;
        if (0 == e[0].level) return alert("请选择向下移动的分类或专题！"), !1;
        var t = e[0].id, i = e[0].kcindex && 0 != e[0].kcindex ? e[0].kcindex : e[0].ksindex, a = e[0].getNextNode(),
            s = $("#" + e[0].tId), r = s.attr("kstypes"), n = s.next() || "", d = n.attr("kstypes");
        if ("" == n || r !== d) return alert("已经到达底端！"), !1;
        var l = "";
        l = e[0].kcindex && 0 != e[0].kcindex ? a.kcindex : a.ksindex, setPosition({
            data: {
                id: t,
                eposition: l,
                bposition: i
            }, nodeLi: s, pnli: n, zxNodes: e[gmove = 0], xlNodes: a, type: "s"
        })
    }), $("[the-id=sharebuts]").live("click", function () {
        var e = $.fn.zTree.getZTreeObj("tree1").getSelectedNodes();
        if (0 < e.length) {
            if (0 == e[0].level) return alert("请选择要分享的专题！"), !1;
            if (2 == e[0].kstype) return alert("专题分类不支持分享！"), !1;
            if (1 == e[0].share) return alert("该专题已经被分享过了！"), !1;
            $.ajax({
                url: app + "/Set/showSharePop",
                type: "post",
                async: !1,
                data: {name: e[0].name},
                success: function (a) {
                    $("body").append(popmask), $("[the-id=popmask]").css({
                        width: docWidth,
                        height: docHeight
                    }).fadeTo(0, .5, function () {
                        $("body").append(a);
                        var e, t = $("[the-id=sharePop]"),
                            i = {width: t.width(), height: t.height(), scrollTop: scrollTop, scrollLeft: scrollLeft};
                        e = popput(i), t.css({top: e.poptop, left: e.popleft})
                    })
                }
            })
        } else alert("请选择要分享的专题！")
    }), $("[the-id=shareClose]").live("click", function () {
        $("#popmask").hide(), $("[the-id=sharePop]").hide()
    }), $("[the-id=add_title] li").live("click", function () {
        var e = $(this), t = e.attr("add_title"), i = e.attr("ajurl") || "";
        if ($("[the-id=add_title] li").removeClass("hover"), $(".compile").removeClass("compile_show"), $("[the-id=" + t + "]").addClass("compile_show"), $(".putButSubmit").attr("the-id", t + "_button"), e.addClass("hover"), "specialing" == t) {
            var a = $.fn.zTree.getZTreeObj("speing");
            for (var s in null != a && a.destroy(), ystree) 1 != ystree[s].isshared && 3 != ystree[s].kstype && "4" != ystree[s].attr && 2 != ystree[s].kstype || (ystree[s].chkDisabled = !0), "1" != ystree[s].id && "0" == ystree[s].pId && (ystree[s].pId = "1"), 1 == ystree[s].open && (ystree[s].open = !1);
            $.fn.zTree.init($("#speing"), specialingSetting, ystree).refresh()
        } else setShowTree(t, i)
    }), $("[the-id=addClass]").live("click", function () {
        var e = $.fn.zTree.getZTreeObj("tree1"), t = "";
        if (null != e) {
            var i = e.getSelectedNodes();
            t = 0 < i.length ? i[0].id : ""
        }
        var a = !0, s = $('input[name="ksname"]').val(), r = $(this).attr("infos");
        if ("" == s) return alert("分类名称不能为空"), !1;
        if (s.match(/[\s]/)) return alert("分类名称不能有空格！"), !1;
        if (s.match(/^[A-Za-z]+$/) && 10 < s.length) return alert("分类名称英文字母最长为10个字符"), !1;
        if (!s.match(/^[A-Za-z]+$/) && 4 < s.length) return alert("长度不能超过4个字！"), !1;
        if (s.match(/[\\|\/|<|>|\||@|#|%|&|'|"]/)) return alert("分类名称不能使用特殊符号"), !1;
        var n = $('input[name="addclassname"]:checked').val(), d = $('input[name="id"]').val();
        $.ajax({
            type: "post",
            async: !1,
            url: app + "/Set/oneName",
            dataType: "json",
            data: {name: s, infos: r, pid: t || "0", type: 8},
            success: function (e) {
                0 == e && (alert("分类名称已存在，所有的专题和分类都不能重名！"), a = !1)
            }
        });
        if (a) {
            var l = $("[name=classtype]:checked").val(), o = $("[the-id=kstype]").val();
            3 == o && (o = 1);
            var c = {
                id: d || "",
                val: s || "",
                kcuuid: t || "",
                kstype: o || "",
                submitclasstype: 2,
                infotype: $("[the-id=infotype]").val(),
                top: n || ""
            };
            2 == r && (c.spaecialtype = l || ""), $("[the-id=addClass]").attr("the-id", "no"), $.ajax({
                type: "post",
                url: app + "/Set/saveSpecialClass",
                data: c,
                success: function (e) {
                    $('input[name="ksname"]').val(""), e = ajaxDispose(e);
                    var t = $("[the-id=no]");
                    if (!e) return t.attr("the-id", "addClass"), !1;
                    if (t.attr("the-id", "addClass"), "3 " == e.result) alert("该分类名称已存在！"); else if ("1" == e.result) {
                        goSetAndPreview({type: 2, ksid: e.ksid, tips: "设置已完成！", istop: "0", name: e.ztree[0].name});
                        var i = e.ztree[0] || {}, a = $.fn.zTree.getZTreeObj("tree1");
                        if (null != a) {
                            var s = a.getSelectedNodes(), r = 0 < s.length ? s[0] : a.getNodeByTId("1"),
                                n = !(1 == i.isParent || !i.isParent), d = i.kstype, l = 0;
                            if (2 == d) {
                                var o = r.level + 1, c = a.getNodesByParam("level", o, r);
                                if (0 < c.length) for (var p in c) {
                                    c[p].kstype == d && l++
                                }
                            }
                            a.addNodes(r, l, {
                                id: i.id || "",
                                name: i.name,
                                attr: i.attr,
                                isParent: n,
                                chengyuan: 0,
                                havesonsub: i.havesonsub || 0,
                                isshared: 0,
                                istop: i.istop || 0,
                                share: 0,
                                onlymatchsub: i.onlymatchsub,
                                kstype: i.kstype || "",
                                ksindex: i.ksindex || "",
                                kcindex: i.kcindex || "",
                                iconSkin: "classico1",
                                pId: r.id
                            }), ystree.push({
                                id: i.id || "",
                                name: i.name,
                                attr: i.attr,
                                isParent: n,
                                chengyuan: 0,
                                havesonsub: i.havesonsub || 0,
                                isshared: 0,
                                istop: i.istop || 0,
                                share: 0,
                                onlymatchsub: i.onlymatchsub,
                                kstype: i.kstype || "",
                                ksindex: i.ksindex || "",
                                kcindex: i.kcindex || "",
                                iconSkin: "classico1",
                                pId: r.id
                            })
                        } else {
                            var h = [];
                            i.iconSkin = "classico1", i.havesonsub = "0", i.share = "0", i.chengyuan = "0", i.istop = "0", i.pId = "1", h.push({
                                id: "1",
                                name: "专题列表",
                                pId: "0",
                                kstype: "-1",
                                open: !0,
                                isHidden: !0
                            }), h.push(i), $.fn.zTree.init($("#tree1"), setting, h), ystree = [{
                                id: i.id || "",
                                name: i.name,
                                attr: i.attr,
                                isParent: n,
                                chengyuan: 0,
                                havesonsub: i.havesonsub || 0,
                                isshared: 0,
                                istop: i.istop || 0,
                                share: 0,
                                onlymatchsub: i.onlymatchsub,
                                kstype: i.kstype || "",
                                ksindex: i.ksindex || "",
                                kcindex: i.kcindex || "",
                                pId: 0
                            }]
                        }
                        $("[the-id=addspecialclass]").hide()
                    } else e.result, alert("添加失败！")
                },
                error: function () {
                    $("[the-id=no]").attr("the-id", "addClass")
                }
            })
        }
    }), $("[the-id=updataxclass]").live("click", function () {
        var a = $('input[name="upksname"]').val();
        if ("" != a) {
            if (a.match(/^[A-Za-z]+$/) && 10 < a.length) return alert("分类名称英文字母最长为10个字符"), !1;
            if (!a.match(/^[A-Za-z]+$/) && 4 < a.length) return alert("长度不能超过4个字！"), !1;
            if (a.match(/[\\|\/|<|>|\||@|#|%|&|'|"]/)) alert("分类名称不能使用特殊符号"); else if (a.match(/[\s]/)) alert("分类名称不能有空格"); else {
                var e = $('input[name="upclassname"]:checked').val(), t = $('input[name="upid"]').val();
                0;
                var s = $.fn.zTree.getZTreeObj("tree1"), r = s.getSelectedNodes(), i = r[0].id, n = r[0].kstype,
                    d = $("[the-id=infotype]").val(), l = $("[the-id=istv]").val() || "", o = {
                        id: t || "",
                        val: a || "",
                        kcuuid: i || "",
                        kstype: n || "",
                        kktype: d || "",
                        submitclasstype: 2,
                        top: e || ""
                    }, c = $("[the-id=levels]"), p = $("[the-id=istop]").val() || "0";
                if (1 != l) if (0 < c.length) {
                    var h = $("[name=updateclasstype]:checked").val();
                    o.spaecialtype = h || ""
                } else o.level = 1; else 1 != ($("[the-id=selectnodesPId]").val() || "") ? o.spaecialtype = 0 : o.level = 1;
                $.ajax({
                    type: "post", url: app + "/Set/updatesaveClass", data: o, success: function (e) {
                        var t = ajaxDispose(e);
                        if (!t) return $("[the-id=no]").attr("the-id", "addClass"), !1;
                        if ("3" == t.result) alert("该分类名称已存在"); else if ("0" == t.result) alert("添加失败！"), $("[the-id=no]").attr("the-id", "addClass"); else if ("1" == t.result) {
                            goSetAndPreview({
                                type: 2,
                                ksid: t.ksid,
                                tips: "设置已完成！",
                                istop: p,
                                name: t.ztree[0].name
                            }), r[0].name = a, h && "" != h && (r[0].attr = h), s.updateNode(r[0]);
                            var i = $("[the-id=className]");
                            0 < i.length && i.html(a)
                        }
                    }
                })
            }
        } else alert("分类名称不能为空")
    }), $("[the-id=territory_button]").live("click", function () {
        submitDatas("dy", "territory")
    }), $("[the-id=specialing_button]").live("click", function () {
        submitDatas("zt", "speing")
    }), $("[the-id=recommend_special_button]").live("click", function () {
        var e, t, i, a, s = $(this), r = $("[the-id=specialinput]:checked").length,
            n = $("[the-id=special_title]").parent().find("textarea"), d = "", l = "", o = "";
        e = $("[the-id=specialinput]").attr("customerType"), t = $("[the-id=specialinput]").attr("departmentid"), i = $("[the-id=specialinput]").attr("provinceid"), a = $("[the-id=specialinput]").attr("cityId");
        for (var c = $(".demoIcon"), p = [], h = 0; h < c.length; h++) p.push(c.eq(h).attr("title"));
        if ("0" == r) return $(".special_tip").text(""), !1;
        var u = $("[the-id=specialinput]:checked");
        for (h = 0; h < u.length; h++) d += u.eq(h).val() + ",", o += u.eq(h).attr("thematicname") + ",";
        d = d.substring(0, d.length - 1), o = o.substring(0, o.length - 1);
        for (var v = 0; v < p.length; v++) {
            if ("-1" != o.indexOf(p[v])) return $(".special_tip").text("您选择的信息中有重复专题，请重新选择！"), !1;
            $(".special_tip").text("")
        }
        $(".special_tip").text("");
        if ("1" != s.parents("[the-id=popsnew]").find("[the-id=recommend_special] ul li input").attr("customertype")) {
            if ("" == n.val().trim()) return $(".special_tip").text("请至少输入1个品牌词！"), !1;
            if (/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(n.val().trim()) || /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(n.val().trim())) return $(".special_tip").text("品牌词不能带有特殊字符！"), !1;
            l = n.val().trim().replace(/\s+/g, ","), $(".special_tip").text("")
        }
        $.ajax({
            url: app + "/Set/saveRecommendSpecial",
            type: "post",
            data: {customerType: e, departmentId: t, provinceId: i, cityId: a, specialTopicId: d, brandWord: l},
            success: function (e) {
                e = JSON.parse(e).result.data[2].addSpecialBackInfo;
                e = JSON.parse(e), goSetAndPreview({
                    type: 1,
                    ksid: e.ksid,
                    tips: "设置已完成！",
                    istop: "0",
                    name: e.ztree[0].name
                }), $("[the-id=addspecialclass]").hide()
            }
        })
    }), $("[the-id=stayset]").live("click", function () {
        window.location.reload()
    }), $("[the-id=pub_special_button]").live("click", function () {
        submitDatas("pub", "pub_special")
    }), $("[the-id=selectClass]").live("change", function () {
        var r = $(this), e = r.val(), t = $("[the-id=ziselecfl]");
        0 < t.length && t.remove(), $.ajax({
            type: "post",
            url: app + "/Set/getSonClass",
            data: {cid: e},
            success: function (e) {
                if ("" != e && e.indexOf("RedisException") < 0 && e.indexOf("functions.php") < 0 && e.indexOf("CommonAction.class.php") < 0 && e.indexOf("sessionConfig.php") < 0) {
                    if ("string" == typeof e && (e = JSON.parse(e)), 0 == e.length) return !1;
                    var t = "";
                    for (var i in e) {
                        var a = e[i];
                        t += "<option value='" + a.id + "'>" + a.name + "</option>"
                    }
                    var s = "<select the-id='ziselecfl'>" + t + "</select>";
                    r.parent().append(s)
                }
            }
        })
    }), $("[the-id=shareSetBug]").live("click", function () {
        var e = $("[name=shareName]").val(), t = $("[name=describe]").val(), i = app + "/Set/savaShareSub",
            a = $(".xzclass select"), s = $(a[a.length - 1]).val() || "", r = "", n = $.fn.zTree.getZTreeObj("tree1");
        if (n) {
            var d = n.getSelectedNodes();
            d.length && (r = d[0].id || "")
        } else r = $("[the-id=hoverid]").val();
        if ("" == s || 0 == s) return alert("请选择分类!"), !1;
        if ("" == t) return alert("描述不能为空！"), !1;
        if (100 < t.length) return alert("描述长度不能超过100个字符！"), !1;
        var l = "", o = {name: e || "", kcuuid: s, describe: t || "", kkid: r}, c = $.fn.zTree.getZTreeObj("shares");
        if (c) {
            var p = c.getCheckedNodes(!0);
            if (0 == p.length) return alert("请选择用户！"), !1;
            for (var h in p) l += p[h].id + "-" + p[h].name + "-" + p[h].type + ",";
            o.sharestring = l
        }
        0 < $("[name=kkid]").length && (i = app + "/Set/savaShareSub", o.kkid = $("[name=kkid]").val());
        var u = $("[name=sharetype]").val() || "";
        o.sharetype = u, $.ajax({
            type: "post", url: i, data: o, success: function (e) {
                1 == e && (alert("设置已完成！"), location = location.href)
            }
        })
    });
    var e = $("[the-id=seniorPanrent]").find(">div");
    $("[the-id=specialsx]").live("click", function () {
        $(".seniorPanrent").eq(0).fadeOut(1e3)
    }), $("[the-id=senior]").live("click", function () {
        $(".seniorPanrent").eq(0).fadeIn(1e3)
    }), $(e).live("click", function () {
        var e = $(this);
        e.addClass("addBlue").siblings().removeClass("addBlue"), e.find("input").attr("checked", "checked"), e.siblings("div").find("input").removeAttr("checked")
    }), $("[the-id = updateswitch]").live("click", function () {
        var e = $("#onoffswitch"), s = e.attr("checked"), r = $.fn.zTree.getZTreeObj("tree1"), n = r.getSelectedNodes();
        if (r && n[0].isParent) {
            if ("checked" !== s) $("[the-id=masker]").show(), $("[the-id=swichStopTouch]").show(); else i() ? ($("[the-id=masker]").show(), $("[the-id=swichTouch]").show()) : e.attr("checked", "checked")
        } else {
            var d = "";
            if ("checked" !== s) d = 0; else {
                if (!i()) return !1;
                d = 1
            }
            var t = {KK_ID: n[0].id, isAll: "0", KS_STATUS: d};
            "cy" == n[0].typecy && (t.typecy = "cy"), $.ajax({
                type: "post",
                async: !1,
                url: app + "/Set/setDateCode",
                dataType: "json",
                data: t,
                success: function (e) {
                    var t = ajaxDispose(e);
                    if ("1" == t.status) {
                        for (var i in alert(t.msg), "checked" !== s ? (n[0].status = 0, $("#onoffswitch").attr("checked", "checked")) : (n[0].status = 1, $("#onoffswitch").removeAttr("checked")), ystree) {
                            var a = ystree[i].id;
                            if (n[0].id == a) {
                                ystree[i].status = d;
                                break
                            }
                        }
                        r.updateNode(n[0]), "cy" == n[0].typecy && "checked" !== s && p()
                    }
                }
            })
        }
    });
    var i = function () {
        var e = $.fn.zTree.getZTreeObj("tree1");
        if (e) {
            var t = e.getSelectedNodes(), i = t[0].getParentNode(), a = t[0].typecy || "";
            if (2 != i.kstype && 0 == i.status || 1 < i.level && 2 == i.kstype && 0 == i.getParentNode().status) return alert("父专题为停用状态，该专题不能启用！"), !1;
            if (1 < i.level && 2 == i.kstype && "" == a) {
                var s = e.getNodesByFilter(function (e) {
                    return e.pId == t[0].pId && "cy" == e.typecy
                }, !1, i);
                if (0 < s.length) {
                    var r = !0;
                    for (var n in s) {
                        if (1 == s[n].status) {
                            r = !1;
                            break
                        }
                    }
                    if (r) return alert("所有成员专题为停用状态，该专题不能启用！"), !1
                }
            }
            return !0
        }
    };
    $("[the-id=saveSpecialKt]").live("click", function () {
        var e = $(this), n = e.attr("isAll"), d = e.attr("kkstatus");
        if (0 == d && 1 == n) return $("[the-id=masker]").hide(), $("[the-id=swichStopTouch]").hide(), $("#onoffswitch").removeAttr("checked"), !1;
        $("#onoffswitch").attr("checked", "checked"), 1 == d && 1 == n && $("#onoffswitch").removeAttr("checked"), 1 == d && 0 == n && $("#onoffswitch").removeAttr("checked");
        var l = $.fn.zTree.getZTreeObj("tree1"), o = l.getSelectedNodes(), t = {KK_ID: o[0].id, isAll: n, KS_STATUS: d};
        "cy" == o[0].typecy && (t.typecy = "cy"), $.ajax({
            type: "post",
            async: !1,
            url: app + "/Set/setDateCode",
            dataType: "json",
            data: t,
            success: function (e) {
                var t = ajaxDispose(e);
                if ("1" == t.status) {
                    alert(t.msg), $("[the-id=masker]").hide(), $("[the-id=swichStopTouch]").hide(), $("[the-id=swichTouch]").hide();
                    var i = l.getNodesByFilter(c, !1, o[0]);
                    for (var a in i) 0 == d ? i[a].status = 0 : 0 == n && (i[a].status = 1);
                    for (var s in o[0].status = 0 == d ? 0 : 1, ystree) {
                        var r = ystree[s].id;
                        if (o[0].id == r) {
                            ystree[s].status = d;
                            break
                        }
                    }
                    "cy" == o[0].typecy && 0 == d && p()
                }
            }
        })
    });
    var c = function (e) {
        return 2 != e.kstype
    }, p = function () {
        var e = $.fn.zTree.getZTreeObj("tree1"), t = e.getSelectedNodes(), i = t[0].getParentNode(), a = 0,
            s = e.getNodesByFilter(function (e) {
                return e.pId == t[0].pId && "cy" == e.typecy
            }, !1, i);
        if (0 < s.length) for (var r in s) {
            1 != s[r].status && a++
        }
        if (a == s.length) {
            var n = e.getNodesByFilter(function (e) {
                return e.pId == t[0].pId && "cy" != e.typecy
            }, !1, i);
            if (0 < n.length) for (var d in n) n[d].status = 0
        }
    };
    $("[the-id=addswitch]").live("click", function () {
        var e = $(this).find("#onoffswitch");
        if (1 == (e.attr("nostatus") || "")) return alert("父专题为停用，所以该专题不能启用！"), !1;
        "checked" == e.attr("checked") ? e.removeAttr("checked") : e.attr("checked", "checked")
    }), $("[the-id=specialinput]").live("click", function () {
        var e = $(this);
        if (e.attr("checked")) {
            $("[the-id=recommend_special] div").show(), "1" == e.attr("customertype") && ($(".words").empty().remove(), $("textarea").empty().remove());
            var t = e.next().text();
            $("[the-id=special_title]").text(t)
        }
    })
});
var setShowTree = function (a, e) {
    if ("" != e) {
        var t = $.fn.zTree.getZTreeObj(a), i = $("#" + a), s = !1;
        null != t && 0 != i.find(">li").length || (s = !0), s && $.ajax({
            type: "post",
            url: app + e,
            success: function (e) {
                if ("" != e && "null" != e && e.indexOf("RedisException") < 0 && e.indexOf("functions.php") < 0 && e.indexOf("CommonAction.class.php") < 0 && e.indexOf("sessionConfig.php") < 0) {
                    if ("string" == typeof e && (e = JSON.parse(e)), "territory" === a) {
                        for (var t in e) e[t].pId = 0, e[t].isParent = !0;
                        $.fn.zTree.init($("#" + a), territorySetting, e)
                    }
                    if ("pub_special" === a && (window.pubZtree = $.fn.zTree.init($("#" + a), pubSpecialSetting, e)), "recommend_special" === a) {
                        var i = "";
                        for (t = 0; t < e.length; t++) i += '<li><label><input the-id="specialinput" type="checkbox" value="' + e[t].id + '" cityId="' + e[t].cityId + '"customerType="' + e[t].customerType + '"departmentId="' + e[t].departmentId + '"level="' + e[t].level + '" provinceId="' + e[t].provinceId + '"thematicName="' + e[t].thematicName + '"><span the-id="specialtj" the-data="' + e[t].departmentId + '">' + e[t].thematicName + "</span></label></li>";
                        $("[the-id=recommend_special] ul").html(i)
                    }
                } else $("#" + a).html("暂无数据")
            }
        })
    }
};

function JsonString(e) {
    var t = "{ ";
    for (var i in e) t += "'" + i + "':'" + e[i] + "',";
    return t = t.substring(0, t.length - 1) + " }"
}

var submitDatas = function (e, t) {
    var c = $.fn.zTree.getZTreeObj("tree1"), i = "", a = "";
    if (null != c) {
        var s = c.getSelectedNodes();
        0 < s.length && (i = 0 < s.length ? s[0].id : "", a = 0 < s.length ? s[0].kstype : "", i = 1 == i ? "" : i)
    }
    var r = $("[the-id=xzname]").val(), n = $("[the-id=infos]").val(),
        d = $.fn.zTree.getZTreeObj(t).getCheckedNodes(!0), l = [], o = "dy" == e ? "请选择地域专题！" : "请选择已有专题！";
    if (o = "pub" == e ? "请选择系统专题！" : o, 0 == d.length) return alert(o), !1;
    for (var p in d) {
        if (d[p].id == i || d[p].name == r) return alert("不能添加!"), !1;
        var h, u = d[p].id || "", v = d[p].name || "", f = "1", y = "0";
        "dy" === e ? (f = d[p].isallinfo, h = d[p].onlymatchsub) : "zt" === e ? y = "0" : (y = d[p].attr, h = d[p].onlymatchsub), status = d[p].status, u = "pub" == e ? d[p].kkid : u;
        var k = d[p].subjectWordLength || [];
        l.push({id: u, name: v, containsub: f, subjectWordLength: k, attr: y, status: status, onlymatchsub: h || "0"})
    }
    var m = {
        kktype: $("[the-id=szkktype]").attr("kktype"),
        hoverid: i,
        kstype: a,
        infos: n,
        isshared: "0",
        checkedid: JSON.stringify(l)
    };
    m.submitclasstype = "dy" == e ? 3 : 1, "pub" == e && (m.isshared = 1), $.ajax({
        type: "post",
        url: app + "/Set/saveSpecialRegion",
        data: m,
        success: function (e) {
            if (!(e = ajaxDispose(e))) return $("[the-id=no]").attr("the-id", "addClass"), !1;
            if ("0" == e.result) alert("设置失败！"); else if ("3" == e.result) alert("该专题名称已存在！"); else if ("-1" == e.result) alert("您选择的信息中有重复专题或分类，请重新选择！"); else if ("1" == e.result) {
                goSetAndPreview({type: 1, ksid: e.ksid, tips: "设置已完成！", istop: "0", name: e.ztree[0].name});
                var t = e.ztree;
                if (0 < t.length && null != c) {
                    var i = c.getSelectedNodes(), a = 0 < i.length ? i[0] : c.getNodeByTId("1"), s = -1, r = !1;
                    for (var n in t) {
                        2 != (o = t[n]).kstype && "cy" == o.typecy ? (o.iconSkin = "iconskin4", r = !0) : o.iconSkin = "iconskin1", o.isParent = !1, o.pId = a.id
                    }
                    if (r) {
                        var d = i[0].getParentNode();
                        s = c.getNodesByParam("typecy", "cy", d).length
                    }
                    if (1 < a.level && 2 == a.kstype && (a.havesonsub = 1), c.addNodes(a, s, t), 0 < t.length) for (var l in t) ystree.push(t[l])
                } else {
                    for (var n in t) {
                        var o;
                        2 != (o = t[n]).kstype && "cy" == o.typecy ? o.iconSkin = "iconskin4" : o.iconSkin = "iconskin1", o.isParent = !1, o.pId = 1
                    }
                    t.push({
                        id: "1",
                        name: "专题列表",
                        pId: "0",
                        kstype: "-1",
                        open: !0,
                        isHidden: !0
                    }), $.fn.zTree.init($("#tree1"), setting, t), ystree.push(t)
                }
                $("[the-id=addspecialclass]").hide()
            }
        }
    })
}, gmove = 1, setPosition = function (i) {
    $.ajax({
        url: app + "/Set/moveposition", type: "post", async: !1, data: i.data, beforeSend: function (e) {
            var t = $(".tree_wrap"), i = t.height(), a = t.width();
            t.append('<div the-id="uploads" class="uploads" style="width:' + a + "px;height:" + i + 'px;"><img src="' + pub + '/images/download.gif" /></div>')
        }, success: function (e) {
            if ((gmove = 1) == e) {
                var t = $.fn.zTree.getZTreeObj("tree1");
                i.xlNodes.kcindex && 0 != i.xlNodes.kcindex ? (i.zxNodes.kcindex = i.xlNodes.kcindex, i.xlNodes.kcindex = i.data.bposition) : (i.zxNodes.ksindex = i.xlNodes.ksindex, i.xlNodes.ksindex = i.data.bposition), "x" === i.type && t.moveNode(i.zxNodes, i.xlNodes, "next"), "s" === i.type && t.moveNode(i.zxNodes, i.xlNodes, "prev"), t.updateNode(i.zxNodes.getParentNode()), $("[the-id=uploads]").remove()
            } else alert("移动失败，刷新页面后再次移动！"), $("[the-id=uploads]").remove()
        }
    })
}, goSetAndPreview = function (e) {
    var t = {width: "452", height: "174", scrollTop: scrollTop, scrollLeft: scrollLeft}, i = popput(t),
        a = e.type || "", s = e.ksid || "", r = e.istop || "", n = e.tips || "", d = e.name || "",
        l = '<div id="popmask" the-id="popmask1" style="width: 100%; height: 100%; z-index: 12; opacity: 0.5;"></div><div class="pops" the-id="wordsdistanceBox" style="width: 452px; top: ' + i.poptop + "px; left: " + i.popleft + 'px; z-index: 13;position: absolute;"><div class="pop_head" the-id="specialcand1_head" style="width: 452px;"><div class="title"></div><div class="pop_close" the-id="stayset"></div></div><div class="pop_con" the-id="specialcand1_con" style="width: 420px;"><div class="line" style="text-align: center;margin-bottom: 10px;">' + n + '</div><div class="buttonwary" style="overflow: hidden;padding: 10px 0 10px 0;"><input class="inp_button" type="button" the-id="stayset" value="继续设置"><input class="inp_button" type="button" the-id="jumpthat" istop=' + r + " btntype=" + a + ' value="浏览专题" name=' + d + " resultId = " + s + "></div></div></div>";
    $("body").append(l)
};