import { CharacterProfile, CharacterType, LifeEvent, WorkTask } from '../types/game';

// Tasks organized specifically by Designer Archetype
export const TASKS_BY_ROLE: Record<CharacterType, WorkTask[]> = {
  structure_designer: [
    {
      id: 'struct_seismic_retrofit',
      title: 'Seismic Retrofit & Cantilever Steel Framework',
      clientOrBoss: 'Apex Structural Engineering Partners',
      description: '40-hour high-precision calculation sprint: calculate moment frames, foundation shear walls, and earthquake dampening for a 30-story commercial tower.',
      difficulty: 'Standard',
      targetHours: 40,
      designerType: 'structure_designer',
    },
    {
      id: 'struct_suspension_bridge',
      title: 'Mega-Bridge Cable Tension & Load Deflection Analysis',
      clientOrBoss: 'Metro Transit Authority Infrastructure',
      description: 'High-stakes infrastructure sprint to analyze wind vortex resonance and cable tension loads before municipal council approval.',
      difficulty: 'Demanding',
      targetHours: 40,
      designerType: 'structure_designer',
    },
    {
      id: 'struct_skyscraper_core',
      title: 'Composite Super-Skyscraper Core & Outrigger Trusses',
      clientOrBoss: 'Titan High-Rise Development Corp',
      description: 'Hardcore structural delivery: resolve extreme wind load deflection, high-strength rebar matrices, and deep subterranean foundation pilings.',
      difficulty: 'Hardcore',
      targetHours: 40,
      designerType: 'structure_designer',
    },
  ],

  graphic_designer: [
    {
      id: 'graphic_brand_system',
      title: 'Global Brand Identity & Geometric Vector Grid',
      clientOrBoss: 'Lumina Tech & Media Brands',
      description: '40-hour creative branding sprint: craft responsive logo systems, custom typography ligatures, micro-spacing grids, and multi-platform digital guidelines.',
      difficulty: 'Standard',
      targetHours: 40,
      designerType: 'graphic_designer',
    },
    {
      id: 'graphic_packaging_dieline',
      title: 'Luxury Sustainable Packaging & CMYK Die-Lines',
      clientOrBoss: 'Aura Eco-Cosmetics International',
      description: 'Demanding print design sprint: calibrate spot metallics, spot UV varnishes, complex folding foil die-lines, and zero-defect color press proofs.',
      difficulty: 'Demanding',
      targetHours: 40,
      designerType: 'graphic_designer',
    },
    {
      id: 'graphic_omnichannel_campaign',
      title: 'High-Velocity Global Campaign & Billboard System',
      clientOrBoss: 'Neon Interactive Worldwide',
      description: 'Hardcore delivery: generate 200+ localized vector assets, 3D typography key visuals, and stadium-scale environmental graphics under tight deadlines.',
      difficulty: 'Hardcore',
      targetHours: 40,
      designerType: 'graphic_designer',
    },
  ],

  floor_plan_designer: [
    {
      id: 'plan_medical_clinic',
      title: 'Ergonomic Medical Center & Patient Circulation Plan',
      clientOrBoss: 'St. Jude Health & Research Facilities',
      description: '40-hour architectural planning sprint: optimize sterile room adjacencies, ADA wheelchair turning radiuses, and emergency egress routing.',
      difficulty: 'Standard',
      targetHours: 40,
      designerType: 'floor_plan_designer',
    },
    {
      id: 'plan_luxury_residence',
      title: 'Custom Luxury Estate & Open-Concept Spatial Zoning',
      clientOrBoss: 'Vanguard Architectural Homes',
      description: 'Demanding residential layout sprint: balance sightlines, cantilevered indoor-outdoor living flow, and discreet mechanical plumbing stacks.',
      difficulty: 'Demanding',
      targetHours: 40,
      designerType: 'floor_plan_designer',
    },
    {
      id: 'plan_corporate_headquarters',
      title: '300,000 Sq Ft Multi-Tenant Tech Campus Blueprint',
      clientOrBoss: 'Vertex Innovation Park Consortium',
      description: 'Hardcore blueprint delivery: coordinate 8 floors of flexible collaboration zones, acoustic partitions, HVAC chases, and city fire code egress.',
      difficulty: 'Hardcore',
      targetHours: 40,
      designerType: 'floor_plan_designer',
    },
  ],

  conceptual_designer: [
    {
      id: 'concept_biophilic_pavilion',
      title: 'Biophilic Futuristic Pavilion & Parametric Facade',
      clientOrBoss: 'World Expo Architectural Committee',
      description: '40-hour visionary ideation sprint: develop generative organic geometry, daylight harvesting studies, and inspiring spatial narratives.',
      difficulty: 'Standard',
      targetHours: 40,
      designerType: 'conceptual_designer',
    },
    {
      id: 'concept_floating_habitat',
      title: 'Zero-Emission Floating Ocean Research Community',
      clientOrBoss: 'Blue Ocean Ventures & Ecology',
      description: 'Demanding visionary sprint: design modular floating geodesic habitats with integrated tidal power generation and hydroponic sky gardens.',
      difficulty: 'Demanding',
      targetHours: 40,
      designerType: 'conceptual_designer',
    },
    {
      id: 'concept_museum_future',
      title: 'Museum of Artificial Intelligence & Spatial Experience',
      clientOrBoss: 'Global Arts & Science Foundation',
      description: 'Hardcore speculative project: craft mind-bending non-Euclidean exhibition halls, kinetic kinetic louvers, and interactive holographic galleries.',
      difficulty: 'Hardcore',
      targetHours: 40,
      designerType: 'conceptual_designer',
    },
  ],
};

// Flattened list of default tasks
export const WORK_TASKS: WorkTask[] = [
  ...TASKS_BY_ROLE.structure_designer,
  ...TASKS_BY_ROLE.graphic_designer,
  ...TASKS_BY_ROLE.floor_plan_designer,
  ...TASKS_BY_ROLE.conceptual_designer,
];

export const CHARACTERS: CharacterProfile[] = [
  {
    id: 'structure_designer',
    name: 'Structure Designer',
    role: 'Structural & Frame Architect',
    perk: 'Structural Resilience: +25% energy stamina & higher impact resistance',
    description: 'Calculates load-bearing beams, foundations, and engineering frameworks. Unshakable under tight sprint deadlines.',
    avatarColor: '#2563eb',
    speedMultiplier: 1.05,
    jumpMultiplier: 1.05,
    energyDrainRate: 0.75,
  },
  {
    id: 'graphic_designer',
    name: 'Graphic Designer',
    role: 'Visual, Brand & UI Designer',
    perk: 'Pixel Precision: +15% Task Quality bonus & doubled Focus Goggles duration',
    description: 'Masters visual hierarchy, color theory, and typographic balance. Spots microscopic visual flaws instantly.',
    avatarColor: '#ec4899',
    speedMultiplier: 1.10,
    jumpMultiplier: 1.10,
    energyDrainRate: 0.90,
  },
  {
    id: 'floor_plan_designer',
    name: 'Floor Plan Designer',
    role: 'Spatial Layout & Blueprint Planner',
    perk: 'Spatial Navigator: +18% sprint speed and secret warp path detector',
    description: 'Designs ergonomic room layouts and intuitive circulation corridors. Discovers hidden paths across every level.',
    avatarColor: '#10b981',
    speedMultiplier: 1.20,
    jumpMultiplier: 1.05,
    energyDrainRate: 0.85,
  },
  {
    id: 'conceptual_designer',
    name: 'Conceptual Designer',
    role: 'Creative Director & Visionary',
    perk: 'Creative Spark: +30% Morale boost from inspiration coffee and secret items',
    description: 'Transforms abstract ideas into groundbreaking design visions. Keeps team enthusiasm and creativity at peak levels.',
    avatarColor: '#f59e0b',
    speedMultiplier: 1.05,
    jumpMultiplier: 1.18,
    energyDrainRate: 0.80,
  },
];

export const INITIAL_LEADERBOARD = [
  {
    id: 'lead-1',
    playerName: 'Maya Lin',
    role: 'Structure Designer',
    score: 84500,
    hoursLogged: 40.0,
    quality: 98,
    grade: 'A+',
    date: 'Aug 28',
  },
  {
    id: 'lead-2',
    playerName: 'Saul Bass',
    role: 'Graphic Designer',
    score: 79200,
    hoursLogged: 40.0,
    quality: 94,
    grade: 'A',
    date: 'Aug 26',
  },
  {
    id: 'lead-3',
    playerName: 'Frank Gehry',
    role: 'Conceptual Designer',
    score: 73800,
    hoursLogged: 40.0,
    quality: 91,
    grade: 'A',
    date: 'Aug 24',
  },
  {
    id: 'lead-4',
    playerName: 'Zaha Hadid',
    role: 'Floor Plan Designer',
    score: 68400,
    hoursLogged: 39.5,
    quality: 89,
    grade: 'B+',
    date: 'Aug 22',
  },
];

// All Life & Work Dilemmas with role customization
export const LIFE_EVENTS: Record<string, LifeEvent> = {
  // ==========================================
  // STRUCTURE DESIGNER ROLE CHALLENGES
  // ==========================================
  struct_shear_stress: {
    id: 'struct_shear_stress',
    title: 'Seismic Shear & Load Calculation Anomaly',
    subtitle: 'Structural Engineering Warning',
    category: 'urgent',
    icon: 'Layers',
    prompt: 'FEA simulation shows a 14% shear stress spike on the 8th-floor cantilever truss under seismic wind resonance. What is your engineering response?',
    options: [
      {
        text: 'Re-run FEA mesh & add diagonal steel gusset plate dampers',
        impactHours: +0.5,
        impactQuality: +15,
        impactMorale: +10,
        impactEnergy: -15,
        narrativeResult: 'Masterful engineering! Gusset dampers neutralized shear stress and satisfied city safety code.',
      },
      {
        text: 'Pause drafting, order costly external third-party PE peer review',
        impactHours: -2.5,
        impactQuality: +10,
        impactMorale: -10,
        impactEnergy: +5,
        overtimeNeeded: 2.5,
        narrativeResult: 'The review confirmed your findings, but cost 2.5 hours of critical sprint time.',
      },
      {
        text: 'Assume nominal safety factor absorbs it without modifying drawings',
        impactHours: +0,
        impactQuality: -20,
        impactMorale: -15,
        impactEnergy: -5,
        narrativeResult: 'Risky shortcut! City building inspector flagged the drawings and issued a revision notice.',
      },
    ],
  },

  struct_rebar_pour: {
    id: 'struct_rebar_pour',
    title: 'Site Emergency: Concrete Poured Before Rebar Sign-off',
    subtitle: 'Construction Field Crisis',
    category: 'urgent',
    icon: 'ShieldCheck',
    prompt: 'General contractor started pouring foundation footings before your structural engineer rebar inspection stamp arrived!',
    options: [
      {
        text: 'Issue immediate halt notice & mandate non-destructive radar sonic test',
        impactHours: -1.5,
        impactQuality: +12,
        impactMorale: +15,
        impactEnergy: -10,
        overtimeNeeded: 1.5,
        narrativeResult: 'Firm integrity! Ultrasonic testing proved rebar placement was intact; contractor apologized.',
      },
      {
        text: 'Rush to site personally in hardhat to inspect remaining sections',
        impactHours: -2.0,
        impactQuality: +8,
        impactMorale: +5,
        impactEnergy: -25,
        overtimeNeeded: 2.0,
        narrativeResult: 'Tiring muddy field trip, but you caught two missing anchor bolts just in time.',
      },
    ],
  },

  struct_steel_mill_delay: {
    id: 'struct_steel_mill_delay',
    title: 'Supply Chain: Custom I-Beams Stalled at Steel Mill',
    subtitle: 'Material Procurement Dilemma',
    category: 'urgent',
    icon: 'Briefcase',
    prompt: 'The custom wide-flange W36 steel beams won’t ship for 6 weeks. Project manager wants an alternate structural framing design today.',
    options: [
      {
        text: 'Redesign connection nodes to use standard in-stock box girders',
        impactHours: +1.0,
        impactQuality: +10,
        impactMorale: +10,
        impactEnergy: -15,
        narrativeResult: 'Brilliant structural adaptation! Project saved 4 weeks and kept schedule on time.',
      },
      {
        text: 'Insist on waiting for custom beams and halt downstream framing',
        impactHours: -3.0,
        impactQuality: +5,
        impactMorale: -20,
        impactEnergy: 0,
        overtimeNeeded: 3.0,
        narrativeResult: 'Stalemate with general contractor cost 3 sprint hours in mediation meetings.',
      },
    ],
  },

  // ==========================================
  // GRAPHIC DESIGNER ROLE CHALLENGES
  // ==========================================
  graphic_make_it_pop: {
    id: 'graphic_make_it_pop',
    title: 'Client Feedback: "Make the Logo 300% Bigger & Add Neon Pop!"',
    subtitle: 'Design Taste Dilemma',
    category: 'urgent',
    icon: 'Palette',
    prompt: 'The client VP wants the minimalist luxury emblem scaled to 300%, colored neon yellow, and surrounded by 3 drop shadows.',
    options: [
      {
        text: 'Present side-by-side hierarchy mockup demonstrating visual balance & negative space',
        impactHours: +0.5,
        impactQuality: +15,
        impactMorale: +15,
        impactEnergy: -10,
        narrativeResult: 'Persuasive design diplomacy! The client understood visual hierarchy and embraced the refined branding.',
      },
      {
        text: 'Blindly apply client changes without questioning',
        impactHours: +0,
        impactQuality: -25,
        impactMorale: -20,
        impactEnergy: -5,
        narrativeResult: 'The design looks like a 1999 coupon flyer. Brand aesthetics suffered severely.',
      },
      {
        text: 'Offer subtle golden ratio enlargement (+20%) with refined contrast',
        impactHours: -0.5,
        impactQuality: +8,
        impactMorale: +10,
        impactEnergy: -5,
        overtimeNeeded: 0.5,
        narrativeResult: 'A graceful compromise that kept client happy while preserving dignity.',
      },
    ],
  },

  graphic_cmyk_gamut_nightmare: {
    id: 'graphic_cmyk_gamut_nightmare',
    title: 'CMYK vs RGB Gamut Disaster on Press Test',
    subtitle: 'Pre-Press Calibration Alert',
    category: 'urgent',
    icon: 'Sparkles',
    prompt: 'The signature vibrant electric cyan brand color converted to dull sludge green on the high-speed Heidelberg offset press proof!',
    options: [
      {
        text: 'Formulate custom Pantone spot ink (PMS 2925C) & adjust ink densities',
        impactHours: +0.5,
        impactQuality: +20,
        impactMorale: +15,
        impactEnergy: -10,
        narrativeResult: 'Spectacular print fidelity! The custom spot ink looks brilliant and identical to screen.',
      },
      {
        text: 'Run the press as-is with standard CMYK process inks',
        impactHours: +0,
        impactQuality: -18,
        impactMorale: -15,
        impactEnergy: 0,
        narrativeResult: 'Muddy print results disappointed the brand marketing team.',
      },
    ],
  },

  graphic_corrupt_font: {
    id: 'graphic_corrupt_font',
    title: 'Corrupted Display Typeface on Packaging Master',
    subtitle: 'Digital Asset Emergency',
    category: 'urgent',
    icon: 'FileQuestion',
    prompt: 'At 11:00 PM, the custom luxury display serif font throws missing glyph errors on the final foil packaging die-line.',
    options: [
      {
        text: 'Manually convert key brand glyphs to vector bezier curves and verify kerning',
        impactHours: +1.0,
        impactQuality: +15,
        impactMorale: +10,
        impactEnergy: -15,
        narrativeResult: 'Flawless vector craftsmanship! Die-cutter received perfect curves with zero font dependency.',
      },
      {
        text: 'Swap in Arial or Times New Roman as emergency fallback',
        impactHours: +0,
        impactQuality: -30,
        impactMorale: -25,
        impactEnergy: 0,
        narrativeResult: 'Packaging looks cheap and generic. Design director is horrified.',
      },
    ],
  },

  // ==========================================
  // FLOOR PLAN DESIGNER ROLE CHALLENGES
  // ==========================================
  plan_plumbing_clash: {
    id: 'plan_plumbing_clash',
    title: 'Multi-Story Plumbing Stack Clash in Living Room',
    subtitle: 'Spatial Coordination Emergency',
    category: 'urgent',
    icon: 'Compass',
    prompt: 'The mechanical drawings show a 4-inch sanitary waste stack dropping directly through the middle of the double-height living room ceiling!',
    options: [
      {
        text: 'Reroute stack through kitchen pantry chase wall & add soundproofing collar',
        impactHours: +0.5,
        impactQuality: +15,
        impactMorale: +15,
        impactEnergy: -10,
        narrativeResult: 'Ingenious spatial fix! Living room sightlines preserved with zero acoustic disturbance.',
      },
      {
        text: 'Build an ugly drywall box right down the center of the room',
        impactHours: +0,
        impactQuality: -22,
        impactMorale: -15,
        impactEnergy: -5,
        narrativeResult: 'An awkward column ruined the open concept layout.',
      },
      {
        text: 'Call MEP engineer for emergency coordination session',
        impactHours: -1.5,
        impactQuality: +10,
        impactMorale: +5,
        impactEnergy: -10,
        overtimeNeeded: 1.5,
        narrativeResult: 'Coordinated a clean ceiling soffit drop, but lost 1.5 sprint hours.',
      },
    ],
  },

  plan_ada_corridor: {
    id: 'plan_ada_corridor',
    title: 'Corridor Fails ADA Wheelchair Clearance by 2 Inches',
    subtitle: 'Building Code Compliance Alert',
    category: 'urgent',
    icon: 'CheckCircle',
    prompt: 'The main hallway to the accessible restroom measures 34 inches instead of the required 36-inch clear opening on the municipal permit set.',
    options: [
      {
        text: 'Shift interior drywall partition 3 inches into storage closet and redraw door swing',
        impactHours: +0.5,
        impactQuality: +15,
        impactMorale: +10,
        impactEnergy: -10,
        narrativeResult: 'Clean adjustment! Permit passed building department inspection on the first submission.',
      },
      {
        text: 'Hope the building inspector does not measure corridor width on site',
        impactHours: +0,
        impactQuality: -25,
        impactMorale: -20,
        impactEnergy: -5,
        narrativeResult: 'Failed inspection! Stop-work order issued on job site.',
      },
    ],
  },

  plan_5_beds_tiny_loft: {
    id: 'plan_5_beds_tiny_loft',
    title: 'Client Demands 4 Extra Bedrooms in a 700 Sq Ft Loft',
    subtitle: 'Unrealistic Client Expectations',
    category: 'urgent',
    icon: 'Layers',
    prompt: 'Client bought a 700 sq ft urban loft and insists on fitting 4 private bedrooms, a dining room, home gym, and laundry.',
    options: [
      {
        text: 'Design flexible smart furniture zones with sliding acoustic Japanese shoji partitions',
        impactHours: +1.0,
        impactQuality: +18,
        impactMorale: +15,
        impactEnergy: -15,
        narrativeResult: 'Architectural genius! Multi-functional transformable zones wowed the client completely.',
      },
      {
        text: 'Divide space into microscopic windowless closet cubicles',
        impactHours: +0,
        impactQuality: -20,
        impactMorale: -15,
        impactEnergy: -5,
        narrativeResult: 'Claustrophobic layout violates egress window natural light codes.',
      },
    ],
  },

  // ==========================================
  // CONCEPTUAL DESIGNER ROLE CHALLENGES
  // ==========================================
  concept_budget_slash: {
    id: 'concept_budget_slash',
    title: 'Executive Slashes Budget by 60% After Concept Approval',
    subtitle: 'Vision vs Budget Reality Check',
    category: 'urgent',
    icon: 'Lightbulb',
    prompt: 'The board loves your floating organic wooden parametric pavilion, but just announced a 60% budget cut. How do you protect the concept soul?',
    options: [
      {
        text: 'Modularize timber arches using standardized curved glulam laminates',
        impactHours: +0.5,
        impactQuality: +16,
        impactMorale: +15,
        impactEnergy: -15,
        narrativeResult: 'Inspiring ingenuity! The design kept 95% of its visual drama at 40% of the cost.',
      },
      {
        text: 'Scrap the organic geometry and replace with a standard corrugated metal box',
        impactHours: +0,
        impactQuality: -30,
        impactMorale: -35,
        impactEnergy: -10,
        narrativeResult: 'The soul of the project was extinguished. Team morale plummeted.',
      },
      {
        text: 'Negotiate phased construction: Build iconic central shell now, wings later',
        impactHours: -1.0,
        impactQuality: +12,
        impactMorale: +10,
        impactEnergy: -5,
        overtimeNeeded: 1.0,
        narrativeResult: 'Strategic leadership preserved the design integrity for phase 1.',
      },
    ],
  },

  concept_render_gpu_crash: {
    id: 'concept_render_gpu_crash',
    title: '8K Photorealistic Raytracing CAD Server Overheats',
    subtitle: 'Render Farm Hardware Crisis',
    category: 'urgent',
    icon: 'Flame',
    prompt: '4 hours before the master pitch presentation, the GPU workstation crashes with thermal throttling on the volumetric lighting pass.',
    options: [
      {
        text: 'Bake atmospheric lighting textures & switch to AI-accelerated denoiser pass',
        impactHours: +0.5,
        impactQuality: +14,
        impactMorale: +10,
        impactEnergy: -10,
        narrativeResult: 'Fast technical recovery! Renders completed in 20 minutes with cinema-grade fidelity.',
      },
      {
        text: 'Present untextured wireframe screenshots directly to the executive board',
        impactHours: +0,
        impactQuality: -25,
        impactMorale: -20,
        impactEnergy: 0,
        narrativeResult: 'Execs struggled to visualize materials without realistic lighting renders.',
      },
    ],
  },

  concept_creative_breakthrough: {
    id: 'concept_creative_breakthrough',
    title: 'Midnight Creative Epiphany & Sketchbook Spree',
    subtitle: 'Visionary Inspiration Surge',
    category: 'urgent',
    icon: 'Sparkles',
    prompt: 'At 1:30 AM, a revolutionary parametric roof facade concept flashes in your mind. Do you sketch until 4 AM or go to sleep?',
    options: [
      {
        text: 'Sketch 10 quick thumbnail concepts, take voice notes, sleep for morning refinement',
        impactHours: +1.0,
        impactQuality: +15,
        impactMorale: +20,
        impactEnergy: -10,
        narrativeResult: 'Perfect balance! Captured the lightning in a bottle while preserving physical energy.',
      },
      {
        text: 'Pull an all-nighter modeling 3D NURBS surfaces non-stop',
        impactHours: +3.0,
        impactQuality: +8,
        impactMorale: -15,
        impactEnergy: -45,
        narrativeResult: 'Incredible models produced! But extreme exhaustion clouds your morning meetings.',
      },
    ],
  },

  // ==========================================
  // SHARED SPRINT & LIFE DILEMMAS
  // ==========================================
  missing_info: {
    id: 'missing_info',
    title: 'Missing Architectural Specs & Project Brief Blocker',
    subtitle: 'Deliverable blocker alert',
    category: 'urgent',
    icon: 'FileQuestion',
    prompt: 'The structural load guidelines and brand assets promised by the client are incomplete. How do you proceed with the 40h sprint?',
    options: [
      {
        text: 'Build modular design assumptions & document exact parameters clearly',
        impactHours: +0.5,
        impactQuality: +10,
        impactMorale: +5,
        impactEnergy: -10,
        narrativeResult: 'Excellent foresight! Your modular assumptions kept design drafting moving forward.',
      },
      {
        text: 'Stop and wait for the client to answer emails',
        impactHours: -2.0,
        impactQuality: -5,
        impactMorale: -15,
        impactEnergy: +5,
        overtimeNeeded: 2.0,
        narrativeResult: 'Waiting cost 2 hours of sprint time. You will need to catch up later.',
      },
      {
        text: 'Rush ahead with random guessed numbers without notes',
        impactHours: +0,
        impactQuality: -15,
        impactMorale: 0,
        impactEnergy: -5,
        narrativeResult: 'Saved time upfront, but errors required major revision cycles.',
      },
    ],
  },

  due_date_shift: {
    id: 'due_date_shift',
    title: 'Sprint Presentation Shifted Earlier!',
    subtitle: 'Urgent email from leadership',
    category: 'urgent',
    icon: 'ClockAlert',
    prompt: 'Executive client leadership pulled the presentation forward due to a major investor review. Time is compressed!',
    options: [
      {
        text: 'Prioritize critical hero deliverables and master presentation boards',
        impactHours: +1.0,
        impactQuality: +8,
        impactMorale: +10,
        impactEnergy: -10,
        narrativeResult: 'Smart prioritization! The core presentation boards look stunning and the review is secured.',
      },
      {
        text: 'Schedule late-night emergency overtime crunch session',
        impactHours: +3.0,
        impactQuality: +8,
        impactMorale: -20,
        impactEnergy: -30,
        overtimeNeeded: 3.0,
        narrativeResult: 'You logged 3 extra hours but feeling heavy fatigue.',
      },
      {
        text: 'Push back firmly with a structured risk impact roadmap',
        impactHours: -1.0,
        impactQuality: +15,
        impactMorale: +15,
        impactEnergy: -5,
        narrativeResult: 'Leadership respected your clear boundaries and agreed to preserve design quality.',
      },
    ],
  },

  short_term_illness: {
    id: 'short_term_illness',
    title: 'Sudden Fever & Flu Attack',
    subtitle: 'Health warning alert',
    category: 'health',
    icon: 'Thermometer',
    prompt: 'You wake up coughing with a 101°F fever and brain fog on a crucial sprint day.',
    options: [
      {
        text: 'Take a half-day sick leave, sleep 4 hours, drink herbal tea',
        impactHours: -4.0,
        impactQuality: +10,
        impactMorale: +25,
        impactEnergy: +40,
        overtimeNeeded: 3.0,
        narrativeResult: 'Rest worked wonders! You recovered fast and avoided costly drafting errors.',
      },
      {
        text: 'Power through with cold medicine and energy drinks',
        impactHours: +2.0,
        impactQuality: -20,
        impactMorale: -25,
        impactEnergy: -45,
        narrativeResult: 'You drafted through brain fog, introducing misaligned measurements.',
      },
      {
        text: 'Hand over blocking subtasks to a team studio partner & rest lightly',
        impactHours: -2.0,
        impactQuality: +5,
        impactMorale: +15,
        impactEnergy: +20,
        overtimeNeeded: 1.5,
        narrativeResult: 'Great teamwork! The critical path stayed active while you recuperated.',
      },
    ],
  },

  kids_school: {
    id: 'kids_school',
    title: 'School Call: Early Dismissal / Pick Up Kids',
    subtitle: 'Family priority event',
    category: 'family',
    icon: 'Bus',
    prompt: 'The school called: after-school program is canceled early today. Your kids need to be picked up right now!',
    options: [
      {
        text: 'Leave immediately, spend quality family time, finish sprint in evening',
        impactHours: -2.5,
        impactQuality: +5,
        impactMorale: +30,
        impactEnergy: -15,
        overtimeNeeded: 2.5,
        narrativeResult: 'The kids had a blast! You set up evening overtime blocks to hit your 40h goal.',
      },
      {
        text: 'Coordinate a carpool swap with a neighboring parent',
        impactHours: -0.5,
        impactQuality: 0,
        impactMorale: +10,
        impactEnergy: -5,
        narrativeResult: 'Smooth coordination! Only lost 30 mins and kept deep work momentum.',
      },
      {
        text: 'Bring kids into studio workspace with drawing paper & snacks',
        impactHours: +0,
        impactQuality: -15,
        impactMorale: -10,
        impactEnergy: -25,
        narrativeResult: 'Frequent interruptions caused context switching, reducing drawing precision.',
      },
    ],
  },

  pet_to_vet: {
    id: 'pet_to_vet',
    title: 'Pet Emergency: Vet Visit Needed',
    subtitle: 'Furry family emergency',
    category: 'urgent',
    icon: 'Dog',
    prompt: 'Your beloved dog/cat swallowed a mystery plastic eraser and is whimpering at your feet.',
    options: [
      {
        text: 'Rush to emergency clinic immediately (Health first!)',
        impactHours: -3.0,
        impactQuality: +0,
        impactMorale: +35,
        impactEnergy: -20,
        overtimeNeeded: 3.0,
        narrativeResult: 'The vet extracted the toy safely! High peace of mind, overtime scheduled.',
      },
      {
        text: 'Call tele-vet hotline while continuing to refine layouts',
        impactHours: -1.0,
        impactQuality: -5,
        impactMorale: +10,
        impactEnergy: -10,
        overtimeNeeded: 1.0,
        narrativeResult: 'Tele-vet gave home remedies that stabilized pet, saving hours.',
      },
    ],
  },

  doctor_visit: {
    id: 'doctor_visit',
    title: 'Doctor Appointment / Specialist Checkup',
    subtitle: 'Personal wellness check',
    category: 'health',
    icon: 'Stethoscope',
    prompt: 'You have a scheduled medical specialist checkup that you booked 3 months ago.',
    options: [
      {
        text: 'Attend appointment and review drafting sheets on tablet in waiting room',
        impactHours: -1.5,
        impactQuality: +5,
        impactMorale: +20,
        impactEnergy: +15,
        overtimeNeeded: 1.5,
        narrativeResult: 'Health check completed with good news, and you reviewed drawings in the lobby!',
      },
      {
        text: 'Reschedule to next month to keep working non-stop',
        impactHours: +1.5,
        impactQuality: -10,
        impactMorale: -20,
        impactEnergy: -15,
        narrativeResult: 'You avoided a pause, but lingering wrist/back pain reduced long-term productivity.',
      },
    ],
  },

  kids_doctor: {
    id: 'kids_doctor',
    title: 'Pediatrician Urgent Check for Kids',
    subtitle: 'Child healthcare alert',
    category: 'family',
    icon: 'HeartPulse',
    prompt: 'Your child has developed a sudden high fever and the pediatrician has an opening in 20 minutes.',
    options: [
      {
        text: 'Take kid to doctor, administer medicine, snuggle & comfort',
        impactHours: -3.0,
        impactQuality: +0,
        impactMorale: +40,
        impactEnergy: -15,
        overtimeNeeded: 3.0,
        narrativeResult: 'Medicine prescribed and kid is resting comfortably. Heartwarming family win.',
      },
      {
        text: 'Partner takes kid while you send design updates and provide support',
        impactHours: -1.0,
        impactQuality: +0,
        impactMorale: +15,
        impactEnergy: -10,
        overtimeNeeded: 1.0,
        narrativeResult: 'Great partner teamwork kept the house afloat and tasks moving.',
      },
    ],
  },

  bio_needs: {
    id: 'bio_needs',
    title: 'Bio-Meter Alert: Eat, Hydrate & Ergonomic Break',
    subtitle: 'Physical stamina needs',
    category: 'health',
    icon: 'Utensils',
    prompt: 'You have not eaten since 8 AM, your water bottle is empty, and your posture is cramping your neck!',
    options: [
      {
        text: 'Step away for 30 mins: Healthy protein lunch, 1L water, shoulder stretches',
        impactHours: -0.5,
        impactQuality: +15,
        impactMorale: +25,
        impactEnergy: +50,
        narrativeResult: 'Energy restored to full! Your brain feels refreshed and sharp.',
      },
      {
        text: 'Grab sugary energy drink & candy bar while clicking mouse one-handed',
        impactHours: +0,
        impactQuality: -8,
        impactMorale: -10,
        impactEnergy: +10,
        narrativeResult: 'Quick sugar rush now, but sugar crash approaches in 45 minutes.',
      },
    ],
  },

  chores_and_dinner: {
    id: 'chores_and_dinner',
    title: 'Household Harmony: Laundry & Cooking Dinner',
    subtitle: 'Domestic balance checkpoint',
    category: 'home',
    icon: 'ChefHat',
    prompt: 'The laundry basket is overflowing and a wholesome dinner needs to be prepped for the household.',
    options: [
      {
        text: 'Cook a fresh dinner while listening to an architecture podcast & fold laundry',
        impactHours: -2.0,
        impactQuality: +5,
        impactMorale: +25,
        impactEnergy: -10,
        overtimeNeeded: 2.0,
        narrativeResult: 'Delicious meal enjoyed by all! Mind was stimulated by the design podcast.',
      },
      {
        text: 'Order healthy meal delivery & run quick express wash cycle',
        impactHours: -0.5,
        impactQuality: +5,
        impactMorale: +15,
        impactEnergy: +10,
        overtimeNeeded: 0.5,
        narrativeResult: 'Speedy solution! Saved 1.5 hours and had a nutritious meal.',
      },
      {
        text: 'Skip dinner, live on instant noodles, ignore laundry till the weekend',
        impactHours: +0,
        impactQuality: -15,
        impactMorale: -20,
        impactEnergy: -20,
        narrativeResult: 'Messy surroundings and poor nutrition take a heavy toll on mood.',
      },
    ],
  },

  vacation_opportunity: {
    id: 'vacation_opportunity',
    title: 'Secret Warp Zone: 2 Weeks Vacation / Holiday Day Off!',
    subtitle: 'Dream PTO Opportunity',
    category: 'vacation',
    icon: 'Palmtree',
    prompt: 'You discovered a hidden tropical warp portal! A paid holiday / 2-week vacation window is available. Will you take time off or bank the sprint?',
    options: [
      {
        text: 'Take a restorative 3-day long weekend recharge (+100% Morale, +80% Energy)',
        impactHours: -6.0,
        impactQuality: +25,
        impactMorale: +60,
        impactEnergy: +80,
        overtimeNeeded: 5.0,
        narrativeResult: 'Paradise! You recharged your soul. You have intense stamina to crush the remaining overtime blocks!',
      },
      {
        text: 'Take a 1-day mini holiday and return with laser focus',
        impactHours: -2.0,
        impactQuality: +15,
        impactMorale: +30,
        impactEnergy: +40,
        overtimeNeeded: 2.0,
        narrativeResult: 'Great balance! Fresh perspective helped you solve complex structural challenges.',
      },
      {
        text: 'Decline vacation: Stay in the studio grind and bank pure work hours',
        impactHours: +4.0,
        impactQuality: -10,
        impactMorale: -15,
        impactEnergy: -25,
        narrativeResult: 'You surged forward on raw hours (+4h), but burnout looms.',
      },
    ],
  },

  overtime_crunch: {
    id: 'overtime_crunch',
    title: 'Midnight Oil: Work Extra Hours Catch-Up',
    subtitle: 'Overtime Sprint Zone',
    category: 'urgent',
    icon: 'Moon',
    prompt: 'You have lost work hours from personal events. You enter the Late Night Studio Overtime Chamber to complete the 40-hour sprint requirement.',
    options: [
      {
        text: 'Focused 3-hour Pomodoro block with Lo-fi beats & green tea',
        impactHours: +3.5,
        impactQuality: +10,
        impactMorale: +10,
        impactEnergy: -20,
        narrativeResult: 'Incredible flow state! You logged 3.5 hours of high-precision design deliverables!',
      },
      {
        text: 'Unchecked 5-hour mega grind with double espresso shots',
        impactHours: +5.0,
        impactQuality: -15,
        impactMorale: -25,
        impactEnergy: -50,
        narrativeResult: 'Logged 5 full hours! But severe exhaustion set in.',
      },
    ],
  },
};

// Helper to get role-appropriate events by level/day
export function getRoleEventKeyForDay(dayIndex: number, role: CharacterType): string {
  switch (role) {
    case 'structure_designer': {
      const structEvents = [
        'struct_shear_stress',
        'struct_rebar_pour',
        'chores_and_dinner',
        'struct_steel_mill_delay',
        'due_date_shift',
      ];
      return structEvents[dayIndex] || 'struct_shear_stress';
    }
    case 'graphic_designer': {
      const graphicEvents = [
        'graphic_make_it_pop',
        'graphic_cmyk_gamut_nightmare',
        'kids_school',
        'graphic_corrupt_font',
        'due_date_shift',
      ];
      return graphicEvents[dayIndex] || 'graphic_make_it_pop';
    }
    case 'floor_plan_designer': {
      const planEvents = [
        'plan_plumbing_clash',
        'plan_ada_corridor',
        'chores_and_dinner',
        'plan_5_beds_tiny_loft',
        'due_date_shift',
      ];
      return planEvents[dayIndex] || 'plan_plumbing_clash';
    }
    case 'conceptual_designer': {
      const conceptEvents = [
        'concept_budget_slash',
        'concept_render_gpu_crash',
        'pet_to_vet',
        'concept_creative_breakthrough',
        'due_date_shift',
      ];
      return conceptEvents[dayIndex] || 'concept_budget_slash';
    }
    default:
      return 'missing_info';
  }
}
