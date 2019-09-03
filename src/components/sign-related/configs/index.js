import {
  formHeaderConfig as loginHeader,
  submitConfig as loginSubmitConfig,
} from '@components/sign-related/configs/login-form'
import { formHeaderConfig as authStudentHeader } from '@components/sign-related/configs/auth-student-form'

export default {
  headerConfig: {
    login: loginHeader,
    authentication_student: authStudentHeader,
  },
  submitFuncs: {
    login: loginSubmitConfig,
  },
}
