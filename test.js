const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/whatever");
};

const student = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: true
  },
  faveFoods: [{ type: String }],
  info: {
    school: {
      type: String
    },
    shoeSize: {
      type: Number
    }
  }
}, {timestamps: true});

const Student = mongoose.model("student", student);

connect()
  .then(async connection => {
    const student = await Student.create({ firstName: "Tim" });
    const found = Student.find({ firstName: "Tim" });
    const foundById = Student.findById("adfdshfkj");
    const updated = Student.findByIdAndUpdate("alkjdfh", {});
    console.log(student);
  })
  .catch(e => console.error(e));


  // wild card for find put {}
  // second argument to schema can add createdAt and updatedAt