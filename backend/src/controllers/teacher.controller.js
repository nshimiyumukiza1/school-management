import Teacher from "../modals/teacher.modul.js";

export const createTeacher = async (req, res) => {
  try {
    const { name, email, subject, phone } = req.body;
    if (!name || !email || !subject)
      return res.status(400).json({ message: "Please fill all required fields" });

    const exists = await Teacher.findOne({ email });
    if (exists) return res.status(400).json({ message: "Teacher already exists" });

    const teacher = await Teacher.create({
      name,
      email,
      subject,
      phone,
      createdBy: req.user._id,
    });
    res.status(201).json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const teacher = await Teacher.find({ createdBy: req.user._id });
    res
      .status(200)
      .json({ message: `you get teacher created by ${user.name}`, teacher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "teacher not found" });
    }
    if (teacher.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "not authorized" });
    }
    const update = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "teacher not found" });
    }
    if (teacher.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "not authorized" });
    }
    await teacher.deleteOne();
    res.json({ message: "teacher removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
