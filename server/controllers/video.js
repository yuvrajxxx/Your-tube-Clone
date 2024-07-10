import videoFiles from "../models/videoFiles.js";

import User from "../models/auth.js"; // Import the User model


export const uploadVideo = async (req, res, next) => {
  if (req.file === undefined) {
    res.status(404).json({ message: "plz Upload a '.mp4' video file only " });
  } else {
    try {
      const file = new videoFiles({
        videoTitle: req.body.title,
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        videoChanel: req.body.chanel,
        Uploder: req.body.Uploder,
      });
    //   console.log(file);
      await file.save();
      res.status(200).send("File uploded successfully");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};
export const getAllvideos= async (req, res)=>{
  try {
    const files= await videoFiles.find();
    res.status(200).send(files)
  } catch (error) {
    res.status(404).send(error.message)
  }
}


export const viewVideo = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;// Ensure req.userId is available
  try {
      const video = await videoFiles.findById(id);
      const userId = req.userId;
      if (!video) {
          return res.status(404).json({ message: "Video not found" });
      }

      video.Views += 1;
      await video.save();

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      user.points += 5;
      await user.save();

      res.status(200).json({ message: "View counted and points updated", points: user.points });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};