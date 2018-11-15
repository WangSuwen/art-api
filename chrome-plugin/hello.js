// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/* 'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: 'red'}, function() {
    console.log("The color is 红色的.");
  });
}); */

document.getElementById('changeColor').click = function () {
  document.getElementById('content').innerHTML = `
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
  `;
}
