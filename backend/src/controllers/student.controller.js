import Student from "../modals/student.modul.js";

export const createStudent = async (req, res) => {
  try {
    const { name, age, gender, className, address } = req.body;
    if (!name || !age || !gender || !className || !address) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const student = await Student.create({
      name,
      age,
      gender,
      className,
      address,
      createdBy: req.user._id,
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ createdBy: req.user._id });
    res.json(students);
  } catch (error) {}
};
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }
    if (student.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "not autharized" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }
    if (student.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "not autharized" });
    }
    const update = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "update succefully!", update });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }
    if (student.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "not autharized" });
    }
    await student.deleteOne();
    res.json({ message: "student removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
