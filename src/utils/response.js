exports.success = (res, message = "Success", data) => {
    res.status(200).json({ message, data });
};

exports.error = (res, message = "Error", data) => {
    res.status(400).json({ message, data });
};