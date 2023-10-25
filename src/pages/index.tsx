import { useEffect, useState } from "react";

export default function Home() {
  const { hasServiceWorker, hasRegistration } = useHasSpec();

  return (
    <main>
      <h1>web push example</h1>
      <p>
        has serviceWorker : {hasServiceWorker ? "✅" : "❌"}
      </p>
      <p>
        has registration : {hasRegistration ? "✅" : "❌"}
      </p>
    </main>
  );
}

function useHasSpec() {
  const [hasServiceWorker, setHasServiceWorker] = useState(false);
  const [hasRegistration, setHasRegistration] = useState(false);

  useEffect(() => {
    setHasServiceWorker("serviceWorker" in navigator);

    async function setRegistration() {
      const registration = await navigator.serviceWorker.getRegistration();
      setHasRegistration(Boolean(registration));
    }

    setRegistration();
  }, []);

  return { hasServiceWorker, hasRegistration };
}
