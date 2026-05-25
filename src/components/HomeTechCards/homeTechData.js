export const homeTechCards = [
  {
    id: 'pulse',
    index: '01',
    title: 'RAW IMPACT PULSE',
    image: '/Image1.png',
    imageAlt: 'Helmet impact detection visualization',
    icon: 'pulse',
    stepTitle: 'Detect impact',
    description:
      'A shock sensor on the helmet captures the raw kinetic pulse at the moment of impact and streams it to the cloud for logging.',
  },
  {
    id: 'signal',
    index: '02',
    title: 'ADVANCED SIGNAL PROCESSING',
    image: '/Image2.png',
    imageAlt: 'ESP32 signal processing board schematic',
    icon: 'wave',
    stepTitle: 'Analyze the signal',
    description:
      'The ESP32 board filters accelerometer data in real time, finds waveform peaks, and classifies severity before anything reaches the dashboard.',
  },
  {
    id: 'telemetry',
    index: '03',
    title: 'SENSOR TELEMETRY',
    image: '/Image3.png',
    imageAlt: 'On-helmet sensor module with LED status',
    icon: 'chart',
    stepTitle: 'Report telemetry',
    description:
      'The edge module fuses accel and gyro readings, drives LED and voice feedback on-helmet, and wirelessly uploads live status to your dashboard.',
    callout: {
      title: 'VOICE ENGINE',
      detail: '12–36 Hz OUTPUT',
    },
    legend: [
      { level: 'green', label: 'LOW IMPACT: < 20 Severity Score' },
      { level: 'yellow', label: 'MODERATE: 20-70 Severity Score' },
      { level: 'red', label: 'HIGH IMPACT: > 70 Severity Score' },
    ],
  },
];
