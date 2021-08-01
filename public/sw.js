const staticCacheName = 'site-static-v4';
const dynamicCacheName = 'site-dynamic-v4';

const assets = [
    '/manifest.json',
    '/index.html',
    '/favicon.ico',
    '/logo.png',
    '/logo.gif',
    'https://fonts.gstatic.com/s/materialicons/v94/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js',
    'https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js',
    "/images/icons/icon-384x384.png",
    "/images/icons/icon-512x512.png",
    "/images/icons/icon-152x152.png",
    "/images/icons/icon-96x96.png",
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch events
self.addEventListener('fetch', evt => {
  if(evt.request.url.indexOf('main.flixyback.repl.co') === -1 && evt.request.url.indexOf('api.themoviedb.org') === -1 && evt.request.url.indexOf('chrome-extension') === -1){

    if(evt.request.url.indexOf('css') !== -1 || evt.request.url.indexOf('js') !== -1 || evt.request.url.indexOf('png') !== -1 || evt.request.url.indexOf('jpg') !== -1){
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(evt.request.url, fetchRes.clone());
            // check cached items size
            limitCacheSize(dynamicCacheName, 15);
            return fetchRes;
          })
        });
      }).catch(() => {
          return caches.match('/fallback');
      })
    );
    }

    
  }
});



importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyB4pjqDhHMflt3GHrx0uyUDOaLQBH2mDbg",
  authDomain: "scriptsfeel.firebaseapp.com",
  projectId: "scriptsfeel",
  storageBucket: "scriptsfeel.appspot.com",
  messagingSenderId: "557610588036",
  appId: "1:557610588036:web:5975597f7a0decbf0dafd1"
};


firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/images/icons/icon-384x384.png'
  };
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});