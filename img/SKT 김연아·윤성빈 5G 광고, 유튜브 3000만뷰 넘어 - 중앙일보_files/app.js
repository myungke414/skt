﻿'use strict';

let recreateTokenCnt = 1;
const PushPath = {
    log: utils.config('apiPath') + '/push/pwaLog',
    subscribe: utils.config('apiPath') + '/push/pwaSubscribe'
};

const vapidKey = 'BLOifezezA4UWcu0uKPFQwXoYw0gHQb-NEfduSMVFMGqbVhhhT_Q8yVQ3A9jNJRDU1KJlgmIDyvj3zjCJ7KPIJ0';
const firebaseConfig = {
    apiKey: "AIzaSyDSj_MtFSY9RGiKZ4M1ny-kAjQ5oB371x8",
    authDomain: "joongangilbomobileapp.firebaseapp.com",
    projectId: "joongangilbomobileapp",
    messagingSenderId: "1078834563251",
    appId: "1:1078834563251:web:ddc70fcae9b87aff0408c6"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.usePublicVapidKey(vapidKey);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/lib/pwa/sw.js')
      .then((registration) => {
          messaging.useServiceWorker(registration);

          messaging.onTokenRefresh(() => {
              console.log('토큰 재발급');
              getToken();
          });

          messaging.onMessage((payload) => {
              console.log('메시지', payload);
          });

          requestPermission();
      });
}

const requestPermission = () => {
    Notification.requestPermission()
      .then((permission) => {
          if (permission === 'granted') {
              console.log('푸시 허용');
              getToken();
          } else if (permission === 'denied') {
              console.log('푸시 차단');
              const currentToken = getLocalStorageItem('token');
              if (currentToken !== 'D') {
                  send('log', { allow: 'N', referrer: getReferrerDomain() || '' })
                   .then(() => { setLocalStorageItem('token', 'D'); });
              }
          } else {
              console.log('푸시 기본값');
          }
      });
};

const getToken = () => {
    if (recreateTokenCnt >= 0) {
        messaging.getToken()
         .then((currentToken) => {
             if (currentToken && !checkLocalStorageItem('token', currentToken)) {
                 send('subscribe', { devId: currentToken })
                 .then(() => { setLocalStorageItem('token', currentToken); })
                 .then(() => { send('log', { allow: 'Y', referrer: getReferrerDomain() || '' }); });
             }
         })
         .catch((err) => {
             recreateTokenCnt--;
             console.log('토큰 가져오기 실패', err);
             getToken();
         });
    }
};

const send = (service, payload) => {
    return fetch(PushPath[service], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify(payload)
    })
    .then((response) => { console.log(response); })
    .catch((err) => { console.log(err); });
};

const getReferrerDomain = () => {
    let referrer = document.referrer;
    if (referrer !== '') {
        referrer = document.referrer.split('/');
        return `${referrer[0]}//${referrer[2]}`;
    }
};

const getLocalStorageItem = (k) => localStorage.getItem(k);
const setLocalStorageItem = (k, v) => localStorage.setItem(k, v);
const checkLocalStorageItem = (k, v) => localStorage.getItem(k) === v;