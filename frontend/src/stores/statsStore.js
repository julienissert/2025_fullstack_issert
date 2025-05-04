import { create } from 'zustand';
import { fetchStats } from '../services/statsService';

const useStatsStore = create((set) => ({
  stats: null,
  fetchStatsData: async () => {
    const data = await fetchStats();
    set({ stats: data });
  },
}));

export default useStatsStore;
