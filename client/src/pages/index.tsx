import { useEffect, useState } from "react";

export default function Home() {
  const { hasServiceWorker, hasPushManager } = useHasSpec();
  
  return (
    <main>
      <h1>web push example</h1>
      <p>
        has service worker? : {hasServiceWorker ? "✅" : "❌"}
      </p>
      <p>
        has push manager? : {hasPushManager ? "✅" : "❌"}
      </p>
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
