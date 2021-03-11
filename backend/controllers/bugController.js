import asyncHandler from "express-async-handler";
import Bug from "../models/bugModel.js";

//@desc     Get all user bugs
//@route    GET /api/bugs
//@access   Private
const getUserBugs = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Bug.countDocuments({ ...keyword, user: req.user._id });
  const bugs = await Bug.find({ ...keyword, user: req.user._id })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ bugs, page, pages: Math.ceil(count / pageSize) });
});

//@desc     Create new bug issue
//@route    POST /api/bugs
//@access   Private
const postCreateBug = asyncHandler(async (req, res) => {
  const bug = new Bug({
    user: req.user._id,
    title: "",
    reproSteps: "",
    type: "Bug",
    project: "",
    desc: "",
    status: "New",
    assignmentTo: "",
    priority: 4,
    severity: "1 - Critical",
    originalEstimate: 0,
    remaining: 0,
    hoursSpent: 0,
    levelOfEffort: 0,
  });

  await bug.save();
  res.status(201).json(bug);
});

//@desc     Get bug details by ID
//@route    GET /api/bugs/:id
//@access   Private
const getBugDetails = asyncHandler(async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  if (bug) {
    return res.json(bug);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

//@desc     Update a bug by ID
//@route    PUT /api/bugs/:id
//@access   Private
const putBugById = asyncHandler(async (req, res) => {
  const {
    title,
    project,
    type,
    reproSteps,
    desc,
    status,
    assignmentTo,
    priority,
    severity,
    originalEstimate,
    remaining,
    hoursSpent,
    levelOfEffort,
  } = req.body;

  const bug = await Bug.findById(req.params.id);

  if (bug) {
    bug.title = title;
    bug.project = project;
    bug.type = type;
    bug.reproSteps = reproSteps;
    bug.desc = desc;
    bug.status = status;
    bug.assignmentTo = assignmentTo;
    bug.priority = priority;
    bug.severity = severity;
    bug.originalEstimate = originalEstimate;
    bug.remaining = remaining;
    bug.hoursSpent = hoursSpent;
    bug.levelOfEffort = levelOfEffort;

    const updatedBug = await bug.save();
    res.json(updatedBug);
  } else {
    res.status(404);
    throw new Error("Bug not found");
  }
});

//@desc     Delete a bug by ID
//@route    DELETE /api/bugs/:id
//@access   Private
const deleteBugById = asyncHandler(async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  if (bug) {
    await bug.remove();
    res.json({ message: "Item Removed!" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

//@desc     Create a note
//@route    POST /api/bugs/:id/notes
//@access   Private
const postCreateBugNote = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const bug = await Bug.findById(req.params.id);
  if (bug) {
    // create the note
    const itemNote = {
      comment,
      user: req.user._id,
    };
    // add note to notes array
    bug.notes.push(itemNote);
    // save it
    await bug.save();
    // send it
    res.status(201).json({ message: "Note Added" });
  } else {
    res.status(404);
    throw new Error("Bug not found");
  }
});

//@desc     Delete note by ID
//@route    DELETE /api/bugs/:id/:noteId
//@access   Private
const deleteBugNoteById = asyncHandler(async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  if (bug) {
    // get the note by id
    const foundNote = bug.notes.find((x) => x.id === req.params.note_id);

    // check for comment
    if (!foundNote) {
      res.status(404);
      throw new Error("Note doesn't exist");
    }
    // remove that note from the array
    var notesArray = bug.notes;
    for (var i = 0; i < notesArray.length; i++) {
      if (notesArray[i] === foundNote) {
        notesArray.splice(i, 1);
      }
    }
    // save "new" bug
    await bug.save();
    res.status(201).json({ message: "Note removed!" });
  } else {
    res.status(404);
    throw new Error("Bug not found...");
  }
});

//@desc     Update note by ID
//@route    PUT /api/bugs/:id/:noteId
//@access   Private
// TODO: Make this feature work.
const putBugNoteById = asyncHandler(async (req, res) => {
  // get comment body from req.body
  const { comment } = req.body;

  // get the item
  const item = await Bug.findById(req.params.id);

  // get the note by id
  const foundNote = bug.notes.find((x) => x.id === req.params.note_id);

  // error check bug
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  } else {
    // replace old comment with new
    var notesArray = bug.notes;
    for (var i = 0; i < notesArray.length; i++) {
      if (notesArray[i] === foundNote) {
        notesArray[i].comment = comment;
      }
    }
    // save it
    const newComment = await item.save();
    // ship it
    res.json(newComment);
  }
});

export {
  getUserBugs,
  postCreateBug,
  getBugDetails,
  deleteBugById,
  putBugById,
  postCreateBugNote,
  deleteBugNoteById,
  putBugNoteById,
};
