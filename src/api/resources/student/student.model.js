import mongoose from "mongoose";

const Schema = mongoose.Schema;
const studentSchema = new Schema({
  stud_name: {
    type: String,
    required: true
  },
  roll_no: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  remarks: {
    type: String
  },

  frm_date: { type: Date, required: true },
  accepted: { type: Boolean, default: false },
  to_date: { type: Date, required: true }
});
export default mongoose.model("student", studentSchema);
