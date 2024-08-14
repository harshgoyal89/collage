const { BadRequestError, NotFoundError } = require("../errors");
const Category = require("../models/Category");
const Course = require("../models/Course");

// Handler for creating a category
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    // Validate request
    if (!name || !description) {
      throw new BadRequestError("Provide both name and description");
    }

    // Create a new category in the database
    const category = await Category.create({ name, description });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// Handler for getting all categories
exports.showAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find(
      {},
      { name: true, description: true }
    );

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// Handler for getting category page details
exports.categoryPageDetails = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    // Get courses for the specified category ID
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();
    if (!selectedCategory) {
      throw new NotFoundError("Courses for selected category not found");
    }

    // Get different categories (excluding the selected category)
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    // Get top-selling courses
    const topSellingCourses = await Course.find({ status: "published" })
      .sort({ studentsEnrolled: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
        topSellingCourses,
      },
    });
  } catch (error) {
    next(error);
  }
};
