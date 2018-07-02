sap.ui.define([], function (thisIns, thatWin) {
    "use strict";

    return {
        addGlobalVariables: function (window) {
            thatWin = window;
            this.s4start = {
                intervalsetter: undefined, checkMouseDown: false,checkKeydown:false, actions: [], tempFrameId: "", tempvalueInput: "", frameid: "", start_clickedtableEleId: ' ', Start_table_coloumn_number: 0, table_rowno: undefined, table_element: undefined,
                webdynpro: false, start_coloumnAdded: false,start_tableEleTd:' ',start_tableTd:' ',prepostElement: undefined,
                mousex: undefined, mousey: undefined, ldivx: 1400, ldivy: 80, move: undefined, defineExportImport: false,checkSelectionRow:false, columnLabelThElements: [],
                defineCheck: false, enablehighlighter: undefined, currentobject: undefined, start_clickedtabletrId: undefined, start_clickedtabletrElement: undefined,
                toastMessage: undefined, isStopClick: false, isAdded: false,pevElementIdforImpChk:"",prevEvent:undefined,hoverEvent:undefined,timeTaken:undefined
            };
        },
        addGlobalFunctions: function (window) {
            thatWin = window;
            var that = this.s4start;
            that.getSID = function (string) {
    	        try{
    	            string = string.substr(string.indexOf("SID") + 5);
    	            string = string.split("\'")[0];
    	            return string;
    	        } catch (ex) { return "";}
    	    };
            that.getUiTechForWGWD = function (window) {
                var retval = '';
                var element = window.document.getElementsByName('sap-wd-configId');
                if (element.length === 0) {
                    element = window.document.getElementsByName('~transaction');
                    if (element.length !== 0) {
                        retval = 'HTMLGUI' + '&~&' + element[0].value;
                        return retval;
                    }
                } else {
                    retval = 'WEBDYNPRO' + '&~&' + element[0].value;
                    return retval;
                }
                if (window.frames.length > 0) {
                    for (var i = 0; i < window.frames.length; i++) {
                        if (retval == '') {
                            retval = that.getUiTechForWGWD(window.frames[i].window);
                            if (retval !== ''){ 
                            	return retval;
                            }
                        } else {
                            return retval;
                        }
                    }
                } else {
                	var hrefVal;
                	hrefVal = that.location;
                    if (hrefVal.indexOf("sap-wd-configId") !== -1) {
                        retval = hrefVal.substring(hrefVal.indexOf("sap-wd-configId") + "sap-wd-configId".length+1);
                        retval = retval.split("&")[0];
                        var  lastIndex = 0;
                        if (retval.charAt(0) === "%") {
                            lastIndex = 1;
                            while (!isNaN(Number(retval.charAt(lastIndex)))) {
                                lastIndex++;
                            }
                            retval = retval.substring(lastIndex);
                        }
                        return 'WEBDYNPRO' + '&~&' + retval;
                    }

                    return '';
                }
            };    
            
            that.checkWD = function (window) {
            var retval;
            if(window.document.querySelectorAll("[ct]").length == 0) {
                for (var i = 0; i < window.frames.length; i++) {
                        if (!retval) {
                            retval = that.checkWD(window.frames[i].window);
                            if (retval){
                            	return retval;
                            }
                        } else {
                            return retval;
                        }
                }
            }   
            else {
                return true;
            }
        };
            that.addAssistedPanel = function (win) {

                var customClassFo = win.document.createElement('style');
                customClassFo.type = 'text/css';
                var innertTextClasses = win.document.createTextNode('.STARTAssistedView > span:hover  { opacity:0.6}.STARTiconimages{width:50px;height:50px;}.STARTiconimagesTop{width:50px;height:50px;margin-left:15px;margin-top:12px}.STARTAssistedView{z-index:9999999;position:fixed;top:100px;left:100px;right:0;bottom:0;height:100px;width:170px;background-color:rgb(178,202,224);border-radius:10px 10px}.STARThead{position:relative;background-color:black;height:30px;color:white;font-weight:900;font-size:medium;margin:auto;text-align:center;font-style:oblique;opacity:0.7;vertical-align:middle}');
                customClassFo.appendChild(innertTextClasses);
                win.document.head.appendChild(customClassFo);

                var startAssistedPanel = win.document.createElement("div");
                startAssistedPanel.id = "startAssistedPanel";
                startAssistedPanel.className = "STARTAssistedView";
                var startTestcaseHeading = win.document.createElement("div");
                startTestcaseHeading.id = "startTestcaseHeading";
                startTestcaseHeading.className = "STARThead";
                // var textHead = win.document.createTextNode("START Panel");
                startTestcaseHeading.innerText = thisIns.resourceBundle.getText("YMSG_PANEL_TEXT");
                startAssistedPanel.appendChild(startTestcaseHeading);

                var StartaCheckButton = win.document.createElement("span");
                StartaCheckButton.href = "#";
                StartaCheckButton.className = "STARTdummy";
                StartaCheckButton.id = "startCheck";
                StartaCheckButton.title =thisIns.resourceBundle.getText("XTOL_PANEL_CHECK");
                var StartIconImageCheck = win.document.createElement("img");
                StartIconImageCheck.id = "startCheckIMG";
                StartIconImageCheck.src =  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD3SURBVFhHY9x06sF/hgEETFB6wMCoA0YdMOoAguVA0/TlUBZ5oC4zEsrCDohyACFDcAFi9I6mAao64NHz1wxLtx5gePD0FVSEMKCaA0CWL9t6kOHuo+cMj17Q2QEwy3/9/s2gpSzHYGOkBZUhDIh2wJv3nxhmr9nFcObqHagIBKBbHuRqycDESLy/iFb5+89vhpdv3jNsO3Sa4eTFm2AxSi0HAaJVS4oKwy3Yeewcw/YjZym2HARI0oFs0enLtyi2HARI1oVsIaWWgwBZOkEWx/k7UWw5CJCtW05SlGLLQYByEygEg786pjUY8CgYdcCoA0a6AxgYAKZpdAN8q735AAAAAElFTkSuQmCC";
                StartIconImageCheck.className = "STARTiconimagesTop";
                StartaCheckButton.appendChild(StartIconImageCheck);
                startAssistedPanel.appendChild(StartaCheckButton);

                var StartaCheckButton1 = win.document.createElement("span");
                StartaCheckButton1.id = "startExportImport";
                StartaCheckButton1.className = "STARTdummy";
                StartaCheckButton1.href = "#";
                StartaCheckButton1.title = thisIns.resourceBundle.getText("XTOL_PANEL_EXPORT");
                var StartIconImageExpImp = win.document.createElement("img");
                StartIconImageExpImp.id = "startExportImportIMG";
                StartIconImageExpImp.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGPSURBVFhHY9x06sF/hgEETFB6wMCoA0YdMOqAAXcAwYLo4o37UBZ+wMPFwaAsJwnlEQ8IOqBp+nIGGXFhBhYWZqgIJvjy7QfYAXF+zlAR4gFRDsiP8WPg5+WGimCCu4+eM9x58pzB0VSXgY2VFSpKHKBKGgAFvbuVEcOzV+8Zdh47BxUlDlDFAf/+/2P4+Pkrw9dv3xlOXrxJkiPIjoJHz18zXLn9gOEOMPg/AC1HB+b66uBQIQRIDoFPX78xLNq0l2HBhj0MZ67ewWo5CBAbEiQ5AGT5nDU7GR48fQUVoRyQ5ICN+04y/Pv3n0FNXprB0kCTwcfBjMHf0YLBy84UzAdlVxBgYmQCBz8xUUB0Gvj+8xfDqcs3GdyAhnKws0FlUQEoZJZtPcAQ4GzBoKUsBxXFD4gOARZmZrCPcVkOAhzsrAwxvo5EWw4CRDtARJAPHLTYAKggAiU4CRFBBjlJUagocYCoKAD5iI0Vd1H87uMXBiYmRtoUxQNeGdEakJQNaQFGHTDqgFEHDLADGBgAQWiWQ8nVn9MAAAAASUVORK5CYII=";
                StartIconImageExpImp.className = "STARTiconimages";
                StartaCheckButton1.appendChild(StartIconImageExpImp);
                startAssistedPanel.appendChild(StartaCheckButton1);


                var StartaCheckButton2 = win.document.createElement("span");
                StartaCheckButton2.href = "#";
                StartaCheckButton2.className = "STARTdummy";
                StartaCheckButton2.id = "startStopRecord";
                StartaCheckButton2.title = thisIns.resourceBundle.getText("XTOL_PANEL_STOP");
                var StartIconImagestprec = win.document.createElement("img");
                StartIconImagestprec.id = "startStopRecordIMG";
                StartIconImagestprec.src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJOSURBVFhH7ZXvS1NRGMe/umaR6dwPt5ziqFWYKzB/BP1aQUPCF0HU6+hFf1V/QdCLQEKIkMReLCfRbEXTIGes5rbrlmZjRmr3e3aGG3V37oXCF+0Dl8t9Dofne57zfZ7bMhlL7WIfaZXvfaMpoCmgKcDyHNgslfHuwwq+aAVkta8i5vN0we9xYeB4Hxwd7SJmFksCkstpPJmJoVTewqGDbejpdsFusyGd1USszW7H+KVzGD4dlDvUmBbwLBpHNP4eRz1OTITH0Odzy5UKWnEDUy/mkfqcQ+hkALcjF+VKY0x5gCdn8tHQCdy/M/5bcuJxduLuzeu4dv6suKL5xJJcaYxSAO+cZefJb1wZQWtL4y3hkTM4FegVFWNVVCgF8DS8X5a9mvxTJo/J5y/rHlapysTVUezs7OJ18qOMGKMUQLfTcLVlL65vIp5crnuya5WOIJ3th+F1O7CqFWXEGKUAthrdbhW/vieTL8gvY5QCfm5vi1aziu2ATVyDCqUAmo99bpX06pq+t0t+GaMU0Ot1CRPWOtrpOIKhgWN1j8+9l6y89QP5gn51+l4VykFUWP+GB4+ewu91ij43A7vizeIK7t2K/HFm1KKsgMvRgciFITHhZl+9lVFjEksp0RWXhweVyYlSAOEEHAz2YyaWwMOpWWx8L8mVPVh2nvzxdBT9Pd0Ij4XkSmMs/YzmFhYxPbcg3M0+Z6vR7TQc75xxnpzJVROziuXfcU5PxAmXyRX0QVMZPnQ7DRcKBkyVvRbLAv425ur0D2kKaAr43wUAvwBMafYTNcQUKAAAAABJRU5ErkJggg==";
                StartIconImagestprec.className = "STARTiconimages";
                StartaCheckButton2.appendChild(StartIconImagestprec);
                startAssistedPanel.appendChild(StartaCheckButton2);
                win.document.body.insertBefore(startAssistedPanel, win.document.body.firstChild);
            };
            that.addCheckExportPopUps = function (win) {            var customClassFo = win.document.createElement('style');
            customClassFo.type = 'text/css';

            var innertTextClasses = win.document.createTextNode(".STARTButtonCancel{background-color: rgb(51,122,183);border-color: rgb(46,109,164);color: rgb(255,255,255);}.STARToutervisible{ position: fixed;z-index: 999999; padding-top: 100px; left: 0; top: 0;            width: 100%;            height: 100%;            overflow: auto;            background-color: rgb(0,0,0);            background-color: rgba(0,0,0,0.4);}.STARTouter {display: none; position: fixed;z-index: 999999; padding-top: 100px; left: 0; top: 0;            width: 100%;            height: 100%;            overflow: auto;            background-color: rgb(0,0,0);            background-color: rgba(0,0,0,0.4);} .STARTouter-content {position: relative;background-color: white;margin: auto;padding: 0;border-radius: 10px;width: 30%;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)-webkit-animation-name: animatetop;-webkit-animation-duration: 0.4s;animation-name:animatetop;animation-duration: 0.4s;}  @-webkit-keyframes animatetop { from { top: -300px;opacity: 0;}to {top: 0;opacity: 1;}} @keyframes animatetop {from {top: -300px;opacity: 0;}to {top: 0;opacity: 1;}}.STARTclose {color:black;float: right;font-size: 28px;font-weight: bold;}.STARTclose:hover,.STARTclose:focus { color: rgb(0,0,0); text-decoration:none; cursor: pointer; }.STARTouter-header {padding: 2px 14px;color: black; border-style: none none solid none; border-color: grey;border-width: 1px;}.STARTouter-body { padding: 2px 16px;}.STARTouter-footer {padding: 15px;text-align: right;border-top: 1px solid rgb(229,229,229); }.STARTButton { display: inline-block;padding: 6px 12px; margin-bottom: 0; font-size: 14px;font-weight: 400; line-height: 1.42857143;text-align: center;white-space: nowrap;vertical-align: middle; cursor: pointer; -webkit-user-select: none; -moz-user-select: none;  -ms-user-select: none; user-select: none;background-image: none;  border: 1px solid transparent; border-radius: 4px;margin-right:7px;border-color: rgb(204,204,204);}.STARTradio {padding: 7px 12px;background-color: rgb(238,238,238);border: 1px solid rgb(238,238,238);font-size: 14px; font-weight: 400;line-height: 1; color: rgb(85,85,85);text-align: center;border-radius: 4px;}.STARTtext {display: inline-block;padding: 6px 16px;width: 80%;font-size: 14px; line-height: 1.42857143;color: rgb(85,85,85);background-color: rgb(255,255,255); background-image: none;border: 1px solid rgb(204,204,204);border-radius: 4px;webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075); box-shadow: inset 0 1px 1px rgba(0,0,0,.075); -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;            -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;margin-bottom:18px;margin-top:4px;}");



            customClassFo.appendChild(innertTextClasses);
            win.document.head.appendChild(customClassFo);


            var STARTmodel = win.document.createElement("div");
            STARTmodel.id = "STARTouter_imp_expmodel";
            STARTmodel.className = "STARTouter";
            STARTmodel.id = "STARTouter_imp_exp";
            var STARTouter = win.document.createElement("div");
            STARTouter.id = "STARTouter_imp_exp345";
            STARTouter.className = "STARTouter-content";
            STARTmodel.appendChild(STARTouter);

            var STARTHeader = win.document.createElement("div");
            STARTHeader.className = "STARTouter-header";
            STARTouter.appendChild(STARTHeader);
            var startexpimpspanclose = win.document.createElement('span');
            startexpimpspanclose.innerText = "×";
            startexpimpspanclose.className = "STARTclose";
            STARTHeader.appendChild(startexpimpspanclose);
            var startexpimpheading = win.document.createElement('h3');
            startexpimpheading.innerText = "Export";
            STARTHeader.appendChild(startexpimpheading);


            var STARTbody = win.document.createElement("div");
            STARTbody.className = "STARTouter-body";
            STARTouter.appendChild(STARTbody);

            var STARTfooter = win.document.createElement("div");
            STARTfooter.className = "STARTouter-footer";
            STARTouter.appendChild(STARTfooter);


            // 1st radio 
            var startexpimplbl = win.document.createElement('label');
            startexpimplbl.className = "STARTradio";
            startexpimplbl.setAttribute("style", "display:none");
            STARTbody.appendChild(startexpimplbl);

            var startexpimpckbox = win.document.createElement('input');
            startexpimpckbox.id = 'exp_imp_rb_id';
            startexpimpckbox.type = 'radio';
            startexpimpckbox.name = "startexportcheck";
            startexpimpckbox.setAttribute("style", "display:none");
            startexpimplbl.appendChild(startexpimpckbox);


            var startexpimpinput = win.document.createElement('input');
            startexpimpinput.id = 'start_expimp_input';
            startexpimpinput.type = 'text';
            startexpimpinput.placeholder = "Input to Test Case..";
            startexpimpinput.className = "STARTtext";
            startexpimpinput.setAttribute("style", "display:none");
            STARTbody.appendChild(startexpimpinput);

            // 2nd radio

            var startexpimplbl1 = win.document.createElement('label');
            startexpimplbl1.className = "STARTradio";


            var startexpimpckbox1 = win.document.createElement('input');
            startexpimpckbox1.id = 'exp_imp_rb_id1';
            startexpimpckbox1.type = 'radio';
            startexpimpckbox1.name = "startexportcheck";
            startexpimplbl1.appendChild(startexpimpckbox1);
            STARTbody.appendChild(startexpimplbl1);

            var startexpimpinput1 = win.document.createElement('input');
            startexpimpinput1.id = 'start_expimp_input1';
            startexpimpinput1.type = 'text';
            startexpimpinput1.placeholder = "Output from Test Case";
            startexpimpinput1.className = "STARTtext";
            STARTbody.appendChild(startexpimpinput1);

            // buttons

            var exp_imp_okButton = win.document.createElement('button');
            exp_imp_okButton.className = "STARTButton";
            exp_imp_okButton.id = 'exp_imp_canButton';
            exp_imp_okButton.innerText = "Close";
            STARTfooter.appendChild(exp_imp_okButton);
            // creat cancel
            var exp_imp_canButton = win.document.createElement('button');
            exp_imp_canButton.className = "STARTButton STARTButtonCancel";
            exp_imp_canButton.id = 'exp_imp_okButton';
            exp_imp_canButton.innerText = "Save changes";
            STARTfooter.appendChild(exp_imp_canButton);
            win.document.body.insertBefore(STARTmodel, win.document.body.firstChild);
            // win.document.body.appendChild(STARTouter);
            //

            var STARTmodel1 = win.document.createElement("div");
            STARTmodel1.id = "STARTouterchk_id";
            STARTmodel1.className = "STARTouter";

            var STARTouter1 = win.document.createElement("div");
            STARTouter1.id = "STARTouter1_imp_exp";
            STARTouter1.className = "STARTouter-content";
            STARTmodel1.appendChild(STARTouter1);

            var STARTHeader1 = win.document.createElement("div");
            STARTHeader1.className = "STARTouter-header";
            STARTouter1.appendChild(STARTHeader1);
            var startexpimpspanclose1 = win.document.createElement('span');
            startexpimpspanclose1.innerText = "×";
            startexpimpspanclose1.className = "STARTclose";
            STARTHeader1.appendChild(startexpimpspanclose1);
            var startexpimpheading1 = win.document.createElement('h3');
            startexpimpheading1.innerText = "Checks";
            STARTHeader1.appendChild(startexpimpheading1);

            var STARTbody1 = win.document.createElement("div");
            STARTbody1.className = "STARTouter-body";
            STARTouter1.appendChild(STARTbody1);

            var STARTfooter1 = win.document.createElement("div");
            STARTfooter1.className = "STARTouter-footer";
            STARTouter1.appendChild(STARTfooter1);


            // 1st radio
            var startexpimplbl123 = win.document.createElement('label');
            startexpimplbl123.className = "STARTradio";
            STARTbody1.appendChild(startexpimplbl123);

            var startcheckradio = win.document.createElement('input');
            startcheckradio.id = 'start_check_rb_id';
            startcheckradio.type = 'radio';
            startcheckradio.name = "startexportcheck";
            startexpimplbl123.appendChild(startcheckradio);


            var startcheckinput = win.document.createElement('input');
            startcheckinput.id = 'start_chk_input';
            startcheckinput.type = 'text';
            startcheckinput.placeholder = "Check with fixed value";
            startcheckinput.className = "STARTtext";
            STARTbody1.appendChild(startcheckinput);

            // 2nd radio

            var startexpimplbl12 = win.document.createElement('label');
            startexpimplbl12.className = "STARTradio";
            startexpimplbl12.setAttribute("style", "display:none");

            var startcheckradio1 = win.document.createElement('input');
            startcheckradio1.id = 'start_check_rb_id1';
            startcheckradio1.type = 'radio';
            startcheckradio1.name = "startexportcheck";
            startcheckradio1.setAttribute("style", "display:none");
            startexpimplbl12.appendChild(startcheckradio1);
            STARTbody1.appendChild(startexpimplbl12);

            var startcheckinput1 = win.document.createElement('input');
            startcheckinput1.id = 'start_chk_input1';
            startcheckinput1.type = 'text';
            startcheckinput1.placeholder = "Check with Parameter value";
            startcheckinput1.className = "STARTtext";
            startcheckinput1.setAttribute("style", "display:none");
            STARTbody1.appendChild(startcheckinput1);


            // 3nd radio

            var startexpimplbl11 = win.document.createElement('label');
            startexpimplbl11.className = "STARTradio";
            startexpimplbl11.setAttribute("style", "display:none");

            var startcheckradio11 = win.document.createElement('input');
            startcheckradio11.id = 'start_check_rb_id2';
            startcheckradio11.type = 'radio';
            startcheckradio11.name = "startexportcheck";
            startcheckradio11.setAttribute("style", "display:none");
            startexpimplbl11.appendChild(startcheckradio11);
            STARTbody1.appendChild(startexpimplbl11);

            var uicheck_select = win.document.createElement('select');
            uicheck_select.className = "STARTtext";
            uicheck_select.id = 'uicheck_select_id';
            uicheck_select.setAttribute("style", "display:none");
            var uicheck_option2 = win.document.createElement('option');
            var uicheck_option2_text = win.document.createTextNode('Enable');
            uicheck_option2.appendChild(uicheck_option2_text);
            uicheck_select.appendChild(uicheck_option2);
            var uicheck_option3 = win.document.createElement('option');
            var uicheck_option3_text = win.document.createTextNode('Disable');
            uicheck_option3.appendChild(uicheck_option3_text);
            uicheck_select.appendChild(uicheck_option3);
            var uicheck_option4 = win.document.createElement('option');
            var uicheck_option4_text = win.document.createTextNode('Visible');
            uicheck_option4.appendChild(uicheck_option4_text);
            uicheck_select.appendChild(uicheck_option4);

            var uicheck_option5 = win.document.createElement('option');
            var uicheck_option5_text = win.document.createTextNode('Invisible');
            uicheck_option5.appendChild(uicheck_option5_text);
            uicheck_select.appendChild(uicheck_option5);
            STARTbody1.appendChild(uicheck_select);

            // buttons

            var STARTChk_okButton = win.document.createElement('button');
            STARTChk_okButton.className = "STARTButton";
            STARTChk_okButton.id = 'STARTChk_canButton';
            STARTChk_okButton.innerText = "Close";
            STARTfooter1.appendChild(STARTChk_okButton);
            // creat cancel
            var STARTChk_canButton = win.document.createElement('button');
            STARTChk_canButton.className = "STARTButton STARTButtonCancel";
            STARTChk_canButton.id = 'STARTChk_okButton';
            STARTChk_canButton.innerText = "Save changes";
            STARTfooter1.appendChild(STARTChk_canButton);
            win.document.body.insertBefore(STARTmodel1, win.document.body.firstChild);};

            that.enableDragAssistedPanel = function (win) {
            	win.addEventListener("resize", function () {
                    try{
                        var windWidth = win.outerWidth;
                        var winheight = win.outerHeight;
                        that.ldivx = windWidth - Math.round(windWidth * 25 / 100);
                        that.ldivy = winheight - Math.round(winheight * 85 / 100);
                        var d = win.document.getElementById('startAssistedPanel');
                        d.style.left = that.ldivx + 'px';
                        d.style.top = that.ldivy + 'px';
                    } catch (ex) {

                    }
                    
                });
            	try{
            		var windWidth = win.outerWidth;
                    var winheight = win.outerHeight;
                    that.ldivx = windWidth - Math.round(windWidth * 25 / 100);
                    that.ldivy = winheight - Math.round(winheight * 85 / 100);
            	}catch(ex){
            		
            	}
            	
                var d = win.document.getElementById('startAssistedPanel');
                d.onmousedown = that.mousedown;
                d.onmouseup = that.mouseup;
                d.onmousemove = that.mousemove;
                d.style.left = that.ldivx + 'px';
                d.style.top = that.ldivy + 'px';
            };
            that.mousedown = function (e) {
                that.move = true;
                that.mousex = e.clientX;
                that.mousey = e.clientY;
            };
            that.mouseup = function (e) {
                that.move = false;
                e = event || window.event;
                var element = e.target || e.srcElement;
                if (element.id === "startStopRecordIMG") {
                }
            };
            that.mousemove = function (e) {
                var elm = e.srcElement || e.target;
                var document = elm.ownerDocument;
                if (that.move) {

                    that.ldivx = that.ldivx + e.clientX - that.mousex;
                    that.ldivy = that.ldivy + e.clientY - that.mousey;
                    that.mousex = e.clientX;
                    that.mousey = e.clientY;
                    var d = document.getElementById('startAssistedPanel');
                    d.style.left = that.ldivx + 'px';
                    d.style.top = that.ldivy + 'px';
                }
            };
            that.getElementByAttribute=function(attrName,attrValue,document){
                var elements = document.all;
                for (var len = 0; len < elements.length; len++) {
                    var attrValueObtained = elements[len].getAttribute(attrName);
                    if (attrValueObtained !== null) {
                        attrValueObtained = attrValueObtained.trim();
                    }
                    if (attrValueObtained === attrValue.trim()) {
                        return elements[len];
                    }
                }
                return null;
            };
            that.checkIsDisplayNone = function (element) {
                try{
                    if (window.getComputedStyle(element).display === "none") {
                        return true;
                    } else {
                        return false;
                    }
                } catch (ex) {
                    return false;
                }
                
            };
            that.checkIsHeightWidhtVisible = function(element) {
				try{
					if(window.getComputedStyle(element).height >= "1.00px" && window.getComputedStyle(element).width >= "1.00px" ){
						return true;
					}else{
						return false;
					}
				}catch(ex){
					return false;
				}
			};

            that.startGetFioriUi5TableRowNumber = function (element) {
                var tablebody;
                var tableRowElements;
                if (that.getclassName(element).indexOf("sapUiTableRowHdrScr") !== -1 || that.getclassName(element).indexOf("sapUiTableRowActionScr") !== -1) {
                    tableRowElements = element.children;
                } else {
                    tablebody = element.getElementsByTagName("tbody")[0];
                    tableRowElements = tablebody.getElementsByTagName("tr");
                    //following code added to capture the exact number of rows wherein the tr has a table inside with classname sapUiMlt- Axel Heck's issue
					try{
						var tableInsideTable = tablebody.getElementsByTagName("table");
						if(tableInsideTable.length > 0){
							for(var i = 0;i<tableInsideTable.length;i++){
								if(tableInsideTable[i].className.toLowerCase() === "sapuimlt"){
									tableRowElements = tablebody.children;
									break;
					    		}
							}
						}
					} catch(ex){
						tableRowElements = tablebody.getElementsByTagName("tr");
					}
                }

                var i = 0;
                for (i = 0; i < tableRowElements.length; i++) {
                	var ele = tableRowElements[i];
		    		if (!that.startCheckForEmptyString(that.start_clickedtabletrId)) {
		        		if (ele.id === that.start_clickedtabletrId) {
		            	return i;
		        		} else if (that.isIdExist(element.ownerDocument.getElementById(that.start_clickedtabletrId), ele)) {
		            		return i;
		        		}
		    		} else {
		        		if (!that.startCheckForEmptyString(that.start_clickedtabletrElement) && ele.isEqualNode(that.start_clickedtabletrElement)) {
		            		return i;
		        		}
		    		}
                }
                return -1;

            };
            that.getElementByAttributeElements = function (attrName, attrValue, element) {
                var elements = element.getElementsByTagName("*");
                attrValue = attrValue.toString();
                for (var len = 0; len < elements.length; len++) {
                    var attrValueObtained = elements[len].getAttribute(attrName);
                    if (attrValueObtained !== null) {
                        attrValueObtained = attrValueObtained.trim();
                    }
                    if (attrValueObtained === attrValue.trim()) {
                        return elements[len];
                    }
                }
                return null;
            };
           
            that.isTableFioriUi5 = function (element, field) {
                var className = that.getclassName(element);
                while (element.tagName.toUpperCase() !== "BODY" && element.tagName.toUpperCase() !== "TABLE") {
                    className = that.getclassName(element);
                    if (className.indexOf("sapUiTableGroup") !== -1 || className.indexOf("sapUiMlt") !== -1 || className.indexOf("sapBUiViewLayoutTable") !== -1 || className.indexOf("sapUiTableColHdrTr") !== -1 || className.indexOf("sapUiTableColCell") !== -1) {
                        return false;
                    }
                    else if (className.indexOf("sapUiTableRowHdr") !== -1 || className === "sapUiTableAction") {
                        that.start_clickedtabletrId = element.id;
                        if (className.indexOf("sapUiTableRowHdr") !== -1) {
                            element = that.traverseToParentbyClassName(element, "sapUiTableRowHdrScr");
                        } else {
                            element = that.traverseToParentbyClassName(element, "sapUiTableRowActionScr");
                        }
                        field.row_number = that.startGetFioriUi5TableRowNumber(element);

                        element = that.traverseToParentbyClassName(element, "sapUiTableCCnt");
                        element = element.getElementsByTagName("table")[0];
                        that.start_clickedtabletrId = element.getElementsByTagName("tbody")[0].children.item(field.row_number).id;
                        break;
                    }
                    if (element.tagName.toUpperCase() === "TR") {
                        that.start_clickedtabletrId = element.id;
						that.start_clickedtabletrElement = element;
                    }
                    element = element.parentElement;
                    if (that.checkIsEmpty(element)) {
                        return false;
                    }
                }
                if (element.tagName.toUpperCase() === "TABLE") {
                    className = that.getclassName(element);
                    if (className.indexOf("sapMListModeNone sapMListShowSeparatorsNone") !== -1 || className.indexOf("sapUiMlt") !== -1 || className.indexOf("sapBUiViewLayoutTable") !== -1 || className.indexOf("sapSuiteUiCommonsPF ") !== -1 || className.indexOf("sapUiFormBackgrTranslucent") !== -1 ||that.checkIsEmpty(className)) {
                        return false;
                    }
                    field.uicheck = "";
                    field.table_name = element.id;
                    field.row_number = that.startGetFioriUi5TableRowNumber(element);
                    if (field.row_number<0) {
                        return false;
                    }
                    return true;

                }

                return false;
            };
            that.isListFioriUi5 = function (element) {
                var className = '';
                while (element.tagName !== "LI") {
                    if (element.tagName === "BODY"){ 
                    	return false;
                    }
                    element = element.parentElement;
                }
                className = element.className;
                if (className === null){ 
                	className = '';
                }
                if (className === "sapUiRrRow" || className.indexOf("sapUiMnu") !== -1 || className.indexOf("sapM") !== -1 || className.indexOf("sapUiLbxI") !== -1 || className.indexOf("sapUiTree") !== -1) {
                    return true;
                }
                return false;
            };
            that.getLabelByAttributeType = function (elements,attrName) {
                
                for (var len = 0; len < elements.children.length; len++) {
                    var attrValueObtained = elements.children[len].getAttribute(attrName);
                    if (attrValueObtained !== null) {
                        attrValueObtained = attrValueObtained.trim();
                        return attrValueObtained;
                    }
                  
                }
                return "";
            };

            that.isCheckBoxWebgui = function (element,field) {

                var goto;
                var role = "";
                var ct = "";
                var aria_checked = false;
                var tempclass = element.className;
                var tempElCheckBox = element;
                /*var field = new Object();*/
                while (role === "" || role === null || role === undefined) {
                    try {
                        role = element.getAttribute("role");
                    }

                    catch (ex) {
                        element = element.parentElement;
                        role = "";
                    }
                    if ((role === "" || role === null || role === undefined) && element.tagName.toUpperCase() !== "BODY") {
                    	 try {
                             if (element.getElementsByTagName("input")[0].getAttribute("ct") === "R")
                             {
                                 role = "RADIO"; break;
                             }

                         } catch (ex) { }
                        element = element.parentElement;
                    }
                    else if (element.tagName.toUpperCase() == "BODY") {
                        role = "";
                        break;
                    }
                }
                if (role.toUpperCase() === "MAIN" || role.toUpperCase() === "PRESENTATION") {
                    while (ct === "" || ct === null || ct === undefined) {
                        try {
                            ct = tempElCheckBox.getAttribute("ct");
                        }

                        catch (ex) {
                            tempElCheckBox = tempElCheckBox.parentElement;
                            ct = "";
                        }
                        if ((ct === "" || ct === null || ct === undefined) && tempElCheckBox.tagName.toUpperCase() !== "BODY") {
                            tempElCheckBox = tempElCheckBox.parentElement;
                        }
                        else if (tempElCheckBox.tagName.toUpperCase() == "BODY") {
                            ct = "";
                            break;
                        }
                    }

                    if (ct.toUpperCase() === "ALC") {
                        role = "CHECKBOX";
                        element = tempElCheckBox;
                    }
                    else if (ct.toUpperCase() === "RLI") {
                        try{
                            ct = tempElCheckBox.getElementsByTagName("input")[0].getAttribute("ct");
                            if(ct === "R"){
                                role = "RADIO";
                                element = tempElCheckBox;
                            }else if(ct === "C"){
        						role = "CHECKBOX";
        						element = tempElCheckBox;
        					}
                            else{
                                return true;
                            }
                        }catch(ex){
                            return true;
                        }                
                    }

                }

                if (role.toUpperCase() === "CHECKBOX") {
                    field.id = element.id;
                    field.type = "CheckBox";
                    field.action = "Field";
                    field.label = element.innerText;
                    if (that.startCheckForEmptyString(field.label.trim())) {
                        var tempElement = that.traverseToParentbyTagName(element, "DIV");
                        field.label = that.getLabelByAttributeType(tempElement, "title");
                    }
                    if (that.startCheckForEmptyString(field.label.trim())) {
                    	field.label=field.id;
                    }
                    field.object_repository = that.startgetObjectRepo(element);
                    try {
                        aria_checked = element.getAttribute("aria-checked");



                    }
                    catch (e) {
                        aria_checked = false;

                    }


                    if (aria_checked==="true" || aria_checked===true) {
                        field.value = "";
                    }
                    else {
                        if (element.className.indexOf("lsCBImgSel") !== -1 || element.getElementsByTagName("img")[0].className.indexOf("CImgOn") !== -1) {
                            field.value = "";
                        }
                        else {
                            field.value = "X";
                        }

                    }
                    
                	if (that.defineCheck || that.defineExportImport) {
                        if (field.value === "X"){
                           field.value = "";
                        }
                        else{
                           field.value = "X";
                        }
                   }
       			
                   if (that.startCheckForEmptyString(that.frameid)) {
                       that.getFrameidfromIdWebGUI(element);
                       that.frameid = that.tempFrameId;
                       that.tempFrameId = "";
                   }
                    
                    field.name = field.id + "##" + that.frameid;

                    that.addActions(field);
                    goto = false;
                }
                else if (role.toUpperCase() === "RADIO") {
                    field.id = element.id;
                    field.type = "RadioButton";
                    field.action = "Field";
                    field.label = element.innerText;
                    field.value = element.innerText;

                    field.object_repository = that.startgetObjectRepo(element);


                    // for (i = 0; i < element.children.length; i++)
                    // {
                    // if
                    // (element.children.item(i).className.indexOf(("lsRImgDspl")
                    // !== -1)) {
                    // element = element.children.item(i);
                    // break;
                    // }
                    // }

                    if (tempclass.indexOf("urRImgOn") === -1) {
                        field.value = "X";
                    }
                    else {
                        field.value = "";
                    }
                   
                    if (that.startCheckForEmptyString(that.frameid)) {
                        that.getFrameidfromIdWebGUI(element);
                        that.frameid = that.tempFrameId;
                        that.tempFrameId = "";
                    }
                    
                    field.name = field.id + "##" + that.frameid;

                    that.addActions(field);
                    goto = false;
                }
                else {
                	 try{
                         while (tempElCheckBox.tagName.toUpperCase() !== "BODY") {
                             if (that.checkIsEmpty(field.label)) {
                                 field.label = tempElCheckBox.getAttribute("title");
                             }
                             
                             if (tempElCheckBox.children.length > 0) {
                                 if (tempElCheckBox.children.item(0).tagName.toUpperCase() === "INPUT") {
                                     if((tempElCheckBox.children.item(0).getAttribute("type")==="checkbox")){
                                        tempElCheckBox =  tempElCheckBox.children.item(0);
                                        field.id = tempElCheckBox.id;
                                         field.type = "CheckBox";
                                         field.action = "Field";
                                         if (that.startCheckForEmptyString(that.frameid)) {
                                             that.getFrameidfromIdWebGUI(tempElCheckBox);
                                             that.frameid = that.tempFrameId;
                                             that.tempFrameId = "";
                                         }
                                         if (tempElCheckBox.getAttribute("checked") === null) {
                                             field.value = "X";
                                         } else {
                                             field.value = "";
                                         } if (that.defineCheck || that.defineExportImport) {
                                             if (field.value === "X") {
                                                 field.value = "";
                                             }
                                             else {
                                                 field.value = "X";
                                             }
                                         }
                                         field.name = field.id + "##" + that.frameid;
                                         that.addActions(field);
                                         goto = false;
                                         return goto;
                                     }
                                 }
                             }
                             tempElCheckBox = tempElCheckBox.parentElement;
                         }
                     } catch (ex) {
                         
                     }
                    goto = true;
                }
                return goto;

            };
            that.getIndexOfnearBy = function (coreElement, field,labelElm) {
                //var collections = coreElement.ownerDocument.evaluate(".//*[text()='" + field.prevText + "']", labelElm, null, XPathResult.ANY_TYPE, null);
                var labelTextElm = labelElm;
                //var iterateelm = labelTextElm;
                var fieldCollections = [];
                //while (iterateelm) {
                //    iterateelm = collections.iterateNext();
                //    if (iterateelm)
                //        labelTextElm = iterateelm;
                //}
                var index=0;
                var type,tagname;
                switch (coreElement.tagName) {
                    case "INPUT":
                        tagname = "input";
                        type = coreElement.getAttribute("type");
                        //if (field.type.toUpperCase() === "CHECKBOX") {
                        //    type = "CheckBox";
                        //} else if (field.type.toUpperCase() === "RADIOBUTTON") {
                        //    type = "RadioButton";
                        //} else if (field.type.toUpperCase() === "INPUTFIELD") {
                        //    type = "text";
                        //}
                        
                        break;
                    case "BUTTON":
                        tagname = "button";
                        break;
                    case "A":
                        tagname = "a";
                        break;
                    case "TEXTAREA":
                        tagname = "textarea";
                        break;
                    case "DIV":
                        tagname = "div";
                        break;
                    case "SPAN":
                        tagname = "span";
                        break;
                    case "IMG":
                        tagname = "img";
                        break;
                    default:
                        break;

                }
                while (labelTextElm) {
                    var isElmExist = that.isIdExist(coreElement, labelTextElm);
                    //fieldCollections.push(labelTextElm.nextElementSibling.querySelectorAll("input[type='" + type + "']"));
                    if (tagname === "input") {
                        if (labelTextElm.tagName.toUpperCase() === "INPUT" && labelTextElm.getAttribute("type") === type && labelTextElm.getAttribute("placeholder") === coreElement.getAttribute("placeholder")) {
                            fieldCollections.push(labelTextElm);
                        }
                        if (labelTextElm.querySelectorAll("input[type='" + (that.checkIsEmpty(type)?"":type) + "']" + (that.checkIsEmpty(coreElement.getAttribute("title")) ? "" : "[title='" + coreElement.getAttribute("title") + "']") + (that.checkIsEmpty(coreElement.getAttribute("aria-label")) ? "" : "[aria-label='" + coreElement.getAttribute("aria-label") + "']") + (that.checkIsEmpty(coreElement.getAttribute("placeholder")) ? "" : "[placeholder='" + coreElement.getAttribute("placeholder") + "']") + (that.checkIsEmpty(coreElement.innerText) ? "" : "[text()='" + coreElement.innerText + "']") + (that.checkIsEmpty(coreElement.getAttribute("value")) ? "" : "[value='" + coreElement.getAttribute("value") + "']")).length > 0) {
                            fieldCollections.push(labelTextElm.querySelectorAll("input[type='" + (that.checkIsEmpty(type) ? "" : type) + "']" + (that.checkIsEmpty(coreElement.getAttribute("title")) ? "" : "[title='" + coreElement.getAttribute("title") + "']") + (that.checkIsEmpty(coreElement.getAttribute("aria-label")) ? "" : "[aria-label='" + coreElement.getAttribute("aria-label") + "']") + (that.checkIsEmpty(coreElement.getAttribute("placeholder")) ? "" : "[placeholder='" + coreElement.getAttribute("placeholder") + "']") + (that.checkIsEmpty(coreElement.innerText) ? "" : "[text()='" + coreElement.innerText + "']") + (that.checkIsEmpty(coreElement.getAttribute("value")) ? "" : "[value='" + coreElement.getAttribute("value") + "']")));
                        }
                    } else {
                        try{
	                        if (labelTextElm.tagName.toUpperCase() === tagname.toUpperCase() && labelTextElm.getAttribute("placeholder") === coreElement.getAttribute("placeholder") && labelTextElm.getAttribute("title") === coreElement.getAttribute("title") && labelTextElm.getAttribute("aria-label") === coreElement.getAttribute("aria-label") && ((labelElm.tagName.toUpperCase() === "DIV" || labelElm.tagName.toUpperCase() === "SPAN" || labelElm.tagName.toUpperCase() === "LABEL") ? labelTextElm.getAttribute("className") === coreElement.getAttribute("className") : true)) {
	                            fieldCollections.push(labelTextElm);
	                        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
	                        if (labelTextElm.querySelectorAll(tagname + (that.checkIsEmpty(coreElement.getAttribute("title")) ? "" : "[title='" + coreElement.getAttribute("title") + "']") + (that.checkIsEmpty(coreElement.getAttribute("aria-label")) ? "" : "[aria-label='" + coreElement.getAttribute("aria-label") + "']") + (that.checkIsEmpty(coreElement.getAttribute("placeholder")) ? "" : "[placeholder='" + coreElement.getAttribute("placeholder") + "']") +/* (that.checkIsEmpty(coreElement.innerText) ? "" : "[text()='" + coreElement.innerText + "']") +*/ (that.checkIsEmpty(coreElement.getAttribute("value")) ? "" : "[value='" + coreElement.getAttribute("value") + "']") + ((coreElement.tagName.toUpperCase() === "DIV" || coreElement.tagName.toUpperCase() === "SPAN" || coreElement.tagName.toUpperCase() === "LABEL") ? "[class='" + coreElement.getAttribute("class") + "']" : "")).length > 0) {
	                            fieldCollections.push(labelTextElm.querySelectorAll(tagname + (that.checkIsEmpty(coreElement.getAttribute("title")) ? "" : "[title='" + coreElement.getAttribute("title") + "']") + (that.checkIsEmpty(coreElement.getAttribute("aria-label")) ? "" : "[aria-label='" + coreElement.getAttribute("aria-label") + "']") + (that.checkIsEmpty(coreElement.getAttribute("placeholder")) ? "" : "[placeholder='" + coreElement.getAttribute("placeholder") + "']") +/* (that.checkIsEmpty(coreElement.innerText) ? "" : "[text()='" + coreElement.innerText + "']") +*/ (that.checkIsEmpty(coreElement.getAttribute("value")) ? "" : "[value='" + coreElement.getAttribute("value") + "']") + ((coreElement.tagName.toUpperCase() === "DIV" || coreElement.tagName.toUpperCase() === "SPAN" || coreElement.tagName.toUpperCase() === "LABEL") ? "[class='" + coreElement.getAttribute("class") + "']" : "")));
	                        }
                    	}catch(ex){
          
                    	}
                    }
                    
                   if (isElmExist) {
                        break;
                    }
                    if (labelTextElm.nextElementSibling) {
                        labelTextElm = labelTextElm.nextElementSibling;
                    } else {
                        labelTextElm = labelTextElm.parentElement;
                    }

                }
                var found = false;
                for (var elm in fieldCollections) {
                    if (isNaN(Number(elm))) {
                        continue;
                    }
                    if (fieldCollections[elm] === coreElement) {
                        index++;
                        found = true;
                    } else if (that.checkIsEmpty(elm.length) || (elm.length === 0)) {

                    }
                    for (var elmfin in fieldCollections[elm]) {
                        if (found === true) {
                            break;
                        }
                        if (isNaN(Number(elmfin))) {
                            continue;
                        }
                        if (!that.checkIsDisplayNone(fieldCollections[elm][elmfin]) && coreElement.innerText === fieldCollections[elm][elmfin].innerText) {
                            index++;
                        }
                        
                        if (coreElement === fieldCollections[elm][elmfin]) {
                            found = true;
                            break;
                        }
                        
                    }
                    if (found) {
                        break;
                    }
                }
                field.object_repository = field.object_repository + ";nearByIndex: " + index;
            };
            that.traverseToParentbyTagName = function (element, tagName) {
                var flag = true;
                while (flag) {
                    if (element.tagName.toUpperCase() === tagName.toUpperCase()) {
                        return element;
                    }
                    if (element.tagName.toUpperCase() === "BODY") {
                        return "";
                    }
                    element = element.parentElement;
                }

            };
            that.traverseToParentbyClassName = function (element, className) {
                var flag = true;
                while (flag) {
                	element = element.parentElement;
                    if (that.getclassName(element).indexOf(className) !== -1) {
                        return element;
                    } else if (element.tagName.toUpperCase() === "BODY") {
                        return "";
                    }
                    
                }
            };

            that.isIdExist = function (mainElement, elementToCheck) {
                var returnVal = false, isFound = false;
                try {

                    if (mainElement.id === elementToCheck.id && !that.checkIsEmpty(mainElement)) {
                        if (elementToCheck.id !== ""){
                            return true;
                        }
                    }
                    else if (elementToCheck.children.length === 0 || that.checkIsEmpty(mainElement)){
                        return false;
                    }
                } catch (ex) {
                    return false;
                }
                for (var i = 0; i < elementToCheck.children.length; i++) {
                    if (isFound === false) {
                        returnVal = that.isIdExist(mainElement, elementToCheck.children.item(i));
                        if (returnVal) {
                            isFound = true;
                        }

                    }


                }

                return isFound;
            };

            that.startremoveHighlighter = function (event) {
                event = event || window.event;
                var element = event.srcElement || event.target;
                element.style.border = '';
                element.removeEventListener('mouseout', that.startremoveHighlighter);
            };
            that.highlightElement = function (event) {
                event = event || window.event;
                var element = event.srcElement || event.target;
                try {
                    if (element.id.indexOf("start") !== -1){
                        return;
                    }
                } catch (ex) { }
                element.style.border = '3px solid red';
                element.addEventListener('mouseout', that.startremoveHighlighter);
            };
            that.removeHighlighterToAllFrames = function (window) {
            	try{
            		window.document.removeEventListener("mouseover", that.highlightElement);
            	}catch(ex){}
                
                if (window.frames.length > 0) {
                    for (var i = 0; i < window.frames.length; i++) {
                        that.removeHighlighterToAllFrames(window.frames[i].window);
                    }
                } else {
                    return;
                }
            };
            that.addHighlighterToAllFrames = function (window) {
            	try{
            		 window.document.addEventListener("mouseover", that.highlightElement);
            	}catch(ex){
            		
            	}
               
                if (window.frames.length > 0) {
                    for (var i = 0; i < window.frames.length; i++) {
                        that.addHighlighterToAllFrames(window.frames[i].window);
                    }
                } else {
                    return;
                }
            };
            that.enablehigHlighter = function (window) {
                that.enablehighlighter = setInterval(function () { that.addHighlighterToAllFrames(window); }, 300);
            };
            that.disableHighlighter = function (window) {
                clearInterval(that.enablehighlighter);
                that.removeHighlighterToAllFrames(window);
            };
            that.clearAllFieldsinExportCheck = function (win) {
                win.document.getElementById('exp_imp_rb_id').checked = false;
                win.document.getElementById('exp_imp_rb_id1').checked = false;
                win.document.getElementById('start_expimp_input1').value = "";
                win.document.getElementById('start_expimp_input').value = "";
                win.document.getElementById('STARTouter_imp_exp').className = "STARTouter";
                win.document.getElementById('start_check_rb_id').checked = false;
                win.document.getElementById('start_check_rb_id1').checked = false;
                win.document.getElementById('start_check_rb_id2').checked = false;
                win.document.getElementById('start_chk_input').value = "";
                win.document.getElementById('start_chk_input1').value = "";
                win.document.getElementById('uicheck_select_id').value = "Visible";
                win.document.getElementById('STARTouterchk_id').className = "STARTouter";
                that.defineCheck = false;
                that.defineExportImport = false;
            };
            that.getImportExportParaVariable = function (impLabel) {
                if (impLabel !== null && impLabel !== undefined) {
                	impLabel=impLabel.replace(/[^a-zA-Z0-9 ]/g, "");
                    while (impLabel.search(" ") !== -1) {
                        impLabel = impLabel.replace(" ", "_");
                    }
                }
                return impLabel.toUpperCase();
            };
            that.Startwebdynprocheckforid = function (id, elem) {
                var tempelemnt = elem;
                while (tempelemnt.id === null || tempelemnt.id === undefined || tempelemnt.id === "") {
                    if (tempelemnt.tagName.toUpperCase() == "BODY") {
                        return false;
                    }
                    else {
                        tempelemnt = tempelemnt.parentElement;
                    }

                }
                if (tempelemnt.id === id) {
                    return true;
                }
                else {
                    return false;
                }
            };
            that.removeActivechild = function (event) {
                var elm = event.srcElement;
                var document = elm.ownerDocument;
                var window = document.defaultView;
                var child = document.activeElement;
                var parent;

                if (child !== document.body && child !== elm && that.getclassName(child).toUpperCase().indexOf("START")===-1) {
                    parent = child.parentElement;
                    parent.removeChild(child);
                    that.removeActivechild.parent = parent;
                    that.removeActivechild.child = child;
                }

            };
            that.addActivechild = function (event) {
                
                if (!that.checkIsEmpty(that.removeActivechild.parent)) {
                    that.removeActivechild.parent.appendChild(that.removeActivechild.child);
                }

            };
            that.handlingExportCheckOptions = function (event) {

                var event = event || window.event;
                var impParam = "";
                var element = event.srcElement || event.target, className = "", id;
                var document = element.ownerDocument;
                var win = document.defaultView || document.parentWindow;
                id = element.id;
                try {
                    if (id === null || id === "" || id === undefined || id === "start_imp_rb_label") {
                        if (element.className === "STARTouter-footer"){
                            return;
                        }
                        id = element.children.item(0).id;
                    }
                } catch (ex) {
                    id = "";
                }
                if (that.currentobject === undefined) {
                    that.currentobject = undefined;
                    that.clearAllFieldsinExportCheck(win);
                    return;
                }
                else if (that.currentobject.value === "" && that.currentobject.label === "" && that.currentobject.id === "") {
                    that.currentobject = undefined;
                    that.clearAllFieldsinExportCheck(win);
                    return;
                }
                that.enableDefaultToWholeDoc(win.top);
                if (that.currentobject === that.actions[that.actions.length - 1]) {
                    that.actions.pop();
                }

                var column, colIndex;
                if (that.currentobject.action === "ROW_CLICK" || that.currentobject.action === "ROW_DATA" || that.currentobject.action === "ROW_SELECT") {
                    that.currentobject.action = "ROW_DATA";
                    for (var i = 0; i < that.currentobject.columns.length; i++) {
                        if (that.currentobject.columns[i].changeable.toUpperCase() === "TRUE") {
                            that.currentobject.action = "ROW_DATA";
                            column = that.currentobject.columns[i];
                            colIndex = i;
                            break;
                        }
                    }
                } else {
                    that.currentobject.action = "Field";
                }
                if (id === 'exp_imp_rb_id') {

                    if (column === undefined) {
                        impParam = that.getImportExportParaVariable(that.currentobject.label);
                        //                        document.getElementById('start_expimp_input').value = "I_" + impParam;
                        document.getElementById('start_expimp_input').value = impParam;

                    } else {
                        impParam = that.getImportExportParaVariable(column.label);
                        //                        document.getElementById('start_expimp_input').value = "I_" + impParam;
                        document.getElementById('start_expimp_input').value = impParam;
                    }
                    document.getElementById('start_expimp_input1').value = "";
                }
                else if (id === 'exp_imp_rb_id1') {

                    if (column === undefined) {
                        impParam = that.getImportExportParaVariable(that.currentobject.label);
                        //                        document.getElementById('start_expimp_input1').value = "E_" + impParam;
                        document.getElementById('start_expimp_input1').value = impParam;
                    } else {
                        impParam = that.getImportExportParaVariable(column.label);
                        //                        document.getElementById('start_expimp_input1').value = "E_" + impParam;
                        document.getElementById('start_expimp_input1').value = impParam;
                    }
                    document.getElementById('start_expimp_input').value = "";
                }
                else if (id === 'exp_imp_canButton' || that.getclassName(element) ===  "STARTclose") {

                    that.currentobject = undefined;

                    that.clearAllFieldsinExportCheck(win);
                    //added for popups 
                    document.removeEventListener("click", that.removeActivechild);
                    that.addActivechild(event);
                    //end 
                }
                else if (id === 'exp_imp_okButton') {
                    if (!document.getElementById('exp_imp_rb_id').checked && !document.getElementById('exp_imp_rb_id1').checked) {
                        //                        alert('select any one option');
                        return;
                    }
                    document.removeEventListener("click", that.removeActivechild);
                    that.addActivechild(event);
                    if (document.getElementById('exp_imp_rb_id').checked) {
                        if (column === undefined) {

                            that.currentobject.importValue = document.getElementById('start_expimp_input').value;
                        } else {
                            that.currentobject.columns[colIndex].importValue = document.getElementById('start_expimp_input').value;
                        }

                    } else if (document.getElementById('exp_imp_rb_id1').checked) {
                        if (column === undefined) {
                            that.currentobject.exportValue = document.getElementById('start_expimp_input1').value;
                        } else {
                            that.currentobject.columns[colIndex].exportValue = document.getElementById('start_expimp_input1').value;
                        }
                    }
                    that.addActions(that.currentobject);
                    that.currentobject = undefined;
                    that.clearAllFieldsinExportCheck(win);
                }
                else if (id === 'start_check_rb_id') {
                    document.getElementById('start_chk_input1').value = "";
                    if (column === undefined) {
                        document.getElementById('start_chk_input').value = that.currentobject.value;
                    }
                    else {
                        document.getElementById('start_chk_input').value = column.value;
                    }


                }
                else if (id === 'start_check_rb_id1') {
                    document.getElementById('start_chk_input').value = "";
                    if (column === undefined) {
                        impParam = that.getImportExportParaVariable(that.currentobject.label);
                        //                        document.getElementById('start_chk_input1').value = "I_" + impParam;
                        document.getElementById('start_chk_input1').value = impParam;
                    }
                    else {
                        impParam = that.getImportExportParaVariable(column.label);
                        //                        document.getElementById('start_chk_input1').value = "I_" + impParam;
                        document.getElementById('start_chk_input1').value = impParam;
                    }
                }
                else if (id === 'start_check_rb_id2') {
                    document.getElementById('start_chk_input').value = "";
                    document.getElementById('start_chk_input1').value = "";
                }
                else if (id === 'STARTChk_okButton') {
                    if (!document.getElementById('start_check_rb_id').checked && !document.getElementById('start_check_rb_id1').checked && !document.getElementById('start_check_rb_id2').checked) {
                        //                        alert('select any one option');
                        return;
                    }
                    document.removeEventListener("click", that.removeActivechild);
                    that.addActivechild(event);
                    if (document.getElementById('start_check_rb_id').checked) {
                        if (column === undefined) {
                            that.currentobject.check = document.getElementById('start_chk_input').value;
                            that.currentobject.value = that.currentobject.check;
                            if (that.currentobject.type === "RadioButton" || that.currentobject.type === "CheckBox") {
                                if (that.currentobject.value === "") {
                                    that.currentobject.check = "null";
                                }
                            }
                        } else {
                            that.currentobject.columns[colIndex].check = document.getElementById('start_chk_input').value;
                            that.currentobject.columns[colIndex].value = that.currentobject.columns[colIndex].check;
                            if (that.currentobject.columns[colIndex].type === "RadioButton" || that.currentobject.columns[colIndex].type === "CheckBox") {
                                if (that.currentobject.columns[colIndex].value === "") {
                                    that.currentobject.columns[colIndex].check = "null";
                                }
                            }
                        }

                    } else if (document.getElementById('start_check_rb_id1').checked) {
                        if (column === undefined) {
                            that.currentobject.check = document.getElementById('start_chk_input').value;
                            that.currentobject.check_param = document.getElementById('start_chk_input1').value;
                        } else {
                            that.currentobject.columns[colIndex].check = document.getElementById('start_chk_input').value;
                            that.currentobject.columns[colIndex].check_param = document.getElementById('start_chk_input1').value;
                        }

                    } else if (document.getElementById('start_check_rb_id2').checked) {
                        if (column === undefined) {
                            that.currentobject.check = document.getElementById('uicheck_select_id').value;
                            that.currentobject.uicheck = "X";
                        } else {
                            that.currentobject.columns[colIndex].check = document.getElementById('uicheck_select_id').value;
                            that.currentobject.columns[colIndex].uicheck = "X";
                        }
                    }
                    that.addActions(that.currentobject);
                    that.currentobject = undefined;
                    that.clearAllFieldsinExportCheck(win);
                }
                else if (id === 'STARTChk_canButton') {
                    that.currentobject = undefined;
                    that.clearAllFieldsinExportCheck(win);
                    document.removeEventListener("click", that.removeActivechild);
                    that.addActivechild(event);
                }


            };
            that.exportCheck = function (event) {

                var event = event || window.event;
                var element = event.srcElement || event.target, className = "", id;
                id = element.id;
                var document = element.ownerDocument;
                var window = document.defaultView || document.parentWindow;
                that.addvaluetoField();
                that.startGetValue(element);
                if ((that.clickFioriUi5.DatetimePicker || that.clickFioriUi5.calItem || that.clickFioriUi5.TimePicker) && !that.clickFioriUi5.Footer) {
                    that.addCalanderControl(element);
                }
                var toastfield = new Object();
                if (that.toastMessage !== undefined) {
                    toastfield.UITECH = "04";
                    toastfield.type = "sapMMessageToast";
                    toastfield.text = that.toastMessage.replace(/\r?\n|\r/g, " ");
                    toastfield.check = toastfield.text.replace(/\r?\n|\r/g, " ");
                    toastfield.action = "MESSAGE";
                    toastfield.optionalStep = "X";
                    try {
                        if (that.actions[that.actions.length - 1].check !== toastfield.check || that.checkIsEmpty(toastfield.check)) {
                            that.actions.push(toastfield);
                        }
                    } catch (ex) {
                        that.actions.push(toastfield);
                    }
                    that.toastMessage = undefined;
                }
                if (id.indexOf("startStopRecord") !== -1) {
                	thatWin.opener.s4timeTaken = Number(new Date().getTime()) - Number(that.timeTaken);
                    that.removeEvents(window);
                    that.addvaluetoField();
                    that.startGetValue(element);
                    if (that.toastMessage !== undefined) {
                      var field = new Object();
                        field.UITECH = "04";
                        field.type = "sapMMessageToast";
                        field.text = that.toastMessage.replace(/\r?\n|\r/g, " ");
                        field.check = field.text.replace(/\r?\n|\r/g, " ");
                        field.action = "MESSAGE";
                        that.actions.push(field);
                        that.toastMessage = undefined;
                    }
//                    var newStopField = new Object();
//                    newStopField.UITECH = "04";
////                    newStopField.type = "stopRecording";
//                    newStopField.action = "Field";
//                    that.actions.push(newStopField);
                    that.isStopClick = true;
                    that.addActionsLive();
                    // console.log(JSON.stringify(that.actions));
                    //console.log(JSON.parse(JSON.stringify(that.actions)));
                    window.close();
                } else if (id.indexOf("startExportImport") !== -1 || (event.altKey && event.ctrlKey)) {
                    if (that.defineExportImport) {
                    	that.enableDefaultToWholeDoc(window.top);
                        that.defineExportImport = false;
                        that.defineCheck = false;
                        that.disableHighlighter(window);
                    } else if (that.defineExportImport === false) {
                    	that.preventDefaultTowholeDoc(window.top);
                        that.defineExportImport = true;
                        that.defineCheck = false;
                        that.disableHighlighter(window);
                        that.enablehigHlighter(window);

                    }

                } else if (id.indexOf("startCheck") !== -1 || (event.altKey && event.shiftKey)) {
                    if (that.defineCheck) {
                    	that.enableDefaultToWholeDoc(window.top);
                        that.defineCheck = false;
                        that.defineExportImport = false;
                        that.disableHighlighter(window);
                    } else if (that.defineCheck === false) {
                    	that.preventDefaultTowholeDoc(window.top);
                        that.defineCheck = true;
                        that.defineExportImport = false;
                        that.disableHighlighter(window);
                        that.enablehigHlighter(window);
                    }
                } else {
                    that.handlingExportCheckOptions(event);
                }

            };
            that.getWebGuiLabel = function (element, field) {

                var Label = "";
                switch (field.type) {
                    case "InputField":
                    case "ComboBoxSearch":
                    case "ComboBox":
                    case "TextArea":	
                        Label = element.getAttribute("title");


                        if (that.startCheckForEmptyString(Label)) {
                            try {
                                var ElementTR = that.traverseToParentbyTagName(element, "TD");
                                Label = ElementTR.previousElementSibling.innerText;
                            } catch (ex) { }
                        }
                        break;
                    default:
                        break;
                }
                try{
                	field.label = Label.trim();
                }catch(ex){}
                

            };
            that.getWebGuiInputValue = function (element, field) {

                var valueforinput = "";
                switch (field.type) {
                    case "InputField":
                    case "ComboBoxSearch":
                    case "ComboBox":
                    case "TextArea":
                        valueforinput = element.value;
                       
                        if (valueforinput === undefined) {
                            valueforinput = element.innerText;
                        }
                        if (valueforinput === undefined) {
                            valueforinput = element.textContent;
                        }

                       
                        break;
                    default:
                        break;
                }
                field.value = valueforinput.trim();

            };
            that.checkIsEmpty = function (valueField) {
            	 try{
                     valueField = valueField.trim();
                     if (valueField.length === 1 && valueField.charAt(0)==="") {
                         valueField = "";
                     }
                 } catch (ex) {

                 }
                if (valueField === null || valueField === undefined || valueField === "") {
                    return true;
                } return false;
            };
            that.getFieldIndex = function (tagName,element,id) {
                var tempElement = element.getElementsByTagName(tagName);
                if (tempElement.length > 1) {
                    for (var index = 0; index < tempElement.length; index++) {
                        if (tempElement[index] === element.ownerDocument.getElementById(id)) {
                            return index;
                        }
                    }
                } else {
                   return tempElement.length;
                }
            };
            that.getElementIndexForLabel = function (field, element) {
                var tagname,tempElement;
                switch (field.type.toUpperCase()) {
                   
                    
                    case "INPUTHELP":
                    case "VALUEHELP":
                        if (element.tagName.toUpperCase() !== "INPUT") {
                            element = element.parentElement;
                            while (element.getElementsByTagName("input").length === 0) {
                                element = element.parentElement;
                            }
                            element = element.getElementsByTagName("input")[0];
                        }
                        field.index =  that.getFieldIndex("input", element,field.id);
                        break;
                    case "INPUTFIELD":
                        field.index = that.getFieldIndex("input", element, field.id);
                        break;
                    case "TEXTAREA":
                        field.index = that.getFieldIndex("textarea", element,field.id);
                        break;

                }
            };
            that.getfirstLabel = function (field,element) {
                var flag = true;
                var className = "";
                var index;
                while (flag) {
                    if (element.tagName.toUpperCase() === "BODY") {
                        break;
                    }
                    try{
                        if (element.previousElementSibling.tagName.toUpperCase() === "SPAN" || element.previousElementSibling.tagName.toUpperCase() === "LABEL" || element.previousElementSibling.tagName.indexOf("h")===0) {
                            className = that.getclassName(element.previousElementSibling);
                            if (className.indexOf("sapUiTv") !== -1 || className.indexOf("sapUiLbl") !== -1 || className.indexOf("sapMLabel") !== -1) {
                                field.label = element.previousElementSibling.innerText;
                            }
                        } else if (that.getclassName(element.previousElementSibling).toUpperCase().indexOf("TV") !== -1) {
                            field.label = element.previousElementSibling.innerText;
                        }
                    } catch (ex) {}
                    if (!that.checkIsEmpty(field.label)) {
                        break;
                    }
                    if (element.getElementsByTagName("label").length > 0) {
                        for (index = 0; index < element.getElementsByTagName("label").length; index++) {
                            className = that.getclassName(element.getElementsByTagName("label")[index]);
                            if (className.indexOf("sapUiTv") !== -1 || className.indexOf("sapUiLbl") !== -1 || className.indexOf("sapMLabel") !== -1) {
                                field.label = element.getElementsByTagName("label")[index].innerText;
                            }
                        }
                        if (!that.checkIsEmpty(field.label)) {
                            break;
                        }
                    }
                    
                    
                    if (element.getElementsByTagName("span").length > 0) {
                        for (index = 0; index < element.getElementsByTagName("span").length; index++) {
                            className = that.getclassName(element.getElementsByTagName("span")[index]);
                            if (className.indexOf("sapUiTv") !== -1 || className.indexOf("sapUiLbl") !== -1 || className.indexOf("sapMLabel") !== -1) {
                                field.label = element.getElementsByTagName("span")[index].innerText;
                            }
                        }
                        if (!that.checkIsEmpty(field.label)) {
                            break;
                        }
                    }
                        try {
                            if (element.previousElementSibling.getElementsByTagName("span").length > 0) {
                                for (index = 0; index < element.previousElementSibling.getElementsByTagName("span").length; index++) {
                                    className = that.getclassName(element.previousElementSibling.getElementsByTagName("span")[index]);
                                    if (className.indexOf("sapUiTv") !== -1 || className.indexOf("sapUiLbl") !== -1 || className.indexOf("sapMLabel") !== -1) {
                                        field.label = element.previousElementSibling.getElementsByTagName("span")[index].innerText;
                                    }
                                }
                                if (!that.checkIsEmpty(field.label)) {
                                    break;
                                }
                            }
                        } catch (ex) {

                        }
                        try {
                            if (element.previousElementSibling.getElementsByTagName("label").length > 0) {
                                for (index = 0; index < element.previousElementSibling.getElementsByTagName("label").length; index++) {
                                    className = that.getclassName(element.previousElementSibling.getElementsByTagName("label")[index]);
                                    if (className.indexOf("sapUiTv") !== -1 || className.indexOf("sapUiLbl") !== -1 || className.indexOf("sapMLabel") !== -1) {
                                        field.label = element.previousElementSibling.getElementsByTagName("label")[index].innerText;
                                    }
                                }
                                if (!that.checkIsEmpty(field.label)) {
                                    break;
                                }
                            }
                        } catch (ex) {

                        }
                    element = element.parentElement;
                }
                try{
                    that.getElementIndexForLabel(field, element);
                }catch(ex){}
            };
	     that.getFioriUi5Label = function (element, field) {
			var document = element.ownerDocument;
			var className = "", tempElement = element;
			if(field.type.toUpperCase() === "CLICKCARDHEADER" || field.type.toUpperCase() === "CLICKSTACKCARD"){
				field.label = that.getLabelOvpCard(element);
				return;
			}
			if (!that.checkIsEmpty(field.label)) {
				field.value = that.removeSpecialCharcode(field.value);
				field.label = that.removeSpecialCharcode(field.label);
				field.label = field.label.replace(/\r?\n|\r/g, " ");
				if (!that.checkIsEmpty(element.getAttribute("title")) || !that.checkIsEmpty(element.getAttribute("aria-label")) ) {
					field.label = element.getAttribute("title");
					if (that.checkIsEmpty(field.label)) {
						field.label = element.getAttribute("aria-label");
					}
					return;
				}
				if (field.type.indexOf("CheckBox") !== -1 || field.type.indexOf("TextView") !== -1 || field.type.indexOf("sapMITBText") !== -1 || field.type.indexOf("IconTabFilterText") !== -1 || field.type.indexOf("RadioButton") !== -1 || field.type.toUpperCase().indexOf("SEARCH") !== -1 || field.type.toUpperCase() === "ICONTABFILTER" ||  field.type.toUpperCase() === "LIST" || field.type.indexOf("SuiteIBCBarInteractionArea") !== -1 ) {
					if (!that.startCheckForEmptyString(field.label)) {
						if (field.type.indexOf("TextView") !== -1) {
							if (!that.startCheckForEmptyString(tempElement.getAttribute("aria-label"))) {
								field.label = tempElement.getAttribute("aria-label");
								field.label = field.label.replace(/\r?\n|\r/g, " ");
								return;
							}
							if (!that.startCheckForEmptyString(tempElement.getAttribute("title"))) {
								field.label = tempElement.getAttribute("title");
								field.label = field.label.replace(/\r?\n|\r/g, " ");
								return;
							}
							if (that.checkIsEmpty(that.traverseToParentbyClassName(element,"sapUiRespGridSpan"))) {
								return;
							}
							if(!that.checkIsEmpty(field.label) && !(that.defineCheck || that.defineExportImport)){
								return;
							}
	
						} else {
							return;
						}
					}
				} else if (field.type.toUpperCase().indexOf("SEGMENTBUTTON") !== -1) {
					if (tempElement.tagName.toUpperCase() === "LI") {
						return;
					}
				} else if (field.type.toUpperCase().indexOf("TreeList") !== -1) {
					while (tempElement.tagName.toUpperCase() !== "UL") {
						if (tempElement.tagName.toUpperCase() === "BODY") {
							break;
						}
						tempElement = tempElement.parentElement;
					} try { 
						field.label = tempElement.previousElementSibling.innerText; 
					} catch (ex) { }
					return;
				} else if(field.type.toUpperCase().indexOf("POPOVERHEADERTITLE") !== -1){
					tempElement = that.traverseToParentbyClassName(tempElement, "sapMLIBContent");
					field.label = tempElement.children.item(0).innerText.replace(/\r?\n|\r/g, " ");
					field.value = field.label;
					return;
				} else if(field.type.toUpperCase().indexOf("CALENDARAPPOINTMENT") !== -1){
					tempElement = that.traverseToParentbyClassName(tempElement, "sapUiCalendarAppCont");
					field.value = tempElement.innerText.replace(/\r?\n|\r/g, " ");
					tempElement = that.traverseToParentbyTagName(tempElement, "TR");
					field.label = tempElement.getElementsByClassName("sapMPlanCalRowHead")[0].innerText.replace(/\r?\n|\r/g, " ");
					return;
				}
			}
			var tempElementG = element;
			var flag = true;
			if(field.type === "ShellTile"){
				flag = false;
			}
			while (flag) {
				try{
					className = that.getclassName(tempElementG);
				}catch(ex){
					className = "";
				}
	
				if (className.indexOf("sapMDialogScrollCont") !== -1 || className.indexOf("sapUiIcon") !== -1  || className.indexOf("sapUiRespGrid") !== -1 || className.indexOf("sapUiVltCell") !== -1 || className === "sapUiRFLContainer" || className === "sapMFlexItem" || (className.indexOf("sapMFlexItem") !== -1 && that.getclassName(tempElementG.parentElement).indexOf("sapMFlexBox") !== -1 && that.getclassName(tempElementG.parentElement).indexOf("sapMFlexItem") === -1) || className.indexOf("sapMIBar sapMListHdrTBar") !== -1) {
					break;
				}
				if (tempElementG.tagName.toUpperCase() === "BODY") {
					break;
				}
				tempElementG = tempElementG.parentElement;
			}
			if (className.indexOf("sapMDialogScrollCont") !== -1 || className.indexOf("sapUiRespGrid") !== -1 || className.indexOf("sapUiVltCell") !== -1 || className === "sapUiRFLContainer" || className === "sapMFlexItem" || (className.indexOf("sapMFlexItem") !== -1 && that.getclassName(tempElementG.parentElement).indexOf("sapMFlexBox") !== -1 && that.getclassName(tempElementG.parentElement).indexOf("sapMFlexItem") === -1) || className.indexOf("sapMIBar sapMListHdrTBar") !== -1) {
				var lastText = "", tempElm;
				if (className.indexOf("sapUiRespGrid") !== -1) {
					field.listtype = "sapUiRespGrid";
					tempElm = that.traverseToParentbyClassName(tempElementG, "sapUiFormResGrid");
					if (that.startCheckForEmptyString(tempElm)) {
						tempElm = that.traverseToParentbyClassName(tempElementG, "sapUiRespGridMedia-Std-LargeDesktop");
					}
				}
				else if (className.indexOf("sapUiVltCell") !== -1) {
					field.listtype = "sapUiVltCell";
					tempElm = that.traverseToParentbyClassName(tempElementG, "sapUiCompFilter");
				}
				else if (className === "sapMFlexItem" || (className.indexOf("sapMFlexItem") !== -1 && that.getclassName(tempElementG.parentElement).indexOf("sapMFlexBox") !== -1 && that.getclassName(tempElementG.parentElement).indexOf("sapMFlexItem") === -1)) {
					field.listtype = "sapMFlexItem";
					tempElm = tempElementG.parentElement;
				} 
				else if (className.indexOf("sapMDialogScrollCont") !== -1) {
					field.listtype = "sapMDialogScrollCont";
					tempElm = tempElementG;
				} else if (className.indexOf("sapUiRFLContainer") !== -1) {
					field.listtype = "sapUiRFLContainer";
					tempElm = tempElementG.parentElement;
				}
				else if (className.indexOf("sapMIBar sapMListHdrTBar") !== -1) {
					tempElm = tempElementG;
				}
				if (tempElm !== "") {
					for (var i = 0; i < tempElm.children.length; i++) {
						if (that.isIdExist(element, tempElm.children.item(i))) {
							field.label = lastText;
							if (field.type.indexOf("CheckBox") !== -1 || field.type.indexOf("RadioButton") !== -1) {
								if (tempElm.children.item(i).nextElementSibling) {
									field.label = tempElm.children.item(i).nextElementSibling.innerText;
								}
							}
							flag = that.checkIsEmpty(field.label);
							if (flag) {
								flag = false;
								if (field.listtype === "sapMFlexItem") {
									if (that.getclassName(tempElm).indexOf("sapMFlexBox") !== -1 && that.getclassName(tempElm).indexOf("sapMFlexItem") === -1) {
	
										if(that.traverseToParentbyClassName(tempElm, "sapMFlexBox") !== "") {
											tempElm = that.traverseToParentbyClassName(tempElm, "sapMFlexBox");
										}
									} else {
										tempElm = that.traverseToParentbyClassName(tempElm, "sapMFlexBox");
										if (!that.checkIsEmpty(tempElm)) {
											tempElm = that.traverseToParentbyClassName(tempElm, "sapMFlexBox");
										}
									}
									if (!that.checkIsEmpty(tempElm)) {
										if (that.getclassName(tempElm).indexOf("sapMFlexBox") !== -1 && that.getclassName(tempElm).indexOf("sapMFlexItem") !== -1) {
	
											tempElm = that.traverseToParentbyClassName(tempElm, "sapMFlexBox");
										}
										if (tempElm !== "") {
											field.listtype = "sapMFlexBox";
											i = -1;
											continue;
										}
									}
									tempElm = that.traverseToParentbyClassName(element, "sapUiFormResGrid");
									if (tempElm !== "") {
										field.listtype = "sapUiFormResGrid";
										i = -1;
										continue;
									} else {
										tempElm = that.traverseToParentbyClassName(element, "sapUiVltCell");
										if (tempElm !== "") {
											tempElm = that.traverseToParentbyClassName(tempElementG, "sapUiCompFilter");
											if (that.checkIsEmpty(tempElm)) {
												field.listtype = "sapUiVltCell";
												i = -1;
												continue;
											}
	
										}
									}
	
								} else if (field.listtype === "sapUiRespGrid") {
									if (!that.checkIsEmpty(tempElm)) {
	
										if (tempElm.getElementsByClassName("sapMFlexBox").length > 0) {
											var mutiElements = tempElm.getElementsByClassName("sapMFlexBox");
											for (var len = 0; len < mutiElements.length; len++) {
												if (that.getclassName(mutiElements[len]) === "sapMFlexBox") {
													field.listtype = "sapMFlexBox";
													tempElm = mutiElements[len].parentElement;
													break;
												}
											}
										}
										if (field.listtype === "sapMFlexBox") {
											if (that.checkIsEmpty(tempElm)) {
												i = 0;
												continue;
											}
										}
									}
								}
							}
							if (!that.checkIsEmpty(field.label)) {
								if (field.label !== undefined && field.label !== null) {
									if (that.getNearText(field, tempElement, true) !== field.label) {
										field.label = that.getNearText(field, tempElement, true);
									}
									field.value = that.removeSpecialCharcode(field.value);
									field.label = that.removeSpecialCharcode(field.label);
									field.label = field.label.replace(/\r?\n|\r/g, " ");
								}
								return;
							}
						}
						if (tempElm === "") {
							break;
						}
						if (tempElm.children.item(i).innerText !== "") {
							lastText = tempElm.children.item(i).innerText;
						}
						if (tempElm.children.item(i).innerText !== "") {
							lastText = tempElm.children.item(i).innerText;
						}
	
	
	
					}
				}
				if (!that.startCheckForEmptyString(field.label)) {
					if (that.getNearText(field,tempElement,true) !== field.label) {
						if(field.type.indexOf("sapMObjStatusTitle") === -1){
							field.label = that.getNearText(field, tempElement, true);
						}
					}
					return;
				}
			}
			var areaexpand;
			switch (field.type.toUpperCase()) {
			case "CUSTOMTILE" :
			case "XRAYCAROUSEL":
				var tempElementXray = element;
				try {
					if (!that.checkIsEmpty(element)){
						tempElementXray = that.traverseToParentbyClassName(tempElementXray, "sapMTileContent");
						tempElementXray = tempElementXray.getElementsByClassName("sapMStdTileTitle")[0];
						field.label = tempElementXray.innerText.replace(/\r?\n|\r/g, " ");
					}
				}
				catch(ex){
					break;              
				}
				break;
	
			case "SHELLTILE":
				var tempElemnt = element;
				element = that.traverseToParentbyClassName(element, "sapUshellTileInner");
				if(that.checkIsEmpty(element)){
					element = tempElemnt;
					element = that.traverseToParentbyClassName(element, "sapSuiteHrdrCntrInner tileLayout");
				}
				if(that.checkIsEmpty(element)){
					element = tempElemnt;
					element = that.traverseToParentbyClassName(element, "sapSuiteHrdrCntrInner sapUiTinyMarginBegin tileLayout");
				}
				if(that.checkIsEmpty(element)){
					element = tempElemnt;
					element = that.traverseToParentbyClassName(element, "OneByOne sapMGT ");
	
				}
				if(that.checkIsEmpty(element)){
					element = tempElemnt;
					element = that.traverseToParentbyClassName(element, "OneByOne miniTileBackground sapMGT ");                  
				}
				if(that.checkIsEmpty(element)){
					element = tempElement;
					element = that.traverseToParentbyClassName(element, "TwoByOne sapMGT");
				}
				if(that.checkIsEmpty(element)){
					element = tempElement;
					try{
						if(tempElement.className.indexOf("TileDeleteIcon") !== -1){
							element =  that.traverseToParentbyTagName(element, "LI");
							element = element.getElementsByClassName("sapUshellTileInner")[0];
						}
					}catch(ex){
						element = "";
					}
					
				}
				var header;
				if (!that.checkIsEmpty(element)) {
					header = element.getElementsByClassName("sapMGTHdrContent");
					if (!that.checkIsEmpty(header) && header.length > 0) {
						header = header[0];
						field.label = header.innerText.replace(/\r?\n|\r/g, " ");
						if(that.checkIsEmpty(field.nodeKey)){
							field.nodeKey = that.getclassName(header);
						}
					}
	
					if (that.checkIsEmpty(field.label) && !that.checkIsEmpty(element)) {
						field.label = element.innerText.replace(/\r?\n|\r/g, " ");
						field.nodeKey = that.getclassName(element);
						try{
							var tempTile = element.getElementsByClassName("sapMNwC");
							if(!that.checkIsEmpty(tempTile) && tempTile.length > 0){
								field.label = element.innerText.replace(/\r?\n|\r/g, ""); 
							}
						}catch(ex){
	
						}
						if (that.startCheckForEmptyString(field.label)) {
						    try {
						        var buttonElement = that.traverseToParentbyTagName(element, "BUTTON");
						        if (!that.startCheckForEmptyString(buttonElement)) {
						            var previousTextForButton = that.getNearText("", element, true);
						            if (!that.startCheckForEmptyString(previousTextForButton)) {
						                field.label = previousTextForButton;
						                field.label = that.removeSpecialCharcode(field.label);
						            }
						        }
						    } catch (ex) {
	
						    }
						}
					}
	
					element = that.traverseToParentbyClassName(element, "sapUshellTileContainerContent");
					if(that.checkIsEmpty(element)){
						element = tempElemnt;
						element = that.traverseToParentbyClassName(element, "sapSuiteHrdrCntrInner tileLayout");
					}
					if(that.checkIsEmpty(element)){
						element = tempElemnt;
						element = that.traverseToParentbyClassName(element, "sapSuiteHrdrCntrInner sapUiTinyMarginBegin tileLayout");
					}
					if(that.checkIsEmpty(element)){
						element = tempElemnt;
						element = that.traverseToParentbyClassName(element, "OneByOne sapMGT ");
						try {
							element = element.getElementsByClassName("sapMGTHdrContent");
						} catch (ex) {}
	
					}
					if(that.checkIsEmpty(element)){
						element = tempElemnt;
						element = that.traverseToParentbyClassName(element, "OneByOne miniTileBackground sapMGT ");
						try {
							element = element.getElementsByClassName("sapMGTHdrContent");
						} catch (ex) {}
					}
					if(that.checkIsEmpty(element)){
						element = tempElement;
						var head;
						var tempEle = that.traverseToParentbyClassName(element,"sapUxAPObjectPageSubSection");
						if(!that.checkIsEmpty(tempEle)){
							try {
								head = tempEle.getElementsByClassName("sapUxAPObjectPageSubSectionHeaderTitle");
							} catch(ex) {}
							if(!that.checkIsEmpty(head[0])){
								element = head[0];
							}
						}
					}
					var value = "";
					if (element !== null) {
						try{
							if (element.children.length > 0){
								value = element.children.item(0).innerText.replace(/\r?\n|\r/g, " ");
							}
							else{
								value = element.innerText.replace(/\r?\n|\r/g, " ");
							}
						}catch(ex){
							value = "";
						}
	
					}
	
					try{
						field.label = value + "&~&" + field.label;
					}catch(ex){
	
					}
	
				} else {
					element = tempElement;
					element = that.traverseToParentbyClassName(element, "sapMGTHdrContent");
					if (!that.checkIsEmpty(element)) {
						field.label = element.innerText.replace(/\r?\n|\r/g, " ");
						try{
							field.name = element.getElementsByClassName("sapMGTHdrTxt")[0].innerText.replace(/\r?\n|\r/g, " ");
						} catch (ex) {
	
						}
	
					}
				}
				break;
			case "INPUTHELP":
			case "VALUEHELP":
			case "TEXTAREA":
			case "INPUTFIELD":
				try {
					if (field.type.toUpperCase() === "VALUEHELP" && field.UITECH === "05") {
						tempElement = tempElement.parentElement;
						tempElement = tempElement.getElementsByTagName("input")[0];
						field.id = tempElement.id;
					}
					var labelElement;
					if (that.checkIsEmpty(field.label)) {
						labelElement = element.ownerDocument.getElementById("label_" + field.id);
						if (labelElement !== null) {
							field.label = labelElement.innerText;
						}
					}
					if (that.checkIsEmpty(field.label)) {
						labelElement = that.getElementByAttribute("for", field.id, document);
						if (labelElement !== null) {
							field.label = labelElement.innerText;
						}
					}
					if (that.checkIsEmpty(field.label)) {
						field.label = tempElement.ownerDocument.getElementById(field.id).getAttribute("placeholder");
						if (that.checkIsEmpty(field.label)) {
							field.label = tempElement.ownerDocument.getElementById(field.id).getAttribute("title");
						}
	
					}
					if (that.checkIsEmpty(field.label)) {
						field.label = that.getNearText(field, document.getElementById(field.id), true);
					}
				} catch (ex) {
					try {
						if (that.checkIsEmpty(field.label)) {
							field.label = tempElement.ownerDocument.getElementById(field.id).getAttribute("placeholder");
							if (that.checkIsEmpty(field.label)) {
								field.label = tempElement.ownerDocument.getElementById(field.id).getAttribute("title");
								if (that.checkIsEmpty(field.label)) {
									field.label = tempElement.ownerDocument.getElementById(field.id).getAttribute("aria-label");
									if (that.checkIsEmpty(field.label)) {
										field.label = tempElement.ownerDocument.getElementById(field.id).getAttribute("value");
										if (that.checkIsEmpty(field.label)) {
											field.label = tempElement.ownerDocument.getElementById(field.id).parentElement.innerText;
										}
									}
								}
							}
	
						}
					}
					catch (ext) {
	
					}
				}
				break;
			case "BUTTON":
			case "LINK":
			case "TEXTLINK":
			case "LISTTEXTLINK":
			case "SEGMENTBUTTON":
				field.label = element.innerText;
				field.label = that.removeSpecialCharcode(field.label);
				field.label = field.label.replace(/\r?\n|\r/g, " ");
				if (field.label === "") {
					switch (field.type.toUpperCase()) {
					case "LINK":
					case "TEXTLINK":
					case "LISTTEXTLINK":
						tempElement = that.traverseToParentbyTagName(element, "A");
						break;
					case "BUTTON":
						tempElement = that.traverseToParentbyTagName(element, "BUTTON");
						if(that.checkIsEmpty(tempElement)){
							tempElement = element;
							while(tempElement.tagName.toUpperCase() !== "BODY"){
								if(tempElement.getAttribute("role") === "button"){
									break;
								}else{
									tempElement = tempElement.parentElement;
								}
							}
	
						}
						break;
					case "SEGMENTBUTTON":
						tempElement = that.traverseToParentbyTagName(element, "LI");
					}
					if (that.checkIsEmpty(field.label)) {
						field.label = tempElement.getAttribute("aria-label");
					}
					if (that.checkIsEmpty(field.label)) {
						field.label = tempElement.getAttribute("title");
					}
					if (that.checkIsEmpty(field.label)) {
						var tempEle = document.getElementById(field.id);
						if (tempEle) {
							if (that.getclassName(tempEle).indexOf("sapMPanelExpandableIcon") !== -1) {
								areaexpand = false;
								areaexpand = tempEle.getAttribute("aria-expanded");
								if (areaexpand === "true") {
									field.label = "Expand";
								} else {
									field.label = "Collapsed";
								}
							}
							if (that.checkIsEmpty(field.label)) {
								field.label = tempEle.getAttribute("aria-label");
							}
							if (that.checkIsEmpty(field.label)) {
								field.label = tempEle.getAttribute("title");
							}
						}
					}
				}
				break;
			case "SAPUIICON":
			case "LISTICON":
				var temp = document.getElementById(field.id);
				if (temp) {
					if (that.getclassName(temp).indexOf("sapMPanelExpandableIcon") !== -1) {
						areaexpand = false;
						areaexpand = temp.getAttribute("aria-expanded");
						if (areaexpand === "true") {
							field.label = "Expand";
						} else {
							field.label = "Collapsed";
						}
					}
					if (that.checkIsEmpty(field.label)) {
						field.label = temp.getAttribute("aria-label");
					}
					if (that.checkIsEmpty(field.label)) {
						field.label = temp.getAttribute("title");
					}
				}
				break;
	
			case "LISTSWITCH":
				try{
					tempElement = that.traverseToParentbyClassName(tempElement, "sapMLIBContent");
					field.label = tempElement.getElementsByTagName("label")[0].innerText.replace(/\r?\n|\r/g, " ");
				}catch(ex){
					field.label = that.getNearText(field, tempElement, true);
				}
				break;
			case "LISTINPUT":
			case "SWITCH":
				field.label = that.getNearText(field, tempElement, true);
				break;
			case "OVPSELECT":
				field.name = that.getLabelOvpCard(tempElement);
				break;
			default:
				if (field.label === undefined){
					field.label = "";
				}
			break;
			}
			if(!that.checkIsEmpty(element)){
				if (that.checkIsEmpty(field.label)) {
					field.label = element.parentElement.getAttribute("title");
				}
				if (that.checkIsEmpty(field.label)) {
					field.label = element.innerText;
					field.value = that.removeSpecialCharcode(field.value);
					field.label = that.removeSpecialCharcode(field.label);
					field.label = field.label.replace(/\r?\n|\r/g, " ");
				}
				if (that.checkIsEmpty(field.label)) {
					field.label = document.getElementById(field.id).innerText;
					field.value = that.removeSpecialCharcode(field.value);
					field.label = that.removeSpecialCharcode(field.label);
					field.label = field.label.replace(/\r?\n|\r/g, " ");
				}
				if (that.checkIsEmpty(field.label)) {
					field.label = element.getAttribute("value");
					if (that.checkIsEmpty(field.label)) {
						field.label = document.getElementById(field.id).getAttribute("value");
					}
				}
				if (that.checkIsEmpty(field.label)) {
					if (field.type.toUpperCase() === "CHECKBOX" || field.type.toUpperCase() === "RADIOBUTTON" || field.type.toUpperCase() === "SELECTLISTCHECKBOX") {
						field.label = that.getNearText(field, document.getElementById(field.id), false);
					} else {
						field.label = that.getNearText(field, document.getElementById(field.id), true);
					}
	
				}
				if (field.type === "Select" && that.checkIsEmpty(field.label)) {
					field.label = element.parentElement.innerText.replace(/\r?\n|\r/g, " ");
				}
				if (that.checkIsEmpty(field.label)) { 
					field.label = field.id;
				}
				if (field.label !== undefined && field.label !== null) {
					field.value = that.removeSpecialCharcode(field.value);
					field.label = that.removeSpecialCharcode(field.label);
					field.label = field.label.replace(/\r?\n|\r/g, " ");
				}
			}else{
				element = that.traverseToParentbyClassName(tempElement, "sapUshellTileActionLayerDiv");
				element = that.traverseToParentbyClassName(element, "sapUshellTileInner");
				that.getFioriUi5Label(element, field);
			}
	
		};
            that.checkIsDroppable = function (elemnt) {
                while (!that.checkIsEmpty(elemnt)) {
                    if (elemnt.tagName.toUpperCase() === "BODY") {
                        return false;
                    } else {
                        try{
                            if (that.getclassName(elemnt).indexOf("ui-droppable") !== -1) {
                                return true;
                            }
                        } catch (ex) {

                        }
                        
                    }
                    elemnt = elemnt.parentElement;
                }
            };
            that.checkIsDraggable = function (elemnt) {
                while (!that.checkIsEmpty(elemnt)) {
                    if (elemnt.tagName.toUpperCase() === "BODY") {
                        return false;
                    } else {
                        try {
                            if (that.getclassName(elemnt).indexOf("ui-draggable") !== -1) {
                                return true;
                            }
                        } catch (ex) {

                        }
                        
                    }
                    elemnt = elemnt.parentElement;
                }
            };
            that.isTile = function (element, field) {
                var flag = true;
                while (flag) {

                    if (that.getclassName(element).indexOf("sapUshellTileInner") !== -1 || that.getclassName(element).indexOf("OneByOne sapMGT ") !== -1 || that.getclassName(element).indexOf("TwoByOne sapMGT") !== -1|| that.getclassName(element).indexOf("sapMTCScrl") !== -1 || that.getclassName(element).indexOf("OneByOne myclass sapMGT") !== -1 || that.getclassName(element).indexOf("OneByOne miniTileBackground sapMGT ") !== -1 ) {
                        field.nodeKey = element.getAttribute("class");
                        return true;
                    }
                    if (element.tagName.toUpperCase() === "BODY"){ 
                    	return false;
                    }
                    element = element.parentElement;
                    if (that.checkIsEmpty(element)) {
                        return false;
                    }
                }
            };
            that.preventActionsToHappen = function (event) {
                event.preventDefault();
                event.stopPropagation();
            };
            that.preventDefaultTowholeDoc = function (win) {
            	 var allElements;
                 var curWindow;
                 while (!addEventListener) { }
                 if (addEventListener) {
                     try {
                         curWindow = win;
                         allElements = curWindow.document.all;
                         for (var i = 0; i < allElements.length; i++) {
                             allElements[i].addEventListener('click', that.preventActionsToHappen);
                         }
                     } catch (ex) {

                     }
                     if (win.frames.length > 0) {
                         for (var j = 0; j < win.frames.length; j++) {
                             try {
                                 curWindow = win.frames[j].window;
                                 allElements = curWindow.document.all;
                             } catch (ex) {
                                 continue;
                             }
                             
                             for (var k = 0; k < allElements.length; k++) {
                                 allElements[k].addEventListener('click', that.preventActionsToHappen);
                             }
                             that.preventDefaultTowholeDoc(curWindow);
                         }
                     } else {

                         try {
                             allElements = win.document.all;
                             for (var l = 0; l < allElements.length; l++) {
                                 allElements[l].removeEventListener('click', that.preventActionsToHappen);
                             }
                         } catch (ex) {

                         }
                     }

                 }
            };
            that.enableDefaultToWholeDoc = function (win) {
            	 var allElements;
                 var curWindow;
                 while (!removeEventListener) { }
                 if (removeEventListener) {
                     try{
                         curWindow = win;
                         allElements = curWindow.document.all;
                         for (var i = 0; i < allElements.length; i++) {
                             allElements[i].removeEventListener('click', that.preventActionsToHappen);
                         }
                     } catch (ex) {

                     }
                     if (win.frames.length > 0) {
                         for (var j = 0; j < win.frames.length; j++) {
                             try{
                                 curWindow = win.frames[j].window;
                                 allElements = curWindow.document.all;
                             } catch (ex) {
                                 continue;
                             }
                              
                             
                             for (var k = 0; k < allElements.length; k++) {
                                 allElements[k].removeEventListener('click', that.preventActionsToHappen);
                             }
                             that.enableDefaultToWholeDoc(curWindow);
                         }
                     } else {
                         try{
                             allElements = win.document.all;
                             for (var l = 0; l < allElements.length; l++) {
                                 allElements[l].removeEventListener('click', that.preventActionsToHappen);
                             }
                         } catch (ex) {

                         }
                             
                         
                     }
                 }
            };
            that.setBackIdUicheck = function (event) {
            	var element = event.srcElement || event.target;
                that.pevElementIdforImpChk = element.id;
                that.setBackIdUicheck.eventElm = element;
                that.setBackIdUicheck.eventElm.setAttribute('id', '');
                setTimeout(function (event) {
                    that.setBackIdUicheck.eventElm.setAttribute('id', that.pevElementIdforImpChk);
                    that.setBackIdUicheck.eventElm = undefined;
                    that.pevElementIdforImpChk = "";
                }, 1000);
            };
            
		    that.getFioriUi5ElementProperties = function (element, tagName, field, sapModjId) {
				var className = "", tempElement = element;
				className = that.getclassName(element);
				var tempclass="";
				var isList = that.isListFioriUi5(element);
				var isColHeader = that.traverseToParentbyClassName(element, "sapMListTblHeaderCell");
				if (!that.checkIsEmpty(isColHeader)) {
					field.type = "ColumnHeader";
					field.nodeKey = that.getclassName(tempElement);
					try{
						if(element.getAttribute("type") === "CheckBox"){
							field.type = "CheckBox";
							try{
								while(isColHeader.children.length > 0){
									if(isColHeader.getAttribute("role") === "checkbox"){
										field.id = isColHeader.id;
										break;
									}else{
										isColHeader = isColHeader.children.item(0);
									}
								}
							}catch(ex){
		
							}
							try{
								if(tempElement.getAttribute("checked").toUpperCase() === "CHECKED"){
									field.value = "";
								}else{
									field.value = "X";
								}
							}catch(ex){
								field.value = "X";
							}
						}    
					}catch(ex){
		
					}
					return;
				}
				var role;
				try {
					role = element.getAttribute("role");
				} catch (ex) {
					role = "";
				}
				if (role === null) {
					role = "";
				}
				switch (tagName) {
				case "A":
					try {
						while (className === "") {
							tempElement = tempElement.parentElement;
							className = that.getclassName(tempElement);
						}
					} catch (ex) { }
					if (className.indexOf("sapM") !== -1) {
						if (isList){
							field.type = "ListTextLink";
						}
						else {
							field.type = "TextLink";
						}
		
						try{
							if (tempElement.getAttribute("role") === "menuitem") {
								field.type = "TopNavigationList";
							}
						} catch (ex) {
		
						}
					}
					else {
						if (isList) {
							if (role !== "") {
								switch (role.toUpperCase()) {
								case "BUTTON":
									field.type = 'UiListButton';
									break;
								case "MENUITEMRADIO":
									field.type = 'UiListTab';
									break;
								}
							}
							else {
								return 'UiListLink';
							}
		
						}
						else {
							if (role !== "") {
								switch (role.toUpperCase()) {
								case "BUTTON":
									field.type = 'Button';
									break;
								case "MENUITEMRADIO":
									field.type = 'Tab';
									break;
								}
							}
							else {
								field.type = 'Link';
							}
						}
					}
					break;
				case "BUTTON":
					try {
						role = tempElement.getAttribute("role");
					} catch (ex) { }
					if (role === null){ 
						role = "";
					}
					if (field.label === null || field.label === "") {
						field.label = tempElement.getAttribute("title");
						field.value = field.label;
					}
					try {
						field.nodeKey = tempElement.getAttribute("class");
					} catch (ex) {
						field.nodeKey = "";
					}
					if (field.nodeKey === null) {
						field.nodeKey = "";
					}
					if (field.nodeKey.indexOf("ComboBox") !== -1) {
						if (field.nodeKey.indexOf("sapMMultiComboBox") !== -1) {
							field.type = "MultiSelectComboBox";
							field.action = "Field";
						} else if (field.nodeKey.indexOf("sapMComboBoxArrow") !== -1) {
							field.type = "Select";
							field.action = "Field";
						} 
						that.getFioriUi5Label(tempElement, field);
					}
					if (isList) {
						if (role !== null) {
							switch (role.toUpperCase()) {
							case "BUTTON":
								field.type = 'UiListButton';
								break;
							case "MENUITEMRADIO":
								field.type = 'UiListTab';
								break;
							}
						}
					}
					else {
						if (role !== null) {
							switch (role.toUpperCase()) {
							case "BUTTON":
								field.type = "Button";
								if (className.indexOf("sapHpaGsegSegmContextMenuButton") !== -1) {
									field.type = "SegmentButton";
									field.action = "Field";
									try {
										tempElement = that.traverseToParentbyClassName(tempElement, "ui-droppable");
										tempElement = tempElement.getElementsByClassName("sapHpaGsegSegmLabelText")[0];
										field.value = tempElement.innerText;
									} catch (ex) {
		
									}
								}
								break;
							case "MENUITEMRADIO":
								field.type = 'Tab';
								break;
							}
						}
					}
					break;
				case "SPAN":
					className = that.getclassName(tempElement);
					var ele;
					if (className !== null) {
						if (className.indexOf("InputValHelp") !== -1 || className.indexOf("ValueHelp") !== -1) {
							that.clickFioriUi5.inputHelp = tempElement; // added for the reason, id of this inputhelp is changing during next action click, so we are storing this element completely
							field.type = "InputHelp";
							if (field.UITECH === "05") {
								field.type = "ValueHelp";
							}
		
						}
						else if (className.indexOf("sapMITB") !== -1 && (className.indexOf("sapUiIcon") === -1 || !that.checkIsEmpty(that.traverseToParentbyClassName(tempElement, "sapMITBTab")))) {
							if (className.indexOf("sapMITBCount") !== -1) {
								field.type = "IconTabFilterCount";
							} else {
								field.type = "IconTabFilter";
								field.value = tempElement.innerText;
							}
							tempElement = tempElement.parentElement.parentElement;
							try {
								field.label = tempElement.getAttribute("aria-label");
								if (that.checkIsEmpty(field.label)) {
									field.label = tempElement.getAttribute("title");
								}
								if (that.checkIsEmpty(field.label)) {
									try {
										field.label = tempElement.getElementsByClassName("sapMITBText")[0].innerText;
									} catch (ex1) { }
								}
								if (!that.defineCheck && !that.defineExportImport) { field.value = field.label; }
		
							} catch (ex) {
		
							}
							field.id = tempElement.id;
		
		
							className = tempElement.getAttribute("class");
						}
						else if (className.indexOf("sapMSwt") !== -1) {
							field.action = "Field";
							field.type = "Switch";
							tempElement = tempElement.parentElement;
							field.id = tempElement.id;
							className = tempElement.getAttribute("class");
							while (className.indexOf("sapMSwtOff") === -1 && className.indexOf("sapMSwtOn") === -1) {
								tempElement = tempElement.parentElement;
								className = tempElement.getAttribute("class");
								if (className === null) {
									className = " ";
								}
							}
							if (className.indexOf("sapMSwtOff") !== -1) {
								field.value = "ON";
								if (that.defineCheck || that.defineExportImport){
									field.value = "OFF";
								}
							}
							else {
								field.value = "OFF";
								if (that.defineCheck || that.defineExportImport){
									field.value = "ON";
								}
							}
							if (field.label == tempElement.innerText) {
								field.label = "";
							}
						}
						else if (className.indexOf("sapMToken") !== -1) {
							field.id = tempElement.id;
							field.type = "MToken";
							field.label = tempElement.parentElement.innerText.replace(/\r?\n|\r/g, " ");
							field.name = field.id;
						} else if (className.indexOf("sapMSltArrow") !== -1 || className.indexOf("sapMComboBox") !== -1) {
							field.action = "Field";
							if (className.indexOf("sapMMultiComboBox") !== -1) {
								field.type = "MultiSelectComboBox";
							} else {
								field.type = "Select";
								if(!that.checkIsEmpty(that.traverseToParentbyClassName(tempElement,"sapOvp"))){
									field.type = "OvpSelect";
								}
							}
		
						}else if(className.indexOf("sapMGrowingList") !== -1 || className.indexOf("sapMSLITitle") !== -1){
							field.action = "Click";
							field.type = "PopoverHeaderTitle";
						} else if (className.indexOf("sapMMultiComboBox") !== -1) {
							field.action = "Field";
							field.type = "MultiSelectComboBox";
						}else if (className.indexOf("sapUiIcon") !== -1) {
							field.type = "sapUiIcon";
							try{
								if (!that.checkIsEmpty(that.traverseToParentbyClassName(tempElement, "sapTetrisHoursCell")) || !that.checkIsEmpty(that.traverseToParentbyClassName(tempElement, "sapTetrisColumn"))) {
									if (!that.checkIsEmpty(that.traverseToParentbyClassName(tempElement, "sapTetrisColumn"))) {
										field.type = "TimeSheetClose";
										field.id = tempElement.id;
									} else {
										field.type = "TimeSheetClick";
										field.id = that.traverseToParentbyClassName(tempElement, "sapTetrisHoursCell").id;
									}
		
									field.name = field.id;
								}
								else if(className.indexOf("sapUiCalendarAppIcon") !== -1){
									field.type = "CalendarAppointment";
									field.action = "Field";
								}
							}catch(ex){}
							if(field.type === "sapUiIcon" && (that.checkIsEmpty(tempElement.getAttribute("title")) || that.checkIsEmpty(tempElement.getAttribute("aria-label")))){
								var checkButtonEle = tempElement.parentElement;
								while(checkButtonEle.tagName.toUpperCase() !== "BODY"){
									if(checkButtonEle.getAttribute("role") === "button"){
										if(!(that.checkIsEmpty(checkButtonEle.getAttribute("title")) || that.checkIsEmpty(checkButtonEle.getAttribute("aria-label")))){
											field.type = "Button";
											field.id  = checkButtonEle.id;
											break;
										}
										}else if(!that.checkIsEmpty(checkButtonEle.getAttribute("class")) && checkButtonEle.getAttribute("class").indexOf("sapMDP") !== -1){
											field.type = "DateInputHelp";
											field.id  = checkButtonEle.id;
											break;
										}
									checkButtonEle = checkButtonEle.parentElement;
								}
							}
						}else if(className.indexOf("sapUxAPObjectPage") !== -1){
							if(className.indexOf("sapUxAPObjectPageHeaderIdentifierTitle") !== -1 || className.indexOf("sapUxAPObjectPageHeaderTitle") !== -1){
								field.type = "ObjectPageTitle";
							}else if(className.indexOf("sapUxAPObjectPageHeaderIdentifierDescription") !== -1){
								field.type = "ObjectPageDescription";
							}else if(className.indexOf("sapUxAPObjectPageHeaderIdentifierActions") !== -1){
								field.type = "ObjectPageAction";
							}
							try {
								while(that.checkIsEmpty(field.id)){
									field.id = tempElement.parentElement.id;
									tempElement = tempElement.parentElement;
								}
								if(that.checkIsEmpty(field.name)){
									field.name = field.id;
								}
							}
							catch (ex) {
		
							}
		
						} else if (className.indexOf("sapMObjectNumber") !== -1) {
							if(className.indexOf("sapMObjectNumberUnit") !== -1){
								field.type = "ObjectNumberUnit";
							}else if(className.indexOf("sapMObjectNumberText") !== -1){
								field.type = "ObjectNumberText";
							}else{
								field.type = "ObjectNumber";
							}
							try {
								while(that.checkIsEmpty(field.id)){
									field.id = tempElement.parentElement.id;
									tempElement = tempElement.parentElement;
								}
								if(that.checkIsEmpty(field.name)){
									field.name = field.id;
								}
		
							}
							catch (ex) {
		
							}
						} else if (className.indexOf("sapUiUfdCurrency") !== -1 || className.indexOf("sapUiTv") !== -1 || className.indexOf("sapMLabel") !== -1 || className.indexOf("sapMText") !== -1 || className.indexOf("sapUxAPObjectPageHeader") !== -1) {
							field.type = "TextView";
						}
						else if (className.indexOf("sapMObjectAttributeText") !== -1) {
							field.type = "ObjectAttribute";
							try{
								if(tempElement.parentElement.getAttribute("role").toUpperCase() === "LINK"){
									field.type = "Link";
								}
							}catch(ex){
		
							}
						}
						else if (className.indexOf("sapMTabStripItem") !== -1) {
							field.type = "Tab";
						} 
						else if (className.indexOf("sapUiCalItem") !== -1) {
							field.type = "sapMeCalendar";
							field.label = "Calender Date";
							field.id = tempElement.parentElement.id;
							field.name = field.id;
							var valueDate = new Date(tempElement.parentElement.getAttribute("aria-label"));
							field.value = valueDate.getDate() + "." + (valueDate.getMonth() + 1 )+ "." + valueDate.getFullYear();
							field.action = "Field";
							if(!that.checkIsEmpty(that.traverseToParentbyClassName(tempElement,"sapUiCalRow"))){
								if(that.getclassName(that.traverseToParentbyClassName(tempElement,"sapUiCalRow")).indexOf("sapUiCalDatesRow") !== -1 || that.getclassName(that.traverseToParentbyClassName(tempElement,"sapUiCalRow")).indexOf("sapUiCalMonthsRow") !== -1){
									field.type = "planningCalRow";
									field.label = "Calendar Date Row";
								}
							}
						}else if(className.indexOf("sapUiCalDayName") !== -1){
							field.type = "planningCalRow";
							field.label = "Calendar Date Row";
							field.id = tempElement.parentElement.id;
							field.name = field.id;
							var valueDate = new Date(tempElement.parentElement.getAttribute("aria-label"));
							field.value = valueDate.getDate() + "." + (valueDate.getMonth() + 1 )+ "." + valueDate.getFullYear();
							field.action = "Field";
							field.nodeKey = that.getclassName(tempElement);
						}
						else if (className.indexOf("sapUiUfdShellHead") !== -1){
							field.type = "UiUfdShellHead";
						}
						else if (className.indexOf("sapUiTableTreeIcon") !== -1){
							if(className.indexOf("sapUiTableTreeIconNodeOpen") !== -1){
								field.type = "Collapse";
							} else if(className.indexOf("sapUiTableTreeIconNodeClosed") !== -1){
								field.type = "Expand";
							}
						}else if(className.indexOf("sapUiCalendarApp") !== -1){
							field.type = "CalendarAppointment";
							field.action = "Field";
						}
						else {
							if (that.startCheckForEmptyString(field.type)) {
								field.type = className.split(" ")[0];
								if (that.startCheckForEmptyString(field.type)) {
									field.type = "TextView";
								}
							}
						}
					}
					field.nodeKey = className;
		
					break;
				case "IMG":
					break;
				case "INPUT":
					tempclass = "";
					ele = tempElement;
					field.nodeKey = that.getclassName(tempElement);
					if (tempElement.type.toUpperCase() === "RADIO" || tempElement.type.toUpperCase() === "CHECKBOX") {
						if (tempElement.type.toUpperCase() === "RADIO") {
							field.type = "RadioButton";
							if(!(that.defineCheck || that.defineExportImport)) {
								field.value = "X";
							}
							else {
								try {
									if (tempElement.getAttribute("checked").toUpperCase() === "CHECKED") {
										field.value = "X";
									}
									else {
										field.value = "";
									}
								}
								catch(ex){
									field.value = "";
								}
							}
		
						}
						else if (tempElement.type.toUpperCase() === "CHECKBOX") {
							field.type = "CheckBox";
							if (tempElement.getAttribute("checked") !== null) {
								if (tempElement.getAttribute("checked").toUpperCase() === "CHECKED") {
									field.value = "";
								}
								else {
									field.value = "X";
								}
							}
							else {
								field.value = "X";
							}
							if (field.changeable !== undefined) {
								if (field.changeable === "false") {
									if (field.value === "X") {
										field.value = "";
									} else
										field.value = "X";
								}
							}
						}
						if ((that.defineCheck || that.defineExportImport) && tempElement.type.toUpperCase() !== "RADIO") {
							if (field.value === "X"){
								field.value = "";
							}
							else{
								field.value = "X";
							}
						}
						var flag = true;
						while (flag) {
							while (ele.getAttribute("role") === null) {
								ele = ele.parentElement;
								if (ele === null) { field.nodeKey = ""; break; }
							}
							if (ele === null) {
								break;
							}
							if (ele.getAttribute("role").toUpperCase() === "RADIO" || ele.getAttribute("role").toUpperCase() === "CHECKBOX") {
								field.id = ele.id;
								field.name = field.id;
								field.label = ele.innerText.replace(/\r?\n|\r/g, " ");
								if (that.checkIsEmpty(field.label)) {
									field.label = ele.getAttribute("aria-label");
								}
								if (that.checkIsEmpty(field.label)) {
									ele = ele.parentElement;
									field.label = ele.innerText.replace(/\r?\n|\r/g, " ");
									if (!that.checkIsEmpty(ele.nextElementSibling) && that.checkIsEmpty(field.label)) {
										if (that.getclassName(ele).indexOf("sapUiRespGrid") !== -1) {
											try {
												field.label = ele.previousElementSibling.innerText.replace(/\r?\n|\r/g, " ");
											} catch (ex) {
		
											}
		
										} else {
											field.label = ele.nextElementSibling.innerText.replace(/\r?\n|\r/g, " ");
											try {
												if (that.checkIsEmpty(field.label) && that.checkIsDisplayNone(ele.nextElementSibling.children.item(0))){
													field.label = ele.nextElementSibling.nextElementSibling.innerText.replace(/\r?\n|\r/g, " ");
												}
											} catch (ex){}
										}
									}
									if (that.checkIsEmpty(field.label)) {
										if (!that.checkIsEmpty(ele.previousElementSibling) && that.checkIsEmpty(field.label)) {
											field.label = ele.previousElementSibling.innerText.replace(/\r?\n|\r/g, " ");
										}
									}
								}
								role = ele.getAttribute("role");
								try {
									field.nodeKey = ele.getAttribute("class");
								} catch (ex) {
									field.nodeKey = "";
								}
								break;
							}
							else {
								ele = ele.parentElement;
							}
						}
					}
					if (tempElement.type.toUpperCase() === "TEXT" || tempElement.type.toUpperCase() === "EMAIL" || tempElement.type.toUpperCase() === "PASSWORD" || tempElement.type.toUpperCase() === "TEl" || tempElement.type.toUpperCase() === "NUMBER" || tempElement.type.toUpperCase() === "URL") {
						try { role = ele.getAttribute("role"); }
						catch (ex) { role = ""; }
						if (tempclass === null) {
							role = "";
						}
						while (flag) {
							while (ele.getAttribute("role") === null) {
								ele = ele.parentElement;
								if (ele === null) { field.nodeKey = ""; break; }
		
							}
							if (ele === null){ break; }
							if (ele.getAttribute("role").toUpperCase() === "RADIO" || ele.getAttribute("role").toUpperCase() === "CHECKBOX") {
								field.id = ele.id;
								field.name = field.id;
								field.label = ele.innerText.replace(/\r?\n|\r/g, " ");
								role = ele.getAttribute("role");
								try {
									field.nodeKey = ele.getAttribute("class");
								} catch (ex) {
									field.nodeKey = "";
								}
								break;
							}
							else {
								ele = ele.parentElement;
							}
						}
						field.type = "InputField";
						if (field.nodeKey.indexOf("ComboBox") !== -1) {
							if (field.nodeKey.indexOf("sapMMultiComboBox") !== -1) {
								field.type = "MultiSelectComboBox";
							}
		
						}
					}
					if (tempElement.type.toUpperCase() === "SEARCH") {
		
		
						field.id = tempElement.id;
						field.name = field.id;
						field.label = tempElement.getAttribute("placeholder");
						field.type = "search";
						try {
							field.nodeKey = ele.getAttribute("class");
						} catch (ex) {
							field.nodeKey = "";
						}
						if (field.nodeKey === null){ 
							field.nodeKey = "";
						}
					}
					break;
				case "LI":
					var x;
					field.action = "Field";
					if (field.type === "Image") {
						field.type = " ";
					}
		
					classname = tempElement.getAttribute("class");
					if (classname !== null) {
						if (classname.indexOf("sapMSegBBtn") !== -1) {
							field.action = "Click";
							field.type = "SegmentButton";
							field.label = tempElement.getAttribute("title");
							if(that.checkIsEmpty(field.label)){
								field.label = tempElement.innerText.replace(/\r?\n|\r/g, " ");
							}
							field.value = field.label;
							break;
						}
		
					} if (that.checkIsEmpty(field.type)) {
						field.type = "List";
						if (classname.indexOf("sapMMultiComboBoxItem") !== -1) {
							field.type = "SelectListCheckBox";
						}
						field.label = tempElement.innerText.replace(/\r?\n|\r/g, " ");
						field.value = field.label;
						field.index = that.startGetListIndex(tempElement);
		
						field.id = tempElement.parentElement.parentElement.id;
					}
					else {
						if (field.type === "CheckBox") {
							if (field.value === "X") {
								field.type = "SelectListCheckBox";
							} else {
								field.type = "UnSelectListCheckBox";
							}
		
						}
						else if (field.type === "RadioButton") {
							field.type = "ListRadioButton";
						}
						else if (field.type === "InputField") {
							field.type = "ListInput";
						}
						else if (field.type === "search") {
							field.type = "Listsearch";
		
						}
						else if (field.type === "TextArea") {
							field.type = "ListTextArea";
						}
						else if (field.type === "IconTabFilter") {
							field.type = "ListIconTabFilter";
						}
						else if (field.type === "Switch") {
							field.type = "ListSwitch";
							field.label = "";
						}
						else if(field.type === "Link"){
							field.action = "Click";
							field.type = "ListLink";
							field.label = that.traverseToParentbyTagName(tempElement, "LI").innerText.replace(/\r?\n|\r/g, "");
		
						}
						else if (field.type === "Select") {
							field.type = "ListSelect";
						}
						else if (field.type === "sapUiIcon") {
							field.action = "CLICK";
							field.type = "ListIcon";
		
						} else if (field.type === "Button") {
							field.action = "CLICK";
							field.type = "ListButton";
						} else if (field.type === "InputHelp" || field.type === "ValueHelp") {
							field.action = "CLICK";
							field.type = "ListInputHelp";
						} else if (field.type === "ListTextLink") {
							field.type = "ListTextLink";
							field.label = tempElement.innerText;
						}else if (field.type === "UiListButton") {
						    field.type = "UiListButton";
						    field.label = tempElement.innerText;
						} else {
							field.type = "List";
		
						}
						if (field.type === "List") {
		
							field.label = tempElement.innerText.replace(/\r?\n|\r/g, " ");
							field.value = field.label;
							if (classname.indexOf("ui-draggable") !== -1) {
								field.type = "TreeList";
							}
							if(tempElement.className.indexOf("sapMCLI") !== -1){
								try{
									field.label = tempElement.getElementsByClassName("sapMObjectIdentifier")[0].innerText.replace(/\r?\n|\r/g, " ");
								}catch(ex){
									field.label = field.value;
								}
		
								field.value = field.label;
							}
						}
						// value = label;
						field.index = that.startGetListIndex(tempElement);
					}
					classname = tempElement.parentElement.getAttribute("class");
					if (classname !== null) {
						field.nodeKey = classname.split(" ")[0];
					}
		
					var headerele;
					var headerDivElement = that.traverseToParentbyTagName(tempElement, "DIV");
					if (!that.startCheckForEmptyString(headerDivElement) && !that.startCheckForEmptyString(headerDivElement.children.item(0)) && headerDivElement.children.item(0).tagName === "HEADER") {
						tempElement = headerDivElement.children.item(0);
					} else {
						while (tempElement.tagName.toUpperCase() !== "SECTION" && tempElement.tagName.toUpperCase() !== "BODY") {
							tempElement = tempElement.parentElement;
						}
					}
		
					if (tempElement.tagName.toUpperCase() !== "BODY") {
						// tempElement =
						// tempElement.parentElement.children.item(0);
		
						for (x = 0 ; x < tempElement.parentElement.children.length; x++) {
							if (tempElement.parentElement.children.item(x).tagName.toUpperCase() === "HEADER") {
								headerele = tempElement.parentElement.children.item(x);
								break;
							}
						}
						try {
							field.name = headerele.innerText.replace(/\r?\n|\r/g, " ");
						} catch (ex) {
							field.name = "";
						}
		
		
						if (field.name === "") {
							tempElement = tempElement.parentElement;
							while (tempElement.tagName.toUpperCase() !== "SECTION" && tempElement.tagName.toUpperCase() !== "BODY") {
								tempElement = tempElement.parentElement;
							}
							if (tempElement.tagName.toUpperCase() !== "BODY") {
								// tempElement =
								// tempElement.parentElement.children.item(0);
								for (x = 0 ; x < tempElement.parentElement.children.length; x++) {
									if (tempElement.parentElement.children.item(x).tagName.toUpperCase() === "HEADER") {
										headerele = tempElement.parentElement.children.item(x);
										break;
									}
								}
								try {
									field.name = headerele.innerText.replace(/\r?\n|\r/g, " ");
								} catch (ex) {
									field.name = "";
								}
		
							}
						}
					}
					break;
				case "TEXTAREA":
					field.action = "Field";
					tempclass = "";
					ele = tempElement;
					while (flag) {
		
						while (ele.tagName.toUpperCase() !== "DIV") {
							ele = ele.parentElement;
						}
						try { tempclass = ele.getAttribute("class"); }
						catch (ex) { tempclass = ""; }
						if (tempclass === null) { tempclass = ""; }
						if (tempclass !== "" && tempclass.indexOf("sapMInput") !== -1) {
							break;
						}
						else {
							ele = ele.parentElement;
						}
					}
					field.id = ele.id;
					field.label = ele.innerText.replace(/\r?\n|\r/g, " ");
					if (field.label === "") {
						field.label = ele.textContent.replace(/\r?\n|\r/g, " ");
					}
					field.name = field.id;
					try {
						field.nodeKey = ele.getAttribute("class");
					} catch (ex) {
						field.nodeKey = "";
					}
					field.type = "TextArea";
					break;
				case "DIV":
					tempclass = "";
					tempclass = that.getclassName(tempElement);
					var classname = tempclass;
					var ele = tempElement;
					while (ele.tagName.toUpperCase() != "INPUT" && ele.children.length > 0) {
						ele = ele.children.item(0);
					}
					if (ele.tagName.toUpperCase() === "INPUT") 
					{
						if(ele.type.toUpperCase() === "CHECKBOX")
						{
							field.type = "CheckBox";
							if (ele.getAttribute("checked") !== null) {
								if (ele.getAttribute("checked").toUpperCase() === "CHECKED") {
									field.value = "";
								}
								else {
									field.value = "X";
								}
							}
							else {
								field.value = "X";
							}
						}
						break;
					}
					if (tempclass.indexOf("sapMSFS") !== -1) {
						field.type = "searchFieldSearchButton";
						field.label = "search";
						field.nodeKey = tempclass;
						break;
					}
					else if (tempclass.indexOf("sapMSFR") !== -1) {
						field.type = "searchFieldResetButton";
						field.label = "reset";
						field.nodeKey = tempclass;
						break;
					}
					if (classname.indexOf("InputValHelp") !== -1) {
						field.type = "InputHelp";
					}
					else if (classname.indexOf("sapMITBFilter") !== -1) {
						field.type = "IconTabFilter";
						tempElement = tempElement.parentElement;
						field.label = tempElement.innerText.replace(/\r?\n|\r/g, " ");
						field.id = tempElement.id;
						classname = tempElement.getAttribute("class");
					}
					else if(classname.indexOf("sapSuiteIBCBar") !== -1){
						field.type = "SuiteIBCBarInteractionArea";
						field.id = tempElement.id;
						classname = tempElement.getAttribute("class");
						tempElement = that.traverseToParentbyClassName(tempElement, "sapSuiteIBCBarInteractionArea");
						field.value = tempElement.getElementsByClassName("sapSuiteIBCBarWrapper")[0].innerText;
						field.label = tempElement.getElementsByClassName("sapSuiteIBCBarLabel")[0].innerText;
		
					}
					else if(className.indexOf("sapMGrowingListTrigger") !== -1 || className.indexOf("sapMSLIDescription") !== -1){
						field.action = "Click";
						field.type = "PopoverHeaderTitle";
					} 
					else if (classname.indexOf("sapMSwt") !== -1) {
						field.action = "Field";
						field.type = "Switch";
						field.id = tempElement.id;
						classname = tempElement.getAttribute("class");
						while (classname.indexOf("sapMSwtOff") === -1 && classname.indexOf("sapMSwtOn") === -1) {
							tempElement = tempElement.parentElement;
							if (tempElement.tagName.toUpperCase() === "BODY") {
						        break;
						    }
							classname = tempElement.getAttribute("class");
							if (classname === null) {
								classname = " ";
							}
						}
						if (className.indexOf("sapMSwtOff") !== -1) {
							field.value = "ON";
							if (that.defineCheck || that.defineExportImport){
								field.value = "OFF";
							}
						}
						else {
							field.value = "OFF";
							if (that.defineCheck || that.defineExportImport){
								field.value = "ON";
							}
						}
					}else if(classname.indexOf("KPICard") !== -1){
						field.action = "Click";
						field.type = "KPICard";
						if(that.checkIsEmpty(field.id)){
							field.id = tempElement.parentElement.id;
						}
						if(that.checkIsEmpty(field.name)){
							field.name = field.id;
						}
					} else if (classname.indexOf("sapMITBText") !== -1 || classname.indexOf("sapMITBTab") !== -1) {
						if (that.getclassName(tempElement.parentElement).indexOf("sapMITBFilter") !== -1) {
							field.type = "IconTabFilter";
							try {
								field.label = tempElement.parentElement.getElementsByClassName("sapMITBText")[0].innerText;
								field.value = field.label;
							} catch (ex) {
		
							}
						}else{
							if(className.indexOf("sapMITBText") !== -1){
								field.label = tempElement.innerText;
								if (that.checkIsEmpty(field.label)) {
									field.label = tempElement.getAttribute("aria-label");
								}
								if (that.checkIsEmpty(field.label)) {
									field.label = tempElement.getAttribute("title");
								}
								if(that.defineCheck || that.defineExportImport){
									field.type = "IconTabFilterText";
								}else{
									field.type = "sapMITBText";
								}
								field.id = tempElement.id;
								className = tempElement.getAttribute("class");
							}
						}
					} else if (className.indexOf("sapMSlt") !== -1 || className.indexOf("sapMComboBox") !== -1) {
						field.action = "Field";
						field.type = "Select";
					} else if (className.indexOf("sapMObject") !== -1) {
						that.getMobjectIdentifier(tempElement, field);
						field.type = "ObjectIdentifier";
						try {
							if (!that.checkIsEmpty(document.getElementById(sapModjId))) {
								if (that.isIdExist(document.getElementById(sapModjId), tempElement)) {
									tempElement = document.getElementById(sapModjId);
								}
		
								if (!that.checkIsEmpty(that.traverseToParentbyClassName(tempElement, "sapMObjectIdentifierTitle"))) {
									field.type = "sapMObjectIdentifierTitle";
									field.value = tempElement.innerText;
								} else if (!that.checkIsEmpty(that.traverseToParentbyClassName(tempElement, "sapMObjectIdentifierText"))) {
									field.type = "sapMObjectIdentifierText";
									field.value = tempElement.innerText;
								}
							}
						} catch (exx) {
		
						}
					} else if (className.indexOf("sapUiSliGrip") !== -1) {
						field.type = "DateRangeSlider";
						field.action = "Field";
					}else if(className.indexOf("sapMRI") !== -1){
						field.type = "RelevanceIndicator";
						field.action = "Field";
						try{
							tempElement = that.traverseToParentbyClassName(tempElement, "sapUiRating");
							field.value = tempElement.getAttribute("aria-valuenow");
						}catch(ex){
							field.value = "";
						}
					}else if(className.indexOf("sapUshellAnchorItemInner") !== -1){
						field.type = "TileGroupHeader";
						field.action = "Click";
						if(that.checkIsEmpty(field.id)){
							field.id = tempElement.parentElement.id;
						}
						field.name= field.id;
		
					} else if (className.indexOf("sapTetrisHoursCell") !== -1 || (!that.startCheckForEmptyString(tempElement.previousElementSibling) && !that.startCheckForEmptyString(that.getclassName(tempElement.previousElementSibling)) && that.getclassName(tempElement.previousElementSibling).indexOf("sapTetrisHoursCell") !== -1)) {
						field.type = "TimeSheetClick";
						field.action = "Click";
						if (that.startCheckForEmptyString(field.id) && !that.startCheckForEmptyString(tempElement.previousElementSibling)) {
						    field.id = tempElement.previousElementSibling.id;
						}
						if (that.startCheckForEmptyString(field.name)) {
						    field.name = field.id;
						}
					} else if (className.indexOf("sapMSliderHandle") !== -1) {
						field.type = "Slider";
						field.action = "Field";
					} else if (className.indexOf("sapUiTableGroup")!==-1) {
						field.type = "Button";
						field.action = "Click";
					}else if(className.indexOf("sapOvpCardHeader") !== -1 && className.indexOf("sapMFlexBox") !== -1){
						field.action = "Click";
						field.type = "ClickCardHeader";
					}else if(className.indexOf("sapOvpStackCardContent") !== -1 && className.indexOf("sapMFlexBox") !== -1){
						field.action = "Click";
						field.type = "ClickStackCard";
					} else if (className.indexOf("sapUiBarToggle") !== -1) {
						field.type = "ToggleButton";
						field.action = "Click";
					} else if (className.indexOf("sapTetris") !== -1) {
						field.id = that.traverseToParentbyClassName(tempElement, "sapThemeHighlight").nextElementSibling;
						field.type = "TimeSheetText";
						field.action = "Click";
					} else if (className.indexOf("viz-controls-switchbar")!==-1) {
						field.type = "ChartSwitchbar";
						field.action = "Click";
					} else if (className.indexOf("sapSuiteILC")!==-1) {
						field.type = "sapSuiteILCInteractionArea";
						if (that.checkIsEmpty(field.id)) {
							field.id = tempElement.parentElement.id;
						}
					}else if(className.indexOf("sapMeCalendarMonthDay") !== -1){
						field.action = "Field";
						field.type="sapMeCalendar";
						field.label = "Calender Date";
						field.value = that.transformDateValue(tempElement);
					}else if(className.indexOf("sapSuiteUiMicroChartPointer") !== -1){
						field.action = "Click";
						field.type = "ChartPointer";
						field.value = tempElement.getAttribute("title");
					} else if(className.indexOf("sapSuiteAMC") !== -1){
						field.action = "Click";
						field.type = "TableChart";
						field.value = tempElement.getAttribute("title");
					}
					else {
						if (className.indexOf("sapFDynamicPageTitle") !== -1) {
							if (that.checkIsEmpty(field.id)) {
								field.id = tempElement.parentElement.id;
							}
						}
						field.type = "TextView";
						field.action = "Click";
					}
					field.nodeKey = classname;
					break;
				default:
					break;
				}
		
			};
			that.transformDateValue = function(element){
				var dateValue;
				var elementId;
				var dateArray;
				var hiddenInput = element.getElementsByTagName("INPUT")[0];
				if(!that.startCheckForEmptyString(hiddenInput.value)){
					dateValue = hiddenInput.value;
					dateArray = dateValue.split(" ");
				} else{
					elementId = element.id;
					var date = elementId.substring(elementId.indexOf("calendar"));
					date = date.substring(date.indexOf("-")+1);
					dateArray = date.split("-");
				}
				var date = dateArray[2] + "." + that.month[dateArray[1]] + "." + dateArray[3];
				return date;
			};
				
            that.getMobjectIdentifier = function (element,field) {
                field.id = element.id;
                field.value = element.innerText;
                var hiddenElements = [];
                hiddenElements.push(element.getElementsByClassName("sapUiInvisibleText"));
                hiddenElements.push(element.getElementsByClassName("sapUiHiddenPlaceholder"));
                if (hiddenElements.length > 0) {
                    for (var len = 0; len < hiddenElements.length; len++) {
                        field.value = field.value.replace(hiddenElements[len].innerText, "");
                    }
                }
                
            };
            /*  that.startGetLabelWithoutSymbols = function (label) {
            var newlabel = "";

            for (var i = 0 ; i <= label.length ; i++) {
                if ((label.charCodeAt(i) >= 65 && label.charCodeAt(i) <= 90) || (label.charCodeAt(i) >= 97 && label.charCodeAt(i) <= 122) || label.charCodeAt(i) === 32 || label.charCodeAt(i) === 58) {
                    newlabel += label.charAt(i);
                }
            }

            return newlabel;
        };*/
            that.startGoToFioriListElement = function (element) {
            	var tempElem = element;
				while (tempElem.tagName.toUpperCase() !== "LI" && tempElem.tagName.toUpperCase() !== "BODY") {
					tempElem = tempElem.parentElement;
				}
				if(tempElem.tagName.toUpperCase() === "BODY"){
					return element;
				} else{
					return tempElem;
				}
            };
            that.startGetListIndex = function (element) {
                var childs = element.parentNode.childNodes, i = 0;
                for (i = 0; i < childs.length; i++) {
                    if (element === childs[i]) {break;}
                }
                return i;
            };
		    
		    that.startGetfioriUi5TableElementLabel = function (index, tabEle) {
			    var label = "";
			    var tablehead = "";
			    var theadElement = tabEle.getElementsByTagName("thead")[0];
			    if (!that.startCheckForEmptyString(theadElement)) {
			        tablehead = tabEle.getElementsByTagName("thead")[0].getElementsByTagName("th")[index];
			    } else {
			        return "";
			    }
				//var tablehead = tabEle.getElementsByTagName("thead")[0].getElementsByTagName("th")[index];
				label = tablehead.innerText;
				try{
					if (label === ""){
						label = tablehead.textContent;
					}
				} catch (ex) { label = ""; }
				if (that.checkIsDisplayNone(tablehead) || that.checkIsDisplayNone(tablehead.children[0])) {
					label = "";
				}
				if (label === "") {
					try {
						tablehead = tablehead.getElementsByTagName("label")[0];
						label = tablehead.innerText;
					} catch (ex) { label = ""; }
				}
				if (label === "") {
					try {
						tablehead = tabEle.getElementsByTagName("thead")[0].getElementsByTagName("th")[index];
						tablehead = tablehead.getElementsByTagName("span")[0];
						label = tablehead.innerText;
						if (that.checkIsDisplayNone(tablehead) || that.checkIsDisplayNone(tablehead.children[0])) {
							label = "";
						}
					} catch (ex) { label = ""; }
		
				}
				if (label === "") {
					try {
						tablehead = that.traverseToParentbyClassName(tabEle, "sapUiTableCnt");
						tablehead = tablehead.getElementsByClassName("sapUiTableColHdr")[0];
						if (that.checkIsEmpty(tablehead)) {
							tablehead = that.traverseToParentbyClassName(tabEle, "sapUiTableCnt");
							tablehead = tablehead.getElementsByClassName("sapUiTableColHdrCnt")[0];
		
						}
						if (tablehead.getElementsByTagName("table").length > 0) {
							tablehead = tablehead.getElementsByTagName("table")[0];
							tablehead = tablehead.getElementsByTagName("tbody")[0];
							tablehead = tablehead.getElementsByTagName("tr")[0];
						}
						if (that.startGetColumnDetails.isRowSel && index > 0) {
							tablehead = tablehead.children[index - 1];
							label = tablehead.innerText;
							if (that.checkIsDisplayNone(tablehead) || that.checkIsDisplayNone(tablehead.children[0])) {
								label = "";
							}
						}
		
						else if (!that.startGetColumnDetails.isRowSel) {
							tablehead = tablehead.children[index];
							label = tablehead.innerText;
							if (that.checkIsDisplayNone(tablehead) || that.checkIsDisplayNone(tablehead.children[0])) {
								label = "";
							}
						}
					} catch (ex) {
		
					}
		
				}
		
				if (label === "") {
					try {
						tablehead = tabEle.getElementsByTagName("thead")[0].getElementsByTagName("th")[index];
						tablehead = tablehead.getElementsByTagName("div");
		
						if(tablehead.length >0){
							for(var i=0;i<tablehead.length; i++) {
								if (that.checkIsEmpty(label)) {
									label = tablehead[i].getAttribute("title");
								}
								else{
									break;
								}
							}
						}
		
						if (that.checkIsDisplayNone(tablehead) || that.checkIsDisplayNone(tablehead.children[0])) {
							label = "";
						}
					} catch (ex) { label = ""; }
		
				}
		
				label = that.removeSpecialCharcode(label);
				label = label.replace(/\r?\n|\r/g, " ");
				return label;
		
		
			};
            that.startAddTempColumnField = function (column, index) {
                column.label = "Column" + Number(index+1);

            };
            that.getMultipleElements = function (tempElement, field, index) {
                
                if (tempElement.children.length > 0) {
                    field.isMultipleColumns = true;
                    for (var i = 0; i < tempElement.children.length; i++) {
                        var tempFlexItem = tempElement.children.item(i);
                        if (that.getclassName(tempFlexItem) === "sapMFlexItem") {
                            if (tempFlexItem.children.length > 0) {
                            	field.isMultipleColumns = true;
                            	that.startGetColumnDetails(tempFlexItem.children.item(0),field,index);
                            }
                            
                        }else if (that.getclassName(tempFlexItem).indexOf("sapMFlexItem")!==-1 || that.getclassName(tempFlexItem).indexOf("sapUiRFL") !== -1 || that.getclassName(tempFlexItem).indexOf("sapUiSimpleForm") !== -1 || that.getclassName(tempFlexItem).indexOf("sapUiForm") !== -1) {
							if(tempFlexItem.id === field.id){
								that.startGetColumnDetails(tempFlexItem, field, index);
							}else{                 		
								if (tempFlexItem.children.length > 0) {
									that.getMultipleElements(tempFlexItem, field, index);
								}
								else if (that.getclassName(tempFlexItem).indexOf("sapMText")!==-1) {
									that.startGetColumnDetails(tempFlexItem, field, index);
								}
							}	
						}else if (that.getclassName(tempFlexItem).indexOf("sapUiRespGrid") !== -1) {
                            if (tempFlexItem.children.length > 0) {
                                that.getMultipleElements(tempFlexItem, field, index);
                            }
                        }else if (that.getclassName(tempFlexItem).indexOf("sapUiVltCell") !== -1) {
							if (tempFlexItem.children.length > 0) {
		
								for (var i2 = 0; i2 < tempFlexItem.children.length; i2++) {
									field.isMultipleColumns = true;
									that.startGetColumnDetails(tempFlexItem.children.item(i2), field, index);
								}
		
							}
						}
                        else {
                            if (tempFlexItem.children.length > 0) {
                            	for(var i1=0; i1<tempFlexItem.children.length; i1++){
                            		field.isMultipleColumns = true;
                            		that.startGetColumnDetails(tempFlexItem.children.item(i1), field, index);
                            	}
                            } else {
                                that.startGetColumnDetails(tempFlexItem, field, index);
                            }
                        }
                        
                    }
                    field.isMultipleColumns = false;
                }

            };
            that.getMultipleColumnsUiHLayout = function (tempElement, field, index) {
                if (tempElement.children.length > 0) {
                    field.isMultipleColumns = true;
                    for (var i = 0; i < tempElement.children.length; i++) {
                        var tempFlexItem = tempElement.children.item(i);
                        if (that.getclassName(tempFlexItem) === "sapUiHLayoutChildWrapper") {
                            if (tempFlexItem.children.length > 0) {
                            	field.isMultipleColumns = true;
                            	that.startGetColumnDetails(tempFlexItem.children.item(0), field, index);
                            }

                        } else if (that.getclassName(tempFlexItem).indexOf("sapUiHLayoutNoWrap") !== -1) {
                            if (tempFlexItem.children.length > 0) {
                                that.getMultipleColumnsUiHLayout(tempFlexItem, field, index);
                            }
                        }else {
       					 that.startGetColumnDetails(tempFlexItem, field, index);
        				}

                    }
                    field.isMultipleColumns = false;
                }
            };
			that.startGetColumnDetails = function (element, field, index) {
				var column = new Object();
				column.changeable = "False";
				var document = element.ownerDocument;
				var window = document.defaultView;
				var event = window.event;
				var tempElement = element;
				var className = that.getclassName(element), goto = true;
				var tdElement = that.traverseToParentbyTagName(element, "TABLE");
				if(tdElement.tagName.toUpperCase() === "TABLE" && that.getclassName(tdElement).toLowerCase() === "sapuimlt"){
					tdElement = that.traverseToParentbyTagName(tdElement.parentElement, "TABLE");
				}
				if (className.indexOf("sapMListTblSelCol") !== -1) {
					var doc = element.ownerDocument;
					var elm = doc.getElementById(field.id);
					if (tempElement.getAttribute("aria-selected") === "false" || tempElement.getAttribute("aria-selected") === null) {
						column.value = "";
					} else {
						column.value = "X";
					}
					column.type = "CheckBox";
					if (that.traverseToParentbyTagName(elm, "TD") === tempElement) {
						column.nodeKey = that.getclassName(elm);
						column.changeable = "True";
						field.action = "ROW_SELECT";
						var inputchkBox = tempElement.getElementsByTagName("input");
						if (inputchkBox.length > 0) {
							inputchkBox = inputchkBox[0];
						} else {
							inputchkBox = "";
						}
						if (tempElement.getAttribute("aria-selected") === "false" || tempElement.getAttribute("aria-selected") === null) {
							column.value = "X";
							if (!that.checkIsEmpty(inputchkBox)) {
								column.nodeKey = that.getclassName(tempElement);
								if (inputchkBox.getAttribute("type") === "radio") {
									column.type = "RadioButton";
									field.action = "ROW_CLICK";
								}
								if (!that.checkIsEmpty(inputchkBox.getAttribute("checked"))) {
									column.value = "";
								}
							}
						} else {
							column.value = "";
						}
		
					}
					column.id = tempElement.children.item(0).id;
		
					column.name = column.id;
					if (field.columns.length > 2) {
						if (that.isIdExist(document.getElementById(field.id), tempElement)) {
							field.action = "ROW_CLICK";
						}  
						if (!that.checkIsEmpty(field.type)) {
							column.type = field.type;
							column.value = elm.getAttribute("title");
						}
		
					}
					column.label = that.startGetfioriUi5TableElementLabel(index, tdElement);
					if (that.checkIsEmpty(column.label)) {
						that.startAddTempColumnField(column, index);
					}
					field.columns.push(column);
					return;
				}
				else {
					var rowSel = "";
					try {
						rowSel = element.getAttribute("headers");
					} catch (ex) {
						
					}
					if (rowSel === null){
						rowSel = "";
					}
					if (rowSel.indexOf("colsel") !== -1) {
						that.startGetColumnDetails.isRowSel = true;
						column.id = tempElement.id;
						column.nodeKey = that.getclassName(tempElement);
						if (tempElement.getAttribute("aria-selected") === "false" || tempElement.getAttribute("aria-selected") === null) {
							column.value = "";
						} else {
							column.value = "X";
						}
						if (field.id.indexOf("rowsel") !== -1) {
							column.id = field.id;
							column.name = field.name;
							column.changeable = "True";
							column.type = "CheckBox";
							field.action = "ROW_SELECT";
							if (tempElement.getAttribute("aria-selected") === "false" || tempElement.getAttribute("aria-selected") === null) {
								column.value = "X";
							} else {
								column.value = "";
							}
						}
						column.label = that.startGetfioriUi5TableElementLabel(index, tdElement);
						if (that.checkIsEmpty(column.label)) {
							that.startAddTempColumnField(column, index);
						}
						if (that.checkIsEmpty(column.name)){
							column.name = column.label;
						}
						try{
							if(that.checkIsEmpty(column.nodeKey)){
								column.nodeKey = document.getElementById(column.id).getAttribute("class");
								column.object_repository = that.startgetObjectRepo(document.getElementById(column.id));
							}
						}catch(ex){
							column.nodeKey = "";
						}
						field.columns.push(column);
						return;
					}
				}
				//condition for flex items
				try{
					if(that.checkIsEmpty(className)){
						className = that.getclassName(element.children.item(0));
						tempElement = element.children.item(0);
					}
				}catch(ex){
					return;
				}
				if(className.indexOf("sapUiTableTdFirst") !== -1 && tempElement.children.length === 1){
					that.startGetColumnDetails(tempElement.children.item(0),field,index);
				}
				if (!field.isMultipleColumns) {
					if (className.indexOf("sapMList") !== -1 || className.indexOf("sapUiTableCellFlex") !== -1 || className.indexOf("sapMListTblSub") !== -1 && (field.id !== tempElement.id)) {
						field.isMultipleColumns = true;
						if((tempElement.children.length >0)){
							for(var i=0;i<tempElement.children.length; i++) {
								that.startGetColumnDetails(tempElement.children.item(i),field,index);
							}
						}
						field.isMultipleColumns = false;
						goto = false;
		
						//tempElement = tempElement.children.item(0);
						if (that.getclassName(tempElement).indexOf("sapUiCompSmartToggle") !== -1) {
							tempElement = tempElement.children.item(0);
						}
					}
					else if(field.id !== tempElement.id) {
						tempElement = tempElement.getElementsByClassName("sapUiTableCell")[0];
						if(that.checkIsEmpty(tempElement)){
							tempElement = element;
						}
						
						tempElement = tempElement.children.item(0);
					}
				} else {
					tempElement = element;
				}
				var tagname;
				if (that.checkIsEmpty(tempElement) || that.getclassName(tempElement).indexOf("sapUiHiddenPlaceholder")!==-1) {
					return;
				}
		
				var flexId; // this flexId is used to check the changeable true in case of field.id get recorded as flexitem div
				if (tempElement.parentElement.id === field.id && that.getclassName(tempElement.parentElement).indexOf("sapMFlexItem") !== -1) {
					flexId = true;
				}
				while (goto) {
					try{
						tagname = tempElement.tagName.toUpperCase();
					}catch(ex){
						return;
					}
		
					switch (tagname) {
					case "BDI":
					case "B":
						tempElement = tempElement.parentElement;
						tagname = tempElement.tagName.toUpperCase();
						continue;
					case "LI":
						if (that.isIdExist(document.getElementById(field.id), tempElement)) {
							column.changeable = "True";
							field.action = "ROW_DATA";
						}
		
						that.getFioriUi5ElementProperties(tempElement, "LI", column);
						// if  a user perform a click action on Anchor link inside list, we consider this column action as TextLink insted of List action.
						if (field.type === "ListTextLink" && column.changeable === "True") { 
							column.value = field.value;
							column.type = "TextLink";
							field.action = "ROW_CLICK";
						}
						//end
						column.id = tempElement.id;
						column.name = column.id;
						column.object_repository = that.startgetObjectRepo(tempElement);
						column.label = that.startGetfioriUi5TableElementLabel(index, tdElement);
						if (that.getclassName(tempElement).indexOf("sapMObj") !== -1) {
							column.type = "ObjectList";
						}
						field.columns.push(column);
						goto = false;
						break;
					case "UL":
						if (that.getclassName(tempElement).indexOf("sapMList") !== -1) {
							tempElement = tempElement.getElementsByTagName("li")[0];
							if (that.checkIsEmpty(tempElement)) {
								return;
							} else {
								tagname = tempElement.tagName;
								continue;
							}
						}
						goto = false;
						break;
					case "A":
						if (field.id === tempElement.id || flexId) {
							column.changeable = "True";
							field.action = "ROW_CLICK";
						}
						column.id = tempElement.id;
						column.type = "TextLink";
						column.name = column.id;
						column.nodeKey = that.getclassName(tempElement);
						column.value = tempElement.innerText;
						if (that.checkIsEmpty(column.value)) {
							column.value = tempElement.getAttribute("aria-label");
						}
						if (that.checkIsEmpty(column.value)) {
							column.value = tempElement.getAttribute("title");
						}
						column.object_repository = that.startgetObjectRepo(tempElement);
						column.label = that.startGetfioriUi5TableElementLabel(index, tdElement);
						field.columns.push(column);
						goto = false;
						break;
					case "SPAN":
						if(that.checkIsEmpty(tempElement.id)){
							try{
								if(tempElement.getAttribute("class") === "sapMObjectNumberText"){
									tempElement.id = tempElement.parentElement.id;
								}
							}catch(ex){}                      
						}
						if (field.id === tempElement.id || flexId) {
							column.changeable = "True";
							field.action = "ROW_CLICK";
						}
						column.id = tempElement.id;
						if (that.getclassName(tempElement).indexOf("sapMText") !== -1) {
							column.type = "TextView";
						}
						column.name = column.id;
						column.nodeKey = that.getclassName(tempElement);
						column.value = tempElement.innerText.replace(/\r?\n|\r/g, " ");
						if (that.checkIsEmpty(column.value)) {
							column.value = tempElement.getAttribute("title");   
						}
						if (that.checkIsEmpty(column.value)) {
							column.value = tempElement.getAttribute("aria-label");
						}
						var ele = tempElement;
						if (that.getclassName(ele).indexOf("sapUiCompSmartToggle") !== -1 && ele.children.length >0) {
							tempElement = ele.children.item(0);
							continue;
						}
						while (ele.tagName.toUpperCase() !== "INPUT" && ele.children.length > 0) {
							ele = ele.children.item(0);
						}
						if (ele.tagName.toUpperCase() === "INPUT") {
							tagname = ele.tagName;
							tempElement = ele;
							continue;
						}
						ele = tempElement;
		
						while ((ele.tagName.toUpperCase() !== "BUTTON" && ele.tagName.toUpperCase() !== "A") && ele.tagName.toUpperCase() !== "BODY") {
							ele = ele.parentElement;
						}
						if (ele.tagName.toUpperCase() === "BUTTON" || ele.tagName.toUpperCase() === "A") {
							tagname = ele.tagName;
							tempElement = ele;
							continue;
						}
		
						that.getFioriUi5ElementProperties(tempElement, "SPAN", column);
						//added for combobox select 
						try{
							if (column.type.toUpperCase() === "SELECT" && column.changeable === "True") {
								field.action = "ROW_DATA";
							}
						}catch(ex){
							goto = false; 
							break;
						}
						column.object_repository = that.startgetObjectRepo(tempElement);
						column.label = that.startGetfioriUi5TableElementLabel(index, tdElement);
						try{
							if (column.changeable === "True") {
								var listElmMulti, count = 0;
								listElmMulti = that.traverseToParentbyTagName(tempElement, "td");
								listElmMulti = listElmMulti.getElementsByClassName("sapMSltArrow");
								if (!that.checkIsEmpty(listElmMulti) && listElmMulti.length > 1) {
									for (var ind = 0; ind < listElmMulti.length; ind++) {
										count++;
										if (listElmMulti[ind] === tempElement) {
											break;
										}
									}
								}
								if (count > 0) {
		
									if (that.defineCheck || that.defineExportImport) {
										column.type = column.type + "&&" + count;
									} else {
										column.id = column.id + "&~&" + count;
									}
								}
								column.name = column.id;
							}
						}catch(ex){}
						field.columns.push(column);
						goto = false;
						break;
					case "IMG":
						if (field.id === tempElement.id || flexId) {
							column.changeable = "True";
							field.action = "ROW_CLICK";
						}
						column.id = tempElement.id;
						column.type = "TextLink";
						column.name = column.id;
						column.nodeKey = that.getclassName(tempElement);
						column.value = tempElement.innerText;
						if (that.checkIsEmpty(column.value)) {
							column.value = tempElement.getAttribute("aria-label");
						}
						if (that.checkIsEmpty(column.value)) {
							column.value = tempElement.getAttribute("title");
						}
						column.object_repository = that.startgetObjectRepo(tempElement);
						column.label = that.startGetfioriUi5TableElementLabel(index, tdElement);
						field.columns.push(column);
						goto = false;
						break;
					case "BUTTON":
						if (field.id === tempElement.id || flexId) {
							column.changeable = "True";
							field.action = "ROW_CLICK";
						}
						column.id = tempElement.id;
						column.type = "Button";
						column.name = column.id;
						column.nodeKey = that.getclassName(tempElement);
						column.value = tempElement.innerText;
						if (that.checkIsEmpty(column.value)) {
							column.value = tempElement.getAttribute("aria-label");
						}
						if (that.checkIsEmpty(column.value)) {
							column.value = tempElement.getAttribute("title");
						}
						column.object_repository = that.startgetObjectRepo(tempElement);
						column.label = that.startGetfioriUi5TableElementLabel(index, tdElement);
						field.columns.push(column);
						goto = false;
						break;
					case "INPUT":
		
						if (field.id === tempElement.id || column.changeable === "True") {
							column.changeable = "True";
							field.action = "ROW_DATA";
						}
						column.id = tempElement.id;
						column.type = "InputField";
						column.name = column.id;
						column.nodeKey = that.getclassName(tempElement);
						column.value = tempElement.value;
						that.getFioriUi5ElementProperties(tempElement, "INPUT", column);
						column.object_repository = that.startgetObjectRepo(tempElement);
						column.label = that.startGetfioriUi5TableElementLabel(index, tdElement);
						if (field.id === column.id || column.changeable === "True") {
							column.changeable = "True";
							field.action = "ROW_DATA";
							if (field.type.toUpperCase() === "RADIOBUTTON"){
								field.action = "ROW_CLICK";
							}
		
						}
						try{
							if (column.changeable === "True") {
								var inputElmMulti, count = 0;
								inputElmMulti = that.traverseToParentbyTagName(tempElement, "td");
								inputElmMulti = inputElmMulti.getElementsByTagName("input");
								if (!that.checkIsEmpty(inputElmMulti) && inputElmMulti.length > 1) {
									for (var inp = 0; inp < inputElmMulti.length; inp++) {
										if (inputElmMulti[inp].getAttribute("type") === "text" || inputElmMulti[inp].getAttribute("type") === "number") {
											count++;
										}
										if (inputElmMulti[inp] === tempElement) {
											break;
										}
									}
								}
								if (count > 0) {
		
									if (that.defineCheck || that.defineExportImport) {
										column.type = column.type + "&&" + count;
									} else {
										column.id = column.id + "&~&" + count;
									}
								}
								column.name = column.id;
							}
						}catch(ex){}
		
						field.columns.push(column);
						goto = false;
						break;
					case "DIV":
						if (field.id === tempElement.id || flexId) {
							column.changeable = "True";
							field.action = "ROW_CLICK";
						}
						else if (that.getclassName(tempElement).indexOf("sapUiCompSmartField")!==-1 || that.getclassName(tempElement).indexOf("Composite")!==-1 || that.getclassName(tempElement).indexOf("sapMMultiInput")!==-1){
							field.isMultipleColumns = true;
							if((tempElement.children.length >0)){
								for(var i=0;i<tempElement.children.length; i++) {
									that.startGetColumnDetails(tempElement.children.item(i),field,index);
								}
							}
							field.isMultipleColumns = false;
							goto = false;
							break;
						}
						var isValueHelp = false;
						var classNameForTemp = that.getclassName(tempElement);
						while (that.checkIsEmpty(classNameForTemp) && !that.checkIsEmpty(tempElement.children) && tempElement.children.length >0) {
							tempElement = tempElement.children.item(0);
							classNameForTemp = that.getclassName(tempElement);
						}
						if (classNameForTemp.indexOf("sapMInput") !== -1) {
							try {
								var tempElmValH = tempElement.getElementsByClassName("sapMInputValHelpInner");
								if(tempElmValH == undefined){
									tempElmValH = tempElement.getElementsByClassName("sapMInputValHelp");
								}
								for (var k = 0; k < tempElmValH.length; k++) {
									if (tempElmValH[k].tagName.toUpperCase() === "SPAN") {
										if (tempElmValH[k].id === field.id) {
											tagname = tempElmValH[k].tagName;
											tempElement = tempElmValH[k];
											isValueHelp = true;
											break;
										}
									}
								}
								if (isValueHelp) {
									isValueHelp = false;
									continue;
								}else if(classNameForTemp.indexOf("sapMMultiComboBox") !== -1 || classNameForTemp.indexOf("sapMComboBoxSelectionActive") !== -1 || classNameForTemp.indexOf("sapMComboBox") !== -1 ){
									if (that.isIdExist(document.getElementById(field.id), tempElement)) {
										column.changeable = "True";
										field.action = "ROW_DATA";
										if (classNameForTemp.indexOf("sapMObject") !== -1) {
											field.action = "ROW_CLICK";
										}
									}
								} else {
									var tempElementInput = tempElement;
									tempElementInput = tempElement.getElementsByTagName("input")[0];
									if(that.checkIsEmpty(tempElementInput)){
										tempElementInput = tempElement.getElementsByTagName("textarea")[0];
									}
									tempElement = tempElementInput;
									continue;
								}
							} catch (ex) {
		
							}
		
						} else if (classNameForTemp.indexOf("sapMMultiInput") !== -1 || classNameForTemp.indexOf("sapMInput") !== -1) {
							tempElement = tempElement.getElementsByTagName("input")[0];
							continue;
						} else if (classNameForTemp.indexOf("sapMSlt") !== -1 || classNameForTemp.indexOf("sapMObject") !== -1 || classNameForTemp.indexOf("sapMObjStatus") !== -1) {
							if (that.isIdExist(document.getElementById(field.id), tempElement)) {
								column.changeable = "True";
								field.action = "ROW_DATA";
								if (classNameForTemp.indexOf("sapMObject") !== -1) {
									field.action = "ROW_CLICK";
									try{
										if(document.getElementById(field.id).tagName.toUpperCase() === "A"){
											tempElement = document.getElementById(field.id);
										}
									}catch(ex){
										tempElement = element;
									}
								}
							}
						}
						column.action = "Click";
						column.id = tempElement.id;
						column.label = tempElement.innerText.replace(/\r?\n|\r/g, " ");
						column.value = tempElement.innerText.replace(/\r?\n|\r/g, " ");
						column.name = column.id;
		
						ele = tempElement;
						if ((that.getclassName(ele).indexOf("LargeDesktop") !== -1) || that.getclassName(ele).indexOf("sapMFlexBox") !== -1 || that.getclassName(ele).indexOf("sapUiHLayoutNoWrap") !== -1 || that.getclassName(ele).indexOf("sapUiVlt") !== -1 || that.getclassName(ele).indexOf("sapUiHLayout") !== -1 ||that.getclassName(ele).indexOf("sapMListTblSubCnt") !== -1) {
							if (ele.children.length > 0) {
								if (that.getclassName(ele).indexOf("sapMFlexBox") !== -1 || that.getclassName(ele).indexOf("sapMListTblSubCnt") !== -1) {
									if(column.changeable.toUpperCase() !== "TRUE" || that.checkIsEmpty(column.changeable)){
										that.getMultipleElements(ele, field, index);
									}
									if (that.traverseToParentbyTagName(tempElement, "td").id === field.id) {
										try {
											var lastColumnToc = field.columns[field.columns.length - 1];
											var tdElm = that.traverseToParentbyTagName(document.getElementById(lastColumnToc.id), "td");
											if (field.id === tdElm.id) {
												field.columns[field.columns.length - 1].changeable = "true";
												field.action = "ROW_CLICK";
											}
										} catch (ex) { }
		
									}
		
								} else if (that.getclassName(ele).indexOf("sapUiVlt") !== -1 || that.getclassName(ele).indexOf("LargeDesktop") !== -1) {
									that.getMultipleElements(ele, field, index);
								}else {
									that.getMultipleColumnsUiHLayout(ele, field, index);
								}
		
							}
							if(column.changeable.toUpperCase() !== "TRUE" || that.checkIsEmpty(column.changeable)){
								goto = false;
								break;
							}
						} else if (that.getclassName(tempElement).indexOf("sapMList") !== -1) {
							try {
								ele = tempElement.getElementsByTagName("ul")[0];
								if (!that.checkIsEmpty(ele)) {
									for (var eachLi = 0 ; eachLi < ele.children.length; eachLi++) {
										if (that.isIdExist(document.getElementById(field.id), ele.children[eachLi])) {
											tempElement = ele.children[eachLi];
											tagname = tempElement.tagName;
											break;
										}
									}
									if (tagname.toUpperCase() === "LI") {
										continue;
									}
		
								}
							} catch (ex) {
		
							}
							ele = tempElement;
						} else if (that.getclassName(tempElement).indexOf("sapUiVisualStatus") !== -1) {
							if (that.isIdExist(document.getElementById(field.id), tempElement)) {
								field.action = "ROW_CLICK";
								column.changeable = "True";
							}
						}
						else if (that.getclassName(tempElement).indexOf("sapMMenuBtn sapMMenuBtnSplit") !== -1 || that.getclassName(tempElement).indexOf("sapMMenuBtn") !== -1) {
							if (that.isIdExist(document.getElementById(field.id), tempElement)) {
								field.action = "ROW_CLICK";
								column.changeable = "True";
								tempElement = document.getElementById(field.id);
							}
						}
						else if (that.getclassName(tempElement).indexOf("sapMSLI") !== -1) {
							if (that.isIdExist(document.getElementById(field.id), tempElement)) {
								field.action = "ROW_CLICK";
								column.changeable = "True";
							}
						} else if(that.getclassName(tempElement).indexOf("sapSuiteUiMicroChartPointer") !== -1 || that.getclassName(tempElement).indexOf("sapSuiteAMC") !== -1){
							if (that.isIdExist(document.getElementById(field.id), tempElement)) {
								field.action = "ROW_CLICK";
								column.changeable = "True";
								if(that.defineExportImport || that.defineCheck){
									field.action = "ROW_DATA";
								}
							}
						}
						ele = tempElement;
						while ((ele.tagName.toUpperCase() != "INPUT" || ele.tagName.toUpperCase() != "SPAN") && ele.children.length > 0) {
							ele = ele.children.item(0);
						}
						if ((ele.tagName.toUpperCase() === "INPUT" || ele.tagName.toUpperCase() === "A") && column.changeable.toUpperCase() === "FALSE") {
							tagname = ele.tagName;
							tempElement = ele;
							continue;
						} else if (ele.tagName.toUpperCase() === "SPAN") {
							// temperory
		
							if (that.getclassName(ele).indexOf("sapMText") !== -1) {
								tagname = ele.tagName;
								tempElement = ele;
								continue;
							}
		
							// end
						} 
		
						ele = tempElement;
						while (ele.tagName.toUpperCase() !== "BUTTON" && ele.tagName.toUpperCase() !== "A" && ele.tagName.toUpperCase() !== "BODY") {
		
							ele = ele.parentElement;
						}
						if (ele.tagName.toUpperCase() === "BUTTON" || ele.tagName.toUpperCase() === "A") {
							tagname = ele.tagName;
							tempElement = ele;
							continue;
						}
						that.getFioriUi5ElementProperties(tempElement, "DIV", column, field.id);
						if (column.type === "Switch") {
							if (that.isIdExist(document.getElementById(field.id), tempElement)) {
								column.changeable = "True";
								field.action = "ROW_DATA";
							}
						}
						if(column.type.toUpperCase() === "CHECKBOX" && column.changeable.toUpperCase() === "TRUE"){
							field.action = "ROW_DATA";
						}
						column.object_repository = that.startgetObjectRepo(tempElement);
						column.label = that.startGetfioriUi5TableElementLabel(index, tdElement);
						field.columns.push(column);
						goto = false;
						break;
					case "LABEL":
						if (field.id === tempElement.id || flexId) {
							column.changeable = "True";
							field.action = "ROW_CLICK";
						}
						column.id = tempElement.id;
						column.type = "Label";
						column.label = that.startGetfioriUi5TableElementLabel(index, tdElement);
						column.value = tempElement.innerText.replace(/\r?\n|\r/g, " ");
						column.name = column.id;
						column.object_repository = that.startgetObjectRepo(tempElement);
						field.columns.push(column);
						goto = false;
						break;
					case "TEXTAREA":
						if (field.id === tempElement.id) {
							column.changeable = "True";
							field.action = "ROW_DATA";
						}
						column.id = tempElement.id;
						column.action = "Field";
						column.name = column.id;
						column.type = "TextArea";
						column.label = that.startGetfioriUi5TableElementLabel(index, tdElement);
						column.value = tempElement.getAttribute("value");
						column.object_repository = that.startgetObjectRepo(tempElement);
						field.columns.push(column);
						goto = false;
						break;
					case "TD":
						if (field.id === tempElement.id) {
							column.changeable = "True";
							field.action = "ROW_CLICK";
						}
						column.id = tempElement.id;
						column.action = "Click";
						column.name = column.id;
						column.type = "TableNoData";
						column.label = that.startGetfioriUi5TableElementLabel(index, tdElement);
						column.value = tempElement.getAttribute("value");
						column.object_repository = that.startgetObjectRepo(tempElement);
						field.columns.push(column);
						goto = false;
						break;
					case "TABLE":
						try{
							var className = that.getclassName(tempElement);
							if(className.toLowerCase().indexOf("sapuimlt") !== -1){
								var tBody = tempElement.getElementsByTagName("tbody")[0];
								var tableRowElements = tBody.childNodes;
								var tdElements = tableRowElements[0].childNodes;
								for(var i=0; i<tdElements.length; i++){
									that.startGetColumnDetails(tdElements[i],field,index);
								}
							}
						}catch(ex){
							
						}
						goto = false;
						break;
					default:
						goto = false;
					break;
					}
				}
				column.object_repository = column.object_repository + ";" + "MouseEvent: " + (event.which === 3 ? "RightClick" : event.which === 1 ? "LeftClick" : "") + ";" + "FrameHierarchy: " + that.frameHierarchy(window.top, element.ownerDocument.defaultView, 0);
				if (that.checkIsEmpty(column.label)) {
					that.startAddTempColumnField(column, index);
				}
		
			};
            that.checkToastMessages = function (window) {
                var html = window.document.getElementsByClassName("sapMMessageToast");
                if (html.length > 0) {
                    that.toastMessage = html[0].innerText;

                }
            };
		    that.addActions = function (field) { 
	            if (that.checkIsEmpty(field.action) || (field.action.indexOf("ROW_") !== -1 && (that.checkIsEmpty(field.row_number) || Number(field.row_number) <0))) {
		                if (field.action.indexOf("ROW_") === -1 && that.checkIsEmpty(field.type)) {
		                    that.isAdded = false;
		                } else {
		                    that.isAdded = false;
		                }
	               
	                return;
	            }  
		        var isChangeable = false;
		        for (var fiel in field) {
		            if (fiel === "columns") {
		                try{
		                    var columns = field.columns;
		                    if (columns.length > 0) {
		                        isChangeable = false;
		                        for (var colv = 0; colv < columns.length; colv++) {
		                            for (var key in columns[colv]) {
										if (columns[colv].hasOwnProperty(key)) {
											if (that.checkIsEmpty(field.columns[colv][key])) {
												field.columns[colv][key] = "";
												continue;
											}
		                                    if(key === "changeable" && field.columns[colv][key].toUpperCase() === "TRUE"){
		                                        if(isChangeable == false){
		                                            isChangeable = true;
		                                        }else{
		                                            that.isAdded = false;
		                                            return;
		                                        }
		                                    }
		
											field.columns[colv][key] = field.columns[colv][key].replace(/\r?\n|\r/g, " ");
											//field.columns[colv][key] = field.columns[colv][key].replace(/'/g, '&#39;');
											//field.columns[colv][key] = field.columns[colv][key].replace(/"/g, '&#34;');
											field.columns[colv][key] = field.columns[colv][key].replace(/\r?\n|\r/g, " ");
											field.columns[colv][key] = that.removeSpecialCharcode(field.columns[colv][key]);
										}
									}
		                        }
		                        if (isChangeable === false) {
		                            that.isAdded = false;
		                            return;
		                        }
		                    }
		                }catch(ex){}
		                
		            } else {
		                try {
		                    field[fiel] = field[fiel].trim();
		                    field[fiel] = field[fiel].replace(/\r?\n|\r/g, " ");
		                    //field[fiel] = field[fiel].replace(/'/g, '&#39;');
		                    //field[fiel] = field[fiel].replace(/"/g, '&#34;');
		                    if (that.checkIsEmpty(field[fiel])) {
		                        field[fiel] = "";
		                    }
		
		                } catch (ex) {
		
		                }
		                
		            }
		        }
		        
		        var lastAction = that.actions[that.actions.length - 1];
		        if (lastAction === undefined) {
		            that.isAdded = true;
		            lastAction = {};
		        }
		        if (that.defineCheck || that.defineExportImport) {
		            if (that.prevEvent.type === "focusin") {
		                return;
		            }
		            that.isAdded = true;
		            that.actions.push(field);
		            return;
		        }
		        if ((field.action.indexOf("ROW_SELECT") !== -1)) {
		           
		            if (that.prevEvent.type === "focusin") {
		                if (lastAction.action === field.action) {
		                    if (JSON.stringify(lastAction).substr(0, Number(JSON.stringify(lastAction).indexOf("prevText")) - 2) + "}" !== JSON.stringify(field)) {
		                        for(var i=0; i<lastAction.columns.length; i++){
									if(lastAction.columns[i].changeable.toUpperCase === "TRUE"){
										lastAction = lastAction.columns[i];
										var columnIndex = i;
										break;
									}
								}
								if(lastAction.id === field.columns[i].id && lastAction.value === field.columns[i].value){
									that.isAdded = true;
									return;
								}
								that.isAdded = true;
								that.actions.push(field);
		                    }
		                } else {
		                    
		                    that.isAdded = true;
		                    that.actions.push(field);
		                }
		                return;
		            } 
		        } else if (that.prevEvent.type === "focusin") {
		            return;
		        }
		        try {
		            if ((field.type !== "" && field.type.indexOf("sapM") === -1 && field.type.indexOf("sapUi") === -1) || field.type === "sapMITBText" ||field.type === "sapUiIcon" || field.type === "sapMeCalendar" || field.type === "sapMMessageToast" || field.action.indexOf("ROW_") !== -1) {
		                if (field.type.indexOf("InputField") !== -1 || field.type.indexOf("TextArea") !== -1 || field.type === "search") {
		                    if (lastAction.id === field.id && lastAction.type === field.type) {
		                        if (!(that.checkIsEmpty(field.importValue) && that.checkIsEmpty(field.exportValue) && that.checkIsEmpty(field.check) && that.checkIsEmpty(field.checkParameter) && that.checkIsEmpty(field.uicheck))) {
		                            
		                            that.isAdded = true;
		                            that.actions.push(field);
		                        }
		                    } else {
		                      
		                        that.isAdded = true;
		                        that.actions.push(field);
		                    }
		                } else {
		                    
		                    that.isAdded = true;
		                    that.actions.push(field);
		                }
		
		            } else {
		                that.isAdded = false;
		            }
		        } catch (ex) {
		            if ((field.action.indexOf("ROW_") !== -1)) {
		                
		                if (lastAction.action === field.action && field.action === "ROW_SELECT") {
		                    if (JSON.stringify(lastAction).substr(0, Number(JSON.stringify(lastAction).indexOf("prevText")) - 2) + "}" !== JSON.stringify(field)) {
		                        for(var i=0; i<lastAction.columns.length; i++){
									if(lastAction.columns[i].changeable.toUpperCase() === "TRUE"){
										lastAction = lastAction.columns[i];
										var columnIndex = i;
										break;
									}
								}
								if(lastAction.id === field.columns[i].id && lastAction.value === field.columns[i].value){
									that.isAdded = true;
									return;
								}
								that.isAdded = true;
								that.actions.push(field);
		                    }
		                } else {
		                    
		                   
		                    that.isAdded = true;
		                    that.actions.push(field);
		                }
		
		                
		            }
		        }
		        };
            that.clickFioriUi5 = function (event) {
            	event = event || window.event;
                var goto = true;
                that.clickFioriUi5.event = event;
                var ele,i;
                var element = event.srcElement || event.target, className = "", tagName = "", tempElement, isList = that.isListFioriUi5(element), isTable;
                tagName = element.tagName; tempElement = element;
                className = that.getclassName(tempElement);
                var ovpElementSrc = tempElement;
                try {
					while (!((that.getclassName(element).indexOf("sapOvpCardHeader") !== -1 || that.getclassName(element).indexOf("sapOvpStackCardContent") !== -1 || that.getclassName(element).indexOf("sapOvpBaseCard") !== -1)&& that.getclassName(element).indexOf("sapMFlexBox") !== -1)) {
						element = element.parentElement;
						if (element.tagName.toUpperCase() === "BODY") {
							element = tempElement;
							break;
						}
					}
				} catch (ex) {
                    element = tempElement;
                }

                if ((that.getclassName(element).indexOf("sapOvpCardHeader") !== -1 || that.getclassName(element).indexOf("sapOvpStackCardContent") !== -1) && that.getclassName(element).indexOf("sapMFlexBox") !== -1) {
                    tempElement = element;
                }
                var document = element.ownerDocument;
                var field;
                if (that.mouseupFioriUi5.dragdrop) {
                    element = that.mouseupFioriUi5.dragdropelm;
                    tempElement = element;
                }
                that.startGetValue(element);
                if (that.toastMessage !== undefined) {
                    field = new Object();
                    field.UITECH = "04";
                    field.type = "sapMMessageToast";
                    field.text = that.toastMessage.replace(/\r?\n|\r/g, " ");
                    field.check = field.text.replace(/\r?\n|\r/g, " ");
                    field.action = "MESSAGE";
                    field.optionalStep = "X";
                    try{
                        if (that.actions[that.actions.length - 1].check !== field.check || that.checkIsEmpty(field.check)) {
                            that.actions.push(field);
                        }
                    } catch (ex) {
                            that.actions.push(field);
                    }
                    that.toastMessage = undefined;
                }
                field = new Object();
                field.action = "";
                className = that.getclassName(tempElement);
                var temp = tempElement;
                while(that.checkIsEmpty(className))
                {
                    temp = temp.parentElement;
                    className = that.getclassName(temp);
                }
                if (that.getclassName(tempElement).indexOf("Overlay") !== -1) {
                    if (!that.checkIsEmpty(that.getAllElementsFromPoint(event.clientX, event.clientY))) {
                        tempElement = that.getAllElementsFromPoint(event.clientX, event.clientY);
                        element = tempElement;
                    }
                }
                if (className.indexOf("sapU") === -1 || className.indexOf("sapM") !== -1) {
                    field.UITECH = "04";
                } else {
                    field.UITECH = "05";
                }
                isTable = that.isTableFioriUi5(element, field); 
                var contrlType = that.DatetimePicker(element);
                if (that.isTile(element,field)) {
                    if (!that.checkIsEmpty(that.traverseToParentbyClassName(element, "sapMStdTile")) || that.getclassName(element).indexOf("sapMStdTile")!==-1) {
                        field.id = element.id;
                        if (field.id === "") {
                            field.id = element.children.item(0).id;
                        }
                        field.type = "CustomTile";
                        while (tempElement.tagName.toUpperCase() !== "BODY") {
                            if (that.getclassName(tempElement).indexOf("sapMTCScrl") !== -1) {
                                field.nodeKey = tempElement.className;
                                field.type = "XRayCarousel";
                                break;
                            }
                            tempElement = tempElement.parentElement;
                        }
                        that.getFioriUi5Label(element, field);
                        field.value = element.innerText;
                        if (that.checkIsEmpty(field.value)){
    						field.value = field.label;
                        }
                        field.action = "Field";
                        field.object_repository = that.startgetObjectRepo(element);
                        tempElement = element;

                        field.nodeKey = field.nodeKey + "&" + that.getclassName(element);
                        field.name = field.id;
                    } else if (that.getclassName(element).indexOf("sapUshellTileBaseInfo") !== -1 && (that.defineExportImport || that.defineCheck)) {
                        field.type = "TileStatus";
                    } else if (that.getclassName(element).indexOf("sapUshellDynamicTileNumber") !== -1 && (that.defineExportImport || that.defineCheck)) {
                        field.type = "TileNumber";

                    } else if (that.getclassName(element).indexOf("sapUshellDynamicTileIndication") !== -1 && (that.defineExportImport || that.defineCheck)) {
                        field.type = "TileIndicator";
                    }
                    else {

                        field.id = element.id;
                        field.type = "ShellTile";
                        that.getFioriUi5Label(element, field);
                        field.value = field.label;
                        field.action = "Field";
                        field.object_repository = that.startgetObjectRepo(element);
                        field.name = field.id;

                    }
                    if (that.getclassName(tempElement).indexOf("sapUshellTileDelete") !== -1 || !that.checkIsEmpty(that.traverseToParentbyClassName(tempElement, "sapUshellTileDelete"))) {
                        field.type = "tileDelete";
                        var tileElement = that.traverseToParentbyTagName(element, "LI");  // only in case of tile delete
						field.object_repository = that.startgetObjectRepo(tileElement);
                    }
                    if (that.defineExportImport || that.defineCheck) {
                        field.value = element.innerText;
                        field.label = field.value;
                    }
                    goto = false;
                    while(that.checkIsEmpty(field.id)){
                        field.id = tempElement.parentElement.id;
                        tempElement = tempElement.parentElement;
                    }
                    field.name = field.id;
                    that.addActions(field);
                } else if (!that.checkIsEmpty(contrlType) && contrlType !== "FOOTEROK" && contrlType !== "VH" && (that.actions.length>0 ? that.actions[that.actions.length - 1].type.indexOf("Help")!==-1 : false)) {
                    if (contrlType === "DateTime") {
                        that.clickFioriUi5.DatetimePicker = true;
                    } else if (contrlType === "Cal") {
                        that.clickFioriUi5.calItem = true;
                    } else if (contrlType === "TimePicker") {
                        that.clickFioriUi5.TimePicker = true;
                    }
                   return true;
                }
                if (contrlType === "FOOTEROK") {
                    that.clickFioriUi5.Footer = true;
                }

                if ((that.clickFioriUi5.DatetimePicker || that.clickFioriUi5.calItem || that.clickFioriUi5.TimePicker) && !that.clickFioriUi5.Footer) {
                    that.addCalanderControl(element);
                }
				if(that.getclassName(element).indexOf("sapMeCalendarPrevious") !== -1 || that.getclassName(element).indexOf("sapMeCalendarNext") !== -1){
					return true;
				}
                if (that.clickFioriUi5.Footer) {
                    that.clickFioriUi5.Footer = false;
                    that.clickFioriUi5.FooterDone = true;
                }

                while (goto) {
                	  try{
                          tagName = tempElement.tagName;
                      }catch(ex){
                          return;
                      }
                    switch (tagName.toUpperCase()) {
                        case "TABLE":
                            //var tdElement = tempElement.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[field.row_number].childNodes;
                            var tdElement = tempElement.getElementsByTagName("tbody")[0].childNodes[field.row_number].childNodes;
                            field.columns = [];
                            field.action = "";
                            if (that.startCheckForEmptyString(field.id)) {
                                try {
                                    field.id = that.traverseToParentbyTagName(element, "TD").id;
                                } catch (ex) {

                                }

                            }
                            for (i = 0; i < tdElement.length; i++) {
                            	 try{
                                     that.startGetColumnDetails(tdElement[i], field, i);
                                 } catch (ex) {

                                 }
                            }
                            if (!that.checkIsEmpty(field.nodeKey) && field.nodeKey.indexOf("sapUiTableAction") !== -1) {
                                var colFinal = new Object();
                                colFinal.id = element.id;
                                colFinal.name = colFinal.id;
                                that.getFioriUi5ElementProperties(element, element.tagName, colFinal);
                                colFinal.value = element.getAttribute("title");
                                colFinal.label = "Column" + Number(i + 1);
                                colFinal.changeable = "True";
                                field.action = "ROW_CLICK";
                                field.columns.push(colFinal);
                            }
                            field.tabletype = "Table";
                            field.table_semantic = "List Type";
                            that.startGetColumnDetails.isRowsel = false;
                            var invTbody = tempElement.getElementsByTagName("tbody")[0].childNodes;
                            var invRowId = field.row_number;
                            try{
                                for (var invi = 0; invi <= field.row_number ; invi++) {
                                    if (that.checkIsDisplayNone(invTbody[invi])) {
                                        invRowId--;
                                    }
                                }
                                field.row_number = invRowId;
                            } catch (ex) {

                            }
                            that.addActions(field);
                            goto = false;
                            break;
                        case "INPUT":
                            field.action = "Field";
                            field.id = tempElement.id;
                            field.type = "InputField";
                            field.name = field.id;
                            field.value = tempElement.value;
                            that.getFioriUi5ElementProperties(tempElement, tagName, field);
                            if (isList) {
                                tempElement = that.startGoToFioriListElement(tempElement);
                                tagName = tempElement.tagName;
                                continue;

                            }
                            if (isTable) {
                                tempElement = that.traverseToParentbyTagName(element, "TABLE");
                                continue;
                            }
                            field.object_repository = that.startgetObjectRepo(tempElement);
                            that.getFioriUi5Label(element, field);
                            if (that.clickFioriUi5.isCombo) {
                                that.clickFioriUi5.isCombo = false;
                                field.type = "ComboBox";
                            }
                            that.addActions(field);
                            goto = false;
                            break;
                        case "TEXTAREA":
                            field.id = tempElement.id;
                            field.action = "Field";
                            field.name = field.id;
                            field.type = "TextArea";
                            field.value = tempElement.getAttribute("value");
                            if (that.startCheckForEmptyString(field.value)) {
							    field.value = tempElement.value;
							}
                            if (isTable) {
                                tempElement = that.traverseToParentbyTagName(element, "TABLE");
                                continue;
                            }
                            field.object_repository = that.startgetObjectRepo(tempElement);
                            that.getFioriUi5Label(element, field);
                            that.addActions(field);
                            goto = false;
                            break;
                        case "BUTTON":
                        	if (that.getclassName(tempElement).indexOf("sapUiCal") !== -1) {
						// if condition added for the control CalendarDateInterval
								if (that.checkIsEmpty(that.traverseToParentbyClassName(tempElement,"sapUiCalDateInt")) && that.checkIsEmpty(that.traverseToParentbyClassName(tempElement,"sapUiCalMonthInt"))) {
									return; 
								}
							}
                            field.action = "CLICK";
                            field.id = tempElement.id;
                            field.type = "Button";
                            field.name = field.id;
                            field.label = tempElement.innerText;
                            field.label = that.removeSpecialCharcode(field.label);
                            field.label = field.label.replace(/\r?\n|\r/g, " ");
                            if (that.checkIsEmpty(field.label)) {
                                field.label = tempElement.getAttribute("aria-label");
                            }
                            if (that.checkIsEmpty(field.label)) {
                                field.label = tempElement.getAttribute("title");
                            }if (that.checkIsEmpty(field.label)) {
                                field.label = tempElement.innerText;
                                field.label = that.removeSpecialCharcode(field.label);
                                field.label = field.label.replace(/\r?\n|\r/g, " ");
                            }
                            field.value = field.label;
                            that.getFioriUi5ElementProperties(tempElement, tagName, field);
                            if (that.isListFioriUi5(tempElement)) {
                                tempElement = that.startGoToFioriListElement(tempElement);
                                tagName = tempElement.tagName;
                                continue;
                            }
                            if (isTable) {
                                tempElement = that.traverseToParentbyTagName(element, "TABLE");
                                continue;
                            }
                            if (field.type === "SegmentButton") {
                                try{
                                    tempElement = that.traverseToParentbyClassName(tempElement, "sapHpaGsegSegmentLabel ui-droppable");
                                    field.object_repository = that.startgetObjectRepo(tempElement);
                                } catch (ex) {

                                }
                                
                                
                            } else {
                                field.object_repository = that.startgetObjectRepo(tempElement);
                            }
                            var ElementforLabel = tempElement;
                            while(that.checkIsEmpty(field.label) && ElementforLabel.tagName.toUpperCase() !== "BODY" ){
								ElementforLabel = ElementforLabel.parentElement;
								field.label = ElementforLabel.getAttribute("aria-label");
								if (that.checkIsEmpty(field.label)) {
									field.label = ElementforLabel.getAttribute("title");
								}
								if (that.checkIsEmpty(field.label)) {
									field.label = ElementforLabel.innerText;
									field.label = that.removeSpecialCharcode(field.label);
									field.label = field.label.replace(/\r?\n|\r/g, " ");
								}
								
							}
							if (field.type !== "SegmentButton") {
					    		field.value = field.label;
							}
                            that.addActions(field);
                            goto = false;
                            break;
                        case "A":
                            field.action = "CLICK";
                            field.id = tempElement.id;
                            field.type = "Link";
                            field.name = field.id;
                            field.nodeKey = tempElement.className;
                            field.label = tempElement.innerText;
                            field.label = that.removeSpecialCharcode(field.label);
                            field.label = field.label.replace(/\r?\n|\r/g, " ");
                            if (that.checkIsEmpty(field.label)) {
                                field.label = tempElement.getAttribute("aria-label");
                            }
                            if (that.checkIsEmpty(field.label)) {
                                field.label = tempElement.getAttribute("title");
                            }
                            if (that.checkIsEmpty(field.label)) {
                                var tempUiIcon = tempElement.getElementsByClassName("sapUiIcon");
                                try{
                                	 if (!that.checkIsEmpty(tempUiIcon)) {
                                         field.label = tempUiIcon[0].getAttribute("aria-label");
                                     }
                                     if (that.checkIsEmpty(field.label)) {
                                         field.label = tempUiIcon[0].getAttribute("title");
                                     }
                                }catch(ex){
                                	
                                }
                               
                            }
                            field.value = field.label;
                            that.getFioriUi5ElementProperties(tempElement, tagName, field);
                            if (field.type === "ListTextLink") {
                                tempElement = that.startGoToFioriListElement(tempElement);
                                continue;
                            }
                            if (isTable) {
                                tempElement = that.traverseToParentbyTagName(element, "TABLE");
                                continue;
                            }
                            field.object_repository = that.startgetObjectRepo(tempElement);
                            that.addActions(field);
                            goto = false;
                            break;
                        case "OPTION":
                            if (that.actions.length > 0) {
                                if (that.actions[that.actions.length - 1].type === "Select") {
                                    that.actions[that.actions.length - 1].value = tempElement.innerText;
                                }
                            }
                            goto = false;
                            break;
                        case "SELECT":
                            field.action = "FIELD";
                            field.id = tempElement.id;
                            field.name = field.id;
                            field.type = "Select";
                            field.label = tempElement.innerText;
                            field.label = that.removeSpecialCharcode(field.label);
                            field.label = field.label.replace(/\r?\n|\r/g, " ");
                            if (tempElement.parentElement.getElementsByTagName("input").length > 0) {
                                tempElement = tempElement.parentElement.getElementsByTagName("input")[0];
                                tagName = tempElement.tagName;
                                continue;
                            }
                            if (that.checkIsEmpty(field.label)) {
                                field.label = tempElement.getAttribute("aria-label");
                            }
                            if (that.checkIsEmpty(field.label)) {
                                field.label = tempElement.getAttribute("title");
                            }
                            field.name = field.id;
                            if (isList) {
                                tempElement = that.startGoToFioriListElement(tempElement);
                                tagName = tempElement.tagName;
                                continue;
                            }
                            if (isTable) {
                                tempElement = that.traverseToParentbyTagName(element, "TABLE");
                                continue;
                            }
                            field.object_repository = that.startgetObjectRepo(tempElement);
                            that.actions.push(field);
                            goto = false;
                            break;
                        case "IMG":
                            field.action = "CLICK";
                            field.id = tempElement.id;
                            field.name = field.id;
                            field.type = "Image";
                            field.label = tempElement.innerText;
                            field.label = that.removeSpecialCharcode(field.label);
                            field.label = field.label.replace(/\r?\n|\r/g, " ");
                            if (that.checkIsEmpty(field.label)) {
                                field.label = tempElement.getAttribute("aria-label");
                            }
                            if (that.checkIsEmpty(field.label)) {
                                field.label = tempElement.getAttribute("title");
                            }
                            field.value = tempElement.innerText.replace(/\r?\n|\r/g, " ");
                            field.name = field.id;
                            if (isList) {
                                if (tempElement.parentElement.tagName.toUpperCase() === "BUTTON" && !that.startCheckForEmptyString(tempElement.parentElement.getAttribute('role')) && tempElement.parentElement.getAttribute('role').indexOf("button") !== -1) {
							        tempElement = tempElement.parentElement;
							    } else {
							        tempElement = that.startGoToFioriListElement(tempElement);
							    }
								tagName = tempElement.tagName;
								continue;
                            }
                            if (isTable) {
                                tempElement = that.traverseToParentbyTagName(element, "TABLE");
                                continue;
                            }
                            field.object_repository = that.startgetObjectRepo(tempElement);
		                    if (!that.startCheckForEmptyString(tempElement.getAttribute('alt'))) {
							    var altAttributeText = tempElement.getAttribute('alt');
							    altAttributeText = that.removeSpecialCharcode(altAttributeText);
							    field.object_repository = field.object_repository + ";" + "ALT: " + altAttributeText;
							}
                            that.addActions(field);
                            goto = false;
                            break;
                        case "SPAN":
                            field.action = "CLICK";
                            field.id = tempElement.id;
                            field.label = tempElement.innerText.replace(/\r?\n|\r/g, " ");
                            field.value = tempElement.innerText.replace(/\r?\n|\r/g, " ");
                            field.name = field.id;
                            ele = tempElement;
                            if (that.checkIsEmpty(field.label)) {
                                field.label = tempElement.getAttribute("title");
                            }
                            if (that.checkIsEmpty(field.label)) {
                                field.label = tempElement.getAttribute("aria-label");
                            }
                            while (ele.tagName.toUpperCase() !== "INPUT" && ele.children.length > 0) {
                                ele = ele.children.item(0);
                            }
                            if (ele.tagName.toUpperCase() === "INPUT") {
                                tagName = ele.tagName;
                                tempElement = ele;
                                continue;
                            }
                            ele = tempElement;

                            while ((ele.tagName.toUpperCase() !== "BUTTON" && ele.tagName.toUpperCase() !== "A") && ele.tagName.toUpperCase() !== "BODY") {
                                ele = ele.parentElement;
                            }
                            if (ele.tagName.toUpperCase() === "BUTTON" || ele.tagName.toUpperCase() === "A") {
                                tagName = ele.tagName;
                                tempElement = ele;
                                continue;
                            }

                            that.getFioriUi5ElementProperties(tempElement, "SPAN", field);
                            ele = tempElement;
                            while (that.checkIsEmpty(field.id)) {
                                field.id = ele.parentElement.id;
                                ele = ele.parentElement;
                                if (ele.tagName.toUpperCase() === "BODY") {
                                    break;
                                }

                            }
                            if (that.isListFioriUi5(element)) {

                                tempElement = that.startGoToFioriListElement(tempElement);
                                tagName = tempElement.tagName;
                                continue;
                            }
                            if(field.type.toUpperCase() === "CALENDARAPPOINTMENT"){
								isTable = false; // in this case element is not a part of the table its on top of the table
							}
                            if (isTable) {
                            	  if (that.getclassName(element).indexOf("sapUiTableAction") !== -1 || that.getclassName(element.parentElement).indexOf("sapUiTableAction") !== -1) {
                                      tempElement = that.traverseToParentbyClassName(element, "sapUiTableCCnt");
                                      tempElement = tempElement.getElementsByTagName("table")[0];
                                      continue;
                                  }
                                tempElement = that.traverseToParentbyTagName(element, "TABLE");
                                continue;
                            }
                            field.object_repository = that.startgetObjectRepo(tempElement);
		                    if(field.type.toUpperCase() === "OVPSELECT"){
								field.name = that.getLabelOvpCard(tempElement);
								field.label = that.getNearText(field, tempElement, true);
							}else{
								that.getFioriUi5Label(element, field);
							}	
                            if (field.type === "ValueHelp" || field.type === "InputHelp") {
                                field.id = tempElement.id;
                            }
                            that.addActions(field);
                            goto = false;
                            break;
                        case "LABEL":
                            field.action = "Click";
                            field.id = tempElement.id;
                            field.name = field.id;
                            field.type = "Label";
                            field.label = tempElement.innerText.replace(/\r?\n|\r/g, " ");
                            field.value = tempElement.innerText.replace(/\r?\n|\r/g, " ");
                            field.name = field.id;
                            className = that.getclassName(tempElement.parentElement);
                            if (tempElement.parentElement.tagName.toUpperCase() === "SPAN" || that.getclassName(tempElement).indexOf("sapMSltLabel")!==-1) {
                                tempElement = tempElement.parentElement;
                                tagName = tempElement.tagName;
                                continue;
                            }
                            if (isTable) {

                                tempElement = that.traverseToParentbyTagName(element, "TABLE");
                                continue;
                            } if (that.isListFioriUi5(element)) {
                                tempElement = that.startGoToFioriListElement(tempElement);
                                tagName = tempElement.tagName;
                                continue;
                            }
                            field.object_repository = that.startgetObjectRepo(tempElement);
                            if (that.defineCheck || that.defineExportImport){
                            	 that.getFioriUi5Label(element, field);
                            }
                           
                            if (className.indexOf("sapUiTableCol") !== -1 || className.indexOf("sapMListTblHeaderCell") !== -1) {
                                field.type = "ColumnHeader";
                                field.label = tempElement.innerText;
                                field.action = "Field";
                                if(that.checkIsEmpty(field.nodeKey)){
										field.nodeKey = that.getclassName(tempElement);
								}		
                            }
                            that.addActions(field);
                            goto = false;
                            break;

                        case "DIV":
                            field.action = "Click";
                            field.id = tempElement.id;
                            field.label = tempElement.innerText.replace(/\r?\n|\r/g, " ");
                            field.value = tempElement.innerText.replace(/\r?\n|\r/g, " ");
                            field.name = field.id;

                            ele = tempElement;


                            while (ele.tagName.toUpperCase() != "INPUT" && ele.children.length > 0) {
                                ele = ele.children.item(0);
                            }
                            if (ele.tagName.toUpperCase() === "INPUT") {
                                tagName = ele.tagName;
                                tempElement = ele;
                                continue;
                            }
                            ele = tempElement;
                            if(that.getclassName(ele).indexOf("sapUiCalItem") !== -1){
								return;
							}
                            if (that.getclassName(ele).indexOf("sapUiTfComboIcon") !== -1) {
                                ele = ele.nextElementSibling;
                                if (ele.tagName.toUpperCase() === "INPUT") {
                                    that.clickFioriUi5.isCombo = true;
                                    tagName = ele.tagName;
                                    tempElement = ele;
                                    continue;
                                }
                            }
                            ele = tempElement;
                            
                            while (ele.tagName.toUpperCase() !== "BUTTON" && ele.tagName.toUpperCase() !== "A" && ele.tagName.toUpperCase() !== "BODY") {
                                ele = ele.parentElement;
                            }
                            if (ele.tagName.toUpperCase() === "BUTTON" || ele.tagName.toUpperCase() === "A") {
                                tagName = ele.tagName;
                                tempElement = ele;
                                continue;
                            }
                            that.getFioriUi5ElementProperties(tempElement, "DIV", field);
                            ele = tempElement;
							while (that.checkIsEmpty(field.id)) {
								field.id = ele.parentElement.id;
								ele = ele.parentElement;
								if (ele.tagName.toUpperCase() === "BODY") {
									break;
								}
							}
                            if (isList) {
                                tempElement = that.startGoToFioriListElement(tempElement);
                                tagName = tempElement.tagName;
                                continue;
                            } if (that.getclassName(tempElement) === "sapUiTableCell") {
                                tempElement = tempElement.children.item(0);
                                tagName = tempElement.tagName;
                                continue;
                            }
                            
                            if (isTable) {
                                if (that.getclassName(element).indexOf("sapUiTableRowHdr") !== -1) {
                                    tempElement = that.traverseToParentbyClassName(element, "sapUiTableCCnt");
                                    tempElement = tempElement.getElementsByTagName("table")[0];
                                    continue;
                                }
                                tempElement = that.traverseToParentbyTagName(element, "TABLE");
                                continue;
                            }
                            field.object_repository = that.startgetObjectRepo(tempElement);
                            if (field.type !== "Button") {
                                that.getFioriUi5Label(element, field);
                            }
                            if (that.getclassName(tempElement.parentElement).indexOf("sapUiTableCol") !== -1) {
                                field.type = "TableColumn";
                                field.action = "Click";
                                var tempElemnt = tempElement;
                                while(that.checkIsEmpty(field.id)){
                                    try{
                                        field.id = tempElemnt.id;
                                        tempElemnt = tempElemnt.parentElement;
                                    }catch(ex){
                                        field.id = "";
                                    }

                                }
                                field.name = field.id;
								try{
									tempElement = that.traverseToParentbyTagName(element, "TR");
									if(that.getclassName(tempElement).indexOf("sapUiTableColHdrTr")!== -1){
										field.type = "ColumnHeader";
										if(that.checkIsEmpty(field.nodeKey)){
											field.nodeKey = that.getclassName(tempElement);
										}
									}
								}catch(ex){
									tempElement = element;
								}
		
							}
							if((field.type === "ClickCardHeader" || field.type === "ClickStackCard") && (that.defineCheck || that.defineExportImport)){
								field.value = ovpElementSrc.innerText.replace(/\r?\n|\r/g, "");
							}
							that.addActions(field);
							goto = false;
							break;
                        case "LI":
                            field.action = "Field";
                            that.getFioriUi5ElementProperties(tempElement, tagName, field);
                            if (isTable) {
                                tempElement = that.traverseToParentbyTagName(element, "TABLE");
                                continue;
                            }
                            //latest changes
                            if (that.actions.length > 0) {
                                var lastAction = that.actions.length - 1;
                                if (that.actions[that.actions.length - 1].type === "sapMMessageToast") {
                                    lastAction = lastAction - 1;
                                }
                                if (field.type.toUpperCase() === "LIST" && !(that.defineCheck || that.defineExportImport) && (that.actions[lastAction].type === "Select" || that.actions[lastAction].type === "ComboBox" || that.actions[lastAction].type === "ListSelect") && that.actions[lastAction].action !== "ROW_DATA") {
                                    that.actions[lastAction].value = field.value;
                                } else {
                                	 field.object_repository = that.startgetObjectRepo(tempElement);
                                     try {
                                         if (that.checkIsEmpty(field.id)) {
                                             field.id = tempElement.id;
                                         }
                                     } catch (ex) {
                                         field.id = "";
                                     }
                                    that.addActions(field);
                                }
                            }  else {
                                that.addActions(field);
                            }
                            field.object_repository = that.startgetObjectRepo(tempElement);
                            if (!that.startCheckForEmptyString(field.type) && field.type.indexOf("ListButton") !== -1) {
							    var elementForObjectRepo = event.srcElement || event.target;
							    var buttonElement = that.traverseToParentbyTagName(elementForObjectRepo, "BUTTON");
							    if (!that.startCheckForEmptyString(buttonElement)) {
							        var indexOfTag = field.object_repository.indexOf("TagName: ") + 9;
							        field.object_repository = field.object_repository.substring(0, indexOfTag) + buttonElement.tagName;
							    }
							}
                            if (that.checkIsEmpty(field.id)) {
                                field.id = tempElement.id;
                            }
                            if (that.checkIsEmpty(field.label)) {
                                that.getFioriUi5Label(element, field);
                            }
                            
                            if (that.getclassName(tempElement).indexOf("sapUiTreeNode") !== -1) {
                                if (that.getclassName(tempElement).indexOf("ui-draggable") === -1) {
                                    field.type = "TreeList";
                                } else {
                                    try{
                                        tempElement = that.traverseToParentbyTagName(tempElement, "UL");
                                        tempElement = tempElement.previousElementSibling;
                                        field.label = tempElement.innerText;
                                    } catch (ex) {

                                    }
                                   
                                }
                                
                            }if(field.type === "List"){
                            	field.label = "List";
                            }
                            if (that.checkIsEmpty(field.value) || field.value==="X") {
                                field.value = field.label;
                            }
                            goto = false;
                            break;
                            //latest changes
                        case "TD":
                        	if(that.getclassName(tempElement).indexOf("sapMListTblCellNoData")!==-1){
                                field.action = "Field";
                                field.id = that.traverseToParentbyTagName(tempElement,"TABLE").id;
                                field.name = field.id;
                                field.type = "TableNoData";
                                field.value = tempElement.innerText;
                                field.label = field.value;
                                field.object_repository = that.startgetObjectRepo(tempElement);
                                field.nodeKey = tempElement.getAttribute("class");
                                that.addActions(field);
                                goto = false;
                                break;
                            }
                        	else if (that.getclassName(tempElement) === "sapUiTableTd" || that.getclassName(tempElement).indexOf("sapMListTbl")!==-1 || that.getclassName(tempElement) === "sapUiTableCol") {
                                tempElement = tempElement.children.item(0);
                                if(that.checkIsEmpty(tempElement)){
                                    field.action = "Field";
                                    field.id = element.id;
                                    field.name = element.id;
                                    field.type = "TableNoData";
                                    field.value = element.innerText;
                                    field.label = field.value;
                                    field.object_repository = that.startgetObjectRepo(element);
                                    field.nodeKey = element.getAttribute("class");
                                    if (isTable) {
                                        tempElement = that.traverseToParentbyTagName(element, "TABLE");
                                        continue;
                                    }
                                    goto = false;
                                    break;
                                }else{
                                    continue;
                                }
                            }
                            goto = false;
                            break;
                        case "UL":
                            if (that.getclassName(tempElement).indexOf("sapMList") !== -1) {
                                tempElement = tempElement.getElementsByTagName("li")[0];
                                if (that.checkIsEmpty(tempElement)) {
                                    return;
                                } else {
                                    tagName = tempElement.tagName;
                                    continue;
                                }
                            }
                            goto = false;
                            break;
                        case "BDI":
                            tempElement =  tempElement.parentElement;
                            tagName = tempElement.tagName;
                            continue;
		                case "B":
							tempElement = tempElement.parentElement;
							tagName = tempElement.tagName;
							continue;
                        case "H1":
                        	if (isList) {
                                tempElement = that.startGoToFioriListElement(tempElement);
                                tagName = tempElement.tagName;
                                continue;
                            }
                            if (that.getclassName(tempElement)==="sapUshellHeadTitle" || that.getclassName(tempElement) === "sapMPanelHdr") {
                                field.action = "Field";
                                field.id = tempElement.id;
                                if (that.checkIsEmpty(field.id)) {
                                    field.id=tempElement.parentElement.id;
                                }
                                field.type = "TextView";
                                if (that.getclassName(tempElement) === "sapMPanelHdr"){
                                    field.action = "Click";
                                    field.type = "MPanel";
                                }
                                field.name = field.id;
                                field.value = tempElement.value;
                                field.object_repository = that.startgetObjectRepo(tempElement);
                                that.getFioriUi5ElementProperties(tempElement, tagName, field);
                                that.getFioriUi5Label(element, field);
                                if (that.checkIsEmpty(field.value)) {
                                    field.value = field.label;
                                }
                                that.addActions(field); 
                            }
                            goto = false;
                            break;
                        case "CANVAS":
                            field.id = tempElement.id;
                            field.type = "CanvasClick";
                            field.action = "Click";
                            field.name = field.id;
                            try {
                                field.label = that.traverseToParentbyClassName(tempElement, "sapMFlexBox").innerText;
                            } catch (ex) { }
                            field.object_repository = that.startgetObjectRepo(tempElement);
                            if (isTable) {
								tempElement = that.traverseToParentbyTagName(element, "TABLE");
								continue;
							}
                            goto = false;
                            break;
                        case "P":
    						tempElement = tempElement.parentElement;
    						tagName = tempElement.tagName;
    						continue;  
                            
                        default:
                        	ele = tempElement;
                        if(tempElement.tagName.charAt(0)=="H" && tempElement.className.indexOf("Title")){
                            if(that.defineCheck || that.defineExportImport || className.indexOf("Overlay")){
                                field.action = "Field";
                                field.id = tempElement.id;
                                if (that.checkIsEmpty(field.id)) {
                                    field.id=tempElement.parentElement.id;
                                }
                                field.type = "TextView";
                                field.name = field.id;
                                field.value = tempElement.innerText;
                                field.label = field.value;
                                field.object_repository = that.startgetObjectRepo(tempElement);
                                that.addActions(field);
                                goto = false;
                                break;
                            }
                        }
                        var isMirrorControl;
                         while (ele.tagName.toUpperCase() !== "BODY") {
                             if (that.getclassName(ele).indexOf("sapMInput") !== -1) {
                                 if(that.getclassName(ele).indexOf("CodeMirror")!==-1){
                                     isMirrorControl = true;
                                     field.id = ele.id;
                                     if (that.checkIsEmpty(field.id)) {
                                         field.id = ele.parentElement.id;
                                     }
                                    
                                 }
                                 for (i = 0 ; i < ele.querySelectorAll("input,textarea").length ; i++) {
                                     if (!that.checkIsDisplayNone(ele.querySelectorAll("input,textarea")[i])) {
                                         tempElement = ele.querySelectorAll("input,textarea")[i];
                                         break;
                                     }
                                 }
                                 break;
                             }
                               ele = ele.parentElement;
                         }
                         if (isMirrorControl === true) {
                             field.type = "MirrorControl";
                             field.name = field.id;
                             field.action = "Field";
                             field.object_repository = that.startgetObjectRepo(tempElement);
                             that.getFioriUi5Label(element, field);
                             that.addActions(field);
                         }
                            goto = false;
                            break;
                    }
                }
                field.object_repository = field.object_repository + ";" + "MouseEvent: " + (event.which === 3 ? "RightClick" : event.which === 1 ? "LeftClick" : "");
                try{
                    field.prevText = that.getNearText(field, tempElement, true);
                    if (field.type.indexOf("Switch") !== -1 || field.type.toUpperCase().indexOf("TEXT") !== -1 || field.type.toUpperCase() === "LABEL") {
                    	if (field.label === field.value) {
							if(field.type.toUpperCase() !== "TEXTLINK" && field.action.toUpperCase() !== "CLICK"){
								field.label = that.getNearText(field, element, true);
							}
						}
					}
                    that.getIndexOfnearBy(tempElement, field, that.prepostElement);
                    var pre2 = that.getNearText(field, that.prepostElement, true);
                    field.prevText = field.prevText + "&~&" + pre2;
                    field.prevText = field.prevText.replace(/\r?\n|\r/g, "");
                    field.prevText = field.prevText.replace(/[^\x00-\x7F]/g, "");
                    field.nextText = that.getNearText(field, tempElement, false);
                    var next2 = that.getNearText(field, that.prepostElement, false);
                    field.nextText = field.nextText + "&~&" + next2;
                    field.nextText = field.nextText.replace(/\r?\n|\r/g, "");
                    field.nextText = field.nextText.replace(/[^\x00-\x7F]/g, "");
                    field.nearBy = 'Previous: ' + field.prevText + ';Next: ' + field.nextText;
                } catch (exq1) {

                }
                if (that.startCheckForEmptyString(field.value)) {
                    field.value = "";
                }
                //                console.log(field);
                if (that.defineCheck && that.isAdded) {
                	that.setBackIdUicheck(event);
                    document.getElementById('STARTouterchk_id').className = "STARToutervisible";
                    that.disableHighlighter(window);
                    that.currentobject = field;
                } else if (that.defineExportImport && that.isAdded) {
                	that.setBackIdUicheck(event);
                	//that.checkDisableImport(field);
                    document.getElementById('STARTouter_imp_exp').className = "STARToutervisible";
                    that.disableHighlighter(window);
                    that.currentobject = field;
                }else if (that.isAdded && !that.mouseupFioriUi5.dragdrop) {
                    that.clickFioriUi5.clientX = event.clientX;
                    that.clickFioriUi5.clientY = event.clientY;
                    that.mouseupFioriUi5.dragdrop = false;
                    that.mouseupFioriUi5.dragdropelm = undefined;
                    document.addEventListener("mouseup", that.mouseupFioriUi5);
                    
                } else if (that.isAdded && that.mouseupFioriUi5.dragdrop) {
                    that.mouseupFioriUi5.dragdrop = false;
                    that.mouseupFioriUi5.dragdropelm = undefined;
                    that.addDragDropAction();
                }
                that.mouseupFioriUi5.dragdrop = false;
                that.isAdded = false;
                that.mouseupFioriUi5.dragdrop = false;

            };
		    that.getNearText = function (field, element, prev) {
				var flag = true;
				var className = "";
				var returnText = "";
				var sibling;
				var textWithoutClass = "";
				var mainElement = element;
				while (flag) {
					try {
						if (element.tagName.toUpperCase() === "BODY") {
							if (textWithoutClass) {
								break;
							}
							textWithoutClass = true;
							element = mainElement;
						}
					} catch (ex) {
						break;
					}
		
					try {
						if (prev) {
							sibling = element.previousElementSibling;
						} else {
							sibling = element.nextElementSibling;
						}
						while (!that.checkIsEmpty(sibling)) {
		
							/* if sibling is a text*/
							try {
								if (sibling.tagName.toUpperCase() === "SPAN" || sibling.tagName.toUpperCase() === "DIV" || sibling.tagName.toUpperCase() === "LABEL" || sibling.tagName.toUpperCase().indexOf("H") === 0) {
									className = that.getclassName(sibling);
									if (!textWithoutClass) {
										if (className.toUpperCase().indexOf("TV") !== -1 || className.indexOf("sapUiLbl") !== -1 || className.indexOf("sapMLabel") !== -1 || (className.indexOf("Text") !== -1 && className.indexOf("sapMSwtTextOn") === -1 && className.indexOf("sapMSwtTextOff") && className.indexOf("sapMTokenText") === -1) || className.indexOf("Title") !== -1 || className.indexOf("StdTxt") !== -1 || (className.indexOf("sapMILILabel") !== -1) || (className.indexOf("Label") !== -1 && className.indexOf("sapMSwtLabelOn") === -1 && className.indexOf("sapMSwtLabelOff")) || sibling.tagName.toUpperCase().indexOf("H") === 0 || className.indexOf("sapUiMnuTfItemLbl") !== -1) {
											if (!that.checkIsDisplayNone(sibling)) { returnText = sibling.innerText; that.prepostElement = sibling; }
		
										}
									} else {
										if (!that.checkIsDisplayNone(sibling)) { returnText = sibling.innerText; that.prepostElement = sibling; }
									}
		
									if (!that.checkIsEmpty(returnText)) {
										break;
									}
								} else {
									/* web gui*/
									if ((sibling.getAttribute("ct") === "L" || sibling.getAttribute("ct") === "TV") && !that.checkIsDisplayNone(sibling)) {
										returnText = sibling.innerText;
										that.prepostElement = sibling;
										if (!that.checkIsEmpty(returnText)) {
											break;
										}
									}
									if (!that.checkIsEmpty(that.getElementByAttributeElements("ct", "L", sibling))) {
										returnText = that.getElementByAttributeElements("ct", "L", sibling).innerText;
										that.prepostElement = that.getElementByAttributeElements("ct", "L", sibling);
										if (!that.checkIsEmpty(returnText)) {
											break;
										}
									}
									if (!that.checkIsEmpty(that.getElementByAttributeElements("ct", "TV", sibling))) {
										returnText = that.getElementByAttributeElements("ct", "TV", sibling).innerText;
										that.prepostElement = that.getElementByAttributeElements("ct", "TV", sibling);
										if (!that.checkIsEmpty(returnText)) {
											break;
										}
									}
								}
							} catch (ex) { }
		
		
							/* check siblings span is a text*/
							if (!that.startCheckForEmptyString(sibling.className) && sibling.className === "STARTouter") {
								return returnText;
							}
							var sibDescendants = sibling.querySelectorAll("h1,h2,h3,h4,h5,h6,span,label,div");
							try {
								if (sibDescendants.length > 0) {
									for (var index = 0; index < sibDescendants.length; index++) {
										className = that.getclassName(sibDescendants[index]);
										if (!textWithoutClass) {
											if (className.toUpperCase().indexOf("TITLE") !== -1 || className.indexOf("StdTxt") !== -1 || className.toUpperCase().indexOf("TV") !== -1 || className.indexOf("sapUiLbl") !== -1 || className.indexOf("sapMLabel") !== -1 || className.indexOf("Title") !== -1 
														|| (className.indexOf("Text") !== -1 && className.indexOf("sapMSwtTextOn") === -1 && className.indexOf("sapMSwtTextOff") === -1 && className.indexOf("sapMTokenText") === -1) 
														|| className.indexOf("sapMILILabel") !== -1 || (className.indexOf("Label") !== -1 && className.indexOf("sapMSwtLabelOn") === -1 && className.indexOf("sapMSwtLabelOff")) || sibDescendants[index].tagName.toUpperCase().indexOf("H") === 0) {
												if((!that.checkIsDisplayNone(sibDescendants[index])) && that.checkIsHeightWidhtVisible(sibDescendants[index])){
														returnText = sibDescendants[index].innerText;
												}
												that.prepostElement = sibDescendants[index];
												if (!prev && !that.checkIsEmpty(returnText) && !that.checkIsDisplayNone(sibDescendants[index])) {
													break;
												}
											}
										} else {
											if (sibDescendants[index].getElementsByTagName("xmp").length > 0) {
												//debugger;
												returnText = "";
											} else {
												returnText = sibDescendants[index].innerText;
												that.prepostElement = sibDescendants[index];
		
											}
											if (!prev && !that.checkIsEmpty(returnText) && !that.checkIsDisplayNone(sibDescendants[index])) {
												break;
											}
		
										}
		
		
									}
									if (!that.checkIsEmpty(returnText)) {
										break;
									}
								}
							} catch (ex) { }
							if (prev) {
								sibling = sibling.previousElementSibling;
							} else {
								sibling = sibling.nextElementSibling;
							}
						}
						if (!that.checkIsEmpty(returnText)) {
							break;
						}
						element = element.parentElement;
		
					} catch (ex) {
		
					}
				}
		
				return returnText;
			};      
            that.getAllElementsFromPoint = function (x, y) {
                var elements = [];
                var display = [], retElm;
                var document = event.currentTarget;
                var item = document.elementFromPoint(x, y);
                var prevItem;
                while (item && item !== document.body && item !== window && item !== document && item !== document.documentElement) {
                    if (that.checkIsDroppable(item) || that.getclassName(item).indexOf("Overlay")===-1) {
                        retElm = item;
                        break;
                    }
                    elements.push(item);
                    display.push(item.style.display);
                    item.style.display = "none";
                    item = document.elementFromPoint(x, y);
                    if (item === prevItem) {
                        break;
                    }
                    prevItem = item;

                }
                // restore display property
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = display[i];
                }
                return retElm;
            };
            that.mouseupFioriUi5 = function (event) {
            	 event = event || window.event;
                 var goto = true;
                var element = event.srcElement || event.target;
                var document = element.ownerDocument;
                var from, to;
               
                
                document.removeEventListener("mouseup", that.mouseupFioriUi5);
                try{
                    //from = document.getElementById(field.id);
                    //to = document.elementFromPoint(event.clientX, event.clientY);
                    to = that.getAllElementsFromPoint(event.clientX, event.clientY);
                    if (that.checkIsEmpty(to)) {
                        return;
                    }
                } catch (ex) {
                    return;
                }
                if (event.clientX === that.clickFioriUi5.clientX && event.clientY === that.clickFioriUi5.clientY) {
                    return;
                } else {
                    that.mouseupFioriUi5.dragdrop = true;
                    that.mouseupFioriUi5.dragdropelm = to;
                    that.clickFioriUi5(event);
                }
            };
            that.month =  {
                    Jan: "01", January: "01",
                    Feb: "02", February: "02",
                    Mar: "03", March: "03",
                    Apr: "04", April: "04",
                    May: "05",
                    Jun: "06", June: "06",
                    Jul: "07", July: "07",
                    Aug: "08", August: "08",
                    Sep: "09", September: "09",
                    Oct: "10", October: "10",
                    Nov: "11", November: "11",
                    Dec: "12", December: "12"
                };
                that.DatetimePicker = function (temploc) {
                    if (temploc.tagName.toUpperCase() === "BODY") {
                        return "";
                    }
                    var retVal = that.DatetimePicker(temploc.parentElement);
                    var clsname = that.getclassName(temploc);
                    that.clickFioriUi5.calID = temploc.id;
                    if (temploc.tagName.toUpperCase() === "FOOTER") {
                        if (!that.checkIsEmpty(retVal)) {
                            return "FOOTEROK";
                        }
                        return "FOOTER";
                    } else if (clsname.indexOf("sapMInputVH") !== -1) { return "VH"; } else if (!that.checkIsEmpty(retVal) && retVal !== "FOOTER") {
                        return retVal;
                    }
                    else if (clsname.indexOf("sapMDateTime") !== -1) {
                        if (retVal === "FOOTER") {
                            return "FOOTEROK";
                        }
                        return "DateTime";
                    } else if (clsname.indexOf("sapMTimePicker") !== -1) {
                        if (retVal === "FOOTER") {
                            return "FOOTEROK";
                        }
                        return "TimePicker";
                    } else if (clsname.indexOf("sapUiCal") !== -1) {
                        if (retVal === "FOOTER") {
                            return "FOOTEROK";
                        }
                        try{
							if (temploc.getAttribute("role") !== "dialog") {
								return "";
							}
						}catch(ex){}
                        return "Cal";
                    } else {
                        return "";
                    }
                };
                that.addCalanderControl = function (element) {
                    var field = new Object();
                    if ((that.clickFioriUi5.DatetimePicker || that.clickFioriUi5.calItem || that.clickFioriUi5.TimePicker) && !that.clickFioriUi5.Footer) {
                        var footerAction;
                        if (that.clickFioriUi5.FooterDone) {
                            footerAction = that.actions.pop();
                            that.clickFioriUi5.FooterDone = false;
                        }
                        field.action = "Field";
                        field.UITECH = "04";
                        field.type = "sapMeCalendar";
                        field.id = that.clickFioriUi5.calID;
                        field.label = "Calender Date";
                        field.name = field.id;
                        that.clickFioriUi5.calID = "";
                        var messageField = "";
                        if (document.activeElement.tagName.toUpperCase() === "INPUT") {
                            field.value = document.activeElement.value;
                            field.object_repository = that.startgetObjectRepo(document.activeElement);
                        } if (that.checkIsEmpty(field.value)) {
                            try {
                                var lastAction = that.actions.length - 1;
                                if (that.actions[that.actions.length - 1].type === "sapMMessageToast") {
                                    lastAction = lastAction - 1;
                                    messageField = that.actions.pop();
                                }
                                var inpElm = document.getElementById(that.actions[lastAction].id);
                                if (that.checkIsEmpty(inpElm)) {
                                    inpElm = that.clickFioriUi5.inputHelp;
                                }
                                while ((that.getclassName(inpElm).indexOf("sapMInput") === -1 || that.checkIsEmpty(inpElm.getElementsByTagName("input")[0])) && !that.checkIsEmpty(inpElm)) {
                                    inpElm = inpElm.parentElement;
                                }
                                field.value = inpElm.getElementsByTagName("input")[0].value;
                                field.object_repository = that.startgetObjectRepo(inpElm.getElementsByTagName("input")[0]);
                            } catch (ex) {

                            }

                        }
                        var calValueFormat = function (date) {
                            date = date.trim();
                            var retDate;
                            var calValues = date.split("/");
                            if (calValues.length === 1) {
                                calValues = date.split(",");
                            } else {
                                return date;
                            }
                            try {
                                var mnthValue = calValues[0].split(" ");
                                retDate = that.month[mnthValue[0].trim()];
                                retDate = retDate + "/";
                                retDate = retDate + (mnthValue[1].trim().length > 1 ? mnthValue[1].trim() : "0" + mnthValue[1].trim()) + "/";
                                retDate = retDate + calValues[1].trim();
                            } catch (ex) { retDate = date; }

                            return retDate;
                        };

                        var tablerowid = field.row_number;
                        var tablename = field.table_name;
                        //that.actions.push(field);
                        var multCalSel, dateTimepick;
                       
                        var time1, time2;
                       
                        if (that.clickFioriUi5.DatetimePicker) {
                            dateTimepick = field.value.split("at");
                            if (dateTimepick.length === 1) {
                                dateTimepick = field.value.split(",");
                                if (dateTimepick.length > 2) {
                                    dateTimepick = [];
                                    dateTimepick[0] = field.value.substr(0, field.value.lastIndexOf(","));
                                    dateTimepick[1] = field.value.substr(field.value.lastIndexOf(",") + 1);
                                }
                            }
                            time1 = Object.assign(new Object(), field);
                            time1.value = calValueFormat(dateTimepick[0]);
                            time2 = Object.assign(new Object(), field);
                            time2.value = calValueFormat(dateTimepick[dateTimepick.length - 1]);
                            time2.type = "TimePicker";
                            time2.label = "Time Picker";
                            that.addActions(time1);
                            that.addActions(time2);
                            
                        } else if (that.clickFioriUi5.calItem) {
                            multCalSel = field.value.split("-");
                            if (multCalSel.length > 1) {
                                time1 = Object.assign(new Object(), field);
                                time1.value = calValueFormat(multCalSel[0]);
                                time2 = Object.assign(new Object(), field);
                                time2.value = calValueFormat(multCalSel[multCalSel.length - 1]);
                                that.addActions(time1);
                                that.addActions(time2);
                            } else {
                            	var hyphen = String.fromCharCode(8211);
								var splitValue = field.value.split(hyphen);
								var year;
								if(splitValue.length > 1){
									var sameYearCount = field.value.split(",").length - 1;
									if(sameYearCount > 1){
										time1 = Object.assign(new Object(), field);
										time1.value = calValueFormat(multCalSel[0]);
										time2 = Object.assign(new Object(), field);
										time2.value = calValueFormat(multCalSel[multCalSel.length - 1]);
										that.addActions(time1);
										that.addActions(time2);
									} else {
										var date1 = splitValue[0].trim();
										var date2 = splitValue[1].trim();
										var year = date2.split(",")[1].trim();
										var month = date1.split(" ")[0].trim();
										date1 = date1 + "," + year;
										date2 = month + " " + date2;
										time1 = Object.assign(new Object(), field);
										time1.value = calValueFormat(multCalSel[0]);
										time2 = Object.assign(new Object(), field);
										time2.value = calValueFormat(multCalSel[multCalSel.length - 1]);
										that.addActions(time1);
										that.addActions(time2);
									}
								} else{
									field.value = calValueFormat(field.value);
									that.addActions(field);
								}
                            }
                        } else if (that.clickFioriUi5.TimePicker) {
                            field.type = "TimePicker";
                            field.label = "Time Picker";
                            that.addActions(field);
                        }    
                    }



                    if (!that.checkIsEmpty(messageField)) {
                        that.actions.push(messageField);
                    }
                    if (!that.checkIsEmpty(footerAction)) {
                        that.addActions(footerAction);
                    }


                    that.clickFioriUi5.TimePicker = false;
                    that.clickFioriUi5.DatetimePicker = false; that.clickFioriUi5.calItem = false;


                };
            that.checkDisableImport = function(field){
                var document = window.top.document;
                if (field.type==="TextView" || field.type==="TextLink" || field.type==="Label") {
                    document.getElementById("exp_imp_rb_id").disabled=true;
                    document.getElementById("start_expimp_input").disabled=true;
                    document.getElementById("exp_imp_rb_id").addEventListener("click",that.disableLabel);
                    document.getElementById("start_expimp_input").addEventListener("click",that.disableLabel);
                    document.getElementById("start_imp_rb_label").addEventListener("click",that.disableLabel);
                }
                else{
                    document.getElementById("exp_imp_rb_id").disabled=false;
                    document.getElementById("start_expimp_input").disabled=false;
                    document.getElementById("exp_imp_rb_id").removeEventListener("click",that.disableLabel);
                    document.getElementById("start_expimp_input").removeEventListener("click",that.disableLabel);
                    document.getElementById("start_imp_rb_label").removeEventListener("click",that.disableLabel);
                }
            };
            that.disableLabel=function(){
              //  preventDefault();
            };
            that.addDragDropAction = function () {
                var length = that.actions.length;
                var targerElm = that.actions[that.actions.length - 1];
                var frmElm = that.actions[that.actions.length - 2];
                if (frmElm.id === targerElm.id && frmElm.label === targerElm.label && frmElm.value === targerElm.value) {
                    that.actions.pop();
                    return;
                }
                that.actions.pop(); that.actions.pop();
                var field = new Object();
                field.action = "Field";
                field.UITECH = frmElm.UITECH;
                field.type = "DragDrop";
                field.id = "From:" + frmElm.id + "~&~" + "To:" + targerElm.id;
                field.label = "From:" + frmElm.label + "~&~" + "To:" + targerElm.label;
                field.value = "From:" + frmElm.value + "~&~" + "To:" + targerElm.value;
                field.name = "From:" + frmElm.name + "~&~" + "To:" + targerElm.name;
                field.object_repository = "From:" + frmElm.object_repository + "~&~" + "To:" + targerElm.object_repository ;
                field.changeable = "From:" + frmElm.type + "~&~" + "To:" + targerElm.type;
                
                that.actions.push(field);
            };
            that.removeSpecialCharcode = function (str) {
                if (that.checkIsEmpty(str)) {
                    return "";
                }
                for (var i = 0; i < str.length; i++) {
                	if(str.charCodeAt(i) == 160 || (str.charCodeAt(i) >= 8196 && str.charCodeAt(i) <= 8203)){
                        str = str.replace(str[i]," ");
                    }
                    if (str.charCodeAt(i) > 255 || str.charCodeAt(i) < 32) {
                        if (i === 0){
                            str = str.substr(1);
                        }
                        else{
                            str = str.substr(0, i) + str.substr(i + 1);
                        }
                    }
                }
                return str;
            };
            that.checkForHeaderColumn = function (element) {
                while (element.tagName.toUpperCase() !== "TH" && element.tagName.toUpperCase() !== "BODY") {
                    element = element.parentElement;

                }
                if (element.tagName.toUpperCase() === "TH") {
                    return false;
                }

                return true;

            };
            
            that.findTableTdInformation = function (element) {
                var tabletd = that.traverseToParentbyTagName_lsmatrixcolindex(element, "TD");
                var Td_id = "";
                if (!that.startCheckForEmptyString(tabletd)) {
                    Td_id= tabletd.id;
                }
                return Td_id;
            };


            that.traverseToParentbyTagName_lsmatrixcolindex = function (element, tagName) {
                var flag = true;
                while (flag) {
                    if (element.tagName.toUpperCase() === tagName.toUpperCase()) {
                        var lsmatrixcolindex = element.getAttribute("lsmatrixcolindex");
                        if (!that.startCheckForEmptyString(lsmatrixcolindex)) {
                            return element;
                        }
                        else {
                            element = element.parentElement;
                        }
                    }
                    if (element.tagName.toUpperCase() === "BODY") {
                        return "";
                    }
                    element = element.parentElement;
                }

            };
            that.findTableSemantic = function (tableElement) {
                var semanticObject = tableElement.getElementsByClassName("lsHdArTitle")[0];
                var semanticLabel = '';
                if (!that.startCheckForEmptyString(semanticObject)) {
                    semanticLabel = semanticObject.innerText;
                }
                else{
                	semanticObject = tableElement.getElementsByClassName("urST3Tit urST4LbTitBg")[0];
                	if (!that.startCheckForEmptyString(semanticObject)) {
                        semanticLabel = semanticObject.innerText;
                    }
                }
                	
                return semanticLabel;
            };
            that.getMainTableId = function (element) {
                var temElement = element;
                var flag=true;
                while (flag) {

                    if (temElement.tagName.toUpperCase() == "BODY") {
                        temElement = element;
                        break;
                    }
                    else if (temElement.tagName.toUpperCase() === "TABLE" && !that.startCheckForEmptyString(temElement.id)) {
                        break;
                    }
                    else if (temElement.tagName.toUpperCase() === "TABLE" && !that.startCheckForEmptyString(that.getclassName(temElement)) && that.getclassName(temElement).indexOf("urSTCS urST3WhlBrd urST3WhlNoTit urST5SelColUiMulti urHtmlTableReset") !== -1) {
						break;
					}
                    else {
                        temElement = temElement.parentElement;
                    }
                }
                return temElement.id;
            };
            that.getLsdataSid = function(OrigElement){
            	var classNameLs = "";
            	while(OrigElement.tagName.toUpperCase() !== "BODY"){
            		if(OrigElement.tagName.toUpperCase() === "TABLE"){
            			try{
            				classNameLs = OrigElement.getAttribute("class");
            			}catch(ex){
            				classNameLs = "";
            			}
            			if(!that.checkIsEmpty(classNameLs) && classNameLs.indexOf("urHtmlTableReset") !== -1){
            				if(that.checkIsEmpty(OrigElement.id)){
            					OrigElement = OrigElement.parentElement;
            				}else{
            					return;
            				}
            				while(that.checkIsEmpty(OrigElement.getAttribute("lsdata"))){
            					OrigElement = OrigElement.parentElement;
            				}
            				if(!(that.checkIsEmpty(OrigElement.getAttribute("lsdata")))){
            					var lsdata = that.getSID(OrigElement.getAttribute("lsdata"));
            					return lsdata;
            				}
            			}else{
            				OrigElement = OrigElement.parentElement;
            			}
            		}else{
            			OrigElement = OrigElement.parentElement;
            		}
            	}
            	return "";
            };

            that.clickWebGui = function (event) {
                // var Start_Message;
                var tableElemet = false;
                var ele = "", ct = "";
                var start_clickedtableRowNum = -1;
                event = event || window.event;
                var thatWin = window;
                var goto = true;
                var element, classname = "", tagName = "", tempElement;
                var field = new Object();
                var tableToggle = false;
                var tableSelectAllId = "";
                field.UITECH = "06";
                var role = "";
                var i;
                that.start_clickedtableEleId = ' ';
                that.start_tableEleTd = ' ';
                that.addvaluetoField();
                if (event.srcElement || event.target) {
                    element = event.srcElement || event.target;
                }
                else {
                    element = event.target;
                }


                tempElement = element;
                if (that.getclassName(tempElement).indexOf("Cal") !== -1 ) {
                    that.clickWebGui.caldate = true;
                    return;
                } else if (that.clickWebGui.caldate) {
                    that.clickWebGui.caldate = undefined;
                    var calObject = new Object();
                    calObject.type = "CalendarDate";
                    calObject.action = "Field";
                    calObject.UITECH = "06";
                    calObject.id = tempElement.id;
                    calObject.label = "Calender Date";
                    calObject.name = calObject.id;
                    var inputCalField;
                    tempElement = tempElement.ownerDocument.getElementById(that.actions[that.actions.length - 1].id);
                    while(tempElement.tagName.toUpperCase() !== "BODY"  && tempElement.getElementsByTagName("input").length ===0){
                        tempElement = tempElement.parentElement;
                    }
                    calObject.value = tempElement.getElementsByTagName("input").item(0).value;
                    that.actions.push(calObject);
                }
                tableElemet = that.startCheckisWebGUITableElement(tempElement);
                if (!tableElemet) {
                    goto = that.isCheckBoxWebgui(tempElement, field);
                }
                if (tableElemet) {
                    tableElemet = that.checkForHeaderColumn(tempElement);
                    if (!tableElemet) {
                        tableToggle = true;
                       that.startGoToTableElementWebGUI(tempElement);
                        tableSelectAllId = that.table_element.id;
                    }
                }

                // Start_Message =
                // that.traverseToParentbyClassName(tempElement,"lsMSG");

                // CheckElementIdNotNull();
                while (tempElement.id === null || tempElement.id === undefined || tempElement.id === "") {
                    if (tempElement.tagName.toUpperCase() == "BODY") {
                        tempElement = element;
                        break;
                    }
                    else {
                        tempElement = tempElement.parentElement;
                    }

                }
                that.getFrameidfromIdWebGUI(tempElement);
                if (tableElemet) {

                    that.start_clickedtableEleId = tempElement.id;

                    that.startGetTableRowNumberWebGUI(tempElement);

                    that.start_tableEleTd = that.findTableTdInformation(tempElement);

                    start_clickedtableRowNum = that.table_rowno;
                   // that.startGoToTableElementWebGUI(tempElement);
                    tempElement = that.table_element;
                    element = tempElement;
                }
                else {
                    //                    console.log("nottableelement");
                }

                tagName = element.tagName;
                tempElement = element;
                that.frameid = that.tempFrameId;
                that.tempFrameId = "";
				var lsDataSID = "";
                while (goto) {
                    switch (tagName.toUpperCase()) {

                        case "TABLE":
                            var tableTrs = element.getElementsByTagName("tr");
                            var tableTrs1 = [];
                            var tableTds = [];
                            that.columnLabelThElements = [];
                            that.webdynpro = false;
                            var tablDetails = element;
                            field.table_name = 'to determine';
                            field.table_semantic = that.findTableSemantic(element);
                            
                            field.tabletype = 'Table';
                            var TableId = that.getMainTableId(element);
                            field.columns = [];
                            field.table_name = TableId + "##" + that.frameid;
                            if (that.checkIsEmpty(field.table_semantic)) {
                            if (!that.startCheckForEmptyString(element.ownerDocument.getElementById(field.table_name.split("##")[0]))) {
				        		element = element.ownerDocument.getElementById(field.table_name.split("##")[0]);
				    		}
                            field.table_semantic = that.getsemanticObject(element);

                            }
                            for (i = 0; i < tableTrs.length; i++) {
                                var vpm;
                                try {
                                    vpm = tableTrs[i].getAttribute("vpm");
                                }
                                catch (ex) {
                                    vpm = "";
                                }
                                if (vpm === null) {
                                    vpm = "";
                                }

                                if (vpm.toUpperCase().indexOf("MRSS-CONT") !== -1) {
                                    tableTrs1.push(tableTrs[i].getElementsByTagName("tr"));
                                    break;
                                }
                            }
                            var rr;
                            if (tableTrs1.length <= 0) {
                                that.webdynpro = true;
                                for (i = 0; i < tableTrs.length; i++) {
                                    
                                    try {
                                        role = tableTrs[i].getAttribute("role");
                                    }
                                    catch (ex) {
                                        role = "";
                                    }
                                    if (role === null) {
                                        role = "";
                                    }

                                    if (role.toUpperCase() === "ROW") {

                                        tableTrs1.push(tableTrs[i]);

                                    }
                                }
                            }
                            for (var q = 0; q < tableTrs1.length; q++) {

                                var finaltableTrs1 = tableTrs1[q];

                                if (finaltableTrs1.length === undefined) {
                                    
                                    try {
                                        rr = finaltableTrs1.getAttribute("rr");
                                    }
                                    catch (ex) {
                                        rr = "";
                                    }
                                    if (rr === null) {
                                        rr = "";
                                    }
                                    if (rr === start_clickedtableRowNum) {
                                        tableTds.push(finaltableTrs1.getElementsByTagName("td"));


                                    }

                                }
                                else {
                                    for (var k = 0; k < finaltableTrs1.length; k++) {
                                        try {
                                            rr = finaltableTrs1[k].getAttribute("rr");
                                        }
                                        catch (ex) {
                                            rr = "";
                                        }
                                        if (rr === null) {
                                            rr = "";
                                        }
                                        if (rr === start_clickedtableRowNum) {
                                            tableTds.push(finaltableTrs1[k].getElementsByTagName("td"));


                                        }
                                    }
                                }

                            }

                            for (var l = 0; l < tableTds.length; l++) {

                                var finaltabaletds = tableTds[l];
                                for (var j = 0; j < finaltabaletds.length; j++) {
                                    that.Start_table_coloumn_number = finaltabaletds[j].getAttribute("lsmatrixcolindex");
                                    if (that.Start_table_coloumn_number === null) {
                                        that.Start_table_coloumn_number = finaltabaletds[j].getAttribute("cc");
                                    }
                                    if (that.Start_table_coloumn_number === null) {
                                        continue;
                                    }
                                    that.start_coloumnAdded = false;
                                    that.start_tableTd = ' ';

                                    var column = new Object();

                                    that.start_tableTd = finaltabaletds[j].id;
                                    that.startTableWebGUI(finaltabaletds[j], element, column, field,event);


                                    if (!that.start_coloumnAdded) {
                                        if (that.webdynpro) {
                                            try {
                                                column.label = that.startGetTableElementLabelWebdynpro(that.Start_table_coloumn_number, element);
                                            } catch (ex) {

                                            }
                                            if (that.startCheckForEmptyString(column.label)) {
                                                try {
                                                    column.label = that.startGetTableElementLabelWebdynproWITHOUTCT(that.Start_table_coloumn_number, element);
                                                } catch (ex) {

                                                }
                                            }
                                            if (that.startCheckForEmptyString(column.label)) {
											    column.label = that.getWebGuiNearestHeaderForLabel(that.Start_table_coloumn_number, event);
											}
                                        }
                                        else {
                                            try{
                                                column.label = that.startGetTableElementLabelWebGUI(that.Start_table_coloumn_number, element);
                                            } catch (ex) {

                                            }
                                            
                                        }

                                       
                                        
                                        if (that.startCheckForEmptyString(column.label)) {
                                            var finalcolumnno = Number(that.Start_table_coloumn_number) + Number(1);
                                            column.label = "Column" + finalcolumnno;
                                        }

                                        if (that.startCheckForEmptyString(column.changeable)) {
                                            column.changeable = "False";
                                        }
                                        if (column.changeable === "True" && column.type === "RowSelect") {
                                            field.action = "ROW_SELECT";
                                            if (that.checkSelectionRow) {
                                                if (column.value.trim() === "") {
                                                    column.value = "X";
                                                }
                                                else {
                                                    column.value = "";
                                                }
                                            }
                                            else {
                                                column.value = "X";
                                            }
                                        }
                                        if (column.changeable === "True" && (column.type === "CheckBox" || column.type.toUpperCase() === "INPUTFIELD" || column.type.toUpperCase() === "RADIOBUTTON" || column.type.toUpperCase() === "COMBOBOX")) {
                                            field.action = "ROW_DATA";
                                        }
                                        if (column.changeable === "True" && column.type === "CheckBox") {
                                            if (column.value.trim() === "") {
                                                column.value = "X";
                                            }
                                            else {
                                                column.value = "";
                                            }

                                        }
                                        var readOnlyElement = event.srcElement || event.target;
                                        if (readOnlyElement.getAttribute("readonly") === "readonly" || readOnlyElement.getAttribute("readonly") === "true" || readOnlyElement.getAttribute("disabled") === "true" || readOnlyElement.getAttribute("disabled") === "disabled") {
                                                column.object_repository = column.object_repository + ";" + "readonly: " + "true";
                                        }
                                        lsDataSID = that.getLsdataSid(event.srcElement || event.target);
                                        if(!that.checkIsEmpty(lsDataSID)){
                                        	column.object_repository = column.object_repository + ";" + "lsdata: " + lsDataSID;
                                        }
                                        if (!that.startCheckForEmptyString(column.id) && !that.startCheckForEmptyString(column.type)) {
                                            for (var colval in column) {
                                                //debugger;
                                                try { column[colval] = column[colval].trim(); } catch (ex) { }
                                            }
                                            field.columns.push(column);
                                        }


                                    }
                                }
                            }
                            that.checkAndCorrectSameColumnLabel(field, that.columnLabelThElements);
							that.columnLabelThElements = [];

                            field.row_number = start_clickedtableRowNum;
                            if (that.startCheckForEmptyString(field.action)) {
                                field.action = "ROW_CLICK";
                            }

                            that.addActions(field);
                            goto = false;

                            break;


                        case "A":
                            role = "";
                            field.id = tempElement.id;
                            field.type = "Link";
                            field.label = tempElement.getAttribute("title");
                            if (that.startCheckForEmptyString(field.label)) {
                                field.label = tempElement.innerText;
                            }
                            field.value = tempElement.innerText;
                            field.action = "Click";

                            var flag = true;
                            while (flag) {
                                try {
                                    classname = tempElement.getAttribute("class");
                                } catch (ex) {
                                    classname = "";
                                }
                                if (classname === "" || classname === undefined || classname === null) {
                                    tempElement = tempElement.parentElement;
                                }
                                else {
                                    break;
                                }
                            }
                            field.name = field.id + "##" + that.frameid;
                            field.object_repository = that.startgetObjectRepo(tempElement);

                            that.addActions(field);
                            goto = false;
                            break;
                        case "INPUT":
                        case "TEXTAREA":
                            try {
                                role = tempElement.getAttribute("ct");
                            }
                            catch (ex) {
                                role = "";
                            }
                            if (role === "I") {

                                field.type = "InputField";
                            }
                            else if (role === "CB") {

                                field.type = "ComboBox";
                            }
                            else if (role === "TE") {

                                field.type = "TextArea";
                            }

                            else {
                                field.type = "ComboBoxSearch";
                            }

                            field.id = tempElement.id;

                            field.name = field.id + "##" + that.frameid;

                            field.object_repository = that.startgetObjectRepo(tempElement);
                            if (tempElement.getAttribute("readonly") === "readonly" || tempElement.getAttribute("readonly") === "true" || tempElement.getAttribute("disabled") === "true" || tempElement.getAttribute("disabled") === "disabled") {
                                field.object_repository = field.object_repository + ";" + "readonly: " + "true";
                            }
                            field.action = "Field";
                            if (that.defineCheck || that.defineExportImport) {
                                that.getWebGuiInputValue(tempElement, field);
                            }
                            that.getWebGuiLabel(tempElement, field);
                            if (that.startCheckForEmptyString(field.label)) {
                                field.label = field.id;
                            }

                            that.addActions(field);



                            goto = false;
                            break;





                        case "BUTTON":
                            field.action = "Click";
                            field.id = tempElement.id;
                            field.type = "Button";
                            field.label = tempElement.innerText;
                            field.value = tempElement.innerText;
                            field.name = field.id + "##" + that.frameid;
                            if (field.label === null || field.label === "") {
                                field.label = tempElement.getAttribute("title");
                                field.value = field.label;
                            }

                            field.object_repository = that.startgetObjectRepo(tempElement);

                            that.addActions(field);
                            goto = false;
                            break;
                        case "IMG":
                            field.action = "Click";
                            ele = tempElement; role = "";
                            field.id = tempElement.id;

                            while (ele.tagName.toUpperCase() !== "A" && ele.tagName.toUpperCase() !== "BODY") {
                                ele = ele.parentElement;

                            }

                            if (ele.tagName.toUpperCase() === "A") {
                                field.label = ele.getAttribute("title");
                                field.value = ele.getAttribute("title");
                            } else {
                                ele = tempElement;
                            }
                            field.name = field.id + "##" + that.frameid;

                            field.object_repository = that.startgetObjectRepo(ele);
                            role = ele.getAttribute("role");
                            if(role === null){
                                role = "";
                            }
                            if (role.toUpperCase() === "BUTTON") {
                                field.type = "Button";

                            }
                            else {
                                field.type = "Image";
                            }

                            goto = false;
                            that.addActions(field);
                            break;

                        case "SPAN":
                            if (that.getclassName(tempElement).indexOf("BtnMnuIco") !== -1) {
                                tempElement = tempElement.parentElement;
                            }
                            field.id = tempElement.id;
                            field.name = field.id + "##" + that.frameid;
                            ele = tempElement;

                            while (ele.tagName.toUpperCase() !== "A" && ele.tagName.toUpperCase() !== "BODY") {
                                ele = ele.parentElement;

                            }
                            if (ele.tagName.toUpperCase() === "A") {
                                tagName = ele.tagName;
                                tempElement = ele;
                                continue;
                            } else {
                                ele = tempElement;
                            }
                            while (ele.tagName.toUpperCase() !== "INPUT" && ele.children.length > 0) {
                                ele = ele.children.item(0);
                            }
                            if (ele.tagName.toUpperCase() === "INPUT") {
                                tagName = ele.tagName;
                                tempElement = ele;
                                continue;
                            } else {
                                ele = tempElement;
                            }
                           
                            
                            if (that.startCheckForEmptyString(field.value)) {
                                field.value = tempElement.innerText;
                                 if(that.checkIsEmpty(field.value)){
                             field.value= tempElement.title;
                             }                   
                             field.label = tempElement.innerText;
                            if(that.checkIsEmpty(field.label)){ 
                            field.label= tempElement.title;
                            }   
                                
                            }
                            if (ele.tagName.toUpperCase() === "BODY") {
                                field.object_repository = that.startgetObjectRepo(tempElement);
                            }
                            else {
                                field.object_repository = that.startgetObjectRepo(ele);
                            }

                            if(!that.startCheckForEmptyString(tempElement.parentElement.getAttribute("class"))){
                                if(tempElement.parentElement.getAttribute("class").indexOf("urMnuTxt") !== -1){
                                    tagName = tempElement.parentElement.tagName;
                                    tempElement = tempElement.parentElement;
                                    continue;
                                }
                            }
                            role = ele.getAttribute("role");
                            ct = tempElement.getAttribute("ct");
                            if (that.startCheckForEmptyString(ct)) {
                                ct = "";
                            }
                            if (that.startCheckForEmptyString(role)) {
                                role = "";
                            }

                            if (role.toUpperCase() === "APPLICATION") {
                                role = tempElement.getAttribute("role");
                                if (role === null) {
                                    var eleforrole = tempElement;
                                    while (that.startCheckForEmptyString(eleforrole.getAttribute("role")) && eleforrole.tagName.toUpperCase() !== "BODY") {
                                        eleforrole = eleforrole.parentElement;

                                    }
                                    role = eleforrole.getAttribute("role");
                                }
                            }
                            if (role.toUpperCase() === "BUTTON") {
                                field.type = "Button";
                                field.action = "Click";
                            }

                            else if (role.toUpperCase() === "MENUITEM" || (that.getclassName(tempElement).indexOf("Mnu") !== -1 && that.getclassName(tempElement).indexOf("urBtnTglStdMnuSect") == -1)) {
                                field.type = "List";
                                field.action = "Field";
                            }
                            else if (role.toUpperCase() === "TAB" || !that.startCheckForEmptyString(that.traverseToParentbyClassName(tempElement, "lsTbsLabel2"))) {
                                field.type = "Tab";
                                field.action = "Click";
                            }
                            else if (that.getclassName(tempElement).indexOf("lsMessageBar") !== -1 || !that.startCheckForEmptyString(that.traverseToParentbyClassName(tempElement, "lsMSG")) || !that.startCheckForEmptyString(that.traverseToParentbyClassName(tempElement, "lsMessageBar"))) {
                                field.type = "MESSAGE";
                                field.action = "Field";
                            }
                            else if (ct === "POMNI") {
                                field.type = "List";
                                field.action = "Field";
                            }else if (that.getclassName(tempElement).indexOf("urBtnTglStdMnuSect") !== -1) {
                                    field.type = "SectButton";
                                    field.action = "Click";
                                    if (that.startCheckForEmptyString(field.label)) {
                                        if (!that.startCheckForEmptyString(tempElement.previousElementSibling) && !that.startCheckForEmptyString(tempElement.previousElementSibling.innerText)) {
                                            field.label = tempElement.previousElementSibling.innerText;
                                        } else {
                                            field.label = field.id;
                                        }
                                    }
                            }else if (that.checkIsEmpty(ct)){
                                try {
                                    if(tempElement.parentElement.className.indexOf("psboxHeader") !== -1){
                                    var test=tempElement.ownerDocument.getElementsByClassName("lsPanel__title lsGroup__title psboxHeader urGrpTtlWeb1");
                                    var step;
                                    for (step=0; step< test.length; step++)
                                    { 
                                if (field.id===test[step].getElementsByTagName("span")[0].id){
                                            field.index=step;
                                            field.object_repository = that.startgetObjectRepo(tempElement.parentElement);
                                            field.type="Label";
                                            field.action = "Click";
                                            break;
                                        }
                                    }
                                    }
                                    else {
                                        field.type = "Button";
                                        if (that.defineCheck || that.defineExportImport) {
                                            field.type = "Label";
                                        }
                                        field.action = "Click";
                                    }
                                } catch (error) {
                                    field.type = "Button";
                                    if (that.defineCheck || that.defineExportImport) {
                                        field.type = "Label";
                                    }
                                    field.action = "Click";
                                
                                }
                            } 
                            else {
                                field.type = "Button";
                                if (that.defineCheck || that.defineExportImport) {
                                    field.type = "Label";
                                }
                                field.action = "Click";
                            }


                            while(that.checkIsEmpty(field.id) && tempElement.tagName.toUpperCase() !== "BODY" ){
                                field.id = tempElement.id;
                                tempElement = tempElement.parentElement; 
                            }
                            field.name = field.id + "##" + that.frameid;
                            goto = false;
                            that.addActions(field);
                            break;

                        case "DIV":
                         

                            field.id = tempElement.id;
                            field.label = tempElement.innerText.trim();
                            field.value = tempElement.innerText.trim();
                            if (that.startCheckForEmptyString(field.label)) {
                                field.label = tempElement.title;
                            }

                            field.name = field.id + "##" + that.frameid;
                            var tempclass = "";
                            try { tempclass = tempElement.getAttribute("class"); }
                            catch (ex) { tempclass = ""; }
                            if (tempclass === null) { tempclass = ""; }

                            field.object_repository = that.startgetObjectRepo(tempElement);
                            if (tempclass.indexOf("BtnF4") !== -1) {
                                field.type = "MenuHelp";
                                field.action = "Click";
                                field.label = tempElement.getAttribute("title");
                                if (that.checkIsEmpty(field.label)) {
                                    try{
                                        if(that.actions[that.actions.length-1].type === "InputField") {
                                            field.label = that.actions[that.actions.length-1].label;
                                        }
                                    }
                                    catch(ex){}

                                }
                                if (that.startCheckForEmptyString(field.label)) {
					    			field.label = that.getNearText("", tempElement, true);
					    			if (!that.startCheckForEmptyString(field.label)) {
					        			field.label = that.removeSpecialCharcode(field.label);
					    			}
								}
                                if (that.checkIsEmpty(field.label)) {
                                    field.label = field.id;
                                }
                                
                                goto = false;
                                that.addActions(field);
                                break;
                            }
                            else if (tempclass.indexOf("BtnSearch") !== -1) {
                                field.type = "Button";
                                field.action = "Click";
                                if (that.checkIsEmpty(field.label)){
                                   field.label = field.id;
                                }

                                goto = false;
                                that.addActions(field);
                                break;
                            }
                            else if (tempclass.indexOf("BtnCoB") !== -1) {

                                var comboinput;
			                    try {
									comboinput = that.traverseToParentbyTagName(tempElement, "TD");
									comboinput = comboinput.getElementsByTagName("input")[0];
									try {
										var comboinputOriginalElement = event.srcElement || event.target;
										if (comboinput !== comboinputOriginalElement.parentElement.getElementsByTagName("input")[0]) {
											comboinput = that.traverseToParentbyTagName(tempElement, "TD");
											comboinput = comboinput.getElementsByTagName("input")[1];
										}
									} catch (ex) {}
			
									if (that.checkIsEmpty(comboinput)) {
										if(!that.checkIsEmpty(that.traverseToParentbyTagName(tempElement, "TD").previousElementSibling)){
											comboinput = that.traverseToParentbyTagName(tempElement, "TD").previousElementSibling;
										}
			
										comboinput = comboinput.getElementsByTagName("input")[0];
									}
								
			                    }catch (ex) {
                                    comboinput = "";
                                }
                                if (!that.startCheckForEmptyString(comboinput)) {
                                    tempElement = comboinput;
                                    tagName = tempElement.tagName;
                                    break;
                                }
                                else {
                                    goto = false;
                                    break;
                                }
                            } else if (tempclass.indexOf("lsMANotifierSingle") !== -1 || tempclass.indexOf("lsMAFilterButton") !== -1) {
                                field.type = "Button";
                                field.action = "Click";
                                try {
                                    field.label = tempElement.getAttribute("title");
                                }
                                catch (e) {
                                    field.label = "";
                                }
                                if (that.startCheckForEmptyString(field.label)) {
                                    field.label = field.id;
                                }

                                goto = false;
                                that.addActions(field);
                                break;
                            } else if (tempclass.indexOf("lsMSG") !== -1) {
                                field.type = "MESSAGE";
                                field.action = "Field";
                                that.addActions(field);
                                goto = false;
                                break;
                            }
                            else if (tempclass.indexOf("urTxtMono") !== -1) {
                                field.type = "List";
                                field.action = "Field";
                                field.label = field.type;
                                goto = false;
                                that.addActions(field);
                                break;
                            }
                            else if (tableToggle) {
                               if(tempclass.indexOf("urSTSelColToggle") !== -1){
                                    field.type = "SelectAll";
                                    if (tempclass.indexOf("urST4LbUnselIcon") !== -1) {
                                        field.value = "X";
                                    }
                                    else {
                                        field.value = "";
                                     }
                                }
                                else{
                                    field.type = "ColumnHeader";
                                    if(that.checkIsEmpty(field.nodeKey)){
										field.nodeKey = that.getclassName(tempElement);
									}
                                }
                                
                                field.action = "Field";
                                field.label = tempElement.getAttribute("title");
                    			if(tempElement.parentElement.className.indexOf("urSTSelColToggle") !== -1){
                                    if (tempElement.parentElement.className.indexOf("urST4LbUnselIcon") !== -1) {
                                        field.value = "X";
                                    }
                                    else {
                                        field.value = "";
                                    }
        							
        							if (that.startCheckForEmptyString(field.label)) {
        							field.label = tempElement.parentElement.title;
        							}
        						}
                                field.name = tableSelectAllId + "##" + that.frameid;
                                goto = false;
                                that.addActions(field);
                                break;
                            } else if (tempclass.indexOf("urBtnTglStdMnuSect") !== -1) {
                                    field.type = "SectButton";
                                    field.action = "Click";
                                    if (that.startCheckForEmptyString(field.label)) {
                                        if (!that.startCheckForEmptyString(tempElement.previousElementSibling) && !that.startCheckForEmptyString(tempElement.previousElementSibling.innerText)) {
                                            field.label = tempElement.previousElementSibling.innerText;
                                        } else {
                                            field.label = field.id;
                                        }
                                    }
                                    goto = false;
                                    that.addActions(field);
                                    break;
                            } else if (tempElement.getAttribute("role").toUpperCase() === "TAB" || !that.startCheckForEmptyString(that.traverseToParentbyClassName(tempElement, "lsTbsLabel2"))) {
								field.type = "Tab";
								field.action = "Click";
								goto = false;
								that.addActions(field);
								break;
							}else if(tempElement.getAttribute("ct") === "LIB_I" && that.getClassName(tempElement).indexOf("lsListbox") !== -1){
								field.id = tempElement.id;
								field.type = "List";
								field.label = tempElement.innerText;
								field.action = "Field";
								field.value = tempElement.innerText;
								field.name = field.id + "##" + that.frameid;
								field.object_repository = that.startgetObjectRepo(tempElement);
								if (that.actions.length > 0 && that.actions[that.actions.length - 1].type === "ComboBox") {
									that.actions[that.actions.length - 1].value = field.value;
								} else {
								try{
									lsDataSID = that.getSID(tempElement.getAttribute("lsdata"));
								}catch(ex){
									lsDataSID = "";
								}
								that.addActions(field);
								}
							goto = false;
							break;
							}
                            else {
                            	 if(tempclass.indexOf("scrollcontainer") !== -1 || tempclass.indexOf("urScrl urBorderBox") !== -1 ){
                                     goto = false;
                                     return;
                                 }
                                field.type = "Button";
                                /*
                                if (that.defineCheck || that.defineExportImport) {
                                    field.type = "Label";
                                }
                                commenting out this change as label is not coming correctly for check/export on button
                                */
                                field.action = "Click";
                                that.addActions(field);
                               

                            }
                            goto = false;
                            break;
                        case "LABEL":
                            if (that.defineCheck || that.defineExportImport) {
                                field.id = tempElement.id;
                                field.type = "Label";
                                field.label = tempElement.innerText;
                                field.action = "Field";
                                field.value = tempElement.innerText;
                                field.name = field.id + "##" + that.frameid;
                                field.object_repository = that.startgetObjectRepo(tempElement);

                                that.addActions(field);
                            }

                            goto = false;
                            break;

                        case "TD":
                            
                            try {
                                ct = tempElement.getAttribute("ct");
                                if (that.startCheckForEmptyString(ct)) {
                                    ct = "";
                                }
                            }
                            catch (ex) {
                                ct = "";
                            }
                            if (ct === "POMNI" || that.getclassName(tempElement).indexOf("Mnu") !== -1 || that.getclassName(tempElement).indexOf("ls") !== -1 || that.getclassName(tempElement).indexOf("list") !== -1) {
                                field.id = tempElement.id;
                                field.type = "List";
                                field.label = tempElement.innerText;
                                field.action = "Field";
                                field.value = tempElement.innerText;
                                field.name = field.id + "##" + that.frameid;
                                field.object_repository = that.startgetObjectRepo(tempElement);
                                if (that.getclassName(tempElement).indexOf("lsItemlist") !== -1 && that.actions.length > 0 && that.actions[that.actions.length - 1].type === "ComboBox") {
                                    that.actions[that.actions.length - 1].value = field.value;
                                } else {
                                	try{
										lsDataSID = that.getSID(that.traverseToParentbyTagName(element, "TR").getAttribute("lsdata"));
									}catch(ex){
										lsDataSID = "";
									}
                                    that.addActions(field);
                                }
                               
                                goto = false;
                                break;
                            }
                            else {
                                goto = false;
                                break;
                            }


                        case "SVG":
                            while ((tempElement.tagName.toUpperCase() !== "A") && (tempElement.tagName.toUpperCase() !== "BUTTON") && (tempElement.tagName.toUpperCase() !== "DIV") && (tempElement.tagName.toUpperCase() !== "BODY")) {
                                tempElement = tempElement.parentElement;
                            }
                            if (tempElement.tagName.toUpperCase() !== "BODY") {
                                tagName = tempElement.tagName.toUpperCase();
                                continue;
                            }
                            goto = false;
                            break;
                        default:
                            goto = false;
                            break;



                    }
                }
                field.object_repository = field.object_repository + ";" + "MouseEvent: " + (event.which === 3 ? "RightClick" : event.which === 1 ? "LeftClick" : "") +";" +"FrameHierarchy: " + that.frameHierarchy(window.top, element.ownerDocument.defaultView, 0);
            	if (!that.startCheckForEmptyString(field.type) && field.type.indexOf("SectButton") !== -1 && !that.startCheckForEmptyString(tempElement) && !that.startCheckForEmptyString(tempElement.previousElementSibling)) {            
					field.object_repository = field.object_repository + ";" + "lsdata: " + that.getSID(tempElement.previousElementSibling.getAttribute("lsdata"));
				}else if(tempElement.tagName.toUpperCase()=== "TD" && that.checkIsEmpty(tempElement.getAttribute("lsdata"))){
					field.object_repository = field.object_repository + ";" + "lsdata: " + lsDataSID;
				} else {
                	field.object_repository = field.object_repository + ";" + "lsdata: " + that.getSID(element.getAttribute("lsdata"));
				}
                try{
                    field.prevText = that.getNearText(field, tempElement, true);
                    if (field.action !== "Click" && (that.checkIsEmpty(field.label) || field.id === field.label)) {
                        try {
                            field.label = field.prevText;
                        } catch (ex) { }
                    }
                    if (field.type.toUpperCase() === "MENUHELP" && (that.checkIsEmpty(field.label) || field.id === field.label)) {
						try {
							field.label = field.prevText;
						} catch (ex) { }
					}
                    var pre2 = that.getNearText(field, that.prepostElement, true);
                    field.prevText = field.prevText + "&~&" + pre2;
                    field.prevText = field.prevText.replace(/\r?\n|\r/g, "");
                    field.prevText = field.prevText.replace(/[^\x00-\x7F]/g, "");
                    field.nextText = that.getNearText(field, tempElement, false);
                    if ((!that.checkIsEmpty(field.type) || field.id === field.label) && that.checkIsEmpty(field.label)) {
                        if (field.type.toUpperCase() === "CHECKBOX" || field.type.toUpperCase() === "RADIOBUTTON") {
                            field.label = field.nextText;
                        }
                    }

                    var next2 = that.getNearText(field, that.prepostElement, false);
                    field.nextText = field.nextText + "&~&" + next2;
                    field.nextText = field.nextText.replace(/\r?\n|\r/g, "");
                    field.nextText = field.nextText.replace(/[^\x00-\x7F]/g, "");
                    field.nearBy = 'Previous: ' + field.prevText + ';Next: ' + field.nextText;
                    if (field.action.indexOf("ROW_") !== -1 && that.checkIsEmpty(field.table_semantic)) {
                        element = element.ownerDocument.getElementById(field.table_name.split("##")[0]);
                        field.table_semantic = that.getsemanticObject(element);

                    }
                } catch (ex) {

                }
                
                if (that.defineCheck && that.isAdded) {
                    if (field.type === "Label") {
                        if(!that.checkIsEmpty(field.prevText.split("&~&")[0])){
							field.label = field.prevText.split("&~&")[0];
						}
                    }
                    that.setBackIdUicheck(event);
                    thatWin.document.getElementById('STARTouterchk_id').className = "STARToutervisible";
                    that.disableHighlighter(window);
                    that.currentobject = field;
                } else if (that.defineExportImport && that.isAdded) {
                    if (field.type === "Label") {
                        field.label = field.prevText.split("&~&")[0];
                    }
                    that.setBackIdUicheck(event);
                    //that.checkDisableImport(field);
                    thatWin.document.getElementById('STARTouter_imp_exp').className = "STARToutervisible";
                    that.disableHighlighter(window);
                    that.currentobject = field;
                }

                that.isAdded = false;
};
	that.checkAndCorrectSameColumnLabel = function (field, columnLabelThElements) {
	    try {
	        if (field.columns.length > 1 && columnLabelThElements.length === field.columns.length) {
	            var columns = field.columns;
	            var changeableIndex = -1;
	            var set = new Set();
	            var flag = [];
	            flag.length = columns.length;
	            for (var i = 0; i < columns.length; i++) {
	                if (columns[i].changeable === "True") {
	                    changeableIndex = i;
	                }
	                if (!set.has(columns[i].label)) {
	                    set.add(columns[i].label);
	                } else {
	                    flag[i] = true;
	                }
	            }
	            if (flag[changeableIndex] && !that.startCheckForEmptyString(columnLabelThElements[changeableIndex])) {
	                var title = columnLabelThElements[changeableIndex].title;
	                var text = columnLabelThElements[changeableIndex].innerText;
	                if (text !== title) {
	                    text = that.removeSpecialCharcode(text);
	                    field.columns[changeableIndex].label = text;
	                }
	            }
	        }
	    } catch (ex) {
			//
	    }
	};
            that.getsemanticObject = function (element) {
                var semObject = "";
                while (that.checkIsEmpty(semObject)) {
                    try{
                        if (element.tagName.toUpperCase() === "BODY") {
                            break;
                        }
                        if (!that.checkIsEmpty(element.previousElementSibling)) {
                            element = element.previousElementSibling;
                            if (element.getAttribute("ct") === "L") {
                                semObject = element.innerText;

                            }
                            if (!that.checkIsEmpty(that.getElementByAttributeElements("ct", "L", element))) {
                                semObject = that.getElementByAttributeElements("ct", "L", element).innerText;
                            }
                            try {
				    			var roleHeadingElement = that.getElementByAttributeElements("role", "heading", element);
				        		if (!that.startCheckForEmptyString(roleHeadingElement)) {
				            		semObject = roleHeadingElement.innerText;
				        		}
				    		} catch (exc) { }
                        } else {
                            element = element.parentElement;
                        }
                    } catch (ex) {
                        break;
                    }
                    
                }
                return semObject;
            };
            that.getWebGuiNearestHeaderForLabel = function (index, event) {
	    		try {
	        		var element = event.srcElement || event.target;
	        		var trElement = that.traverseToParentbyTagName(element, "TR");
	        		trElement = trElement.previousElementSibling;
	        		var label = "";
	        		while (!that.startCheckForEmptyString(trElement)) {
	            		var thElements = trElement.getElementsByTagName("TH");
	            		if (thElements.length != 0) {
	                		label = thElements[index].innerText;
	                		break;
	            		} else {
	                		trElement = trElement.previousElementSibling;
	            		}
	        		}
	        		if (!that.startCheckForEmptyString(label)) {
	            		label = that.removeSpecialCharcode(label);
	            		label = label.trim();
	        		}
	        		return label;
	    			} catch (ex) {
	        	return "";
	    		}
			};
            that.startGetTableElementLabelWebdynproWITHOUTCT = function (index, tabEle) {

                var label = "";
                var tableTrs = tabEle.getElementsByTagName("tr");
                var tableTrs1;
                var tabledivs;
                for (var i = 0; i < tableTrs.length; i++) {
                    var roleheader;
                    try {
                        roleheader = tableTrs[i].getAttribute("rt");
                    }
                    catch (ex) {
                        roleheader = "";
                    }
                    if (roleheader === null) {
                        roleheader = "";
                    }

                    if (roleheader.toUpperCase()=== "2") {
                        tableTrs1 = tableTrs[i].getElementsByTagName("th");
                        break;
                    }
                }



                try {
                    label = tableTrs1[index].getAttribute("title").trim();
                }
                catch (e) {

                }

                if (that.startCheckForEmptyString(label)) {
                    label = tableTrs1[index].innerText;
                }



                label = that.removeSpecialCharcode(label);
                return label.trim();

            };
            
            that.startGetTableElementLabelWebdynpro = function (index, tabEle) {

                var label = "";
                var tableTrs = tabEle.getElementsByTagName("tr");
                var tableTrs1;
                var tabledivs;
                for (var i = 0; i < tableTrs.length; i++) {
                    var roleheader;
                    try {
                        roleheader = tableTrs[i].getAttribute("role");
                    }
                    catch (ex) {
                        roleheader = "";
                    }
                    if (roleheader === null) {
                        roleheader = "";
                    }
                    if (roleheader.toUpperCase().indexOf("ROWHEADER") !== -1) {
                        tableTrs1 = tableTrs[i].getElementsByTagName("th");
                        break;
                    }
                }

                try{
                	 label = tableTrs1[index].getAttribute("title").trim();
                }
                catch (e){
                	
                }
               
                if (that.startCheckForEmptyString(label)) {
                    label = tableTrs1[index].innerText;
                }
                



                label = that.removeSpecialCharcode(label);
                return label.trim();

            };
            that.startGetTableElementLabelWebGUI = function (index, tabEle) {

                var label = "";
                var tableTrs = tabEle.getElementsByTagName("tr");
                var tableTrs1;
                for (var i = 0; i < tableTrs.length; i++) {
                    try {
                        var vpm = tableTrs[i].getAttribute("vpm");
                    }
                    catch (ex) {
                        vpm = "";
                    }
                    if (vpm === null) {
                        vpm = "";
                    }
                    if (vpm.toUpperCase().indexOf("MRSS-HDR") !== -1) {
                        tableTrs1 = tableTrs[i].getElementsByTagName("th");
                        if (that.columnLabelThElements.length === 0) {
			        		that.columnLabelThElements = tableTrs1;
			    		}
                        break;
                    }
                }



                for (var j = 0; j < tableTrs1.length; j++) {
                    var lsmatrixcolindex = tableTrs1[j].getAttribute("lsmatrixcolindex");
                    if (lsmatrixcolindex === index) {
                    	 try{
                             label = tableTrs1[j].getAttribute("title").trim();
                         }catch(ex){}
                         if (that.startCheckForEmptyString(label)) {
                             label = tableTrs1[j].innerText;
                         }
                        break;
                    }
                }
                label = that.removeSpecialCharcode(label);
                return label.trim();


            };
		    that.startTableWebGUI = function (element, tableEle, column, field,event) {
				var ischeckboxintable = false;
				var childNodes = element.childNodes;
				if (childNodes.length > 0) {
					for (var j = 0; j < childNodes.length; j++) {
						that.startTableWebGUI(childNodes[j], tableEle, column, field, event);
					}
				}
		
				if (element.tagName !== undefined) {
		
					if (element.id === that.start_clickedtableEleId) {
						var checkForTitle = element;
						column.changeable = "True";
						column.id = element.id;
						column.name = element.id;
						column.object_repository = "";
						while(checkForTitle.tagName.toUpperCase() !== "BODY" && checkForTitle.tagName.toUpperCase() !== "TR" && !that.checkIsEmpty(column.value)){
							if(!that.startCheckForEmptyString(checkForTitle.innerText)){
								column.value = "";
								break;
							}else if (!that.startCheckForEmptyString(checkForTitle.getAttribute("title"))) {
		                        column.value = "";
		                        break;
		                    }
							checkForTitle = checkForTitle.parentElement;
						}
						try{
							if(element.tagName.toUpperCase() === "SVG") {
								column.value = element.getAttribute("alt").replace(/\r?\n|\r/g, " ");
							}
						} catch (exr) {}
					}
					if (element.tagName.toUpperCase() === "BUTTON") {
						column.name = element.id;
						column.id = element.id;
						column.type = "Button";
						column.value = element.parentElement.innerText.replace(/\r?\n|\r/g, " ");
						column.object_repository = that.startgetObjectRepo(element);
					}
					else if (element.tagName.toUpperCase() === "INPUT" ||(that.getclassName(element).indexOf("lsField__input") !== -1 && element.tagName.toUpperCase() === "SPAN" && that.checkIsEmpty(element.childNodes[0]))) {
						column.name = element.id;
						column.id = element.id;
						column.object_repository = that.startgetObjectRepo(element);
						if (element.getAttribute("ct") === "R") {
							column.type = "RadioButton";
						}
						else if (element.getAttribute("ct") === "C") {
							column.type = "CheckBox";
		
							try {
								var checkboxTd = that.traverseToParentbyTagName(element, "TD");
								if (!that.startCheckForEmptyString(checkboxTd)) {
		
									ischeckboxintable = true;
									var classofcheck = "";
									var objcheck;
									var elementClick;
									try {
										elementClick = checkboxTd.getElementById(that.start_clickedtableEleId);
									}
									catch (ex) {
		
									}
									try {
		
										objcheck = checkboxTd.getElementsByTagName("img")[0];
										classofcheck = objcheck.className;
									}
									catch (ex) {
										classofcheck = "";
									}
									if (!that.startCheckForEmptyString(elementClick)) {
										column.changeable = "True";
										that.start_clickedtableEleId += "XYZ";
		
									}
									if (!that.startCheckForEmptyString(classofcheck)) {
										if (classofcheck.indexOf("Off") === -1) {
											column.value = "X";
		
										}
										else {
											column.value = "";
										}
									}
		
		
								}
							}
							catch (exp) {
		
							}
						}
						else {
							column.type = "InputField";
						}
						if (ischeckboxintable === false) {
							column.value = element.value;
						}
					}
					else if (element.tagName.toUpperCase() === "LABEL") {
		
						column.type = "Label";
		
					}
					else if (element.getAttribute("class") === "urST5SCMetricInner") {
		
						column.type = "RowSelect";
						if (that.webdynpro) {
							if (that.Startwebdynprocheckforid(that.start_clickedtableEleId, element)) {
		
								column.changeable = "True";
								field.action = "ROW_SELECT";
								var checkElement = that.traverseToParentbyClassName(element, "RowSel");
								if (!that.startCheckForEmptyString(checkElement) && !that.startTableWebGUI.chk) {
									column.value = "";
									that.checkSelectionRow = true;
								}
								else if (!that.startTableWebGUI.chk) {
									column.value = "X";
								}
							}
						}
		
					}
					else if (element.getAttribute("ct") === "B") {
		
						column.type = "Button";
						try{
							column.value = element.getAttribute("title");
						}catch(ex){
							column.value = "";
						}
		
		
					} else if (that.getclassName(element).indexOf("CoB") !== -1) {
						column.type = "ComboBox";
					}
					else if(column.changeable === "True" && element.tagName.toUpperCase() === "A"){
						column.type = "TextLink";
						try{
							if (!that.startCheckForEmptyString(element.innerText)) {
								column.value = element.innerText.replace(/\r?\n|\r/g, " ");
							}
							else if (!that.startCheckForEmptyString(element.getAttribute("title"))) {
								column.value = element.getAttribute("title").replace(/\r?\n|\r/g, " ");
							}
						} catch(e){
							column.value = "";
						}
					}
					
					else {
						if (that.startCheckForEmptyString(column.type)) {
							if (element.getAttribute("role") === "link" || element.tagName.toUpperCase() === "A") {
		
								column.type = "TextLink";
							}
							else if(element.getAttribute("ct") === "CBS"){
								column.type = "InputField";
							}
							else {
		
								column.type = "TextView";
							}
						}
						try{
							if(that.startCheckForEmptyString(column.value)){
								try{
									if (!that.startCheckForEmptyString(element.innerText)) {
										column.value = element.innerText.replace(/\r?\n|\r/g, " ");
									}
									else if (!that.startCheckForEmptyString(element.getAttribute("title"))) {
										column.value = element.getAttribute("title").replace(/\r?\n|\r/g, " ");
									}
								} catch(e){
									column.value = "";
								}
							}
						} catch(ex){
		
						}
						if (that.startCheckForEmptyString(column.name)) {
		
							column.name = element.id;
						}
						var originalElement = event.srcElement || event.target;
						if (that.startCheckForEmptyString(column.value) && (element === originalElement || element === originalElement.parentElement)) {
		
							if (!that.startCheckForEmptyString(element.innerText)) {
								column.value = element.innerText.replace(/\r?\n|\r/g, " ");
							}
							else if (!that.startCheckForEmptyString(element.getAttribute("title"))) {
								column.value = element.getAttribute("title").replace(/\r?\n|\r/g, " ");
							}
		
						}
						if (that.startCheckForEmptyString(column.id)) {
		
							column.id = element.id;
						}
						if (that.startCheckForEmptyString(column.object_repository)) {
		
							column.object_repository = that.startgetObjectRepo(element);
						} if (column.type === "RowSelect") {
							if (that.getclassName(element).indexOf("RowUnSel") !== -1) {
								that.startTableWebGUI.chk = true;
								that.checkSelectionRow = true;
								column.value = "";
							} else if (that.getclassName(element).indexOf("RowSel") !== -1) {
								that.checkSelectionRow = true;
								that.startTableWebGUI.chk = true;
								column.value = "X";
							}
						}
		
					}
		
				}
		
			};
            that.keyPressFioriUi5 = function () {
                var event = event || window.event;
                var element = event.srcElement || event.target, className = "";
                var field = new Object();
                for (var obj in that.actions[that.actions.length - 1]) {
                    if (obj === "columns") {
                        field.columns = [];
                        for (var colInd = 0; colInd < that.actions[that.actions.length - 1].columns.length; colInd++) {
                            field.columns.push(Object.assign(new Object(), that.actions[that.actions.length - 1].columns[colInd]));
                        }
                    } else {
                        field[obj] = that.actions[that.actions.length - 1][obj];
                    }
                    
                }

                if (field.type.toUpperCase().indexOf("INPUTFIELD") !== -1 ||field.type.toUpperCase().indexOf("LISTINPUT") !== -1 || field.type.toUpperCase().indexOf("SEARCH") !== -1 || field.type.toUpperCase().indexOf("TEXTAREA") !== -1) {
                    that.startGetValue(element);
                    if (field.action === "ROW_DATA") {
                        if (field.columns) {
                            for (var index = 0; index < field.columns.length; index++) {
                                if (field.columns[index].changeable === "True") {
                                	field.type = "Enter";
                                    field.columns[index].type = "Enter";
                                    field.action = "ROW_CLICK";
                                }
                            }
                        }
                    } else {
                        field.action = "CLICK";
                        field.type = "Enter";
                    }

                    that.addActions(field);
                }
            };
            that.keyPressWebgui = function (event) {
            	event = event || window.event;
                var element = event.srcElement || event.target, className = "";
                that.addvaluetoField();
                var field = new Object();
                field.action = "CLICK";
                field.type = "Enter";
                field.name = field.type + "##" + that.frameid;
                field.label = field.type;
                field.UITECH = "06";
                that.addActions(field);
            };
            that.startCheckisWebGUITableElement = function (element) {
                var classname = "";
                var elementct;
                var role = "";
                var flag = true;
                var i;
                while (flag) {
                    if (element.tagName.toUpperCase() === "TABLE") {
                        try {
                            classname = element.className;
                            if (classname === null || classname === undefined) {
                                classname = "";
                            }
                        }
                        catch (ex) {
                            classname = "";
                        }

                        if (classname.indexOf("urHtmlTableReset") !== -1) {
                            var temp = that.traverseToParentbyTagName(element, "tr").getAttribute("rr");
        					if (temp === null){
        						return false;
        					}
        					else{
        						element = element.parentElement;
        					}
                        }
                        else {
                            flag = true;
                            while (flag) {
                                if (element.tagName.toUpperCase() === "BODY") {
                                    return false;
                                }
                                try {
                                    if (element.tagName.toUpperCase() == "TABLE") {
                                        try {
                                            elementct = element.getAttribute("ct");
                                            if (that.startCheckForEmptyString(elementct)) {
                                                elementct = "";
                                            }
                                        } catch (ex) {
                                            elementct = "";
                                        }
                                        if ((element.className.indexOf("urHtmlTableReset") !== -1) || (elementct.toUpperCase() === "ST")) {
                                            if ((elementct.toUpperCase() === "ML") || (elementct.toUpperCase() === "GL") || (elementct.toUpperCase() === "P")) {
                                                return false;
                                            }
                                            var tableTrs = element.getElementsByTagName("tr");
                                            for (i = 0; i < tableTrs.length; i++) {
                                                
                                                 try {
                                                    role = tableTrs[i].getAttribute("role");
                                                }
                                                catch (ex) {
                                                    role = "";
                                   	            }
                                                if (role === null) {
                                                    role = "";
                                                }

                                                if (role.toUpperCase() === "ROW") {
                                                    that.table_element = element;
                                                        return true;
                                                       
                                                }
                                            }

                                            return false;
                                        }
                                        else {
                                            element = element.parentElement;
                                        }

                                    }
                                    else {
                                        element = element.parentElement;
                                    }
                                }
                                catch (e) {
                                    element = element.parentElement;
                                }
                            }
                        }
                    }
                    else {

                        if (element.tagName.toUpperCase() === "BODY") {
                            return false;
                        }
                        else {
                            element = element.parentElement;
                        }
                    }

                }
                };
            that.startGetTableRowNumberWebGUI = function (element) {

                var rowno;

                while (element.tagName.toUpperCase() !== "TR") {
                    element = element.parentElement;
                    if (element.tagName.toUpperCase() === "BODY") {
                            return;
                    }
                }
                try {
                    rowno = element.getAttribute("rr");
                }
                catch (ex) {
                    rowno = 0;
                }
                if (rowno === null) {
                    that.startGetTableRowNumberWebGUI(element.parentElement);

                }
                else {
                    return that.table_rowno = rowno;
                }




            };
            that.startGoToTableElementWebGUI = function (element) {
            	var tempElement;
                var classname = "";
                try {
                    while (element.tagName.toUpperCase() !== "TABLE") {
                        element = element.parentElement;
                    }
                }
                catch (ex) {

                }

                try {
                    classname = element.className;
                    if (classname === null || classname === undefined) {
                        classname = "";
                    }
                }
                catch (ex) {
                    classname = "";
                }
                if (classname.indexOf("urHtmlTableReset") === -1) {
                	tempElement = that.traverseToParentbyClassName(element, "urHtmlTableReset");
                }
                if (that.checkIsEmpty(tempElement)) {
                    tempElement = element;
                    while (tempElement.getAttribute("ct") !== "ST" && tempElement.tagName.toUpperCase() !== "BODY") {
                        tempElement = tempElement.parentElement;
                    }
                    if (tempElement.getAttribute("ct") === "ST") {
                        return that.table_element = tempElement;
                    }
                } else {
                    element = tempElement;
                    classname = element.className;
                }
                if (classname.indexOf("urHtmlTableReset") !== -1) {
                    return that.table_element = element;
                }




            };
            that.getclassName = function (element) {

                try {
                    if (!that.checkIsEmpty(element.className)){
                    	if (element.className.baseVal !== null && element.className.baseVal!==undefined) {
                            return element.className.baseVal;
                        }
                    return element.className;
                    }
                    else{
                        return "";}
                } catch (ex) {
                    return "";
                }

            };
            that.startGetValue = function (element) {

                var field = that.actions[that.actions.length - 1];
                if (field === undefined || field.uicheck === "X" || !that.checkIsEmpty(field.check)) {
                    return;
                }
                var i;
                var type = field.type;
                if (field.action === "ROW_DATA") {
                    var columns = field.columns;
                    for (i = 0; i < columns.length; i++) {
                        if (columns[i].changeable === "True" && that.checkIsEmpty(columns[i].check)) {

                            type = columns[i].type;
                            try {
                                if (type === "InputField" || type === "TextArea" || type === "search" || type === "ListInput") {
                                	 var inputElement = element.ownerDocument.getElementById(field.id);
                                     if (inputElement.tagName.toUpperCase() === "INPUT" || inputElement.tagName.toUpperCase() === "TEXTAREA") {
                                    	 columns[i].value = inputElement.value;
                                    	 if (that.checkIsEmpty(columns[i].value)) {
                                             columns[i].value = that.commonKeyPress.currentValue;
                                             that.commonKeyPress.currentValue = "";
                                         }
                                    	 
                                     }
                                }else if (type.toUpperCase() === "SELECT") {
                                    var inputField = element.ownerDocument.getElementById(columns[i].id).getElementsByTagName("input")[0];
                                    if (!that.checkIsEmpty(inputField)) {
                                        columns[i].value = inputField.value;
                                    } else {
                                        columns[i].value = element.ownerDocument.getElementById(columns[i].id).innerText;
                                    }
                                }
                            } catch (ex) { }
                            break;
                        }
                    }
                } else if (field.action.toUpperCase() === "FIELD" && that.checkIsEmpty(field.check)) {
                    try {
                        if (type.indexOf("InputField") !== -1 || type.indexOf("TextArea") !== -1 || type === "search" || type === "ListInput") {
                            that.actions[that.actions.length - 1].value = element.ownerDocument.getElementById(that.actions[that.actions.length - 1].id).value;
                            if (that.checkIsEmpty(that.actions[that.actions.length - 1].value)) {
                                that.actions[that.actions.length - 1].value = that.commonKeyPress.currentValue;
                                that.commonKeyPress.currentValue = "";
                            }
                        } else if (type.indexOf("DateRangeSlider") !== -1) {
                            that.actions[that.actions.length - 1].value = element.ownerDocument.getElementById(that.actions[that.actions.length - 1].id).getAttribute("title");
                            that.actions[that.actions.length - 1].label = that.actions[that.actions.length - 1].value;
                        }
                        else if (type.indexOf("Mirror") !== -1) {
                            var mirrorElm = element.ownerDocument.getElementById(that.actions[that.actions.length - 1].id);
                            for (i = 0 ; i < mirrorElm.querySelectorAll("pre").length ; i++) {
                                if (mirrorElm.querySelectorAll("pre")[i].children.length>0) {
                                    mirrorElm = mirrorElm.querySelectorAll("pre")[i];
                                }
                            }
                            that.actions[that.actions.length - 1].value = mirrorElm.innerText;
                        }
                    } catch (ex) { }
                }
            };
            that.commonMouseUp = function (event) {
                if (!that.checkMouseDown) {
                    that.commonRecording(event);

                }
                that.checkMouseDown = false;
            };
            that.clickFioriGraph = function (event) {
            	event = event || window.event;
				var goto = true;
				that.clickFioriGraph.event = event;
				var element = event.srcElement || event.target, className = "", tagName = "", tempElement;
				tagName = element.tagName;
				tempElement = element;
				var document = element.ownerDocument;
				var	field = new Object();
				var flag1 = true;
				tagName = tempElement.tagName;
				var checkIsAxis;
				checkIsAxis = that.traverseToParentbyClassName(element, "v-m-xAxis");
				if (that.checkIsEmpty(checkIsAxis)) {
					checkIsAxis = that.traverseToParentbyClassName(element, "v-m-yAxis");
					if (!that.checkIsEmpty(checkIsAxis)) {
						field.nodeKey = "Y-AXIS";
					}
				} else {
					field.nodeKey = "X-AXIS";
				}

				field.action = "Field";
				if (!that.checkIsEmpty(checkIsAxis)) {
					while (that.checkIsEmpty(tempElement.id)) {
						tempElement = tempElement.parentElement;
					}
					field.id = tempElement.id;
					field.type = "Chart-Click";
					tempElement = that.traverseToParentbyTagName(element, "g");
					field.label = tempElement.textContent;
					field.value = field.label;
					if (that.defineCheck || that.defineExportImport) {
						field.type = "ChartAxis";
					if (that.getclassName(checkIsAxis).indexOf("v-m-valueAxis") !== -1) {
						if (!that.checkIsEmpty(that.traverseToParentbyClassName(tempElement, "v-m-axisTitle"))){
							field.type = "ValueAxisTitle";
						}else {
							field.type = "ChartValueAxis";
						}
					} else if (that.getclassName(checkIsAxis).indexOf("v-m-categoryAxis") !== -1 && !that.checkIsEmpty(that.traverseToParentbyClassName(tempElement, "v-m-axisTitle"))) {
						field.type = "CategoryAxisTitle";
					}
					field.nodeKey = that.getclassName(tempElement);
					if (tempElement.getElementsByClassName("v-axis-label-wrapper").length > 0 && field.type === "ChartAxis") {
						field.nodeKey = "v-axis-label-wrapper";
					}
				}
			} else if(!that.startCheckForEmptyString(tempElement.getAttribute("class")) && tempElement.getAttribute("class").indexOf("sapTagCloudTag") !== -1){
				field.type = "CloudTag";
				field.nodeKey = tempElement.getAttribute("class");
				field.id = tempElement.parentElement.id;
				field.label = tempElement.parentElement.getAttribute("data-saphpatagcloudtaginternalid");
				field.value = tempElement.textContent;
				field.object_repository = that.startgetObjectRepo(tempElement);
				field.action = "Field";
				field.UITECH = "04";
				field.object_repository = field.object_repository + ";" + "MouseEvent: " + (event.which === 3 ? "RightClick" : event.which === 1 ? "LeftClick" : "") + ";" + "FrameHierarchy: " + that.frameHierarchy(window.top, element.ownerDocument.defaultView, 0);
				if (that.defineCheck || that.defineExportImport) {
					return;
				}
				that.addActions(field);
				return;
			} else if (!that.startCheckForEmptyString(tempElement.parentElement.parentElement.getAttribute('class')) && tempElement.parentElement.parentElement.getAttribute('class').indexOf('sapGalileiSymbolNode') !== -1) {
		    	field.type = "GalileiSymbolNode";
		    	tempElement = tempElement.parentElement.parentElement;
		    	field.nodeKey = tempElement.getAttribute("class");
		    	field.id = tempElement.id;
		    	if (!that.startCheckForEmptyString(tempElement.children.item(0)) && !that.startCheckForEmptyString(tempElement.children.item(0))) {
		        	field.label = tempElement.children.item(0).textContent;
		    	} else {
		        	field.label = tempElement.textContent;
		    	}
		    	if (!that.startCheckForEmptyString(field.label)) {
		        	field.label = that.removeSpecialCharcode(field.label);
		    	}
		    	field.value = field.label;
		    	field.action = "Field";
		    	field.UITECH = "04";
		    	if (that.defineCheck || that.defineExportImport) {
		        	return;
		    	}
		    	that.addActions(field);
		    	return;
			} else {
		    	field.type = "Chart";
		    	//if (element.tagName.toUpperCase() !=="G") {
		    	//    tempElement = that.traverseToParentbyTagName(element, "g");
		    	//}
		    	field.nodeKey = "ChartColor:" + tempElement.getAttribute("fill");
		    	field.id = tempElement.getAttribute("data-id");
		    	while (that.checkIsEmpty(field.id)) {
		        	tempElement = that.traverseToParentbyTagName(tempElement.parentElement, "g");
		        	if (that.startCheckForEmptyString(tempElement)) {
		            	break;
		        	}
		        	field.id = tempElement.getAttribute("data-id");
		        	try {
		            	if (that.checkIsEmpty(field.id)) {
		                	field.id = tempElement.getAttribute("legendlabel-id");
		                	field.value = tempElement.textContent;
		                	field.type = "Legend-Click";
		                	if (that.defineCheck || that.defineExportImport) {
		                    	field.type = "Legend";
		                	}
		            	}
		        	} catch (ex) { }
		    	}
		    	if (that.checkIsEmpty(field.value)) {
		        	try {
		            	tempElement = that.traverseToParentbyTagName(element, "svg");
		            	tempElement = tempElement.getElementsByClassName("v-m-main")[0];
		            	tempElement = tempElement.getElementsByClassName("v-m-categoryAxis")[0];
		            	tempElement = tempElement.getElementsByClassName("v-label-group")[0];

		            	var checkMultCharts, dataid, length;
		            	length = tempElement.children.length;
		            	dataid = field.id;
		            	if (Number(dataid) > length) {
		                	dataid = Number(dataid) % length;
		            	}
		            	checkMultCharts = that.getElementByAttributeElements("categorylabel-id", dataid, tempElement);
		            	field.value = checkMultCharts.textContent;
		        	} catch (ex) {
		            	if (that.checkIsEmpty(tempElement)) {
		                	try {
		                    	tempElement = element;
		                    	tempElement = that.traverseToParentbyClassName(tempElement, "v-m-root");
		                    	tempElement = tempElement.getElementsByClassName("v-m-legendGroup")[0];
		                    	tempElement = tempElement.getElementsByClassName("v-groups v-label viz-legend-valueLabel")[0];
		                    	tempElement = tempElement.children.item(0);
		                    	while (field.id !== tempElement.getAttribute("legendlabel-id")) {
		                        	tempElement = tempElement.nextElementSibling;
		                    	}
		                    	field.value = tempElement.textContent;
		                	} catch (ex) { }

		            	}
		        	}
		    	}
		    	field.name = "sapVizFrame";
		    	field.label = field.value;
			}
			if (that.startCheckForEmptyString(tempElement)) {
		    	tempElement = element;
			}
			field.object_repository = that.startgetObjectRepo(tempElement);
			field.name = "sapVizFrame";
			var ovpChartElement = that.traverseToParentbyTagName(tempElement,"DIV");
			while(ovpChartElement.tagName.toUpperCase() !== "BODY"){
				if(ovpChartElement.className.indexOf("ovpChartTitleVBox") !== -1){
					field.name = that.getLabelOvpCard(ovpChartElement);
					field.name = field.name.replace(/\r?\n|\r/g, " ");
					break;
				}else{
					ovpChartElement = ovpChartElement.parentElement;
				}
			}
			field.UITECH = "04";
			that.addActions(field);
			if (that.defineCheck && that.isAdded) {
				that.setBackIdUicheck(event);
				document.getElementById('STARTouterchk_id').className = "STARToutervisible";
				that.disableHighlighter(window);
				that.currentobject = field;
			} else if (that.defineExportImport && that.isAdded) {
				that.setBackIdUicheck(event);
				that.checkDisableImport(field);
				document.getElementById('STARTouter_imp_exp').className = "STARToutervisible";
				that.disableHighlighter(window);
				that.currentobject = field;
				}
            };
            that.checkisFioriUi5 = function (element) {
                var className = that.getclassName(element);
                try{
                    while (element.tagName.toUpperCase() !== "BODY") {
                        className = that.getclassName(element);
                        if (className.indexOf("sapM") !== -1 || className.indexOf("sapU") !== -1) {
                            return true;
                        }
                        element = element.parentElement;
                    }
                } catch (ex) {
                    return false;
                }
                return false;
            };
            that.commonRecording = function (event) {
            	that.prevEvent = event;
                if (event.type === "mousedown") {
                    that.checkMouseDown = true;
                }else if (event.type === "focusin") {
                    if (that.getclassName(window.top.document.getElementById("STARTouter_imp_exp")) === "STARToutervisible" || that.getclassName(window.top.document.getElementById("STARTouterchk_id")) === "STARToutervisible") {
                        return;
                    }
                }
                var elementClassname = "";
                event = event || window.event;
                var element = event.srcElement || event.target, className = "";
                while (element.className === "" || element.className === null) {
                    element = element.parentElement;
                }
                elementClassname = element.getAttribute("class");
                try {
                    if(element.tagName=="rect"||element.tagName=="g" || element.tagName == "path" || element.tagName == "text" || element.tagName === "tspan"){
                    	if (event.type === "focusin") {
                            return;
                        }
                        
                       that.clickFioriGraph(event);
                    }
                   else if (elementClassname.indexOf("START") !== -1 || (event.altKey && (event.shiftKey || event.ctrlKey ))) {
                	   if (event.type === "focusin") {
                           return;
                       }
                       that.exportCheck(event);
                   } else if (elementClassname.indexOf("sapM") !== -1 || elementClassname.indexOf("sapU") !== -1 || that.commonRecording.isByd || elementClassname.indexOf("CodeMirror") !== -1) {
                	   if (event.type === "focusin") {
                           return;
                       }
                	   that.clickFioriUi5(event);
                   } else {
                       if (that.getclassName(element.parentElement).indexOf("sapM") !== -1 || that.getclassName(element.parentElement).indexOf("sapU") !== -1) {
                           if (event.type === "focusin") {
                               return;
                           }
                          
                               that.clickFioriUi5(event);
                           
                       } else {
                           var chekUiTechForWebGui = that.getUiTechForWGWD(window.top);
                           var semanticObject;
                           // try{
                           //     uitech = chekUiTechForWebGui.split("&~&")[0];
                           // }catch(ex){}

                           try {
                               semanticObject = chekUiTechForWebGui.split("&~&")[0];
                           } catch (ex) { }
                           if (semanticObject === "HTMLGUI" || semanticObject === "WEBDYNPRO" || window.document.querySelectorAll("[ct=PAGE]").length > 0 || that.checkWD(window.top) == true) {
                               var targetE;
                               var curEl;

                               try {
                                   targetE = that.hoverEvent.srcElement || that.hoverEvent.target;
                                   curEl = event.srcElement || event.target;
                               } catch (ex) { curEl = event.srcElement || event.target; }
                               if (targetE === curEl) {
                                   that.clickWebGui(event);
                               } else {
                                   that.clickWebGui(that.hoverEvent);
                               }
                               
                           } else {
                                   if (event.type === "focusin") {
                                       return;
                                   }
                                  
                                   that.clickFioriUi5(event);
                               
                           }

                       }
                   }
               } catch (ex) {
            	   that.mouseupFioriUi5.dragdropelm = undefined;
                   that.mouseupFioriUi5.dragdrop = undefined;
                    //                    console.log(ex.message);
                }
                if (!that.defineCheck && !that.defineExportImport && !that.clickFioriUi5.FooterDone) {
                    that.addActionsLive();
                }
                //                console.log(that.actions);
                return true;

            };
            that.commonKeyUp = function (event) {
                if (!that.checkKeydown) {
                    that.commonKeyPress(event);
                }
                that.checkKeydown = false;
            };
            that.commonKeyPress = function (event) {
            	that.checkKeydown = true;
            	 var prevEventType = that.prevEvent.type;
            	that.prevEvent = event;
                event = event || window.event;
                var element = event.srcElement || event.target, className = "";
                while (element.className === "" || element.className === null) {
                    element = element.parentElement;
                }
                var elementClassname = element.getAttribute("class");
                if (elementClassname.toUpperCase().indexOf("START")===-1 &&(that.prevEvent.srcElement || that.prevEvent.srcElement) === (element) && element.tagName.toUpperCase() === "INPUT" && event.keyCode !== 13) {
                    that.commonKeyPress.currentValue = element.value + String.fromCharCode(event.keyCode);
                }
                //try {
                try {
                    if (event.keyCode === 13) {
                        if (elementClassname.indexOf("sapM") !== -1 || elementClassname.indexOf("sapU") !== -1) {
                        	if ((event.type !== "keydown" || prevEventType !== "keydown")) {
                        		that.prevEvent = event;
                                that.keyPressFioriUi5(event);
                            }
                        } else {
                        	if (event.altKey || (event.shiftKey || event.ctrlKey)) {
                                return;
                            }
                        	that.prevEvent = event;
                            that.keyPressWebgui(event);
                        }
                    } else if (event.keyCode === 35) {
                        that.keyPressWebgui(event);
                    } else if (event.altKey && (event.shiftKey || event.ctrlKey)) {
                        that.commonRecording(event);
                    }
                } catch (ex) {

                }
            };
            that.getCoordinates = function (event) {
                that.hoverEvent = event;
            };
            that.frameHierarchy = function (topWindow, contentWindow, frameNo) {
                if (topWindow.document === contentWindow.document) {
                    return "topwindow";
                }
                var retFarameId = "";
                if (topWindow.frames.length > 0) {
                    for (var i = 0; i < topWindow.frames.length; i++) {
                        retFarameId = that.frameHierarchy(topWindow.frames[i].window, contentWindow, i);
                        if (retFarameId == "topwindow") {
                            retFarameId = "frame" + i + "-" + "id:" + topWindow.frames[i].frameElement.id;
                            break;
                        } else if (!that.checkIsEmpty(retFarameId)) {
                            retFarameId = "frame" + i + "-" + "id:" + topWindow.frames[i] .frameElement.id+ "-->" + retFarameId;
                            break;
                        }
                    }
                }
                return retFarameId;
            };
            that.addEventsToFrames = function (window) {
            	try{
            		  window.document.addEventListener("mousedown", that.commonRecording);
                      window.document.addEventListener("mouseup", that.commonMouseUp);
                      window.document.addEventListener("keypress", that.commonKeyPress,true);
                      window.document.addEventListener("keydown", that.commonKeyPress,true);
                      window.document.addEventListener("keyup", that.commonKeyUp,true);
                      window.document.addEventListener("focusin", that.commonRecording);
                      window.document.addEventListener("mouseover", that.getCoordinates);
                      that.checkToastMessages(window);
            	}catch(ex){
            		
            	}
              
                if (window.frames.length > 0) {
                    for (var i = 0; i < window.frames.length; i++) {
                        that.addEventsToFrames(window.frames[i].window);
                    }
                } else {
                    return;
                }
            };
            that.removeEventsForFrames = function (window) {
            	try{
            		 window.document.removeEventListener("mousedown", that.commonRecording);
                     window.document.removeEventListener("keypress", that.commonKeyPress);
                     window.document.removeEventListener("mouseup", that.commonMouseUp);
                     window.document.removeEventListener("keydown", that.commonKeyPress);
                     window.document.removeEventListener("keyup", that.commonKeyUp);
                     window.document.removeEventListener("focusin", that.commonRecording);
                     window.document.removeEventListener("mouseover", that.getCoordinates);
            	}catch(ex){
            		
            	}
               


                if (window.frames.length > 0) {
                    for (var i = 0; i < window.frames.length; i++) {
                        that.removeEventsForFrames(window.frames[i].window);
                    }
                } else {
                    return;
                }
            };
            that.removeEvents = function (window) {
                clearInterval(that.intervalsetter);
                that.removeEventsForFrames(window);
            };
            that.addvaluetoField = function () {

                var field = that.actions[that.actions.length - 1];
                if (that.actions.length > 0) {

                    if (field.action.toUpperCase() === "ROW_DATA") {
                        var columns = field.columns;
                        var type;
                        for (var i = 0; i < columns.length; i++) {
                            if (columns[i].changeable === "True" && that.checkIsEmpty(columns[i].check)) {

                                type = columns[i].type;
                                try {
                                    if (type === "InputField" || type === "TextArea" || type === "search" || type === "ComboBox" || type === "ComboBoxSearch" || type === "TextView") {
                                        try{
                                        	that.tempvalueInput = window.frames[that.frameid].contentDocument.getElementById(columns[i].id).value;
                                        	if(that.startCheckForEmptyString(that.tempvalueInput)){
												that.getvalueforinputfromIdWebGUI(columns[i].id, window);
											}
                                        }catch(ex){
                                        	try{
                                                that.tempvalueInput = window.top.frames[that.frameid].ownerDocument.activeElement.contentDocument.activeElement.value;
                                             }catch(ex){
                                                 that.getvalueforinputfromIdWebGUI(columns[i].id, window);
                                             }
                                        }
                                    	that.getvalueforinputfromIdWebGUI(columns[i].id, thatWin);
                                        columns[i].value = that.tempvalueInput;
                                    }
                                } catch (ex) { }
                                break;
                            }
                        }



                    }
                    else if (field.action.toUpperCase() === "FIELD"  && that.checkIsEmpty(field.check)) {
                        try {
                            if (that.actions[that.actions.length - 1].type === "InputField" || that.actions[that.actions.length - 1].type === "TextArea" || that.actions[that.actions.length - 1].type === "ComboBox" || that.actions[that.actions.length - 1].type === "ComboBoxSearch") {
                            	try{
                                    that.tempvalueInput = window.frames[that.frameid].contentDocument.getElementById(that.actions[that.actions.length - 1].id).value;
		                            }catch(ex){
		                            	try{
		                                    that.tempvalueInput = window.top.frames[that.frameid].ownerDocument.activeElement.contentDocument.activeElement.value;
		                                }catch(ex){
		                                    that.getvalueforinputfromIdWebGUI(that.actions[that.actions.length - 1].id, window);
		                                }
		                            }
                            	//that.getvalueforinputfromIdWebGUI(that.actions[that.actions.length - 1].id, thatWin);
                                that.actions[that.actions.length - 1].value = that.tempvalueInput;
                                that.tempvalueInput = "";
                            }
                        } catch (ex) { }
                    }
                }

            };
            that.getFrameidfromIdWebGUI = function (tempElement) {

            	 try{
                     that.tempFrameId = tempElement.ownerDocument.defaultView.frameElement.id;
                 }catch(ex){
                     that.tempFrameId = "";
                 }
                 return that.tempFrameId;



            };
            that.getElementByXpath = function (docm, path) {

                return docm.evaluate(path, docm, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

            };
            that.startgetObjectRepo = function (element) {

                var classname;
                try { classname = element.getAttribute("class"); } catch (ex) { classname = ''; }
                if (classname === null) { classname = ''; }
                return "ClassName: " + classname + ";" + "TagName: " + element.tagName;

            };
            that.startCheckForEmptyString = function (obj) {

                if (obj === "" || obj === '' || obj === " " || obj === null || obj === undefined || obj === ' '){
                    return true;
                }
                else{
                    return false;
                }


            };
            
            that.getvalueforinputfromIdWebGUI = function (id, window) {

                var element, valueforinput = "";
                if (window.frames.length > 0) {
                    for (var i = 0; i < window.frames.length; i++) {
                        try {

                            element = window.frames[i].window.document.getElementById(id);
                            if (element !== null) {
                                element = null;
                                valueforinput = window.frames[i].window.document.getElementById(id).value;
                                if (valueforinput === undefined) {
									try{
										valueforinput = window.frames[i].window.document.getElementById(id).innerText;
									}catch(ex1){
								
									}
								}	
                                if (valueforinput === undefined) {
                                    valueforinput = window.document.getElementById(id).innerText;
                                }
                                if (valueforinput === undefined) {
                                    valueforinput = window.document.getElementById(id).textContent;
                                }
                                return that.tempvalueInput = valueforinput;

                            }


                        }
                        catch (ex) {

                        }
                        that.getvalueforinputfromIdWebGUI(id, window.frames[i].window);
                    }
                }
                else {
                    element = window.document.getElementById(id);
                    if (element !== null) {
                        element = null;
                        valueforinput = window.document.getElementById(id).value;
                        if (valueforinput === undefined) {
                            valueforinput = window.document.getElementById(id).innerText;
                        }
                        if (valueforinput === undefined) {
                            valueforinput = window.document.getElementById(id).textContent;
                        }

                        return that.tempvalueInput = valueforinput;

                    } else {
        				  element = document.getElementById(id);
        				  if (element !== null) {
        					element = null;
        					valueforinput = document.getElementById(id).value;
        					if (valueforinput === undefined) {
        						valueforinput = document.getElementById(id).innerText;
        					}
        					if (valueforinput === undefined) {
        						valueforinput = document.getElementById(id).textContent;
        					}

        					return that.tempvalueInput = valueforinput;
        				  }
        			}
                }


            };
            that.removeNullUdefidnedProperties = function (index) {
                var prop;
                for (var property in that.actions[index]) {
                    prop = that.actions[index][property];
                    if (prop === null || prop === undefined) {
                        that.actions[index][property] = "";
                    }
                    else {
                        try {
                            prop = that.removeSpecialCharcode(prop);
                            that.actions[index][property] = prop;
                        } catch (ex) {

                        }

                    }
                }
            };
            that.getLabelOvpCard = function (element) {
        		
        		var ovpTitle = "OVPTitle:";
                var ovpSubtitle = "OVPSubtitle:";
                var ovpChartTitle = "OVPChartTitle:";

                var spanchildren = that.traverseToParentbyClassName(element, "sapOvpBaseCard").getElementsByTagName("span");
        			
        		if(spanchildren.length >0){
                    for(var i=0;i<spanchildren.length; i++) {
                    	if(!that.startCheckForEmptyString(spanchildren[i].getAttribute("class"))){
							if(spanchildren[i].getAttribute("class").indexOf("sapOvpCardTitle") !== -1){
								ovpTitle = ovpTitle + spanchildren[i].innerText;
							}
							else if(spanchildren[i].getAttribute("class").indexOf("sapOvpCardSubtitle") !== -1){
								ovpSubtitle = ovpSubtitle + spanchildren[i].innerText;
							}
							else if(spanchildren[i].getAttribute("class").indexOf("ovpChartTitle") !== -1){
								ovpChartTitle = ovpChartTitle + spanchildren[i].innerText;
							}
						}
        			}
        		}	
        		
        		var label = ovpTitle + "&~&" + ovpSubtitle + "&~&" + ovpChartTitle;
        		return label;
        	};
            that.addActionsLive = function () {
                if (that.addActionsLive.count === undefined) {
                    that.addActionsLive.count = 0;
                }
                if (that.isStopClick === true) {
                    var actionsArr = [];
                    for (var i = that.addActionsLive.count; i < that.actions.length; i++) {
                        actionsArr.push(that.actions[i]);
                        that.addActionsLive.count++;
                        that.removeNullUdefidnedProperties(i);
                    }
                    if (actionsArr.length > 0) {
                        thisIns.addAction(actionsArr);
                    }

                    return;

                }
                if (that.actions.length > 0) {
                    var action = that.actions[that.actions.length - 1];
                    if (action.action.toUpperCase() === "FIELD" || action.action.toUpperCase() === "ROW_DATA") {
                        if (that.actions.length - 1 > that.addActionsLive.count) {
                            var actionsArr = [];
                            for (var i = that.addActionsLive.count; i < that.actions.length - 1; i++) {
                                actionsArr.push(that.actions[i]);
                                that.removeNullUdefidnedProperties(i);
                                that.addActionsLive.count++;

                            }
                            if (actionsArr.length > 0){
                                thisIns.addAction(actionsArr);
                            }
                        }
                    } else {
                        var actionsArr = [];
                        for (var i = that.addActionsLive.count; i < that.actions.length; i++) {
                            actionsArr.push(that.actions[i]);
                            that.removeNullUdefidnedProperties(i);
                            that.addActionsLive.count++;

                        }
                        if (actionsArr.length > 0){
                            thisIns.addAction(actionsArr);
                        }

                    }
                }
            };

            that.addAssistedPanel(window);
            that.addCheckExportPopUps(window);
            that.enableDragAssistedPanel(window);
            that.timeTaken = new Date().getTime();
            that.intervalsetter = setInterval(function () { that.addEventsToFrames(window); }, 300);
        },
        addAction: function (object) {
            var oEventBus = sap.ui.getCore().getEventBus();
            oEventBus.publish("sakp.e2etest_exp.testauthoring.view.Activity", "updateRecModel", object);
        },
        addAssistedPanelAlone : function(window){
        	try{
        		this.s4start.addAssistedPanel(window);
                this.s4start.addCheckExportPopUps(window);
                this.s4start.enableDragAssistedPanel(window);
        	}catch(ex){
        		
        	}
        	
        },
        startRecording: function (window,that) {
            /*
			 * window.s4start that = this; window = window;
			 * that.addAssistedPanel(window); that.addCheckExportPopUps(window);
			 * that.enableDragAssistedPanel(window);
			 *
			 * intervalsetter=setInterval(function () {
			 * that.addEventsToFrames(window);}, 300);
			 */
        	this.resourceBundle = that.getResourceBundle();
            thatWin = window;
            thisIns = this;
            this.addGlobalVariables(window);
            this.addGlobalFunctions(window);
            this.s4start.location = that._tagName;
        }

        /*
		 * addAssistedPanel(window); addCheckExportPopUps(window);
		 * enableDragAssistedPanel(window); intervalsetter=setInterval(function () {
		 * addEventsToFrames(window);}, 300);
		 */

    };
});