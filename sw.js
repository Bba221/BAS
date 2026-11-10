/* Smart Life Planner — Service Worker สำหรับการแจ้งเตือนจริง */
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });

/* หน้าเว็บส่ง {title, body} มาให้แสดงเป็น system notification */
self.addEventListener('message', function(e){
  var d = e.data || {};
  self.registration.showNotification(d.title || 'Smart Life Planner', {
    body: d.body || '',
    tag: d.tag || ('slp-' + Date.now()),
    renotify: true,
    silent: false
  });
});

/* คลิกแจ้งเตือน → เปิด/โฟกัสแอป */
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(cs){
    for (var i = 0; i < cs.length; i++){
      if (cs[i].url.indexOf('index.html') > -1) return cs[i].focus();
    }
    return self.clients.openWindow('index.html');
  }));
});
