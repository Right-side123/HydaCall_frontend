export const callInsightsData = {
  inbound: {
    mostCalls: [
      { caller: "15565465", sim: "SIM-1", count: 2 },
      { caller: "1234567890", sim: "SIM-2", count: 1 },
    ],
    talkTime: [
      { caller: "15565465", sim: "SIM-1", duration: "00:02:00" },
    ]
  },
  outbound: {
    mostCalls: [
      { caller: "9999999999", sim: "SIM-3", count: 3 },
    ],
    talkTime: [
      { caller: "8888888888", sim: "SIM-4", duration: "00:01:30" },
    ]
  }
};

export const callbackInsightsData = {
  missedAndCallback: {
    missed: [
      { sim: '9599663485 - Shalu - Noida H.R', count: 4 },
    ],
    callback: [
      { sim: '9828282828 - Amit - Mumbai', count: 3 },
    ]
  }
};
