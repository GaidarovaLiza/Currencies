import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PortfolioModalProvider } from "./context/portfolioModal.context";
import { BrowserRouter } from "react-router-dom";
import { AddToPortfolioModalProvider } from "./context/addToPortfolio.context";
import { StatsProvider } from "./context/stats.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <PortfolioModalProvider>
      <AddToPortfolioModalProvider>
        <StatsProvider>
          <App />
        </StatsProvider>
      </AddToPortfolioModalProvider>
    </PortfolioModalProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
