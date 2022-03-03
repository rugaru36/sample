import { EmailPasswordAuthInput } from '@service/auth/types/authTypes'
import { SetPasswordInput } from '@service/auth/types/authTypes'
import { ChangePasswordInput } from '@service/auth/types/authTypes'
import { UserService } from '@service/user/userService'
import { User } from '@model/models'

export class EmailPassword {
  private userService: UserService
  constructor() {
    this.userService = new UserService
  }
  async emailPasswordSignIn (body: EmailPasswordAuthInput): Promise<User> {
    try {
      let email: string = body.email || ''
      let password: string = body.password || ''
      if (email === '') throw Error('no email')
      if (password === '') throw Error('no password')
      let user: User = await this.userService.getByEmailPassword(email, password)
      if (user) return user
      else throw Error('no user')
    } catch (e) {
      console.error(`phonePasswordAuth ${e.message}`)
      throw Error(e.message)
    }
  }

  async setPassword (body: SetPasswordInput) {
    try {
      let password: string = body.password
      let email: string = body.email
      await this.userService.createUser({ password, email })
      return { status: 'success' }
    } catch (e) {
      console.error(`changePassword ${e.message}`)
      throw Error(e.message)
    }
  }

  async changePassword (body: ChangePasswordInput) {
    try {
      console.log(`changePassword GO!`)
      let email = body.email
      let password = body.password
      let user = await this.userService.getByEmail(email)
      if (user) {
        this.userService.updateUser({ password }, user.hashId)
        return { status: 'success' }
      } else {
        throw Error('no user')
      }
    } catch (e) {
      console.error(`changePassword ${e.message}`)
      throw Error(e.message)
    }
  }

  // async checkEmailPassword (body: CheckEmailPasswordReqBody): Promise<boolean> {
  //   try {
  //     let email: string = body.email || ''
  //     let password: string = body.password || ''
  //     if (email === '') throw Error('no email')
  //     if (password === '') throw Error('no password')
  //     let user: User = await this.userService.getByEmailPassword(email, password)
  //     if (user) return true
  //     else return false
  //   } catch (e) {
  //     console.error(`checkEmailPassword ${e.message}`)
  //     throw Error(e.message)
  //   }
  // }
}
