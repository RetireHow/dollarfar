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

// Define a new PDF document component
export const COLCPdf = ({ data }: { data: any }) => {
  const { name, email } = data || {};

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
            <Text style={styles.title}>$ - CAD</Text>
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
                <Text>Toronto</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>
                  City youar are moving to
                </Text>
                <Text>Vancouver</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#696969" }}>Your Income</Text>
                <Text>$12,345</Text>
              </View>
            </View>

            <View style={{marginTop:"25px", marginBottom:"8px"}}>
              <Text style={{ fontWeight: "bold", fontSize: "14px" }}>
                Cost Difference
              </Text>
            </View>
            <View
              style={{
                border: "1px solid #EAECF0",
                width: "100%",
                padding: 16,
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
                }}
              >
                <Text style={{ width: "200px"}}>Name</Text>
                <Text style={{ width: "120px"}}>Toronto</Text>
                <Text style={{ width: "120px"}}>Vancouver</Text>
                <Text style={{ width: "50px"}}>Change</Text>
              </View>

              {/* Table Body  */}
              {/* row-1  */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #EAECF0",
                  paddingBottom: "8px",
                  paddingTop: "8px",
                }}
              >
                <Text style={{ width: "200px" }}>Restaurants</Text>
                <Text style={{ width: "120px" }}>$80</Text>
                <Text style={{ width: "120px" }}>$150</Text>
                <Text style={{ width: "50px", color: "#4CAF50" }}>88.50%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #EAECF0",
                  paddingBottom: "8px",
                  paddingTop: "8px",
                }}
              >
                <Text style={{ width: "200px" }}>Markets</Text>
                <Text style={{ width: "120px" }}>$180</Text>
                <Text style={{ width: "120px" }}>$250</Text>
                <Text style={{ width: "50px", color: "#4CAF50" }}>88.50%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #EAECF0",
                  paddingBottom: "8px",
                  paddingTop: "8px",
                }}
              >
                <Text style={{ width: "200px" }}>Transportation</Text>
                <Text style={{ width: "120px" }}>$280</Text>
                <Text style={{ width: "120px" }}>$150</Text>
                <Text style={{ width: "50px", color: "#4CAF50" }}>88.50%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #EAECF0",
                  paddingBottom: "8px",
                  paddingTop: "8px",
                }}
              >
                <Text style={{ width: "200px" }}>Utilities (Monthly)</Text>
                <Text style={{ width: "120px" }}>$70</Text>
                <Text style={{ width: "120px" }}>$50</Text>
                <Text style={{ width: "50px", color: "#4CAF50" }}>88.50%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #EAECF0",
                  paddingBottom: "8px",
                  paddingTop: "8px",
                }}
              >
                <Text style={{ width: "200px" }}>Sports And Leisure</Text>
                <Text style={{ width: "120px" }}>$80</Text>
                <Text style={{ width: "120px" }}>$150</Text>
                <Text style={{ width: "50px", color: "#4CAF50" }}>88.50%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #EAECF0",
                  paddingBottom: "8px",
                  paddingTop: "8px",
                }}
              >
                <Text style={{ width: "200px" }}>Childcare</Text>
                <Text style={{ width: "120px" }}>$60</Text>
                <Text style={{ width: "120px" }}>$50</Text>
                <Text style={{ width: "50px", color: "#4CAF50" }}>88.50%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #EAECF0",
                  paddingBottom: "8px",
                  paddingTop: "8px",
                }}
              >
                <Text style={{ width: "200px" }}>Clothing And Shoes</Text>
                <Text style={{ width: "120px" }}>$580</Text>
                <Text style={{ width: "120px" }}>$450</Text>
                <Text style={{ width: "50px", color: "#4CAF50" }}>88.50%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #EAECF0",
                  paddingBottom: "8px",
                  paddingTop: "8px",
                }}
              >
                <Text style={{ width: "200px" }}>Rent Per Month</Text>
                <Text style={{ width: "120px" }}>$80</Text>
                <Text style={{ width: "120px" }}>$150</Text>
                <Text style={{ width: "50px", color: "#4CAF50" }}>88.50%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #EAECF0",
                  paddingBottom: "8px",
                  paddingTop: "8px",
                }}
              >
                <Text style={{ width: "200px" }}>Buy Apartment Price</Text>
                <Text style={{ width: "120px" }}>$680</Text>
                <Text style={{ width: "120px" }}>$350</Text>
                <Text style={{ width: "50px", color: "#4CAF50" }}>88.50%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #EAECF0",
                  paddingBottom: "8px",
                  paddingTop: "8px",
                }}
              >
                <Text style={{ width: "200px" }}>Salaries And Financing</Text>
                <Text style={{ width: "120px" }}>$80</Text>
                <Text style={{ width: "120px" }}>$150</Text>
                <Text style={{ width: "50px", color: "#4CAF50" }}>88.50%</Text>
              </View>
            </View>
          </View>

          {/* Chart Container  */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              {/* <Image style={{ width: "90%", height: 150 }} src={base64} /> */}
            </View>
          </View>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>Dollarfar.com</Text>

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
