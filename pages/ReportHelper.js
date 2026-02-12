import { execSync } from "child_process";
import ApiClient from "@lhci/utils/src/api-client.js";
import lhrc_options from "./../lighthouserc.cjs";

export default async function uploadToLhciServer(lhr, options = false) {
  if (!options) {
    options = lhrc_options.ci.upload;
  }

  const api = new ApiClient({ ...options, rootURL: options.serverBaseUrl });
  api.setBuildToken(options.token);

  const project = await api.findProjectByToken(options.token);
  if (!project) {
    throw new Error("Could not find active project with provided token");
  }

  const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
  const hash = execSync("git rev-parse HEAD").toString().trim();
  const commitMessage = execSync("git log -1 --pretty=%B").toString().trim();
  const author = execSync("git log -1 --pretty=%an").toString().trim();
  const commitDate = execSync("git log -1 --pretty=%cI").toString().trim();

  const runDate = new Date();

  const build = await api.createBuild({
    projectId: project.id,
    lifecycle: "unsealed",
    hash,
    branch,
    ancestorHash: null,
    commitMessage,
    author,
    avatarUrl: "",
    externalBuildUrl: "",
    runAt: runDate.toISOString(),
    committedAt: commitDate,
  });

  const run = await api.createRun({
    projectId: project.id,
    buildId: build.id,
    url: lhr.finalUrl,
    lhr: JSON.stringify(lhr),
  });

  await api.sealBuild(build.projectId, build.id);

  return { buildId: build.id, runId: run.id };
}
