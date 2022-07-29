import { Router } from "express";
import LineController from '../controllers/line.controller';
import Route from "../interfaces/routes.interface";

class LineRoute implements Route {
  public path = "/line";
  public router = Router();
  public lineController = new LineController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/liff/callback`, this.lineController.liffCallback);
  }
}

export default LineRoute;
