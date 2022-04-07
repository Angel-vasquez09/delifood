import { db } from 'database'
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = {
    message: string
}

export const config = {
    api: {
        bodyParser: false,
    }
}

export default function handle(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return uploadFile(req, res)
        default:
            return res.status(405).json({ message: 'Method not allowed' })
    }

}

const saveFiles = async(file: formidable.File): Promise<string> => {

    const { secure_url } = await cloudinary.uploader.upload( file.filepath );
    return secure_url;
}

const parseFiles = async(req: NextApiRequest): Promise<string> => {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(req, async(err, fields, files) => {
            if (err) {
                return reject(err);
            }

            const fileUrl = await saveFiles(files.file as formidable.File);

            resolve(fileUrl);
        });
    });
}

async function uploadFile(req: NextApiRequest, res: NextApiResponse<Data>) {

    const imgUrl = await parseFiles(req)

    return res.status(200).json({ message: imgUrl })
}
