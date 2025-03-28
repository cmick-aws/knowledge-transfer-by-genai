import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Patch,
  Body,
  Sse,
} from "@nestjs/common";
import { AlertService } from "./alert.service";
import {
  Alert,
  Meeting,
  Status,
} from "@industrial-knowledge-transfer-by-genai/common";

@Controller("alert")
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Get("")
  async getAlerts(): Promise<Alert[]> {
    return await this.alertService.getAlerts();
  }

  @Get("/:alertId")
  async getAlert(@Param("alertId") alertId: string): Promise<Alert> {
    return await this.alertService.getAlert(alertId);
  }

  @Post("/dummy")
  async createDummyAlert(@Body("language") language?: string): Promise<Alert> {
    return await this.alertService.createDummyAlert(language);
  }

  @Delete("/:alertId")
  async deleteAlert(@Param("alertId") alertId: string): Promise<void> {
    await this.alertService.deleteAlert(alertId);
  }

  @Delete("")
  async deleteAllAlerts(): Promise<void> {
    await this.alertService.deleteAllAlerts();
  }

  @Patch("/:alertId/status")
  async updateAlertStatus(
    @Param("alertId") alertId: string,
    @Body("status") status: Status
  ): Promise<void> {
    await this.alertService.updateAlertStatus(alertId, status);
  }

  @Patch("/:alertId/close")
  async closeWithComment(
    @Param("alertId") alertId: string,
    @Body("comment") comment: string
  ): Promise<void> {
    await this.alertService.closeWithComment(alertId, comment);
  }

  @Get("/:alertId/meetings")
  async getAllMeetingsByAlertId(
    @Param("alertId") alertId: string
  ): Promise<Meeting> {
    return await this.alertService.getAllMeetingsByAlertId(alertId);
  }

  @Get("/:alertId/meetings/:meetingId/video-url")
  async getMeetingVideoUrl(
    @Param("meetingId") meetingId: string
  ): Promise<string> {
    return await this.alertService.issueMeetingVideoUrl(meetingId);
  }

  @Get("/:alertId/meetings/:meetingId/transcript-url")
  async getMeetingTranscript(
    @Param("meetingId") meetingId: string
  ): Promise<string> {
    return await this.alertService.issueMeetingTranscriptUrl(meetingId);
  }

  @Get("/:alertId/meetings/:meetingId/summarized-transcript-url")
  async getSummarizedTranscript(
    @Param("meetingId") meetingId: string
  ): Promise<string> {
    return await this.alertService.issueSummarizedTranscriptUrl(meetingId);
  }
}
