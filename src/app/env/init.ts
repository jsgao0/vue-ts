import './polyfill'
import { register } from '@/utils/manageStoreModules'
import zhTw from '@/store/lang/zh-tw'
import en from '@/store/lang/en'

switch (location.pathname.split('/')[1]) {
  case 'en':
    register([
      {
        name: 'en',
        val: en,
      },
    ])
    break
  case 'zh-tw':
    register([
      {
        name: 'zhTw',
        val: zhTw,
      },
    ])
    break
  default:
    register([
      {
        name: 'en',
        val: en,
      },
    ])
}
