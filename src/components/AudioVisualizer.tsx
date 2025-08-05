import AudioMotionAnalyzer from "audiomotion-analyzer";
import clsx from "clsx";
import { useEffect, useRef } from "react";

type Props = {
  stream?: MediaStream | null;
  className?: string;
  onClick?: () => unknown;
};

const AudioVisualizer = ({ stream, className, onClick }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    if (!stream) {
      return;
    }
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);

    const analyzer = new AudioMotionAnalyzer(containerRef.current, {
      source,
      audioCtx: audioContext,
      alphaBars: false,
      ansiBands: false,
      barSpace: 0.25,
      bgAlpha: 0,
      channelLayout: "single",
      colorMode: "gradient",
      fadePeaks: false,
      fftSize: 2048,
      fillAlpha: 0,
      frequencyScale: "log",
      gravity: 3.8,
      ledBars: false,
      linearAmplitude: true,
      linearBoost: 2,
      lineWidth: 1.5,
      loRes: false,
      lumiBars: false,
      maxDecibels: -20,
      maxFPS: 0,
      maxFreq: 16000,
      minDecibels: -90,
      minFreq: 30,
      mirror: 0,
      mode: 7,
      noteLabels: false,
      outlineBars: false,
      overlay: true,
      peakFadeTime: 750,
      peakHoldTime: 500,
      peakLine: false,
      radial: false,
      radialInvert: false,
      radius: 0.7,
      reflexAlpha: 1,
      reflexBright: 1,
      reflexFit: true,
      reflexRatio: 0.5,
      roundBars: true,
      showBgColor: false,
      showFPS: false,
      showPeaks: false,
      showScaleX: false,
      showScaleY: false,
      smoothing: 0.7,
      spinSpeed: 0,
      splitGradient: false,
      trueLeds: false,
      useCanvas: true,
      volume: 1,
      weightingFilter: "D",
    });

    analyzer.registerGradient("verdant", {
      colorStops: [
        { color: "#D3FFA6", pos: 0 },
        { color: "#036B5B", pos: 0.5 },
        { color: "#D3FFA6", pos: 1 },
      ],
    });

    analyzer.gradient = "verdant";
    return () => {
      analyzer.destroy();
    };
  }, [stream]);
  return (
    <div
      onClick={onClick}
      className={clsx("w-full", className)}
      ref={containerRef}
    />
  );
};

export default AudioVisualizer;
