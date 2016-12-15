webui.ajax = (function($) {
    var that = {};

    var error = function(xmlHttpRequest, textStatus, errorThrown) {
        webui.showButton();
        var msg = '提交出现错误:';
        msg = msg + ' xmlHttpRequest.status=' + xmlHttpRequest.status;
        msg = msg + ' xmlHttpRequest.readyState=' + xmlHttpRequest.readyState;
        msg = msg + ' textStatus=' + textStatus;
        msg = msg + ' errorThrown=' + errorThrown;
        webui.alert(msg);
    };

    that.jsonStringify = function(value) {
        return JSON.stringify(value);
    };

    that.ajaxGet = function(url, successHandler, errorHandler) {
        $.ajaxSetup({ cache: false });
        if (!$.isFunction(successHandler)) {
            successHandler = function() {
            };
        }
        if ($.isFunction(errorHandler)) {
            error = errorHandler;
        }
        $.getJSON(url, successHandler).error(error);
        //$.ajax({
        //    type: 'Get',
        //    url: url,
        //    error: errorHandler,
        //    success: successHandler
        //});
    };

    that.ajaxPost = function(url, data, successHandler, errorHandler) {
        if (!$.isFunction(successHandler)) {
            successHandler = function() {
            };
        }
        if ($.isFunction(errorHandler)) {
            error = errorHandler;
        }
        //jQuery.post(url, data, success(data, textStatus, jqXHR), dataType)
        //$.post的error错误处理，添加连缀的局部方法error,参数是(xhr,errorText,errorType)
        //$.post(url, data, successHandler).error(errorHandler);

        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            error: error,
            success: successHandler,
            async: true,
            processData: false
        });
    };

    that.ajaxIsSuccess = function(data) {
        //1代表false,0代表true
        if (data.result == 1 || data.result == '1') {
            return false;
        }
        return true;
    };

    that.ajaxValue = function(data) {
        return data.resultValue;
    };

    return that;
})(jQuery);

webui.ajaxIsSuccess = function(data) {
    return webui.ajax.ajaxIsSuccess(data);
};

webui.ajaxValue = function(value) {
    return webui.ajax.ajaxValue(value);
};

webui.ajaxGet = function(url, successHandler, errorHandler) {
    webui.ajax.ajaxGet(url, successHandler, errorHandler);
};

webui.ajaxPost = function(url, data, successHandler, errorHandler) {
    webui.ajax.ajaxPost(url, data, successHandler, errorHandler);
};

webui.jsonStringify = function(value) {
    return webui.ajax.jsonStringify(value);
};