const Testdrive = require("../models/testdriveModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



exports.createTestdrive = catchAsyncErrors(async (req, res, next) => {
    const testdrive = await Testdrive.create(req.body);
    res.status(201).json({
      success: true,
      testdrive,
    });
  });


exports.getAdminTestdrive = catchAsyncErrors(async (req, res, next) => {
    const testdrive = await Testdrive.find();
    res.status(200).json({
      success: true,
      testdrive,
    });
  });

  exports.deleteTestdrive = catchAsyncErrors(async (req, res, next) => {
    const test = await Testdrive.findById(req.params.id);
  
    if (!test) {
      return next(new ErrorHander("test drive request not found", 404));
    }
  
  
    await test.remove();
  
    res.status(200).json({
      success: true,
      message: "test drive request Deleted Successfully",
    });
  });