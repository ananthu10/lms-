import express from "express";
//import passport from "passport";
import studentController from "./student.controller";

export const studentRouter = express.Router();

studentRouter
  .route("/")
  .post(studentController.create)
  .get(studentController.findAll);

studentRouter
  .route("/:id")
  .put(studentController.update)
  .delete(studentController.delete)
  .get(studentController.findOne);

// studentRouter
//   .route("/")
//   .post(
//     passport.authenticate("jwt", { session: false }),
//     studentController.create
//   )
//   .get(
//     passport.authenticate("jwt", { session: false }),
//     studentController.findAll
//   );

// studentRouter
//   .route("/:id")
//   .put(
//     passport.authenticate("jwt", { session: false }),
//     studentController.update
//   )
//   .delete(
//     passport.authenticate("jwt", { session: false }),

//     studentController.delete
//   )
//   .get(
//     passport.authenticate("jwt", { session: false }),

//     studentController.findOne
//   );
