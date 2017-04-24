$(document).ready(function () {
    var editButtonName = 'editButton';
    var $searchText = $('#searchText');
    var $searchButton = $('#searchButton');
    var $companyStates = $('#companyStates');
    var $addButton = $('#addButton');

    var $grid = $('#dataGrid');
    var gridPager = '#dataPager';

    var initGrid = function () {
        var url = 'GetFaCampanines?query=&enable=';
        var colNames = ['公司名称', '是否启用', '更新日期', '备注', '操作'];
        var colModel = [
            { name: 'itemval', index: 'itemval', width: 420, sortable: false },
            { name: 'itemval', index: 'itemval', width: 120, sortable: false },
            { name: 'itemval', index: 'itemval', width: 200, sortable: false },
            { name: 'itemval', index: 'itemval', width: 100, sortable: false },
            { name: 'itemval', index: 'itemval', width: 120, sortable: false }
        ];
        anna.jqGrid.setGridUrl(url);
        anna.jqGrid.setGridWidth(1080);
        anna.jqGrid.setGridAddfunc(addButtonHandler);
        anna.jqGrid.setGridCompleteHandler(initializeOperatingButton);
        anna.jqGrid.initialize($grid, gridPager, colNames, colModel, null);
    };
    
    var addButtonHandler = function () {
        var url = 'FaCompanyMgmt';
        window.location.href = url;
    };

    var initAddBtn = function() {
        if (1 == 1) {
            $addButton.show();
        }
    };

    var initializeOperatingButton = function () {
        $('a[name="' + editButtonName + '"]', $grid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'FaCompanyMgmt?id=' + itemId;
            window.location.href = url;
        });
    };

    var searchCompany = function () {
        var query = $.trim($searchText.val());
        var enable = $companyStates.val();
        var url = 'GetFaCampanines?query=' + query + "&enable=" + enable;
        $grid.clearGridData();
        $grid.setGridParam({
            url: url
        });
        $grid.trigger("reloadGrid");
    };

    $searchButton.click(function () {
        searchCompany();
    });
    
    $companyStates.change(function () {
        searchCompany();
    });
    initGrid();
});