export default async function getImage(oid) {
  const call = await fetch(
    "https://cartegraphapi-staging.azurewebsites.us/pghSupply/itemImage?oid=" +
      oid,
    {
      method: "get",
      headers: new Headers({
        'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API
      })
    }
  );
  const image = await call
  console.log(image)
  return null
}
