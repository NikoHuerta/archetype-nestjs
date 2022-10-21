export enum ValidaUserResponseCodes {
  Success = '00',
  // Rut incorrecto
  IdOrVerifyingDigitError = '998',
  // Canal ingresado es invalido
  InvalidChannel = '0006',
  // Problema Connexion IDG
  NetworkError = '-1',
  // Usuario No Existe en IDG
  UserDoesNotExistInSS = '5203004',
  // Usuario No Existe en IDG
  UserDoesNotExistInSS2 = '5203111',
  // Password incorrecta
  IncorrectPassword = '5203113',
  // Usuario se bloqueara
  UserWillBeBlocked = '5203017',
  // Usuario bloqueado
  UserBlocked = '5203016',
  // Debe cambiar su password, por favor comunicarse al 600 200 1200
  ChanguePasswordRequired = '5203112',
  // Usuario se encuentra registrado en múltiples grupos
  MultipleGroups = '5202096',
  // El usuario debe realizar un cambio de contraseña para su contraseña denominada SIT. La contraseña ha caducado o un administrador ha forzado un cambio de contraseña.
  ForcedPassword = '5203112',
  // Passwod invalida intento 1
  FailOne = '4024',
  // Passwod invalida intento 2
  FailTwo = '4025',
  // Passwod invalida intento 3 - se bloquea
  FailThree = '4026',
}
