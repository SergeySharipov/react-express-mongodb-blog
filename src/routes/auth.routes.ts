import { Request, Response, NextFunction } from 'express';
import { verifySignUp } from "../middlewares";
import controller from "../controllers/auth.controller";
import { Router } from "express"

const router: Router = Router()

router.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/api/auth/signup",[verifySignUp.checkDuplicateUsernameOrEmail],controller.signup);

router.post("/api/auth/signin", controller.signin);

export default router