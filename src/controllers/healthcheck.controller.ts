import { NextFunction, Request, Response } from "express";

class HealthCheckController {
  constructor() {}

  public index = (req: Request, res: Response, next: NextFunction) => {
    const healthCheck = {
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    };

    try {
      res.send(healthCheck);
    } catch (e) {
      healthCheck.message = e;
      res.status(503).send();
    }
  };
}

export default HealthCheckController;
