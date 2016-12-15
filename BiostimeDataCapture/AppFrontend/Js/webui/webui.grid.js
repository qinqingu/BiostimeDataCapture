webui.jqGrid = (function() {
    var gridUrl;
    var gridAddFunction;
    var gridMultiselect = false;
    var gridDatatype = 'json';
    var gridSortname = null;
    var greidHeight = 311;
    var gridWidth = 1000;
    var gridAutowidth = false;
    var gridRowNum = 10;
    var gridRowList = [10, 20, 30];
    var gridAddtext = ""; //添加
    var gridCompleteHandler = function() {
    };

    var that = {};

    that.setGridUrl = function(url) {
        gridUrl = url;
    };

    that.setGridDatatype = function(type) {
        gridDatatype = type;
    };

    that.setGridSortname = function(sortname) {
        gridSortname = sortname;
    };

    that.setMultiselect = function() {
        gridMultiselect = true;
    };

    that.setGridAddfunc = function(addFunction) {
        gridAddFunction = addFunction;
    };

    that.setGridAddtext = function(value) {
        gridAddtext = value;
    };

    that.setGridHeight = function(value) {
        greidHeight = value;
    };

    that.setGridWidth = function(value) {
        gridWidth = value;
    };

    that.setGridAutowidth = function(value) {
        gridAutowidth = value;
    };

    that.setGridRowNum = function(value) {
        gridRowNum = value;
    };

    that.setGridRowList = function(value) {
        gridRowList = value;
    };

    that.setGridCompleteHandler = function(value) {
        if ($.isFunction(value)) {
            gridCompleteHandler = value;
        }
    };

    that.initialize = function($element, gridPager, gridColNames, gridColModel, gridCaption) {
        $element.jqGrid({
            url: gridUrl,
            datatype: gridDatatype,
            colNames: gridColNames,
            colModel: gridColModel,
            caption: gridCaption,
            hidegrid: false,
            sortname: gridSortname,
            sortorder: 'asc',
            shrinkToFit: false,
            pager: gridPager,
            rowNum: gridRowNum,
            rowList: gridRowList,
            viewrecords: true,
            multiselect: gridMultiselect,
            height: greidHeight,
            width: gridWidth,
            autowidth: gridAutowidth,
            gridComplete: gridCompleteHandler
        });

        var pager = {
            refresh: false,
            search: false,
            edit: false,
            add: false,
            del: false
        };

        if (gridAddFunction) {
            pager.add = true;
            pager.addfunc = gridAddFunction;
            pager.addtext = gridAddtext;
        }

        $element.jqGrid('navGrid', gridPager, pager);
        $('.ui-pg-input', gridPager).css('height', '18px');
        //$element.setGridWidth($(window).width() * 0.986);
        //$(gridPager).setGridWidth(document.body.clientWidth * 0.986);
    };

    return that;
})(jQuery);