import { UserDao } from "@dao/userDao";
import { GetUserByBrowserId, SetTrustedIdInput } from "../types/authTypes";
import { User } from "@model/models";


export class TrustedId {
  private readonly userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  async setTrustedId(input: SetTrustedIdInput) {
    try {
      const userHashId = input.user.hashId;
      const trustedId = input.trustedId;
      const oldTrustedIdList = Array.from(input.user.trustedIdList);
      await this.userDao.update(userHashId, { trustedIdList: [...oldTrustedIdList, trustedId] });
      return { status: 'success' };
    } catch (e) {
      console.log("setTrustedId", e.message);
      throw Error(e.message);
    }
  }

  async getUserByBrowserId(body: GetUserByBrowserId) {
    try {
      const browserId = body.browserId;
      const user: User | undefined = (await this.userDao.getByFilter(`any browserIdList = ${body.browserId}`))[0];
      if (!user) { throw new Error(`user is not found by browserId ${browserId}`); }
    } catch (e) {
      console.error(`getUserByBrowserId ${e.message}`);
      throw e;
    }
  }
}