import { useParams } from "react-router-dom";

export default function PropertyPrice() {
  const { countryCity } = useParams();
  const country = countryCity?.split("-")[0];
  const city = countryCity?.split("-")[1];
  console.log({ country, city });
  return <div>PropertyPrice</div>;
}
