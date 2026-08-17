const { PlayDataModal } = require("./modals");

module.exports.createPlay = async (req, res) => {
  try {
    const { playerType, sessionId, puzzleId } = req.body;

    const puzzle = await PuzzleModal.findById(puzzleId);
    if (!puzzle) {
      return res.status(404).json({ message: "Puzzle not found" });
    }

    const playData = {
      status: "started",
      puzzleId: puzzle._id,
      createdBy: puzzle.userId,
      playerType,
    };

    if (playerType === "registered") {
      playData.playerId = req.userId;
    } else {
      playData.sessionId = sessionId;
    }

    const play = await PlayDataModal.create(playData);

    return res.status(201).json({ id: play._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getPlay = async (req, res) => {
  try {
    const { sessionId, puzzleId } = req.query;
    const findPlayData = {
      status: "started",
      puzzleId,
    };
    if (req.playerType === "registered") {
      findPlayData.playerId = req.userId;
    } else {
      findPlayData.sessionId = sessionId;
    }
    const play = await PlayDataModal.findOne(findPlayData);
    if (!play) {
      return res.status(200).json({ play: null });
    }
    return res.status(200).json(play);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.updatePlay = async (req, res) => {
  try {
    const play = await PlayDataModal.findById(req.params.id);
    if (!play) {
      return res.status(404).json({ message: "Play not found" });
    }

    const isOwner =
      req.playerType === "registered"
        ? play.playerId?.toString() === req.userId
        : play.sessionId === req.body.sessionId;

    if (!isOwner) {
      return res.status(403).json({ message: "Unauthorised access" });
    }

    const updateData = {
      $inc: { duration: req.body.duration, resumeCount: 1 },
    };

    if (req.body.status === "completed") {
      updateData.$set = { status: "completed" };
      // TODO: trigger playStats update — completions, totalDuration, avgSolveTime, fastestTime
    }

    if (req.body.status === "abandoned") {
      updateData.$set = { status: "abandoned", hiddenAt: new Date() };
    }

    const updatedPlay = await PlayDataModal.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    return res.status(200).json({ play: updatedPlay });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.myPlays = async (req, res) => {
  try {
    const query = [
      {
        $match: {
          playerId: new mongoose.Types.ObjectId(req.userId),
          status: req.query.status,
          hiddenAt: null,
        },
      },
      {
        $lookup: {
          from: "puzzles",
          localField: "puzzleId",
          foreignField: "_id",
          as: "puzzle",
        },
      },
      { $unwind: "$puzzle" },
    ];

    const myPlays = await PlayDataModal.aggregate(query);

    return res.status(200).json({ plays: myPlays });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
