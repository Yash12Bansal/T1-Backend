const express = require("express");

const router = express.Router();

const predController = require("../controller/prediction_controller");

router.post("/entry", predController.addPrediction);
router.post("/updateParamsAndroid", predController.updateParamsAndroid);
router.post(
  "/updateParamsBackend",
  predController.updateParamsFromBackendTraining
);
router.post("/extraDetails", predController.addExtraDetails);
router.get("/predictionStatus/:email", predController.getPredictionStatus);
router.post("/accepted",predController.acceptPrediction);
router.post("/rejected",predController.rejectPrediction);
router.get("/getPredictionParams/:email",predController.getPredictionParams);
module.exports = router;
