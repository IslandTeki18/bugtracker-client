import mongoose from "mongoose";

const bugSchema = mongoose.Schema({
  title: {
    type: String,
  },
  reproSteps: {
    type: String,
  },
  desc: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Resolved", "Closed", "Active", "New"],
    default: "New",
  },
  assignmentTo: {
    type: [String],
  },
  priority: {
    type: Number,
  },
  severity: {
    type: String,
    enum: ["1 - Critical", "2 - High", "3 - Medium", "4 - Low"],
  },
  originalEstimate: {
    type: Number,
    required: true,
  },
  remaining: {
    type: Number,
  },
  hoursSpent: {
    type: Number,
  },
  levelOfEffort: {
    type: Number,
  },
  comments: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    body: {
      type: String,
    },
  },
});

const Bug = mongoose.model("Bug", bugSchema);
export default Bug;
