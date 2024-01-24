const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, courseId } = req.body;
    //data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }
    //create section
    const newSection = await Section.create({ sectionName });
    //update course with section ObjectID of new section
      const updatedCourseDetails = await Course.findByIdAndUpdate(
          courseId,
          {
              $push: {
                  courseContent: newSection._id,
              },
          },
          { new: true }
      );
    //   .populate("courseContent")
    //   .exec();


// You can use array syntax:
    //   let results = await OrderModel.find().populate(['user', 'meal']);
      
// You can also select which properties you want from each populate:
// let results = await OrderModel.find().populate([{path: 'user', select: 'firstname'}, {path: 'meal', select: 'name'}]);
    //HW: use populate to replace sections/sub-sections both in the updatedCourseDetails

    //return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      data: updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create Section, please try again",
      error: error.message,
    });
  }
};

//update the section api
exports.updateSection = async (req, res) => {
  try {
    //data input
    const { sectionName, sectionId } = req.body;
    //data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    //update data
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    //return res
    return res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update Section, please try again",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    //get ID - assuming that we are sending ID in params
    const { sectionId } = req.params;
    //use findByIdandDelete
    await Section.findByIdAndDelete(sectionId);
    //TODO[Testing]: do we need to delete the entry from the course schema ??
    //return response
    return res.status(200).json({
      success: true,
      message: "Section Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete Section, please try again",
      error: error.message,
    });
  }
};
