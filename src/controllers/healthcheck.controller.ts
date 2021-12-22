import { NextFunction, Request, Response } from "express";

class HealthcheckController {
  constructor() {}

  public index = (req: Request, res: Response, next: NextFunction) => {
    const healthcheck = {
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    };

    try {
      res.send(healthcheck);
    } catch (e) {
      healthcheck.message = e;
      res.status(503).send();
    }
  };
}

export default HealthcheckController;
