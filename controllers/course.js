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

// async function updateCourse(req, res) {}

// async function deleteCourse(req, res) {}

module.exports = {
  createCourse,
};
