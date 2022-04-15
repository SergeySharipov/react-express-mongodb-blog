import { Request, Response } from 'express';

const allAccess = (req: Request, res: Response) => {
    res.status(200).send("Public Content.");
};

const userBoard = (req: Request, res: Response) => {
    res.status(200).send("User ID: " + req.userId);
};

const controller = { allAccess, userBoard }

export default controller