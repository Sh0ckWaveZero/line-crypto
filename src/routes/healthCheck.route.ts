import { Router } from "express";
import HealthCheckController from "../controllers/healthcheck.controller";

class HealthCheckRoute implements Route {
  public path = "/health-check";
  public router = Router();
  public healthCheckController = new HealthCheckController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.healthCheckController.index);
  }
}

export default HealthCheckRoute;
