const validLevels = ["low", "medium", "high"];

class Validator {
  static payloadValidate(payloadData) {
    let returnData = {
      error: false,
      message: "Validation Successful",
    };

    if (
      !payloadData.hasOwnProperty("title") ||
      payloadData.title.trim() == ""
    ) {
      returnData.error = true;
      returnData.message = "Title is required and cannot be empty.";
    } else if (
      !payloadData.hasOwnProperty("description") ||
      payloadData.description.trim() == ""
    ) {
      returnData.error = true;
      returnData.message = "Description is required and cannot be empty.";
    } else if (
      !payloadData.hasOwnProperty("level") ||
      !validLevels.includes(payloadData.level)
    ) {
      returnData.error = true;
      returnData.message =
        "Level is required and must be one of: low, medium, high.";
    } else if (
      !payloadData.hasOwnProperty("isComplete") ||
      typeof payloadData.isComplete !== "boolean"
    ) {
      returnData.error = true;
      returnData.message = "isComplete is required and must be a boolean value.";
    }
    else {     
      // allows only 4 keys (title, description, level, isComplete) throws error more than that
      const payload = Object.keys(payloadData);
      if (payload.length > 4) {
        returnData.error = true;
        returnData.message = "Invalid payload. Additional properties found in the task info.";
      }
    }


    return returnData;
  }
}

module.exports = Validator;
