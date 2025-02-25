/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { assets } from "../../assets/assets";
import { isNegative } from "../../utils/isNegative";
import { numberWithCommas } from "../../utils/numberWithCommas";

// Define styles for the PDF
const styles = StyleSheet.create({
  section: {
    fontSize: 12,
    fontWeight: "extrabold",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    border: "1px solid #EAECF0",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: 12,
  },
  section2: {
    fontSize: 12,
    marginBottom: 10,
  },
  watermark: {
    position: "absolute",
    top: "55%",
    left: "35%",
    transform: "translate(-50%, -50%) rotate(-20deg)",
    fontSize: 50,
    color: "rgba(220, 220, 220, 0.2)",
    fontWeight: "bold",
    opacity: 0.5,
  },
});

type TItem = {
  city1CurrencyCode: string;
  city2CurrencyCode: string;
  city1CurrencySymbol: string;
  city2CurrencySymbol: string;
  itemName: string;
  city1ItemPrice: number;
  city2ItemPrice: number;
  city1OtherCurrencyItemPrice: number;
  city2OtherCurrencyItemPrice: number;
  livingIndex: number;
};

type TCOLCModifiedCostDataItem = {
  category: string;
  city1TotalCostCurrencyCode: string;
  city2TotalCostCurrencyCode: string;
  city1TotalCostCurrencySymbol: string;
  city2TotalCostCurrencySymbol: string;
  city1TotalCostOtherCurrencyPrice: number;
  city2TotalCostOtherCurrencyPrice: number;
  city1TotalCost: number;
  city2TotalCost: number;
  totalLivingIndex: number;
  items: TItem[];
};

type TData = {
  city1SubTotalCost: number;
  city2SubTotalCost: number;
  selectedCityName1: string;
  selectedCityName2: string;
  COLCModifiedCostData: TCOLCModifiedCostDataItem[];
  income: number;
  subTotalIndex: number;
  base64: string;
  name: string;
  email: string;
  fromCityCurrencySymbol: string;
};

// Define a new PDF document component
export const COLCPdf = ({ data }: { data: TData }) => {
  const {
    name,
    email,
    selectedCityName1,
    selectedCityName2,
    income,
    COLCModifiedCostData,
    city1SubTotalCost,
    city2SubTotalCost,
    base64,
    fromCityCurrencySymbol,
  } = data || {};

  //Calculate subtotal
  const city1OtherCurrencySubTotalCost = COLCModifiedCostData?.reduce(
    (prev, curr) => {
      return curr.city1TotalCostOtherCurrencyPrice + prev;
    },
    0
  );

  const city2OtherCurrencySubTotalCost = COLCModifiedCostData?.reduce(
    (prev, curr) => {
      return curr.city2TotalCostOtherCurrencyPrice + prev;
    },
    0
  );

  const city2SubTotalCostCalculated = COLCModifiedCostData?.reduce(
    (prev, curr) => {
      return curr.city2TotalCost + prev;
    },
    0
  );

  const subTotalIndexCalculated =
    ((city2OtherCurrencySubTotalCost - city1SubTotalCost) / city1SubTotalCost) *
    100;

  const { city1TotalCostCurrencySymbol, city2TotalCostCurrencySymbol } =
    COLCModifiedCostData[0] || {};

  return (
    <Document>
      <Page style={{ position: "relative" }}>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          {/* Header  */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 10,
              marginBottom: 5,
            }}
          >
            <Image
              style={{ width: 80, height: 80 }}
              src={assets.dollarfarPngLogo}
            />
            {(name || email) && (
              <View>
                <Text style={{ fontWeight: "bold" }}>Created By:</Text>
                <View
                  style={{ flexDirection: "row", gap: 10, margin: "5px 0" }}
                >
                  <Text style={{ color: "#696969" }}>Name:</Text>
                  <Text>{name || "NA"}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Text style={{ color: "#696969" }}>Email:</Text>
                  <Text>{email || "NA"}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Title  */}
          <View style={styles.section}>
            <Text>Cost of Living Calculator</Text>
            <Text style={styles.title}>{fromCityCurrencySymbol}</Text>
          </View>

          {/* Card Container  */}
          <View style={styles.section2}>
            <View
              style={{
                border: "1px solid #EAECF0",
                width: "100%",
                padding: 10,
                borderRadius: 5,
                backgroundColor: "#F8F8F8",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                fontSize: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Text style={{ color: "#696969" }}>
                  City your are moving from
                </Text>
                <Text style={{ fontSize: "12px" }}>{selectedCityName1}</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Text style={{ color: "#696969" }}>City you are moving to</Text>
                <Text style={{ fontSize: "12px" }}>{selectedCityName2}</Text>
              </View>
              {income ? (
                <View
                  style={{
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  <Text style={{ color: "#696969", fontSize: "12px" }}>
                    Your Income
                  </Text>
                  <Text>
                    {fromCityCurrencySymbol}
                    {numberWithCommas(income)}
                  </Text>
                </View>
              ) : (
                ""
              )}
            </View>

            <View style={{ marginTop: "25px", marginBottom: "5px" }}>
              <Text style={{ fontWeight: "bold", fontSize: "12px" }}>
                Cost Difference
              </Text>
            </View>
            <View
              style={{
                border: "1px solid #EAECF0",
                width: "100%",
                borderRadius: 5,
                backgroundColor: "#F8F8F8",
                flexDirection: "column",
                fontSize: 10,
              }}
            >
              {/* Table Header  */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  borderBottom: "1px solid #EAECF0",
                  fontSize: "12px",
                  padding: "10px 16px",
                }}
              >
                <Text style={{ width: "170px" }}>Category</Text>
                <Text style={{ width: "120px" }}>{selectedCityName1}</Text>
                <Text style={{ width: "120px", color: "#c2410c" }}>
                  {selectedCityName2}
                </Text>
                <Text style={{ width: "80px" }}>Difference</Text>
              </View>

              {/* Table Body  */}
              {/* row-1  */}
              {COLCModifiedCostData?.map((item) => {
                const {
                  category,
                  city1TotalCost,
                  city1TotalCostOtherCurrencyPrice,
                  city1TotalCostCurrencySymbol,
                  city2TotalCostCurrencySymbol,
                  totalLivingIndex,
                } = item || {};
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #EAECF0",
                      padding: "8px 16",
                    }}
                  >
                    <View style={{ display: "flex", justifyContent: "center" }}>
                      <Text style={{ width: "170px" }}>{category}</Text>
                    </View>

                    <View>
                      <Text style={{ width: "120px", marginBottom: 8 }}>
                        {city1TotalCostCurrencySymbol}{" "}
                        {city1TotalCost?.toFixed(2)}
                      </Text>
                      <Text style={{ width: "120px", color: "#c2410c" }}>
                        ({city2TotalCostCurrencySymbol}{" "}
                        {city1TotalCostOtherCurrencyPrice?.toFixed(2)})
                      </Text>
                    </View>

                    <View>
                      <Text style={{ width: "120px", marginBottom: 8 }}>
                        {city1TotalCostCurrencySymbol}{" "}
                        {city2OtherCurrencySubTotalCost?.toFixed(2)}
                      </Text>
                      <Text style={{ width: "120px", color: "#c2410c" }}>
                        ({city2TotalCostCurrencySymbol}{" "}
                        {city2SubTotalCost?.toFixed(2)})
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ width: "80px", color: "#4CAF50" }}>
                        {isNegative(totalLivingIndex)
                          ? `${totalLivingIndex?.toFixed(2)}`
                          : `+${totalLivingIndex?.toFixed(2)}`}{" "}
                        %
                      </Text>
                    </View>
                  </View>
                );
              })}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: "8px",
                  paddingTop: "8px",
                  backgroundColor: "black",
                  color: "#fff",
                  paddingLeft: 16,
                  paddingRight: 16,
                  borderLeft: "1px solid #EAECF0",
                  borderRight: "1px solid #EAECF0",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ width: "170px" }}>Total Living Cost</Text>
                </View>
                <View>
                  <Text style={{ width: "120px", marginBottom: 8 }}>
                    {city1TotalCostCurrencySymbol}{" "}
                    {numberWithCommas(Number(city1SubTotalCost?.toFixed(2)))}
                  </Text>
                  <Text style={{ width: "120px" }}>
                    {city2TotalCostCurrencySymbol}{" "}
                    {numberWithCommas(
                      Number(city1OtherCurrencySubTotalCost?.toFixed(2))
                    )}
                  </Text>
                </View>

                <View>
                  <Text style={{ width: "120px", marginBottom: 8 }}>
                    {city1TotalCostCurrencySymbol}{" "}
                    {numberWithCommas(
                      Number(city2OtherCurrencySubTotalCost?.toFixed(2))
                    )}
                  </Text>
                  <Text style={{ width: "120px" }}>
                    {city2TotalCostCurrencySymbol}{" "}
                    {numberWithCommas(
                      Number(city2SubTotalCostCalculated?.toFixed(2))
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ width: "80px", color: "#4CAF50" }}>
                    {isNegative(subTotalIndexCalculated)
                      ? `${subTotalIndexCalculated?.toFixed(2)}`
                      : `+${subTotalIndexCalculated?.toFixed(2)}`}{" "}
                    %
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>Dollarfar.com</Text>
      </Page>

      {/* page 2  */}
      <Page style={{ position: "relative" }}>
        {/* Chart Container  */}
        <View
          style={{
            padding: 15,
            marginTop: 15,
            marginLeft: 15,
            marginRight: 15,
          }}
        >
          <Image style={{ width: "100%", height: 250 }} src={base64} />

          {/* Legends Container  */}
          <View
            style={{
              fontSize: 12,
              flexDirection: "row",
              justifyContent: "center",
              gap: 16,
              fontWeight: "extrabold",
              flexWrap: "wrap",
              marginTop: "8px",
            }}
          >
            {income ? (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    width: "20px",
                    backgroundColor: "#1E88E5",
                    borderRadius: "30px",
                    height: "6px",
                  }}
                ></Text>
                <Text>
                  Income : {fromCityCurrencySymbol} {income}
                </Text>
              </View>
            ) : (
              ""
            )}
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text
                style={{
                  width: "20px",
                  backgroundColor: "#F44336",
                  borderRadius: "30px",
                  height: "6px",
                }}
              ></Text>
              <Text>
                {selectedCityName1}({fromCityCurrencySymbol}{" "}
                {city1SubTotalCost?.toFixed(2)})
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text
                style={{
                  width: "20px",
                  backgroundColor: "#4CAF50",
                  borderRadius: "30px",
                  height: "6px",
                }}
              ></Text>
              <Text>
                {selectedCityName2}({fromCityCurrencySymbol}{" "}
                {city2SubTotalCost?.toFixed(2)})
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            fontSize: "14px",
            textAlign: "center",
            marginTop: "10px",
            padding: "0 10px",
          }}
        >
          <Text>
            Living in {selectedCityName2} is approximately{" "}
            {isNegative(subTotalIndexCalculated)
              ? `${subTotalIndexCalculated?.toFixed(2)}`
              : `+${subTotalIndexCalculated?.toFixed(2)}`}
            %{" "}
            {isNegative(subTotalIndexCalculated) ? "cheaper" : "more expensive"}{" "}
            than living in {selectedCityName1}.
          </Text>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>Dollarfar.com</Text>

        {/* Footer  */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            color: "#4D4D4D",
            fontSize: 12,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 16,
            paddingBottom: 16,
            backgroundColor: "#F6F8FC",
            position: "absolute",
            width: "100%",
            bottom: 0,
          }}
        >
          <Text>dollarfar.com</Text>
          <Text>Copyright © {new Date().getFullYear()} - Dollarfar</Text>
        </View>
      </Page>
    </Document>
  );
};
