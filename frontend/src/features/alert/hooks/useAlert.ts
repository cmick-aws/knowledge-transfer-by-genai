import { Alert } from "industrial-knowledge-transfer-by-genai";

const useAlert = () => {
  const alerts: Alert[] = [
    {
      id: "1",
      name: "Alert 1",
      description: "This is alert 1",
      openedAt: "2021-08-01",
      closedAt: "2021-08-02",
      status: "OPEN",
      severity: "CRITICAL",
      comment: "",
      meetingIds: [],
    },
    {
      id: "2",
      name: "Alert 2",
      description: "This is alert 2",
      openedAt: "2021-08-01",
      closedAt: "2021-08-02",
      status: "CLOSED",
      severity: "HIGH",
      comment: "This is a comment",
      meetingIds: [],
    },
    {
      id: "3",
      name: "Alert 3",
      description: "This is alert 3",
      openedAt: "2021-08-01",
      closedAt: "2021-08-02",
      status: "OPEN",
      severity: "MEDIUM",
      comment: "",
      meetingIds: [],
    },
    {
      id: "4",
      name: "Alert 4",
      description: "This is alert 4",
      openedAt: "2021-08-01",
      closedAt: "2021-08-02",
      status: "CLOSED",
      severity: "LOW",
      comment: "This is a comment",
      meetingIds: [],
    },
  ];

  const updateAlert = (alert: Alert) => {
    console.log(`Updating alert ${alert.id}`);
    return;
  };

  return {
    alerts,
    updateAlert,
  };
};
export default useAlert;
