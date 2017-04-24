$(document).ready(function () {
    var editButtonName = 'editButton';
    var delButtonName = 'delButton';
    var $searchText = $('#searchText');
    var $cabinetNoStates = $('#cabinetNoStates');
    var $searchButton = $('#searchButton');

    var $grid = $('#dataGrid');
    var gridPager = '#dataPager';

    var initGrid = function () {
        var url = 'GetFaCabineNos?query=&enable=';
        var colNames = ['柜号','存储位置', '是否启用','更新日期','操作'];
        var colModel = [
            { name: 'itemval', index: 'itemval', width: 200, sortable: false },
            { name: 'itemval', index: 'itemval', width: 200, sortable: false },
            { name: 'itemval', index: 'itemval', width: 200, sortable: false },
            { name: 'itemval', index: 'itemval', width: 200, sortable: false },
            { name: 'itemval', index: 'itemval', width: 120, sortable: false }
        ];
        anna.jqGrid.setGridUrl(url);
        anna.jqGrid.setGridWidth(1080);
        anna.jqGrid.setGridAddfunc(addButtonHandler);
        anna.jqGrid.setGridCompleteHandler(initializeOperatingButton);
        anna.jqGrid.initialize($grid, gridPager, colNames, colModel, null);
    };
    
    var addButtonHandler = function () {
        var url = 'FaCabinetNoMgmt';
        window.location.href = url;
    };

    var initializeOperatingButton = function () {
        $('a[name="' + editButtonName + '"]', $grid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'FaCabinetNoMgmt?id=' + itemId;
            window.location.href = url;
        });
        $('a[name="' + delButtonName + '"]', $grid).click(function () {
            var itemId = $(this).attr('itemId');
            var url = 'DelFaCabinetNo?id=' + itemId;
            anna.confirm('确认要删除吗？', function () {
                anna.ajaxGet(url, function (data) {
                    anna.alert(data.resultValue, function () {
                        $grid.trigger("reloadGrid");
                    });
                });
            });
        });
    };

    var searchCabinetNo = function() {
        var query = $.trim($searchText.val());
        var enable = $cabinetNoStates.val();
        var url = 'GetFaCabineNos?query=' + query + "&enable=" + enable;
        $grid.clearGridData();
        $grid.setGridParam({
            url: url
        });
        $grid.trigger("reloadGrid");
    };

    $searchButton.click(function () {
        searchCabinetNo();
    });

    $cabinetNoStates.change(function () {
        searchCabinetNo();
    });
    initGrid();
});