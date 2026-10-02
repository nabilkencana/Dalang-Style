import React from 'react';
import { Composition, staticFile } from 'remotion';
import { Audio } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';

import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Hero } from './scenes/Scene2Hero';
import { Scene3GestureAI } from './scenes/Scene3GestureAI';
import { Scene4Ecosystem } from './scenes/Scene4Ecosystem';
import { Scene5Outro } from './scenes/Scene5Outro';

export interface MainVideoProps {
  audioSrc?: string;
  enableAudio?: boolean;
}

export const MainVideo: React.FC<MainVideoProps> = ({
  audioSrc = staticFile('audio/bgm-showcase.mp3'),
  enableAudio = false,
}) => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#0b0604',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {enableAudio && (
        <Audio
          src={audioSrc}
          volume={(f) => {
            if (f < 30) return f / 30;
            if (f > 1750) return Math.max(0, (1800 - f) / 50);
            return 0.85;
          }}
        />
      )}

      <TransitionSeries>
        {/* Scene 1: Cultural Hook & Intro */}
        <TransitionSeries.Sequence durationInFrames={320}>
          <Scene1Hook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 25 })}
        />

        {/* Scene 2: 3D Browser Web Experience */}
        <TransitionSeries.Sequence durationInFrames={380}>
          <Scene2Hero />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 25 })}
        />

        {/* Scene 3: Killer Feature — AI MediaPipe Gesture Control */}
        <TransitionSeries.Sequence durationInFrames={440}>
          <Scene3GestureAI />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 25 })}
        />

        {/* Scene 4: Cultural Ecosystem & Tokoh Catalog */}
        <TransitionSeries.Sequence durationInFrames={380}>
          <Scene4Ecosystem />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 25 })}
        />

        {/* Scene 5: Grand Finale Outro & Call to Action */}
        <TransitionSeries.Sequence durationInFrames={380}>
          <Scene5Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </div>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Master 60-second Showcase Video */}
      <Composition
        id="DalangShowcase"
        component={MainVideo}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ enableAudio: true }}
      />

      {/* Individual Scene Compositions for Fast Previewing */}
      <Composition
        id="Scene1-Hook"
        component={Scene1Hook}
        durationInFrames={320}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Scene2-Hero"
        component={Scene2Hero}
        durationInFrames={380}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Scene3-GestureAI"
        component={Scene3GestureAI}
        durationInFrames={440}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Scene4-Ecosystem"
        component={Scene4Ecosystem}
        durationInFrames={380}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Scene5-Outro"
        component={Scene5Outro}
        durationInFrames={380}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
