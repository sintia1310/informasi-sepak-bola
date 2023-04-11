importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
// import {registerRoute} from 'workbox-routing';
// import {CacheFirst, StaleWhileRevalidate} from 'workbox-strategies';
// import {CacheableResponsePlugin} from 'workbox-cacheable-response';
// import {ExpirationPlugin} from 'workbox-expiration';

if (workbox)
  console.log('Workbox berhasil dimuat');
else
  console.log('Workbox gagal dimuat');


  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: 'index.html', revision: '1' },
    { url: 'detailteam.html', revision: '1' },
    { url: 'klasemen.html', revision: '1' },
    { url: 'save.html', revision: '1' },
    { url: 'navbar.html', revision: '1' },
    { url: 'css/materialize.min.css', revision: '1' },
    { url: 'js/materialize.min.js', revision: '1' },
    { url: 'js/api.js', revision: '1' },
    { url: 'js/db.js', revision: '2' },
    { url: 'js/nav.js', revision: '1' },
    { url: 'js/idb.js', revision: '1' },
    { url: 'js/js/loadServiceWorker.js', revision: '2' },
    { url: 'js/team.js', revision: '2' },
    { url: 'js/detailteam.js', revision: '2' },
    { url: 'js/klasemen.js', revision: '2' },
    { url: 'manifest.json', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },

  ], {
  ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  }),
);

// // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
// registerRoute(
//   ({url}) => url.origin === 'https://fonts.googleapis.com/icon?family=Material+Icons',
//   new StaleWhileRevalidate({
//     cacheName: 'material-icons',
//   })
// );

// // Cache the underlying font files with a cache-first strategy for 1 year.
// registerRoute(
//   ({url}) => url.origin === 'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2?ce=43710007',
//   new CacheFirst({
//     cacheName: 'material-icon',
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new ExpirationPlugin({
//         maxAgeSeconds: 60 * 60 * 24 * 365,
//         maxEntries: 30,
//       }),
//     ],
//   })
// );


 workbox.routing.registerRoute(
   new RegExp('https://fonts.googleapis.com/icon?family=Material+Icons'),
   workbox.strategies.cacheFirst({
     cacheName: 'material-icon',
     plugins: [
       new workbox.expiration.Plugin({
         maxEntries: 30,
         maxAgeSeconds: 60 * 60 * 24 * 365,
       }),
     ],
   }),
 );





workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.cacheFirst({
    cacheName: 'fotball-data-api',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);


  // notif push
  self.addEventListener('push', function (event) {
	var body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	var options = {
		body: body,
		icon: 'icon.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});