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
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const courses = await Course.paginate({}, options);
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

async function updateCourse(req, res) {
  const { id } = req.params;

  const courseData = req.body;

  if (req.files.miniature) {
    const imagePath = image.getImagePath(req.files.miniature);
    courseData.miniature = imagePath;
  } else {
    delete courseData.miniature;
  }

  try {
    const courseStored = await Course.findByIdAndUpdate(
      { _id: id },
      courseData
    );
    if (courseStored) {
      res.status(200).send({ msg: "Course updated successfully" });
    } else {
      res.status(404).send({ msg: "Error while updating the course" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error while updating the course", error });
  }
}

async function deleteCourse(req, res) {
  const { id } = req.params;

  try {
    const response = await Course.findByIdAndDelete({ _id: id });
    if (response) {
      res.status(200).send({ msg: "Course deleted successfully" });
    } else {
      res
        .status(404)
        .send({ msg: "Error while deleting the course, course not found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Error while deleting the course", error });
  }
}

module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
};
