export default async function getImage(oid) {
  const call = await fetch(
    "https://cartegraphapi.azurewebsites.us/pghSupply/itemImage?oid=" +
      oid,
    {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_CART_API
      })
    }
  );
  const blob = await call.blob();
  const src = URL.createObjectURL(blob);
  return src;
}
