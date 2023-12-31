import React, { useContext } from "react";
import s from "./PortfolioModelRow.module.scss";
import {
  initialCurrencyPortfolioRowState,
  PortfolioModalContext,
  PortfolioModalContextStateType
} from "../../../../context/portfolioModal.context";
import { formatNumber } from "../../../../utils/formatters";
import { Button } from "../../button/Button";


export type CurrencySummaryType = {
  id: string,
  name: string,
  symbol: string,
  priceUsd: number,
}

export type CurrencySummaryWithAmountType = CurrencySummaryType & {
  amount: number;
};

export const PortfolioModalRow = ({
                                    id,
                                    name,
                                    symbol,
                                    priceUsd,
                                    amount
                                  }: CurrencySummaryWithAmountType) => {
  // @ts-ignore
  const {
    lastAddedCurrencyToPortfolio,
    setLastAddedCurrencyToPortfolio,
    currencyPortfolioRows,
    setCurrencyPortfolioRows,
    closeModal
  } = useContext<PortfolioModalContextStateType>(PortfolioModalContext);

  const removePortfolioRow = (): void => {
    const notRemovedPortfolioRows = currencyPortfolioRows.filter((row) => row.id !== id);
    localStorage.setItem("currencyPortfolioRows", JSON.stringify(notRemovedPortfolioRows));
    if (id === lastAddedCurrencyToPortfolio.id) {
      setLastAddedCurrencyToPortfolio(initialCurrencyPortfolioRowState);
    }
    setCurrencyPortfolioRows(notRemovedPortfolioRows);
  };

  return (
    <div className={s.portfolio_modal_overlay} onClick={closeModal}>
      <div className={s.portfolio_currency_row}>
        <div className={s.portfolio_row_data}>
          <div className={s.portfolio_currency_name}> {name} ({symbol})</div>
          <div className={s.portfolio_currency_amount}>
            Amount: {formatNumber(amount)}
          </div>
          <div className={s.portfolio_currency_price}>
            ${formatNumber(priceUsd)}
          </div>
        </div>
        <div className={s.remove_button_container}>
          <Button name={"Remove"} styles={s.remove_currency_button} callback={() => removePortfolioRow()} />
        </div>
      </div>
    </div>
  );
};
