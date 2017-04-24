$(document).ready(function() {
    anna.validator.initialize('#errorContainer', '#messageContainer', '#mainForm');
    //-------------------------------------------------------------------------------------------------------------------------
    var $quickMenu = $('.quick_menu');
    var $listWrap = $('.list_wrap');
    var $userRealName = $('#userRealName');
    var $nowYear = $('#nowYear');

    var initializeElement = function() {
        $listWrap.width($quickMenu.width() - 18);
        $listWrap.addClass('margin_left_right');

        $nowYear.text(new Date().getFullYear());
    };

    anna.ajaxGet('../General/GetUserRealName', function (data) {
        $userRealName.text(data.resultValue);
    });

    initializeElement();
});