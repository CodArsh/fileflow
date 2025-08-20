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
        res.status(200).json({ status: 200, data: reports })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = fetchDashboard