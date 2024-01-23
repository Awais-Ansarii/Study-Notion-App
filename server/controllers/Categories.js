const Category = require('../models/Category')
//ctag create krne ki api bnana hai
//tag create ka handler fn

exports.createCategory = async (req, res) => {
    
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
        const categoryDetails = await Category.create({
            name: name,
            description : description
        })

        console.log("categoryDetails ", categoryDetails);

        //return response
        res.status(200).json({
          success: true,
            message: "Category created successfully",
          data:tagDetails
          
        });
    }

    catch (error) {
        res.status(500).json({
          success: false,
          message: "Error while creating a new Category, try again ",
          error: error.message,
        });
    }
}


//sare tags lane ki api bnao
//getAllTag handler

exports.showAllCategories = async (req, res) => {
  try {
    //find tags in db
   const allCategories = await Tag.find(
     {},
     {
       name: true,
       description: true,
     }
   ); 
     console.log("all Categories ", allCategories);

    //return response
    res.status(200).json({
      success: true,
      message: "successfully returning all Categories",
      data: allCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching all Categories details ",
      error: error.message,
    });
  }
}; 