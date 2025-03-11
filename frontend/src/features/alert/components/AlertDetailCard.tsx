import { Alert } from "@/types/alert";
import { Card } from "@/components/ui/card";
import { getSeverityColor, getStatusColor } from "@/features/alert/utils/color";
import { LuCheck, LuFlame } from "react-icons/lu";
import { useTranslation } from "react-i18next";

function AlertDetailCard({ item }: { item: Alert }) {
  const severityColor = getSeverityColor(item.severity);
  const statusColor = getStatusColor(item.status);
  const { t } = useTranslation();

  return (
    <>
      <Card className="space-y-4 px-12 py-4">
        <div className="grid grid-cols-[4rem,auto,4rem] items-center">
          <div className="flex items-center">
            <span
              className="inline-block rounded-full border-2 p-2"
              style={{
                borderColor: statusColor || severityColor,
                backgroundColor: statusColor || severityColor,
              }}
            >
              {item.status === "OPEN" ? (
                <LuFlame className="size-5 text-white" />
              ) : (
                <LuCheck className="size-5 text-white" />
              )}
            </span>
          </div>
          <div className="flex flex-col font-semibold leading-5">
            <span>{item.status}</span>
            <span
              style={{
                color: severityColor,
              }}
            >
              {item.severity}
            </span>
          </div>
        </div>
        <div className="space-y-2 py-2">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t("alertDetail.card.alertId")}:
            </label>
            <div>{item.id}</div>
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t("alertDetail.card.openedAt")}:
            </label>
            <div>{new Date(item.openedAt).toLocaleString()}</div>
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t("alertDetail.card.name")}:
            </label>
            <div>{item.name}</div>
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t("alertDetail.card.description")}:
            </label>
            <div>{item.description}</div>
          </div>
          <hr />
          <div className="pt-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t("alertDetail.card.closedAt")}:
            </label>
            <div>
              <div>
                {item.closedAt && new Date(item.closedAt).toLocaleString()}
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t("alertDetail.card.comment")}:
            </label>
            <div>{item.comment}</div>
          </div>
        </div>
      </Card>
    </>
  );
}
export default AlertDetailCard;