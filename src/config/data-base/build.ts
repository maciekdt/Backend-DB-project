import { DataBaseContext } from '../../database/DataBaseContext'
import { appContainer } from '../dependency/Container'
import { TYPES } from '../dependency/types'
import { System } from '../system/System'

const builder = appContainer.get<DataBaseContext>(TYPES.DataBaseContext)
appContainer.get<System>(TYPES.System).init().then( 
    () => { builder.build() }
)