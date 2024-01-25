const Category = require("../models/Category");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const dotenv = require("dotenv");
dotenv.config();

//course create krne ki api bnana hai
//course create ka handler fn

exports.createCourse = async (req, res) => {
  try {
    //fetch data from req ki body

    const {
      whatYouWillLearn,
      courseName,
      courseDescription,
      price,
      tag,
      category,
    } = req.body;

    //fetch image thumbnail from req ki files
    const thumbnail = req.files.thumbnailImage;

    //validation of input data
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !tag ||
      !category ||
      !price ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required. ",
      });
    }

    //validation of instructor
    const userId = req.user.id; //through login auth
    const instructorDetalis = await User.findById(userId);

    console.log("instructorDetalis ", instructorDetalis);
    //TODO: Verify that userId and instructorDetails._id  are same or different ?
    if (!instructorDetalis) {
      return res.status(404).json({
        success: false,
        message: "instructor details not found. ",
      });
    }
    //category validation - check given category is valid or not
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details not found",
      });
    }

    //Upload Image top Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create an entry for new Course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id, //for this,we make db call to get instructor
      whatYouWillLearn: whatYoutWillLearn,
      price,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    console.log("newCourse ", newCourse);

    //add the new course to the user schema of Instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    //update the Category ka schema
    //TODO:
    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    //return response
    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      data: newCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating a new course, try again ",
      error: error.message,
    });
  }
};

//sare course lane ki api bnao
//getAllCourse handler

exports.showAllCourses = async (req, res) => {
  try {
    //TODO: change the below statement incrementally
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        instructor: true,
        thumbnail: true,
        courseContent: true,
      }
    )
      .populate("instructor")
      .exec();
    console.log("all courses ", allCourses);

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot Fetch course data",
      error: error.message,
    });
  }
};

//getCourseDetails handler

exports.getCourseDetails = async (req, res) => {
  try {
    //get id
    const { courseId } = req.body;
    //find course details
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndreviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    //validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }
    //return response
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
