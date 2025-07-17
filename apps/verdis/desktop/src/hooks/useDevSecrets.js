import { useEffect, useState } from "react";

const useDevSecrets = () => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const productionMode = process.env.NODE_ENV === "production";

  useEffect(() => {
    (async () => {
      try {
        if (!productionMode) {
          const result = await fetch("devSecrets.json");
          const cheats = await result.json();
          console.log("devSecrets.json found");
          if (cheats.cheatingUser) {
            setUser(cheats.cheatingUser);
          }
          if (cheats.cheatingPassword) {
            setPassword(cheats.cheatingPassword);
          }
        }
      } catch (e) {
        console.log("no devSecrets.json found");
      }
    })();
  }, [productionMode]);

  return { user, password };
};

export default useDevSecrets;
