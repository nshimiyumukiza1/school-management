import Student from "../modals/student.modul.js";
import Teacher from "../modals/teacher.modul.js";
import Class from "../modals/class.modal.js";

export const getDashBoardStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const totalStudents = await Student.countDocuments({ createdBy: userId });
    const totalTeacher = await Teacher.countDocuments({ createdBy: userId });
    const totalClasses = await Class.countDocuments({ createdBy: userId });
    res.json({ totalStudents, totalClasses, totalTeacher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
