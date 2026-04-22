export type TransactionStatus = "Successful" | "Failed" | "Pending";

export interface Transaction {
  id: string;
  icon: any;
  title: string;
  amount: string;
  dateStr: string;
  timeStr: string;
  status: TransactionStatus;
  rawDate: Date;
}

const MOCK_TRANSACTIONS: Transaction[] = Array.from({ length: 50 }).map((_, i) => {
  const isToday = i < 5;
  const isYesterday = i >= 5 && i < 15;
  
  const rawDate = new Date();
  if (isYesterday) rawDate.setDate(rawDate.getDate() - 1);
  else if (!isToday) rawDate.setDate(rawDate.getDate() - Math.floor(i / 5));

  const amountInt = [7000, 22000, 7000, 5000][i % 4];
  const titleText = [
    `You bought ₦${amountInt.toLocaleString()} airtime`,
    `You bought ₦${amountInt.toLocaleString()} DSTV subscription`,
    `You bought ₦${amountInt.toLocaleString()} Kedco meter`,
    `You bought ₦${amountInt.toLocaleString()} Smile data`,
  ][i % 4];

  const iconName = [
    "call",
    "tv",
    "flash",
    "wifi"
  ][i % 4];

  const statuses: TransactionStatus[] = ["Successful", "Failed", "Pending"];
  const status = statuses[i % 3];

  return {
    id: `txn-${i}`,
    icon: iconName,
    title: titleText,
    amount: `₦${amountInt.toLocaleString()}`,
    dateStr: `${rawDate.getMonth() + 1}/${rawDate.getDate()}/${rawDate.getFullYear()}`,
    timeStr: rawDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    status,
    rawDate,
  };
});

export const fetchTransactions = async (filter: string, searchQuery: string, page: number): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = MOCK_TRANSACTIONS;
      
      if (filter && filter !== "All") {
        filtered = filtered.filter(t => t.status === filter);
      }
      
      if (searchQuery) {
        filtered = filtered.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      const pageSize = 15;
      const start = page * pageSize;
      resolve(filtered.slice(start, start + pageSize));
    }, 800);
  });
};
