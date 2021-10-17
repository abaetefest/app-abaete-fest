import { http } from './http'
import UsersService from 'src/services/user/user.service'
import CategoryService from 'src/services/category/category.service'
import FilesService from 'src/services/files/files.service'
import EventsService from 'src/services/events/events.service'

export default {
  users: () => new UsersService(http),
  category: () => new CategoryService(http),
  files: () => new FilesService(http),
  events: () => new EventsService(http)
}
