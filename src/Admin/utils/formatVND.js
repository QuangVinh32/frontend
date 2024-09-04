const formatVND = (totalAmount) => {
    if (totalAmount === undefined || isNaN(totalAmount)) {
      return '0 VND';
    }
  
    // Định dạng số tiền thành chuỗi VND
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount);
  };
  
  export { formatVND };