import { Request, Response } from 'express';
import config from "../utils/config";
import db from "../models";
import { IUser } from '../types/types';
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const User = db.user;

const signup = (req: Request, res: Response) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user: IUser) => {
        if (err) {
            res.status(500).send({ message: err.message });
        }

        res.send({ message: "User was registered successfully!" });
    });
};

const signin = (req: Request, res: Response) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = Jwt.sign({ id: user.id }, config.AUTH_SECRET, {
                expiresIn: 31556952 // 1 year
            });

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                accessToken: token
            });
        });
};

const controller = { signin, signup }

export default controller