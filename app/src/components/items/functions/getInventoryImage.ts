/*
  Fetches inventory image from Cartegraph,
  creates blob url for image
  returns blob url
 */

export default async function getImage(oid: number) {
  const call = await fetch(
    "https://cartegraphapi.azurewebsites.us/pghSupply/itemImage?oid=" + oid,
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
