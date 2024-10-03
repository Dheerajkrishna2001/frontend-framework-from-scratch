function withOutNulls(arr) {
  // code to filter out null and undefined values from an array.
  return arr.filter((item) => item != null);
}

export default withOutNulls;
