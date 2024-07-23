// components/DataTable.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setEntries,
  loadEntriesFromLocalStorage,
  loadIsLoadingFromLocalStorage,
  loadSelectedSymbolFromLocalStorage,
  setLoading,
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
  const isLoading = useSelector((state: RootState) => state.data.isLoading);

  useEffect(() => {
    dispatch(loadEntriesFromLocalStorage());
    dispatch(loadSelectedSymbolFromLocalStorage());
    dispatch(loadIsLoadingFromLocalStorage());
  }, [dispatch]);

  const loadData = async (isLoadingAnimation?: boolean) => {
    isLoadingAnimation && dispatch(setLoading(true));
    const data = await fetchData(selectedSymbol);
    dispatch(setEntries(data));
    isLoadingAnimation && dispatch(setLoading(false));
  };

  useEffect(() => {
    loadData(true);
    const intervalId = setInterval(loadData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId);
  }, [selectedSymbol, dispatch]);

  return (
    <div>
      <h1 className="text-sm  font-medium p-4">
        Real-Time Data for {selectedSymbol}
      </h1>

      <div className="rounded shadow-2xl p-4 ">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-t-md">
            <thead className="text-xs  uppercase  bg-orange-500 text-white rounded-t-md">
              <tr>
                <th scope="col" className="p-4">
                  Symbol
                </th>
                <th scope="col" className="p-4">
                  Current Price
                </th>
                <th scope="col" className="p-4">
                  Change
                </th>
                <th scope="col" className="p-4">
                  Percent Change
                </th>
                <th scope="col" className="p-4">
                  High
                </th>
                <th scope="col" className="p-4">
                  Low
                </th>
                <th scope="col" className="p-4">
                  Open
                </th>
                <th scope="col" className="p-4">
                  Previous Close
                </th>
                <th scope="col" className="p-4">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="p-4 text-center">
                    <div
                      role="status"
                      className=" p-4 space-y-4 border  divide-y divide-gray-200 rounded shadow animate-pulse "
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
                      </div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : entries && entries.length > 0 ? (
                entries.map((entry, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white  even:bg-gray-50  border-b "
                  >
                    <td className={"p-4"}>{entry.symbol}</td>
                    <td className={"p-4"}>{entry.data.c}</td>
                    <td className={"p-4"}>{entry.data.d}</td>
                    <td className={"p-4"}>{entry.data.dp}</td>
                    <td className={"p-4"}>{entry.data.h}</td>
                    <td className={"p-4"}>{entry.data.l}</td>
                    <td className={"p-4"}>{entry.data.o}</td>
                    <td className={"p-4"}>{entry.data.pc}</td>
                    <td className={"p-4"}>
                      {new Date(entry.data.t * 1000).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-4 text-center">
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
