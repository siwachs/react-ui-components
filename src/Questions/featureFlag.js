// we need to implement a functionality that can be used to show different features to different users. It is commonly known as A/B testing.

const SAMPLE_FEATURES = { show_dialog_box: true, enable_new_pricing: true };

const Cache = {
  featureFlags: {},
  timestamp: null,
};
const CACHE_TTL = 100000; // 10s

// All call happen simuntanusly because they are async call so cache not work in simuntanusly calls. It can be fix with queue those fetch calls.
let fetchInstance = null;

function getAllFeatures() {
  console.log("Fetch from DB");
  return new Promise((resolve) =>
    setTimeout(() => resolve(SAMPLE_FEATURES), 100),
  );
}

function getFeatureState(featureName, defaultValue) {
  const isFeaturesCached = Object.keys(Cache.featureFlags).length;
  const isCacheValid = Date.now() - Cache.timestamp < CACHE_TTL;

  if (isFeaturesCached && isCacheValid) {
    console.log("Getting Feature", featureName, "from cache");
    let value;
    if (Object.hasOwn(Cache.featureFlags, featureName))
      value = Cache.featureFlags[featureName];

    value = defaultValue;

    return Promise.resolve(value);
  }

  // fetchInstance - null
  // fetchInstance - pending
  // when a promise in pending, reject or any state we can attach as many callback we want in it
  // In here rather than create new promises we can queue the callbacks
  // And first callback set cache value

  // Queue susequent requests
  if (fetchInstance instanceof Promise)
    return fetchInstance
      .then((features) => {
        console.log("Getting", featureName, "from Promise callback queue");
        if (Object.hasOwn(features, featureName)) return features[featureName];

        return defaultValue;
      })
      .catch(() => {
        console.error(JSON.stringify(error.message, null, 2));
        return defaultValue;
      });

  fetchInstance = getAllFeatures()
    .then((features) => {
      // After getting features from server
      Cache.featureFlags = features;
      Cache.timestamp = Date.now(); // UNIX timestamp

      // Why not use features[featureName] || defaultValue?
      // Let say feature value is false and defaultVlaue is true in this case
      // false || true -> true

      if (Object.hasOwn(features, featureName)) return features[featureName];

      return defaultValue;
    })
    .catch((error) => {
      console.error(JSON.stringify(error.message, null, 2));
      return defaultValue;
    });

  return fetchInstance;
}

getFeatureState("show_dialog_box", false).then(function (isEnabled) {
  if (isEnabled) console.log("Show dialog box is enabled");
  else console.log("Show dialog box is disabled");
});

// Test Caching
getFeatureState("show_editor", false).then(function (isEnabled) {
  if (isEnabled) console.log("Show editor is enabled");
  else console.log("Show editor is disabled");
});

setTimeout(() => {
  getFeatureState("enable_new_pricing", true).then(function (isEnabled) {
    if (isEnabled) console.log("Enable new pricing is enable");
    else console.log("Enable new pricing is disable");
  });
}, 300);
