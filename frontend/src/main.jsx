import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />

        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#18181b", // zinc-900
              color: "#ffffff",
              border: "1px solid #dc2626", // red-600
              borderRadius: "12px",
              padding: "12px 16px",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);