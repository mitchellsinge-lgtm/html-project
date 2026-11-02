/* MIH CRM service worker — shows new-lead notifications on phones and desktops.
   Upload to the website repo root, next to MIH-CRM-Cloud.html. */
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { title: 'MIH CRM', body: e.data ? e.data.text() : '' }; }
  const title = d.title || 'New lead';
  e.waitUntil(self.registration.showNotification(title, {
    body: d.body || 'A new enquiry has come in.',
    tag: d.tag || 'mih-lead',
    icon: 'milogo.png',
    badge: 'milogo.png',
    renotify: true,
    data: { url: d.url || 'MIH-CRM-Cloud.html#leads' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || 'MIH-CRM-Cloud.html#leads', self.registration.scope).href;
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) {
      if (c.url.includes('MIH-CRM-Cloud')) { await c.focus(); try { c.navigate(url); } catch (_) {} return; }
    }
    await self.clients.openWindow(url);
  })());
});
