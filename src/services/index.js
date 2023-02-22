import { http } from './http'
import UsersService from 'src/services/user/user.service'
import CategoryService from 'src/services/category/category.service'
import FilesService from 'src/services/files/files.service'
import EventsService from 'src/services/events/events.service'
import TourismService from 'src/services/tourism/tourism.service'
import ServiceCategoriesService from 'src/services/servicesCategories/servicesCategories.service'

export default {
  users: () => new UsersService(http),
  category: () => new CategoryService(http),
  files: () => new FilesService(http),
  events: () => new EventsService(http),
  tourism: () => new TourismService(http),
  serviceCategories: () => new ServiceCategoriesService(http)
}
