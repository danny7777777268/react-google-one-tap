import { useEffect, useRef } from "react";

export default function GoogleOneTap({
  clientId,
  authUrl,
  onSignedIn,
  headers = { "Content-Type": "application/json" },
  autoSelect = true,
  cancelOnTapOutside = false,
}) {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!clientId || !authUrl) {
      console.error("GoogleOneTap: clientId and authUrl are required");
      return;
    }

    if (initializedRef.current) return;
    initializedRef.current = true;

    // Load Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (!window.google?.accounts?.id) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          try {
            const idToken = response.credential;

            const res = await fetch(authUrl, {
              method: "POST",
              headers,
              body: JSON.stringify({ credential: idToken }),
              credentials: "include",
            });

            const data = await res.json();
            onSignedIn?.(data);
          } catch (err) {
            console.error("GoogleOneTap error:", err);
          }
        },
        auto_select: autoSelect,
        cancel_on_tap_outside: cancelOnTapOutside,
      });

      window.google.accounts.id.prompt();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
