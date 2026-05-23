import { Request, Response } from "express";

export const getCurrentUser = async (
  req: Request,
  res: Response
) => {

  try {

    const user: any = req.user;

    if (!user) {

      return res.status(401).json({
        success: false,
      });
    }

    return res.json({
      success: true,

      user: {
        username: user.username,

        avatar: user.avatar,

        profileUrl: user.profileUrl,
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
    });
  }
};