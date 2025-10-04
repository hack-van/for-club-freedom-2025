
import axios from "axios";
import fs from "fs";




export async function transcribeAudio(filePath: string): Promise<string> {
    const API_KEY = process.env.ASSEMBLYAI_API_KEY;
    //upload file
    const fileStream = fs.createReadStream(filePath);
    const upload_result = await axios.post(
        "https://api.assemblyai.com/v2/upload",
        fileStream,
        {
            headers: {
                authorization: API_KEY,
                "transfer-encoding": "chunked",
            },
        }
    );

    const upload_url = upload_result.data.upload_url;

    //request the transcription
    const transcript_result = await axios.post(
        "https://api.assemblyai.com/v2/transcript",
        { audio_url: upload_url },
        {
            headers: {
                authorization: API_KEY,
                "content-type": "application/json",
            },
        }
    );

    const transcriptId = transcript_result.data.id;

    //poll
    while (true) {
        const poll_result = await axios.get(
            `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
            { headers: { authorization: API_KEY } }
        );

        const status = poll_result.data.status;


        //return transcripted text as string
        if (status === "completed") {
            return poll_result.data.text;
        }

        //if error occurs, throw error
        else if (status === "error") {
            throw new Error("Transcription failed: " + poll_result.data.error);
        }

        //wait before polling again
        await new Promise((resolve) => setTimeout(resolve, 3000));
    }

}
