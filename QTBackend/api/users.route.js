import express from "express";
import UsersCtrl from "./users.controller.js";

const router = express.Router();

router.route("/").get(UsersCtrl.apiGetUsers).post(UsersCtrl.apiCreateUser);

router
  .route("/:username")
  .get(UsersCtrl.apiGetUserByUsername)
  .put(UsersCtrl.apiChangeUserProfile);

router
  .route("/supertokens/:supertokensId")
  .get(UsersCtrl.apiGetUserBySuperTokensId);

router
  .route("/:username/templates")
  .get(UsersCtrl.apiGetUserTemplates)
  .post(UsersCtrl.apiAddTemplateToProfile);

router
  .route("/:username/templates/:templateId")
  .get(UsersCtrl.apiGetTrackingTemplate)
  .put(UsersCtrl.apiTrackTemplate)
  .delete(UsersCtrl.apiRemoveTrackingTemplateFromProfile);

export default router;
