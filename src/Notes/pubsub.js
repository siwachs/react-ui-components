const PubSub = {
  events: {},
  lastUid: 0,

  publish(event, data) {
    if (!this.events[event]) return;
    const callbacks = this.events[event];

    for (const callback of callbacks) {
      callback(data);
    }
  },

  subscribe(event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);

    // Return an unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    };
  },
};

// Example usage:

const unsubscribe = PubSub.subscribe("testEvent", function (data) {
  console.log(`Subscriber 1 received: ${data}`);
});

PubSub.subscribe("testEvent", function (data) {
  console.log(`Subscriber 2 received: ${data}`);
});

// Publishing an event
PubSub.publish("testEvent", "Test message");

// Unsubscribing
unsubscribe();

// This will not trigger Subscriber 1 anymore
PubSub.publish("testEvent", "This won't be received by Subscriber 1");
