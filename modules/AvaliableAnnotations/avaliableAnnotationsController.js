const slugify = require("slugify");

const AvaliableAnnotations = require("./AvaliableAnnotations");

const handleValidator = require("../../utils/handleValidator");
const handleError = require("../../utils/handleError");

// @desc      Get list avaliable annotations
// @route     GET /api/v1/avaliable-annotation
// @access    Private (Admin)
module.exports.list = async (req, res, next) => {
  try {
    handleValidator(req);

    const list = await AvaliableAnnotations.find();

    res.status(201).json({
      success: true,
      data: { list },
      msg: "Alaliable annotations list "
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Create avaliable annotation
// @route     POST /api/v1/avaliable-annotation
// @access    Private (Admin)
module.exports.create = async (req, res, next) => {
  try {
    handleValidator(req);
    let { name } = req.body;
    let slugifyText = slugify(name);

    // Check if avaliable annotation already exists
    let avaliableAnnotation = await AvaliableAnnotations.findOne({
      slugify: slugifyText
    });
    if (avaliableAnnotation)
      handleError({
        msg: "Avaliable annotation already exists",
        statusCode: 404
      });

    // Create new
    avaliableAnnotation = await AvaliableAnnotations.create({
      name,
      slugify: slugifyText
    });

    res.status(201).json({
      success: true,
      data: { avaliableAnnotation },
      msg: "New alaliable annotations added "
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Update avaliable annotation
// @route     PUT /api/v1/avaliable-annotation/:slugifyText
// @access    Private (Admin)
module.exports.update = async (req, res, next) => {
  try {
    handleValidator(req);

    const { slugifyText } = req.params;
    const { name } = req.body;

    // Check if avaliable annotation already exists
    let avaliableAnnotation = await AvaliableAnnotations.findOne({
      slugify: slugify(name)
    });
    if (avaliableAnnotation)
      handleError({
        msg: "Avaliable annotation already exists",
        statusCode: 404
      });

    // Update
    avaliableAnnotation = await AvaliableAnnotations.findOneAndUpdate(
      { slugify: slugifyText },
      { name, slugify: slugify(name) },
      {
        new: true
      }
    );

    if (!avaliableAnnotation)
      handleError({ msg: "Annotation not found by name", statusCode: 404 });

    res.status(200).json({
      success: true,
      data: { avaliableAnnotation },
      msg: "Alaliable annotations updated "
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Remove avaliable annotation
// @route     DELETE /api/v1/avaliable-annotation?name=example
// @access    Private (Admin)
module.exports.delete = async (req, res, next) => {
  try {
    handleValidator(req);

    const { slugifyText } = req.params;
    const avaliableAnnotation = await AvaliableAnnotations.findOne({
      slugify: slugifyText
    });

    if (!avaliableAnnotation)
      handleError({ msg: "Annotation not found by name", statusCode: 404 });

    await avaliableAnnotation.remove();

    res.status(200).json({
      success: true,
      data: {},
      msg: "Avaliable annotations removed "
    });
  } catch (error) {
    next(error);
  }
};
