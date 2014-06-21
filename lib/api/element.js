/*
Copyright (c) 2014, Groupon, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.

Neither the name of GROUPON nor the names of its contributors may be
used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Generated by CoffeeScript 2.0.0-beta7
void function () {
  var cache$, deprecate, getElementWithoutError, hasType, truthy, waitForElement;
  cache$ = require('assertive');
  truthy = cache$.truthy;
  hasType = cache$.hasType;
  getElementWithoutError = require('./safeElement');
  deprecate = require('./deprecate');
  waitForElement = function (driver, selector, shouldBeVisible, timeout) {
    var element, foundElement, negate, start;
    if (null == timeout)
      timeout = 3e3;
    start = Date.now();
    driver.setElementTimeout(timeout);
    foundElement = null;
    while (Date.now() - start < timeout) {
      element = getElementWithoutError(driver, selector);
      if ((null != element ? element.isVisible() : void 0) === shouldBeVisible) {
        foundElement = element;
        break;
      }
    }
    driver.setElementTimeout(0);
    if (foundElement === null) {
      negate = shouldBeVisible ? '' : 'not ';
      throw new Error('Timeout (' + timeout + 'ms) waiting for element (' + selector + ') to ' + negate + 'be visible.');
    }
    return foundElement;
  };
  module.exports = function (driver) {
    return {
      getElement: function (selector) {
        hasType('getElement(selector) - requires (String) selector', String, selector);
        return getElementWithoutError(driver, selector);
      },
      getElements: function (selector) {
        hasType('getElements(selector) - requires (String) selector', String, selector);
        return driver.getElements(selector);
      },
      waitForElement: function (selector, timeout) {
        deprecate('waitForElement', 'waitForElementVisible');
        hasType('getElements(selector) - requires (String) selector', String, selector);
        return waitForElement(driver, selector, true, timeout);
      },
      waitForElementVisible: function (selector, timeout) {
        hasType('getElements(selector) - requires (String) selector', String, selector);
        return waitForElement(driver, selector, true, timeout);
      },
      waitForElementNotVisible: function (selector, timeout) {
        hasType('getElements(selector) - requires (String) selector', String, selector);
        return waitForElement(driver, selector, false, timeout);
      },
      click: function (selector) {
        var element;
        hasType('click(selector) - requires (String) selector', String, selector);
        element = driver.getElement(selector);
        truthy('Element not found at selector: ' + selector, element);
        return element.click();
      }
    };
  };
}.call(this);