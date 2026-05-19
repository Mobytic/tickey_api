import TicketsController from '#controllers/tickets_controller'
import AuthController from '#controllers/auth_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'


router.group(() => {
  router.group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
  }).prefix('auth')

  router.group(() => {
    router.group(() => {
      router.get('profile', [AuthController, 'show'])
      router.post('logout', [AuthController, 'logout'])
    }).prefix('auth')

    router.group(() => {
      router.get('', [TicketsController, 'index'])
      router.get(':id', [TicketsController, 'show'])
      router.patch(':id', [TicketsController, 'update'])
    }).prefix('tickets')

  }).use(middleware.auth())

}).prefix('/api/v1')
