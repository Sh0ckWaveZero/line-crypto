import { Router } from "express";
import HealthcheckController from "../controllers/healthcheck.controller";
import Route from "../interfaces/routes.interface";

class HealthcheckRoute implements Route {
  public path = "/healthcheck";
  public router = Router();
  public healthcheckController = new HealthcheckController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.healthcheckController.index);
  }
}

export default HealthcheckRoute;
