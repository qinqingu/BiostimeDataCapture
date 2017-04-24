$(document).ready(function () {
    var $adCompanyMgmtErrorContainer = $('#adCompanyMgmtErrorContainer');

    var $companyName = $('#companyName');
    var $companyId = $('#companyId');
    var $remark = $('#remark');
    var $companyNameDisabled = $('#companyNameDisabled');
    var $companyState = $('#companyState');
    var $companyStates = $('#companyStates');

    var $saveButton = $('#saveButton');
    var $saveAndContinueButton = $('#saveAndContinueButton');

    //状态绑定
    var initControl = function () {
        if (!$companyState.val()) {
            return;
        }
        var companyState = $companyState.val();
        $companyStates.val(companyState);
        if ($companyNameDisabled.val() == 'false') {
            $companyName.removeAttr('disabled');
        }
    };

    var saveCompany = function () {
        anna.disableCloseAlert("正在保存......");
        anna.hideButton();
        var url = 'SaveCompany';
        var faCompany = {
            id: $companyId.val(),
            name: $.trim($companyName.val()),
            remark: $.trim($remark.val()),
            enable: $companyStates.val()
        };
        anna.ajaxPost(url, faCompany, function (data) {
            anna.showAlertUiDialogTitlebarClose();
            anna.showButton();
            var result = data;
            if (!anna.ajax.ajaxIsSuccess(result)) {
                anna.alert("保存出现异常:" + result.resultValue);
                return;
            }
            anna.alert(result.resultValue, function () {
                top.location = 'FaCompanyList';
            });
        });
    };

    var saveAndContinueCompany = function () {
        anna.disableCloseAlert("正在保存......");
        anna.hideButton();
        var url = 'SaveCompany';
        var faCompany = {
            id: $companyId.val(),
            name: $.trim($companyName.val()),
            remark: $.trim($remark.val()),
            enable: $companyStates.val()
        };
        anna.ajaxPost(url, faCompany, function (data) {
            anna.showAlertUiDialogTitlebarClose();
            anna.showButton();
            var result = data;
            if (!anna.ajax.ajaxIsSuccess(result)) {
                anna.alert("保存出现异常:" + result.resultValue);
                return;
            }
            anna.alert(result.resultValue, function () {
                $companyName.val('');
            });
        });
    };

    //提交保存
    $saveButton.click(function () {
        var isValidateSuccess = anna.validator.validate(null, $adCompanyMgmtErrorContainer);
        if (!isValidateSuccess) {
            $('html, body').animate({ scrollTop: 0 }, 0);
            return;
        }
        if (!$companyId.val()) {
            anna.confirm("“公司名称”在创建后就不允许修改,请慎重填写，确认要添加数据吗？", saveCompany);
        } else {
            saveCompany();
        }
    });

    //保存并继续
    $saveAndContinueButton.click(function () {
        var isValidateSuccess = anna.validator.validate(null, $adCompanyMgmtErrorContainer);
        if (!isValidateSuccess) {
            $('html, body').animate({ scrollTop: 0 }, 0);
            return;
        }
        if (!$companyId.val()) {
            anna.confirm("“公司名称”在创建后就不允许修改,请慎重填写，确认要添加数据吗？", saveAndContinueCompany);
        } else {
            saveAndContinueCompany();
        }
    });

    $companyName.rules("add", { required: true, messages: { required: '请输入公司名称。' } });

    anna.addRequiredMark($companyName);

    initControl();
});