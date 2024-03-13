// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import {postsController} from "../controllers/posts.controller.js";
import {Router} from "express";

// ----------------------------------------------------------
// DECLARACION DE VARIABLES
// ----------------------------------------------------------

const router = Router();

// ----------------------------------------------------------
// ROUTE: "/posts/"
// ----------------------------------------------------------

router.get("/", postsController.read);

router.post("/", postsController.create);

// ----------------------------------------------------------
// ROUTE: "/posts/:id"
// ----------------------------------------------------------

router.get("/:id", postsController.readById);

router.put("/:id", postsController.update);

router.delete("/:id", postsController.remove);

// ----------------------------------------------------------
// EXPORTANDO
// ----------------------------------------------------------

export default router;






