// controllers/contentController.js
// Controller for managing saved content
import Content from "../models/Content.js";

// @route   GET /api/content
// @desc    Get all content for logged in user
// @access  Private
export const getAllContent = async (req, res) => {
  try {
    const { type } = req.query; // Optional filter by type

    let query = { userId: req.user._id };

    // Filter by type if provided
    if (type) {
      query.type = type;
    }

    const content = await Content.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: content.length,
      data: content,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/content/:id
// @desc    Get single content
// @access  Private
export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found" });
    }

    // Check ownership
    if (content.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   DELETE /api/content/:id
// @desc    Delete content
// @access  Private
export const deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found" });
    }

    // Check ownership
    if (content.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    await Content.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/content/stats
// @desc    Get content statistics
// @access  Private
export const getContentStats = async (req, res) => {
  try {
    const stats = await Content.aggregate([
      {
        $match: { userId: req.user._id },
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
