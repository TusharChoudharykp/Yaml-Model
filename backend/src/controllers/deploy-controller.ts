import {
  Request,
  Response,
} from "express";

import {
  Octokit,
} from "@octokit/rest";

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

    const requestedBy =
      user.username;

    const repoOwner =
      process.env.GITHUB_REPO_OWNER!;

    const repoName =
      process.env.GITHUB_REPO_NAME!;

    const octokit =
      new Octokit({

        auth:
          process.env.GITHUB_PAT,
      });

    const branchName =
      `feature/${modelName}-config`;

    const filePath =
      `configs/${modelName}.yaml`;

    // GET DEV BRANCH SHA

    const {
      data: baseBranch,
    } =
      await octokit
        .rest
        .repos
        .getBranch({

          owner:
            repoOwner,

          repo:
            repoName,

          branch:
            "dev",
        });

    const baseSha =
      baseBranch
        .commit
        .sha;

    // CREATE FEATURE BRANCH

    try {

      await octokit
        .rest
        .git
        .createRef({

          owner:
            repoOwner,

          repo:
            repoName,

          ref:
            `refs/heads/${branchName}`,

          sha:
            baseSha,
        });

    } catch {

      console.log(
        "Feature branch already exists"
      );
    }

    // CHECK FILE EXISTS

    let sha:
      | string
      | undefined;

    try {

      const existingFile =
        await octokit
          .rest
          .repos
          .getContent({

            owner:
              repoOwner,

            repo:
              repoName,

            path:
              filePath,

            ref:
              branchName,
          });

      if (
        !Array.isArray(
          existingFile.data
        )
      ) {

        sha =
          existingFile
            .data
            .sha;
      }

    } catch {

      console.log(
        "Creating new config"
      );
    }

    // CREATE FILE

    await octokit
      .rest
      .repos
      .createOrUpdateFileContents({

        owner:
          repoOwner,

        repo:
          repoName,

        path:
          filePath,

        message:
          `feat: add ${modelName} config by ${requestedBy}`,

        content:
          Buffer
            .from(
              yamlContent
            )
            .toString(
              "base64"
            ),

        branch:
          branchName,

        sha,
      });

    // CREATE PULL REQUEST

    const {
      data: pr,
    } =
      await octokit
        .rest
        .pulls
        .create({

          owner:
            repoOwner,

          repo:
            repoName,

          title:
            `[ML Deploy] Add ${modelName} config`,

          body: `
## ML Model Deployment Request

- Model: ${modelName}

- Requested By: @${requestedBy}

- Branch: ${branchName}

- Generated via YAML Platform
          `,

          head:
            branchName,

          base:
            "dev",
        });

    return res.json({

      success: true,

      message:
        "Pull Request created successfully",

      prUrl:
        pr.html_url,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message:
        "Failed to create pull request",
    });
  }
};