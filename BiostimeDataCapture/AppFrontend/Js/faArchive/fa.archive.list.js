$(document).ready(function () {
    var $faDocListErrorContainer = $('#faDocListErrorContainer');

    var selectButtonName = 'selectButton';
    var $searchText = $('#searchText');
    var $searchButton = $('#searchButton');
    var $showMoreQueryButton = $('#showMoreQueryButton');
    var $exportToExcelButton = $('#exportToExcelButton');

    var $faEgContainer = $('#faEgContainer');
    var $faEgDocGrid = $('#faEgDocGrid');
    var faEgDocPager = '#faEgDocPager';

    var $faHgContainer = $('#faHgContainer');
    var $faHgDocGrid = $('#faHgDocGrid');
    var faHgDocPager = '#faHgDocPager';

    var $faBgContainer = $('#faBgContainer');
    var $faBgDocGrid = $('#faBgDocGrid');
    var faBgDocPager = '#faBgDocPager';

    var $moreQueryContainer = $('#moreQueryContainer');
    var $faEgQueryContainer = $('#faEgQueryContainer');
    var $faHgQueryContainer = $('#faHgQueryContainer');
    var $faBgQueryContainer = $('#faBgQueryContainer');
    
    var $contentItems = $('#contentItems');
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
    var $path = $('#path');
    var $cabinetNo = $('#cabinetNo');

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
        else {
            $faBgContainer.show();
            $faEgContainer.hide();
            $faHgContainer.hide();
        }
    };

    var initializeEgGrid = function () {
        var url = 'GetEgFaDocs?query=';
        var colNames = ['存储内容', '公司', '年份', '月份', '凭证字', '凭证号', '凭证券号', '存储柜号', '存储位置','备注', '操作'];
        var colModel = [
            { name: 'itemval', index: 'itemval', width: 70, sortable: false },
            { name: 'itemval', index: 'itemval', width: 300, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 70, sortable: false },
            { name: 'itemval', index: 'itemval', width: 100, sortable: false },
            { name: 'itemval', index: 'itemval', width: 120, sortable: false },
            { name: 'itemval', index: 'itemval', width: 70, sortable: false },
            { name: 'itemval', index: 'itemval', width: 70, sortable: false }
        ];
        anna.jqGrid.setGridUrl(url);
        anna.jqGrid.setGridWidth(1080);
        anna.jqGrid.setGridCompleteHandler(initializeEgOperatingButton);
        anna.jqGrid.initialize($faEgDocGrid, faEgDocPager, colNames, colModel, null);
    };
    
    var initializeHgGrid = function () {
        var url = 'GetHgFaDocs?query=';
        var colNames = ['存储内容', '公司', '年份', '月份', '合同号', '存储柜号', '存储位置', '操作'];
        var colModel = [
            { name: 'itemval', index: 'itemval', width: 80, sortable: false },
            { name: 'itemval', index: 'itemval', width: 300, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 100, sortable: false },
            { name: 'itemval', index: 'itemval', width: 100, sortable: false },
            { name: 'itemval', index: 'itemval', width: 120, sortable: false },
            { name: 'itemval', index: 'itemval', width: 70, sortable: false }
        ];
        anna.jqGrid.setGridUrl(url);
        anna.jqGrid.setGridWidth(1080);
        anna.jqGrid.setGridCompleteHandler(initializeHgOperatingButton);
        anna.jqGrid.initialize($faHgDocGrid, faHgDocPager, colNames, colModel, null);
    };
    
    var initializeBgGrid = function () {
        var url = 'GetBgFaDocs?query=';
        var colNames = ['存储内容', '公司', '年份', '报告名称', '存储柜号', '存储位置', '操作'];
        var colModel = [
            { name: 'itemval', index: 'itemval', width: 80, sortable: false },
            { name: 'itemval', index: 'itemval', width: 300, sortable: false },
            { name: 'itemval', index: 'itemval', width: 60, sortable: false },
            { name: 'itemval', index: 'itemval', width: 200, sortable: false },
            { name: 'itemval', index: 'itemval', width: 100, sortable: false },
            { name: 'itemval', index: 'itemval', width: 120, sortable: false },
            { name: 'itemval', index: 'itemval', width: 70, sortable: false }
        ];
        anna.jqGrid.setGridUrl(url);
        anna.jqGrid.setGridWidth(1080);
        anna.jqGrid.setGridCompleteHandler(initializeBgOperatingButton);
        anna.jqGrid.initialize($faBgDocGrid, faBgDocPager, colNames, colModel, null);
    };

    var initializeEgOperatingButton = function () {
        $('a[name="' + selectButtonName + '"]', $faEgDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'FaEgMgmt?id=' + itemId;
            window.location.href = url;
        });
    };
    
    var initializeHgOperatingButton = function () {
        $('a[name="' + selectButtonName + '"]', $faHgDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'FaHgMgmt?id=' + itemId;
            window.location.href = url;
        });
    };
    
    var initializeBgOperatingButton = function () {
        $('a[name="' + selectButtonName + '"]', $faBgDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'FaBgMgmt?id=' + itemId;
            window.location.href = url;
        });
    };
    
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
            path: $path.val(),
            cabinetNo: $cabinetNo.val()
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
            path: $path.val(),
            cabinetNo: $cabinetNo.val()
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
            path: $path.val(),
            cabinetNo: $cabinetNo.val()
        };
        return anna.jsonStringify(parameter);
    };

    $searchButton.click(function () {
        var isValidateSuccess = anna.validator.validate(null, $faDocListErrorContainer);
        if (!isValidateSuccess) {
            $('html, body').animate({ scrollTop: 0 }, 0);
            return;
        }
        var url, query;
        if ($content.val() == '凭证') {
            query = getEgParameter();
            url = 'GetEgFaDocs?query=' + query;
            $faEgDocGrid.clearGridData();
            $faEgDocGrid.setGridParam({
                url: url
            });
            $faEgDocGrid.trigger("reloadGrid");
        }
        else if ($content.val() == '海关缴款书') {
            query = getHgParameter();
            url = 'GetHgFaDocs?query=' + query;
            $faHgDocGrid.clearGridData();
            $faHgDocGrid.setGridParam({
                url: url
            });
            $faHgDocGrid.trigger("reloadGrid");
        }
        else if ($content.val() == '审计报告') {
            query = getBgParameter();
            url = 'GetBgFaDocs?query=' + query;
            $faBgDocGrid.clearGridData();
            $faBgDocGrid.setGridParam({
                url: url
            });
            $faBgDocGrid.trigger("reloadGrid");
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
        $path.val('');
        $cabinetNo.val('');
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

    $exportToExcelButton.click(function () {
        try {
            var query, url;
            if ($content.val() == '凭证') {
                query = getEgParameter();
                url = 'ExportEgToExcel?content=凭证&query=' + query;
                top.location = url;
            } else if ($content.val() == '海关缴款书') {
                query = getHgParameter();
                url = 'ExportHgToExcel?content=海关缴款书&query=' + query;
                top.location = url;
            } else if ($content.val() == '审计报告') {
                query = getBgParameter();
                url = 'ExportBgToExcel?content=审计报告&query=' + query;
                top.location = url;
            }

        } catch (err) {
            var errMsg = '出现异常,错误名称: ' + err.name + '错误信息: ' + err.message;
            anna.alert(errMsg);
        }
    });
    
    $voucherNo.rules("add", {
        number: true,
        messages: { number: '劵号必需为数字。' }
    });
    initContentItems();
    initializeEgGrid();
    initializeHgGrid();
    initializeBgGrid();
    initializationGrid();
});