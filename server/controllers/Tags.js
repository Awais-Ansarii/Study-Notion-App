const Tag = require('../models/Tag')
//ctag create krne ki api bnana hai
//tag create ka handler fn

exports.createTag = async (req, res) => {
    
    try {
        //fetch data from req ki body

        const { name, description } = req.body;

        //validation
        if (!name || !description) {
            return res.status(400).json({
              success: false,
              message: "All fields are required. ",
            });
        }

        //DB me entry karo
        const tagDetails = await Tag.create({
            name: name,
            description : description
        })

        console.log("tagDetails ", tagDetails);

        //return response
        res.status(200).json({
          success: true,
            message: "Tag created successfully",
          data:tagDetails
          
        });
    }

    catch (error) {
        res.status(500).json({
          success: false,
          message: "Error while creating a new tag, try again ",
          error: error.message,
        });
    }
}


//sare tags lane ki api bnao
//getAllTag handler

exports.showAllTags = async (req, res) => {
  try {
    //find tags in db
   const allTags =
       (await Tag.find({}, {
           name: true,
           description: true
       })) 
     console.log("all tags ", allTags);

    //return response
    res.status(200).json({
      success: true,
      message: "successfully returning all tags",
      data: allTags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching all tags details ",
      error: error.message,
    });
  }
}; 