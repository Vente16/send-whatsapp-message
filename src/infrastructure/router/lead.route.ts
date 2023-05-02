import express, { Router } from "express";
import LeadCtrl from "../controller/lead.ctrl";
import { validateLead } from "../validations/middlewares";
import { sendMessagesSchema } from "../validations/schemas/lead.schemas";
import container from "../ioc";
const router: Router = Router();

/**
 * http://localhost/lead POST
 */
const leadCtrl: LeadCtrl = container.get("lead.ctrl");
router.post("/", validateLead(sendMessagesSchema), leadCtrl.sendCtrl);

export { router };
