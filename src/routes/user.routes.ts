import { Request, Response, NextFunction } from 'express';
import { authJwt } from "../middlewares";
import controller from "../controllers/user.controller";
import { Router } from "express"

const router: Router = Router()

router.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/api/test/all", controller.allAccess);

router.get("/api/test/user/:userId", [authJwt.verifyToken], controller.userBoard);

export default router