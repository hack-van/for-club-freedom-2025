export default function UploadPreview({ file }: { file: File }) {
  console.log("Rendering audio preview for file:", file);

  return (
    <audio
      controls
      controlsList="nodownload"
      src={URL.createObjectURL(file)}
      className="w-full"
    />
  );
}
