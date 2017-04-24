$(document).ready(function () {
    var $cabinetMgmtErrorContainer = $('#cabinetMgmtErrorContainer');

    var $cabinetNo = $('#cabinetNo');
    var $cabinetNoState = $('#cabinetNoState');
    var $cabinetNoStates = $('#cabinetNoStates');
    var $Id = $('#Id');
    var $path = $('#path');

    var $saveButton = $('#saveButton');
    var $saveAndContinueButton = $('#saveAndContinueButton');
    
    //状态绑定
    var initControl = function () {
        if (!$cabinetNoState.val()) {
            return;
        }
        var cabinetNoState = $cabinetNoState.val();
        $cabinetNoStates.val(cabinetNoState);
    };

    var saveCabinetNo = function () {
        anna.disableCloseAlert("正在保存......");
        anna.hideButton();
        var url = 'SaveCabinetNo';
        var faCabinetNo = {
            id: $Id.val(),
            cabinetNo: $.trim($cabinetNo.val()),
            path: $.trim($path.val())
        };
        anna.ajaxPost(url, faCabinetNo, function (data) {
            anna.showAlertUiDialogTitlebarClose();
            anna.showButton();
            var result = data;
            if (!anna.ajax.ajaxIsSuccess(result)) {
                anna.alert("保存出现异常:" + result.resultValue);
                return;
            }
            anna.alert(result.resultValue, function () {
                top.location = 'FaCabinetNoList';
            });
        });
    };
    
    var saveAndContinueCabinetNo = function () {
        anna.disableCloseAlert("正在保存......");
        anna.hideButton();
        var url = 'SaveCabinetNo';
        var faCabinetNo = {
            id: $Id.val(),
            cabinetNo: $.trim($cabinetNo.val()),
            path: $.trim($path.val())
        };
        anna.ajaxPost(url, faCabinetNo, function (data) {
            anna.showAlertUiDialogTitlebarClose();
            anna.showButton();
            var result = data;
            if (!anna.ajax.ajaxIsSuccess(result)) {
                anna.alert("保存出现异常:" + result.resultValue);
                return;
            }
            anna.alert(result.resultValue, function () {
                $cabinetNo.val('');
            });
        });
    };

    //提交保存
    $saveButton.click(function () {
        var isValidateSuccess = anna.validator.validate(null, $cabinetMgmtErrorContainer);
        if (!isValidateSuccess) {
            $('html, body').animate({ scrollTop: 0 }, 0);
            return;
        }
        if (!$Id.val()) {
            anna.confirm("“柜号”在创建后就不允许修改,请慎重填写，确认要添加数据吗？", saveCabinetNo);
        } else {
            saveCabinetNo();
        }
    });

    //保存并继续
    $saveAndContinueButton.click(function () {
        var isValidateSuccess = anna.validator.validate(null, $cabinetMgmtErrorContainer);
        if (!isValidateSuccess) {
            $('html, body').animate({ scrollTop: 0 }, 0);
            return;
        }
        if (!$Id.val()) {
            anna.confirm("“柜号”在创建后就不允许修改,请慎重填写，确认要添加数据吗？", saveAndContinueCabinetNo);
        } else {
            saveAndContinueCabinetNo();
        }
    });

    $cabinetNo.rules("add", { required: true, messages: { required: '请输入柜号。' } });
    $path.rules("add", { required: true, messages: { required: '请输入存储位置。' } });

    anna.addRequiredMark($cabinetNo);
    anna.addRequiredMark($path);
    initControl();
});