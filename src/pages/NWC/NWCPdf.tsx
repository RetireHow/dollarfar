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
import { getArrayFromObject } from "./nwc.utils";

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
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
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

type TAssets = {
  property: number;
  savingsInvestment: number;
  personalItems: number;
  businessOwnershipInterest: number;
  vehicles: number;
  otherAssets: number;
  totalAssets: number;
  assetsBreakdown: any;
};

type TLiabilities = {
  homeLoan: number;
  personalOtherLoans: number;
  vehicleLoans: number;
  taxLiability: number;
  creditCardDues: number;
  otherDebts: number;
  totalLiabilities: number;
  liabilitiesBreakdown: any;
};

type TData = {
  assets: TAssets;
  liabilities: TLiabilities;
  name?: string;
  email?: string;
  base64: string;
  currency: string;
};

// Define a new PDF document component
export const NWCPdf = ({ data }: { data: TData }) => {
  const {
    name,
    email,
    base64,
    assets: {
      property,
      savingsInvestment,
      personalItems,
      businessOwnershipInterest,
      vehicles,
      otherAssets,
      totalAssets,
      assetsBreakdown,
    },
    liabilities: {
      homeLoan,
      personalOtherLoans,
      vehicleLoans,
      taxLiability,
      creditCardDues,
      otherDebts,
      totalLiabilities,
      liabilitiesBreakdown,
    },
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
            <Text>Net Worth Calculator</Text>
            <Text style={styles.title}></Text>
          </View>

          {/* Card Container  */}
          <View style={styles.section2}>
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontWeight: "extrabold",
                  fontSize: 14,
                  marginBottom: 10,
                }}
              >
                Assets
              </Text>
              <View
                style={{
                  border: "1px solid #EAECF0",
                  padding: 16,
                  borderRadius: 5,
                  backgroundColor: "#F8F8F8",
                  flexDirection: "column",
                  gap: 16,
                  fontSize: 12,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Property</Text>
                  <Text>{property}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>
                    Savings & Investments
                  </Text>
                  <Text>{savingsInvestment}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Personal Items</Text>
                  <Text>{personalItems}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Business Ownership</Text>
                  <Text>{businessOwnershipInterest}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Vehicles</Text>
                  <Text>{vehicles}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Other Assets</Text>
                  <Text>{otherAssets}</Text>
                </View>
              </View>
            </View>

            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontWeight: "extrabold",
                  fontSize: 14,
                  marginBottom: 10,
                }}
              >
                Liabilities
              </Text>
              <View
                style={{
                  border: "1px solid #EAECF0",
                  padding: 16,
                  borderRadius: 5,
                  backgroundColor: "#F8F8F8",
                  flexDirection: "column",
                  gap: 16,
                  fontSize: 12,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Home Loan</Text>
                  <Text>{homeLoan}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>
                    Personal & Other Loans
                  </Text>
                  <Text>{personalOtherLoans}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Vehicle Loans</Text>
                  <Text>{vehicleLoans}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Tax liability</Text>
                  <Text>{taxLiability}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Credit Card Dues</Text>
                  <Text>{creditCardDues}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#696969" }}>Other Debts</Text>
                  <Text>{otherDebts}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Totals Card  */}
          <View
            style={{
              border: "1px solid #EAECF0",
              padding: 16,
              borderRadius: 5,
              backgroundColor: "#F8F8F8",
              flexDirection: "column",
              gap: 16,
              fontSize: 12,
              width: "100%",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontWeight: "extrabold", fontSize: 14 }}>
              Totals
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#696969" }}>Assets</Text>
              <Text>{totalAssets}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#696969" }}>Liabilities</Text>
              <Text>{totalLiabilities}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#000000",
                color: "#fff",
                padding: "8px",
                borderRadius: "5px",
              }}
            >
              <Text>Net Worth</Text>
              <Text>{totalAssets - totalLiabilities}</Text>
            </View>
          </View>

          {/* Chart Container  */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Image style={{ width: "90%", height: 150 }} src={base64} />
            </View>

            {/* Legends Container  */}
            <View
              style={{
                fontSize: 12,
                flexDirection: "column",
                gap: 20,
                fontWeight: "extrabold",
              }}
            >
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
                <Text>Assets</Text>
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
                <Text>Liabilities</Text>
              </View>
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
                <Text>Net Worth</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    color: "#000",
                    width: 20,
                  }}
                ></Text>
                <Text></Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              fontSize: 12,
              textAlign: "left",
              marginTop: 12,
              lineHeight: "20px",
            }}
          >
            "Based on the information provided, your total assets are{" "}
            {totalAssets}, and your total liabilities are {totalLiabilities}.
            This gives you a net worth of {totalAssets - totalLiabilities}."
          </Text>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>Dollarfar.com</Text>
      </Page>

      {/* page 2  */}
      <Page style={{ position: "relative" }}>
        <Text
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            marginLeft: "15px",
            marginRight: "15px",
            marginTop: "15px",
          }}
        >
          Assets And Liabilities Breakdown Data
        </Text>
        {/* ======================|| Assets Tables ||================================== */}
        <View
          style={{
            margin: 15,
            padding: 10,
            borderColor: "#D3D3D3",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "5px",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          >
            Assets
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              columnGap: 5,
              rowGap: 15,
            }}
          >
            {/* Property  */}
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Property
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 5,
                  gap: 10,
                }}
              >
                <Text style={{ width: "100px" }}>Name</Text>
                <Text style={{ width: "50px" }}>Amount</Text>
              </View>
              {/* Table Body  */}
              <View style={{ backgroundColor: "#F8F8F8" }}>
                {getArrayFromObject(assetsBreakdown?.property)?.map(
                  (item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          fontSize: "10px",
                          color: "#000",
                          padding: 5,
                          borderBottomColor: "#e5e7eb",
                          borderBottomWidth: "1px",
                          borderBottomStyle: "solid",
                          gap: 15,
                        }}
                      >
                        <Text style={{ width: "100px" }}>{item?.title}</Text>
                        <Text style={{ width: "50px" }}>{item?.value}</Text>
                      </View>
                    );
                  }
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    color: "#000",
                    padding: 5,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    gap: 15,
                    backgroundColor: "#E0E0E0",
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ width: "100px" }}>Total</Text>
                  <Text style={{ width: "50px" }}>{property}</Text>
                </View>
              </View>
            </View>
            {/* Savings and Investment  */}
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Savings And Investments
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 5,
                  gap: 10,
                }}
              >
                <Text style={{ width: "100px" }}>Name</Text>
                <Text style={{ width: "50px" }}>Amount</Text>
              </View>
              {/* Table Body  */}
              <View style={{ backgroundColor: "#F8F8F8" }}>
                {getArrayFromObject(assetsBreakdown?.savingsInvestment)?.map(
                  (item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          fontSize: "10px",
                          color: "#000",
                          padding: 5,
                          borderBottomColor: "#e5e7eb",
                          borderBottomWidth: "1px",
                          borderBottomStyle: "solid",
                          gap: 15,
                        }}
                      >
                        <Text style={{ width: "100px" }}>{item?.title}</Text>
                        <Text style={{ width: "50px" }}>{item?.value}</Text>
                      </View>
                    );
                  }
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    color: "#000",
                    padding: 5,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    gap: 15,
                    backgroundColor: "#E0E0E0",
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ width: "100px" }}>Total</Text>
                  <Text style={{ width: "50px" }}>{savingsInvestment}</Text>
                </View>
              </View>
            </View>
            {/* Personal Items  */}
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Personal Items
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 5,
                  gap: 10,
                }}
              >
                <Text style={{ width: "100px" }}>Name</Text>
                <Text style={{ width: "50px" }}>Amount</Text>
              </View>
              {/* Table Body  */}
              <View style={{ backgroundColor: "#F8F8F8" }}>
                {getArrayFromObject(assetsBreakdown?.personalItems)?.map(
                  (item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          fontSize: "10px",
                          color: "#000",
                          padding: 5,
                          borderBottomColor: "#e5e7eb",
                          borderBottomWidth: "1px",
                          borderBottomStyle: "solid",
                          gap: 15,
                        }}
                      >
                        <Text style={{ width: "100px" }}>{item?.title}</Text>
                        <Text style={{ width: "50px" }}>{item?.value}</Text>
                      </View>
                    );
                  }
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    color: "#000",
                    padding: 5,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    gap: 15,
                    backgroundColor: "#E0E0E0",
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ width: "100px" }}>Total</Text>
                  <Text style={{ width: "50px" }}>{personalItems}</Text>
                </View>
              </View>
            </View>
            {/* Business Interest  */}
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Business Interest
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 5,
                  gap: 10,
                }}
              >
                <Text style={{ width: "100px" }}>Name</Text>
                <Text style={{ width: "50px" }}>Amount</Text>
              </View>
              {/* Table Body  */}
              <View style={{ backgroundColor: "#F8F8F8" }}>
                {getArrayFromObject(
                  assetsBreakdown?.businessOwnershipInterest
                )?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        fontSize: "10px",
                        color: "#000",
                        padding: 5,
                        borderBottomColor: "#e5e7eb",
                        borderBottomWidth: "1px",
                        borderBottomStyle: "solid",
                        gap: 15,
                      }}
                    >
                      <Text style={{ width: "100px" }}>{item?.title}</Text>
                      <Text style={{ width: "50px" }}>{item?.value}</Text>
                    </View>
                  );
                })}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    color: "#000",
                    padding: 5,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    gap: 15,
                    backgroundColor: "#E0E0E0",
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ width: "100px" }}>Total</Text>
                  <Text style={{ width: "50px" }}>
                    {businessOwnershipInterest}
                  </Text>
                </View>
              </View>
            </View>
            {/* Vehicles  */}
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Vehicles
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 5,
                  gap: 10,
                }}
              >
                <Text style={{ width: "100px" }}>Name</Text>
                <Text style={{ width: "50px" }}>Amount</Text>
              </View>
              {/* Table Body  */}
              <View style={{ backgroundColor: "#F8F8F8" }}>
                {getArrayFromObject(assetsBreakdown?.vehicles)?.map(
                  (item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          fontSize: "10px",
                          color: "#000",
                          padding: 5,
                          borderBottomColor: "#e5e7eb",
                          borderBottomWidth: "1px",
                          borderBottomStyle: "solid",
                          gap: 15,
                        }}
                      >
                        <Text style={{ width: "100px" }}>{item?.title}</Text>
                        <Text style={{ width: "50px" }}>{item?.value}</Text>
                      </View>
                    );
                  }
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    color: "#000",
                    padding: 5,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    gap: 15,
                    backgroundColor: "#E0E0E0",
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ width: "100px" }}>Total</Text>
                  <Text style={{ width: "50px" }}>{vehicles}</Text>
                </View>
              </View>
            </View>
            {/* Other Assets  */}
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Other Assets
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 5,
                  gap: 10,
                }}
              >
                <Text style={{ width: "100px" }}>Name</Text>
                <Text style={{ width: "50px" }}>Amount</Text>
              </View>
              {/* Table Body  */}
              <View style={{ backgroundColor: "#F8F8F8" }}>
                {getArrayFromObject(assetsBreakdown?.otherAssets)?.map(
                  (item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          fontSize: "10px",
                          color: "#000",
                          padding: 5,
                          borderBottomColor: "#e5e7eb",
                          borderBottomWidth: "1px",
                          borderBottomStyle: "solid",
                          gap: 15,
                        }}
                      >
                        <Text style={{ width: "100px" }}>{item?.title}</Text>
                        <Text style={{ width: "50px" }}>{item?.value}</Text>
                      </View>
                    );
                  }
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    color: "#000",
                    padding: 5,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    gap: 15,
                    backgroundColor: "#E0E0E0",
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ width: "100px" }}>Total</Text>
                  <Text style={{ width: "50px" }}>{otherAssets}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ======================|| Liabilities Tables ||================================== */}
        <View
          style={{
            margin: 15,
            padding: 10,
            borderColor: "#D3D3D3",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "5px",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          >
            Liabilities
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              columnGap: 5,
              rowGap: 15,
            }}
          >
            {/* Home Loan  */}
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Home Loan
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 5,
                  gap: 10,
                }}
              >
                <Text style={{ width: "100px" }}>Name</Text>
                <Text style={{ width: "50px" }}>Amount</Text>
              </View>
              {/* Table Body  */}
              <View style={{ backgroundColor: "#F8F8F8" }}>
                {getArrayFromObject(liabilitiesBreakdown?.homeLoan)?.map(
                  (item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          fontSize: "10px",
                          color: "#000",
                          padding: 5,
                          borderBottomColor: "#e5e7eb",
                          borderBottomWidth: "1px",
                          borderBottomStyle: "solid",
                          gap: 15,
                        }}
                      >
                        <Text style={{ width: "100px" }}>{item?.title}</Text>
                        <Text style={{ width: "50px" }}>{item?.value}</Text>
                      </View>
                    );
                  }
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    color: "#000",
                    padding: 5,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    gap: 15,
                    backgroundColor: "#E0E0E0",
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ width: "100px" }}>Total</Text>
                  <Text style={{ width: "50px" }}>{homeLoan}</Text>
                </View>
              </View>
            </View>
            {/* Personal And Other Loans  */}
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Personal And Other Loans
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 5,
                  gap: 10,
                }}
              >
                <Text style={{ width: "100px" }}>Name</Text>
                <Text style={{ width: "50px" }}>Amount</Text>
              </View>
              {/* Table Body  */}
              <View style={{ backgroundColor: "#F8F8F8" }}>
                {getArrayFromObject(
                  liabilitiesBreakdown?.personalOtherLoans
                )?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        fontSize: "10px",
                        color: "#000",
                        padding: 5,
                        borderBottomColor: "#e5e7eb",
                        borderBottomWidth: "1px",
                        borderBottomStyle: "solid",
                        gap: 15,
                      }}
                    >
                      <Text style={{ width: "100px" }}>{item?.title}</Text>
                      <Text style={{ width: "50px" }}>{item?.value}</Text>
                    </View>
                  );
                })}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    color: "#000",
                    padding: 5,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    gap: 15,
                    backgroundColor: "#E0E0E0",
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ width: "100px" }}>Total</Text>
                  <Text style={{ width: "50px" }}>{personalOtherLoans}</Text>
                </View>
              </View>
            </View>
            {/* Vehicle Loans  */}
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Vehicle Loans
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 5,
                  gap: 10,
                }}
              >
                <Text style={{ width: "100px" }}>Name</Text>
                <Text style={{ width: "50px" }}>Amount</Text>
              </View>
              {/* Table Body  */}
              <View style={{ backgroundColor: "#F8F8F8" }}>
                {getArrayFromObject(liabilitiesBreakdown?.vehicleLoans)?.map(
                  (item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          fontSize: "10px",
                          color: "#000",
                          padding: 5,
                          borderBottomColor: "#e5e7eb",
                          borderBottomWidth: "1px",
                          borderBottomStyle: "solid",
                          gap: 15,
                        }}
                      >
                        <Text style={{ width: "100px" }}>{item?.title}</Text>
                        <Text style={{ width: "50px" }}>{item?.value}</Text>
                      </View>
                    );
                  }
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    color: "#000",
                    padding: 5,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    gap: 15,
                    backgroundColor: "#E0E0E0",
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ width: "100px" }}>Total</Text>
                  <Text style={{ width: "50px" }}>{vehicleLoans}</Text>
                </View>
              </View>
            </View>
            {/* Tax Liability  */}
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Tax Liability
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 5,
                  gap: 10,
                }}
              >
                <Text style={{ width: "100px" }}>Name</Text>
                <Text style={{ width: "50px" }}>Amount</Text>
              </View>
              {/* Table Body  */}
              <View style={{ backgroundColor: "#F8F8F8" }}>
                {getArrayFromObject(liabilitiesBreakdown?.taxLiability)?.map(
                  (item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          fontSize: "10px",
                          color: "#000",
                          padding: 5,
                          borderBottomColor: "#e5e7eb",
                          borderBottomWidth: "1px",
                          borderBottomStyle: "solid",
                          gap: 15,
                        }}
                      >
                        <Text style={{ width: "100px" }}>{item?.title}</Text>
                        <Text style={{ width: "50px" }}>{item?.value}</Text>
                      </View>
                    );
                  }
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    color: "#000",
                    padding: 5,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    gap: 15,
                    backgroundColor: "#E0E0E0",
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ width: "100px" }}>Total</Text>
                  <Text style={{ width: "50px" }}>{taxLiability}</Text>
                </View>
              </View>
            </View>
            {/* Credit Card Dues  */}
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Credit Card Dues
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 5,
                  gap: 10,
                }}
              >
                <Text style={{ width: "100px" }}>Name</Text>
                <Text style={{ width: "50px" }}>Amount</Text>
              </View>
              {/* Table Body  */}
              <View style={{ backgroundColor: "#F8F8F8" }}>
                {getArrayFromObject(liabilitiesBreakdown?.creditCardDues)?.map(
                  (item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          fontSize: "10px",
                          color: "#000",
                          padding: 5,
                          borderBottomColor: "#e5e7eb",
                          borderBottomWidth: "1px",
                          borderBottomStyle: "solid",
                          gap: 15,
                        }}
                      >
                        <Text style={{ width: "100px" }}>{item?.title}</Text>
                        <Text style={{ width: "50px" }}>{item?.value}</Text>
                      </View>
                    );
                  }
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    color: "#000",
                    padding: 5,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    gap: 15,
                    backgroundColor: "#E0E0E0",
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ width: "100px" }}>Total</Text>
                  <Text style={{ width: "50px" }}>{creditCardDues}</Text>
                </View>
              </View>
            </View>
            {/* Other Debts  */}
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Other Debts
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 5,
                  gap: 10,
                }}
              >
                <Text style={{ width: "100px" }}>Name</Text>
                <Text style={{ width: "50px" }}>Amount</Text>
              </View>
              {/* Table Body  */}
              <View style={{ backgroundColor: "#F8F8F8" }}>
                {getArrayFromObject(liabilitiesBreakdown?.otherDebts)?.map(
                  (item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          fontSize: "10px",
                          color: "#000",
                          padding: 5,
                          borderBottomColor: "#e5e7eb",
                          borderBottomWidth: "1px",
                          borderBottomStyle: "solid",
                          gap: 15,
                        }}
                      >
                        <Text style={{ width: "100px" }}>{item?.title}</Text>
                        <Text style={{ width: "50px" }}>{item?.value}</Text>
                      </View>
                    );
                  }
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    color: "#000",
                    padding: 5,
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    gap: 15,
                    backgroundColor: "#E0E0E0",
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ width: "100px" }}>Total</Text>
                  <Text style={{ width: "50px" }}>{otherDebts}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

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
