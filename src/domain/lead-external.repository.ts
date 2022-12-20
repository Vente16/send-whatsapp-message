export interface Message {
  message: string;
  phone: string;
}


export default interface LeadExternal {
  sendMsg(phones: Message[]): Promise<any>;
}