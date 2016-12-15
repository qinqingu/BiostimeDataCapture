$(document).ready(function () {
    var $faDocMgmtErrorContainer = $('#faDocMgmtErrorContainer');
    var $faDocId = $('#faDocId');
    var $content = $('#content');
    var $company = $('#company');
    var $year = $('#year');
    var $month = $('#month');
    var $voucherWord = $('#voucherWord');
    var $voucherNumber = $('#voucherNumber');
    var $voucherNo = $('#voucherNo');
    var $path = $('#path');
    var $cabinetNo = $('#cabinetNo');

    var $saveButton = $('#saveButton');

    //提交保存
    $saveButton.click(function () {
        var isValidateSuccess = webui.validator.validate(null, $faDocMgmtErrorContainer);
        if (!isValidateSuccess) {
            $('html, body').animate({ scrollTop: 0 }, 0);
            return;
        }
        webui.disableCloseAlert("正在保存......");
        webui.hideButton();
        var url = 'SaveFaDoc';
        var faDoc = {
            id: $faDocId.val(),
            content: $content.val(),
            company: $company.val(),
            year: $year.val(),
            month: $month.val(),
            voucherWord: $voucherWord.val(),
            voucherNumber: $voucherNumber.val(),
            voucherNo: $voucherNo.val(),
            path: $path.val(),
            cabinetNo: $cabinetNo.val()
        };
        webui.ajaxPost(url, faDoc, function (data) {
            webui.showAlertUiDialogTitlebarClose();
            webui.showButton();
            var result = data;
            if (!webui.ajax.ajaxIsSuccess(result)) {
                webui.alert("保存出现异常:" + result.resultValue);
                return;
            }
            webui.alert(result.resultValue, function () {
                top.location = 'FaDocMgmt?id=' + $faDocId.val();
            });
        });
    });

    $year.rules("add", { required: true, messages: { required: '请输入年份。' } });
    $year.rules("add", {
        required: true,
        number: true,
        messages: {
            required: '请输入年份。',
            number: '年份必需为数字。'
        }
    });
    $month.rules("add", { required: true, messages: { required: '请输入月份。' } });
    $month.rules("add", {
        required: true,
        number: true,
        messages: {
            required: '请输入月份。',
            number: '月份必需为数字。'
        }
    });
    $voucherNumber.rules("add", { required: true, messages: { required: '请输入凭证号。' } });
    $voucherNumber.rules("add", {
        required: true,
        number: true,
        messages: {
            required: '请输入凭证号。',
            number: '凭证号必需为数字。'
        }
    });
    $content.rules("add", { required: true, messages: { required: '请输入凭证内容。' } });
    $company.rules("add", { required: true, messages: { required: '请输入公司。' } });
    $voucherWord.rules("add", { required: true, messages: { required: '请输入凭证字。' } });
    $path.rules("add", { required: true, messages: { required: '请输入存储位置。' } });
    $cabinetNo.rules("add", { required: true, messages: { required: '请输入存储柜号。' } });

    webui.addRequiredMark($content);
    webui.addRequiredMark($company);
    webui.addRequiredMark($year);
    webui.addRequiredMark($month);
    webui.addRequiredMark($voucherWord);
    webui.addRequiredMark($voucherNumber);
    webui.addRequiredMark($path);
    webui.addRequiredMark($cabinetNo);
});