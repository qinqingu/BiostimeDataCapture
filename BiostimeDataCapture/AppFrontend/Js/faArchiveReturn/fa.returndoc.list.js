﻿$(document).ready(function () {
    var $faReturnDocListErrorContainer = $('#faReturnDocListErrorContainer');

    var $searchText = $('#searchText');
    var $searchButton = $('#searchButton');
    var $showMoreQueryButton = $('#showMoreQueryButton');
    var $exportToExcelButton = $('#exportToExcelButton');
    
    var guihuanButtonName = 'GuihuanButton';
    var editButtonName = 'EditButton';
    
    var $faEgContainer = $('#faEgContainer');
    var $faEgReturnDocGrid = $('#faEgReturnDocGrid');
    var faEgReturnDocPager = '#faEgReturnDocPager';

    var $faHgContainer = $('#faHgContainer');
    var $faHgReturnDocGrid = $('#faHgReturnDocGrid');
    var faHgReturnDocPager = '#faHgReturnDocPager';

    var $faBgContainer = $('#faBgContainer');
    var $faBgReturnDocGrid = $('#faBgReturnDocGrid');
    var faBgReturnDocPager = '#faBgReturnDocPager';

    var $moreQueryContainer = $('#moreQueryContainer');
    var $faEgQueryContainer = $('#faEgQueryContainer');
    var $faHgQueryContainer = $('#faHgQueryContainer');
    var $faBgQueryContainer = $('#faBgQueryContainer');
    var $faReturnDocGrid = $('#faReturnDocGrid');
    
    var $contentItems = $('#contentItems');
    var $companyItems = $('#companyItems');
    var $company = $('#company');
    var $content = $('#content');
    var $yearBegin = $('#yearBegin');
    var $yearEnd = $('#yearEnd');
    var $monthBegin = $('#monthBegin');
    var $monthEnd = $('#monthEnd');
    var $voucherWord = $('#voucherWord');
    var $voucherNumber = $('#voucherNumber');
    var $voucherNo = $('#voucherNo');
    var $baogaoMingcheng = $('#baogaoMingcheng');
    var $hetongHao = $('#hetongHao');
    var $jieyueShijianBegin = $('#jieyueShijianBegin');
    var $jieyueShijianEnd = $('#jieyueShijianEnd');
    //var $path = $('#path');
    //var $cabinetNo = $('#cabinetNo');

    //初始化存储内容数据
    var initContentItems = function () {
        $content.empty();
        if (!$contentItems.val()) {
            return;
        }
        var contentItems = $.parseJSON($contentItems.val());
        if (contentItems.length == 0) {
            return;
        }
        for (var index = 0; index < contentItems.length; index++) {
            var item = contentItems[index];
            $content.append($('<option></option>').val(item.Name).html(item.Name));
        }
    };

    //初始化公司数据
    var initCompanyItems = function () {
        $company.empty();
        if (!$companyItems.val()) {
            return;
        }
        var companyItems = $.parseJSON($companyItems.val());
        if (companyItems.length == 0) {
            return;
        }
        $company.append($('<option></option>').val('').html('选择'));
        for (var index = 0; index < companyItems.length; index++) {
            var item = companyItems[index];
            $company.append($('<option></option>').val(item.Name).html(item.Name)
            );
        }
    };

    $content.change(function () {
        if ($moreQueryContainer.is(":visible") && $(this).val() == '凭证') {
            $faEgQueryContainer.show();
            $faHgQueryContainer.hide();
            $faBgQueryContainer.hide();
        } else if ($moreQueryContainer.is(":visible") && $(this).val() == '海关缴款书') {
            $faEgQueryContainer.hide();
            $faHgQueryContainer.show();
            $faBgQueryContainer.hide();
        } else if ($moreQueryContainer.is(":visible") && $(this).val() == '审计报告') {
            $faEgQueryContainer.hide();
            $faHgQueryContainer.hide();
            $faBgQueryContainer.show();
        }
        initializationGrid();
    });
    var initializationGrid = function () {
        if (!$content.val() || $content.val() == '凭证') {
            $faEgContainer.show();
            $faHgContainer.hide();
            $faBgContainer.hide();
            return;
        }
        else if ($content.val() == '海关缴款书') {
            $faEgContainer.hide();
            $faHgContainer.show();
            $faBgContainer.hide();
        }
        else {
            $faBgContainer.show();
            $faEgContainer.hide();
            $faHgContainer.hide();
        }
    };

    var initializeEgGrid = function () {
        var url = 'GetFaEgReturnDoc?content=凭证&query=';
        var colNames = ['申请人账号','申请人', '存储内容', '公司', '年份', '月份', '凭证字', '凭证号', '凭证券号', '存储柜号', '存储位置', '备注', '借阅天数', '借阅时间', '归还时间', '操作', '超期天数'];
        var colModel = [
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 110,sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 40, sortable: false },
            { name: 'itemval', index: 'itemval', width: 40, sortable: false },
            { name: 'itemval', index: 'itemval', width: 50, sortable: false },
            { name: 'itemval', index: 'itemval', width: 50, sortable: false },
            { name: 'itemval', index: 'itemval', width: 50, sortable: false },
            { name: 'itemval', index: 'itemval', width: 85, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 80, sortable: false },
            { name: 'itemval', index: 'itemval', width: 80, sortable: false },
            { name: 'itemval', index: 'itemval', width: 120, sortable: false },
            { name: 'itemval', index: 'itemval', width: 55, sortable: false }
        ];
        anna.jqGrid.setGridUrl(url);
        anna.jqGrid.setGridWidth(1080);
        anna.jqGrid.setGridCompleteHandler(initializeEgOperatingButton);
        anna.jqGrid.initialize($faEgReturnDocGrid, faEgReturnDocPager, colNames, colModel, null);
    };
    
    var initializeHgGrid = function () {
        var url = 'GetFaHgReturnDoc?content=海关缴款书&query=';
        var colNames = ['申请人账号', '申请人', '存储内容', '公司', '年份', '月份', '合同号', '存储柜号', '存储位置', '借阅天数', '借阅时间', '归还时间', '操作', '超期天数'];
        var colModel = [
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 110, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 40, sortable: false },
            { name: 'itemval', index: 'itemval', width: 40, sortable: false },
            { name: 'itemval', index: 'itemval', width: 50, sortable: false },
            { name: 'itemval', index: 'itemval', width: 85, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 80, sortable: false },
            { name: 'itemval', index: 'itemval', width: 80, sortable: false },
            { name: 'itemval', index: 'itemval', width: 120, sortable: false },
            { name: 'itemval', index: 'itemval', width: 55, sortable: false }
        ];
        anna.jqGrid.setGridUrl(url);
        anna.jqGrid.setGridWidth(1080);
        anna.jqGrid.setGridCompleteHandler(initializeHgOperatingButton);
        anna.jqGrid.initialize($faHgReturnDocGrid, faHgReturnDocPager, colNames, colModel, null);
    };
    
    var initializeBgGrid = function () {
        var url = 'GetFaBgReturnDoc?content=审计报告&query=';
        var colNames = ['申请人账号', '申请人', '存储内容', '公司', '年份', '报告名称', '存储柜号', '存储位置', '借阅天数', '借阅时间', '归还时间', '操作', '超期天数'];
        var colModel = [
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 110, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 40, sortable: false },
            { name: 'itemval', index: 'itemval', width: 50, sortable: false },
            { name: 'itemval', index: 'itemval', width: 85, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 80, sortable: false },
            { name: 'itemval', index: 'itemval', width: 80, sortable: false },
            { name: 'itemval', index: 'itemval', width: 120, sortable: false },
            { name: 'itemval', index: 'itemval', width: 55, sortable: false }
        ];
        anna.jqGrid.setGridUrl(url);
        anna.jqGrid.setGridWidth(1080);
        anna.jqGrid.setGridCompleteHandler(initializeBgOperatingButton);
        anna.jqGrid.initialize($faBgReturnDocGrid, faBgReturnDocPager, colNames, colModel, null);
    };

    var initializeEgOperatingButton = function () {
        $('a[name="' + guihuanButtonName + '"]', $faEgReturnDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'Guihuan?id=' + itemId;
            anna.confirm('确认归还吗？', function () {
                anna.ajaxGet(url, function (data) {
                    anna.alert(data.resultValue, function () {
                        $faEgReturnDocGrid.trigger("reloadGrid");
                    });
                });
            });
        });
        $('a[name="' + editButtonName + '"]', $faEgReturnDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'FaReturnDocMgmt?id=' + itemId;
            window.location.href = url;
        });
    };
    
    var initializeHgOperatingButton = function () {
        $('a[name="' + guihuanButtonName + '"]', $faHgReturnDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'Guihuan?id=' + itemId;
            anna.confirm('确认归还吗？', function () {
                anna.ajaxGet(url, function (data) {
                    anna.alert(data.resultValue, function () {
                        $faHgReturnDocGrid.trigger("reloadGrid");
                    });
                });
            });
        });
        $('a[name="' + editButtonName + '"]', $faHgReturnDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'FaReturnDocMgmt?id=' + itemId;
            window.location.href = url;
        });
    };

    var initializeBgOperatingButton = function () {
        $('a[name="' + guihuanButtonName + '"]', $faBgReturnDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'Guihuan?id=' + itemId;
            anna.confirm('确认归还吗？', function () {
                anna.ajaxGet(url, function (data) {
                    anna.alert(data.resultValue, function () {
                        $faBgReturnDocGrid.trigger("reloadGrid");
                    });
                });
            });
        });
        $('a[name="' + editButtonName + '"]', $faBgReturnDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'FaReturnDocMgmt?id=' + itemId;
            window.location.href = url;
        });
    };

    $jieyueShijianBegin.datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        yearRange: "-5:+25",
        onClose: function (selectedDate) {
            $jieyueShijianEnd.datepicker("option", "minDate", selectedDate);
            $(this).blur();
        }
    });

    $jieyueShijianEnd.datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        yearRange: "-5:+25",
        onClose: function (selectedDate) {
            $jieyueShijianBegin.datepicker("option", "maxDate", selectedDate);
            $(this).blur();
        }
    });

    var getEgParameter = function () {
        var parameter =
        {
            query: $searchText.val(),
            content: $content.val(),
            company: $company.val(),
            yearBegin: $yearBegin.val(),
            yearEnd: $yearEnd.val(),
            monthBegin: $monthBegin.val(),
            monthEnd: $monthEnd.val(),
            voucherWord: $voucherWord.val(),
            voucherNumber: $voucherNumber.val(),
            voucherNo: $voucherNo.val(),
            jieyueShijianBegin: $jieyueShijianBegin.val(),
            jieyueShijianEnd: $jieyueShijianEnd.val()
        };
        return anna.jsonStringify(parameter);
    };

    var getHgParameter = function () {
        var parameter =
        {
            query: $searchText.val(),
            content: $content.val(),
            company: $company.val(),
            yearBegin: $yearBegin.val(),
            yearEnd: $yearEnd.val(),
            monthBegin: $monthBegin.val(),
            monthEnd: $monthEnd.val(),
            hetongHao: $hetongHao.val(),
            jieyueShijianBegin: $jieyueShijianBegin.val(),
            jieyueShijianEnd: $jieyueShijianEnd.val()
        };
        return anna.jsonStringify(parameter);
    };

    var getBgParameter = function () {
        var parameter =
        {
            query: $searchText.val(),
            content: $content.val(),
            company: $company.val(),
            yearBegin: $yearBegin.val(),
            yearEnd: $yearEnd.val(),
            baogaoMingcheng: $baogaoMingcheng.val(),
            jieyueShijianBegin: $jieyueShijianBegin.val(),
            jieyueShijianEnd: $jieyueShijianEnd.val()
        };
        return anna.jsonStringify(parameter);
    };
    
    $searchButton.click(function () {
        var isValidateSuccess = anna.validator.validate(null, $faReturnDocListErrorContainer);
        if (!isValidateSuccess) {
            $('html, body').animate({ scrollTop: 0 }, 0);
            return;
        }
        var url, query;
        if ($content.val() == '凭证') {
            query = getEgParameter();
            url = 'GetFaEgReturnDoc?query=' + query;
            $faEgReturnDocGrid.clearGridData();
            $faEgReturnDocGrid.setGridParam({
                url: url
            });
            $faEgReturnDocGrid.trigger("reloadGrid");
        }
        else if ($content.val() == '海关缴款书') {
            query = getHgParameter();
            url = 'GetFaHgReturnDoc?query=' + query;
            $faHgReturnDocGrid.clearGridData();
            $faHgReturnDocGrid.setGridParam({
                url: url
            });
            $faHgReturnDocGrid.trigger("reloadGrid");
        }
        else if ($content.val() == '审计报告') {
            query = getBgParameter();
            url = 'GetFaBgReturnDoc?query=' + query;
            $faBgReturnDocGrid.clearGridData();
            $faBgReturnDocGrid.setGridParam({
                url: url
            });
            $faBgReturnDocGrid.trigger("reloadGrid");
        }
    });

    $showMoreQueryButton.click(function () {
        $content.val('');
        $company.val('');
        $yearBegin.val('');
        $yearEnd.val('');
        $monthBegin.val('');
        $monthEnd.val('');
        $voucherWord.val('');
        $voucherNumber.val('');
        $voucherNo.val('');
        $baogaoMingcheng.val('');
        $hetongHao.val('');
        $jieyueShijianBegin.val('');
        $jieyueShijianEnd.val('');
        //$path.val('');
        //$cabinetNo.val('');
        $moreQueryContainer.toggle();
        if ($moreQueryContainer.is(":visible") && $content.val() == '凭证') {
            $faEgQueryContainer.show();
        } else {
            $faEgQueryContainer.hide();
        }
        if ($moreQueryContainer.is(":visible") && $content.val() == '海关缴款书') {
            $faHgQueryContainer.show();
        } else {
            $faHgQueryContainer.hide();
        }
        if ($moreQueryContainer.is(":visible") && $content.val() == '审计报告') {
            $faBgQueryContainer.show();
        } else {
            $faBgQueryContainer.hide();
        }
        return false;
      
        return false;
    });

    $exportToExcelButton.click(function () {
        try {
            var query = getParameter();
            var url = 'ExportToExcel?query=' + query;
            top.location = url;
        } catch (err) {
            var errMsg = '出现异常,错误名称: ' + err.name + '错误信息: ' + err.message;
            anna.alert(errMsg);
        }
    });

    //$year.rules("add", {
    //    number: true,
    //    messages: { number: '年份必需为数字。' }
    //});
    //$month.rules("add", {
    //    number: true,
    //    messages: { number: '月份必需为数字。' }
    //});
    $voucherNo.rules("add", {
        number: true,
        messages: { number: '劵号必需为数字。' }
    });
    initContentItems();
    initCompanyItems();
    initializeEgGrid();
    initializeHgGrid();
    initializeBgGrid();
    initializationGrid();
});