$(document).ready(function() {
    var $docFaInfoTab = $('#docFaInfoTab');
    var $docFaLendingInfoTab = $('#docFaLendingInfoTab');
    var $docFabackInfoTab = $('#docFabackInfoTab');
    var markLink = function() {
        var basicUrl = window.location.href;
        //if (basicUrl.indexOf('/FinanceDept/FdDocMgmt') > 0) {
        //    highlightLi($docInfoMgmtTab);
        //    return;
        //}
        if (basicUrl.indexOf('/FaArchive/Index') > 0
            || basicUrl.indexOf('/FaArchive/FaDocList') > 0
            || basicUrl.indexOf('/FaArchive/FaDocMgmt') > 0) {
            highlightLi($docFaInfoTab);
            return;
        }
        //highlightLi($docFaInfoTab);
    };

    var highlightLi = function($element) {
        $element.addClass('on');
    };
    markLink();
});