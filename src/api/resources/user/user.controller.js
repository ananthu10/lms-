import userService from "./user.service";
import jwt from "jsonwebtoken";
import passport from "passport";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED
} from "http-status-codes";
import User from "./user.model";
import { devConfig } from "../../../../env/development.js";

var bcryptjs = require("bcryptjs");
export default {
  async signup(req, res) {
    try {
      //validateing the request
      const { error, value } = userService.validateScheam(req.body);
      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }
      //encryption mode
      //create new user
      const user = await User.create(value);
      return res.json(user);
    } catch (err) {
      console.log(err);

      return res.status(INTERNAL_SERVER_ERROR).json(err);
    }
  },

  async login(req, res) {
    try {
      const { error, value } = userService.validateScheam(req.body);
      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }
      const user = await User.findOne({ email: value.email });
      if (!user) {
        return res
          .status(BAD_REQUEST)
          .json({ err: "invalid email or password" });
      }
      const matched = await bcryptjs.compareSync(value.password, user.password);

      if (!matched) {
        return res.status(UNAUTHORIZED).json({ err: "invalid credentials" });
      }
      const token = jwt.sign({ id: user._id }, devConfig.secrete, {
        expiresIn: "1h"
      });
      return res.json({ success: true, token });
    } catch (err) {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).json(err);
    }
  },
  async test(req, res) {
    //return res.json(req.user);
    return res.json(req.currentUser);
  }
};
