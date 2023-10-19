import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();
const userName = process.env.db_username;
const password = process.env.db_password;

const storage = new GridFsStorage({
  url: `mongodb://${userName}:${password}@ac-iln9b8l-shard-00-00.grtastl.mongodb.net:27017,ac-iln9b8l-shard-00-01.grtastl.mongodb.net:27017,ac-iln9b8l-shard-00-02.grtastl.mongodb.net:27017/?ssl=true&replicaSet=atlas-u5qwtm-shard-0&authSource=admin&retryWrites=true&w=majority`,
  options: { useUnifiedTopology: true, useNewUrlParser: true },
  file: (request, file) => {
    const match = ['image/png', 'image/jpg', 'image/jpeg'];
    if (match.indexOf(file.mimeType) === -1) {
      return `${Date.now()}-file-${file.originalname}`;
    }
    return {
      bucketName: 'photos',
      filename: `${Date.now()}-file-${file.originalname}`,
    };
  },
});




export default multer({storage});