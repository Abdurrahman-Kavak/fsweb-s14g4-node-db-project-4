const express = require("express");
const Tarif = require("./tarif-model");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const tarif = await Tarif.idyeGoreTarifGetir(req.params.id);
    if (!tarif) {
      res.status(404).json({ message: "Tarif bulunamadı" });
    } else {
      res.status(200).json(tarif);
    }
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
