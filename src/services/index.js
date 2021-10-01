import { http } from './http'
import UserService from 'src/services/user/user.service'
import OccupationService from 'src/services/occupation/occupation.service'
import CategoryService from 'src/services/category/category.service'
import JobService from 'src/services/job/job.service'
import FilesService from 'src/services/files/files.service'
import CoursesService from 'src/services/courses/courses.service'
import ServicesService from 'src/services/services/services.service'

export default {
  user: () => new UserService(http),
  occupation: () => new OccupationService(http),
  category: () => new CategoryService(http),
  job: () => new JobService(http),
  files: () => new FilesService(http),
  courses: () => new CoursesService(http),
  services: () => new ServicesService(http)
}
