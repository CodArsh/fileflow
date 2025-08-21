const fileModel = require('../model/file.model')

const fetchDashboard = async (req, res) => {
    try {

        const reports = await fileModel.aggregate([
            {
                $group: {
                    _id: "$type",
                    total: { $sum: 1 }
                }
            }
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