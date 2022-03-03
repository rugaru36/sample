import { UserDao } from '@dao/userDao';
import { DocumentDao } from '@dao/documentDao';
import { EmailService } from '../email/emailService';

export class ApiService {
  private readonly documentDao: DocumentDao = new DocumentDao();
  private readonly emailService: EmailService = new EmailService();
  private readonly userDao: UserDao = new UserDao();

  constructor() { }

}