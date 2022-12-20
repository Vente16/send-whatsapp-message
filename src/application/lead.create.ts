import LeadExternal, { Message } from "../domain/lead-external.repository";
import LeadRepository from "../domain/lead.repository";

export class LeadCreate {
  private leadRepository: LeadRepository;
  private leadExternal: LeadExternal;
  constructor(respositories: [LeadRepository, LeadExternal]) {
    const [leadRepository, leadExternal] = respositories;
    this.leadRepository = leadRepository;
    this.leadExternal = leadExternal;
  }

  public async sendMessageAndSave(phones: Message[]) {
    //const responseDbSave = await this.leadRepository.save({ message, phone });//TODO DB
    const responseExSave = await this.leadExternal.sendMsg(phones); //TODO enviar a ws
    return { responseExSave };
  }
}
