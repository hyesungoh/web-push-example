import axios from "axios";
import { useEffect, useState } from "react";

const VAPID_KEYS = {
  public: "Be5WCEbW_jQ-ekPBQMbMQKJg7r1AYiqorbnyurP4410",
  private:
    "BDQna4ewD49PA9fB1id7D5F2cxVbvgnXA_bAWdEoPHmSsKQ8mmreXdeSVO82z3awjLS-047dEPfi6OQc0zkkoUM",
} as const;

export default function Home() {
  const { hasServiceWorker, hasPushManager } = useHasSpec();

  const { sendRequest } = useSubscribe();

  return (
    <main>
      <h1>web push example</h1>
      <p>has service worker? : {hasServiceWorker ? "✅" : "❌"}</p>
      <p>has push manager? : {hasPushManager ? "✅" : "❌"}</p>

      <button onClick={sendRequest}>send request</button>
    </main>
  );
}

function useHasSpec() {
  const [hasServiceWorker, setHasServiceWorker] = useState(false);
  const [hasPushManager, setHasPushManager] = useState(false);

  useEffect(() => {
    setHasServiceWorker("serviceWorker" in navigator);
    setHasPushManager("PushManager" in window);
  }, []);

  return { hasServiceWorker, hasPushManager };
}

function useSubscribe() {
  async function getSubscription() {
    const register = await navigator.serviceWorker.register(
      "service-worker.js"
    );

    const subscription = await register.pushManager.getSubscription();
    if (subscription) return subscription;

    const { data: vapidPublicKey } = await axios.get(
      "http://localhost:3001/vapid-public-key"
    );

    const generatedSubscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey,
    });

    return generatedSubscription;
  }

  async function sendRequest() {
    const subscription = await getSubscription();

    const headers = { "Content-Type": "application/json" };
    const res = await axios.post(
      "http://localhost:3001/subscribe",
      {
        subscription,
      },
      { headers }
    );

    console.log(res.data);
  }

  return {
    sendRequest,
  };
}
