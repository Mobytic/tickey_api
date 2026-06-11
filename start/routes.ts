import TicketsController from '#controllers/tickets_controller'
import AuthController from '#controllers/auth_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import CategoriesController from '#controllers/categories_controller'
import TicketStatusesController from '#controllers/ticket_statuses_controller'
import NametagsController from '#controllers/nametags_controller'
import mail from '@adonisjs/mail/services/main'
import TicketCreatedClient from '#mails/ticket_created_client_notification'
import TicketCreatedAgency from '#mails/ticket_created_agency_notification'

router.group(() => {
  router.group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.get('test-mail', async ({ response }) => {
        // On invente un faux ticket avec une fausse relation "user"
        const fakeTicket = {
            title: 'Test technique depuis Postman',
            user: {
                mail: 'test@mobytic.com' // METS TA VRAIE ADRESSE ICI !
            }
        } as any

        // On envoie les deux mails en direct (pas de sendLater, on veut voir si ça plante tout de suite)
        await mail.send(new TicketCreatedClient(fakeTicket))
        await mail.send(new TicketCreatedAgency(fakeTicket))

        return response.ok('Les deux mails de test sont partis !')
    })
  }).prefix('auth')

  router.group(() => {
    router.group(() => {
      router.get('users', [AuthController, 'index'])
      router.get('profile', [AuthController, 'show'])
      router.post('logout', [AuthController, 'logout'])
      router.patch('update/:id', [AuthController, 'update'])
      router.get('websites', [AuthController, 'websiteIndex'])
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

    router.group(() => {
      router.get('', [NametagsController, 'index'])
      router.post('create', [NametagsController, 'create'])
      router.patch(':id', [NametagsController, 'update'])
      router.delete(':id', [NametagsController, 'delete'])
    }).prefix('nametag')

  }).use(middleware.auth())

}).prefix('/api/v1')
