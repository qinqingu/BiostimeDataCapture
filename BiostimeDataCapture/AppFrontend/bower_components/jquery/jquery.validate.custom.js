(function($) {
    $.validator.addMethod("greaterThanOrEqualDate", function(value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        var dateValue = value.split("-");
        var year = parseInt(dateValue[0], 10);
        var month = parseInt(dateValue[1], 10);
        var day = parseInt(dateValue[2], 10);

        var comparativeValue = param.val().split("-");
        var comparativeYear = parseInt(comparativeValue[0], 10);
        var comparativeMonth = parseInt(comparativeValue[1], 10);
        var comparativeDay = parseInt(comparativeValue[2], 10);

        if (year < comparativeYear) {
            return false;
        }

        if (year === comparativeYear && month < comparativeMonth) {
            return false;
        }

        if (year === comparativeYear && month === comparativeMonth && day < comparativeDay) {
            return false;
        }

        return true;
    }, "The date should larger than current value.");

    $.validator.addMethod("futureDate", function(value, element) {
        if (this.optional(element)) {
            return true;
        }

        var dateValue = value.split("-");
        var year = parseInt(dateValue[0], 10);
        var month = parseInt(dateValue[1], 10);
        var day = parseInt(dateValue[2], 10);

        var now = new Date();

        if (year < now.getFullYear()) {
            return false;
        }

        if (year === now.getFullYear() && month < now.getMonth()) {
            return false;
        }

        if (year === now.getFullYear() && month === now.getMonth() && day < now.getDate()) {
            return false;
        }

        return true;
    }, "Please input a future date.");

    $.validator.addMethod("programDraftingDateRange", function(value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        var dateValue = value.split("-");
        var year = parseInt(dateValue[0], 10);
        var month = parseInt(dateValue[1], 10);
        var day = parseInt(dateValue[2], 10);
        var $comparativeValue1 = param[0];
        var $comparativeValue2 = param[1];
        var $comparativeValue3 = param[2];
        var comparative;
        if ($comparativeValue1.val()) {
            comparative = $comparativeValue1.val();
        } else if ($comparativeValue2.val()) {
            comparative = $comparativeValue2.val();
        } else if ($comparativeValue3.val()) {
            comparative = $comparativeValue3.val();
        }
        if (comparative) {
            var comparativeValues = comparative.split("-");
            var comparativeYear = parseInt(comparativeValues[0], 10);
            var comparativeMonth = parseInt(comparativeValues[1], 10);
            var comparativeDay = parseInt(comparativeValues[2], 10);

            if (comparativeYear < year) {
                return false;
            }

            if (year === comparativeYear && comparativeMonth < month) {
                return false;
            }

            if (year === comparativeYear && month === comparativeMonth && comparativeDay < day) {
                return false;
            }
        }
        return true;
    }, "");

    $.validator.addMethod("programApprovalDateRange", function(value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        var dateValue = value.split("-");
        var year = parseInt(dateValue[0], 10);
        var month = parseInt(dateValue[1], 10);
        var day = parseInt(dateValue[2], 10);
        var $comparativeValue1 = param[0];
        var $comparativeValue2 = param[1];
        var $comparativeValue3 = param[2];
        var minComparative;
        var maxComparative;
        if ($comparativeValue1.val()) {
            minComparative = $comparativeValue1.val();
        }
        if ($comparativeValue2.val()) {
            maxComparative = $comparativeValue2.val();
        } else if ($comparativeValue3.val()) {
            maxComparative = $comparativeValue3.val();
        }
        if (minComparative) {
            var minComparatives = minComparative.split("-");
            var minComparativeYear = parseInt(minComparatives[0], 10);
            var minComparativeMonth = parseInt(minComparatives[1], 10);
            var minComparativeDay = parseInt(minComparatives[2], 10);

            if (year < minComparativeYear) {
                return false;
            }

            if (year === minComparativeYear && month < minComparativeMonth) {
                return false;
            }

            if (year === minComparativeYear && month === minComparativeMonth && day < minComparativeDay) {
                return false;
            }
        }
        if (maxComparative) {
            var maxComparatives = maxComparative.split("-");
            var maxComparativeYear = parseInt(maxComparatives[0], 10);
            var maxComparativeMonth = parseInt(maxComparatives[1], 10);
            var maxComparativeDay = parseInt(maxComparatives[2], 10);

            if (maxComparativeYear < year) {
                return false;
            }

            if (year === maxComparativeYear && maxComparativeMonth < month) {
                return false;
            }

            if (year === maxComparativeYear && month === maxComparativeMonth && maxComparativeDay < day) {
                return false;
            }
        }
        return true;
    }, "");

    $.validator.addMethod("reportDraftDateRange", function(value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        var dateValue = value.split("-");
        var year = parseInt(dateValue[0], 10);
        var month = parseInt(dateValue[1], 10);
        var day = parseInt(dateValue[2], 10);
        var $comparativeValue1 = param[0];
        var $comparativeValue2 = param[1];
        var $comparativeValue3 = param[2];
        var minComparative;
        var maxComparative;

        if ($comparativeValue2.val()) {
            minComparative = $comparativeValue2.val();
        } else if ($comparativeValue1.val()) {
            minComparative = $comparativeValue1.val();
        }
        if ($comparativeValue3.val()) {
            maxComparative = $comparativeValue3.val();
        }
        if (minComparative) {
            var minComparatives = minComparative.split("-");
            var minComparativeYear = parseInt(minComparatives[0], 10);
            var minComparativeMonth = parseInt(minComparatives[1], 10);
            var minComparativeDay = parseInt(minComparatives[2], 10);

            if (year < minComparativeYear) {
                return false;
            }

            if (year === minComparativeYear && month < minComparativeMonth) {
                return false;
            }

            if (year === minComparativeYear && month === minComparativeMonth && day < minComparativeDay) {
                return false;
            }
        }
        if (maxComparative) {
            var maxComparatives = maxComparative.split("-");
            var maxComparativeYear = parseInt(maxComparatives[0], 10);
            var maxComparativeMonth = parseInt(maxComparatives[1], 10);
            var maxComparativeDay = parseInt(maxComparatives[2], 10);

            if (maxComparativeYear < year) {
                return false;
            }

            if (year === maxComparativeYear && maxComparativeMonth < month) {
                return false;
            }

            if (year === maxComparativeYear && month === maxComparativeMonth && maxComparativeDay < day) {
                return false;
            }
        }
        return true;
    }, "");

    $.validator.addMethod("reportApprovalDateRange", function(value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        var dateValue = value.split("-");
        var year = parseInt(dateValue[0], 10);
        var month = parseInt(dateValue[1], 10);
        var day = parseInt(dateValue[2], 10);
        var $comparativeValue1 = param[0];
        var $comparativeValue2 = param[1];
        var $comparativeValue3 = param[2];
        var comparative;
        if ($comparativeValue3.val()) {
            comparative = $comparativeValue3.val();
        } else if ($comparativeValue2.val()) {
            comparative = $comparativeValue2.val();
        } else if ($comparativeValue1.val()) {
            comparative = $comparativeValue1.val();
        }
        if (comparative) {
            var comparativeValues = comparative.split("-");
            var comparativeYear = parseInt(comparativeValues[0], 10);
            var comparativeMonth = parseInt(comparativeValues[1], 10);
            var comparativeDay = parseInt(comparativeValues[2], 10);

            if (comparativeYear > year) {
                return false;
            }

            if (year === comparativeYear && comparativeMonth > month) {
                return false;
            }

            if (year === comparativeYear && month === comparativeMonth && comparativeDay > day) {
                return false;
            }
        }
        return true;
    }, "");

    $.validator.addMethod("unique", function(value, element, param) {
        if (this.optional(element)) {
            return true;
        }

        var compareValues = param;

        for (var index = 0; index < compareValues.length; index++) {
            if (value.toLowerCase() === compareValues[index].toLowerCase()) {
                return false;
            }
        }

        return true;
    }, "Please input an unique value.");

})(jQuery);