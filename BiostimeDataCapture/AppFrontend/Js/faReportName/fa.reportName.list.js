$(document).ready(function () {
    var editButtonName = 'editButton';
    var $searchText = $('#searchText');
    var $searchButton = $('#searchButton');
    var $reportNameStates = $('#reprotNameStates');

    var $grid = $('#dataGrid');
    var gridPager = '#dataPager';

    var initGrid = function () {
        var url = 'GetFaReportNames?query=&enable=';
        var colNames = ['报告名称', '是否启用', '更新日期', '备注', '操作'];
        var colModel = [
            { name: 'itemval', index: 'itemval', width: 420, sortable: false },
            { name: 'itemval', index: 'itemval', width: 120, sortable: false },
            { name: 'itemval', index: 'itemval', width: 200, sortable: false },
            { name: 'itemval', index: 'itemval', width: 120, sortable: false },
            { name: 'itemval', index: 'itemval', width: 120, sortable: false }
        ];
        anna.jqGrid.setGridUrl(url);
        anna.jqGrid.setGridWidth(1080);
        anna.jqGrid.setGridAddfunc(addButtonHandler);
        anna.jqGrid.setGridCompleteHandler(initializeOperatingButton);
        anna.jqGrid.initialize($grid, gridPager, colNames, colModel, null);
    };

    var addButtonHandler = function () {
        var url = 'FaReportNameMgmt';
        window.location.href = url;
    };

    var initializeOperatingButton = function () {
        $('a[name="' + editButtonName + '"]', $grid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'FaReportNameMgmt?id=' + itemId;
            window.location.href = url;
        });
    };

    var searchReportName = function() {
        var query = $.trim($searchText.val());
        var enable = $reportNameStates.val();
        var url = 'GetFaReportNames?query=' + query + "&enable=" + enable;
        $grid.clearGridData();
        $grid.setGridParam({
            url: url
        });
        $grid.trigger("reloadGrid");
    };

    $searchButton.click(function () {
        searchReportName();
    });
    
    $reportNameStates.change(function () {
        searchReportName();
    });
    
    initGrid();
});