const express = require("express");

const users = require("../utils/users");
const userRouter = require("./user");
const groupRouter = require("./group");
const boxRouter = require("./box");
const threadRouter = require("./thread");
const commentRouter = require("./comment");
const notificationRouter = require("./notification");
const searchRouter = require("./search");
const reportRouter = require("./report");

const isPath = function (url, sample) {
	return url.startsWith(sample + "/") || url == sample;
}

module.exports = function (app) {
	// middleware app
	app.use(async (req, res, next) => {
		console.log("Middleware");
		let denied = false;
		if (isPath(req.url, "/users/login") || isPath(req.url, "/users/forgot-password") || isPath(req.url, "/users/reset-password")) denied = false;
		else {
			console.log('check user exist')
			console.log(req.cookies.token)
			let user = await users.findUserById(req, true);
			if (user == null) denied = true;
		}

		console.log("Denied: ", req.url, denied);

		if (denied) {
			res.status(403).json({
				error: "Access denied!."
			});
		}
		else next();
	});

	// setup routes
	app.use("/users", userRouter);
	app.use("/group", groupRouter);
	app.use("/box", boxRouter);
	app.use("/thread", threadRouter);
	app.use("/report", reportRouter);
	app.use("/comment", commentRouter);
	app.use("/notification", notificationRouter);
	app.use("/search", searchRouter);
	// setup ultimate ending for all routes
	app.all("*", (req, res) => {
		res.status(404).json({ error: "Not found" });
	});
}