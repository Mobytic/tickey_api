import TicketsController from '#controllers/tickets_controller'
import AuthController from '#controllers/auth_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import CategoriesController from '#controllers/categories_controller'
import TicketStatusesController from '#controllers/ticket_statuses_controller'


router.group(() => {
  router.group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
  }).prefix('auth')

  router.group(() => {
    router.group(() => {
      router.get('profile', [AuthController, 'show'])
      router.post('logout', [AuthController, 'logout'])
      router.patch('update/:id', [AuthController, 'update'])
    }).prefix('auth')

    router.group(() => {
      router.get('', [TicketsController, 'index'])
      router.post('create', [TicketsController, 'create'])
      router.get(':id', [TicketsController, 'show'])
      router.patch(':id', [TicketsController, 'update'])
    }).prefix('tickets')

    router.group(() => {
      router.get('', [CategoriesController, 'index'])
      router.post('create', [CategoriesController, 'create'])
      router.patch(':id', [CategoriesController, 'update'])
      router.delete(':id', [CategoriesController, 'delete'])
    }).prefix('category')

    router.group(() => {
      router.get('', [TicketStatusesController, 'index'])
      router.post('create', [TicketStatusesController, 'create'])
      router.patch(':id', [TicketStatusesController, 'update'])
      router.delete(':id', [TicketStatusesController, 'delete'])
    }).prefix('ticketStatus')

  }).use(middleware.auth())

}).prefix('/api/v1')
