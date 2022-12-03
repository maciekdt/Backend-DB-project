import { DataBaseService } from '../../database/DataBaseService'
import { appContainer } from '../dependency/Container'
import { TYPES } from '../dependency/types'
import { System } from '../system/System'

const builder = appContainer.get<DataBaseService>(TYPES.DataBaseService)
appContainer.get<System>(TYPES.System).init().then( 
    () => { builder.build() }
)