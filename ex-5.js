db.loans
  .aggregate([
    {
      $match: {
        status: "RETURNED",
        returnedAt: {
          $gte: ISODate("2026-03-01T00:00:00Z"),
          $lt: ISODate("2026-05-01T00:00:00Z"),
        },
      },
    },
    {
      $lookup: {
        from: "equipments",
        localField: "equipmentId",
        foreignField: "_id",
        as: "equipment",
      },
    },
    {
      $unwind: "$equipment",
    },
    {
      $match: {
        "equipment.archived": false,
      },
    },
    {
      $addFields: {
        period: {
          $dateToString: {
            format: "%Y-%m",
            date: "$returnedAt",
            timezone: "UTC",
          },
        },
      },
    },
    {
      $group: {
        _id: {
          period: "$period",
          category: "$equipment.category",
        },
        loanCount: { $sum: 1 },
        revenueCents: { $sum: "$feeCents" },
      },
    },
    {
      $project: {
        _id: 0,
        period: "$_id.period",
        category: "$_id.category",
        loanCount: 1,
        revenueCents: 1,
      },
    },
    {
      $sort: {
        period: 1,
        revenueCents: -1,
        category: 1,
      },
    },
  ])
  .toArray();
