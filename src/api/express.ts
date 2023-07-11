import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { clientRoute } from "./routes/clients.route";
import { productRoute } from "./routes/products.route";
import InvoiceModel from "../modules/invoice/repository/invoice.model";
import TransactionModel from "../modules/payment/repository/transaction.model";
import ProductModelAdm from "../modules/product-adm/repository/product.model";
import ClientModel from "../modules/client-adm/repository/client.model";
import { invoiceRoute } from "./routes/invoice.route";
import ProductModelInvoice from "../modules/invoice/repository/product.model";
import { checkoutRoute } from "./routes/checkout.route";
import ClientModelCheckout from "../modules/checkout/repository/client.model";
import OrderModel from "../modules/checkout/repository/order.model";
import ProductModelCheckout from "../modules/checkout/repository/product.model";
import ProductModelCatalog from "../modules/store-catalog/repository/product.model";

export const app: Express = express();
app.use(express.json());
app.use("/clients", clientRoute);
app.use("/products", productRoute);
app.use("/invoice", invoiceRoute);
app.use("/checkout", checkoutRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ProductModelAdm, InvoiceModel, ClientModel, TransactionModel, ProductModelInvoice, ProductModelCatalog, ClientModelCheckout, ProductModelCheckout, OrderModel]);
  await sequelize.sync();
}
setupDb();
