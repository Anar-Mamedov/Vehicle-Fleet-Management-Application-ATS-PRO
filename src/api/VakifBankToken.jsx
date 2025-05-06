export async function getVakifbankToken() {
    const url = import.meta.env.VITE_VAKIFBANK_TOKEN_URL;
  
    const body = new URLSearchParams({
      client_id: import.meta.env.VITE_VAKIFBANK_CLIENT_ID,
      client_secret: import.meta.env.VITE_VAKIFBANK_CLIENT_SECRET,
      grant_type: import.meta.env.VITE_VAKIFBANK_GRANT_TYPE,
      scope: import.meta.env.VITE_VAKIFBANK_SCOPE,
      consentId: import.meta.env.VITE_VAKIFBANK_CONSENT_ID,
      resource: import.meta.env.VITE_VAKIFBANK_RESOURCE,
    });
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Token isteği başarısız: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Token Alındı:", data);
      return data;
    } catch (error) {
      console.error("Token alma hatası:", error);
      throw error;
    }
  }