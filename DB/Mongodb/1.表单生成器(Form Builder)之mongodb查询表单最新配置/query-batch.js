db.getCollection('ConfigData').aggregate([{
    $match: {
        $or: [{
                FormId: 'CarInfo',
                Level1: null,
                Level2: null,
                Level3: null
            },
            {
                FormId: 'CarInfo',
                Level1: "pineapple",
                Level2: null,
                Level3: null,
            },
            {
                FormId: 'CarInfo',
                Level1: "pineapple",
                Level2: "koala",
                Level3: null
            },
            {
                FormId: 'CarInfo',
                Level1: "pineapple",
                Level2: "koala",
                Level3: "cucumber"
            },

            {
                FormId: 'DispatchRecord',
                Level1: null,
                Level2: null,
                Level3: null
            },
            {
                FormId: 'DispatchRecord',
                Level1: "apple",
                Level2: null,
                Level3: null
            },
            {
                FormId: 'DispatchRecord',
                Level1: "apple",
                Level2: "sheep",
                Level3: null
            },
            {
                FormId: 'DispatchRecord',
                Level1: "apple",
                Level2: "sheep",
                Level3: "cabbage"
            }
        ]
    },
}, {
    $sort: {
        CreateDate: -1
    }
}, {
    $group: {
        _id: {
            FormId: "$FormId",
            Level1: "$Level1",
            Level2: "$Level2",
            Level3: "$Level3",
        },
        latestRecord: {
            $first: "$$ROOT"
        }
    }
}, {
    $sort: {
        _id: -1
    }
}, {
    $replaceRoot: {
        newRoot: "$latestRecord"
    }
}, {
    $group: {
        _id: {
            FormId: "$FormId"
        },
        items: {
            $push: "$$ROOT"
        }
    }
}, {
    $project: {
        _id: 0,
        FormId: '$_id.FormId',
        latestConfig: {
            $arrayElemAt: ["$items", 0]
        }
    }
}]);