$(document).ready(function () {
    var $faDocListErrorContainer = $('#faDocListErrorContainer');

    var $searchText = $('#searchText');
    var $searchButton = $('#searchButton');
    var $showMoreQueryButton = $('#showMoreQueryButton');
    var jieyueButtonName = 'JieyueButton';
    var editButtonName = 'EditButton';
    var cancelButtonName = 'CancelButton';

    var $faEgContainer = $('#faEgContainer');
    var $faEgLendDocGrid = $('#faEgLendDocGrid');
    var faEgLendDocPager = '#faEgLendDocPager';

    var $faHgContainer = $('#faHgContainer');
    var $faHgLendDocGrid = $('#faHgLendDocGrid');
    var faHgLendDocPager = '#faHgLendDocPager';
    
    var $faBgContainer = $('#faBgContainer');
    var $faBgLendDocGrid = $('#faBgLendDocGrid');
    var faBgLendDocPager = '#faBgLendDocPager';
    
    var $moreQueryContainer = $('#moreQueryContainer');
    var $faEgQueryContainer = $('#faEgQueryContainer');
    var $faHgQueryContainer = $('#faHgQueryContainer');
    var $faBgQueryContainer = $('#faBgQueryContainer');
    
    var $contentItems = $('#contentItems');
    var $companyItems = $('#companyItems');
    var $content = $('#content');
    var $company = $('#company');
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
        else{
            $faBgContainer.show();
            $faEgContainer.hide();
            $faHgContainer.hide();
        }
    };

    var initializeEgLendGrid = function () {
        var url = 'GetFaEgLendDoc?content=凭证&query=';
        var colNames = ['申请人账号', '申请人', '存储内容', '公司', '年份', '月份', '凭证字', '凭证号', '凭证券号', '存储柜号', '存储位置', '备注', '借阅天数', '借阅时间', '归还时间', '操作'];
        var colModel = [
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 58,sortable: false },
            { name: 'itemval', index: 'itemval', width: 90,sortable: false },
            { name: 'itemval', index: 'itemval', width: 40, sortable: false },
            { name: 'itemval', index: 'itemval', width: 40, sortable: false },
            { name: 'itemval', index: 'itemval', width: 55, sortable: false },
            { name: 'itemval', index: 'itemval', width: 50, sortable: false },
            { name: 'itemval', index: 'itemval', width: 70, sortable: false },
            { name: 'itemval', index: 'itemval', width: 90, sortable: false },
            { name: 'itemval', index: 'itemval', width: 70, sortable: false },
            { name: 'itemval', index: 'itemval', width: 70, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 70, sortable: false },
            { name: 'itemval', index: 'itemval', width: 70, sortable: false },
            { name: 'itemval', index: 'itemval', width: 180,sortable: false }
        ];
        anna.jqGrid.setGridUrl(url);
        anna.jqGrid.setGridWidth(1080);
        anna.jqGrid.setGridCompleteHandler(initializeEgOperatingButton);
        anna.jqGrid.initialize($faEgLendDocGrid, faEgLendDocPager, colNames, colModel, null);
    };

    var initializeHgLendGrid = function () {
        var url = 'GetFaHgLendDoc?content=海关缴款书&query=';
        var colNames = ['申请人账号', '申请人', '存储内容', '公司', '年份', '月份', '合同号', '存储柜号', '存储位置', '借阅天数', '借阅时间', '归还时间', '操作'];
        var colModel = [
            { name: 'itemval', index: 'itemval', width: 70, sortable: false },
            { name: 'itemval', index: 'itemval', width: 70, sortable: false },
            { name: 'itemval', index: 'itemval', width: 100, sortable: false },
            { name: 'itemval', index: 'itemval', width: 100, sortable: false },
            { name: 'itemval', index: 'itemval', width: 40, sortable: false },
            { name: 'itemval', index: 'itemval', width: 40, sortable: false },
            { name: 'itemval', index: 'itemval', width: 80, sortable: false },
            { name: 'itemval', index: 'itemval', width: 80, sortable: false },
            { name: 'itemval', index: 'itemval', width: 80, sortable: false },
            { name: 'itemval', index: 'itemval', width: 80, sortable: false },
            { name: 'itemval', index: 'itemval', width: 70, sortable: false },
            { name: 'itemval', index: 'itemval', width: 85, sortable: false },
            { name: 'itemval', index: 'itemval', width: 180, sortable: false }
        ];
        anna.jqGrid.setGridUrl(url);
        anna.jqGrid.setGridWidth(1080);
        anna.jqGrid.setGridCompleteHandler(initializeHgOperatingButton);
        anna.jqGrid.initialize($faHgLendDocGrid, faHgLendDocPager, colNames, colModel, null);
    };

    var initializeBgLendGrid = function () {
        var url = 'GetFaBgLendDoc?content=审计报告&query=';
        var colNames = ['申请人账号', '申请人', '存储内容', '公司', '年份', '报告名称', '存储柜号', '存储位置', '借阅天数', '借阅时间', '归还时间', '操作'];
        var colModel = [
            { name: 'itemval', index: 'itemval', width: 70, sortable: false },
            { name: 'itemval', index: 'itemval', width: 70, sortable: false },
            { name: 'itemval', index: 'itemval', width: 110, sortable: false },
            { name: 'itemval', index: 'itemval', width: 110, sortable: false },
            { name: 'itemval', index: 'itemval', width: 40, sortable: false },
            { name: 'itemval', index: 'itemval', width: 85, sortable: false },
            { name: 'itemval', index: 'itemval', width: 85, sortable: false },
            { name: 'itemval', index: 'itemval', width: 85, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 85, sortable: false },
            { name: 'itemval', index: 'itemval', width: 85, sortable: false },
            { name: 'itemval', index: 'itemval', width: 180, sortable: false }
        ];
        anna.jqGrid.setGridUrl(url);
        anna.jqGrid.setGridWidth(1080);
        anna.jqGrid.setGridCompleteHandler(initializeBgOperatingButton);
        anna.jqGrid.initialize($faBgLendDocGrid, faBgLendDocPager, colNames, colModel, null);
    };

    var initializeEgOperatingButton = function () {
        $('a[name="' + jieyueButtonName + '"]', $faEgLendDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'ArgeeJieyue?id=' + itemId;
            anna.confirm('确认要借阅吗？', function () {
                anna.ajaxGet(url, function (data) {
                    anna.alert(data.resultValue, function () {
                        $faEgLendDocGrid.trigger("reloadGrid");
                    });
                });
            });
        });
        $('a[name="' + cancelButtonName + '"]', $faEgLendDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'DisagreeJieyue?id=' + itemId;
            anna.confirm('确认要取消借阅吗？', function () {
                anna.ajaxGet(url, function (data) {
                    anna.alert(data.resultValue, function () {
                        $faEgLendDocGrid.trigger("reloadGrid");
                    });
                });
            });
        });
        $('a[name="' + editButtonName + '"]', $faEgLendDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'FaLendDocMgmt?id=' + itemId;
            window.location.href = url;
        });
    };

    var initializeHgOperatingButton = function () {
        $('a[name="' + jieyueButtonName + '"]', $faHgLendDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'ArgeeJieyue?id=' + itemId;
            anna.confirm('确认要借阅吗？', function () {
                anna.ajaxGet(url, function (data) {
                    anna.alert(data.resultValue, function () {
                        $faHgLendDocGrid.trigger("reloadGrid");
                    });
                });
            });
        });
        $('a[name="' + cancelButtonName + '"]', $faHgLendDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'DisagreeJieyue?id=' + itemId;
            anna.confirm('确认要取消借阅吗？', function () {
                anna.ajaxGet(url, function (data) {
                    anna.alert(data.resultValue, function () {
                        $faHgLendDocGrid.trigger("reloadGrid");
                    });
                });
            });
        });
        $('a[name="' + editButtonName + '"]', $faHgLendDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'FaLendDocMgmt?id=' + itemId;
            window.location.href = url;
        });
    };

    var initializeBgOperatingButton = function () {
        $('a[name="' + jieyueButtonName + '"]', $faBgLendDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'ArgeeJieyue?id=' + itemId;
            anna.confirm('确认要借阅吗？', function () {
                anna.ajaxGet(url, function (data) {
                    anna.alert(data.resultValue, function () {
                        $faBgLendDocGrid.trigger("reloadGrid");
                    });
                });
            });
        });
        $('a[name="' + cancelButtonName + '"]', $faBgLendDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'DisagreeJieyue?id=' + itemId;
            anna.confirm('确认要取消借阅吗？', function () {
                anna.ajaxGet(url, function (data) {
                    anna.alert(data.resultValue, function () {
                        $faBgLendDocGrid.trigger("reloadGrid");
                    });
                });
            });
        });
        $('a[name="' + editButtonName + '"]', $faBgLendDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'FaLendDocMgmt?id=' + itemId;
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
            yearEnd : $yearEnd.val(),
            baogaoMingcheng: $baogaoMingcheng.val(),
            jieyueShijianBegin: $jieyueShijianBegin.val(),
            jieyueShijianEnd: $jieyueShijianEnd.val()
        };
        return anna.jsonStringify(parameter);
    };
    
    $searchButton.click(function () {
        var isValidateSuccess = webui.validator.validate(null, $faDocListErrorContainer);
        if (!isValidateSuccess) {
            $('html, body').animate({ scrollTop: 0 }, 0);
            return;
        }
        var url, query;
        if ($content.val() == '凭证') {
            query = getEgParameter();
            url = 'GetFaEgLendDoc?query=' + query;
            $faEgLendDocGrid.clearGridData();
            $faEgLendDocGrid.setGridParam({
                url: url
            });
            $faEgLendDocGrid.trigger("reloadGrid");
        }
        else if ($content.val() == '海关缴款书') {
             query = getHgParameter();
             url = 'GetFaHgLendDoc?query=' + query;
             $faHgLendDocGrid.clearGridData();
             $faHgLendDocGrid.setGridParam({
                 url: url
             });
             $faHgLendDocGrid.trigger("reloadGrid");
        }
        else if ($content.val() == '审计报告') {
            query = getBgParameter();
            url = 'GetFaBgLendDoc?query=' + query;
            $faBgLendDocGrid.clearGridData();
            $faBgLendDocGrid.setGridParam({
                url: url
            });
            $faBgLendDocGrid.trigger("reloadGrid");
        }
    });

    $showMoreQueryButton.click(function () {
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
    });
    $voucherNo.rules("add", {
        number: true,
        messages: { number: '劵号必需为数字。' }
    });
    initContentItems();
    initCompanyItems();
    initializeEgLendGrid();
    initializeHgLendGrid();
    initializeBgLendGrid();
    initializationGrid();
});