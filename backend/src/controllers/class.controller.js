import Class from "../modals/class.modal.js";
import Teacher from "../modals/teacher.modul.js";
import Student from "../modals/student.modul.js";

export const createClass = async (req ,res) =>{
    try {
        const {name,teacherId,studentIds} = req.body;
        if(!name || ! teacherId){
            return res.status(400).json({message:"class name and teacher are required"})
        }
        const teacher = await Teacher.findById(teacherId)
        if(!teacher){
            return res.status(404).json({message:"teacher not found"})
        }
        const students = await Student.find({_id: {$in:studentIds || []}});
        const newClass  = await Class.create({
            name,
            teacher:teacherId,
            students:studentIds.map((s)=>s._id),
            createdBy:req.user._id,
        });
        res.status(201).json(newClass)
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const updateClass = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) return res.status(404).json({ message: "Class not found" });
    if (classItem.createdBy.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    const updated = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) return res.status(404).json({ message: "Class not found" });
    if (classItem.createdBy.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    await classItem.deleteOne();
    res.json({ message: "Class deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
