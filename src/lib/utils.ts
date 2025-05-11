export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-GB");
}

export function formatDateTime(date: Date) {
  const formattedDate = new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  const cleanedDate = formattedDate.replace(/\s?(AM|PM)$/i, "").trim();

  return `${cleanedDate} UTC`;
}

export function toQueryString(params: Record<string, any>): string {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => query.append(key, v));
    } else if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  return query.toString();
}
