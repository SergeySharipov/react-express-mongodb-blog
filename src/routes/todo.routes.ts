import { Request, Response, NextFunction } from 'express';
import { Router } from "express"
import { authJwt } from "../middlewares/"
import { getTodos, addTodo, updateTodo, deleteTodo, deleteAllTodos } from "../controllers/todo.controller"

const router: Router = Router()

router.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/user/:userId/todos", [authJwt.verifyToken], getTodos)

router.post("/user/:userId/todo", [authJwt.verifyToken], addTodo)

router.put("/user/:userId/todo/:todoId", [authJwt.verifyToken], updateTodo)

router.delete("/user/:userId/todo/:todoId", [authJwt.verifyToken], deleteTodo)

router.delete("/user/:userId/todos", [authJwt.verifyToken], deleteAllTodos)

export default router