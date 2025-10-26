import { Button } from "../ui/button";

type Props = {
  onRecordingComplete: (videoFile?: File) => void;
};

export default function MobileVideoRecorder({ onRecordingComplete }: Props) {
  return (
    <div className="flex flex-col p-4 border items-center rounded-lg gap-4 w-full">
      <Button>Start Recording</Button>
    </div>
  );
}
