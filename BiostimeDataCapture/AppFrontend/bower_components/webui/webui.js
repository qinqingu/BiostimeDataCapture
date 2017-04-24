$.webui = $.webui || {};
$.extend( $.webui, {
	version: "0.1.1",
	keyCode: {
		ALT: 18,
		BACKSPACE: 8,
		CAPS_LOCK: 20,
		COMMA: 188,
		COMMAND: 91,
		COMMAND_LEFT: 91, // COMMAND
		COMMAND_RIGHT: 93,
		CONTROL: 17,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		INSERT: 45,
		LEFT: 37,
		MENU: 93, // COMMAND_RIGHT
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SHIFT: 16,
		SPACE: 32,
		TAB: 9,
		UP: 38,
		WINDOWS: 91 // COMMAND
	}
});
jQuery(function($){
    $.datepicker.regional['zh-CN'] = {
        closeText: '关闭',
        prevText: '&#x3c;上月',
        nextText: '下月&#x3e;',
        currentText: '今天',
        monthNames: ['一月','二月','三月','四月','五月','六月',
        '七月','八月','九月','十月','十一月','十二月'],
        monthNamesShort: ['一','二','三','四','五','六',
        '七','八','九','十','十一','十二'],
        dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
        dayNamesMin: ['日','一','二','三','四','五','六'],
        dateFormat: 'yy-mm-dd', firstDay: 1,
        isRTL: false
        };
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});
jQuery.fn.extend({
    inputing: function(callback, delay){
        if(!delay){
            delay = 300;
        }
        var timer = null;
        this.keyup(function(){
            if(timer !== null){
                clearTimeout(timer);
            }
            timer = setTimeout(callback, delay);
        });
        return this;
    },
    horizontalForm: function(){
        this.find(".form-group")
            .each(function(){
                var $this = $(this);
                var parentWidth = $this.parent().width();
                var labelWidth = $this.find(".control-label").outerWidth() || 0;
                $this.find(".control-input").outerWidth(parentWidth - labelWidth - 30);
            });
    },
    caret: function(begin, end) {
		var range;

		if (this.length === 0 || this.is(":hidden")) {
			return;
		}

		if (typeof begin == 'number') {
			end = (typeof end === 'number') ? end : begin;
			return this.each(function() {
				if (this.setSelectionRange) {
					this.setSelectionRange(begin, end);
				} else if (this.createTextRange) {
					range = this.createTextRange();
					range.collapse(true);
					range.moveEnd('character', end);
					range.moveStart('character', begin);
					range.select();
				}
			});
		} else {
			if (this[0].setSelectionRange) {
				begin = this[0].selectionStart;
				end = this[0].selectionEnd;
			} else if (document.selection && document.selection.createRange) {
				range = document.selection.createRange();
				begin = 0 - range.duplicate().moveStart('character', -100000);
				end = begin + range.text.length;
			}
			return { begin: begin, end: end };
		}
	}    
});
jQuery.extend({
    
    resolveUrl: function(path, param){
        var query = "";
        if(param){
            query = $.param(param);
        }
        if($.baseUrl === undefined){
            $.baseUrl = "";
        }
        if(path.indexOf("?") > -1){
            return $.baseUrl + path + query;
        }
        else{
            return $.baseUrl + path + "?" + query;
        }
    },
    toJSON: function(json){
        return JSON.stringify(json);
    },
    formatDate: function(date){
        if(!date){
            return "";
        }
        else if(typeof(date) === "string"){
            return date.split("T")[0];
        }
        else if(typeof(date) === "object"){
            return fecha.format(date, "YYYY-MM-DD");
        }
        return "";
    },
    formatDateTime: function(date){
        if(!date){
            return "";
        }
        else if(typeof(date) === "string"){
            date = date.replace("T", " ");
            if(date.length > 16){
                date = date.substring(0, 16);
            }
        }
        else if(typeof(date) === "object"){
            date = fecha.format(date, "YYYY-MM-DD hh:mm");
        }
        return date;
    },
    toISODate: function(value){
        if(!value){
            return "";
        }
        else if(typeof(value) === "string"){
            return $.trim(value);
        }
        else if(typeof(value) === "object"){
            return fecha.format(value, "YYYY-MM-DD");
        }
        return "";
    },
    toISODateTime: function(value){
        if(!value){
            return "";
        }
        else if(typeof(value) === "string"){
            return $.trim(value).replace(" ", "T");
        }
        else if(typeof(value) === "object"){
            return fecha.format(value, "YYYY-MM-DDThh:mm");
        }
        return "";
    },
    download: function(url){
        if(!$(".__downloadIFrame").length){
            $("body").append("<iframe class='__downloadIFrame' style='display:none'></iframe>");
        }
        $(".__downloadIFrame").attr("src", url);
    },
    format: function(source, params) {
        if ( arguments.length == 1 )
            return function() {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.validator.format.apply( this, args );
            };
        if ( arguments.length > 2 && params.constructor != Array  ) {
            params = $.makeArray(arguments).slice(1);
        }
        if ( params.constructor != Array ) {
            params = [ params ];
        }
        $.each(params, function(i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
        });
        return source;
    },
    getProperty: function(name, scope){
        if(!scope){
            scope = window;
        }
        for(var n in name.split(",")){
            scope = scope[n];
        }
        return scope;
    }
});

// is extend
jQuery.extend({
    isString: function(s){
        return is.string(s);
    },
    isRegex: function(r){
        return is.regexp(r);
    },
    isDateString: function(d){
        return /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/.test(d);
    },
    isDateTimeString: function(d){
        return /^[0-9]{4}[-][0-9]{2}[-][0-9]{2} [0-9]{2}:[0-9]{2}$/.test(d);
    },
    isObject: function(o){
        var type = typeof o;
        return type === 'object' && !!o;
    }
});
$.ajaxSetup ({
    cache: false
});

Array.prototype.find = function(action){
    var value;
    $.each(this, function(){
        if(action(this)){
            value = this;
            return false;   
        }
    });
    return value;
};
Array.prototype.sum = function(prop){
    var sumValue = 0, tempValue;
    $.each(this, function(){
        tempValue = prop(this);
        if($.isNumeric(tempValue)){
            sumValue += prop(this);
        }
    });
    return sumValue.toFixed(2);
};
(function($){
    $.widget("webui.mask", {
            options: {
                pattern: null,
                definitions: {'9': /[0-9]/, 'a': /[A-Za-z]/, '*': /[A-Za-z0-9]/},
                placeholder: "_"
            },
            _create: function(){
                var thiz = this, $element = this.element, input = this.element.data("input");
                this._pattern = this.options.pattern;
                this._definitions = this.options.definitions;
                this._placeholder = this.options.placeholder;
                this._patternRegexes = [];
                this._patternChars = [];
                this._patternPlaceholder = "";

                this._initPattern();
                $element.keydown(function(e){
                    var pos, deleteLength, deleteIndex;
                    if(e.which == $.webui.keyCode.BACKSPACE){
                        pos = $element.caret(); 
                        deleteLength = pos.end - pos.begin; 
                        deleteIndex = pos.begin - 1;
                        thiz._delete(deleteIndex, deleteLength);
                        return false;
                    }
                    else if(e.which == $.webui.keyCode.DELETE){
                        pos = $element.caret(); 
                        deleteLength = pos.end - pos.begin; 
                        deleteIndex = pos.begin;
                        thiz._delete(deleteIndex, deleteLength);
                        return false;
                    }
                });

                $element.keypress(function(e){
                    var char = String.fromCharCode(e.which);
                    if(thiz._validteInputChar(char)){
                        thiz._insert(char);
                    }
                    return false;
                });

                $element.blur(function(e){
                    var val = $element.val();
                    if(val === thiz._patternPlaceholder){
                        input.setValue("");
                        input.changed();
                    }
                });
            },
            _initPattern: function(){
                var definition, definitionPattern = "", splitChar;
                this._definitions[this._placeholder] = new RegExp(this._placeholder);
                for(i = 0; i < this._pattern.length; i ++){
                    definition =  this._definitions[this._pattern.charAt(i)];
                    if(definition){
                        this._patternRegexes.push(definition);
                        this._patternPlaceholder += this._placeholder;
                    }
                    else{
                        splitChar = this._pattern.charAt(i);
                        this._patternRegexes.push(new RegExp(splitChar));
                        this._patternChars.push(splitChar);
                        this._patternPlaceholder += splitChar;
                    }
                }
            },
            _delete: function(deleteIndex, deleteLength){
                var value = this.element.val(),
                    inputChars = value.split("");
                if(deleteLength <= 0){
                    deleteLength = 1;
                }
                if(deleteIndex < 0){
                    deleteIndex = 0;
                }
                inputChars.splice(deleteIndex, deleteLength);
                value = inputChars.join("");
                value = this._format(inputChars);
                this.element.val(value);
                this.element.caret(deleteIndex);
            },
            _insert: function(insertChar){
                var pos = this.element.caret(),
                    value = this.element.val(),
                    inputChars = value.split(""), deleteLength = pos.end - pos.begin, insertIndex = pos.begin;
                if(deleteLength <= 0){
                    deleteLength = 1;
                }
                //如果字符不是格式化字符
                while(insertIndex < this._pattern.length && !this._isMaskChar(insertIndex)){
                    insertIndex ++;
                }
                inputChars.splice(insertIndex, deleteLength, insertChar);
                value = this._format(inputChars);
                this.element.val(value);
                insertIndex ++;
                while(insertIndex < this._pattern.length && !this._isMaskChar(insertIndex)){
                    insertIndex ++;
                }
                this.element.caret(insertIndex);
            },
            _format: function(inputChars){
                var patternRegex, patternChar, patternChars,
                    definition, formatChars = [], formatChar, inputChar, i;
                patternChars = this._patternChars.slice(0);
                //203-00-11 203s-00-11 9999-99-99
                patternChar = patternChars.shift();
                inputChar = inputChars.shift();
                for(i = 0; i < this._patternRegexes.length; i ++){
                    patternRegex =  this._patternRegexes[i];
                    formatChar = this._placeholder;
                    if(patternRegex.test(inputChar)){
                        //匹配成功接收输入字符，并且替换输入字符
                        formatChar = inputChar;
                        inputChar = inputChars.shift();
                        //如果是分割字符，替换分割字符
                        if(patternRegex.test(patternChar)){
                            patternChar = patternChars.shift();
                        }
                    }
                    else{
                        //如果是分割字符替换分割字符并且替换分割字符，否则为设置为待输入字符
                        if(patternRegex.test(patternChar)){
                            formatChar = patternChar;
                            patternChar = patternChars.shift();
                        }
                        else{
                            formatChar = this._placeholder;
                            //如果输入不是分割字符就替换输入字符
                            if(inputChar !== patternChar){
                                inputChar = inputChars.shift();
                            }
                        }
                    }
            
                    formatChars.push(formatChar);
                }
                return formatChars.join("");
            },
            //是格式化字符
            _isMaskChar: function(index){
                return this._pattern[index] in this._definitions;
            },
            //验证输入字符
            _validteInputChar: function(char){
                for(var i = 0; i < this._patternRegexes.length; i++){
                    if(this._patternRegexes[i].test(char)){
                        return true;
                    }
                }
                return false;
            }
        }
    );    
})(jQuery);

(function($){
    var inputValidators = {
        email: function(input, value){
            var result = false;
            result = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value);
            return result;
        }
    };
    $.widget("webui.input", {
            options: {

            },
            _create: function(){
                this.element.data("input", this);
                var thiz = this;
                this._changedEvents = [];
                this._initOptions();
                this._createTextElement();
                this._createMessagePopover();
                this._onCreated();
                if(this.element.is(":input")){
                    this.element.change(function(){
                        thiz._changed();
                    });
                }
                this.reset();
            },
            _initOptions: function(){
                this._name = this.options.name || this.element.attr("name");
                this._defaultValue = this.options.defaultValue || this.element.data("defaultValue");
                this._required = this.options.required || this.element.data("required");
                this._requriedMessage = this.options.requiredMessage || this.element.data("requiredMessage");
                this._readonly = this.options.readonly || this.element.data("readonly");
                this._validator = this.options.validator || this.element.data("validator");
                var render = this.options.render || this.element.data("render");
                if(typeof(render) === "string"){
                    this._render = $.webui.__renders[render];
                    if(!this._render){
                        this._render = window[render];
                    }
                }
                else if(typeof(render) === "function"){
                    this._render = render;
                }
            },
            _createTextElement: function(){
                this._textElement = $("<p style=\"display: none\" class=\"form-control-static\"></p>");
                this.element.after(this._textElement);
            },
            _createMessagePopover: function(){
                this.element.popover({"content": "", placement: "auto top", trigger: "manual", container: "body"});
            },
            _onCreated: function(){
                
            },
            reset: function(){
                this.setValue(this._defaultValue);
                this.setReadonly(this._readonly);
            },
            _onChanging: function(){
                
            },
            _changed: function(){
                this._onChanging();
                var thiz = this;
                this.validate();
                var value = this.getValue();
                $.each(this._changedEvents, function(){
                    this(thiz, value);
                });
            },
            changed: function(callback){
                if(callback){
                    this._changedEvents.push(callback);
                }
                else{
                    this._changed();
                }
            },
            inputing: function(callback, delay){
                var thiz = this;
                this.element.inputing(function(){
                    var value = thiz.getValue();
                    callback(thiz, value);
                }, delay);
            },
            getName: function(){
                return this._name;
            },
            setError: function(error){
                if(error){
                    this.element.closest(".form-group").addClass("has-error");
                }
                else{
                     this.element.closest(".form-group").removeClass("has-error");
                }
            },
            popMessage: function(message){
                this.element.attr('data-content', message).popover('show');
            },
            hidePopMessage: function(){
                this.element.popover('hide');
            },
            _validateRequired: function(value){
                if(this._required && value === null){
                    if(this._requriedMessage && !this._tryValidating){
                        $.messageBox.info(this._requriedMessage);
                    }
                    return false;
                }
                return true;
            },
            _validateValidator: function(value){
                var func;
                if($.isString(this._validator)){
                    if(this._validator in inputValidators){
                        func =  inputValidators[this._validator];
                    }
                    else{
                        func = window[this._validator];
                    }
                    if($.isFunction(func)){
                        return func(this, value);
                    }
                    else{
                        throw this._validator + " is not function!";
                    }
                }
                else if($.isFunction(this._validator)){
                    return this._validator(this, value);
                }
                else if($.isRegex(this._validator)){
                    return this._validator.test(value);
                }
                return true;
            },
            validate: function(){
                var value = this.getValue(), result = null;
                result = this._validateRequired(value);
                if(result && value !== null){
                    result = this._validateValidator(value);
                }
                if(!this._tryValidating){
                    this.setError(!result);
                }
                return result;
            },
            tryValidate: function(){
                var result = false;
                this._tryValidating = true;
                try{
                    result = this.validate();
                }
                catch(e){
                    
                }
                this._tryValidating = false;
                return result;
            },
            focus: function(){
                if(this.element.css("display") !== "none"){
                    this.element.focus();
                }
            },
            setDefaultValue: function(value){
                this._defaultValue = value;
                this.setValue(value);
            },
            getDefaultValue: function(){
                return this._defaultValue;
            },
            setValue: function(value){
                this._setValue(value);
            },
            _setValue: function(value){
                var text = this._getText(value);
                this.element.val(value);
                this._textElement.html(text);
            },
            _getText: function(value){
                var text = value;
                if(jQuery.isFunction(this._render)){
                    text = this._render(value);
                }
                return text;
            },
            getValue: function(){
                var value = this.element.val();
                value = jQuery.trim(value);
                if(value){
                    return value;
                }
                return null;
            },
            setRequired: function(required){
                this._required = required;
            },
            getRequired: function(){
                return this._required;
            },
            setReadonly: function(readonly){
                this._readonly = readonly;
                if(this._readonly){
                    this._textElement.show();
                    this.element.hide();
                }
                else{
                    this._textElement.hide();
                    this.element.show();
                }
            },
            getReadonly: function(){
                return this._readonly;
            }
        }
    );

    $.webui.__renders = {
        int: function(value){
            if($.isNumeric(value)){
                return value.toFixed(0);
            }
            return value;
        },
        number1: function(value){
            if($.isNumeric(value)){
                return value.toFixed(1);
            }        
            return value;
        },
        number2: function(value){
            if($.isNumeric(value)){
                return value.toFixed(2);
            }
            return value;
        },
        shifou: function(value){
            return value ? "是" : "否";
        },
        name: function(value){
            if($.isArray(value)){
                value = $.map(value, function(obj){
                    return obj.name;
                });
                return value.toString();
            }
            else if(value){
                return value.name;
            }
            return "";
        },
        nameMultiRow: function(value){
            if($.isArray(value)){
                value = $.map(value, function(obj){
                    return obj.name;
                });
                return value.join("<br />");
            }
            return "";
        },
        date: function(value){
            return $.formatDate(value);
        },
        dateRange: function(value){
            if(value){
                if(value.start === null && value.end !== null){
                    return  $.formatDate(value.end) + "以前";
                }
                else if(value.start !== null && value.end === null){
                    return  $.formatDate(value.start) + "以后";
                }
                else{
                    return $.formatDate(value.start) + "到" + $.formatDate(value.end);
                }
            }
            return "";
        },
        dateTime: function(value){
            if(value){
                return  $.formatDateTime(value);
            }
            return "";
        },
        dateTimeRange: function(value){
            if(value){
                if(value.start === null && value.end !== null){
                    return  $.formatDateTime(value.end) + "以前";
                }
                else if(value.start !== null && value.end === null){
                    return  $.formatDateTime(value.start) + "以后";
                }
                else{
                    return $.formatDateTime(value.start) + "到" + $.formatDateTime(value.end);
                }
            }
            return "";
        }
    };
})(jQuery);
(function($){
    $.widget("webui.selectInput", $.webui.input, {
            _load: function(){
                var thiz = this;
                this._textField = this.options.textField || this.element.data("textField") || "text";
                this._valueField = this.options.valueField || this.element.data("valueField") || "value";
                this._source = this.options.source || this.element.data("source");
                if($.isString(this._source)){
                    this._source = eval(this._source);
                }
                
                if($.isArray(this._source)){
                    this.setSource(this._source);
                }
                else if($.isObject(this._source)){
                    this.setSource(this._source);
                }
            },
            setSource: function(source){
                var thiz = this;
                this.element.empty();
                this._items = [];
                if($.isArray(source)){
                    $.each(source, function(i, s){
                        if(s.group && s.source && s.source.length){
                            thiz._appendGroup(s.group);
                            $.each(s.source, function(_i, _s){
                                thiz._appendItem(_s);
                            });
                        }
                        else{
                            thiz._appendItem(s);
                        }
                    });
                }
                this._sourceChanged();
            },
            _sourceChanged: function(){
            
            },
            _appendGroup: function(text){
                var element = this._getGroupElement(text);
                if(element){
                    this.element.append(element);
                }
            },
            _getGroupElement: function(text){
                
            },
            _appendItem: function(item){
                var text, value;
                this._items.push(item);
                text = this._getItemText(item);
                value = this._getItemValue(item);
                
                var element = this._getSelectElement(value, text);
                this.element.append(element);
            },
            _getSelectElement: function(value, text){
                return "<div></div>";
            },
            _getText: function(value){
                var item = this._findItemByValue(value);
                var text = this._getItemText(item);
                if(!text){
                    return value;
                }
                return text;
            },
            _getItemValue: function(item){
                if($.isObject(item)){
                    return item[this._valueField];
                }
                else{
                    return item;
                }
            },
            _getItemText: function(item){
                if($.isObject(item)){
                    return item[this._textField];
                }
                else{
                    return item;
                }
            },
            _findItemByValue: function(value){
                var thiz = this, item;
                if(this._items){
                    $.each(this._items, function(i, _item){
                        if(thiz._getItemValue(_item) === value){
                            item = _item;
                            return false;
                        }
                    });
                }
                return item;
            }
        }
    );
})(jQuery);

(function($){
 $.widget("webui.hiddenInput", $.webui.input, {
            options: {
                name: null
            },
            setReadonly: function(readonly){
                this._readonly = readonly;
            },
            getReadonly: function(){
                return this._readonly;
            }
        }
    );  
})(jQuery); 
(function($){
 $.widget("webui.textbox", $.webui.input, {
            options: {
                required: false,
                suggestions: null,
                name: null,
                defaultValue: null
            },
            _onCreated: function(){
                var regex = this.options.regex || this.element.data("regex");
                this._regexMessage = this.options.regexMessage || this.element.data("regexMessage");
                this._suggestions = this.options.suggestions || this.element.data("suggestions");
                
                if(this._suggestions){
                    this._createSuggestion();
                }
                if(regex){
                    this._regex = new RegExp(regex);
                }
            },
            _createSuggestion: function(){
                function split(val) {
                    return val.split(multipleSymbolRegex);
                }
                function extractLast(term) {
                    return split(term).pop();
                }
                
                var multipleSymbolRegex = /[,，、\\；;]\s*/,
                    multipleSymbolEndRegex = /[,，、\\；;]$/,
                    suggestions = this._suggestions;
                if($.isString(suggestions)){
                    try{
                        suggestions = eval(suggestions);
                    }
                    catch(e){
                        
                    }
                }
                this.element.autocomplete({
                    source: function (request, response) {
                        if($.isString(suggestions)){
                            $.getJSON( suggestions, {term: extractLast( request.term )}, response );
                        }
                        else{
                            response($.ui.autocomplete.filter(suggestions, extractLast(request.term)));
                        }
                    },
                    focus: function () {
                        return false;
                    },
                    minLength: 0,
                    select: function (event, ui) {
                        var val = $(this).val();
                        if (multipleSymbolEndRegex.test(val)) {
                            $(this).val( val + ui.item.value);
                        }
                        else {
                            $(this).val(ui.item.value);
                        }
                        return false;
                    }
                })
                .click(function () {
                    $(this).autocomplete("search", "");
                });
            },           
            setSuggestions: function(suggestions){
                this._suggestions = suggestions;
                this._createSuggestion();
            }
        }
    );  
})(jQuery); 
(function($){
    $.widget("webui.dateInput", $.webui.input, {
            options: {
                required: false,
                name: null,
                defaultValue: null
            },
            _onCreated: function(){
                var thiz = this;
                this.element.datepicker()
                    .inputing(function(){
                        thiz._changed();
                    }, 0)
                    .mask({pattern: "9999-99-99"});
                this._validator = function(input, value){
                    return $.isDateString(thiz.element.val());
                };
            },
            getValue: function(){
                var value = this.element.val();
                if(value){
                    return $.toISODate(value);
                }
                return null;
            },
            setValue: function(value){
                var dateFormat = $.formatDate(value);
                this.element.val(dateFormat);
                this._textElement.html(dateFormat);
            }
        }
    );
})(jQuery);
(function($){
    $.widget("webui.checkboxList", $.webui.selectInput, {
            _onCreated: function(){
                var thiz = this;
                this.element.find("input").click(function(){
                    thiz._changed();
                });
                this._load();
            },
            getValue: function(){
                var value = this.element.find(":checked")
                    .map(function(){
                        return $(this).val();
                    })
                    .get();
                if(value.length){
                    return value;
                }
                else{
                    return null;
                }
            },
            setValue: function(value){
                if(value){
                    this.element.find("input").each(function(){
                        var index = $.inArray($(this).val(), value);
                        $(this).prop("checked", index > -1);
                    });

                    this._textElement.html(value.toString());
                }
                else{
                    this.element.find("input").each(function(){
                        $(this).prop("checked", false);
                    });

                    this._textElement.html("");
                }
            },
            setReadonly: function(readonly){
                this._readonly = readonly;
                this.element.find("input").prop("disabled", readonly);
            },
            _getSelectElement: function(value, text){
                return $.format("<label class='checkbox-inline'><input type='checkbox' value='{0}'/> {1}</label>", value, text);
            }
        }
    );
})(jQuery);
(function($){
    $.widget("webui.dateRangeInput", $.webui.input, {
            _onCreated: function(){
                var thiz = this, inputs;
                inputs = this.element.find("input");
                this._startInput = inputs.eq(0).dateInput().data("dateInput");
                this._endInput = inputs.eq(1).dateInput().data("dateInput");
                inputs.change(function(){
                    thiz._changed();
                });
            },
            validate: function(){
                var value = this.getValue(), result = null;
                
                result = this._validateRequired(value);
                if(result && value){
                    result = this._startInput.validate() && this._endInput.validate();
                }
                if(result){
                    result = this._validateRange(value);
                }
                this.setError(!result);
                return result;
            },
            _validateRange: function(value){
                var result = true;
                if(value && value.start && value.end && new Date(value.start) > new Date(value.end)){
                    result = false;
                    this.popMessage("最小值不能大于最大值！");
                }
                else{
                    this.hidePopMessage();
                }
                return result;
            },
            focus: function(){
                this._startInput.focus();
            },
            getValue: function(){
                var start = this._startInput.getValue();
                var end = this._endInput.getValue();
                if(start || end){
                    return {start: start, end: end};
                }
                return null;
            },
            setValue: function(value){
                var start = null, end = null;
                if(value){
                    start = value.start;
                    end = value.end;
                }
                this._startInput.setValue(start);
                this._endInput.setValue(end);
                start = $.formatDate(start);
                end = $.formatDate(end);
                this._textElement.html(start + " 到 " + end);
            }
        }
    );
})(jQuery);
(function($){

    $.widget("webui.form", {
            options: {
                sections: null
            },
            _create: function(){
                var thiz = this;
                this._value = {};
                this._inputs = {};
                
                $.each($.webui.form.inputTypes, function(i, inputType){
                    var inputName = inputType.name, 
                        inputs = thiz.element.find(inputType.selector),
                        input;
                    if(inputs.length){
                        if(! inputs[inputName]){
                            throw $.format("{0} widget not found!", inputName);
                        }
                        inputs.each(function(){
                            //init jquery widget
                            input = $(this)[inputName]().data(inputName);
                            thiz._inputs[input.getName()] = input;
                        });
                    }
                });
            },
            getValue: function(){
                var inputValues = {};
                $.each(this._inputs, function(name, input){
                    inputValues[name] = input.getValue();
                });
                $.extend(this._value, inputValues);
                return this._value;
            },
            setValue: function (value) {
                this._value = value;
                for(var name in value){
                    if(name in this._inputs){
                        this._inputs[name].setValue(value[name]);
                    }
                }
            },
            setDefaultValue: function(value){
                $.extend(this._value, value);
                for(var name in value){
                    if(name in this._inputs){
                        this._inputs[name].setDefaultValue(value[name]);
                    }
                }
            },
            setReadonly: function(readonly){
                $.each(this._inputs, function(name, input){
                    input.setReadonly(readonly);
                });
            },
            reset: function(){
                this._value = {};
                $.each(this._inputs, function(name, input){
                    input.reset();
                });
            },
            validate: function(container){
                var invalidInputs = [];
                var inputs = this._inputs;
                if(container){
                    inputs = this.getInputs(container);
                }
                $.each(inputs, function(name, input){
                    if(!input.validate()){
                        invalidInputs.push(input);
                    }
                });
                if(invalidInputs.length > 0){
                    invalidInputs[0].focus();
                    return false;
                }
                return true;
            },
            getInput: function(name){
                return this._inputs[name];
            },
            setInput: function(name, input){
                this._inputs[name] = input;
            },
            getInputs: function(container){
                var inputs = [];
                $.each($.webui.form.inputTypes, function(i, inputType){
                    var inputName = inputType.name, 
                        input;
                    container.find(inputType.selector).each(function(){
                        input = $(this).data(inputName);
                        inputs.push(input);
                    });
                });
                return inputs;
            },
            changed: function(callback){
                $.each(this._inputs, function(name, input){
                    input.changed(function(_input, value){
                        callback(_input, value);
                    });
                });
            },
            inputing: function(callback, delay){
                $.each(this._inputs, function(name, input){
                    input.inputing(function(_input, value){
                        callback(_input, value);
                    }, delay);
                });
            }
        }
    );
    
    $.webui.form.inputTypes = [
        {name: "hiddenInput", selector: ".webui-hidden"},
        {name: "checkboxList", selector: ".webui-checkboxList"},
        {name: "dateInput", selector: ".webui-dateInput"},
        {name: "dateRangeInput", selector: ".webui-dateRangeInput"},
        {name: "numberInput", selector: ".webui-numberInput"},
        {name: "numberRangeInput", selector: ".webui-numberRangeInput"},
        {name: "radioList", selector: ".webui-radioList"},
        {name: "simpleSelect", selector: ".webui-simpleSelect"},
        {name: "textarea", selector: ".webui-textarea"},
        {name: "textbox", selector: ".webui-textbox"},
        {name: "complexSelect", selector: ".webui-complexSelect"},
        {name: "datagrid", selector: ".webui-datagrid"},
        {name: "boolRadio", selector: ".webui-boolRadio"},
        {name: "boolCheckbox", selector: ".webui-boolCheckbox"},
        {name: "label", selector: ".webui-label"},
        {name: "dateTimeInput", selector: ".webui-dateTimeInput"},
        {name: "dateTimeRangeInput", selector: ".webui-dateTimeRangeInput"},
        {name: "multiFileUpload", selector: ".webui-multiFileUpload"}
    ];

})(jQuery);

(function($){
    $.widget("webui.numberInput", $.webui.input, {
            options: {
                required: null,
                name: null,
                max: null,
                min: null,
                precision: null,
                defaultValue: null,
                zeroEqualEmpty: false
            },
            _onCreated: function(){
                this._zeroEqualEmpty = this.element.data("zeroEqualEmpty") || this.options.zeroEqualEmpty;
                this._precision = this.options.precision || this.element.data("precision");
                this._max = this.options.max || this.element.data("max");
                this._min = this.options.min || this.element.data("min");
                if(this._precision > 0){
                    this._numberRegex = new RegExp($.format("^[-,+]?[0-9]+(.[0-9]{0,{0}})?$", this._precision));
                }
                else{
                    this._numberRegex = new RegExp("(^[-,+]?[1-9][0-9]*$)|0");
                }
            },
            validate: function(){
                var value = $.trim(this.element.val()), result = null;
                result = this._validateFormat(value);
                value = this.getValue();
                if(result){
                    result = this._validateValidator(value);
                }
                if(result){
                    result = this._validateRange(value);
                }
                if(result){
                    result = this._validateRequired(value);
                }
                
                this.setError(!result);
                return result;
            },
            _validateRequired: function(value){
                var valid = true;
                if(this._required){
                    if(value === null){
                        valid = false;
                    }
                    if(this._zeroEqualEmpty && value === 0){
                        valid = false;
                    }
                }
                if(!valid && this._requriedMessage){
                    $.messageBox.info(this._requriedMessage);
                }
                return valid;
            },
            _validateFormat: function(value){
                var result = true;
                if(value){
                    if(!this._numberRegex.test(value)){
                        result = false;
                        this.popMessage("格式错误！");
                    }
                    else{
                        this.hidePopMessage();
                    }
                }
                return result;
            },
            _validateRange: function(value){
                var result = true;
                if(value){
                    value = parseFloat(value);
                    if((value > this._max) || (value < this._min)){
                        result = false;
                        this.popMessage("不能超出范围:"+ this._min + "-" + this._max);
                    }
                    else{
                        this.hidePopMessage();
                    }
                }
                return result;
            },
            getValue: function(){
                var value = this.element.val();
                value = parseFloat(value);
                if(!$.isNumeric(value)){
                    value = null;
                }
                if(this._zeroEqualEmpty && value === null){
                    value = 0;
                }
                return value;
            },
            setValue: function(value){
                var text = "";
                value = parseFloat(value);
                if($.isNumeric(value)){
                    text = value.toFixed(this._precision);
                }
                else{
                    text = "";
                }
                if(value === 0 && this._zeroEqualEmpty){
                    text = "";
                }
                this.element.val(text);
                this._textElement.html(text);
            }
        }
    );
})(jQuery);

(function($){
    $.widget("webui.numberRangeInput", $.webui.input, {
            options: {
                required: null,
                name: null,
                defaultValue: null
            },
            _onCreated: function(){
                var thiz = this, inputs;
                inputs = this.element.find("input");
                this._minInput = inputs.eq(0);
                this._maxInput = inputs.eq(1);
                inputs.change(function(){
                    thiz._changed();
                });
            },
            validate: function(){
                var value = this.getValue(), result = null;
                result = this._validateRequired(value);
                if(result){
                    result = this._validateValidator(value);
                }
                if(result){
                    result = this._validateRange(value);
                }
                this.setError(!result);
                return result;
            },
            _validateRange: function(value){
                var result = true;
                if(value && value.min !== null && value.max !== null && value.min > value.max){
                    result = false;
                    this.popMessage("最小值不能大于最大值！");
                }
                return result;
            },
            focus: function(){
                if(this._minInput.css("display") !== "none"){
                    this._minInput.focus();
                }
            },
            getValue: function(){
                var min = this._minInput.val(),
                    max = this._maxInput.val();

                min = this._parseFloat(min);
                max = this._parseFloat(max);
                if($.isNumeric(min) || $.isNumeric(max)){
                    return {min: min, max: max};
                }
                return null;
            },
            setValue: function(value){
                var min = "", max = "";
                if(value){
                    min = $.isNumeric(value.min) ? value.min : "";
                    max = $.isNumeric(value.max) ? value.max : "";
                }

                this._minInput.val(min);
                this._maxInput.val(max);
                this._textElement.html(min.toString() + " - " + max.toString());
            },
            _parseFloat: function(value){
                value = parseFloat(value);
                if($.isNumeric(value)){
                    return value;
                }
                else{
                    return null;
                }
            }
        }
    );
})(jQuery);
(function($){
    $.widget("webui.radioList", $.webui.selectInput, {
            _onCreated: function(){
                var thiz = this;
                this.element.find("input").click(function(){
                    thiz._changed();
                });
                this._load();
            },
            getValue: function(){
                var checkedRadios = this.element.find(":checked");
                if(checkedRadios.length){
                    return checkedRadios.eq(0).val();
                }
                return null;
            },
            setValue: function(value){
                if(value !== null && typeof(value) !== 'undefined'){
                    value = value.toString();
                    this.element.find("input").each(function(){
                        if($(this).val() === value){
                            $(this).prop("checked", true);
                        }
                    });

                    this._textElement.html(value);
                }
                else{
                    this.element.find("input").each(function(){
                        $(this).prop("checked", false);
                    });

                    this._textElement.html("");
                }
            },
            setReadonly: function(readonly){
                this._readonly = readonly;
                this.element.find("input").prop("disabled", readonly);
            },
            _getSelectElement: function(value, text){
                return $.format("<label class='radio-inline'><input type='radio' name='{0}' value='{1}'/> {2}</label>", this._name, value, text);
            }
        }
    );
})(jQuery);


(function($){
    $.widget("webui.textarea", $.webui.textbox, {
            setValue: function(value){
                if(value !== null && value !== undefined){
                    value = value.toString();
                    this.element.val(value);
                    value = value.replace(/\n/g, "</br>");
                    this._textElement.html(value);
                }
                else{
                    this.element.val("");
                    this._textElement.html("");
                }
            }
        }
    );
})(jQuery);
(function( $, undefined ) {
var dagaridRenders = {
    numberEditor: function (value, datarow, cell, column, precision){
        if($.isNumeric(value)){
            value = value.toFixed(precision);
        }
        else{
            value = "";
        }
        var cellWidth = column.width;
        var inputElement = $("<input style='border: none;'/>")
            .outerWidth(cellWidth)
            .val(value)
            .change(function(){
                var changeValue = parseFloat(inputElement.val());
                if(!$.isNumeric(changeValue)){
                    changeValue = 0;
                }
                var rowValue = datarow.getValue();
                rowValue[column.field] = changeValue;
                datarow.setValue(rowValue);
            });
        return inputElement;
    },
    intEditor: function(value, datarow, cell, column){
        return dagaridRenders.numberEditor(value, datarow, cell, column, 0);
    },
    number1Editor: function(value, datarow, cell, column){
        return dagaridRenders.numberEditor(value, datarow, cell, column, 1);
    },
    number2Editor: function(value, datarow, cell, column){
        return dagaridRenders.numberEditor(value, datarow, cell, column, 2);
    }
};
$.extend(dagaridRenders, $.webui.__renders);
var cloumnDefaultWidth = 100;

$.widget( "webui.datagrid", $.webui.input, {
    _headerCells: null,
    _rows: null,
    options: {
        columns: null,
        singleSelect: false,
        width: null,
        height: null,
        data: null,
        showNumberColumn: false,
        name: null,
        defaultValue: null,
        required: false,
        readonly: false,
        hideHeader: false,
        bordered: true,
        textWrap: false
    },
    _onCreated: function() {
        this._defaultValue = this.options.data;
        this._footer = this.options.footer;
        var self = this, header, headerContent, body, bodyContent;
        this._headerCells = [];
        this._rows = [];
        this.element.addClass("ui-datagrid");
        
        if(this.options.columns === null || !this.options.columns.length){
            return;
        }
        header = this._header = $("<div class='ui-datagrid-header'><div class='ui-datagrid-header-content'><table class='table table-bordered'><thead><tr></tr></thead></table></div></div>");

        this.element.append(header);
        headerContent = this._headerContent = header.children(".ui-datagrid-header-content");
        
        body = this._body = $("<div class='ui-datagrid-body'><div class='ui-datagrid-body-content'><table class='table table-bordered table-hover'></table></div></div>");
        bodyContent = this._bodyContent = body.find("table");
        body.scroll(function(){
            header.scrollLeft($(this).scrollLeft());
        });
        this.element.append(body);
        if(!this.options.bordered){
            this.element.find("table").removeClass("table-bordered");
        }
        if(this.options.textWrap){
            this.element.addClass("wrap");
        }else{
            this.element.addClass("ellipsis");
        }

        if(!this.options.hideHeader){
            this._renderHeader();
        }
        this.refreshSize();
        $(window).resize(function() {
            self.refreshSize();
        });
    },
    _renderHeader: function(){
        this._renderHeaderNumberCell();
        this._renderHeaderCheckboxCell();
        this._renderHeaderCells();
    },
    _renderHeaderNumberCell: function(){
        this._header.find(".ui-datagrid-header-numbercell").remove();
        if(this.options.showNumberColumn){
            var th = $("<th class='ui-datagrid-header-numbercell' ><div class='ui-datagrid-header-cell'></div></th>");
            this._header.find("tr").append(th);
        }
    },
    _renderHeaderCheckboxCell: function(){
        var self = this, th;
        this._header.find(".ui-datagrid-header-checkbox-cell").remove();
        if(!this.options.singleSelect){
            th = $("<th class='ui-datagrid-header-checkbox-cell' ><div class='ui-datagrid-header-cell'><input type='checkbox'/></div></th>");
            th.click(function(ev){
                self._onHeaderCheckboxCell_click($(this));
                ev.stopPropagation();
            });
            this._header.find("tr").append(th);
        }
    },
    _renderHeaderCells: function(){
        var self = this, datagridHeight;
        if(this._headerCells && this._headerCells.length){
            $.each(this._headerCells, function () {
                $(this.element).remove();
            });
        }
        datagridHeight = self._getHeight();
        this._headerCells = [];
        $.each(this.options.columns, function(i, column){
            var cellElement, th, index, cellHeight, cell;
            cellElement = $("<div class='ui-datagrid-header-cell'></div>");
            if(column.sortDirection === "desc"){
                cellElement.append("<span class='ui-datagrid-header-sort-icon'>▼</span>");
            }
            else if(column.sortDirection === "asc"){
                cellElement.append("<span class='ui-datagrid-header-sort-icon'>▲</span>");
            }
            cellElement.append("<span class='ui-datagrid-header-title'>" + column.title + "</span>");
            th = $("<th></th>").append(cellElement);
            self._header.find("tr").append(th);
            index = self._header.find("th").index(th);
            cellHeight = cellElement.outerHeight();
            cellElement.resizable({
                handles: "e",
                helper: "ui-datagrid-resize-helper",
                resize: function (event, ui) {
                    ui.helper.css("height", datagridHeight);
                },
                start: function(){
                    datagridHeight = self._getHeight();
                },
                stop: function(event, ui){
                    ui.originalElement.css("height", "auto");
                    self._header.find("colgroup").find("col").eq(index).css("width", ui.size.width);
                    self._body.find("colgroup").find("col").eq(index).css("width", ui.size.width);
                    cellElement.css("width", ui.size.width);
                    
                }
            });
            cell = {element: th, column: column};
            self._headerCells.push(cell);
            cellElement.click(function(){
                if(self.options.canSort && column.orderBy){
                    self._sortBy(cell, self._toggleDirection(column.sortDirection));
                }
            });
        });
    },
    _toggleDirection: function(direction){
        if(direction === "desc"){
            return "asc";
        }else{
            return "desc";
        }
    },
    sortBy: function(columnName, direction){
        var cells, cell;
        cells = $.grep(this._headerCells, function(cell){
            return cell.column.name === columnName;
        });
        if(cells && cells.length){
            cell = cells[0];
            this._sortBy(cell, direction);
        }
    },
    _sortBy: function(cell, direction){
        this._header.find(".ui-datagrid-header-sort-icon").remove();
        cell.column.sortDirection = direction;
        if(direction === "desc"){
            cell.element.find(".ui-datagrid-header-cell").prepend("<span class='ui-datagrid-header-sort-icon'>▼</span>");
        }
        else if(direction === "asc"){
            cell.element.find(".ui-datagrid-header-cell").prepend("<span class='ui-datagrid-header-sort-icon'>▲</span>");
        }
        this._trigger("sort", null, {orderBy: cell.column.orderBy, descending: direction === "desc"});
    },
    refreshSize: function(){
        this._renderWidth();
        this._renderHeight();
    },
    _renderHeight: function(){
        var height = this._getHeight(), headerHeight;
        if(height){
            this.element.outerHeight(height);
            headerHeight = this._header.outerHeight();
            if(height >= headerHeight){
                this._body.outerHeight(height - headerHeight);
            }
        }
    },
    _getHeight: function () {
        var height;
        if(this.options.height === "auto"){
            height = $(window).height() - $(document.body).outerHeight() + this.element.outerHeight();
        }
        else if(this.options.height){
            height = this.options.height;
        }
        return height;
    },
    _renderWidth: function(){
        if(this.options.width){
            this._header.css("width", this.options.width);
            this._body.css("width", this.options.width);
            this._headerContent.css("width", this.options.width);
            var headerTableWidth = this._headerContent.find("table").width();
            if(this._headerContent.width() < headerTableWidth + 30){
                this._headerContent.width(headerTableWidth + 30);
            }
        }
        
        var colgroup = this._getColgroup();
        this._header.find("colgroup").remove();
        this._body.find("colgroup").remove();
        this._header.find("table").prepend(colgroup);
        this._body.find("table").prepend(colgroup);
    },
    _getColgroup: function(){
        var colsHtml = "", width, knownWidth = 0, usableWidth = 0;
        $.each(this.options.columns, function(i, column){
            if($.isNumeric(column.width)){
                knownWidth += column.width;
            }
            else if(!column.width){
                knownWidth += cloumnDefaultWidth;
            }
        });
        if(this.options.showNumberColumn){
            colsHtml += "<col style='width: 30px'>";
            knownWidth += 30;
        }
        if(!this.options.singleSelect){
            colsHtml += "<col style='width: 30px'>";
            knownWidth += 30;
        }
        var headerWidth = this._header.width();
        usableWidth = headerWidth - knownWidth - 30;
        if(usableWidth < 0){
            usableWidth = 80;
        }
        $.each(this.options.columns, function(i, column){
            if($.isNumeric(column.width)){
                width = column.width;
            }
            else if(/%$/.test(column.width)){
                width = Math.floor(parseInt(column.width) * 0.01 * usableWidth) - 1;
            }
            else{
                width = cloumnDefaultWidth;
            }
            colsHtml += "<col style='width: "+ width +"px'>";
        });
        return "<colgroup>"+ colsHtml +"</colgroup>";
    },
    _renderBody: function(){
        var self = this;
        $.each(this._rows, function(i, row){
            self.deleteRow(row);
        });
        this._rows = [];
        if(this.options.data && this.options.data.length){
            $.each(this.options.data, function(i, data){
                self._renderRow(data);
            });
        }
        this._renderFooter();
    },
    _getRowTemplate: function(){
        var tr = $("<tr></tr>");
        if(this.options.showNumberColumn){
            $("<td></td>").attr("column-name", "number").appendTo(tr);
        }
        if(!this.options.singleSelect){
            $("<td></td>").attr("column-name", "checkbox").appendTo(tr);
        }
        $.each(this.options.columns, function(i, column){
            $("<td></td>").attr("column-name", column.name).appendTo(tr);
        });
        return tr;
    },
    _renderFooter: function(){
        var footerCell, footerCellValue, td, colspan, column, tr, gridValue,
            thiz = this;
        if(this._footerElement){
            this._footerElement.remove();
        }
        gridValue = this.getValue();
        if(gridValue.length && this._footer && this._footer.length){
            tr = this._getRowTemplate();
            this._footerElement = $("<tfoot></tfoot>").append(tr).appendTo(this._bodyContent);
            $.each(this._footer, function(){
                footerCell = this;
                //cell value
                switch(footerCell.valueType){
                    case "sum":
                        column = thiz.options.columns.find(function(col){return col.name == footerCell.columnName;});
                        footerCellValue = gridValue.sum(function(value){return value[column.field];});
                        break;
                    case "fixed":
                        footerCellValue = footerCell.value;
                        break;
                }
                //colspan
                td = tr.find("td[column-name='"+footerCell.columnName+"']")
                    .text(footerCellValue);
                if(footerCell.colspan){
                    colspan = footerCell.colspan;
                    while(colspan > 1){
                        td.next().eq(0).remove();
                        colspan -= 1;
                    }
                    td.attr("colspan", footerCell.colspan);
                }
            });
        }
    },
    setFooter: function(footer){
        this._footer = footer;
        this._renderFooter();
    },
    _renderRow: function(data, index){
        var self = this, datarow;
        datarow = $("<tr></tr>");
        if(index >= 0 && this._rows.length > index){
            var insertDataRow = this._rows[index];
            insertDataRow.before(datarow);
            this._rows.splice(index, 0, datarow);
        }
        else{
            datarow.appendTo(this._bodyContent);
            this._rows.push(datarow);
        }
        
        datarow.datarow({
                columns: this.options.columns,
                showNumberCell: this.options.showNumberColumn,
                showCheckboxCell: !this.options.singleSelect,
                data: data
            })
            .bind("datarowselected", function(evt, row){self._onDatarow_selected(row);})
            .bind("datarowunselected", function(evt, row){self._onDatarow_unselected(row);})
            .bind("datarowchanged", function(){self._changed();})
            .click(function(){self._onDatarow_click($(this));})
            .dblclick(function(){self._onDatarow_dblclick($(this));});
        this._refreshNumberRow();
        return datarow;
    },
    appendRow: function(data){
        var datarow = this._renderRow(data);
        this._trigger("addedRow", null, {row: datarow, data: data});
        this._changed();
        return datarow;
    },
    prependRow: function(data){
        var datarow = this._renderRow(data, 0);
        this._trigger("addedRow", null, {row: datarow, data: data});
        this._changed();
        return datarow;
    },
    afterRow: function(data, datarow1){
        var self = this, datarow;
        datarow = $("<tr></tr>");
        datarow1.after(datarow);
        datarow.datarow({
            columns: this.options.columns,
            showNumberCell: this.options.showNumberColumn,
            showCheckboxCell: !this.options.singleSelect,
            data: data
        })
        .bind("datarowselected", function(evt, row){self._onDatarow_selected(row);})
        .bind("datarowunselected", function(evt, row){self._onDatarow_unselected(row);})
        .bind("datarowchanged", function(){self._changed();})
        .click(function(){self._onDatarow_click($(this));})
        .dblclick(function(){self._onDatarow_dblclick($(this));});

        this._rows.push(datarow);
        this._refreshNumberRow();
        this._trigger("addedRow", null, {row: datarow, data: data});
        this._changed();
        return datarow;
    },
    _onChanging: function(){
        this._renderFooter();
    },
    _onDatarow_selected: function(row){
        if(this._bodyContent.find(".active").length === this._rows.length){
            this._header.find(".ui-datagrid-header-checkbox-cell input").attr("checked", "checked");
        }
        this._trigger("selectedRow", null, row);
    },
    _onDatarow_unselected: function(row){
        this._header.find(".ui-datagrid-header-checkbox-cell input").removeAttr("checked");
        this._trigger("unselectedRow", null, row);
    },
    _onDatarow_click: function(clickRow){
        $.each(this._rows, function(i, row){
            if(!row.is(clickRow)){
                row.datarow("unselect");
            }
        });
    },
    _onDatarow_dblclick: function(row){
        this._trigger("dblclickRow", null, row);
    },
    _onHeaderCheckboxCell_click: function(cell){
        if(cell.find("input").prop("checked")){
            this.selectAllRow();
        }
        else{
            this.unselectAllRow();
        }
    },
    selectAllRow: function(){
        $.each(this._rows, function(i, row){
            row.datarow("select");
        });
    },
    unselectAllRow: function(){
        $.each(this._rows, function(i, row){
            row.datarow("unselect");
        });
    },
    _refreshNumberRow: function(){
        if(this.options.showNumberColumn){
            var numberRows = this._bodyContent.find("tr td:first-child"), i = 0;
            for(; i < numberRows.length; i++){
                numberRows.eq(i).text(i + 1);
            }
        }
    },
    getRows: function(){
        return this._rows;
    },
    getRowsData: function(){
        return $.map(this._rows, function(row){
            return row.datarow("getValue");
        });
    },
    deleteSelectedRows: function(){
        var self = this, selectRows;
        selectRows = this.getSelectedRows();
        $.each(selectRows, function(i, row){
            self.deleteRow(row);
        });
        this._changed();
    },
    getSelectedRows: function(){
        var selectRows = $.grep(this._rows, function(row){
            return row.datarow("isSelected");
        });
        return selectRows;
    },
    getSelectedRow: function(){
        var selectRows = this.getSelectedRows();
        if(selectRows && selectRows.length){
            return selectRows[0];
        }
        return null;
    },
    deleteRow: function(deletedRow){
        if(typeof deletedRow === "number"){
            deletedRow = this._rows[deletedRow];
        }
        if(!deletedRow){
            return;
        }
        var self = this, rows = [], data;
        $.each(this._rows, function(i, row){
            if(row !== deletedRow){
                rows.push(row);
            }else{
                data = row.datarow("getValue");
                row.remove();
                self._trigger("deletedRow", null, data);
            }
        });
        this._rows = rows;
        this._header.find(".ui-datagrid-header-checkbox-cell input").removeAttr("checked");
        this._refreshNumberRow();
    },
    setValue: function(value){
        this.options.data = value;
        this._renderBody();
    },
    getValue: function(){
        return this.getRowsData();
    },
    setReadonly: function(readonly){
        this._readonly = readonly;
    },
    getSelectedValue: function(mapper){
        var selectedRows = this.getSelectedRows(), selectedValue = [], rowValue;
        if(selectedRows && selectedRows.length){
            $.each(selectedRows, function(i, row){
                rowValue = row.datarow("getValue");
                selectedValue.push(rowValue);
            });
        }
        if(mapper && selectedValue){
            return $.map(selectedValue, mapper);
        }
        return selectedValue;
    },
    setColumns: function(columns){
        this.options.columns = columns;
        this._renderHeaderCells();
        this.refreshSize();
        this._renderBody();
    },
    setSize: function(size){
        if(size.width){
            this.options.width = size.width;
            this._renderWidth();
        }
        if(size.height){
            this.options.height = size.height;
            this._renderHeight();
        }
    }
});

    $.widget( "webui.datarow",{
        _cells: null,
        _selected: null,
        options: {
            columns: null,
            showNumberCell: null,
            showCheckboxCell: null,
            data: null
        },
        _create: function() {
            var self = this;
            this._value = this.options.data;
            this._cells = [];
            this._selected = false;
            this.element
                .click(function(){
                    if(self._selected){
                        self.unselect();
                    }
                    else{
                        self.select();
                    }
                });
        
            this._render();
        },
        _render: function(){
            this.element.empty();
            this._renderNumberCell();
            this._renderCheckboxCell();
            this._renderDataCells();
        },
        _renderDataCells: function(){
            var self = this, data = this.options.data, cell, td;
            this._cells = [];
            $.each(this.options.columns, function(i, column){
                cell = {};
                cell.column = column;
                td = $("<td class='ui-datagrid-cell'></td>");
                self.element.append(td);
                cell.element = td;
                self._renderCell(cell, data);
                self._cells.push(cell);
            });
        },
        _renderNumberCell: function(){
            if(this.options.showNumberCell){
                var td = $("<td class='ui-datagrid-numbercell'></td>");
                this.element.append(td);
            }
        },
        _renderCheckboxCell: function(){
            var self = this, td;
            if(this.options.showCheckboxCell){
                td = $("<td class='ui-datagrid-checkbox-cell'><input type='checkbox'/></td>");
                td.click(function(ev){
                    if(!$(ev.target).is("input")){
                        if($(this).find("input").attr("checked") === "checked"){
                            $(this).find("input").removeAttr("checked");
                        }
                        else{
                            $(this).find("input").attr("checked", "checked");
                        }
                    }
                    self._onCheckboxCell_click($(this), self.element);
                    ev.stopPropagation();
                });
                self.element.append(td);
            }
        },
        _renderCell: function(td, data){
            var self = this, cell = td.element, column = td.column, fieldValue = null, renderValue;
            cell.empty();
            if(column.field in data){
                fieldValue = data[column.field];
            }
            if(typeof(column.render) === "string"){
                renderValue = dagaridRenders[column.render](fieldValue, this, cell, column);
                if(typeof renderValue === "string"){
                    cell.html(renderValue);
                }
                else if(typeof renderValue === "object"){
                    cell.append(renderValue);
                }
            }
            else if(column.render){
                if(fieldValue){
                    renderValue = column.render(self.element, {data: data, value: fieldValue} );
                    if(typeof renderValue === "string"){
                        cell.html(renderValue);
                    }
                    else if(typeof renderValue === "object"){
                        cell.append(renderValue);
                    }
                }
            }
            else if(column.field){
                if(fieldValue !== null){
                    if($.isArray(fieldValue)){
                        fieldValue = fieldValue.toString();
                    }
                    cell.html(fieldValue).attr("title", fieldValue);
                }
            }
        },
        _onCheckboxCell_click: function(sender){
            if(sender.find("input").attr("checked") === "checked"){
                this.select();
            }
            else{
                this.unselect();
            }
        },
        select: function(){
            if(this.options.showCheckboxCell){
                this.element.find(".ui-datagrid-checkbox-cell input").prop("checked", true);
            }
            this.element.addClass("active");
            this._selected = true;
            this._trigger("selected", null, this.element);
        },
        unselect: function(){
            this.element.removeClass("active")
                .find(".ui-datagrid-checkbox-cell input")
                .prop("checked", false);
            this._selected = false;
            this._trigger("unselected", null, this.element);
        },
        setValue: function(value){
            var self = this;
            $.each(this._cells, function(i, cell){
                self._renderCell(cell, value);
            });
            this._value = value;
            this._trigger("changed", null, this.element);
        },
        getValue: function(){
            return this._value;
        },
        isSelected: function(){
            return this._selected;
        }
    });
}( jQuery ) );

//兼容保留方法
(function($){
    $.extend($.webui.datagrid.prototype, {
        updateRow: function(index, data){
            if(this._rows[index]){
                this._rows[index].datarow("setValue", data);
                this._trigger("updatedRow", null, {row: this._rows[index], data: data});
            }
        },
        selectRow: function(index){
            if(this._rows[index]){
                this._rows[index].datarow("select");
            }
        },
        unselectRow: function(index){
            if(this._rows[index]){
                this._rows[index].datarow("unselect");
            }
        },
        _setOption: function(key, value){
            var self = this;
            $.Widget.prototype._setOption.apply(self, arguments);
            switch(key){
                case "width": this._renderWidth();break;
                case "height": this._renderHeight();break;
                case "showNumberColumn":
                    this._renderHeaderNumberCell();
                    $.each(this._rows, function(i, row){
                        row.datarow("option", "showNumberCell", value);
                    });
                    break;
                case "singleSelect":
                    this._renderHeaderCheckboxCell();
                    $.each(this._rows, function(i, row){
                        row.datarow("option", "showCheckboxCell", !value);
                    });
                    break;
                case "data": this.setValue(value);break;
                case "columns": this.setColumns(value);break;
            }
        }
    });
    $.extend($.webui.datarow.prototype, {
        _setOption: function(key, value){
            var self = this;
            $.Widget.prototype._setOption.apply(self, arguments);
            switch(key){
                case "data":this.setValue(value);break;
                case "showNumberCell": this._renderNumberCell();break;
                case "showCheckboxCell": this._renderCheckboxCell();break;
            }
        }
    });
}(jQuery));
(function($){
    $.widget("webui.simpleSelect", $.webui.selectInput, {
        _onCreated: function(){
                var thiz = this;
                this._emptyMessage = this.options.emptyMessage || this.element.data("emptyMessage") || "";
                this._isObjectSelect = this.options.isObjectSelect || this.element.data("isObjectSelect") || false;
                thiz._refreshValue();
                this.element.change(function () {
                    thiz._refreshValue();
                });
                this._load();
            },
            _refreshValue: function(){
                var value = this.element.val();
                this._value = this._getValue(value);
            },
            _setValue: function (value) {
                if (this._isObjectSelect) {
                    value = this._getItemValue(value);
                    this._setElementValue(value);
                }
                else {
                    this._setElementValue(value);
                }
            },
            _setElementValue: function (value) {
                var text = this._getText(value);
                this.element.val(value);
                this._refreshValue();
                this._textElement.html(text);
            },
            getValue: function () {
                if (this._value) {
                    return this._value;
                }
                return null;
            },
            _getValue: function (value) {
                if (this._isObjectSelect) {
                    return this._findItemByValue(value);
                }
                else {
                    value = jQuery.trim(value);
                    if (value) {
                        return value;
                    }
                    return null;
                }
            },
            _getGroupElement: function(text){
                return $.format("<optgroup label='{0}'></optgroup>", text);
            },
            _getSelectElement: function(value, text){
                return $.format("<option value='{0}'>{1}</option>", value, text);
            },
            _sourceChanged: function () {
                //add empty option
                var element = this._getSelectElement("", this._emptyMessage);
                this.element.prepend(element);
            }
        }
    );
})(jQuery);
(function($){
    $.widget("webui.complexSelect", $.webui.input, {
            options: {
                required: null,
                name: null,
                source: null,
                single: false,
                textField: null
            },
            _onCreated: function(){
                var thiz = this;
                this._single = this.options.single || this.element.data("single");
                this._source = this.options.source || this.element.data("source") || [];
                this._textField = this.options.textField || this.element.data("textField") || "text";

                this._dropdownMenu = $("<ul style='max-height: 300px;overflow: auto; left: 0; top: 0; z-index: 10000;' class='dropdown-menu' >")
                    .appendTo("body");

                var virtualInput = this._virtualInput = $("<input class='webui-virtual-input'/>");
                this.element.append(virtualInput);
                
                var dropdownTimeout;
                virtualInput.keyup(function(e){
                    if(e.keyCode === $.ui.keyCode.ENTER){
                        return;
                    }
                    var val = virtualInput.val();
                    var width = (val.length * 1) + 2;
                    $(this).width(width.toString() + "em");

                    if(dropdownTimeout){
                        clearTimeout(dropdownTimeout);
                        dropdownTimeout = null;
                    }

                    dropdownTimeout = setTimeout(function(){
                        thiz._renderDropdownMenu(function(){
                            thiz._showDropdownMenu();
                        });
                    }, 300);
                });

                this._bindEvent();
            },
            _bindEvent: function(){
                var thiz = this;
                this.element.click(function(e){
                    thiz._virtualInput.focus();
                    thiz._renderDropdownMenu(function(){
                        thiz._showDropdownMenu();
                    });
                    thiz._showing = true;
                });
                
                $("html").click(function(){
                    if(thiz._showing !== true){
                        thiz._hideDropdownMenu();
                    }
                    thiz._showing = false;
                });

                this._dropdownMenu.click(function(e){
                    e.stopPropagation();
                });
            },
            focus: function(){
                this._virtualInput.focus();
            },
            _showDropdownMenu: function(){
                var elementOuterWidth = this.element.outerWidth();
                this._dropdownMenu.outerWidth(elementOuterWidth);
                var elementOuterHeight = this.element.outerHeight();
                var elementOffset = this.element.offset();
                var elementTop = elementOffset.top;
                var elementBottom = elementOffset.top + elementOuterHeight;
                var menuOuterHeigth = this._dropdownMenu.outerHeight();
                var windowHeight = $(window).height();
                if((windowHeight - elementBottom - menuOuterHeigth) < 0){
                    this._dropdownMenu.css({top: elementTop - menuOuterHeigth, left: elementOffset.left, display: "block"});
                }
                else{
                    this._dropdownMenu.css({top: elementBottom, left: elementOffset.left, display: "block"});
                }
            },
            _hideDropdownMenu: function(){
                this._dropdownMenu.hide();
            },
            _renderDropdownMenu: function(renderedCallback){
                var thiz = this;
                this._getSource($.trim(thiz._virtualInput.val()), function(source){
                    thiz._dropdownMenu.empty();
                    $.each(source, function(i, item){
                        var menuContent = "<span style='font-weight:bold'>" +thiz._getTagText(item) + "</span>";
                        if(this.icon){
                            menuContent = "<span class='"+this.icon+"'></span>" + menuContent;
                        }
                        if(this.summary){
                            menuContent += "<div>" + this.summary + "</div>";
                        }
                        var menu = $("<li><a style='white-space: normal' tabindex='-1' href='#'>"+menuContent+"</a></li>")
                            .data("item", this)
                            .click(function(){
                                thiz.appendTag(item);
                                thiz._virtualInput.val("").width("3em").focus();
                                thiz._hideDropdownMenu();
                                return false;
                            });
                        thiz._dropdownMenu.append(menu);
                    });
                    if(renderedCallback){
                        renderedCallback();
                    }
                });
            },
            _getSource: function(keyword, callback){
                var thiz = this;
                if(!keyword){
                    keyword = "";
                }
                keyword = keyword.toLowerCase();

                if($.isString(this._source)){
                    try{
                        this._source = eval(this._source);
                    }
                    catch(e){
                    
                    }
                }

                if($.isArray(this._source)){
                    var source = $.grep(this._source, function(item){
                        var text = thiz._getTagText(item);
                        return text.toLowerCase().indexOf(keyword) > -1;
                    });
                    callback(source);
                }
                else if($.isString(this._source)){
                    $.getJSON(this._source, {keyword: keyword, t: $.now()}, function(data){
                        callback(data);
                    });
                }
            },
            setSource: function(source){
                this._source = source;
            },
            appendTag: function(item){
                this._appendTag(item);
                this._changed();
            },
            _appendTag: function(item){
                var thiz = this;
                if(this._single){
                    this.element.find(".webui-tag").remove();
                }
                var tagHtml = 
                    "<div tabindex='-1' class='webui-tag'>"+
                        "<button tabindex='-1' type='button' class='close'>&times;</button>"+
                        "<span class='webui-tag-label'></span>"+
                    "</div>";
                var tag = $(tagHtml).data("item", item).click(function(){return false;});
                tag.find(".webui-tag-label").text(this._getTagText(item));
                tag.find(".close").click(function(e){
                    tag.remove();
                    thiz._changed();
                    e.stopPropagation();
                });
                this._virtualInput.before(tag);
            },
            clearTag: function(){
                var tagsCount = this._clearTag();
                if(tagsCount){
                    this._changed();
                }
            },
            _clearTag: function(){
                var tagsCount = this.element.find(".webui-tag").length;
                this.element.find(".webui-tag").remove();
                return tagsCount;
            },
            getValue: function(){
                var values = [];
                this.element.find(".webui-tag").each(function(){
                    var item = $(this).data("item");
                    values.push(item);
                });
                if(!values.length){
                    return null;
                }
                if(this._single){
                    return values[0];
                }
                return values;
            },
            setValue: function(value){
                var thiz = this;
                this._clearTag();
                var text = "";
                if($.isArray(value)){
                    var texts = [];
                    $.each(value, function(i, item){
                        thiz._appendTag(item);
                        texts.push(thiz._getTagText(item));
                    });
                    text = texts.toString();
                }
                else if(value){
                    thiz._appendTag(value);
                    text = thiz._getTagText(value);
                }
                this._textElement.text(text);
            },
            _getTagText: function(item){
                if(typeof(item) === "object"){
                    return item[this._textField];
                }
                return item;
            }
        }
    );
})(jQuery);
(function($){
    $.widget("webui.boolRadio", $.webui.input, {
            _onCreated: function(){
                var thiz = this;
                this._trueText = this.options.trueText || this.element.data("trueText") || "是";
                this._falseText = this.options.falseText || this.element.data("falseText") || "否";
                this._trueRadio = $('<label class="radio-inline"><input type="radio"/> ' + this._trueText + '</label>')
                    .appendTo(this.element)
                    .find("input");
                this._falseRadio = $('<label class="radio-inline"><input type="radio"/> ' + this._falseText + '</label>')
                    .appendTo(this.element)
                    .find("input");
                this.element.find("input")
                    .attr("name", this._name)
                    .click(function(){
                        thiz._changed();
                    });
            },
            getValue: function(){
                if(this._trueRadio.prop("checked")){
                    return true;
                }
                if(this._falseRadio.prop("checked")){
                    return false;
                }
                return null;
            },
            setValue: function(value){
                var text = "";
                if(value === true){
                    this._trueRadio.prop("checked", true);
                    text = this._trueText;
                }
                else if(value === false){
                    this._falseRadio.prop("checked", true);
                    text = this._falseText;
                }
                this._textElement.html(text);
            }
        }
    );
})(jQuery);
(function($){
    $.widget("webui.boolCheckbox", $.webui.input, {
            _onCreated: function(){
                var thiz = this;
                this.element.click(function(){
                    thiz._changed();
                });
            },
            getValue: function(){
                return this.element.prop("checked");
            },
            setValue: function(value){
                this.element.prop("checked", value);
            },
            setReadonly: function(readonly){
                this._readonly = readonly;
                this.element.prop("disabled", readonly);
            }
        }
    );
})(jQuery);
(function($){
    $.widget("webui.popoverTrigger", {
            options: {
                placement: "bottom",
                popover: null
            },
            _create: function(){
                var thiz = this;
                
                this._popover = this.options.popover;

                this.element.click(function(){
                    thiz.toggle();
                    return false;
                });
            },
            show: function(){
                var my, at; 
                var placement = this.options.placement;
                if(placement == 'bottom'){
                    my = "top";
                    at = "bottom";
                }
                else if(placement == 'top'){
                    my = "bottom";
                    at = "top";
                }
                else if(placement == 'left'){
                    my = "right";
                    at = "left";
                }
                else{
                    my = "left";
                    at = "right";
                }
                this._popover.show().position({my: my, at: at, of: this.element});
            },
            hide: function(){
                this._popover.hide();
            },
            toggle: function(){
                if(this._popover.is( ":hidden" )){
                    this.show();
                }
                else{
                    this.hide();
                }
            }
        }
    );
})(jQuery);
(function($){
    $.widget("ui.messageBox", {
        options: {
            
        },
        _create: function () {
            var thiz = this;
            var template =
             '<div class="modal">'+
                '<div class="modal-dialog" style="width: 400px; margin: 200px auto;">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+
                            '<h4 class="modal-title">提示</h4>'+
                        '</div>'+
                        '<div class="modal-body">'+
                            '<span class="glyphicon" style="vertical-align:middle; font-size:34px;"></span>'+
                            '<span class="message-box-content" style="display: inline-block; margin-left: 2em;">sdfsdfsd</span>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<input type="button" class="btn btn-ok btn-default" data-dismiss="modal" value="确定" />'+
                            '<input type="button" class="btn btn-cancel btn-default" data-dismiss="modal" value="取消" />'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
            var $template = $(template);
            this._messageContent = $template.find(".message-box-content");
            this._messageIcon = $template.find(".glyphicon");
            this._btnOk = $template.find(".btn-ok").click(function(){
                if(thiz._okCallback){
                    var callback = thiz._okCallback;
                    thiz._okCallback = null;
                    callback();
                }
            });
            this._btnCancel = $template.find(".btn-cancel").click(function(){
                if(thiz._cancelCallback){
                    var callback = thiz._cancelCallback;
                    thiz._cancelCallback = null;
                    callback();
                }
            });
            this._modal = $template.modal({ show: false, backdrop: "static" }).appendTo("body").data("bs.modal");
            $("body").append(template);
        },
        info: function(msg, callback){
            this._okCallback = callback;
            this._modal.show();
            this._btnOk.focus();
            this._messageContent.text(msg);
            this._btnCancel.hide();
            this._messageIcon.attr("class", "").addClass("glyphicon glyphicon-info-sign text-primary");
        },
        warning: function(msg, callback){
            this._okCallback = callback;
            this._modal.show();
            this._btnOk.focus();
            this._messageContent.text(msg);
            this._btnCancel.hide();
            this._messageIcon.attr("class", "").addClass("glyphicon glyphicon-info-sign text-warning");
        },
        confirm: function(msg, okCallback, cancelCallback){
            this._okCallback = okCallback;
            this._cancelCallback = cancelCallback;
            this._modal.show();
            this._btnOk.focus();
            this._messageContent.text(msg);
            this._btnCancel.show();
            this._messageIcon.attr("class", "").addClass("glyphicon glyphicon-question-sign text-primary");
        },
        success: function(msg, callback){
            this._okCallback = callback;
            this._modal.show();
            this._btnOk.focus();
            this._messageContent.text(msg);
            this._btnCancel.hide();
            this._messageIcon.attr("class", "").addClass("glyphicon glyphicon-ok-sign text-success");
        },
        error: function(msg, callback){
            this._okCallback = callback;
            this._modal.show();
            this._btnOk.focus();
            this._messageContent.text(msg);
            this._btnCancel.hide();
            this._messageIcon.attr("class", "").addClass("glyphicon glyphicon-remove-sign text-error");
        }
    });
})(jQuery); 

//$(function(){
//    $.messageBox = $("body").messageBox().data("messageBox");
//});
(function($){
    var template = 
        '<ul class="webui-pagination-nav" >' +
            '<li class="webui-pagination-first"><a href="#"><span title="第一页" class="glyphicon glyphicon-step-backward"></span></a></li>' +
            '<li class="webui-pagination-previous"><a href="#"><span title="上一页" class="glyphicon glyphicon-backward"></span></a></li>' +
        '</ul>' +
        '<ul class="webui-pagination-nav webui-pagination-number" style="margin-left: 10px;"></ul>' +
        '<div class="webui-pagination-input"><input class="form-control webui-pagination-page-index"/><span class="webui-pagination-page-count"></span></div>' +
        '<ul class="webui-pagination-nav" >' +
            '<li class="webui-pagination-next"><a href="#"><span title="下一页" class="glyphicon glyphicon-forward"></span></a></li>' +
            '<li class="webui-pagination-last"><a href="#"><span title="最后一页" class="glyphicon glyphicon-step-forward"></span></a></li>' +
        '</ul>' +
        '<div class="webui-pagination-input" ><select class="form-control webui-pagination-page-size" style="width: 80px;"></select></div>' +
        '<div class="webui-pagination-summary"></div>';
    $.widget("webui.pagination", {
            options: {
                start: 0, 
                count: 1,
                visiblePages: 10,
                showPageNumber: true,
                sizeOptions: [20, 50, 100],
                size: 20
            },
            _create: function(){
                this._start = this.options.start;
                this._count = this.options.count;
                this._sizeOptions = this.options.sizeOptions;
                this._size = this.options.size;
                this._showPageNumber = this.options.showPageNumber;
                this._visiblePages = this.options.visiblePages;

                this.element.addClass("webui-pagination clearfix").append(template);
                this._lnkFirst = this.element.find(".webui-pagination-first");
                this._lnkPrevious = this.element.find(".webui-pagination-previous");
                this._lnkNext = this.element.find(".webui-pagination-next");
                this._lnkLast = this.element.find(".webui-pagination-last");
                this._txtPageIndex = this.element.find(".webui-pagination-page-index");
                this._txtPageSize = this.element.find(".webui-pagination-page-size");
                this._paginationNumber = this.element.find(".webui-pagination-number");
                this._lblPageCount = this.element.find(".webui-pagination-page-count");
                this._lblSummary = this.element.find(".webui-pagination-summary");
                this._init();
                this._render();
                this._bindEvent();
            },
            _init: function(){
                this._renderSizeOptions();
            },
            _bindEvent: function(){
                var thiz = this;
                this._lnkFirst.click(function(){
                    thiz._change(1);
                    return false;
                });
                this._lnkPrevious.click(function(){
                    thiz._change(thiz._pageIndex - 1);
                    return false;
                });
                this._lnkNext.click(function(){
                    thiz._change(thiz._pageIndex + 1);
                    return false;
                });
                this._lnkLast.click(function(){
                    thiz._change(thiz._pageCount);
                    return false;
                });
                this._txtPageIndex.keyup(function(event){
                    if(event.which == 13){
                        var index = parseInt($(this).val());
                        thiz._change(index);
                    }
                });
                this._txtPageSize.change(function(){
                    thiz._calculate();
                    thiz._change(thiz._pageIndex);
                });
            },
            _change: function(pageIndex){
                if(!pageIndex){
                    pageIndex = 1;
                }
                var start = (pageIndex - 1) * this._size;
                if(start < 0){
                    start = 0;
                }
                if(start >= this._count){
                    start = (this._pageCount - 1) * this._size;
                }
                this._trigger("change", null, {start: start, size: this._size});
            },
            _render: function(){
                this._calculate();
                this._renderSummary();
                this._renderPageIndex();
                this._renderPageCount();
                this._renderNavigation();
                this._renderPagiationNumber();
            },
            _renderSummary: function(){
                var _end = this._start + this._size;
                if(this._count < _end){
                    _end = this._count;
                }
                var _start = this._start + 1;
                if(this._count <= 0){
                    _start = 0;
                }
                this._lblSummary.text($.format("{0} - {1} / {2}", _start, _end, this._count));
            },
            _renderPageIndex: function(){
                this._txtPageIndex.val(this._pageIndex);
            },
            _renderPageCount: function(){
                this._lblPageCount.text(" / " + this._pageCount);
            },
            _renderNavigation: function(){
                if(this._pageIndex <= 1){
                    this._lnkPrevious.addClass("disabled");
                    this._lnkFirst.addClass("disabled");
                }
                else{
                    this._lnkPrevious.removeClass("disabled");
                    this._lnkFirst.removeClass("disabled");
                }

                if(this._pageIndex >= this._pageCount){
                    this._lnkNext.addClass("disabled");
                    this._lnkLast.addClass("disabled");
                }
                else{
                    this._lnkNext.removeClass("disabled");
                    this._lnkLast.removeClass("disabled");
                }
            },
            _renderPagiationNumber: function(){
                if(!this._showPageNumber){
                    return;
                }
                this._paginationNumber.empty();
                var thiz = this, i = 0,
                    halfVisiblePages = Math.floor(this._visiblePages / 2);
                //所有页码大于显示页码
                if(this._pageCount > this._visiblePages){
                    if(this._pageIndex >= (this._pageCount - halfVisiblePages)){
                        i = this._pageCount - this._visiblePages;
                    }
                    else if(this._pageIndex > halfVisiblePages){
                        i = this._pageIndex - halfVisiblePages;
                    }
                }
                
                var visiblePages = i + this._visiblePages;
                for(; i < visiblePages && i < thiz._pageCount; i++){
                    this._appendNumberLink(i + 1);
                }
            },
            _renderSizeOptions: function(){
                if(this._sizeOptions){
                    var optionsHtml = "";
                    $.each(this._sizeOptions, function(i, size){
                        optionsHtml += $.format("<option>{0}</option>", size);
                    });
                    this._txtPageSize.html(optionsHtml);
                }
                this._txtPageSize.val(this._size);
            },
            _appendNumberLink: function(pageIndex){
                var thiz = this;
                var numberLink = $($.format('<li><a href="#">{0}</a></li>', pageIndex)).appendTo(this._paginationNumber);
                if(this._pageIndex == pageIndex){
                    numberLink.addClass("active");
                }
                numberLink.click(function(){
                    thiz._change(pageIndex);
                    return false;
                });
            },
            _calculate: function(){
                this._calculatePageSize();
                this._calculatePageIndex();
                this._calculatePageCount();
            },
            _calculatePageSize: function(){
                var size = parseInt(this._txtPageSize.val());
                if(!size){
                    size = this._sizeOptions[0];
                }
                this._size = size;
            },
            _calculatePageCount: function(){
                if(this._size <= 0){
                    return 0;
                }
                var pageCount = parseInt(this._count / this._size);
                if((this._count % this._size) > 0){
                    pageCount = pageCount + 1;
                }
                this._pageCount = pageCount;
            },
            _calculatePageIndex: function(){
                this._pageIndex = parseInt(this._start / this._size) + 1;
            },
            setPageInfo: function(pageInfo){
                this._start = pageInfo.start;
                this._count = pageInfo.count;

                this._render();
            },
            getPageSize: function(){
                return this._size;
            }
        }
    );
})(jQuery);
(function($){
    $.widget("webui.label", $.webui.input, {
            options: {

            },
            _create: function(){
                var thiz = this;
                this._initOptions();
            },
            reset: function(){
                this.setValue("");
            },
            changed: function(callback){
                
            },
            inputing: function(callback, delay){
                
            },
            getName: function(){
                return this._name;
            },
            setError: function(error){
                
            },
            popMessage: function(message){
                
            },
            hidePopMessage: function(){
                
            },
            validate: function(){
                return true;
            },
            focus: function(){
                
            },
            setDefaultValue: function(value){
                
            },
            getDefaultValue: function(){
                return "";
            },
            setValue: function(value){
                var text = this._getText(value);
                this.element.html(text);
                this._value = value;
            },
            getValue: function(){
                return this._value;
            },
            setRequired: function(required){
                this._required = required;
            },
            getRequired: function(){
                return this._required;
            },
            setReadonly: function(readonly){
                this._readonly = readonly;
            },
            getReadonly: function(){
                return this._readonly;
            }
        }
    );
})(jQuery);
(function($){
    $.widget("webui.formModal", {
            options: {
                
            },
            _create: function(){
                var thiz = this;
                this._modal = this.element.modal({ show: false, backdrop: "static" }).data("bs.modal");
                this._form = this.element.find("form").form().data("form");
                this.element.find(".btnOkAndContinue").click(function(){
                    if(thiz._form.validate()){
                        var value = thiz._form.getValue();
                        thiz._callback(value);
                        thiz._form.reset();
                    }
                    return false;
                });
                this.element.find(".btnOk").click(function(){
                    if(thiz._form.validate()){
                        var value = thiz._form.getValue();
                        thiz._callback(value);
                        thiz._form.reset();
                        thiz._modal.hide();
                    }
                    return false;
                });
                this._onCreated();
            },
            _onCreated: function(){
            
            },
            show: function(callback, value){
                var thiz = this;
                this._modal.show();
                setTimeout(function(){
                    thiz.element.horizontalForm();
                }, 500);
                this._callback = callback;
                if(value){
                    this.setValue(value);
                }
            },
            setValue: function(value){
                this._form.setValue(value);
                this._onSettedValue(value);
            },
            setDefaultValue: function(value){
                this._form.setDefaultValue(value);
                this._onSettedValue(value);
            },
            reset: function(){
                this._form.reset();
            },
            _onSettedValue: function(value){
                   
            }
        }
    );
})(jQuery);
(function($){
    $.widget("webui.dateTimeInput", $.webui.input, {
            options: {
                required: false,
                name: null,
                defaultValue: null,
                defaultTime: "08:00"
            },
            _onCreated: function(){
                var thiz = this;
                this._defaultTime = this.element.data("defaultTime") || this.options.defaultTime;
                this.element.datepicker({
                    onSelect: function(date){
                        thiz.setValue(date + " " + thiz._defaultTime);
                        thiz._changed();
                    }
                }).
                inputing(function(){
                    thiz._changed();
                }, 0)
                .mask({pattern: "9999-99-99 99:99"});

                this._validator = function(input, value){
                    return $.isDateTimeString(thiz.element.val());
                };
            },
            getValue: function(){
                var value = this.element.val();
                if(value){
                    return $.toISODateTime(value);
                }
                return null;
            },
            setValue: function(value){
                var dateTimeFormat = $.formatDateTime(value);
                this.element.val(dateTimeFormat);
                this._textElement.html(dateTimeFormat);
            }
        }
    );
})(jQuery);
(function($){
    $.widget("webui.dateTimeRangeInput", $.webui.input, {
            _onCreated: function(){
                var thiz = this, inputs;
                inputs = this.element.find("input");
                this._startInput = inputs.eq(0).dateTimeInput().data("dateTimeInput");
                this._endInput = inputs.eq(1).dateTimeInput().data("dateTimeInput");
                this._startInput.changed(function(){
                    thiz._changed();
                });
                this._endInput.changed(function(){
                    thiz._changed();
                });
            },
            validate: function(){
                var value = this.getValue(), result = null;
                
                result = this._validateRequired(value);
                if(result && value){
                    result = this._startInput.validate() && this._endInput.validate();
                }
                if(result){
                    result = this._validateRange(value);
                }
                this.setError(!result);
                return result;
            },
            _validateRange: function(value){
                var result = true;
                if(value && value.start && value.end && new Date(value.start) > new Date(value.end)){
                    result = false;
                    this.popMessage("最小值不能大于最大值！");
                }
                else{
                    this.hidePopMessage();
                }
                return result;
            },
            focus: function(){
                this._startInput.focus();
            },
            getValue: function(){
                var start = this._startInput.getValue();
                var end = this._endInput.getValue();
                if(start || end){
                    return {start: start, end: end};
                }
                return null;
            },
            setValue: function(value){
                var start = null, end = null;
                if(value){
                    start = value.start;
                    end = value.end;
                }
                this._startInput.setValue(start);
                this._endInput.setValue(end);
                start = $.formatDateTime(start);
                end = $.formatDateTime(end);
                this._textElement.html(start + " 到 " + end);
            }
        }
    );
})(jQuery);
(function($){
    function __fileActionRender(data, actionRender){
        if(actionRender && (data.fileId > 0)){
            return actionRender(data);
        }
        else if(data.error){
            return data.error;
        }
        else if(data.scale){
            var progressHtml = '<div class="progress">' +
                  '<div class="progress-bar" role="progressbar" style="min-width: 2em; width: 2%;">' +
                  '</div>' +
                  '</div>';
            var scale = data.scale + "%";
            return $(progressHtml).find(".progress-bar").text(scale).width(scale);
        }
        else{
            return '<div class="progress progress-striped"><div class="progress-bar progress-bar-info" style="width: 100%"></div></div>';
        }
    }
    $.widget("webui.multiFileUpload", $.webui.input, {
            options: {
                required: false,
                name: null,
                actionRender: null,
                deleteUrl: null,
            },
            _onCreated: function(){
                var thiz = this;
                this._actionRender = this.options.actionRender || this.element.data("actionRender");
                this._deleteUrl = this.options.deleteUrl || this.element.data("deleteUrl");
                var innerHtml = 
                    "<div class='btn-group'>" + 
                        '<span class="btn btn-default webui-file-button btnAdd"><i class="icon-plus icon-white"></i><span>添加</span><input type="file" multiple data-sequential-uploads="true"/> </span>' +
                        "<button type='button' class='btn btn-default btnDelete'>删除</button>" +
                    "</div>" +
                    "<div class='datagrid'></div>";
                this.element.append(innerHtml);

                this._btnAdd = this.element.find(".btnAdd");
                this._btnDelete = this.element.find(".btnDelete").click(function(){
                    $.messageBox.confirm("确实要删除吗?", function(){
                        var rows = thiz._datagrid.getSelectedRows();
                        $.each(rows, function(){
                            var row = this;
                            var rowValue = row.datarow("getValue");
                            thiz._deleteFile(rowValue.fileId, function(){
                                thiz._datagrid.deleteRow(row);
                            });
                        });
                    });
                    
                });
                this._datagrid = this.element.find(".datagrid").datagrid({
                    columns: [
                        { title: "文件名", width: 250, field: "fileName" },
                        { title: "", width: 100, field: "fileName", render: function(datarow, args){return __fileActionRender(args.data, thiz._actionRender);}},
                    ],
                    singleSelect: false
                }).data("datagrid");

                this._initFileUpload();
            },
            _initFileUpload: function(){
                var thiz = this;
                var datarows = [];
                this.element.fileupload({
                    add: function (e, data) {
                        thiz._uploading = true;
                        var repeatNameFileIndexes = [];
                        $.each(data.files, function (index, file) {
                            if(thiz._containsFile(file.name)){
                                repeatNameFileIndexes.push(index);
                                $.messageBox.warning("已经包含了文件:" + file.name);
                            }
                            else{
                                var datarow = thiz._datagrid.appendRow({ fileName: file.name });
                                datarows.push(datarow.data("datarow"));
                            }
                        });
                        $.each(repeatNameFileIndexes, function(index, fileIndex){
                            data.files.splice(fileIndex, 1);
                        });
                        if(!data.files.length){
                            return;
                        }
                        var jqXHR = data.submit()
                            .success(function (result, textStatus, jqXHR) {
                                if(result.text){
                                    result = $.parseJSON(result.text());
                                }
                                else{
                                    result = $.parseJSON(result);
                                }
                                var datarow = datarows.shift();
                                var value = datarow.getValue();
                                if(result.result){
                                    value.fileId = result.fileId;
                                    datarow.setValue(value);
                                }
                                else{
                                    $.messageBox.error(value.message);
                                    thiz._datagrid.deleteRow(datarow);
                                }
                                if(datarows.length === 0){
                                    thiz._uploading = false;
                                }
                            })
                            .error(function (jqXHR, textStatus, errorThrown) {
                                $.messageBox.error(textStatus);
                                var datarow = datarows.shift();
                                thiz._datagrid.deleteRow(datarow);
                            });
                    },
                    progress: function(e, data){
                        var value = datarows[0].getValue();
                        value.scale = Math.floor((data.loaded / data.total) * 100) ;
                        datarows[0].setValue(value);
                    }
                });
            },
            _containsFile: function(fileName){
                var files = this._datagrid.getValue();
                var contains = false;
                $.each(files, function(index, file){
                    if(file.fileName == fileName){
                        contains = true;
                        return false;
                    }
                });
                return contains;
            },
            _deleteFile: function(fileId, cb){
                $.post(this._deleteUrl, { fileId: fileId }, function (model) {
                    cb();
                });
            },
            getValue: function(){
                var value = this._datagrid.getValue();
                return value;
            },
            setValue: function(value){
                this._datagrid.setValue(value);
            },
            getActionRender: function(){
                return this._actionRender;
            },
            setActionRender: function(value){
                this._actionRender = value;
            },
            setReadonly: function(readonly){
                if(readonly){
                    this._btnDelete.hide();
                    this._btnAdd.hide();
                }
                else{
                    this._btnDelete.show();
                    this._btnAdd.show();
                }
                this._datagrid.setReadonly(readonly);
            },
            validate: function(){
                var valid = this._datagrid.validate();
                if(valid){
                    if(this._uploading){
                        $.messageBox.info("正在上传文件.");
                        valid = false;
                    }
                }
                return valid;
            }
        }
    );
})(jQuery);

/*
 * jQuery Iframe Transport Plugin 1.3
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint unparam: true, nomen: true */
/*global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Helper variable to create unique names for the transport iframes:
    var counter = 0;

    // The iframe transport accepts three additional options:
    // options.fileInput: a jQuery collection of file input fields
    // options.paramName: the parameter name for the file form data,
    //  overrides the name property of the file input field(s)
    // options.formData: an array of objects with name and value properties,
    //  equivalent to the return data of .serializeArray(), e.g.:
    //  [{name: 'a', value: 1}, {name: 'b', value: 2}]
    $.ajaxTransport('iframe', function (options) {
        if (options.async && (options.type === 'POST' || options.type === 'GET')) {
            var form,
                iframe;
            return {
                send: function (_, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    // javascript:false as initial iframe src
                    // prevents warning popups on HTTPS in IE6.
                    // IE versions below IE8 cannot set the name property of
                    // elements that have already been added to the DOM,
                    // so we set the name along with the iframe HTML markup:
                    iframe = $(
                        '<iframe src="javascript:false;" name="iframe-transport-' +
                            (counter += 1) + '"></iframe>'
                    ).bind('load', function () {
                        var fileInputClones;
                        iframe
                            .unbind('load')
                            .bind('load', function () {
                                var response;
                                // Wrap in a try/catch block to catch exceptions thrown
                                // when trying to access cross-domain iframe contents:
                                try {
                                    response = iframe.contents();
                                    // Google Chrome and Firefox do not throw an
                                    // exception when calling iframe.contents() on
                                    // cross-domain requests, so we unify the response:
                                    if (!response.length || !response[0].firstChild) {
                                        throw new Error();
                                    }
                                } catch (e) {
                                    response = undefined;
                                }
                                // The complete callback returns the
                                // iframe content document as response object:
                                completeCallback(
                                    200,
                                    'success',
                                    {'iframe': response}
                                );
                                // Fix for IE endless progress bar activity bug
                                // (happens on form submits to iframe targets):
                                $('<iframe src="javascript:false;"></iframe>')
                                    .appendTo(form);
                                form.remove();
                            });
                        form
                            .prop('target', iframe.prop('name'))
                            .prop('action', options.url)
                            .prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>')
                                    .prop('name', field.name)
                                    .val(field.value)
                                    .appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length &&
                                options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            // Insert a clone for each file input field:
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function () {
                                    $(this).prop('name', options.paramName);
                                });
                            }
                            // Appending the file input fields to the hidden form
                            // removes them from their original location:
                            form
                                .append(options.fileInput)
                                .prop('enctype', 'multipart/form-data')
                                // enctype must be set as encoding for IE:
                                .prop('encoding', 'multipart/form-data');
                        }
                        form.submit();
                        // Insert the file input fields at their original location
                        // by replacing the clones with the originals:
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                $(input).prop('name', clone.prop('name'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo(document.body);
                },
                abort: function () {
                    if (iframe) {
                        // javascript:false as iframe src aborts the request
                        // and prevents warning popups on HTTPS in IE6.
                        // concat is used to avoid the "Script URL" JSLint error:
                        iframe
                            .unbind('load')
                            .prop('src', 'javascript'.concat(':false;'));
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });

    // The iframe transport returns the iframe content document as response.
    // The following adds converters from iframe to text, json, html, and script:
    $.ajaxSetup({
        converters: {
            'iframe text': function (iframe) {
                return $(iframe[0].body).text();
            },
            'iframe json': function (iframe) {
                return $.parseJSON($(iframe[0].body).text());
            },
            'iframe html': function (iframe) {
                return $(iframe[0].body).html();
            },
            'iframe script': function (iframe) {
                return $.globalEval($(iframe[0].body).text());
            }
        }
    });

}));

/*
 * jQuery File Upload Plugin 5.9
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global define, window, document, Blob, FormData, location */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'jquery.ui.widget'
        ], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // The FileReader API is not actually used, but works as feature detection,
    // as e.g. Safari supports XHR file uploads via the FormData API,
    // but not non-multipart XHR file uploads:
    $.support.xhrFileUpload = !!(window.XMLHttpRequestUpload && window.FileReader);
    $.support.xhrFormDataFileUpload = !!window.FormData;

    // The fileupload widget listens for change events on file input fields defined
    // via fileInput setting and paste or drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files using
    // the fileupload API.
    // By default, files added via file input selection, paste, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {

        options: {
            // The namespace used for event handler binding on the dropZone and
            // fileInput collections.
            // If not set, the name of the widget ("fileupload") is used.
            namespace: undefined,
            // The drop target collection, by the default the complete document.
            // Set to null or an empty collection to disable drag & drop support:
            dropZone: $(document),
            // The file input field collection, that is listened for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null or an empty collection to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // To limit the number of files uploaded with one XHR request,
            // set the following option to an integer greater than 0:
            limitMultiFileUploads: undefined,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // Set the following option to the location of a redirect url on the
            // origin server, for cross-domain iframe transport uploads:
            redirect: undefined,
            // The parameter name for the redirect url, sent as part of the form
            // data and set to 'redirect' if this option is empty:
            redirectParamName: undefined,
            // Set the following option to the location of a postMessage window,
            // to enable postMessage transport uploads:
            postMessage: undefined,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,

            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function (form) {
                return form.serializeArray();
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop, paste or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uplaods, else
            // once for each file selection.
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows to override plugin options as well as define ajax settings.
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function (e, data) {
                data.submit();
            },

            // Other callbacks:
            // Callback for the submit event of each file upload:
            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);
            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);
            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);
            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);
            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);
            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);
            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);
            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);
            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);
            // Callback for change events of the fileInput collection:
            // change: function (e, data) {}, // .bind('fileuploadchange', func);
            // Callback for paste events to the dropZone collection:
            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);
            // Callback for drop events of the dropZone collection:
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);
            // Callback for dragover events of the dropZone collection:
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false
        },

        // A list of options that require a refresh after assigning a new value:
        _refreshOptionsList: [
            'namespace',
            'dropZone',
            'fileInput',
            'multipart',
            'forceIframeTransport'
        ],

        _isXHRUpload: function (options) {
            return !options.forceIframeTransport &&
                ((!options.multipart && $.support.xhrFileUpload) ||
                $.support.xhrFormDataFileUpload);
        },

        _getFormData: function (options) {
            var formData;
            if (typeof options.formData === 'function') {
                return options.formData(options.form);
            } else if ($.isArray(options.formData)) {
                return options.formData;
            } else if (options.formData) {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({name: name, value: value});
                });
                return formData;
            }
            return [];
        },

        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var total = data.total || this._getTotal(data.files),
                    loaded = parseInt(
                        e.loaded / e.total * (data.chunkSize || total),
                        10
                    ) + (data.uploadedBytes || 0);
                this._loaded += loaded - (data.loaded || data.uploadedBytes || 0);
                data.lengthComputable = true;
                data.loaded = loaded;
                data.total = total;
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger('progress', e, data);
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger('progressall', e, {
                    lengthComputable: true,
                    loaded: this._loaded,
                    total: this._total
                });
            }
        },

        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload) {
                $(xhr.upload).bind('progress', function (e) {
                    var oe = e.originalEvent;
                    // Make sure the progress event properties get copied over:
                    e.lengthComputable = oe.lengthComputable;
                    e.loaded = oe.loaded;
                    e.total = oe.total;
                    that._onProgress(e, options);
                });
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _initXHRData: function (options) {
            var formData,
                file = options.files[0],
                // Ignore non-multipart setting if not supported:
                multipart = options.multipart || !$.support.xhrFileUpload;
            if (!multipart || options.blob) {
                // For non-multipart uploads and chunked uploads,
                // file meta data is not part of the request body,
                // so we transmit this data as part of the HTTP headers.
                // For cross domain requests, these headers must be allowed
                // via Access-Control-Allow-Headers or removed using
                // the beforeSend callback:
                options.headers = $.extend(options.headers, {
                    'X-File-Name': file.name,
                    'X-File-Type': file.type,
                    'X-File-Size': file.size
                });
                if (!options.blob) {
                    // Non-chunked non-multipart upload:
                    options.contentType = file.type;
                    options.data = file;
                } else if (!multipart) {
                    // Chunked non-multipart upload:
                    options.contentType = 'application/octet-stream';
                    options.data = options.blob;
                }
            }
            if (multipart && $.support.xhrFormDataFileUpload) {
                if (options.postMessage) {
                    // window.postMessage does not allow sending FormData
                    // objects, so we just add the File/Blob objects to
                    // the formData array and let the postMessage window
                    // create the FormData object out of this array:
                    formData = this._getFormData(options);
                    if (options.blob) {
                        formData.push({
                            name: options.paramName,
                            value: options.blob
                        });
                    } else {
                        $.each(options.files, function (index, file) {
                            formData.push({
                                name: options.paramName,
                                value: file
                            });
                        });
                    }
                } else {
                    if (options.formData instanceof FormData) {
                        formData = options.formData;
                    } else {
                        formData = new FormData();
                        $.each(this._getFormData(options), function (index, field) {
                            formData.append(field.name, field.value);
                        });
                    }
                    if (options.blob) {
                        formData.append(options.paramName, options.blob, file.name);
                    } else {
                        $.each(options.files, function (index, file) {
                            // File objects are also Blob instances.
                            // This check allows the tests to run with
                            // dummy objects:
                            if (file instanceof Blob) {
                                formData.append(options.paramName, file, file.name);
                            }
                        });
                    }
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },

        _initIframeSettings: function (options) {
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
            // Add redirect url to form data on cross-domain uploads:
            if (options.redirect && $('<a></a>').prop('href', options.url)
                    .prop('host') !== location.host) {
                options.formData.push({
                    name: options.redirectParamName || 'redirect',
                    value: options.redirect
                });
            }
        },

        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    // Setting the dataType to postmessage enables the
                    // postMessage transport:
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options, 'iframe');
            }
        },

        _initFormSettings: function (options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
            }
            if (!options.paramName) {
                options.paramName = options.fileInput.prop('name') ||
                    'files[]';
            }
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type || options.form.prop('method') || '')
                .toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT') {
                options.type = 'POST';
            }
        },

        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function (options, testOnly) {
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes = options.uploadedBytes || 0,
                mcs = options.maxChunkSize || fs,
                // Use the Blob methods with the slice implementation
                // according to the W3C Blob API specification:
                slice = file.webkitSlice || file.mozSlice || file.slice,
                upload,
                n,
                jqXHR,
                pipe;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
                    options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = 'uploadedBytes';
                return this._getXHRPromise(
                    false,
                    options.context,
                    [null, 'error', file.error]
                );
            }
            // n is the number of blobs to upload,
            // calculated via filesize, uploaded bytes and max chunk size:
            n = Math.ceil((fs - ub) / mcs);
            // The chunk upload method accepting the chunk number as parameter:
            upload = function (i) {
                if (!i) {
                    return that._getXHRPromise(true, options.context);
                }
                // Upload the blobs in sequential order:
                return upload(i -= 1).pipe(function () {
                    // Clone the options object for each chunk upload:
                    var o = $.extend({}, options);
                    o.blob = slice.call(
                        file,
                        ub + i * mcs,
                        ub + (i + 1) * mcs
                    );
                    // Store the current chunk size, as the blob itself
                    // will be dereferenced after data processing:
                    o.chunkSize = o.blob.size;
                    // Process the upload data (the blob and potential form data):
                    that._initXHRData(o);
                    // Add progress listeners for this chunk upload:
                    that._initProgressListener(o);
                    jqXHR = ($.ajax(o) || that._getXHRPromise(false, o.context))
                        .done(function () {
                            // Create a progress event if upload is done and
                            // no progress event has been invoked for this chunk:
                            if (!o.loaded) {
                                that._onProgress($.Event('progress', {
                                    lengthComputable: true,
                                    loaded: o.chunkSize,
                                    total: o.chunkSize
                                }), o);
                            }
                            options.uploadedBytes = o.uploadedBytes +=
                                o.chunkSize;
                        });
                    return jqXHR;
                });
            };
            // Return the piped Promise object, enhanced with an abort method,
            // which is delegated to the jqXHR object of the current upload,
            // and jqXHR callbacks mapped to the equivalent Promise methods:
            pipe = upload(n);
            pipe.abort = function () {
                return jqXHR.abort();
            };
            return this._enhancePromise(pipe);
        },

        _beforeSend: function (e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
            }
            this._active += 1;
            // Initialize the global progress values:
            this._loaded += data.uploadedBytes || 0;
            this._total += this._getTotal(data.files);
        },

        _onDone: function (result, textStatus, jqXHR, options) {
            if (!this._isXHRUpload(options)) {
                // Create a progress event for each iframe load:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: 1,
                    total: 1
                }), options);
            }
            options.result = result;
            options.textStatus = textStatus;
            options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            options.jqXHR = jqXHR;
            options.textStatus = textStatus;
            options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._loaded -= options.loaded || options.uploadedBytes || 0;
                this._total -= options.total || this._getTotal(options.files);
            }
        },

        _onAlways: function (jqXHRorResult, textStatus, jqXHRorError, options) {
            this._active -= 1;
            options.textStatus = textStatus;
            if (jqXHRorError && jqXHRorError.always) {
                options.jqXHR = jqXHRorError;
                options.result = jqXHRorResult;
            } else {
                options.jqXHR = jqXHRorResult;
                options.errorThrown = jqXHRorError;
            }
            this._trigger('always', null, options);
            if (this._active === 0) {
                // The stop callback is triggered when all uploads have
                // been completed, equivalent to the global ajaxStop event:
                this._trigger('stop');
                // Reset the global progress values:
                this._loaded = this._total = 0;
            }
        },

        _onSend: function (e, data) {
            var that = this,
                jqXHR,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function (resolve, args) {
                    that._sending += 1;
                    jqXHR = jqXHR || (
                        (resolve !== false &&
                        that._trigger('send', e, options) !== false &&
                        (that._chunkedUpload(options) || $.ajax(options))) ||
                        that._getXHRPromise(false, options.context, args)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._sending -= 1;
                        that._onAlways(
                            jqXHRorResult,
                            textStatus,
                            jqXHRorError,
                            options
                        );
                        if (options.limitConcurrentUploads &&
                                options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (!nextSlot.isRejected()) {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
                    (this.options.limitConcurrentUploads &&
                    this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.pipe(send);
                } else {
                    pipe = (this._sequence = this._sequence.pipe(send, send));
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    var args = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(args);
                        }
                        return send(false, args);
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },

        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                limit = options.limitMultiFileUploads,
                fileSet,
                i;
            if (!(options.singleFileUploads || limit) ||
                    !this._isXHRUpload(options)) {
                fileSet = [data.files];
            } else if (!options.singleFileUploads && limit) {
                fileSet = [];
                for (i = 0; i < data.files.length; i += limit) {
                    fileSet.push(data.files.slice(i, i + limit));
                }
            }
            data.originalFiles = data.files;
            $.each(fileSet || data.files, function (index, element) {
                var files = fileSet ? element : [element],
                    newData = $.extend({}, data, {files: files});
                newData.submit = function () {
                    newData.jqXHR = this.jqXHR =
                        (that._trigger('submit', e, this) !== false) &&
                        that._onSend(e, this);
                    return this.jqXHR;
                };
                return (result = that._trigger('add', e, newData));
            });
            return result;
        },

        // File Normalization for Gecko 1.9.1 (Firefox 3.5) support:
        _normalizeFile: function (index, file) {
            if (file.name === undefined && file.size === undefined) {
                file.name = file.fileName;
                file.size = file.fileSize;
            }
        },

        _replaceFileInput: function (input) {
            var inputClone = input.clone(true);
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // collection with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },

        _onChange: function (e) {
            var that = e.data.fileupload,
                data = {
                    files: $.each($.makeArray(e.target.files), that._normalizeFile),
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            if (!data.files.length) {
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                data.files = [{name: e.target.value.replace(/^.*\\/, '')}];
            }
            if (that.options.replaceFileInput) {
                that._replaceFileInput(data.fileInput);
            }
            if (that._trigger('change', e, data) === false ||
                    that._onAdd(e, data) === false) {
                return false;
            }
        },

        _onPaste: function (e) {
            var that = e.data.fileupload,
                cbd = e.originalEvent.clipboardData,
                items = (cbd && cbd.items) || [],
                data = {files: []};
            $.each(items, function (index, item) {
                var file = item.getAsFile && item.getAsFile();
                if (file) {
                    data.files.push(file);
                }
            });
            if (that._trigger('paste', e, data) === false ||
                    that._onAdd(e, data) === false) {
                return false;
            }
        },

        _onDrop: function (e) {
            var that = e.data.fileupload,
                dataTransfer = e.dataTransfer = e.originalEvent.dataTransfer,
                data = {
                    files: $.each(
                        $.makeArray(dataTransfer && dataTransfer.files),
                        that._normalizeFile
                    )
                };
            if (that._trigger('drop', e, data) === false ||
                    that._onAdd(e, data) === false) {
                return false;
            }
            e.preventDefault();
        },

        _onDragOver: function (e) {
            var that = e.data.fileupload,
                dataTransfer = e.dataTransfer = e.originalEvent.dataTransfer;
            if (that._trigger('dragover', e) === false) {
                return false;
            }
            if (dataTransfer) {
                dataTransfer.dropEffect = dataTransfer.effectAllowed = 'copy';
            }
            e.preventDefault();
        },

        _initEventHandlers: function () {
            var ns = this.options.namespace;
            if (this._isXHRUpload(this.options)) {
                this.options.dropZone
                    .bind('dragover.' + ns, {fileupload: this}, this._onDragOver)
                    .bind('drop.' + ns, {fileupload: this}, this._onDrop)
                    .bind('paste.' + ns, {fileupload: this}, this._onPaste);
            }
            this.options.fileInput
                .bind('change.' + ns, {fileupload: this}, this._onChange);
        },

        _destroyEventHandlers: function () {
            var ns = this.options.namespace;
            this.options.dropZone
                .unbind('dragover.' + ns, this._onDragOver)
                .unbind('drop.' + ns, this._onDrop)
                .unbind('paste.' + ns, this._onPaste);
            this.options.fileInput
                .unbind('change.' + ns, this._onChange);
        },

        _setOption: function (key, value) {
            var refresh = $.inArray(key, this._refreshOptionsList) !== -1;
            if (refresh) {
                this._destroyEventHandlers();
            }
            $.Widget.prototype._setOption.call(this, key, value);
            if (refresh) {
                this._initSpecialOptions();
                this._initEventHandlers();
            }
        },

        _initSpecialOptions: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input:file') ?
                        this.element : this.element.find('input:file');
            } else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
                options.dropZone = $(options.dropZone);
            }
        },

        _create: function () {
            var options = this.options,
                dataOpts = $.extend({}, this.element.data());
            dataOpts[this.widgetName] = undefined;
            $.extend(options, dataOpts);
            options.namespace = options.namespace || this.widgetName;
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = this._loaded = this._total = 0;
            this._initEventHandlers();
        },

        destroy: function () {
            this._destroyEventHandlers();
            $.Widget.prototype.destroy.call(this);
        },

        enable: function () {
            $.Widget.prototype.enable.call(this);
            this._initEventHandlers();
        },

        disable: function () {
            this._destroyEventHandlers();
            $.Widget.prototype.disable.call(this);
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function (data) {
            if (!data || this.options.disabled) {
                return;
            }
            data.files = $.each($.makeArray(data.files), this._normalizeFile);
            this._onAdd(null, data);
        },

        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function (data) {
            if (data && !this.options.disabled) {
                data.files = $.each($.makeArray(data.files), this._normalizeFile);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }

    });

}));

(function( $, undefined ) {

// used to prevent race conditions with remote data sources
var requestIndex = 0;

$.widget( "ui.autocomplete", {
	options: {
		appendTo: "body",
		autoFocus: false,
		delay: 300,
		minLength: 1,
		position: {
			my: "left top",
			at: "left bottom",
			collision: "none"
		},
		source: null
	},

	pending: 0,

	_create: function() {
		var self = this,
			doc = this.element[ 0 ].ownerDocument,
			suppressKeyPress;
		this.isMultiLine = this.element.is( "textarea" );

		this.element
			.addClass( "ui-autocomplete-input" )
			.attr( "autocomplete", "off" )
			// TODO verify these actually work as intended
			.attr({
				role: "textbox",
				"aria-autocomplete": "list",
				"aria-haspopup": "true"
			})
			.bind( "keydown.autocomplete", function( event ) {
				if ( self.options.disabled || self.element.propAttr( "readOnly" ) ) {
					return;
				}

				suppressKeyPress = false;
				var keyCode = $.ui.keyCode;
				switch( event.keyCode ) {
				case keyCode.PAGE_UP:
					self._move( "previousPage", event );
					break;
				case keyCode.PAGE_DOWN:
					self._move( "nextPage", event );
					break;
				case keyCode.UP:
					self._keyEvent( "previous", event );
					break;
				case keyCode.DOWN:
					self._keyEvent( "next", event );
					break;
				case keyCode.ENTER:
				case keyCode.NUMPAD_ENTER:
					// when menu is open and has focus
					if ( self.menu.active ) {
						// #6055 - Opera still allows the keypress to occur
						// which causes forms to submit
						suppressKeyPress = true;
						event.preventDefault();
					}
					//passthrough - ENTER and TAB both select the current element
				case keyCode.TAB:
					if ( !self.menu.active ) {
						return;
					}
					self.menu.select( event );
					break;
				case keyCode.ESCAPE:
					self.element.val( self.term );
					self.close( event );
					break;
				default:
					// keypress is triggered before the input value is changed
					clearTimeout( self.searching );
					self.searching = setTimeout(function() {
						// only search if the value has changed
						if ( self.term != self.element.val() ) {
							self.selectedItem = null;
							self.search( null, event );
						}
					}, self.options.delay );
					break;
				}
			})
			.bind( "keypress.autocomplete", function( event ) {
				if ( suppressKeyPress ) {
					suppressKeyPress = false;
					event.preventDefault();
				}
			})
			.bind( "focus.autocomplete", function() {
				if ( self.options.disabled ) {
					return;
				}

				self.selectedItem = null;
				self.previous = self.element.val();
			})
			.bind( "blur.autocomplete", function( event ) {
				if ( self.options.disabled ) {
					return;
				}

				clearTimeout( self.searching );
				// clicks on the menu (or a button to trigger a search) will cause a blur event
				self.closing = setTimeout(function() {
					self.close( event );
					self._change( event );
				}, 150 );
			});
		this._initSource();
		this.menu = $( "<ul></ul>" )
			.addClass( "ui-autocomplete" )
			.appendTo( $( this.options.appendTo || "body", doc )[0] )
			// prevent the close-on-blur in case of a "slow" click on the menu (long mousedown)
			.mousedown(function( event ) {
				// clicking on the scrollbar causes focus to shift to the body
				// but we can't detect a mouseup or a click immediately afterward
				// so we have to track the next mousedown and close the menu if
				// the user clicks somewhere outside of the autocomplete
				var menuElement = self.menu.element[ 0 ];
				if ( !$( event.target ).closest( ".ui-menu-item" ).length ) {
					setTimeout(function() {
						$( document ).one( 'mousedown', function( event ) {
							if ( event.target !== self.element[ 0 ] &&
								event.target !== menuElement &&
								!$.ui.contains( menuElement, event.target ) ) {
								self.close();
							}
						});
					}, 1 );
				}

				// use another timeout to make sure the blur-event-handler on the input was already triggered
				setTimeout(function() {
					clearTimeout( self.closing );
				}, 13);
			})
			.menu({
				focus: function( event, ui ) {
					var item = ui.item.data( "item.autocomplete" );
					if ( false !== self._trigger( "focus", event, { item: item } ) ) {
						// use value to match what will end up in the input, if it was a key event
						if ( /^key/.test(event.originalEvent.type) ) {
							self.element.val( item.value );
						}
					}
				},
				selected: function( event, ui ) {
					var item = ui.item.data( "item.autocomplete" ),
						previous = self.previous;

					// only trigger when focus was lost (click on menu)
					if ( self.element[0] !== doc.activeElement ) {
						self.element.focus();
						self.previous = previous;
						// #6109 - IE triggers two focus events and the second
						// is asynchronous, so we need to reset the previous
						// term synchronously and asynchronously :-(
						setTimeout(function() {
							self.previous = previous;
							self.selectedItem = item;
						}, 1);
					}

					if ( false !== self._trigger( "select", event, { item: item } ) ) {
						self.element.val( item.value );
					}
					// reset the term after the select event
					// this allows custom select handling to work properly
					self.term = self.element.val();

					self.close( event );
					self.selectedItem = item;
				},
				blur: function( event, ui ) {
					// don't set the value of the text field if it's already correct
					// this prevents moving the cursor unnecessarily
					if ( self.menu.element.is(":visible") &&
						( self.element.val() !== self.term ) ) {
						self.element.val( self.term );
					}
				}
			})
			.zIndex( this.element.zIndex() + 10 )
			// workaround for jQuery bug #5781 http://dev.jquery.com/ticket/5781
			.css({ top: 0, left: 0 })
			.hide()
			.data( "menu" );
		if ( $.fn.bgiframe ) {
			 this.menu.element.bgiframe();
		}
		// turning off autocomplete prevents the browser from remembering the
		// value when navigating through history, so we re-enable autocomplete
		// if the page is unloaded before the widget is destroyed. #7790
		self.beforeunloadHandler = function() {
			self.element.removeAttr( "autocomplete" );
		};
		$( window ).bind( "beforeunload", self.beforeunloadHandler );
	},

	destroy: function() {
		this.element
			.removeClass( "ui-autocomplete-input" )
			.removeAttr( "autocomplete" )
			.removeAttr( "role" )
			.removeAttr( "aria-autocomplete" )
			.removeAttr( "aria-haspopup" );
		this.menu.element.remove();
		$( window ).unbind( "beforeunload", this.beforeunloadHandler );
		$.Widget.prototype.destroy.call( this );
	},

	_setOption: function( key, value ) {
		$.Widget.prototype._setOption.apply( this, arguments );
		if ( key === "source" ) {
			this._initSource();
		}
		if ( key === "appendTo" ) {
			this.menu.element.appendTo( $( value || "body", this.element[0].ownerDocument )[0] )
		}
		if ( key === "disabled" && value && this.xhr ) {
			this.xhr.abort();
		}
	},

	_initSource: function() {
		var self = this,
			array,
			url;
		if ( $.isArray(this.options.source) ) {
			array = this.options.source;
			this.source = function( request, response ) {
				response( $.ui.autocomplete.filter(array, request.term) );
			};
		} else if ( typeof this.options.source === "string" ) {
			url = this.options.source;
			this.source = function( request, response ) {
				if ( self.xhr ) {
					self.xhr.abort();
				}
				self.xhr = $.ajax({
					url: url,
					data: request,
					dataType: "json",
					success: function( data, status ) {
						response( data );
					},
					error: function() {
						response( [] );
					}
				});
			};
		} else {
			this.source = this.options.source;
		}
	},

	search: function( value, event ) {
		value = value != null ? value : this.element.val();

		// always save the actual value, not the one passed as an argument
		this.term = this.element.val();

		if ( value.length < this.options.minLength ) {
			return this.close( event );
		}

		clearTimeout( this.closing );
		if ( this._trigger( "search", event ) === false ) {
			return;
		}

		return this._search( value );
	},

	_search: function( value ) {
		this.pending++;
		this.element.addClass( "ui-autocomplete-loading" );

		this.source( { term: value }, this._response() );
	},

	_response: function() {
		var that = this,
			index = ++requestIndex;

		return function( content ) {
			if ( index === requestIndex ) {
				that.__response( content );
			}

			that.pending--;
			if ( !that.pending ) {
				that.element.removeClass( "ui-autocomplete-loading" );
			}
		};
	},

	__response: function( content ) {
		if ( !this.options.disabled && content && content.length ) {
			content = this._normalize( content );
			this._suggest( content );
			this._trigger( "open" );
		} else {
			this.close();
		}
	},

	close: function( event ) {
		clearTimeout( this.closing );
		if ( this.menu.element.is(":visible") ) {
			this.menu.element.hide();
			this.menu.deactivate();
			this._trigger( "close", event );
		}
	},
	
	_change: function( event ) {
		if ( this.previous !== this.element.val() ) {
			this._trigger( "change", event, { item: this.selectedItem } );
		}
	},

	_normalize: function( items ) {
		// assume all items have the right format when the first item is complete
		if ( items.length && items[0].label && items[0].value ) {
			return items;
		}
		return $.map( items, function(item) {
			if ( typeof item === "string" ) {
				return {
					label: item,
					value: item
				};
			}
			return $.extend({
				label: item.label || item.value,
				value: item.value || item.label
			}, item );
		});
	},

	_suggest: function( items ) {
		var ul = this.menu.element
			.empty()
			.zIndex( this.element.zIndex() + 10 );
		this._renderMenu( ul, items );
		// TODO refresh should check if the active item is still in the dom, removing the need for a manual deactivate
		this.menu.deactivate();
		this.menu.refresh();

		// size and position menu
		ul.show();
		this._resizeMenu();
		ul.position( $.extend({
			of: this.element
		}, this.options.position ));

		if ( this.options.autoFocus ) {
			this.menu.next( new $.Event("mouseover") );
		}
	},

	_resizeMenu: function() {
		var ul = this.menu.element;
		ul.outerWidth( Math.max(
			// Firefox wraps long text (possibly a rounding bug)
			// so we add 1px to avoid the wrapping (#7513)
			ul.width( "" ).outerWidth() + 1,
			this.element.outerWidth()
		) );
	},

	_renderMenu: function( ul, items ) {
		var self = this;
		$.each( items, function( index, item ) {
			self._renderItem( ul, item );
		});
	},

	_renderItem: function( ul, item) {
		return $( "<li></li>" )
			.data( "item.autocomplete", item )
			.append( $( "<a></a>" ).text( item.label ) )
			.appendTo( ul );
	},

	_move: function( direction, event ) {
		if ( !this.menu.element.is(":visible") ) {
			this.search( null, event );
			return;
		}
		if ( this.menu.first() && /^previous/.test(direction) ||
				this.menu.last() && /^next/.test(direction) ) {
			this.element.val( this.term );
			this.menu.deactivate();
			return;
		}
		this.menu[ direction ]( event );
	},

	widget: function() {
		return this.menu.element;
	},
	_keyEvent: function( keyEvent, event ) {
		if ( !this.isMultiLine || this.menu.element.is( ":visible" ) ) {
			this._move( keyEvent, event );

			// prevents moving cursor to beginning/end of the text field in some browsers
			event.preventDefault();
		}
	}
});

$.extend( $.ui.autocomplete, {
	escapeRegex: function( value ) {
		return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	},
	filter: function(array, term) {
		var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
		return $.grep( array, function(value) {
			return matcher.test( value.label || value.value || value );
		});
	}
});

}( jQuery ));
/*!
 * jQuery UI Datepicker 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function( $, undefined ) {

$.extend($.ui, { datepicker: { version: "1.8.23" } });

var PROP_NAME = 'datepicker';
var dpuuid = new Date().getTime();
var instActive;

/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this.debug = false; // Change this to true to start debugging
	this._curInst = null; // The current instance in use
	this._keyEvent = false; // If the last event was a key event
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = 'ui-datepicker-div'; // The ID of the main datepicker division
	this._inlineClass = 'ui-datepicker-inline'; // The name of the inline marker class
	this._appendClass = 'ui-datepicker-append'; // The name of the append marker class
	this._triggerClass = 'ui-datepicker-trigger'; // The name of the trigger marker class
	this._dialogClass = 'ui-datepicker-dialog'; // The name of the dialog marker class
	this._disableClass = 'ui-datepicker-disabled'; // The name of the disabled covering marker class
	this._unselectableClass = 'ui-datepicker-unselectable'; // The name of the unselectable cell marker class
	this._currentClass = 'ui-datepicker-current-day'; // The name of the current day marker class
	this._dayOverClass = 'ui-datepicker-days-cell-over'; // The name of the day hover marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		closeText: 'Done', // Display text for close link
		prevText: 'Prev', // Display text for previous month link
		nextText: 'Next', // Display text for next month link
		currentText: 'Today', // Display text for current month link
		monthNames: ['January','February','March','April','May','June',
			'July','August','September','October','November','December'], // Names of months for drop-down and formatting
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'], // Column headings for days starting at Sunday
		weekHeader: 'Wk', // Column header for week of the year
		dateFormat: 'mm/dd/yy', // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		isRTL: false, // True if right-to-left language, false if left-to-right
		showMonthAfterYear: false, // True if the year select precedes month, false for month then year
		yearSuffix: '' // Additional text to append to the year in the month headers
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: 'focus', // 'focus' for popup on focus,
			// 'button' for trigger button, or 'both' for either
		showAnim: 'fadeIn', // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
		appendText: '', // Display text following the input box, e.g. showing the format
		buttonText: '...', // Text for trigger button
		buttonImage: '', // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: false, // True if month can be selected directly, false if only prev/next
		changeYear: false, // True if year can be selected directly, false if only prev/next
		yearRange: 'c-10:c+10', // Range of years to display in drop-down,
			// either relative to today's year (-nn:+nn), relative to currently displayed year
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
		showWeek: false, // True to show week of the year, false to not show it
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
		shortYearCutoff: '+10', // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with '+' for current year + value
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: 'fast', // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '',
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		altField: '', // Selector for an alternate field to store selected dates into
		altFormat: '', // The date format to use for the alternate field
		constrainInput: true, // The input is constrained by the current date format
		showButtonPanel: false, // True to show button panel, false to not show it
		autoSize: false, // True to size the input for the date format, false to leave as is
		disabled: false // The initial disabled state
	};
	$.extend(this._defaults, this.regional['']);
	this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: 'hasDatepicker',
	
	//Keep track of the maximum number of rows displayed (see #7043)
	maxRows: 4,

	/* Debug logging (if enabled). */
	log: function () {
		if (this.debug)
			console.log.apply('', arguments);
	},
	
	// TODO rename to "widget" when switching to widget factory
	_widgetDatepicker: function() {
		return this.dpDiv;
	},

	/* Override the default settings for all instances of the date picker.
	   @param  settings  object - the new settings to use as defaults (anonymous object)
	   @return the manager object */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span
	   @param  settings  object - the new settings to use for this date picker instance (anonymous) */
	_attachDatepicker: function(target, settings) {
		// check for settings on the control itself - in namespace 'date:'
		var inlineSettings = null;
		for (var attrName in this._defaults) {
			var attrValue = target.getAttribute('date:' + attrName);
			if (attrValue) {
				inlineSettings = inlineSettings || {};
				try {
					inlineSettings[attrName] = eval(attrValue);
				} catch (err) {
					inlineSettings[attrName] = attrValue;
				}
			}
		}
		var nodeName = target.nodeName.toLowerCase();
		var inline = (nodeName == 'div' || nodeName == 'span');
		if (!target.id) {
			this.uuid += 1;
			target.id = 'dp' + this.uuid;
		}
		var inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {}, inlineSettings || {});
		if (nodeName == 'input') {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function(target, inline) {
		var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1'); // escape jQuery meta chars
		return {id: id, input: target, // associated target
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
			drawMonth: 0, drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: (!inline ? this.dpDiv : // presentation div
			bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName))
			return;
		this._attachments(input, inst);
		input.addClass(this.markerClassName).keydown(this._doKeyDown).
			keypress(this._doKeyPress).keyup(this._doKeyUp).
			bind("setData.datepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key) {
				return this._get(inst, key);
			});
		this._autoSize(inst);
		$.data(target, PROP_NAME, inst);
		//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
	},

	/* Make attachments based on settings. */
	_attachments: function(input, inst) {
		var appendText = this._get(inst, 'appendText');
		var isRTL = this._get(inst, 'isRTL');
		if (inst.append)
			inst.append.remove();
		if (appendText) {
			inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
			input[isRTL ? 'before' : 'after'](inst.append);
		}
		input.unbind('focus', this._showDatepicker);
		if (inst.trigger)
			inst.trigger.remove();
		var showOn = this._get(inst, 'showOn');
		if (showOn == 'focus' || showOn == 'both') // pop-up date picker when in the marked field
			input.focus(this._showDatepicker);
		if (showOn == 'button' || showOn == 'both') { // pop-up date picker when button clicked
			var buttonText = this._get(inst, 'buttonText');
			var buttonImage = this._get(inst, 'buttonImage');
			inst.trigger = $(this._get(inst, 'buttonImageOnly') ?
				$('<img/>').addClass(this._triggerClass).
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
				$('<button type="button"></button>').addClass(this._triggerClass).
					html(buttonImage == '' ? buttonText : $('<img/>').attr(
					{ src:buttonImage, alt:buttonText, title:buttonText })));
			input[isRTL ? 'before' : 'after'](inst.trigger);
			inst.trigger.click(function() {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0])
					$.datepicker._hideDatepicker();
				else if ($.datepicker._datepickerShowing && $.datepicker._lastInput != input[0]) {
					$.datepicker._hideDatepicker(); 
					$.datepicker._showDatepicker(input[0]);
				} else
					$.datepicker._showDatepicker(input[0]);
				return false;
			});
		}
	},

	/* Apply the maximum length for the date format. */
	_autoSize: function(inst) {
		if (this._get(inst, 'autoSize') && !inst.inline) {
			var date = new Date(2009, 12 - 1, 20); // Ensure double digits
			var dateFormat = this._get(inst, 'dateFormat');
			if (dateFormat.match(/[DM]/)) {
				var findMax = function(names) {
					var max = 0;
					var maxI = 0;
					for (var i = 0; i < names.length; i++) {
						if (names[i].length > max) {
							max = names[i].length;
							maxI = i;
						}
					}
					return maxI;
				};
				date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
					'monthNames' : 'monthNamesShort'))));
				date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
					'dayNames' : 'dayNamesShort'))) + 20 - date.getDay());
			}
			inst.input.attr('size', this._formatDate(inst, date).length);
		}
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName))
			return;
		divSpan.addClass(this.markerClassName).append(inst.dpDiv).
			bind("setData.datepicker", function(event, key, value){
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key){
				return this._get(inst, key);
			});
		$.data(target, PROP_NAME, inst);
		this._setDate(inst, this._getDefaultDate(inst), true);
		this._updateDatepicker(inst);
		this._updateAlternate(inst);
		//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
		// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
		// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
		inst.dpDiv.css( "display", "block" );
	},

	/* Pop-up the date picker in a "dialog" box.
	   @param  input     element - ignored
	   @param  date      string or Date - the initial date to display
	   @param  onSelect  function - the function to call when a date is selected
	   @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	   @param  pos       int[2] - coordinates for the dialog's position within the screen or
	                     event - with x/y coordinates or
	                     leave empty for default (screen centre)
	   @return the manager object */
	_dialogDatepicker: function(input, date, onSelect, settings, pos) {
		var inst = this._dialogInst; // internal instance
		if (!inst) {
			this.uuid += 1;
			var id = 'dp' + this.uuid;
			this._dialogInput = $('<input type="text" id="' + id +
				'" style="position: absolute; top: -100px; width: 0px;"/>');
			this._dialogInput.keydown(this._doKeyDown);
			$('body').append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], PROP_NAME, inst);
		}
		extendRemove(inst.settings, settings || {});
		date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
		this._dialogInput.val(date);

		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			var browserWidth = document.documentElement.clientWidth;
			var browserHeight = document.documentElement.clientHeight;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
		}

		// move input on screen for focus, but hidden behind dialog
		this._dialogInput.css('left', (this._pos[0] + 20) + 'px').css('top', this._pos[1] + 'px');
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI)
			$.blockUI(this.dpDiv);
		$.data(this._dialogInput[0], PROP_NAME, inst);
		return this;
	},

	/* Detach a datepicker from its control.
	   @param  target    element - the target input field or division or span */
	_destroyDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		$.removeData(target, PROP_NAME);
		if (nodeName == 'input') {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).
				unbind('focus', this._showDatepicker).
				unbind('keydown', this._doKeyDown).
				unbind('keypress', this._doKeyPress).
				unbind('keyup', this._doKeyUp);
		} else if (nodeName == 'div' || nodeName == 'span')
			$target.removeClass(this.markerClassName).empty();
	},

	/* Enable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_enableDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		if (nodeName == 'input') {
			target.disabled = false;
			inst.trigger.filter('button').
				each(function() { this.disabled = false; }).end().
				filter('img').css({opacity: '1.0', cursor: ''});
		}
		else if (nodeName == 'div' || nodeName == 'span') {
			var inline = $target.children('.' + this._inlineClass);
			inline.children().removeClass('ui-state-disabled');
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
				removeAttr("disabled");
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_disableDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		if (nodeName == 'input') {
			target.disabled = true;
			inst.trigger.filter('button').
				each(function() { this.disabled = true; }).end().
				filter('img').css({opacity: '0.5', cursor: 'default'});
		}
		else if (nodeName == 'div' || nodeName == 'span') {
			var inline = $target.children('.' + this._inlineClass);
			inline.children().addClass('ui-state-disabled');
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
				attr("disabled", "disabled");
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	   @param  target    element - the target input field or division or span
	   @return boolean - true if disabled, false if enabled */
	_isDisabledDatepicker: function(target) {
		if (!target) {
			return false;
		}
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] == target)
				return true;
		}
		return false;
	},

	/* Retrieve the instance data for the target control.
	   @param  target  element - the target input field or division or span
	   @return  object - the associated instance data
	   @throws  error if a jQuery problem getting data */
	_getInst: function(target) {
		try {
			return $.data(target, PROP_NAME);
		}
		catch (err) {
			throw 'Missing instance data for this datepicker';
		}
	},

	/* Update or retrieve the settings for a date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span
	   @param  name    object - the new settings to update or
	                   string - the name of the setting to change or retrieve,
	                   when retrieving also 'all' for all instance settings or
	                   'defaults' for all global defaults
	   @param  value   any - the new value for the setting
	                   (omit if above is an object or to retrieve a value) */
	_optionDatepicker: function(target, name, value) {
		var inst = this._getInst(target);
		if (arguments.length == 2 && typeof name == 'string') {
			return (name == 'defaults' ? $.extend({}, $.datepicker._defaults) :
				(inst ? (name == 'all' ? $.extend({}, inst.settings) :
				this._get(inst, name)) : null));
		}
		var settings = name || {};
		if (typeof name == 'string') {
			settings = {};
			settings[name] = value;
		}
		if (inst) {
			if (this._curInst == inst) {
				this._hideDatepicker();
			}
			var date = this._getDateDatepicker(target, true);
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			extendRemove(inst.settings, settings);
			// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
			if (minDate !== null && settings['dateFormat'] !== undefined && settings['minDate'] === undefined)
				inst.settings.minDate = this._formatDate(inst, minDate);
			if (maxDate !== null && settings['dateFormat'] !== undefined && settings['maxDate'] === undefined)
				inst.settings.maxDate = this._formatDate(inst, maxDate);
			this._attachments($(target), inst);
			this._autoSize(inst);
			this._setDate(inst, date);
			this._updateAlternate(inst);
			this._updateDatepicker(inst);
		}
	},

	// change method deprecated
	_changeDatepicker: function(target, name, value) {
		this._optionDatepicker(target, name, value);
	},

	/* Redraw the date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span */
	_refreshDatepicker: function(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
	   @param  target   element - the target input field or division or span
	   @param  date     Date - the new date */
	_setDateDatepicker: function(target, date) {
		var inst = this._getInst(target);
		if (inst) {
			this._setDate(inst, date);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
		}
	},

	/* Get the date(s) for the first entry in a jQuery selection.
	   @param  target     element - the target input field or division or span
	   @param  noDefault  boolean - true if no default date is to be used
	   @return Date - the current date */
	_getDateDatepicker: function(target, noDefault) {
		var inst = this._getInst(target);
		if (inst && !inst.inline)
			this._setDateFromField(inst, noDefault);
		return (inst ? this._getDate(inst) : null);
	},

	/* Handle keystrokes. */
	_doKeyDown: function(event) {
		var inst = $.datepicker._getInst(event.target);
		var handled = true;
		var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing)
			switch (event.keyCode) {
				case 9: $.datepicker._hideDatepicker();
						handled = false;
						break; // hide on tab out
				case 13: var sel = $('td.' + $.datepicker._dayOverClass + ':not(.' + 
									$.datepicker._currentClass + ')', inst.dpDiv);
						if (sel[0])
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
							var onSelect = $.datepicker._get(inst, 'onSelect');
							if (onSelect) {
								var dateStr = $.datepicker._formatDate(inst);

								// trigger custom callback
								onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
							}
						else
							$.datepicker._hideDatepicker();
						return false; // don't submit the form
						break; // select the value on enter
				case 27: $.datepicker._hideDatepicker();
						break; // hide on escape
				case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.datepicker._get(inst, 'stepBigMonths') :
							-$.datepicker._get(inst, 'stepMonths')), 'M');
						break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.datepicker._get(inst, 'stepBigMonths') :
							+$.datepicker._get(inst, 'stepMonths')), 'M');
						break; // next month/year on page down/+ ctrl
				case 35: if (event.ctrlKey || event.metaKey) $.datepicker._clearDate(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // clear on ctrl or command +end
				case 36: if (event.ctrlKey || event.metaKey) $.datepicker._gotoToday(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // current on ctrl or command +home
				case 37: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command +left
						if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
									-$.datepicker._get(inst, 'stepBigMonths') :
									-$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +left on Mac
						break;
				case 38: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, -7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command +up
				case 39: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command +right
						if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
									+$.datepicker._get(inst, 'stepBigMonths') :
									+$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +right
						break;
				case 40: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, +7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command +down
				default: handled = false;
			}
		else if (event.keyCode == 36 && event.ctrlKey) // display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		else {
			handled = false;
		}
		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function(event) {
		var inst = $.datepicker._getInst(event.target);
		if ($.datepicker._get(inst, 'constrainInput')) {
			var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
			var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
			return event.ctrlKey || event.metaKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
		}
	},

	/* Synchronise manual entry and field/alternate field. */
	_doKeyUp: function(event) {
		var inst = $.datepicker._getInst(event.target);
		if (inst.input.val() != inst.lastVal) {
			try {
				var date = $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
					(inst.input ? inst.input.val() : null),
					$.datepicker._getFormatConfig(inst));
				if (date) { // only if valid
					$.datepicker._setDateFromField(inst);
					$.datepicker._updateAlternate(inst);
					$.datepicker._updateDatepicker(inst);
				}
			}
			catch (err) {
				$.datepicker.log(err);
			}
		}
		return true;
	},

	/* Pop-up the date picker for a given input field.
       If false returned from beforeShow event handler do not show. 
	   @param  input  element - the input field attached to the date picker or
	                  event - if triggered by focus */
	_showDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() != 'input') // find from button/image trigger
			input = $('input', input.parentNode)[0];
		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) // already here
			return;
		var inst = $.datepicker._getInst(input);
		if ($.datepicker._curInst && $.datepicker._curInst != inst) {
			$.datepicker._curInst.dpDiv.stop(true, true);
			if ( inst && $.datepicker._datepickerShowing ) {
				$.datepicker._hideDatepicker( $.datepicker._curInst.input[0] );
			}
		}
		var beforeShow = $.datepicker._get(inst, 'beforeShow');
		var beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
		if(beforeShowSettings === false){
            //false
			return;
		}
		extendRemove(inst.settings, beforeShowSettings);
		inst.lastVal = null;
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);
		if ($.datepicker._inDialog) // hide cursor
			input.value = '';
		if (!$.datepicker._pos) { // position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}
		var isFixed = false;
		$(input).parents().each(function() {
			isFixed |= $(this).css('position') == 'fixed';
			return !isFixed;
		});
		if (isFixed && $.browser.opera) { // correction for Opera when fixed and scrolled
			$.datepicker._pos[0] -= document.documentElement.scrollLeft;
			$.datepicker._pos[1] -= document.documentElement.scrollTop;
		}
		var offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
		$.datepicker._pos = null;
		//to avoid flashes on Firefox
		inst.dpDiv.empty();
		// determine sizing offscreen
		inst.dpDiv.css({position: 'absolute', display: 'block', top: '-1000px'});
		$.datepicker._updateDatepicker(inst);
		// fix width for dynamic number of date pickers
		// and adjust position before showing
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
			'static' : (isFixed ? 'fixed' : 'absolute')), display: 'none',
			left: offset.left + 'px', top: offset.top + 'px'});
		if (!inst.inline) {
			var showAnim = $.datepicker._get(inst, 'showAnim');
			var duration = $.datepicker._get(inst, 'duration');
			var postProcess = function() {
				var cover = inst.dpDiv.find('iframe.ui-datepicker-cover'); // IE6- only
				if( !! cover.length ){
					var borders = $.datepicker._getBorders(inst.dpDiv);
					cover.css({left: -borders[0], top: -borders[1],
						width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()});
				}
			};
			inst.dpDiv.zIndex(10000);
			$.datepicker._datepickerShowing = true;
			if ($.effects && $.effects[showAnim])
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[showAnim || 'show']((showAnim ? duration : null), postProcess);
			if (!showAnim || !duration)
				postProcess();
			if (inst.input.is(':visible') && !inst.input.is(':disabled'))
				inst.input.focus();
			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function(inst) {
		var self = this;
		self.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
		var borders = $.datepicker._getBorders(inst.dpDiv);
		instActive = inst; // for delegate hover events
		inst.dpDiv.empty().append(this._generateHTML(inst));
		this._attachHandlers(inst);
		var cover = inst.dpDiv.find('iframe.ui-datepicker-cover'); // IE6- only
		if( !!cover.length ){ //avoid call to outerXXXX() when not in IE6
			cover.css({left: -borders[0], top: -borders[1], width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()})
		}
		inst.dpDiv.find('.' + this._dayOverClass + ' a').mouseover();
		var numMonths = this._getNumberOfMonths(inst);
		var cols = numMonths[1];
		var width = 17;
		inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
		if (cols > 1)
			inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
		inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
			'Class']('ui-datepicker-multi');
		inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
			'Class']('ui-datepicker-rtl');
		if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input &&
				// #6694 - don't focus the input if it's already focused
				// this breaks the change event in IE
				inst.input.is(':visible') && !inst.input.is(':disabled') && inst.input[0] != document.activeElement)
			inst.input.focus();
		// deffered render of the years select (to avoid flashes on Firefox) 
		if( inst.yearshtml ){
			var origyearshtml = inst.yearshtml;
			setTimeout(function(){
				//assure that inst.yearshtml didn't change.
				if( origyearshtml === inst.yearshtml && inst.yearshtml ){
					inst.dpDiv.find('select.ui-datepicker-year:first').replaceWith(inst.yearshtml);
				}
				origyearshtml = inst.yearshtml = null;
			}, 0);
		}
	},

	/* Retrieve the size of left and top borders for an element.
	   @param  elem  (jQuery object) the element of interest
	   @return  (number[2]) the left and top borders */
	_getBorders: function(elem) {
		var convert = function(value) {
			return {thin: 1, medium: 2, thick: 3}[value] || value;
		};
		return [parseFloat(convert(elem.css('border-left-width'))),
			parseFloat(convert(elem.css('border-top-width')))];
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function(inst, offset, isFixed) {
		var dpWidth = inst.dpDiv.outerWidth();
		var dpHeight = inst.dpDiv.outerHeight();
		var inputWidth = inst.input ? inst.input.outerWidth() : 0;
		var inputHeight = inst.input ? inst.input.outerHeight() : 0;
		var viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft());
		var viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());

		offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
		offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
		offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

		// now check if datepicker is showing outside window viewport - move to a better place if so.
		offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
			Math.abs(offset.left + dpWidth - viewWidth) : 0);
		offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
			Math.abs(dpHeight + inputHeight) : 0);

		return offset;
	},

	/* Find an object's position on the screen. */
	_findPos: function(obj) {
		var inst = this._getInst(obj);
		var isRTL = this._get(inst, 'isRTL');
        while (obj && (obj.type == 'hidden' || obj.nodeType != 1 || $.expr.filters.hidden(obj))) {
            obj = obj[isRTL ? 'previousSibling' : 'nextSibling'];
        }
        var position = $(obj).offset();
	    return [position.left, position.top];
	},

	/* Hide the date picker from view.
	   @param  input  element - the input field attached to the date picker */
	_hideDatepicker: function(input) {
		var inst = this._curInst;
		if (!inst || (input && inst != $.data(input, PROP_NAME)))
			return;
		if (this._datepickerShowing) {
			var showAnim = this._get(inst, 'showAnim');
			var duration = this._get(inst, 'duration');
			var postProcess = function() {
				$.datepicker._tidyDialog(inst);
			};
			if ($.effects && $.effects[showAnim])
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[(showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))]((showAnim ? duration : null), postProcess);
			if (!showAnim)
				postProcess();
			this._datepickerShowing = false;
			var onClose = this._get(inst, 'onClose');
			if (onClose)
				onClose.apply((inst.input ? inst.input[0] : null),
					[(inst.input ? inst.input.val() : ''), inst]);
			this._lastInput = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' });
				if ($.blockUI) {
					$.unblockUI();
					$('body').append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function(inst) {
		inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function(event) {
		if (!$.datepicker._curInst)
			return;

		var $target = $(event.target),
			inst = $.datepicker._getInst($target[0]);

		if ( ( ( $target[0].id != $.datepicker._mainDivId &&
				$target.parents('#' + $.datepicker._mainDivId).length == 0 &&
				!$target.hasClass($.datepicker.markerClassName) &&
				!$target.closest("." + $.datepicker._triggerClass).length &&
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) ) ) ||
			( $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != inst ) )
			$.datepicker._hideDatepicker();
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function(id, offset, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._isDisabledDatepicker(target[0])) {
			return;
		}
		this._adjustInstDate(inst, offset +
			(period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // undo positioning
			period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		}
		else {
			var date = new Date();
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function(id, select, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		inst['selected' + (period == 'M' ? 'Month' : 'Year')] =
		inst['draw' + (period == 'M' ? 'Month' : 'Year')] =
			parseInt(select.options[select.selectedIndex].value,10);
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a day. */
	_selectDay: function(id, month, year, td) {
		var target = $(id);
		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
			return;
		}
		var inst = this._getInst(target[0]);
		inst.selectedDay = inst.currentDay = $('a', td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		this._selectDate(target, '');
	},

	/* Update the input field with the selected date. */
	_selectDate: function(id, dateStr) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
		if (inst.input)
			inst.input.val(dateStr);
		this._updateAlternate(inst);
		var onSelect = this._get(inst, 'onSelect');
		if (onSelect)
			onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
		else if (inst.input)
			inst.input.trigger('change'); // fire the change event
		if (inst.inline)
			this._updateDatepicker(inst);
		else {
			this._hideDatepicker();
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) != 'object')
				inst.input.focus(); // restore focus
			this._lastInput = null;
		}
	},

	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function(inst) {
		var altField = this._get(inst, 'altField');
		if (altField) { // update alternate field too
			var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
			var date = this._getDate(inst);
			var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).each(function() { $(this).val(dateStr); });
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
	   @param  date  Date - the date to customise
	   @return [boolean, string] - is this date selectable?, what is its CSS class? */
	noWeekends: function(date) {
		var day = date.getDay();
		return [(day > 0 && day < 6), ''];
	},

	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	   @param  date  Date - the date to get the week for
	   @return  number - the number of the week within the year that contains this date */
	iso8601Week: function(date) {
		var checkDate = new Date(date.getTime());
		// Find Thursday of this week starting on Monday
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
		var time = checkDate.getTime();
		checkDate.setMonth(0); // Compare with Jan 1
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	},

	/* Parse a string value into a date object.
	   See formatDate below for the possible formats.

	   @param  format    string - the expected format of the date
	   @param  value     string - the date in the above format
	   @param  settings  Object - attributes include:
	                     shortYearCutoff  number - the cutoff year for determining the century (optional)
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  Date - the extracted date value or null if value is blank */
	parseDate: function (format, value, settings) {
		if (format == null || value == null)
			throw 'Invalid arguments';
		value = (typeof value == 'object' ? value.toString() : value + '');
		if (value == '')
			return null;
		var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
		shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
				new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		var year = -1;
		var month = -1;
		var day = -1;
		var doy = -1;
		var literal = false;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		// Extract a number from the string value
		var getNumber = function(match) {
			var isDoubled = lookAhead(match);
			var size = (match == '@' ? 14 : (match == '!' ? 20 :
				(match == 'y' && isDoubled ? 4 : (match == 'o' ? 3 : 2))));
			var digits = new RegExp('^\\d{1,' + size + '}');
			var num = value.substring(iValue).match(digits);
			if (!num)
				throw 'Missing number at position ' + iValue;
			iValue += num[0].length;
			return parseInt(num[0], 10);
		};
		// Extract a name from the string value and convert to an index
		var getName = function(match, shortNames, longNames) {
			var names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
				return [ [k, v] ];
			}).sort(function (a, b) {
				return -(a[1].length - b[1].length);
			});
			var index = -1;
			$.each(names, function (i, pair) {
				var name = pair[1];
				if (value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) {
					index = pair[0];
					iValue += name.length;
					return false;
				}
			});
			if (index != -1)
				return index + 1;
			else
				throw 'Unknown name at position ' + iValue;
		};
		// Confirm that a literal character matches the string value
		var checkLiteral = function() {
			if (value.charAt(iValue) != format.charAt(iFormat))
				throw 'Unexpected literal at position ' + iValue;
			iValue++;
		};
		var iValue = 0;
		for (var iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					checkLiteral();
			else
				switch (format.charAt(iFormat)) {
					case 'd':
						day = getNumber('d');
						break;
					case 'D':
						getName('D', dayNamesShort, dayNames);
						break;
					case 'o':
						doy = getNumber('o');
						break;
					case 'm':
						month = getNumber('m');
						break;
					case 'M':
						month = getName('M', monthNamesShort, monthNames);
						break;
					case 'y':
						year = getNumber('y');
						break;
					case '@':
						var date = new Date(getNumber('@'));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case '!':
						var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'"))
							checkLiteral();
						else
							literal = true;
						break;
					default:
						checkLiteral();
				}
		}
		if (iValue < value.length){
			throw "Extra/unparsed characters found in date: " + value.substring(iValue);
		}
		if (year == -1)
			year = new Date().getFullYear();
		else if (year < 100)
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				var dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim)
					break;
				month++;
				day -= dim;
			} while (true);
		}
		var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
		if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
			throw 'Invalid date'; // E.g. 31/02/00
		return date;
	},

	/* Standard date formats. */
	ATOM: 'yy-mm-dd', // RFC 3339 (ISO 8601)
	COOKIE: 'D, dd M yy',
	ISO_8601: 'yy-mm-dd',
	RFC_822: 'D, d M y',
	RFC_850: 'DD, dd-M-y',
	RFC_1036: 'D, d M y',
	RFC_1123: 'D, d M yy',
	RFC_2822: 'D, d M yy',
	RSS: 'D, d M y', // RFC 822
	TICKS: '!',
	TIMESTAMP: '@',
	W3C: 'yy-mm-dd', // ISO 8601

	_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

	/* Format a date object into a string value.
	   The format can be combinations of the following:
	   d  - day of month (no leading zero)
	   dd - day of month (two digit)
	   o  - day of year (no leading zeros)
	   oo - day of year (three digit)
	   D  - day name short
	   DD - day name long
	   m  - month of year (no leading zero)
	   mm - month of year (two digit)
	   M  - month name short
	   MM - month name long
	   y  - year (two digit)
	   yy - year (four digit)
	   @ - Unix timestamp (ms since 01/01/1970)
	   ! - Windows ticks (100ns since 01/01/0001)
	   '...' - literal text
	   '' - single quote

	   @param  format    string - the desired format of the date
	   @param  date      Date - the date value to format
	   @param  settings  Object - attributes include:
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  string - the date in the above format */
	formatDate: function (format, date, settings) {
		if (!date)
			return '';
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		// Format a number, with leading zero if necessary
		var formatNumber = function(match, value, len) {
			var num = '' + value;
			if (lookAhead(match))
				while (num.length < len)
					num = '0' + num;
			return num;
		};
		// Format a name, short or long as requested
		var formatName = function(match, value, shortNames, longNames) {
			return (lookAhead(match) ? longNames[value] : shortNames[value]);
		};
		var output = '';
		var literal = false;
		if (date)
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal)
					if (format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						output += format.charAt(iFormat);
				else
					switch (format.charAt(iFormat)) {
						case 'd':
							output += formatNumber('d', date.getDate(), 2);
							break;
						case 'D':
							output += formatName('D', date.getDay(), dayNamesShort, dayNames);
							break;
						case 'o':
							output += formatNumber('o',
								Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
							break;
						case 'm':
							output += formatNumber('m', date.getMonth() + 1, 2);
							break;
						case 'M':
							output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
							break;
						case 'y':
							output += (lookAhead('y') ? date.getFullYear() :
								(date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
							break;
						case '@':
							output += date.getTime();
							break;
						case '!':
							output += date.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (lookAhead("'"))
								output += "'";
							else
								literal = true;
							break;
						default:
							output += format.charAt(iFormat);
					}
			}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function (format) {
		var chars = '';
		var literal = false;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		for (var iFormat = 0; iFormat < format.length; iFormat++)
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					chars += format.charAt(iFormat);
			else
				switch (format.charAt(iFormat)) {
					case 'd': case 'm': case 'y': case '@':
						chars += '0123456789';
						break;
					case 'D': case 'M':
						return null; // Accept anything
					case "'":
						if (lookAhead("'"))
							chars += "'";
						else
							literal = true;
						break;
					default:
						chars += format.charAt(iFormat);
				}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function(inst, noDefault) {
		if (inst.input.val() == inst.lastVal) {
			return;
		}
		var dateFormat = this._get(inst, 'dateFormat');
		var dates = inst.lastVal = inst.input ? inst.input.val() : null;
		var date, defaultDate;
		date = defaultDate = this._getDefaultDate(inst);
		var settings = this._getFormatConfig(inst);
		try {
			date = this.parseDate(dateFormat, dates, settings) || defaultDate;
		} catch (event) {
			this.log(event);
			dates = (noDefault ? '' : dates);
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = (dates ? date.getDate() : 0);
		inst.currentMonth = (dates ? date.getMonth() : 0);
		inst.currentYear = (dates ? date.getFullYear() : 0);
		this._adjustInstDate(inst);
	},

	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function(inst) {
		return this._restrictMinMax(inst,
			this._determineDate(inst, this._get(inst, 'defaultDate'), new Date()));
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function(inst, date, defaultDate) {
		var offsetNumeric = function(offset) {
			var date = new Date();
			date.setDate(date.getDate() + offset);
			return date;
		};
		var offsetString = function(offset) {
			try {
				return $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
					offset, $.datepicker._getFormatConfig(inst));
			}
			catch (e) {
				// Ignore
			}
			var date = (offset.toLowerCase().match(/^c/) ?
				$.datepicker._getDate(inst) : null) || new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			var day = date.getDate();
			var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
			var matches = pattern.exec(offset);
			while (matches) {
				switch (matches[2] || 'd') {
					case 'd' : case 'D' :
						day += parseInt(matches[1],10); break;
					case 'w' : case 'W' :
						day += parseInt(matches[1],10) * 7; break;
					case 'm' : case 'M' :
						month += parseInt(matches[1],10);
						day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
						break;
					case 'y': case 'Y' :
						year += parseInt(matches[1],10);
						day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset);
			}
			return new Date(year, month, day);
		};
		var newDate = (date == null || date === '' ? defaultDate : (typeof date == 'string' ? offsetString(date) :
			(typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
		newDate = (newDate && newDate.toString() == 'Invalid Date' ? defaultDate : newDate);
		if (newDate) {
			newDate.setHours(0);
			newDate.setMinutes(0);
			newDate.setSeconds(0);
			newDate.setMilliseconds(0);
		}
		return this._daylightSavingAdjust(newDate);
	},

	/* Handle switch to/from daylight saving.
	   Hours may be non-zero on daylight saving cut-over:
	   > 12 when midnight changeover, but then cannot generate
	   midnight datetime, so jump to 1AM, otherwise reset.
	   @param  date  (Date) the date to check
	   @return  (Date) the corrected date */
	_daylightSavingAdjust: function(date) {
		if (!date) return null;
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Set the date(s) directly. */
	_setDate: function(inst, date, noChange) {
		var clear = !date;
		var origMonth = inst.selectedMonth;
		var origYear = inst.selectedYear;
		var newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
		inst.selectedDay = inst.currentDay = newDate.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
		if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange)
			this._notifyChange(inst);
		this._adjustInstDate(inst);
		if (inst.input) {
			inst.input.val(clear ? '' : this._formatDate(inst));
		}
	},

	/* Retrieve the date(s) directly. */
	_getDate: function(inst) {
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null :
			this._daylightSavingAdjust(new Date(
			inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate;
	},

	/* Attach the onxxx handlers.  These are declared statically so
	 * they work with static code transformers like Caja.
	 */
	_attachHandlers: function(inst) {
		var stepMonths = this._get(inst, 'stepMonths');
		var id = '#' + inst.id.replace( /\\\\/g, "\\" );
		inst.dpDiv.find('[data-handler]').map(function () {
			var handler = {
				prev: function () {
					window['DP_jQuery_' + dpuuid].datepicker._adjustDate(id, -stepMonths, 'M');
				},
				next: function () {
					window['DP_jQuery_' + dpuuid].datepicker._adjustDate(id, +stepMonths, 'M');
				},
				hide: function () {
					window['DP_jQuery_' + dpuuid].datepicker._hideDatepicker();
				},
				today: function () {
					window['DP_jQuery_' + dpuuid].datepicker._gotoToday(id);
				},
				selectDay: function () {
					window['DP_jQuery_' + dpuuid].datepicker._selectDay(id, +this.getAttribute('data-month'), +this.getAttribute('data-year'), this);
					return false;
				},
				selectMonth: function () {
					window['DP_jQuery_' + dpuuid].datepicker._selectMonthYear(id, this, 'M');
					return false;
				},
				selectYear: function () {
					window['DP_jQuery_' + dpuuid].datepicker._selectMonthYear(id, this, 'Y');
					return false;
				}
			};
			$(this).bind(this.getAttribute('data-event'), handler[this.getAttribute('data-handler')]);
		});
	},
	
	/* Generate the HTML for the current state of the date picker. */
	_generateHTML: function(inst) {
		var today = new Date();
		today = this._daylightSavingAdjust(
			new Date(today.getFullYear(), today.getMonth(), today.getDate())); // clear time
		var isRTL = this._get(inst, 'isRTL');
		var showButtonPanel = this._get(inst, 'showButtonPanel');
		var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
		var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
		var numMonths = this._getNumberOfMonths(inst);
		var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
		var stepMonths = this._get(inst, 'stepMonths');
		var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
		var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
			new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		var drawMonth = inst.drawMonth - showCurrentAtPos;
		var drawYear = inst.drawYear;
		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) {
			var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;
		var prevText = this._get(inst, 'prevText');
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
			this._getFormatConfig(inst)));
		var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			'<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click"' +
			' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' :
			(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+ prevText +'"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
		var nextText = this._get(inst, 'nextText');
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
			this._getFormatConfig(inst)));
		var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			'<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click"' +
			' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' :
			(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+ nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
		var currentText = this._get(inst, 'currentText');
		var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
		currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
		var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' +
			this._get(inst, 'closeText') + '</button>' : '');
		var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : '') +
			(this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click"' +
			'>' + currentText + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
		var firstDay = parseInt(this._get(inst, 'firstDay'),10);
		firstDay = (isNaN(firstDay) ? 0 : firstDay);
		var showWeek = this._get(inst, 'showWeek');
		var dayNames = this._get(inst, 'dayNames');
		var dayNamesShort = this._get(inst, 'dayNamesShort');
		var dayNamesMin = this._get(inst, 'dayNamesMin');
		var monthNames = this._get(inst, 'monthNames');
		var monthNamesShort = this._get(inst, 'monthNamesShort');
		var beforeShowDay = this._get(inst, 'beforeShowDay');
		var showOtherMonths = this._get(inst, 'showOtherMonths');
		var selectOtherMonths = this._get(inst, 'selectOtherMonths');
		var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
		var defaultDate = this._getDefaultDate(inst);
		var html = '';
		for (var row = 0; row < numMonths[0]; row++) {
			var group = '';
			this.maxRows = 4;
			for (var col = 0; col < numMonths[1]; col++) {
				var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
				var cornerClass = ' ui-corner-all';
				var calender = '';
				if (isMultiMonth) {
					calender += '<div class="ui-datepicker-group';
					if (numMonths[1] > 1)
						switch (col) {
							case 0: calender += ' ui-datepicker-group-first';
								cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left'); break;
							case numMonths[1]-1: calender += ' ui-datepicker-group-last';
								cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right'); break;
							default: calender += ' ui-datepicker-group-middle'; cornerClass = ''; break;
						}
					calender += '">';
				}
				calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' +
					(/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : '') +
					(/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : '') +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					'</div><table class="ui-datepicker-calendar"><thead>' +
					'<tr>';
				var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, 'weekHeader') + '</th>' : '');
				for (var dow = 0; dow < 7; dow++) { // days of the week
					var day = (dow + firstDay) % 7;
					thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' +
						'<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
				}
				calender += thead + '</tr></thead><tbody>';
				var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				var curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
				var numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows); //If multiple months, use the higher number of rows (see #7043)
				this.maxRows = numRows;
				var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
				for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
					calender += '<tr>';
					var tbody = (!showWeek ? '' : '<td class="ui-datepicker-week-col">' +
						this._get(inst, 'calculateWeek')(printDate) + '</td>');
					for (var dow = 0; dow < 7; dow++) { // create date picker days
						var daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
						var otherMonth = (printDate.getMonth() != drawMonth);
						var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
						tbody += '<td class="' +
							((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + // highlight weekends
							(otherMonth ? ' ui-datepicker-other-month' : '') + // highlight days from other months
							((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ?
							// or defaultDate is current printedDate and defaultDate is selectedDate
							' ' + this._dayOverClass : '') + // highlight selected day
							(unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled': '') +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
							(printDate.getTime() == currentDate.getTime() ? ' ' + this._currentClass : '') + // highlight selected day
							(printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
							(unselectable ? '' : ' data-handler="selectDay" data-event="click" data-month="' + printDate.getMonth() + '" data-year="' + printDate.getFullYear() + '"') + '>' + // actions
							(otherMonth && !showOtherMonths ? '&#xa0;' : // display for other months
							(unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' +
							(printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') +
							(printDate.getTime() == currentDate.getTime() ? ' ui-state-active' : '') + // highlight selected day
							(otherMonth ? ' ui-priority-secondary' : '') + // distinguish dates from other months
							'" href="#">' + printDate.getDate() + '</a>')) + '</td>'; // display selectable date
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjust(printDate);
					}
					calender += tbody + '</tr>';
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				calender += '</tbody></table>' + (isMultiMonth ? '</div>' + 
							((numMonths[0] > 0 && col == numMonths[1]-1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
				group += calender;
			}
			html += group;
		}
		html += buttonPanel + ($.browser.msie && parseInt($.browser.version,10) < 7 && !inst.inline ?
			'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
		inst._keyEvent = false;
		return html;
	},

	/* Generate the month and year header. */
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			secondary, monthNames, monthNamesShort) {
		var changeMonth = this._get(inst, 'changeMonth');
		var changeYear = this._get(inst, 'changeYear');
		var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
		var html = '<div class="ui-datepicker-title">';
		var monthHtml = '';
		// month selection
		if (secondary || !changeMonth)
			monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
		else {
			var inMinYear = (minDate && minDate.getFullYear() == drawYear);
			var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
			monthHtml += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
			for (var month = 0; month < 12; month++) {
				if ((!inMinYear || month >= minDate.getMonth()) &&
						(!inMaxYear || month <= maxDate.getMonth()))
					monthHtml += '<option value="' + month + '"' +
						(month == drawMonth ? ' selected="selected"' : '') +
						'>' + monthNamesShort[month] + '</option>';
			}
			monthHtml += '</select>';
		}
		if (!showMonthAfterYear)
			html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
		// year selection
		if ( !inst.yearshtml ) {
			inst.yearshtml = '';
			if (secondary || !changeYear)
				html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
			else {
				// determine range of years to display
				var years = this._get(inst, 'yearRange').split(':');
				var thisYear = new Date().getFullYear();
				var determineYear = function(value) {
					var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) :
						(value.match(/[+-].*/) ? thisYear + parseInt(value, 10) :
						parseInt(value, 10)));
					return (isNaN(year) ? thisYear : year);
				};
				var year = determineYear(years[0]);
				var endYear = Math.max(year, determineYear(years[1] || ''));
				year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
				endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
				inst.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';
				for (; year <= endYear; year++) {
					inst.yearshtml += '<option value="' + year + '"' +
						(year == drawYear ? ' selected="selected"' : '') +
						'>' + year + '</option>';
				}
				inst.yearshtml += '</select>';
				
				html += inst.yearshtml;
				inst.yearshtml = null;
			}
		}
		html += this._get(inst, 'yearSuffix');
		if (showMonthAfterYear)
			html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
		html += '</div>'; // Close datepicker_header
		return html;
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function(inst, offset, period) {
		var year = inst.drawYear + (period == 'Y' ? offset : 0);
		var month = inst.drawMonth + (period == 'M' ? offset : 0);
		var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
			(period == 'D' ? offset : 0);
		var date = this._restrictMinMax(inst,
			this._daylightSavingAdjust(new Date(year, month, day)));
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period == 'M' || period == 'Y')
			this._notifyChange(inst);
	},

	/* Ensure a date is within any min/max bounds. */
	_restrictMinMax: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		var newDate = (minDate && date < minDate ? minDate : date);
		newDate = (maxDate && newDate > maxDate ? maxDate : newDate);
		return newDate;
	},

	/* Notify change of month/year. */
	_notifyChange: function(inst) {
		var onChange = this._get(inst, 'onChangeMonthYear');
		if (onChange)
			onChange.apply((inst.input ? inst.input[0] : null),
				[inst.selectedYear, inst.selectedMonth + 1, inst]);
	},

	/* Determine the number of months to show. */
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, 'numberOfMonths');
		return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
	},

	/* Determine the current maximum date - ensure no time components are set. */
	_getMinMaxDate: function(inst, minMax) {
		return this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function(year, month) {
		return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst);
		var date = this._daylightSavingAdjust(new Date(curYear,
			curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
		if (offset < 0)
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		return ((!minDate || date.getTime() >= minDate.getTime()) &&
			(!maxDate || date.getTime() <= maxDate.getTime()));
	},

	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function(inst) {
		var shortYearCutoff = this._get(inst, 'shortYearCutoff');
		shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		return {shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, 'dayNamesShort'), dayNames: this._get(inst, 'dayNames'),
			monthNamesShort: this._get(inst, 'monthNamesShort'), monthNames: this._get(inst, 'monthNames')};
	},

	/* Format the given date for display. */
	_formatDate: function(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day == 'object' ? day :
			this._daylightSavingAdjust(new Date(year, month, day))) :
			this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
	}
});

/*
 * Bind hover events for datepicker elements.
 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
 * Global instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
 */ 
function bindHover(dpDiv) {
	var selector = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
	return dpDiv.bind('mouseout', function(event) {
			var elem = $( event.target ).closest( selector );
			if ( !elem.length ) {
				return;
			}
			elem.removeClass( "ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover" );
		})
		.bind('mouseover', function(event) {
			var elem = $( event.target ).closest( selector );
			if ($.datepicker._isDisabledDatepicker( instActive.inline ? dpDiv.parent()[0] : instActive.input[0]) ||
					!elem.length ) {
				return;
			}
			elem.parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
			elem.addClass('ui-state-hover');
			if (elem.hasClass('ui-datepicker-prev')) elem.addClass('ui-datepicker-prev-hover');
			if (elem.hasClass('ui-datepicker-next')) elem.addClass('ui-datepicker-next-hover');
		});
}

/* jQuery extend now ignores nulls! */
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props)
		if (props[name] == null || props[name] == undefined)
			target[name] = props[name];
	return target;
};

/* Determine whether an object is an array. */
function isArray(a) {
	return (a && (($.browser.safari && typeof a == 'object' && a.length) ||
		(a.constructor && a.constructor.toString().match(/\Array\(\)/))));
};

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
                    Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function(options){
	
	/* Verify an empty collection wasn't passed - Fixes #6976 */
	if ( !this.length ) {
		return this;
	}
	
	/* Initialise the date picker. */
	if (!$.datepicker.initialized) {
		$(document).mousedown($.datepicker._checkExternalClick).
			find('body').append($.datepicker.dpDiv);
		$.datepicker.initialized = true;
	}

	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate' || options == 'widget'))
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	return this.each(function() {
		typeof options == 'string' ?
			$.datepicker['_' + options + 'Datepicker'].
				apply($.datepicker, [this].concat(otherArgs)) :
			$.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
$.datepicker.initialized = false;
$.datepicker.uuid = new Date().getTime();
$.datepicker.version = "1.8.23";

// Workaround for #4055
// Add another global to avoid noConflict issues with inline event handlers
window['DP_jQuery_' + dpuuid] = $;

})(jQuery);
!function(a,b){"function"==typeof define&&define.amd?define(["is"],function(c){return a.is=b(c)}):"object"==typeof exports?module.exports=b(require("is_js")):a.is=b(a.is)}(this,function(a){function b(a){return function(){return!a.apply(null,j.call(arguments))}}function c(b){return function(){var c=j.call(arguments),d=c.length;1===d&&a.array(c[0])&&(c=c[0],d=c.length);for(var e=0;d>e;e++)if(!b.call(null,c[e]))return!1;return!0}}function d(b){return function(){var c=j.call(arguments),d=c.length;1===d&&a.array(c[0])&&(c=c[0],d=c.length);for(var e=0;d>e;e++)if(b.call(null,c[e]))return!0;return!1}}function e(b,c){a[b]=function(a){return c[b].test(a)}}function f(){var e=a;for(var f in e)if(k.call(e,f)&&a["function"](e[f]))for(var g=e[f].api||["not","all","any"],h=0;h<g.length;h++)"not"===g[h]&&(a.not[f]=b(a[f])),"all"===g[h]&&(a.all[f]=c(a[f])),"any"===g[h]&&(a.any[f]=d(a[f]))}var g=this||global,h=g.is;a={},a.VERSION="0.7.3",a.not={},a.all={},a.any={};var i=Object.prototype.toString,j=Array.prototype.slice,k=Object.prototype.hasOwnProperty;a.arguments=function(b){return a.not["null"](b)&&("[object Arguments]"===i.call(b)||"object"==typeof b&&"callee"in b)},a.array=Array.isArray||function(a){return"[object Array]"===i.call(a)},a["boolean"]=function(a){return a===!0||a===!1||"[object Boolean]"===i.call(a)},a.date=function(a){return"[object Date]"===i.call(a)},a.error=function(a){return"[object Error]"===i.call(a)},a["function"]=function(a){return"[object Function]"===i.call(a)||"function"==typeof a},a.nan=function(a){return a!==a},a["null"]=function(a){return null===a||"[object Null]"===i.call(a)},a.number=function(b){return a.not.nan(b)&&"[object Number]"===i.call(b)},a.object=function(a){var b=typeof a;return"function"===b||"object"===b&&!!a},a.json=function(a){return"[object Object]"===i.call(a)},a.regexp=function(a){return"[object RegExp]"===i.call(a)},a.sameType=function(b,c){return a.nan(b)||a.nan(c)?a.nan(b)===a.nan(c):i.call(b)===i.call(c)},a.sameType.api=["not"],a.string=function(a){return"[object String]"===i.call(a)},a["char"]=function(b){return a.string(b)&&1===b.length},a.undefined=function(a){return void 0===a},a.empty=function(b){if(a.object(b)){var c=Object.getOwnPropertyNames(b).length;return 0===c||1===c&&a.array(b)||2===c&&a.arguments(b)?!0:!1}return""===b},a.existy=function(a){return null!==a&&void 0!==a},a.truthy=function(b){return a.existy(b)&&b!==!1&&a.not.nan(b)&&""!==b&&0!==b},a.falsy=b(a.truthy),a.space=function(b){if(a["char"](b)){var c=b.charCodeAt(0);return c>8&&14>c||32===c}return!1},a.equal=function(b,c){return a.all.number(b,c)?b===c&&1/b===1/c:a.all.string(b,c)||a.all.regexp(b,c)?""+b==""+c:a.all["boolean"](b,c)?b===c:!1},a.equal.api=["not"],a.even=function(b){return a.number(b)&&b%2===0},a.odd=function(b){return a.number(b)&&b%2!==0},a.positive=function(b){return a.number(b)&&b>0},a.negative=function(b){return a.number(b)&&0>b},a.above=function(b,c){return a.all.number(b,c)&&b>c},a.above.api=["not"],a.under=function(b,c){return a.all.number(b,c)&&c>b},a.under.api=["not"],a.within=function(b,c,d){return a.all.number(b,c,d)&&b>c&&d>b},a.within.api=["not"],a.decimal=function(b){return a.number(b)&&b%1!==0},a.integer=function(b){return a.number(b)&&b%1===0},a.finite=isFinite||function(b){return b!==1/0&&b!==-(1/0)&&a.not.nan(b)},a.infinite=b(a.finite);var l={url:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,creditCard:/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,alphaNumeric:/^[A-Za-z0-9]+$/,timeString:/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,dateString:/^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,usZipCode:/^[0-9]{5}(?:-[0-9]{4})?$/,caPostalCode:/^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,ukPostCode:/^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,nanpPhone:/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,eppPhone:/^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,socialSecurityNumber:/^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,affirmative:/^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,hexadecimal:/^[0-9a-fA-F]+$/,hexColor:/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,ipv4:/^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,ipv6:/^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,ip:/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/};for(var m in l)l.hasOwnProperty(m)&&e(m,l);a.include=function(a,b){return a.indexOf(b)>-1},a.include.api=["not"],a.upperCase=function(b){return a.string(b)&&b===b.toUpperCase()},a.lowerCase=function(b){return a.string(b)&&b===b.toLowerCase()},a.startWith=function(b,c){return a.string(b)&&0===b.indexOf(c)},a.startWith.api=["not"],a.endWith=function(b,c){return a.string(b)&&b.indexOf(c)>-1&&b.indexOf(c)===b.length-c.length},a.endWith.api=["not"],a.capitalized=function(b){if(a.not.string(b))return!1;for(var c=b.split(" "),d=[],e=0;e<c.length;e++)d.push(c[e][0]===c[e][0].toUpperCase());return a.all.truthy.apply(null,d)},a.palindrome=function(b){return a.string(b)&&b==b.split("").reverse().join("")};var n=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],o=["january","february","march","april","may","june","july","august","september","october","november","december"];if(a.today=function(b){var c=new Date,d=c.toDateString();return a.date(b)&&b.toDateString()===d},a.yesterday=function(b){var c=new Date,d=new Date(c.setDate(c.getDate()-1)).toDateString();return a.date(b)&&b.toDateString()===d},a.tomorrow=function(b){var c=new Date,d=new Date(c.setDate(c.getDate()+1)).toDateString();return a.date(b)&&b.toDateString()===d},a.past=function(b){var c=new Date;return a.date(b)&&b.getTime()<c.getTime()},a.future=b(a.past),a.day=function(b,c){return a.date(b)&&c.toLowerCase()===n[b.getDay()]},a.day.api=["not"],a.month=function(b,c){return a.date(b)&&c.toLowerCase()===o[b.getMonth()]},a.month.api=["not"],a.year=function(b,c){return a.date(b)&&a.number(c)&&c===b.getFullYear()},a.year.api=["not"],a.leapYear=function(b){return a.number(b)&&(b%4===0&&b%100!==0||b%400===0)},a.weekend=function(b){return a.date(b)&&(6===b.getDay()||0===b.getDay())},a.weekday=b(a.weekend),a.inDateRange=function(b,c,d){if(a.not.date(b)||a.not.date(c)||a.not.date(d))return!1;var e=b.getTime(),f=c.getTime(),g=d.getTime();return e>f&&g>e},a.inDateRange.api=["not"],a.inLastWeek=function(b){return a.inDateRange(b,new Date((new Date).setDate((new Date).getDate()-7)),new Date)},a.inLastMonth=function(b){return a.inDateRange(b,new Date((new Date).setMonth((new Date).getMonth()-1)),new Date)},a.inLastYear=function(b){return a.inDateRange(b,new Date((new Date).setFullYear((new Date).getFullYear()-1)),new Date)},a.inNextWeek=function(b){return a.inDateRange(b,new Date,new Date((new Date).setDate((new Date).getDate()+7)))},a.inNextMonth=function(b){return a.inDateRange(b,new Date,new Date((new Date).setMonth((new Date).getMonth()+1)))},a.inNextYear=function(b){return a.inDateRange(b,new Date,new Date((new Date).setFullYear((new Date).getFullYear()+1)))},a.quarterOfYear=function(b,c){return a.date(b)&&a.number(c)&&c===Math.floor((b.getMonth()+3)/3)},a.quarterOfYear.api=["not"],a.dayLightSavingTime=function(a){var b=new Date(a.getFullYear(),0,1),c=new Date(a.getFullYear(),6,1),d=Math.max(b.getTimezoneOffset(),c.getTimezoneOffset());return a.getTimezoneOffset()<d},"undefined"!=typeof window){var p="navigator"in window&&"userAgent"in navigator&&navigator.userAgent.toLowerCase()||"",q="navigator"in window&&"vendor"in navigator&&navigator.vendor.toLowerCase()||"",r="navigator"in window&&"appVersion"in navigator&&navigator.appVersion.toLowerCase()||"";a.chrome=function(){return/chrome|chromium/i.test(p)&&/google inc/.test(q)},a.chrome.api=["not"],a.firefox=function(){return/firefox/i.test(p)},a.firefox.api=["not"],a.ie=function(a){return a?a>=11?"ActiveXObject"in window:new RegExp("msie "+a).test(p):/msie/i.test(p)||"ActiveXObject"in window},a.ie.api=["not"],a.opera=function(){return/^Opera\//.test(p)||/\x20OPR\//.test(p)},a.opera.api=["not"],a.safari=function(){return/safari/i.test(p)&&/apple computer/i.test(q)},a.safari.api=["not"],a.ios=function(){return a.iphone()||a.ipad()||a.ipod()},a.ios.api=["not"],a.iphone=function(){return/iphone/i.test(p)},a.iphone.api=["not"],a.ipad=function(){return/ipad/i.test(p)},a.ipad.api=["not"],a.ipod=function(){return/ipod/i.test(p)},a.ipod.api=["not"],a.android=function(){return/android/i.test(p)},a.android.api=["not"],a.androidPhone=function(){return/android/i.test(p)&&/mobile/i.test(p)},a.androidPhone.api=["not"],a.androidTablet=function(){return/android/i.test(p)&&!/mobile/i.test(p)},a.androidTablet.api=["not"],a.blackberry=function(){return/blackberry/i.test(p)||/BB10/i.test(p)},a.blackberry.api=["not"],a.desktop=function(){return a.not.mobile()&&a.not.tablet()},a.desktop.api=["not"],a.linux=function(){return/linux/i.test(r)},a.linux.api=["not"],a.mac=function(){return/mac/i.test(r)},a.mac.api=["not"],a.windows=function(){return/win/i.test(r)},a.windows.api=["not"],a.windowsPhone=function(){return a.windows()&&/phone/i.test(p)},a.windowsPhone.api=["not"],a.windowsTablet=function(){return a.windows()&&a.not.windowsPhone()&&/touch/i.test(p)},a.windowsTablet.api=["not"],a.mobile=function(){return a.iphone()||a.ipod()||a.androidPhone()||a.blackberry()||a.windowsPhone()},a.mobile.api=["not"],a.tablet=function(){return a.ipad()||a.androidTablet()||a.windowsTablet()},a.tablet.api=["not"],a.online=function(){return navigator.onLine},a.online.api=["not"],a.offline=b(a.online),a.offline.api=["not"],a.touchDevice=function(){return"ontouchstart"in window||"DocumentTouch"in window&&document instanceof DocumentTouch},a.touchDevice.api=["not"]}return a.propertyCount=function(b,c){if(!a.object(b)||!a.number(c))return!1;if(Object.keys)return Object.keys(b).length===c;var d,e=[];for(d in b)k.call(b,d)&&e.push(d);return e.length===c},a.propertyCount.api=["not"],a.propertyDefined=function(b,c){return a.object(b)&&a.string(c)&&c in b},a.propertyDefined.api=["not"],a.windowObject=function(a){return"object"==typeof a&&"setInterval"in a},a.domNode=function(b){return a.object(b)&&b.nodeType>0},a.inArray=function(b,c){if(a.not.array(c))return!1;for(var d=0;d<c.length;d++)if(c[d]===b)return!0;return!1},a.inArray.api=["not"],a.sorted=function(b){if(a.not.array(b))return!1;for(var c=0;c<b.length;c++)if(b[c]>b[c+1])return!1;return!0},f(),a.setRegexp=function(a,b){for(var c in l)k.call(l,c)&&b===c&&(l[c]=a)},a.setNamespace=function(){return g.is=h,this},a});
(function (main) {
	'use strict';

	/**
	 * Parse or format dates
	 * @class fecha
	 */
	var fecha = {},
		token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,
		dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		amPm = ['am', 'pm'],
		twoDigits = /\d\d?/, threeDigits = /\d{3}/, fourDigits = /\d{4}/,
		word = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
		noop = function () {},
		dayNamesShort = [], monthNamesShort = [],
		parseFlags = {
			D: [twoDigits, function (d, v) {
				d.day = v;
			}],
			M: [twoDigits, function (d, v) {
				d.month = v - 1;
			}],
			YY: [twoDigits, function (d, v) {
				var da = new Date(), cent = +('' + da.getFullYear()).substr(0, 2);
				d.year = '' + (v > 68 ? cent - 1 : cent) + v;
			}],
			h: [twoDigits, function (d, v) {
				d.hour = v;
			}],
			m: [twoDigits, function (d, v) {
				d.minute = v;
			}],
			s: [twoDigits, function (d, v) {
				d.second = v;
			}],
			YYYY: [fourDigits, function (d, v) {
				d.year = v;
			}],
			S: [/\d/, function (d, v) {
				d.millisecond = v * 100;
			}],
			SS: [/\d{2}/, function (d, v) {
				d.millisecond = v * 10;
			}],
			SSS: [threeDigits, function (d, v) {
				d.millisecond = v;
			}],
			d: [twoDigits, noop],
			ddd: [word, noop],
			MMM: [word, monthUpdate('monthNamesShort')],
			MMMM: [word, monthUpdate('monthNames')],
			a: [word, function (d, v) {
				if (amPm.indexOf(v.toLowerCase())) {
					d.isPm = true;
				}
			}],
			ZZ: [/[\+\-]\d\d:?\d\d/, function (d, v) {
				var parts = (v + '').match(/([\+\-]|\d\d)/gi), minutes;

				if (parts) {
					minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
					d.timezoneOffset = parts[0] === '+' ? minutes : -minutes;
				}

			}]
		};
	parseFlags.dd = parseFlags.d;
	parseFlags.dddd = parseFlags.ddd;
	parseFlags.Do = parseFlags.DD = parseFlags.D;
	parseFlags.mm = parseFlags.m;
	parseFlags.hh = parseFlags.H = parseFlags.HH = parseFlags.h;
	parseFlags.MM = parseFlags.M;
	parseFlags.ss = parseFlags.s;
	parseFlags.A = parseFlags.a;

	shorten(monthNames, monthNamesShort, 3);
	shorten(dayNames, dayNamesShort, 3);

	function monthUpdate(arrName) {
		return function (d, v) {
			var index = fecha.i18n[arrName].indexOf(v.charAt(0).toUpperCase() + v.substr(1).toLowerCase());
			if (~index) {
				d.month = index;
			}
		}
	}

	function pad(val, len) {
		val = String(val);
		len = len || 2;
		while (val.length < len) {
			val = '0' + val;
		}
		return val;
	}

	function shorten(arr, newArr, sLen) {
		for (var i = 0, len = arr.length; i < len; i++) {
			newArr.push(arr[i].substr(0, sLen));
		}
	}

	function DoFn(D) {
		return D + [ 'th', 'st', 'nd', 'rd' ][ D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10 ];
	}

	fecha.i18n = {
		dayNamesShort: dayNamesShort,
		dayNames: dayNames,
		monthNamesShort: monthNamesShort,
		monthNames: monthNames,
		amPm: amPm,
		DoFn: DoFn
	};

	// Some common format strings
	fecha.masks = {
		'default': 'ddd MMM DD YYYY HH:mm:ss',
		shortDate: 'M/D/YY',
		mediumDate: 'MMM D, YYYY',
		longDate: 'MMMM D, YYYY',
		fullDate: 'dddd, MMMM D, YYYY',
		shortTime: 'HH:mm',
		mediumTime: 'HH:mm:ss',
		longTime: 'HH:mm:ss.SSS'
	};

	/***
	 * Format a date
	 * @method format
	 * @param {Date|string} dateObj
	 * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
	 */
	fecha.format = function (dateObj, mask) {
		// Passing date through Date applies Date.parse, if necessary
		if (typeof dateObj === 'string') {
			dateObj = fecha.parse(dateObj);
		} else if (!dateObj) {
			dateObj = new Date();
		}
		if (isNaN(dateObj)) {
			throw new SyntaxError('invalid date');
		}

		mask = fecha.masks[mask] || mask || fecha.masks['default'];

		var D = dateObj.getDate(),
			d = dateObj.getDay(),
			M = dateObj.getMonth(),
			y = dateObj.getFullYear(),
			H = dateObj.getHours(),
			m = dateObj.getMinutes(),
			s = dateObj.getSeconds(),
			S = dateObj.getMilliseconds(),
			o = dateObj.getTimezoneOffset(),
			flags = {
				D: D,
				DD: pad(D),
				Do: fecha.i18n.DoFn(D),
				d: d,
				dd: pad(d),
				ddd: fecha.i18n.dayNamesShort[d],
				dddd: fecha.i18n.dayNames[d],
				M: M + 1,
				MM: pad(M + 1),
				MMM: fecha.i18n.monthNamesShort[M],
				MMMM: fecha.i18n.monthNames[M],
				YY: String(y).slice(2),
				YYYY: y,
				h: H % 12 || 12,
				hh: pad(H % 12 || 12),
				H: H,
				HH: pad(H),
				m: m,
				mm: pad(m),
				s: s,
				ss: pad(s),
				S: Math.round(S / 100),
				SS: pad(Math.round(S / 10), 2),
				SSS: pad(S, 3),
				a: H < 12 ? fecha.i18n.amPm[0] : fecha.i18n.amPm[1],
				A: H < 12 ? fecha.i18n.amPm[0].toUpperCase() : fecha.i18n.amPm[1].toUpperCase(),
				ZZ: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4)
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};

	/**
	 * Parse a date string into an object, changes - into /
	 * @method parse
	 * @param {string} dateStr Date string
	 * @param {string} format Date parse format
	 * @returns {Date|boolean}
	 */
	fecha.parse = function (dateStr, format) {
		var time, isValid, dateInfo, today, date, info, index;

		if (!format) {
			time = Date.parse(dateStr.replace(/\-/g, '/'));
			if (!isNaN(time)) {
				return new Date(time);
			} else {
				return false;
			}

		} else {
			format = fecha.masks[format] || format;

			isValid = true;
			dateInfo = {};
			format.replace(token, function ($0) {
				if (parseFlags[$0]) {
					info = parseFlags[$0];
					index = dateStr.search(info[0]);
					if (!~index) {
						isValid = false;
					} else {
						dateStr.replace(info[0], function (result) {
							info[1](dateInfo, result);
							dateStr = dateStr.substr(index + result.length);
							return result;
						});
					}
				}

				return parseFlags[$0] ? '' : $0.slice(1, $0.length - 1);
			});
		}

		if (!isValid) {
			return false;
		}

		today = new Date();
		if (dateInfo.isPm && dateInfo.hour) {
			dateInfo.hour = +dateInfo.hour + 12
		}

		if (dateInfo.timezoneOffset) {
			dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
			date = new Date(Date.UTC(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
				dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0));
		} else {
			date = new Date(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
				dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0);
		}
		return date;
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = fecha;
	} else if (typeof require !== 'undefined' && require.amd) {
		define(function () {
			return fecha;
		});
	} else {
		main.fecha = fecha;
	}
})(this);
