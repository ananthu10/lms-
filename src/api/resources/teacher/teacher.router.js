import express from "express";
//import passport from "passport";
import teacherController from "./teacher.controller";

export const teacherRouter = express.Router();

teacherRouter
  .route("/")
  .post(teacherController.create)
  .get(teacherController.findAll);

teacherRouter
  .route("/:id")
  .put(teacherController.update)
  .delete(teacherController.delete)
  .get(teacherController.findOne);

teacherRouter.route("/student/").get(teacherController.findAllstudent);

teacherRouter
  .route("/student/:id")
  .put(teacherController.updatestudent)
  .delete(teacherController.deletestudent)
  .get(teacherController.findAllstudent);

// teacherRouter
//   .route("/")
//   .post(
//     passport.authenticate("jwt", { session: false }),
//     teacherController.create
//   )
//   .get(
//     passport.authenticate("jwt", { session: false }),
//     teacherController.findAll
//   );

// teacherRouter
//   .route("/:id")
//   .put(
//     passport.authenticate("jwt", { session: false }),
//     teacherController.update
//   )
//   .delete(
//     passport.authenticate("jwt", { session: false }),

//     teacherController.delete
//   )
//   .get(
//     passport.authenticate("jwt", { session: false }),

//     teacherController.findOne
//   );
