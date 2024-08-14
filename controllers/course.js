const Course = require("../models/course");
const image = require("../utils/image");

async function createCourse(req, res) {
  const course = new Course(req.body);

  if (req.files.miniature) {
    const imagePath = image.getImagePath(req.files.miniature);
    course.miniature = imagePath;
  }

  try {
    const courseStored = await course.save();
    if (courseStored) {
      res.status(200).send({ msg: "Course created successfully" });
    } else {
      res.status(400).send({ msg: "Error while creating the Course" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error while creating the Course", error });
  }
}

async function getCourses(req, res) {
  try {
    const courses = await Course.find();
    if (courses) {
      res.status(200).send(courses);
    } else {
      res.status(404).send({ msg: "Error while retrieving all the courses" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Error while retrieving all the courses", error });
  }
}

module.exports = {
  createCourse,
  getCourses,
};
