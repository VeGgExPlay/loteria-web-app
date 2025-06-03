import { useEffect } from "react";

const MURF_API_KEY = "ap2_6eadc8d1-6732-4722-9478-d671df554691"

export function useCardSpeech(actualCard){
    useEffect(() => {
        if(!actualCard) return

        const data = {
          text: "¡" + actualCard.title + "!",
          voiceId: "es-MX-carlos",
        };
        fetch("https://api.murf.ai/v1/speech/generate", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          "api-key": MURF_API_KEY
        },
        body: JSON.stringify(data),
      })
        .then(res => {
          if(!res.ok) throw new Error("Error en la respuesta");
          console.log(res.json)
          return res.json();
        })
        .then(json => {
          console.log("Audio file URL:", json.audioFile)
    
          const audio = new Audio(json.audioFile)
          audio.volume = 1.0;
    
          audio.play().catch(err => {
            console.error("Error al reproducir el audio:", err);
          });
        })
        .catch(error => {
          console.error("Error al generar voz:", error)
        })
      }, [actualCard])
}