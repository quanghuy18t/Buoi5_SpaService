export const formatDateTime = (data) => {
  const day = String(data.getDate()).padStart(2, '0');
  const month = String(data.getMonth() + 1).padStart(2, '0');
  const year = data.getFullYear();
  const hours = String(data.getHours()).padStart(2, '0');
  const minutes = String(data.getMinutes()).padStart(2, '0');
  const seconds = String(data.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const formatCurrencyVND = (number) => {
  return new Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'}).format(number);
}

export const formatStirng = (text, maxLength = 30) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}