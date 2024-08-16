const express = require("express");
const CourseController = require("../controllers/course");
const md_auth = require("../middlewares/authenticate");
const multiparty = require("connect-multiparty");

const md_upload = multiparty({ uploadDir: "./uploads/course" });
const api = express.Router();

api.post(
  "/courses/new",
  [md_auth.assureAuth, md_upload],
  CourseController.createCourse
);
api.get("/courses", CourseController.getCourses);
api.patch(
  "/courses/:id",
  [md_auth.assureAuth, md_upload],
  CourseController.updateCourse
);
api.delete("/courses/:id", [md_auth.assureAuth], CourseController.deleteCourse);

module.exports = api;
