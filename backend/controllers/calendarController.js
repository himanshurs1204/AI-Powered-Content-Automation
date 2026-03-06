// controllers/calendarController.js
// Controller for managing content calendar
import Calendar from "../models/Calendar.js";

// @route   POST /api/calendar
// @desc    Create calendar entry
// @access  Private
export const createCalendarEntry = async (req, res) => {
  try {
    const { title, platform, date, status, description, contentId } = req.body;

    if (!title || !platform || !date) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide all required fields",
        });
    }

    const calendarEntry = await Calendar.create({
      userId: req.user._id,
      title,
      platform,
      date,
      status: status || "Planned",
      description,
      contentId,
    });

    res.status(201).json({
      success: true,
      data: calendarEntry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/calendar
// @desc    Get all calendar entries for logged in user
// @access  Private
export const getCalendarEntries = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = { userId: req.user._id };

    // Filter by date range if provided
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    const entries = await Calendar.find(query)
      .populate("contentId", "type generatedContent")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/calendar/:id
// @desc    Update calendar entry
// @access  Private
export const updateCalendarEntry = async (req, res) => {
  try {
    let entry = await Calendar.findById(req.params.id);

    if (!entry) {
      return res
        .status(404)
        .json({ success: false, message: "Entry not found" });
    }

    // Check ownership
    if (entry.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    // Update fields
    const { title, platform, date, status, description, contentId } = req.body;
    if (title) entry.title = title;
    if (platform) entry.platform = platform;
    if (date) entry.date = date;
    if (status) entry.status = status;
    if (description) entry.description = description;
    if (contentId) entry.contentId = contentId;

    entry = await entry.save();

    res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   DELETE /api/calendar/:id
// @desc    Delete calendar entry
// @access  Private
export const deleteCalendarEntry = async (req, res) => {
  try {
    const entry = await Calendar.findById(req.params.id);

    if (!entry) {
      return res
        .status(404)
        .json({ success: false, message: "Entry not found" });
    }

    // Check ownership
    if (entry.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    await Calendar.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
