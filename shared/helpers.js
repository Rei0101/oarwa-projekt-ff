function formatDate(date) {
  return String(date.toISOString()).slice(0, 10);
}

export { formatDate };
