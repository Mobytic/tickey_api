import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')


router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [AuthController, 'register'])
        router.post('login', [AuthController, 'login'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [AuthController, 'show'])
        router.post('logout', [AuthController, 'logout'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
