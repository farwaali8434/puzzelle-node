import PuzzleModal from "./modals";
module.exports.createPuzzle = async (req, res) => {
  try {
    const source =
      req.userId === process.env.ADMIN_USER_ID ? "puzzelle" : "user";
    const puzzle = await PuzzleModal.create({
      ...req.body,
      userId: req.userId,
      source: source,
      plays: 0,
    });
    return res.status(201).json({ message: "Puzzle created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getPuzzleById = async (req, res) => {
  try {
    const puzzle = await PuzzleModel.findById(req.params.id);

    if (!puzzle) {
      return res.status(404).json({ message: "Puzzle not found" });
    }

    const isGift = puzzle.gift === true;
    const isPublic = puzzle.visibility === "public";
    const isOwner = req.userId && puzzle.userId.toString() === req.userId;

    if (isGift || isPublic || isOwner) {
      return res.status(200).json(puzzle);
    }

    return res.status(403).json({ message: "You cannot access this puzzle" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getAllPuzzles = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const sortMap = {
      "most-played": { "stats.attempts": -1 },
      newest: { createdAt: -1 },
    };
    const sortStage = sortMap[req.query.sort] || sortMap.newest;

    const match = {
      visibility: "public",
      status: "approved",
      deletedAt: null,
    };

    if (req.query.search) {
      match["$or"] = [
        { name: { $regex: req.query.search, $options: "i" } },
        { tags: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const query = [
      { $match: match },
      {
        $lookup: {
          from: "playstats",
          foreignField: "puzzleId",
          localField: "_id",
          as: "stats",
        },
      },
      { $unwind: { path: "$stats", preserveNullAndEmptyArrays: true } },
      {
        $facet: {
          data: [
            { $sort: sortStage },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                image: 1,
                name: 1,
                tags: 1,
                cut: 1,
                pieces: 1,
                "stats.attempts": 1,
              },
            },
          ],
          total: [{ $count: "count" }],
        },
      },
    ];

    const result = await PuzzleModel.aggregate(query);
    const data = result[0].data || [];
    const total = result[0].total[0]?.count || 0;

    return res.status(200).json({ data, total });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getMyPuzzles = async (res, req) => {
  try {
    const limit = parseInt(res.query.limit) || 20;
    const page = parseInt(res.query.page) || 1;
    const skip = (page - 1) * limit;
    let query = [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.userId),
          deletedAt: null,
        },
      },
      {
        $lookup: {
          from: "playstats",
          foreignField: "puzzleId",
          localField: "_id",
          as: "stats",
        },
      },
      { $unwind: { path: "$stats", preserveNullAndEmptyArrays: true } },
      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          total: [{ $count: "count" }],
        },
      },
    ];
    const result = await PuzzleModel.aggregate(query);
    const data = result[0].data || [];
    const total = result[0].total[0]?.count || 0;

    return res.status(200).json({ data, total });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.editPuzzle = async (req, res) => {
  try {
    let puzzle = await PuzzleModal.findById(req.params.id);
    if (!puzzle || puzzle.deletedAt !== null) {
      return res.status(404).json("Puzzle not found");
    }
    let isOwner = puzzle?.userId.toString() === req.userId;
    if (!isOwner) {
      return res.status(403).json({ message: "Unauthorised access" });
    }
    let updatedPuzzle = await PuzzleModal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, timestamps: true },
    );
    return res.status(200).json({ puzzle: updatedPuzzle });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.softDeletePuzzle = async (req, res) => {
  try {
    let puzzle = await PuzzleModal.findById(req.params.id);
    if (!puzzle || puzzle.deletedAt != null) {
      return res.status(404).json("Puzzle not found");
    }
    let isOwner = puzzle?.userId.toString() === req.userId;
    if (!isOwner) {
      return res.status(403).json({ message: "Unauthorised access" });
    }
    let deletedDate = new Date();
    puzzle.deletedAt = deletedDate;
    await puzzle.save();
    return res.status(200).json({ message: "Puzzle is deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
