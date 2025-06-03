import { motion } from "motion/react";
import { ArrowUp } from "./Icons";

export function HistoryGrid({ cardsHistory, mapQuantity, handleModalEnabled }) {
  return (
    <section className="game turn">
      <div className="history-grid">
        {cardsHistory
          .slice(-mapQuantity)
          .reverse()
          ?.map((element) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, boxShadow: "10px 10px #000" }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              key={element.id}
              className="square-history"
            >
              <img src={element.image} alt={element.title} />
            </motion.div>
          ))}
      </div>
      {cardsHistory.length >= mapQuantity ? (
        <div className="cards-history">
          <button onClick={handleModalEnabled}>
            <ArrowUp />
          </button>
        </div>
      ) : null}
    </section>
  );
}
