export default function UploadPreview({ file }: { file: File | null }) {
    if (!file) return null;

    console.log("Rendering audio preview for file:", file);

    return <audio controls controlsList="nodownload" src={URL.createObjectURL(file)} className="w-full" />;
}