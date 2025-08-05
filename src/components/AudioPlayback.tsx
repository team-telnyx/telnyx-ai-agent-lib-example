import React, { useEffect } from "react";

type Props = {
  stream?: MediaStream | null;
};
export const AudioPlayback = ({ stream }: Props) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current && stream) {
      audioRef.current.srcObject = stream;
    }
  }, [stream]);
  return <audio muted playsInline autoPlay ref={audioRef} className="w-full h-16" />;
};
