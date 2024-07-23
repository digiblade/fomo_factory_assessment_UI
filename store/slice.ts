// store/slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface DataEntry {
  symbol: string;
  data: any;
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
  timestamp: Date;
}

interface DataState {
  entries: DataEntry[];
  selectedSymbol: string;
  isLoading?: boolean;
}

const initialState: DataState = {
  entries: [],
  selectedSymbol: "GOOG", // Default symbol
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setEntries(state, action: PayloadAction<DataEntry[]>) {
      state.entries = action.payload;

      localStorage.setItem("entries", JSON.stringify(action.payload));
    },
    setSelectedSymbol(state, action: PayloadAction<string>) {
      state.selectedSymbol = action.payload;
      localStorage.setItem("selectedSymbol", action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
      localStorage.setItem("isLoading", `${action.payload}`);
    },
    loadEntriesFromLocalStorage(state) {
      const savedEntries = localStorage.getItem("entries");
      if (savedEntries) {
        state.entries = JSON.parse(savedEntries);
      }
    },
    loadSelectedSymbolFromLocalStorage(state) {
      const savedSymbol = localStorage.getItem("selectedSymbol");
      if (savedSymbol) {
        state.selectedSymbol = savedSymbol;
      }
    },
    loadIsLoadingFromLocalStorage(state) {
      const isLoading = localStorage.getItem("isLoading") || "false";
      state.isLoading = Boolean(isLoading);
    },
  },
});

export const {
  setEntries,
  setSelectedSymbol,
  loadEntriesFromLocalStorage,
  loadSelectedSymbolFromLocalStorage,
  setLoading,
  loadIsLoadingFromLocalStorage,
} = dataSlice.actions;
export default dataSlice.reducer;
