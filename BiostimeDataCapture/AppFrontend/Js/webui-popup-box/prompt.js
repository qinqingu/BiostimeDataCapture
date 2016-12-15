$(document).ready(function() {
    var prompt = '<div id="promptDialogContainer" style="display: none">' +
        '<p>' +
        '<label id="promptMessage"></label>' +
        '</p>' +
        '<div style="text-align: center; width: 100%;">' +
        '<a id="promptOkButton" class="button02 right" style="cursor:pointer">' +
        '<span class="l"></span>' +
        '<span class="m">确定</span>' +
        '<span class="r"></span></a>' +
        '</div>' +
        '<label id="promptTitle" style="display: none">提示</label>' +
        '</div>';

    if ($("#promptDialogContainer").length == 0) {
        $(document.body).append(prompt);
    }

    webui.prompt.initialize({
        dialog: 'promptDialogContainer',
        message: 'promptMessage',
        okButton: 'promptOkButton',
        title: 'promptTitle'
    });
});
webui.prompt = (function($) {
    var $dialog;
    var $message;
    var $okButton;
    var $title;

    var okHandler = function() {
    };

    var that = {};

    that.initialize = function(ids) {
        $dialog = $('#' + ids.dialog);
        $message = $('#' + ids.message);
        $okButton = $('#' + ids.okButton);
        $title = $('#' + ids.title);

        $okButton.click(function() {
            $dialog.dialog("close");
            return false;
        });
    };

    that.show = function(message, closeHandler) {
        $(".ui-dialog-titlebar-close").show();
        $okButton.show();
        $message.text(message);

        if ($.isFunction(closeHandler)) {
            okHandler = closeHandler;
        }

        $dialog.dialog({
            title: $title.text(),
            modal: true,
            resizable: false,
            draggable: true,
            width: 450,
            minHeight: 100,
//            position: [470, 100],
            close: function() {
                okHandler();
            }
        });

        $dialog.parent().appendTo($("form:first"));
        $okButton.blur();
    };

    that.disableCloseShow = function(message, closeHandler) {
        $message.text(message);

        if ($.isFunction(closeHandler)) {
            okHandler = closeHandler;
        }

        $dialog.dialog({
            title: $title.text(),
            modal: true,
            resizable: false,
            draggable: true,
            width: 450,
            minHeight: 100,
            close: function() {
                okHandler();
            },
            open: function() {
                $okButton.hide();
                $(".ui-dialog-titlebar-close").hide();
            }
        });

        $dialog.parent().appendTo($("form:first"));
        $okButton.blur();
    };

    return that;
})(jQuery);

webui.showAlertUiDialogTitlebarClose = function() {
    $('.ui-dialog-titlebar-close').show();
};

webui.alert = function(message, closeHandler) {
    webui.prompt.show(message, closeHandler);
};

webui.disableCloseAlert = function(message, closeHandler) {
    webui.prompt.disableCloseShow(message, closeHandler);
};