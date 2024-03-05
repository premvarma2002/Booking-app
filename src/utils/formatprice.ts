export const formatPrice = (price: number): string => {
  const  formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedPrice.length === 5 ? `0${formattedPrice}` : formattedPrice;
};
