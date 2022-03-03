import { UserDao } from "@dao/userDao";
import { RegistrationInput } from "@service/auth/types/authTypes";
import { User, Document, DocumentEvent, BillingPlan } from "@model/models";
import { DocumentDao } from "@dao/documentDao";
import { DocumentEventDao } from "@dao/documentEventDao";
import { BillingPlanDao } from "@dao/billingPlanDao";

export class RegistrationService {
  private userDao: UserDao = new UserDao();
  private documentDao: DocumentDao = new DocumentDao();
  private documentEventDao: DocumentEventDao = new DocumentEventDao();
  private billingPlanDao: BillingPlanDao = new BillingPlanDao();

  constructor() {
  }

  public async registration(input: RegistrationInput) {
    try {
      const firstName: string = input.firstName;
      const lastName: string = input.lastName;
      const middleName: string = input.middleName;
      const language: string = input.language;
      const email: string = input.email.toLowerCase();
      const existingUserByEmail = (await this.userDao.getByFilter(`email = "${email}"`))[0];
      const billingPlan: BillingPlan = await this.getFreeBillingPlan();
      const userData: { [key: string]: any; } = { firstName, lastName, middleName, email, language, billingPlan };
      if (existingUserByEmail) { await this.setUserNameToExistingDocuments(existingUserByEmail.hashId, firstName, lastName); }
      return existingUserByEmail
        ? await this.userDao.update(existingUserByEmail.hashId, userData)
        : await this.userDao.save(userData);
    } catch (e) {
      console.error(`registration err: ${e}`);
      throw Error(e.message);
    }
  }

  private async setUserNameToExistingDocuments(userHashId: string, firstName: string, lastName: string) {
    const userName = `${firstName} ${lastName}`;
    const documents: Document[] = await this.documentDao.getByFilter(`guestUserHashId = "${userHashId}"`);
    for (let document of documents) {
      await this.documentDao.update(document.hashId, { guestUserName: userName });
      await this.setUserNameToExistingDocumentEvents(document.hashId, userName);
    }
  }

  private async setUserNameToExistingDocumentEvents(documentHashId: string, userName: string) {
    const documentEvents: DocumentEvent[] = await this.documentEventDao.getByFilter(`documentHashId = "${documentHashId}"`);
    for (let docEvent of documentEvents) {
      await this.documentEventDao.update(docEvent.hashId, { guestUserName: userName });
    }
  }

  private async getFreeBillingPlan(): Promise<BillingPlan> {
    try {
      var freePlan: BillingPlan | undefined = (await this.billingPlanDao.getByFilter(`isFree = true`))[0];
      if (!freePlan) {
        freePlan = await this.billingPlanDao.save({
          isFree: true,
          price: 0,
          outgoingDocsPerMonth: 50,
          name: 'Promo'
        });
      }
      if (!freePlan) throw Error(`cant get free billing plan!`);
      return freePlan;
    } catch (e) {
      console.error(`getFreeBillingPlan: ${e.message}`);
      throw Error(e.message);
    }
  }
}