window.webui = (function($) {
    var variable1;
    var requiredMarkHtml = '<span style="color: red;margin-left: 2px;width:4px">*</span>';
    //var requiredMark = '<span class="text-muted" style="color: red;">*</span>';
    //...other variable

    var function1 = function() {
        variable1 = 'a';
    };

    //...other function

    var that = {};

    that.method1 = function() {
        function1();
        $.isArray([]);
        //...other code
    };

    that.addRequiredMark = function($element) {
        $element.after(requiredMarkHtml);
        //if ($element.is('label')) {
        //    var value = $element.text();
        //    var newValue = value + requiredMark;
        //    $element.html(newValue);
        //    return;
        //}
        //var $inputParent = $element.parent();
        //var $label = $inputParent.children('label').eq(0);
        //if ($label) {
        //    var labelValue = $label.text();
        //    var newLabelValue = labelValue + requiredMark;
        //    $label.html(newLabelValue);
        //}
    };

    that.setDefultName = function($element) {
        $element.attr('name', $element.attr('id'));
    };

    that.reloadPage = function() {
        location.reload();
    };

    that.redirectPage = function(url) {
        top.location = url;
    };

    that.getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    that.hideButton = function() {
        $('.button01').each(function() {
            $(this).hide();
        });
        $('.button02').each(function() {
            $(this).hide();
        });
        //$('a').each(function () {
        //    $(this).hide();
        //});
    };

    that.showButton = function() {
        $('.button01').each(function() {
            $(this).show();
        });
        $('.button02').each(function() {
            $(this).show();
        });
        //$('a').each(function () {
        //    $(this).hide();
        //});
    };

    return that;
})(jQuery);