$(document).ready(function () {
    var $faDocListErrorContainer = $('#faDocListErrorContainer');

    var selectButtonName = 'selectButton';
    var $searchText = $('#searchText');
    var $searchButton = $('#searchButton');
    var $showMoreQueryButton = $('#showMoreQueryButton');
    var $exportToExcelButton = $('#exportToExcelButton');

    var $faDocGrid = $('#faDocGrid');
    var faDocPager = '#faDocPager';

    var $moreQueryContainer = $('#moreQueryContainer');
    var $content = $('#content');
    var $year = $('#year');
    var $month = $('#month');
    var $voucherWord = $('#voucherWord');
    var $voucherNumber = $('#voucherNumber');
    var $voucherNo = $('#voucherNo');
    var $path = $('#path');
    var $cabinetNo = $('#cabinetNo');


    var initializeClientGrid = function () {
        var url = 'GetFaLendDoc?query=';
        var colNames = ['存储内容', '公司', '年份', '月份', '凭证字', '凭证号', '凭证券号', '存储位置', '存储柜号', '操作'];
        var colModel = [
            { name: 'itemval', index: 'itemval', width: 140, sortable: false },
            { name: 'itemval', index: 'itemval', width: 140, sortable: false },
            { name: 'itemval', index: 'itemval', width: 90, sortable: false },
            { name: 'itemval', index: 'itemval', width: 90, sortable: false },
            { name: 'itemval', index: 'itemval', width: 90, sortable: false },
            { name: 'itemval', index: 'itemval', width: 90, sortable: false },
            { name: 'itemval', index: 'itemval', width: 80, sortable: false },
            { name: 'itemval', index: 'itemval', width: 125, sortable: false },
            { name: 'itemval', index: 'itemval', width: 120, sortable: false },
            { name: 'itemval', index: 'itemval', width: 62, sortable: false }
        ];
        webui.jqGrid.setGridUrl(url);
        webui.jqGrid.setGridWidth(1080);
        webui.jqGrid.setGridCompleteHandler(initializeOperatingButton);
        webui.jqGrid.initialize($faDocGrid, faDocPager, colNames, colModel, null);
    };

    var initializeOperatingButton = function () {
        $('a[name="' + selectButtonName + '"]', $faDocGrid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'FaDocMgmt?id=' + itemId;
            window.location.href = url;
        });
    };

    var getParameter = function () {
        var parameter =
        {
            query: $searchText.val(),
            content: $content.val(),
            year: $year.val(),
            month: $month.val(),
            voucherWord: $voucherWord.val(),
            voucherNumber: $voucherNumber.val(),
            voucherNo: $voucherNo.val(),
            path: $path.val(),
            cabinetNo: $cabinetNo.val()
        };
        return webui.jsonStringify(parameter);
    };

    $searchButton.click(function () {
        var isValidateSuccess = webui.validator.validate(null, $faDocListErrorContainer);
        if (!isValidateSuccess) {
            $('html, body').animate({ scrollTop: 0 }, 0);
            return;
        }
        var query = getParameter();
        var url = 'GetFaDocs?query=' + query;
        $faDocGrid.clearGridData();
        $faDocGrid.setGridParam({
            url: url
        });
        $faDocGrid.trigger("reloadGrid");
    });

    $showMoreQueryButton.click(function () {
        $content.val('');
        $year.val('');
        $month.val('');
        $voucherWord.val('');
        $voucherNumber.val('');
        $voucherNo.val('');
        $path.val('');
        $cabinetNo.val('');
        $moreQueryContainer.toggle();
    });

    $exportToExcelButton.click(function () {
        try {
            var query = getParameter();
            var url = 'ExportToExcel?query=' + query;
            top.location = url;
        } catch (err) {
            var errMsg = '出现异常,错误名称: ' + err.name + '错误信息: ' + err.message;
            webui.alert(errMsg);
        }
    });

    $year.rules("add", {
        number: true,
        messages: { number: '年份必需为数字。' }
    });
    $month.rules("add", {
        number: true,
        messages: { number: '月份必需为数字。' }
    });
    $voucherNo.rules("add", {
        number: true,
        messages: { number: '劵号必需为数字。' }
    });
    initializeClientGrid();
});