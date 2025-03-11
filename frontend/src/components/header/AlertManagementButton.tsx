import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { AiOutlineAlert } from "react-icons/ai";
import useAlert from "@/features/alert/hooks/useAlert";
import { useTranslation } from "react-i18next";

function AlertManagementButton() {
  const { createDummyAlert, clearAlerts } = useAlert();
  const { t, i18n } = useTranslation();

  const createDummyAlertWithCurrentLanguage = () => {
    // 現在のi18n言語設定を使用してダミーアラートを作成
    createDummyAlert(i18n.language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 px-0 py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
        >
          <AiOutlineAlert className="size-[1.2rem]" />
          <span className="sr-only">Manage alerts</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={createDummyAlertWithCurrentLanguage}>
          {t("alertManagement.createDummyAlert")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={clearAlerts}>
          {t("alertManagement.clearAllAlerts")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AlertManagementButton;