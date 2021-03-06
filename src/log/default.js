/**
 * vConsole Default Tab
 *
 * @author WechatFE
 */

/**
 * vConsole Default Tab
 *
 * 2017.04.02 扩展
 * @author startheart (sgoddon@163.com)
 */

import $ from '../lib/query.js';
import * as tool from '../lib/tool.js';
import DidiConsoleLogTab from './log.js';
import tplTabbox from './tabbox_default.html';
import tplItemCode from './item_code.html';

class DidiConsoleDefaultTab extends DidiConsoleLogTab {

  constructor(...args) {
    super(...args);
    this.tplTabbox = tplTabbox;
    this.windowOnError = null;
  }

  onReady() {
    let that = this;
    super.onReady();

    $.bind($.one('.vc-cmd', this.$tabbox), 'submit', function(e) {
      e.preventDefault();
      let $input = $.one('.vc-cmd-input', e.target),
        cmd = $input.value;
      $input.value = '';
      if (cmd !== '') {
        that.evalCommand(cmd);
      }
    });
  }

  /**
   * replace window.console & window.onerror with didiConsole method
   * @private
   */
  mockConsole() {
    super.mockConsole();
    var that = this;
    if (tool.isFunction(window.onerror)) {
      this.windowOnError = window.onerror;
    }
    window.onerror = function(message, source, lineNo, colNo, error) {
      let msg = message;
      if (source) {
        msg += "\n" + source.replace(location.origin, '');
      }
      if (lineNo || colNo) {
        msg += ':' + lineNo + ':' + colNo;
      }
      that.printLog({logType:'error', logs:[msg], noOrigin:true});
      if (tool.isFunction(that.windowOnError)) {
        that.windowOnError.call(window, message, source, lineNo, colNo, error);
      }
    };
  }

  /**
   *
   * @private
   */
  evalCommand(cmd) {
    // print command to console
    this.printLog({
      logType: 'log',
      content: $.render(tplItemCode, {content: cmd, type: 'input'}),
      noMeta: true,
      style: ''
    });
    // eval
    try {
      let result = eval(cmd);
      // print result to console
      let $content;
      if (tool.isArray(result) || tool.isObject(result)) {
        $content = this.getFoldedLine(result);
      } else {
        if (tool.isNull(result)) {
          result = 'null';
        } else if (tool.isUndefined(result)) {
          result = 'undefined';
        } else if (tool.isFunction(result)) {
          result = 'function()'
        } else if (tool.isString(result)) {
          result = '"' + result + '"';
        }
        $content = $.render(tplItemCode, {content: result, type: 'output'});
      }
      this.printLog({
        logType: 'log',
        content: $content,
        noMeta: true,
        style: ''
      });
    } catch (e) {
      this.printLog({
        logType: 'error',
        logs: [e.message],
        noMeta: true,
        style: ''
      });
    }
  }

} // END class

export default DidiConsoleDefaultTab;
