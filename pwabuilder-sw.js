self.addEventListener('push', function(event) {
  console.log('Push event received');
  
  if (event.data) {
    console.log('Push event has data:', event.data.text());
    
    const data = event.data.json();
    const options = {
      body: data.message,
      icon: 'path/to/icon.png'
    };
    
    event.waitUntil(
      self.registration.showNotification('Nieuwe melding', options)
        .then(() => console.log('Notification shown'))
        .catch(error => console.error('Error showing notification:', error))
    );
  } else {
    console.log('Push event has no data');
  }
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked');
  event.notification.close();
});
