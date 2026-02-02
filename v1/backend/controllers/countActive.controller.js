const { getCount } = require("../services/getCount");

async function countActive(req, res) {
  try {
    const stats = await getCount();
    res.json(stats);
  } catch (err) {
    console.error("Error fetching counts:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { countActive };
