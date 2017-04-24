$(document).ready(function() {
    var $docFaInfoTab = $('#docFaInfoTab');
    var $docFaLendingInfoTab = $('#docFaLendingInfoTab');
    var $docFaReturnInfoTab = $('#docFaReturnInfoTab');
    var $docCabinetNoInfoTab = $('#docCabinetNoInfoTab');
    var $docCompanyInfoTab = $('#docCompanyInfoTab');
    var $docReportNameInfoTab = $('#docReportNameInfoTab');
    var markLink = function() {
        var basicUrl = window.location.href;
        if (basicUrl.indexOf('/FaArchive/Index') > 0
            || basicUrl.indexOf('/FaArchive/FaDocList') > 0
            || basicUrl.indexOf('/FaArchive/FaDocMgmt') > 0) {
            highlightLi($docFaInfoTab);
            return;
        }
        if (basicUrl.indexOf('/FaArchiveLend/FaLendDocList') > 0
            || basicUrl.indexOf('/FaArchiveLend/FaLendDocMgmt') > 0) {
            highlightLi($docFaLendingInfoTab);
            return;
        }
        if (basicUrl.indexOf('/FaArchiveReturn/FaReturnDocList') > 0
            || basicUrl.indexOf('/FaArchiveReturn/FaReturnDocMgmt') > 0) {
            highlightLi($docFaReturnInfoTab);
            return;
        }
        if (basicUrl.indexOf('/FaCabinetNo/FaCabinetNoList') > 0
            || basicUrl.indexOf('/FaCabinetNo/FaCabinetNoMgmt') > 0) {
            highlightLi($docCabinetNoInfoTab);
            return;
        }
        if (basicUrl.indexOf('/FaCompany/FaCompanyList') > 0
            || basicUrl.indexOf('/FaCompany/FaCompanyMgmt') > 0) {
            highlightLi($docCompanyInfoTab);
            return;
        }
        if (basicUrl.indexOf('/FaReportName/FaReportNameList') > 0
            || basicUrl.indexOf('/FaReportName/FaReportNameMgmt') > 0) {
            highlightLi($docReportNameInfoTab);
            return;
        }
        highlightLi($docFaInfoTab);
    };

    var highlightLi = function($element) {
        $element.addClass('on');
    };
    markLink();
});