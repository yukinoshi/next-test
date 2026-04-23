import { create } from "zustand";

import { SortValue } from "../type/global";

type SortState = {
    value: SortValue
    setValue: (value: SortValue) => void
}

const useSortStore = create<SortState>((set) => ({
    value: 'latest',
    setValue: (value: SortValue) => set({ value }),
}))

export default useSortStore;