import { PhonePasswordAuthInput } from '@service/auth/types/authTypes'
import { UserService } from '@service/user/userService'
import { User } from '@model/models'

export class PhonePassword {
  private userService: UserService
  constructor() {
    this.userService = new UserService
  }
  async phonePasswordAuth (body: PhonePasswordAuthInput): Promise<User> {
    try {
      let phone: string = body.phone || ''
      let password: string = body.password || ''
      if (phone === '') throw Error('no phone')
      if (password === '') throw Error('no password')
      let user: User = await this.userService.getByPhonePassword(phone, password)
      if (user) return user
      else throw Error('no user found')
      return user
    } catch (e) {
      console.error(`phonePasswordAuth ${e.message}`)
      throw Error(e.message)
    }
  }
}