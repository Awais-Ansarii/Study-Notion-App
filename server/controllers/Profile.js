const Profile = require("../models/Profile");
const User = require("../models/User");



//update already existing profile
exports.updateProfile = async (req, res) => {
  try {
    //get data
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    //get userId
    const id = req.user.id;
    //validation
    if (!contactNumber || !gender || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //find profile 
    const userDetails = await User.findById(id); // user Id
    const profileId = userDetails.additionalDetails; //profile Id
    const profileDetails = await Profile.findById(profileId); // profile data  

    //update profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();


    //return response
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      data : profileDetails,
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//deleteAccount
//Explore -> how can we schedule this deletion operation // 5din bad delete karo || crown job
exports.deleteAccount = async (req, res) => {
  try {
    //get id
    const id = req.user.id;
    //validation
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //delete profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    //TOOD:  unenroll user form all enrolled courses

    //delete user
    await User.findByIdAndDelete({ _id: id });

    //return response
    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be deleted successfully",
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    //get id
    const id = req.user.id;  //login h to token se id nikal lo

    //validation
    if (!id) {
      return res.status(400).json({
      success: false,
      message: "User ID not found",
    });
    }
    
    // get user details
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    //return response
    return res.status(200).json({
      success: true,
      message: "User Data Fetched Successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: "Error while fetching User Data ",
    });
  }
};
