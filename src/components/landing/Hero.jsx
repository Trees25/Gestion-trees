import React from "react";
import TrueFocus from "../reactbits/TrueFocus"; // Asegúrate de ajustar la ruta
import FaultyTerminal from "../reactbits/FaultyTerminal"; // Asegúrate de ajustar la ruta

const Hero = () => (
  <section id="inicio" className="relative min-h-screen flex items-center bg-gradient-to-r from-[#101726] to-[#101726] overflow-hidden">
    <div style={{ width: '100%', height: '640px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#1e40af"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={1}
        />

        <div className="text-box">
          <h1>
            Soluciones Innovadoras en<br />
            <div className="true-focus">
              <TrueFocus
                sentence="Software Hardware"
                manualMode={false}
                blurAmount={5}
                borderColor="white"
                animationDuration={2}
              />
            </div>
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-6 leading-relaxed">Desarrollo web, software a medida y mantenimiento de hardware para tu negocio.</p>
          <a href="#contacto" className="bg-[#5EADF2] text-[#101726] px-5 py-3 text-sm sm:text-base rounded-full font-semibold hover:bg-[#3D8BF2] transitio">Contáctanos</a>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;