import MetropolisMediumFont from './fonts/Metropolis-Medium.woff'
import MetropolisBoldFont from './fonts/Metropolis-SemiBold.woff'
import RobotoRegularFont from './fonts/Roboto-Regular.woff'
import RobotoMediumFont from './fonts/Roboto-Medium.woff'
import RobotoBoldFont from './fonts/Roboto-Bold.woff'

const MetropolisRegular = {
  fontFamily: 'Metropolis',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
      local('Metropolis'),
      local('Metropolis-Medium'),
      url(${MetropolisMediumFont}) format('woff')
    `,
}

const MetropolisBold = {
  fontFamily: 'Metropolis',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `
      local('Metropolis'),
      local('Metropolis-Bold'),
      url(${MetropolisBoldFont}) format('woff')
    `,
}

const RobotoRegular = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
      local('Roboto'),
      local('Roboto-Regular'),
      url(${RobotoRegularFont}) format('woff')
    `,
}

const RobotoMedium = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `
        local('Roboto'),
        local('Roboto-Medium'),
        url(${RobotoMediumFont}) format('woff')
      `,
}

const RobotoBold = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
      local('Roboto'),
      local('Roboto-Bold'),
      url(${RobotoBoldFont}) format('woff')
    `,
}

const fontObject = {
  MetropolisRegular,
  MetropolisBold,
  RobotoRegular,
  RobotoMedium,
  RobotoBold,
}

export default fontObject
