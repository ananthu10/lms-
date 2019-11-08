import Joi from "joi";
import HttpStatus from "http-status-codes";
import student from "./student.model";

export default {
  findAll(req, res, next) {
    student
      .find()
      .then(student => res.json(student))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  create(req, res, next) {
    const schema = Joi.object().keys({
      stud_name: Joi.string().required(),
      roll_no: Joi.string().required(),
      branch: Joi.string().required(),
      remarks: Joi.string().optional(),
      frm_date: Joi.date().required(),
      accepted: Joi.boolean().required(),
      to_date: Joi.date().optional()
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    student
      .create(value)
      .then(student => res.json(student))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  findOne(req, res) {
    let { id } = req.params;
    student
      .findById(id)
      .then(student => {
        if (!student) {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ err: "could not find any student data" });
        }
        return res.json(student);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  delete(req, res) {
    let { id } = req.params;
    student
      .findByIdAndRemove(id)
      .then(student => {
        if (!student) {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ err: "there is no student data" });
        }
        return res.json(student);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  update(req, res) {
    let { id } = req.params;
    const schema = Joi.object().keys({
      stud_name: Joi.string().optional(),
      roll_no: Joi.string().optional(),
      branch: Joi.string().optional(),
      remarks: Joi.string().optional(),
      frm_date: Joi.date().optional(),
      accepted: Joi.boolean().optional(),
      to_date: Joi.date().optional()
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    student
      .findOneAndUpdate({ _id: id }, value, { new: true })
      .then(student => res.json(student))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  }
};
