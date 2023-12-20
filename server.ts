import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import { createRequestHandler } from "@remix-run/express";
import type { ServerBuild } from "@remix-run/node";
import { broadcastDevReady, installGlobals } from "@remix-run/node";

import type { RequestHandler } from "express";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import sourceMapSupport from "source-map-support";

import slashes from "connect-slashes";
import * as process from "process";

sourceMapSupport.install();
installGlobals();
run();

async function run() {
  const BUILD_PATH = path.resolve("build/index.js");
  const VERSION_PATH = path.resolve("build/version.txt");
  const MODE = process.env.NODE_ENV;

  if (!MODE) {
    console.log("NODE_ENV not set!");
    return;
  }

  const initialBuild = await reimportServer();
  const remixHandler =
    MODE === "development"
      ? await createDevRequestHandler(initialBuild)
      : createRequestHandler({
        build: initialBuild,
        mode: initialBuild.mode
      });

  const app = express();

  app.use(compression());

  //http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
  app.disable("x-powered-by");

  // Remix fingerprints its assets so we can cache forever.
  app.use(
    "/build",
    express.static("public/build", { immutable: true, maxAge: "1y" })
  );

  // Everything else (like favicon.ico) is cached for an hour. You may want to be
  // more aggressive with this caching.
  app.use(express.static("public", { maxAge: "1h" }));

  // Use trailing slashes for canonical URLs.
  app.use(slashes());

  if (MODE === "development") app.use(morgan("dev"));
  else app.use(morgan("tiny"));

  app.all("*", remixHandler);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);

    if (MODE === "development") {
      broadcastDevReady(initialBuild);
    }
  });

  async function reimportServer(): Promise<ServerBuild> {
    // cjs: manually remove the server build from the require cache
    Object.keys(require.cache).forEach((key) => {
      if (key.startsWith(BUILD_PATH)) {
        delete require.cache[key];
      }
    });

    const stat = fs.statSync(BUILD_PATH);

    // convert build path to URL for Windows compatibility with dynamic `import`
    const BUILD_URL = url.pathToFileURL(BUILD_PATH).href;

    // use a timestamp query parameter to bust the import cache
    return import(BUILD_URL + "?t=" + stat.mtimeMs);
  }

  async function createDevRequestHandler(
    initialBuild: ServerBuild
  ): Promise<RequestHandler> {
    let build = initialBuild;

    async function handleServerUpdate() {
      // 1. re-import the server build
      build = await reimportServer();
      // 2. tell Remix that this app server is now up-to-date and ready
      broadcastDevReady(build);
    }

    const chokidar = await import("chokidar");
    chokidar
      .watch(VERSION_PATH, { ignoreInitial: true })
      .on("add", handleServerUpdate)
      .on("change", handleServerUpdate);

    // wrap request handler to make sure its recreated with the latest build for every request
    return async (req, res, next) => {
      try {
        return createRequestHandler({
          build,
          mode: "development"
        })(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  }
}
