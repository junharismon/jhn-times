module.exports = {
    errorHandler: async (error, req, res, next) => {
        console.log(error, '<<<');
        switch (error.name) {
            case "InvalidUser":
                res.status(400).json({ message: "Invalid email/password" })
                break;
            case "email/password is required":
                res.status(400).json({ message: "email/password is required" })
                break;
            case "InvalidToken":
                res.status(403).json({ message: "Invalid token" })
                break;
            case "JsonWebTokenError":
                res.status(403).json({ message: "Invalid token" })
                break;
            case "DataNotFound":
                res.status(404).json({ message: "Data not found" })
                break;
            case "SequelizeValidationError":
                res.status(404).json({ message: error.errors[0].message })
                break;
            default:
                res.status(500).json({ message: "Internal server error" })
        }
    }
}