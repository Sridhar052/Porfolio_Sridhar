import React from 'react';

export default function PortraitCanvas() {
  return (
    <div className="relative w-full h-full flex items-end justify-center">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute bottom-0 w-4/5 h-4/5 bg-gradient-radial from-[#EAE4D7]/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Direct Floating Portrait Image without Frame */}
      <img
        src="assets/sridhar.png"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'assets/sridhar.jpeg';
        }}
        alt="B. Sridhar"
        className="relative z-10 max-h-[480px] md:max-h-[540px] max-w-full object-contain filter drop-shadow-xl transition-transform duration-500 hover:scale-[1.02]"
      />
    </div>
  );
}
