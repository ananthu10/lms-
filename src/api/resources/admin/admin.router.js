import express from "express";
//import passport from "passport";
import adminController from "./admin.controller";

export const adminRouter = express.Router();

adminRouter.route("/student/").get(adminController.findAllstudent);

adminRouter
  .route("/student/:id")
  .put(adminController.updatestudent)
  .delete(adminController.deletestudent)
  .get(adminController.findAllstudent);

adminRouter.route("/teacher/").get(adminController.findAllteacher);
adminRouter
  .route("/teacher/:id")
  .put(adminController.updateteacher)
  .delete(adminController.deleteteacher)
  .get(adminController.findOneteacher);
