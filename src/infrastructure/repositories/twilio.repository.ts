import "dotenv/config";
import { Twilio } from "twilio";
import LeadExternal, { Message } from "../../domain/lead-external.repository";

const accountSid = process.env.TWILIO_SID || "";
const authToken = process.env.TWILIO_TOKEN || "";
const fromNumber = process.env.TWILIO_FROM || "";

export default class TwilioService extends Twilio implements LeadExternal {
  constructor() {
    super(accountSid, authToken);
  }
  async sendMsg(phones: Message[]): Promise<any> {
    try{
        const responses: any[] = [];
        phones.forEach(async ({ message, phone }) => {
          const parsePhone = `+${phone}`
          const mapMsg = { body: message, to: parsePhone, from: fromNumber };
          const response = await this.messages.create(mapMsg);
          responses.push(response);
        });
        return responses;
    }catch(e){
        console.log(e)
        return Promise.reject(e)
    }
  }
}

