import {
  Request,
  Response,
} from "express";

import {
  Octokit,
} from "@octokit/rest";

import {

  ensureRepositoryExists,

  ensureDevBranchExists,

} from "../services/github-service";

export const deployModel = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      yamlContent,
      modelName,
    } = req.body;

    const user =
      req.user as any;

    const owner =
      user.username;

    const repoName =
      "ml-model-configs";

    const octokit =
      new Octokit({
        auth:
          user.accessToken,
      });

    // ENSURE REPO EXISTS

    await ensureRepositoryExists(

      octokit,

      owner,

      repoName
    );

    // ENSURE DEV BRANCH EXISTS

    await ensureDevBranchExists(

      octokit,

      owner,

      repoName
    );

    // FEATURE BRANCH

    const featureBranch =
      `feature/${modelName}-config`;

    // GET DEV SHA

    const devRef =
      await octokit.git.getRef({

        owner,

        repo: repoName,

        ref: "heads/dev",
      });

    const devSha =
      devRef.data.object.sha;

    // CREATE FEATURE BRANCH

    try {

      await octokit.git.createRef({

        owner,

        repo: repoName,

        ref:
          `refs/heads/${featureBranch}`,

        sha: devSha,
      });

    } catch {

      console.log(
        "Feature branch already exists"
      );
    }

    // FILE PATH

    const filePath =
      `configs/${modelName}.yaml`;

    let sha:
      | string
      | undefined;

    // CHECK FILE EXISTS

    try {

      const existingFile =
        await octokit.repos.getContent({

          owner,

          repo: repoName,

          path: filePath,

          ref: featureBranch,
        });

      if (
        !Array.isArray(
          existingFile.data
        )
      ) {

        sha =
          existingFile.data.sha;
      }

    } catch {

      console.log(
        "Creating new config"
      );
    }

    // CREATE FILE

    await octokit.repos
      .createOrUpdateFileContents({

        owner,

        repo: repoName,

        path: filePath,

        message:
          `Add deployment config for ${modelName}`,

        content:
          Buffer.from(
            yamlContent
          ).toString("base64"),

        branch:
          featureBranch,

        sha,
      });

    // CREATE PR

    const pr =
      await octokit.pulls.create({

        owner,

        repo: repoName,

        title:
          `Deploy ${modelName}`,

        head:
          featureBranch,

        base: "dev",

        body: `
## ML Model Deployment

This PR adds deployment configuration for:

- Model: ${modelName}
- Environment: dev
- Generated via ML Deployment Portal
        `,
      });

    return res.json({

      success: true,

      message:
        "Pull Request created successfully",

      prUrl:
        pr.data.html_url,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message:
        "Failed to create PR",
    });
  }
};