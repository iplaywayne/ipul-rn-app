import Config from 'react-native-config'
import { NativeModules } from 'react-native';

const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];
const port = address.split(':')[1];

export const HOSTNAME = hostname
export const API = (hostname === 'localhost') ? Config.LOCALHOST : Config.HOST
export const APIROUTE = {
  local: Config.LOCALHOST,
  prod: Config.HOST
}