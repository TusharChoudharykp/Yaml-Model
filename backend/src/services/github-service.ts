import { Octokit } from "@octokit/rest";

export const ensureRepositoryExists = async (
  octokit: Octokit,
  owner: string,
  repo: string
) => {

  try {

    await octokit.repos.get({
      owner,
      repo,
    });

    console.log(
      "Repository already exists"
    );

  } catch (error: any) {

    if (error.status === 404) {

      console.log(
        "Creating repository..."
      );

      await octokit.repos.createForAuthenticatedUser({
        name: repo,

        private: true,

        auto_init: true,

        description:
          "ML Model Deployment Configurations",
      });

      console.log(
        "Repository created successfully"
      );

    } else {

      throw error;
    }
  }
};

export const ensureDevBranchExists = async (
  octokit: Octokit,
  owner: string,
  repo: string
) => {

  try {

    await octokit.git.getRef({
      owner,
      repo,
      ref: "heads/dev",
    });

    console.log(
      "dev branch already exists"
    );

  } catch (error: any) {

    if (error.status === 404) {

      console.log(
        "Creating dev branch..."
      );

      const mainRef =
        await octokit.git.getRef({

          owner,
          repo,
          ref: "heads/main",
        });

      await octokit.git.createRef({

        owner,
        repo,

        ref: "refs/heads/dev",

        sha:
          mainRef.data.object.sha,
      });

      console.log(
        "dev branch created"
      );

    } else {

      throw error;
    }
  }
};