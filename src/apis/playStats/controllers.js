const playStatsModal = require("./modals")

module.exports.getPuzzleStats = async (req, res) => {
  try {
    const puzzle = await PuzzleModal.findById(req.params.puzzleId);
    if (!puzzle || puzzle.visibility !== "public") {
      return res.status(404).json({ message: "Stats not available" });
    }

    const stats = await PlayStatsModal.findOne({ puzzleId: puzzle._id });
    return res.status(200).json({ stats: stats || null });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getMyPuzzleStats = async (req, res) => {
  try {
    const stats = await PlayStatsModel.find({ createdBy: req.userId });
    return res.status(200).json({ stats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};