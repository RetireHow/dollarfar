import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function calculateDistanceVincentyWithDetour(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  detourFactor = 1.3
) {
  // WGS-84 ellipsoid parameters
  const a = 6378137; // semi-major axis in meters
  const f = 1 / 298.257223563; // flattening
  const b = (1 - f) * a; // semi-minor axis

  // Convert degrees to radians
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  // Difference in longitude
  const L = lon2 - lon1;

  // Reduced latitude (U)
  const U1 = Math.atan((1 - f) * Math.tan(lat1));
  const U2 = Math.atan((1 - f) * Math.tan(lat2));

  // Iterative calculation
  let lambda = L;
  const sinU1 = Math.sin(U1);
  const cosU1 = Math.cos(U1);
  const sinU2 = Math.sin(U2);
  const cosU2 = Math.cos(U2);

  let sinLambda,
    cosLambda,
    sinSigma,
    cosSigma,
    sigma,
    sinAlpha,
    cos2Alpha,
    cos2SigmaM;
  let iterations = 0;
  let lambdaPrev;

  do {
    sinLambda = Math.sin(lambda);
    cosLambda = Math.cos(lambda);
    sinSigma = Math.sqrt(
      (cosU2 * sinLambda) ** 2 +
        (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) ** 2
    );
    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
    sigma = Math.atan2(sinSigma, cosSigma);
    sinAlpha = (cosU1 * cosU2 * sinLambda) / sinSigma;
    cos2Alpha = 1 - sinAlpha ** 2;
    cos2SigmaM = cosSigma - (2 * sinU1 * sinU2) / cos2Alpha;
    const C = (f / 16) * cos2Alpha * (4 + f * (4 - 3 * cos2Alpha));
    lambdaPrev = lambda;
    lambda =
      L +
      (1 - C) *
        f *
        sinAlpha *
        (sigma +
          C *
            sinSigma *
            (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM ** 2)));
    iterations++;
  } while (Math.abs(lambda - lambdaPrev) > 1e-12 && iterations < 100);

  // Ellipsoidal distance
  const uSquared = cos2Alpha * ((a ** 2 - b ** 2) / b ** 2);
  const A =
    1 +
    (uSquared / 16384) *
      (4096 + uSquared * (-768 + uSquared * (320 - 175 * uSquared)));
  const B =
    (uSquared / 1024) *
    (256 + uSquared * (-128 + uSquared * (74 - 47 * uSquared)));
  const deltaSigma =
    B *
    sinSigma *
    (cos2SigmaM +
      (B / 4) *
        (cosSigma * (-1 + 2 * cos2SigmaM ** 2) -
          (B / 6) *
            cos2SigmaM *
            (-3 + 4 * sinSigma ** 2) *
            (-3 + 4 * cos2SigmaM ** 2)));

  const distanceMeters = b * A * (sigma - deltaSigma);

  // Convert meters to kilometers and miles
  const distanceKm = distanceMeters / 1000;
  const distanceMiles = distanceKm * 0.621371;

  // Apply detour factor for road distance
  const roadDistanceKm = distanceKm * detourFactor;
  const roadDistanceMiles = roadDistanceKm * 0.621371;

  return {
    straightLineKm: distanceKm,
    straightLineMiles: distanceMiles,
    roadDistanceKm: roadDistanceKm,
    roadDistanceMiles: roadDistanceMiles,
  };
}

export interface CloseCityDataResponse {
  message: string;
  success: boolean;
  statusCode: number;
  data: Data;
}

export interface Data {
  cities: City[];
}

export interface City {
  country: string;
  latitude: number;
  name: string;
  short_name: string;
  city_id: number;
  longitude: number;
}

export default function CloseCityList({
  selectedCity,
  selectedCountry,
}: {
  selectedCity: string;
  selectedCountry: string;
}) {
  const [closeCities, setCloseCities] = useState<CloseCityDataResponse>(
    {} as CloseCityDataResponse
  );
  const [selectedLatitude, setSelectedLatitude] = useState<number>(0);
  const [selectedLongitude, setSelectedLongitude] = useState<number>(0);

  const loadCloseCitiesData = async () => {
    try {
      const res = await fetch(
        `https://dollarfar-backend-rust.vercel.app/api/close-cities-with-prices?country=${selectedCountry}&city=${selectedCity}`
      );
      const data: CloseCityDataResponse = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      if (data?.data?.cities.length > 0) {
        setSelectedLatitude(data?.data?.cities[0]?.latitude);
        setSelectedLongitude(data?.data?.cities[0]?.longitude);
      }
      setCloseCities(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
    }
  };
  useEffect(() => {
    loadCloseCitiesData();
  }, []);

  return (
    <div className="border-[1px] bg-[#FBFBF8] border-gray-300 rounded-md p-3 flex-1">
      <div className="flex gap-1 font-semibold">
        <Icon
          className="text-gray-600"
          icon="tabler:location-filled"
          width="24"
          height="24"
        />
        <h3>Cities near {selectedCity}:</h3>
      </div>
      <table className="ml-7 space-y-[0.3rem] mt-2 text-[14px]">
        {closeCities?.data?.cities?.slice(1).map((item) => {
          const { city_id, country, short_name, latitude, longitude } =
            item || {};
          return (
            <li key={city_id} className="flex items-center gap-5">
              <Link
                to={`/cost-of-living-calculator/close-city-living-cost/${country}-${short_name}`}
                className="hover:underline"
              >
                <p>
                  Cost of Living in{" "}
                  <span className="text-blue-600">{short_name}</span>
                </p>
              </Link>
              <p>
                {calculateDistanceVincentyWithDetour(
                  selectedLatitude,
                  selectedLongitude,
                  latitude,
                  longitude
                )?.roadDistanceKm?.toFixed(2)}{" "}
                km
              </p>
            </li>
          );
        })}
      </table>
    </div>
  );
}
