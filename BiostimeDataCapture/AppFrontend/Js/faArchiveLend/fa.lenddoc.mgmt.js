$(document).ready(function () {
    var $faLendDocMgmtErrorContainer = $('#faLendDocMgmtErrorContainer');
    var $faJieyueId = $('#faJieyueId');
    var $jieyueShijian = $('#jieyueShijian');
    var $guihuanShijian = $('#guihuanShijian');

    var $saveButton = $('#saveButton');

    //提交保存
    $saveButton.click(function () {
        var isValidateSuccess = anna.validator.validate(null, $faLendDocMgmtErrorContainer);
        if (!isValidateSuccess) {
            $('html, body').animate({ scrollTop: 0 }, 0);
            return;
        }
        anna.disableCloseAlert("正在保存......");
        anna.hideButton();
        var url = 'SaveJieyueInfo';
        var jieyueInfo = {
            id: $faJieyueId.val(),
            guihuanShijian:$guihuanShijian.val()
        };
        anna.ajaxPost(url, jieyueInfo, function (data) {
            anna.showAlertUiDialogTitlebarClose();
            anna.showButton();
            var result = data;
            if (!anna.ajax.ajaxIsSuccess(result)) {
                anna.alert("保存出现异常:" + result.resultValue);
                return;
            }
            anna.alert(result.resultValue, function () {
                top.location = 'FaLendDocMgmt?id=' + $faJieyueId.val();
            });
        });
    });
    
    //日期控件操作
    $guihuanShijian.datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        yearRange: "-5:+25",
        minDate: $jieyueShijian.val()
    });

    $guihuanShijian.rules("add", {
        required: true,
        dateISO: true,
        messages: {
            required: '请输入归还日期。',
            dateISO: '归还日期必需为日期格式(ISO)。例:2015-12-02'
        }
    });
    anna.addRequiredMark($guihuanShijian);
});