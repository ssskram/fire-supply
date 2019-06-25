import * as React from "react";
import HydrateStore from "../utilities/hydrateStore";
import Items from "../items";

export default function Home() {
  return (
    <div>
      <HydrateStore />
      <Items />
    </div>
  );
}
