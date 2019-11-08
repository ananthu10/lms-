import mongoose from "mongoose";

const Schema = mongoose.Schema;
const teacherSchema = new Schema({
  teacher_name: {
    type: String,
    required: true
  },
  teacher_id: {
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
export default mongoose.model("teacher", teacherSchema);
