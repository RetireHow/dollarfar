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

// Define styles for the PDF
const styles = StyleSheet.create({
  section: {
    fontSize: 14,
    fontWeight: "extrabold",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    border: "1px solid #EAECF0",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: 12,
  },
  section2: {
    fontSize: 14,
    marginBottom: 20,
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
  itemName: string;
  city1ItemPrice: number;
  city2ItemPrice: number;
  livingIndex: number;
};

type TCOLCModifiedCostDataItem = {
  category: string;
  city1TotalCost: number;
  city2TotalCost: number;
  totalLivingIndex: number;
  city1Currency: string;
  city2Currency: string;
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
  currency: string;
  currencyFullName: string;
};

// Define a new PDF document component
export const COLCPdf = ({ data }: { data: TData }) => {
  const {
    name,
    email,
    currency,
    currencyFullName,
    selectedCityName1,
    selectedCityName2,
    income,
    COLCModifiedCostData,
    city1SubTotalCost,
    city2SubTotalCost,
    subTotalIndex,
    base64,
  } = data || {};

  return (
    <Document>
      <Page style={{ position: "relative" }}>
        <View style={{ padding: 30 }}>
          {/* Header  */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 12,
              marginBottom: 20,
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
                  style={{ flexDirection: "row", gap: 40, margin: "10px 0" }}
                >
                  <Text style={{ color: "#696969" }}>Name</Text>
                  <Text>{name || "NA"}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 40 }}>
                  <Text style={{ color: "#696969" }}>Email</Text>
                  <Text>{email || "NA"}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Title  */}
          <View style={styles.section}>
            <Text>Cost of Living Calculator</Text>
            <Text style={styles.title}>
              {currency} - {currencyFullName}
            </Text>
          </View>

          {/* Card Container  */}
          <View style={styles.section2}>
            <View
              style={{
                border: "1px solid #EAECF0",
                width: "100%",
                padding: 16,
                borderRadius: 5,
                backgroundColor: "#F8F8F8",
                flexDirection: "column",
                gap: 16,
                fontSize: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>
                  City your are moving from
                </Text>
                <Text>{selectedCityName1}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>City you are moving to</Text>
                <Text>{selectedCityName2}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Your Income</Text>
                <Text>${income}</Text>
              </View>
            </View>

            <View style={{ marginTop: "25px", marginBottom: "8px" }}>
              <Text style={{ fontWeight: "bold", fontSize: "14px" }}>
                Cost Difference
              </Text>
            </View>
            <View
              style={{
                border: "1px solid #EAECF0",
                width: "100%",
                paddingTop: 16,
                borderRadius: 5,
                backgroundColor: "#F8F8F8",
                flexDirection: "column",
                fontSize: 12,
              }}
            >
              {/* Table Header  */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #EAECF0",
                  paddingBottom: "8px",
                  fontSize: "14px",
                  paddingLeft: 16,
                  paddingRight: 16,
                }}
              >
                <Text style={{ width: "170px" }}>Name</Text>
                <Text style={{ width: "120px" }}>{selectedCityName1}</Text>
                <Text style={{ width: "120px" }}>{selectedCityName2}</Text>
                <Text style={{ width: "80px" }}>Change</Text>
              </View>

              {/* Table Body  */}
              {/* row-1  */}
              {COLCModifiedCostData?.map((item) => {
                const {
                  category,
                  city1TotalCost,
                  city2TotalCost,
                  totalLivingIndex,
                } = item || {};
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #EAECF0",
                      paddingBottom: "8px",
                      paddingTop: "8px",
                      paddingLeft: 16,
                      paddingRight: 16,
                    }}
                  >
                    <Text style={{ width: "170px" }}>{category}</Text>
                    <Text style={{ width: "120px" }}>${city1TotalCost}</Text>
                    <Text style={{ width: "120px" }}>${city2TotalCost}</Text>
                    <Text style={{ width: "80px", color: "#4CAF50" }}>
                      {isNegative(totalLivingIndex)
                        ? `${totalLivingIndex}`
                        : `+${totalLivingIndex}`}{" "}
                      %
                    </Text>
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
                <Text style={{ width: "170px" }}>Total</Text>
                <Text style={{ width: "120px" }}>${city1SubTotalCost}</Text>
                <Text style={{ width: "120px" }}>${city2SubTotalCost}</Text>
                <Text style={{ width: "80px", color: "#4CAF50" }}>
                  {isNegative(subTotalIndex)
                    ? `${subTotalIndex}`
                    : `+${subTotalIndex}`}{" "}
                  %
                </Text>
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
            marginTop: 30,
            marginLeft: 30,
            marginRight: 30,
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
                Income : {currency}
                {income}
              </Text>
            </View>
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
                {selectedCityName1}(${city1SubTotalCost})
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
                {selectedCityName2}(${city2SubTotalCost})
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ fontSize: "14px", textAlign: "center", marginTop: "10px" }}
        >
          <Text>
            Living in {selectedCityName2} is approximately{" "}
            {isNegative(subTotalIndex)
              ? `${subTotalIndex}`
              : `+${subTotalIndex}`}
            % {isNegative(subTotalIndex) ? "cheaper" : "more expensive"} than
            living in {selectedCityName1}.
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
