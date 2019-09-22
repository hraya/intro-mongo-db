const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/whatever");
};

const school = new mongoose.Schema({
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "district"
  },
  name: {
    type: String,
    unique: false
  },
  openSince: Number,
  students: Number,
  isGreat: Boolean,
  staff: [{ type: String }]
});

school.index(
  {
    district: 1,
    name: 1
  },
  { unique: true }
);

// Middleware (Hooks)
//More examples ['findOne', 'most other functions also']
// before validating
school.pre("validate", function() {
  console.log("before validation");
});

// before saving
school.pre("save", function() {
  console.log("before save");
});

//  after method almost same as above
// async b/c of 2 arguments in function
school.post("save", function(doc, next) {
  console.log("after save", doc);
  next();
});

// Virtuals Example
// school.virtual("staffCount")
// .get(function(){
//   console.log('in virtual')
//    return this.staff.length
// });

const School = mongoose.model("school", school);

connect()
  .then(async connection => {
    const myShcool = await School.create({
      name: "My School",
      staff: ["v", "f", "fsa"]
    });

    // console.log(myShcool.staffCount)
  })
  .catch(e => console.error(e));

// const Student = mongoose.model("student", student);

// Connect method for School and Student
// connect()
//   .then(async connection => {
//     const schoolConfig = {
//       name: "mlks elementry",
//       openSince: 2009,
//       students: 1000,
//       isGreat: true,
//       staff: ["v", "b", "g"]
//     };

//     const school2 = {
//       name: "Larrys Middle School",
//       openSince: 1980,
//       students: 600,
//       isGreat: false,
//       staff: ["a", "b", "c"]
//     };

//     const schools = await School.create([schoolConfig, school2]);
//     const match = await School.find({
//       staff: "b" // $in: {staff: ['v','b', 'g'}
//     }).exec();

// const match = await School.findOne({
//   students: { $gt: 600, $lt: 800 }, // filters $gt = greater than $lt = less than
//   isGreat: true,
// }).exec();
// console.log(match);

// const school = await School.findOneAndUpdate({name: 'mlk elementry'})
// const school = await School.create(
//   { name: "mlk elementry" },
//   { name: "mlk elementry" },
//   { upsert: true, new: true }
// ).exec();

// const student = await Student.create({
//   firstName: "Trisha",
//   school: school._id
// }).exec();
// const student = await Student.create({
//   firstName: "Mark",
//   school: school._id
// }).exec();

// const match = await Student.findById(student.id)
//   .populate("school")
//   .exec();
// const match = await Student.findOne({firstName: 'Trisha'})
//   .populate("school")
//   .exec();
// })
// .catch(e => console.error(e));
// Student model
// const student = new mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     faveFoods: [{ type: String }],
//     info: {
//       school: {
//         type: String
//       },
//       shoeSize: {
//         type: Number
//       }
//     },
//     school: {
//       type: mongoose.SchemaTypes.ObjectId,
//       required: true,
//       ref: "school"
//     }
//   },
//   { timestamps: true }
// );

// Student Example
// connect()
//   .then(async connection => {
//     const student = await Student.create({ firstName: "Tim" });
//     const found = Student.find({ firstName: "Tim" });
//     const foundById = Student.findById("adfdshfkj");
//     const updated = Student.findByIdAndUpdate("alkjdfh", {});
//     console.log(student);
//   })
//   .catch(e => console.error(e));

// wild card for find put {}
// second argument to schema can add createdAt and updatedAt
