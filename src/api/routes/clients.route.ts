import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import { AddClientFacadeInputDto } from "../../modules/client-adm/facade/client-adm.facade.interface";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  try {
    const { id, name, email, document, street, number, complement, city, state, zipCode } = req.body;
    const clientFacade = ClientAdmFacadeFactory.create();

    const clientDto: AddClientFacadeInputDto = {
      id,
      name,
      email,
      document,
      street,
      number,
      complement,
      city,
      state,
      zipCode
    };
    await clientFacade.add(clientDto);

    const output = await clientFacade.find({ id: clientDto.id });
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});