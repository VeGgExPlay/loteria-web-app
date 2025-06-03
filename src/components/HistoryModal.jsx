import { AnimatePresence } from "motion/react";
import { WinnerModal } from "./WinnerModal";

export function HistoryModal({modalEnabled, cardsHistory, handleModalEnabled}) {
  return (
    <AnimatePresence>
      {modalEnabled && (
        <WinnerModal
          modalEnabled={modalEnabled}
          cardsHistory={[...cardsHistory]}
          handleModalEnabled={handleModalEnabled}
        />
      )}
    </AnimatePresence>
  );
}
