export default async function getImage(oid) {
  const call = await fetch(
    "http://localhost:3000/pghSupply/itemImage?oid=" + oid,
    {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_CART_API
      })
    }
  );
  const blob = await call.blob();
  const src = URL.createObjectURL(blob);
  console.log(src);
  return src;
}
