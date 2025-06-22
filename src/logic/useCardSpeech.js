import { useEffect, useRef } from "react";

const MURF_API_KEY = "ap2_6eadc8d1-6732-4722-9478-d671df554691"

// `audioRef` y `abortRef` persistirán entre renders
export function useCardSpeech(actualCard) {
  const audioRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!actualCard) return;

    // Cancelar la petición anterior (si la hay)
    if (abortRef.current) {
      abortRef.current.abort();
    }

    // Crear nuevo AbortController para esta nueva petición
    const controller = new AbortController();
    abortRef.current = controller;

    // Detener audio anterior
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    const data = {
      text: "¡" + actualCard.title + "!",
      voiceId: "es-MX-carlos",
    };

    fetch("https://api.murf.ai/v1/speech/generate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "api-key": MURF_API_KEY,
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta");
        return res.json();
      })
      .then((json) => {
        // Solo reproducir si esta petición no fue cancelada
        if (!controller.signal.aborted) {
          const audio = new Audio(json.audioFile);
          audio.volume = 1.0;
          audioRef.current = audio;
          audio.play().catch((err) => {
            console.error("Error al reproducir el audio:", err);
          });
        }
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Petición cancelada");
        } else {
          console.error("Error al generar voz:", error);
        }
      });

    // Cleanup al desmontar componente (no al cambiar la carta)
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [actualCard]);
}
