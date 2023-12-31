import { CurrencyType } from "services/apiTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchCurrencies } from "services/utils";

type CustomHookReturnType = {
  perPage: number
  setPerPage: Dispatch<SetStateAction<number>>;
  cryptoData: CurrencyType[];
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export function useCryptoData(): CustomHookReturnType {
  const [perPage, setPerPage] = useState<number>(5);
  const [cryptoData, setCryptoData] = useState<CurrencyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCurrencies(false, perPage, (currentPage - 1) * perPage);
        setCryptoData(data);
        const calculatedTotalPages = Math.ceil(data.length);
        setTotalPages(calculatedTotalPages);
        setIsLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [currentPage]);

  return {
    perPage,
    setPerPage,
    cryptoData,
    isLoading,
    totalPages,
    currentPage,
    setCurrentPage
  };
}