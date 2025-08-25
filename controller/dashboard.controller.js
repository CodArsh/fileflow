const fileModel = require('../model/file.model')
const { default: mongoose } = require('mongoose')
const fetchDashboard = async (req, res) => {
    try {

        const reports = await fileModel.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(req.user.id) }
            },
            {
                $group: {
                    _id: "$type",
                    total: { $sum: 1 }
                }
            },

        ])
        const finalReports = reports
            ?.filter(item => item?._id !== 'binary')
            ?.map(item =>
                item._id === "application"
                    ? { ...item, _id: "Docs" }
                    : item
            );

        res.status(200).json({ status: 200, data: finalReports })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = fetchDashboard