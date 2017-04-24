$(document).ready(function () {
    var $faReportNameMgmtErrorContainer = $('#faReportNameMgmtErrorContainer');

    var $reportName = $('#reportName');
    var $reportNameId = $('#reportNameId');
    var $remark = $('#remark');
    var $reportNameDisabled = $('#reportNameDisabled');
    var $reportNameState = $('#reportNameState');
    var $reportNameStates = $('#reportNameStates');

    var $saveButton = $('#saveButton');
    var $saveAndContinueButton = $('#saveAndContinueButton');
    //状态绑定
    var initControl = function () {
        if (!$reportNameState.val()) {
            return;
        }
        var reportNameState = $reportNameState.val();
        $reportNameStates.val(reportNameState);
        if ($reportNameDisabled.val() == 'false') {
            $reportName.removeAttr('disabled');
        }
    };

    var saveReportName = function () {
        anna.disableCloseAlert("正在保存......");
        anna.hideButton();
        var url = 'SaveReportName';
        var adReportName = {
            id: $reportNameId.val(),
            name: $reportName.val(),
            remark: $remark.val(),
            enable: $reportNameStates.val()
        };
        anna.ajaxPost(url, adReportName, function (data) {
            anna.showAlertUiDialogTitlebarClose();
            anna.showButton();
            var result = data;
            if (!anna.ajax.ajaxIsSuccess(result)) {
                anna.alert("保存出现异常:" + result.resultValue);
                return;
            }
            anna.alert(result.resultValue, function () {
                top.location = 'FaReportNameList';
            });
        });
    };


    var saveAndContinueReportName = function () {
        anna.disableCloseAlert("正在保存......");
        anna.hideButton();
        var url = 'SaveReportName';
        var adReportName = {
            id: $reportNameId.val(),
            name: $reportName.val(),
            remark: $remark.val(),
            enable: $reportNameStates.val()
        };
        anna.ajaxPost(url, adReportName, function (data) {
            anna.showAlertUiDialogTitlebarClose();
            anna.showButton();
            var result = data;
            if (!anna.ajax.ajaxIsSuccess(result)) {
                anna.alert("保存出现异常:" + result.resultValue);
                return;
            }
            anna.alert(result.resultValue, function () {
                $reportName.val('');
            });
        });
    };
    
    //提交保存
    $saveButton.click(function () {
        var isValidateSuccess = anna.validator.validate(null, $faReportNameMgmtErrorContainer);
        if (!isValidateSuccess) {
            $('html, body').animate({ scrollTop: 0 }, 0);
            return;
        }
        if (!$reportNameId.val()) {
            anna.confirm("“报告名称”在创建后就不允许修改,请慎重填写，确认要添加数据吗？", saveReportName);
        } else {
            saveReportName();
        }
    });

    //保存并继续
    $saveAndContinueButton.click(function () {
        var isValidateSuccess = anna.validator.validate(null, $faReportNameMgmtErrorContainer);
        if (!isValidateSuccess) {
            $('html, body').animate({ scrollTop: 0 }, 0);
            return;
        }
        if (!$reportNameId.val()) {
            anna.confirm("“报告名称”在创建后就不允许修改,请慎重填写，确认要添加数据吗？", saveAndContinueReportName);
        } else {
            saveAndContinueReportName();
        }
    });


    $reportName.rules("add", { required: true, messages: { required: '请输入报告名称。' } });

    anna.addRequiredMark($reportName);

    initControl();
});