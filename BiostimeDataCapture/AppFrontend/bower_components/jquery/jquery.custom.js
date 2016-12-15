(function($) {
    $.datepicker.regional['zh-CN'] = {
        closeText: '关闭',
        prevText: '&#x3c;上月',
        nextText: '下月&#x3e;',
        currentText: '今天',
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['一', '二', '三', '四', '五', '六',
            '七', '八', '九', '十', '十一', '十二'],
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        isRTL: false
    };
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);

    $.getParameter = function(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var pattern = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(pattern);
        var results = regex.exec(window.location.search);
        if (results == null) {
            return "";
        } else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    };

    $.overlay = function() {
        $('body').append('<div class="overlay"></div>');
    };

    $.cancleOverlay = function() {
        $('.overlay').remove();
    };

    $.htmlEncode = function(value) {
        return $('<div/>').text(value).html();
    };

    $.htmlDecode = function(value) {
        return $('<div/>').html(value).text();
    };

    $.daysInMonth = function(month, year) {
        switch (month) {
        case 2:
            if (isNaN(year)) {
                return 29;
            }
            return (year % 4 == 0 && year % 100) || year % 400 == 0 ? 29 : 28;
        case 9:
        case 4:
        case 6:
        case 11:
            return 30;
        default:
            return 31;
        }
    };

    $.formatPercentage = function(value) {
        if (!value && value !== 0) return '';

        var percentage = parseFloat(value);

        return (Math.round(percentage * 100) / 100).toFixed(2) + '%';
    };

    $.unformatPercentage = function(value) {
        if (!value) return '';

        var result = value.replace(/%$/, "");

        return result;
    };

    $.focusFirst = function() {
        $('form:eq(0)').find(':input:visible:enabled:first').focus();
    };

    $.fn.visible = function() {
        return this.css('visibility', 'visible');
    };

    $.fn.invisible = function() {
        return this.css('visibility', 'hidden');
    };

    $.fn.visibilityToggle = function() {
        return this.css('visibility', function(i, visibility) {
            return (visibility == 'visible') ? 'hidden' : 'visible';
        });
    };

    $.fn.moveChild = function($child, newPosition) {
        return this.each(function() {
            $child.detach();
            if (newPosition == $(this).children().length) {
                $(this).children().eq(newPosition - 1).after($child);
            } else {
                $(this).children().eq(newPosition).before($child);
            }
        });
    };

    $.fn.getLength = function() {
        var value = $(this).val();

        if (!value) {
            return 0;
        }

        var lines = value.match(/\n/g);

        if (lines) {
            return value.length + lines.length;
        } else {
            return value.length;
        }
    };

    $.fn.truncateValue = function() {
        var $self = $(this);

        var value = $self.val();
        var maxlenght = $self.attr('maxlength');

        var count = 0;
        for (var index = 0, length = value.length; index < length; index++) {
            if (value[index] == '\n') {
                count++;
            }
            count++;

            if (count > maxlenght) {
                $self.val(value.substring(0, index));
                break;
            }
        }
    };

    $.fn.center = function() {
        this.css("position", "absolute");
        this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
        this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");

        return this;
    };

    $.fn.horizontalCenter = function(top) {
        this.css("position", "absolute");
        this.css("top", top + $(window).scrollTop() + "px");
        this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");

        return this;
    };

    $.fn.setPosition = function(top, left) {
        this.css("position", "absolute");
        this.css("top", top + "px");
        this.css("left", left + "px");

        return this;
    };

    $.fn.focusByLength = function(length) {
        var $input = $(this);
        if ($input.val().length === length) {
            $input.focusNextInputField();
        }
    };

    $.fn.focusNextInputField = function() {
        return this.each(function() {
            var fields = $(this).parents('form:eq(0),body').find(':input:not(:hidden)');
            var index = fields.index(this);
            if (index > -1 && (index + 1) < fields.length) {
                var $next = fields.eq(index + 1);

                $next.focus();
                $next.select();
            }
            return false;
        });
    };

    $.fn.isRequired = function() {
        var isRequired = this.attr('isrequired');
        if (isRequired) {
            isRequired = isRequired.toLowerCase();
        }

        return isRequired === 'true';
    };

    $.fn.addSelectOptions = function(optionData) {
        var $self = $(this);
        $self.empty();

        $.each(optionData, function(index, value) {
            $self.append($("<option></option>")
                .attr("value", value.id)
                .text(value.name));
        });
    };
})(jQuery);