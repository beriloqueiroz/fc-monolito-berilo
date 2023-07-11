import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { customerRoute } from "./routes/clients.route";
import { productRoute } from "./routes/products.route";
import InvoiceModel from "../modules/invoice/repository/invoice.model";
import TransactionModel from "../modules/payment/repository/transaction.model";
import { ProductModel } from "../modules/product-adm/repository/product.model";
import ClientModel from "../modules/client-adm/repository/client.model";

export const app: Express = express();
app.use(express.json());
app.use("/clients", customerRoute);
app.use("/products", productRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ProductModel, InvoiceModel, ClientModel, TransactionModel]);
  await sequelize.sync();
}
setupDb();
