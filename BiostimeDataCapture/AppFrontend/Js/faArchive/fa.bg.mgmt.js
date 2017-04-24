$(document).ready(function () {
    var $faBgMgmtErrorContainer = $('#faBgMgmtErrorContainer');
    var $faArchiveId = $('#faArchiveId');
    var $content = $('#content');
    var $company = $('#company');
    var $companyDto = $('#companyDto');
    var companysDtos = $.parseJSON($companyDto.val());
    var $companyName = $('#companyName');
    var $year = $('#year');
    var $baogaoMingcheng = $('#baogaoMingcheng');
    var $path = $('#path');
    var $cabinetNo = $('#cabinetNo');

    var $saveButton = $('#saveButton');

    //初始化公司数据
    var initCompanys = function () {
        if (!$companyDto.val()) {
            return;
        }
        var companyName = $companyName.val();
        $company.empty();
        for (var index = 0; index < companysDtos.length; index++) {
            var item = companysDtos[index];
            if (item.Name == companyName) {
                $company.append($('<option selected="selected"></option>').val(item.Name).html(item.Name));
                continue;
            }
            $company.append($('<option></option>').val(item.Name).html(item.Name)
            );
        }
    };

    //提交保存
    $saveButton.click(function () {
        var isValidateSuccess = anna.validator.validate(null, $faBgMgmtErrorContainer);
        if (!isValidateSuccess) {
            $('html, body').animate({ scrollTop: 0 }, 0);
            return;
        }
        anna.disableCloseAlert("正在保存......");
        anna.hideButton();
        var url = 'SaveFaDoc';
        var faDoc = {
            id: $faArchiveId.val(),
            content: $content.val(),
            company: $company.val(),
            year: $year.val(),
            baogaoMingcheng: $baogaoMingcheng.val(),
            path: $path.val(),
            cabinetNo: $cabinetNo.val()
        };
        anna.ajaxPost(url, faDoc, function (data) {
            anna.showAlertUiDialogTitlebarClose();
            anna.showButton();
            var result = data;
            if (!anna.ajax.ajaxIsSuccess(result)) {
                anna.alert("保存出现异常:" + result.resultValue);
                return;
            }
            anna.alert(result.resultValue, function () {
                top.location = 'FaBgMgmt?id=' + $faArchiveId.val();
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
    $baogaoMingcheng.rules("add", { required: true, messages: { required: '请输入报告名称。' } });
    $content.rules("add", { required: true, messages: { required: '请输入凭证内容。' } });
    $company.rules("add", { required: true, messages: { required: '请选择公司。' } });
    $path.rules("add", { required: true, messages: { required: '请输入存储位置。' } });
    $cabinetNo.rules("add", { required: true, messages: { required: '请输入存储柜号。' } });

    anna.addRequiredMark($content);
    anna.addRequiredMark($company);
    anna.addRequiredMark($year);
    anna.addRequiredMark($baogaoMingcheng);
    anna.addRequiredMark($path);
    anna.addRequiredMark($cabinetNo);
    initCompanys();
});