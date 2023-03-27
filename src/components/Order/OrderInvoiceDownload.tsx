import React from "react";
import { Document, Page, Text, StyleSheet, View } from "@react-pdf/renderer";
import { IOrder } from "types/order.types";

const OrderInvoiceDownload = ({ order }: { order: IOrder }) => {
    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <Text style={styles.header} fixed>
                    ~ {new Date().toLocaleString()} ~
                </Text>
                <Text style={styles.title}>Order Invoice</Text>
                <Text style={styles.author}>Aladin E-Commerce</Text>
                <Text style={styles.subtitle}>Order Summary</Text>
                <View style={styles.table}>
                    <View style={[styles.row, styles.header]}>
                        <Text style={[styles.tableCell]}>Title</Text>
                        <Text style={[styles.tableCell]}>Price</Text>
                        <Text style={[styles.tableCell]}>Quantity</Text>
                    </View>
                    <>
                        {order.products.length &&
                            order.products.map((product) => (
                                <View
                                    style={[styles.row]}
                                    key={product.product?._id}
                                >
                                    <Text style={[styles.cell]}>
                                        {product.product?.title}
                                    </Text>
                                    <Text style={[styles.cell]}>
                                        {product?.product?.price}
                                    </Text>
                                    <Text style={[styles.cell]}>
                                        {product?.count}
                                    </Text>
                                </View>
                            ))}
                    </>
                </View>

                <Text style={styles.text}>
                    <Text>
                        Date:{"               "}
                        {new Date(
                            order.paymentIntents.created * 1000
                        ).toLocaleString()}
                    </Text>
                    {"\n"}
                    <Text>
                        Order Id: {"        "}
                        {order.paymentIntents.id}
                    </Text>
                    {"\n"}
                    <Text>
                        Order Status:{"  "}
                        {order.orderStatus}
                    </Text>
                    {"\n"}
                    <Text>
                        Total Paid:{"       "}
                        {(order.paymentIntents.amount / 100).toLocaleString(
                            "en-US",
                            {
                                style: "currency",
                                currency: "USD",
                            }
                        )}
                    </Text>
                </Text>
                <Text style={styles.footer}>
                    ~ Thank you so much for shopping with us ~
                </Text>
            </Page>
        </Document>
    );
};

const styles: any = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    author: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        textAlign: "center",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "stretch",
        flexWrap: "nowrap",
        alignItems: "stretch",
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 35,
    },
    table: {
        textAlign: "center",
    },
    tableCell: {
        textAlign: "center",
    },
    tableBodyCell: {
        textAlign: "center",
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
    },
    cell: {
        fontSize: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "stretch",
        flexWrap: "nowrap",
        alignItems: "stretch",
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 35,
        textAlign: "right",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    footer: {
        padding: "100px",
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});

export default OrderInvoiceDownload;
