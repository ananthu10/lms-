import Joi from "joi";
import HttpStatus from "http-status-codes";
import teacher from "./teacher.model";
import student from "../student/student.model";
export default {
  findAll(req, res, next) {
    teacher
      .find()
      .then(teacher => res.json(teacher))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  create(req, res, next) {
    const schema = Joi.object().keys({
      teacher_name: Joi.string().required(),
      teacher_id: Joi.string().required(),
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
    teacher
      .create(value)
      .then(teacher => res.json(teacher))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  findOne(req, res) {
    let { id } = req.params;
    teacher
      .findById(id)
      .then(teacher => {
        if (!teacher) {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ err: "could not find any teacher data" });
        }
        return res.json(teacher);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  delete(req, res) {
    let { id } = req.params;
    teacher
      .findByIdAndRemove(id)
      .then(teacher => {
        if (!teacher) {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ err: "there is no teacher data" });
        }
        return res.json(teacher);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  update(req, res) {
    let { id } = req.params;
    const schema = Joi.object().keys({
      teacher_name: Joi.string().optional(),
      teacher_id: Joi.string().optional(),
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
    teacher
      .findOneAndUpdate({ _id: id }, value, { new: true })
      .then(teacher => res.json(teacher))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  findAllstudent(req, res, next) {
    student
      .find()
      .then(student => res.json(student))
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  findOnestudent(req, res) {
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
  deletestudent(req, res) {
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
  updatestudent(req, res) {
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
