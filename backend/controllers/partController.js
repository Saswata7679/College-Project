const Part = require("../models/partModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Part -- Admin
exports.createPart = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "parts",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const part = await Part.create(req.body);

  res.status(201).json({
    success: true,
    part,
  });
});

// Get All Part
exports.getAllParts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const partsCount = await Part.countDocuments();

  const apiFeature = new ApiFeatures(Part.find(), req.query)
    .search()
    .filter();

  let parts = await apiFeature.query;

  let filteredPartsCount = parts.length;

  apiFeature.pagination(resultPerPage);

  parts = await apiFeature.query;

  res.status(200).json({
    success: true,
    parts,
    partsCount,
    resultPerPage,
    filteredPartsCount,
  });
});

// Get All Part (Admin)
exports.getAdminParts = catchAsyncErrors(async (req, res, next) => {
  const parts = await Part.find();

  res.status(200).json({
    success: true,
    parts,
  });
});

// Get Part Details
exports.getPartDetails = catchAsyncErrors(async (req, res, next) => {
  const part = await Part.findById(req.params.id);

  if (!part) {
    return next(new ErrorHander("Part not found", 404));
  }

  res.status(200).json({
    success: true,
    part,
  });
});

// Update Part -- Admin

exports.updatePart = catchAsyncErrors(async (req, res, next) => {
  let part = await Part.findById(req.params.id);

  if (!part) {
    return next(new ErrorHander("Part not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < part.images.length; i++) {
      await cloudinary.v2.uploader.destroy(part.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "parts",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  part = await Part.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    part,
  });
});

// Delete Part

exports.deletePart = catchAsyncErrors(async (req, res, next) => {
  const part = await Part.findById(req.params.id);

  if (!part) {
    return next(new ErrorHander("Part not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < part.images.length; i++) {
    await cloudinary.v2.uploader.destroy(part.images[i].public_id);
  }

  await part.remove();

  res.status(200).json({
    success: true,
    message: "Part Deleted Successfully",
  });
});

// Create New Review or Update the review
exports.createPartReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, partId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const part = await Part.findById(partId);

  const isReviewed = part.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    part.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    part.reviews.push(review);
    part.numOfReviews = part.reviews.length;
  }

  let avg = 0;

  part.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  part.ratings = avg / part.reviews.length;

  await part.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a part
exports.getPartReviews = catchAsyncErrors(async (req, res, next) => {
  const part = await Part.findById(req.query.id);

  if (!part) {
    return next(new ErrorHander("Part not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: part.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const part = await Part.findById(req.query.partId);

  if (!part) {
    return next(new ErrorHander("Part not found", 404));
  }

  const reviews = part.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Part.findByIdAndUpdate(
    req.query.partId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});