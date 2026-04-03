// Mock data for Toolify application

export const tools = [
  {
    id: "MK-0912",
    name: "Makita Impact Driver",
    spec: "18V LITHIUM-ION / BRUSHLESS",
    status: "available",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClHw_e6WhgrGEw-fxyRlPoaotFGXrhwE5vb48OtuFaxUJJLHfJETJmkE9xICuBWiwa4lJTiuZlXhk-9O-aN4UKry1AjJWlWgGsOoVqzf7hIi9BsBAZ7A7pXmgbmZT9LMMDajiA8TXjCdAnPZQTo-0Rsh-2cu_pnKs6KtiY6RbNMlNoEqZLqn60DkYA-qLv_kWzpoMynMDWvwOOBvuqkeRD0ZkAXFjWaERXjdLmC7RJFLf-r6FFKe9AZ21kwIqjnJ7uRZKyO3HXph4",
    category: "Heavy Duty // Cordless",
    powerOutput: "1500_IN_LBS",
    serialId: "8829-MK-90",
  },
  {
    id: "DW-4401",
    name: "DeWalt Miter Saw",
    spec: "12-INCH / COMPOUND SLIDE",
    status: "in_use",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKwegRN0Eh6CA7ICEEFusCfNXmTnKMe2s216vNkHGxRX4SwhhFk_kuS_iQY8miD2ADto4J7JYQvZiCqECMTE7agr3fHVhISCKay43sG8aWg0Tqs16msee5Ars6TkRBjCvdzuoFKGhiooCbCgsVnF5wHBr3j-bEBiOVjMYNylEbxPP_S4roIVtGPannlaq6IkBETBUqtPMmw1uBinhXhS3mfjqlyAPCXtMMQQqwhYQ5sQ3dxuekztVrfujV-KpkjXUd1yk7wR5XSt8",
    lockedUntil: "09/24",
    borrower: "OPERATOR_12",
  },
  {
    id: "BS-2209",
    name: "Bosch Rotary Hammer",
    spec: "SDS-PLUS / 8.0 AMP",
    status: "available",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBn7ToLmouPkdUNYsMoEu_xIydi4kwnXs0-1CS-82Wr5QlQgUffjduZzntimJGOP9HHTHhz8gIxjUSkS0Kjgfet0cBhKdVGQCEMNQHbFuNHCLRPhQHcv9UeWfFs55p0KKn5Cra7E2Ne2syB0XJ6E2Z-lvulUyIDAnqGINC4vSJVgdVhvC-bzKSVWSRilpBP5UdsCyQJCn6xS59ZivkYMAjVZCHg6W2--XJWztyYZSgQuBoj_Dva4QWvPTLV72aiQz-MBjY3x5JkCEw",
    category: "Heavy Duty",
  },
];

export const activeLeases = [
  {
    id: 1,
    name: "BOSCH_DRILL_V2",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwBKlpEemvyjwgcxQ9TxZZqWWXiqD1MgEaB8dZhbbMxYUBHT1862_7uJ9QYyGMrK26b2xgazsEHUDi8Zzwtvv81kfcN6skF0ApslUiaz_sTjjpkQHERw9e0Dua37nqwmh3YRWlt3tgRt1FJqCQygQs3NAXtEqP1bQ8HAAmL6e7B57NZS4rUEJkjYjuDP1y-kxESjW5F6tC3OKvFtxCVbFgmixC5ffQrnM4zm7A51LLTU6NjH_omww2S73NpvoF2pKrfVqQ5WYVvA4",
    status: "IN_USE",
    remainingTime: "48:12:05",
  },
  {
    id: 2,
    name: "PRECISION_CALIB_KIT",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdJn8MZ6wOT-636-0Rr7qY-iuAov-fIKEgzKaHJwokuaWqCneQrdsu2cXikiTbWGnmXgzbHWTQMIHjbH7qAyFrJk2-Gzw8M8JljSj350DA7KruQ0QTw3WFRpFXRzqIMC2_l8xF1ecrSpDkMTrn4DZjWcRssblzghnYEaqY7Xs9K6G0fFF1E7shkZpmg7kztFC3R0gSnjTsHIRhbAlPUEmyNyNwOESpVJEp9_X2Kj-wFprsC-2Lb2adV4936ct3tXQh1zIWA8hYV9M",
    status: "IN_USE",
    remainingTime: "12:44:59",
  },
];

export const inventoryItems = [
  {
    id: "PWR-772",
    name: "IMPACT_DRIVER_V2",
    status: "lent",
    borrower: "OPERATOR_ALEX",
    dueDate: "24.08.12",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqTWcaTgcIGDBB-E_LXB25fL69NcqWcgxxAWpw0UEGZ8fh0Z99ZQPg_gHzVodlRAqSu7z_4nzq9XHyl5d69lVZYmM4n4OBVpJ_goPzRaF1j9HU6IFsLWszvImAPFxPCGg000bBn78eIdaNiM1evBA3b80HaUg2bVr8kUGCDqlOf1MBR6MWcHPxJHc_EsZM2zTFmGjec9Hh6pewK1w9tgjVXEvgIiLOpNf7IRZZo7bH0hB_8WRnZr4gpZcp1-fGLRYKN1LaRIr1xiY",
  },
  {
    id: "MSG-012",
    name: "LASER_SCANNER_PRO",
    status: "ready",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzD7u300P8RYMSCP9H6BYsUtlJEKPzSAWu68Bd8epHs5mMk_RXVy3-VCwbgKwdaLjCCj2wSULBI5X4CE7Jdy0Pjo4AEPyIyLf7xhS9bGFQ5QEqHzAiOEiqrjSNdD_GQZt57upMboJJPcj1UPFw5JJ-6i1HMeOoWf53GmLSaAaG0CWdTas8Af2qWV1u268F6xMf91ko75qD-G5CmvI4VbJTZgK838XmJYU6yV4Ttz6qn4HtQ17GVNOFtUfvvS0yEU1TZ9Y1KKFnpqc",
  },
];

export const activityFeed = [
  { time: "14:22:01", user: "USER_882", action: "REQUESTED", target: "BOSCH_DRILL_V2", type: "request" },
  { time: "14:15:44", user: "OPERATOR_91", action: "RETURNED", target: "HILTI_LASER_MEASURE", type: "return" },
  { time: "13:59:12", user: "SYSTEM", action: "BROADCAST", target: "NEW_NODE_JOINED_SECTOR_7", type: "system" },
  { time: "13:42:05", user: "USER_771", action: "HANDOVER_COMPLETE", target: "UNIT_42_ALPHA", type: "handover" },
  { time: "12:11:00", user: "USER_882", action: "LEASE_EXPIRED", target: "DEWALT_PLANER_X", type: "expired" },
  { time: "11:55:22", user: "OPERATOR_12", action: "REQUESTED", target: "MAKITA_JIGSAW_900", type: "request" },
  { time: "11:02:41", user: "SYSTEM", action: "AUTHENTICATING", target: "SECTOR_GATEWAY_V1", type: "system" },
  { time: "10:45:09", user: "USER_449", action: "REQUESTED", target: "BOSCH_DRILL_V2", type: "request" },
];

export const dataTapeMessages = [
  "System Status: OPTIMAL",
  "NEW_REQUEST: HEAVY_DUTY_HAMMER_DRILL_V4",
  "LOCAL_TRUST_INDEX: 0.982",
  "UPLOADING_LOGS_TO_LEDGER...",
  "ENCRYPTION_LAYER: RSA_4096_ACTIVE",
  "CORE_SYSTEM_HEALTH: 100%",
  "ACTIVE_USERS: 1,402",
  "NETWORK_LATENCY: 14MS",
  "SYNC_STATUS: NOMINAL",
  "SECURITY_PROTOCOL: V4_ACTIVE",
];

export const reputationData = {
  trustIndex: 982.5,
  protocolAdherence: 98,
  equipmentCareScore: 94,
  successfulHandovers: 12,
  failureProtocols: 0,
};

export const dashboardMetrics = {
  uptime: "142:12:08",
  authId: "882-99-ALPHA-X",
};
