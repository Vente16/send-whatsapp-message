import WAWebJS, { Client, LocalAuth } from "whatsapp-web.js";
import { image as imageQr } from "qr-image";
import LeadExternal, { Message } from "../../domain/lead-external.repository";

/**
 * Extendemos los super poderes de whatsapp-web
 */

const enviroment = process.env.NODE_ENV || "development";
const puppeteerConfig =
  enviroment === "development"
    ? { headless: true }
    : {
        headless: true,
        executablePath: "/usr/bin/chromium-browser",
        args: ["--no-sandbox", "--headless", "--disable-gpu"],
      };
class WsTransporter extends Client implements LeadExternal {
  private status = false;

  constructor() {
    super({
      authStrategy: new LocalAuth({ clientId: "client-one" }),
      puppeteer: puppeteerConfig,
    });

    console.log("Iniciando....");

    this.initialize();

    this.on("ready", () => {
      this.status = true;
      console.log("LOGIN_SUCCESS");
    });

    this.on("auth_failure", () => {
      this.status = false;
      console.log("LOGIN_FAIL");
    });

    this.on("qr", (qr) => {
      console.log("Escanea el codigo QR que esta en la carepta tmp");
      this.generateImage(qr);
    });
  }

  /**
   * Enviar mensaje de WS
   * @param lead
   * @returns
   */
  async sendMsg(phones: Message[]): Promise<any> {
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });

      const promises: Promise<WAWebJS.Message>[] = [];
      phones.forEach(({ phone, message }) => {
        promises.push(this.sendMessage(`${phone}@c.us`, message));
      });

      const result = await Promise.allSettled(promises);
      const responses = result.map((promise, index) => ({
        phone: phones[index].phone,
        message: phones[index].message,
        sent: promise.status === "fulfilled",
        whatsappId: promise.status === "rejected" ? null : promise.value.id.id,
      }));

      return {
        status: 200,
        message: "Messages have been sent successfully",
        hasError: false,
        responses,
      };
    } catch (e: any) {
      return Promise.resolve({ error: e.message, hasError: true });
    }
  }

  getStatus(): boolean {
    return this.status;
  }

  private generateImage = (base64: string) => {
    const path = `${process.cwd()}/tmp`;
    let qr_svg = imageQr(base64, { type: "svg", margin: 4 });
    qr_svg.pipe(require("fs").createWriteStream(`${path}/qr.svg`));
    console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
    console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
  };
}

export default WsTransporter;
