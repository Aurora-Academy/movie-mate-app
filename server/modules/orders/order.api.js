const router = require("express").Router();
const orderController = require("./order.controller");
const { secure } = require("../../utils/secure");

router.get("/", secure(), async (req, res, next) => {
  try {
    const { page, limit, showAll } = req.query;
    const search = {
      id: showAll && req.isAdmin ? "" : req.currentUser,
    };
    const result = await orderController.list({ page, limit, search });
    res.json({ msg: "List all orders", data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/", secure(), async (req, res, next) => {
  try {
    const result = await orderController.create(req.body);
    res.json({ msg: "Created one order", data: result });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", secure(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await orderController.getById(id);
    res.json({ msg: `Get one Order by ${id}`, data: result });
  } catch (e) {
    next(e);
  }
});

router.patch("/:id/status", secure(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    req.body.approvedBy = req.currentUser;
    const result = await orderController.changeStatus(id, req.body);
    res.json({ msg: `Change status of one Order by ${id}`, data: result });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", secure(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await orderController.updateById(id, req.body);
    res.json({ msg: `updated one Order by ${id}`, data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
