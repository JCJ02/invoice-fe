import { InvoiceType } from "@/types/InvoiceType";
import LWSMainLogo from "../../../../../assets/images/lws-main-logo.png";
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

// STYLES
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  gap: {
    gap: "18px",
  },
  padding: {
    paddingTop: "56px",
    paddingHorizontal: "36px",
    paddingBottom: "36px",
  },
});

Font.register({
  family: "Poppins",
  src: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap",
});

Font.register({
  family: "Inter",
  src: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
});

Font.register({
  family: "Roboto",
  src: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
});

// TAILWIND CSS
const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans", "Poppins", "Roboto", "Inter"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

const InvoicePDF = ({
  data,
  isLoading,
  isError,
  error,
  client,
  formattedDate,
}: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={[styles.column, styles.padding, styles.gap]}>
        {/* HEADER */}
        <View style={styles.row}>
          <Image src={LWSMainLogo.src} style={tw("pb-10 w-40")} />
          <View style={tw("flex flex-col items-end")}>
            <Text style={tw("font-roboto text-sm")}>Lightweight Solutions</Text>
            <Text style={tw("font-roboto text-sm")}>(02) 750-920-95</Text>
            <Text style={tw("font-roboto text-sm")}>
              5F, Phinma Plaza, 30 Plaza Drive Rockwell Center
            </Text>
            <Text style={tw("font-roboto text-sm")}>
              Makati City Metro Manila 1210
            </Text>
          </View>
        </View>

        {/* CLIENT INFORMATION */}
        <View style={styles.row}>
          <View style={tw("flex flex-row items-start gap-20 w-full")}>
            {/* BILLED TO */}
            <View style={tw("flex flex-col items-start gap-1")}>
              <Text style={tw("font-roboto text-sm text-red-600")}>
                Billed To
              </Text>
              <View style={tw("flex flex-col items-start gap-1")}>
                <Text style={tw("font-roboto text-sm")}>
                  {client.companyName}
                </Text>
                <Text style={tw("font-roboto text-sm")}>
                  {`${client.firstname} ${client.lastname}`}
                </Text>
              </View>
            </View>

            {/* DATE OF ISSUE & DUE */}
            <View style={tw("flex flex-col items-start gap-3")}>
              <View style={tw("flex flex-col items-start gap-1")}>
                <Text style={tw("font-roboto text-sm text-red-600")}>
                  Date of Issue
                </Text>
                <Text style={tw("font-roboto text-sm")}>{formattedDate}</Text>
              </View>
            </View>

            <View style={tw("flex flex-col items-start gap-3")}>
              <View style={tw("flex flex-col items-start gap-1")}>
                <Text style={tw("font-roboto text-sm text-red-600")}>
                  Invoice Number
                </Text>
                <Text style={tw("font-roboto text-sm")}>
                  {data?.data.client.invoices?.[1]?.invoiceNumber}
                </Text>
              </View>
            </View>
          </View>

          {/* AMOUNT DUE */}
          <View style={tw("flex flex-col items-end gap-1 w-full")}>
            <Text style={tw("text-sm text-red-600")}>Amount Due (PHP)</Text>
            <Text style={tw("font-roboto text-xl")}>
              {Number(
                data?.data.client.invoices?.[1]?.totalOutstanding?.toLocaleString()
              ).toLocaleString() || "0.00"}{" "}
              PHP
            </Text>
          </View>
        </View>

        {/* INVOICE TABLE */}
        <View
          style={tw(
            "flex flex-col items-center gap-1 border-t-2 border-red-600 pt-4 pb-10 w-full"
          )}
        >
          <View style={tw("flex flex-col gap-2 w-full")}>
            <View
              style={tw("flex flex-row justify-between items-center w-full")}
            >
              <Text style={tw("font-roboto text-sm text-red-600 w-1/4")}>
                Description
              </Text>
              <Text style={tw("font-roboto text-sm text-red-600 w-1/5")}>
                Due Date
              </Text>
              <Text style={tw("font-roboto text-sm text-red-600 w-1/5")}>
                Rate
              </Text>
              <Text style={tw("font-roboto text-sm text-red-600 w-1/6")}>
                Quantity
              </Text>
              <Text style={tw("font-roboto text-sm text-red-600 w-1/5")}>
                Line Total
              </Text>
            </View>
            <View style={tw("flex flex-col gap-2 w-full")}>
              {isLoading ? (
                <View>
                  <Text
                    style={tw("font-roboto text-center text-sm text-gray-500")}
                  >
                    Loading...
                  </Text>
                </View>
              ) : isError ? (
                <View>
                  <Text
                    style={tw("font-roboto text-center text-sm text-red-500")}
                  >
                    {`Error: ${error?.message || "An Unknown Error Occurred."}`}
                  </Text>
                </View>
              ) : (
                data?.data?.client?.invoices?.map((invoice: InvoiceType) => (
                  <View
                    style={tw(
                      "flex flex-row justify-between items-center w-full"
                    )}
                    key={invoice.id}
                  >
                    <Text style={tw("font-roboto text-sm w-1/4")}>
                      {invoice.description}
                    </Text>
                    <Text style={tw("font-roboto text-sm w-1/5")}>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </Text>
                    <Text style={tw("font-roboto text-sm w-1/5")}>
                      {Number(invoice.rate).toFixed(2).toLocaleString()} PHP
                    </Text>
                    <Text style={tw("font-roboto text-sm w-1/6")}>
                      {invoice.quantity}
                    </Text>
                    <Text style={tw("font-poppins text-sm w-1/5")}>
                      {Number(invoice.lineTotal).toFixed(2).toLocaleString()}{" "}
                      PHP
                    </Text>
                  </View>
                ))
              )}
            </View>
          </View>
        </View>

        {/* RESULTS */}
        <View style={tw("flex flex-col items-end py-10 w-full")}>
          <View style={tw("flex flex-col items-start w-2/5")}>
            <View style={styles.row}>
              <Text style={tw("font-roboto text-sm")}>Subtotal:</Text>
              <Text style={tw("font-roboto text-sm")}>{`0.00 PHP`}</Text>
            </View>

            <View style={styles.row}>
              <Text style={tw("font-roboto text-sm")}>Tax:</Text>
              <Text style={tw("font-roboto text-sm")}>{`0.00 PHP`}</Text>
            </View>

            <View
              style={tw(
                "flex flex-col items-start border-t-[1px] border-b-[1px] border-[#BBBBBB] py-1 my-1 w-full"
              )}
            >
              <View style={styles.row}>
                <Text style={tw("font-roboto text-sm")}>Total:</Text>
                <Text style={tw("font-roboto text-sm")}>
                  {Number(
                    data?.data.client.invoices?.[1]?.totalOutstanding?.toLocaleString()
                  ).toLocaleString() || "0.00"}{" "}
                  PHP
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={tw("font-roboto text-sm")}>Amount Paid:</Text>
                <Text style={tw("font-roboto text-sm")}>{`0.00 PHP`}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={tw("font-roboto text-sm text-red-600")}>
                Amount Due (PHP):
              </Text>
              <Text style={tw("font-roboto text-sm")}>
                {Number(
                  data?.data.client.invoices?.[1]?.totalOutstanding?.toLocaleString()
                ).toLocaleString() || "0.00"}{" "}
                PHP
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* NOTES and TERMS */}
      <View style={tw("flex flex-col items-start gap-2 px-9 pb-9 w-full")}>
        <Text style={tw("text-sm text-red-600")}>Notes</Text>
        <View style={tw("flex flex-col items-start gap-1 w-full")}>
          <Text style={tw("font-roboto text-sm")}>Bank Name: BDO</Text>
          <Text style={tw("font-roboto text-sm")}>
            Account Name: Lightweight Information Technology Solutions
          </Text>
          <Text style={tw("font-roboto text-sm")}>
            Bank Account Number: 000-000-00-00
          </Text>
          <Text style={tw("font-roboto text-sm")}>
            Bank Address: 1488 Quezon Avenue, 1103 South Triangle, Scout Albano,
            Quezon City, Philippines
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
