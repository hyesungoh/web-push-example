self.addEventListener("push", (event) => {
  const data = event.data.json();

  const options = {
    body: data.message,
    icon: "/next.svg",
  };

  self.registration.showNotification(data.title, options);
});
