// components/DataTable.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setEntries,
  loadEntriesFromLocalStorage,
  loadSelectedSymbolFromLocalStorage,
} from "../store/slice";
import axios from "axios";

const fetchData = async (symbol: string) => {
  const response = await axios.get(`/api/data?symbol=${symbol}`);
  return response.data;
};

const DataTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const entries = useSelector((state: RootState) => state.data.entries);
  const selectedSymbol = useSelector(
    (state: RootState) => state.data.selectedSymbol
  );

  useEffect(() => {
    dispatch(loadEntriesFromLocalStorage());
    dispatch(loadSelectedSymbolFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const data = await fetchData(selectedSymbol);
      dispatch(setEntries(data));
    }, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId);
  }, [selectedSymbol, dispatch]);

  return (
    <div>
      <h1>Real-Time Data for {selectedSymbol}</h1>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Change</th>
            <th>Percent Change</th>
            <th>High</th>
            <th>Low</th>
            <th>Open</th>
            <th>Previous Close</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.symbol}</td>
              <td>{entry.data.c}</td>
              <td>{entry.data.d}</td>
              <td>{entry.data.dp}</td>
              <td>{entry.data.h}</td>
              <td>{entry.data.l}</td>
              <td>{entry.data.o}</td>
              <td>{entry.data.pc}</td>
              <td>{new Date(entry.data.t).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
